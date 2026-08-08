import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Transtorno do Desenvolvimento da Linguagem (TDL) — área nova.
 *
 * O dado que justifica a área existir: o TDL afeta cerca de 1 em cada 14
 * alunos — é mais comum que autismo e que dislexia — e mesmo assim quase
 * nunca é identificado na escola. A criança costuma ser lida como desatenta,
 * desinteressada ou "que não presta atenção".
 *
 * Nota de verificação: a ASHA, entidade das fonoaudiólogas e terapeutas da
 * fala nos EUA, responde 403 a requisição automatizada. O mantenedor abriu a
 * página no navegador e confirmou em 08/08/2026, então ela entra com exceção
 * registrada em `scripts/check-links.mjs` — só o endereço confirmado, não o
 * site inteiro.
 */

const RADLD: Citation = {
  label: "RADLD — campanha internacional de conscientização sobre TDL",
  url: "https://radld.org/",
}

const DLD_PROJECT: Citation = {
  label: "The DLD Project — formação baseada em evidência sobre TDL",
  url: "https://thedldproject.com/dld-training/",
}

const READING_DLD: Citation = {
  label: "Estratégias de leitura para crianças com TDL — revisão (PMC)",
  url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9688349/",
}

const RR_PHONO: Citation = {
  label: "Reading Rockets — consciência fonológica e fonêmica",
  url: "https://www.readingrockets.org/topics/phonological-and-phonemic-awareness",
}

const NCIL: Citation = {
  label: "National Center on Improving Literacy",
  url: "https://improvingliteracy.org/",
}

