import { ml } from "@/lib/i18n-content"
import type { LocalizedText } from "@/lib/i18n-content"

/**
 * As barreiras que os detectores medem em cada questão.
 *
 * Este arquivo é vocabulário, não conteúdo: descreve **o que é medido**, e o
 * que é medido sai da própria questão. Que o enunciado tem 1.240 caracteres,
 * que há 7 números a reter, que as cinco alternativas são só números — isso é
 * dado, e por isso aqui não há `citations`. A regra está escrita em
 * `tipos.ts`: fonte é exigida de afirmação pedagógica, e é na matriz
 * (`matriz.ts`) que se afirma o que cada barreira *significa* para cada aluno.
 *
 * Separar as duas coisas é o que impede o conselho genérico. O detector nunca
 * diz "dê tempo estendido": ele diz que esta questão tem 6 números espalhados
 * por 8 frases antes do primeiro cálculo. É a matriz que transforma isso em
 * instrução, e ela precisa de fonte.
 *
 * ## Sobre os limiares
 *
 * Nenhum limiar aqui foi escolhido no olho. Cada um é um percentil da
 * distribuição real das 3.495 questões do acervo, medido em 09/08/2026 — o
 * percentil 75 do próprio ENEM é uma afirmação verificável ("um quarto das
 * questões é mais longa que esta"), enquanto "enunciado longo é acima de 800
 * caracteres" seria palpite com cara de número.
 *
 * `scripts/detectores/rodar.mjs` reimprime os percentis atuais a cada
 * execução. Se o acervo crescer e a distribuição andar, a diferença aparece
 * ali em vez de envelhecer em silêncio.
 *
 * ## Uma barreira que foi medida e não entrou
 *
 * Faltou aqui, de propósito, o "comando pela negativa" — a questão que pergunta
 * o que **não** é o caso. É barreira reconhecida, mas o acervo tem uma questão
 * assim, em 3.495: o ENEM desaconselha item pela negativa na diretriz de
 * elaboração. Está registrado em `scripts/detectores/medir.mjs` para não ser
 * reintroduzido sem medida.
 */

/** Identificador estável de uma barreira. Usado na matriz e no `data/barreiras.json`. */
export type BarreiraId =
  | "leitura-longa"
  | "periodo-longo"
  | "alternativas-longas"
  | "muitos-numeros"
  | "figura-essencial"
  | "alternativas-numericas"
  | "cadeia-de-etapas"
  | "vocabulario-denso"

export interface Barreira {
  id: BarreiraId
  nome: LocalizedText
  /** O que o detector conta, em palavras do professor. */
  oQueMede: LocalizedText
  /** O limiar e de onde ele veio — o percentil do acervo, não uma opinião. */
  limiar: LocalizedText
}

