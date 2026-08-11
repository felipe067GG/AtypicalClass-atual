/**
 * Verificador de links externos.
 *
 * Motivo de existir: o site prometia PDFs que não existiam e citava fontes sem
 * link. Agora todo material externo tem URL — e link morto tem que virar erro
 * aqui, não surpresa para o professor no meio da aula.
 *
 * Uso:  node scripts/check-links.mjs
 * Sai com código 1 se algum link falhar, para poder rodar no CI.
 */
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

const DIRS = ["lib/specialty-data", "lib/adaptacao", "lib/conteudos", "lib", "data/conteudos"]

/**
 * A biblioteca de conteúdos mora em JSON, e não em `.ts`.
 *
 * Ela ficou em `data/conteudos/` pelo mesmo motivo que o acervo de questões:
 * são centenas de registros, e um arquivo TypeScript de trezentos conteúdos não
 * se revisa. Mas as fontes deles precisam passar por aqui exatamente como as
 * dos guias — a regra do site é uma só, e conteúdo em outro formato não é
 * conteúdo com outra regra.
 */
const EXTENSAO_POR_DIR = { "data/conteudos": ".json" }

/**
 * Endereços que não são fonte e não devem ser cobrados como tal.
 *
 * O YouTube tem verificador próprio (`npm run videos`), que confere existência,
 * título, canal e duração pela API — e ainda exige que alguém tenha assistido
 * antes de publicar. Cobrar os mesmos endereços aqui duplicaria a checagem e
 * traria os 429 do YouTube para dentro de um script que derruba o build.
 */
const IGNORADOS = [/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i]

/**
 * Os endereços de vídeo dos conteúdos, que também não são fonte.
 *
 * A regra acima resolvia isto por domínio, e resolvia porque todo vídeo era do
 * YouTube. Desde que o vídeo pode estar em qualquer lugar da internet, casar por
 * domínio deixou de valer: um webinar em Vimeo ou uma aula de campus virtual
 * cairia aqui como se fosse fonte de afirmação pedagógica, seria cobrado duas
 * vezes e traria o 429 do provedor para dentro de um script que derruba o build.
 *
 * O critério certo nunca foi o domínio, e sim **onde o endereço está no
 * conteúdo**: `videos[].url` tem verificador próprio, `fontes[].url` não. Por
 * isso a exclusão passa a ser lida da estrutura do JSON.
 */
async function urlsDeVideo() {
  const enderecos = new Set()

  let entries = []
  try {
    entries = await readdir("data/conteudos", { withFileTypes: true })
  } catch {
    return enderecos
  }

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue
    let acervo
    try {
      acervo = JSON.parse(await readFile(join("data/conteudos", entry.name), "utf8"))
    } catch {
      continue
    }
    for (const conteudo of acervo.conteudos ?? []) {
      for (const video of conteudo.videos ?? []) {
        if (video?.url) enderecos.add(video.url)
      }
    }
  }

  return enderecos
}
const TIMEOUT_MS = 20000
const CONCURRENCY = 10

/**
 * Fontes que bloqueiam o verificador, confirmadas à mão.
 *
 * Estes endereços respondem 403 a qualquer requisição automatizada — é
 * bloqueio de robô, não link quebrado. Cada um foi aberto no navegador pelo
 * mantenedor em 08/08/2026 e confirmado como existente.
 *
 * Duas restrições mantêm a exceção honesta:
 *
 *  1. Vale por URL exata, não por domínio. Qualquer outra página do mesmo site
 *     continua precisando passar pela verificação normal — a confirmação foi
 *     destas páginas, não de tudo que a instituição publica.
 *  2. Só o 403 é perdoado. Se um destes endereços passar a responder 404, erro
 *     de DNS ou timeout, volta a ser falha — porque aí não é mais bloqueio de
 *     robô, é link morto.
 */
const CONFIRMED_BLOCKED = new Map([
  ["https://dyslexiaida.org/", "International Dyslexia Association"],
  ["https://www.perkins.org/", "Perkins School for the Blind"],
  // A NAGC respondeu 206 normalmente na verificação de 08/08/2026. Fica na
  // lista porque bloqueio de robô costuma variar com o ponto de saída e com o
  // horário: se voltar a 403, a fonte confirmada não derruba o build.
  ["https://www.nagc.org/", "National Association for Gifted Children"],
  ["https://www.asha.org/", "American Speech-Language-Hearing Association"],
  ["https://www.nationaldb.org/about-us/ncdb-services/", "National Center on Deafblindness"],
  // Portal do Professor do MEC — responde 403 a qualquer requisição
  // automatizada. Confirmado no navegador pelo mantenedor em 09/08/2026.
  // Vale só para esta página; qualquer outra do mesmo site continua passando
  // pela verificação normal.
  ["https://portaldoprofessor.mec.gov.br/", "Portal do Professor (MEC)"],
  // Acervos digitais da Biblioteca Nacional e do IBGE. Todos respondem 403 a
  // requisição automatizada e foram abertos no navegador pelo mantenedor em
  // 09/08/2026. Como as demais, a exceção vale por endereço exato.
  // A Hemeroteca (`memoria.bn.gov.br`) e a BNDigital saíram daqui em 10/08/2026:
  // o próprio verificador as apontou como exceções sem link correspondente, e
  // uma busca no repositório confirmou que nenhum conteúdo as cita. Exceção que
  // não protege nada é ruído numa lista que só serve enquanto for curta — se
  // algum conteúdo voltar a usá-las, o 403 traz o assunto de volta.
  ["https://brasilianafotografica.bn.gov.br/", "Brasiliana Fotográfica (Biblioteca Nacional)"],
  ["https://educa.ibge.gov.br/", "IBGE Educa"],
  // Domínio Público — biblioteca do MEC com obras literárias de domínio
  // público. Confirmado no navegador pelo mantenedor em 09/08/2026.
  ["https://www.dominiopublico.gov.br/", "Domínio Público (MEC)"],
])

