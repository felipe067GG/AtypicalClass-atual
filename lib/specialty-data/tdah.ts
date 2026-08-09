import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Conteúdo de TDAH — migrado para o padrão verificado.
 *
 * A base aqui não é o NCAEP (que trata de TEA), e sim a literatura de
 * intervenções escolares para TDAH: manejo comportamental em sala e o Daily
 * Report Card, que tem meta-análise própria com tamanho de efeito publicado.
 *
 * Os quatro cursos gratuitos já cadastrados pelo mantenedor foram mantidos —
 * todos com URL verificada.
 */

const CDC: Citation = {
  label: "CDC — ADHD in the Classroom: estratégias de manejo comportamental",
  url: "https://www.cdc.gov/adhd/treatment/classroom.html",
}

const DRC_META: Citation = {
  label: "Pyle & Fabiano (2017) — meta-análise do Daily Report Card, efeito médio 0,61",
  url: "https://pubmed.ncbi.nlm.nih.gov/29135352/",
}

const DRC_PDF: Citation = {
  label: "Meta-análise do Daily Report Card — texto completo (ERIC, PDF)",
  url: "https://files.eric.ed.gov/fulltext/ED583708.pdf",
}

const PSYCHOSOCIAL: Citation = {
  label: "Revisão de intervenções psicossociais com evidência para TDAH (2024)",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11162428/",
}

const SCHOOL_RCT: Citation = {
  label: "Revisão sistemática e meta-análise de ensaios randomizados escolares para TDAH (2025)",
  url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1611145/full",
}

