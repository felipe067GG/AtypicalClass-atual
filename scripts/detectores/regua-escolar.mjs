/**
 * Reconfere a régua escolar contra o corpus de onde ela saiu.
 *
 * `rodar.mjs` reimprime os percentis do ENEM a cada execução, para que o dia em
 * que o acervo crescer e a distribuição andar isso apareça. `LIMIARES_ESCOLARES`
 * merecia o mesmo, e sem este script mereceria mais: os números foram medidos
 * uma vez, em 11/08/2026, sobre um corpus que **não está versionado** — são 25
 * MB de PDF de fonte pública, baixados sob demanda.
 *
 * Sem isto, a régua escolar seria a única coisa do projeto cuja origem não dá
 * para reconstruir, o que é exatamente o defeito que o resto do acervo evita.
 *
 * Uso:  npm run regua:escolar
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { extrairTexto } from "../bncc/extrair-pdf.mjs"
import { LIMIARES, LIMIARES_ESCOLARES, PERCENTIS, medidas, barreirasDe, IDS } from "./medir.mjs"

const CACHE = join(process.cwd(), "data", "encceja")

/**
 * As provas do Encceja Ensino Fundamental que existem publicadas.
 *
 * São duas convenções de endereço e **só dois anos**. Procurei 2017, 2019,
 * 2021, 2022, 2023 e 2024 nos dois padrões, e nenhum responde — o que 2019
 * devolve é uma página de erro de 3 KB, que um script desatento grava como se
 * fosse PDF e depois lê como "este ano não tem questão nenhuma". Por isso a
 * conferência de assinatura `%PDF` abaixo.
 *
 * Língua Portuguesa só existe em 2020: o caderno de 2018 que junta Português,
 * Língua Estrangeira, Artes e Educação Física está publicado sob outro nome que
 * não achei. Fica declarado para ninguém procurar de novo achando que esqueci.
 */
const NOVO = "https://download.inep.gov.br/encceja/provas_e_gabaritos"
const ANTIGO = "https://download.inep.gov.br/educacao_basica/encceja/provas/brasil"

const PROVAS = [
  { arquivo: "2020_matematica.pdf", url: `${NOVO}/2020_PV_EF_matematica.pdf` },
  { arquivo: "2020_ciencias_naturais.pdf", url: `${NOVO}/2020_PV_EF_ciencias_naturais.pdf` },
  { arquivo: "2020_lingua_portuguesa.pdf", url: `${NOVO}/2020_PV_EF_lingua_portuguesa.pdf` },
  { arquivo: "2020_historia_geografia.pdf", url: `${NOVO}/2020_PV_EF_historia_geografia.pdf` },
  { arquivo: "2018_matematica.pdf", url: `${ANTIGO}/2018/fundamental/ensino_fundamental_matematica_aplicacao_regular.pdf` },
  {
    arquivo: "2018_ciencias_naturais.pdf",
    url: `${ANTIGO}/2018/fundamental/ensino_fundamental_ciencias_naturais_aplicacao_regular.pdf`,
  },
  {
    arquivo: "2018_historia_e_geografia.pdf",
    url: `${ANTIGO}/2018/fundamental/ensino_fundamental_historia_e_geografia_aplicacao_regular.pdf`,
  },
]

/** Cabeçalho, rodapé e código de barras, que o extrator devolve no meio da frase. */
const RUIDO = /\s*(?:ENCCEJA\s*\d{0,4}|\*?\d{6,}\*?|P[áa]gina\s*\d+)\s*/g

/**
 * Quebra a prova em questões.
 *
 * O Encceja usa **quatro** alternativas, A a D, e o extrator entrega tudo
 * corrido. O corte entre enunciado e alternativas é o primeiro ponto onde
 * aparece um " A " seguido de texto e, adiante, um " B " — sem esse corte, as
 * alternativas entram na conta do enunciado e `caracteresAlternativas` mede
 * zero, que era como a distribuição sairia errada sem ninguém notar.
 */
function questoesDe(texto) {
  const questoes = []
  for (const parte of texto.replace(RUIDO, " ").split(/QUEST[ÃA]O\s*/i).slice(1)) {
    const casa = parte.match(/^\s*(\d{1,3})\b/)
    if (!casa) continue
    const corpo = parte.slice(casa[0].length)
    const corte = corpo.search(/(?:^|\s)A\s+\S.{0,400}?\sB\s+\S/s)
    const enunciado = (corte > 0 ? corpo.slice(0, corte) : corpo).replace(/\s+/g, " ").trim()
    const alternativas = (corte > 0 ? corpo.slice(corte) : "")
      .split(/(?:^|\s)(?=[A-D]\s+\S)/)
      .map((t) => t.replace(/^[A-D]\s+/, "").replace(/\s+/g, " ").trim())
      .filter((t) => t.length > 1)
      .slice(0, 4)
    if (enunciado.length > 60) {
      questoes.push({ numero: Number(casa[1]), enunciado, alternativas: alternativas.map((texto) => ({ texto })) })
    }
  }
  return questoes
}