async function collectUrls() {
  const found = new Map() // url -> Set(arquivo)
  const deVideo = await urlsDeVideo()

  for (const dir of DIRS) {
    let entries = []
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      continue
    }

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(EXTENSAO_POR_DIR[dir] ?? ".ts")) continue
      const path = join(dir, entry.name)
      const src = await readFile(path, "utf8")
      for (const match of src.matchAll(/"(https?:\/\/[^"\s]+)"/g)) {
        const url = match[1]
        if (IGNORADOS.some((padrao) => padrao.test(url))) continue
        if (deVideo.has(url)) continue
        if (!found.has(url)) found.set(url, new Set())
        found.get(url).add(path)
      }
    }
  }

  return found
}

/**
 * Tenta algumas vezes antes de condenar um link.
 *
 * Sem isto, uma oscilação de rede vira "link quebrado" e derruba o build por
 * motivo que não existe. Aconteceu com o texto da lei no Planalto: responde 200
 * com retentativa e falhava aqui na primeira tentativa. Um verificador que
 * acusa falso positivo é pior que nenhum, porque ensina a ignorá-lo.
 */
const TENTATIVAS = 3

async function check(url) {
  let ultimo = null

  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa += 1) {
    ultimo = await tentar(url)
    // Só insiste quando a falha é de transporte ou do servidor. 404 e 403 são
    // respostas, e repetir não muda o que dizem.
    const valeRepetir = !ultimo.ok && (ultimo.status === 0 || ultimo.status >= 500)
    if (!valeRepetir) return ultimo
    if (tentativa < TENTATIVAS) await new Promise((resolve) => setTimeout(resolve, 1500 * tentativa))
  }

  return ultimo
}

async function tentar(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    // Alguns servidores recusam HEAD, então usamos GET — mas pedindo apenas o
    // primeiro byte. Sem isto o verificador baixa o arquivo inteiro: um dos
    // PDFs do MEC tem 14 MB, e a checagem completa passava de 10 minutos.
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "AtypicalClass-LinkCheck/1.0", Range: "bytes=0-0" },
    })
    // Descarta o corpo sem lê-lo, liberando a conexão de imediato.
    response.body?.cancel().catch(() => {})
    const type = response.headers.get("content-type") ?? ""

    // Muitos servidores respondem 200 com uma página de erro em HTML para
    // caminhos inexistentes — o "soft 404". Um .pdf que volta como text/html
    // é link quebrado, mesmo com status 200. Sem esta checagem o verificador
    // aprova link errado, que foi como um PDF inexistente quase entrou no ar.
    if (response.ok && /\.pdf($|\?)/i.test(new URL(url).pathname) && !type.includes("pdf")) {
      return { ok: false, status: response.status, type, error: `esperado PDF, veio ${type.split(";")[0]}` }
    }

    // Bloqueio de robô em fonte já confirmada no navegador: passa, mas o
    // relatório diz que passou por exceção, não por ter respondido.
    if (response.status === 403 && CONFIRMED_BLOCKED.has(url)) {
      return { ok: true, status: 403, type, confirmed: true }
    }

    return { ok: response.ok, status: response.status, type }
  } catch (error) {
    return { ok: false, status: 0, type: "", error: error.name === "AbortError" ? "timeout" : error.message }
  } finally {
    clearTimeout(timer)
  }
}

const urls = await collectUrls()
console.log(`Verificando ${urls.size} links externos...\n`)

const entries = [...urls.entries()]
const failures = []

for (let i = 0; i < entries.length; i += CONCURRENCY) {
  const batch = entries.slice(i, i + CONCURRENCY)
  const results = await Promise.all(
    batch.map(async ([url, files]) => ({ url, files, result: await check(url) })),
  )

  for (const { url, files, result } of results) {
    const mark = result.ok ? "  ok  " : " FALHA"
    const detail = result.confirmed ? "403 conf" : result.ok ? String(result.status) : `${result.status || result.error}`
    console.log(`${mark} ${detail.padEnd(8)} ${url}`)
    if (!result.ok) failures.push({ url, files: [...files], detail })
  }
}

// Exceção que não corresponde a nenhum link em uso é exceção esquecida —
// avisa para que a lista não vire um depósito de permissões sem dono.
const orphans = [...CONFIRMED_BLOCKED.keys()].filter((url) => !urls.has(url))
if (orphans.length) {
  console.log(`\nExceções sem link correspondente (remova de CONFIRMED_BLOCKED):`)
  for (const url of orphans) console.log(`  ${url}`)
}

if (failures.length) {
  console.log(`\n${failures.length} link(s) com problema:\n`)
  for (const failure of failures) {
    console.log(`  ${failure.url}`)
    console.log(`    motivo: ${failure.detail}`)
    console.log(`    em: ${failure.files.join(", ")}`)
  }
  process.exit(1)
}

console.log(`\nTodos os ${urls.size} links responderam.`)
