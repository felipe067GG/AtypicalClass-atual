/**
 * Confere os vídeos indicados pelos conteúdos, e preenche o que dá para saber.
 *
 * ## O que este script pode e o que não pode
 *
 * Pode confirmar que o vídeo **existe**, que não foi removido nem ficou
 * privado, e qual é o título, o canal e a duração. Isso vem da API pública de
 * oEmbed do YouTube e da própria página, não de digitação — um título digitado à
 * mão é uma afirmação sobre um vídeo que ninguém abriu.
 *
 * **Não pode dizer se o vídeo presta.** Nenhuma verificação automática assiste a
 * nada. Por isso todo vídeo entra com `revisado: false` e o envio para o
 * Supabase recusa vídeo não revisado: a alternativa é um professor abrir, no
 * meio da aula, um vídeo que ninguém viu — e o site perder de uma vez a
 * procedência que o resto do acervo tem.
 *
 * Uso:
 *   npm run videos              # confere e preenche título, canal e duração
 *   npm run videos -- --fila    # lista o que está esperando alguém assistir
 */
import { readdir, readFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"

const PASTA = join(process.cwd(), "data", "conteudos")
const SO_FILA = process.argv.includes("--fila")

/**
 * Canais aceitos, por id do canal ou por nome exato.
 *
 * A decisão de origem foi tomada junto com o mantenedor: só canal de
 * instituição. Não é esnobismo com professor que grava sozinho — é que a
 * verificação automática não distingue um bom vídeo de um ruim, e a origem
 * institucional é o único filtro que sobra antes de alguém assistir.
 *
 * Um canal fora desta lista não é recusado: vai para a fila com a origem
 * marcada como não institucional, e a revisão decide. O que a lista faz é dizer
 * o que já se sabe sobre a procedência.
 */
const CANAIS_INSTITUCIONAIS = [
  "Khan Academy Brasil",
  "TV Escola",
  "MEC",
  "Ministério da Educação",
  "USP",
  "Univesp",
  "UNIVESP",
  "Instituto Federal",
  "Fundação Roberto Marinho",
  "Nova Escola",
  "Canal Futura",
  "IMPA",
  "Instituto de Matemática Pura e Aplicada",
  // O canal do Portal da Matemática, mantido pela OBMEP/IMPA, cobre do 6º ano
  // ao 3º do médio em videoaulas gratuitas. Entrou na lista depois de o script
  // marcá-lo como não institucional na primeira execução: o nome do canal não
  // contém "IMPA", e a lista casa por nome.
  "OBMEP",
  "Portal da Matemática",
  "Fiocruz",
  "Museu da Língua Portuguesa",
  // TV INES é a televisão do Instituto Nacional de Educação de Surdos, do MEC,
  // com toda a programação em Libras, legenda e narração. É a fonte mais
  // relevante para vídeo de conteúdo escolar acessível ao aluno surdo.
  "TV INES",
  "INES",
]

function idDoVideo(url) {
  const m =
    url.match(/[?&]v=([A-Za-z0-9_-]{11})/) ??
    url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/) ??
    url.match(/embed\/([A-Za-z0-9_-]{11})/)
  return m?.[1] ?? null
}

/**
 * Título e canal, pela API de oEmbed.
 *
 * Vídeo removido, privado ou com id inventado responde 404 aqui — e é essa a
 * checagem que importa. Um endereço do YouTube sempre "existe" no sentido de
 * responder 200 na página; quem responde se o vídeo existe é o oEmbed.
 */
async function oembed(url) {
  const endereco = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
  const resposta = await fetch(endereco, { headers: { "User-Agent": "AtypicalClass-VideoCheck/1.0" } })
  if (!resposta.ok) return { erro: `oEmbed respondeu ${resposta.status}` }
  const dados = await resposta.json()
  return { titulo: dados.title, canal: dados.author_name }
}

/**
 * A duração, lida da página do vídeo.
 *
 * A duração não vem no oEmbed e a API oficial exigiria chave. `lengthSeconds`
 * está no JSON que a própria página embute. Se o YouTube mudar o formato, isto
 * para de achar — e por isso a falha aqui é reportada, e não silenciosa: sem
 * duração o conferidor recusa o vídeo, em vez de publicá-lo sem ela.
 *
 * ## O 429 não é vídeo quebrado
 *
 * Numa curadoria de oito vídeos seguidos, o YouTube passou a responder **429**
 * — limite de taxa — com uma página de três mil bytes e nenhuma duração. A
 * primeira versão deste script tratava isso como "não consegui ler a duração",
 * que se parece com vídeo defeituoso e não com "tente daqui a pouco", e teria
 * feito o conferidor recusar oito vídeos que estão perfeitos.
 *
 * Agora o 429 e os erros de servidor são repetidos com espera crescente, e a
 * falha final diz qual foi o status. O intervalo entre vídeos existe pelo mesmo
 * motivo: pedir devagar é mais rápido que ser bloqueado.
 */
const TENTATIVAS = 4
const ESPERA_ENTRE_VIDEOS_MS = 1500

