import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Discalculia — área nova.
 *
 * A base aqui é o guia prático do What Works Clearinghouse (IES) sobre
 * intervenção em matemática. É um documento de recomendações graduadas por
 * força de evidência — exatamente o tipo de fonte que o site precisa: diz o
 * que fazer e o quanto a pesquisa sustenta cada recomendação.
 *
 * Muita coisa publicada sobre discalculia na internet vem de sites comerciais
 * vendendo método. Nada disso entrou.
 */

const WWC_PDF: Citation = {
  label: "IES / What Works Clearinghouse — guia prático de intervenção em matemática (PDF, 2021)",
  url: "https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/WWC2021006-Math-PG.pdf",
}

const WWC_2021: Citation = {
  label: "WWC — Assisting Students Struggling with Mathematics: intervenção nos anos iniciais",
  url: "https://ies.ed.gov/ncee/wwc/practiceguide/26",
}

const WWC_2009: Citation = {
  label: "WWC — resposta à intervenção em matemática, ensino fundamental (guia de 2009)",
  url: "https://ies.ed.gov/ncee/wwc/practiceguide/2",
}

const ERIC_RTI: Citation = {
  label: "ERIC — registro completo do guia de resposta à intervenção em matemática",
  url: "https://eric.ed.gov/?id=ED504995",
}

const NCII: Citation = {
  label: "National Center on Intensive Intervention — intensificar quando o progresso não vem",
  url: "https://intensiveintervention.org/",
}

