/**
 * Importa questões de vestibular a partir do BLUEX.
 *
 * O BLUEX é um conjunto acadêmico com as provas da USP e da UNICAMP, montado
 * para avaliar modelos de linguagem, e traz o que o ENEM não tem: **matéria
 * oficial**. Ali a própria banca divide a prova por disciplina, então o rótulo
 * não é interpretação nossa — é o que a instituição imprimiu.
 *
 * Há uma diferença de rigor em relação ao acervo do ENEM, e ela fica gravada
 * em cada questão em vez de escondida no meio dos dados. No ENEM, a resposta
 * passa por duas fontes independentes que precisam concordar: a API pública e
 * o gabarito publicado pelo INEP nos microdados. Aqui existe uma fonte só. O
 * BLUEX é sério e citável, mas "uma fonte" e "duas fontes que concordam" não
 * são a mesma coisa, e quem for usar isto merece saber qual está lendo.
 *
 * Uso:  node scripts/import-vestibular/importar.mjs
 */
import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

const FONTE = "https://datasets-server.huggingface.co/rows"
const DATASET = "portuguese-benchmark-datasets%2FBLUEX"
const TOTAL = 1422
const PAGINA = 100

/** As matérias do BLUEX vêm em inglês; o acervo fala português. */
const MATERIAS = {
  portuguese: "Português",
  mathematics: "Matemática",
  history: "História",
  geography: "Geografia",
  physics: "Física",
  biology: "Biologia",
  chemistry: "Química",
  english: "Inglês",
  philosophy: "Filosofia",
  sociology: "Sociologia",
}

/**
 * As alternativas chegam como texto corrido, com a letra embutida:
 * `"a) indicam a complexidade musical…"`. Separar a letra do conteúdo é o que
 * permite conferir se a resposta aponta para uma alternativa que existe.
 */
function separarAlternativa(bruta) {
  const match = String(bruta).match(/^\s*([a-eA-E])\s*[).\-–]\s*([\s\S]+)$/)
  if (!match) return { letra: null, texto: String(bruta).trim() }
  return { letra: match[1].toUpperCase(), texto: match[2].replace(/\s+/g, " ").trim() }
}

/**
 * Lê instituição, ano, prova e número do identificador.
 *
 * O formato não é único, e supor que fosse produziu estrago silencioso. Em
 * `USP_2023_35` o número é o último pedaço; em `UNICAMP_2021_45_day2` ele vem
 * antes do dia. Lendo sempre da direita, 130 questões ficaram com número
 * inválido e a UNICAMP de 2021 se espalhou por dezenas de arquivos —
 * `2021_1`, `2021_10`, `2021_11` —, porque o que sobrava virava nome de prova.
 *
 * A leitura agora é por partes reconhecidas: o ano é o pedaço de quatro
 * dígitos, o número é o último pedaço puramente numérico, e o que restar
 * descreve a prova (fase, dia).
 */
function lerIdentificador(id) {
  const partes = String(id).split("_")
  const instituicao = partes.shift()

  const posAno = partes.findIndex((p) => /^\d{4}$/.test(p))
  const ano = posAno >= 0 ? Number(partes[posAno]) : null

  // O número da questão é o último trecho só de dígitos que não seja o ano.
  let posNumero = -1
  for (let i = partes.length - 1; i >= 0; i -= 1) {
    if (i !== posAno && /^\d+$/.test(partes[i])) { posNumero = i; break }
  }
  const numero = posNumero >= 0 ? Number(partes[posNumero]) : null

  const resto = partes.filter((_, i) => i !== posNumero && i !== posAno)
  return { instituicao, ano, numero, prova: [ano, ...resto].filter(Boolean).join("_") }
}

/**
 * Baixa o conjunto inteiro, página por página.
 *
 * A retentativa não é zelo excessivo: o servidor devolveu 500 numa página
 * qualquer no meio do caminho, e sem insistir isso derruba a importação
 * inteira depois de já ter baixado mil e duzentas questões.
 */
/**
 * Decide se falta enunciado, sem confundir "curto" com "incompleto".
 *
 * O acervo do ENEM usa um piso de 200 caracteres, e ele não serve aqui. As
 * provas da USP e da UNICAMP costumam abrir com uma frase curta que as
 * alternativas completam — "No que se refere à crise do colonialismo português
 * na África na segunda metade do século XX," tem 92 caracteres e é uma questão
 * inteira. Aplicar o piso do ENEM rejeitava dezenas dessas.
 *
 * O que realmente indica questão truncada não é o tamanho: é o enunciado
 * apontar para algo que não está ali — "a molécula investigada", "o texto
 * acima", "a figura apresentada" — sem que exista molécula, texto ou figura.
 * Curto e autossuficiente passa; curto e órfão de referência, não.
 */
const REFERENCIA_AUSENTE =
  /\b(o|a|os|as|no|na|nos|nas|esse|essa|esses|essas|este|esta|deste|desta|desse|dessa)\s+(texto|figura|imagem|gráfico|tabela|quadro|esquema|mapa|molécula|substância|experimento|reação|trecho|fragmento|poema|charge|tirinha|anúncio)\b/i

