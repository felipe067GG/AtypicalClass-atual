/**
 * Monta o acervo de questões do ENEM.
 *
 * O texto vem da API pública `enem.dev`; a resposta certa, a dificuldade e a
 * área vêm dos microdados do INEP. Nenhum PDF é aberto.
 *
 * A primeira versão disto lia as provas em PDF, por achar que só assim a
 * procedência estaria garantida. Custou caro e entregou pouco: coluna dupla
 * embaralhando dois textos por linha, fonte sem mapa de caracteres devolvendo
 * "DOFRRO{PHWUR" no lugar de "alcoolímetro", três convenções de nome de
 * arquivo convivendo, cores de caderno que não se deduzem do número e uma
 * prova digital que se disfarça de impressa. Cada ano antigo virava uma
 * escavação própria.
 *
 * A procedência não piora aqui — muda de guardião. A resposta que a API dá
 * para cada questão é conferida contra o `TX_GABARITO` publicado pelo INEP, e
 * questão que divergir não entra. Como as duas fontes são independentes,
 * concordarem é evidência de que ambas leram certo; era exatamente o papel
 * que o gabarito em PDF cumpria antes.
 *
 * Uso:  node scripts/import-enem/importar.mjs 2022 CN
 */
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { lerItens, classificarDificuldade, obterItens } from "./microdados.mjs"
import { proporMateria, materiaCabeNaArea } from "./materia.mjs"

const API = "https://api.enem.dev/v1/exams"

/**
 * A API limita requisições, e o limite não se anuncia: ela simplesmente para
 * de responder. Numa primeira tentativa sem pausa, 12 das 45 questões vieram
 * vazias — e vazio aqui parece questão inexistente, não recusa. O intervalo é
 * o preço de não confundir uma coisa com a outra.
 */
const PAUSA_MS = 350
const TENTATIVAS = 4

const espera = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function buscarQuestao(ano, numero) {
  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa += 1) {
    try {
      const resposta = await fetch(`${API}/${ano}/questions/${numero}`, {
        headers: { "User-Agent": "AtypicalClass-Importador/1.0" },
      })
      if (resposta.ok) return resposta.json()
      if (resposta.status === 404) return null
    } catch {
      // rede oscilando; a espera abaixo cobre
    }
    await espera(PAUSA_MS * tentativa * 2)
  }
  return null
}

/**
 * Descobre qual caderno a API segue.
 *
 * As cores embaralham a ordem das questões dentro de cada área, então a
 * questão 91 do caderno azul não é a 91 do amarelo. Comparar com o caderno
 * errado produz divergência em quase tudo — foi o que me fez concluir, cedo
 * demais, que a API estava errada. Ela seguia o azul, e eu conferia contra o
 * amarelo.
 *
 * A identificação é por concordância total: o caderno certo bate 100% das
 * respostas, os outros ficam perto de 20%, que é o acaso de cinco
 * alternativas.
 */
function identificarCaderno(itens, respostasDaApi) {
  const candidatos = new Map()

  for (const item of itens) {
    const chave = `${item.cor}|${item.prova}`
    if (!candidatos.has(chave)) candidatos.set(chave, { acertos: 0, total: 0, comDificuldade: 0 })
    const placar = candidatos.get(chave)

    const daApi = respostasDaApi.get(item.posicao)
    if (!daApi) continue
    placar.total += 1
    if (daApi === item.gabarito) placar.acertos += 1
    if (item.dificuldadeB !== null) placar.comDificuldade += 1
  }

  const perfeitos = [...candidatos.entries()]
    .filter(([, p]) => p.total >= 20 && p.acertos === p.total)
    // Havendo empate, fica o que tem dificuldade para mais itens: cadernos
    // diferentes podem repetir o gabarito, mas o que interessa é o que traz
    // os parâmetros da TRI completos.
    .sort((a, b) => b[1].comDificuldade - a[1].comDificuldade)

  if (!perfeitos.length) return null
  const [chave, placar] = perfeitos[0]
  const [cor, prova] = chave.split("|")
  return { cor, prova, ...placar }
}

