/**
 * Traz para o acervo a audiodescrição oficial do caderno do ledor.
 *
 * `recuperar-descricoes.mjs` já tinha feito isto para 2022 e 2023, a partir do
 * conjunto da Maritaca — e parou aí, porque aquele conjunto só cobre esses
 * anos. Este script vai à fonte: o caderno que o próprio INEP prepara para
 * leitor de tela, descrito em `ledor.mjs`.
 *
 * Uso:
 *   node scripts/import-enem/recuperar-descricoes-ledor.mjs            # ensaio
 *   node scripts/import-enem/recuperar-descricoes-ledor.mjs --confirmar # grava
 *   node scripts/import-enem/recuperar-descricoes-ledor.mjs --amostra   # mostra 6 recortes
 */
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { CADERNOS, SEM_CADERNO, baixar, texto as textoDoCaderno } from "./ledor.mjs"

const PASTA = join(process.cwd(), "data", "enem")
const CONFIRMAR = process.argv.includes("--confirmar")
const AMOSTRA = process.argv.includes("--amostra")

/**
 * Semelhança mínima para aceitar o casamento, e vantagem mínima sobre a segunda.
 *
 * Descrição colada na questão errada é pior que descrição nenhuma: o professor
 * lê para um aluno cego a imagem de outro item e não tem como perceber. Por
 * isso a exigência é dupla — parecer muito, e parecer bem mais que qualquer
 * outra candidata. São os mesmos números de `recuperar-descricoes.mjs`, e aqui
 * eles são mais folgados do que parecem: o bloco do ledor **contém** o
 * enunciado, e a semelhança é por continência.
 */
const SEMELHANCA_MINIMA = 0.65
const VANTAGEM_MINIMA = 0.15

/** Semelhança a partir da qual uma frase do bloco é considerada texto que já temos. */
const FRASE_JA_CONHECIDA = 0.6

/** Teto de segurança: descrição maior que isso é sinal de que o recorte comeu o enunciado. */
const MAXIMO_DE_DESCRICAO = 2500

