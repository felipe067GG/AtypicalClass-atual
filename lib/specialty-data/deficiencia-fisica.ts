import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Deficiência Física / Motora — área nova.
 *
 * O princípio que organiza a área: quase nenhuma barreira aqui é do aluno —
 * é do ambiente, do material e do tempo. A intervenção acontece na sala, não
 * na criança.
 *
 * Comunicação alternativa entra aqui porque parte dos alunos com deficiência
 * motora tem também comprometimento de fala, e a suposição de que quem não
 * fala não entende é um dos erros mais custosos da escola.
 */

const AAC_INSTITUTE: Citation = {
  label: "AAC Institute — comunicação aumentativa e alternativa",
  url: "https://www.aacinstitute.org/",
}

const AAC_LEARN: Citation = {
  label: "AssistiveWare — Learn AAC: guia prático sobre comunicação alternativa",
  url: "https://www.assistiveware.com/learn-aac",
}

const CEEDAR: Citation = {
  label: "CEEDAR / Univ. da Flórida — práticas com evidência para deficiências severas (PDF)",
  url: "https://ceedar.education.ufl.edu/wp-content/uploads/2014/03/Evidence-based-Practices-for-Students-with-Severe-Disabilities.pdf",
}

const TIES: Citation = {
  label: "TIES Center / Univ. de Minnesota — práticas instrucionais e participação (PDF)",
  url: "https://ici-s.umn.edu/files/YtCaKA6y-K?fileGroup=pdf",
}

