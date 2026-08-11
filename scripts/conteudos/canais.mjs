/**
 * Colhe candidatos a vídeo formativo nos canais institucionais, para as
 * especialidades que o DIVERSA não cobre.
 *
 * ## Por que existe
 *
 * O `diversa.mjs` cobre oito das nossas catorze especialidades — é o alcance da
 * taxonomia do DIVERSA, não uma falha da varredura. Ficam de fora dislexia,
 * discalculia, disgrafia, saúde mental, surdocegueira e transtorno de linguagem,
 * que são 42 das 98 células da matriz. Para essas, a fonte é o canal da própria
 * instituição que já citamos nas células.
 *
 * ## A crença que este script desmente
 *
 * Estava registrado no projeto que "página de canal e playlist do YouTube não
 * devolvem ids, são renderizadas por JavaScript". **Não é verdade** — o que não
 * devolve nada é o *texto renderizado*. No HTML bruto, pedido com User-Agent de
 * navegador, os ids estão em `"videoId":"…"` dentro do `ytInitialData`: a aba
 * `/videos` de um canal entrega cerca de trinta, e a página de uma playlist
 * entrega as dela.
 *
 * A conclusão errada veio de procurar no lugar errado, e custou a curadoria de
 * Matemática ter de entrar pelo portal do IMPA. O limite verdadeiro é outro, e
 * está registrado abaixo: a primeira carga traz ~30 vídeos e o resto exige token
 * de continuação — por isso playlist é a porta mais previsível para um acervo
 * grande.
 *
 * ## O que este script não faz
 *
 * Não escolhe vídeo, não escreve na matriz e não digita título. O título e o
 * canal vêm do oEmbed, que é a API — e é ele também que **prova a procedência**:
 * um id colhido do HTML de um canal só entra na lista se o oEmbed responder com
 * o nome daquele canal. Sem essa conferência, bastaria um bloco de "vídeos
 * recomendados" na página para a lista encher de material de terceiros com
 * carimbo institucional.
 *
 * A duração fica de fora de propósito: ela exige baixar a página de cada vídeo,
 * que é onde o 429 aparece. Quem preenche duração é o `npm run videos`, quando o
 * vídeo já tiver sido escolhido para uma célula.
 *
 * ## A aba /videos engana, e as playlists não
 *
 * A primeira versão colhia os ~30 vídeos da aba `/videos`, que são os **mais
 * recentes**. Para uma instituição, o mais recente é campanha, notícia e
 * podcast — não material de como ensinar. Medido em 10/08/2026: dos 362
 * candidatos assim colhidos, o canal do Understood devolveu 30 episódios de
 * podcast sobre TDAH e **nenhum** sobre disgrafia, que era o motivo de ele estar
 * na lista; a PAHO devolveu HIV e amamentação; o NAGC, "Volunteer Appreciation
 * Week". O acervo parecia grande e quase não servia.
 *
 * O material de ensino existe, e mora nas **playlists**, que a instituição
 * organiza por assunto. `--playlists` colhe playlist por playlist, com o título
 * de cada uma — e é o título da playlist que serve de triagem, porque ele diz o
 * assunto de um conjunto inteiro ("Positive Behavior Strategies for the
 * Classroom") em vez de um vídeo isolado.
 *
 * Título por vídeo **não** é colhido aqui de propósito: o HTML da playlist
 * mudou para `lockupViewModel` e extrair título de lá seria raspagem frágil de
 * um dado que a API entrega de graça. Quem o preenche é o `npm run videos`,
 * quando o vídeo entrar numa célula.
 *
 * Uso:
 *   npm run canais                       # varre a aba /videos de cada canal
 *   npm run canais -- --playlists        # colhe as playlists, com título e ids
 *   npm run canais -- --so dislexia      # só os canais de uma especialidade
 */
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"

const PASTA = join(process.cwd(), "data", "formacao")
const SAIDA = join(PASTA, "canais.json")

const SAIDA_PLAYLISTS = join(PASTA, "playlists.json")

