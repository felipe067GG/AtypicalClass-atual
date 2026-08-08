/**
 * Dificuldade das questões, a partir dos microdados do INEP.
 *
 * A prova em PDF não diz o quanto cada questão é difícil — isso só existe nos
 * microdados, no parâmetro `b` da Teoria de Resposta ao Item. É o que permite
 * dividir o banco por dificuldade sem inventar critério: o número vem do
 * próprio INEP, calculado sobre as respostas de milhões de participantes.
 *
 * O arquivo de microdados tem 549 MB, mas o CSV de itens tem 0,3 MB e fica no
 * começo do ZIP. Baixar tudo para ler menos de um milésimo seria desperdício e,
 * com esse host oscilando, também mais frágil: quanto maior a transferência,
 * maior a chance de cair no meio. Por isso a leitura por faixa de bytes — dois
 * pedidos pequenos em vez de meio giga.
 */
import { execFile } from "node:child_process"
import { inflateRawSync } from "node:zlib"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { promisify } from "node:util"

const exec = promisify(execFile)

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
const CACHE = join(process.cwd(), ".cache", "microdados")

/** Assinaturas do formato ZIP. */
const FIM_DIRETORIO = 0x06054b50
const ENTRADA_DIRETORIO = 0x02014b50

async function baixarFaixa(url, faixa) {
  const destino = join(CACHE, `faixa-${faixa.replace(/\W/g, "_")}.bin`)
  await mkdir(CACHE, { recursive: true })
  await exec("curl", ["-s", "--retry", "5", "--retry-all-errors", "--max-time", "300", "-A", UA, "-r", faixa, "-o", destino, url])
  return readFile(destino)
}

/**
 * Extrai um arquivo de dentro do ZIP remoto sem baixá-lo inteiro.
 *
 * O tamanho comprimido vem do diretório central, e não do cabeçalho local:
 * o INEP grava o ZIP em modo de fluxo, onde o cabeçalho local traz zero nos
 * dois tamanhos e os valores reais ficam depois dos dados. Ler o cabeçalho
 * local aqui devolve "unexpected end of file" na descompressão.
 */
export async function extrairDoZipRemoto(url, tamanhoTotal, padrao) {
  const cauda = await baixarFaixa(url, "-262144")

  let fim = -1
  for (let i = cauda.length - 22; i >= 0; i -= 1) {
    if (cauda.readUInt32LE(i) === FIM_DIRETORIO) { fim = i; break }
  }
  if (fim < 0) throw new Error("Diretório central não encontrado na cauda do ZIP")

  const inicioCauda = tamanhoTotal - cauda.length
  let p = cauda.readUInt32LE(fim + 16) - inicioCauda
  const quantas = cauda.readUInt16LE(fim + 10)

  let alvo = null
  for (let k = 0; k < quantas; k += 1) {
    if (cauda.readUInt32LE(p) !== ENTRADA_DIRETORIO) break
    const nomeLen = cauda.readUInt16LE(p + 28)
    const extraLen = cauda.readUInt16LE(p + 30)
    const comentarioLen = cauda.readUInt16LE(p + 32)
    const nome = cauda.toString("utf8", p + 46, p + 46 + nomeLen)
    if (padrao.test(nome)) {
      alvo = { nome, comprimido: cauda.readUInt32LE(p + 20), offset: cauda.readUInt32LE(p + 42) }
      break
    }
    p += 46 + nomeLen + extraLen + comentarioLen
  }
  if (!alvo) throw new Error(`Nenhuma entrada casa com ${padrao}`)

  // 4 KB de folga cobrem o cabeçalho local, cujo tamanho só se conhece lendo-o.
  const bloco = await baixarFaixa(url, `${alvo.offset}-${alvo.offset + alvo.comprimido + 4096}`)
  const inicio = 30 + bloco.readUInt16LE(26) + bloco.readUInt16LE(28)
  return inflateRawSync(bloco.subarray(inicio, inicio + alvo.comprimido))
}

/** Baixa e guarda o CSV de itens de um ano. */
export async function obterItens(ano, tamanhoZip) {
  const destino = join(CACHE, `ITENS_PROVA_${ano}.csv`)
  try {
    return await readFile(destino, "utf8")
  } catch {
    const csv = await extrairDoZipRemoto(
      `https://download.inep.gov.br/microdados/microdados_enem_${ano}.zip`,
      tamanhoZip,
      new RegExp(`ITENS_PROVA_${ano}\\.csv$`),
    )
    await writeFile(destino, csv)
    return csv.toString("utf8")
  }
}

