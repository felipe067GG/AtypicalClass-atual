import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Conteúdo de Autismo — área-piloto do padrão verificado.
 *
 * Regras que valem aqui e devem valer nas demais áreas:
 *
 *  1. Toda estratégia corresponde a uma prática da revisão do NCAEP
 *     (1990–2017) e traz o nome original em inglês, para o professor
 *     conseguir procurar a literatura.
 *  2. O nível de evidência vem dessa revisão — não de percentual inventado.
 *  3. Todo link é verificado por `npm run check:links`.
 *  4. `authorship` diz quem escreveu. Atividade redigida aqui é marcada como
 *     `adapted`, e a citação aponta para a prática que a fundamenta — nunca
 *     dando a entender que a atividade foi publicada por um pesquisador.
 *  5. Todo texto vem nos três idiomas. O tipo obriga.
 */

const NCAEP: Citation = {
  label: "NCAEP (2020) — 28 práticas com evidência para TEA, revisão 1990–2017",
  url: "https://autismpdc.fpg.unc.edu/ebps/",
}

const afirm = (slug: string, nome: string): Citation => ({
  label: `AFIRM / UNC — módulo gratuito: ${nome}`,
  url: `https://afirm.fpg.unc.edu/${slug}`,
})

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")
const AVANCADO = ml("Avançado", "Advanced", "Avanzado")

