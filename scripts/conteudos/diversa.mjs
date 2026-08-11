/**
 * Colhe os vídeos publicados pelo DIVERSA e monta a lista de candidatos por
 * especialidade, para a curadoria de vídeo formativo do professor.
 *
 * ## Por que existe, e por que não passa pelo YouTube
 *
 * A matriz de conteúdos diz o que muda no plano de aula para cada par exigência ×
 * especialidade. O que ela não dá é **formação**: um professor que lê a célula e
 * nunca viu aquilo aplicado fica com a instrução e sem o gesto. O vídeo formativo
 * é essa segunda camada, e é papel diferente do vídeo que já existe no conteúdo
 * — lá o vídeo é aula da matéria para o aluno; aqui é formação para quem ensina.
 *
 * O DIVERSA é do Instituto Rodrigo Mendes, é institucional, e tem canal no
 * YouTube. **O canal não serve como porta de entrada**: página de canal e de
 * playlist são renderizadas por JavaScript e não devolvem id nenhum no HTML — foi
 * o mesmo obstáculo que fez a curadoria de Matemática entrar pelo portal do IMPA.
 *
 * A porta é o site. O `diversa.org.br` é WordPress e embute o vídeo como
 * `<iframe src="https://www.youtube.com/embed/ID">` no HTML servido, que é
 * exatamente o que dá para ler daqui.
 *
 * ## A API REST do WordPress não serve, e vale dizer por quê
 *
 * O caminho óbvio seria `/wp-json/wp/v2/posts`, que devolveria o `content` já
 * pronto. Ele responde 200 e **mente por omissão**: expõe 1 post e 46 páginas,
 * porque os tipos próprios do site (`artigos`, `noticias`, `relato_experiencia`,
 * `materiais_pedago`, `educacao_inclu`, `estudos_caso`, `guia_familias`,
 * `pesquisas`) não estão registrados nela. Quem confiar no total da REST conclui
 * que o site tem 47 páginas, quando tem cerca de 1.450.
 *
 * O `wp-sitemap.xml` lista todos os tipos públicos, e é por ele que se entra.
 *
 * ## Este script não escolhe vídeo nenhum
 *
 * Ele produz uma lista de candidatos com procedência, e nada mais. Que vídeo
 * serve a que célula da matriz é decisão de quem assiste — a mesma regra dos
 * vídeos do acervo, que entram com `revisado: false` e não vão ao ar antes.
 *
 * **Título de vídeo não é colhido daqui.** A página do DIVERSA tem o título ao
 * lado do vídeo, e copiá-lo é o erro que o portal do IMPA já cobrou uma vez:
 * lá os títulos estavam deslocados em um em relação aos ids. Este script grava o
 * id; título, canal e duração vêm da API pelo `npm run videos`.
 *
 * Uso:
 *   npm run diversa                 # varre o site e grava os candidatos
 *   npm run diversa -- --limite 60  # só as 60 primeiras páginas, para ensaiar
 *   npm run diversa -- --refazer    # ignora o que já foi visitado e varre tudo
 */
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"

const SITE = "https://diversa.org.br"
const SITEMAP = `${SITE}/wp-sitemap.xml`
// Ao lado de `canais.json`: os dois alimentam a mesma curadoria de vídeo
// formativo, e separá-los por origem esconderia isso.
const PASTA = join(process.cwd(), "data", "formacao")
const SAIDA = join(PASTA, "diversa.json")

const argumentos = process.argv.slice(2)
const REFAZER = argumentos.includes("--refazer")
const LIMITE = (() => {
  const i = argumentos.indexOf("--limite")
  if (i === -1) return Infinity
  const n = Number(argumentos[i + 1])
  return Number.isFinite(n) && n > 0 ? n : Infinity
})()

/**
 * Os sitemaps que trazem conteúdo. Os de taxonomia e de autor ficam de fora:
 * são páginas de listagem, e a listagem carrega o resto por JavaScript — o
 * arquivo de `especificidades` entrega só os nove primeiros itens e daria uma
 * amostra enviesada disfarçada de acervo.
 */
