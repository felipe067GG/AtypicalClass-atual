import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Altas Habilidades / Superdotação — área nova.
 *
 * Integra legalmente o público-alvo da Educação Especial no Brasil e era a
 * ausência mais grave do site.
 *
 * O eixo vem do trabalho do Renzulli Center (UConn): compactação curricular,
 * enriquecimento e aceleração. A literatura indica que a aceleração tem
 * respaldo empírico mais forte, sobretudo em matemática — por isso ela e o
 * enriquecimento aparecem com níveis de evidência diferentes aqui.
 *
 * Nota de verificação: as páginas da NAGC respondem 403 ao verificador, então
 * não entraram.
 */

const RENZULLI_ART: Citation = {
  label: "Renzulli Center / UConn — artigos e apresentações do Schoolwide Enrichment Model",
  url: "https://gifted.uconn.edu/schoolwide-enrichment-model/semart/",
}

const RENZULLI_RES: Citation = {
  label: "Renzulli Center / UConn — estudos de pesquisa sobre o SEM",
  url: "https://gifted.uconn.edu/schoolwide-enrichment-model/semresearch/",
}

const ERIC_ENRICH: Citation = {
  label: "Enriquecimento e pedagogia da educação de superdotados (ERIC, PDF)",
  url: "https://files.eric.ed.gov/fulltext/EJ1317646.pdf",
}

const SEM_PDF: Citation = {
  label: "The Schoolwide Enrichment Model — visão geral do modelo (PDF)",
  url: "https://renzullilearning.com/wp-content/uploads/2018/07/The-Schoolwide-Enrichment-Model.pdf",
}

const UCONN: Citation = {
  label: "Renzulli Center for Creativity, Gifted Education and Talent Development",
  url: "https://gifted.uconn.edu/",
}

