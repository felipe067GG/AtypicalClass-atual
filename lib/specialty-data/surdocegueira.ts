import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Surdocegueira e Deficiência Múltipla — área nova.
 *
 * O princípio que a organiza: surdocegueira não é surdez somada a cegueira.
 * É uma condição própria, porque cada sentido remanescente costuma ser usado
 * para compensar o outro — e quando os dois estão comprometidos, o acesso à
 * informação precisa ser construído deliberadamente, pelo tato e pela rotina.
 *
 * Nota de verificação: Perkins School for the Blind e o site principal do
 * National Center on Deafblindness respondem 403 ao verificador — bloqueio de
 * robô. O mantenedor confirmou as duas no navegador em 08/08/2026 e elas
 * entram com exceção registrada em `scripts/check-links.mjs`, cada uma só no
 * endereço confirmado. As alternativas que já respondiam sozinhas continuam
 * aqui: o Moodle do próprio NCDB, onde ficam os módulos OHOA, o programa de
 * interventores da Utah State e o California Deafblind Services.
 */

const OHOA: Citation = {
  label: "NCDB — módulos Open Hands, Open Access para interventores (plataforma de cursos)",
  url: "https://moodle.nationaldb.org/",
}

const OHOA_CURSOS: Citation = {
  label: "NCDB — catálogo dos módulos disponíveis",
  url: "https://moodle.nationaldb.org/course/index.php",
}

const USU: Citation = {
  label: "Utah State University — recursos de formação de interventores",
  url: "https://idrpp.usu.edu/projects/intervener/niaa-resources/index.php",
}

const CADB: Citation = {
  label: "California Deafblind Services — o papel do interventor",
  url: "https://cadeafblind.org/interveners/",
}

const PATHS_DB: Citation = {
  label: "Paths to Literacy — letramento e surdocegueira",
  url: "https://www.pathstoliteracy.org/deafblindness/",
}

const PATHS_MULT: Citation = {
  label: "Paths to Literacy — deficiências múltiplas",
  url: "https://www.pathstoliteracy.org/multiple-disabilities/",
}

