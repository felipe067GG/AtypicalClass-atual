/**
 * Detectores de barreira: o que se pode medir de uma questão sem opinar.
 *
 * A crítica que originou este arquivo foi a de que "dê tempo estendido e leia
 * em voz alta" não adapta *aquela* questão. Um detector não aconselha nada: ele
 * conta. Diz que são 6 números espalhados por 8 frases antes do primeiro
 * cálculo, e que as cinco alternativas são só números. Quem transforma isso em
 * instrução é a matriz de `lib/adaptacao/matriz.ts`, e lá cada afirmação tem
 * fonte.
 *
 * Os limiares são percentis da distribuição real do acervo, não números
 * escolhidos a dedo — `rodar.mjs` reimprime os percentis a cada execução, de
 * modo que o dia em que o acervo crescer e a distribuição andar, isso aparece.
 *
 * Este arquivo é `.mjs`, e não `.ts`, porque roda em Node sem etapa de build,
 * ao lado dos outros scripts de importação. O vocabulário das barreiras vive em
 * `lib/adaptacao/barreiras.ts` (que é o que o site lê) e `rodar.mjs` confere
 * que os dois lados não tenham derivado.
 */

/** Ids das barreiras. Precisam bater com `BarreiraId` em `lib/adaptacao/barreiras.ts`. */
export const IDS = [
  "leitura-longa",
  "periodo-longo",
  "alternativas-longas",
  "muitos-numeros",
  "figura-essencial",
  "alternativas-numericas",
  "cadeia-de-etapas",
  "vocabulario-denso",
]

/**
 * Limiares, com o percentil que cada um representa no acervo de 3.495 questões.
 *
 * Medidos em 09/08/2026 sobre o texto já limpo — ou seja, sobre o que o aluno
 * de fato lê, sem as linhas de atribuição de fonte. São os percentis exatos,
 * sem arredondar: "868 é o percentil 75 deste acervo" é verificável, enquanto
 * "850 é um enunciado longo" seria palpite com cara de número.
 */
export const LIMIARES = {
  /** p75 dos caracteres do enunciado. */
  caracteres: 868,
  /** p75 das palavras por frase. A mediana é 17,1. */
  palavrasPorFrase: 21.8,
  /** p75 da soma dos textos das alternativas. */
  caracteresAlternativas: 407,
  /** p75 dos números distintos do enunciado; a mediana é 2. */
  numeros: 4,
  /** p90 da densidade de palavras com 13 letras ou mais. */
  densidadeVocabulario: 0.0385,
  /** Palavras mínimas para a densidade fazer sentido: abaixo disso, uma palavra estoura a proporção. */
  palavrasParaDensidade: 20,
  /** Marcadores de ordem que indicam encadeamento. */
  marcadoresDeEtapa: 2,
  /** Números distintos que, com alternativas numéricas, já configuram cálculo em etapas. */
  numerosParaCadeia: 3,
}

/**
 * A segunda régua: material de nível escolar.
 *
 * ## Por que ela existe
 *
 * Os limiares acima são percentis de prova de acesso ao ensino superior, e o
 * adaptador vai receber o que o professor dá na aula de quinta. Medido em
 * 11/08/2026 sobre as 280 questões autorais — escritas de propósito para quem
 * ainda não alcança uma questão de ENEM —, **91% não disparavam barreira
 * nenhuma**, contra 13% no acervo real. Uma ferramenta que responde "nenhuma
 * barreira" para nove de cada dez atividades não serve para nada.
 *
 * ## De onde vêm estes números
 *
 * Das **199 questões do Encceja Ensino Fundamental**, 2018 e 2020, quatro
 * matérias (Matemática, Ciências Naturais, História e Geografia, Língua
 * Portuguesa). É prova oficial do INEP de nível de 9º ano — não é o caderno do
 * professor, mas é material de escola de verdade, amplo entre matérias e
 * verificável, que era o que faltava. As autorais serviram para acusar o
 * problema e não servem para calibrar: fui eu que as escrevi curtas.
 *
 * **O que este corpus não mede:** figura. O texto sai de PDF, e imagem não
 * atravessa — `figura-essencial` deu 0% aqui e isso é do extrator, não do
 * material. Numa folha de atividade de escola é a barreira que mais dispara.
 *
 * ## Só duas medidas precisaram de número novo
 *
 * A comparação dos percentis é o achado, e ele é bem mais estreito do que
 * "a régua está toda errada":
 *
 * | medida | escolar | ENEM | |
 * |---|---|---|---|
 * | palavras por frase (p75) | 21,3 | 21,8 | transfere |
 * | números distintos (p75) | 4 | 4 | transfere |
 * | vocabulário denso (p90) | 0,0385 | 0,0385 | transfere |
 * | **caracteres (p75)** | **604** | 868 | régua nova |
 * | **alternativas (p75)** | **220** | 407 | régua nova |
 *
 * Comprimento de frase, quantidade de dados e palavra longa são propriedades do
 * português escrito para avaliação, e não do nível da prova. O que muda com o
 * nível é o **tamanho** do texto e o das alternativas.
 */