const UDL: Citation = {
  label: "CAST — Diretrizes do Desenho Universal para a Aprendizagem",
  url: "https://udlguidelines.cast.org/",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")
const AVANCADO = ml("Avançado", "Advanced", "Avanzado")

export function altasHabilidadesData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Compactação curricular", "Curriculum compacting", "Compactación curricular"),
      description: ml(
        "Avaliar antes o que o aluno já domina, dispensá-lo dessa parte e usar o tempo liberado para conteúdo novo. Sem isso, ele passa o ano repetindo o que já sabe.",
        "Assess beforehand what the student already masters, excuse them from it and use the freed time for new content. Without this, they spend the year repeating what they know.",
        "Evaluar antes lo que el alumno ya domina, dispensarlo de esa parte y usar el tiempo liberado para contenido nuevo. Sin esto, pasa el año repitiendo lo que ya sabe.",
      ),
      tips: mlList(
        [
          "Aplique a avaliação da unidade ANTES de ensiná-la",
          "Dispense o aluno do que ele acertou, não o mande fazer 'mais do mesmo'",
          "O tempo liberado precisa ter destino planejado, senão vira ociosidade",
          "Registre por escrito o que foi dispensado e o que entrou no lugar",
        ],
        [
          "Give the unit assessment BEFORE teaching the unit",
          "Excuse the student from what they got right; do not assign 'more of the same'",
          "The freed time needs a planned destination, otherwise it becomes idleness",
          "Record in writing what was skipped and what replaced it",
        ],
        [
          "Aplique la evaluación de la unidad ANTES de enseñarla",
          "Dispense al alumno de lo que acertó, no le mande 'más de lo mismo'",
          "El tiempo liberado necesita destino planificado, si no se vuelve ociosidad",
          "Registre por escrito qué se dispensó y qué entró en su lugar",
        ],
      ),
      evidence: "established" as const,
      citations: [RENZULLI_RES, SEM_PDF],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Aceleração", "Acceleration", "Aceleración"),
      description: ml(
        "Permitir avanço no ritmo do aluno, por disciplina ou por série. É a estratégia com respaldo empírico mais forte, especialmente em matemática.",
        "Allow the student to advance at their own pace, by subject or by grade. It is the strategy with the strongest empirical backing, especially in mathematics.",
        "Permitir avance al ritmo del alumno, por asignatura o por grado. Es la estrategia con respaldo empírico más fuerte, sobre todo en matemáticas.",
      ),
      tips: mlList(
        [
          "Aceleração por disciplina costuma ser mais viável que pular o ano inteiro",
          "Decida com base em avaliação do domínio, não só na impressão do professor",
          "Envolva a família e o próprio aluno na decisão",
          "Acompanhe o ajuste social, não só o acadêmico",
        ],
        [
          "Subject acceleration is usually more feasible than skipping a whole year",
          "Decide based on a mastery assessment, not only the teacher's impression",
          "Involve the family and the student in the decision",
          "Monitor social adjustment, not only academic progress",
        ],
        [
          "La aceleración por asignatura suele ser más viable que saltar el año entero",
          "Decida con base en evaluación del dominio, no solo en la impresión del docente",
          "Involucre a la familia y al propio alumno en la decisión",
          "Acompañe el ajuste social, no solo el académico",
        ],
      ),
      evidence: "established" as const,
      citations: [ERIC_ENRICH, RENZULLI_RES],
      difficulty: AVANCADO,
    },
    {
      title: ml("Enriquecimento por interesse", "Interest-based enrichment", "Enriquecimiento por interés"),
      description: ml(
        "Aprofundar a partir do que o aluno já quer investigar, em vez de simplesmente dar mais exercícios do mesmo conteúdo.",
        "Deepen learning from what the student already wants to investigate, instead of just assigning more exercises on the same content.",
        "Profundizar a partir de lo que el alumno ya quiere investigar, en vez de simplemente dar más ejercicios del mismo contenido.",
      ),
      tips: mlList(
        [
          "Mapeie os interesses no início do ano, por escrito",
          "Mais quantidade não é enriquecimento — é castigo por terminar antes",
          "Conecte o interesse ao conteúdo da disciplina, não o trate como extra",
          "Deixe o aluno escolher o formato do produto final",
        ],
        [
          "Map interests at the start of the year, in writing",
          "More quantity is not enrichment — it is punishment for finishing early",
          "Connect the interest to the subject content, do not treat it as an extra",
          "Let the student choose the format of the final product",
        ],
        [
          "Mapee los intereses al inicio del año, por escrito",
          "Más cantidad no es enriquecimiento — es castigo por terminar antes",
          "Conecte el interés al contenido de la asignatura, no lo trate como extra",
          "Deje que el alumno elija el formato del producto final",
        ],
      ),
      evidence: "established" as const,
      citations: [RENZULLI_ART, SEM_PDF],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Investigação autônoma", "Independent investigation", "Investigación autónoma"),
      description: ml(
        "O aluno investiga um problema real com metodologia, produzindo algo para um público de verdade — o nível mais alto do modelo de enriquecimento.",
        "The student investigates a real problem with a method, producing something for a real audience — the highest level of the enrichment model.",
        "El alumno investiga un problema real con metodología, produciendo algo para un público real — el nivel más alto del modelo de enriquecimiento.",
      ),
      tips: mlList(
        [
          "O problema precisa ser real, não um exercício disfarçado",
          "Ensine a metodologia: como buscar, registrar e verificar fonte",
          "Defina um público real para o produto — a turma, a escola, a comunidade",
          "Acompanhe com encontros curtos e regulares, não só na entrega",
        ],
        [
          "The problem must be real, not an exercise in disguise",
          "Teach the method: how to search, record and check sources",
          "Define a real audience for the product — the class, the school, the community",
          "Follow up with short, regular meetings, not only at submission",
        ],
        [
          "El problema debe ser real, no un ejercicio disfrazado",
          "Enseñe la metodología: cómo buscar, registrar y verificar fuentes",
          "Defina un público real para el producto — el grupo, la escuela, la comunidad",
          "Acompañe con encuentros cortos y regulares, no solo en la entrega",
        ],
      ),
      evidence: "established" as const,
      citations: [SEM_PDF, RENZULLI_ART],
      difficulty: AVANCADO,
    },
    {
      title: ml("Agrupamento flexível", "Flexible grouping", "Agrupamiento flexible"),
      description: ml(
        "Reunir alunos por nível de domínio naquele conteúdo específico, com composição que muda a cada tema — não um grupo fixo de 'avançados'.",
        "Group students by mastery of that specific content, with composition changing per topic — not a fixed 'advanced' group.",
        "Reunir alumnos por nivel de dominio en ese contenido específico, con composición que cambia por tema — no un grupo fijo de 'avanzados'.",
      ),
      tips: mlList(
        [
          "O agrupamento é por conteúdo e temporário; refaça a cada unidade",
          "Grupo fixo vira rótulo e prejudica quem fica de fora",
          "Use uma avaliação diagnóstica curta para compor o grupo",
          "Garanta que todos os grupos façam trabalho intelectualmente exigente",
        ],
        [
          "Grouping is by content and temporary; redo it each unit",
          "A fixed group becomes a label and harms those left out",
          "Use a short diagnostic assessment to compose the group",
          "Make sure every group does intellectually demanding work",
        ],
        [
          "El agrupamiento es por contenido y temporal; rehágalo en cada unidad",
          "Un grupo fijo se vuelve etiqueta y perjudica a quien queda fuera",
          "Use una evaluación diagnóstica corta para componer el grupo",
          "Garantice que todos los grupos hagan trabajo intelectualmente exigente",
        ],
      ),
      evidence: "established" as const,
      citations: [RENZULLI_RES, ERIC_ENRICH],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Atenção ao baixo desempenho", "Watching for underachievement", "Atención al bajo rendimiento"),
      description: ml(
        "Alta habilidade não garante boa nota. Tédio, perfeccionismo e falta de desafio produzem desempenho abaixo do potencial — e o aluno some do radar.",
        "High ability does not guarantee good grades. Boredom, perfectionism and lack of challenge produce underachievement — and the student drops off the radar.",
        "La alta habilidad no garantiza buenas notas. Aburrimiento, perfeccionismo y falta de desafío producen rendimiento por debajo del potencial — y el alumno desaparece del radar.",
      ),
      tips: mlList(
        [
          "Nota baixa não descarta altas habilidades — às vezes é sintoma",
          "Observe recusa de tarefa fácil: pode ser tédio, não preguiça",
          "Perfeccionismo faz o aluno não entregar por medo de errar",
          "Converse com o aluno sobre o que ele acha da aula; a resposta costuma surpreender",
        ],
        [
          "A low grade does not rule out giftedness — sometimes it is a symptom",
          "Watch for refusal of easy tasks: it may be boredom, not laziness",
          "Perfectionism makes the student not hand work in, out of fear of being wrong",
          "Talk with the student about what they think of the lesson; the answer often surprises",
        ],
        [
          "Una nota baja no descarta altas capacidades — a veces es síntoma",
          "Observe el rechazo de la tarea fácil: puede ser aburrimiento, no pereza",
          "El perfeccionismo hace que el alumno no entregue por miedo a equivocarse",
          "Converse con el alumno sobre qué opina de la clase; la respuesta suele sorprender",
        ],
      ),
      evidence: "emerging" as const,
      citations: [UCONN, ERIC_ENRICH],
      difficulty: BASICO,
    },
    {
      title: ml("Identificação que não exclui", "Identification that does not exclude", "Identificación que no excluye"),
      description: ml(
        "Usar mais de uma fonte de informação para identificar, porque critério único deixa de fora alunos de contextos menos favorecidos.",
        "Use more than one source of information to identify, because a single criterion leaves out students from less advantaged backgrounds.",
        "Usar más de una fuente de información para identificar, porque un criterio único deja fuera a alumnos de contextos menos favorecidos.",
      ),
      tips: mlList(
        [
          "Combine observação do professor, produção do aluno e interesse manifesto",
          "Desconfie de critério único, seja nota ou teste",
          "Habilidade aparece na área de interesse, não necessariamente em todas",
          "Reveja a identificação periodicamente: ela não é um diagnóstico permanente",
        ],
        [
          "Combine teacher observation, student work and expressed interest",
          "Be wary of a single criterion, whether grades or a test",
          "Ability shows up in the area of interest, not necessarily across the board",
          "Review the identification periodically: it is not a permanent diagnosis",
        ],
        [
          "Combine observación del docente, producción del alumno e interés manifiesto",
          "Desconfíe del criterio único, sea nota o test",
          "La habilidad aparece en el área de interés, no necesariamente en todas",
          "Revise la identificación periódicamente: no es un diagnóstico permanente",
        ],
      ),
      evidence: "emerging" as const,
      citations: [UCONN, RENZULLI_ART],
      difficulty: INTERMEDIARIO,
    },
  ]

  const activities = [
    {
      name: ml("Pré-teste da unidade", "Unit pre-test", "Pre-test de la unidad"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("30 min por unidade", "30 min per unit", "30 min por unidad"),
      description: ml(
        "Aplicar a avaliação antes de ensinar, para descobrir quem já domina e liberar tempo para conteúdo novo.",
        "Give the assessment before teaching, to find who already has mastery and free up time for new content.",
        "Aplicar la evaluación antes de enseñar, para descubrir quién ya domina y liberar tiempo para contenido nuevo.",
      ),
      materials: mlList(
        ["A avaliação que você já usa no fim da unidade", "Planilha simples de registro"],
        ["The assessment you already use at the end of the unit", "A simple tracking sheet"],
        ["La evaluación que ya usa al final de la unidad", "Planilla simple de registro"],
      ),
      implementation: ml(
        "Aplique o pós-teste como pré-teste, identifique os objetivos já dominados e substitua-os por trabalho novo.",
        "Use the post-test as a pre-test, identify already-mastered objectives and replace them with new work.",
        "Aplique el post-test como pre-test, identifique los objetivos ya dominados y sustitúyalos por trabajo nuevo.",
      ),
      objectives: mlList(
        ["Evitar repetição", "Liberar tempo", "Planejar desafio real"],
        ["Avoid repetition", "Free up time", "Plan a real challenge"],
        ["Evitar repetición", "Liberar tiempo", "Planificar desafío real"],
      ),
      authorship: "adapted" as const,
      citations: [RENZULLI_RES, SEM_PDF],
      stepByStep: mlList(
        [
          "Pegue a avaliação que você aplicaria no fim da unidade",
          "Aplique-a antes de começar a ensinar, para a turma toda",
          "Marque, por aluno, quais objetivos já estão dominados",
          "Para quem dominou acima de 80%, defina o que ele fará no lugar",
          "Combine com o aluno o produto esperado e o prazo",
          "Registre o acordo por escrito, para a coordenação e a família",
        ],
        [
          "Take the assessment you would give at the end of the unit",
          "Apply it before you start teaching, to the whole class",
          "Mark, per student, which objectives are already mastered",
          "For those above 80% mastery, define what they will do instead",
          "Agree with the student on the expected product and the deadline",
          "Record the agreement in writing, for school leadership and the family",
        ],
        [
          "Tome la evaluación que aplicaría al final de la unidad",
          "Aplíquela antes de empezar a enseñar, a todo el grupo",
          "Marque, por alumno, qué objetivos ya están dominados",
          "Para quien dominó más del 80%, defina qué hará en su lugar",
          "Acuerde con el alumno el producto esperado y el plazo",
          "Registre el acuerdo por escrito, para la coordinación y la familia",
        ],
      ),
      tips: mlList(
        [
          "O pré-teste também revela lacunas na turma inteira — o benefício não é só do aluno com altas habilidades",
          "Sem destino planejado para o tempo liberado, a compactação vira tempo ocioso",
        ],
        [
          "The pre-test also reveals gaps across the whole class — the benefit is not only for the gifted student",
          "Without a planned destination for the freed time, compacting turns into idle time",
        ],
        [
          "El pre-test también revela lagunas en todo el grupo — el beneficio no es solo del alumno con altas capacidades",
          "Sin destino planificado para el tiempo liberado, la compactación se vuelve tiempo ocioso",
        ],
      ),
      variations: mlList(
        ["Versão só com os objetivos centrais, quando a avaliação completa for longa demais"],
        ["A version with only the core objectives, when the full assessment is too long"],
        ["Versión solo con los objetivos centrales, cuando la evaluación completa sea demasiado larga"],
      ),
      assessment: ml(
        "O próprio pré-teste é a medida. Compare com o pós-teste para confirmar que o tempo liberado rendeu aprendizagem nova.",
        "The pre-test itself is the measure. Compare it with the post-test to confirm the freed time produced new learning.",
        "El propio pre-test es la medida. Compárelo con el post-test para confirmar que el tiempo liberado produjo aprendizaje nuevo.",
      ),
    },
    {
      name: ml("Mapa de interesses da turma", "Class interest map", "Mapa de intereses del grupo"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("Uma aula, no início do ano", "One class, at the start of the year", "Una clase, al inicio del año"),
      description: ml(
        "Um levantamento estruturado do que cada aluno quer investigar, que orienta o enriquecimento o ano inteiro.",
        "A structured survey of what each student wants to investigate, guiding enrichment all year.",
        "Un relevamiento estructurado de lo que cada alumno quiere investigar, que orienta el enriquecimiento todo el año.",
      ),
      materials: mlList(
        ["Questionário impresso", "Mural ou planilha para consolidar"],
        ["A printed questionnaire", "A wall chart or spreadsheet to consolidate"],
        ["Cuestionario impreso", "Mural o planilla para consolidar"],
      ),
      implementation: ml(
        "Aplique um questionário curto de interesses e use as respostas ao planejar cada unidade.",
        "Apply a short interest questionnaire and use the answers when planning each unit.",
        "Aplique un cuestionario corto de intereses y use las respuestas al planificar cada unidad.",
      ),
      objectives: mlList(
        ["Enriquecimento com sentido", "Engajamento", "Conhecer a turma"],
        ["Meaningful enrichment", "Engagement", "Knowing the class"],
        ["Enriquecimiento con sentido", "Compromiso", "Conocer al grupo"],
      ),
      authorship: "adapted" as const,
      citations: [RENZULLI_ART, SEM_PDF],
      stepByStep: mlList(
        [
          "Monte de 6 a 8 perguntas abertas sobre o que o aluno gosta de descobrir",
          "Inclua perguntas sobre o que ele faz fora da escola",
          "Aplique na primeira semana do ano",
          "Consolide as respostas por tema, não por aluno",
          "Ao planejar cada unidade, procure conexões com os temas levantados",
          "Reaplique no meio do ano: interesses mudam",
        ],
        [
          "Write 6 to 8 open questions about what the student likes to find out",
          "Include questions about what they do outside school",
          "Apply it in the first week of the year",
          "Consolidate answers by theme, not by student",
          "When planning each unit, look for connections with the themes raised",
          "Reapply mid-year: interests change",
        ],
        [
          "Arme de 6 a 8 preguntas abiertas sobre lo que al alumno le gusta descubrir",
          "Incluya preguntas sobre lo que hace fuera de la escuela",
          "Aplíquelo en la primera semana del año",
          "Consolide las respuestas por tema, no por alumno",
          "Al planificar cada unidad, busque conexiones con los temas relevados",
          "Reaplique a mitad de año: los intereses cambian",
        ],
      ),
      tips: mlList(
        [
          "Perguntas abertas revelam mais que lista de opções para marcar",
          "O mapa serve à turma inteira, não só a quem tem altas habilidades",
        ],
        [
          "Open questions reveal more than a tick-box list",
          "The map serves the whole class, not only gifted students",
        ],
        [
          "Las preguntas abiertas revelan más que una lista de opciones para marcar",
          "El mapa sirve a todo el grupo, no solo a quien tiene altas capacidades",
        ],
      ),
      variations: mlList(
        ["Versão em entrevista curta, para alunos que escrevem pouco"],
        ["A short-interview version, for students who write little"],
        ["Versión en entrevista corta, para alumnos que escriben poco"],
      ),
      assessment: ml(
        "Verifique quantas unidades do bimestre você conseguiu conectar a algum interesse levantado.",
        "Check how many units in the term you managed to connect to an interest raised in the survey.",
        "Verifique cuántas unidades del bimestre logró conectar con algún interés relevado.",
      ),
    },
    {
      name: ml("Investigação com público real", "Investigation with a real audience", "Investigación con público real"),
      age: ml("10-18 anos", "10-18 years", "10-18 años"),
      duration: ml("Um bimestre", "One term", "Un bimestre"),
      description: ml(
        "Um projeto de investigação sobre problema real, com produto entregue a um público de verdade.",
        "An investigation project on a real problem, with a product delivered to a real audience.",
        "Un proyecto de investigación sobre un problema real, con producto entregado a un público real.",
      ),
      materials: mlList(
        ["Caderno de registro da investigação", "Acesso a fontes", "Combinado por escrito de prazos"],
        ["An investigation logbook", "Access to sources", "A written agreement on deadlines"],
        ["Cuaderno de registro de la investigación", "Acceso a fuentes", "Acuerdo escrito de plazos"],
      ),
      implementation: ml(
        "Do problema ao produto, com encontros curtos de acompanhamento a cada duas semanas.",
        "From problem to product, with short check-in meetings every two weeks.",
        "Del problema al producto, con encuentros cortos de seguimiento cada dos semanas.",
      ),
      objectives: mlList(
        ["Metodologia de investigação", "Autonomia", "Produto com destinatário real"],
        ["Investigation methodology", "Autonomy", "A product with a real recipient"],
        ["Metodología de investigación", "Autonomía", "Producto con destinatario real"],
      ),
      authorship: "adapted" as const,
      citations: [SEM_PDF, RENZULLI_ART],
      stepByStep: mlList(
        [
          "Parta de um interesse já levantado no mapa da turma",
          "Ajude a transformar o interesse numa pergunta investigável",
          "Defina junto quem é o público do produto final",
          "Ensine explicitamente como buscar e verificar fontes",
          "Encontros de 10 minutos a cada duas semanas, com registro do combinado",
          "Entrega para o público real, não só para o professor",
        ],
        [
          "Start from an interest already raised in the class map",
          "Help turn the interest into an investigable question",
          "Define together who the audience for the final product is",
          "Explicitly teach how to search and verify sources",
          "Ten-minute check-ins every two weeks, recording what was agreed",
          "Deliver to the real audience, not only to the teacher",
        ],
        [
          "Parta de un interés ya relevado en el mapa del grupo",
          "Ayude a transformar el interés en una pregunta investigable",
          "Definan juntos quién es el público del producto final",
          "Enseñe explícitamente cómo buscar y verificar fuentes",
          "Encuentros de 10 minutos cada dos semanas, con registro de lo acordado",
          "Entrega al público real, no solo al docente",
        ],
      ),
      tips: mlList(
        [
          "A pergunta precisa ser estreita o bastante para caber num bimestre",
          "Sem público real, o projeto vira trabalho escolar comum",
        ],
        [
          "The question must be narrow enough to fit in a term",
          "Without a real audience, the project becomes ordinary schoolwork",
        ],
        [
          "La pregunta debe ser lo bastante estrecha para caber en un bimestre",
          "Sin público real, el proyecto se vuelve trabajo escolar común",
        ],
      ),
      variations: mlList(
        ["Investigação em dupla, quando dois alunos compartilham o interesse", "Produto em formato escolhido pelo aluno: vídeo, oficina, texto, protótipo"],
        ["A paired investigation, when two students share the interest", "A product in a format chosen by the student: video, workshop, text, prototype"],
        ["Investigación en pareja, cuando dos alumnos comparten el interés", "Producto en formato elegido por el alumno: video, taller, texto, prototipo"],
      ),
      assessment: ml(
        "Avalie o processo registrado no caderno e a adequação do produto ao público, não só o resultado final.",
        "Assess the process recorded in the logbook and how well the product fits its audience, not only the final result.",
        "Evalúe el proceso registrado en el cuaderno y la adecuación del producto al público, no solo el resultado final.",
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
        "Schoolwide Enrichment Model — artigos e formação",
        "Schoolwide Enrichment Model — articles and training",
        "Schoolwide Enrichment Model — artículos y formación",
      ),
      provider: "Renzulli Center / University of Connecticut",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: false,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "en" as const,
      url: "https://gifted.uconn.edu/schoolwide-enrichment-model/semart/",
    },
  ]

  const resources = [
    {
      title: ml(
        "The Schoolwide Enrichment Model — visão geral",
        "The Schoolwide Enrichment Model — overview",
        "The Schoolwide Enrichment Model — visión general",
      ),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Como o modelo organiza compactação, enriquecimento e investigação autônoma na escola inteira.",
        "How the model organises compacting, enrichment and independent investigation across the whole school.",
        "Cómo el modelo organiza compactación, enriquecimiento e investigación autónoma en toda la escuela.",
      ),
      featured: true,
      url: "https://renzullilearning.com/wp-content/uploads/2018/07/The-Schoolwide-Enrichment-Model.pdf",
      publisher: "Renzulli Learning",
      language: "en" as const,
      format: "PDF" as const,
    },
    {
      title: ml(
        "Enriquecimento e pedagogia da educação de superdotados",
        "Enrichment and gifted education pedagogy",
        "Enriquecimiento y pedagogía de la educación de superdotados",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Artigo acadêmico sobre o que a pesquisa mostra em enriquecimento e aceleração.",
        "An academic article on what research shows about enrichment and acceleration.",
        "Artículo académico sobre lo que la investigación muestra en enriquecimiento y aceleración.",
      ),
      featured: true,
      url: "https://files.eric.ed.gov/fulltext/EJ1317646.pdf",
      publisher: "ERIC — Institute of Education Sciences",
      language: "en" as const,
      format: "PDF" as const,
    },
    {
      title: ml("Estudos de pesquisa sobre o SEM", "SEM research studies", "Estudios de investigación sobre el SEM"),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Compilação dos estudos que sustentam compactação curricular e enriquecimento.",
        "A compilation of the studies supporting curriculum compacting and enrichment.",
        "Compilación de los estudios que sustentan la compactación curricular y el enriquecimiento.",
      ),
      featured: false,
      url: "https://gifted.uconn.edu/schoolwide-enrichment-model/semresearch/",
      publisher: "Renzulli Center — University of Connecticut",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Artigos e apresentações do SEM", "SEM articles and presentations", "Artículos y presentaciones del SEM"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Acervo de textos práticos sobre como aplicar o modelo em sala.",
        "A collection of practical texts on applying the model in the classroom.",
        "Acervo de textos prácticos sobre cómo aplicar el modelo en el aula.",
      ),
      featured: false,
      url: "https://gifted.uconn.edu/schoolwide-enrichment-model/semart/",
      publisher: "Renzulli Center — University of Connecticut",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Renzulli Center — UConn", "Renzulli Center — UConn", "Renzulli Center — UConn"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Centro de referência em criatividade, educação de superdotados e desenvolvimento de talentos.",
        "A reference centre on creativity, gifted education and talent development.",
        "Centro de referencia en creatividad, educación de superdotados y desarrollo de talentos.",
      ),
      featured: false,
      url: "https://gifted.uconn.edu/",
      publisher: "University of Connecticut",
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
        "Oferecer diferentes níveis de desafio e formas de expressão desde o planejamento da aula.",
        "Offering different levels of challenge and forms of expression from the lesson planning stage.",
        "Ofrecer diferentes niveles de desafío y formas de expresión desde la planificación de la clase.",
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
        "Fascículo do MEC/SEESP: altas habilidades integram o público-alvo da Educação Especial.",
        "MEC/SEESP booklet: giftedness is part of the target group of Special Education in Brazil.",
        "Fascículo del MEC/SEESP: las altas capacidades integran el público objetivo de la Educación Especial.",
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