export const BARREIRAS: Barreira[] = [
  {
    id: "leitura-longa",
    nome: ml("Enunciado longo", "Long stem", "Enunciado largo"),
    oQueMede: ml(
      "Quantos caracteres e quantas frases o aluno precisa atravessar antes de responder.",
      "How many characters and sentences the student must cross before answering.",
      "Cuántos caracteres y frases debe atravesar el estudiante antes de responder.",
    ),
    limiar: ml(
      "A partir de 868 caracteres — o percentil 75 do acervo, ou seja, um quarto das questões é mais longa que isso.",
      "From 868 characters — the collection's 75th percentile, meaning a quarter of the questions are longer.",
      "A partir de 868 caracteres — el percentil 75 del acervo: una cuarta parte de las preguntas es más larga.",
    ),
  },
  {
    id: "periodo-longo",
    nome: ml("Período longo", "Long sentences", "Período largo"),
    oQueMede: ml(
      "Quantas palavras cabem, em média, em cada frase. É medida diferente do tamanho do enunciado, e não redundante com ela: das 878 questões de período longo, 657 têm enunciado curto. Quinhentos caracteres em duas frases exigem mais de quem decodifica que os mesmos quinhentos em seis.",
      "How many words fit, on average, in each sentence. It is a different measure from stem length, and not redundant with it: of the 878 long-sentence questions, 657 have a short stem. Five hundred characters in two sentences demand more of a struggling decoder than the same five hundred in six.",
      "Cuántas palabras caben, en promedio, en cada frase. Es una medida distinta del tamaño del enunciado y no redundante con ella: de las 878 preguntas de período largo, 657 tienen enunciado corto. Quinientos caracteres en dos frases exigen más a quien decodifica que los mismos quinientos en seis.",
    ),
    limiar: ml(
      "A partir de 21,8 palavras por frase — percentil 75 do acervo, onde a mediana é 17,1.",
      "From 21.8 words per sentence — the collection's 75th percentile, where the median is 17.1.",
      "A partir de 21,8 palabras por frase — percentil 75 del acervo, donde la mediana es 17,1.",
    ),
  },
  {
    id: "alternativas-longas",
    nome: ml("Alternativas longas", "Long options", "Alternativas largas"),
    oQueMede: ml(
      "O texto somado das cinco alternativas. Uma questão pode ter enunciado curto e ainda assim exigir a leitura de um parágrafo em cada opção.",
      "The combined text of the five options. A question may have a short stem and still demand reading a paragraph in each option.",
      "El texto sumado de las cinco alternativas. Una pregunta puede tener enunciado corto y aun así exigir leer un párrafo en cada opción.",
    ),
    limiar: ml(
      "A partir de 407 caracteres somados — percentil 75 do acervo.",
      "From 407 combined characters — the collection's 75th percentile.",
      "A partir de 407 caracteres sumados — percentil 75 del acervo.",
    ),
  },
  {
    id: "muitos-numeros",
    nome: ml("Muitos números a reter", "Many numbers to hold", "Muchos números que retener"),
    oQueMede: ml(
      "Quantos valores numéricos aparecem no enunciado. Cada um é um dado que o aluno carrega enquanto lê o resto.",
      "How many numeric values appear in the stem. Each is a datum the student carries while reading the rest.",
      "Cuántos valores numéricos aparecen en el enunciado. Cada uno es un dato que el estudiante carga mientras lee el resto.",
    ),
    limiar: ml(
      "A partir de 4 números distintos — percentil 75 do acervo, onde a mediana é 2. Distintos, e não ocorrências: um valor repetido no texto é um dado só a segurar.",
      "From 4 distinct numbers — the collection's 75th percentile, where the median is 2. Distinct, not occurrences: a value repeated in the text is a single datum to hold.",
      "A partir de 4 números distintos — percentil 75 del acervo, donde la mediana es 2. Distintos, no ocurrencias: un valor repetido en el texto es un solo dato que sostener.",
    ),
  },
  {
    id: "figura-essencial",
    nome: ml("Depende de figura", "Depends on a figure", "Depende de figura"),
    oQueMede: ml(
      "Se a questão traz gráfico, mapa, esquema ou imagem — e, separadamente, se essa figura tem audiodescrição oficial do INEP. Uma figura sem descrição não é uma questão difícil: é uma questão indisponível.",
      "Whether the question carries a chart, map, diagram or image — and, separately, whether that figure has an official INEP audio description. A figure without a description is not a hard question: it is an unavailable one.",
      "Si la pregunta trae gráfico, mapa, esquema o imagen — y, por separado, si esa figura tiene audiodescripción oficial del INEP. Una figura sin descripción no es una pregunta difícil: es una pregunta no disponible.",
    ),
    limiar: ml(
      "Presença de imagem, sem limiar. 1.409 questões do acervo têm figura e 723 delas ainda não têm descrição.",
      "Presence of an image, no threshold. 1,409 questions carry a figure and 723 of them still lack a description.",
      "Presencia de imagen, sin umbral. 1.409 preguntas traen figura y 723 aún no tienen descripción.",
    ),
  },
  {
    id: "alternativas-numericas",
    nome: ml("Alternativas só numéricas", "Purely numeric options", "Alternativas solo numéricas"),
    oQueMede: ml(
      "Se as cinco alternativas são apenas números, sem texto que as distinga. Aí a escolha final não dá nenhuma pista de sentido: ou a conta bateu, ou não bateu.",
      "Whether all five options are bare numbers, with no wording to tell them apart. The final choice then offers no cue of meaning: either the arithmetic matched, or it did not.",
      "Si las cinco alternativas son solo números, sin texto que las distinga. La elección final no ofrece ninguna pista de sentido: o la cuenta coincidió, o no.",
    ),
    limiar: ml(
      "Todas as alternativas numéricas. Acontece em 394 questões — 265 de Matemática, 87 de Física, 25 de Química.",
      "All options numeric. It happens in 394 questions — 265 in Mathematics, 87 in Physics, 25 in Chemistry.",
      "Todas las alternativas numéricas. Ocurre en 394 preguntas — 265 de Matemática, 87 de Física, 25 de Química.",
    ),
  },
  {
    id: "cadeia-de-etapas",
    nome: ml("Etapas encadeadas", "Chained steps", "Etapas encadenadas"),
    oQueMede: ml(
      "Se a questão pede uma sequência de passos em que cada resultado alimenta o seguinte — pelos marcadores de ordem no texto (\"em seguida\", \"sabendo que\", \"ao final\") ou por ser um cálculo numérico com vários dados.",
      "Whether the question asks for a sequence of steps in which each result feeds the next — detected by ordering markers in the text (\"then\", \"knowing that\", \"finally\") or by being a numeric calculation with several data points.",
      "Si la pregunta pide una secuencia de pasos en que cada resultado alimenta al siguiente — por los marcadores de orden en el texto (\"en seguida\", \"sabiendo que\", \"al final\") o por ser un cálculo numérico con varios datos.",
    ),
    limiar: ml(
      "Dois ou mais marcadores de ordem, ou alternativas numéricas com pelo menos 3 números no enunciado.",
      "Two or more ordering markers, or numeric options with at least 3 numbers in the stem.",
      "Dos o más marcadores de orden, o alternativas numéricas con al menos 3 números en el enunciado.",
    ),
  },
  {
    id: "vocabulario-denso",
    nome: ml("Vocabulário denso", "Dense vocabulary", "Vocabulario denso"),
    oQueMede: ml(
      "A proporção de palavras longas (13 letras ou mais) no enunciado. É o indício mecânico de termo técnico — \"biodisponibilidade\", \"industrialização\" — e mede decodificação, não conhecimento.",
      "The share of long words (13 letters or more) in the stem. It is the mechanical trace of technical terms — \"bioavailability\", \"industrialisation\" — and measures decoding, not knowledge.",
      "La proporción de palabras largas (13 letras o más) en el enunciado. Es el indicio mecánico del término técnico — \"biodisponibilidad\", \"industrialización\" — y mide decodificación, no conocimiento.",
    ),
    limiar: ml(
      "A partir de 3,85% das palavras — percentil 90 do acervo. Só vale para enunciados com pelo menos 20 palavras, porque em texto curto uma palavra já estoura qualquer proporção.",
      "From 3.85% of words — the collection's 90th percentile. It applies only to stems of at least 20 words, since in a short text a single word blows past any ratio.",
      "A partir del 3,85% de las palabras — percentil 90 del acervo. Solo vale para enunciados de al menos 20 palabras: en un texto corto una sola palabra desborda cualquier proporción.",
    ),
  },
]

export function barreiraDe(id: string): Barreira | undefined {
  return BARREIRAS.find((b) => b.id === id)
}
