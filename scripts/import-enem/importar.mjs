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
 * Tira as imagens de dentro do texto do enunciado.
 *
 * A API embute cada figura no corpo da questão em markdown — uma linha
 * `![](https://.../figura.png)` no meio da frase. Guardado assim, o professor
 * lê a marcação crua na tela, porque a página mostra o enunciado como texto
 * puro. E a mesma imagem costuma aparecer também no campo `files`, então o
 * texto carrega ruído sem nem acrescentar informação.
 *
 * As URLs vão para o campo de imagens, o texto fica limpo e a decisão de como
 * exibir passa a ser da página. Se um dia ela renderizar markdown, a escolha
 * continua possível; o contrário — recuperar a imagem de um texto que já foi
 * exibido cru — não seria.
 */
function separarImagensDoTexto(texto) {
  const imagens = []
  const limpo = texto
    .replace(/!\[[^\]]*\]\((https?:\/\/[^)]+)\)/g, (_, url) => {
      imagens.push(url)
      return ""
    })
    // A remoção deixa linhas em branco onde a imagem estava.
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  return { texto: limpo, imagens }
}

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
 * A identificação é por dominância, não por perfeição. O caderno certo fica
 * perto de 100% e os outros perto de 20%, que é o acaso de cinco alternativas
 * — a distância entre eles é enorme e não precisa de unanimidade para ser
 * lida.
 *
 * Exigir 100% aqui custou caro: em 2020 o caderno azul batia 40 de 41 contra
 * 34% do segundo colocado, e o ano inteiro era descartado por uma única
 * divergência. Era confundir duas perguntas diferentes — "qual caderno é
 * este?" e "esta questão está certa?". A segunda continua sendo respondida
 * questão por questão, e a divergente é rejeitada sozinha, sem levar as outras
 * quarenta junto.
 */
const CONCORDANCIA_MINIMA = 0.9
const VANTAGEM_MINIMA = 2.5
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

  const ranking = [...candidatos.entries()]
    .filter(([, p]) => p.total >= 20)
    .map(([chave, p]) => ({ chave, ...p, taxa: p.acertos / p.total }))
    .sort((a, b) => b.taxa - a.taxa || b.comDificuldade - a.comDificuldade)

  const [melhor, segundo] = ranking
  if (!melhor || melhor.taxa < CONCORDANCIA_MINIMA) return null

  // A vantagem sobre o segundo é o que separa identificação de coincidência.
  // Sem ela, um caderno que batesse 90% por acaso passaria — e a dificuldade
  // de todas as questões viria da prova errada.
  if (segundo && melhor.taxa < segundo.taxa * VANTAGEM_MINIMA) return null

  const [cor, prova] = melhor.chave.split("|")
  return { cor, prova, acertos: melhor.acertos, total: melhor.total }
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
      `Nenhum caderno de ${area}/${ano} concorda o bastante com as respostas da API ` +
        `(mínimo ${Math.round(CONCORDANCIA_MINIMA * 100)}% e ${VANTAGEM_MINIMA}x o segundo colocado). ` +
        "Sem identificar o caderno, dificuldade e gabarito viriam de outra prova.",
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

    // Alternativa pode ser figura em vez de texto, mas não pode ser nada. Em
    // 2023 a questão 132 chegou com quatro das cinco em branco — só a última
    // trouxe imagem. Cinco letras numa lista, quatro sem conteúdo: o professor
    // abre e não tem o que ler nem no que clicar.
    const vazias = alternativas.filter((a) => !a.texto && !a.imagem)
    if (vazias.length) motivos.push(`${vazias.length} alternativa(s) sem texto nem imagem`)

    const bruto = [questao.context, questao.alternativesIntroduction].filter(Boolean).join("\n\n").trim()
    const { texto: enunciado, imagens: doTexto } = separarImagensDoTexto(bruto)
    // A mesma figura costuma vir nos dois lugares; o `Set` evita duplicá-la.
    const imagens = [...new Set([...(questao.files ?? []), ...doTexto])]
    const temFigura = imagens.length > 0 || (questao.alternatives ?? []).some((a) => a.file)

    /**
     * Enunciado curto só é aceitável quando há figura.
     *
     * A API não tem o campo `context` de algumas questões — vem nulo — e sobra
     * apenas a pergunta final. O piso anterior, de 40 caracteres, deixava
     * passar coisas como "A fórmula que se enquadra nas características da
     * molécula investigada é": setenta caracteres, cinco alternativas, e
     * nenhuma molécula descrita em lugar nenhum. É pior que questão faltando,
     * porque parece completa na listagem e só decepciona quem abre.
     *
     * Com figura o critério muda de sentido: aí o enunciado pode ser curto
     * porque o conteúdo está na imagem, e cortar por tamanho descartaria
     * questão boa.
     */
    if (enunciado.length < (temFigura ? 40 : 200)) {
      motivos.push(`enunciado incompleto (${enunciado.length} caracteres, sem figura que o justifique)`)
    }

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
      imagens,
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