export function autismoData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Apoios visuais (Visual Supports)", "Visual Supports", "Apoyos visuales (Visual Supports)"),
      description: ml(
        "Usar imagens, símbolos e organizadores para tornar visível o que é abstrato: a sequência do dia, o que se espera agora, quanto falta para terminar.",
        "Use images, symbols and organizers to make the abstract visible: the sequence of the day, what is expected now, how much is left.",
        "Usar imágenes, símbolos y organizadores para hacer visible lo abstracto: la secuencia del día, qué se espera ahora, cuánto falta.",
      ),
      tips: mlList(
        [
          "Monte a rotina do dia em cartões e deixe-a no campo de visão do aluno",
          "Retirar o cartão da atividade concluída comunica o progresso melhor que dizer 'já acabou'",
          "Avise mudanças alterando o quadro antes, não no momento da transição",
          "Use sempre o mesmo símbolo para a mesma atividade",
        ],
        [
          "Build the day's routine on cards and keep it in the student's line of sight",
          "Removing the card of a finished activity communicates progress better than saying 'it's over'",
          "Announce changes by updating the board beforehand, not during the transition",
          "Always use the same symbol for the same activity",
        ],
        [
          "Arme la rutina del día en tarjetas y déjela a la vista del alumno",
          "Retirar la tarjeta de la actividad terminada comunica el avance mejor que decir 'ya terminó'",
          "Avise los cambios modificando el tablero antes, no durante la transición",
          "Use siempre el mismo símbolo para la misma actividad",
        ],
      ),
      evidence: "established" as const,
      citations: [NCAEP, afirm("visual-supports", "Visual Supports")],
      difficulty: BASICO,
    },
    {
      title: ml("Narrativas sociais (Social Narratives)", "Social Narratives", "Narrativas sociales (Social Narratives)"),
      description: ml(
        "Textos curtos, em primeira pessoa, que descrevem uma situação social e o que esperar dela. Preparam o aluno antes de a situação acontecer.",
        "Short first-person texts describing a social situation and what to expect from it. They prepare the student before the situation happens.",
        "Textos breves en primera persona que describen una situación social y qué esperar de ella. Preparan al alumno antes de que ocurra.",
      ),
      tips: mlList(
        [
          "Escreva na perspectiva do aluno, em frases curtas e afirmativas",
          "Descreva o que vai acontecer e por quê, não apenas a regra a cumprir",
          "Leia junto antes da situação, com calma — nunca durante a crise",
          "Uma narrativa por situação: o recreio, a apresentação, a troca de sala",
        ],
        [
          "Write from the student's perspective, in short affirmative sentences",
          "Describe what will happen and why, not just the rule to follow",
          "Read it together calmly before the situation — never during a meltdown",
          "One narrative per situation: recess, the presentation, changing rooms",
        ],
        [
          "Escriba desde la perspectiva del alumno, en frases cortas y afirmativas",
          "Describa qué va a pasar y por qué, no solo la regla a cumplir",
          "Léala con calma antes de la situación — nunca durante la crisis",
          "Una narrativa por situación: el recreo, la presentación, el cambio de aula",
        ],
      ),
      evidence: "established" as const,
      citations: [NCAEP, afirm("social-narratives", "Social Narratives")],
      difficulty: BASICO,
    },
    {
      title: ml("Análise de tarefa (Task Analysis)", "Task Analysis", "Análisis de tarea (Task Analysis)"),
      description: ml(
        "Quebrar uma atividade complexa em passos pequenos e ensináveis, para o aluno conseguir começar sem depender de entender o todo.",
        "Break a complex activity into small teachable steps, so the student can start without needing to grasp the whole.",
        "Dividir una actividad compleja en pasos pequeños y enseñables, para que el alumno pueda empezar sin depender de entender el todo.",
      ),
      tips: mlList(
        [
          "Execute a tarefa você mesmo antes e anote cada passo que realmente fez",
          "Ensine um passo por vez; só avance quando o anterior estiver consolidado",
          "Deixe a lista de passos visível — ela também é um apoio visual",
          "Registre em qual passo o aluno costuma parar: ali está a dificuldade real",
        ],
        [
          "Do the task yourself first and write down every step you actually took",
          "Teach one step at a time; move on only when the previous one is solid",
          "Keep the step list visible — it is also a visual support",
          "Note which step the student usually stops at: that is the real difficulty",
        ],
        [
          "Haga la tarea usted mismo antes y anote cada paso que realmente hizo",
          "Enseñe un paso a la vez; avance solo cuando el anterior esté consolidado",
          "Deje la lista de pasos visible — también es un apoyo visual",
          "Registre en qué paso suele detenerse el alumno: ahí está la dificultad real",
        ],
      ),
      evidence: "established" as const,
      citations: [NCAEP, afirm("task-analysis", "Task Analysis")],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Dicas graduadas (Prompting)", "Prompting", "Ayudas graduadas (Prompting)"),
      description: ml(
        "Oferecer ajuda na medida exata e retirá-la aos poucos, para o aluno chegar à autonomia em vez de depender do adulto.",
        "Offer help in the exact measure needed and fade it gradually, so the student reaches autonomy instead of depending on the adult.",
        "Ofrecer ayuda en la medida justa y retirarla poco a poco, para que el alumno llegue a la autonomía en vez de depender del adulto.",
      ),
      tips: mlList(
        [
          "Comece pela ajuda mínima que funciona, não pela máxima",
          "Reduza o apoio de forma planejada: físico → gestual → verbal → nenhum",
          "Dê tempo de resposta antes de ajudar; a pausa costuma bastar",
          "Anote o nível de ajuda usado para enxergar o avanço ao longo das semanas",
        ],
        [
          "Start with the least help that works, not the most",
          "Fade support in a planned way: physical → gestural → verbal → none",
          "Allow response time before helping; the pause is often enough",
          "Record the level of help used to see progress across weeks",
        ],
        [
          "Empiece por la ayuda mínima que funcione, no por la máxima",
          "Reduzca el apoyo de forma planificada: físico → gestual → verbal → ninguno",
          "Dé tiempo de respuesta antes de ayudar; la pausa suele bastar",
          "Anote el nivel de ayuda usado para ver el avance a lo largo de las semanas",
        ],
      ),
      evidence: "established" as const,
      citations: [NCAEP, afirm("prompting", "Prompting")],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Modelação (Modeling)", "Modeling", "Modelado (Modeling)"),
      description: ml(
        "Demonstrar o comportamento esperado para que o aluno o imite — ao vivo ou em vídeo, que costuma prender mais a atenção.",
        "Demonstrate the expected behaviour so the student imitates it — live or on video, which often holds attention better.",
        "Demostrar el comportamiento esperado para que el alumno lo imite — en vivo o en video, que suele captar más la atención.",
      ),
      tips: mlList(
        [
          "Demonstre a ação completa antes de pedir que ele tente",
          "Use um colega como modelo quando possível: aproxima mais que o adulto",
          "Em vídeo, grave curto e mostre só o comportamento-alvo, sem distrações",
          "Peça a imitação logo após a demonstração, enquanto está fresco",
        ],
        [
          "Demonstrate the full action before asking the student to try",
          "Use a peer as model when possible: it connects better than an adult",
          "On video, keep it short and show only the target behaviour, no distractions",
          "Ask for imitation right after the demonstration, while it is fresh",
        ],
        [
          "Demuestre la acción completa antes de pedir que lo intente",
          "Use a un compañero como modelo cuando sea posible: acerca más que el adulto",
          "En video, grabe corto y muestre solo la conducta objetivo, sin distracciones",
          "Pida la imitación justo después de la demostración, mientras está fresca",
        ],
      ),
      evidence: "established" as const,
      citations: [NCAEP, afirm("modeling", "Modeling"), afirm("video-modeling", "Video Modeling")],
      difficulty: BASICO,
    },
    {
      title: ml(
        "Intervenções antecedentes (Antecedent-Based Interventions)",
        "Antecedent-Based Interventions",
        "Intervenciones antecedentes (Antecedent-Based Interventions)",
      ),
      description: ml(
        "Modificar o que vem antes do comportamento — ambiente, demanda, rotina — para prevenir a crise em vez de reagir a ela.",
        "Change what comes before the behaviour — environment, demand, routine — to prevent the crisis instead of reacting to it.",
        "Modificar lo que viene antes de la conducta — ambiente, demanda, rutina — para prevenir la crisis en vez de reaccionar a ella.",
      ),
      tips: mlList(
        [
          "Identifique o que costuma preceder a dificuldade: barulho, transição, tarefa longa",
          "Ajuste o gatilho antes: reduza o ruído, avise a transição, encurte a tarefa",
          "Ofereça escolha entre duas opções aceitáveis — devolve controle ao aluno",
          "Registre por alguns dias antes de concluir qual é o gatilho",
        ],
        [
          "Identify what usually precedes the difficulty: noise, transition, long task",
          "Adjust the trigger beforehand: cut the noise, announce the transition, shorten the task",
          "Offer a choice between two acceptable options — it gives control back to the student",
          "Record for a few days before concluding what the trigger is",
        ],
        [
          "Identifique qué suele preceder la dificultad: ruido, transición, tarea larga",
          "Ajuste el desencadenante antes: reduzca el ruido, avise la transición, acorte la tarea",
          "Ofrezca elegir entre dos opciones aceptables — devuelve control al alumno",
          "Registre durante unos días antes de concluir cuál es el desencadenante",
        ],
      ),
      evidence: "established" as const,
      citations: [NCAEP, afirm("antecedent-based-interventions", "Antecedent-Based Interventions")],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Reforço (Reinforcement)", "Reinforcement", "Refuerzo (Reinforcement)"),
      description: ml(
        "Tornar mais provável um comportamento fazendo com que ele seja seguido de algo significativo para aquele aluno específico.",
        "Make a behaviour more likely by following it with something meaningful to that particular student.",
        "Hacer más probable una conducta haciendo que sea seguida de algo significativo para ese alumno en particular.",
      ),
      tips: mlList(
        [
          "Descubra o que é reforçador para ele — não presuma que seja elogio",
          "Reforce imediatamente após o comportamento, não no fim da aula",
          "Seja específico: 'você guardou o material sozinho', não 'muito bem'",
          "Espace o reforço conforme o comportamento se estabelece",
        ],
        [
          "Find out what is reinforcing for that student — do not assume it is praise",
          "Reinforce immediately after the behaviour, not at the end of class",
          "Be specific: 'you put your materials away by yourself', not 'well done'",
          "Space out reinforcement as the behaviour becomes established",
        ],
        [
          "Descubra qué es reforzador para él — no suponga que sea el elogio",
          "Refuerce inmediatamente después de la conducta, no al final de la clase",
          "Sea específico: 'guardaste el material solo', no 'muy bien'",
          "Espacie el refuerzo a medida que la conducta se establece",
        ],
      ),
      evidence: "established" as const,
      citations: [NCAEP, afirm("reinforcement", "Reinforcement")],
      difficulty: BASICO,
    },
    {
      title: ml("Autogerenciamento (Self-Management)", "Self-Management", "Autogestión (Self-Management)"),
      description: ml(
        "Ensinar o aluno a observar e registrar o próprio comportamento, transferindo o controle do professor para ele.",
        "Teach the student to observe and record their own behaviour, transferring control from teacher to student.",
        "Enseñar al alumno a observar y registrar su propia conducta, transfiriendo el control del docente hacia él.",
      ),
      tips: mlList(
        [
          "Defina com o aluno um comportamento-alvo observável e concreto",
          "Dê a ele a ficha de registro — quem marca é o aluno, não você",
          "Combine antes como será conferido, para construir confiança no registro",
          "Comece com intervalos curtos e vá ampliando",
        ],
        [
          "Agree with the student on an observable, concrete target behaviour",
          "Give them the recording sheet — the student marks it, not you",
          "Agree beforehand how it will be checked, to build trust in the record",
          "Start with short intervals and extend them gradually",
        ],
        [
          "Defina con el alumno una conducta objetivo observable y concreta",
          "Déle la ficha de registro — quien marca es el alumno, no usted",
          "Acuerden antes cómo se verificará, para construir confianza en el registro",
          "Empiece con intervalos cortos y vaya ampliando",
        ],
      ),
      evidence: "established" as const,
      citations: [NCAEP, afirm("self-management", "Self-Management")],
      difficulty: AVANCADO,
    },
  ]

  const activities = [
    {
      name: ml("Quadro de rotina visual da aula", "Visual class routine board", "Tablero de rutina visual de la clase"),
      age: ml("6-16 anos", "6-16 years", "6-16 años"),
      duration: ml("20 min para montar, uso diário", "20 min to set up, daily use", "20 min para armar, uso diario"),
      description: ml(
        "Aplicação de apoios visuais: a sequência da aula fica exposta em cartões que o aluno acompanha e retira conforme conclui.",
        "An application of visual supports: the class sequence is displayed on cards the student follows and removes as they finish.",
        "Aplicación de apoyos visuales: la secuencia de la clase queda expuesta en tarjetas que el alumno sigue y retira al concluir.",
      ),
      materials: mlList(
        ["Cartões ou papel A5", "Velcro ou fita adesiva", "Símbolos impressos ou desenhados", "Suporte visível"],
        ["Cards or A5 paper", "Velcro or tape", "Printed or drawn symbols", "A visible holder"],
        ["Tarjetas o papel A5", "Velcro o cinta adhesiva", "Símbolos impresos o dibujados", "Soporte visible"],
      ),
      implementation: ml(
        "Liste as etapas da sua aula, represente cada uma com um símbolo e fixe em ordem, à altura dos olhos do aluno.",
        "List the steps of your class, represent each with a symbol and post them in order, at the student's eye level.",
        "Liste las etapas de su clase, represente cada una con un símbolo y fíjelas en orden, a la altura de los ojos del alumno.",
      ),
      objectives: mlList(
        ["Previsibilidade", "Autonomia nas transições", "Redução de ansiedade"],
        ["Predictability", "Autonomy in transitions", "Reduced anxiety"],
        ["Previsibilidad", "Autonomía en las transiciones", "Reducción de ansiedad"],
      ),
      authorship: "adapted" as const,
      citations: [afirm("visual-supports", "Visual Supports")],
      stepByStep: mlList(
        [
          "Liste as etapas reais da sua aula: entrada, tarefa 1, pausa, tarefa 2, saída",
          "Escolha um símbolo para cada etapa e mantenha-o igual em todas as aulas",
          "Fixe os cartões em ordem, à altura dos olhos do aluno",
          "No início da aula, percorra o quadro junto com ele",
          "Ao concluir cada etapa, é o aluno quem retira ou vira o cartão",
          "Se a rotina mudar, altere o quadro antes de a aula começar",
        ],
        [
          "List the real steps of your class: arrival, task 1, break, task 2, leaving",
          "Pick one symbol per step and keep it identical across classes",
          "Post the cards in order, at the student's eye level",
          "At the start of class, walk through the board together",
          "When a step is done, the student is the one who removes or flips the card",
          "If the routine changes, update the board before class starts",
        ],
        [
          "Liste las etapas reales de su clase: entrada, tarea 1, pausa, tarea 2, salida",
          "Elija un símbolo por etapa y manténgalo igual en todas las clases",
          "Fije las tarjetas en orden, a la altura de los ojos del alumno",
          "Al inicio de la clase, recorra el tablero junto con él",
          "Al concluir cada etapa, es el alumno quien retira o gira la tarjeta",
          "Si la rutina cambia, modifique el tablero antes de empezar",
        ],
      ),
      tips: mlList(
        [
          "Fotografe o quadro montado para remontá-lo rápido no dia seguinte",
          "Se o aluno ignorar o quadro, reduza o número de cartões pela metade",
        ],
        [
          "Photograph the finished board so you can rebuild it quickly the next day",
          "If the student ignores the board, cut the number of cards in half",
        ],
        [
          "Fotografíe el tablero armado para rehacerlo rápido al día siguiente",
          "Si el alumno ignora el tablero, reduzca a la mitad la cantidad de tarjetas",
        ],
      ),
      variations: mlList(
        ["Versão individual de mesa, para quem se distrai com o quadro coletivo", "Versão em tira, só com a próxima etapa"],
        ["An individual desk version, for students distracted by the class board", "A strip version showing only the next step"],
        ["Versión individual de mesa, para quien se distrae con el tablero colectivo", "Versión en tira, solo con la etapa siguiente"],
      ),
      assessment: ml(
        "Observe se o aluno consulta o quadro sozinho e quantas transições ocorrem sem intervenção do adulto.",
        "Watch whether the student checks the board unprompted and how many transitions happen without adult intervention.",
        "Observe si el alumno consulta el tablero solo y cuántas transiciones ocurren sin intervención del adulto.",
      ),
    },
    {
      name: ml(
        "Narrativa social para uma transição difícil",
        "Social narrative for a hard transition",
        "Narrativa social para una transición difícil",
      ),
      age: ml("5-14 anos", "5-14 years", "5-14 años"),
      duration: ml("30 min para escrever, 5 min de leitura", "30 min to write, 5 min to read", "30 min para escribir, 5 min de lectura"),
      description: ml(
        "Um texto curto que prepara o aluno para uma situação específica que costuma ser difícil.",
        "A short text preparing the student for a specific situation that is usually hard.",
        "Un texto breve que prepara al alumno para una situación específica que suele ser difícil.",
      ),
      materials: mlList(
        ["Papel ou slides", "Fotos reais do local e das pessoas envolvidas"],
        ["Paper or slides", "Real photos of the place and the people involved"],
        ["Papel o diapositivas", "Fotos reales del lugar y de las personas involucradas"],
      ),
      implementation: ml(
        "Escreva de 5 a 10 frases em primeira pessoa e leia junto em um momento calmo, sempre antes da situação.",
        "Write 5 to 10 first-person sentences and read them together calmly, always before the situation.",
        "Escriba de 5 a 10 frases en primera persona y léalas juntos con calma, siempre antes de la situación.",
      ),
      objectives: mlList(
        ["Preparação para transições", "Autonomia social", "Redução de crises"],
        ["Preparation for transitions", "Social autonomy", "Fewer meltdowns"],
        ["Preparación para transiciones", "Autonomía social", "Reducción de crisis"],
      ),
      authorship: "adapted" as const,
      citations: [afirm("social-narratives", "Social Narratives")],
      stepByStep: mlList(
        [
          "Escolha uma única situação concreta que costuma ser difícil",
          "Fotografe o local real e as pessoas envolvidas",
          "Escreva de 5 a 10 frases em primeira pessoa: onde, quem, o que acontece",
          "Inclua o que o aluno pode fazer se ficar difícil",
          "Leia junto em um momento calmo, nunca durante a crise",
          "Releia nos dias seguintes até a situação ficar familiar",
        ],
        [
          "Pick a single concrete situation that is usually hard",
          "Photograph the real place and the people involved",
          "Write 5 to 10 first-person sentences: where, who, what happens",
          "Include what the student can do if it gets hard",
          "Read it together calmly, never during a meltdown",
          "Re-read on following days until the situation feels familiar",
        ],
        [
          "Elija una única situación concreta que suele ser difícil",
          "Fotografíe el lugar real y a las personas involucradas",
          "Escriba de 5 a 10 frases en primera persona: dónde, quién, qué pasa",
          "Incluya qué puede hacer el alumno si se pone difícil",
          "Léala con calma, nunca durante la crisis",
          "Reléala los días siguientes hasta que la situación resulte familiar",
        ],
      ),
      tips: mlList(
        ["Evite frases com 'não' — descreva o que fazer, não o que evitar", "Use fotos reais, não desenhos genéricos"],
        ["Avoid sentences with 'don't' — describe what to do, not what to avoid", "Use real photos, not generic drawings"],
        ["Evite frases con 'no' — describa qué hacer, no qué evitar", "Use fotos reales, no dibujos genéricos"],
      ),
      variations: mlList(
        ["Versão em vídeo, gravada no próprio local", "Versão em quadrinhos para alunos que leem pouco"],
        ["A video version recorded on location", "A comic-strip version for students who read little"],
        ["Versión en video, grabada en el propio lugar", "Versión en cómic para alumnos que leen poco"],
      ),
      assessment: ml(
        "Compare quantas vezes a situação gerou crise antes e depois de algumas semanas de leitura.",
        "Compare how often the situation caused a meltdown before and after a few weeks of reading.",
        "Compare cuántas veces la situación generó crisis antes y después de algunas semanas de lectura.",
      ),
    },
    {
      name: ml("Tarefa dividida em passos com registro", "Step-by-step task with tracking", "Tarea dividida en pasos con registro"),
      age: ml("7-16 anos", "7-16 years", "7-16 años"),
      duration: ml("15-40 min", "15-40 min", "15-40 min"),
      description: ml(
        "Transforma uma atividade que o aluno não inicia numa sequência de passos pequenos, e mostra onde ele trava.",
        "Turns an activity the student won't start into a sequence of small steps, and shows where they get stuck.",
        "Convierte una actividad que el alumno no inicia en una secuencia de pasos pequeños, y muestra dónde se traba.",
      ),
      materials: mlList(
        ["Lista de passos impressa", "Marcador ou adesivos", "Material da própria atividade"],
        ["Printed step list", "Marker or stickers", "The activity's own materials"],
        ["Lista de pasos impresa", "Marcador o adhesivos", "Material de la propia actividad"],
      ),
      implementation: ml(
        "Execute a tarefa você mesmo, anote cada passo real e entregue a lista ao aluno junto com a atividade.",
        "Do the task yourself, write down each real step and hand the list to the student along with the activity.",
        "Haga la tarea usted mismo, anote cada paso real y entregue la lista al alumno junto con la actividad.",
      ),
      objectives: mlList(
        ["Iniciar tarefas com autonomia", "Identificar a dificuldade real", "Sensação de progresso"],
        ["Start tasks independently", "Identify the real difficulty", "A sense of progress"],
        ["Iniciar tareas con autonomía", "Identificar la dificultad real", "Sensación de progreso"],
      ),
      authorship: "adapted" as const,
      citations: [afirm("task-analysis", "Task Analysis"), afirm("prompting", "Prompting")],
      stepByStep: mlList(
        [
          "Execute a tarefa você mesmo e anote cada passo que realmente fez",
          "Reescreva a lista em linguagem direta, um passo por linha",
          "Entregue a lista ao aluno junto com a atividade",
          "Deixe que ele marque cada passo concluído",
          "Observe em qual passo ele parou ou pediu ajuda",
          "Ajuste a instrução daquele passo, não da tarefa inteira",
        ],
        [
          "Do the task yourself and write down every step you actually took",
          "Rewrite the list in plain language, one step per line",
          "Hand the list to the student along with the activity",
          "Let them tick off each completed step",
          "Note which step they stopped at or asked for help",
          "Adjust the instruction for that step, not the whole task",
        ],
        [
          "Haga la tarea usted mismo y anote cada paso que realmente hizo",
          "Reescriba la lista en lenguaje directo, un paso por línea",
          "Entregue la lista al alumno junto con la actividad",
          "Deje que marque cada paso concluido",
          "Observe en qué paso se detuvo o pidió ayuda",
          "Ajuste la instrucción de ese paso, no de la tarea entera",
        ],
      ),
      tips: mlList(
        ["Se a lista passar de 8 passos, quebre a tarefa em duas", "Guarde as listas: elas mostram a evolução ao longo do bimestre"],
        ["If the list goes past 8 steps, split the task in two", "Keep the lists: they show progress across the term"],
        ["Si la lista supera 8 pasos, divida la tarea en dos", "Guarde las listas: muestran la evolución a lo largo del bimestre"],
      ),
      variations: mlList(
        ["Passos ilustrados para alunos não leitores", "Lista com o primeiro passo já marcado, para reduzir a barreira de início"],
        ["Illustrated steps for non-reading students", "A list with the first step pre-ticked, to lower the barrier to starting"],
        ["Pasos ilustrados para alumnos no lectores", "Lista con el primer paso ya marcado, para reducir la barrera de inicio"],
      ),
      assessment: ml(
        "Acompanhe quantos passos o aluno completa sem ajuda e se esse número cresce ao longo das semanas.",
        "Track how many steps the student completes unaided and whether that number grows over the weeks.",
        "Siga cuántos pasos completa el alumno sin ayuda y si ese número crece con las semanas.",
      ),
    },
    {
      name: ml("Vídeo-modelo de um comportamento-alvo", "Video model of a target behaviour", "Video-modelo de una conducta objetivo"),
      age: ml("6-16 anos", "6-16 years", "6-16 años"),
      duration: ml("20 min para gravar, 2 min por exibição", "20 min to record, 2 min per viewing", "20 min para grabar, 2 min por exhibición"),
      description: ml(
        "Um vídeo curto mostrando exatamente o comportamento esperado, assistido logo antes da situação em que ele deve ocorrer.",
        "A short video showing exactly the expected behaviour, watched right before the situation where it should occur.",
        "Un video corto que muestra exactamente la conducta esperada, visto justo antes de la situación en que debe ocurrir.",
      ),
      materials: mlList(
        ["Celular", "Um colega ou o próprio aluno como modelo", "Autorização da família para gravar"],
        ["A phone", "A peer or the student themselves as model", "Family consent to record"],
        ["Celular", "Un compañero o el propio alumno como modelo", "Autorización de la familia para grabar"],
      ),
      implementation: ml(
        "Grave de 30 a 60 segundos com o comportamento-alvo isolado e exiba imediatamente antes do momento esperado.",
        "Record 30 to 60 seconds isolating the target behaviour and play it right before the expected moment.",
        "Grabe de 30 a 60 segundos aislando la conducta objetivo y muéstrelo justo antes del momento esperado.",
      ),
      objectives: mlList(
        ["Aprendizagem por imitação", "Comportamento-alvo específico", "Generalização"],
        ["Learning by imitation", "A specific target behaviour", "Generalisation"],
        ["Aprendizaje por imitación", "Conducta objetivo específica", "Generalización"],
      ),
      authorship: "adapted" as const,
      citations: [afirm("video-modeling", "Video Modeling"), afirm("modeling", "Modeling")],
      stepByStep: mlList(
        [
          "Obtenha a autorização da família antes de qualquer gravação",
          "Escolha um comportamento observável e específico",
          "Grave de 30 a 60 segundos mostrando só esse comportamento",
          "Verifique se não há ruído ou movimento distraindo no fundo",
          "Exiba imediatamente antes do momento em que ele é esperado",
          "Repita nos dias seguintes e vá espaçando conforme se estabelece",
        ],
        [
          "Get family consent before recording anything",
          "Choose an observable, specific behaviour",
          "Record 30 to 60 seconds showing only that behaviour",
          "Check there is no distracting noise or movement in the background",
          "Play it immediately before the moment it is expected",
          "Repeat on following days and space it out as it becomes established",
        ],
        [
          "Obtenga la autorización de la familia antes de grabar",
          "Elija una conducta observable y específica",
          "Grabe de 30 a 60 segundos mostrando solo esa conducta",
          "Verifique que no haya ruido ni movimiento distrayendo al fondo",
          "Muéstrelo justo antes del momento en que se espera",
          "Repita los días siguientes y espacie conforme se establece",
        ],
      ),
      tips: mlList(
        ["Modelo da mesma idade funciona melhor que adulto", "Grave na própria sala onde o comportamento é esperado"],
        ["A same-age model works better than an adult", "Record in the very room where the behaviour is expected"],
        ["Un modelo de la misma edad funciona mejor que un adulto", "Grabe en la propia aula donde se espera la conducta"],
      ),
      variations: mlList(
        ["Automodelação: o próprio aluno como modelo, editando os acertos", "Vídeo em ponto de vista, gravado da perspectiva de quem executa"],
        ["Self-modelling: the student as their own model, editing in the successes", "Point-of-view video, filmed from the doer's perspective"],
        ["Automodelado: el propio alumno como modelo, editando los aciertos", "Video en punto de vista, grabado desde la perspectiva de quien ejecuta"],
      ),
      assessment: ml(
        "Conte quantas vezes o comportamento ocorre sem o vídeo, comparando antes e depois de duas semanas.",
        "Count how often the behaviour occurs without the video, comparing before and after two weeks.",
        "Cuente cuántas veces ocurre la conducta sin el video, comparando antes y después de dos semanas.",
      ),
    },
  ]

  const courses = [
    // --- Cadastrados manualmente pelo mantenedor do site ----------------------
    // A URL da CBI of Miami mudou desde o cadastro original; atualizada para a
    // página que responde hoje.
    {
      title: ml(
        "Pós-Graduação Intervenção ABA para Autismo",
        "Postgraduate: ABA Intervention for Autism",
        "Posgrado en Intervención ABA para Autismo",
      ),
      provider: "CBI of Miami",
      duration: ml("600h", "600h", "600h"),
      price: ml("Consultar", "On request", "Consultar"),
      certificate: true,
      level: ml("Pós-graduação", "Postgraduate", "Posgrado"),
      language: "pt" as const,
      url: "https://cbiofmiami.com/pos/intervencao-aba-para-autismo-e-deficiencia-intelectual",
    },
    {
      title: ml("Cuidador de Criança Autista", "Caregiver for Autistic Children", "Cuidador de Niño Autista"),
      provider: "Prime Cursos",
      duration: ml("40h", "40h", "40h"),
      price: ml("R$ 79", "R$ 79", "R$ 79"),
      certificate: true,
      level: ml("Básico", "Basic", "Básico"),
      language: "pt" as const,
      url: "https://www.primecursos.com.br/cuidador-de-crianca-autista/",
    },
    {
      title: ml(
        "Pós-Graduação em TEA — Transtorno do Espectro Autista",
        "Postgraduate in ASD — Autism Spectrum Disorder",
        "Posgrado en TEA — Trastorno del Espectro Autista",
      ),
      provider: "CENES",
      duration: ml("360h", "360h", "360h"),
      price: ml("R$ 189/mês", "R$ 189/month", "R$ 189/mes"),
      certificate: true,
      level: ml("Pós-graduação", "Postgraduate", "Posgrado"),
      language: "pt" as const,
      url: "https://cenes.com.br/curso/pos-graduacao-em-tea-transtorno-do-espectro-autista",
    },
    {
      title: ml("Curso de Autismo", "Autism Course", "Curso de Autismo"),
      provider: "Cursos Educaweb",
      duration: ml("60h", "60h", "60h"),
      price: ml("R$ 97", "R$ 97", "R$ 97"),
      certificate: true,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "pt" as const,
      url: "https://cursoseducaweb.com.br/curso-de-autismo",
    },

    // --- Formações gratuitas acrescentadas na curadoria -----------------------
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
      title: ml("Introduction to Autism", "Introduction to Autism", "Introduction to Autism"),
      provider: "AFIRM — Frank Porter Graham / UNC",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: true,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "en" as const,
      url: "https://afirm-modules.fpg.unc.edu/Introduction-Autism/content",
    },
    {
      title: ml(
        "Selecting an EBP — como escolher a prática certa",
        "Selecting an EBP",
        "Selecting an EBP — cómo elegir la práctica adecuada",
      ),
      provider: "AFIRM — Frank Porter Graham / UNC",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: true,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "en" as const,
      url: "https://afirm-modules.fpg.unc.edu/Selecting-EBP/content/",
    },
    {
      title: ml(
        "Módulos AFIRM — 27 práticas com evidência, passo a passo",
        "AFIRM Modules — 27 evidence-based practices, step by step",
        "Módulos AFIRM — 27 prácticas con evidencia, paso a paso",
      ),
      provider: "AFIRM — Frank Porter Graham / UNC",
      duration: ml("Autoinstrucional, por módulo", "Self-paced, per module", "Autoinstruccional, por módulo"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: true,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "en" as const,
      url: "https://afirm.fpg.unc.edu/modules/afirm/",
    },
  ]

  const resources = [
    {
      title: ml(
        "Pacote de Apoios Visuais — materiais prontos",
        "Visual Supports packet — ready-to-use materials",
        "Paquete de Apoyos Visuales — materiales listos",
      ),
      type: ml("Prática com evidência", "Evidence-based practice", "Práctica con evidencia"),
      description: ml(
        "Visão geral da prática, checklist de implementação, planilhas de registro e folha de orientação para a família.",
        "Practice overview, implementation checklist, data sheets and a family tip sheet.",
        "Visión general de la práctica, lista de verificación, planillas de registro y hoja para la familia.",
      ),
      featured: true,
      url: "https://afirm.fpg.unc.edu/visual-supports",
      publisher: "AFIRM / University of North Carolina",
      language: "en" as const,
      format: "PDF" as const,
    },
    {
      title: ml("Pacote de Narrativas Sociais", "Social Narratives packet", "Paquete de Narrativas Sociales"),
      type: ml("Prática com evidência", "Evidence-based practice", "Práctica con evidencia"),
      description: ml(
        "Como escrever, aplicar e acompanhar narrativas sociais, com modelos e checklists.",
        "How to write, apply and monitor social narratives, with templates and checklists.",
        "Cómo escribir, aplicar y hacer seguimiento de narrativas sociales, con plantillas y listas.",
      ),
      featured: false,
      url: "https://afirm.fpg.unc.edu/social-narratives",
      publisher: "AFIRM / University of North Carolina",
      language: "en" as const,
      format: "PDF" as const,
    },
    {
      title: ml("A Escola Comum Inclusiva", "The Inclusive Mainstream School", "La Escuela Común Inclusiva"),
      type: ml("Formação", "Training", "Formación"),
      description: ml(
        "Fascículo do MEC/SEESP sobre a organização da escola comum na perspectiva da inclusão escolar.",
        "MEC/SEESP booklet on organising the mainstream school from an inclusion perspective.",
        "Fascículo del MEC/SEESP sobre la organización de la escuela común desde la perspectiva de la inclusión.",
      ),
      featured: true,
      url: "https://iparadigma.org.br/wp-content/uploads/Ed-incluisva-85.pdf",
      publisher: "MEC / SEESP",
      language: "pt" as const,
      format: "PDF" as const,
    },
    {
      title: ml(
        "A Educação Especial na Perspectiva da Inclusão Escolar",
        "Special Education from an Inclusion Perspective",
        "La Educación Especial desde la Perspectiva de la Inclusión",
      ),
      type: ml("Formação", "Training", "Formación"),
      description: ml(
        "Fundamentos da educação especial inclusiva, publicação oficial do Ministério da Educação.",
        "Foundations of inclusive special education, an official Ministry of Education publication.",
        "Fundamentos de la educación especial inclusiva, publicación oficial del Ministerio de Educación.",
      ),
      featured: false,
      url: "https://www.udesc.br/arquivos/faed/id_cpmenu/4477/fasciculo_1_15841018257729_4477.pdf",
      publisher: "MEC / SEESP",
      language: "pt" as const,
      format: "PDF" as const,
    },
    {
      title: ml("DIVERSA — educação inclusiva na prática", "DIVERSA — inclusive education in practice", "DIVERSA — educación inclusiva en la práctica"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Plataforma gratuita do Instituto Rodrigo Mendes com relatos de prática, artigos e materiais.",
        "Free platform by Instituto Rodrigo Mendes with practice reports, articles and materials.",
        "Plataforma gratuita del Instituto Rodrigo Mendes con relatos de práctica, artículos y materiales.",
      ),
      featured: false,
      url: "https://diversa.org.br/educacao-inclusiva/",
      publisher: "Instituto Rodrigo Mendes",
      language: "pt" as const,
      format: "Site" as const,
    },
    {
      title: ml("As 28 práticas com evidência para TEA", "The 28 evidence-based practices for ASD", "Las 28 prácticas con evidencia para TEA"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Lista oficial das práticas identificadas na revisão do NCAEP, com a base metodológica de cada classificação.",
        "Official list of practices identified in the NCAEP review, with the methodology behind each classification.",
        "Lista oficial de las prácticas identificadas en la revisión del NCAEP, con la base metodológica de cada clasificación.",
      ),
      featured: false,
      url: "https://autismpdc.fpg.unc.edu/ebps/",
      publisher: "NCAEP / NPDC — University of North Carolina",
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
        "Referencial para planejar aulas acessíveis a todos desde o início, em vez de adaptar depois caso a caso.",
        "A framework for planning lessons accessible to everyone from the start, instead of adapting case by case.",
        "Referencia para planificar clases accesibles a todos desde el inicio, en vez de adaptar caso por caso.",
      ),
      featured: false,
      url: "https://udlguidelines.cast.org/",
      publisher: "CAST",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Canal do Instituto Rodrigo Mendes", "Instituto Rodrigo Mendes channel", "Canal del Instituto Rodrigo Mendes"),
      type: ml("Vídeo", "Video", "Video"),
      description: ml(
        "Videoconferências e formações em português sobre inclusão escolar na prática.",
        "Video conferences and training in Portuguese on inclusive education in practice.",
        "Videoconferencias y formaciones en portugués sobre inclusión escolar en la práctica.",
      ),
      featured: false,
      url: "https://www.youtube.com/c/institutorodrigomendes",
      publisher: "Instituto Rodrigo Mendes",
      language: "pt" as const,
      format: "Vídeo" as const,
    },
  ]

  return {
    strategies,
    activities,
    courses: withCommonCourses(courses),
    resources: withCommonResources(resources),
  }
}