const argumentos = process.argv.slice(2)
const POR_PLAYLIST = argumentos.includes("--playlists")
const SO = (() => {
  const i = argumentos.indexOf("--so")
  return i === -1 ? null : argumentos[i + 1]
})()

/**
 * Os canais, por especialidade descoberta.
 *
 * O critério de entrada é o mesmo do resto do site: instituição, não pessoa
 * física nem blog comercial. Todas as organizações abaixo já são fonte citada em
 * `lib/adaptacao/matriz.ts` ou em `lib/specialty-data/` — não são achados novos,
 * são os canais de quem já sustenta as células.
 *
 * `idioma` é registrado porque muda o uso: o professor brasileiro assiste em
 * português sem atrito, e em inglês ou espanhol com legenda. Nenhum é recusado
 * por idioma — quem decide é a revisão.
 */
const CANAIS = [
  {
    especialidade: "dislexia",
    instituicao: "Instituto ABCD",
    url: "https://www.youtube.com/@institutoabcd",
    idioma: "pt",
  },
  {
    especialidade: "dislexia",
    instituicao: "International Dyslexia Association",
    // Pelo identificador do canal, e não pelo `@handle`: a IDA tem dois canais
    // nacionais com nome quase igual — este é o de 30 vídeos, e o outro
    // ("DyslexiaIDA") tem 28 — além de meia dúzia de canais de filiais
    // estaduais. Handle é apelido e muda; o UC… é o endereço estável.
    url: "https://www.youtube.com/channel/UCcaAMbct0X6N9QrYK4t9Abg",
    idioma: "en",
  },
  {
    especialidade: "discalculia",
    instituicao: "The Dyscalculia Network",
    url: "https://www.youtube.com/channel/UCjMTlUFFw8X94tW2W6a_glw",
    idioma: "en",
  },
  {
    especialidade: "disgrafia",
    instituicao: "Understood",
    url: "https://www.youtube.com/@UnderstoodOrg",
    idioma: "en",
  },
  {
    especialidade: "surdocegueira",
    instituicao: "Perkins School for the Blind",
    url: "https://www.youtube.com/@PerkinsVision",
    idioma: "en",
  },
  {
    especialidade: "transtorno-de-linguagem",
    instituicao: "RADLD — Raising Awareness of Developmental Language Disorder",
    url: "https://www.youtube.com/@RADLD",
    idioma: "en",
  },
  {
    especialidade: "transtorno-de-linguagem",
    instituicao: "ASHA — American Speech-Language-Hearing Association",
    url: "https://www.youtube.com/@ASHAWeb",
    idioma: "en",
  },
  {
    especialidade: "saude-mental",
    instituicao: "OPAS/OMS — Organização Pan-Americana da Saúde (PAHO TV)",
    url: "https://www.youtube.com/@pahotv",
    idioma: "es/en/pt",
  },
  {
    especialidade: "saude-mental",
    instituicao: "UNICEF Brasil",
    url: "https://www.youtube.com/@unicefbrasil",
    idioma: "pt",
  },

  /**
   * Estas três especialidades o DIVERSA cobre, e cobre pouco: a varredura do
   * site devolveu três candidatos para cada uma, contra 47 do autismo e 43 da
   * deficiência intelectual. Três não dá para escolher — dá para aceitar o que
   * apareceu, que é outra coisa. Os canais abaixo existem para que a curadoria
   * dessas três tenha de onde recusar.
   */
  {
    especialidade: "tdah",
    // O canal da CHADD (`@CHADDVideo`) tem quatro vídeos. Este é o do National
    // Resource Center on ADHD, que é programa da própria CHADD, e tem trinta.
    instituicao: "Help for ADHD — National Resource Center on ADHD (CHADD)",
    url: "https://www.youtube.com/helpforadhd",
    idioma: "en",
  },
  {
    especialidade: "sindrome-de-down",
    instituicao: "Movimento Down",
    url: "https://www.youtube.com/canalmovimentodown",
    idioma: "pt",
  },
  {
    especialidade: "sindrome-de-down",
    instituicao: "Down Syndrome Education International",
    // `@dseinternational` — sem o `Org` — **não é esta instituição**: é um canal
    // de moda, com campanhas publicitárias e desfiles. Ele passou pela conferência
    // do oEmbed em 10/08/2026 porque o oEmbed prova que o id pertence àquele
    // canal, e não que aquele canal seja a instituição declarada. Nome parecido
    // é o bastante para errar, e a conferência automática não pega isso — só
    // olhar o que o canal publica pega.
    url: "https://www.youtube.com/@DseinternationalOrg",
    idioma: "en",
  },
  {
    especialidade: "altas-habilidades",
    instituicao: "NAGC — National Association for Gifted Children",
    url: "https://www.youtube.com/@NAGCgifted",
    idioma: "en",
  },

  /**
   * Fontes acrescentadas quando a triagem mostrou que o acervo travava por falta
   * de material sobre a **exigência**, e não por falta de vídeo. A RADLD é
   * sobretudo identificação; o NAGC, institucional; o Understood, geral sobre
   * diferenças de aprendizagem. Sem fonte nova, as células restantes não fecham.
   */
  {
    especialidade: "saude-mental",
    instituicao: "Anna Freud Centre — saúde mental na escola",
    url: "https://www.youtube.com/@AnnaFreudNCCF",
    idioma: "en",
  },
  {
    especialidade: "surdocegueira",
    instituicao: "TSBVI — Texas School for the Blind and Visually Impaired",
    url: "https://www.youtube.com/@VideoTSBVI",
    idioma: "en",
  },
  {
    especialidade: "disgrafia",
    instituicao: "Reading Rockets (WETA)",
    // Pelo endereço `user/`, que é o que o canal ainda usa — não há `@handle`.
    url: "https://www.youtube.com/user/wetalearningmedia",
    idioma: "en",
  },
  {
    especialidade: "deficiencia-fisica",
    instituicao: "AssistiveWare — comunicação alternativa",
    url: "https://www.youtube.com/@AssistiveWare",
    idioma: "en",
  },
  {
    especialidade: "deficiencia-auditiva",
    instituicao: "Clerc Center — Gallaudet University",
    url: "https://www.youtube.com/@clerccenter",
    idioma: "en",
  },
  {
    especialidade: "altas-habilidades",
    instituicao: "Johns Hopkins Center for Talented Youth",
    url: "https://www.youtube.com/@CTYJohnsHopkins",
    idioma: "en",
  },

  /**
   * Segunda rodada de fontes novas, pelo mesmo diagnóstico e com uma medida.
   *
   * Depois que 79 das 98 células fecharam, as 19 restantes deixaram de responder
   * a triagem: uma varredura por `enrich|compact|depth|acceler|questioning` nos
   * ~4.400 candidatos já colhidos devolveu **um** resultado, e enriquecimento é
   * o miolo do que falta em altas habilidades. Sem fonte nova não fecha.
   *
   * O **Clerc Center**, acima, é a prova pelo avesso: foi declarado, colhido e
   * os 26 títulos resolvidos um a um — e todos são institucionais (plano
   * estratégico, town hall, cúpula de advocacy). Fica na lista porque removê-lo
   * apagaria o que se aprendeu com ele.
   */
  {
    especialidade: "deficiencia-auditiva",
    instituicao: "TV INES — Instituto Nacional de Educação de Surdos (MEC)",
    // Pelo id, e não pelo `@handle`: `@TVINES` é **outro** canal, de nome
    // "tvines". Este id foi conferido contra os 9 vídeos do TV INES que já estão
    // no acervo de conteúdos — mesma armadilha do `@dseinternational`.
    url: "https://www.youtube.com/channel/UCUcf1gG-ph6k_rbTMZBN60A",
    idioma: "pt",
  },
  {
    especialidade: "sindrome-de-down",
    instituicao: "Down Syndrome Resource Foundation (DSRF)",
    url: "https://www.youtube.com/channel/UCCQ9LYhlSvhZjqBn0kVNAPw",
    idioma: "en",
  },
  {
    especialidade: "discalculia",
    instituicao: "NCII — National Center on Intensive Intervention",
    url: "https://www.youtube.com/channel/UC6W2pma8TiSZvY_GWROkTLA",
    idioma: "en",
  },
  {
    especialidade: "transtorno-de-linguagem",
    instituicao: "Speech and Language UK",
    url: "https://www.youtube.com/channel/UC52E9NxUaFSdoSJcTXCOvyQ",
    idioma: "en",
  },
  {
    // O IRIS Center não é de uma especialidade só — publica módulo de formação
    // sobre acomodação, função executiva, escrita e matemática. Fica etiquetado
    // em `tdah` porque é onde a lacuna era maior, e a etiqueta é intenção de
    // coleta, não assunto do vídeo: quem liga o vídeo à célula é o `porQue`.
    especialidade: "tdah",
    instituicao: "The IRIS Center — Vanderbilt University (OSEP)",
    url: "https://www.youtube.com/channel/UCFYHtSkEr0IjuDYSK1hQ0Bg",
    idioma: "en",
  },
  {
    especialidade: "altas-habilidades",
    instituicao: "Belin-Blank Center — University of Iowa",
    url: "https://www.youtube.com/channel/UCOrOffPtkQegDU494nxcHjQ",
    idioma: "en",
  },

  /**
   * Terceira rodada, para as nove que sobraram — e aqui a busca deixou de ser
   * pela especialidade e passou a ser **pelo que a célula pede**.
   *
   * Não adiantava mais um canal sobre altas habilidades: NAGC, CTY e Belin-Blank
   * já estavam dentro e os três publicam institucional. O que falta é material
   * sobre aprofundar dentro da unidade, sobre rótulo de figura como segunda
   * língua, sobre produzir notação por acionador. São assuntos, não rótulos de
   * diagnóstico, e é assim que estes quatro foram procurados.
   *
   * **Nenhum dos quatro fechou célula, e ficam declarados por isso.** O Purdue
   * GER2I tem uma playlist e ela é lip sync de monitores e anuário — o quarto
   * canal de altas habilidades a publicar comunidade em vez de didática, o que
   * torna o padrão uma conclusão e não um azar. O AEM Center trata de *obter*
   * material acessível (compra, PEI, autoadvocacia), e não de produzir notação.
   * O DO-IT tem "Alternative Keyboards", que é ergonomia e destreza — acesso
   * físico em geral, que caberia igual na célula de produção do aluno, e por
   * isso reprova no teste do `porQue`.
   *
   * O **DCMP** parecia o único aproveitável, e não é: "Vocabulary Builders in
   * Sign Language" é **ASL**, não Libras. São línguas diferentes, e o aluno
   * surdo brasileiro não lê ASL — marcar aquilo como recurso de acessibilidade
   * seria afirmação falsa. Fica aqui porque "sign language" no título se lê como
   * acessível, e essa leitura é a armadilha.
   *
   * **Altas habilidades foi verificada uma quinta vez, e o padrão é conclusão.**
   * Além de NAGC, CTY, Belin-Blank e Purdue, o canal da UConn Neag School of
   * Education — que abriga o Renzulli Center — foi consultado por busca dirigida
   * (`/search?query=gifted`) e devolve prêmio de ex-aluno, perfil de docente e
   * "Faculty Talk — Joseph Renzulli", que é perfil e não aula. Cinco de cinco.
   * A didática de enriquecimento não parece existir em vídeo aberto; procurar um
   * sexto canal é repetir o mesmo resultado. Não foi declarado aqui porque a
   * consulta foi dirigida e não uma coleta — declarar canal que não se colheu
   * faria a lista afirmar mais do que se apurou.
   */
  {
    especialidade: "altas-habilidades",
    instituicao: "Purdue GER2I — Gifted Education Research and Resource Institute",
    url: "https://www.youtube.com/channel/UCsB-4M8Utd0nr6N0HLe9ekw",
    idioma: "en",
  },
  {
    especialidade: "deficiencia-auditiva",
    instituicao: "DCMP — Described and Captioned Media Program (US Dept. of Education)",
    url: "https://www.youtube.com/channel/UCWSkTMzpdIbY6r6V6QoX_Jw",
    idioma: "en",
  },
  {
    especialidade: "deficiencia-fisica",
    instituicao: "AEM Center — National Center on Accessible Educational Materials (CAST)",
    url: "https://www.youtube.com/channel/UC430oh5VnS3pdBJ89ux2bZQ",
    idioma: "en",
  },
  {
    especialidade: "deficiencia-fisica",
    instituicao: "DO-IT — University of Washington",
    url: "https://www.youtube.com/channel/UC8NsdC6bvekxz5GgG9Ns_tA",
    idioma: "en",
  },
]

