import { ml } from "@/lib/i18n-content"
import type { Citation } from "@/components/specialty/types"
import type { GuiaDeAdaptacao } from "./tipos"

/**
 * Matemática × Discalculia.
 *
 * Primeiro guia escrito, e o modelo para os outros: cada afirmação sobre o que
 * atrapalha o aluno e sobre o que ajuda aponta para uma fonte que o
 * `check:links` valida.
 *
 * As fontes centrais são os guias práticos do What Works Clearinghouse (IES,
 * Departamento de Educação dos EUA) e o material do NCII. Foram escolhidas por
 * serem revisões de evidência, e não opinião de um autor — o mesmo critério
 * que já vale no conteúdo das especialidades.
 */

const WWC_RESOLUCAO: Citation = {
  label: "What Works Clearinghouse (IES) — Improving Mathematical Problem Solving in Grades 4 Through 8",
  url: "https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/MPS_PG_043012.pdf",
}

const WWC_DIFICULDADE: Citation = {
  label: "What Works Clearinghouse (IES) — Assisting Students Struggling with Mathematics: intervenção em resposta à intervenção",
  url: "https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/WWC-PraxGuide-Elementary-Math-Summary-508c.pdf",
}

const NCII_MATEMATICA: Citation = {
  label: "NCII — princípios para desenhar intervenção em matemática",
  url: "https://intensiveintervention.org/resource/principles-designing-intervention-mathematics",
}

const UNDERSTOOD_MATEMATICA: Citation = {
  label: "Understood — instrução matemática baseada em evidência para alunos com dificuldade",
  url: "https://www.understood.org/en/articles/evidence-based-math-instruction-for-struggling-students",
}

