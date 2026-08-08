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

async function buscarQuestao(ano, numero, idioma = null) {
  const url = idioma ? `${API}/${ano}/questions/${numero}?language=${idioma}` : `${API}/${ano}/questions/${numero}`

  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa += 1) {
    try {
      const resposta = await fetch(url, {
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
 * A identificação é por dominância: nove décimos de concordância bastam. O
 * caderno certo fica perto de 100% e os errados perto de 20%, que é o acaso de
 * cinco alternativas — a distância é enorme e não precisa de unanimidade para
 * ser lida.
 *
 * Duas regras mais duras foram tentadas aqui, e as duas rejeitaram dado bom.
 *
 * A primeira exigia 100%. Em 2020 o caderno azul batia 40 de 41 contra 34% do
 * segundo colocado, e o ano era descartado por uma divergência — confundindo
 * duas perguntas diferentes: "qual caderno é este?" e "esta questão está
 * certa?". A segunda continua sendo respondida questão por questão, e a
 * divergente é rejeitada sozinha.
 *
 * A segunda exigia que o primeiro tivesse 2,5 vezes a taxa do segundo, e era
 * impossível de satisfazer: taxa vai no máximo a 1,0, então qualquer segundo
 * acima de 40% tornava a exigência inalcançável. Em 2010, Linguagens tinha um
 * caderno com 44 de 45 contra outro com 32 e era descartado porque 98% não
 * chega a 178%. Também não protegia de nada — acertar 44 de 45 entre cinco
 * opções não acontece por acaso, e quando dois cadernos empatam no topo é
 * porque são a mesma prova sob `CO_PROVA` diferentes, caso em que o desempate
 * por dificuldade mais completa resolve.
 */
const CONCORDANCIA_MINIMA = 0.9

function identificarCaderno(itens, daApi) {
  const candidatos = new Map()

  for (const item of itens) {
    const chave = `${item.cor}|${item.prova}`
    if (!candidatos.has(chave)) candidatos.set(chave, { acertos: 0, total: 0, comDificuldade: 0 })
    const placar = candidatos.get(chave)

    const questao = daApi.get(item.posicao)
    // Item de idioma diferente do que a API devolveu nao entra na conta: a
    // versao em ingles nunca vai bater com o gabarito da versao em espanhol.
    if (!questao || !mesmoIdioma(item, questao)) continue
    placar.total += 1
    if (questao.correctAlternative === item.gabarito) placar.acertos += 1
    if (item.dificuldadeB !== null) placar.comDificuldade += 1
  }

  const ranking = [...candidatos.entries()]
    .filter(([, p]) => p.total >= 20)
    .map(([chave, p]) => ({ chave, ...p, taxa: p.acertos / p.total }))
    .sort((a, b) => b.taxa - a.taxa || b.comDificuldade - a.comDificuldade)

  const [melhor] = ranking
  if (!melhor || melhor.taxa < CONCORDANCIA_MINIMA) return null

  const [cor, prova] = melhor.chave.split("|")
  return { cor, prova, acertos: melhor.acertos, total: melhor.total }
}

/**
 * Casa o item dos microdados com o idioma que a API devolveu.
 *
 * As cinco primeiras questões de Linguagens são de língua estrangeira, e cada
 * uma existe em duas versões — inglês e espanhol — com gabaritos diferentes.
 * Nos microdados isso aparece como dois itens na mesma posição, distinguidos
 * por `TP_LINGUA`.
 *
 * Descartar o espanhol de saída parecia razoável e estava errado: a API devolve
 * justamente a versão em espanhol. As cinco divergiam, a concordância caía de
 * 100% para 89% e todo ano de Linguagens era rejeitado por raspar no piso de
 * 90%. O erro não era de prova, era de idioma.
 */
const IDIOMA = { 0: "ingles", 1: "espanhol" }

/** Nome da matéria, que aqui é oficial: a prova separa as duas versões. */
const MATERIA_DO_IDIOMA = { ingles: "Inglês", espanhol: "Espanhol" }

function mesmoIdioma(item, questaoDaApi) {
  if (item.lingua === null) return true
  return IDIOMA[item.lingua] === questaoDaApi?.language
}

export async function importar({ ano, area, lidas = {} }) {
  const todos = lerItens(await obterItens(ano)).filter((i) => i.area === area)
  if (!todos.length) throw new Error(`Microdados de ${ano} não trazem itens da área ${area}`)

  const posicoes = [...new Set(todos.map((i) => i.posicao))].sort((a, b) => a - b)

  /**
   * As cinco questões de língua estrangeira existem em duas versões.
   *
   * A API devolve o espanhol por padrão e guarda o inglês atrás do parâmetro
   * `?language=ingles`. Buscar as duas rende dez questões por ano no lugar de
   * cinco — e, melhor, faz Inglês e Espanhol existirem como matérias, com
   * rótulo oficial: aqui não é interpretação nossa, é a própria prova que
   * separa as versões.
   */
  const posicoesComIdioma = new Set(todos.filter((i) => i.lingua !== null).map((i) => i.posicao))

  // Uma passada só na API: as questões são reaproveitadas tanto para
  // identificar o caderno quanto para montar o acervo.
  const daApi = new Map()
  const porIdioma = new Map()

  for (const posicao of posicoes) {
    const questao = await buscarQuestao(ano, posicao)
    if (questao) daApi.set(posicao, questao)
    await espera(PAUSA_MS)

    if (!posicoesComIdioma.has(posicao)) continue

    for (const idioma of ["ingles", "espanhol"]) {
      const variante = await buscarQuestao(ano, posicao, idioma)
      if (variante) porIdioma.set(`${posicao}|${idioma}`, variante)
      await espera(PAUSA_MS)
    }
  }

  const caderno = identificarCaderno(todos, daApi)
  if (!caderno) {
    throw new Error(
      `Nenhum caderno de ${area}/${ano} concorda o bastante com as respostas da API ` +
        `(mínimo ${Math.round(CONCORDANCIA_MINIMA * 100)}% de concordância). ` +
        "Sem identificar o caderno, dificuldade e gabarito viriam de outra prova.",
    )
  }

  // A chave leva o idioma porque uma posição de língua estrangeira tem dois
  // itens oficiais, com gabaritos diferentes. Sem isso, um deles sobrescreve o
  // outro e metade das questões recebe a resposta da versão errada.
  const oficiais = new Map(
    todos
      .filter((i) => i.cor === caderno.cor && i.prova === caderno.prova)
      .map((i) => [`${i.posicao}|${i.lingua === null ? "" : IDIOMA[i.lingua]}`, i]),
  )

  /** Uma entrada por questão a importar — duas nas posições bilíngues. */
  const aProcessar = []
  for (const [posicao, questao] of daApi) {
    if (!posicoesComIdioma.has(posicao)) aProcessar.push({ posicao, questao, idioma: null })
  }
  for (const [chave, questao] of porIdioma) {
    const [posicao, idioma] = chave.split("|")
    aProcessar.push({ posicao: Number(posicao), questao, idioma })
  }
  aProcessar.sort((a, b) => a.posicao - b.posicao || (a.idioma ?? "").localeCompare(b.idioma ?? ""))

  const questoes = []
  const rejeitadas = []

  for (const { posicao, questao, idioma } of aProcessar) {
    const oficial = oficiais.get(`${posicao}|${idioma ?? ""}`)
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

    // Em língua estrangeira a matéria é oficial: a própria prova separa as
    // versões, então não há o que interpretar nem o que auditar.
    const oficialDoIdioma = idioma ? MATERIA_DO_IDIOMA[idioma] : null
    const automatica = oficialDoIdioma
      ? { materia: null }
      : proporMateria({ enunciado, alternativas, descricoesDeFiguras: [] }, area)
    // A chave carrega a cor do caderno de propósito. As cores embaralham a
    // ordem dentro da área, então a questão 97 do amarelo não é a 97 do azul —
    // uma leitura feita num caderno aplicada a outro rotularia a questão
    // errada, e em silêncio, que é o pior modo de errar aqui.
    const lida = lidas[`${ano}-${caderno.cor}-${posicao}`] ?? null
    const materia = oficialDoIdioma ?? automatica.materia ?? lida

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
      idioma,
      origemDaMateria: oficialDoIdioma ? "oficial" : automatica.materia ? "vocabulário" : lida ? "leitura" : null,
      fonte: {
        exame: "ENEM",
        ano,
        area,
        cor: caderno.cor,
        numero: posicao,
        idioma,
        provaMicrodados: caderno.prova,
        questaoApi: idioma ? `${API}/${ano}/questions/${posicao}?language=${idioma}` : `${API}/${ano}/questions/${posicao}`,
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