const normalizar = (t) =>
  String(t ?? "")
    .toLowerCase()
    .replace(/[^a-zà-ú0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

function assinatura(t) {
  const limpo = normalizar(t)
  const pedacos = new Set()
  for (let i = 0; i < limpo.length - 3; i += 1) pedacos.add(limpo.slice(i, i + 4))
  return pedacos
}

/** Continência: quanto do menor texto cabe no maior. Serve para achar a questão. */
function semelhanca(a, b) {
  const A = assinatura(a)
  const B = assinatura(b)
  if (!A.size || !B.size) return 0
  let comuns = 0
  for (const pedaco of A) if (B.has(pedaco)) comuns += 1
  return comuns / Math.min(A.size, B.size)
}

/**
 * Quanto **desta** frase já está no texto que conhecemos. Direcional, de
 * propósito.
 *
 * A versão com `Math.min` no denominador serve para casar questão com bloco,
 * onde os dois textos são longos. No recorte ela mente: a alternativa "A" tem
 * dois pedaços de quatro letras, e se os dois aparecerem na frase o resultado é
 * 1,0 — qualquer frase passa a "já ser conhecida" e o recorte aborta na
 * primeira linha. Foi assim que 30 questões casaram com nota 1,00 e mesmo assim
 * saíram sem descrição nenhuma.
 */
function contida(frase, conhecido) {
  const A = assinatura(frase)
  if (!A.size) return 0
  const B = assinatura(conhecido)
  let comuns = 0
  for (const pedaco of A) if (B.has(pedaco)) comuns += 1
  return comuns / A.size
}

/**
 * Rodapé de página, que o extrator devolve no meio da frase.
 *
 * "LC - 1º dia | Caderno 9 - LARANJA - Página 6" aparece dentro do bloco da
 * questão, às vezes no meio de uma descrição. Sai antes de qualquer recorte,
 * senão vira texto da audiodescrição.
 */
const RODAPE =
  /\s*(?:[A-Z]{2}\s*[-–]\s*\d\s*º?\s*dia\s*\|[^\n]*?P[áa]gina\s*\d+|Caderno\s+\d+\s*[-–]\s*[A-ZÇÃ]+\s*[-–]\s*P[áa]gina\s*\d+|\*?[A-Z]{2,3}\d?\*?\s*P[áa]gina\s*\d+)\s*/g

/** Início de uma descrição de figura. O ledor usa a palavra para tudo: imagem, cartaz, mapa, tirinha, Figura 1. */
const MARCADOR = /Descri[çc][ãa]o\s+d[eoa]s?\s+[^:\n]{0,60}?:/gi

/**
 * Quebra o caderno em blocos por questão.
 *
 * O número vem depois do marcador porque `QUESTÃO` e o número às vezes ficam
 * em linhas diferentes no PDF.
 */
function blocosDoCaderno(texto) {
  const limpo = texto.replace(RODAPE, " ")
  const partes = limpo.split(/QUEST[ÃA]O\s*/i)
  const blocos = []
  for (const parte of partes.slice(1)) {
    const casamento = parte.match(/^\s*(\d{1,3})\b/)
    if (!casamento) continue
    blocos.push({ numero: Number(casamento[1]), texto: parte.slice(casamento[0].length) })
  }
  return blocos
}

/**
 * Recorta as descrições de um bloco, parando onde o texto volta a ser da questão.
 *
 * O bloco do ledor é a descrição **mais** o enunciado mais as alternativas, tudo
 * corrido. O que separa uma coisa da outra não é pontuação nem espaçamento — é
 * o fato de já conhecermos o enunciado e as alternativas. Então o corte é por
 * subtração: anda-se frase a frase a partir do marcador e para-se na primeira
 * frase que já está na questão.
 *
 * É por isso que este recorte só funciona **depois** do casamento, e não antes.
 */
function recortarDescricoes(bloco, questao) {
  const conhecido = [questao.enunciado ?? "", ...(questao.alternativas ?? []).map((a) => a?.texto ?? a ?? "")]
  const marcadores = [...bloco.matchAll(MARCADOR)]
  const descricoes = []

  for (let i = 0; i < marcadores.length; i += 1) {
    const inicio = marcadores[i].index + marcadores[i][0].length
    const fim = i + 1 < marcadores.length ? marcadores[i + 1].index : bloco.length
    const trecho = bloco.slice(inicio, fim)

    const frases = trecho.split(/(?<=[.!?])\s+/)
    const mantidas = []
    for (const frase of frases) {
      const limpa = frase.trim()
      if (!limpa) continue
      const jaConhecida =
        limpa.length >= 25 && conhecido.some((c) => c && contida(limpa, c) >= FRASE_JA_CONHECIDA)
      if (jaConhecida) break
      mantidas.push(limpa)
      if (mantidas.join(" ").length > MAXIMO_DE_DESCRICAO) break
    }

    const descricao = mantidas.join(" ").replace(/\s+/g, " ").trim()
    if (descricao.length >= 40) descricoes.push(descricao)
  }

  return descricoes
}

// ---------------------------------------------------------------------------

const arquivos = (await readdir(PASTA)).filter((n) => /^\d{4}-(CN|CH|LC|MT)\.json$/.test(n))
const porAno = new Map()
for (const arquivo of arquivos) {
  const ano = Number(arquivo.slice(0, 4))
  const questoes = JSON.parse(await readFile(join(PASTA, arquivo), "utf8"))
  if (!porAno.has(ano)) porAno.set(ano, [])
  porAno.get(ano).push({ arquivo, questoes })
}

const temFigura = (q) => (q.imagens?.length ?? 0) > 0 || (q.alternativas ?? []).some((a) => a?.imagem)

let recuperadas = 0
let semPar = 0
let duvidosas = 0
let semRecorte = 0
let cadernosFaltando = 0
const amostras = []

const anos = [...new Set(CADERNOS.map((c) => c.ano))].sort()

for (const ano of anos) {
  const doAno = porAno.get(ano)
  if (!doAno) continue

  // Alvo: as questões daquele ano que têm figura e ainda não têm descrição.
  const alvos = []
  for (const { arquivo, questoes } of doAno) {
    for (const questao of questoes) {
      if (temFigura(questao) && !(questao.descricoesDeFiguras?.length > 0)) alvos.push({ arquivo, questao })
    }
  }
  if (!alvos.length) {
    console.log(`${ano}: nada a fazer`)
    continue
  }

  // Todos os blocos com descrição, dos dois dias — sem decidir de que área é qual.
  const blocos = []
  for (const caderno of CADERNOS.filter((c) => c.ano === ano)) {
    const corpo = await baixar(caderno)
    if (!corpo) {
      console.log(`${ano}: caderno ${caderno.arquivo} não baixou`)
      cadernosFaltando += 1
      continue
    }
    for (const bloco of blocosDoCaderno(textoDoCaderno(caderno, corpo))) {
      if (MARCADOR.test(bloco.texto)) blocos.push({ ...bloco, caderno })
      MARCADOR.lastIndex = 0
    }
  }

  if (!blocos.length) {
    console.log(`${ano}: nenhum bloco com descrição`)
    continue
  }

  let noAno = 0
  for (const { arquivo, questao } of alvos) {
    let melhor = null
    let segunda = 0
    for (const bloco of blocos) {
      const nota = semelhanca(questao.enunciado, bloco.texto)
      if (!melhor || nota > melhor.nota) {
        segunda = melhor?.nota ?? 0
        melhor = { ...bloco, nota }
      } else if (nota > segunda) {
        segunda = nota
      }
    }

    if (!melhor || melhor.nota < SEMELHANCA_MINIMA) {
      semPar += 1
      continue
    }
    if (melhor.nota - segunda < VANTAGEM_MINIMA) {
      duvidosas += 1
      continue
    }

    const descricoes = recortarDescricoes(melhor.texto, questao)
    if (!descricoes.length) {
      semRecorte += 1
      continue
    }

    questao.descricoesDeFiguras = descricoes
    questao.descricoesDeFigurasFonte = `caderno do ledor do INEP, ENEM ${ano} (${melhor.caderno.arquivo})`
    recuperadas += 1
    noAno += 1
    if (amostras.length < 6) {
      amostras.push({ ano, numero: questao.numero, nota: melhor.nota.toFixed(2), descricoes })
    }
    void arquivo
  }

  console.log(`${ano}: ${noAno} de ${alvos.length} questões com figura fecharam (${blocos.length} blocos no caderno)`)
}

if (CONFIRMAR) {
  for (const [, lista] of porAno) {
    for (const { arquivo, questoes } of lista) {
      await writeFile(join(PASTA, arquivo), `${JSON.stringify(questoes, null, 2)}\n`)
    }
  }
}

if (AMOSTRA) {
  console.log("\n=== amostra do recorte ===")
  for (const a of amostras) {
    console.log(`\n[${a.ano} q${a.numero}] semelhança ${a.nota}`)
    for (const d of a.descricoes) console.log(`  • ${d.slice(0, 400)}${d.length > 400 ? "…" : ""}`)
  }
}

console.log(`\nRecuperadas: ${recuperadas}`)
console.log(`Sem par no caderno: ${semPar}`)
console.log(`Casamento duvidoso, descartado: ${duvidosas}`)
console.log(`Casou mas o recorte saiu vazio: ${semRecorte}`)
if (cadernosFaltando) console.log(`Cadernos que não baixaram: ${cadernosFaltando}`)
console.log(`Anos sem caderno acessível publicado: ${SEM_CADERNO.join(", ")}`)
if (!CONFIRMAR) console.log("\nEnsaio — nada foi gravado. Use --confirmar para gravar.")
