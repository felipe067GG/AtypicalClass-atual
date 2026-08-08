import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Conteúdo de Síndrome de Down — migrado para o padrão verificado.
 *
 * O eixo aqui é o perfil cognitivo documentado: força relativa no
 * processamento visual e fraqueza relativa no processamento fonológico. É o
 * que sustenta o ensino de leitura apoiado em palavra inteira combinado com
 * fonologia explícita, em vez de só um dos dois.
 *
 * Os cursos anteriores desta área apontavam todos para `example.com` — eram
 * placeholders. Foram substituídos por formações reais e verificadas.
 */

const DSE_READING: Citation = {
  label: "Down Syndrome Education International — ensinar leitura a crianças com síndrome de Down",
  url: "https://www.down-syndrome.org/en-us/library/research-practice/01/1/teaching-down-syndrome-read/",
}

const DSE_MEMORY: Citation = {
  label: "DSE — efeito do ensino de leitura sobre linguagem e memória (estudo de 4 anos)",
  url: "https://www.down-syndrome.org/en-us/library/research-practice/03/2/influence-reading-instruction-language-memory-development-down-syndrome/",
}

const IES: Citation = {
  label: "IES / Departamento de Educação dos EUA — aprimorando o ensino de leitura",
  url: "https://ies.ed.gov/learn/blog/enhancing-reading-instruction-children-down-syndrome",
}

const SHARED_READING: Citation = {
  label: "Leitura compartilhada como contexto de intervenção em linguagem — mini-revisão",
  url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10196453/",
}