// --- Rede --------------------------------------------------------------------

const TENTATIVAS = 4
const ESPERA_ENTRE_PEDIDOS_MS = 600

const dormir = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const CABECALHOS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
  "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
}

async function baixar(url) {
  let ultimoStatus = 0

  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa += 1) {
    let resposta
    try {
      resposta = await fetch(url, { headers: CABECALHOS })
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

/**
 * Título e canal pela API de oEmbed — a mesma conferência do `videos.mjs`.
 *
 * Vídeo removido, privado ou com id inventado responde 404 aqui, e é isso que
 * separa um id colhido de um vídeo que existe.
 */
async function oembed(id) {
  const endereco = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${id}`,
  )}&format=json`

  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa += 1) {
    let resposta
    try {
      resposta = await fetch(endereco, { headers: CABECALHOS })
    } catch (erro) {
      if (tentativa === TENTATIVAS) return { erro: `falha de rede: ${erro.message}` }
      await dormir(2000 * tentativa)
      continue
    }

    if (resposta.ok) {
      const dados = await resposta.json()
      return { titulo: dados.title, canal: dados.author_name }
    }
    if (resposta.status !== 429 && resposta.status < 500) return { erro: `oEmbed respondeu ${resposta.status}` }
    if (tentativa < TENTATIVAS) await dormir(3000 * tentativa)
  }

  return { erro: "oEmbed não respondeu depois das tentativas" }
}

// --- Leitura do HTML do YouTube ----------------------------------------------

const idsDeVideo = (html) => [...new Set([...html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)].map((m) => m[1]))]