const SITEMAPS_DE_CONTEUDO = [
  "post",
  "page",
  "artigos",
  "educacao_inclu",
  "estudos_caso",
  "guia_familias",
  "materiais_pedago",
  "noticias",
  "pesquisas",
  "relato_experiencia",
]

/**
 * As `especificidades` do DIVERSA, traduzidas para os nossos slugs de
 * especialidade — e as que **não** se traduzem.
 *
 * O DIVERSA classifica por onze especificidades; nós temos catorze
 * especialidades. Oito casam sem esforço e estão aqui. As outras três do lado
 * dele ficaram de fora **de propósito**, e o motivo é o mesmo que a matriz de
 * adaptação já pagou uma vez: tratar a especialidade pelo sintoma mais visível.
 *
 *  - `paralisia-cerebral` não é `deficiencia-fisica`. A paralisia cerebral pode
 *    vir com comprometimento de fala, de visão e de cognição, e a deficiência
 *    física do nosso acervo é sobre acionamento, postura e alcance. Casar as
 *    duas mandaria para a célula de deficiência física um vídeo que fala de
 *    comunicação alternativa.
 *  - `multiplas-deficiencias` não é `surdocegueira`. A surdocegueira é uma
 *    deficiência única, com literatura e método próprios — é o que diz a fonte
 *    que já usamos, e é por isso que ela é especialidade separada aqui.
 *  - `outras` não é nada em particular, que é o que o nome diz.
 *
 * Seis das nossas catorze não têm correspondente nenhum do lado do DIVERSA:
 * dislexia, discalculia, disgrafia, saúde mental, surdocegueira e transtorno de
 * linguagem. São 42 das 98 células, e para elas a fonte terá de ser outra —
 * lacuna declarada, não lacuna esquecida.
 */
const ESPECIFICIDADE_PARA_ESPECIALIDADE = {
  "transtorno-espectro-autista": "autismo",
  "transtorno-do-deficit-de-atencao-e-hiperatividade-tdah": "tdah",
  "sindrome-de-down": "sindrome-de-down",
  "deficiencia-visual": "deficiencia-visual",
  "deficiencia-auditiva": "deficiencia-auditiva",
  "deficiencia-intelectual": "deficiencia-intelectual",
  "deficiencia-fisica": "deficiencia-fisica",
  "altas-habilidadessuperdotacao": "altas-habilidades",
}

/**
 * Um id que aparece em muitas páginas não é vídeo daquela página.
 *
 * Na amostragem, `rCILKZPG0Kg` apareceu em três páginas sem relação entre si —
 * é vídeo institucional de rodapé ou de bloco "relacionados". Descartar em
 * silêncio seria arriscado (um vídeo bom pode ser citado várias vezes), então
 * ele é marcado como recorrente e sai do relatório em seção própria, para
 * alguém olhar.
 */
const LIMIAR_RECORRENTE = 3

// --- Rede --------------------------------------------------------------------

const TENTATIVAS = 4
const ESPERA_ENTRE_PAGINAS_MS = 700

const dormir = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Baixa uma página, repetindo no 429 e nos erros de servidor.
 *
 * Mesma lição do `videos.mjs`: limite de taxa responde com uma página curta e
 * sem o que se procura, o que se parece com "esta página não tem vídeo". Tratar
 * 429 como resposta válida faria o acervo inteiro parecer vazio a partir de
 * certo ponto da varredura, e o erro apareceria como um número menor — que é o
 * tipo de defeito que ninguém percebe.
 */
async function baixar(url) {
  let ultimoStatus = 0

  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa += 1) {
    let resposta
    try {
      resposta = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
          "Accept-Language": "pt-BR,pt;q=0.9",
        },
      })
    } catch (erro) {
      if (tentativa === TENTATIVAS) return { erro: `falha de rede: ${erro.message}` }
      await dormir(2000 * tentativa)
      continue
    }

    ultimoStatus = resposta.status
    if (resposta.ok) return { html: await resposta.text() }

    const valeRepetir = resposta.status === 429 || resposta.status >= 500
    if (!valeRepetir) break
    if (tentativa < TENTATIVAS) await dormir(3000 * tentativa)
  }

  return {
    erro:
      ultimoStatus === 429
        ? "limite de taxa (429) mesmo após as tentativas — rode de novo daqui a alguns minutos"
        : `respondeu ${ultimoStatus}`,
  }
}

