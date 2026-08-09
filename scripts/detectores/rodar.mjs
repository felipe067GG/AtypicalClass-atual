/**
 * Roda os detectores nas 3.495 questões e grava o resultado.
 *
 * Saída: `data/barreiras.json`, uma entrada por questão, com as medidas e as
 * barreiras que elas configuram. O arquivo é derivado — dá para apagar e
 * regerar a qualquer momento — e existe para que o site e a futura migração do
 * Supabase leiam número pronto em vez de recalcular texto a cada requisição.
 *
 * Também imprime os percentis atuais ao lado dos limiares fixados em
 * `medir.mjs`. É o que impede o limiar de envelhecer em silêncio: se o acervo
 * crescer e a distribuição andar, a diferença aparece aqui.
 *
 * Sai com código 1 se algo estiver errado, para poder rodar no CI ao lado do
 * `conferir.mjs` e do `check:links`.
 *
 * Uso:  node scripts/detectores/rodar.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { IDS, LIMIARES, medir } from "./medir.mjs"

const PASTAS = [join("data", "enem"), join("data", "vestibular")]
const SAIDA = join(process.cwd(), "data", "barreiras.json")
const VOCABULARIO = join(process.cwd(), "lib", "adaptacao", "barreiras.ts")

const problemas = []

/**
 * Lê um arquivo de código-fonte já com quebra de linha normalizada.
 *
 * No Windows, `core.autocrlf` grava CRLF na cópia de trabalho embora o índice
 * guarde LF — então o arquivo que o site compila e o que este script lê têm
 * bytes diferentes. Uma expressão ancorada em `\n\n` deixa de casar, e o efeito
 * não é o script falhar: é ele ler o vocabulário como vazio e acusar que
 * *nenhum* dos oito detectores existe em `barreiras.ts`. Foi exatamente isso
 * que aconteceu depois de trocar de branch, e a leitura do erro apontava para o
 * lugar errado — o vocabulário estava intacto.
 *
 * Normalizar na leitura é mais barato do que lembrar de escrever `\r?\n` em
 * cada expressão nova, e vale para as três fontes lidas aqui.
 */
const lerFonte = async (caminho) => (await readFile(caminho, "utf8")).replace(/\r\n/g, "\n")

// --- Carregar o acervo -------------------------------------------------------

async function carregar() {
  const questoes = []

  for (const pasta of PASTAS) {
    const arquivos = (await readdir(pasta)).filter((n) => n.endsWith(".json"))

    for (const arquivo of arquivos) {
      const conteudo = JSON.parse(await readFile(join(pasta, arquivo), "utf8"))
      // `materias-lidas.json` mora na mesma pasta e não é acervo: é o mapa de
      // classificação manual. Reconhecê-lo pela forma, e não pelo nome, evita
      // que o próximo arquivo auxiliar quebre este script.
      if (!Array.isArray(conteudo)) continue
      for (const questao of conteudo) questoes.push({ questao, arquivo: join(pasta, arquivo) })
    }
  }

  return questoes
}

/**
 * Identidade estável de uma questão.
 *
 * Precisa sobreviver a uma reimportação: se o `importar.mjs` rodar de novo e a
 * ordem dos arquivos mudar, a chave tem que continuar apontando para a mesma
 * questão, ou as medidas gravadas passam a descrever outra.
 *
 * Os dois campos que parecem redundantes não são. `prova` separa os dois dias
 * da UNICAMP, que reiniciam a numeração em 1 — sem ele, 143 questões de 2021
 * virariam 72. E `idioma` separa as questões de língua estrangeira do ENEM, que
 * ocupam a mesma posição em inglês e em espanhol com enunciados diferentes.
 */
function identidade(questao) {
  const { exame, ano, prova } = questao.fonte ?? {}
  return [exame, ano, prova, questao.numero, questao.idioma].filter(Boolean).join("-")
}

const acervo = await carregar()

// --- Medir -------------------------------------------------------------------

const vistas = new Set()
const registros = []

for (const { questao, arquivo } of acervo) {
  const id = identidade(questao)

  if (!questao.fonte?.exame || !questao.fonte?.ano) {
    problemas.push(`${arquivo} q${questao.numero}: procedência incompleta, sem identidade estável`)
    continue
  }
  if (vistas.has(id)) {
    problemas.push(`${arquivo} q${questao.numero}: identidade repetida (${id})`)
    continue
  }
  vistas.add(id)

  const { medidas, barreiras } = medir(questao)

  for (const barreira of barreiras) {
    if (!IDS.includes(barreira)) problemas.push(`${id}: barreira desconhecida "${barreira}"`)
  }

  registros.push({
    id,
    exame: questao.fonte.exame,
    ano: questao.fonte.ano,
    numero: questao.numero,
    materia: questao.materia ?? null,
    barreiras,
    medidas,
  })
}

