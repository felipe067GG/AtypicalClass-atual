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

/** Quais barreiras estas medidas configuram. */
export function barreirasDe(m) {
  const achadas = []

  if (m.caracteres >= LIMIARES.caracteres) achadas.push("leitura-longa")

  // Medida separada do tamanho total, e não redundante com ele: das 878
  // questões de período longo, 657 têm enunciado curto. Um texto de 500
  // caracteres em duas frases exige mais de quem decodifica do que os mesmos
  // 500 caracteres em seis.
  if (m.palavrasPorFrase >= LIMIARES.palavrasPorFrase) achadas.push("periodo-longo")

  if (m.caracteresAlternativas >= LIMIARES.caracteresAlternativas) achadas.push("alternativas-longas")
  if (m.numeros >= LIMIARES.numeros) achadas.push("muitos-numeros")
  if (m.temFigura) achadas.push("figura-essencial")
  if (m.alternativasSoNumero) achadas.push("alternativas-numericas")

  // Duas formas de encadeamento, e elas não se sobrepõem muito: o texto que
  // narra a sequência ("em seguida... ao final") e o cálculo que a impõe sem
  // narrar nada, típico de Matemática e Física.
  const encadeiaPorTexto = m.marcadoresDeOrdem >= LIMIARES.marcadoresDeEtapa
  const encadeiaPorConta = m.alternativasSoNumero && m.numeros >= LIMIARES.numerosParaCadeia
  if (encadeiaPorTexto || encadeiaPorConta) achadas.push("cadeia-de-etapas")

  if (m.densidadeVocabulario >= LIMIARES.densidadeVocabulario) achadas.push("vocabulario-denso")

  return achadas
}

export function medir(questao) {
  const m = medidas(questao)
  return { medidas: m, barreiras: barreirasDe(m) }
}
