import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Conteúdo de Deficiência Auditiva — migrado para o padrão verificado.
 *
 * A referência central em português é o INES (Instituto Nacional de Educação
 * de Surdos), órgão do MEC, cuja biblioteca digital reúne material didático
 * em Libras e Português.
 *
 * Nota de verificação: as páginas do Clerc Center (Gallaudet), referência
 * internacional da área, respondem 403 tanto ao verificador quanto a qualquer
 * outra tentativa minha de leitura. Como não consegui confirmá-las, ficaram de
 * fora — melhor menos fontes do que uma que eu não pude checar.
 */

const INES: Citation = {
  label: "INES — Instituto Nacional de Educação de Surdos (MEC)",
  url: "https://www.ines.gov.br/",
}

const INES_BIBLIOTECA: Citation = {
  label: "INES — biblioteca digital com material em Libras e Português",
  url: "https://debasi.ines.gov.br/",
}

const INES_MATERIAIS: Citation = {
  label: "INES — materiais didáticos para uso em sala",
  url: "https://debasi.ines.gov.br/materiais-did%C3%A1ticos",
}

const UDL: Citation = {
  label: "CAST — Diretrizes do Desenho Universal para a Aprendizagem",
  url: "https://udlguidelines.cast.org/",
}

/** Lei 14.191/2021: Libras como primeira língua, português escrito como segunda. */
const LEI_BILINGUE: Citation = {
  label: "Lei 14.191/2021 — educação bilíngue de surdos passa a integrar a LDB (Câmara dos Deputados)",
  url: "https://www.camara.leg.br/noticias/789357-SANCIONADA-LEI-QUE-REGULAMENTA-EDUCACAO-BILINGUE-DE-SURDOS",
}