// --- Leitura do HTML ---------------------------------------------------------

/**
 * Os ids de vídeo da página.
 *
 * O `<iframe .../embed/ID>` é o vídeo de fato embutido. O link solto
 * (`watch?v=` ou `youtu.be/`) é citação no texto, e vale menos: pode ser
 * referência de passagem. Os dois são colhidos, com a forma registrada, porque
 * a diferença importa para quem vai escolher.
 */
function idsDaPagina(html) {
  const achados = new Map()

  for (const m of html.matchAll(/youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})/g)) {
    achados.set(m[1], { forma: "embutido", onde: "youtube" })
  }
  for (const m of html.matchAll(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/g)) {
    if (!achados.has(m[1])) achados.set(m[1], { forma: "citado", onde: "youtube" })
  }

  /**
   * Outros players.
   *
   * Medido em 10/08/2026 sobre trinta páginas: o DIVERSA usa **só YouTube** —
   * nenhum Vimeo, Brightcove, Kaltura, Wistia, JW ou `<video>` solto. Isto fica
   * aqui mesmo assim porque o custo é uma expressão a mais e o custo de não ter
   * é uma varredura inteira devolvendo zero em silêncio no dia em que o site
   * trocar de player. Se algum dia isto acusar alguma coisa, é sinal de rodar
   * `npm run diversa -- --refazer`.
   */
  for (const m of html.matchAll(/(?:player\.)?vimeo\.com\/(?:video\/)?(\d{6,})/g)) {
    if (!achados.has(m[1])) achados.set(m[1], { forma: "embutido", onde: "vimeo" })
  }

  return [...achados].map(([id, { forma, onde }]) => ({ id, forma, onde }))
}

/** Os termos de uma taxonomia, pelos links que a página traz para o arquivo dela. */
function taxonomia(html, nome) {
  const expressao = new RegExp(`href="${SITE}/${nome}/([^"/?#]+)`, "g")
  return [...new Set([...html.matchAll(expressao)].map((m) => m[1]))]
}

/** O título da **página** — não o do vídeo, que nunca é lido daqui. */
function tituloDaPagina(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i)
  if (!m) return null
  return m[1]
    .replace(/\s*[-–|]\s*DIVERSA\s*$/i, "")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .trim()
}

// --- Varredura ---------------------------------------------------------------

