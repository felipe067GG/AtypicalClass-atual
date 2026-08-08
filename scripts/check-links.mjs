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

const DIRS = ["lib/specialty-data", "lib"]
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
])

async function collectUrls() {
  const found = new Map() // url -> Set(arquivo)

  for (const dir of DIRS) {
    let entries = []
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      continue
    }

    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".ts")) continue
      const path = join(dir, entry.name)
      const src = await readFile(path, "utf8")
      for (const match of src.matchAll(/"(https?:\/\/[^"\s]+)"/g)) {
        const url = match[1]
        if (!found.has(url)) found.set(url, new Set())
        found.get(url).add(path)
      }
    }
  }

  return found
}

async function check(url) {
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