const PROGRESS: Citation = {
  label: "Progress Center — práticas instrucionais com evidência",
  url: "https://promotingprogress.org/resource-collections/evidence-based-instructional-practices",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")
const AVANCADO = ml("Avançado", "Advanced", "Avanzado")

export function discalculiaData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Instrução explícita e sistemática", "Explicit, systematic instruction", "Instrucción explícita y sistemática"),
      description: ml(
        "Demonstrar o procedimento em voz alta, praticar junto e só então soltar. É a recomendação com maior força de evidência no guia do WWC.",
        "Demonstrate the procedure aloud, practise together and only then release. It is the recommendation with the strongest evidence in the WWC guide.",
        "Demostrar el procedimiento en voz alta, practicar juntos y solo entonces soltar. Es la recomendación con mayor fuerza de evidencia en la guía del WWC.",
      ),
      tips: mlList(
        [
          "Pense em voz alta enquanto resolve: o raciocínio precisa ficar audível",
          "Prática guiada antes da prática independente — é a etapa mais pulada",
          "Descoberta livre não funciona aqui; o aluno precisa de instrução direta",
          "Corrija imediatamente: erro repetido consolida o erro",
        ],
        [
          "Think aloud while solving: the reasoning must be audible",
          "Guided practice before independent practice — the most skipped stage",
          "Free discovery does not work here; the student needs direct instruction",
          "Correct immediately: a repeated error consolidates the error",
        ],
        [
          "Piense en voz alta mientras resuelve: el razonamiento debe ser audible",
          "Práctica guiada antes de la independiente — es la etapa más saltada",
          "El descubrimiento libre no funciona aquí; el alumno necesita instrucción directa",
          "Corrija de inmediato: el error repetido consolida el error",
        ],
      ),
      evidence: "established" as const,
      citations: [WWC_PDF, WWC_2021],
      difficulty: BASICO,
    },
    {
      title: ml("Sequência concreto–representacional–abstrato", "Concrete–representational–abstract sequence", "Secuencia concreto–representacional–abstracto"),
      description: ml(
        "Manipular o material, depois desenhar a situação, e só então usar o símbolo. Pular a etapa concreta é a causa mais comum de decoreba sem sentido.",
        "Handle the material, then draw the situation, and only then use the symbol. Skipping the concrete stage is the most common cause of meaningless memorisation.",
        "Manipular el material, después dibujar la situación, y solo entonces usar el símbolo. Saltar la etapa concreta es la causa más común de memorización sin sentido.",
      ),
      tips: mlList(
        [
          "As três etapas na mesma aula, nomeando a correspondência entre elas",
          "Não retire o concreto cedo: retire quando o desenho já bastar",
          "Reta numérica é o representacional mais versátil — use sempre a mesma",
          "Se o aluno regride, volte uma etapa em vez de repetir a mesma",
        ],
        [
          "All three stages in the same lesson, naming the correspondence between them",
          "Do not remove the concrete early: remove it when the drawing suffices",
          "The number line is the most versatile representation — always use the same one",
          "If the student regresses, step back one stage instead of repeating the same one",
        ],
        [
          "Las tres etapas en la misma clase, nombrando la correspondencia entre ellas",
          "No retire lo concreto pronto: retírelo cuando el dibujo ya baste",
          "La recta numérica es la representación más versátil — use siempre la misma",
          "Si el alumno retrocede, vuelva una etapa en vez de repetir la misma",
        ],
      ),
      evidence: "established" as const,
      citations: [WWC_PDF, PROGRESS],
      difficulty: BASICO,
    },
    {
      title: ml("Senso numérico e magnitude", "Number sense and magnitude", "Sentido numérico y magnitud"),
      description: ml(
        "Antes de operar, o aluno precisa entender que número representa quantidade e que os números têm tamanho relativo entre si.",
        "Before operating, the student needs to grasp that a number represents a quantity and that numbers have relative size to one another.",
        "Antes de operar, el alumno necesita entender que el número representa cantidad y que los números tienen tamaño relativo entre sí.",
      ),
      tips: mlList(
        [
          "Pergunte 'qual é maior?' antes de pedir cálculo",
          "Estimativa antes da conta: 'mais ou menos quanto vai dar?'",
          "Use a reta numérica para localizar, não só para contar",
          "Dificuldade em comparar quantidades explica erro de operação lá na frente",
        ],
        [
          "Ask 'which is bigger?' before asking for a calculation",
          "Estimate before computing: 'roughly how much will it be?'",
          "Use the number line to locate, not only to count",
          "Difficulty comparing quantities explains operation errors much later",
        ],
        [
          "Pregunte '¿cuál es mayor?' antes de pedir el cálculo",
          "Estimación antes de la cuenta: '¿más o menos cuánto va a dar?'",
          "Use la recta numérica para ubicar, no solo para contar",
          "La dificultad para comparar cantidades explica errores de operación más adelante",
        ],
      ),
      evidence: "established" as const,
      citations: [WWC_PDF, WWC_2009],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Fluência em fatos básicos", "Fluency with basic facts", "Fluidez en hechos básicos"),
      description: ml(
        "Automatizar as operações elementares libera memória de trabalho para o problema. Contar nos dedos aos 12 anos consome toda a atenção disponível.",
        "Automating elementary facts frees working memory for the problem. Counting on fingers at twelve consumes all available attention.",
        "Automatizar las operaciones elementales libera memoria de trabajo para el problema. Contar con los dedos a los doce consume toda la atención disponible.",
      ),
      tips: mlList(
        [
          "Sessões curtas e diárias, de 5 a 10 minutos",
          "Trabalhe famílias de fatos, não tabuada solta",
          "Prática com tempo só depois que a precisão estiver alta",
          "Automatizar não é decorar sem entender: vem depois do sentido, não antes",
        ],
        [
          "Short daily sessions, 5 to 10 minutes",
          "Work on fact families, not isolated times tables",
          "Timed practice only once accuracy is high",
          "Automating is not memorising blindly: it comes after meaning, not before",
        ],
        [
          "Sesiones cortas y diarias, de 5 a 10 minutos",
          "Trabaje familias de hechos, no tablas sueltas",
          "Práctica cronometrada solo después de que la precisión sea alta",
          "Automatizar no es memorizar sin entender: viene después del sentido, no antes",
        ],
      ),
      evidence: "established" as const,
      citations: [WWC_PDF, WWC_2021],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Problemas com estrutura explícita", "Word problems with explicit structure", "Problemas con estructura explícita"),
      description: ml(
        "Ensinar a reconhecer o tipo de problema, não apenas a procurar palavras-chave. 'Ao todo' nem sempre significa somar.",
        "Teach recognising the problem type, not just hunting for keywords. 'Altogether' does not always mean add.",
        "Enseñar a reconocer el tipo de problema, no solo a buscar palabras clave. 'En total' no siempre significa sumar.",
      ),
      tips: mlList(
        [
          "Classifique os problemas por estrutura: juntar, separar, comparar",
          "Palavra-chave engana; a estrutura, não",
          "Peça que o aluno represente o problema antes de calcular",
          "Trabalhe problemas sem número primeiro: 'o que está sendo perguntado?'",
        ],
        [
          "Classify problems by structure: combine, separate, compare",
          "Keywords mislead; structure does not",
          "Ask the student to represent the problem before calculating",
          "Work on problems without numbers first: 'what is being asked?'",
        ],
        [
          "Clasifique los problemas por estructura: juntar, separar, comparar",
          "La palabra clave engaña; la estructura, no",
          "Pida que el alumno represente el problema antes de calcular",
          "Trabaje problemas sin números primero: '¿qué se está preguntando?'",
        ],
      ),
      evidence: "established" as const,
      citations: [WWC_PDF, WWC_2009],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Reduzir a carga que não é matemática", "Reduce the non-mathematical load", "Reducir la carga que no es matemática"),
      description: ml(
        "Enunciado longo, letra apertada e cópia do quadro consomem recursos que deveriam ir para o raciocínio.",
        "Long wording, cramped type and copying from the board consume resources that should go to reasoning.",
        "Enunciado largo, letra apretada y copia del pizarrón consumen recursos que deberían ir al razonamiento.",
      ),
      tips: mlList(
        [
          "Entregue a folha pronta em vez de exigir cópia do quadro",
          "Menos questões por página, com espaço para o cálculo",
          "Permita a tabela de fatos na avaliação que não mede fatos",
          "Enunciado curto, uma informação por frase",
        ],
        [
          "Hand out a ready-made sheet instead of requiring copying from the board",
          "Fewer questions per page, with space for working out",
          "Allow the fact table in assessments that do not measure facts",
          "Short wording, one piece of information per sentence",
        ],
        [
          "Entregue la hoja lista en vez de exigir copia del pizarrón",
          "Menos preguntas por página, con espacio para el cálculo",
          "Permita la tabla de hechos en la evaluación que no mide hechos",
          "Enunciado corto, una información por frase",
        ],
      ),
      evidence: "emerging" as const,
      citations: [WWC_2021, PROGRESS],
      difficulty: BASICO,
    },
    {
      title: ml("Monitorar e intensificar", "Monitor and intensify", "Monitorear e intensificar"),
      description: ml(
        "Medir uma habilidade toda semana e aumentar a dose quando a linha não sobe — mais tempo, grupo menor, mais repetição.",
        "Measure one skill every week and increase the dose when the line does not rise — more time, smaller group, more repetition.",
        "Medir una habilidad cada semana y aumentar la dosis cuando la línea no sube — más tiempo, grupo menor, más repetición.",
      ),
      tips: mlList(
        [
          "Uma medida objetiva por semana, que leve menos de um minuto",
          "Olhe a inclinação ao longo de quatro semanas, não o ponto do dia",
          "Antes de trocar de método, confirme se ele foi aplicado como previsto",
          "Sessão diária curta rende mais que sessão semanal longa",
        ],
        [
          "One objective measure per week, taking under a minute",
          "Look at the slope over four weeks, not at a single day's point",
          "Before changing method, confirm it was delivered as planned",
          "A short daily session achieves more than a long weekly one",
        ],
        [
          "Una medida objetiva por semana, que tome menos de un minuto",
          "Mire la inclinación a lo largo de cuatro semanas, no el punto del día",
          "Antes de cambiar de método, confirme que se aplicó según lo previsto",
          "Una sesión diaria corta rinde más que una sesión semanal larga",
        ],
      ),
      evidence: "established" as const,
      citations: [NCII, WWC_2021],
      difficulty: AVANCADO,
    },
  ]

  const activities = [
    {
      name: ml("Reta numérica de bolso", "Pocket number line", "Recta numérica de bolsillo"),
      age: ml("6-14 anos", "6-14 years", "6-14 años"),
      duration: ml("20 min para montar, uso contínuo", "20 min to make, ongoing use", "20 min para armar, uso continuo"),
      description: ml(
        "Uma reta numérica pessoal que o aluno usa para localizar, comparar e operar — o mesmo apoio visual em todas as aulas.",
        "A personal number line the student uses to locate, compare and operate — the same visual support in every lesson.",
        "Una recta numérica personal que el alumno usa para ubicar, comparar y operar — el mismo apoyo visual en todas las clases.",
      ),
      materials: mlList(
        ["Tira de cartolina ou papel resistente", "Régua", "Caneta", "Fita para prender na carteira"],
        ["A strip of card or sturdy paper", "A ruler", "A pen", "Tape to fix it to the desk"],
        ["Tira de cartulina o papel resistente", "Regla", "Bolígrafo", "Cinta para fijarla al pupitre"],
      ),
      implementation: ml(
        "Construa a reta junto com o aluno e use-a como apoio permanente, inclusive na avaliação.",
        "Build the line together with the student and use it as a permanent support, including during assessment.",
        "Construya la recta junto al alumno y úsela como apoyo permanente, incluso en la evaluación.",
      ),
      objectives: mlList(
        ["Senso de magnitude", "Apoio para operar", "Autonomia"],
        ["Sense of magnitude", "Support for operating", "Autonomy"],
        ["Sentido de magnitud", "Apoyo para operar", "Autonomía"],
      ),
      authorship: "adapted" as const,
      citations: [WWC_PDF, PROGRESS],
      stepByStep: mlList(
        [
          "Decida com o aluno o intervalo: 0 a 20 no início, ampliando depois",
          "Marque os números juntos, com espaçamento igual — a proporção importa",
          "Destaque os pontos de referência: 0, 5, 10, 20",
          "Pratique localizar antes de operar: 'onde fica o 7?'",
          "Depois use para comparar: 'qual está mais longe do zero?'",
          "Só então use para somar e subtrair, andando na reta",
        ],
        [
          "Decide the range with the student: 0 to 20 at first, extending later",
          "Mark the numbers together, evenly spaced — the proportion matters",
          "Highlight the anchor points: 0, 5, 10, 20",
          "Practise locating before operating: 'where is 7?'",
          "Then use it to compare: 'which is further from zero?'",
          "Only then use it to add and subtract, moving along the line",
        ],
        [
          "Decida con el alumno el intervalo: 0 a 20 al inicio, ampliando después",
          "Marquen los números juntos, con espaciado igual — la proporción importa",
          "Destaque los puntos de referencia: 0, 5, 10, 20",
          "Practique ubicar antes de operar: '¿dónde está el 7?'",
          "Después úsela para comparar: '¿cuál está más lejos del cero?'",
          "Solo entonces úsela para sumar y restar, caminando por la recta",
        ],
      ),
      tips: mlList(
        ["Espaçamento desigual destrói o sentido de magnitude — meça", "Deixe a reta disponível na prova; ela não é cola, é acesso"],
        ["Uneven spacing destroys the sense of magnitude — measure it", "Keep the line available during the test; it is not cheating, it is access"],
        ["El espaciado desigual destruye el sentido de magnitud — mídalo", "Deje la recta disponible en la prueba; no es trampa, es acceso"],
      ),
      variations: mlList(
        ["Versão com frações, para os anos finais", "Versão vertical, útil para termômetro e números negativos"],
        ["A fractions version, for later years", "A vertical version, useful for thermometers and negative numbers"],
        ["Versión con fracciones, para los años finales", "Versión vertical, útil para termómetro y números negativos"],
      ),
      assessment: ml(
        "Peça que localize cinco números novos sem contar um a um; a estimativa direta indica senso de magnitude.",
        "Ask them to locate five new numbers without counting one by one; direct estimation indicates a sense of magnitude.",
        "Pida que ubique cinco números nuevos sin contar uno a uno; la estimación directa indica sentido de magnitud.",
      ),
    },
    {
      name: ml("Classificar problemas por estrutura", "Sorting word problems by structure", "Clasificar problemas por estructura"),
      age: ml("8-16 anos", "8-16 years", "8-16 años"),
      duration: ml("30 min", "30 min", "30 min"),
      description: ml(
        "O aluno separa problemas por tipo antes de resolver qualquer um — quebra o hábito de caçar palavra-chave.",
        "The student sorts problems by type before solving any — breaking the habit of hunting for keywords.",
        "El alumno separa problemas por tipo antes de resolver ninguno — rompe el hábito de cazar palabras clave.",
      ),
      materials: mlList(
        ["Oito problemas impressos e recortados", "Três cartões de categoria: juntar, separar, comparar"],
        ["Eight printed and cut-out problems", "Three category cards: combine, separate, compare"],
        ["Ocho problemas impresos y recortados", "Tres tarjetas de categoría: juntar, separar, comparar"],
      ),
      implementation: ml(
        "Classificar primeiro, resolver depois — e discutir por que dois problemas parecidos caem em categorias diferentes.",
        "Sort first, solve later — and discuss why two similar-looking problems fall into different categories.",
        "Clasificar primero, resolver después — y discutir por qué dos problemas parecidos caen en categorías distintas.",
      ),
      objectives: mlList(
        ["Reconhecer a estrutura", "Escolher a operação certa", "Reduzir erro por palavra-chave"],
        ["Recognising structure", "Choosing the right operation", "Fewer keyword-driven errors"],
        ["Reconocer la estructura", "Elegir la operación correcta", "Reducir el error por palabra clave"],
      ),
      authorship: "adapted" as const,
      citations: [WWC_PDF, WWC_2009],
      stepByStep: mlList(
        [
          "Escolha oito problemas: alguns com palavra-chave enganosa de propósito",
          "Peça que o aluno classifique todos antes de resolver qualquer um",
          "Pergunte por que colocou cada um naquela pilha",
          "Mostre dois problemas com a mesma palavra-chave e operações diferentes",
          "Só então resolvam juntos, um de cada categoria",
          "Termine pedindo que ele crie um problema de cada tipo",
        ],
        [
          "Choose eight problems: some with deliberately misleading keywords",
          "Ask the student to sort them all before solving any",
          "Ask why they put each one in that pile",
          "Show two problems with the same keyword and different operations",
          "Only then solve together, one from each category",
          "Finish by asking them to write one problem of each type",
        ],
        [
          "Elija ocho problemas: algunos con palabra clave engañosa a propósito",
          "Pida que el alumno los clasifique todos antes de resolver ninguno",
          "Pregunte por qué puso cada uno en esa pila",
          "Muestre dos problemas con la misma palabra clave y operaciones distintas",
          "Solo entonces resuelvan juntos, uno de cada categoría",
          "Termine pidiendo que cree un problema de cada tipo",
        ],
      ),
      tips: mlList(
        ["Criar o problema revela a compreensão melhor que resolvê-lo", "Se ele acerta a classificação e erra a conta, o problema é outro — e é bom saber"],
        ["Writing a problem reveals understanding better than solving one", "If they sort correctly but miscalculate, the difficulty is elsewhere — and that is useful to know"],
        ["Crear el problema revela la comprensión mejor que resolverlo", "Si acierta la clasificación y falla la cuenta, la dificultad es otra — y es útil saberlo"],
      ),
      variations: mlList(
        ["Versão sem números, só com a situação descrita", "Versão em dupla, um classifica e o outro confere"],
        ["A version without numbers, only the described situation", "A paired version, one sorts and the other checks"],
        ["Versión sin números, solo con la situación descrita", "Versión en pareja, uno clasifica y el otro verifica"],
      ),
      assessment: ml(
        "Dê cinco problemas novos e conte quantos ele classifica corretamente antes de calcular.",
        "Give five new problems and count how many are sorted correctly before any calculation.",
        "Dé cinco problemas nuevos y cuente cuántos clasifica correctamente antes de calcular.",
      ),
    },
    {
      name: ml("Cinco minutos de fatos por dia", "Five minutes of facts a day", "Cinco minutos de hechos por día"),
      age: ml("7-14 anos", "7-14 years", "7-14 años"),
      duration: ml("5 min por dia", "5 min a day", "5 min por día"),
      description: ml(
        "Rotina curta e diária para automatizar fatos básicos, com registro do próprio progresso.",
        "A short daily routine to automate basic facts, with the student tracking their own progress.",
        "Rutina corta y diaria para automatizar hechos básicos, con registro del propio progreso.",
      ),
      materials: mlList(
        ["Cartões de fatos por família", "Cronômetro", "Gráfico de acompanhamento"],
        ["Fact cards by family", "A timer", "A tracking chart"],
        ["Tarjetas de hechos por familia", "Cronómetro", "Gráfico de seguimiento"],
      ),
      implementation: ml(
        "Trabalhe uma família de fatos por vez, priorizando precisão antes de velocidade.",
        "Work on one fact family at a time, prioritising accuracy before speed.",
        "Trabaje una familia de hechos por vez, priorizando precisión antes que velocidad.",
      ),
      objectives: mlList(
        ["Automatização", "Liberar memória de trabalho", "Confiança"],
        ["Automaticity", "Freeing working memory", "Confidence"],
        ["Automatización", "Liberar memoria de trabajo", "Confianza"],
      ),
      authorship: "adapted" as const,
      citations: [WWC_PDF, NCII],
      stepByStep: mlList(
        [
          "Escolha uma família de fatos, por exemplo tudo que soma 10",
          "Trabalhe primeiro só a precisão, sem cronômetro",
          "Quando acertar todos, aí sim introduza o tempo",
          "Registre no gráfico quantos ele acerta em um minuto",
          "Só passe à família seguinte quando a atual estiver automática",
          "Revise as famílias anteriores uma vez por semana",
        ],
        [
          "Choose a fact family, for example everything that adds to 10",
          "Work on accuracy only at first, with no timer",
          "Once all are correct, then introduce timing",
          "Record on the chart how many they get right in one minute",
          "Move to the next family only when the current one is automatic",
          "Review previous families once a week",
        ],
        [
          "Elija una familia de hechos, por ejemplo todo lo que suma 10",
          "Trabaje primero solo la precisión, sin cronómetro",
          "Cuando acierte todos, entonces introduzca el tiempo",
          "Registre en el gráfico cuántos acierta en un minuto",
          "Pase a la familia siguiente solo cuando la actual esté automática",
          "Repase las familias anteriores una vez por semana",
        ],
      ),
      tips: mlList(
        ["Cronômetro antes da precisão gera ansiedade e consolida erro", "Cinco minutos todo dia rende mais que trinta uma vez por semana"],
        ["Timing before accuracy creates anxiety and consolidates errors", "Five minutes every day achieves more than thirty once a week"],
        ["El cronómetro antes de la precisión genera ansiedad y consolida el error", "Cinco minutos todos los días rinden más que treinta una vez por semana"],
      ),
      variations: mlList(
        ["Versão em dupla, cada um cronometrando o outro", "Versão com aplicativo, desde que o professor acompanhe o registro"],
        ["A paired version, each timing the other", "An app version, as long as the teacher follows the record"],
        ["Versión en pareja, cada uno cronometrando al otro", "Versión con aplicación, siempre que el docente siga el registro"],
      ),
      assessment: ml(
        "O gráfico é a medida. Compare a inclinação ao longo de um mês, não o resultado de um dia.",
        "The chart is the measure. Compare the slope over a month, not one day's result.",
        "El gráfico es la medida. Compare la inclinación a lo largo de un mes, no el resultado de un día.",
      ),
    },
  ]

  const courses: never[] = []

  const resources = [
    {
      title: ml(
        "Guia prático de intervenção em matemática (WWC)",
        "Practice guide: intervention in mathematics (WWC)",
        "Guía práctica de intervención en matemáticas (WWC)",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Recomendações graduadas por força de evidência, do que fazer em intervenção de matemática. É a fonte que sustenta esta área.",
        "Recommendations graded by strength of evidence on what to do in maths intervention. It is the source underpinning this area.",
        "Recomendaciones graduadas por fuerza de evidencia sobre qué hacer en intervención de matemáticas. Es la fuente que sustenta esta área.",
      ),
      featured: true,
      url: "https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/WWC2021006-Math-PG.pdf",
      publisher: "IES / What Works Clearinghouse",
      language: "en" as const,
      format: "PDF" as const,
    },
    {
      title: ml(
        "Intervenção em matemática nos anos iniciais",
        "Mathematics intervention in the elementary grades",
        "Intervención en matemáticas en los años iniciales",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Página do guia de 2021, com resumo das recomendações e o nível de evidência de cada uma.",
        "The 2021 guide's page, summarising the recommendations and the evidence level of each.",
        "Página de la guía de 2021, con resumen de las recomendaciones y el nivel de evidencia de cada una.",
      ),
      featured: true,
      url: "https://ies.ed.gov/ncee/wwc/practiceguide/26",
      publisher: "IES / What Works Clearinghouse",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml(
        "Resposta à intervenção em matemática",
        "Response to intervention in mathematics",
        "Respuesta a la intervención en matemáticas",
      ),
      type: ml("Evidência", "Evidence", "Evidencia"),
      description: ml(
        "Guia anterior, com oito recomendações sobre identificar e atender alunos com dificuldade em matemática.",
        "The earlier guide, with eight recommendations on identifying and supporting students struggling with maths.",
        "Guía anterior, con ocho recomendaciones sobre identificar y atender alumnos con dificultad en matemáticas.",
      ),
      featured: false,
      url: "https://ies.ed.gov/ncee/wwc/practiceguide/2",
      publisher: "IES / What Works Clearinghouse",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Registro completo no ERIC", "Full record on ERIC", "Registro completo en ERIC"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Ficha bibliográfica do guia, útil para citar em documento de escola ou trabalho acadêmico.",
        "The guide's bibliographic record, useful for citing in school documents or academic work.",
        "Ficha bibliográfica de la guía, útil para citar en documento escolar o trabajo académico.",
      ),
      featured: false,
      url: "https://eric.ed.gov/?id=ED504995",
      publisher: "ERIC — Institute of Education Sciences",
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