// --- Conferir que os dois lados não derivaram --------------------------------

/**
 * O vocabulário das barreiras existe em dois lugares por necessidade: em
 * TypeScript, onde o site lê, e aqui em `.mjs`, onde o Node roda sem etapa de
 * build. Duplicação sem conferência é o começo de uma divergência silenciosa —
 * um id renomeado de um lado só, e a matriz deixa de casar com o detector sem
 * ninguém notar, porque nada quebra: a barreira simplesmente para de aparecer.
 *
 * A leitura é de texto, não de módulo, justamente porque não há como importar
 * `.ts` daqui. É o preço de não ter build nos scripts, e a conferência é o que
 * torna esse preço aceitável.
 */
const fonteDoVocabulario = await lerFonte(VOCABULARIO)
const uniao = fonteDoVocabulario.match(/export type BarreiraId =([\s\S]*?)\n\n/)?.[1] ?? ""
const idsNoTypeScript = [...uniao.matchAll(/"([a-z-]+)"/g)].map((m) => m[1])

for (const id of IDS) {
  if (!idsNoTypeScript.includes(id)) problemas.push(`detector "${id}" não existe em BarreiraId (barreiras.ts)`)
}
for (const id of idsNoTypeScript) {
  if (!IDS.includes(id)) problemas.push(`BarreiraId "${id}" não tem detector em medir.mjs`)
}

const declaradas = [...fonteDoVocabulario.matchAll(/^\s*id: "([a-z-]+)",$/gm)].map((m) => m[1])
for (const id of idsNoTypeScript) {
  if (!declaradas.includes(id)) problemas.push(`BarreiraId "${id}" não tem entrada descrita em BARREIRAS`)
}

/**
 * A matriz é conferida aqui porque aqui é onde a conferência roda.
 *
 * `conferirMatriz()`, em `lib/adaptacao/index.ts`, é a versão tipada e é o que
 * o site usa. Mas ela é TypeScript, e não há etapa de build nos scripts — se a
 * verificação existisse só lá, ela nunca rodaria em lugar nenhum, e um
 * verificador que ninguém chama não protege nada. As duas fazem a mesma
 * pergunta: toda célula tem fonte, e apontam para barreira e especialidade que
 * existem de verdade?
 */
const MATRIZ_TS = join(process.cwd(), "lib", "adaptacao", "matriz.ts")
const ESPECIALIDADES_TS = join(process.cwd(), "lib", "specialties.ts")

const fonteDaMatriz = await lerFonte(MATRIZ_TS)
const slugs = [...(await lerFonte(ESPECIALIDADES_TS)).matchAll(/^\s*slug: "([a-z-]+)",$/gm)].map((m) => m[1])

const celulas = [
  ...fonteDaMatriz.matchAll(
    /barreira: "([a-z-]+)",\s*\n\s*especialidade: "([a-z-]+)",([\s\S]*?)citations: \[([^\]]*)\]/g,
  ),
].map(([, barreira, especialidade, , citacoes]) => ({ barreira, especialidade, citacoes: citacoes.trim() }))

const paresVistos = new Set()
for (const celula of celulas) {
  const onde = `${celula.barreira} × ${celula.especialidade}`
  if (!IDS.includes(celula.barreira)) problemas.push(`matriz ${onde}: barreira não tem detector`)
  if (!slugs.includes(celula.especialidade)) problemas.push(`matriz ${onde}: especialidade não existe em SPECIALTIES`)
  if (!celula.citacoes) problemas.push(`matriz ${onde}: célula sem fonte`)

  const par = `${celula.barreira}|${celula.especialidade}`
  if (paresVistos.has(par)) problemas.push(`matriz ${onde}: célula duplicada`)
  paresVistos.add(par)
}

const semCelula = slugs.filter((slug) => !celulas.some((c) => c.especialidade === slug))

// --- Relatório ---------------------------------------------------------------

const percentil = (valores, p) => {
  const ordenados = [...valores].sort((a, b) => a - b)
  return ordenados[Math.min(ordenados.length - 1, Math.floor(ordenados.length * p))]
}

const medidaDe = (campo) => registros.map((r) => r.medidas[campo])