const idDoCanal = (html) => html.match(/"(?:channelId|externalId)":"(UC[A-Za-z0-9_-]{22})"/)?.[1] ?? null

const idsDePlaylist = (html) => [
  ...new Set([...html.matchAll(/"playlistId":"(PL[A-Za-z0-9_-]{16,})"/g)].map((m) => m[1])),
]

// --- Varredura ---------------------------------------------------------------

const alvos = SO ? CANAIS.filter((c) => c.especialidade === SO) : CANAIS
if (!alvos.length) {
  console.error(`Nenhum canal declarado para "${SO}". Especialidades com canal: ${[...new Set(CANAIS.map((c) => c.especialidade))].join(", ")}`)
  process.exit(1)
}

const resultados = []
const falhas = []

/** O título da playlist, que é o que serve de triagem. */
const tituloDaPagina = (html) =>
  html
    .match(/<meta property="og:title" content="([^"]*)"/)?.[1]
    ?.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .trim() ?? null

if (POR_PLAYLIST) {
  const porCanal = []

  for (const canal of alvos) {
    console.log(`\n${canal.instituicao}  (${canal.especialidade}, ${canal.idioma})`)

    const pagina = await baixar(`${canal.url.replace(/\/$/, "")}/playlists`)
    if (pagina.erro) {
      falhas.push(`${canal.instituicao}: ${pagina.erro}`)
      console.log(`  não consegui abrir: ${pagina.erro}`)
      continue
    }

    const ids = idsDePlaylist(pagina.html)
    console.log(`  playlists: ${ids.length}`)

    const playlists = []
    for (const id of ids) {
      const p = await baixar(`https://www.youtube.com/playlist?list=${id}`)
      await dormir(ESPERA_ENTRE_PEDIDOS_MS)
      if (p.erro) continue

      const videos = idsDeVideo(p.html)
      if (!videos.length) continue
      const titulo = tituloDaPagina(p.html)
      playlists.push({ id, titulo, videos })
      console.log(`    ${String(videos.length).padStart(3)}  ${titulo ?? id}`)
    }

    porCanal.push({
      especialidade: canal.especialidade,
      instituicao: canal.instituicao,
      idioma: canal.idioma,
      url: canal.url,
      playlists,
    })
  }

  // Com `--so`, preserva os canais que esta execução não varreu — mesma correção
  // que o modo de `/videos` já tinha, pelo mesmo motivo: escrever só o filtro
  // apagaria o resto do arquivo sem que nada acusasse.
  let todos = porCanal
  if (SO && existsSync(SAIDA_PLAYLISTS)) {
    try {
      const anterior = JSON.parse(await readFile(SAIDA_PLAYLISTS, "utf8"))
      const varridos = new Set(porCanal.map((c) => c.url))
      todos = [...(anterior.canais ?? []).filter((c) => !varridos.has(c.url)), ...porCanal]
    } catch {
      todos = porCanal
    }
  }

  await mkdir(PASTA, { recursive: true })
  await writeFile(
    SAIDA_PLAYLISTS,
    `${JSON.stringify(
      {
        colhidoEm: new Date().toISOString().slice(0, 10),
        comoFoiColhido:
          "playlists de cada canal, com o título de cada uma e os ids que ela contém. O título da playlist é a unidade de triagem; título por vídeo vem do npm run videos, quando o vídeo entrar numa célula.",
        canais: todos,
      },
      null,
      1,
    )}\n`,
  )

  const total = porCanal.reduce((n, c) => n + c.playlists.reduce((m, p) => m + p.videos.length, 0), 0)
  console.log(`\n${porCanal.length} canal(is), ${porCanal.reduce((n, c) => n + c.playlists.length, 0)} playlists, ${total} vídeos.`)
  if (falhas.length) {
    console.error(`\n${falhas.length} falha(s):`)
    for (const l of falhas) console.error(`  ${l}`)
  }
  console.log(`\nGravado em ${SAIDA_PLAYLISTS}.`)
  process.exit(0)
}