const dormir = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function duracao(id) {
  let ultimoStatus = 0

  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa += 1) {
    const resposta = await fetch(`https://www.youtube.com/watch?v=${id}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
    })
    ultimoStatus = resposta.status

    if (resposta.ok) {
      const html = await resposta.text()
      const achado = html.match(/"lengthSeconds":"(\d+)"/)
      if (achado) return { segundos: Number(achado[1]) }
      // Respondeu 200 e não trouxe a duração: aí é mudança de formato, e
      // repetir não resolve.
      return { erro: "a página respondeu 200 sem `lengthSeconds` — o formato do YouTube pode ter mudado" }
    }

    const valeRepetir = resposta.status === 429 || resposta.status >= 500
    if (!valeRepetir) break
    if (tentativa < TENTATIVAS) await dormir(3000 * tentativa)
  }

  return {
    erro:
      ultimoStatus === 429
        ? "limite de taxa do YouTube (429) mesmo após as tentativas — rode de novo daqui a alguns minutos"
        : `a página do vídeo respondeu ${ultimoStatus}`,
  }
}

// --- Percorrer o acervo ------------------------------------------------------

if (!existsSync(PASTA)) {
  console.error(`Falta ${PASTA}. Nenhum conteúdo para conferir.`)
  process.exit(1)
}

const arquivos = (await readdir(PASTA)).filter((n) => n.endsWith(".json")).sort()

const fila = []
const falhas = []
let verificados = 0
let alterados = 0

/**
 * Grava as atualizações relendo o arquivo primeiro.
 *
 * A primeira versão lia o JSON, alterava em memória e regravava o objeto
 * inteiro. Parece inofensivo num script de um usuário só, e não é: numa
 * curadoria em que este script rodava em segundo plano enquanto novos vídeos
 * eram acrescentados aos mesmos arquivos, a regravação **apagou um vídeo
 * recém-adicionado** — o objeto em memória era de antes da adição.
 *
 * Reler imediatamente antes de gravar e aplicar só os campos que este script
 * apura, casando por URL, faz a perda deixar de ser possível. O custo é uma
 * leitura a mais por arquivo.
 */
async function gravarAtualizacoes(caminho, atualizacoes) {
  const atual = JSON.parse(await readFile(caminho, "utf8"))
  let aplicadas = 0

  for (const conteudo of atual.conteudos ?? []) {
    for (const video of conteudo.videos ?? []) {
      const nova = atualizacoes.get(video.url)
      if (!nova) continue
      video.titulo = nova.titulo
      video.canal = nova.canal
      video.duracaoSegundos = nova.duracaoSegundos
      aplicadas += 1
    }
  }

  await writeFile(caminho, `${JSON.stringify(atual, null, 1)}\n`)
  return aplicadas
}

for (const arquivo of arquivos) {
  const caminho = join(PASTA, arquivo)
  const acervo = JSON.parse(await readFile(caminho, "utf8"))
  const atualizacoes = new Map()
  let mudou = false

  for (const conteudo of acervo.conteudos ?? []) {
    for (const video of conteudo.videos ?? []) {
      const id = idDoVideo(video.url ?? "")
      if (!id) {
        falhas.push(`${arquivo} :: ${conteudo.id} — não consegui extrair o id de: ${video.url}`)
        continue
      }

      if (SO_FILA) {
        if (!video.revisado) fila.push(`${arquivo} :: ${conteudo.id} — ${video.titulo ?? video.url}\n      ${video.url}`)
        continue
      }

      const info = await oembed(video.url)
      verificados += 1
      if (info.erro) {
        falhas.push(`${arquivo} :: ${conteudo.id} — ${video.url}: ${info.erro}`)
        continue
      }

      const medida = await duracao(id)
      await dormir(ESPERA_ENTRE_VIDEOS_MS)
      if (medida.erro) {
        falhas.push(`${arquivo} :: ${conteudo.id} — ${video.url}: ${medida.erro}`)
        continue
      }
      const segundos = medida.segundos

      if (video.titulo !== info.titulo || video.canal !== info.canal || video.duracaoSegundos !== segundos) {
        atualizacoes.set(video.url, { titulo: info.titulo, canal: info.canal, duracaoSegundos: segundos })
        mudou = true
        alterados += 1
      }
      // A fila é montada com o que a API acabou de responder, e não com o que
      // está no arquivo — que só será atualizado no fim.
      video.titulo = info.titulo
      video.canal = info.canal
      video.duracaoSegundos = segundos

      const institucional = CANAIS_INSTITUCIONAIS.some((c) => info.canal?.toLowerCase().includes(c.toLowerCase()))
      if (!video.revisado) {
        fila.push(
          `${arquivo} :: ${conteudo.id}\n      ${info.titulo}\n      canal: ${info.canal}${institucional ? " (institucional)" : " — NÃO institucional"}` +
            `\n      ${Math.floor(segundos / 60)}min${String(segundos % 60).padStart(2, "0")}  ${video.url}`,
        )
      }
    }
  }

  if (mudou) await gravarAtualizacoes(caminho, atualizacoes)
}

// --- Relatório ---------------------------------------------------------------

if (SO_FILA) {
  console.log(`Vídeos aguardando alguém assistir: ${fila.length}\n`)
  for (const linha of fila) console.log(`  ${linha}\n`)
  process.exit(0)
}

console.log(`Vídeos verificados: ${verificados}`)
console.log(`Registros atualizados: ${alterados}`)

if (fila.length) {
  console.log(`\n${fila.length} vídeo(s) esperando revisão — nenhum vai ao ar antes:`)
  for (const linha of fila) console.log(`  ${linha}\n`)
}

if (falhas.length) {
  console.error(`\n${falhas.length} falha(s):`)
  for (const linha of falhas) console.error(`  ${linha}`)
  process.exit(1)
}

console.log("\nTodos os vídeos indicados existem e estão descritos pelo que a API respondeu.")