function enunciadoIncompleto(enunciado, temFigura) {
  if (!enunciado) return "enunciado vazio"
  if (enunciado.length < 60) return `enunciado com ${enunciado.length} caracteres`

  // Com figura anexada, a referência tem a quem apontar.
  if (temFigura) return null

  if (enunciado.length < 200 && REFERENCIA_AUSENTE.test(enunciado)) {
    return `enunciado curto referindo material ausente (${enunciado.length} caracteres)`
  }

  return null
}

async function baixarTudo() {
  const linhas = []

  for (let offset = 0; offset < TOTAL; offset += PAGINA) {
    const url = `${FONTE}?dataset=${DATASET}&config=default&split=questions&offset=${offset}&length=${PAGINA}`
    let pagina = null

    for (let tentativa = 1; tentativa <= 5 && !pagina; tentativa += 1) {
      try {
        const resposta = await fetch(url, { headers: { "User-Agent": "AtypicalClass-Importador/1.0" } })
        if (resposta.ok) pagina = await resposta.json()
      } catch {
        // rede oscilando; a espera abaixo cobre
      }
      if (!pagina) await new Promise((resolve) => setTimeout(resolve, 1500 * tentativa))
    }

    if (!pagina) throw new Error(`Página ${offset} não respondeu após 5 tentativas`)
    for (const { row } of pagina.rows) linhas.push(row)
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  return linhas
}

const linhas = await baixarTudo()

const porProva = new Map()
const rejeitadas = []

for (const linha of linhas) {
  const { instituicao, numero, prova } = lerIdentificador(linha.id)
  const ano = Number(prova.match(/^(\d{4})/)?.[1])

  const alternativas = (linha.alternatives ?? []).map(separarAlternativa)
  const motivos = []

  if (alternativas.length < 4) motivos.push(`${alternativas.length} alternativas`)
  if (alternativas.some((a) => !a.letra)) motivos.push("alternativa sem letra identificável")
  if (!alternativas.some((a) => a.letra === String(linha.answer).toUpperCase())) {
    motivos.push(`resposta "${linha.answer}" não corresponde a nenhuma alternativa`)
  }

  const enunciado = String(linha.question ?? "").replace(/\r\n/g, "\n").trim()
  const temFigura = (linha.associated_images ?? []).length > 0
  const falta = enunciadoIncompleto(enunciado, temFigura)
  if (falta) motivos.push(falta)

  // Uma questão pode receber mais de uma matéria: as bancas também fazem prova
  // interdisciplinar. Guardar todas é mais honesto que escolher uma.
  const materias = (linha.subject ?? []).map((s) => MATERIAS[s]).filter(Boolean)
  if (!materias.length) motivos.push(`matéria desconhecida: ${JSON.stringify(linha.subject)}`)

  if (motivos.length) {
    rejeitadas.push({ id: linha.id, motivos })
    continue
  }

  const chave = `${instituicao}-${prova}`
  if (!porProva.has(chave)) porProva.set(chave, [])
  porProva.get(chave).push({
    numero,
    enunciado,
    alternativas,
    resposta: String(linha.answer).toUpperCase(),
    materia: materias[0],
    materias,
    origemDaMateria: "oficial",
    imagens: linha.associated_images ?? [],
    descricoesDeFiguras: [...(linha.blind_captions ?? []), ...(linha.context_captions ?? [])].filter(Boolean),
    fonte: {
      exame: instituicao,
      ano,
      prova,
      numero,
      // Diferente do ENEM, onde duas fontes independentes precisam concordar.
      validacao: "fonte única (BLUEX)",
      dataset: "https://huggingface.co/datasets/portuguese-benchmark-datasets/BLUEX",
    },
  })
}

const destino = join(process.cwd(), "data", "vestibular")
await mkdir(destino, { recursive: true })

for (const [chave, questoes] of porProva) {
  questoes.sort((a, b) => a.numero - b.numero)
  await writeFile(join(destino, `${chave}.json`), `${JSON.stringify(questoes, null, 2)}\n`)
}

const materias = {}
let comImagem = 0
let comDescricao = 0
for (const questoes of porProva.values()) {
  for (const q of questoes) {
    materias[q.materia] = (materias[q.materia] ?? 0) + 1
    if (q.imagens.length) comImagem += 1
    if (q.descricoesDeFiguras.length) comDescricao += 1
  }
}

const total = [...porProva.values()].reduce((soma, q) => soma + q.length, 0)
console.log(`Provas:      ${porProva.size}`)
console.log(`Questões:    ${total}`)
console.log(`Com imagem:  ${comImagem}`)
console.log(`Com descrição: ${comDescricao}`)
console.log(`Matérias:    ${JSON.stringify(materias)}`)
if (rejeitadas.length) {
  console.log(`\nRejeitadas: ${rejeitadas.length}`)
  for (const r of rejeitadas.slice(0, 8)) console.log(`  ${r.id}: ${r.motivos.join("; ")}`)
}