export const matematicaDiscalculia: GuiaDeAdaptacao = {
  materia: "Matemática",
  especialidade: "discalculia",

  porQueEstePar: ml(
    "É o par de maior atrito do site: a matéria cobra exatamente aquilo que a condição afeta. Uma questão de prova soma três exigências ao mesmo tempo — ler o enunciado, guardar os dados na memória enquanto calcula, e escolher entre cinco alternativas parecidas —, e é a segunda que costuma derrubar o aluno, não a conta em si.",
    "This is the site's highest-friction pair: the subject demands precisely what the condition affects. An exam question stacks three demands at once — reading the statement, holding the data in memory while calculating, and choosing between five similar options — and it is the second that usually defeats the student, not the arithmetic itself.",
    "Es el par de mayor fricción del sitio: la materia exige justamente lo que la condición afecta. Una pregunta de examen suma tres exigencias a la vez — leer el enunciado, guardar los datos en la memoria mientras calcula y elegir entre cinco alternativas parecidas — y es la segunda la que suele derribar al estudiante, no la cuenta en sí.",
  ),

  barreiras: [
    {
      titulo: ml(
        "Vários passos guardados de cabeça",
        "Several steps held in mind",
        "Varios pasos guardados de memoria",
      ),
      descricao: ml(
        "A questão de múltipla escolha raramente cobra uma operação só: pede converter, calcular e comparar. Cada resultado intermediário ocupa memória de trabalho, e quando ela satura o aluno perde o fio — mesmo dominando cada operação isolada. Não é falha de cálculo, é excesso de coisas em suspenso ao mesmo tempo.",
        "Multiple-choice questions rarely ask for a single operation: they require converting, calculating and comparing. Each intermediate result occupies working memory, and when it saturates the student loses the thread — even while mastering each isolated operation. It is not a calculation failure, but too many things held at once.",
        "La pregunta de opción múltiple rara vez exige una sola operación: pide convertir, calcular y comparar. Cada resultado intermedio ocupa memoria de trabajo, y cuando se satura el estudiante pierde el hilo — aun dominando cada operación aislada. No es fallo de cálculo, es exceso de cosas en suspenso a la vez.",
      ),
      citations: [WWC_RESOLUCAO, NCII_MATEMATICA],
    },
    {
      titulo: ml(
        "O enunciado antes da matemática",
        "The wording before the mathematics",
        "El enunciado antes de la matemática",
      ),
      descricao: ml(
        "Questões de prova trazem o problema dentro de uma história — uma receita, um trajeto, uma tarifa. Antes de calcular, o aluno precisa descobrir que informação do texto é dado e qual é enfeite. Quem tem discalculia costuma travar nessa tradução, e o resultado parece desconhecimento de matemática quando é dificuldade de identificar a estrutura do problema.",
        "Exam questions wrap the problem in a story — a recipe, a route, a fare. Before calculating, the student must work out which information is data and which is decoration. Students with dyscalculia often stall at that translation, and the result looks like not knowing the mathematics when it is difficulty identifying the problem's structure.",
        "Las preguntas de examen traen el problema dentro de una historia — una receta, un trayecto, una tarifa. Antes de calcular, el estudiante debe descubrir qué información es dato y cuál es adorno. Quien tiene discalculia suele trabarse en esa traducción, y el resultado parece desconocimiento de matemática cuando es dificultad para identificar la estructura del problema.",
      ),
      citations: [WWC_RESOLUCAO],
    },
    {
      titulo: ml(
        "Cinco alternativas que só diferem no número",
        "Five options differing only in the number",
        "Cinco alternativas que solo difieren en el número",
      ),
      descricao: ml(
        "As distratoras de uma questão bem construída são justamente os resultados de erros comuns: trocar o sinal, esquecer de dividir, parar um passo antes. Para quem já gasta esforço extra no cálculo, isso transforma a escolha final em uma segunda prova — e um deslize pequeno no meio do caminho leva direto a uma alternativa que existe e parece certa.",
        "The distractors in a well-built question are precisely the results of common errors: flipping a sign, forgetting to divide, stopping one step short. For a student already spending extra effort on the calculation, this turns the final choice into a second test — and a small slip along the way leads straight to an option that exists and looks right.",
        "Las distractoras de una pregunta bien construida son justamente los resultados de errores comunes: cambiar el signo, olvidar dividir, detenerse un paso antes. Para quien ya gasta esfuerzo extra en el cálculo, eso convierte la elección final en una segunda prueba — y un desliz pequeño lleva directo a una alternativa que existe y parece correcta.",
      ),
      citations: [WWC_DIFICULDADE],
    },
  ],

  estrategias: [
    {
      titulo: ml(
        "Peça a estrutura antes da conta",
        "Ask for the structure before the arithmetic",
        "Pida la estructura antes de la cuenta",
      ),
      comoFazer: ml(
        "Antes de deixar o aluno calcular, peça que ele diga em voz alta o que a questão quer e quais números importam. Duas perguntas bastam: \"o que está sendo perguntado?\" e \"que dados eu tenho?\". O ensino por esquemas — reconhecer que a questão é do tipo comparação, ou de parte-todo — melhora a resolução inclusive de problemas novos, não só dos treinados.",
        "Before letting the student calculate, ask them to say aloud what the question wants and which numbers matter. Two questions suffice: \"what is being asked?\" and \"what data do I have?\". Schema-based instruction — recognising that the question is a comparison type, or part-whole — improves solving of novel problems too, not only practised ones.",
        "Antes de dejar que el estudiante calcule, pídale que diga en voz alta qué quiere la pregunta y qué números importan. Bastan dos preguntas: \"¿qué se está preguntando?\" y \"¿qué datos tengo?\". La enseñanza por esquemas — reconocer que la pregunta es de comparación o de parte-todo — mejora la resolución incluso de problemas nuevos, no solo de los entrenados.",
      ),
      citations: [WWC_RESOLUCAO],
      evidence: "established",
    },
    {
      titulo: ml(
        "Deixe a memória de trabalho no papel",
        "Move working memory onto paper",
        "Deje la memoria de trabajo en el papel",
      ),
      comoFazer: ml(
        "Autorize e incentive registrar cada resultado intermediário, e ofereça apoios externos: tabuada à vista, reta numérica, calculadora quando a questão não estiver medindo cálculo. Isso não facilita a questão — devolve ao aluno a capacidade de pensar sobre o problema em vez de gastá-la segurando números.",
        "Allow and encourage writing down every intermediate result, and offer external supports: a visible times table, a number line, a calculator when the question is not measuring arithmetic. This does not make the question easier — it gives the student back the capacity to think about the problem instead of spending it holding numbers.",
        "Autorice y fomente registrar cada resultado intermedio, y ofrezca apoyos externos: tabla de multiplicar a la vista, recta numérica, calculadora cuando la pregunta no mida el cálculo. Esto no facilita la pregunta — devuelve al estudiante la capacidad de pensar sobre el problema en vez de gastarla sosteniendo números.",
      ),
      citations: [NCII_MATEMATICA, UNDERSTOOD_MATEMATICA],
    },
    {
      titulo: ml(
        "Do concreto ao símbolo, na mesma questão",
        "From concrete to symbol, within the same question",
        "De lo concreto al símbolo, en la misma pregunta",
      ),
      comoFazer: ml(
        "Quando a questão permitir, represente a situação antes de simbolizá-la: desenhe o trajeto, monte a tabela, use material manipulável. A sequência concreto–representacional–abstrato tem respaldo em intervenção matemática, e o ganho aparece justamente em quem não constrói a representação sozinho.",
        "Where the question allows, represent the situation before symbolising it: draw the route, build the table, use manipulatives. The concrete–representational–abstract sequence is supported in mathematics intervention, and the gain shows precisely in students who do not build the representation on their own.",
        "Cuando la pregunta lo permita, represente la situación antes de simbolizarla: dibuje el trayecto, arme la tabla, use material manipulable. La secuencia concreto–representacional–abstracto tiene respaldo en intervención matemática, y la ganancia aparece justamente en quien no construye la representación por sí mismo.",
      ),
      citations: [WWC_DIFICULDADE, NCII_MATEMATICA],
      evidence: "established",
    },
    {
      titulo: ml(
        "Escolha a questão pela dificuldade medida",
        "Choose the question by measured difficulty",
        "Elija la pregunta por la dificultad medida",
      ),
      comoFazer: ml(
        "O acervo traz a dificuldade oficial de cada questão do ENEM, na escala do exame — um item de 650 é o que um participante de proficiência 650 acerta com meia chance. Comece bem abaixo do nível do aluno e suba aos poucos: a graduação deixa de ser palpite e passa a ter número, e o aluno acumula acerto antes de encontrar o item que exige esforço.",
        "The collection carries each ENEM question's official difficulty, on the exam's own scale — a 650 item is one a candidate at proficiency 650 gets right half the time. Start well below the student's level and climb gradually: the progression stops being guesswork and gains a number, and the student accumulates success before meeting the demanding item.",
        "El acervo trae la dificultad oficial de cada pregunta del ENEM, en la escala del examen — un ítem de 650 es el que un participante de competencia 650 acierta con media probabilidad. Empiece bien por debajo del nivel del estudiante y suba de a poco: la graduación deja de ser conjetura y pasa a tener número.",
      ),
      citations: [WWC_DIFICULDADE],
    },
  ],
}
