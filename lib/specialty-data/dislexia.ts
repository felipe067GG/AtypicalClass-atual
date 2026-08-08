import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Dislexia — área nova, já no padrão verificado.
 *
 * O eixo é o Structured Literacy: ensino explícito, sistemático e cumulativo
 * da estrutura da língua. A literatura indica que é mais eficaz não só para
 * alunos com dislexia, mas para todos os leitores — o que muda o argumento na
 * escola: não é adaptação para um, é melhoria para a turma.
 *
 * Nota de verificação: as páginas da International Dyslexia Association
 * respondem 403 ao verificador e a qualquer leitura minha, então não entraram.
 */

const READING_ROCKETS: Citation = {
  label: "Reading Rockets — Structured Literacy: os fundamentos",
  url: "https://www.readingrockets.org/topics/about-reading/articles/structured-literacy-instruction-basics",
}

const NCIL_FEATURES: Citation = {
  label: "National Center on Improving Literacy — características do Structured Literacy",
  url: "https://improvingliteracy.org/resource/features-of-structured-literacy-instruction/",
}

const NCIL: Citation = {
  label: "National Center on Improving Literacy",
  url: "https://improvingliteracy.org/",
}

const UNDERSTOOD: Citation = {
  label: "Understood — o que é Structured Literacy, em linguagem para famílias e professores",
  url: "https://www.understood.org/en/articles/what-is-structured-literacy",
}

const PHONO: Citation = {
  label: "Reading Rockets — consciência fonológica e fonêmica",
  url: "https://www.readingrockets.org/topics/phonological-and-phonemic-awareness",
}