export const LIMIARES_ESCOLARES = {
  ...LIMIARES,
  /** p75 dos caracteres do enunciado no Encceja EF. */
  caracteres: 604,
  /** p75 das palavras por frase; praticamente o mesmo do ENEM (21,8). */
  palavrasPorFrase: 21.3,
  /** p75 da soma das alternativas no Encceja EF. */
  caracteresAlternativas: 220,
}

/**
 * Onde cada medida cai na distribuição da régua.
 *
 * Existe para a ferramenta nunca responder "nenhuma barreira" e parar aí. 42%
 * das questões do Encceja e 13% das do ENEM não disparam barreira alguma, e
 * para elas não há o que orientar — mas há o que **relatar**. "Enunciado de 390
 * caracteres, p40 do material escolar" é informação; "nenhuma barreira" parece
 * laudo e é silêncio.
 *
 * Os percentis são os medidos em 11/08/2026, e a posição entre dois deles é
 * interpolada. Não é a distribuição inteira: é o suficiente para situar.
 */
export const PERCENTIS = {
  enem: {
    caracteres: { 25: 377, 50: 622, 75: 868, 90: 1196, 95: 1396 },
    palavrasPorFrase: { 25: 13.5, 50: 17.1, 75: 21.8, 90: 27, 95: 31 },
    caracteresAlternativas: { 25: 55, 50: 223, 75: 406, 90: 634, 95: 777 },
    numeros: { 25: 0, 50: 2, 75: 4, 90: 6, 95: 8 },
    densidadeVocabulario: { 25: 0, 50: 0.0098, 75: 0.0227, 90: 0.0385, 95: 0.0507 },
  },
  escolar: {
    caracteres: { 25: 238, 50: 418, 75: 604, 90: 755, 95: 823 },
    palavrasPorFrase: { 25: 11, 50: 16.1, 75: 21.3, 90: 27.5, 95: 30.3 },
    caracteresAlternativas: { 25: 70, 50: 144, 75: 220, 90: 321, 95: 391 },
    numeros: { 25: 1, 50: 2, 75: 4, 90: 8, 95: 10 },
    densidadeVocabulario: { 25: 0, 50: 0, 75: 0.0172, 90: 0.0385, 95: 0.05 },
  },
}

/** O percentil aproximado de um valor, na distribuição declarada em `PERCENTIS`. */
export function percentilDe(medida, valor, corpus = "enem") {
  const marcos = PERCENTIS[corpus]?.[medida]
  if (!marcos) return null
  const pontos = Object.entries(marcos)
    .map(([p, v]) => [Number(p), v])
    .sort((a, b) => a[0] - b[0])
  if (valor <= pontos[0][1]) return pontos[0][0]
  for (let i = 1; i < pontos.length; i += 1) {
    const [pAnterior, vAnterior] = pontos[i - 1]
    const [pAtual, vAtual] = pontos[i]
    if (valor <= vAtual) {
      const fatia = vAtual === vAnterior ? 0 : (valor - vAnterior) / (vAtual - vAnterior)
      return Math.round(pAnterior + fatia * (pAtual - pAnterior))
    }
  }
  return pontos[pontos.length - 1][0]
}

/**
 * O que se mediu, dito de um jeito que sobrevive a não haver barreira nenhuma.
 *
 * Devolve sempre alguma coisa. É a peça que impede o "não achei nada".
 */
export function relatar(m, corpus = "enem") {
  return Object.keys(PERCENTIS[corpus] ?? {}).map((medida) => ({
    medida,
    valor: m[medida],
    percentil: percentilDe(medida, m[medida], corpus),
  }))
}

