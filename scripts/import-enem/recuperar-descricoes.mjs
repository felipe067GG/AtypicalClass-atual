/**
 * Devolve ao acervo do ENEM as audiodescrições das figuras.
 *
 * O INEP publica, no caderno preparado para leitor de tela, uma descrição
 * escrita de cada imagem — feita para quem não pode vê-la. Num site de
 * educação inclusiva isso não é acessório: é o que torna uma questão com
 * gráfico aplicável a um aluno cego.
 *
 * Elas existiam no acervo e se perderam. Quando troquei a leitura dos PDFs
 * pela API pública, comemorei o salto de cinco para cento e setenta e duas
 * imagens e não percebi que estava deixando para trás justamente o ativo mais
 * valioso para o público deste site. As 2 085 questões do ENEM ficaram com
 * zero descrições, contra 607 no acervo de vestibular.
 *
 * O resgate não pode casar por número. As descrições vêm do conjunto da
 * Maritaca, montado sobre outro caderno, e as cores embaralham a ordem das
 * questões dentro de cada área — a 136 de um não é a 136 do outro. O
 * casamento é por semelhança de texto do enunciado.
 *
 * Uso:  node scripts/import-enem/recuperar-descricoes.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

const PASTA = join(process.cwd(), "data", "enem")
const FONTE = "https://datasets-server.huggingface.co/rows"
const DATASET = "maritaca-ai%2Fenem"

/** Anos que o conjunto da Maritaca cobre. */
const ANOS = [2022, 2023]

/**
 * Semelhança mínima para aceitar o casamento, e vantagem mínima sobre o
 * segundo colocado.
 *
 * Descrição colada na questão errada é pior que descrição nenhuma: o professor
 * lê para um aluno cego a imagem de outro item e não tem como perceber. Por
 * isso a exigência é dupla — parecer muito, e parecer bem mais que qualquer
 * outra candidata.
 */
const SEMELHANCA_MINIMA = 0.65
const VANTAGEM_MINIMA = 0.15

const normalizar = (texto) =>
  String(texto ?? "")
    .toLowerCase()
    .replace(/[^a-zà-ú0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

/** Assinatura de um texto: o conjunto dos seus pedaços de quatro letras. */
function assinatura(texto) {
  const limpo = normalizar(texto)
  const pedacos = new Set()
  for (let i = 0; i < limpo.length - 3; i += 1) pedacos.add(limpo.slice(i, i + 4))
  return pedacos
}

function semelhanca(a, b) {
  const A = assinatura(a)
  const B = assinatura(b)
  if (!A.size || !B.size) return 0
  let comuns = 0
  for (const pedaco of A) if (B.has(pedaco)) comuns += 1
  return comuns / Math.min(A.size, B.size)
}

async function buscarAno(ano) {
  const questoes = []
  for (let offset = 0; offset < 180; offset += 100) {
    const url = `${FONTE}?dataset=${DATASET}&config=${ano}&split=train&offset=${offset}&length=100`
    let pagina = null
    for (let tentativa = 1; tentativa <= 4 && !pagina; tentativa += 1) {
      try {
        const resposta = await fetch(url, { headers: { "User-Agent": "AtypicalClass-Importador/1.0" } })
        if (resposta.ok) pagina = await resposta.json()
      } catch {
        // rede oscilando
      }
      if (!pagina) await new Promise((r) => setTimeout(r, 1200 * tentativa))
    }
    if (!pagina) break
    for (const { row } of pagina.rows) {
      const descricao = String(row.description ?? "").trim()
      if (descricao) questoes.push({ texto: row.question, descricao })
    }
    await new Promise((r) => setTimeout(r, 300))
  }
  return questoes
}

let recuperadas = 0
let semPar = 0
let duvidosas = 0

for (const ano of ANOS) {
  const comDescricao = await buscarAno(ano)
  if (!comDescricao.length) {
    console.log(`${ano}: nenhuma descrição disponível`)
    continue
  }

  const arquivos = (await readdir(PASTA)).filter((n) => new RegExp(`^${ano}-(CN|CH|LC|MT)\\.json$`).test(n))
  let doAno = 0

  for (const arquivo of arquivos) {
    const caminho = join(PASTA, arquivo)
    const questoes = JSON.parse(await readFile(caminho, "utf8"))
    let mudou = false

    for (const questao of questoes) {
      if (questao.descricoesDeFiguras?.length) continue

      let melhor = null
      let segunda = 0
      for (const candidata of comDescricao) {
        const nota = semelhanca(questao.enunciado, candidata.texto)
        if (!melhor || nota > melhor.nota) {
          segunda = melhor?.nota ?? 0
          melhor = { ...candidata, nota }
        } else if (nota > segunda) {
          segunda = nota
        }
      }

      if (!melhor || melhor.nota < SEMELHANCA_MINIMA) {
        if (questao.imagens.length) semPar += 1
        continue
      }
      if (melhor.nota - segunda < VANTAGEM_MINIMA) {
        duvidosas += 1
        continue
      }

      questao.descricoesDeFiguras = [melhor.descricao]
      recuperadas += 1
      doAno += 1
      mudou = true
    }

    // Questões sem par recebem o campo vazio, para o acervo ter forma única.
    for (const questao of questoes) {
      if (!questao.descricoesDeFiguras) {
        questao.descricoesDeFiguras = []
        mudou = true
      }
    }

    if (mudou) await writeFile(caminho, `${JSON.stringify(questoes, null, 2)}\n`)
  }

  console.log(`${ano}: ${doAno} descrições recuperadas (de ${comDescricao.length} disponíveis)`)
}

console.log(`\nTotal recuperado: ${recuperadas}`)
console.log(`Com figura e sem par encontrado: ${semPar}`)
console.log(`Descartadas por casamento duvidoso: ${duvidosas}`)