export async function importar({ ano, area, lidas = {} }) {
  const todos = lerItens(await obterItens(ano)).filter((i) => i.area === area && i.lingua !== 1)
  if (!todos.length) throw new Error(`Microdados de ${ano} não trazem itens da área ${area}`)

  const posicoes = [...new Set(todos.map((i) => i.posicao))].sort((a, b) => a - b)

  // Uma passada só na API: as questões são reaproveitadas tanto para
  // identificar o caderno quanto para montar o acervo.
  const daApi = new Map()
  for (const posicao of posicoes) {
    const questao = await buscarQuestao(ano, posicao)
    if (questao) daApi.set(posicao, questao)
    await espera(PAUSA_MS)
  }

  const respostas = new Map([...daApi].map(([n, q]) => [n, q.correctAlternative]))
  const caderno = identificarCaderno(todos, respostas)
  if (!caderno) {
    throw new Error(
      `Nenhum caderno de ${area}/${ano} bate 100% com as respostas da API. ` +
        "Sem essa identificação, dificuldade e gabarito viriam de outra prova.",
    )
  }

  const oficiais = new Map(
    todos.filter((i) => i.cor === caderno.cor && i.prova === caderno.prova).map((i) => [i.posicao, i]),
  )

  const questoes = []
  const rejeitadas = []

  for (const [posicao, questao] of daApi) {
    const oficial = oficiais.get(posicao)
    const motivos = []

    if (!oficial) motivos.push("sem item correspondente nos microdados")
    else if (oficial.anulado) motivos.push("anulada pelo INEP")
    else if (questao.correctAlternative !== oficial.gabarito) motivos.push("resposta diverge do gabarito oficial")

    const alternativas = (questao.alternatives ?? []).map((a) => ({
      letra: a.letter,
      texto: (a.text ?? "").trim(),
      imagem: a.file ?? null,
    }))
    if (alternativas.length !== 5) motivos.push(`${alternativas.length} alternativas`)

    const enunciado = [questao.context, questao.alternativesIntroduction]
      .filter(Boolean)
      .join("\n\n")
      .trim()
    if (enunciado.length < 40) motivos.push("enunciado ausente ou curto demais")

    if (motivos.length) {
      rejeitadas.push({ numero: posicao, motivos })
      continue
    }

    const automatica = proporMateria({ enunciado, alternativas, descricoesDeFiguras: [] }, area)
    // A chave carrega a cor do caderno de propósito. As cores embaralham a
    // ordem dentro da área, então a questão 97 do amarelo não é a 97 do azul —
    // uma leitura feita num caderno aplicada a outro rotularia a questão
    // errada, e em silêncio, que é o pior modo de errar aqui.
    const lida = lidas[`${ano}-${caderno.cor}-${posicao}`] ?? null
    const materia = automatica.materia ?? lida

    if (materia && !materiaCabeNaArea(materia, area)) {
      rejeitadas.push({ numero: posicao, motivos: [`matéria "${materia}" não pertence à área ${area}`] })
      continue
    }

    questoes.push({
      numero: posicao,
      enunciado,
      alternativas,
      resposta: oficial.gabarito,
      dificuldade: classificarDificuldade(oficial.dificuldadeB),
      habilidade: oficial.habilidade,
      imagens: questao.files ?? [],
      materia,
      // De onde veio o rótulo de matéria. "oficial" só existe onde a própria
      // banca separou a prova por disciplina, o que o ENEM não faz.
      origemDaMateria: automatica.materia ? "vocabulário" : lida ? "leitura" : null,
      fonte: {
        exame: "ENEM",
        ano,
        area,
        cor: caderno.cor,
        numero: posicao,
        provaMicrodados: caderno.prova,
        questaoApi: `${API}/${ano}/questions/${posicao}`,
        microdados: `https://download.inep.gov.br/microdados/microdados_enem_${ano}.zip`,
      },
    })
  }

  return { questoes, rejeitadas, caderno }
}

const [ano, area] = process.argv.slice(2)

if (ano && area) {
  const caminhoLidas = join(process.cwd(), "data", "enem", "materias-lidas.json")
  const lidas = await readFile(caminhoLidas, "utf8").then(JSON.parse).catch(() => ({}))

  const resultado = await importar({ ano: Number(ano), area, lidas })

  const destino = join(process.cwd(), "data", "enem")
  await mkdir(destino, { recursive: true })
  const arquivo = join(destino, `${ano}-${area}.json`)
  await writeFile(arquivo, `${JSON.stringify(resultado.questoes, null, 2)}\n`)

  const materias = {}
  for (const q of resultado.questoes) materias[q.materia ?? "(indefinida)"] = (materias[q.materia ?? "(indefinida)"] ?? 0) + 1

  console.log(`Caderno identificado: ${resultado.caderno.cor} / prova ${resultado.caderno.prova} (${resultado.caderno.acertos}/${resultado.caderno.total})`)
  console.log(`Questões importadas:  ${resultado.questoes.length}`)
  console.log(`Com imagem:           ${resultado.questoes.filter((q) => q.imagens.length).length}`)
  console.log(`Matérias:             ${JSON.stringify(materias)}`)
  if (resultado.rejeitadas.length) {
    console.log(`Rejeitadas:           ${resultado.rejeitadas.length}`)
    for (const r of resultado.rejeitadas.slice(0, 6)) console.log(`  q${r.numero}: ${r.motivos.join("; ")}`)
  }
  console.log(`\nGravado em ${arquivo}`)
}