console.log(`Questões medidas: ${registros.length}`)
console.log("")
console.log("Limiar fixado × percentil de hoje")
const conferencias = [
  ["caracteres", "caracteres", LIMIARES.caracteres, 0.75, "p75"],
  ["palavras por frase", "palavrasPorFrase", LIMIARES.palavrasPorFrase, 0.75, "p75"],
  ["alternativas (chars)", "caracteresAlternativas", LIMIARES.caracteresAlternativas, 0.75, "p75"],
  ["números distintos", "numeros", LIMIARES.numeros, 0.75, "p75"],
  ["vocabulário denso", "densidadeVocabulario", LIMIARES.densidadeVocabulario, 0.9, "p90"],
]

for (const [rotulo, campo, limiar, p, nome] of conferencias) {
  const atual = percentil(medidaDe(campo), p)
  const distante = Math.abs(atual - limiar) > Math.max(limiar * 0.1, 0.5)
  const aviso = distante ? "  ← andou mais de 10%, vale rever o limiar" : ""
  console.log(`  ${rotulo.padEnd(22)} limiar ${String(limiar).padStart(6)}   ${nome} ${String(atual).padStart(6)}${aviso}`)
}

console.log("")
console.log("Barreiras encontradas")
for (const id of IDS) {
  const n = registros.filter((r) => r.barreiras.includes(id)).length
  const pct = ((n / registros.length) * 100).toFixed(1)
  console.log(`  ${id.padEnd(24)} ${String(n).padStart(5)}  (${pct}%)`)
}

const semBarreira = registros.filter((r) => r.barreiras.length === 0).length
const porQuantidade = {}
for (const r of registros) porQuantidade[r.barreiras.length] = (porQuantidade[r.barreiras.length] ?? 0) + 1

console.log("")
console.log(`Sem barreira nenhuma: ${semBarreira} (${((semBarreira / registros.length) * 100).toFixed(1)}%)`)
console.log(`Barreiras por questão: ${JSON.stringify(porQuantidade)}`)

// A figura sem descrição é a única barreira que não é dificuldade, e sim
// indisponibilidade: sem audiodescrição, a questão não existe para quem não vê.
const comFigura = registros.filter((r) => r.medidas.temFigura)
const semDescricao = comFigura.filter((r) => !r.medidas.temDescricaoDeFigura)
console.log("")
console.log(`Com figura: ${comFigura.length} — sem audiodescrição: ${semDescricao.length}`)

console.log("")
console.log(`Matriz: ${celulas.length} células de ${IDS.length * slugs.length} pares possíveis`)
console.log(
  semCelula.length
    ? `  Especialidades ainda sem nenhuma célula: ${semCelula.join(", ")}`
    : "  Todas as 14 especialidades têm ao menos uma célula.",
)

// Quantas questões o professor consegue adaptar hoje, por especialidade: aquelas
// em que ao menos uma barreira detectada tem célula escrita. É o número que diz
// se a matriz saiu do papel — cobertura de células não serve, porque uma célula
// de barreira rara vale menos que uma de barreira frequente.
console.log("")
console.log("Questões com ao menos uma orientação escrita, por especialidade")
for (const slug of slugs) {
  const barreirasDaEspecialidade = celulas.filter((c) => c.especialidade === slug).map((c) => c.barreira)
  const alcance = registros.filter((r) => r.barreiras.some((b) => barreirasDaEspecialidade.includes(b))).length
  const pct = ((alcance / registros.length) * 100).toFixed(0)
  console.log(`  ${slug.padEnd(24)} ${String(alcance).padStart(5)}  (${pct}%)`)
}

/**
 * Um detector que dispara em tudo não informa nada.
 *
 * O valor de uma barreira está em separar questões, e uma que aparecesse em
 * 90% do acervo diria ao professor apenas que existem questões. É a falha que
 * derrubou o detector de comando negativo em sua primeira versão, e o teto aqui
 * é o que impede a próxima de passar despercebida.
 */
for (const id of IDS) {
  const fracao = registros.filter((r) => r.barreiras.includes(id)).length / registros.length
  if (fracao > 0.6) problemas.push(`barreira "${id}" dispara em ${(fracao * 100).toFixed(0)}% do acervo — não separa nada`)
  if (fracao < 0.01) problemas.push(`barreira "${id}" dispara em ${(fracao * 100).toFixed(1)}% do acervo — não é barreira deste acervo`)
}

// --- Gravar ------------------------------------------------------------------

if (problemas.length) {
  console.log(`\n${problemas.length} problema(s):`)
  for (const p of problemas.slice(0, 30)) console.log(`  ${p}`)
  if (problemas.length > 30) console.log(`  ... e mais ${problemas.length - 30}`)
  console.log("\nNada foi gravado.")
  process.exit(1)
}

await writeFile(SAIDA, `${JSON.stringify(registros, null, 2)}\n`, "utf8")
console.log(`\nGravado em ${SAIDA}`)
