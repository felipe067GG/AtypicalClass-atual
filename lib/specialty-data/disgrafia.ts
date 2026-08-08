import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Disgrafia — área nova.
 *
 * Base principal: o guia prático do What Works Clearinghouse sobre ensino de
 * escrita, cuja primeira recomendação é justamente tornar o aluno fluente em
 * caligrafia, ortografia, construção de frase e digitação — porque enquanto o
 * gesto de escrever consome atenção, não sobra nada para o que escrever.
 *
 * Uma observação honesta que aparece na literatura: terapia ocupacional é
 * frequentemente indicada, mas a evidência é limitada quando ela não inclui
 * atividades específicas de escrita. Isso está dito na área.
 */

const WWC_WRITING: Citation = {
  label: "IES / WWC — Teaching Elementary School Students to Be Effective Writers",
  url: "https://ies.ed.gov/ncee/wwc/practiceguide/17",
}

const WWC_PDF: Citation = {
  label: "WWC — resumo do guia de escrita (PDF)",
  url: "https://ies.ed.gov/ncee/wwc/Docs/practiceguide/wwc_writingpg_summary_092314.pdf",
}

const WWC_SEC: Citation = {
  label: "WWC — guia prático de escrita para os anos finais",
  url: "https://ies.ed.gov/ncee/wwc/practiceguide/28",
}

const RR_WRITING: Citation = {
  label: "Reading Rockets — escrita: artigos e estratégias",
  url: "https://www.readingrockets.org/topics/writing",
}

const NCII: Citation = {
  label: "National Center on Intensive Intervention — intensificar quando o progresso não vem",
  url: "https://intensiveintervention.org/",
}