const NCII: Citation = {
  label: "National Center on Intensive Intervention — intensificar quando o progresso não vem",
  url: "https://intensiveintervention.org/",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")
const AVANCADO = ml("Avançado", "Advanced", "Avanzado")

export function dislexiaData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Consciência fonêmica", "Phonemic awareness", "Conciencia fonémica"),
      description: ml(
        "Trabalhar os sons da fala antes e junto com as letras: segmentar, juntar e trocar fonemas. É onde a dificuldade costuma começar.",
        "Work with speech sounds before and alongside letters: segmenting, blending and swapping phonemes. This is where the difficulty usually starts.",
        "Trabajar los sonidos del habla antes y junto con las letras: segmentar, unir y cambiar fonemas. Es donde suele empezar la dificultad.",
      ),
      tips: mlList(
        [
          "Comece por sílabas e rimas, depois desça ao fonema",
          "Trabalhe oralmente primeiro — sem letra na frente, só som",
          "Use marcadores para representar cada som: uma ficha por fonema",
          "Sessões curtas e diárias rendem mais que uma longa por semana",
        ],
        [
          "Start with syllables and rhymes, then move down to the phoneme",
          "Work orally first — no letters in sight, only sound",
          "Use markers to represent each sound: one token per phoneme",
          "Short daily sessions do more than one long weekly session",
        ],
        [
          "Empiece por sílabas y rimas, después baje al fonema",
          "Trabaje oralmente primero — sin letra a la vista, solo sonido",
          "Use marcadores para representar cada sonido: una ficha por fonema",
          "Sesiones cortas y diarias rinden más que una larga por semana",
        ],
      ),
      evidence: "established" as const,
      citations: [PHONO, NCIL_FEATURES],
      difficulty: BASICO,
    },
    {
      title: ml("Fonética sistemática e cumulativa", "Systematic cumulative phonics", "Fonética sistemática y acumulativa"),
      description: ml(
        "Ensinar as correspondências letra-som numa ordem planejada, cada nova apoiada nas anteriores — não conforme aparecem no texto.",
        "Teach letter-sound correspondences in a planned order, each new one building on the previous — not as they happen to appear in a text.",
        "Enseñar las correspondencias letra-sonido en un orden planificado, cada nueva apoyada en las anteriores — no según aparecen en el texto.",
      ),
      tips: mlList(
        [
          "Siga uma sequência definida e não pule etapas por pressa",
          "Só apresente texto com as correspondências já ensinadas",
          "Revise o conteúdo anterior no início de toda sessão",
          "Ensine explicitamente: diga a regra, não espere que ele deduza",
        ],
        [
          "Follow a defined sequence and do not skip steps out of haste",
          "Only present text using correspondences already taught",
          "Review previous content at the start of every session",
          "Teach explicitly: state the rule, do not expect them to infer it",
        ],
        [
          "Siga una secuencia definida y no salte etapas por prisa",
          "Solo presente texto con las correspondencias ya enseñadas",
          "Repase el contenido anterior al inicio de cada sesión",
          "Enseñe explícitamente: diga la regla, no espere que la deduzca",
        ],
      ),
      evidence: "established" as const,
      citations: [READING_ROCKETS, NCIL_FEATURES],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Ensino multissensorial", "Multisensory teaching", "Enseñanza multisensorial"),
      description: ml(
        "Associar som, símbolo e movimento na mesma tentativa — ver, ouvir, falar e escrever a mesma correspondência.",
        "Link sound, symbol and movement in the same attempt — see, hear, say and write the same correspondence.",
        "Asociar sonido, símbolo y movimiento en el mismo intento — ver, oír, decir y escribir la misma correspondencia.",
      ),
      tips: mlList(
        [
          "Ao ensinar uma letra: o aluno vê, diz o som e escreve ao mesmo tempo",
          "Escrever com o dedo na areia ou no ar antes do lápis ajuda a fixar o traçado",
          "Multissensorial não é 'atividade lúdica': é a mesma informação em canais simultâneos",
          "Mantenha a mesma sequência de canais em todas as sessões",
        ],
        [
          "When teaching a letter: the student sees it, says the sound and writes it at the same time",
          "Writing with a finger in sand or in the air before using a pencil helps fix the shape",
          "Multisensory is not 'a fun activity': it is the same information through simultaneous channels",
          "Keep the same channel sequence across sessions",
        ],
        [
          "Al enseñar una letra: el alumno la ve, dice el sonido y la escribe al mismo tiempo",
          "Escribir con el dedo en arena o en el aire antes del lápiz ayuda a fijar el trazo",
          "Multisensorial no es 'actividad lúdica': es la misma información en canales simultáneos",
          "Mantenga la misma secuencia de canales en todas las sesiones",
        ],
      ),
      evidence: "established" as const,
      citations: [READING_ROCKETS, UNDERSTOOD],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Fluência com leitura repetida", "Fluency through repeated reading", "Fluidez con lectura repetida"),
      description: ml(
        "Ler o mesmo texto curto várias vezes até soar natural. A fluência libera atenção para a compreensão.",
        "Read the same short text several times until it sounds natural. Fluency frees up attention for comprehension.",
        "Leer el mismo texto corto varias veces hasta que suene natural. La fluidez libera atención para la comprensión.",
      ),
      tips: mlList(
        [
          "Texto curto e no nível de decodificação já dominado",
          "Modele a leitura primeiro, para ele ouvir como soa",
          "Três a quatro releituras costumam bastar; mais que isso cansa",
          "Cronometre com o aluno e registre o próprio avanço — ele compete consigo",
        ],
        [
          "A short text at a decoding level already mastered",
          "Model the reading first, so they hear how it sounds",
          "Three to four re-readings usually suffice; more than that tires",
          "Time it with the student and record their own progress — they compete with themselves",
        ],
        [
          "Texto corto y en el nivel de decodificación ya dominado",
          "Modele la lectura primero, para que oiga cómo suena",
          "Tres o cuatro relecturas suelen bastar; más que eso cansa",
          "Cronometre con el alumno y registre su propio avance — compite consigo mismo",
        ],
      ),
      evidence: "established" as const,
      citations: [READING_ROCKETS, NCIL],
      difficulty: BASICO,
    },
    {
      title: ml("Adaptação da avaliação", "Adapting assessment", "Adaptación de la evaluación"),
      description: ml(
        "Separar o que se quer medir do meio de medir: se a prova é de história, a dificuldade de leitura não deveria decidir a nota.",
        "Separate what you want to measure from how you measure it: if the test is about history, a reading difficulty should not decide the grade.",
        "Separar lo que se quiere medir del medio de medirlo: si la prueba es de historia, la dificultad de lectura no debería decidir la nota.",
      ),
      tips: mlList(
        [
          "Ofereça tempo adicional como regra, não como favor",
          "Leia o enunciado em voz alta quando a prova não for de leitura",
          "Aceite resposta oral ou gravada quando o conteúdo permitir",
          "Não desconte por ortografia em avaliação que não é de ortografia",
        ],
        [
          "Offer extra time as a rule, not as a favour",
          "Read the question aloud when the test is not about reading",
          "Accept oral or recorded answers when the content allows",
          "Do not deduct for spelling in an assessment that is not about spelling",
        ],
        [
          "Ofrezca tiempo adicional como regla, no como favor",
          "Lea el enunciado en voz alta cuando la prueba no sea de lectura",
          "Acepte respuesta oral o grabada cuando el contenido lo permita",
          "No descuente por ortografía en una evaluación que no es de ortografía",
        ],
      ),
      evidence: "established" as const,
      citations: [UNDERSTOOD, NCIL],
      difficulty: BASICO,
    },
    {
      title: ml("Acesso ao conteúdo por áudio", "Access to content through audio", "Acceso al contenido por audio"),
      description: ml(
        "Enquanto a decodificação se desenvolve, garantir que o aluno continue aprendendo o conteúdo da disciplina por outro canal.",
        "While decoding develops, make sure the student keeps learning the subject content through another channel.",
        "Mientras se desarrolla la decodificación, garantizar que el alumno siga aprendiendo el contenido por otro canal.",
      ),
      tips: mlList(
        [
          "Áudio não substitui o ensino de leitura — acontece em paralelo",
          "Ofereça o texto em áudio e escrito ao mesmo tempo, para acompanhar",
          "Leitores de tela já vêm no sistema operacional, sem custo",
          "Combine com o aluno: alguns preferem não expor o uso na frente da turma",
        ],
        [
          "Audio does not replace reading instruction — it runs in parallel",
          "Offer the text as audio and in writing at once, so they can follow along",
          "Screen readers already ship with the operating system, at no cost",
          "Agree with the student: some prefer not to make the use visible to the class",
        ],
        [
          "El audio no sustituye la enseñanza de lectura — ocurre en paralelo",
          "Ofrezca el texto en audio y escrito al mismo tiempo, para acompañar",
          "Los lectores de pantalla ya vienen en el sistema operativo, sin costo",
          "Acuerde con el alumno: algunos prefieren no exponer el uso ante el grupo",
        ],
      ),
      evidence: "emerging" as const,
      citations: [UNDERSTOOD],
      difficulty: BASICO,
    },
    {
      title: ml("Intensificar quando não há progresso", "Intensify when progress stalls", "Intensificar cuando no hay progreso"),
      description: ml(
        "Se a medida semanal não sobe depois de algumas semanas, aumentar a dose antes de mudar o método: mais tempo, grupo menor, mais repetição.",
        "If the weekly measure does not rise after a few weeks, increase the dose before changing the method: more time, smaller group, more repetition.",
        "Si la medida semanal no sube tras algunas semanas, aumentar la dosis antes de cambiar el método: más tiempo, grupo menor, más repetición.",
      ),
      tips: mlList(
        [
          "Meça uma vez por semana algo objetivo, como palavras corretas por minuto",
          "Antes de trocar a abordagem, verifique se ela foi aplicada como previsto",
          "Reduza o tamanho do grupo antes de reduzir a expectativa",
          "Mude uma variável por vez para saber o que teve efeito",
        ],
        [
          "Measure something objective once a week, such as correct words per minute",
          "Before switching approach, check whether it was delivered as planned",
          "Reduce group size before reducing expectations",
          "Change one variable at a time so you know what had an effect",
        ],
        [
          "Mida una vez por semana algo objetivo, como palabras correctas por minuto",
          "Antes de cambiar el enfoque, verifique si se aplicó según lo previsto",
          "Reduzca el tamaño del grupo antes de reducir la expectativa",
          "Cambie una variable a la vez para saber qué tuvo efecto",
        ],
      ),
      evidence: "established" as const,
      citations: [NCII, NCIL],
      difficulty: AVANCADO,
    },
  ]

  const activities = [
    {
      name: ml("Fichas de fonema", "Phoneme tokens", "Fichas de fonema"),
      age: ml("5-10 anos", "5-10 years", "5-10 años"),
      duration: ml("10 min por dia", "10 min a day", "10 min por día"),
      description: ml(
        "Trabalha a segmentação de sons sem nenhuma letra à vista, usando uma ficha por som.",
        "Works on sound segmentation with no letters in sight, using one token per sound.",
        "Trabaja la segmentación de sonidos sin ninguna letra a la vista, usando una ficha por sonido.",
      ),
      materials: mlList(
        ["Fichas, tampas ou botões", "Uma tira de papel com quadrados"],
        ["Tokens, bottle caps or buttons", "A paper strip with squares"],
        ["Fichas, tapas o botones", "Una tira de papel con cuadrados"],
      ),
      implementation: ml(
        "O aluno move uma ficha para cada som que ouve na palavra, sem ver a escrita.",
        "The student moves one token for each sound they hear in the word, without seeing it written.",
        "El alumno mueve una ficha por cada sonido que oye en la palabra, sin ver la escritura.",
      ),
      objectives: mlList(
        ["Consciência fonêmica", "Segmentação", "Base para a decodificação"],
        ["Phonemic awareness", "Segmentation", "A basis for decoding"],
        ["Conciencia fonémica", "Segmentación", "Base para la decodificación"],
      ),
      authorship: "adapted" as const,
      citations: [PHONO, NCIL_FEATURES],
      stepByStep: mlList(
        [
          "Desenhe três quadrados numa tira de papel e entregue três fichas",
          "Diga uma palavra de três sons, devagar, sem mostrar a escrita",
          "Peça que ele repita a palavra alongando os sons",
          "A cada som, ele empurra uma ficha para um quadrado",
          "Conte juntos quantas fichas foram usadas",
          "Só depois de dominar a segmentação, associe as letras aos quadrados",
        ],
        [
          "Draw three squares on a paper strip and hand over three tokens",
          "Say a three-sound word slowly, without showing the spelling",
          "Ask the student to repeat the word stretching the sounds",
          "For each sound, they push one token into a square",
          "Count together how many tokens were used",
          "Only once segmentation is solid, link letters to the squares",
        ],
        [
          "Dibuje tres cuadrados en una tira de papel y entregue tres fichas",
          "Diga una palabra de tres sonidos, despacio, sin mostrar la escritura",
          "Pida que repita la palabra alargando los sonidos",
          "Por cada sonido, empuja una ficha a un cuadrado",
          "Cuenten juntos cuántas fichas se usaron",
          "Solo tras dominar la segmentación, asocie las letras a los cuadrados",
        ],
      ),
      tips: mlList(
        [
          "Cuidado com a confusão entre letra e som: 'ch' é uma letra a mais, mas um som só",
          "Se errar sempre no mesmo tipo de som, trabalhe esse tipo isoladamente",
        ],
        [
          "Watch out for confusion between letter and sound: 'ch' is an extra letter but a single sound",
          "If errors always fall on the same sound type, work on that type in isolation",
        ],
        [
          "Cuidado con la confusión entre letra y sonido: 'ch' es una letra más, pero un solo sonido",
          "Si falla siempre en el mismo tipo de sonido, trabaje ese tipo aisladamente",
        ],
      ),
      variations: mlList(
        ["Versão com troca: 'se eu tirar o primeiro som de bola, o que sobra?'", "Versão em dupla, um dita e o outro segmenta"],
        ["A swapping version: 'if I remove the first sound of ball, what is left?'", "A paired version, one dictates and the other segments"],
        ["Versión con cambio: 'si quito el primer sonido de bola, ¿qué queda?'", "Versión en pareja, uno dicta y el otro segmenta"],
      ),
      assessment: ml(
        "Peça a segmentação de dez palavras novas e conte quantas ele acerta sem apoio.",
        "Ask for segmentation of ten new words and count how many are correct without support.",
        "Pida la segmentación de diez palabras nuevas y cuente cuántas acierta sin apoyo.",
      ),
    },
    {
      name: ml("Leitura repetida cronometrada", "Timed repeated reading", "Lectura repetida cronometrada"),
      age: ml("7-16 anos", "7-16 years", "7-16 años"),
      duration: ml("12 min", "12 min", "12 min"),
      description: ml(
        "O aluno relê o mesmo texto curto três vezes e vê o próprio tempo melhorar — compete consigo, não com a turma.",
        "The student re-reads the same short text three times and sees their own time improve — competing with themselves, not the class.",
        "El alumno relee el mismo texto corto tres veces y ve mejorar su propio tiempo — compite consigo, no con el grupo.",
      ),
      materials: mlList(
        ["Texto curto no nível já decodificável", "Cronômetro", "Gráfico simples de registro"],
        ["A short text at an already decodable level", "A timer", "A simple recording chart"],
        ["Texto corto en el nivel ya decodificable", "Cronómetro", "Gráfico simple de registro"],
      ),
      implementation: ml(
        "Modele a leitura, cronometre três tentativas e registre no gráfico junto com o aluno.",
        "Model the reading, time three attempts and plot them on the chart with the student.",
        "Modele la lectura, cronometre tres intentos y registre en el gráfico junto al alumno.",
      ),
      objectives: mlList(
        ["Fluência", "Confiança", "Liberar atenção para a compreensão"],
        ["Fluency", "Confidence", "Freeing attention for comprehension"],
        ["Fluidez", "Confianza", "Liberar atención para la comprensión"],
      ),
      authorship: "adapted" as const,
      citations: [READING_ROCKETS, NCIL],
      stepByStep: mlList(
        [
          "Escolha um texto de 50 a 100 palavras que ele já consegue decodificar",
          "Leia você primeiro, em voz alta, no ritmo natural",
          "Primeira leitura do aluno: cronometre e anote os erros",
          "Comente só os erros que atrapalham o sentido, sem interromper a leitura",
          "Segunda e terceira leituras: cronometre e registre no gráfico",
          "Termine perguntando algo sobre o conteúdo — fluência serve à compreensão",
        ],
        [
          "Choose a 50 to 100 word text they can already decode",
          "Read it yourself first, aloud, at a natural pace",
          "The student's first reading: time it and note the errors",
          "Comment only on errors that break the meaning, without interrupting the reading",
          "Second and third readings: time and plot them on the chart",
          "Finish by asking something about the content — fluency serves comprehension",
        ],
        [
          "Elija un texto de 50 a 100 palabras que ya pueda decodificar",
          "Lea usted primero, en voz alta, a ritmo natural",
          "Primera lectura del alumno: cronometre y anote los errores",
          "Comente solo los errores que rompen el sentido, sin interrumpir la lectura",
          "Segunda y tercera lecturas: cronometre y registre en el gráfico",
          "Termine preguntando algo sobre el contenido — la fluidez sirve a la comprensión",
        ],
      ),
      tips: mlList(
        ["Nunca compare o gráfico dele com o de outro aluno", "Se o texto tem muitos erros na primeira leitura, ele está difícil demais"],
        ["Never compare their chart with another student's", "If the first reading has many errors, the text is too hard"],
        ["Nunca compare su gráfico con el de otro alumno", "Si la primera lectura tiene muchos errores, el texto es demasiado difícil"],
      ),
      variations: mlList(
        ["Leitura em eco, você lê uma frase e ele repete", "Leitura em dupla com um colega mais fluente"],
        ["Echo reading, you read a sentence and they repeat", "Paired reading with a more fluent classmate"],
        ["Lectura en eco, usted lee una frase y él repite", "Lectura en pareja con un compañero más fluido"],
      ),
      assessment: ml(
        "Compare o tempo da primeira leitura de textos novos ao longo de um mês — é isso que mostra transferência.",
        "Compare the first-reading time of new texts across a month — that is what shows transfer.",
        "Compare el tiempo de la primera lectura de textos nuevos a lo largo de un mes — eso muestra transferencia.",
      ),
    },
    {
      name: ml("Traçado multissensorial da letra", "Multisensory letter tracing", "Trazado multisensorial de la letra"),
      age: ml("5-9 anos", "5-9 years", "5-9 años"),
      duration: ml("8 min", "8 min", "8 min"),
      description: ml(
        "Associa som, forma e movimento no mesmo instante, para fixar a correspondência que costuma escapar.",
        "Links sound, shape and movement in the same instant, to fix the correspondence that tends to slip.",
        "Asocia sonido, forma y movimiento en el mismo instante, para fijar la correspondencia que suele escaparse.",
      ),
      materials: mlList(
        ["Bandeja com areia, farinha ou espuma", "Cartão com a letra", "Papel e lápis"],
        ["A tray with sand, flour or foam", "A card with the letter", "Paper and pencil"],
        ["Bandeja con arena, harina o espuma", "Tarjeta con la letra", "Papel y lápiz"],
      ),
      implementation: ml(
        "O aluno vê a letra, diz o som e traça com o dedo, na mesma sequência, todos os dias.",
        "The student sees the letter, says the sound and traces it with a finger, in the same sequence, every day.",
        "El alumno ve la letra, dice el sonido y la traza con el dedo, en la misma secuencia, todos los días.",
      ),
      objectives: mlList(
        ["Correspondência letra-som", "Memória do traçado", "Automatização"],
        ["Letter-sound correspondence", "Motor memory of the shape", "Automaticity"],
        ["Correspondencia letra-sonido", "Memoria del trazo", "Automatización"],
      ),
      authorship: "adapted" as const,
      citations: [READING_ROCKETS, UNDERSTOOD],
      stepByStep: mlList(
        [
          "Escolha uma única letra, a próxima da sua sequência de ensino",
          "Mostre o cartão e diga o som — o som, não o nome da letra",
          "Peça que ele repita o som olhando para a letra",
          "Ele traça a letra na areia com o dedo, dizendo o som enquanto traça",
          "Repete três vezes, sempre dizendo o som durante o movimento",
          "Fecha escrevendo a letra no papel, ainda dizendo o som",
        ],
        [
          "Choose a single letter, the next in your teaching sequence",
          "Show the card and say the sound — the sound, not the letter name",
          "Ask them to repeat the sound while looking at the letter",
          "They trace the letter in the sand with a finger, saying the sound while tracing",
          "Repeat three times, always saying the sound during the movement",
          "Finish by writing the letter on paper, still saying the sound",
        ],
        [
          "Elija una única letra, la siguiente de su secuencia de enseñanza",
          "Muestre la tarjeta y diga el sonido — el sonido, no el nombre de la letra",
          "Pida que repita el sonido mirando la letra",
          "Traza la letra en la arena con el dedo, diciendo el sonido mientras traza",
          "Repite tres veces, siempre diciendo el sonido durante el movimiento",
          "Cierra escribiendo la letra en el papel, aún diciendo el sonido",
        ],
      ),
      tips: mlList(
        ["Som e movimento precisam ser simultâneos — se ele traça em silêncio, perde o efeito", "Uma letra por sessão; acumular confunde"],
        ["Sound and movement must be simultaneous — tracing in silence loses the effect", "One letter per session; piling them up confuses"],
        ["Sonido y movimiento deben ser simultáneos — si traza en silencio, se pierde el efecto", "Una letra por sesión; acumular confunde"],
      ),
      variations: mlList(
        ["Traçado no ar com o braço inteiro, para movimento amplo", "Traçado nas costas do colega, que adivinha a letra"],
        ["Air tracing with the whole arm, for a broad movement", "Tracing on a classmate's back, who guesses the letter"],
        ["Trazado en el aire con todo el brazo, para movimiento amplio", "Trazado en la espalda del compañero, que adivina la letra"],
      ),
      assessment: ml(
        "Mostre as letras já trabalhadas em ordem aleatória e conte quantos sons ele produz sem hesitar.",
        "Show the letters already worked on in random order and count how many sounds come out without hesitation.",
        "Muestre las letras ya trabajadas en orden aleatorio y cuente cuántos sonidos produce sin dudar.",
      ),
    },
    {
      name: ml("Prova adaptada em cinco minutos", "Adapting a test in five minutes", "Prueba adaptada en cinco minutos"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("5 min por avaliação", "5 min per assessment", "5 min por evaluación"),
      description: ml(
        "Um procedimento rápido para adaptar uma prova que você já escreveu, sem reduzir o conteúdo cobrado.",
        "A quick procedure to adapt a test you have already written, without reducing the content assessed.",
        "Un procedimiento rápido para adaptar una prueba que ya escribió, sin reducir el contenido evaluado.",
      ),
      materials: mlList(
        ["A prova que você já preparou", "Editor de texto"],
        ["The test you have already prepared", "A text editor"],
        ["La prueba que ya preparó", "Editor de texto"],
      ),
      implementation: ml(
        "Revise enunciado, formatação e forma de resposta, mantendo idêntico o conteúdo avaliado.",
        "Review wording, formatting and response format, keeping the assessed content identical.",
        "Revise el enunciado, el formato y la forma de respuesta, manteniendo idéntico el contenido evaluado.",
      ),
      objectives: mlList(
        ["Avaliação justa", "Medir o conteúdo, não a leitura", "Reduzir ansiedade"],
        ["Fair assessment", "Measuring content, not reading", "Reducing anxiety"],
        ["Evaluación justa", "Medir el contenido, no la lectura", "Reducir ansiedad"],
      ),
      authorship: "adapted" as const,
      citations: [UNDERSTOOD, NCIL],
      stepByStep: mlList(
        [
          "Releia cada enunciado e corte as palavras que não são necessárias",
          "Quebre enunciados longos em frases curtas, uma instrução por frase",
          "Aumente a fonte e o espaçamento entre linhas",
          "Deixe mais espaço em branco: uma questão por bloco visual",
          "Marque quais questões podem ter resposta oral",
          "Defina o tempo adicional antes da prova, e comunique ao aluno",
        ],
        [
          "Re-read each question and cut words that are not necessary",
          "Split long questions into short sentences, one instruction per sentence",
          "Increase the font size and line spacing",
          "Leave more white space: one question per visual block",
          "Mark which questions may be answered orally",
          "Set the extra time before the test, and tell the student",
        ],
        [
          "Relea cada enunciado y corte las palabras que no son necesarias",
          "Divida enunciados largos en frases cortas, una instrucción por frase",
          "Aumente la fuente y el espaciado entre líneas",
          "Deje más espacio en blanco: una pregunta por bloque visual",
          "Marque qué preguntas pueden responderse oralmente",
          "Defina el tiempo adicional antes de la prueba, y comuníquelo al alumno",
        ],
      ),
      tips: mlList(
        ["A prova adaptada costuma ficar melhor para a turma inteira — considere aplicar a todos", "Adaptar não é facilitar: o conteúdo cobrado continua o mesmo"],
        ["The adapted test is usually better for the whole class — consider giving it to everyone", "Adapting is not making it easier: the content assessed stays the same"],
        ["La prueba adaptada suele quedar mejor para todo el grupo — considere aplicarla a todos", "Adaptar no es facilitar: el contenido evaluado sigue siendo el mismo"],
      ),
      variations: mlList(
        ["Versão com enunciado gravado em áudio, disponível por QR code"],
        ["A version with the questions recorded as audio, available via QR code"],
        ["Versión con enunciado grabado en audio, disponible por código QR"],
      ),
      assessment: ml(
        "Compare o desempenho do aluno na versão adaptada com o que ele demonstra oralmente sobre o mesmo conteúdo.",
        "Compare the student's performance on the adapted version with what they demonstrate orally on the same content.",
        "Compare el desempeño del alumno en la versión adaptada con lo que demuestra oralmente sobre el mismo contenido.",
      ),
    },
  ]

  const courses = [
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
        "National Center on Improving Literacy — materiais de formação",
        "National Center on Improving Literacy — training materials",
        "National Center on Improving Literacy — materiales de formación",
      ),
      provider: "National Center on Improving Literacy",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: false,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "en" as const,
      url: "https://improvingliteracy.org/",
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
      title: ml("Structured Literacy — os fundamentos", "Structured Literacy — the basics", "Structured Literacy — los fundamentos"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "O que é, quais são os componentes e por que a literatura indica que funciona para todos os leitores.",
        "What it is, what the components are and why the literature indicates it works for all readers.",
        "Qué es, cuáles son los componentes y por qué la literatura indica que funciona para todos los lectores.",
      ),
      featured: true,
      url: "https://www.readingrockets.org/topics/about-reading/articles/structured-literacy-instruction-basics",
      publisher: "Reading Rockets",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "Características do Structured Literacy",
        "Features of Structured Literacy instruction",
        "Características del Structured Literacy",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Detalhamento técnico dos elementos que definem a abordagem, do centro federal de letramento.",
        "A technical breakdown of the elements defining the approach, from the federal literacy centre.",
        "Detalle técnico de los elementos que definen el enfoque, del centro federal de alfabetización.",
      ),
      featured: true,
      url: "https://improvingliteracy.org/resource/features-of-structured-literacy-instruction/",
      publisher: "National Center on Improving Literacy",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Consciência fonológica e fonêmica", "Phonological and phonemic awareness", "Conciencia fonológica y fonémica"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Coletânea sobre rima, sílaba e fonema, com atividades práticas para cada nível.",
        "A collection on rhyme, syllable and phoneme, with practical activities for each level.",
        "Colección sobre rima, sílaba y fonema, con actividades prácticas para cada nivel.",
      ),
      featured: false,
      url: "https://www.readingrockets.org/topics/phonological-and-phonemic-awareness",
      publisher: "Reading Rockets",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("O que é Structured Literacy — para famílias", "What is Structured Literacy — for families", "Qué es Structured Literacy — para familias"),
      type: ml("Formação", "Training", "Formación"),
      description: ml(
        "Explicação em linguagem acessível, útil para conversar com a família sobre o que a escola vai fazer.",
        "An explanation in plain language, useful for talking with families about what the school will do.",
        "Explicación en lenguaje accesible, útil para conversar con la familia sobre lo que la escuela hará.",
      ),
      featured: false,
      url: "https://www.understood.org/en/articles/what-is-structured-literacy",
      publisher: "Understood",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("National Center on Improving Literacy", "National Center on Improving Literacy", "National Center on Improving Literacy"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Centro federal norte-americano de letramento, com material de rastreio, ensino e formação.",
        "The US federal literacy centre, with screening, teaching and training materials.",
        "Centro federal estadounidense de alfabetización, con material de cribado, enseñanza y formación.",
      ),
      featured: false,
      url: "https://improvingliteracy.org/",
      publisher: "National Center on Improving Literacy",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Intervenção intensiva — ferramentas", "Intensive intervention — tools", "Intervención intensiva — herramientas"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "O que fazer quando a intervenção não produz progresso: como medir, decidir e intensificar.",
        "What to do when an intervention produces no progress: how to measure, decide and intensify.",
        "Qué hacer cuando la intervención no produce progreso: cómo medir, decidir e intensificar.",
      ),
      featured: false,
      url: "https://intensiveintervention.org/",
      publisher: "NCII — American Institutes for Research",
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