const DSRF: Citation = {
  label: "Down Syndrome Resource Foundation — leitura",
  url: "https://dsrf.org/resources/information/education/reading/",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")

export function sindromeDeDownData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Ensino explícito de leitura", "Explicit reading instruction", "Enseñanza explícita de lectura"),
      description: ml(
        "Ensinar a ler desde cedo, sem esperar 'prontidão'. Um estudo de quatro anos mostrou vantagem dos leitores em todas as medidas de linguagem e memória.",
        "Teach reading early, without waiting for 'readiness'. A four-year study found readers ahead on every language and memory measure.",
        "Enseñar a leer desde temprano, sin esperar la 'madurez'. Un estudio de cuatro años mostró ventaja de los lectores en todas las medidas de lenguaje y memoria.",
      ),
      tips: mlList(
        [
          "Comece pela leitura, não pela alfabetização formal completa",
          "Use palavras que a criança já conhece e usa na fala",
          "Ler não é consequência da linguagem — aqui, ajuda a construí-la",
          "Mantenha sessões curtas e diárias em vez de longas e esporádicas",
        ],
        [
          "Start with reading, not with a complete formal literacy sequence",
          "Use words the child already knows and uses in speech",
          "Reading is not a consequence of language — here it helps build it",
          "Keep sessions short and daily rather than long and occasional",
        ],
        [
          "Empiece por la lectura, no por la alfabetización formal completa",
          "Use palabras que el niño ya conoce y usa al hablar",
          "Leer no es consecuencia del lenguaje — aquí ayuda a construirlo",
          "Mantenga sesiones cortas y diarias en vez de largas y esporádicas",
        ],
      ),
      evidence: "established" as const,
      citations: [DSE_MEMORY, DSE_READING],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Apoio no canal visual", "Support through the visual channel", "Apoyo en el canal visual"),
      description: ml(
        "O perfil cognitivo descrito na literatura mostra força relativa no processamento visual e fraqueza relativa no fonológico. Ensinar pelo canal forte e treinar o fraco à parte.",
        "The cognitive profile described in the literature shows relative strength in visual processing and relative weakness in phonological processing. Teach through the strong channel and train the weak one separately.",
        "El perfil cognitivo descrito en la literatura muestra fuerza relativa en el procesamiento visual y debilidad relativa en el fonológico. Enseñar por el canal fuerte y entrenar el débil aparte.",
      ),
      tips: mlList(
        [
          "Apresente a palavra inteira com a imagem correspondente",
          "Acrescente o som das letras depois, com apoio de figura",
          "Evite instrução só oral: acompanhe sempre de suporte visual",
          "Escrito e falado juntos — não um substituindo o outro",
        ],
        [
          "Present the whole word alongside its matching picture",
          "Add letter sounds afterwards, supported by a picture",
          "Avoid oral-only instruction: always pair it with visual support",
          "Written and spoken together — not one replacing the other",
        ],
        [
          "Presente la palabra entera con la imagen correspondiente",
          "Agregue el sonido de las letras después, con apoyo de figura",
          "Evite la instrucción solo oral: acompáñela siempre de apoyo visual",
          "Escrito y hablado juntos — no uno sustituyendo al otro",
        ],
      ),
      evidence: "established" as const,
      citations: [IES, DSE_READING],
      difficulty: BASICO,
    },
    {
      title: ml("Leitura compartilhada dialogada", "Dialogic shared book reading", "Lectura compartida dialogada"),
      description: ml(
        "Ler junto fazendo perguntas e devolvendo o turno à criança. Associada a ganhos em linguagem e comunicação.",
        "Reading together while asking questions and handing the turn back to the child. Associated with gains in language and communication.",
        "Leer juntos haciendo preguntas y devolviendo el turno al niño. Asociada a mejoras en lenguaje y comunicación.",
      ),
      tips: mlList(
        [
          "Pergunte em vez de narrar: 'o que ele está fazendo?'",
          "Espere a resposta — o tempo de processamento é maior",
          "Repita a resposta ampliando: 'sim, o cachorro está correndo'",
          "Releia o mesmo livro várias vezes; a repetição é o que consolida",
        ],
        [
          "Ask instead of narrating: 'what is he doing?'",
          "Wait for the answer — processing time is longer",
          "Repeat the answer expanding it: 'yes, the dog is running'",
          "Re-read the same book many times; repetition is what consolidates",
        ],
        [
          "Pregunte en vez de narrar: '¿qué está haciendo?'",
          "Espere la respuesta — el tiempo de procesamiento es mayor",
          "Repita la respuesta ampliándola: 'sí, el perro está corriendo'",
          "Relea el mismo libro varias veces; la repetición es lo que consolida",
        ],
      ),
      evidence: "established" as const,
      citations: [SHARED_READING],
      difficulty: BASICO,
    },
    {
      title: ml("Tempo de resposta ampliado", "Extended response time", "Tiempo de respuesta ampliado"),
      description: ml(
        "Esperar mais tempo depois de perguntar. A resposta costuma existir; falta o intervalo para formulá-la.",
        "Wait longer after asking. The answer is usually there; what is missing is the interval to formulate it.",
        "Esperar más tiempo después de preguntar. La respuesta suele existir; falta el intervalo para formularla.",
      ),
      tips: mlList(
        [
          "Conte até dez em silêncio antes de repetir a pergunta",
          "Não reformule imediatamente — reformular reinicia o processamento",
          "Evite completar a frase pela criança",
          "Combine com a turma que a espera faz parte",
        ],
        [
          "Count to ten silently before repeating the question",
          "Do not rephrase immediately — rephrasing restarts the processing",
          "Avoid finishing the sentence for the child",
          "Agree with the class that waiting is part of it",
        ],
        [
          "Cuente hasta diez en silencio antes de repetir la pregunta",
          "No reformule de inmediato — reformular reinicia el procesamiento",
          "Evite completar la frase por el niño",
          "Acuerde con el grupo que la espera es parte del proceso",
        ],
      ),
      evidence: "emerging" as const,
      citations: [DSRF],
      difficulty: BASICO,
    },
    {
      title: ml("Instrução em passos curtos", "Short-step instruction", "Instrucción en pasos cortos"),
      description: ml(
        "Uma instrução por vez, verificando a compreensão antes da seguinte — a memória verbal de curto prazo costuma ser um gargalo.",
        "One instruction at a time, checking understanding before the next — short-term verbal memory tends to be a bottleneck.",
        "Una instrucción a la vez, verificando la comprensión antes de la siguiente — la memoria verbal a corto plazo suele ser un cuello de botella.",
      ),
      tips: mlList(
        [
          "Uma ação por instrução: 'pegue o caderno' e só depois 'abra na página 4'",
          "Peça que a criança repita a instrução antes de executar",
          "Apoie a instrução falada com um gesto ou uma imagem",
          "Se falhou, reduza o número de elementos, não o vocabulário",
        ],
        [
          "One action per instruction: 'take the notebook', then 'open it at page 4'",
          "Ask the child to repeat the instruction before doing it",
          "Support spoken instructions with a gesture or a picture",
          "If it failed, reduce the number of elements, not the vocabulary",
        ],
        [
          "Una acción por instrucción: 'tome el cuaderno' y luego 'ábralo en la página 4'",
          "Pida que el niño repita la instrucción antes de ejecutarla",
          "Apoye la instrucción hablada con un gesto o una imagen",
          "Si falló, reduzca la cantidad de elementos, no el vocabulario",
        ],
      ),
      evidence: "established" as const,
      citations: [DSE_MEMORY, IES],
      difficulty: BASICO,
    },
    {
      title: ml("Numeracia com apoio concreto", "Numeracy with concrete support", "Numeración con apoyo concreto"),
      description: ml(
        "Matemática pelo mesmo caminho da leitura: apoiar no canal visual e concreto antes de exigir o símbolo abstrato.",
        "Mathematics along the same path as reading: lean on the visual and concrete channel before requiring the abstract symbol.",
        "Matemáticas por el mismo camino que la lectura: apoyarse en el canal visual y concreto antes de exigir el símbolo abstracto.",
      ),
      tips: mlList(
        [
          "Trabalhe com quantidade real antes do numeral escrito",
          "Use contextos do cotidiano: dinheiro, receita, horário",
          "Deixe o material concreto disponível também na avaliação",
          "Uma habilidade por vez, com muita repetição espaçada",
        ],
        [
          "Work with real quantities before the written numeral",
          "Use everyday contexts: money, recipes, timetables",
          "Keep concrete material available during assessment too",
          "One skill at a time, with plenty of spaced repetition",
        ],
        [
          "Trabaje con cantidad real antes del numeral escrito",
          "Use contextos cotidianos: dinero, receta, horario",
          "Deje el material concreto disponible también en la evaluación",
          "Una habilidad por vez, con mucha repetición espaciada",
        ],
      ),
      evidence: "emerging" as const,
      citations: [IES, DSRF],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Fala e inteligibilidade", "Speech and intelligibility", "Habla e inteligibilidad"),
      description: ml(
        "A dificuldade de articulação não indica dificuldade de compreensão. Corrigir a pronúncia o tempo todo cala o aluno em vez de ensiná-lo.",
        "Articulation difficulty does not indicate comprehension difficulty. Correcting pronunciation constantly silences the student instead of teaching them.",
        "La dificultad de articulación no indica dificultad de comprensión. Corregir la pronunciación todo el tiempo calla al alumno en vez de enseñarle.",
      ),
      tips: mlList(
        [
          "Responda ao conteúdo do que ele disse, não à forma",
          "Se não entendeu, peça que repita ou mostre — não finja que entendeu",
          "Ofereça outras formas de responder: escrever, apontar, mostrar",
          "Correção de fala é trabalho de fonoaudiologia; em sala, o foco é comunicar",
        ],
        [
          "Respond to the content of what they said, not the form",
          "If you did not understand, ask them to repeat or show — do not pretend you did",
          "Offer other ways to answer: writing, pointing, showing",
          "Speech correction is speech-therapy work; in class, the focus is communicating",
        ],
        [
          "Responda al contenido de lo que dijo, no a la forma",
          "Si no entendió, pida que repita o muestre — no finja que entendió",
          "Ofrezca otras formas de responder: escribir, señalar, mostrar",
          "La corrección del habla es trabajo de fonoaudiología; en el aula, el foco es comunicar",
        ],
      ),
      evidence: "emerging" as const,
      citations: [DSRF, SHARED_READING],
      difficulty: BASICO,
    },
    {
      title: ml("Autonomia e habilidades de vida", "Autonomy and life skills", "Autonomía y habilidades de vida"),
      description: ml(
        "Ensinar rotinas de independência com a mesma sistematicidade do conteúdo acadêmico — elas não acontecem sozinhas com o tempo.",
        "Teach independence routines with the same systematic approach as academic content — they do not happen on their own over time.",
        "Enseñar rutinas de independencia con la misma sistematicidad del contenido académico — no ocurren solas con el tiempo.",
      ),
      tips: mlList(
        [
          "Escolha rotinas que aumentem a participação real na escola",
          "Quebre em passos e ensine um por vez, como faria com um conteúdo",
          "Resista a fazer pelo aluno por pressa — cada vez que você faz, ele não aprende",
          "Combine com a família para a mesma rotina valer em casa",
        ],
        [
          "Choose routines that increase real participation at school",
          "Break them into steps and teach one at a time, as you would with content",
          "Resist doing it for the student out of haste — each time you do, they do not learn",
          "Agree with the family so the same routine applies at home",
        ],
        [
          "Elija rutinas que aumenten la participación real en la escuela",
          "Divídalas en pasos y enseñe uno a la vez, como haría con un contenido",
          "Resista hacerlo por el alumno por prisa — cada vez que lo hace, él no aprende",
          "Acuerde con la familia para que la misma rutina valga en casa",
        ],
      ),
      evidence: "established" as const,
      citations: [DSRF, IES],
      difficulty: INTERMEDIARIO,
    },
  ]

  const activities = [
    {
      name: ml("Fichas de palavra e imagem", "Word-and-picture cards", "Fichas de palabra e imagen"),
      age: ml("4-12 anos", "4-12 years", "4-12 años"),
      duration: ml("10 min por dia", "10 min a day", "10 min por día"),
      description: ml(
        "Introduz a leitura pelo canal visual, com palavras que a criança já usa na fala.",
        "Introduces reading through the visual channel, with words the child already uses in speech.",
        "Introduce la lectura por el canal visual, con palabras que el niño ya usa al hablar.",
      ),
      materials: mlList(
        ["Cartões", "Fotos ou desenhos das palavras escolhidas", "Caneta grossa"],
        ["Cards", "Photos or drawings of the chosen words", "A thick pen"],
        ["Tarjetas", "Fotos o dibujos de las palabras elegidas", "Marcador grueso"],
      ),
      implementation: ml(
        "Escolha de 5 a 8 palavras do vocabulário ativo da criança e trabalhe pareamento diário entre palavra e imagem.",
        "Choose 5 to 8 words from the child's active vocabulary and work on daily word-picture matching.",
        "Elija de 5 a 8 palabras del vocabulario activo del niño y trabaje el emparejamiento diario entre palabra e imagen.",
      ),
      objectives: mlList(
        ["Reconhecimento de palavra", "Vocabulário", "Base para a fonologia"],
        ["Word recognition", "Vocabulary", "A basis for phonology"],
        ["Reconocimiento de palabra", "Vocabulario", "Base para la fonología"],
      ),
      authorship: "adapted" as const,
      citations: [DSE_READING, IES],
      stepByStep: mlList(
        [
          "Liste de 5 a 8 palavras que a criança já fala e entende",
          "Escreva cada uma em letra grande e clara, uma por cartão",
          "Faça um segundo cartão com a foto ou o desenho correspondente",
          "Comece pareando: mostre a imagem e peça a palavra",
          "Depois inverta: mostre a palavra e peça a imagem",
          "Quando as 8 estiverem consolidadas, acrescente os sons das letras iniciais",
        ],
        [
          "List 5 to 8 words the child already says and understands",
          "Write each in large, clear letters, one per card",
          "Make a second card with the matching photo or drawing",
          "Start by matching: show the picture and ask for the word",
          "Then reverse: show the word and ask for the picture",
          "Once the 8 are solid, add the sounds of the initial letters",
        ],
        [
          "Liste de 5 a 8 palabras que el niño ya dice y entiende",
          "Escriba cada una en letra grande y clara, una por tarjeta",
          "Haga una segunda tarjeta con la foto o el dibujo correspondiente",
          "Empiece emparejando: muestre la imagen y pida la palabra",
          "Luego invierta: muestre la palabra y pida la imagen",
          "Cuando las 8 estén consolidadas, agregue los sonidos de las letras iniciales",
        ],
      ),
      tips: mlList(
        ["Nomes de pessoas da família funcionam bem como primeiras palavras", "Pare antes do cansaço — 10 minutos bons valem mais que 30 arrastados"],
        ["Family members' names work well as first words", "Stop before fatigue — 10 good minutes beat 30 dragged-out ones"],
        ["Los nombres de familiares funcionan bien como primeras palabras", "Pare antes del cansancio — 10 minutos buenos valen más que 30 arrastrados"],
      ),
      variations: mlList(
        ["Versão com objetos reais em vez de imagens", "Jogo da memória com os pares palavra-imagem"],
        ["A version with real objects instead of pictures", "A memory game with the word-picture pairs"],
        ["Versión con objetos reales en vez de imágenes", "Juego de memoria con los pares palabra-imagen"],
      ),
      assessment: ml(
        "Conte quantas palavras a criança reconhece sem a imagem, refazendo a contagem a cada duas semanas.",
        "Count how many words the child recognises without the picture, repeating the count every two weeks.",
        "Cuente cuántas palabras reconoce el niño sin la imagen, repitiendo el conteo cada dos semanas.",
      ),
    },
    {
      name: ml("Leitura dialogada de um mesmo livro", "Dialogic reading of one book", "Lectura dialogada de un mismo libro"),
      age: ml("3-10 anos", "3-10 years", "3-10 años"),
      duration: ml("15 min", "15 min", "15 min"),
      description: ml(
        "Ler o mesmo livro várias vezes, transferindo o turno de fala para a criança a cada releitura.",
        "Read the same book several times, handing the speaking turn to the child a bit more with each re-reading.",
        "Leer el mismo libro varias veces, transfiriendo el turno de habla al niño en cada relectura.",
      ),
      materials: mlList(
        ["Um livro ilustrado com poucas palavras por página"],
        ["A picture book with few words per page"],
        ["Un libro ilustrado con pocas palabras por página"],
      ),
      implementation: ml(
        "Na primeira leitura você narra; nas seguintes, pergunte mais e narre menos.",
        "On the first reading you narrate; on later ones, ask more and narrate less.",
        "En la primera lectura usted narra; en las siguientes, pregunte más y narre menos.",
      ),
      objectives: mlList(
        ["Linguagem expressiva", "Turno de conversa", "Compreensão"],
        ["Expressive language", "Conversational turn-taking", "Comprehension"],
        ["Lenguaje expresivo", "Turno de conversación", "Comprensión"],
      ),
      authorship: "adapted" as const,
      citations: [SHARED_READING],
      stepByStep: mlList(
        [
          "Escolha um livro ilustrado curto e simples",
          "Primeira leitura: leia inteiro, sem interromper",
          "Segunda leitura: pergunte 'o que é isso?' apontando as figuras",
          "Terceira: pergunte 'o que está acontecendo?' e espere",
          "Amplie cada resposta acrescentando uma ou duas palavras",
          "Na quinta leitura, deixe a criança 'contar' o livro para você",
        ],
        [
          "Choose a short, simple picture book",
          "First reading: read it through without interrupting",
          "Second reading: ask 'what is this?' pointing at the pictures",
          "Third: ask 'what is happening?' and wait",
          "Expand each answer by adding one or two words",
          "By the fifth reading, let the child 'tell' the book to you",
        ],
        [
          "Elija un libro ilustrado corto y simple",
          "Primera lectura: léalo entero, sin interrumpir",
          "Segunda lectura: pregunte '¿qué es esto?' señalando las figuras",
          "Tercera: pregunte '¿qué está pasando?' y espere",
          "Amplíe cada respuesta agregando una o dos palabras",
          "En la quinta lectura, deje que el niño le 'cuente' el libro",
        ],
      ),
      tips: mlList(
        ["Repetir o mesmo livro não é falta de variedade — é o método", "Se a criança não responde, aponte e nomeie, e pergunte de novo amanhã"],
        ["Repeating the same book is not a lack of variety — it is the method", "If the child does not answer, point and name it, then ask again tomorrow"],
        ["Repetir el mismo libro no es falta de variedad — es el método", "Si el niño no responde, señale y nombre, y pregunte de nuevo mañana"],
      ),
      variations: mlList(
        ["Versão com o livro gravado em vídeo pela família", "Versão em dupla com um colega leitor"],
        ["A version with the book recorded on video by the family", "A paired version with a reading classmate"],
        ["Versión con el libro grabado en video por la familia", "Versión en pareja con un compañero lector"],
      ),
      assessment: ml(
        "Observe quantas palavras a criança produz espontaneamente na quinta leitura em comparação com a segunda.",
        "Watch how many words the child produces spontaneously on the fifth reading compared with the second.",
        "Observe cuántas palabras produce el niño espontáneamente en la quinta lectura en comparación con la segunda.",
      ),
    },
    {
      name: ml("Instrução em uma etapa por vez", "One-step-at-a-time instruction", "Instrucción de una etapa por vez"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("Contínuo", "Ongoing", "Continuo"),
      description: ml(
        "Reorganiza como você dá comandos, respeitando o limite de memória verbal de curto prazo.",
        "Reorganises how you give instructions, respecting the limits of short-term verbal memory.",
        "Reorganiza cómo da las consignas, respetando el límite de memoria verbal a corto plazo.",
      ),
      materials: mlList(
        ["Cartões com as etapas, se a tarefa for longa"],
        ["Step cards, if the task is long"],
        ["Tarjetas con las etapas, si la tarea es larga"],
      ),
      implementation: ml(
        "Quebre cada comando composto em comandos simples e confirme a compreensão entre eles.",
        "Break every compound instruction into simple ones and confirm understanding in between.",
        "Divida cada consigna compuesta en consignas simples y confirme la comprensión entre ellas.",
      ),
      objectives: mlList(
        ["Compreensão de instrução", "Autonomia na tarefa", "Menos frustração"],
        ["Understanding instructions", "Task autonomy", "Less frustration"],
        ["Comprensión de la consigna", "Autonomía en la tarea", "Menos frustración"],
      ),
      authorship: "adapted" as const,
      citations: [DSE_MEMORY],
      stepByStep: mlList(
        [
          "Escreva o comando que você costuma dar, do jeito que costuma dar",
          "Conte quantas ações ele contém",
          "Reescreva com uma ação por comando",
          "Dê o primeiro e espere a execução",
          "Peça que a criança repita antes de executar o seguinte",
          "Só encadeie dois comandos quando um estiver consistente",
        ],
        [
          "Write down the instruction you usually give, the way you usually give it",
          "Count how many actions it contains",
          "Rewrite it with one action per instruction",
          "Give the first and wait for it to be done",
          "Ask the child to repeat before doing the next one",
          "Only chain two instructions once one is consistent",
        ],
        [
          "Escriba la consigna que suele dar, tal como la da",
          "Cuente cuántas acciones contiene",
          "Reescríbala con una acción por consigna",
          "Dé la primera y espere la ejecución",
          "Pida que el niño repita antes de ejecutar la siguiente",
          "Encadene dos consignas solo cuando una sea consistente",
        ],
      ),
      tips: mlList(
        ["Comandos compostos costumam ser hábito do adulto, não necessidade da tarefa", "Gesto junto com a fala aumenta muito a taxa de acerto"],
        ["Compound instructions are usually an adult habit, not a task requirement", "A gesture alongside speech raises the success rate considerably"],
        ["Las consignas compuestas suelen ser hábito del adulto, no necesidad de la tarea", "El gesto junto con el habla aumenta mucho la tasa de acierto"],
      ),
      variations: mlList(
        ["Cartões numerados para tarefas de rotina, como arrumar a mochila"],
        ["Numbered cards for routine tasks, such as packing the school bag"],
        ["Tarjetas numeradas para tareas de rutina, como armar la mochila"],
      ),
      assessment: ml(
        "Registre quantas etapas a criança completa sem repetição do comando, ao longo de duas semanas.",
        "Record how many steps the child completes without the instruction being repeated, over two weeks.",
        "Registre cuántas etapas completa el niño sin repetición de la consigna, a lo largo de dos semanas.",
      ),
    },
  ]

  const courses = [
    {
      title: ml(
        "Educação eficaz para crianças com síndrome de Down na escola",
        "Effective education for children with Down syndrome in school",
        "Educación eficaz para niños con síndrome de Down en la escuela",
      ),
      provider: "Down Syndrome Education International",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Consultar", "On request", "Consultar"),
      certificate: true,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "en" as const,
      url: "https://www.down-syndrome.org/en-us/resources/training-courses/effective-education-in-school/",
    },
    {
      title: ml(
        "Ensinar leitura a crianças e jovens com síndrome de Down",
        "Teaching reading to children and young people with Down syndrome",
        "Enseñar lectura a niños y jóvenes con síndrome de Down",
      ),
      provider: "Down Syndrome Education International",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Consultar", "On request", "Consultar"),
      certificate: false,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "en" as const,
      url: "https://www.down-syndrome.org/en-us/resources/training-courses/parents-teaching-reading/",
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
  ]

  const resources = [
    {
      title: ml(
        "Ensinar crianças com síndrome de Down a ler",
        "Teaching children with Down syndrome to read",
        "Enseñar a leer a niños con síndrome de Down",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Artigo de referência sobre o método de leitura apoiado no perfil visual, da DSE.",
        "Reference article on the reading method built on the visual profile, from DSE.",
        "Artículo de referencia sobre el método de lectura apoyado en el perfil visual, de DSE.",
      ),
      featured: true,
      url: "https://www.down-syndrome.org/en-us/library/research-practice/01/1/teaching-down-syndrome-read/",
      publisher: "Down Syndrome Education International",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "Efeito do ensino de leitura sobre linguagem e memória",
        "Effect of reading instruction on language and memory",
        "Efecto de la enseñanza de lectura sobre lenguaje y memoria",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Estudo de quatro anos: leitores com vantagem em todas as medidas de linguagem e memória.",
        "Four-year study: readers ahead on every language and memory measure.",
        "Estudio de cuatro años: lectores con ventaja en todas las medidas de lenguaje y memoria.",
      ),
      featured: true,
      url: "https://www.down-syndrome.org/en-us/library/research-practice/03/2/influence-reading-instruction-language-memory-development-down-syndrome/",
      publisher: "Down Syndrome Education International",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Aprimorando o ensino de leitura", "Enhancing reading instruction", "Mejorando la enseñanza de lectura"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Do Institute of Education Sciences, sobre combinar palavra inteira com fonologia explícita.",
        "From the Institute of Education Sciences, on combining whole-word with explicit phonics.",
        "Del Institute of Education Sciences, sobre combinar palabra entera con fonología explícita.",
      ),
      featured: false,
      url: "https://ies.ed.gov/learn/blog/enhancing-reading-instruction-children-down-syndrome",
      publisher: "IES — U.S. Department of Education",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Leitura — Down Syndrome Resource Foundation", "Reading — Down Syndrome Resource Foundation", "Lectura — Down Syndrome Resource Foundation"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Materiais práticos de leitura organizados por etapa de desenvolvimento.",
        "Practical reading materials organised by developmental stage.",
        "Materiales prácticos de lectura organizados por etapa de desarrollo.",
      ),
      featured: false,
      url: "https://dsrf.org/resources/information/education/reading/",
      publisher: "Down Syndrome Resource Foundation",
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
