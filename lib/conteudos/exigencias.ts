import { ml } from "@/lib/i18n-content"
import type { LocalizedText } from "@/lib/i18n-content"

/**
 * O que um conteúdo curricular exige de quem vai aprendê-lo.
 *
 * Este arquivo é vocabulário, não conteúdo: descreve **o que se declara** de um
 * conteúdo, e por isso não há `citations` aqui. Que "balanceamento de equações
 * químicas" exige seguir uma sequência de passos e manipular símbolos é
 * descrição do próprio conteúdo. É em `matriz.ts` que se afirma o que cada
 * exigência *significa* para cada aluno, e lá a fonte é obrigatória.
 *
 * ## Por que exigência, e não especialidade
 *
 * A biblioteca antiga tinha uma coluna `specialty` em cada conteúdo, e o
 * resultado foi "Como Ensinar Números para Alunos com Autismo" — um texto que
 * não é sobre número nenhum em particular e serviria igual para qualquer
 * assunto. Multiplicar 350 conteúdos por 14 especialidades obriga a escrever
 * 4.900 textos, e a única forma de escrever 4.900 textos é repetindo conselho.
 *
 * É o mesmo erro que o acervo de questões já corrigiu: uma questão do ENEM não é
 * "do autismo", e "frações equivalentes" também não. O que muda por aluno é a
 * orientação, e ela vem da matriz — escolhida pelas exigências que o conteúdo
 * declara. Ver `lib/adaptacao/matriz.ts`, que faz o mesmo com as barreiras
 * medidas nas questões.
 *
 * ## A diferença que obriga a um verificador
 *
 * Barreira de questão é **medida** por um detector: o script conta os caracteres
 * e não tem opinião. Exigência de conteúdo é **declarada** por quem escreve, e
 * declaração é onde entra o descuido — um conteúdo que declara as sete
 * exigências não separa nada, e um que declara nenhuma passa despercebido.
 *
 * Por isso `scripts/conteudos/conferir.mjs` cruza o que foi declarado com o que
 * o próprio conteúdo mostra: plano com cinco etapas e sem `sequencia-de-passos`
 * declarado é erro; conteúdo com termo do glossário e sem `vocabulario-tecnico`
 * é erro. Não pega tudo, e pega o que é mecânico.
 */

/** Identificador estável de uma exigência. Usado na matriz e em `data/conteudos/`. */
export type ExigenciaId =
  | "leitura-extensa"
  | "sequencia-de-passos"
  | "vocabulario-tecnico"
  | "representacao-visual"
  | "abstracao-simbolica"
  | "producao-do-aluno"
  | "pratica-concreta"

export interface Exigencia {
  id: ExigenciaId
  nome: LocalizedText
  /** O que caracteriza o conteúdo que faz esta exigência. */
  oQueE: LocalizedText
  /** Como se reconhece que um conteúdo a faz — o critério de quem declara. */
  quandoDeclarar: LocalizedText
}