for (const canal of alvos) {
  console.log(`\n${canal.instituicao}  (${canal.especialidade}, ${canal.idioma})`)

  const pagina = await baixar(`${canal.url.replace(/\/$/, "")}/videos`)
  if (pagina.erro) {
    falhas.push(`${canal.instituicao}: ${pagina.erro}`)
    console.log(`  não consegui abrir: ${pagina.erro}`)
    continue
  }

  const identificador = idDoCanal(pagina.html)
  const ids = idsDeVideo(pagina.html)
  const playlists = idsDePlaylist(pagina.html)
  console.log(`  channelId=${identificador ?? "?"}  ids na primeira carga: ${ids.length}`)

  if (!ids.length) {
    falhas.push(`${canal.instituicao}: a página abriu mas não trouxe id nenhum — o formato do YouTube pode ter mudado`)
    console.log("  nenhum id — verifique o endereço do canal")
    continue
  }

  const videos = []
  let recusados = 0

  for (const id of ids) {
    const info = await oembed(id)
    await dormir(ESPERA_ENTRE_PEDIDOS_MS)
    if (info.erro) {
      recusados += 1
      continue
    }
    videos.push({ id, url: `https://www.youtube.com/watch?v=${id}`, titulo: info.titulo, canal: info.canal })
  }

  /**
   * A procedência é o nome do canal que o oEmbed devolveu, e não o endereço de
   * onde o id foi colhido. Um id que veio da página de um canal mas pertence a
   * outro é bloco de recomendação, e sai da lista aqui.
   */
  const nomeMaisComum = [...videos.reduce((conta, v) => conta.set(v.canal, (conta.get(v.canal) ?? 0) + 1), new Map())]
    .sort((a, b) => b[1] - a[1])[0]?.[0]

  const proprios = videos.filter((v) => v.canal === nomeMaisComum)
  const alheios = videos.length - proprios.length

  console.log(`  confirmados pelo oEmbed: ${proprios.length}   de terceiros, descartados: ${alheios}   sem resposta: ${recusados}`)
  console.log(`  canal segundo a API: ${nomeMaisComum ?? "?"}`)

  resultados.push({
    especialidade: canal.especialidade,
    instituicao: canal.instituicao,
    idioma: canal.idioma,
    url: canal.url,
    channelId: identificador,
    canalSegundoAApi: nomeMaisComum ?? null,
    playlists,
    videos: proprios.map(({ id, url, titulo }) => ({ id, url, titulo, revisado: false })),
  })
}