/**
 * Linhas que o aluno não lê como conteúdo.
 *
 * A atribuição de fonte ("Disponível em: ... Acesso em: 2 fev. 2015") aparece
 * em 70% do acervo e chega a 120 caracteres. Contá-la como carga de leitura
 * inflaria toda a distribuição, e pior: os anos das datas entrariam na conta
 * dos números a reter, que é justamente a medida mais sensível.
 */
const ATRIBUICAO = /^\s*(dispon[íi]vel em|acesso em|fonte:|adaptado|texto adaptado|in:)\b/i

/** Resíduos de importação que ocupam texto sem serem texto. */
const MARCADOR_DE_IMAGEM = /\[IMAGE \d+\]|!\[[^\]]*\]\([^)]*\)/g

/** O enunciado como o aluno o encontra: sem marcador de imagem e sem atribuição. */
export function textoLimpo(questao) {
  return (questao.enunciado ?? "")
    .replace(MARCADOR_DE_IMAGEM, " ")
    .split(/\n+/)
    .filter((linha) => !ATRIBUICAO.test(linha))
    .join("\n")
    .replace(/[ \t]+/g, " ")
    .trim()
}

/**
 * A frase que faz a pergunta.
 *
 * É a última frase da última linha de conteúdo. Fica registrada nas medidas
 * porque é o que o professor precisa reler para saber o que a questão pede —
 * o texto de apoio pode ser recortado, o comando não.
 *
 * ## Um detector que foi medido e descartado
 *
 * Havia aqui uma barreira de "comando pela negativa" — a questão que pergunta
 * o que **não** é o caso, e faz quem lê rápido responder à pergunta oposta. Ela
 * é barreira reconhecida, mas **não existe neste acervo**: procurando "não",
 * "exceto", "incorreta" e "falsa" na frase do comando, 1 questão em 3.495. O
 * ENEM desaconselha item pela negativa na própria diretriz de elaboração, e
 * USP e UNICAMP seguem o mesmo padrão nas provas importadas.
 *
 * A primeira versão do detector procurava a negação no enunciado inteiro e
 * acusava 922 questões — todas falso positivo, "não" comum no texto de apoio
 * ("pessoas não vacinadas", "que não cause danos", o samba "Não tem tradução").
 * Fica o registro para ninguém reintroduzir a barreira sem antes medir: um
 * detector que dispara em 26% do acervo e acerta em nenhum é pior que não ter
 * detector, porque ensina o professor a ignorar o aviso.
 */
export function comando(questao) {
  const linhas = textoLimpo(questao)
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
  const ultima = linhas[linhas.length - 1] ?? ""
  const frases = ultima.split(/(?<=[.!?:])\s+/).filter(Boolean)
  return frases[frases.length - 1] ?? ultima
}

const MARCADORES_DE_ORDEM =
  /\b(em seguida|ap[óo]s|depois disso|a seguir|ent[ãa]o|sabendo(?:-se)? que|considerando que|por sua vez|primeiramente|inicialmente|ao final|em cada)\b/gi

/**
 * Uma alternativa que é só número.
 *
 * Aceita sinal, separador decimal e uma unidade curta colada ("12 cm", "3,5 L"),
 * porque "12 cm" não dá mais pista de sentido que "12". Não aceita alternativa
 * com palavra: "12 anos de atraso" tem conteúdo a comparar.
 */
const SO_NUMERO = /^[\s(]*[-−+]?\s*[\d]+(?:[.,\s]\d+)*\s*(?:[a-zA-Zµ°%/·×^²³Ωπ]{1,4})?\s*[)\s.]*$/

export function alternativaSoNumero(texto) {
  const t = (texto ?? "").trim()
  return t.length > 0 && SO_NUMERO.test(t)
}

/**
 * Números distintos do enunciado.
 *
 * Distintos, e não ocorrências: um valor repetido três vezes no texto é um
 * dado só a segurar na memória, e contá-lo três vezes faria uma questão
 * insistente parecer mais pesada que uma questão com três dados diferentes.
 */
function numerosDistintos(texto) {
  const achados = texto.match(/(?<![\w,.])\d+(?:[.,]\d+)?/g) ?? []
  return new Set(achados.map((n) => n.replace(",", "."))).size
}

function frases(texto) {
  return texto.split(/[.!?](?:\s|$)/).filter((s) => s.trim().length > 3).length
}