/**
 * Converte o CSV em itens indexados por posição na prova.
 *
 * `CO_POSICAO` já é o número absoluto da questão no exame — 1 a 45 em
 * Linguagens, 46 a 90 em Humanas, e assim por diante. Não precisa somar
 * deslocamento por área; somar produz números fora da faixa e nenhum item casa.
 */
export function lerItens(csv) {
  const [cabecalho, ...linhas] = csv.split(/\r?\n/).filter(Boolean)
  const colunas = cabecalho.split(";")
  const indice = (nome) => colunas.indexOf(nome)

  const col = {
    posicao: indice("CO_POSICAO"),
    area: indice("SG_AREA"),
    item: indice("CO_ITEM"),
    gabarito: indice("TX_GABARITO"),
    habilidade: indice("CO_HABILIDADE"),
    anulado: indice("IN_ITEM_ABAN"),
    b: indice("NU_PARAM_B"),
    cor: indice("TX_COR"),
    prova: indice("CO_PROVA"),
    lingua: indice("TP_LINGUA"),
  }

  return linhas.map((linha) => {
    const c = linha.split(";")
    return {
      posicao: Number(c[col.posicao]),
      area: c[col.area],
      item: c[col.item],
      gabarito: c[col.gabarito],
      habilidade: Number(c[col.habilidade]) || null,
      anulado: c[col.anulado] === "1",
      dificuldadeB: c[col.b] ? Number(c[col.b].replace(",", ".")) : null,
      cor: c[col.cor],
      prova: c[col.prova],
      lingua: c[col.lingua] === "" ? null : Number(c[col.lingua]),
    }
  })
}

/**
 * Descobre qual `CO_PROVA` corresponde ao caderno que foi lido em PDF.
 *
 * O mesmo ano e a mesma cor têm mais de um `CO_PROVA` — aplicação regular,
 * reaplicação e versão digital convivem no arquivo, e escolher o errado daria
 * dificuldade de outra prova em questões certas.
 *
 * A escolha é feita comparando com o gabarito oficial já lido do PDF: a prova
 * certa bate 100% das respostas, as outras ficam perto de 20%, que é o acaso
 * de cinco alternativas. Não é heurística — é identificação.
 */
export function identificarProva(itens, respostasDoPdf, { area, cor = "AZUL" }) {
  const candidatas = [...new Set(itens.filter((i) => i.area === area && i.cor === cor).map((i) => i.prova))]

  const placar = candidatas.map((prova) => {
    let acertos = 0
    let total = 0
    for (const item of itens) {
      if (item.area !== area || item.cor !== cor || item.prova !== prova) continue
      if (item.lingua === 1) continue // espanhol tem gabarito próprio
      const oficial = respostasDoPdf.get(item.posicao)
      if (!oficial) continue
      total += 1
      if (oficial.resposta === item.gabarito) acertos += 1
    }
    return { prova, acertos, total, taxa: total ? acertos / total : 0 }
  })

  placar.sort((a, b) => b.taxa - a.taxa)
  return placar[0]?.taxa === 1 ? placar[0] : null
}

/**
 * Traduz o parâmetro `b` para a escala do ENEM e para três faixas.
 *
 * A escala de proficiência do ENEM é 500 + 100·θ, e a dificuldade do item vive
 * na mesma escala: um item de 650 é aquele que um participante de proficiência
 * 650 tem meia chance de acertar. Guardar esse número, e não só a faixa, é o
 * que permite conferir a classificação depois — e mudar os cortes sem
 * reimportar nada.
 *
 * Os cortes em 550 e 700 são escolha declarada do AtypicalClass, não do INEP:
 * o INEP publica o parâmetro, não uma divisão em fácil/médio/difícil.
 *
 * São cortes fixos e não tercis do acervo, de propósito. Tercis dão divisão
 * perfeitamente igual — nos 5 526 itens de 2023, 1 836 / 1 851 / 1 839 — mas
 * são relativos: a mesma questão mudaria de faixa só porque outro ano entrou
 * no banco. Com corte fixo na escala do ENEM, "difícil" quer dizer a mesma
 * coisa em 2015 e em 2025, e o professor pode confiar no rótulo. Nos mesmos
 * 5 526 itens, os cortes fixos dão 1 596 / 2 946 / 984 — desigual, mas
 * desigual porque a prova é assim, o que é a informação honesta.
 */
export function classificarDificuldade(b) {
  if (b === null || Number.isNaN(b)) return null
  const escala = 500 + 100 * b
  const faixa = escala < 550 ? "Fácil" : escala <= 700 ? "Médio" : "Difícil"
  return { b, escala: Math.round(escala), faixa }
}
