import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Deficiência Intelectual — área nova, já no padrão verificado.
 *
 * O achado que organiza esta área: a maioria das intervenções com evidência
 * para deficiência intelectual, tanto acadêmicas quanto de habilidades de
 * vida, cai sob o guarda-chuva da **instrução sistemática**. É por isso que
 * as estratégias aqui são variações de um mesmo princípio — ensinar em passos
 * planejados, com apoio previsível e retirada gradual.
 */

const CEEDAR: Citation = {
  label: "CEEDAR / Univ. da Flórida — práticas com evidência para deficiências severas (PDF)",
  url: "https://ceedar.education.ufl.edu/wp-content/uploads/2014/03/Evidence-based-Practices-for-Students-with-Severe-Disabilities.pdf",
}

const TIES: Citation = {
  label: "TIES Center / Univ. de Minnesota — práticas instrucionais para deficiências significativas (PDF)",
  url: "https://ici-s.umn.edu/files/YtCaKA6y-K?fileGroup=pdf",
}

const NCIL: Citation = {
  label: "National Center on Improving Literacy — planejar o ensino de leitura na deficiência intelectual",
  url: "https://improvingliteracy.org/resource/considerations-when-planning-literacy-instruction-for-students-with-intellectual-disabilities/",
}

const PROGRESS: Citation = {
  label: "Progress Center — coleção de práticas instrucionais com evidência",
  url: "https://promotingprogress.org/resource-collections/evidence-based-instructional-practices",
}

const NCII: Citation = {
  label: "National Center on Intensive Intervention — individualização baseada em dados",
  url: "https://intensiveintervention.org/",
}