const LEI_SENADO: Citation = {
  label: "Senado Federal — nova lei inclui a educação bilíngue de surdos como modalidade na LDB",
  url: "https://www12.senado.leg.br/noticias/materias/2021/08/04/nova-lei-inclui-educacao-bilingue-de-surdos-como-modalidade-na-ldb",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")

export function deficienciaAuditivaData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Campo visual desimpedido", "Unobstructed line of sight", "Campo visual despejado"),
      description: ml(
        "Falar sempre de frente, com o rosto iluminado e visível. Sem isso, nem leitura labial nem interpretação em Libras funcionam.",
        "Always speak facing the student, with your face lit and visible. Without that, neither lip reading nor sign interpretation works.",
        "Hablar siempre de frente, con el rostro iluminado y visible. Sin eso, ni la lectura labial ni la interpretación en lengua de señas funcionan.",
      ),
      tips: mlList(
        [
          "Nunca fale de costas para a turma enquanto escreve no quadro",
          "Evite ficar contra a janela: o contraluz apaga o seu rosto",
          "Não cubra a boca com a mão, papel ou material",
          "Em roda, garanta que o aluno veja o rosto de quem fala",
        ],
        [
          "Never speak with your back to the class while writing on the board",
          "Avoid standing against the window: backlight erases your face",
          "Do not cover your mouth with your hand, paper or materials",
          "In a circle, make sure the student can see the face of whoever is speaking",
        ],
        [
          "Nunca hable de espaldas mientras escribe en el pizarrón",
          "Evite ponerse contra la ventana: el contraluz apaga su rostro",
          "No cubra la boca con la mano, papel o material",
          "En ronda, garantice que el alumno vea el rostro de quien habla",
        ],
      ),
      evidence: "established" as const,
      citations: [INES, UDL],
      difficulty: BASICO,
    },
    {
      title: ml("Um turno de fala por vez", "One speaking turn at a time", "Un turno de habla por vez"),
      description: ml(
        "Organizar a conversa para que só uma pessoa fale de cada vez. Falas sobrepostas tornam a aula inacessível, mesmo com intérprete.",
        "Organise talk so only one person speaks at a time. Overlapping speech makes the class inaccessible, even with an interpreter.",
        "Organizar la conversación para que solo una persona hable a la vez. Las hablas superpuestas hacen la clase inaccesible, incluso con intérprete.",
      ),
      tips: mlList(
        [
          "Combine um sinal simples para pedir a palavra",
          "Indique quem vai falar antes de a pessoa começar",
          "Repita a pergunta do colega antes de responder",
          "Dê tempo entre um turno e outro: o intérprete está sempre alguns segundos atrás",
        ],
        [
          "Agree on a simple signal for requesting a turn",
          "Point out who is going to speak before they start",
          "Repeat a classmate's question before answering it",
          "Leave a gap between turns: the interpreter is always a few seconds behind",
        ],
        [
          "Acuerde una señal simple para pedir la palabra",
          "Indique quién va a hablar antes de que empiece",
          "Repita la pregunta del compañero antes de responder",
          "Deje tiempo entre turnos: el intérprete siempre va unos segundos atrás",
        ],
      ),
      evidence: "established" as const,
      citations: [INES],
      difficulty: BASICO,
    },
    {
      title: ml("Apoio visual do conteúdo", "Visual support for content", "Apoyo visual del contenido"),
      description: ml(
        "Registrar por escrito ou em imagem o que foi dito oralmente — instruções, prazos, termos novos.",
        "Record in writing or images what was said out loud — instructions, deadlines, new terms.",
        "Registrar por escrito o en imagen lo dicho oralmente — consignas, plazos, términos nuevos.",
      ),
      tips: mlList(
        [
          "Escreva no quadro toda instrução e todo prazo, sem exceção",
          "Antecipe o vocabulário novo da aula por escrito",
          "Use imagem, esquema e demonstração além do texto",
          "Entregue o roteiro da aula antes, não depois",
        ],
        [
          "Write every instruction and deadline on the board, without exception",
          "Introduce the lesson's new vocabulary in writing beforehand",
          "Use images, diagrams and demonstrations beyond text",
          "Hand out the lesson outline beforehand, not afterwards",
        ],
        [
          "Escriba en el pizarrón toda consigna y todo plazo, sin excepción",
          "Anticipe por escrito el vocabulario nuevo de la clase",
          "Use imagen, esquema y demostración además del texto",
          "Entregue el guion de la clase antes, no después",
        ],
      ),
      evidence: "established" as const,
      citations: [INES_MATERIAIS, UDL],
      difficulty: BASICO,
    },
    {
      title: ml("Trabalho com o intérprete de Libras", "Working with the sign language interpreter", "Trabajo con el intérprete de lengua de señas"),
      description: ml(
        "O intérprete traduz, não ensina. A relação pedagógica continua sendo entre o professor e o aluno.",
        "The interpreter translates, they do not teach. The pedagogical relationship remains between teacher and student.",
        "El intérprete traduce, no enseña. La relación pedagógica sigue siendo entre el docente y el alumno.",
      ),
      tips: mlList(
        [
          "Fale com o aluno, não com o intérprete: 'você entendeu?', não 'ele entendeu?'",
          "Compartilhe o material da aula com o intérprete com antecedência",
          "Posicione o intérprete onde o aluno veja ele e você ao mesmo tempo",
          "Faça pausas: interpretar simultaneamente é cansativo e tem atraso",
        ],
        [
          "Talk to the student, not to the interpreter: 'did you understand?', not 'did he understand?'",
          "Share the lesson material with the interpreter in advance",
          "Position the interpreter where the student can see both them and you",
          "Take pauses: simultaneous interpreting is tiring and runs on a delay",
        ],
        [
          "Hable con el alumno, no con el intérprete: '¿entendiste?', no '¿entendió él?'",
          "Comparta el material de la clase con el intérprete con antelación",
          "Ubique al intérprete donde el alumno los vea a ambos al mismo tiempo",
          "Haga pausas: interpretar en simultáneo cansa y tiene retraso",
        ],
      ),
      evidence: "established" as const,
      citations: [INES],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Vídeo sempre legendado", "Always caption video", "Video siempre subtitulado"),
      description: ml(
        "Nenhum vídeo entra em aula sem legenda. Legenda automática precisa ser revisada antes — ela erra justamente nos termos técnicos.",
        "No video enters the classroom without captions. Auto-captions must be reviewed first — they fail precisely on technical terms.",
        "Ningún video entra a clase sin subtítulos. El subtítulo automático debe revisarse antes — falla justamente en los términos técnicos.",
      ),
      tips: mlList(
        [
          "Revise a legenda automática antes de exibir, principalmente o vocabulário da disciplina",
          "Prefira vídeos que já tenham janela de Libras",
          "Não fale por cima do vídeo: o aluno não consegue acompanhar os dois",
          "Disponibilize a transcrição para consulta posterior",
        ],
        [
          "Review auto-captions before showing, especially subject vocabulary",
          "Prefer videos that already include a sign language window",
          "Do not talk over the video: the student cannot follow both",
          "Provide the transcript for later reference",
        ],
        [
          "Revise el subtítulo automático antes de exhibir, sobre todo el vocabulario de la asignatura",
          "Prefiera videos que ya tengan ventana de lengua de señas",
          "No hable encima del video: el alumno no puede seguir ambos",
          "Facilite la transcripción para consulta posterior",
        ],
      ),
      evidence: "established" as const,
      citations: [UDL, INES_BIBLIOTECA],
      difficulty: BASICO,
    },
    {
      title: ml("Educação bilíngue: Libras como primeira língua", "Bilingual education: sign language first", "Educación bilingüe: lengua de señas como primera lengua"),
      description: ml(
        "Desde 2021, a Lei 14.191 define a educação bilíngue de surdos na LDB: Libras é a primeira língua e o português escrito é a segunda. Isso muda o planejamento, não só o apoio.",
        "Since 2021, Law 14,191 defines bilingual education for deaf students in Brazilian law: sign language is the first language and written Portuguese the second. That changes planning, not just support.",
        "Desde 2021, la Ley 14.191 define la educación bilingüe de sordos: la lengua de señas es la primera lengua y el portugués escrito la segunda. Eso cambia la planificación, no solo el apoyo.",
      ),
      tips: mlList(
        [
          "Libras não é apoio ao português: é a língua em que o aluno pensa e aprende",
          "O conteúdo deve estar acessível em Libras, não apenas traduzido na hora",
          "Português escrito é ensinado como segunda língua, com metodologia própria",
          "A oferta bilíngue começa na educação infantil e segue por toda a escolarização",
        ],
        [
          "Sign language is not support for Portuguese: it is the language the student thinks and learns in",
          "Content must be accessible in sign language, not merely translated on the spot",
          "Written Portuguese is taught as a second language, with its own methodology",
          "Bilingual provision starts in early childhood education and continues throughout schooling",
        ],
        [
          "La lengua de señas no es apoyo al portugués: es la lengua en que el alumno piensa y aprende",
          "El contenido debe estar accesible en señas, no solo traducido en el momento",
          "El portugués escrito se enseña como segunda lengua, con metodología propia",
          "La oferta bilingüe empieza en educación infantil y sigue toda la escolarización",
        ],
      ),
      evidence: "established" as const,
      citations: [LEI_BILINGUE, LEI_SENADO, INES],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Avaliar a escrita como segunda língua", "Assessing writing as a second language", "Evaluar la escritura como segunda lengua"),
      description: ml(
        "O texto do aluno surdo tem a estrutura da Libras, não erros de português. Corrigir como se fosse falante nativo mede a língua errada.",
        "A deaf student's text carries the structure of sign language, not Portuguese errors. Marking it as if they were a native speaker measures the wrong language.",
        "El texto del alumno sordo tiene la estructura de la lengua de señas, no errores de portugués. Corregir como si fuera hablante nativo mide la lengua equivocada.",
      ),
      tips: mlList(
        [
          "Avalie primeiro se a ideia está lá; a estrutura vem depois",
          "Ausência de artigo e preposição costuma ser interferência da L1, não descuido",
          "Use os mesmos critérios que usaria para quem aprende português como língua estrangeira",
          "Corrija poucos aspectos por vez, com foco definido",
        ],
        [
          "First assess whether the idea is there; structure comes after",
          "Missing articles and prepositions are usually L1 interference, not carelessness",
          "Use the same criteria you would for someone learning Portuguese as a foreign language",
          "Correct few aspects at a time, with a defined focus",
        ],
        [
          "Evalúe primero si la idea está; la estructura viene después",
          "La ausencia de artículo y preposición suele ser interferencia de la L1, no descuido",
          "Use los mismos criterios que usaría con quien aprende el idioma como lengua extranjera",
          "Corrija pocos aspectos por vez, con foco definido",
        ],
      ),
      evidence: "established" as const,
      citations: [LEI_BILINGUE, INES_MATERIAIS],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Identidade e cultura surda na turma", "Deaf identity and culture in the classroom", "Identidad y cultura sorda en el grupo"),
      description: ml(
        "Tratar a surdez como diferença linguística e cultural, não só como falta de audição. Isso muda como a turma inteira se relaciona com o colega surdo.",
        "Treat deafness as a linguistic and cultural difference, not only as a lack of hearing. That changes how the whole class relates to the deaf classmate.",
        "Tratar la sordera como diferencia lingüística y cultural, no solo como falta de audición. Eso cambia cómo todo el grupo se relaciona con el compañero sordo.",
      ),
      tips: mlList(
        [
          "Ensine sinais básicos para a turma toda — comunicação não pode depender só do intérprete",
          "Traga referências de pessoas surdas adultas em diferentes profissões",
          "Evite tratar a Libras como 'ajudinha': é uma língua completa",
          "Deixe o aluno surdo ensinar sinais aos colegas — muda o lugar dele no grupo",
        ],
        [
          "Teach basic signs to the whole class — communication cannot depend on the interpreter alone",
          "Bring in references to deaf adults in a range of professions",
          "Avoid treating sign language as 'a little help': it is a complete language",
          "Let the deaf student teach signs to classmates — it changes their place in the group",
        ],
        [
          "Enseñe señas básicas a todo el grupo — la comunicación no puede depender solo del intérprete",
          "Traiga referencias de personas sordas adultas en distintas profesiones",
          "Evite tratar la lengua de señas como 'ayudita': es una lengua completa",
          "Deje que el alumno sordo enseñe señas a sus compañeros — cambia su lugar en el grupo",
        ],
      ),
      evidence: "emerging" as const,
      citations: [INES, INES_BIBLIOTECA],
      difficulty: BASICO,
    },
  ]

  const activities = [
    {
      name: ml("Auditoria visual da sua aula", "Visual audit of your class", "Auditoría visual de su clase"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("Uma aula", "One class", "Una clase"),
      description: ml(
        "Grave ou peça a um colega para observar quanto da sua aula é acessível apenas pelo canal visual.",
        "Record your class or ask a colleague to observe how much of it is accessible through the visual channel alone.",
        "Grabe o pida a un colega que observe cuánto de su clase es accesible solo por el canal visual.",
      ),
      materials: mlList(
        ["Celular para gravar, ou um colega observador", "Folha de registro"],
        ["A phone to record, or an observing colleague", "A recording sheet"],
        ["Celular para grabar, o un colega observador", "Hoja de registro"],
      ),
      implementation: ml(
        "Assista à própria aula sem som e anote tudo que se perde — é o que o aluno perde também.",
        "Watch your own class without sound and note everything that is lost — that is what the student loses too.",
        "Mire su propia clase sin sonido y anote todo lo que se pierde — es lo que el alumno también pierde.",
      ),
      objectives: mlList(
        ["Consciência da própria prática", "Identificar lacunas de acessibilidade", "Priorizar ajustes"],
        ["Awareness of your own practice", "Identify accessibility gaps", "Prioritise adjustments"],
        ["Conciencia de la propia práctica", "Identificar brechas de accesibilidad", "Priorizar ajustes"],
      ),
      authorship: "adapted" as const,
      citations: [INES, UDL],
      stepByStep: mlList(
        [
          "Grave 20 minutos da sua aula, com a câmera na posição do aluno",
          "Assista sem som, do início ao fim",
          "Anote todo momento em que você falou de costas ou com o rosto encoberto",
          "Anote toda instrução que existiu só na fala",
          "Anote as falas sobrepostas entre colegas",
          "Escolha o item mais frequente e corrija só ele na próxima aula",
        ],
        [
          "Record 20 minutes of your class, with the camera in the student's position",
          "Watch it without sound, from start to finish",
          "Note every moment you spoke with your back turned or your face covered",
          "Note every instruction that existed only in speech",
          "Note the overlapping speech between classmates",
          "Pick the most frequent item and fix only that one in the next class",
        ],
        [
          "Grabe 20 minutos de su clase, con la cámara en la posición del alumno",
          "Mírela sin sonido, de principio a fin",
          "Anote cada momento en que habló de espaldas o con el rostro cubierto",
          "Anote cada consigna que existió solo en el habla",
          "Anote las hablas superpuestas entre compañeros",
          "Elija el ítem más frecuente y corrija solo ese en la próxima clase",
        ],
      ),
      tips: mlList(
        ["Assistir sem som é desconfortável — é esse o ponto", "Um ajuste por vez rende mais que uma lista de dez"],
        ["Watching without sound is uncomfortable — that is the point", "One adjustment at a time achieves more than a list of ten"],
        ["Mirar sin sonido es incómodo — ese es el punto", "Un ajuste a la vez rinde más que una lista de diez"],
      ),
      variations: mlList(
        ["Fazer em dupla com um colega, cada um observando a aula do outro"],
        ["Do it in pairs with a colleague, each observing the other's class"],
        ["Hacerlo en pareja con un colega, cada uno observando la clase del otro"],
      ),
      assessment: ml(
        "Refaça a gravação um mês depois e compare a contagem de cada item.",
        "Redo the recording a month later and compare the count of each item.",
        "Rehaga la grabación un mes después y compare el conteo de cada ítem.",
      ),
    },
    {
      name: ml("Glossário visual da disciplina", "Visual glossary of the subject", "Glosario visual de la asignatura"),
      age: ml("8-16 anos", "8-16 years", "8-16 años"),
      duration: ml("Construído ao longo do bimestre", "Built across the term", "Construido a lo largo del bimestre"),
      description: ml(
        "Um mural com os termos técnicos da matéria em texto, imagem e sinal, construído junto com a turma.",
        "A wall chart with the subject's technical terms in text, image and sign, built together with the class.",
        "Un mural con los términos técnicos de la materia en texto, imagen y seña, construido junto con el grupo.",
      ),
      materials: mlList(
        ["Cartolina ou mural", "Impressão de imagens", "Registro do sinal em foto ou vídeo"],
        ["Poster board or a wall space", "Printed images", "The sign recorded as photo or video"],
        ["Cartulina o mural", "Impresión de imágenes", "Registro de la seña en foto o video"],
      ),
      implementation: ml(
        "A cada termo novo da disciplina, registre as três formas e mantenha visível durante todo o bimestre.",
        "For each new subject term, record all three forms and keep it visible throughout the term.",
        "Con cada término nuevo de la asignatura, registre las tres formas y manténgalo visible todo el bimestre.",
      ),
      objectives: mlList(
        ["Vocabulário técnico", "Autonomia na consulta", "Participação de toda a turma"],
        ["Technical vocabulary", "Independent reference", "Whole-class participation"],
        ["Vocabulario técnico", "Autonomía en la consulta", "Participación de todo el grupo"],
      ),
      authorship: "adapted" as const,
      citations: [INES_MATERIAIS, INES_BIBLIOTECA],
      stepByStep: mlList(
        [
          "Liste os termos técnicos que a disciplina vai usar no bimestre",
          "Para cada um, defina texto curto e escolha uma imagem",
          "Registre o sinal correspondente, com apoio do intérprete ou do aluno surdo",
          "Monte o mural em ordem de aparecimento no conteúdo",
          "Acrescente cada termo no dia em que ele entra na aula",
          "Consulte o mural em voz alta durante a aula, para a turma toda",
        ],
        [
          "List the technical terms the subject will use this term",
          "For each, write a short definition and choose an image",
          "Record the matching sign, with help from the interpreter or the deaf student",
          "Arrange the wall chart in the order terms appear in the content",
          "Add each term on the day it enters the lesson",
          "Refer to the chart out loud during class, for the whole group",
        ],
        [
          "Liste los términos técnicos que la asignatura usará en el bimestre",
          "Para cada uno, defina un texto corto y elija una imagen",
          "Registre la seña correspondiente, con apoyo del intérprete o del alumno sordo",
          "Arme el mural en orden de aparición en el contenido",
          "Agregue cada término el día en que entra en la clase",
          "Consulte el mural en voz alta durante la clase, para todo el grupo",
        ],
      ),
      tips: mlList(
        [
          "O aluno surdo é quem melhor valida o sinal — envolva-o na construção",
          "O glossário ajuda a turma inteira, não só ele",
        ],
        [
          "The deaf student is the best person to validate the sign — involve them in building it",
          "The glossary helps the whole class, not just that student",
        ],
        [
          "El alumno sordo es quien mejor valida la seña — involúcrelo en la construcción",
          "El glosario ayuda a todo el grupo, no solo a él",
        ],
      ),
      variations: mlList(
        ["Versão digital compartilhada, com vídeos curtos de cada sinal"],
        ["A shared digital version, with short videos of each sign"],
        ["Versión digital compartida, con videos cortos de cada seña"],
      ),
      assessment: ml(
        "Verifique se os alunos recorrem ao mural sozinhos e se usam os termos corretamente na avaliação.",
        "Check whether students turn to the chart on their own and use the terms correctly in assessments.",
        "Verifique si los alumnos recurren al mural por su cuenta y usan los términos correctamente en la evaluación.",
      ),
    },
    {
      name: ml("Correção de texto como segunda língua", "Marking writing as a second language", "Corrección de texto como segunda lengua"),
      age: ml("9-18 anos", "9-18 years", "9-18 años"),
      duration: ml("30 min por texto", "30 min per text", "30 min por texto"),
      description: ml(
        "Um procedimento para corrigir a produção escrita do aluno surdo sem confundir interferência da primeira língua com erro.",
        "A procedure for marking a deaf student's writing without confusing first-language interference with error.",
        "Un procedimiento para corregir la producción escrita del alumno sordo sin confundir interferencia de la primera lengua con error.",
      ),
      materials: mlList(
        ["Um texto produzido pelo aluno", "Duas canetas de cores diferentes"],
        ["A text written by the student", "Two pens of different colours"],
        ["Un texto producido por el alumno", "Dos bolígrafos de colores diferentes"],
      ),
      implementation: ml(
        "Separe conteúdo de forma, identifique o que é interferência da L1 e escolha um único foco de correção.",
        "Separate content from form, identify what is L1 interference and choose a single correction focus.",
        "Separe contenido de forma, identifique qué es interferencia de la L1 y elija un único foco de corrección.",
      ),
      objectives: mlList(
        ["Avaliação justa da escrita", "Progresso na segunda língua", "Preservar a autoria do aluno"],
        ["Fair assessment of writing", "Progress in the second language", "Preserving the student's authorship"],
        ["Evaluación justa de la escritura", "Progreso en la segunda lengua", "Preservar la autoría del alumno"],
      ),
      authorship: "adapted" as const,
      citations: [LEI_BILINGUE, INES_MATERIAIS],
      stepByStep: mlList(
        [
          "Leia o texto inteiro uma vez sem marcar nada",
          "Na primeira cor, registre o que o aluno conseguiu comunicar — a ideia, o argumento, a sequência",
          "Separe os desvios em duas listas: interferência da Libras e desatenção",
          "Escolha UM aspecto para trabalhar nesta correção; ignore os outros por ora",
          "Devolva com o comentário sobre o conteúdo primeiro, e o foco escolhido depois",
          "Registre o foco escolhido para o próximo texto avançar em outro aspecto",
        ],
        [
          "Read the whole text once without marking anything",
          "In the first colour, record what the student managed to communicate — the idea, the argument, the sequence",
          "Split the deviations into two lists: sign-language interference and carelessness",
          "Choose ONE aspect to work on in this correction; ignore the others for now",
          "Return it with the comment on content first, and the chosen focus after",
          "Record the chosen focus so the next text advances on a different aspect",
        ],
        [
          "Lea el texto entero una vez sin marcar nada",
          "En el primer color, registre lo que el alumno logró comunicar — la idea, el argumento, la secuencia",
          "Separe las desviaciones en dos listas: interferencia de la lengua de señas y descuido",
          "Elija UN aspecto para trabajar en esta corrección; ignore los otros por ahora",
          "Devuelva con el comentario sobre el contenido primero, y el foco elegido después",
          "Registre el foco elegido para que el próximo texto avance en otro aspecto",
        ],
      ),
      tips: mlList(
        ["Texto todo marcado de vermelho ensina que escrever é errar", "Se você não sabe se é interferência ou erro, pergunte ao intérprete"],
        ["A text covered in red teaches that writing means failing", "If you cannot tell interference from error, ask the interpreter"],
        ["Un texto todo marcado en rojo enseña que escribir es equivocarse", "Si no sabe si es interferencia o error, pregunte al intérprete"],
      ),
      variations: mlList(
        ["Versão em que o aluno grava o texto em Libras antes de escrever"],
        ["A version where the student records the text in sign language before writing"],
        ["Versión en que el alumno graba el texto en señas antes de escribir"],
      ),
      assessment: ml(
        "Acompanhe o aspecto escolhido ao longo de vários textos, em vez de contar erros no total.",
        "Track the chosen aspect across several texts, instead of counting total errors.",
        "Siga el aspecto elegido a lo largo de varios textos, en vez de contar errores en total.",
      ),
    },
    {
      name: ml("Roda de conversa com turno organizado", "Circle time with organised turns", "Ronda de conversación con turno organizado"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("Uma aula", "One class", "Una clase"),
      description: ml(
        "Reorganiza a discussão em grupo para que o aluno surdo consiga participar de fato, e não só assistir.",
        "Reorganises group discussion so the deaf student can actually take part, rather than just watch.",
        "Reorganiza la discusión grupal para que el alumno sordo pueda participar de verdad, y no solo mirar.",
      ),
      materials: mlList(
        ["Um objeto que marque quem tem a palavra", "Cadeiras em círculo"],
        ["An object marking whose turn it is", "Chairs in a circle"],
        ["Un objeto que marque quién tiene la palabra", "Sillas en círculo"],
      ),
      implementation: ml(
        "Um turno por vez, com o falante identificado antes de começar e pausa entre as falas.",
        "One turn at a time, with the speaker identified before starting and a pause between turns.",
        "Un turno a la vez, con el hablante identificado antes de empezar y pausa entre las intervenciones.",
      ),
      objectives: mlList(
        ["Participação real", "Turno de fala acessível", "Convivência"],
        ["Real participation", "Accessible speaking turns", "Coexistence"],
        ["Participación real", "Turno de habla accesible", "Convivencia"],
      ),
      authorship: "adapted" as const,
      citations: [INES, UDL],
      stepByStep: mlList(
        [
          "Disponha as cadeiras em círculo, para todos verem o rosto de todos",
          "Posicione o intérprete de frente para o aluno surdo, sem ninguém no meio",
          "Use um objeto que passa de mão em mão: só fala quem está com ele",
          "Antes de cada fala, aponte para quem vai falar",
          "Conte até três entre uma fala e outra, para o intérprete alcançar",
          "Ao final, peça que o aluno surdo resuma um ponto — verifica o acesso real",
        ],
        [
          "Arrange the chairs in a circle, so everyone can see everyone's face",
          "Place the interpreter facing the deaf student, with nobody in between",
          "Use an object passed from hand to hand: only whoever holds it speaks",
          "Before each turn, point to who is going to speak",
          "Count to three between turns, so the interpreter can catch up",
          "At the end, ask the deaf student to summarise one point — it checks real access",
        ],
        [
          "Disponga las sillas en círculo, para que todos vean el rostro de todos",
          "Ubique al intérprete de frente al alumno sordo, sin nadie en medio",
          "Use un objeto que pasa de mano en mano: solo habla quien lo tiene",
          "Antes de cada intervención, señale a quién va a hablar",
          "Cuente hasta tres entre una intervención y otra, para que el intérprete alcance",
          "Al final, pida que el alumno sordo resuma un punto — verifica el acceso real",
        ],
      ),
      tips: mlList(
        ["Se o aluno surdo não consegue resumir nenhum ponto, a roda não foi acessível", "O objeto de turno ajuda a turma inteira, não só ele"],
        ["If the deaf student cannot summarise any point, the circle was not accessible", "The turn object helps the whole class, not only them"],
        ["Si el alumno sordo no logra resumir ningún punto, la ronda no fue accesible", "El objeto de turno ayuda a todo el grupo, no solo a él"],
      ),
      variations: mlList(
        ["Versão escrita em paralelo, com os pontos principais registrados no quadro"],
        ["A parallel written version, with the main points recorded on the board"],
        ["Versión escrita en paralelo, con los puntos principales registrados en el pizarrón"],
      ),
      assessment: ml(
        "Conte quantas vezes o aluno surdo tomou a palavra por iniciativa própria, comparando com rodas anteriores.",
        "Count how many times the deaf student took the floor on their own initiative, compared with previous circles.",
        "Cuente cuántas veces el alumno sordo tomó la palabra por iniciativa propia, comparando con rondas anteriores.",
      ),
    },
  ]

  const courses = [
    {
      title: ml("Audiologia Educacional", "Educational Audiology", "Audiología Educacional"),
      provider: "CENES",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Consultar", "On request", "Consultar"),
      certificate: true,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "pt" as const,
      url: "https://cenes.com.br/curso/audiologia-educacional",
    },
    {
      title: ml("Deficiência Auditiva e Surdez", "Hearing Impairment and Deafness", "Discapacidad Auditiva y Sordera"),
      provider: "EW Cursos",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: true,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "pt" as const,
      url: "https://www.ewcursos.com/curso/curso-gratuito-de-deficiencia-auditiva-e-surdez",
    },
    {
      title: ml("Trabalhando com Deficientes Auditivos", "Working with Hearing-Impaired Students", "Trabajando con Personas con Discapacidad Auditiva"),
      provider: "Educamundo",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Consultar", "On request", "Consultar"),
      certificate: true,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "pt" as const,
      url: "https://educamundo.com.br/cursos-online/trabalhando-com-deficientes-auditivos/",
    },
    {
      title: ml("Capacitação em Deficiência Auditiva", "Training in Hearing Impairment", "Capacitación en Discapacidad Auditiva"),
      provider: "FA Souza",
      duration: ml("180h", "180h", "180h"),
      price: ml("Consultar", "On request", "Consultar"),
      certificate: true,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "pt" as const,
      url: "https://fasouza.com.br/capacitacao-profissional/capacitacao-deficiencia-auditiva-180-horas",
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
      title: ml("INES — biblioteca digital", "INES — digital library", "INES — biblioteca digital"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Acervo em Libras e Português sobre educação de surdos, do instituto do MEC dedicado ao tema.",
        "A collection in Brazilian Sign Language and Portuguese on deaf education, from the MEC institute dedicated to the field.",
        "Acervo en Lengua de Señas Brasileña y Portugués sobre educación de sordos, del instituto del MEC dedicado al tema.",
      ),
      featured: true,
      url: "https://debasi.ines.gov.br/",
      publisher: "INES — Ministério da Educação",
      language: "pt" as const,
      format: "Site" as const,
    },
    {
      title: ml("INES — materiais didáticos", "INES — teaching materials", "INES — materiales didácticos"),
      type: ml("Material", "Material", "Material"),
      description: ml(
        "Produtos pedagógicos de conteúdo escolar produzidos para uso direto em sala de aula.",
        "Pedagogical products of school content produced for direct classroom use.",
        "Productos pedagógicos de contenido escolar producidos para uso directo en el aula.",
      ),
      featured: true,
      url: "https://debasi.ines.gov.br/materiais-did%C3%A1ticos",
      publisher: "INES — Ministério da Educação",
      language: "pt" as const,
      format: "Site" as const,
    },
    {
      title: ml("Portal do INES", "INES portal", "Portal del INES"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Instituto do MEC responsável pela produção e difusão de conhecimento na área da surdez.",
        "The MEC institute responsible for producing and disseminating knowledge in the field of deafness.",
        "El instituto del MEC responsable de producir y difundir conocimiento en el área de la sordera.",
      ),
      featured: false,
      url: "https://www.ines.gov.br/",
      publisher: "INES — Ministério da Educação",
      language: "pt" as const,
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
        "Referencial para oferecer o conteúdo em mais de um canal desde o planejamento.",
        "A framework for offering content through more than one channel from the planning stage.",
        "Referencia para ofrecer el contenido en más de un canal desde la planificación.",
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
  ]

  return {
    strategies,
    activities,
    courses: withCommonCourses(courses),
    resources: withCommonResources(resources),
  }
}