const UDL: Citation = {
  label: "CAST — Diretrizes do Desenho Universal para a Aprendizagem",
  url: "https://udlguidelines.cast.org/",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")

export function transtornoDeLinguagemData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Tempo de processamento", "Processing time", "Tiempo de procesamiento"),
      description: ml(
        "A criança com TDL entende, mas demora mais para decodificar a fala e organizar a resposta. Repetir a pergunta cedo demais reinicia o processo.",
        "A child with DLD understands, but takes longer to decode speech and organise a response. Repeating the question too soon restarts the process.",
        "El niño con TDL entiende, pero tarda más en decodificar el habla y organizar la respuesta. Repetir la pregunta demasiado pronto reinicia el proceso.",
      ),
      tips: mlList(
        [
          "Conte até dez em silêncio antes de repetir ou reformular",
          "Ensine o aluno a pedir tempo: 'me dá um minuto para pensar'",
          "Não complete a frase por ele nem aceite que os colegas completem",
          "Avise antes que você vai chamá-lo, para ele preparar a resposta",
        ],
        [
          "Count to ten silently before repeating or rephrasing",
          "Teach the student to ask for time: 'give me a minute to think'",
          "Do not finish the sentence for them, and do not let classmates do it",
          "Warn them in advance that you will call on them, so they can prepare",
        ],
        [
          "Cuente hasta diez en silencio antes de repetir o reformular",
          "Enseñe al alumno a pedir tiempo: 'dame un minuto para pensar'",
          "No complete la frase por él ni acepte que los compañeros lo hagan",
          "Avise antes de que lo llamará, para que prepare la respuesta",
        ],
      ),
      evidence: "established" as const,
      citations: [DLD_PROJECT, RADLD],
      difficulty: BASICO,
    },
    {
      title: ml("Instrução em blocos curtos", "Chunked instructions", "Instrucción en bloques cortos"),
      description: ml(
        "Frase longa perde o aluno no meio. Uma informação por frase, uma ação por instrução.",
        "A long sentence loses the student halfway. One piece of information per sentence, one action per instruction.",
        "Una frase larga pierde al alumno a mitad de camino. Una información por frase, una acción por instrucción.",
      ),
      tips: mlList(
        [
          "Quebre o comando composto: 'pegue o livro' e depois 'abra na página 12'",
          "Frases curtas não significam vocabulário pobre — mantenha as palavras exatas",
          "Peça que o aluno repita a instrução antes de executar",
          "Escreva no quadro o que foi dito oralmente",
        ],
        [
          "Split compound instructions: 'take the book', then 'open at page 12'",
          "Short sentences do not mean poor vocabulary — keep the precise words",
          "Ask the student to repeat the instruction before acting",
          "Write on the board what was said out loud",
        ],
        [
          "Divida la consigna compuesta: 'tome el libro' y después 'ábralo en la página 12'",
          "Frases cortas no significan vocabulario pobre — mantenga las palabras exactas",
          "Pida que el alumno repita la consigna antes de ejecutar",
          "Escriba en el pizarrón lo que se dijo oralmente",
        ],
      ),
      evidence: "established" as const,
      citations: [DLD_PROJECT, UDL],
      difficulty: BASICO,
    },
    {
      title: ml("Vocabulário ensinado explicitamente", "Explicitly taught vocabulary", "Vocabulario enseñado explícitamente"),
      description: ml(
        "Aluno com TDL não aprende palavra nova só por exposição. O vocabulário da disciplina precisa ser ensinado, não apenas usado.",
        "A student with DLD does not learn new words from exposure alone. Subject vocabulary must be taught, not merely used.",
        "El alumno con TDL no aprende palabras nuevas solo por exposición. El vocabulario de la asignatura debe enseñarse, no solo usarse.",
      ),
      tips: mlList(
        [
          "Escolha de 3 a 5 palavras-chave por unidade e ensine-as antes",
          "Dê definição, exemplo, contraexemplo e imagem",
          "Volte à palavra várias vezes na semana, em contextos diferentes",
          "Mantenha um mural de vocabulário visível o bimestre inteiro",
        ],
        [
          "Choose 3 to 5 key words per unit and teach them beforehand",
          "Give a definition, an example, a non-example and an image",
          "Return to the word several times a week, in different contexts",
          "Keep a vocabulary wall visible throughout the term",
        ],
        [
          "Elija de 3 a 5 palabras clave por unidad y enséñelas antes",
          "Dé definición, ejemplo, contraejemplo e imagen",
          "Vuelva a la palabra varias veces en la semana, en contextos distintos",
          "Mantenga un mural de vocabulario visible todo el bimestre",
        ],
      ),
      evidence: "established" as const,
      citations: [READING_DLD, NCIL],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Apoio visual junto com a fala", "Visual support alongside speech", "Apoyo visual junto con el habla"),
      description: ml(
        "Gesto, imagem e demonstração reduzem a carga que recai só sobre a linguagem oral.",
        "Gesture, image and demonstration reduce the load falling on spoken language alone.",
        "El gesto, la imagen y la demostración reducen la carga que recae solo sobre el lenguaje oral.",
      ),
      tips: mlList(
        [
          "Fale e mostre ao mesmo tempo, não em sequência",
          "Use organizadores gráficos para estruturas de texto e de raciocínio",
          "Demonstre a tarefa em vez de descrevê-la",
          "Deixe o roteiro da aula visível para o aluno consultar",
        ],
        [
          "Speak and show at the same time, not one after the other",
          "Use graphic organisers for text and reasoning structures",
          "Demonstrate the task instead of describing it",
          "Keep the lesson outline visible for the student to consult",
        ],
        [
          "Hable y muestre al mismo tiempo, no en secuencia",
          "Use organizadores gráficos para estructuras de texto y razonamiento",
          "Demuestre la tarea en vez de describirla",
          "Deje el guion de la clase visible para que el alumno lo consulte",
        ],
      ),
      evidence: "established" as const,
      citations: [DLD_PROJECT, UDL],
      difficulty: BASICO,
    },
    {
      title: ml("Leitura: da linguagem oral ao texto", "Reading: from oral language to text", "Lectura: del lenguaje oral al texto"),
      description: ml(
        "A dificuldade de linguagem atinge a compreensão leitora mesmo quando a decodificação vai bem. O aluno lê as palavras e não entende o texto.",
        "A language difficulty affects reading comprehension even when decoding is fine. The student reads the words and does not understand the text.",
        "La dificultad de lenguaje afecta la comprensión lectora incluso cuando la decodificación va bien. El alumno lee las palabras y no entiende el texto.",
      ),
      tips: mlList(
        [
          "Não presuma compreensão porque a leitura em voz alta soou fluente",
          "Pré-ensine o vocabulário e o contexto antes de entregar o texto",
          "Trabalhe a estrutura do texto explicitamente: início, problema, desfecho",
          "Pergunte o que ele entendeu antes de perguntar detalhes",
        ],
        [
          "Do not assume comprehension because reading aloud sounded fluent",
          "Pre-teach vocabulary and context before handing over the text",
          "Work on text structure explicitly: beginning, problem, resolution",
          "Ask what they understood before asking for details",
        ],
        [
          "No presuma comprensión porque la lectura en voz alta sonó fluida",
          "Preenseñe el vocabulario y el contexto antes de entregar el texto",
          "Trabaje la estructura del texto explícitamente: inicio, problema, desenlace",
          "Pregunte qué entendió antes de preguntar detalles",
        ],
      ),
      evidence: "established" as const,
      citations: [READING_DLD, RR_PHONO],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Não confundir TDL com desatenção", "Do not mistake DLD for inattention", "No confundir TDL con desatención"),
      description: ml(
        "O TDL é mais comum que autismo e dislexia — cerca de 1 em cada 14 alunos — e quase nunca é identificado. A criança costuma ser lida como desinteressada.",
        "DLD is more common than autism and dyslexia — around 1 in 14 students — and is almost never identified. The child is usually read as disengaged.",
        "El TDL es más común que el autismo y la dislexia — cerca de 1 de cada 14 alumnos — y casi nunca se identifica. El niño suele ser leído como desinteresado.",
      ),
      tips: mlList(
        [
          "Desconfie quando o aluno 'não presta atenção' só nas atividades muito verbais",
          "Compare o desempenho dele em tarefa oral e em tarefa demonstrada",
          "Dificuldade de seguir instrução longa não é indisciplina",
          "Encaminhe para avaliação fonoaudiológica quando o padrão se repetir",
        ],
        [
          "Be suspicious when the student 'does not pay attention' only in highly verbal activities",
          "Compare their performance on an oral task versus a demonstrated task",
          "Difficulty following a long instruction is not misbehaviour",
          "Refer for speech and language assessment when the pattern repeats",
        ],
        [
          "Sospeche cuando el alumno 'no presta atención' solo en las actividades muy verbales",
          "Compare su desempeño en tarea oral y en tarea demostrada",
          "La dificultad para seguir una consigna larga no es indisciplina",
          "Derive a evaluación fonoaudiológica cuando el patrón se repita",
        ],
      ),
      evidence: "established" as const,
      citations: [RADLD, DLD_PROJECT],
      difficulty: BASICO,
    },
    {
      title: ml("Avaliar sem depender só da linguagem", "Assessing without relying on language alone", "Evaluar sin depender solo del lenguaje"),
      description: ml(
        "Se a prova é de ciências, a formulação verbal não deveria decidir a nota. Separar o conteúdo do meio de expressá-lo.",
        "If the test is about science, verbal formulation should not decide the grade. Separate the content from the means of expressing it.",
        "Si la prueba es de ciencias, la formulación verbal no debería decidir la nota. Separar el contenido del medio de expresarlo.",
      ),
      tips: mlList(
        [
          "Enunciado curto, uma instrução por frase",
          "Aceite resposta em esquema, desenho ou demonstração quando couber",
          "Pergunta fechada antes de pergunta aberta, para verificar compreensão",
          "Tempo adicional como regra, definido antes",
        ],
        [
          "Short wording, one instruction per sentence",
          "Accept answers as a diagram, drawing or demonstration where appropriate",
          "Closed questions before open ones, to check comprehension",
          "Extra time as a rule, defined beforehand",
        ],
        [
          "Enunciado corto, una instrucción por frase",
          "Acepte respuesta en esquema, dibujo o demostración cuando corresponda",
          "Pregunta cerrada antes de pregunta abierta, para verificar comprensión",
          "Tiempo adicional como regla, definido antes",
        ],
      ),
      evidence: "emerging" as const,
      citations: [UDL, DLD_PROJECT],
      difficulty: BASICO,
    },
  ]

  const activities = [
    {
      name: ml("Pré-ensino de vocabulário da unidade", "Pre-teaching the unit vocabulary", "Preenseñanza del vocabulario de la unidad"),
      age: ml("7-16 anos", "7-16 years", "7-16 años"),
      duration: ml("15 min antes da unidade", "15 min before the unit", "15 min antes de la unidad"),
      description: ml(
        "Ensinar as palavras-chave antes de o conteúdo começar, para o aluno entrar na aula com o vocabulário já disponível.",
        "Teach the key words before the content begins, so the student enters the lesson with the vocabulary already available.",
        "Enseñar las palabras clave antes de que empiece el contenido, para que el alumno entre a clase con el vocabulario disponible.",
      ),
      materials: mlList(
        ["Cartões de vocabulário", "Imagens", "Mural para deixar as palavras visíveis"],
        ["Vocabulary cards", "Images", "A wall space to keep the words visible"],
        ["Tarjetas de vocabulario", "Imágenes", "Mural para dejar las palabras visibles"],
      ),
      implementation: ml(
        "Escolha de 3 a 5 palavras, ensine com definição, exemplo e imagem, e mantenha no mural o bimestre inteiro.",
        "Choose 3 to 5 words, teach them with a definition, example and image, and keep them on the wall all term.",
        "Elija de 3 a 5 palabras, enséñelas con definición, ejemplo e imagen, y manténgalas en el mural todo el bimestre.",
      ),
      objectives: mlList(
        ["Vocabulário disponível", "Compreensão da aula", "Participação"],
        ["Available vocabulary", "Understanding the lesson", "Participation"],
        ["Vocabulario disponible", "Comprensión de la clase", "Participación"],
      ),
      authorship: "adapted" as const,
      citations: [READING_DLD, NCIL],
      stepByStep: mlList(
        [
          "Leia o plano da unidade e liste as palavras sem as quais nada faz sentido",
          "Reduza a lista para no máximo cinco",
          "Para cada palavra: diga, escreva, mostre uma imagem e dê um exemplo",
          "Dê também um contraexemplo — 'isto NÃO é um...'",
          "Peça que o aluno use a palavra em uma frase própria",
          "Fixe no mural e volte a ela pelo menos três vezes durante a unidade",
        ],
        [
          "Read the unit plan and list the words without which nothing makes sense",
          "Cut the list down to five at most",
          "For each word: say it, write it, show an image and give an example",
          "Also give a non-example — 'this is NOT a...'",
          "Ask the student to use the word in a sentence of their own",
          "Pin it on the wall and return to it at least three times during the unit",
        ],
        [
          "Lea el plan de la unidad y liste las palabras sin las cuales nada tiene sentido",
          "Reduzca la lista a cinco como máximo",
          "Para cada palabra: dígala, escríbala, muestre una imagen y dé un ejemplo",
          "Dé también un contraejemplo — 'esto NO es un...'",
          "Pida que el alumno use la palabra en una frase propia",
          "Fíjela en el mural y vuelva a ella al menos tres veces durante la unidad",
        ],
      ),
      tips: mlList(
        ["Mais de cinco palavras dilui: nenhuma fica", "O contraexemplo costuma ensinar mais que a definição"],
        ["More than five words dilutes: none stick", "The non-example usually teaches more than the definition"],
        ["Más de cinco palabras diluye: ninguna queda", "El contraejemplo suele enseñar más que la definición"],
      ),
      variations: mlList(
        ["Versão com a turma toda — o pré-ensino beneficia todos, não só quem tem TDL"],
        ["A whole-class version — pre-teaching benefits everyone, not only students with DLD"],
        ["Versión con todo el grupo — la preenseñanza beneficia a todos, no solo a quien tiene TDL"],
      ),
      assessment: ml(
        "Ao fim da unidade, peça que ele explique cada palavra com as próprias palavras.",
        "At the end of the unit, ask them to explain each word in their own words.",
        "Al final de la unidad, pida que explique cada palabra con sus propias palabras.",
      ),
    },
    {
      name: ml("Contagem de palavras por instrução", "Counting words per instruction", "Conteo de palabras por consigna"),
      age: ml("Uso do professor", "For teacher use", "Uso del docente"),
      duration: ml("Uma aula", "One class", "Una clase"),
      description: ml(
        "Uma automedição: quantas informações você coloca em cada comando, e quantas o aluno consegue reter.",
        "A self-measurement: how many pieces of information you put in each instruction, and how many the student retains.",
        "Una automedición: cuántas informaciones pone en cada consigna, y cuántas retiene el alumno.",
      ),
      materials: mlList(
        ["Papel para anotar", "Gravador do celular, se possível"],
        ["Paper to note down", "A phone recorder, if possible"],
        ["Papel para anotar", "Grabadora del celular, si es posible"],
      ),
      implementation: ml(
        "Grave ou anote suas instruções durante uma aula e conte quantas ações cada uma exigia.",
        "Record or note your instructions during one lesson and count how many actions each required.",
        "Grabe o anote sus consignas durante una clase y cuente cuántas acciones exigía cada una.",
      ),
      objectives: mlList(
        ["Consciência da própria fala", "Instruções acessíveis", "Menos repetição"],
        ["Awareness of your own speech", "Accessible instructions", "Less repetition"],
        ["Conciencia del propio habla", "Consignas accesibles", "Menos repetición"],
      ),
      authorship: "adapted" as const,
      citations: [DLD_PROJECT, UDL],
      stepByStep: mlList(
        [
          "Grave os primeiros 15 minutos da sua aula",
          "Transcreva as instruções que você deu, exatamente como falou",
          "Conte quantas ações separadas cada instrução exigia",
          "Marque as que tinham três ou mais ações",
          "Reescreva essas em comandos de uma ação cada",
          "Aplique na aula seguinte e observe quantas vezes precisou repetir",
        ],
        [
          "Record the first 15 minutes of your lesson",
          "Transcribe the instructions you gave, exactly as spoken",
          "Count how many separate actions each instruction required",
          "Mark those with three or more actions",
          "Rewrite those as one-action instructions",
          "Apply it in the next lesson and watch how often you had to repeat",
        ],
        [
          "Grabe los primeros 15 minutos de su clase",
          "Transcriba las consignas que dio, exactamente como las dijo",
          "Cuente cuántas acciones separadas exigía cada consigna",
          "Marque las que tenían tres o más acciones",
          "Reescriba esas en consignas de una acción cada una",
          "Aplíquelo en la clase siguiente y observe cuántas veces tuvo que repetir",
        ],
      ),
      tips: mlList(
        [
          "Comando composto costuma ser hábito do adulto, não exigência da tarefa",
          "A quantidade de repetições que você faz é o melhor indicador",
        ],
        [
          "Compound instructions are usually an adult habit, not a task requirement",
          "How often you repeat yourself is the best indicator",
        ],
        [
          "La consigna compuesta suele ser hábito del adulto, no exigencia de la tarea",
          "La cantidad de repeticiones que hace es el mejor indicador",
        ],
      ),
      variations: mlList(
        ["Fazer em dupla com um colega, cada um observando a aula do outro"],
        ["Do it in pairs with a colleague, each observing the other's lesson"],
        ["Hacerlo en pareja con un colega, cada uno observando la clase del otro"],
      ),
      assessment: ml(
        "Compare o número de repetições necessárias antes e depois da mudança.",
        "Compare the number of repetitions needed before and after the change.",
        "Compare el número de repeticiones necesarias antes y después del cambio.",
      ),
    },
    {
      name: ml("Verificar compreensão antes do detalhe", "Check comprehension before detail", "Verificar comprensión antes del detalle"),
      age: ml("8-16 anos", "8-16 years", "8-16 años"),
      duration: ml("10 min após a leitura", "10 min after reading", "10 min después de la lectura"),
      description: ml(
        "Um roteiro curto para descobrir se o aluno entendeu o texto, em vez de descobrir só na prova que não entendeu.",
        "A short routine to find out whether the student understood the text, instead of discovering only in the test that they did not.",
        "Un guion corto para descubrir si el alumno entendió el texto, en vez de descubrirlo solo en la prueba.",
      ),
      materials: mlList(
        ["O texto da aula", "Três perguntas preparadas antes"],
        ["The lesson text", "Three questions prepared beforehand"],
        ["El texto de la clase", "Tres preguntas preparadas antes"],
      ),
      implementation: ml(
        "Pergunte primeiro o sentido geral, depois a estrutura, e só então os detalhes.",
        "Ask about the overall meaning first, then the structure, and only then the details.",
        "Pregunte primero el sentido general, después la estructura, y solo entonces los detalles.",
      ),
      objectives: mlList(
        ["Compreensão real", "Detectar a lacuna cedo", "Ensinar estrutura de texto"],
        ["Real comprehension", "Detecting the gap early", "Teaching text structure"],
        ["Comprensión real", "Detectar la laguna temprano", "Enseñar estructura de texto"],
      ),
      authorship: "adapted" as const,
      citations: [READING_DLD, NCIL],
      stepByStep: mlList(
        [
          "Depois da leitura, pergunte: 'do que fala este texto?' — em uma frase",
          "Se ele não conseguir, o problema é de compreensão global; volte ao vocabulário",
          "Se conseguir, pergunte a estrutura: 'qual era o problema? como terminou?'",
          "Só então pergunte um detalhe específico",
          "Anote em qual dos três níveis ele parou",
          "Ajuste a próxima aula a partir desse nível, não do detalhe",
        ],
        [
          "After reading, ask: 'what is this text about?' — in one sentence",
          "If they cannot, the problem is global comprehension; go back to vocabulary",
          "If they can, ask about structure: 'what was the problem? how did it end?'",
          "Only then ask about a specific detail",
          "Note which of the three levels they stopped at",
          "Adjust the next lesson from that level, not from the detail",
        ],
        [
          "Después de la lectura, pregunte: '¿de qué habla este texto?' — en una frase",
          "Si no puede, el problema es de comprensión global; vuelva al vocabulario",
          "Si puede, pregunte por la estructura: '¿cuál era el problema? ¿cómo terminó?'",
          "Solo entonces pregunte un detalle específico",
          "Anote en cuál de los tres niveles se detuvo",
          "Ajuste la próxima clase desde ese nivel, no desde el detalle",
        ],
      ),
      tips: mlList(
        [
          "Leitura fluente em voz alta não indica compreensão — é o erro mais comum aqui",
          "Se ele para no primeiro nível, mais perguntas de detalhe não ajudam",
        ],
        [
          "Fluent reading aloud does not indicate comprehension — the commonest error here",
          "If they stop at the first level, more detail questions will not help",
        ],
        [
          "La lectura fluida en voz alta no indica comprensión — es el error más común aquí",
          "Si se detiene en el primer nivel, más preguntas de detalle no ayudan",
        ],
      ),
      variations: mlList(
        ["Versão com a turma toda, em duplas, cada um explicando o texto ao outro"],
        ["A whole-class version, in pairs, each explaining the text to the other"],
        ["Versión con todo el grupo, en parejas, cada uno explicando el texto al otro"],
      ),
      assessment: ml(
        "O nível em que ele para é a medida. Acompanhe se ele avança de nível ao longo do bimestre.",
        "The level they stop at is the measure. Track whether they move up a level across the term.",
        "El nivel en que se detiene es la medida. Siga si avanza de nivel a lo largo del bimestre.",
      ),
    },
  ]

  const courses = [
    {
      title: ml("Formação sobre TDL", "DLD training", "Formación sobre TDL"),
      provider: "The DLD Project",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Introdução gratuita", "Free introduction", "Introducción gratuita"),
      certificate: false,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "en" as const,
      url: "https://thedldproject.com/dld-training/",
    },
  ]

  const resources = [
    {
      title: ml("RADLD — conscientização sobre TDL", "RADLD — raising awareness of DLD", "RADLD — concienciación sobre TDL"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Campanha internacional com material explicativo sobre o transtorno mais comum e menos identificado da sala.",
        "An international campaign with explanatory material on the classroom's most common and least identified disorder.",
        "Campaña internacional con material explicativo sobre el trastorno más común y menos identificado del aula.",
      ),
      featured: true,
      url: "https://radld.org/",
      publisher: "RADLD",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "Estratégias de leitura para crianças com TDL",
        "Reading strategies for children with DLD",
        "Estrategias de lectura para niños con TDL",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Revisão sobre por que a compreensão leitora é afetada mesmo com decodificação preservada.",
        "A review on why reading comprehension is affected even when decoding is intact.",
        "Revisión sobre por qué la comprensión lectora se ve afectada incluso con decodificación preservada.",
      ),
      featured: true,
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9688349/",
      publisher: "PMC — National Library of Medicine",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("The DLD Project — formação", "The DLD Project — training", "The DLD Project — formación"),
      type: ml("Formação", "Training", "Formación"),
      description: ml(
        "Materiais e formação para professores sobre identificação e apoio a alunos com TDL.",
        "Materials and training for teachers on identifying and supporting students with DLD.",
        "Materiales y formación para docentes sobre identificación y apoyo a alumnos con TDL.",
      ),
      featured: false,
      url: "https://thedldproject.com/dld-training/",
      publisher: "The DLD Project",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "American Speech-Language-Hearing Association",
        "American Speech-Language-Hearing Association",
        "American Speech-Language-Hearing Association",
      ),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Entidade das fonoaudiólogas e terapeutas da fala nos EUA: referência técnica sobre desenvolvimento da linguagem, avaliação e intervenção.",
        "The US body for speech-language pathologists: the technical reference on language development, assessment and intervention.",
        "Entidad de las fonoaudiólogas y terapeutas del habla en EE. UU.: referencia técnica sobre desarrollo del lenguaje, evaluación e intervención.",
      ),
      featured: false,
      url: "https://www.asha.org/",
      publisher: "American Speech-Language-Hearing Association",
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