const TIES: Citation = {
  label: "TIES Center / Univ. de Minnesota — participação no currículo comum (PDF)",
  url: "https://ici-s.umn.edu/files/YtCaKA6y-K?fileGroup=pdf",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")
const AVANCADO = ml("Avançado", "Advanced", "Avanzado")

export function surdocegueiraData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Rotina previsível como base", "A predictable routine as the foundation", "Rutina previsible como base"),
      description: ml(
        "Sem visão e audição confiáveis, o mundo chega sem aviso. A rotina estável é o que permite antecipar — é a primeira condição de aprendizagem aqui.",
        "Without reliable vision and hearing, the world arrives without warning. A stable routine is what allows anticipation — the first condition for learning here.",
        "Sin visión ni audición confiables, el mundo llega sin aviso. La rutina estable es lo que permite anticipar — la primera condición de aprendizaje aquí.",
      ),
      tips: mlList(
        [
          "Mesma sequência, mesma ordem, todos os dias — a previsibilidade é o currículo inicial",
          "Anuncie toda transição pelo canal que o aluno acessa, antes de ela acontecer",
          "Nunca mova o aluno sem avisar pelo toque combinado",
          "Mudança de rotina precisa ser preparada, não comunicada no momento",
        ],
        [
          "Same sequence, same order, every day — predictability is the initial curriculum",
          "Announce every transition through the channel the student accesses, before it happens",
          "Never move the student without warning through the agreed touch cue",
          "A change of routine must be prepared, not announced in the moment",
        ],
        [
          "Misma secuencia, mismo orden, todos los días — la previsibilidad es el currículo inicial",
          "Anuncie toda transición por el canal que el alumno accede, antes de que ocurra",
          "Nunca mueva al alumno sin avisar por el toque acordado",
          "El cambio de rutina debe prepararse, no comunicarse en el momento",
        ],
      ),
      evidence: "established" as const,
      citations: [OHOA, CADB],
      difficulty: BASICO,
    },
    {
      title: ml("Símbolos tangíveis", "Tangible symbols", "Símbolos tangibles"),
      description: ml(
        "Objetos que representam atividades — uma colher para o lanche, uma bola para a educação física. É a ponte concreta antes de qualquer sistema simbólico.",
        "Objects that stand for activities — a spoon for snack time, a ball for PE. The concrete bridge before any symbolic system.",
        "Objetos que representan actividades — una cuchara para la merienda, una pelota para educación física. Es el puente concreto antes de cualquier sistema simbólico.",
      ),
      tips: mlList(
        [
          "O símbolo precisa ter relação real com a atividade, não ser arbitrário",
          "Use sempre o mesmo objeto para a mesma atividade, sem exceção",
          "Entregue o símbolo antes da atividade, com tempo para explorar",
          "Monte um calendário de objetos: a sequência do dia em uma caixa",
        ],
        [
          "The symbol must bear a real relation to the activity, not be arbitrary",
          "Always use the same object for the same activity, without exception",
          "Hand over the symbol before the activity, with time to explore it",
          "Build an object calendar: the day's sequence in a box",
        ],
        [
          "El símbolo debe tener relación real con la actividad, no ser arbitrario",
          "Use siempre el mismo objeto para la misma actividad, sin excepción",
          "Entregue el símbolo antes de la actividad, con tiempo para explorar",
          "Arme un calendario de objetos: la secuencia del día en una caja",
        ],
      ),
      evidence: "established" as const,
      citations: [PATHS_DB, OHOA_CURSOS],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Mão sob mão, nunca mão sobre mão", "Hand-under-hand, never hand-over-hand", "Mano bajo mano, nunca mano sobre mano"),
      description: ml(
        "Colocar a sua mão sob a do aluno permite que ele explore e possa recuar. Guiar por cima tira o controle e costuma gerar resistência ao toque.",
        "Placing your hand under the student's lets them explore and withdraw. Guiding from above removes control and tends to create touch aversion.",
        "Colocar su mano bajo la del alumno le permite explorar y poder retirarse. Guiar por encima quita el control y suele generar rechazo al tacto.",
      ),
      tips: mlList(
        [
          "A mão dele em cima, a sua embaixo: ele decide quando explorar e quando parar",
          "Nunca puxe a mão do aluno para o objeto",
          "Anuncie o toque antes: um sinal fixo no ombro ou no braço",
          "Se ele recuar, respeite e ofereça de novo depois",
        ],
        [
          "Their hand on top, yours underneath: they decide when to explore and when to stop",
          "Never pull the student's hand towards an object",
          "Announce touch beforehand: a fixed cue on the shoulder or arm",
          "If they withdraw, respect it and offer again later",
        ],
        [
          "Su mano encima, la de usted debajo: él decide cuándo explorar y cuándo parar",
          "Nunca tire de la mano del alumno hacia el objeto",
          "Anuncie el toque antes: una señal fija en el hombro o el brazo",
          "Si se retira, respételo y ofrezca de nuevo después",
        ],
      ),
      evidence: "established" as const,
      citations: [CADB, USU],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Aproveitar o resíduo sensorial", "Using residual senses", "Aprovechar el resto sensorial"),
      description: ml(
        "Surdocegueira raramente é total. Descobrir exatamente o que o aluno ainda vê e ouve muda tudo que se planeja em seguida.",
        "Deafblindness is rarely total. Finding out exactly what the student still sees and hears changes everything planned afterwards.",
        "La sordoceguera rara vez es total. Descubrir exactamente qué ve y oye todavía el alumno cambia todo lo que se planifica después.",
      ),
      tips: mlList(
        [
          "Peça a avaliação funcional da visão e da audição — não confie no laudo isolado",
          "Teste em condições reais de sala: com ruído, com a luz de sempre",
          "Alto contraste e volume ajustado podem abrir um canal que parecia fechado",
          "Registre por escrito o que funciona, para toda a equipe usar",
        ],
        [
          "Request a functional vision and hearing assessment — do not rely on the report alone",
          "Test under real classroom conditions: with noise, with the usual lighting",
          "High contrast and adjusted volume may open a channel that seemed closed",
          "Record in writing what works, so the whole team can use it",
        ],
        [
          "Pida la evaluación funcional de la visión y la audición — no confíe solo en el informe",
          "Pruebe en condiciones reales de aula: con ruido, con la luz de siempre",
          "El alto contraste y el volumen ajustado pueden abrir un canal que parecía cerrado",
          "Registre por escrito lo que funciona, para que todo el equipo lo use",
        ],
      ),
      evidence: "established" as const,
      citations: [PATHS_DB, PATHS_MULT],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("O papel do interventor", "The role of the intervener", "El papel del interventor"),
      description: ml(
        "O interventor faz a mediação do acesso à informação e à comunicação — não substitui o professor nem faz a tarefa pelo aluno.",
        "The intervener mediates access to information and communication — they do not replace the teacher nor do the work for the student.",
        "El interventor media el acceso a la información y la comunicación — no sustituye al docente ni hace la tarea por el alumno.",
      ),
      tips: mlList(
        [
          "A relação pedagógica continua entre você e o aluno",
          "Compartilhe o planejamento com o interventor com antecedência",
          "Fale com o aluno, não com o interventor sobre o aluno",
          "Mediação não é execução: o interventor dá acesso, não faz por ele",
        ],
        [
          "The pedagogical relationship remains between you and the student",
          "Share your planning with the intervener in advance",
          "Talk to the student, not to the intervener about the student",
          "Mediation is not execution: the intervener gives access, they do not do it for them",
        ],
        [
          "La relación pedagógica sigue siendo entre usted y el alumno",
          "Comparta la planificación con el interventor con antelación",
          "Hable con el alumno, no con el interventor sobre el alumno",
          "Mediar no es ejecutar: el interventor da acceso, no lo hace por él",
        ],
      ),
      evidence: "established" as const,
      citations: [CADB, USU, OHOA],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Antecipar e encerrar cada atividade", "Signal the start and end of every activity", "Anticipar y cerrar cada actividad"),
      description: ml(
        "Sem visão e audição, atividades começam e acabam sem aviso. Marcar início e fim de forma tátil dá estrutura ao tempo.",
        "Without vision and hearing, activities begin and end without warning. Marking start and end through touch gives structure to time.",
        "Sin visión ni audición, las actividades empiezan y terminan sin aviso. Marcar inicio y fin de forma táctil da estructura al tiempo.",
      ),
      tips: mlList(
        [
          "Um sinal tátil fixo para 'vamos começar' e outro para 'terminou'",
          "Caixa de 'terminado': o aluno guarda ali o símbolo da atividade concluída",
          "Nunca retire o material sem sinalizar o fim",
          "Encerrar bem reduz mais a agitação que qualquer estratégia de manejo",
        ],
        [
          "One fixed touch cue for 'we are starting' and another for 'it is finished'",
          "A 'finished' box: the student puts the completed activity's symbol in it",
          "Never remove material without signalling the end",
          "Closing well reduces agitation more than any behaviour-management strategy",
        ],
        [
          "Una señal táctil fija para 'vamos a empezar' y otra para 'terminó'",
          "Caja de 'terminado': el alumno guarda allí el símbolo de la actividad concluida",
          "Nunca retire el material sin señalizar el fin",
          "Cerrar bien reduce más la agitación que cualquier estrategia de manejo",
        ],
      ),
      evidence: "established" as const,
      citations: [OHOA_CURSOS, PATHS_DB],
      difficulty: BASICO,
    },
    {
      title: ml("Participação, não presença", "Participation, not presence", "Participación, no presencia"),
      description: ml(
        "Estar na sala não é estar na aula. A pergunta é o que o aluno fez hoje que se relaciona ao que a turma estudou.",
        "Being in the room is not being in the lesson. The question is what the student did today that relates to what the class studied.",
        "Estar en el aula no es estar en la clase. La pregunta es qué hizo hoy el alumno que se relacione con lo que estudió el grupo.",
      ),
      tips: mlList(
        [
          "Adapte o mesmo conteúdo: mude o nível e a forma, não o assunto",
          "Cada aula deve ter um objetivo concreto para ele, escrito antes",
          "Atividade paralela sem relação com a aula é presença, não participação",
          "Envolva os colegas: o vínculo com a turma é objetivo de aprendizagem",
        ],
        [
          "Adapt the same content: change the level and the form, not the topic",
          "Every lesson should have a concrete objective for them, written beforehand",
          "A parallel activity unrelated to the lesson is presence, not participation",
          "Involve classmates: connection with the group is a learning objective",
        ],
        [
          "Adapte el mismo contenido: cambie el nivel y la forma, no el tema",
          "Cada clase debe tener un objetivo concreto para él, escrito antes",
          "Una actividad paralela sin relación con la clase es presencia, no participación",
          "Involucre a los compañeros: el vínculo con el grupo es objetivo de aprendizaje",
        ],
      ),
      evidence: "established" as const,
      citations: [TIES, PATHS_MULT],
      difficulty: AVANCADO,
    },
  ]

  const activities = [
    {
      name: ml("Calendário de objetos", "Object calendar", "Calendario de objetos"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("40 min para montar, uso diário", "40 min to build, daily use", "40 min para armar, uso diario"),
      description: ml(
        "Uma caixa com um objeto por atividade do dia, na ordem — a versão tátil do quadro de rotina.",
        "A box with one object per activity of the day, in order — the tactile version of a routine board.",
        "Una caja con un objeto por actividad del día, en orden — la versión táctil del tablero de rutina.",
      ),
      materials: mlList(
        ["Caixa com divisórias", "Um objeto por atividade", "Caixa separada de 'terminado'"],
        ["A box with compartments", "One object per activity", "A separate 'finished' box"],
        ["Caja con divisiones", "Un objeto por actividad", "Caja aparte de 'terminado'"],
      ),
      implementation: ml(
        "Escolha objetos com relação real com cada atividade e mantenha a mesma correspondência todos os dias.",
        "Choose objects with a real relation to each activity and keep the same correspondence every day.",
        "Elija objetos con relación real con cada actividad y mantenga la misma correspondencia todos los días.",
      ),
      objectives: mlList(
        ["Antecipação", "Noção de sequência", "Autonomia nas transições"],
        ["Anticipation", "A sense of sequence", "Autonomy in transitions"],
        ["Anticipación", "Noción de secuencia", "Autonomía en las transiciones"],
      ),
      authorship: "adapted" as const,
      citations: [OHOA, PATHS_DB],
      stepByStep: mlList(
        [
          "Liste as atividades do dia, na ordem em que acontecem",
          "Escolha um objeto que faça parte de cada atividade — não um símbolo arbitrário",
          "Organize os objetos na caixa, da esquerda para a direita",
          "Antes de cada atividade, leve o aluno à caixa e entregue o objeto",
          "Ao terminar, ele deposita o objeto na caixa de 'terminado'",
          "Mantenha exatamente os mesmos objetos por várias semanas antes de mudar",
        ],
        [
          "List the day's activities, in the order they happen",
          "Choose an object that is part of each activity — not an arbitrary symbol",
          "Arrange the objects in the box, left to right",
          "Before each activity, take the student to the box and hand over the object",
          "When it ends, they place the object in the 'finished' box",
          "Keep exactly the same objects for several weeks before changing",
        ],
        [
          "Liste las actividades del día, en el orden en que ocurren",
          "Elija un objeto que forme parte de cada actividad — no un símbolo arbitrario",
          "Organice los objetos en la caja, de izquierda a derecha",
          "Antes de cada actividad, lleve al alumno a la caja y entréguele el objeto",
          "Al terminar, deposita el objeto en la caja de 'terminado'",
          "Mantenga exactamente los mismos objetos por varias semanas antes de cambiar",
        ],
      ),
      tips: mlList(
        [
          "Trocar o objeto cedo demais desfaz a associação que estava se formando",
          "A caixa de 'terminado' comunica o fim melhor que qualquer aviso",
        ],
        [
          "Changing the object too early undoes the association being formed",
          "The 'finished' box communicates the end better than any announcement",
        ],
        [
          "Cambiar el objeto demasiado pronto deshace la asociación que se estaba formando",
          "La caja de 'terminado' comunica el fin mejor que cualquier aviso",
        ],
      ),
      variations: mlList(
        ["Versão reduzida com só as próximas duas atividades, se a caixa cheia confundir"],
        ["A reduced version with only the next two activities, if the full box confuses"],
        ["Versión reducida con solo las próximas dos actividades, si la caja llena confunde"],
      ),
      assessment: ml(
        "Observe se o aluno antecipa a atividade ao receber o objeto — mudança de postura já indica reconhecimento.",
        "Watch whether the student anticipates the activity on receiving the object — a shift in posture already indicates recognition.",
        "Observe si el alumno anticipa la actividad al recibir el objeto — un cambio de postura ya indica reconocimiento.",
      ),
    },
    {
      name: ml("Mapa de sinais de toque", "Touch cue map", "Mapa de señales táctiles"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("30 min, uma vez", "30 min, once", "30 min, una vez"),
      description: ml(
        "Um documento com os sinais de toque combinados, para que toda a equipe use exatamente os mesmos.",
        "A document with the agreed touch cues, so the whole team uses exactly the same ones.",
        "Un documento con las señales táctiles acordadas, para que todo el equipo use exactamente las mismas.",
      ),
      materials: mlList(
        ["Uma folha", "Fotos das posições de toque", "Participação do interventor e da família"],
        ["One sheet", "Photos of the touch positions", "Input from the intervener and the family"],
        ["Una hoja", "Fotos de las posiciones de toque", "Participación del interventor y la familia"],
      ),
      implementation: ml(
        "Defina com a equipe e a família um sinal por mensagem essencial e registre com foto.",
        "Agree with the team and the family on one cue per essential message and record it with a photo.",
        "Defina con el equipo y la familia una señal por mensaje esencial y registre con foto.",
      ),
      objectives: mlList(
        ["Comunicação consistente", "Reduzir sobressalto", "Alinhamento da equipe"],
        ["Consistent communication", "Fewer startles", "Team alignment"],
        ["Comunicación consistente", "Reducir el sobresalto", "Alineación del equipo"],
      ),
      authorship: "adapted" as const,
      citations: [CADB, USU],
      stepByStep: mlList(
        [
          "Liste as mensagens essenciais: 'sou eu', 'vamos levantar', 'acabou', 'sua vez'",
          "Defina um sinal de toque distinto para cada uma, com a família e o interventor",
          "Fotografe cada sinal, mostrando a posição exata da mão",
          "Monte a folha com foto e descrição de cada sinal",
          "Distribua para todos que trabalham com o aluno, inclusive na cantina e na portaria",
          "Revise a cada bimestre e sempre que alguém novo entrar na equipe",
        ],
        [
          "List the essential messages: 'it's me', 'let's stand up', 'it's over', 'your turn'",
          "Agree a distinct touch cue for each, with the family and the intervener",
          "Photograph each cue, showing the exact hand position",
          "Build the sheet with a photo and description of each cue",
          "Give it to everyone who works with the student, including canteen and front desk",
          "Review it each term and whenever someone new joins the team",
        ],
        [
          "Liste los mensajes esenciales: 'soy yo', 'vamos a levantarnos', 'terminó', 'tu turno'",
          "Defina una señal táctil distinta para cada uno, con la familia y el interventor",
          "Fotografíe cada señal, mostrando la posición exacta de la mano",
          "Arme la hoja con foto y descripción de cada señal",
          "Distribúyala a todos los que trabajan con el alumno, incluida la cantina y la portería",
          "Revísela cada bimestre y siempre que alguien nuevo entre al equipo",
        ],
      ),
      tips: mlList(
        [
          "Sinais diferentes entre adultos confundem mais que a ausência de sinal",
          "Incluir a família garante que o mesmo sinal valha em casa",
        ],
        [
          "Different cues between adults confuse more than having no cue at all",
          "Including the family ensures the same cue applies at home",
        ],
        [
          "Señales diferentes entre adultos confunden más que la ausencia de señal",
          "Incluir a la familia garantiza que la misma señal valga en casa",
        ],
      ),
      variations: mlList(
        ["Versão plastificada de bolso para quem trabalha esporadicamente com o aluno"],
        ["A laminated pocket version for staff who work with the student occasionally"],
        ["Versión plastificada de bolsillo para quien trabaja esporádicamente con el alumno"],
      ),
      assessment: ml(
        "Pergunte a três adultos diferentes qual é o sinal de 'acabou'. Se as respostas divergirem, o mapa não circulou.",
        "Ask three different adults what the cue for 'it's over' is. If the answers differ, the map has not circulated.",
        "Pregunte a tres adultos distintos cuál es la señal de 'terminó'. Si las respuestas difieren, el mapa no circuló.",
      ),
    },
    {
      name: ml("Objetivo da aula para este aluno", "This student's objective for the lesson", "Objetivo de la clase para este alumno"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("10 min por planejamento", "10 min per lesson plan", "10 min por planificación"),
      description: ml(
        "Um procedimento curto para garantir que o aluno tenha um objetivo real ligado ao conteúdo da turma, e não uma atividade paralela.",
        "A short procedure to ensure the student has a real objective tied to the class content, not a parallel activity.",
        "Un procedimiento corto para garantizar que el alumno tenga un objetivo real ligado al contenido del grupo, no una actividad paralela.",
      ),
      materials: mlList(
        ["Seu plano de aula", "Ficha de objetivo individual"],
        ["Your lesson plan", "An individual objective sheet"],
        ["Su plan de clase", "Ficha de objetivo individual"],
      ),
      implementation: ml(
        "Antes da aula, escreva em uma frase o que este aluno vai aprender do mesmo tema, e como você saberá.",
        "Before the lesson, write in one sentence what this student will learn from the same topic, and how you will know.",
        "Antes de la clase, escriba en una frase qué aprenderá este alumno del mismo tema, y cómo lo sabrá.",
      ),
      objectives: mlList(
        ["Participação real", "Ligação com o currículo", "Avaliação possível"],
        ["Real participation", "Connection to the curriculum", "Assessment that is possible"],
        ["Participación real", "Conexión con el currículo", "Evaluación posible"],
      ),
      authorship: "adapted" as const,
      citations: [TIES, PATHS_MULT],
      stepByStep: mlList(
        [
          "Escreva o tema da aula em uma frase",
          "Pergunte: o que deste tema é acessível pelo tato ou pelo resíduo sensorial dele?",
          "Escreva o objetivo dele em uma frase, começando com um verbo observável",
          "Defina como você vai saber que ele atingiu — o que exatamente vai observar",
          "Combine com o interventor o apoio necessário, sem que ele execute pelo aluno",
          "Ao final da aula, registre em uma linha o que aconteceu",
        ],
        [
          "Write the lesson topic in one sentence",
          "Ask: what part of this topic is accessible through touch or their residual senses?",
          "Write their objective in one sentence, starting with an observable verb",
          "Define how you will know they reached it — what exactly you will observe",
          "Agree the needed support with the intervener, without them doing it for the student",
          "At the end of the lesson, record in one line what happened",
        ],
        [
          "Escriba el tema de la clase en una frase",
          "Pregunte: ¿qué parte de este tema es accesible por el tacto o por su resto sensorial?",
          "Escriba su objetivo en una frase, empezando con un verbo observable",
          "Defina cómo sabrá que lo alcanzó — qué exactamente va a observar",
          "Acuerde con el interventor el apoyo necesario, sin que ejecute por el alumno",
          "Al final de la clase, registre en una línea qué ocurrió",
        ],
      ),
      tips: mlList(
        [
          "Se você não consegue escrever como vai avaliar, o objetivo ainda está vago",
          "Um objetivo por aula basta — e é muito mais do que costuma existir hoje",
        ],
        [
          "If you cannot write how you will assess it, the objective is still vague",
          "One objective per lesson is enough — and far more than usually exists today",
        ],
        [
          "Si no logra escribir cómo evaluará, el objetivo todavía es vago",
          "Un objetivo por clase basta — y es mucho más de lo que suele existir hoy",
        ],
      ),
      variations: mlList(
        ["Versão semanal, com um objetivo por semana em vez de por aula, quando o ritmo exigir"],
        ["A weekly version, with one objective per week instead of per lesson, when the pace requires"],
        ["Versión semanal, con un objetivo por semana en vez de por clase, cuando el ritmo lo exija"],
      ),
      assessment: ml(
        "Ao fim do bimestre, conte quantas aulas tiveram objetivo escrito para ele. Esse número é a medida.",
        "At the end of the term, count how many lessons had a written objective for them. That number is the measure.",
        "Al final del bimestre, cuente cuántas clases tuvieron objetivo escrito para él. Ese número es la medida.",
      ),
    },
  ]

  const courses = [
    {
      title: ml(
        "Open Hands, Open Access — módulos para interventores",
        "Open Hands, Open Access — intervener modules",
        "Open Hands, Open Access — módulos para interventores",
      ),
      provider: "National Center on Deafblindness",
      duration: ml("Autoinstrucional, por módulo", "Self-paced, per module", "Autoinstruccional, por módulo"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: false,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "en" as const,
      url: "https://moodle.nationaldb.org/",
    },
    {
      title: ml("Catálogo de módulos do NCDB", "NCDB module catalogue", "Catálogo de módulos del NCDB"),
      provider: "National Center on Deafblindness",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: false,
      level: ml("Todos os níveis", "All levels", "Todos los niveles"),
      language: "en" as const,
      url: "https://moodle.nationaldb.org/course/index.php",
    },
  ]

  const resources = [
    {
      title: ml("Formação de interventores — Utah State", "Intervener training — Utah State", "Formación de interventores — Utah State"),
      type: ml("Formação", "Training", "Formación"),
      description: ml(
        "Materiais de formação sobre o papel do interventor e como a mediação funciona na prática.",
        "Training materials on the intervener's role and how mediation works in practice.",
        "Materiales de formación sobre el papel del interventor y cómo funciona la mediación en la práctica.",
      ),
      featured: true,
      url: "https://idrpp.usu.edu/projects/intervener/niaa-resources/index.php",
      publisher: "Institute for Disability Research, Policy & Practice — Utah State University",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("O papel do interventor", "The intervener's role", "El papel del interventor"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "O que o interventor faz e o que não faz — texto útil para alinhar a equipe da escola.",
        "What the intervener does and does not do — useful text for aligning the school team.",
        "Qué hace y qué no hace el interventor — texto útil para alinear al equipo escolar.",
      ),
      featured: true,
      url: "https://cadeafblind.org/interveners/",
      publisher: "California Deafblind Services",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Letramento e surdocegueira", "Literacy and deafblindness", "Alfabetización y sordoceguera"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Estratégias de letramento para alunos surdocegos, incluindo símbolos tangíveis e sistemas táteis.",
        "Literacy strategies for deafblind students, including tangible symbols and tactile systems.",
        "Estrategias de alfabetización para alumnos sordociegos, incluyendo símbolos tangibles y sistemas táctiles.",
      ),
      featured: false,
      url: "https://www.pathstoliteracy.org/deafblindness/",
      publisher: "Perkins School for the Blind / TSBVI",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Deficiências múltiplas", "Multiple disabilities", "Discapacidades múltiples"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Materiais para alunos com mais de uma deficiência associada, com foco em acesso e comunicação.",
        "Materials for students with more than one associated disability, focused on access and communication.",
        "Materiales para alumnos con más de una discapacidad asociada, con foco en acceso y comunicación.",
      ),
      featured: false,
      url: "https://www.pathstoliteracy.org/multiple-disabilities/",
      publisher: "Perkins School for the Blind / TSBVI",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "NCDB — serviços de apoio às redes estaduais",
        "NCDB — services supporting state networks",
        "NCDB — servicios de apoyo a las redes estatales",
      ),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "O que o centro nacional oferece a escolas e famílias: assistência técnica, formação e apoio à identificação de alunos surdocegos.",
        "What the national centre offers schools and families: technical assistance, training and support for identifying deafblind students.",
        "Lo que el centro nacional ofrece a escuelas y familias: asistencia técnica, formación y apoyo a la identificación de alumnos sordociegos.",
      ),
      featured: false,
      url: "https://www.nationaldb.org/about-us/ncdb-services/",
      publisher: "National Center on Deafblindness",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Perkins School for the Blind", "Perkins School for the Blind", "Perkins School for the Blind"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Instituição onde nasceu boa parte da prática em surdocegueira, com formação docente e material sobre comunicação e rotina.",
        "The institution where much of deafblindness practice originated, with teacher training and material on communication and routine.",
        "Institución donde nació buena parte de la práctica en sordoceguera, con formación docente y material sobre comunicación y rutina.",
      ),
      featured: false,
      url: "https://www.perkins.org/",
      publisher: "Perkins School for the Blind",
      language: "en" as const,
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