async function baixar(prova) {
  await mkdir(CACHE, { recursive: true })
  const destino = join(CACHE, prova.arquivo)
  try {
    const cache = await readFile(destino)
    if (cache.subarray(0, 4).toString() === "%PDF") return cache
  } catch {
    // ainda não está em cache
  }
  for (let tentativa = 1; tentativa <= 3; tentativa += 1) {
    try {
      const resposta = await fetch(prova.url, { headers: { "User-Agent": "Mozilla/5.0" } })
      if (resposta.ok) {
        const corpo = Buffer.from(await resposta.arrayBuffer())
        // Assinatura, e não tamanho: o INEP devolve HTML de erro com 200.
        if (corpo.subarray(0, 4).toString() === "%PDF") {
          await writeFile(destino, corpo)
          return corpo
        }
      }
    } catch {
      // o INEP corta a conexão quando está limitando
    }
    if (tentativa < 3) await new Promise((r) => setTimeout(r, 15_000 * tentativa))
  }
  return null
}

const corpus = []
let faltando = 0
for (const prova of PROVAS) {
  const bytes = await baixar(prova)
  if (!bytes) {
    console.log(`  ${prova.arquivo.padEnd(30)} não baixou`)
    faltando += 1
    continue
  }
  const { texto, paginasLidas, paginasTotais } = extrairTexto(bytes)
  const questoes = questoesDe(texto)
  console.log(`  ${prova.arquivo.padEnd(30)} ${paginasLidas}/${paginasTotais} páginas, ${questoes.length} questões`)
  corpus.push(...questoes)
}

if (!corpus.length) {
  console.error("\nNenhuma prova disponível — a régua não pode ser conferida agora.")
  process.exit(1)
}

const p = (valores, q) => {
  const s = [...valores].sort((a, b) => a - b)
  return s[Math.floor((s.length - 1) * q)]
}

const dist = { caracteres: [], palavrasPorFrase: [], caracteresAlternativas: [], numeros: [], densidadeVocabulario: [] }
const conta = Object.fromEntries(IDS.map((id) => [id, 0]))
let semBarreira = 0

for (const questao of corpus) {
  const m = medidas(questao)
  for (const chave of Object.keys(dist)) dist[chave].push(m[chave])
  const barreiras = barreirasDe(m, LIMIARES_ESCOLARES)
  for (const b of barreiras) conta[b] += 1
  if (!barreiras.length) semBarreira += 1
}

console.log(`\nCorpus: ${corpus.length} questões do Encceja Ensino Fundamental${faltando ? ` (${faltando} prova(s) faltando)` : ""}`)
console.log(`Sem barreira nenhuma, na régua escolar: ${semBarreira} (${((semBarreira / corpus.length) * 100).toFixed(0)}%)\n`)

console.table(
  IDS.map((id) => ({ barreira: id, questoes: conta[id], "%": `${((conta[id] / corpus.length) * 100).toFixed(0)}%` })),
)

/**
 * O quanto a distribuição de hoje anda em relação ao que está declarado.
 *
 * `figura-essencial` fica de fora da conta: o texto sai de PDF e imagem não
 * atravessa, então ele dá 0% aqui por limitação do extrator e não do material.
 */
console.log("percentis de hoje, contra o que está declarado em medir.mjs:")
const linhas = []
let andou = false
for (const [medida, valores] of Object.entries(dist)) {
  const declarado = PERCENTIS.escolar[medida]
  const hoje = { 25: p(valores, 0.25), 50: p(valores, 0.5), 75: p(valores, 0.75), 90: p(valores, 0.9), 95: p(valores, 0.95) }
  const limiar = LIMIARES_ESCOLARES[medida]
  const marco = medida === "densidadeVocabulario" ? 90 : 75
  const deriva = declarado[marco] ? Math.abs(hoje[marco] - declarado[marco]) / declarado[marco] : 0
  if (deriva > 0.1) andou = true
  linhas.push({
    medida,
    "p75 hoje": hoje[75],
    "p75 declarado": declarado[75],
    "p90 hoje": hoje[90],
    "p90 declarado": declarado[90],
    "limiar escolar": limiar,
    "limiar ENEM": LIMIARES[medida],
    deriva: `${(deriva * 100).toFixed(0)}%`,
  })
}
console.table(linhas)

if (andou) {
  console.error("\nA distribuição andou mais de 10% em alguma medida. Atualize PERCENTIS e LIMIARES_ESCOLARES em medir.mjs.")
  process.exit(1)
}
console.log("A régua escolar continua descrevendo o corpus de onde saiu.")