// --- Gravação ----------------------------------------------------------------

/**
 * Com `--so`, grava por cima só dos canais varridos — e preserva o resto.
 *
 * A primeira versão escrevia `resultados` direto. Numa varredura completa isso
 * está certo; com `--so dislexia`, apagaria os candidatos das outras cinco
 * especialidades e o arquivo ficaria menor sem que nada acusasse. É o mesmo
 * defeito de ler-modificar-escrever que já custou um vídeo em `videos.mjs`, e a
 * correção é a mesma: reler antes de gravar e aplicar só o que esta execução
 * apurou.
 */
async function juntarComOQueJaHavia(novos) {
  if (!SO || !existsSync(SAIDA)) return novos
  try {
    const anterior = JSON.parse(await readFile(SAIDA, "utf8"))
    const varridos = new Set(novos.map((c) => c.url))
    const preservados = (anterior.canais ?? []).filter((c) => !varridos.has(c.url))
    return [...preservados, ...novos]
  } catch {
    return novos
  }
}

const todosOsCanais = await juntarComOQueJaHavia(resultados)

await mkdir(PASTA, { recursive: true })
await writeFile(
  SAIDA,
  `${JSON.stringify(
    {
      colhidoEm: new Date().toISOString().slice(0, 10),
      comoFoiColhido:
        'ids lidos de "videoId" no HTML bruto da aba /videos de cada canal; procedência confirmada pelo oEmbed. Duração não é colhida aqui — vem do npm run videos quando o vídeo entrar numa célula.',
      canais: todosOsCanais,
    },
    null,
    1,
  )}\n`,
)

// --- Relatório ---------------------------------------------------------------

// O resumo conta o **arquivo**, e não esta execução. Contar só o que acabou de
// ser varrido faria `--so tdah` anunciar que dislexia está sem candidato nenhum,
// com 51 candidatos de dislexia gravados ao lado.
console.log("\n— resumo do arquivo —")
const porEspecialidade = new Map()
for (const r of todosOsCanais) {
  porEspecialidade.set(r.especialidade, (porEspecialidade.get(r.especialidade) ?? 0) + r.videos.length)
}
for (const [especialidade, quantos] of [...porEspecialidade].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${especialidade.padEnd(26)} ${String(quantos).padStart(3)} candidatos`)
}

const semNada = [...new Set(CANAIS.map((c) => c.especialidade))].filter((e) => !porEspecialidade.get(e))
if (semNada.length) console.log(`\nSem candidato nenhum: ${semNada.join(", ")}`)

if (falhas.length) {
  console.error(`\n${falhas.length} canal(is) não deram certo:`)
  for (const linha of falhas) console.error(`  ${linha}`)
}

console.log(`\nGravado em ${SAIDA}. Nenhum vídeo foi escolhido: a curadoria é de quem assiste.`)