async function enderecos() {
  const indice = await baixar(SITEMAP)
  if (indice.erro) {
    console.error(`Não consegui ler ${SITEMAP}: ${indice.erro}`)
    process.exit(1)
  }

  const mapas = [...indice.html.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => SITEMAPS_DE_CONTEUDO.some((t) => u.endsWith(`/${t}-sitemap.xml`)))

  const urls = []
  for (const mapa of mapas) {
    const r = await baixar(mapa)
    if (r.erro) {
      console.error(`  ${mapa}: ${r.erro}`)
      continue
    }
    const achadas = [...r.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    console.log(`  ${mapa.split("/").pop().padEnd(34)} ${String(achadas.length).padStart(4)} páginas`)
    urls.push(...achadas)
  }

  return [...new Set(urls)]
}

async function jaVisitadas() {
  if (REFAZER || !existsSync(SAIDA)) return new Map()
  try {
    const anterior = JSON.parse(await readFile(SAIDA, "utf8"))
    return new Map((anterior.paginas ?? []).map((p) => [p.url, p]))
  } catch {
    return new Map()
  }
}

console.log(`Lendo o mapa do site — ${SITEMAP}\n`)
const urls = await enderecos()
const cache = await jaVisitadas()
console.log(`\n${urls.length} páginas no total; ${cache.size} já visitadas numa execução anterior.\n`)

const paginas = []
const falhas = []
let lidas = 0

for (const url of urls) {
  if (paginas.length >= LIMITE) break

  const guardada = cache.get(url)
  if (guardada) {
    paginas.push(guardada)
    continue
  }

  const r = await baixar(url)
  lidas += 1
  await dormir(ESPERA_ENTRE_PAGINAS_MS)

  if (r.erro) {
    falhas.push(`${url}: ${r.erro}`)
    continue
  }

  const videos = idsDaPagina(r.html)
  const especificidades = taxonomia(r.html, "especificidades")

  paginas.push({
    url,
    titulo: tituloDaPagina(r.html),
    videos,
    especificidades,
    especialidades: [
      ...new Set(especificidades.map((e) => ESPECIFICIDADE_PARA_ESPECIALIDADE[e]).filter(Boolean)),
    ],
    dimensoes: taxonomia(r.html, "dimensoes"),
    segmentos: taxonomia(r.html, "segmentos"),
  })

  if (lidas % 50 === 0) console.log(`  ...${lidas} páginas lidas`)
}

// --- Ids recorrentes ---------------------------------------------------------

const paginasPorId = new Map()
for (const p of paginas) {
  for (const v of p.videos) {
    if (!paginasPorId.has(v.id)) paginasPorId.set(v.id, [])
    paginasPorId.get(v.id).push(p.url)
  }
}

const recorrentes = new Set(
  [...paginasPorId].filter(([, onde]) => onde.length >= LIMIAR_RECORRENTE).map(([id]) => id),
)
for (const p of paginas) {
  for (const v of p.videos) v.recorrente = recorrentes.has(v.id)
}

// --- Gravação ----------------------------------------------------------------

const comVideo = paginas.filter((p) => p.videos.some((v) => !v.recorrente))
const uteis = comVideo.filter((p) => p.especialidades.length > 0)

await mkdir(PASTA, { recursive: true })
await writeFile(
  SAIDA,
  `${JSON.stringify(
    {
      colhidoEm: new Date().toISOString().slice(0, 10),
      fonte: SITE,
      comoFoiColhido:
        "wp-sitemap.xml dos tipos de conteúdo; ids lidos do <iframe .../embed/> e de links no texto. Título de vídeo não é colhido daqui — vem da API pelo npm run videos.",
      paginas,
    },
    null,
    1,
  )}\n`,
)

// --- Relatório ---------------------------------------------------------------

console.log(`\nPáginas lidas nesta execução: ${lidas}`)
console.log(`Páginas no arquivo: ${paginas.length}`)
console.log(`Com vídeo próprio: ${comVideo.length}`)
console.log(`Com vídeo e especialidade que casa com a nossa: ${uteis.length}`)

const porEspecialidade = new Map()
for (const p of uteis) {
  for (const e of p.especialidades) porEspecialidade.set(e, (porEspecialidade.get(e) ?? 0) + 1)
}

console.log("\nCandidatos por especialidade:")
for (const [especialidade, quantas] of [...porEspecialidade].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${especialidade.padEnd(26)} ${String(quantas).padStart(3)}`)
}

const semCorrespondente = new Map()
for (const p of comVideo) {
  for (const e of p.especificidades) {
    if (ESPECIFICIDADE_PARA_ESPECIALIDADE[e]) continue
    semCorrespondente.set(e, (semCorrespondente.get(e) ?? 0) + 1)
  }
}
if (semCorrespondente.size) {
  console.log("\nEspecificidades do DIVERSA sem correspondente nosso (não são erro — ver o cabeçalho):")
  for (const [e, q] of [...semCorrespondente].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${e.padEnd(56)} ${String(q).padStart(3)}`)
  }
}

if (recorrentes.size) {
  console.log(`\nIds em ${LIMIAR_RECORRENTE}+ páginas, marcados como recorrentes (rodapé ou "relacionados"):`)
  for (const id of recorrentes) {
    console.log(`  ${id}  em ${paginasPorId.get(id).length} páginas`)
  }
}

if (falhas.length) {
  console.error(`\n${falhas.length} página(s) não puderam ser lidas:`)
  for (const linha of falhas.slice(0, 20)) console.error(`  ${linha}`)
  if (falhas.length > 20) console.error(`  ...e mais ${falhas.length - 20}`)
}

console.log(`\nGravado em ${SAIDA}. Nenhum vídeo foi escolhido: a curadoria é de quem assiste.`)