function densidadeDeVocabulario(texto) {
  const palavras = texto.split(/\s+/).filter((p) => /^[A-Za-zÀ-ÿ-]+$/.test(p))
  if (palavras.length < LIMIARES.palavrasParaDensidade) return 0
  return palavras.filter((p) => p.length >= 13).length / palavras.length
}

/** Tudo que se pode contar nesta questão. Sem juízo, só medida. */
export function medidas(questao) {
  const texto = textoLimpo(questao)
  const alternativas = questao.alternativas ?? []
  const textosDeAlternativa = alternativas.map((a) => a.texto ?? "")

  const palavras = texto.split(/\s+/).filter(Boolean).length
  const totalDeFrases = frases(texto)

  return {
    caracteres: texto.length,
    palavras,
    frases: totalDeFrases,
    palavrasPorFrase: totalDeFrases ? Number((palavras / totalDeFrases).toFixed(1)) : 0,
    numeros: numerosDistintos(texto),
    caracteresAlternativas: textosDeAlternativa.reduce((s, t) => s + t.length, 0),
    maiorAlternativa: Math.max(0, ...textosDeAlternativa.map((t) => t.length)),
    densidadeVocabulario: Number(densidadeDeVocabulario(texto).toFixed(4)),
    marcadoresDeOrdem: (texto.match(MARCADORES_DE_ORDEM) ?? []).length,
    temFigura: (questao.imagens?.length ?? 0) > 0 || alternativas.some((a) => a.imagem),
    temDescricaoDeFigura: (questao.descricoesDeFiguras?.length ?? 0) > 0,
    alternativasSoNumero: alternativas.length > 0 && textosDeAlternativa.every(alternativaSoNumero),
    comando: comando(questao),
  }
}

/**
 * Quais barreiras estas medidas configuram, na régua escolhida.
 *
 * A régua entra por parâmetro e não por variável global porque as duas
 * convivem: `rodar.mjs` mede as 3.495 questões de prova real e continua na do
 * ENEM, enquanto o que o professor colar deve ser medido na escolar. Uma
 * ferramenta que use a régua errada não erra por pouco — erra em 91% dos casos.
 */
export function barreirasDe(m, regua = LIMIARES) {
  const achadas = []

  if (m.caracteres >= regua.caracteres) achadas.push("leitura-longa")

  // Medida separada do tamanho total, e não redundante com ele: das 878
  // questões de período longo, 657 têm enunciado curto. Um texto de 500
  // caracteres em duas frases exige mais de quem decodifica do que os mesmos
  // 500 caracteres em seis.
  if (m.palavrasPorFrase >= regua.palavrasPorFrase) achadas.push("periodo-longo")

  if (m.caracteresAlternativas >= regua.caracteresAlternativas) achadas.push("alternativas-longas")
  if (m.numeros >= regua.numeros) achadas.push("muitos-numeros")
  if (m.temFigura) achadas.push("figura-essencial")
  if (m.alternativasSoNumero) achadas.push("alternativas-numericas")

  // Duas formas de encadeamento, e elas não se sobrepõem muito: o texto que
  // narra a sequência ("em seguida... ao final") e o cálculo que a impõe sem
  // narrar nada, típico de Matemática e Física.
  const encadeiaPorTexto = m.marcadoresDeOrdem >= regua.marcadoresDeEtapa
  const encadeiaPorConta = m.alternativasSoNumero && m.numeros >= regua.numerosParaCadeia
  if (encadeiaPorTexto || encadeiaPorConta) achadas.push("cadeia-de-etapas")

  if (m.densidadeVocabulario >= regua.densidadeVocabulario) achadas.push("vocabulario-denso")

  return achadas
}

/**
 * Medir uma questão na régua escolhida.
 *
 * `relatorio` vai junto de propósito: quem consumir isto não pode ficar só com
 * `barreiras`, porque `barreiras` vazio é o caso mais comum em material de
 * escola — 42% no Encceja — e "não achei nada" é a resposta que faz uma
 * ferramenta parecer quebrada quando ela está certa.
 */
export function medir(questao, { regua = LIMIARES, corpus = "enem" } = {}) {
  const m = medidas(questao)
  return { medidas: m, barreiras: barreirasDe(m, regua), relatorio: relatar(m, corpus) }
}

/** Medir como o professor colou: régua escolar e percentis do material de escola. */
export function medirDeEscola(questao) {
  return medir(questao, { regua: LIMIARES_ESCOLARES, corpus: "escolar" })
}