const UDL: Citation = {
  label: "CAST — Diretrizes do Desenho Universal para a Aprendizagem",
  url: "https://udlguidelines.cast.org/",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")
const AVANCADO = ml("Avançado", "Advanced", "Avanzado")

export function deficienciaIntelectualData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Instrução sistemática", "Systematic instruction", "Instrucción sistemática"),
      description: ml(
        "Ensinar em passos definidos, com apoio planejado e critério claro de avanço. É o guarda-chuva sob o qual cai a maioria das intervenções com evidência nesta área.",
        "Teach in defined steps, with planned support and a clear criterion for moving on. It is the umbrella covering most evidence-based interventions in this field.",
        "Enseñar en pasos definidos, con apoyo planificado y criterio claro de avance. Es el paraguas bajo el cual cae la mayoría de las intervenciones con evidencia en esta área.",
      ),
      tips: mlList(
        [
          "Defina antes o que conta como 'aprendido': quantas vezes, em que condição",
          "Planeje o apoio e a retirada dele desde o começo, não improvise",
          "Ensine sempre da mesma forma até consolidar — variar cedo confunde",
          "Registre cada tentativa; a decisão de avançar vem do registro, não da impressão",
        ],
        [
          "Define beforehand what counts as 'learned': how many times, under what conditions",
          "Plan the support and its removal from the start, do not improvise",
          "Teach it the same way until it is consolidated — varying early confuses",
          "Record every trial; the decision to move on comes from the record, not from a hunch",
        ],
        [
          "Defina antes qué cuenta como 'aprendido': cuántas veces, en qué condición",
          "Planifique el apoyo y su retirada desde el inicio, no improvise",
          "Enseñe siempre de la misma forma hasta consolidar — variar temprano confunde",
          "Registre cada intento; la decisión de avanzar viene del registro, no de la impresión",
        ],
      ),
      evidence: "established" as const,
      citations: [CEEDAR, TIES],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Instrução explícita", "Explicit instruction", "Instrucción explícita"),
      description: ml(
        "Dizer o que vai ser ensinado, demonstrar, praticar junto e só então pedir que faça sozinho. Nada fica implícito para o aluno descobrir.",
        "State what will be taught, demonstrate it, practise together and only then ask them to do it alone. Nothing is left implicit for the student to discover.",
        "Decir qué se va a enseñar, demostrar, practicar juntos y solo entonces pedir que lo haga solo. Nada queda implícito para que el alumno lo descubra.",
      ),
      tips: mlList(
        [
          "Enuncie o objetivo em uma frase, no início: 'hoje vamos aprender a...'",
          "Demonstre falando em voz alta o seu raciocínio",
          "Pratique junto antes de soltar — a prática guiada é a etapa mais pulada",
          "Verifique a compreensão de todos, não só de quem levanta a mão",
        ],
        [
          "State the objective in one sentence at the start: 'today we will learn to...'",
          "Demonstrate while thinking aloud",
          "Practise together before letting go — guided practice is the most skipped stage",
          "Check understanding from everyone, not only from those who raise a hand",
        ],
        [
          "Enuncie el objetivo en una frase, al inicio: 'hoy vamos a aprender a...'",
          "Demuestre pensando en voz alta",
          "Practiquen juntos antes de soltar — la práctica guiada es la etapa más saltada",
          "Verifique la comprensión de todos, no solo de quien levanta la mano",
        ],
      ),
      evidence: "established" as const,
      citations: [PROGRESS, CEEDAR],
      difficulty: BASICO,
    },
    {
      title: ml("Dicas com atraso temporal", "Time-delay prompting", "Ayudas con demora temporal"),
      description: ml(
        "Dar a resposta junto com a pergunta no começo e ir aumentando o intervalo antes da ajuda, até o aluno responder sozinho.",
        "Give the answer alongside the question at first, then gradually increase the delay before helping, until the student answers alone.",
        "Dar la respuesta junto con la pregunta al inicio e ir aumentando el intervalo antes de la ayuda, hasta que el alumno responda solo.",
      ),
      tips: mlList(
        [
          "Nas primeiras tentativas, pergunte e responda imediatamente junto",
          "Depois espere 2 segundos antes de ajudar, depois 4, depois 6",
          "Se errar duas vezes seguidas, volte ao intervalo anterior",
          "Nunca deixe a tentativa terminar em erro sem a resposta correta aparecer",
        ],
        [
          "On the first trials, ask and answer immediately together",
          "Then wait 2 seconds before helping, then 4, then 6",
          "If they get it wrong twice in a row, go back to the previous delay",
          "Never let a trial end in error without the correct answer appearing",
        ],
        [
          "En los primeros intentos, pregunte y responda inmediatamente junto",
          "Después espere 2 segundos antes de ayudar, luego 4, luego 6",
          "Si falla dos veces seguidas, vuelva al intervalo anterior",
          "Nunca deje que el intento termine en error sin que aparezca la respuesta correcta",
        ],
      ),
      evidence: "established" as const,
      citations: [CEEDAR, TIES],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Análise de tarefa e encadeamento", "Task analysis and chaining", "Análisis de tarea y encadenamiento"),
      description: ml(
        "Quebrar a habilidade em passos e ensinar um de cada vez, encadeando do primeiro para o último ou do último para o primeiro.",
        "Break the skill into steps and teach one at a time, chaining forwards from the first or backwards from the last.",
        "Dividir la habilidad en pasos y enseñar uno a la vez, encadenando del primero al último o del último al primero.",
      ),
      tips: mlList(
        [
          "Encadeamento inverso costuma motivar mais: o aluno sempre termina a tarefa",
          "Execute a tarefa você mesmo para descobrir os passos reais",
          "Um passo por vez; não avance por pressa de calendário",
          "Deixe a lista de passos visível como apoio permanente",
        ],
        [
          "Backward chaining tends to motivate more: the student always finishes the task",
          "Do the task yourself to discover the real steps",
          "One step at a time; do not advance out of calendar pressure",
          "Keep the step list visible as a permanent support",
        ],
        [
          "El encadenamiento inverso suele motivar más: el alumno siempre termina la tarea",
          "Haga la tarea usted mismo para descubrir los pasos reales",
          "Un paso a la vez; no avance por prisa de calendario",
          "Deje la lista de pasos visible como apoyo permanente",
        ],
      ),
      evidence: "established" as const,
      citations: [CEEDAR, TIES],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Leitura com os cinco componentes", "Reading with all five components", "Lectura con los cinco componentes"),
      description: ml(
        "Consciência fonêmica, fonética, fluência, vocabulário e compreensão — os cinco, de forma mais explícita e intensiva. Reduzir a leitura a palavras funcionais limita o alcance.",
        "Phonemic awareness, phonics, fluency, vocabulary and comprehension — all five, more explicitly and intensively. Reducing reading to functional sight words limits how far the student can go.",
        "Conciencia fonémica, fonética, fluidez, vocabulario y comprensión — los cinco, de forma más explícita e intensiva. Reducir la lectura a palabras funcionales limita el alcance.",
      ),
      tips: mlList(
        [
          "Não substitua o ensino de decodificação por lista de palavras memorizadas",
          "Mais tempo e mais repetição, não menos conteúdo",
          "Trabalhe compreensão desde o início, mesmo com textos muito curtos",
          "Vocabulário se ensina explicitamente, não só por exposição",
        ],
        [
          "Do not replace decoding instruction with a memorised word list",
          "More time and more repetition, not less content",
          "Work on comprehension from the start, even with very short texts",
          "Vocabulary is taught explicitly, not only through exposure",
        ],
        [
          "No sustituya la enseñanza de decodificación por una lista de palabras memorizadas",
          "Más tiempo y más repetición, no menos contenido",
          "Trabaje la comprensión desde el inicio, incluso con textos muy cortos",
          "El vocabulario se enseña explícitamente, no solo por exposición",
        ],
      ),
      evidence: "established" as const,
      citations: [NCIL],
      difficulty: AVANCADO,
    },
    {
      title: ml("Manipuláveis e organizadores gráficos", "Manipulatives and graphic organisers", "Manipulables y organizadores gráficos"),
      description: ml(
        "Em matemática, tornar a operação concreta e visível antes de exigir o símbolo — a combinação de instrução explícita, dicas sistemáticas e apoio visual é o que a literatura sustenta.",
        "In mathematics, make the operation concrete and visible before requiring the symbol — the literature supports combining explicit instruction, systematic prompting and visual support.",
        "En matemáticas, hacer la operación concreta y visible antes de exigir el símbolo — la literatura respalda combinar instrucción explícita, ayudas sistemáticas y apoyo visual.",
      ),
      tips: mlList(
        [
          "Concreto, depois representado em desenho, só então o símbolo",
          "Use o mesmo organizador gráfico o ano inteiro, não um diferente por conteúdo",
          "Deixe o manipulável disponível também na avaliação",
          "Nomeie em voz alta o que a manipulação representa",
        ],
        [
          "Concrete first, then drawn representation, only then the symbol",
          "Use the same graphic organiser all year, not a different one per topic",
          "Keep the manipulative available during assessment too",
          "Say out loud what the manipulation represents",
        ],
        [
          "Concreto, después representado en dibujo, solo entonces el símbolo",
          "Use el mismo organizador gráfico todo el año, no uno distinto por contenido",
          "Deje el manipulable disponible también en la evaluación",
          "Nombre en voz alta lo que la manipulación representa",
        ],
      ),
      evidence: "established" as const,
      citations: [PROGRESS, CEEDAR],
      difficulty: BASICO,
    },
    {
      title: ml("Decisão baseada em dados", "Data-based decision making", "Decisión basada en datos"),
      description: ml(
        "Coletar um dado simples com regularidade e mudar a intervenção quando o dado — e não a impressão — mostrar que ela não está funcionando.",
        "Collect one simple measure regularly and change the intervention when the data — not the impression — shows it is not working.",
        "Recolectar un dato simple con regularidad y cambiar la intervención cuando el dato — no la impresión — muestre que no está funcionando.",
      ),
      tips: mlList(
        [
          "Escolha uma medida que leve menos de um minuto para registrar",
          "Meça sempre no mesmo momento e da mesma forma",
          "Estabeleça antes quantas semanas sem progresso disparam uma mudança",
          "Mude uma coisa por vez, senão você não sabe o que funcionou",
        ],
        [
          "Choose a measure that takes under a minute to record",
          "Measure at the same moment and in the same way every time",
          "Decide in advance how many weeks without progress trigger a change",
          "Change one thing at a time, otherwise you cannot tell what worked",
        ],
        [
          "Elija una medida que tome menos de un minuto registrar",
          "Mida siempre en el mismo momento y de la misma forma",
          "Establezca antes cuántas semanas sin progreso disparan un cambio",
          "Cambie una cosa a la vez, si no, no sabrá qué funcionó",
        ],
      ),
      evidence: "established" as const,
      citations: [NCII, PROGRESS],
      difficulty: AVANCADO,
    },
    {
      title: ml("Participação no currículo comum", "Participation in the general curriculum", "Participación en el currículo común"),
      description: ml(
        "Adaptar como o aluno acessa e demonstra o conteúdo da turma, em vez de substituí-lo por uma atividade paralela sem relação com a aula.",
        "Adapt how the student accesses and demonstrates the class content, instead of replacing it with a parallel activity unrelated to the lesson.",
        "Adaptar cómo el alumno accede y demuestra el contenido del grupo, en vez de sustituirlo por una actividad paralela sin relación con la clase.",
      ),
      tips: mlList(
        [
          "Mesma aula, mesmo tema: muda o nível de complexidade e a forma de resposta",
          "Atividade paralela isolada afasta o aluno da turma e do conteúdo",
          "Ofereça mais de uma forma de demonstrar o que aprendeu",
          "Planeje a adaptação junto com a aula, não depois que ela já existe",
        ],
        [
          "Same lesson, same topic: what changes is the level of complexity and the response format",
          "An isolated parallel activity distances the student from both class and content",
          "Offer more than one way to demonstrate learning",
          "Plan the adaptation together with the lesson, not after it already exists",
        ],
        [
          "Misma clase, mismo tema: cambia el nivel de complejidad y la forma de respuesta",
          "La actividad paralela aislada aleja al alumno del grupo y del contenido",
          "Ofrezca más de una forma de demostrar lo aprendido",
          "Planifique la adaptación junto con la clase, no después de que ya existe",
        ],
      ),
      evidence: "established" as const,
      citations: [TIES, UDL],
      difficulty: INTERMEDIARIO,
    },
  ]

  const activities = [
    {
      name: ml("Encadeamento inverso de uma rotina", "Backward chaining of a routine", "Encadenamiento inverso de una rutina"),
      age: ml("6-18 anos", "6-18 years", "6-18 años"),
      duration: ml("10 min por dia", "10 min a day", "10 min por día"),
      description: ml(
        "Ensina uma rotina completa começando pelo último passo, para o aluno sempre terminar a tarefa e sentir a conclusão.",
        "Teaches a full routine starting from the last step, so the student always finishes the task and feels the completion.",
        "Enseña una rutina completa empezando por el último paso, para que el alumno siempre termine la tarea y sienta la conclusión.",
      ),
      materials: mlList(
        ["Lista dos passos", "Os materiais da própria rotina", "Ficha de registro"],
        ["The step list", "The routine's own materials", "A recording sheet"],
        ["Lista de los pasos", "Los materiales de la propia rutina", "Ficha de registro"],
      ),
      implementation: ml(
        "Você executa todos os passos menos o último; o aluno faz o último. A cada consolidação, ele assume mais um passo, de trás para a frente.",
        "You do every step but the last; the student does the last one. As each is consolidated, they take on one more step, moving backwards.",
        "Usted ejecuta todos los pasos menos el último; el alumno hace el último. Al consolidar, asume un paso más, de atrás hacia adelante.",
      ),
      objectives: mlList(
        ["Autonomia em rotinas", "Sensação de conclusão", "Generalização"],
        ["Autonomy in routines", "A sense of completion", "Generalisation"],
        ["Autonomía en rutinas", "Sensación de conclusión", "Generalización"],
      ),
      authorship: "adapted" as const,
      citations: [CEEDAR, TIES],
      stepByStep: mlList(
        [
          "Escolha uma rotina concreta: guardar o material, preparar o lanche, organizar a mochila",
          "Execute você mesmo e anote cada passo real, em ordem",
          "Faça todos os passos menos o último, e peça que o aluno faça o último",
          "Registre se ele conseguiu sozinho, com dica ou não conseguiu",
          "Quando acertar sozinho três dias seguidos, entregue também o penúltimo passo",
          "Continue recuando até ele executar a rotina inteira",
        ],
        [
          "Choose a concrete routine: putting materials away, preparing a snack, packing the bag",
          "Do it yourself and write down every real step, in order",
          "Do all steps but the last, and ask the student to do the last one",
          "Record whether they managed alone, with a prompt, or not at all",
          "After three straight days succeeding alone, hand over the second-to-last step too",
          "Keep moving backwards until they perform the whole routine",
        ],
        [
          "Elija una rutina concreta: guardar el material, preparar la merienda, organizar la mochila",
          "Ejecútela usted mismo y anote cada paso real, en orden",
          "Haga todos los pasos menos el último, y pida que el alumno haga el último",
          "Registre si lo logró solo, con ayuda o no lo logró",
          "Cuando acierte solo tres días seguidos, entregue también el penúltimo paso",
          "Continúe retrocediendo hasta que ejecute la rutina entera",
        ],
      ),
      tips: mlList(
        [
          "Terminar a tarefa é reforçador por si só — por isso o inverso costuma render mais",
          "Se travar num passo, quebre aquele passo em dois",
        ],
        [
          "Finishing the task is reinforcing in itself — that is why backward chaining often works better",
          "If they get stuck on a step, split that step in two",
        ],
        [
          "Terminar la tarea es reforzador en sí mismo — por eso el inverso suele rendir más",
          "Si se traba en un paso, divida ese paso en dos",
        ],
      ),
      variations: mlList(
        ["Encadeamento direto, quando o primeiro passo for o mais motivador", "Versão com fotos de cada passo, para rotinas em casa"],
        ["Forward chaining, when the first step is the most motivating", "A photo version of each step, for routines at home"],
        ["Encadenamiento directo, cuando el primer paso sea el más motivador", "Versión con fotos de cada paso, para rutinas en casa"],
      ),
      assessment: ml(
        "Conte quantos passos o aluno executa sem dica a cada semana; a curva mostra o progresso melhor que a impressão do dia.",
        "Count how many steps the student performs without prompts each week; the curve shows progress better than a single day's impression.",
        "Cuente cuántos pasos ejecuta el alumno sin ayuda cada semana; la curva muestra el progreso mejor que la impresión del día.",
      ),
    },
    {
      name: ml("Atraso temporal em vocabulário", "Time delay for vocabulary", "Demora temporal en vocabulario"),
      age: ml("6-16 anos", "6-16 years", "6-16 años"),
      duration: ml("8 min por dia", "8 min a day", "8 min por día"),
      description: ml(
        "Ensina palavras novas dando a resposta junto no começo e ampliando o intervalo até o aluno responder sozinho.",
        "Teaches new words by giving the answer alongside at first and widening the delay until the student answers alone.",
        "Enseña palabras nuevas dando la respuesta junto al inicio y ampliando el intervalo hasta que el alumno responda solo.",
      ),
      materials: mlList(
        ["Cartões com as palavras-alvo", "Cronômetro", "Ficha de registro por tentativa"],
        ["Cards with target words", "A timer", "A per-trial recording sheet"],
        ["Tarjetas con las palabras objetivo", "Cronómetro", "Ficha de registro por intento"],
      ),
      implementation: ml(
        "Comece com atraso zero e vá para 2, 4 e 6 segundos conforme o acerto se estabiliza.",
        "Start with zero delay and move to 2, 4 and 6 seconds as accuracy stabilises.",
        "Empiece con demora cero y pase a 2, 4 y 6 segundos según se estabilice el acierto.",
      ),
      objectives: mlList(
        ["Vocabulário", "Resposta autônoma", "Aprendizagem sem erro"],
        ["Vocabulary", "Independent responding", "Errorless learning"],
        ["Vocabulario", "Respuesta autónoma", "Aprendizaje sin error"],
      ),
      authorship: "adapted" as const,
      citations: [CEEDAR, NCIL],
      stepByStep: mlList(
        [
          "Escolha 5 palavras que o aluno precisa e ainda não domina",
          "Sessão 1: mostre o cartão e diga a palavra imediatamente, pedindo repetição",
          "Sessão 2: mostre o cartão, conte 2 segundos, e só então diga",
          "Sessão 3: amplie para 4 segundos; sessão 4, para 6",
          "Registre cada tentativa: acerto antes da dica, acerto após a dica, ou erro",
          "Só acrescente palavra nova quando 4 das 5 saírem antes da dica",
        ],
        [
          "Choose 5 words the student needs and does not yet master",
          "Session 1: show the card and say the word immediately, asking for repetition",
          "Session 2: show the card, count 2 seconds, then say it",
          "Session 3: extend to 4 seconds; session 4, to 6",
          "Record each trial: correct before the prompt, correct after the prompt, or error",
          "Only add a new word once 4 of the 5 come before the prompt",
        ],
        [
          "Elija 5 palabras que el alumno necesita y aún no domina",
          "Sesión 1: muestre la tarjeta y diga la palabra de inmediato, pidiendo repetición",
          "Sesión 2: muestre la tarjeta, cuente 2 segundos, y solo entonces dígala",
          "Sesión 3: amplíe a 4 segundos; sesión 4, a 6",
          "Registre cada intento: acierto antes de la ayuda, acierto tras la ayuda, o error",
          "Solo agregue palabra nueva cuando 4 de las 5 salgan antes de la ayuda",
        ],
      ),
      tips: mlList(
        ["O objetivo é o aluno quase nunca errar — o erro repetido consolida o erro", "Cinco palavras por vez é o teto; mais que isso dilui"],
        ["The goal is for the student to almost never miss — repeated error consolidates the error", "Five words at a time is the ceiling; more than that dilutes"],
        ["El objetivo es que el alumno casi nunca falle — el error repetido consolida el error", "Cinco palabras por vez es el techo; más que eso diluye"],
      ),
      variations: mlList(
        ["Versão com imagens em vez de palavras escritas", "Versão aplicada por um colega treinado"],
        ["A version with pictures instead of written words", "A version delivered by a trained peer"],
        ["Versión con imágenes en vez de palabras escritas", "Versión aplicada por un compañero entrenado"],
      ),
      assessment: ml(
        "A própria ficha é a medida: acompanhe a proporção de acertos antes da dica ao longo das sessões.",
        "The recording sheet is the measure: track the share of correct answers before the prompt across sessions.",
        "La propia ficha es la medida: siga la proporción de aciertos antes de la ayuda a lo largo de las sesiones.",
      ),
    },
    {
      name: ml("Do concreto ao símbolo em matemática", "From concrete to symbol in maths", "De lo concreto al símbolo en matemáticas"),
      age: ml("7-16 anos", "7-16 years", "7-16 años"),
      duration: ml("20 min", "20 min", "20 min"),
      description: ml(
        "Sequência de três etapas para uma operação: manipular, desenhar e só então escrever com números.",
        "A three-stage sequence for one operation: manipulate, draw, and only then write with numbers.",
        "Secuencia de tres etapas para una operación: manipular, dibujar y solo entonces escribir con números.",
      ),
      materials: mlList(
        ["Material concreto: tampas, blocos, palitos", "Papel e lápis", "Organizador gráfico impresso"],
        ["Concrete material: caps, blocks, sticks", "Paper and pencil", "A printed graphic organiser"],
        ["Material concreto: tapas, bloques, palitos", "Papel y lápiz", "Organizador gráfico impreso"],
      ),
      implementation: ml(
        "Faça a mesma operação nas três representações, na mesma aula, nomeando a correspondência entre elas.",
        "Do the same operation in all three representations, in the same lesson, naming the correspondence between them.",
        "Haga la misma operación en las tres representaciones, en la misma clase, nombrando la correspondencia entre ellas.",
      ),
      objectives: mlList(
        ["Sentido de número", "Transferência para o símbolo", "Autonomia no cálculo"],
        ["Number sense", "Transfer to the symbol", "Autonomy in calculation"],
        ["Sentido numérico", "Transferencia al símbolo", "Autonomía en el cálculo"],
      ),
      authorship: "adapted" as const,
      citations: [PROGRESS, CEEDAR],
      stepByStep: mlList(
        [
          "Escolha uma única operação, com números pequenos",
          "Etapa concreta: o aluno monta a operação com o material",
          "Nomeie em voz alta o que ele acabou de fazer",
          "Etapa pictórica: ele desenha exatamente o que montou",
          "Etapa simbólica: escreva juntos a operação em números, ao lado do desenho",
          "Repita com outros números antes de mudar de operação",
        ],
        [
          "Choose a single operation, with small numbers",
          "Concrete stage: the student builds the operation with the material",
          "Say out loud what they have just done",
          "Pictorial stage: they draw exactly what they built",
          "Symbolic stage: write the operation in numbers together, next to the drawing",
          "Repeat with other numbers before changing operation",
        ],
        [
          "Elija una única operación, con números pequeños",
          "Etapa concreta: el alumno arma la operación con el material",
          "Nombre en voz alta lo que acaba de hacer",
          "Etapa pictórica: dibuja exactamente lo que armó",
          "Etapa simbólica: escriban juntos la operación en números, al lado del dibujo",
          "Repita con otros números antes de cambiar de operación",
        ],
      ),
      tips: mlList(
        ["As três etapas na mesma aula — separá-las em dias quebra a ligação", "Não retire o concreto cedo demais; retire quando o desenho já bastar"],
        ["All three stages in the same lesson — splitting them across days breaks the link", "Do not remove the concrete too early; remove it when the drawing already suffices"],
        ["Las tres etapas en la misma clase — separarlas en días rompe la conexión", "No retire lo concreto demasiado pronto; retírelo cuando el dibujo ya baste"],
      ),
      variations: mlList(
        ["Versão com material que o aluno escolhe, aumentando o engajamento"],
        ["A version with material the student chooses, increasing engagement"],
        ["Versión con material que el alumno elige, aumentando el compromiso"],
      ),
      assessment: ml(
        "Peça a mesma operação só no símbolo, uma semana depois, e veja se ele recorre ao desenho espontaneamente.",
        "Ask for the same operation in symbols only, one week later, and see whether they turn to drawing spontaneously.",
        "Pida la misma operación solo en símbolo, una semana después, y vea si recurre al dibujo espontáneamente.",
      ),
    },
    {
      name: ml("Medida semanal de uma habilidade", "Weekly measure of one skill", "Medida semanal de una habilidad"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("1 min por semana", "1 min a week", "1 min por semana"),
      description: ml(
        "Um registro mínimo e constante que revela se a intervenção está funcionando — antes que o bimestre acabe.",
        "A minimal, constant record that reveals whether the intervention is working — before the term ends.",
        "Un registro mínimo y constante que revela si la intervención funciona — antes de que termine el bimestre.",
      ),
      materials: mlList(
        ["Uma folha por aluno com um gráfico simples", "Cronômetro"],
        ["One sheet per student with a simple chart", "A timer"],
        ["Una hoja por alumno con un gráfico simple", "Cronómetro"],
      ),
      implementation: ml(
        "Escolha uma medida objetiva, colete no mesmo dia da semana e marque no gráfico junto com o aluno.",
        "Choose one objective measure, collect it on the same weekday and plot it on the chart with the student.",
        "Elija una medida objetiva, recójala el mismo día de la semana y márquela en el gráfico junto al alumno.",
      ),
      objectives: mlList(
        ["Decisão com dado", "Visibilidade do progresso", "Envolvimento do aluno"],
        ["Data-informed decisions", "Visible progress", "Student involvement"],
        ["Decisión con datos", "Visibilidad del progreso", "Participación del alumno"],
      ),
      authorship: "adapted" as const,
      citations: [NCII, PROGRESS],
      stepByStep: mlList(
        [
          "Escolha uma habilidade e uma medida objetiva: palavras lidas em um minuto, passos concluídos, itens corretos",
          "Defina o dia e o horário fixos da coleta",
          "Meça e marque o ponto no gráfico junto com o aluno",
          "Após quatro semanas, olhe a inclinação da linha, não os pontos isolados",
          "Se não houver subida, mude uma coisa na intervenção",
          "Registre no gráfico o dia em que mudou, para poder comparar depois",
        ],
        [
          "Choose a skill and an objective measure: words read in a minute, steps completed, correct items",
          "Set a fixed day and time for collection",
          "Measure and plot the point on the chart together with the student",
          "After four weeks, look at the slope of the line, not the isolated points",
          "If there is no upward trend, change one thing in the intervention",
          "Mark on the chart the day you changed it, so you can compare later",
        ],
        [
          "Elija una habilidad y una medida objetiva: palabras leídas en un minuto, pasos completados, ítems correctos",
          "Defina el día y el horario fijos de la recolección",
          "Mida y marque el punto en el gráfico junto al alumno",
          "Después de cuatro semanas, mire la inclinación de la línea, no los puntos aislados",
          "Si no hay subida, cambie una cosa en la intervención",
          "Registre en el gráfico el día del cambio, para poder comparar después",
        ],
      ),
      tips: mlList(
        ["Se a coleta leva mais de um minuto, você vai parar de fazer — simplifique", "Mostrar o gráfico ao aluno costuma ser motivador por si só"],
        ["If collection takes over a minute, you will stop doing it — simplify", "Showing the chart to the student is often motivating in itself"],
        ["Si la recolección toma más de un minuto, dejará de hacerla — simplifique", "Mostrar el gráfico al alumno suele ser motivador por sí solo"],
      ),
      variations: mlList(
        ["Gráfico coletivo da turma, com medidas anônimas, para acompanhar o grupo"],
        ["A whole-class chart with anonymised measures, to follow the group"],
        ["Gráfico colectivo del grupo, con medidas anónimas, para seguir al conjunto"],
      ),
      assessment: ml(
        "A inclinação da linha ao longo de quatro a seis semanas é a resposta; um ponto isolado não é.",
        "The slope of the line across four to six weeks is the answer; a single point is not.",
        "La inclinación de la línea a lo largo de cuatro a seis semanas es la respuesta; un punto aislado no lo es.",
      ),
    },
  ]

  const courses = [
    {
      title: ml("Deficiência Intelectual", "Intellectual Disability", "Discapacidad Intelectual"),
      provider: "Unova Cursos",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: true,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "pt" as const,
      url: "https://www.unovacursos.com.br/curso/curso-gratuito-online-deficiencia-intelectual",
    },
    {
      title: ml(
        "Fundamentos da Educação Inclusiva",
        "Foundations of Inclusive Education",
        "Fundamentos de la Educación Inclusiva",
      ),
      provider: "Instituto Rodrigo Mendes",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: true,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "pt" as const,
      url: "https://formacao.institutorodrigomendes.org.br/curso/fundamentos-da-educacao-inclusiva",
    },
    {
      title: ml(
        "Intervenção intensiva baseada em dados",
        "Data-based intensive intervention",
        "Intervención intensiva basada en datos",
      ),
      provider: "National Center on Intensive Intervention",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: false,
      level: ml("Avançado", "Advanced", "Avanzado"),
      language: "en" as const,
      url: "https://intensiveintervention.org/",
    },
  ]

  const resources = [
    {
      title: ml(
        "Práticas com evidência para deficiências severas",
        "Evidence-based practices for severe disabilities",
        "Prácticas con evidencia para discapacidades severas",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Documento do CEEDAR mapeando quais práticas têm suporte na literatura e como implementá-las.",
        "A CEEDAR document mapping which practices have research support and how to implement them.",
        "Documento del CEEDAR que mapea qué prácticas tienen respaldo en la literatura y cómo implementarlas.",
      ),
      featured: true,
      url: "https://ceedar.education.ufl.edu/wp-content/uploads/2014/03/Evidence-based-Practices-for-Students-with-Severe-Disabilities.pdf",
      publisher: "CEEDAR Center — University of Florida",
      language: "en" as const,
      format: "PDF" as const,
    },
    {
      title: ml(
        "Práticas instrucionais para deficiências significativas",
        "Instructional practices for significant disabilities",
        "Prácticas instruccionais para discapacidades significativas",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Relatório do TIES Center sobre o que a pesquisa mostra para alunos com deficiências mais significativas.",
        "A TIES Center report on what research shows for students with the most significant disabilities.",
        "Informe del TIES Center sobre lo que la investigación muestra para alumnos con discapacidades más significativas.",
      ),
      featured: true,
      url: "https://ici-s.umn.edu/files/YtCaKA6y-K?fileGroup=pdf",
      publisher: "TIES Center / ICI — University of Minnesota",
      language: "en" as const,
      format: "PDF" as const,
    },
    {
      title: ml(
        "Planejando o ensino de leitura",
        "Planning literacy instruction",
        "Planificando la enseñanza de lectura",
      ),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Por que reduzir a leitura a palavras funcionais limita o aluno, e o que fazer no lugar.",
        "Why reducing reading to functional sight words limits the student, and what to do instead.",
        "Por qué reducir la lectura a palabras funcionales limita al alumno, y qué hacer en su lugar.",
      ),
      featured: false,
      url: "https://improvingliteracy.org/resource/considerations-when-planning-literacy-instruction-for-students-with-intellectual-disabilities/",
      publisher: "National Center on Improving Literacy",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Progress Center — práticas instrucionais", "Progress Center — instructional practices", "Progress Center — prácticas instruccionales"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Coleção organizada de práticas instrucionais com evidência, com material de apoio para o professor.",
        "An organised collection of evidence-based instructional practices, with support materials for teachers.",
        "Colección organizada de prácticas instruccionales con evidencia, con material de apoyo para el docente.",
      ),
      featured: false,
      url: "https://promotingprogress.org/resource-collections/evidence-based-instructional-practices",
      publisher: "Progress Center — American Institutes for Research",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("National Center on Intensive Intervention", "National Center on Intensive Intervention", "National Center on Intensive Intervention"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Ferramentas de coleta e análise de dados para individualizar intervenções que não estão funcionando.",
        "Data collection and analysis tools for individualising interventions that are not working.",
        "Herramientas de recolección y análisis de datos para individualizar intervenciones que no funcionan.",
      ),
      featured: false,
      url: "https://intensiveintervention.org/",
      publisher: "NCII — American Institutes for Research",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "Diretrizes do Desenho Universal para a Aprendizagem (DUA)",
        "Universal Design for Learning Guidelines",
        "Pautas del Diseño Universal para el Aprendizaje (DUA)",
      ),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Como planejar a aula para que o aluno participe do currículo comum desde o início.",
        "How to plan the lesson so the student takes part in the general curriculum from the start.",
        "Cómo planificar la clase para que el alumno participe del currículo común desde el inicio.",
      ),
      featured: false,
      url: "https://udlguidelines.cast.org/",
      publisher: "CAST",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("A Escola Comum Inclusiva", "The Inclusive Mainstream School", "La Escuela Común Inclusiva"),
      type: ml("Formação", "Training", "Formación"),
      description: ml(
        "Fascículo do MEC/SEESP sobre a organização da escola comum na perspectiva da inclusão.",
        "MEC/SEESP booklet on organising the mainstream school from an inclusion perspective.",
        "Fascículo del MEC/SEESP sobre la organización de la escuela común desde la perspectiva de la inclusión.",
      ),
      featured: false,
      url: "https://iparadigma.org.br/wp-content/uploads/Ed-incluisva-85.pdf",
      publisher: "MEC / SEESP",
      language: "pt" as const,
      format: "PDF" as const,
    },
    {
      title: ml("DIVERSA — educação inclusiva na prática", "DIVERSA — inclusive education in practice", "DIVERSA — educación inclusiva en la práctica"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Relatos de prática e materiais em português, do Instituto Rodrigo Mendes.",
        "Practice reports and materials in Portuguese, from Instituto Rodrigo Mendes.",
        "Relatos de práctica y materiales en portugués, del Instituto Rodrigo Mendes.",
      ),
      featured: false,
      url: "https://diversa.org.br/educacao-inclusiva/",
      publisher: "Instituto Rodrigo Mendes",
      language: "pt" as const,
      format: "Site" as const,
    },
  ]

  return {
    strategies,
    activities,
    courses: withCommonCourses(courses),
    resources: withCommonResources(resources),
  }
}
