import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Saúde Mental na escola — área nova.
 *
 * Limite importante, e ele está escrito também na interface: nada aqui é
 * diagnóstico nem tratamento. O papel do professor é reconhecer sinais,
 * ajustar o ambiente de sala e encaminhar — não conduzir intervenção clínica.
 *
 * As estratégias vêm das seis linhas de ação que o CDC descreve para promoção
 * de saúde mental na escola. O que não cabe ao professor está dito de forma
 * explícita em cada card.
 */

const CDC_MH: Citation = {
  label: "CDC — saúde mental e bem-estar na escola",
  url: "https://www.cdc.gov/healthy-youth/mental-health/index.html",
}

const CDC_EDU: Citation = {
  label: "CDC — educação em saúde mental em sala de aula",
  url: "https://www.cdc.gov/healthy-youth/mental-health/mental-health-education.html",
}

const WHO: Citation = {
  label: "Organização Mundial da Saúde — saúde do adolescente",
  url: "https://www.who.int/health-topics/adolescent-health",
}

const UDL: Citation = {
  label: "CAST — Diretrizes do Desenho Universal para a Aprendizagem",
  url: "https://udlguidelines.cast.org/",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")

export function saudeMentalData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Reconhecer sinais, não diagnosticar", "Recognise signs, do not diagnose", "Reconocer señales, no diagnosticar"),
      description: ml(
        "O professor é quem mais convive com o aluno e costuma notar a mudança primeiro. Notar e encaminhar é o papel — diagnosticar não é.",
        "The teacher spends the most time with the student and usually notices the change first. Noticing and referring is the role — diagnosing is not.",
        "El docente es quien más convive con el alumno y suele notar el cambio primero. Notar y derivar es el papel — diagnosticar no lo es.",
      ),
      tips: mlList(
        [
          "O sinal relevante é a mudança: o aluno que era e deixou de ser",
          "Registre o que observou de forma objetiva, com data — não interprete",
          "Queda súbita de rendimento e afastamento dos colegas pedem atenção",
          "Encaminhe ao serviço de saúde ou à equipe da escola; não conduza sozinho",
        ],
        [
          "The relevant signal is change: the student who was one way and no longer is",
          "Record what you observed objectively, with a date — do not interpret",
          "A sudden drop in performance and withdrawal from peers call for attention",
          "Refer to health services or the school team; do not handle it alone",
        ],
        [
          "La señal relevante es el cambio: el alumno que era y dejó de ser",
          "Registre lo observado de forma objetiva, con fecha — no interprete",
          "Una caída súbita del rendimiento y el aislamiento de los compañeros piden atención",
          "Derive al servicio de salud o al equipo escolar; no lo conduzca solo",
        ],
      ),
      evidence: "established" as const,
      citations: [CDC_MH, WHO],
      difficulty: BASICO,
    },
    {
      title: ml("Previsibilidade reduz ansiedade", "Predictability reduces anxiety", "La previsibilidad reduce la ansiedad"),
      description: ml(
        "Boa parte da ansiedade escolar vem do que não se sabe: o que vem depois, como será cobrado, se vai ter que falar em público.",
        "Much school anxiety comes from the unknown: what comes next, how it will be assessed, whether they will have to speak in public.",
        "Buena parte de la ansiedad escolar viene de lo que no se sabe: qué viene después, cómo se evaluará, si habrá que hablar en público.",
      ),
      tips: mlList(
        [
          "Anuncie a estrutura da aula no início e cumpra o combinado",
          "Diga com antecedência quando haverá leitura em voz alta ou apresentação",
          "Divulgue os critérios de avaliação antes, por escrito",
          "Avise mudanças de rotina com o máximo de antecedência possível",
        ],
        [
          "Announce the lesson structure at the start and stick to it",
          "Say in advance when there will be reading aloud or a presentation",
          "Publish assessment criteria beforehand, in writing",
          "Announce routine changes as far in advance as possible",
        ],
        [
          "Anuncie la estructura de la clase al inicio y cumpla lo acordado",
          "Diga con antelación cuándo habrá lectura en voz alta o presentación",
          "Divulgue los criterios de evaluación antes, por escrito",
          "Avise los cambios de rutina con la mayor antelación posible",
        ],
      ),
      evidence: "established" as const,
      citations: [CDC_MH, UDL],
      difficulty: BASICO,
    },
    {
      title: ml("Pertencimento e vínculo", "Belonging and connectedness", "Pertenencia y vínculo"),
      description: ml(
        "Sentir-se ligado a pelo menos um adulto e a alguns colegas na escola é um dos fatores de proteção mais consistentes.",
        "Feeling connected to at least one adult and a few peers at school is one of the most consistent protective factors.",
        "Sentirse vinculado a al menos un adulto y algunos compañeros en la escuela es uno de los factores de protección más consistentes.",
      ),
      tips: mlList(
        [
          "Chame pelo nome e cumprimente na entrada — parece pouco e não é",
          "Garanta que ninguém trabalhe sozinho por falta de dupla",
          "Reserve dois minutos por semana para conversar com quem fala menos",
          "Um adulto de referência na escola vale mais que um programa",
        ],
        [
          "Use their name and greet them on arrival — it seems small and is not",
          "Make sure nobody works alone for lack of a partner",
          "Set aside two minutes a week to talk with whoever speaks least",
          "One trusted adult at school is worth more than a programme",
        ],
        [
          "Llame por su nombre y salude a la entrada — parece poco y no lo es",
          "Garantice que nadie trabaje solo por falta de pareja",
          "Reserve dos minutos por semana para conversar con quien habla menos",
          "Un adulto de referencia en la escuela vale más que un programa",
        ],
      ),
      evidence: "established" as const,
      citations: [CDC_MH, CDC_EDU],
      difficulty: BASICO,
    },
    {
      title: ml("Reduzir a exposição desnecessária", "Reduce unnecessary exposure", "Reducir la exposición innecesaria"),
      description: ml(
        "Ler em voz alta sem aviso, corrigir em público e divulgar notas expõem o aluno ansioso sem ganho pedagógico.",
        "Unannounced reading aloud, correcting in public and posting grades expose the anxious student with no pedagogical gain.",
        "Leer en voz alta sin aviso, corregir en público y divulgar notas exponen al alumno ansioso sin ganancia pedagógica.",
      ),
      tips: mlList(
        [
          "Combine antes com o aluno se ele será chamado para ler",
          "Corrija em particular; elogie em público",
          "Não divulgue notas nem faça ranking visível",
          "Ofereça alternativa à apresentação oral quando ela não for o objetivo avaliado",
        ],
        [
          "Agree with the student beforehand if they will be asked to read",
          "Correct in private; praise in public",
          "Do not publish grades or display rankings",
          "Offer an alternative to oral presentation when that is not the assessed objective",
        ],
        [
          "Acuerde antes con el alumno si será llamado a leer",
          "Corrija en privado; elogie en público",
          "No divulgue notas ni haga ranking visible",
          "Ofrezca alternativa a la presentación oral cuando no sea el objetivo evaluado",
        ],
      ),
      evidence: "emerging" as const,
      citations: [CDC_MH, UDL],
      difficulty: BASICO,
    },
    {
      title: ml("Falar de saúde mental sem estigma", "Talking about mental health without stigma", "Hablar de salud mental sin estigma"),
      description: ml(
        "Alunos que participam de currículo sobre saúde mental relatam menos estigma e mais disposição para pedir ajuda.",
        "Students who take part in mental health curricula report less stigma and greater willingness to seek help.",
        "Los alumnos que participan de currículo sobre salud mental relatan menos estigma y más disposición a pedir ayuda.",
      ),
      tips: mlList(
        [
          "Trate como tema de saúde, com a mesma naturalidade de saúde física",
          "Evite linguagem que transforma diagnóstico em adjetivo",
          "Diga onde pedir ajuda, com nome e local concretos",
          "Não use exemplos de alunos reais da escola, nem anonimamente",
        ],
        [
          "Treat it as a health topic, as naturally as physical health",
          "Avoid language that turns a diagnosis into an adjective",
          "Say where to ask for help, with concrete names and places",
          "Do not use examples of real students from the school, even anonymously",
        ],
        [
          "Trátelo como tema de salud, con la misma naturalidad que la salud física",
          "Evite lenguaje que convierte el diagnóstico en adjetivo",
          "Diga dónde pedir ayuda, con nombres y lugares concretos",
          "No use ejemplos de alumnos reales de la escuela, ni de forma anónima",
        ],
      ),
      evidence: "established" as const,
      citations: [CDC_EDU],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Rede de encaminhamento definida antes", "A referral network defined in advance", "Red de derivación definida antes"),
      description: ml(
        "Saber para quem encaminhar antes de precisar. Descobrir o caminho no meio de uma crise custa tempo que não existe.",
        "Know who to refer to before you need it. Finding the route in the middle of a crisis costs time you do not have.",
        "Saber a quién derivar antes de necesitarlo. Descubrir el camino en medio de una crisis cuesta tiempo que no existe.",
      ),
      tips: mlList(
        [
          "Tenha por escrito quem é o responsável na escola e o serviço de saúde de referência",
          "Combine com a coordenação o que fazer fora do horário",
          "Registre encaminhamentos por escrito, com data",
          "Sigilo não é isolamento: você pode acionar a rede sem expor o aluno",
        ],
        [
          "Have in writing who is responsible at school and the referral health service",
          "Agree with school leadership what to do outside school hours",
          "Record referrals in writing, with dates",
          "Confidentiality is not isolation: you can activate the network without exposing the student",
        ],
        [
          "Tenga por escrito quién es el responsable en la escuela y el servicio de salud de referencia",
          "Acuerde con la coordinación qué hacer fuera del horario",
          "Registre las derivaciones por escrito, con fecha",
          "El secreto no es aislamiento: puede activar la red sin exponer al alumno",
        ],
      ),
      evidence: "established" as const,
      citations: [CDC_MH, WHO],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Cuidar de quem ensina", "Caring for the teacher too", "Cuidar de quien enseña"),
      description: ml(
        "O adulto exausto não sustenta vínculo. Saúde mental na escola inclui a de quem trabalha nela.",
        "An exhausted adult cannot sustain connection. Mental health at school includes the mental health of those who work there.",
        "El adulto agotado no sostiene el vínculo. La salud mental en la escuela incluye la de quienes trabajan en ella.",
      ),
      tips: mlList(
        [
          "Reconhecer o próprio limite não é falha profissional",
          "Acolher todo dia sem apoio leva ao esgotamento — divida com a equipe",
          "Casos difíceis precisam de supervisão, não de heroísmo individual",
          "Procure apoio profissional próprio quando o peso não passa",
        ],
        [
          "Recognising your own limit is not a professional failure",
          "Holding space every day without support leads to burnout — share it with the team",
          "Hard cases need supervision, not individual heroism",
          "Seek professional support of your own when the weight does not lift",
        ],
        [
          "Reconocer el propio límite no es una falla profesional",
          "Contener todos los días sin apoyo lleva al agotamiento — comparta con el equipo",
          "Los casos difíciles necesitan supervisión, no heroísmo individual",
          "Busque apoyo profesional propio cuando el peso no pasa",
        ],
      ),
      evidence: "emerging" as const,
      citations: [WHO, CDC_MH],
      difficulty: BASICO,
    },
  ]

  const activities = [
    {
      name: ml("Termômetro de entrada", "Check-in thermometer", "Termómetro de entrada"),
      age: ml("8-18 anos", "8-18 years", "8-18 años"),
      duration: ml("3 min por aula", "3 min per class", "3 min por clase"),
      description: ml(
        "Um registro rápido de como cada aluno chega, que permite notar a mudança antes de ela virar crise.",
        "A quick record of how each student arrives, letting you notice change before it becomes a crisis.",
        "Un registro rápido de cómo llega cada alumno, que permite notar el cambio antes de que se vuelva crisis.",
      ),
      materials: mlList(
        ["Cartaz com uma escala de 1 a 5", "Ímãs ou adesivos com o nome de cada aluno"],
        ["A poster with a 1 to 5 scale", "Magnets or stickers with each student's name"],
        ["Cartel con una escala de 1 a 5", "Imanes o adhesivos con el nombre de cada alumno"],
      ),
      implementation: ml(
        "Na entrada, cada aluno marca como está. Você só observa e registra o que destoa do padrão dele.",
        "On arrival, each student marks how they are. You just observe and note what departs from their own pattern.",
        "Al entrar, cada alumno marca cómo está. Usted solo observa y registra lo que se aparta de su patrón.",
      ),
      objectives: mlList(
        ["Notar mudanças cedo", "Vocabulário emocional", "Abrir canal de conversa"],
        ["Noticing change early", "Emotional vocabulary", "Opening a channel for conversation"],
        ["Notar cambios temprano", "Vocabulario emocional", "Abrir canal de conversación"],
      ),
      authorship: "adapted" as const,
      citations: [CDC_MH, CDC_EDU],
      stepByStep: mlList(
        [
          "Monte um cartaz com uma escala simples de 1 a 5, sem rótulos julgadores",
          "Explique que ninguém precisa justificar a marcação",
          "Na entrada, cada aluno posiciona o seu marcador",
          "Não comente a marcação em público, nunca",
          "Compare com o padrão do próprio aluno, não com o dos colegas",
          "Se alguém destoar por três dias seguidos, procure a pessoa em particular",
        ],
        [
          "Make a poster with a simple 1 to 5 scale, without judgemental labels",
          "Explain that nobody has to justify their mark",
          "On arrival, each student places their marker",
          "Never comment on a mark in public",
          "Compare against the student's own pattern, not against classmates",
          "If someone is off-pattern for three days running, approach them privately",
        ],
        [
          "Arme un cartel con una escala simple de 1 a 5, sin etiquetas que juzguen",
          "Explique que nadie necesita justificar la marcación",
          "Al entrar, cada alumno coloca su marcador",
          "Nunca comente la marcación en público",
          "Compare con el patrón del propio alumno, no con el de sus compañeros",
          "Si alguien se aparta tres días seguidos, búsquelo en privado",
        ],
      ),
      tips: mlList(
        [
          "Se você comentar uma marcação em público uma vez, a turma para de marcar de verdade",
          "O termômetro não substitui atendimento: ele indica quando procurar a rede",
        ],
        [
          "If you comment on a mark in public once, the class stops marking honestly",
          "The thermometer does not replace care: it indicates when to reach the network",
        ],
        [
          "Si comenta una marcación en público una vez, el grupo deja de marcar de verdad",
          "El termómetro no sustituye la atención: indica cuándo buscar la red",
        ],
      ),
      variations: mlList(
        ["Versão em papel individual, para quem não quer marcar publicamente"],
        ["An individual paper version, for those who prefer not to mark publicly"],
        ["Versión en papel individual, para quien no quiere marcar públicamente"],
      ),
      assessment: ml(
        "Não é o aluno que está sendo avaliado. A medida é: você conseguiu notar mudanças que antes passavam?",
        "The student is not being assessed. The measure is: did you notice changes that used to slip by?",
        "No se evalúa al alumno. La medida es: ¿logró notar cambios que antes pasaban desapercibidos?",
      ),
    },
    {
      name: ml("Mapa de rede de apoio da escola", "Map of the school's support network", "Mapa de red de apoyo de la escuela"),
      age: ml("Uso do professor", "For teacher use", "Uso del docente"),
      duration: ml("40 min, uma vez por ano", "40 min, once a year", "40 min, una vez al año"),
      description: ml(
        "Documento de uma página com quem acionar, quando e como — montado antes de precisar.",
        "A one-page document with who to contact, when and how — built before you need it.",
        "Documento de una página con a quién acudir, cuándo y cómo — armado antes de necesitarlo.",
      ),
      materials: mlList(
        ["Uma folha", "Contatos da coordenação e do serviço de saúde local"],
        ["One sheet", "Contacts for school leadership and the local health service"],
        ["Una hoja", "Contactos de la coordinación y del servicio de salud local"],
      ),
      implementation: ml(
        "Preencha com a coordenação, deixe visível na sala dos professores e revise uma vez por ano.",
        "Fill it in with school leadership, keep it visible in the staff room and review it once a year.",
        "Complételo con la coordinación, déjelo visible en la sala de docentes y revíselo una vez al año.",
      ),
      objectives: mlList(
        ["Encaminhamento rápido", "Clareza de papéis", "Reduzir decisão solitária"],
        ["Fast referral", "Clear roles", "Fewer decisions made alone"],
        ["Derivación rápida", "Claridad de roles", "Reducir la decisión solitaria"],
      ),
      authorship: "adapted" as const,
      citations: [CDC_MH, WHO],
      stepByStep: mlList(
        [
          "Liste quem é o responsável por saúde mental dentro da escola",
          "Anote o serviço de saúde de referência do território, com endereço e telefone",
          "Defina com a coordenação o que fazer fora do horário escolar",
          "Escreva os três passos que você dá ao notar um sinal, em ordem",
          "Deixe uma cópia visível na sala dos professores",
          "Revise no início de cada ano letivo — contatos mudam",
        ],
        [
          "List who is responsible for mental health within the school",
          "Note the local referral health service, with address and phone",
          "Agree with leadership what to do outside school hours",
          "Write the three steps you take when you notice a sign, in order",
          "Keep a visible copy in the staff room",
          "Review it at the start of each school year — contacts change",
        ],
        [
          "Liste quién es el responsable de salud mental dentro de la escuela",
          "Anote el servicio de salud de referencia del territorio, con dirección y teléfono",
          "Defina con la coordinación qué hacer fuera del horario escolar",
          "Escriba los tres pasos que da al notar una señal, en orden",
          "Deje una copia visible en la sala de docentes",
          "Revíselo al inicio de cada año lectivo — los contactos cambian",
        ],
      ),
      tips: mlList(
        [
          "Se o mapa não cabe em uma página, ninguém vai consultá-lo na hora certa",
          "Contato desatualizado é pior que contato nenhum: dá falsa segurança",
        ],
        [
          "If the map does not fit on one page, nobody will consult it at the right moment",
          "An outdated contact is worse than none: it gives false confidence",
        ],
        [
          "Si el mapa no cabe en una página, nadie lo consultará en el momento justo",
          "Un contacto desactualizado es peor que ninguno: da falsa seguridad",
        ],
      ),
      variations: mlList(
        ["Versão de bolso, plastificada, para levar em saídas e atividades externas"],
        ["A laminated pocket version, to carry on outings and external activities"],
        ["Versión de bolsillo, plastificada, para llevar en salidas y actividades externas"],
      ),
      assessment: ml(
        "Peça a um colega que não participou da montagem para encontrar o próximo passo em menos de um minuto.",
        "Ask a colleague who did not help build it to find the next step in under a minute.",
        "Pida a un colega que no participó del armado que encuentre el próximo paso en menos de un minuto.",
      ),
    },
    {
      name: ml("Combinado de exposição", "Exposure agreement", "Acuerdo de exposición"),
      age: ml("10-18 anos", "10-18 years", "10-18 años"),
      duration: ml("10 min, no início do ano", "10 min, at the start of the year", "10 min, al inicio del año"),
      description: ml(
        "Um acordo individual sobre quando e como o aluno será chamado a se expor — leitura em voz alta, apresentação, ir ao quadro.",
        "An individual agreement about when and how the student will be asked to be exposed — reading aloud, presenting, going to the board.",
        "Un acuerdo individual sobre cuándo y cómo el alumno será llamado a exponerse — leer en voz alta, presentar, ir al pizarrón.",
      ),
      materials: mlList(
        ["Ficha simples de combinado", "Cinco minutos de conversa em particular"],
        ["A simple agreement sheet", "Five minutes of private conversation"],
        ["Ficha simple de acuerdo", "Cinco minutos de conversación en privado"],
      ),
      implementation: ml(
        "Combine em particular o sinal, o aviso prévio e a alternativa, e cumpra o combinado sem exceção.",
        "Agree privately on the signal, the advance notice and the alternative, and honour it without exception.",
        "Acuerde en privado la señal, el aviso previo y la alternativa, y cúmplalo sin excepción.",
      ),
      objectives: mlList(
        ["Reduzir ansiedade antecipatória", "Manter a participação", "Construir confiança"],
        ["Reduce anticipatory anxiety", "Maintain participation", "Build trust"],
        ["Reducir la ansiedad anticipatoria", "Mantener la participación", "Construir confianza"],
      ),
      authorship: "adapted" as const,
      citations: [CDC_MH, UDL],
      stepByStep: mlList(
        [
          "Converse em particular, nunca na frente da turma",
          "Pergunte quais situações são mais difíceis para ele",
          "Combine com quanto tempo de antecedência ele quer ser avisado",
          "Defina um sinal discreto para quando ele não puder naquele dia",
          "Estabeleça uma alternativa equivalente, não uma dispensa",
          "Cumpra o combinado sempre — quebrar uma vez desfaz meses de confiança",
        ],
        [
          "Talk privately, never in front of the class",
          "Ask which situations are hardest for them",
          "Agree how much advance notice they want",
          "Define a discreet signal for days when they cannot",
          "Set an equivalent alternative, not an exemption",
          "Always honour the agreement — breaking it once undoes months of trust",
        ],
        [
          "Converse en privado, nunca frente al grupo",
          "Pregunte qué situaciones le resultan más difíciles",
          "Acuerden con cuánta antelación quiere ser avisado",
          "Defina una señal discreta para cuando no pueda ese día",
          "Establezca una alternativa equivalente, no una dispensa",
          "Cumpla siempre lo acordado — romperlo una vez deshace meses de confianza",
        ],
      ),
      tips: mlList(
        [
          "Dispensa permanente não é acordo: é retirar o aluno da aula aos poucos",
          "O objetivo é ampliar a participação com previsibilidade, não reduzi-la",
        ],
        [
          "A permanent exemption is not an agreement: it slowly removes the student from the lesson",
          "The goal is to widen participation with predictability, not to shrink it",
        ],
        [
          "La dispensa permanente no es acuerdo: es retirar al alumno de la clase de a poco",
          "El objetivo es ampliar la participación con previsibilidad, no reducirla",
        ],
      ),
      variations: mlList(
        ["Versão coletiva: a turma toda sabe com antecedência quando haverá leitura em voz alta"],
        ["A whole-class version: everyone knows in advance when there will be reading aloud"],
        ["Versión colectiva: todo el grupo sabe con antelación cuándo habrá lectura en voz alta"],
      ),
      assessment: ml(
        "Acompanhe se a participação dele aumenta ao longo do bimestre — o combinado é meio, não fim.",
        "Track whether their participation grows across the term — the agreement is a means, not an end.",
        "Siga si su participación aumenta a lo largo del bimestre — el acuerdo es medio, no fin.",
      ),
    },
  ]

  const courses: never[] = []

  const resources = [
    {
      title: ml("Saúde mental na escola — CDC", "Mental health in schools — CDC", "Salud mental en la escuela — CDC"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Linhas de ação para promover saúde mental e bem-estar no ambiente escolar, com exemplos de práticas.",
        "Lines of action to promote mental health and well-being in schools, with examples of practices.",
        "Líneas de acción para promover salud mental y bienestar en la escuela, con ejemplos de prácticas.",
      ),
      featured: true,
      url: "https://www.cdc.gov/healthy-youth/mental-health/index.html",
      publisher: "Centers for Disease Control and Prevention",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "Educação em saúde mental em sala",
        "Mental health education in the classroom",
        "Educación en salud mental en el aula",
      ),
      type: ml("Formação", "Training", "Formación"),
      description: ml(
        "Como abordar o tema com a turma: reduz estigma e aumenta a procura por ajuda.",
        "How to address the topic with the class: it reduces stigma and increases help-seeking.",
        "Cómo abordar el tema con el grupo: reduce el estigma y aumenta la búsqueda de ayuda.",
      ),
      featured: true,
      url: "https://www.cdc.gov/healthy-youth/mental-health/mental-health-education.html",
      publisher: "Centers for Disease Control and Prevention",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Saúde do adolescente — OMS", "Adolescent health — WHO", "Salud del adolescente — OMS"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Panorama e orientações da Organização Mundial da Saúde sobre saúde mental na adolescência.",
        "Overview and guidance from the World Health Organization on adolescent mental health.",
        "Panorama y orientaciones de la Organización Mundial de la Salud sobre salud mental en la adolescencia.",
      ),
      featured: false,
      url: "https://www.who.int/health-topics/adolescent-health",
      publisher: "Organização Mundial da Saúde",
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