const UDL: Citation = {
  label: "CAST — Diretrizes do Desenho Universal para a Aprendizagem",
  url: "https://udlguidelines.cast.org/",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")

export function deficienciaFisicaData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Circulação e alcance na sala", "Circulation and reach in the classroom", "Circulación y alcance en el aula"),
      description: ml(
        "A primeira barreira costuma ser o próprio mobiliário. Corredor estreito e material fora de alcance excluem antes de qualquer conteúdo começar.",
        "The first barrier is usually the furniture itself. A narrow aisle and out-of-reach materials exclude before any content begins.",
        "La primera barrera suele ser el propio mobiliario. Un pasillo estrecho y material fuera de alcance excluyen antes de que empiece cualquier contenido.",
      ),
      tips: mlList(
        [
          "Percorra a sala sentado numa cadeira com rodinhas para achar os obstáculos",
          "Deixe corredor livre até a lousa, a porta e a mesa do professor",
          "Material de uso comum na altura de alcance, não no armário alto",
          "O lugar do aluno não é no fundo nem na ponta: é onde ele participa",
        ],
        [
          "Cross the room seated on a wheeled chair to find the obstacles",
          "Keep a clear aisle to the board, the door and the teacher's desk",
          "Shared materials within reach, not on the top shelf",
          "The student's place is not at the back or the edge: it is where they take part",
        ],
        [
          "Recorra el aula sentado en una silla con ruedas para hallar los obstáculos",
          "Deje pasillo libre hasta el pizarrón, la puerta y el escritorio docente",
          "Material de uso común a la altura de alcance, no en el armario alto",
          "El lugar del alumno no es al fondo ni en la punta: es donde participa",
        ],
      ),
      evidence: "established" as const,
      citations: [TIES, UDL],
      difficulty: BASICO,
    },
    {
      title: ml("Posicionamento e fadiga", "Positioning and fatigue", "Posicionamiento y fatiga"),
      description: ml(
        "Postura adequada sustenta atenção. Manter o corpo estável já consome energia — e o rendimento cai por cansaço, não por desinteresse.",
        "Good posture sustains attention. Holding the body stable already costs energy — and performance drops from fatigue, not disinterest.",
        "La postura adecuada sostiene la atención. Mantener el cuerpo estable ya consume energía — y el rendimiento cae por cansancio, no por desinterés.",
      ),
      tips: mlList(
        [
          "Pés apoiados, tronco estável: sem isso, a mão não fica livre para escrever",
          "Plano inclinado aproxima o material do campo visual e reduz esforço",
          "Combine com a terapia ocupacional a troca de posição ao longo do dia",
          "Queda de rendimento no fim da aula pode ser fadiga postural",
        ],
        [
          "Feet supported, trunk stable: without that, the hand is not free to write",
          "A slant board brings material into the visual field and reduces effort",
          "Agree with occupational therapy on position changes across the day",
          "A drop in performance late in the lesson may be postural fatigue",
        ],
        [
          "Pies apoyados, tronco estable: sin eso, la mano no queda libre para escribir",
          "El plano inclinado acerca el material al campo visual y reduce el esfuerzo",
          "Acuerde con terapia ocupacional el cambio de posición a lo largo del día",
          "La caída de rendimiento al final de la clase puede ser fatiga postural",
        ],
      ),
      evidence: "emerging" as const,
      citations: [CEEDAR, TIES],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Registro sem depender da escrita manual", "Recording without relying on handwriting", "Registro sin depender de la escritura manual"),
      description: ml(
        "Separar o que se quer ensinar do gesto de escrever. Se a aula é de história, a dificuldade motora não deveria limitar a resposta.",
        "Separate what you want to teach from the act of writing. If the lesson is history, motor difficulty should not limit the answer.",
        "Separar lo que se quiere enseñar del gesto de escribir. Si la clase es de historia, la dificultad motora no debería limitar la respuesta.",
      ),
      tips: mlList(
        [
          "Ofereça a folha pronta em vez de exigir cópia do quadro",
          "Aceite resposta digitada, gravada ou ditada a um colega",
          "Engrossador de lápis e prancha antiderrapante resolvem muitos casos",
          "Escreva menos e pense mais: reduza a quantidade, não a exigência",
        ],
        [
          "Offer a ready-made sheet instead of requiring copying from the board",
          "Accept typed, recorded or dictated answers",
          "A pencil grip and a non-slip board solve many cases",
          "Write less and think more: cut the quantity, not the demand",
        ],
        [
          "Ofrezca la hoja lista en vez de exigir copia del pizarrón",
          "Acepte respuesta escrita a máquina, grabada o dictada",
          "El engrosador de lápiz y la tabla antideslizante resuelven muchos casos",
          "Escribir menos y pensar más: reduzca la cantidad, no la exigencia",
        ],
      ),
      evidence: "established" as const,
      citations: [UDL, CEEDAR],
      difficulty: BASICO,
    },
    {
      title: ml("Comunicação alternativa (CAA)", "Augmentative and alternative communication", "Comunicación alternativa (CAA)"),
      description: ml(
        "Quem não fala não é quem não tem o que dizer. Prancha de comunicação e recursos de fala digitalizada dão acesso ao turno de conversa.",
        "Someone who does not speak is not someone with nothing to say. Communication boards and speech-generating devices give access to the conversational turn.",
        "Quien no habla no es quien no tiene qué decir. El tablero de comunicación y los recursos de habla digitalizada dan acceso al turno de conversación.",
      ),
      tips: mlList(
        [
          "Nunca presuma que ausência de fala significa ausência de compreensão",
          "Fale com o aluno, não sobre ele na frente dele",
          "A prancha precisa estar disponível o tempo todo, não só na hora da atividade",
          "Dê tempo: montar uma frase na prancha leva muito mais que falar",
        ],
        [
          "Never assume that absence of speech means absence of understanding",
          "Talk to the student, not about them in front of them",
          "The board must be available at all times, not only during the activity",
          "Allow time: building a sentence on a board takes far longer than speaking",
        ],
        [
          "Nunca presuma que la ausencia de habla significa ausencia de comprensión",
          "Hable con el alumno, no sobre él delante de él",
          "El tablero debe estar disponible todo el tiempo, no solo en la actividad",
          "Dé tiempo: armar una frase en el tablero lleva mucho más que hablar",
        ],
      ),
      evidence: "established" as const,
      citations: [AAC_INSTITUTE, AAC_LEARN],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Tempo como recurso de acessibilidade", "Time as an accessibility resource", "El tiempo como recurso de accesibilidad"),
      description: ml(
        "Cada ação motora custa mais tempo. Manter o mesmo prazo para todos transforma diferença motora em diferença de nota.",
        "Every motor action costs more time. Keeping the same deadline for everyone turns a motor difference into a difference in grades.",
        "Cada acción motora cuesta más tiempo. Mantener el mismo plazo para todos convierte la diferencia motora en diferencia de nota.",
      ),
      tips: mlList(
        [
          "Tempo adicional é regra, definida antes, não concedida na hora",
          "Reduza a quantidade de itens em vez de acelerar o aluno",
          "Conte o tempo de deslocamento entre salas no planejamento",
          "Avalie o que ele sabe, não a velocidade com que consegue registrar",
        ],
        [
          "Extra time is a rule, set beforehand, not granted on the spot",
          "Reduce the number of items instead of rushing the student",
          "Count travel time between rooms in your planning",
          "Assess what they know, not how fast they can record it",
        ],
        [
          "El tiempo adicional es regla, definida antes, no concedida en el momento",
          "Reduzca la cantidad de ítems en vez de acelerar al alumno",
          "Cuente el tiempo de desplazamiento entre aulas en la planificación",
          "Evalúe lo que sabe, no la velocidad con que logra registrarlo",
        ],
      ),
      evidence: "established" as const,
      citations: [UDL, TIES],
      difficulty: BASICO,
    },
    {
      title: ml("Participação em educação física e práticas", "Participation in PE and hands-on work", "Participación en educación física y prácticas"),
      description: ml(
        "Adaptar a atividade em vez de dispensar o aluno. Ficar de fora com atestado é exclusão com carimbo.",
        "Adapt the activity instead of excusing the student. Sitting it out with a medical note is exclusion with a stamp.",
        "Adaptar la actividad en vez de dispensar al alumno. Quedarse fuera con certificado es exclusión con sello.",
      ),
      tips: mlList(
        [
          "Mude a regra, o material ou o espaço — não elimine a participação",
          "Dê ao aluno um papel ativo, não o de anotar o placar",
          "Em laboratório, adapte o instrumento ou distribua as funções em dupla",
          "Pergunte a ele como quer participar antes de decidir sozinho",
        ],
        [
          "Change the rule, the equipment or the space — do not remove participation",
          "Give the student an active role, not the job of keeping score",
          "In the lab, adapt the instrument or split roles in pairs",
          "Ask them how they want to take part before deciding on your own",
        ],
        [
          "Cambie la regla, el material o el espacio — no elimine la participación",
          "Dé al alumno un papel activo, no el de anotar el marcador",
          "En laboratorio, adapte el instrumento o reparta funciones en pareja",
          "Pregúntele cómo quiere participar antes de decidir solo",
        ],
      ),
      evidence: "emerging" as const,
      citations: [TIES, UDL],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Autonomia antes de assistência", "Autonomy before assistance", "Autonomía antes que asistencia"),
      description: ml(
        "Ajudar demais ensina dependência. A pergunta certa é o que ele consegue fazer sozinho se o ambiente permitir.",
        "Over-helping teaches dependence. The right question is what they can do alone if the environment allows.",
        "Ayudar de más enseña dependencia. La pregunta correcta es qué puede hacer solo si el ambiente lo permite.",
      ),
      tips: mlList(
        [
          "Pergunte antes de ajudar: 'você quer ajuda?' — e aceite o não",
          "Não empurre a cadeira de rodas sem pedir",
          "Espere: o tempo dele fazer sozinho costuma ser menor do que parece",
          "Ajuste o ambiente primeiro; assistência humana é o último recurso",
        ],
        [
          "Ask before helping: 'do you want help?' — and accept a no",
          "Do not push the wheelchair without asking",
          "Wait: the time they need to do it alone is usually shorter than it seems",
          "Adjust the environment first; human assistance is the last resort",
        ],
        [
          "Pregunte antes de ayudar: '¿quieres ayuda?' — y acepte el no",
          "No empuje la silla de ruedas sin pedir permiso",
          "Espere: el tiempo que necesita para hacerlo solo suele ser menor de lo que parece",
          "Ajuste el ambiente primero; la asistencia humana es el último recurso",
        ],
      ),
      evidence: "established" as const,
      citations: [TIES, CEEDAR],
      difficulty: BASICO,
    },
  ]

  const activities = [
    {
      name: ml("Percurso de acessibilidade da sala", "Classroom accessibility walkthrough", "Recorrido de accesibilidad del aula"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("30 min, uma vez por bimestre", "30 min, once a term", "30 min, una vez por bimestre"),
      description: ml(
        "Percorrer a sala do ponto de vista de quem usa cadeira de rodas ou andador, e listar as barreiras reais.",
        "Cross the room from the point of view of someone using a wheelchair or walker, and list the real barriers.",
        "Recorrer el aula desde el punto de vista de quien usa silla de ruedas o andador, y listar las barreras reales.",
      ),
      materials: mlList(
        ["Cadeira com rodinhas", "Fita métrica", "Folha de registro"],
        ["A wheeled chair", "A tape measure", "A recording sheet"],
        ["Silla con ruedas", "Cinta métrica", "Hoja de registro"],
      ),
      implementation: ml(
        "Faça o percurso sentado, meça os vãos e registre cada ponto onde precisou de ajuda.",
        "Do the route seated, measure the gaps and record every point where you needed help.",
        "Haga el recorrido sentado, mida los vanos y registre cada punto donde necesitó ayuda.",
      ),
      objectives: mlList(
        ["Identificar barreiras reais", "Priorizar mudanças", "Autonomia do aluno"],
        ["Identify real barriers", "Prioritise changes", "Student autonomy"],
        ["Identificar barreras reales", "Priorizar cambios", "Autonomía del alumno"],
      ),
      authorship: "adapted" as const,
      citations: [TIES, UDL],
      stepByStep: mlList(
        [
          "Sente numa cadeira com rodinhas e entre na sala pela porta",
          "Vá até a sua carteira sem levantar; anote onde travou",
          "Tente alcançar o material de uso comum sem se levantar",
          "Vá até a lousa e até a lixeira pelo mesmo caminho",
          "Meça a largura dos corredores e anote os menores que 90 cm",
          "Escolha as duas barreiras mais fáceis de remover e resolva esta semana",
        ],
        [
          "Sit on a wheeled chair and enter the room through the door",
          "Go to your desk without standing; note where you got stuck",
          "Try to reach the shared materials without standing up",
          "Go to the board and to the bin along the same route",
          "Measure aisle widths and note any narrower than 90 cm",
          "Pick the two easiest barriers to remove and fix them this week",
        ],
        [
          "Siéntese en una silla con ruedas y entre al aula por la puerta",
          "Vaya hasta su pupitre sin levantarse; anote dónde se trabó",
          "Intente alcanzar el material de uso común sin levantarse",
          "Vaya hasta el pizarrón y hasta el cesto por el mismo camino",
          "Mida el ancho de los pasillos y anote los menores a 90 cm",
          "Elija las dos barreras más fáciles de quitar y resuélvalas esta semana",
        ],
      ),
      tips: mlList(
        ["Faça com o aluno, não sobre ele: ele conhece as barreiras melhor que você", "Mochila no corredor é a barreira mais comum e a mais fácil de resolver"],
        ["Do it with the student, not about them: they know the barriers better than you", "A bag in the aisle is the commonest barrier and the easiest to fix"],
        ["Hágalo con el alumno, no sobre él: conoce las barreras mejor que usted", "La mochila en el pasillo es la barrera más común y la más fácil de resolver"],
      ),
      variations: mlList(
        ["Versão para a escola inteira, com a turma toda participando do mapeamento"],
        ["A whole-school version, with the entire class taking part in the mapping"],
        ["Versión para toda la escuela, con todo el grupo participando del mapeo"],
      ),
      assessment: ml(
        "Refaça o percurso um mês depois e compare quantos pontos de travamento restaram.",
        "Redo the route a month later and compare how many sticking points remain.",
        "Rehaga el recorrido un mes después y compare cuántos puntos de traba quedaron.",
      ),
    },
    {
      name: ml("Prancha de comunicação da disciplina", "Subject communication board", "Tablero de comunicación de la asignatura"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("40 min para montar", "40 min to build", "40 min para armar"),
      description: ml(
        "Uma prancha com o vocabulário específico da sua matéria, para o aluno participar da aula e não só do cotidiano.",
        "A board with your subject's specific vocabulary, so the student takes part in the lesson and not only in daily routines.",
        "Un tablero con el vocabulario específico de su materia, para que el alumno participe de la clase y no solo de lo cotidiano.",
      ),
      materials: mlList(
        ["Folha A3 plastificada", "Símbolos ou fotos impressas", "Consulta ao fonoaudiólogo, se houver"],
        ["A laminated A3 sheet", "Printed symbols or photos", "Input from the speech therapist, if available"],
        ["Hoja A3 plastificada", "Símbolos o fotos impresas", "Consulta al fonoaudiólogo, si lo hay"],
      ),
      implementation: ml(
        "Reúna os termos que a sua disciplina usa e monte uma prancha que fique disponível em todas as aulas.",
        "Gather the terms your subject uses and build a board that stays available in every lesson.",
        "Reúna los términos que usa su asignatura y arme un tablero que quede disponible en todas las clases.",
      ),
      objectives: mlList(
        ["Participação no conteúdo", "Vocabulário da disciplina", "Turno de fala"],
        ["Participation in content", "Subject vocabulary", "A conversational turn"],
        ["Participación en el contenido", "Vocabulario de la asignatura", "Turno de habla"],
      ),
      authorship: "adapted" as const,
      citations: [AAC_LEARN, AAC_INSTITUTE],
      stepByStep: mlList(
        [
          "Liste 20 a 30 termos que a sua disciplina usa toda semana",
          "Inclua também 'não sei', 'repita', 'discordo' e 'quero responder'",
          "Escolha símbolos consistentes com os que o aluno já usa em outros contextos",
          "Organize por categoria e mantenha a posição fixa — a memória é espacial",
          "Plastifique e deixe fixada na carteira, disponível o tempo todo",
          "Use a prancha você também, apontando enquanto fala",
        ],
        [
          "List 20 to 30 terms your subject uses every week",
          "Also include 'I don't know', 'repeat', 'I disagree' and 'I want to answer'",
          "Choose symbols consistent with those the student already uses elsewhere",
          "Organise by category and keep positions fixed — the memory is spatial",
          "Laminate it and keep it on the desk, available at all times",
          "Use the board yourself too, pointing while you speak",
        ],
        [
          "Liste 20 a 30 términos que su asignatura usa cada semana",
          "Incluya también 'no sé', 'repita', 'discrepo' y 'quiero responder'",
          "Elija símbolos consistentes con los que el alumno ya usa en otros contextos",
          "Organice por categoría y mantenga la posición fija — la memoria es espacial",
          "Plastifique y déjelo fijado en el pupitre, disponible todo el tiempo",
          "Use el tablero usted también, señalando mientras habla",
        ],
      ),
      tips: mlList(
        [
          "Sem 'discordo' e 'não sei', a prancha só permite concordar — e isso não é comunicar",
          "Se você não usa a prancha, o aluno também não vai usar",
        ],
        [
          "Without 'I disagree' and 'I don't know', the board only allows agreeing — and that is not communicating",
          "If you do not use the board, the student will not either",
        ],
        [
          "Sin 'discrepo' y 'no sé', el tablero solo permite estar de acuerdo — y eso no es comunicar",
          "Si usted no usa el tablero, el alumno tampoco lo usará",
        ],
      ),
      variations: mlList(
        ["Versão digital em tablet, com fala digitalizada", "Versão reduzida de bolso, para saídas e outros espaços"],
        ["A digital tablet version, with speech output", "A reduced pocket version, for outings and other spaces"],
        ["Versión digital en tableta, con habla digitalizada", "Versión reducida de bolsillo, para salidas y otros espacios"],
      ),
      assessment: ml(
        "Conte quantas vezes o aluno iniciou uma fala com a prancha, não só respondeu ao que foi perguntado.",
        "Count how many times the student initiated a turn with the board, rather than only answering questions.",
        "Cuente cuántas veces el alumno inició una intervención con el tablero, no solo respondió a lo preguntado.",
      ),
    },
    {
      name: ml("Atividade prática redesenhada", "Redesigned hands-on activity", "Actividad práctica rediseñada"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("30 min de planejamento", "30 min of planning", "30 min de planificación"),
      description: ml(
        "Um procedimento para adaptar uma aula prática de forma que o aluno participe de fato, em vez de observar.",
        "A procedure for adapting a hands-on lesson so the student really takes part, instead of watching.",
        "Un procedimiento para adaptar una clase práctica de modo que el alumno participe de verdad, en vez de observar.",
      ),
      materials: mlList(
        ["O plano da aula prática que você já tem", "Folha de anotação"],
        ["The hands-on lesson plan you already have", "A note sheet"],
        ["El plan de la clase práctica que ya tiene", "Hoja de anotación"],
      ),
      implementation: ml(
        "Liste os gestos exigidos, identifique quais são barreira e mude a regra, o material ou o papel — não a participação.",
        "List the required movements, identify which are barriers and change the rule, the equipment or the role — not the participation.",
        "Liste los gestos exigidos, identifique cuáles son barrera y cambie la regla, el material o el papel — no la participación.",
      ),
      objectives: mlList(
        ["Participação real", "Mesmo objetivo de aprendizagem", "Convivência com a turma"],
        ["Real participation", "The same learning objective", "Being part of the group"],
        ["Participación real", "El mismo objetivo de aprendizaje", "Convivencia con el grupo"],
      ),
      authorship: "adapted" as const,
      citations: [UDL, TIES],
      stepByStep: mlList(
        [
          "Escreva o objetivo de aprendizagem da atividade em uma frase",
          "Liste todos os gestos motores que a atividade exige",
          "Marque quais desses gestos NÃO são necessários para atingir o objetivo",
          "Para cada gesto marcado, mude o material, a regra ou distribua a função",
          "Combine com o aluno o papel que ele quer assumir",
          "Verifique ao final: ele atingiu o mesmo objetivo que a turma?",
        ],
        [
          "Write the activity's learning objective in one sentence",
          "List every motor action the activity requires",
          "Mark which of those actions are NOT necessary to reach the objective",
          "For each marked action, change the equipment, the rule, or split the role",
          "Agree with the student on the role they want to take",
          "Check at the end: did they reach the same objective as the class?",
        ],
        [
          "Escriba el objetivo de aprendizaje de la actividad en una frase",
          "Liste todos los gestos motores que la actividad exige",
          "Marque cuáles de esos gestos NO son necesarios para lograr el objetivo",
          "Para cada gesto marcado, cambie el material, la regla o reparta la función",
          "Acuerde con el alumno el papel que quiere asumir",
          "Verifique al final: ¿logró el mismo objetivo que el grupo?",
        ],
      ),
      tips: mlList(
        [
          "Quase sempre o gesto motor não é o objetivo — é só o caminho habitual até ele",
          "Anotar o placar não é participar; é assistir com tarefa",
        ],
        [
          "The motor action is almost never the objective — just the usual route to it",
          "Keeping score is not participating; it is watching with a chore",
        ],
        [
          "Casi siempre el gesto motor no es el objetivo — es solo el camino habitual hacia él",
          "Anotar el marcador no es participar; es mirar con una tarea",
        ],
      ),
      variations: mlList(
        ["Redesenhar em conjunto com a turma, que costuma propor soluções melhores"],
        ["Redesign together with the class, who often propose better solutions"],
        ["Rediseñar junto con el grupo, que suele proponer mejores soluciones"],
      ),
      assessment: ml(
        "Se ao final ele atingiu o mesmo objetivo que os colegas, a adaptação funcionou.",
        "If at the end they reached the same objective as their classmates, the adaptation worked.",
        "Si al final logró el mismo objetivo que sus compañeros, la adaptación funcionó.",
      ),
    },
  ]

  const courses: never[] = []

  const resources = [
    {
      title: ml("Learn AAC — guia prático", "Learn AAC — practical guide", "Learn AAC — guía práctica"),
      type: ml("Formação", "Training", "Formación"),
      description: ml(
        "Material extenso e gratuito sobre comunicação alternativa: como escolher, implementar e apoiar no dia a dia.",
        "Extensive free material on alternative communication: how to choose, implement and support it day to day.",
        "Material extenso y gratuito sobre comunicación alternativa: cómo elegir, implementar y apoyar en el día a día.",
      ),
      featured: true,
      url: "https://www.assistiveware.com/learn-aac",
      publisher: "AssistiveWare",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("AAC Institute", "AAC Institute", "AAC Institute"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Organização dedicada à comunicação aumentativa e alternativa, com material de referência.",
        "An organisation dedicated to augmentative and alternative communication, with reference material.",
        "Organización dedicada a la comunicación aumentativa y alternativa, con material de referencia.",
      ),
      featured: false,
      url: "https://www.aacinstitute.org/",
      publisher: "AAC Institute",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "Práticas com evidência para deficiências severas",
        "Evidence-based practices for severe disabilities",
        "Prácticas con evidencia para discapacidades severas",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Inclui as práticas de instrução e apoio aplicáveis a alunos com comprometimento motor significativo.",
        "Includes instruction and support practices applicable to students with significant motor impairment.",
        "Incluye las prácticas de instrucción y apoyo aplicables a alumnos con compromiso motor significativo.",
      ),
      featured: true,
      url: "https://ceedar.education.ufl.edu/wp-content/uploads/2014/03/Evidence-based-Practices-for-Students-with-Severe-Disabilities.pdf",
      publisher: "CEEDAR Center — University of Florida",
      language: "en" as const,
      format: "PDF" as const,
    },
    {
      title: ml(
        "Participação e práticas instrucionais",
        "Participation and instructional practices",
        "Participación y prácticas instruccionales",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Relatório do TIES Center sobre garantir participação real no currículo comum.",
        "A TIES Center report on ensuring real participation in the general curriculum.",
        "Informe del TIES Center sobre garantizar participación real en el currículo común.",
      ),
      featured: false,
      url: "https://ici-s.umn.edu/files/YtCaKA6y-K?fileGroup=pdf",
      publisher: "TIES Center / ICI — University of Minnesota",
      language: "en" as const,
      format: "PDF" as const,
    },
  ]

  return {
    strategies,
    activities,
    courses: withCommonCourses(courses),
    resources: withCommonResources(resources),
  }
}