export const EXIGENCIAS: Exigencia[] = [
  {
    id: "leitura-extensa",
    nome: ml("Leitura extensa", "Extended reading", "Lectura extensa"),
    oQueE: ml(
      "O conteúdo só se aprende atravessando texto: um capítulo, um conto, uma fonte histórica, um artigo. O texto não ilustra a aula — ele é a aula.",
      "The content is only learned by crossing text: a chapter, a short story, a historical source, an article. The text does not illustrate the lesson — it is the lesson.",
      "El contenido solo se aprende atravesando texto: un capítulo, un cuento, una fuente histórica, un artículo. El texto no ilustra la clase — es la clase.",
    ),
    quandoDeclarar: ml(
      "Declare quando não existir versão do conteúdo sem leitura contínua. Um enunciado de exercício não conta; um romance, um documento e um texto de divulgação científica contam.",
      "Declare it when no version of the content exists without continuous reading. An exercise prompt does not count; a novel, a document and a popular-science piece do.",
      "Declárela cuando no exista versión del contenido sin lectura continua. Un enunciado de ejercicio no cuenta; una novela, un documento y un texto de divulgación científica sí.",
    ),
  },
  {
    id: "sequencia-de-passos",
    nome: ml("Sequência de passos", "Step sequence", "Secuencia de pasos"),
    oQueE: ml(
      "Há um procedimento com ordem obrigatória, em que cada passo depende do anterior — o algoritmo da divisão, o balanceamento de uma equação, a análise sintática de um período.",
      "There is a procedure with a mandatory order, where each step depends on the previous one — the long-division algorithm, balancing an equation, parsing a sentence.",
      "Hay un procedimiento con orden obligatorio, donde cada paso depende del anterior — el algoritmo de la división, el balanceo de una ecuación, el análisis sintáctico de un período.",
    ),
    quandoDeclarar: ml(
      "Declare quando trocar a ordem dos passos produzir resultado errado. Se a ordem for preferência didática e não necessidade, não declare.",
      "Declare it when swapping the order of the steps produces a wrong result. If the order is teaching preference rather than necessity, do not declare it.",
      "Declárela cuando cambiar el orden de los pasos produzca un resultado equivocado. Si el orden es preferencia didáctica y no necesidad, no la declare.",
    ),
  },
  {
    id: "vocabulario-tecnico",
    nome: ml("Vocabulário técnico", "Technical vocabulary", "Vocabulario técnico"),
    oQueE: ml(
      "Termos novos que **são** o conteúdo, e não o descrevem: fotossíntese, mitocôndria, oração subordinada, mais-valia. Não saber o termo é não ter o conceito.",
      "New terms that **are** the content rather than describing it: photosynthesis, mitochondrion, subordinate clause, surplus value. Not knowing the term is not having the concept.",
      "Términos nuevos que **son** el contenido, y no lo describen: fotosíntesis, mitocondria, oración subordinada, plusvalía. No saber el término es no tener el concepto.",
    ),
    quandoDeclarar: ml(
      "Declare quando o conteúdo introduzir ao menos três termos que o aluno não encontraria fora da escola. Palavra difícil que tem sinônimo cotidiano não conta.",
      "Declare it when the content introduces at least three terms the student would not meet outside school. A hard word with an everyday synonym does not count.",
      "Declárela cuando el contenido introduzca al menos tres términos que el estudiante no encontraría fuera de la escuela. Palabra difícil con sinónimo cotidiano no cuenta.",
    ),
  },
  {
    id: "representacao-visual",
    nome: ml("Representação visual", "Visual representation", "Representación visual"),
    oQueE: ml(
      "Gráfico, mapa, diagrama, linha do tempo, esquema — a informação está numa forma espacial, e traduzi-la para palavras perde o que ela tem de específico.",
      "A chart, map, diagram, timeline or scheme — the information sits in a spatial form, and translating it into words loses what is specific about it.",
      "Gráfico, mapa, diagrama, línea de tiempo, esquema — la información está en una forma espacial, y traducirla a palabras pierde lo que tiene de específico.",
    ),
    quandoDeclarar: ml(
      "Declare quando a figura carregar informação que o texto não repete. Ilustração decorativa não conta — a pergunta é se o conteúdo sobrevive sem ela.",
      "Declare it when the figure carries information the text does not repeat. A decorative illustration does not count — the question is whether the content survives without it.",
      "Declárela cuando la figura lleve información que el texto no repite. La ilustración decorativa no cuenta — la pregunta es si el contenido sobrevive sin ella.",
    ),
  },
  {
    id: "abstracao-simbolica",
    nome: ml("Abstração simbólica", "Symbolic abstraction", "Abstracción simbólica"),
    oQueE: ml(
      "Símbolos que não se parecem com o que representam: a variável x, a fórmula da velocidade, a notação de conjunto, o símbolo do elemento químico. O sentido é convenção pura.",
      "Symbols that do not resemble what they represent: the variable x, the velocity formula, set notation, the chemical element symbol. The meaning is pure convention.",
      "Símbolos que no se parecen a lo que representan: la variable x, la fórmula de la velocidad, la notación de conjuntos, el símbolo del elemento químico. El sentido es convención pura.",
    ),
    quandoDeclarar: ml(
      "Declare quando o aluno precisar operar com o símbolo, e não só reconhecê-lo. Ver a fórmula no quadro não é abstração simbólica; usá-la para isolar uma variável é.",
      "Declare it when the student must operate on the symbol, not merely recognise it. Seeing the formula on the board is not symbolic abstraction; using it to isolate a variable is.",
      "Declárela cuando el estudiante deba operar con el símbolo, y no solo reconocerlo. Ver la fórmula en el pizarrón no es abstracción simbólica; usarla para despejar una variable sí.",
    ),
  },
  {
    id: "producao-do-aluno",
    nome: ml("Produção do aluno", "Student production", "Producción del estudiante"),
    oQueE: ml(
      "Demonstrar o aprendizado exige produzir algo — redação, relatório, seminário, desenho, fala em língua estrangeira. Não basta reconhecer a resposta certa.",
      "Demonstrating the learning requires producing something — an essay, a report, a presentation, a drawing, speech in a foreign language. Recognising the right answer is not enough.",
      "Demostrar el aprendizaje exige producir algo — redacción, informe, seminario, dibujo, habla en lengua extranjera. No basta con reconocer la respuesta correcta.",
    ),
    quandoDeclarar: ml(
      "Declare quando a avaliação prevista pela BNCC para a habilidade pedir produção. Responder exercício de múltipla escolha não é produção.",
      "Declare it when the assessment the curriculum expects for the skill calls for production. Answering a multiple-choice exercise is not production.",
      "Declárela cuando la evaluación prevista por el currículo para la habilidad pida producción. Responder ejercicios de opción múltiple no es producción.",
    ),
  },
  {
    id: "pratica-concreta",
    nome: ml("Prática concreta", "Hands-on practice", "Práctica concreta"),
    oQueE: ml(
      "Material manipulável, experimento, saída de campo, movimento do corpo. O conteúdo pede que algo aconteça fora do papel para ser compreendido.",
      "Manipulable material, an experiment, fieldwork, body movement. The content asks for something to happen off the page in order to be understood.",
      "Material manipulable, experimento, salida de campo, movimiento del cuerpo. El contenido pide que algo ocurra fuera del papel para ser comprendido.",
    ),
    quandoDeclarar: ml(
      "Declare quando o plano de aula previr atividade com material, corpo ou laboratório. Demonstração feita pelo professor enquanto a turma assiste não conta.",
      "Declare it when the lesson plan includes activity with materials, the body or a laboratory. A demonstration performed by the teacher while the class watches does not count.",
      "Declárela cuando el plan de clase prevea actividad con material, cuerpo o laboratorio. La demostración hecha por el docente mientras la clase mira no cuenta.",
    ),
  },
]

export function exigenciaDe(id: string): Exigencia | undefined {
  return EXIGENCIAS.find((e) => e.id === id)
}