// Apontava para o CHADD, que é referência na área mas passou a não responder
// de nenhum ponto testado — domínio inteiro fora, não só a página. Diferente
// dos casos de 403, aqui não há o que confirmar no navegador: não há resposta.
// A Understood cobre o mesmo terreno, adaptações de sala para TDAH, e verifica.
const CHADD: Citation = {
  label: "Understood — adaptações de sala de aula para alunos com TDAH",
  url: "https://www.understood.org/en/articles/classroom-accommodations-for-adhd",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")

export function tdahData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml(
        "Cartão de comportamento diário (Daily Report Card)",
        "Daily Report Card",
        "Tarjeta de conducta diaria (Daily Report Card)",
      ),
      description: ml(
        "De 2 a 4 metas observáveis, avaliadas todos os dias e comunicadas à família. É a intervenção escolar para TDAH com meta-análise própria: efeito médio de 0,61.",
        "Two to four observable goals, rated every day and shared with the family. It is the school intervention for ADHD with its own meta-analysis: average effect of 0.61.",
        "De 2 a 4 metas observables, evaluadas todos los días y comunicadas a la familia. Es la intervención escolar para TDAH con meta-análisis propio: efecto medio de 0,61.",
      ),
      tips: mlList(
        [
          "Escolha metas observáveis: 'levantou a mão antes de falar', não 'comportou-se bem'",
          "Comece com metas que o aluno já cumpre parte do tempo — precisa haver o que celebrar",
          "Avalie em todos os períodos, não só quando houve problema",
          "Combine com a família a mesma consequência positiva em casa",
        ],
        [
          "Pick observable goals: 'raised a hand before speaking', not 'behaved well'",
          "Start with goals the student already meets part of the time — there must be something to celebrate",
          "Rate every period, not only when something went wrong",
          "Agree with the family on the same positive consequence at home",
        ],
        [
          "Elija metas observables: 'levantó la mano antes de hablar', no 'se portó bien'",
          "Empiece con metas que el alumno ya cumple parte del tiempo — tiene que haber qué celebrar",
          "Evalúe en todos los períodos, no solo cuando hubo problema",
          "Acuerde con la familia la misma consecuencia positiva en casa",
        ],
      ),
      evidence: "established" as const,
      citations: [DRC_META, DRC_PDF, CDC],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Elogio específico e contingente", "Specific contingent praise", "Elogio específico y contingente"),
      description: ml(
        "Nomear exatamente o que o aluno fez certo, imediatamente após fazer. É a prática de manejo comportamental de menor custo e maior retorno em sala.",
        "Name exactly what the student did right, immediately after they do it. It is the lowest-cost, highest-return behaviour management practice in the classroom.",
        "Nombrar exactamente lo que el alumno hizo bien, inmediatamente después. Es la práctica de manejo conductual de menor costo y mayor retorno en el aula.",
      ),
      tips: mlList(
        [
          "Diga o comportamento: 'você começou a tarefa sozinho', não 'muito bem'",
          "Elogie logo depois, não no fim da aula",
          "Mire uma proporção de pelo menos 3 elogios para cada correção",
          "Elogie também as aproximações — começar já conta",
        ],
        [
          "Name the behaviour: 'you started the task by yourself', not 'well done'",
          "Praise right after, not at the end of class",
          "Aim for at least 3 praises for every correction",
          "Praise approximations too — starting already counts",
        ],
        [
          "Diga la conducta: 'empezaste la tarea solo', no 'muy bien'",
          "Elogie enseguida, no al final de la clase",
          "Apunte a al menos 3 elogios por cada corrección",
          "Elogie también las aproximaciones — empezar ya cuenta",
        ],
      ),
      evidence: "established" as const,
      citations: [CDC, PSYCHOSOCIAL],
      difficulty: BASICO,
    },
    {
      title: ml("Lembrete antecipado das regras", "Proactive rule reminders", "Recordatorio anticipado de las reglas"),
      description: ml(
        "Relembrar a regra antes da atividade em que ela costuma ser quebrada, em vez de corrigir depois.",
        "Restate the rule before the activity where it is usually broken, instead of correcting afterwards.",
        "Recordar la regla antes de la actividad en que suele romperse, en vez de corregir después.",
      ),
      tips: mlList(
        [
          "Enuncie a regra imediatamente antes da transição, não no início do dia",
          "Formule no positivo: 'andamos na sala', não 'não corra'",
          "Poucas regras, sempre as mesmas palavras",
          "Peça ao aluno que repita a regra com as próprias palavras",
        ],
        [
          "State the rule right before the transition, not at the start of the day",
          "Phrase it positively: 'we walk in the classroom', not 'don't run'",
          "Few rules, always the same wording",
          "Ask the student to repeat the rule in their own words",
        ],
        [
          "Enuncie la regla justo antes de la transición, no al inicio del día",
          "Formule en positivo: 'caminamos en el aula', no 'no corras'",
          "Pocas reglas, siempre las mismas palabras",
          "Pida al alumno que repita la regla con sus propias palabras",
        ],
      ),
      evidence: "established" as const,
      citations: [CDC, SCHOOL_RCT],
      difficulty: BASICO,
    },
    {
      title: ml("Posicionamento na sala", "Preferential seating", "Ubicación en el aula"),
      description: ml(
        "Escolher onde o aluno senta em função das distrações que o afetam — e não como punição ou isolamento.",
        "Choose where the student sits based on the distractions that affect them — not as punishment or isolation.",
        "Elegir dónde se sienta el alumno según las distracciones que lo afectan — no como castigo ni aislamiento.",
      ),
      tips: mlList(
        [
          "Perto do professor e longe de porta, janela e corredor de circulação",
          "Ao lado de um colega que sirva de modelo, não de plateia",
          "Evite a última fileira: aumenta a distância do foco de instrução",
          "Combine a mudança com o aluno; imposição costuma virar estigma",
        ],
        [
          "Close to the teacher and away from the door, window and walkway",
          "Next to a peer who serves as a model, not as an audience",
          "Avoid the back row: it increases the distance from the instructional focus",
          "Agree the change with the student; imposing it tends to become stigma",
        ],
        [
          "Cerca del docente y lejos de la puerta, la ventana y el pasillo",
          "Al lado de un compañero que sirva de modelo, no de público",
          "Evite la última fila: aumenta la distancia del foco de instrucción",
          "Acuerde el cambio con el alumno; imponerlo suele volverse estigma",
        ],
      ),
      evidence: "established" as const,
      citations: [CDC],
      difficulty: BASICO,
    },
    {
      title: ml("Tarefa fracionada com pausas", "Chunked tasks with breaks", "Tarea fraccionada con pausas"),
      description: ml(
        "Dividir a atividade em blocos curtos com pausa programada entre eles, respeitando o tempo de atenção sustentada em vez de disputá-lo.",
        "Split the activity into short blocks with a scheduled break between them, working with the student's sustained attention span instead of against it.",
        "Dividir la actividad en bloques cortos con pausa programada entre ellos, respetando el tiempo de atención sostenida en vez de disputarlo.",
      ),
      tips: mlList(
        [
          "Comece com blocos menores do que você acha necessário e vá aumentando",
          "A pausa é programada, não uma recompensa a ser conquistada",
          "Deixe visível quantos blocos faltam",
          "Pausa com movimento funciona melhor que pausa parada",
        ],
        [
          "Start with blocks shorter than you think necessary and extend them",
          "The break is scheduled, not a reward to be earned",
          "Make it visible how many blocks are left",
          "A break with movement works better than a still one",
        ],
        [
          "Empiece con bloques más cortos de lo que cree necesario y vaya ampliando",
          "La pausa es programada, no una recompensa a conquistar",
          "Deje visible cuántos bloques faltan",
          "La pausa con movimiento funciona mejor que la pausa quieta",
        ],
      ),
      evidence: "emerging" as const,
      citations: [SCHOOL_RCT, PSYCHOSOCIAL],
      difficulty: BASICO,
    },
    {
      title: ml(
        "Resposta consistente à quebra de regra",
        "Consistent response to rule violations",
        "Respuesta consistente ante la ruptura de la regla",
      ),
      description: ml(
        "A mesma consequência, todas as vezes, sem elevar a voz. A previsibilidade é o que ensina — não a intensidade.",
        "The same consequence, every time, without raising your voice. Predictability is what teaches — not intensity.",
        "La misma consecuencia, todas las veces, sin levantar la voz. La previsibilidad es lo que enseña — no la intensidad.",
      ),
      tips: mlList(
        [
          "Defina a consequência antes de precisar dela, e escreva",
          "Aplique sempre igual, mesmo em dia difícil",
          "Corrija em particular, elogie em público",
          "Encerre o episódio: sem retomar o assunto depois",
        ],
        [
          "Define the consequence before you need it, and write it down",
          "Apply it the same way every time, even on a hard day",
          "Correct in private, praise in public",
          "Close the episode: do not bring it up again later",
        ],
        [
          "Defina la consecuencia antes de necesitarla, y escríbala",
          "Aplíquela siempre igual, incluso en un día difícil",
          "Corrija en privado, elogie en público",
          "Cierre el episodio: sin retomar el asunto después",
        ],
      ),
      evidence: "established" as const,
      citations: [CDC, PSYCHOSOCIAL],
      difficulty: INTERMEDIARIO,
    },
  ]

  const activities = [
    {
      name: ml("Montar um cartão de comportamento diário", "Build a daily report card", "Armar una tarjeta de conducta diaria"),
      age: ml("6-16 anos", "6-16 years", "6-16 años"),
      duration: ml("30 min para montar, 2 min por período", "30 min to set up, 2 min per period", "30 min para armar, 2 min por período"),
      description: ml(
        "Roteiro para implementar a intervenção escolar de TDAH com melhor suporte na literatura.",
        "A script for implementing the best-supported school intervention for ADHD.",
        "Guion para implementar la intervención escolar de TDAH con mejor respaldo en la literatura.",
      ),
      materials: mlList(
        ["Ficha impressa com as metas", "Caneta", "Cópia para a família"],
        ["Printed goal sheet", "Pen", "A copy for the family"],
        ["Ficha impresa con las metas", "Bolígrafo", "Copia para la familia"],
      ),
      implementation: ml(
        "Defina de 2 a 4 metas observáveis, avalie a cada período e envie o cartão para casa todos os dias.",
        "Set 2 to 4 observable goals, rate them each period and send the card home every day.",
        "Defina de 2 a 4 metas observables, evalúe cada período y envíe la tarjeta a casa todos los días.",
      ),
      objectives: mlList(
        ["Metas claras", "Retorno imediato", "Parceria com a família"],
        ["Clear goals", "Immediate feedback", "Partnership with the family"],
        ["Metas claras", "Retorno inmediato", "Alianza con la familia"],
      ),
      authorship: "adapted" as const,
      citations: [DRC_META, DRC_PDF],
      stepByStep: mlList(
        [
          "Observe por três dias e anote os comportamentos que mais atrapalham",
          "Escolha de 2 a 4 e reescreva cada um como meta observável e positiva",
          "Defina o critério do dia: por exemplo, atingir a meta em 4 dos 5 períodos",
          "Apresente o cartão ao aluno — ele precisa entender e concordar com as metas",
          "Combine com a família uma consequência positiva simples em casa",
          "Avalie ao fim de cada período, na frente do aluno, sem drama",
          "Revise as metas a cada duas semanas: cumprida sempre, troque por outra",
        ],
        [
          "Observe for three days and note the behaviours that get most in the way",
          "Pick 2 to 4 and rewrite each as an observable, positive goal",
          "Set the daily criterion: for example, meeting the goal in 4 of 5 periods",
          "Present the card to the student — they must understand and agree with the goals",
          "Agree with the family on a simple positive consequence at home",
          "Rate at the end of each period, in front of the student, without drama",
          "Review the goals every two weeks: if always met, replace with another",
        ],
        [
          "Observe durante tres días y anote las conductas que más estorban",
          "Elija de 2 a 4 y reescriba cada una como meta observable y positiva",
          "Defina el criterio del día: por ejemplo, alcanzar la meta en 4 de 5 períodos",
          "Presente la tarjeta al alumno — debe entender y estar de acuerdo con las metas",
          "Acuerde con la familia una consecuencia positiva simple en casa",
          "Evalúe al final de cada período, frente al alumno, sin dramatismo",
          "Revise las metas cada dos semanas: si siempre se cumple, cámbiela por otra",
        ],
      ),
      tips: mlList(
        ["Se o aluno não atinge a meta em nenhum dia, ela está alta demais", "O cartão é informação, não punição — evite usá-lo como ameaça"],
        ["If the student never meets the goal, it is set too high", "The card is information, not punishment — avoid using it as a threat"],
        ["Si el alumno no alcanza la meta ningún día, está demasiado alta", "La tarjeta es información, no castigo — evite usarla como amenaza"],
      ),
      variations: mlList(
        ["Versão com carinhas para alunos não leitores", "Versão digital compartilhada com a família por mensagem"],
        ["A smiley-face version for non-reading students", "A digital version shared with the family by message"],
        ["Versión con caritas para alumnos no lectores", "Versión digital compartida con la familia por mensaje"],
      ),
      assessment: ml(
        "Compare a proporção de metas atingidas na primeira e na quarta semana; a tendência importa mais que o dia isolado.",
        "Compare the share of goals met in week one and week four; the trend matters more than any single day.",
        "Compare la proporción de metas alcanzadas en la primera y la cuarta semana; la tendencia importa más que el día aislado.",
      ),
    },
    {
      name: ml("Contador de elogios específicos", "Specific praise counter", "Contador de elogios específicos"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("Uma aula", "One class", "Una clase"),
      description: ml(
        "Uma automedição do professor: quantos elogios específicos você dá por aula, comparados às correções.",
        "A teacher self-measurement: how many specific praises you give per class, compared with corrections.",
        "Una automedición del docente: cuántos elogios específicos da por clase, comparados con las correcciones.",
      ),
      materials: mlList(
        ["Papel ou contador manual", "Um colega para observar, se possível"],
        ["Paper or a hand counter", "A colleague to observe, if possible"],
        ["Papel o contador manual", "Un colega para observar, si es posible"],
      ),
      implementation: ml(
        "Conte elogios específicos e correções durante uma aula e calcule a proporção entre eles.",
        "Count specific praises and corrections during one class and work out the ratio.",
        "Cuente elogios específicos y correcciones durante una clase y calcule la proporción.",
      ),
      objectives: mlList(
        ["Consciência da própria prática", "Aumentar a proporção de elogio", "Clima de sala"],
        ["Awareness of your own practice", "Increase the praise ratio", "Classroom climate"],
        ["Conciencia de la propia práctica", "Aumentar la proporción de elogio", "Clima del aula"],
      ),
      authorship: "adapted" as const,
      citations: [CDC, PSYCHOSOCIAL],
      stepByStep: mlList(
        [
          "Faça duas colunas no papel: elogio específico e correção",
          "Durante uma aula, marque cada ocorrência",
          "Só conta como elogio específico se você nomeou o comportamento",
          "Ao fim, calcule a proporção",
          "Na aula seguinte, tente elevar para 3 elogios por correção",
          "Repita a medição uma semana depois",
        ],
        [
          "Draw two columns on paper: specific praise and correction",
          "During one class, mark each occurrence",
          "It only counts as specific praise if you named the behaviour",
          "At the end, work out the ratio",
          "In the next class, try to reach 3 praises per correction",
          "Repeat the measurement a week later",
        ],
        [
          "Haga dos columnas en el papel: elogio específico y corrección",
          "Durante una clase, marque cada ocurrencia",
          "Solo cuenta como elogio específico si nombró la conducta",
          "Al final, calcule la proporción",
          "En la clase siguiente, intente llegar a 3 elogios por corrección",
          "Repita la medición una semana después",
        ],
      ),
      tips: mlList(
        ["A primeira medição costuma surpreender — registre sem se julgar", "Peça a um colega para contar: a autopercepção infla o número"],
        ["The first measurement is usually surprising — record it without judging yourself", "Ask a colleague to count: self-perception inflates the number"],
        ["La primera medición suele sorprender — registre sin juzgarse", "Pida a un colega que cuente: la autopercepción infla el número"],
      ),
      variations: mlList(
        ["Medir só um aluno específico em vez da turma toda"],
        ["Measure just one specific student instead of the whole class"],
        ["Medir solo a un alumno específico en vez de toda la clase"],
      ),
      assessment: ml(
        "A própria proporção é a medida. Acompanhe-a ao longo de um mês.",
        "The ratio itself is the measure. Track it across a month.",
        "La propia proporción es la medida. Sígala a lo largo de un mes.",
      ),
    },
    {
      name: ml("Blocos de trabalho com pausa ativa", "Work blocks with active breaks", "Bloques de trabajo con pausa activa"),
      age: ml("6-16 anos", "6-16 years", "6-16 años"),
      duration: ml("Uma aula", "One class", "Una clase"),
      description: ml(
        "Reorganiza a aula em blocos curtos com pausa de movimento entre eles, em vez de exigir atenção contínua.",
        "Reorganises the class into short blocks with a movement break between them, instead of demanding continuous attention.",
        "Reorganiza la clase en bloques cortos con pausa de movimiento entre ellos, en vez de exigir atención continua.",
      ),
      materials: mlList(
        ["Cronômetro ou timer visual", "Cartão indicando quantos blocos faltam"],
        ["A timer, ideally visual", "A card showing how many blocks are left"],
        ["Cronómetro o temporizador visual", "Tarjeta que indique cuántos bloques faltan"],
      ),
      implementation: ml(
        "Divida a aula em blocos de 10 a 15 minutos, com 2 minutos de movimento entre eles.",
        "Split the class into 10 to 15 minute blocks, with 2 minutes of movement between them.",
        "Divida la clase en bloques de 10 a 15 minutos, con 2 minutos de movimiento entre ellos.",
      ),
      objectives: mlList(
        ["Atenção sustentada", "Autorregulação", "Menos comportamento disruptivo"],
        ["Sustained attention", "Self-regulation", "Less disruptive behaviour"],
        ["Atención sostenida", "Autorregulación", "Menos conducta disruptiva"],
      ),
      authorship: "adapted" as const,
      citations: [SCHOOL_RCT],
      stepByStep: mlList(
        [
          "Divida o conteúdo da aula em blocos de 10 a 15 minutos",
          "Deixe visível quantos blocos a aula terá",
          "Use um timer que o aluno consiga ver",
          "Entre os blocos, 2 minutos de movimento — alongar, buscar material, apagar o quadro",
          "A pausa acontece mesmo que o bloco não tenha rendido",
          "Ao fim, marque com o aluno quantos blocos ele concluiu",
        ],
        [
          "Split the lesson content into 10 to 15 minute blocks",
          "Make visible how many blocks the class will have",
          "Use a timer the student can see",
          "Between blocks, 2 minutes of movement — stretching, fetching materials, cleaning the board",
          "The break happens even if the block was unproductive",
          "At the end, mark with the student how many blocks they completed",
        ],
        [
          "Divida el contenido de la clase en bloques de 10 a 15 minutos",
          "Deje visible cuántos bloques tendrá la clase",
          "Use un temporizador que el alumno pueda ver",
          "Entre bloques, 2 minutos de movimiento — estirarse, buscar material, borrar el pizarrón",
          "La pausa ocurre aunque el bloque no haya rendido",
          "Al final, marque con el alumno cuántos bloques completó",
        ],
      ),
      tips: mlList(
        ["Timer visual funciona melhor que contagem verbal", "Se o aluno resiste à volta, encurte o bloco em vez de alongar a pausa"],
        ["A visual timer works better than counting out loud", "If the student resists returning, shorten the block instead of extending the break"],
        ["El temporizador visual funciona mejor que la cuenta verbal", "Si el alumno resiste volver, acorte el bloque en vez de alargar la pausa"],
      ),
      variations: mlList(
        ["Pausa individual, com cartão de saída, para quem se expõe demais na pausa coletiva"],
        ["An individual break with an exit card, for students who feel exposed during a whole-class break"],
        ["Pausa individual, con tarjeta de salida, para quien se expone demasiado en la pausa colectiva"],
      ),
      assessment: ml(
        "Registre quantos blocos o aluno completa sem interrupção e observe se o número cresce ao longo das semanas.",
        "Record how many blocks the student completes without interruption and watch whether the number grows over the weeks.",
        "Registre cuántos bloques completa el alumno sin interrupción y observe si el número crece con las semanas.",
      ),
    },
    {
      name: ml("Mapa de gatilhos da sala", "Classroom trigger map", "Mapa de desencadenantes del aula"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("Uma semana de observação", "One week of observation", "Una semana de observación"),
      description: ml(
        "Um registro simples de onde, quando e antes do quê as dificuldades aparecem — para agir no antecedente em vez da consequência.",
        "A simple record of where, when and before what the difficulties appear — to act on the antecedent instead of the consequence.",
        "Un registro simple de dónde, cuándo y antes de qué aparecen las dificultades — para actuar sobre el antecedente en vez de la consecuencia.",
      ),
      materials: mlList(
        ["Tabela impressa com horário, situação e o que veio antes"],
        ["A printed table with time, situation and what came before"],
        ["Tabla impresa con horario, situación y qué vino antes"],
      ),
      implementation: ml(
        "Registre por cinco dias e procure o padrão antes de mudar qualquer coisa.",
        "Record for five days and look for the pattern before changing anything.",
        "Registre durante cinco días y busque el patrón antes de cambiar nada.",
      ),
      objectives: mlList(
        ["Identificar o gatilho real", "Intervir no antecedente", "Decidir com dado, não com impressão"],
        ["Identify the real trigger", "Intervene on the antecedent", "Decide with data, not impressions"],
        ["Identificar el desencadenante real", "Intervenir en el antecedente", "Decidir con datos, no con impresiones"],
      ),
      authorship: "adapted" as const,
      citations: [CDC, PSYCHOSOCIAL],
      stepByStep: mlList(
        [
          "Monte uma tabela com quatro colunas: horário, o que estava acontecendo, o que veio antes, o que aconteceu depois",
          "Registre por cinco dias, sem tentar corrigir nada ainda",
          "Ao fim da semana, procure repetições de horário ou de tipo de atividade",
          "Escolha um único gatilho para alterar",
          "Mude o antecedente e registre mais cinco dias",
          "Compare as duas semanas antes de concluir",
        ],
        [
          "Build a table with four columns: time, what was happening, what came before, what happened after",
          "Record for five days without trying to fix anything yet",
          "At the end of the week, look for repeats of time or activity type",
          "Choose a single trigger to change",
          "Change the antecedent and record five more days",
          "Compare the two weeks before drawing conclusions",
        ],
        [
          "Arme una tabla con cuatro columnas: horario, qué estaba pasando, qué vino antes, qué pasó después",
          "Registre durante cinco días, sin intentar corregir nada aún",
          "Al final de la semana, busque repeticiones de horario o de tipo de actividad",
          "Elija un único desencadenante para modificar",
          "Cambie el antecedente y registre cinco días más",
          "Compare las dos semanas antes de concluir",
        ],
      ),
      tips: mlList(
        ["Registre também os dias bons: eles mostram o que já funciona", "Uma linha por episódio, escrita na hora — memória do fim do dia distorce"],
        ["Record the good days too: they show what already works", "One line per episode, written on the spot — end-of-day memory distorts"],
        ["Registre también los días buenos: muestran lo que ya funciona", "Una línea por episodio, escrita en el momento — la memoria del final del día distorsiona"],
      ),
      variations: mlList(
        ["Versão compartilhada entre os professores da turma, para ver o padrão em várias disciplinas"],
        ["A version shared among the class's teachers, to see the pattern across subjects"],
        ["Versión compartida entre los docentes del grupo, para ver el patrón en varias asignaturas"],
      ),
      assessment: ml(
        "Compare a frequência dos episódios na semana de observação e na semana seguinte à mudança.",
        "Compare episode frequency in the observation week and in the week after the change.",
        "Compare la frecuencia de los episodios en la semana de observación y en la semana posterior al cambio.",
      ),
    },
  ]

  const courses = [
    // Cadastrados pelo mantenedor; URLs verificadas.
    {
      title: ml(
        "Transtorno do Déficit de Atenção e Hiperatividade",
        "Attention Deficit Hyperactivity Disorder",
        "Trastorno por Déficit de Atención e Hiperactividad",
      ),
      provider: "Ginead",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: true,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "pt" as const,
      url: "https://www.ginead.com.br/curso/curso-online-gratis-transtorno-do-deficit-de-atencao-e-hiperatividade",
    },
    {
      title: ml(
        "Curso grátis de TDAH",
        "Free ADHD course",
        "Curso gratuito de TDAH",
      ),
      provider: "WR Educacional",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: true,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "pt" as const,
      url: "https://www.wreducacional.com.br/curso-gratis-de-transtorno-do-deficit-de-atencao-e-hiperatividade",
    },
    {
      title: ml("TDAH — Curso Completo", "ADHD — Full Course", "TDAH — Curso Completo"),
      provider: "Ello Cursos",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Consultar", "On request", "Consultar"),
      certificate: true,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "pt" as const,
      url: "https://www.ellocursos.com.br/tdah/",
    },
    {
      title: ml("Introdução ao TDAH", "Introduction to ADHD", "Introducción al TDAH"),
      provider: "IPED",
      duration: ml("Curso rápido", "Short course", "Curso rápido"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: true,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "pt" as const,
      url: "https://www.iped.com.br/cursos-gratis/educacao-e-pedagogia/curso-rapido/introducao-tdah",
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
      title: ml("ADHD in the Classroom — CDC", "ADHD in the Classroom — CDC", "TDAH en el Aula — CDC"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Guia oficial do CDC com as estratégias de manejo comportamental em sala com suporte na literatura.",
        "Official CDC guide with the classroom behaviour management strategies supported by the literature.",
        "Guía oficial del CDC con las estrategias de manejo conductual en el aula respaldadas por la literatura.",
      ),
      featured: true,
      url: "https://www.cdc.gov/adhd/treatment/classroom.html",
      publisher: "Centers for Disease Control and Prevention",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "Meta-análise do Daily Report Card (texto completo)",
        "Daily Report Card meta-analysis (full text)",
        "Meta-análisis de la Daily Report Card (texto completo)",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Estudo completo por trás do efeito médio de 0,61 — útil para justificar a prática junto à coordenação.",
        "The full study behind the 0.61 average effect — useful to justify the practice to school leadership.",
        "El estudio completo detrás del efecto medio de 0,61 — útil para justificar la práctica ante la coordinación.",
      ),
      featured: true,
      url: "https://files.eric.ed.gov/fulltext/ED583708.pdf",
      publisher: "ERIC — Institute of Education Sciences",
      language: "en" as const,
      format: "PDF" as const,
    },
    {
      title: ml("CHADD — materiais para educadores", "CHADD — resources for educators", "CHADD — materiales para educadores"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Organização de referência em TDAH, com material específico para professores.",
        "A reference organisation on ADHD, with material aimed specifically at teachers.",
        "Organización de referencia en TDAH, con material específico para docentes.",
      ),
      featured: false,
      url: "https://www.understood.org/en/articles/classroom-accommodations-for-adhd",
      publisher: "Understood",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "Intervenções escolares para TDAH — revisão de ensaios randomizados",
        "School interventions for ADHD — review of randomised trials",
        "Intervenciones escolares para TDAH — revisión de ensayos aleatorizados",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Revisão sistemática e meta-análise de 2025 sobre o que funciona no contexto escolar.",
        "A 2025 systematic review and meta-analysis of what works in the school context.",
        "Revisión sistemática y meta-análisis de 2025 sobre lo que funciona en el contexto escolar.",
      ),
      featured: false,
      url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1611145/full",
      publisher: "Frontiers in Psychology",
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