const UDL: Citation = {
  label: "CAST — Diretrizes do Desenho Universal para a Aprendizagem",
  url: "https://udlguidelines.cast.org/",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")

export function disgrafiaData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Fluência no gesto de escrever", "Fluency in the act of writing", "Fluidez en el gesto de escribir"),
      description: ml(
        "Enquanto formar a letra consome atenção, não sobra nada para o conteúdo. Automatizar o traçado é a primeira recomendação do guia do WWC.",
        "While forming letters consumes attention, nothing is left for content. Automating handwriting is the WWC guide's first recommendation.",
        "Mientras formar la letra consume atención, no queda nada para el contenido. Automatizar el trazo es la primera recomendación de la guía del WWC.",
      ),
      tips: mlList(
        [
          "Prática curta e diária do traçado, de 5 a 10 minutos",
          "Trabalhe grupos de letras com movimento parecido, não a ordem do alfabeto",
          "Nomeie o movimento em voz alta enquanto o aluno escreve",
          "Fluência não é caligrafia bonita: é escrever sem pensar em como escrever",
        ],
        [
          "Short daily handwriting practice, 5 to 10 minutes",
          "Work on letter groups with similar movements, not alphabetical order",
          "Name the movement aloud while the student writes",
          "Fluency is not neat handwriting: it is writing without thinking about how to write",
        ],
        [
          "Práctica corta y diaria del trazo, de 5 a 10 minutos",
          "Trabaje grupos de letras con movimiento parecido, no el orden del alfabeto",
          "Nombre el movimiento en voz alta mientras el alumno escribe",
          "Fluidez no es caligrafía bonita: es escribir sin pensar en cómo escribir",
        ],
      ),
      evidence: "established" as const,
      citations: [WWC_WRITING, WWC_PDF],
      difficulty: BASICO,
    },
    {
      title: ml("Separar o ato de escrever do ato de compor", "Separate handwriting from composing", "Separar el acto de escribir del de componer"),
      description: ml(
        "Planejar, ditar e revisar podem acontecer sem lápis. Exigir tudo junto faz o aluno perder a ideia enquanto luta com a letra.",
        "Planning, dictating and revising can happen without a pencil. Demanding it all at once makes the student lose the idea while fighting the letters.",
        "Planificar, dictar y revisar pueden ocurrir sin lápiz. Exigir todo junto hace que el alumno pierda la idea mientras lucha con la letra.",
      ),
      tips: mlList(
        [
          "Deixe o aluno ditar a ideia primeiro, e passar a limpo depois",
          "Aceite gravação de áudio como rascunho",
          "Não corrija a letra durante a produção de ideias — só na revisão",
          "Reduza a quantidade escrita sem reduzir a exigência de raciocínio",
        ],
        [
          "Let the student dictate the idea first, and write it up afterwards",
          "Accept an audio recording as a draft",
          "Do not correct handwriting during idea generation — only at revision",
          "Reduce the amount written without reducing the reasoning demanded",
        ],
        [
          "Deje que el alumno dicte la idea primero, y la pase en limpio después",
          "Acepte una grabación de audio como borrador",
          "No corrija la letra durante la producción de ideas — solo en la revisión",
          "Reduzca la cantidad escrita sin reducir la exigencia de razonamiento",
        ],
      ),
      evidence: "established" as const,
      citations: [WWC_WRITING, WWC_SEC],
      difficulty: BASICO,
    },
    {
      title: ml("Ensinar o processo de escrita", "Teach the writing process", "Enseñar el proceso de escritura"),
      description: ml(
        "Planejar, escrever, revisar e editar como etapas explícitas e ensinadas — não como algo que o aluno deveria já saber fazer.",
        "Plan, draft, revise and edit as explicit, taught stages — not as something the student should already know how to do.",
        "Planificar, escribir, revisar y editar como etapas explícitas y enseñadas — no como algo que el alumno ya debería saber hacer.",
      ),
      tips: mlList(
        [
          "Ensine uma etapa por vez, com modelo seu antes",
          "Use um organizador gráfico fixo para o planejamento",
          "Revisar não é corrigir erro: é melhorar a ideia",
          "Dê o roteiro por escrito; ele não deve estar só na sua cabeça",
        ],
        [
          "Teach one stage at a time, modelling it yourself first",
          "Use a fixed graphic organiser for planning",
          "Revising is not fixing errors: it is improving the idea",
          "Give the routine in writing; it should not live only in your head",
        ],
        [
          "Enseñe una etapa a la vez, con su modelo antes",
          "Use un organizador gráfico fijo para la planificación",
          "Revisar no es corregir el error: es mejorar la idea",
          "Dé el guion por escrito; no debe estar solo en su cabeza",
        ],
      ),
      evidence: "established" as const,
      citations: [WWC_WRITING, WWC_SEC],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Digitação como caminho paralelo", "Typing as a parallel route", "Tecleo como camino paralelo"),
      description: ml(
        "Ensinar a digitar em paralelo ao traçado manual. Para muitos alunos, o teclado é o que devolve o acesso à escrita.",
        "Teach typing alongside handwriting. For many students, the keyboard is what gives writing back to them.",
        "Enseñar a teclear en paralelo al trazo manual. Para muchos alumnos, el teclado es lo que devuelve el acceso a la escritura.",
      ),
      tips: mlList(
        [
          "Digitação também precisa ser ensinada, não só permitida",
          "Não trate o teclado como facilitação: é outro caminho para o mesmo objetivo",
          "Corretor ortográfico é ferramenta, não trapaça — salvo em prova de ortografia",
          "Combine com o aluno quando ele prefere teclado e quando prefere papel",
        ],
        [
          "Typing also needs to be taught, not merely allowed",
          "Do not treat the keyboard as a concession: it is another route to the same goal",
          "A spellchecker is a tool, not cheating — except in a spelling test",
          "Agree with the student when they prefer keyboard and when they prefer paper",
        ],
        [
          "El tecleo también debe enseñarse, no solo permitirse",
          "No trate el teclado como facilitación: es otro camino al mismo objetivo",
          "El corrector ortográfico es herramienta, no trampa — salvo en prueba de ortografía",
          "Acuerde con el alumno cuándo prefiere teclado y cuándo papel",
        ],
      ),
      evidence: "established" as const,
      citations: [WWC_WRITING, UDL],
      difficulty: BASICO,
    },
    {
      title: ml("Ajustes físicos simples", "Simple physical adjustments", "Ajustes físicos simples"),
      description: ml(
        "Engrossador, plano inclinado, papel com pauta reforçada. Mudanças baratas que reduzem o esforço motor antes de qualquer treino.",
        "A pencil grip, a slant board, paper with reinforced lines. Cheap changes that reduce motor effort before any training.",
        "Engrosador, plano inclinado, papel con pauta reforzada. Cambios baratos que reducen el esfuerzo motor antes de cualquier entrenamiento.",
      ),
      tips: mlList(
        [
          "Teste o engrossador antes de comprar: nem todo formato serve para todo aluno",
          "Plano inclinado melhora a postura do punho sem custo alto",
          "Papel com pauta mais marcada ajuda no alinhamento",
          "Pé apoiado e mesa na altura certa fazem diferença no traçado",
        ],
        [
          "Test the grip before buying: not every shape suits every student",
          "A slant board improves wrist posture at low cost",
          "Paper with stronger lines helps with alignment",
          "Supported feet and the right desk height make a difference to handwriting",
        ],
        [
          "Pruebe el engrosador antes de comprar: no todo formato sirve para todo alumno",
          "El plano inclinado mejora la postura de la muñeca sin costo alto",
          "El papel con pauta más marcada ayuda en la alineación",
          "El pie apoyado y la mesa a la altura correcta marcan diferencia en el trazo",
        ],
      ),
      evidence: "emerging" as const,
      citations: [RR_WRITING, WWC_PDF],
      difficulty: BASICO,
    },
    {
      title: ml("Avaliar o conteúdo, não a letra", "Assess content, not handwriting", "Evaluar el contenido, no la letra"),
      description: ml(
        "Se a avaliação é de história, a legibilidade não deveria pesar na nota. Só avalie caligrafia quando ela for o objetivo declarado.",
        "If the assessment is history, legibility should not weigh on the grade. Only assess handwriting when it is the stated objective.",
        "Si la evaluación es de historia, la legibilidad no debería pesar en la nota. Evalúe caligrafía solo cuando sea el objetivo declarado.",
      ),
      tips: mlList(
        [
          "Deixe explícito no critério o que está sendo avaliado",
          "Aceite resposta digitada ou oral quando o conteúdo permitir",
          "Tempo adicional como regra, não como concessão",
          "Se você não conseguiu ler, pergunte — não desconte",
        ],
        [
          "State explicitly in the criteria what is being assessed",
          "Accept typed or oral answers when the content allows",
          "Extra time as a rule, not as a concession",
          "If you could not read it, ask — do not deduct",
        ],
        [
          "Deje explícito en el criterio qué se está evaluando",
          "Acepte respuesta escrita a máquina u oral cuando el contenido lo permita",
          "Tiempo adicional como regla, no como concesión",
          "Si no logró leer, pregunte — no descuente",
        ],
      ),
      evidence: "established" as const,
      citations: [UDL, WWC_SEC],
      difficulty: BASICO,
    },
    {
      title: ml("Cuidado com a indicação automática de terapia", "Careful with automatic therapy referrals", "Cuidado con la derivación automática a terapia"),
      description: ml(
        "Terapia ocupacional é frequentemente indicada, mas a literatura aponta evidência limitada quando ela não inclui atividades específicas de escrita.",
        "Occupational therapy is often recommended, but the literature notes limited evidence when it does not include specific writing activities.",
        "La terapia ocupacional se indica con frecuencia, pero la literatura señala evidencia limitada cuando no incluye actividades específicas de escritura.",
      ),
      tips: mlList(
        [
          "Pergunte se a terapia inclui prática direta de escrita, não só motricidade geral",
          "Encaminhamento não substitui a instrução em sala",
          "Alinhe com o terapeuta o que cada um vai trabalhar",
          "Exercício motor genérico raramente transfere para o traçado da letra",
        ],
        [
          "Ask whether the therapy includes direct writing practice, not only general motor work",
          "A referral does not replace classroom instruction",
          "Align with the therapist on what each of you will work on",
          "Generic motor exercise rarely transfers to letter formation",
        ],
        [
          "Pregunte si la terapia incluye práctica directa de escritura, no solo motricidad general",
          "La derivación no sustituye la instrucción en el aula",
          "Alinee con el terapeuta qué trabajará cada uno",
          "El ejercicio motor genérico rara vez transfiere al trazo de la letra",
        ],
      ),
      evidence: "emerging" as const,
      citations: [WWC_WRITING, NCII],
      difficulty: INTERMEDIARIO,
    },
  ]

  const activities = [
    {
      name: ml("Cinco minutos de traçado por dia", "Five minutes of handwriting a day", "Cinco minutos de trazo por día"),
      age: ml("6-12 anos", "6-12 years", "6-12 años"),
      duration: ml("5 min por dia", "5 min a day", "5 min por día"),
      description: ml(
        "Rotina diária curta trabalhando grupos de letras com movimento parecido, até o traçado sair sem esforço consciente.",
        "A short daily routine on letter groups with similar movements, until handwriting comes without conscious effort.",
        "Rutina diaria corta trabajando grupos de letras con movimiento parecido, hasta que el trazo salga sin esfuerzo consciente.",
      ),
      materials: mlList(
        ["Papel com pauta", "Lápis com engrossador, se necessário", "Plano inclinado, se disponível"],
        ["Lined paper", "A pencil with a grip, if needed", "A slant board, if available"],
        ["Papel con pauta", "Lápiz con engrosador, si es necesario", "Plano inclinado, si hay"],
      ),
      implementation: ml(
        "Agrupe as letras por movimento, não por ordem alfabética, e pratique um grupo até automatizar.",
        "Group letters by movement, not alphabetically, and practise one group until it is automatic.",
        "Agrupe las letras por movimiento, no por orden alfabético, y practique un grupo hasta automatizar.",
      ),
      objectives: mlList(
        ["Automatizar o traçado", "Liberar atenção para o conteúdo", "Reduzir fadiga ao escrever"],
        ["Automate handwriting", "Free attention for content", "Reduce writing fatigue"],
        ["Automatizar el trazo", "Liberar atención para el contenido", "Reducir fatiga al escribir"],
      ),
      authorship: "adapted" as const,
      citations: [WWC_WRITING, WWC_PDF],
      stepByStep: mlList(
        [
          "Agrupe as letras por movimento: as que começam com curva, as que começam com traço reto",
          "Escolha um grupo e trabalhe só ele por vários dias",
          "Você escreve primeiro, nomeando o movimento em voz alta",
          "O aluno traça por cima, depois ao lado, depois sozinho",
          "Cinco minutos, todo dia — nunca uma sessão longa por semana",
          "Só passe ao grupo seguinte quando o atual sair sem hesitação",
        ],
        [
          "Group letters by movement: those starting with a curve, those starting with a straight stroke",
          "Choose one group and work on it alone for several days",
          "You write first, naming the movement aloud",
          "The student traces over it, then beside it, then alone",
          "Five minutes, every day — never one long session a week",
          "Move to the next group only when the current one comes without hesitation",
        ],
        [
          "Agrupe las letras por movimiento: las que empiezan con curva, las que empiezan con trazo recto",
          "Elija un grupo y trabájelo solo durante varios días",
          "Usted escribe primero, nombrando el movimiento en voz alta",
          "El alumno traza encima, después al lado, después solo",
          "Cinco minutos, todos los días — nunca una sesión larga por semana",
          "Pase al grupo siguiente solo cuando el actual salga sin dudar",
        ],
      ),
      tips: mlList(
        [
          "Ordem alfabética junta letras com movimentos completamente diferentes — por isso não funciona bem",
          "Se a mão dói ou o aluno desiste em dois minutos, a sessão está longa demais",
        ],
        [
          "Alphabetical order mixes letters with completely different movements — that is why it works poorly",
          "If the hand hurts or the student gives up in two minutes, the session is too long",
        ],
        [
          "El orden alfabético junta letras con movimientos completamente distintos — por eso funciona mal",
          "Si la mano duele o el alumno abandona en dos minutos, la sesión es demasiado larga",
        ],
      ),
      variations: mlList(
        ["Traçado no ar ou na areia antes do lápis, para movimento amplo", "Versão com letra cursiva, se for o padrão da escola"],
        ["Air or sand tracing before the pencil, for broad movement", "A cursive version, if that is the school standard"],
        ["Trazado en el aire o en arena antes del lápiz, para movimiento amplio", "Versión con letra cursiva, si es el estándar de la escuela"],
      ),
      assessment: ml(
        "Peça uma frase ditada e conte quantas letras saíram sem hesitação, comparando ao longo das semanas.",
        "Dictate a sentence and count how many letters came without hesitation, comparing across weeks.",
        "Dicte una frase y cuente cuántas letras salieron sin dudar, comparando a lo largo de las semanas.",
      ),
    },
    {
      name: ml("Ditar antes de escrever", "Dictate before writing", "Dictar antes de escribir"),
      age: ml("8-16 anos", "8-16 years", "8-16 años"),
      duration: ml("Uma aula", "One class", "Una clase"),
      description: ml(
        "Separar a produção de ideias do registro escrito, para o aluno mostrar o que pensa sem perder a ideia no caminho.",
        "Separate idea generation from written recording, so the student shows what they think without losing the idea on the way.",
        "Separar la producción de ideas del registro escrito, para que el alumno muestre lo que piensa sin perder la idea en el camino.",
      ),
      materials: mlList(
        ["Gravador do celular ou um colega escriba", "Organizador gráfico de planejamento"],
        ["A phone recorder or a scribe partner", "A planning graphic organiser"],
        ["Grabadora del celular o un compañero escriba", "Organizador gráfico de planificación"],
      ),
      implementation: ml(
        "Planejar e ditar primeiro; passar a limpo em outro momento, com a ideia já resolvida.",
        "Plan and dictate first; write it up later, with the idea already settled.",
        "Planificar y dictar primero; pasar en limpio en otro momento, con la idea ya resuelta.",
      ),
      objectives: mlList(
        ["Produzir texto de verdade", "Mostrar o que sabe", "Reduzir frustração"],
        ["Produce real text", "Show what they know", "Reduce frustration"],
        ["Producir texto de verdad", "Mostrar lo que sabe", "Reducir la frustración"],
      ),
      authorship: "adapted" as const,
      citations: [WWC_WRITING, UDL],
      stepByStep: mlList(
        [
          "Use o organizador gráfico para planejar as ideias, com poucas palavras",
          "O aluno grava o texto falando, sem se preocupar com forma",
          "Ouçam juntos e ajustem a ordem das ideias",
          "Só então ele passa para o papel ou para o teclado",
          "Na passagem a limpo, ele já sabe o que vai escrever",
          "Corrija a forma só nesta última etapa",
        ],
        [
          "Use the graphic organiser to plan ideas, with few words",
          "The student records the text by speaking, without worrying about form",
          "Listen together and adjust the order of ideas",
          "Only then do they move to paper or keyboard",
          "When writing up, they already know what to write",
          "Correct form only at this final stage",
        ],
        [
          "Use el organizador gráfico para planificar las ideas, con pocas palabras",
          "El alumno graba el texto hablando, sin preocuparse por la forma",
          "Escuchen juntos y ajusten el orden de las ideas",
          "Solo entonces pasa al papel o al teclado",
          "Al pasar en limpio, ya sabe qué va a escribir",
          "Corrija la forma solo en esta última etapa",
        ],
      ),
      tips: mlList(
        [
          "Corrigir a letra durante a produção de ideias faz o aluno perder o texto inteiro",
          "O colega escriba precisa escrever exatamente o que foi dito, sem melhorar",
        ],
        [
          "Correcting handwriting during idea generation makes the student lose the whole text",
          "The scribe partner must write exactly what was said, without improving it",
        ],
        [
          "Corregir la letra durante la producción de ideas hace que el alumno pierda el texto entero",
          "El compañero escriba debe escribir exactamente lo dicho, sin mejorarlo",
        ],
      ),
      variations: mlList(
        ["Versão com ditado por voz do próprio celular, que já vem no sistema"],
        ["A version using the phone's built-in voice dictation"],
        ["Versión con dictado por voz del propio celular, que ya viene en el sistema"],
      ),
      assessment: ml(
        "Compare a extensão e a qualidade do texto ditado com a do texto escrito à mão. A diferença mostra quanto o gesto está custando.",
        "Compare the length and quality of the dictated text with the handwritten one. The gap shows how much the act of writing is costing.",
        "Compare la extensión y la calidad del texto dictado con el escrito a mano. La diferencia muestra cuánto está costando el gesto.",
      ),
    },
    {
      name: ml("Combinado de escrita da disciplina", "Subject writing agreement", "Acuerdo de escritura de la asignatura"),
      age: ml("10-18 anos", "10-18 years", "10-18 años"),
      duration: ml("15 min, no início do ano", "15 min, at the start of the year", "15 min, al inicio del año"),
      description: ml(
        "Um acordo escrito sobre quando o aluno usa teclado, quando escreve à mão e como será avaliado em cada caso.",
        "A written agreement on when the student uses a keyboard, when they write by hand and how each will be assessed.",
        "Un acuerdo escrito sobre cuándo el alumno usa teclado, cuándo escribe a mano y cómo se evaluará cada caso.",
      ),
      materials: mlList(
        ["Ficha de combinado", "Conversa em particular com o aluno"],
        ["An agreement sheet", "A private conversation with the student"],
        ["Ficha de acuerdo", "Conversación en privado con el alumno"],
      ),
      implementation: ml(
        "Defina antes, por escrito, o que vale em cada tipo de tarefa — e comunique à coordenação e à família.",
        "Define in advance, in writing, what applies to each task type — and inform leadership and the family.",
        "Defina antes, por escrito, qué vale en cada tipo de tarea — y comuníquelo a la coordinación y la familia.",
      ),
      objectives: mlList(
        ["Previsibilidade", "Avaliação justa", "Autonomia do aluno"],
        ["Predictability", "Fair assessment", "Student autonomy"],
        ["Previsibilidad", "Evaluación justa", "Autonomía del alumno"],
      ),
      authorship: "adapted" as const,
      citations: [UDL, WWC_SEC],
      stepByStep: mlList(
        [
          "Liste os tipos de tarefa escrita da sua disciplina ao longo do ano",
          "Para cada uma, defina se caligrafia faz parte do que está sendo avaliado",
          "Onde não fizer, autorize teclado, ditado ou resposta oral",
          "Combine o tempo adicional para as tarefas manuscritas",
          "Escreva tudo em uma ficha e assine com o aluno",
          "Envie cópia à coordenação e à família, para não depender de você lembrar",
        ],
        [
          "List the types of written task in your subject across the year",
          "For each, define whether handwriting is part of what is being assessed",
          "Where it is not, authorise keyboard, dictation or oral answers",
          "Agree the extra time for handwritten tasks",
          "Write it all on a sheet and sign it with the student",
          "Send a copy to leadership and the family, so it does not depend on you remembering",
        ],
        [
          "Liste los tipos de tarea escrita de su asignatura a lo largo del año",
          "Para cada una, defina si la caligrafía forma parte de lo evaluado",
          "Donde no lo sea, autorice teclado, dictado o respuesta oral",
          "Acuerde el tiempo adicional para las tareas manuscritas",
          "Escriba todo en una ficha y fírmela con el alumno",
          "Envíe copia a la coordinación y la familia, para no depender de que usted recuerde",
        ],
      ),
      tips: mlList(
        [
          "Sem registro escrito, o combinado se perde na troca de professor",
          "Deixar a decisão para o momento da prova gera constrangimento público",
        ],
        [
          "Without a written record, the agreement is lost when the teacher changes",
          "Leaving the decision to the moment of the test creates public embarrassment",
        ],
        [
          "Sin registro escrito, el acuerdo se pierde al cambiar de docente",
          "Dejar la decisión para el momento de la prueba genera vergüenza pública",
        ],
      ),
      variations: mlList(
        ["Versão compartilhada entre todos os professores da turma, num único documento"],
        ["A version shared by all the class's teachers, in a single document"],
        ["Versión compartida entre todos los docentes del grupo, en un único documento"],
      ),
      assessment: ml(
        "Ao fim do bimestre, verifique se o combinado foi cumprido em todas as tarefas — e ajuste o que não funcionou.",
        "At the end of the term, check whether the agreement was honoured in every task — and adjust what did not work.",
        "Al final del bimestre, verifique si el acuerdo se cumplió en todas las tareas — y ajuste lo que no funcionó.",
      ),
    },
  ]

  const courses: never[] = []

  const resources = [
    {
      title: ml(
        "Guia prático de ensino de escrita (WWC)",
        "Practice guide on teaching writing (WWC)",
        "Guía práctica de enseñanza de escritura (WWC)",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Quatro recomendações graduadas por evidência; a primeira é justamente tornar o aluno fluente no gesto de escrever.",
        "Four recommendations graded by evidence; the first is precisely making the student fluent in the act of writing.",
        "Cuatro recomendaciones graduadas por evidencia; la primera es justamente hacer al alumno fluido en el gesto de escribir.",
      ),
      featured: true,
      url: "https://ies.ed.gov/ncee/wwc/practiceguide/17",
      publisher: "IES / What Works Clearinghouse",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Resumo do guia de escrita (PDF)", "Writing guide summary (PDF)", "Resumen de la guía de escritura (PDF)"),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Versão condensada das recomendações, útil para levar à reunião pedagógica.",
        "A condensed version of the recommendations, useful for taking to a staff meeting.",
        "Versión condensada de las recomendaciones, útil para llevar a la reunión pedagógica.",
      ),
      featured: true,
      url: "https://ies.ed.gov/ncee/wwc/Docs/practiceguide/wwc_writingpg_summary_092314.pdf",
      publisher: "IES / What Works Clearinghouse",
      language: "en" as const,
      format: "PDF" as const,
    },
    {
      title: ml("Escrita nos anos finais — guia WWC", "Writing in secondary grades — WWC guide", "Escritura en los años finales — guía WWC"),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Recomendações para alunos maiores, incluindo processo de escrita e uso de tecnologia.",
        "Recommendations for older students, including the writing process and use of technology.",
        "Recomendaciones para alumnos mayores, incluyendo proceso de escritura y uso de tecnología.",
      ),
      featured: false,
      url: "https://ies.ed.gov/ncee/wwc/practiceguide/28",
      publisher: "IES / What Works Clearinghouse",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Escrita — Reading Rockets", "Writing — Reading Rockets", "Escritura — Reading Rockets"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Artigos e estratégias práticas de ensino de escrita, organizados por tema.",
        "Articles and practical writing-instruction strategies, organised by topic.",
        "Artículos y estrategias prácticas de enseñanza de escritura, organizados por tema.",
      ),
      featured: false,
      url: "https://www.readingrockets.org/topics/writing",
      publisher: "Reading Rockets",
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
