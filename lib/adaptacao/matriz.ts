import { ml } from "@/lib/i18n-content"
import type { LocalizedText } from "@/lib/i18n-content"
import type { Citation, EvidenceLevel } from "@/components/specialty/types"
import type { BarreiraId } from "./barreiras"

/**
 * O que cada barreira medida significa para cada especialidade.
 *
 * Esta é a metade do trabalho que **precisa de fonte**. O detector conta que a
 * questão tem 6 números e 8 frases; dizer que isso satura a memória de trabalho
 * de um aluno com discalculia é afirmação pedagógica, e vale aqui a regra do
 * resto do site: nada entra sem citação que o `npm run check:links` valide.
 *
 * ## Por que a matriz é quase toda vazia, e por que isso está certo
 *
 * São 8 barreiras × 14 especialidades = 112 pares possíveis, e há 40 células
 * escritas. Não é rascunho: a maioria dos pares não tem conteúdo honesto a
 * dizer. Enunciado longo não é barreira central em altas habilidades, e forçar
 * um texto ali produziria exatamente o conselho genérico que este arquivo
 * existe para evitar — "dê tempo estendido e leia em voz alta", que não adapta
 * questão nenhuma.
 *
 * Célula ausente quer dizer **não escrita**, e `coberturaDaMatriz()` a mostra
 * como lacuna em vez de deixá-la passar por acabada. É a mesma convenção do
 * `cobertura()` dos guias, em `index.ts`.
 *
 * ## O que uma célula deve conter
 *
 * `oQueSignifica` explica o efeito sobre *este* aluno — não o que a barreira é,
 * que já está em `barreiras.ts`. `oQueFazer` é instrução aplicável na questão
 * que está na tela, e por isso fala das medidas ("entregue os 6 números numa
 * tabela à parte"), não de princípios. Se uma célula pudesse ser colada em
 * qualquer outra linha da matriz, ela está genérica demais e não deveria estar
 * aqui.
 */

export interface CelulaDaMatriz {
  barreira: BarreiraId
  /** Slug da especialidade, como em `SPECIALTIES`. */
  especialidade: string
  /** O que esta medida significa para este aluno. */
  oQueSignifica: LocalizedText
  /** O que o professor faz com a questão que está na tela. */
  oQueFazer: LocalizedText
  citations: Citation[]
  evidence?: EvidenceLevel
}

// --- Fontes ------------------------------------------------------------------
//
// Todas já em uso e validadas no site. Reaproveitá-las não é economia: é o que
// mantém a matriz apoiada no mesmo critério do conteúdo das especialidades —
// IES/What Works Clearinghouse, NCII, ERIC, órgãos oficiais.

const WWC_MATEMATICA_2021: Citation = {
  label: "IES / What Works Clearinghouse — Assisting Students Struggling with Mathematics (guia de 2021, PDF)",
  url: "https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/WWC2021006-Math-PG.pdf",
}

const WWC_RESOLUCAO: Citation = {
  label: "IES / What Works Clearinghouse — Improving Mathematical Problem Solving in Grades 4 Through 8 (PDF)",
  url: "https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/MPS_PG_043012.pdf",
}

const WWC_MATEMATICA_INICIAIS: Citation = {
  label: "WWC — Assisting Students Struggling with Mathematics: intervenção nos anos iniciais",
  url: "https://ies.ed.gov/ncee/wwc/practiceguide/26",
}

const WWC_ESCRITA_FINAIS: Citation = {
  label: "WWC — guia prático de escrita para os anos finais",
  url: "https://ies.ed.gov/ncee/wwc/practiceguide/28",
}

const NCII: Citation = {
  label: "NCII — National Center on Intensive Intervention",
  url: "https://intensiveintervention.org/",
}

const NCII_MATEMATICA: Citation = {
  label: "NCII — princípios para desenhar intervenção em matemática",
  url: "https://intensiveintervention.org/resource/principles-designing-intervention-mathematics",
}

const NCIL_DEFICIENCIA_INTELECTUAL: Citation = {
  label: "National Center on Improving Literacy — planejar o ensino de leitura na deficiência intelectual",
  url: "https://improvingliteracy.org/resource/considerations-when-planning-literacy-instruction-for-students-with-intellectual-disabilities/",
}

const NCIL_STRUCTURED_LITERACY: Citation = {
  label: "National Center on Improving Literacy — os traços do ensino estruturado de leitura",
  url: "https://improvingliteracy.org/resource/features-of-structured-literacy-instruction/",
}

const READING_ROCKETS_SL: Citation = {
  label: "Reading Rockets — Structured Literacy: os fundamentos",
  url: "https://www.readingrockets.org/topics/about-reading/articles/structured-literacy-instruction-basics",
}

const UNDERSTOOD_TDAH: Citation = {
  label: "Understood — adaptações de sala de aula para alunos com TDAH",
  url: "https://www.understood.org/en/articles/classroom-accommodations-for-adhd",
}

const CDC_TDAH: Citation = {
  label: "CDC — ADHD in the Classroom: estratégias de manejo comportamental",
  url: "https://www.cdc.gov/adhd/treatment/classroom.html",
}

const CDC_SAUDE_MENTAL: Citation = {
  label: "CDC — saúde mental e bem-estar na escola",
  url: "https://www.cdc.gov/healthy-youth/mental-health/index.html",
}

const CAST_UDL: Citation = {
  label: "CAST — Diretrizes do Desenho Universal para a Aprendizagem",
  url: "https://udlguidelines.cast.org/",
}

const PATHS_BRAILLE: Citation = {
  label: "Paths to Literacy — braille: estratégias, pré-braille e gráficos táteis",
  url: "https://www.pathstoliteracy.org/braille/",
}

const PATHS_SURDOCEGUEIRA: Citation = {
  label: "Paths to Literacy — letramento e surdocegueira",
  url: "https://www.pathstoliteracy.org/deafblindness/",
}

const PATHS_TECNOLOGIA: Citation = {
  label: "Paths to Literacy — tecnologia assistiva para leitura",
  url: "https://www.pathstoliteracy.org/technology/",
}

const APH: Citation = {
  label: "American Printing House — recursos educacionais",
  url: "https://www.aph.org/educational-resources/",
}

const NCDB_MODULOS: Citation = {
  label: "NCDB — módulos Open Hands, Open Access para interventores",
  url: "https://moodle.nationaldb.org/course/index.php",
}

const DSE_LEITURA: Citation = {
  label: "DSE — ensinar a ler na síndrome de Down",
  url: "https://www.down-syndrome.org/en-us/library/research-practice/01/1/teaching-down-syndrome-read/",
}

const DSE_MEMORIA: Citation = {
  label: "DSE — efeito do ensino de leitura sobre linguagem e memória (estudo de 4 anos)",
  url: "https://www.down-syndrome.org/en-us/library/research-practice/03/2/influence-reading-instruction-language-memory-development-down-syndrome/",
}

const IES_DOWN: Citation = {
  label: "IES — ensino de leitura para crianças com síndrome de Down",
  url: "https://ies.ed.gov/learn/blog/enhancing-reading-instruction-children-down-syndrome",
}

const RADLD: Citation = {
  label: "RADLD — campanha internacional de conscientização sobre TDL",
  url: "https://radld.org/",
}

const DLD_PROJECT: Citation = {
  label: "The DLD Project — formação baseada em evidência sobre TDL",
  url: "https://thedldproject.com/dld-training/",
}

const ASHA: Citation = {
  label: "ASHA — American Speech-Language-Hearing Association",
  url: "https://www.asha.org/",
}

const AFIRM_APOIOS_VISUAIS: Citation = {
  label: "AFIRM (FPG / UNC) — apoios visuais como prática com evidência no TEA",
  url: "https://afirm.fpg.unc.edu/visual-supports",
}

const NCAEP: Citation = {
  label: "NCAEP (2020) — 28 práticas com evidência para TEA, revisão 1990–2017",
  url: "https://autismpdc.fpg.unc.edu/ebps/",
}

const INES_DEBASI: Citation = {
  label: "INES — biblioteca digital com material em Libras e Português",
  url: "https://debasi.ines.gov.br/",
}

const INES: Citation = {
  label: "INES — Instituto Nacional de Educação de Surdos (MEC)",
  url: "https://www.ines.gov.br/",
}

const UCONN_SEM: Citation = {
  label: "UConn / Renzulli Center — pesquisa sobre o Schoolwide Enrichment Model",
  url: "https://gifted.uconn.edu/schoolwide-enrichment-model/semresearch/",
}

const ERIC_ENRIQUECIMENTO: Citation = {
  label: "Enriquecimento e pedagogia da educação de superdotados (ERIC, PDF)",
  url: "https://files.eric.ed.gov/fulltext/EJ1317646.pdf",
}

const CEEDAR_ALTERNATIVO: Citation = {
  label: "CEEDAR / Univ. da Flórida — práticas com evidência para deficiências severas (PDF)",
  url: "https://ceedar.education.ufl.edu/wp-content/uploads/2014/03/Evidence-based-Practices-for-Students-with-Severe-Disabilities.pdf",
}

const PROMOTING_PROGRESS: Citation = {
  label: "Promoting Progress — práticas de ensino com evidência",
  url: "https://promotingprogress.org/resource-collections/evidence-based-instructional-practices",
}

// --- A matriz ----------------------------------------------------------------

export const MATRIZ: CelulaDaMatriz[] = [
  // === leitura-longa =========================================================
  {
    barreira: "leitura-longa",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "O custo aqui é de decodificação, não de compreensão. Cada linha a mais é esforço que sai do orçamento de quem ainda gasta atenção consciente para reconhecer palavras — e o aluno chega ao comando já sem fôlego para o que a questão de fato pergunta.",
      "The cost here is decoding, not comprehension. Every extra line spends effort from the budget of a student who still uses conscious attention to recognise words — and they reach the question already out of breath for what it actually asks.",
      "El costo aquí es de decodificación, no de comprensión. Cada línea extra gasta esfuerzo del presupuesto de quien todavía usa atención consciente para reconocer palabras — y el estudiante llega al comando sin aliento para lo que la pregunta realmente pide.",
    ),
    oQueFazer: ml(
      "Leia o comando primeiro, antes do texto de apoio: saber o que procurar transforma a leitura longa em busca dirigida. Ofereça o enunciado também em áudio, e mantenha o texto disponível para reler — ouvir substitui a decodificação, não a compreensão.",
      "Read the question first, before the supporting text: knowing what to look for turns a long read into a directed search. Offer the stem in audio as well, and keep the text available for re-reading — listening replaces decoding, not comprehension.",
      "Lea el comando primero, antes del texto de apoyo: saber qué buscar convierte la lectura larga en una búsqueda dirigida. Ofrezca el enunciado también en audio y mantenga el texto disponible para releer — escuchar sustituye la decodificación, no la comprensión.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY],
    evidence: "established",
  },
  {
    barreira: "leitura-longa",
    especialidade: "tdah",
    oQueSignifica: ml(
      "O problema não é ler, é permanecer. Um enunciado no quarto superior do acervo costuma exigir vários minutos contínuos antes de qualquer ação, e é nesse intervalo sem nada a fazer que a atenção se solta — o aluno relê o mesmo trecho três vezes sem perceber.",
      "The problem is not reading, it is staying. A stem in the collection's top quarter usually demands several unbroken minutes before any action, and it is in that stretch with nothing to do that attention slips — the student rereads the same passage three times without noticing.",
      "El problema no es leer, es permanecer. Un enunciado en el cuarto superior del acervo suele exigir varios minutos continuos antes de cualquier acción, y es en ese intervalo sin nada que hacer donde la atención se suelta — el estudiante relee el mismo pasaje tres veces sin darse cuenta.",
    ),
    oQueFazer: ml(
      "Corte o enunciado em blocos e dê uma tarefa curta a cada bloco — sublinhar o dado, escrever uma palavra na margem. Não é para facilitar: é para que exista uma ação a cada trinta segundos, em vez de uma única ação no fim de três minutos.",
      "Cut the stem into blocks and give each block a short task — underline the datum, write one word in the margin. It is not to make it easier: it is so that an action exists every thirty seconds, instead of a single action after three minutes.",
      "Corte el enunciado en bloques y dé una tarea corta a cada bloque — subrayar el dato, escribir una palabra al margen. No es para facilitar: es para que exista una acción cada treinta segundos, en vez de una sola acción al cabo de tres minutos.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH],
  },
  {
    barreira: "leitura-longa",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "A quantidade de informação nova por parágrafo é o que pesa, mais do que o tamanho em si. Um enunciado longo apresenta contexto, dados e pergunta de uma vez só, sem pausa para consolidar — e o que se perde costuma ser o começo, justamente onde está a situação que dá sentido ao resto.",
      "What weighs is the amount of new information per paragraph, more than the length itself. A long stem presents context, data and question all at once, with no pause to consolidate — and what gets lost is usually the beginning, exactly where the situation that gives the rest its meaning lives.",
      "Lo que pesa es la cantidad de información nueva por párrafo, más que la extensión en sí. Un enunciado largo presenta contexto, datos y pregunta de una vez, sin pausa para consolidar — y lo que se pierde suele ser el comienzo, justo donde está la situación que da sentido al resto.",
    ),
    oQueFazer: ml(
      "Apresente um parágrafo por vez e feche cada um com uma frase de resumo dita pelo aluno. O enunciado inteiro continua disponível; o que muda é que ele deixa de precisar ser retido de uma só vez.",
      "Present one paragraph at a time and close each with a summary sentence said by the student. The whole stem stays available; what changes is that it no longer has to be held all at once.",
      "Presente un párrafo por vez y cierre cada uno con una frase de resumen dicha por el estudiante. El enunciado completo sigue disponible; lo que cambia es que ya no debe retenerse de una sola vez.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS],
  },
  {
    barreira: "leitura-longa",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "Texto longo multiplica as construções que precisam ser processadas — orações encaixadas, referências a algo dito parágrafos antes, pronomes que retomam. Cada uma dessas é exatamente o ponto de dificuldade do TDL, e o enunciado longo simplesmente oferece mais delas.",
      "Long text multiplies the constructions that must be processed — embedded clauses, references to something said paragraphs earlier, pronouns that refer back. Each of those is precisely where DLD is hardest, and a long stem simply offers more of them.",
      "El texto largo multiplica las construcciones que deben procesarse — oraciones subordinadas, referencias a algo dicho párrafos antes, pronombres que retoman. Cada una de esas es justamente el punto de dificultad del TDL, y el enunciado largo simplemente ofrece más.",
    ),
    oQueFazer: ml(
      "Antes de responder, peça que o aluno diga a quem cada pronome se refere — \"esse método\", \"ela\", \"o processo\". Explicitar as retomadas resolve boa parte do que parecia falta de conhecimento do conteúdo.",
      "Before answering, ask the student to say what each pronoun refers to — \"this method\", \"it\", \"the process\". Making the references explicit resolves much of what looked like not knowing the content.",
      "Antes de responder, pida que el estudiante diga a qué se refiere cada pronombre — \"ese método\", \"ella\", \"el proceso\". Explicitar las retomas resuelve buena parte de lo que parecía desconocimiento del contenido.",
    ),
    citations: [ASHA, DLD_PROJECT, RADLD],
  },
  {
    barreira: "leitura-longa",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "A memória verbal de curto prazo é um ponto de dificuldade descrito na literatura da síndrome, e o enunciado longo cobra exatamente isso: guardar o começo do texto até chegar à pergunta. O apoio visual, ao contrário, costuma ser via de força.",
      "Short-term verbal memory is a documented difficulty in the syndrome's literature, and a long stem demands precisely that: holding the start of the text until the question arrives. Visual support, by contrast, tends to be a channel of strength.",
      "La memoria verbal a corto plazo es una dificultad descrita en la literatura del síndrome, y el enunciado largo exige justamente eso: guardar el comienzo del texto hasta llegar a la pregunta. El apoyo visual, en cambio, suele ser vía de fortaleza.",
    ),
    oQueFazer: ml(
      "Deixe o enunciado à vista o tempo todo e transforme o que ele descreve em imagem ou esquema ao lado — não substitua o texto, acompanhe-o. O que precisa deixar de ser memória é a retenção, não a leitura.",
      "Keep the stem in sight throughout and turn what it describes into a picture or diagram alongside — do not replace the text, accompany it. What must stop being memory is retention, not reading.",
      "Mantenga el enunciado a la vista todo el tiempo y convierta lo que describe en imagen o esquema al lado — no sustituya el texto, acompáñelo. Lo que debe dejar de ser memoria es la retención, no la lectura.",
    ),
    citations: [DSE_MEMORIA, DSE_LEITURA, IES_DOWN],
    evidence: "established",
  },
  {
    barreira: "leitura-longa",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "Ler em braille ou por leitor de tela é sequencial: não existe a passada de olho que localiza um dado no meio do parágrafo. Reler para conferir um número custa percorrer o texto de novo, e um enunciado do quarto superior do acervo pode levar várias vezes o tempo de um colega vidente.",
      "Reading in braille or with a screen reader is sequential: there is no glance that locates a datum mid-paragraph. Re-reading to check a number costs traversing the text again, and a stem in the collection's top quarter can take several times a sighted classmate's time.",
      "Leer en braille o con lector de pantalla es secuencial: no existe el vistazo que localiza un dato en medio del párrafo. Releer para verificar un número cuesta recorrer el texto de nuevo, y un enunciado del cuarto superior del acervo puede llevar varias veces el tiempo de un compañero vidente.",
    ),
    oQueFazer: ml(
      "Entregue os dados numéricos também numa lista curta à parte, além do texto corrido. Não é resumo do enunciado — é o mesmo conteúdo em forma que se possa consultar sem reler tudo, que é o que a leitura sequencial não permite.",
      "Provide the numeric data in a short separate list as well as in the running text. It is not a summary of the stem — it is the same content in a form that can be consulted without re-reading everything, which sequential reading does not allow.",
      "Entregue los datos numéricos también en una lista corta aparte, además del texto corrido. No es un resumen del enunciado — es el mismo contenido en una forma que se pueda consultar sin releer todo, que es lo que la lectura secuencial no permite.",
    ),
    citations: [PATHS_BRAILLE, PATHS_TECNOLOGIA, APH],
  },
  {
    barreira: "leitura-longa",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Todo acesso ao texto passa por um canal só, e um lento: braille tátil, ampliação extrema ou mediação do interveniente. Um enunciado longo não é uma questão difícil — é uma questão que pode não caber no tempo da aula.",
      "All access to the text goes through a single, slow channel: tactile braille, extreme magnification or the intervener's mediation. A long stem is not a hard question — it is a question that may not fit inside the lesson's time.",
      "Todo acceso al texto pasa por un solo canal, y lento: braille táctil, ampliación extrema o mediación del interviniente. Un enunciado largo no es una pregunta difícil — es una pregunta que puede no caber en el tiempo de la clase.",
    ),
    oQueFazer: ml(
      "Decida antes com o interveniente o que será transmitido na íntegra e o que será resumido, e registre essa decisão junto da questão. Combinar depois, no meio da aula, é o que faz o aluno receber uma versão diferente da que os colegas leram sem que ninguém saiba.",
      "Decide beforehand with the intervener what will be conveyed in full and what will be summarised, and record that decision alongside the question. Settling it mid-lesson is what makes the student receive a different version from the one classmates read, with nobody aware.",
      "Decida antes con el interviniente qué se transmitirá íntegro y qué se resumirá, y registre esa decisión junto a la pregunta. Acordarlo después, en plena clase, es lo que hace que el estudiante reciba una versión distinta de la que leyeron sus compañeros sin que nadie lo sepa.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, NCDB_MODULOS],
  },

  // === periodo-longo =========================================================
  {
    barreira: "periodo-longo",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "Frase longa significa segurar o sujeito enquanto se decodifica o resto até o verbo. Quem já gasta atenção no reconhecimento das palavras chega ao fim do período sem o começo — e reler não resolve, porque a releitura recomeça o mesmo custo.",
      "A long sentence means holding the subject while decoding the rest up to the verb. A student already spending attention on word recognition reaches the end of the period without its beginning — and re-reading does not fix it, because it restarts the same cost.",
      "Frase larga significa sostener el sujeto mientras se decodifica el resto hasta el verbo. Quien ya gasta atención en el reconocimiento de las palabras llega al final del período sin el comienzo — y releer no lo resuelve, porque la relectura reinicia el mismo costo.",
    ),
    oQueFazer: ml(
      "Quebre o período nas vírgulas, uma linha por oração, sem trocar nenhuma palavra. A questão continua a mesma; o que muda é que cada linha se resolve sozinha.",
      "Break the period at its commas, one line per clause, without changing a single word. The question stays the same; what changes is that each line resolves on its own.",
      "Quiebre el período en las comas, una línea por oración, sin cambiar ninguna palabra. La pregunta sigue siendo la misma; lo que cambia es que cada línea se resuelve sola.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY],
  },
  {
    barreira: "periodo-longo",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "É a barreira mais direta do TDL neste acervo: o comprimento da frase é onde a complexidade sintática se acumula. Orações encaixadas, ordem invertida e sujeito distante do verbo fazem o aluno perder a estrutura da sentença mesmo conhecendo todas as palavras.",
      "This is DLD's most direct barrier in this collection: sentence length is where syntactic complexity accumulates. Embedded clauses, inverted order and a subject far from its verb make the student lose the sentence's structure even knowing every word.",
      "Es la barrera más directa del TDL en este acervo: la longitud de la frase es donde se acumula la complejidad sintáctica. Oraciones subordinadas, orden invertido y sujeto lejos del verbo hacen que el estudiante pierda la estructura de la oración aun conociendo todas las palabras.",
    ),
    oQueFazer: ml(
      "Reescreva a frase mais longa em ordem direta — sujeito, verbo, complemento — e mostre as duas versões lado a lado. Ver a mesma informação nas duas formas ensina a desmontar a próxima, o que resumir por ele não ensina.",
      "Rewrite the longest sentence in direct order — subject, verb, object — and show both versions side by side. Seeing the same information in both forms teaches how to unpack the next one, which summarising for the student does not.",
      "Reescriba la frase más larga en orden directo — sujeto, verbo, complemento — y muestre ambas versiones lado a lado. Ver la misma información en las dos formas enseña a desmontar la siguiente, cosa que resumirla por él no enseña.",
    ),
    citations: [ASHA, RADLD, DLD_PROJECT],
  },
  {
    barreira: "periodo-longo",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "Para o aluno surdo cuja primeira língua é a Libras, o português escrito é segunda língua, e o período longo é onde as duas gramáticas mais divergem. A dificuldade é de estrutura da frase, não de conteúdo da matéria — e confundir as duas leva a subestimar o que o aluno sabe.",
      "For a Deaf student whose first language is a sign language, written Portuguese is a second language, and the long period is where the two grammars diverge most. The difficulty is sentence structure, not subject knowledge — and confusing the two leads to underestimating what the student knows.",
      "Para el estudiante sordo cuya primera lengua es la lengua de señas, el portugués escrito es segunda lengua, y el período largo es donde ambas gramáticas más divergen. La dificultad es de estructura de la frase, no de contenido — y confundirlas lleva a subestimar lo que el estudiante sabe.",
    ),
    oQueFazer: ml(
      "Trate a frase longa como se traduz: identifique quem faz o quê antes de discutir o conteúdo, e apoie-se em material bilíngue quando houver. Vale conferir se o erro foi de matéria ou de leitura da frase, perguntando o mesmo conteúdo em Libras.",
      "Treat the long sentence as a translation task: identify who does what before discussing content, and lean on bilingual material where available. It is worth checking whether the error was about the subject or about reading the sentence, by asking the same content in sign language.",
      "Trate la frase larga como una traducción: identifique quién hace qué antes de discutir el contenido, y apóyese en material bilingüe cuando exista. Conviene verificar si el error fue de materia o de lectura de la frase, preguntando el mismo contenido en lengua de señas.",
    ),
    citations: [INES_DEBASI, INES],
  },
  {
    barreira: "periodo-longo",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "Cada oração encaixada acrescenta uma informação que precisa esperar a próxima para fazer sentido. O aluno acompanha o começo, e a frase termina antes que o começo tenha sido consolidado.",
      "Each embedded clause adds information that must wait for the next to make sense. The student follows the opening, and the sentence ends before that opening has been consolidated.",
      "Cada oración subordinada agrega una información que debe esperar a la siguiente para tener sentido. El estudiante sigue el comienzo, y la frase termina antes de que ese comienzo se haya consolidado.",
    ),
    oQueFazer: ml(
      "Uma ideia por frase, e a ideia mais importante na primeira. Confirme com uma pergunta de verificação antes de seguir — não a resposta da questão, só o que aquela frase disse.",
      "One idea per sentence, and the most important idea first. Confirm with a checking question before moving on — not the question's answer, just what that sentence said.",
      "Una idea por frase, y la idea más importante primero. Confirme con una pregunta de verificación antes de seguir — no la respuesta de la pregunta, solo lo que esa frase dijo.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS],
  },
  {
    barreira: "periodo-longo",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "O período longo cobra memória verbal enquanto a sintaxe ainda está sendo desmontada — a combinação exata que a literatura da síndrome descreve como mais custosa. Frases curtas com o mesmo vocabulário costumam ser compreendidas sem qualquer outro apoio.",
      "The long period demands verbal memory while the syntax is still being unpacked — precisely the combination the syndrome's literature describes as most costly. Short sentences with the same vocabulary are usually understood with no other support.",
      "El período largo exige memoria verbal mientras la sintaxis todavía se está desmontando — la combinación exacta que la literatura del síndrome describe como más costosa. Frases cortas con el mismo vocabulario suelen comprenderse sin ningún otro apoyo.",
    ),
    oQueFazer: ml(
      "Antes de simplificar, teste: leia a mesma frase partida em duas e veja se a dúvida desaparece. Se desaparecer, o problema era o período — e o aluno sabia o conteúdo o tempo todo.",
      "Before simplifying, test it: read the same sentence split in two and see whether the doubt disappears. If it does, the period was the problem — and the student knew the content all along.",
      "Antes de simplificar, pruebe: lea la misma frase partida en dos y vea si la duda desaparece. Si desaparece, el problema era el período — y el estudiante sabía el contenido todo el tiempo.",
    ),
    citations: [DSE_LEITURA, DSE_MEMORIA],
  },

  // === alternativas-longas ===================================================
  {
    barreira: "alternativas-longas",
    especialidade: "tdah",
    oQueSignifica: ml(
      "Comparar cinco textos longos exige manter quatro em suspenso enquanto se lê o quinto. É trabalho de memória sustentada sem nenhuma ação intermediária — e o resultado típico é escolher a alternativa lembrada, que costuma ser a última lida ou a primeira.",
      "Comparing five long texts requires holding four in suspension while reading the fifth. That is sustained memory work with no intermediate action — and the typical result is choosing the remembered option, usually the last read or the first.",
      "Comparar cinco textos largos exige mantener cuatro en suspenso mientras se lee el quinto. Es trabajo de memoria sostenida sin ninguna acción intermedia — y el resultado típico es elegir la alternativa recordada, que suele ser la última leída o la primera.",
    ),
    oQueFazer: ml(
      "Peça um veredito escrito por alternativa antes de comparar: sim, não, talvez. Cinco decisões pequenas e registradas substituem uma decisão grande que dependia de segurar tudo ao mesmo tempo.",
      "Ask for a written verdict per option before comparing: yes, no, maybe. Five small recorded decisions replace one big decision that depended on holding everything at once.",
      "Pida un veredicto escrito por alternativa antes de comparar: sí, no, quizá. Cinco decisiones pequeñas y registradas sustituyen una decisión grande que dependía de sostenerlo todo a la vez.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "As alternativas são a parte da questão que mais se relê, e cada releitura repete o custo de decodificação inteiro. Uma questão com 400 caracteres em alternativas pode custar mais que um enunciado do mesmo tamanho, porque o enunciado se lê uma vez e as alternativas, três ou quatro.",
      "The options are the part of a question most re-read, and each re-reading repeats the full decoding cost. A question with 400 characters of options can cost more than a stem of the same size, because the stem is read once and the options three or four times.",
      "Las alternativas son la parte de la pregunta que más se relee, y cada relectura repite el costo completo de decodificación. Una pregunta con 400 caracteres en alternativas puede costar más que un enunciado del mismo tamaño, porque el enunciado se lee una vez y las alternativas tres o cuatro.",
    ),
    oQueFazer: ml(
      "Leia as cinco em voz alta uma única vez, na ordem, e deixe o aluno eliminar por escuta antes de voltar ao texto. A eliminação reduz de cinco releituras para duas.",
      "Read all five aloud once, in order, and let the student eliminate by listening before returning to the text. Elimination cuts five re-readings down to two.",
      "Lea las cinco en voz alta una sola vez, en orden, y deje que el estudiante elimine escuchando antes de volver al texto. La eliminación reduce de cinco relecturas a dos.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "No leitor de tela, comparar alternativas é navegar para frente e para trás cinco vezes, sem visão de conjunto. Alternativas que começam com as mesmas palavras — comuns em questão bem construída — exigem ouvir cada uma até o ponto em que divergem.",
      "With a screen reader, comparing options means navigating back and forth five times, with no overview. Options starting with the same words — common in a well-built question — require listening to each up to the point where they diverge.",
      "Con lector de pantalla, comparar alternativas es navegar adelante y atrás cinco veces, sin visión de conjunto. Alternativas que empiezan con las mismas palabras — habituales en una pregunta bien construida — exigen escuchar cada una hasta el punto en que divergen.",
    ),
    oQueFazer: ml(
      "Diga em voz alta onde as alternativas divergem antes de lê-las inteiras: \"todas falam de aumento de oferta; a diferença está no que aumenta\". Isso devolve a visão de conjunto que a leitura sequencial não dá.",
      "Say aloud where the options diverge before reading them in full: \"all of them speak of increased supply; the difference is in what increases\". That gives back the overview sequential reading cannot.",
      "Diga en voz alta dónde divergen las alternativas antes de leerlas enteras: \"todas hablan de aumento de oferta; la diferencia está en qué aumenta\". Eso devuelve la visión de conjunto que la lectura secuencial no da.",
    ),
    citations: [PATHS_TECNOLOGIA, APH],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "Cinco textos longos de sentido próximo transformam a escolha final numa segunda questão, mais difícil que a primeira. O aluno pode ter entendido o enunciado e ainda assim não conseguir sustentar a comparação entre as opções.",
      "Five long texts of similar meaning turn the final choice into a second question, harder than the first. The student may have understood the stem and still be unable to sustain the comparison between options.",
      "Cinco textos largos de sentido próximo convierten la elección final en una segunda pregunta, más difícil que la primera. El estudiante puede haber entendido el enunciado y aun así no lograr sostener la comparación entre las opciones.",
    ),
    oQueFazer: ml(
      "Apresente duas alternativas por vez e descarte uma antes de trazer a próxima. Chegar ao fim com duas comparações de dois é diferente de uma comparação de cinco, mesmo sendo a mesma questão.",
      "Present two options at a time and discard one before bringing in the next. Reaching the end through several comparisons of two is different from one comparison of five, even in the same question.",
      "Presente dos alternativas por vez y descarte una antes de traer la siguiente. Llegar al final con varias comparaciones de dos es distinto de una comparación de cinco, aunque sea la misma pregunta.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, CEEDAR_ALTERNATIVO],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Para quem acessa por varredura, acionador ou rastreamento ocular, cada alternativa lida é uma sequência de acionamentos, e voltar para conferir custa a mesma sequência de novo. O tempo da questão passa a depender do meio de acesso, não do que o aluno sabe.",
      "For a student using scanning, a switch or eye tracking, each option read is a sequence of activations, and going back to check costs the same sequence again. The question's time comes to depend on the access method, not on what the student knows.",
      "Para quien accede por barrido, pulsador o seguimiento ocular, cada alternativa leída es una secuencia de activaciones, y volver para verificar cuesta la misma secuencia otra vez. El tiempo de la pregunta pasa a depender del medio de acceso, no de lo que el estudiante sabe.",
    ),
    oQueFazer: ml(
      "Deixe as cinco alternativas visíveis ao mesmo tempo, sem rolagem, e aceite a resposta pelo meio que for mais rápido para o aluno — apontar, ditar, marcar a letra. O que se mede é a escolha, não a operação de registrá-la.",
      "Keep all five options visible at once, without scrolling, and accept the answer by whichever means is fastest for the student — pointing, dictating, marking the letter. What is measured is the choice, not the act of recording it.",
      "Mantenga las cinco alternativas visibles a la vez, sin desplazamiento, y acepte la respuesta por el medio que sea más rápido para el estudiante — señalar, dictar, marcar la letra. Lo que se mide es la elección, no la operación de registrarla.",
    ),
    citations: [CAST_UDL],
  },

  // === muitos-numeros ========================================================
  {
    barreira: "muitos-numeros",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Cada número do enunciado é um dado a segurar enquanto se lê o resto, e é essa retenção — não a conta — que costuma derrubar o aluno com discalculia. Ele pode dominar a operação e ainda assim chegar ao cálculo já sem os valores certos na cabeça.",
      "Each number in the stem is a datum to hold while reading the rest, and it is that retention — not the arithmetic — that usually defeats a student with dyscalculia. They may master the operation and still reach the calculation without the right values in mind.",
      "Cada número del enunciado es un dato que sostener mientras se lee el resto, y es esa retención — no la cuenta — la que suele derribar al estudiante con discalculia. Puede dominar la operación y aun así llegar al cálculo sin los valores correctos en la cabeza.",
    ),
    oQueFazer: ml(
      "Extraia os números para uma tabela à parte, com o rótulo do que cada um representa, antes de qualquer cálculo. A tabela não facilita a questão: devolve ao aluno a capacidade de pensar sobre o problema em vez de gastá-la segurando valores.",
      "Pull the numbers into a separate table, each labelled with what it represents, before any calculation. The table does not make the question easier: it gives the student back the capacity to think about the problem instead of spending it holding values.",
      "Extraiga los números a una tabla aparte, con la etiqueta de lo que representa cada uno, antes de cualquier cálculo. La tabla no facilita la pregunta: devuelve al estudiante la capacidad de pensar sobre el problema en vez de gastarla sosteniendo valores.",
    ),
    citations: [WWC_RESOLUCAO, NCII_MATEMATICA, WWC_MATEMATICA_2021],
    evidence: "established",
  },
  {
    barreira: "muitos-numeros",
    especialidade: "tdah",
    oQueSignifica: ml(
      "O risco aqui é de troca, não de esquecimento: com quatro ou mais valores no texto, o aluno pega o número certo da linha errada. O erro aparece no fim como conta errada, e a origem foi na leitura.",
      "The risk here is swapping, not forgetting: with four or more values in the text, the student picks the right number from the wrong line. The error surfaces at the end as bad arithmetic, and its origin was in the reading.",
      "El riesgo aquí es de intercambio, no de olvido: con cuatro o más valores en el texto, el estudiante toma el número correcto de la línea equivocada. El error aparece al final como cuenta equivocada, y su origen estuvo en la lectura.",
    ),
    oQueFazer: ml(
      "Numere e rotule cada valor no próprio enunciado antes de começar, e exija que o aluno escreva de qual rótulo tirou cada número da conta. É o registro que torna a troca visível — para ele, não só para você.",
      "Number and label each value in the stem itself before starting, and require the student to write which label each number in the calculation came from. It is the record that makes the swap visible — to them, not only to you.",
      "Numere y etiquete cada valor en el propio enunciado antes de empezar, y exija que el estudiante escriba de qué etiqueta sacó cada número de la cuenta. Es el registro lo que hace visible el intercambio — para él, no solo para usted.",
    ),
    citations: [UNDERSTOOD_TDAH, WWC_RESOLUCAO],
  },
  {
    barreira: "muitos-numeros",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "Quantidade de dados e abstração se somam: quatro números exigem entender o que cada um representa antes de qualquer operação, e é nessa tradução — não na conta — que a questão costuma se perder.",
      "Quantity of data and abstraction add up: four numbers require understanding what each represents before any operation, and it is in that translation — not the arithmetic — that the question is usually lost.",
      "Cantidad de datos y abstracción se suman: cuatro números exigen entender qué representa cada uno antes de cualquier operación, y es en esa traducción — no en la cuenta — donde la pregunta suele perderse.",
    ),
    oQueFazer: ml(
      "Represente cada valor com material concreto ou desenho antes de escrevê-lo como símbolo. A sequência do concreto para o abstrato tem respaldo em intervenção matemática, e o ganho aparece justamente em quem não constrói a representação sozinho.",
      "Represent each value with concrete material or a drawing before writing it as a symbol. The concrete-to-abstract sequence is supported in mathematics intervention, and the gain shows precisely in students who do not build the representation on their own.",
      "Represente cada valor con material concreto o dibujo antes de escribirlo como símbolo. La secuencia de lo concreto a lo abstracto tiene respaldo en intervención matemática, y la ganancia aparece justamente en quien no construye la representación por sí mismo.",
    ),
    citations: [WWC_MATEMATICA_INICIAIS, NCII_MATEMATICA, NCIL_DEFICIENCIA_INTELECTUAL],
    evidence: "established",
  },
  {
    barreira: "muitos-numeros",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Segurar vários valores enquanto se lê é memória verbal de curto prazo, o ponto que a literatura da síndrome descreve como mais custoso. A conta em si pode estar dominada e mesmo assim não sobrar capacidade para chegar até ela.",
      "Holding several values while reading is short-term verbal memory, the point the syndrome's literature describes as costliest. The arithmetic itself may be mastered and there still be no capacity left to reach it.",
      "Sostener varios valores mientras se lee es memoria verbal a corto plazo, el punto que la literatura del síndrome describe como más costoso. La cuenta en sí puede estar dominada y aun así no quedar capacidad para llegar a ella.",
    ),
    oQueFazer: ml(
      "Escreva os valores num cartão à vista, com o rótulo em palavra e, quando possível, em imagem. O apoio visual é via de força documentada na síndrome — usá-la aqui não é concessão, é escolher o canal que funciona.",
      "Write the values on a card kept in sight, labelled in words and, where possible, in pictures. Visual support is a documented channel of strength in the syndrome — using it here is not a concession, it is choosing the channel that works.",
      "Escriba los valores en una tarjeta a la vista, con la etiqueta en palabra y, cuando sea posible, en imagen. El apoyo visual es vía de fortaleza documentada en el síndrome — usarla aquí no es una concesión, es elegir el canal que funciona.",
    ),
    citations: [DSE_MEMORIA, IES_DOWN],
  },

  // === figura-essencial ======================================================
  {
    barreira: "figura-essencial",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "Aqui a distinção entre difícil e indisponível é tudo. Com audiodescrição, a questão é respondível; sem ela, não há dificuldade a graduar — a informação simplesmente não chegou. O acervo tem 1.409 questões com figura e 723 ainda sem descrição.",
      "Here the distinction between hard and unavailable is everything. With an audio description, the question is answerable; without one, there is no difficulty to grade — the information simply did not arrive. The collection has 1,409 questions with a figure and 723 still without a description.",
      "Aquí la distinción entre difícil e indisponible lo es todo. Con audiodescripción, la pregunta es respondible; sin ella, no hay dificultad que graduar — la información sencillamente no llegó. El acervo tiene 1.409 preguntas con figura y 723 aún sin descripción.",
    ),
    oQueFazer: ml(
      "Confira se a questão traz a audiodescrição oficial do INEP antes de propô-la. Se não trouxer, ou descreva a figura você mesmo — dizendo o que ela mostra, não o que ela significa — ou escolha outra: aplicar sem descrição é aplicar uma questão sem enunciado.",
      "Check whether the question carries INEP's official audio description before setting it. If not, either describe the figure yourself — saying what it shows, not what it means — or pick another: setting it without a description is setting a question without a stem.",
      "Verifique si la pregunta trae la audiodescripción oficial del INEP antes de proponerla. Si no la trae, o describa la figura usted mismo — diciendo qué muestra, no qué significa — o elija otra: aplicarla sin descripción es aplicar una pregunta sin enunciado.",
    ),
    citations: [PATHS_BRAILLE, APH, CAST_UDL],
    evidence: "established",
  },
  {
    barreira: "figura-essencial",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "A audiodescrição, que resolve para a deficiência visual, aqui resolve pela metade: o canal auditivo também está comprometido. Gráficos e mapas precisam virar tátil, e isso não se improvisa no momento da aula.",
      "The audio description that solves it for blindness only half-solves it here: the auditory channel is affected too. Charts and maps must become tactile, and that cannot be improvised during the lesson.",
      "La audiodescripción, que resuelve para la discapacidad visual, aquí resuelve a medias: el canal auditivo también está comprometido. Gráficos y mapas deben volverse táctiles, y eso no se improvisa en el momento de la clase.",
    ),
    oQueFazer: ml(
      "Prepare a versão tátil com antecedência e combine com o interveniente o vocabulário do que será explorado com as mãos. Questões com figura precisam entrar no planejamento da semana, não na escolha do dia.",
      "Prepare the tactile version in advance and agree with the intervener on the vocabulary for what will be explored by hand. Questions with figures belong in the week's planning, not in the day's picking.",
      "Prepare la versión táctil con antelación y acuerde con el interviniente el vocabulario de lo que se explorará con las manos. Las preguntas con figura deben entrar en la planificación de la semana, no en la elección del día.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, NCDB_MODULOS, APH],
  },
  {
    barreira: "figura-essencial",
    especialidade: "autismo",
    oQueSignifica: ml(
      "Nem toda figura é obstáculo aqui — apoio visual é prática com evidência no TEA, e a questão ilustrada pode ser mais acessível que a puramente verbal. O atrito aparece quando a figura é decorativa ou ambígua, e o aluno investe atenção em detalhe que a pergunta não usa.",
      "Not every figure is an obstacle here — visual support is an evidence-based practice in autism, and an illustrated question can be more accessible than a purely verbal one. Friction appears when the figure is decorative or ambiguous, and the student invests attention in detail the question never uses.",
      "No toda figura es obstáculo aquí — el apoyo visual es práctica con evidencia en el TEA, y la pregunta ilustrada puede ser más accesible que la puramente verbal. La fricción aparece cuando la figura es decorativa o ambigua, y el estudiante invierte atención en un detalle que la pregunta no usa.",
    ),
    oQueFazer: ml(
      "Diga explicitamente o que na figura importa para a resposta e o que é contexto. Não é restringir a observação: é evitar que a precisão do aluno seja gasta na parte da imagem que a questão ignora.",
      "State explicitly what in the figure matters for the answer and what is context. It is not restricting observation: it is preventing the student's precision from being spent on the part of the image the question ignores.",
      "Diga explícitamente qué de la figura importa para la respuesta y qué es contexto. No es restringir la observación: es evitar que la precisión del estudiante se gaste en la parte de la imagen que la pregunta ignora.",
    ),
    citations: [AFIRM_APOIOS_VISUAIS, NCAEP],
    evidence: "established",
  },
  {
    barreira: "figura-essencial",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "A figura costuma jogar a favor: informação que não depende do português escrito chega inteira. O cuidado é com a legenda e com o texto dentro da imagem, que voltam a ser segunda língua e podem carregar justamente o dado decisivo.",
      "The figure usually plays in favour: information that does not depend on written Portuguese arrives whole. The care is with captions and text inside the image, which are second language again and may carry precisely the decisive datum.",
      "La figura suele jugar a favor: información que no depende del portugués escrito llega entera. El cuidado está en la leyenda y en el texto dentro de la imagen, que vuelven a ser segunda lengua y pueden llevar justamente el dato decisivo.",
    ),
    oQueFazer: ml(
      "Trabalhe a legenda e os rótulos do gráfico como texto a ser traduzido, com o mesmo cuidado do enunciado. É o ponto onde uma questão visualmente acessível volta a exigir leitura em segunda língua sem avisar.",
      "Treat the caption and chart labels as text to be translated, with the same care as the stem. It is the point where a visually accessible question quietly returns to demanding second-language reading.",
      "Trabaje la leyenda y las etiquetas del gráfico como texto a traducir, con el mismo cuidado que el enunciado. Es el punto donde una pregunta visualmente accesible vuelve a exigir lectura en segunda lengua sin avisar.",
    ),
    citations: [INES_DEBASI, CAST_UDL],
  },

  // === alternativas-numericas ================================================
  {
    barreira: "alternativas-numericas",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Sem texto nas alternativas, não há como conferir o resultado pelo sentido: ou a conta bateu, ou não bateu. Pior, as distratoras de uma questão bem construída são os resultados de erros comuns — esquecer de dividir, trocar o sinal —, de modo que um deslize leva a uma alternativa que existe e parece certa.",
      "With no text in the options, there is no way to sanity-check the result by meaning: either the arithmetic matched or it did not. Worse, the distractors of a well-built question are the outcomes of common errors — forgetting to divide, flipping a sign — so a slip leads to an option that exists and looks right.",
      "Sin texto en las alternativas, no hay forma de verificar el resultado por el sentido: o la cuenta coincidió, o no. Peor: las distractoras de una pregunta bien construida son los resultados de errores comunes — olvidar dividir, cambiar el signo —, de modo que un desliz lleva a una alternativa que existe y parece correcta.",
    ),
    oQueFazer: ml(
      "Peça uma estimativa de ordem de grandeza antes de calcular — \"vai dar dezenas ou centenas?\" — e compare com as alternativas. É o que devolve o controle de sentido que o formato tirou, e transforma a distratora em algo detectável.",
      "Ask for an order-of-magnitude estimate before calculating — \"tens or hundreds?\" — and compare it with the options. That gives back the sense-check the format removed, and turns the distractor into something detectable.",
      "Pida una estimación de orden de magnitud antes de calcular — \"¿va a dar decenas o centenas?\" — y compárela con las alternativas. Es lo que devuelve el control de sentido que el formato quitó, y convierte la distractora en algo detectable.",
    ),
    citations: [WWC_RESOLUCAO, WWC_MATEMATICA_2021, NCII_MATEMATICA],
    evidence: "established",
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "O número sozinho não diz do que se trata. O aluno que acompanhou a situação do enunciado perde o fio na hora de escolher, porque as alternativas não retomam nada da situação — voltaram a ser símbolos puros.",
      "A bare number says nothing about what it refers to. A student who followed the stem's situation loses the thread when choosing, because the options recall none of that situation — they are pure symbols again.",
      "El número solo no dice de qué se trata. El estudiante que siguió la situación del enunciado pierde el hilo al elegir, porque las alternativas no retoman nada de esa situación — volvieron a ser símbolos puros.",
    ),
    oQueFazer: ml(
      "Reescreva as cinco alternativas com a unidade e o referente por extenso — \"1,9 kg de massa da escultura\" em vez de \"1,9\". A questão continua a mesma e a escolha volta a ter significado.",
      "Rewrite the five options with unit and referent spelled out — \"1.9 kg of sculpture mass\" instead of \"1.9\". The question stays the same and the choice regains meaning.",
      "Reescriba las cinco alternativas con la unidad y el referente completos — \"1,9 kg de masa de la escultura\" en vez de \"1,9\". La pregunta sigue igual y la elección vuelve a tener significado.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, WWC_MATEMATICA_INICIAIS],
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "tdah",
    oQueSignifica: ml(
      "Números parecidos entre si são o terreno do erro de transcrição: o aluno calcula certo e marca a letra ao lado, ou lê 2 400 onde está 240. Não é desatenção genérica — é a semelhança visual das opções cobrando conferência que ninguém pediu.",
      "Numbers that look alike are the terrain of transcription error: the student calculates correctly and marks the adjacent letter, or reads 2,400 where 240 is written. It is not generic carelessness — it is the visual similarity of the options demanding a check nobody asked for.",
      "Números parecidos entre sí son el terreno del error de transcripción: el estudiante calcula bien y marca la letra de al lado, o lee 2.400 donde dice 240. No es distracción genérica — es la semejanza visual de las opciones exigiendo una verificación que nadie pidió.",
    ),
    oQueFazer: ml(
      "Faça o aluno escrever o resultado antes de olhar as alternativas, e só então procurar. Calcular olhando para as cinco opções convida a ajustar a conta até bater com alguma.",
      "Have the student write the result before looking at the options, and only then search for it. Calculating while staring at the five options invites adjusting the arithmetic until it matches one.",
      "Haga que el estudiante escriba el resultado antes de mirar las alternativas, y solo entonces lo busque. Calcular mirando las cinco opciones invita a ajustar la cuenta hasta que coincida con alguna.",
    ),
    citations: [UNDERSTOOD_TDAH, WWC_RESOLUCAO],
  },

  // === cadeia-de-etapas ======================================================
  {
    barreira: "cadeia-de-etapas",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Cada resultado intermediário ocupa memória de trabalho até ser usado, e a questão encadeada exige guardar vários ao mesmo tempo. O aluno pode dominar cada operação isolada e ainda assim perder o fio — não é falha de cálculo, é excesso de coisas em suspenso.",
      "Each intermediate result occupies working memory until it is used, and a chained question requires holding several at once. The student may master every isolated operation and still lose the thread — it is not a calculation failure, it is too many things held at once.",
      "Cada resultado intermedio ocupa memoria de trabajo hasta ser usado, y la pregunta encadenada exige sostener varios a la vez. El estudiante puede dominar cada operación aislada y aun así perder el hilo — no es fallo de cálculo, es exceso de cosas en suspenso.",
    ),
    oQueFazer: ml(
      "Numere as etapas na folha antes de começar e exija que cada resultado intermediário seja escrito na sua linha. O papel passa a ser a memória de trabalho, e o erro, quando acontecer, fica localizado numa etapa em vez de contaminar tudo.",
      "Number the steps on the sheet before starting and require each intermediate result to be written on its line. The paper becomes the working memory, and an error, when it happens, stays located in one step instead of contaminating everything.",
      "Numere las etapas en la hoja antes de empezar y exija que cada resultado intermedio se escriba en su línea. El papel pasa a ser la memoria de trabajo, y el error, cuando ocurra, queda localizado en una etapa en vez de contaminarlo todo.",
    ),
    citations: [WWC_RESOLUCAO, NCII_MATEMATICA],
    evidence: "established",
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "tdah",
    oQueSignifica: ml(
      "Encadeamento é função executiva: decidir a ordem, executar, lembrar onde parou, retomar. O erro típico não é errar uma etapa — é pular uma, ou parar no penúltimo passo e marcar o resultado intermediário, que muitas vezes está entre as alternativas.",
      "Chaining is executive function: deciding the order, executing, remembering where you stopped, resuming. The typical error is not getting a step wrong — it is skipping one, or stopping at the penultimate step and marking the intermediate result, which is often among the options.",
      "El encadenamiento es función ejecutiva: decidir el orden, ejecutar, recordar dónde se detuvo, retomar. El error típico no es equivocar una etapa — es saltarse una, o detenerse en el penúltimo paso y marcar el resultado intermedio, que suele estar entre las alternativas.",
    ),
    oQueFazer: ml(
      "Escreva a lista de etapas antes de resolver e risque cada uma ao concluir. A pergunta final passa a ser \"risquei todas?\", que é verificável, em vez de \"terminei?\", que não é.",
      "Write the list of steps before solving and cross each one off as it is completed. The closing question becomes \"did I cross them all off?\", which is verifiable, instead of \"am I done?\", which is not.",
      "Escriba la lista de etapas antes de resolver y tache cada una al concluirla. La pregunta final pasa a ser \"¿las taché todas?\", que es verificable, en vez de \"¿terminé?\", que no lo es.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, WWC_RESOLUCAO],
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "autismo",
    oQueSignifica: ml(
      "A sequência costuma ser terreno favorável — o que atrapalha é ela estar implícita. A questão encadeada raramente diz que tem quatro etapas: espera que o aluno as infira do texto, e é a inferência que custa, não a execução.",
      "Sequence is usually favourable terrain — what hinders is its being implicit. A chained question rarely says it has four steps: it expects the student to infer them from the text, and it is the inference that costs, not the execution.",
      "La secuencia suele ser terreno favorable — lo que estorba es que esté implícita. La pregunta encadenada rara vez dice que tiene cuatro etapas: espera que el estudiante las infiera del texto, y es la inferencia lo que cuesta, no la ejecución.",
    ),
    oQueFazer: ml(
      "Torne a sequência explícita e visível antes de começar — as etapas numeradas, na ordem, à vista. É análise de tarefa com apoio visual, e transforma o que era inferência em execução, que é onde o aluno costuma ir bem.",
      "Make the sequence explicit and visible before starting — the steps numbered, in order, in sight. It is task analysis with visual support, and it turns what was inference into execution, where the student usually does well.",
      "Haga la secuencia explícita y visible antes de empezar — las etapas numeradas, en orden, a la vista. Es análisis de tarea con apoyo visual, y convierte lo que era inferencia en ejecución, donde el estudiante suele ir bien.",
    ),
    citations: [AFIRM_APOIOS_VISUAIS, NCAEP],
    evidence: "established",
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "O encadeamento exige manter o objetivo final enquanto se executa um passo intermediário. É comum o aluno resolver corretamente a primeira etapa e responder com ela, porque o destino se perdeu no caminho.",
      "Chaining requires holding the final goal while executing an intermediate step. It is common for a student to solve the first step correctly and answer with it, because the destination was lost along the way.",
      "El encadenamiento exige mantener el objetivo final mientras se ejecuta un paso intermedio. Es común que el estudiante resuelva correctamente la primera etapa y responda con ella, porque el destino se perdió en el camino.",
    ),
    oQueFazer: ml(
      "Mantenha a pergunta original escrita no alto da folha, à vista durante todas as etapas, e releia-a a cada passo concluído. O objetivo deixa de depender de memória.",
      "Keep the original question written at the top of the sheet, in sight through every step, and reread it after each one. The goal stops depending on memory.",
      "Mantenga la pregunta original escrita en lo alto de la hoja, a la vista durante todas las etapas, y reléala tras cada paso concluido. El objetivo deja de depender de la memoria.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS, WWC_MATEMATICA_INICIAIS],
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "A questão em etapas obriga a registrar resultados intermediários, e o registro é justamente o que custa. O aluno tende a tentar fazer de cabeça para evitar escrever — e aí perde por memória o que evitou perder por escrita.",
      "A stepwise question forces recording intermediate results, and recording is exactly what costs. The student tends to try doing it mentally to avoid writing — and then loses through memory what they avoided losing through writing.",
      "La pregunta por etapas obliga a registrar resultados intermedios, y el registro es justamente lo que cuesta. El estudiante tiende a intentar hacerlo de cabeza para evitar escribir — y entonces pierde por memoria lo que evitó perder por escritura.",
    ),
    oQueFazer: ml(
      "Ofereça um formulário com as etapas já impressas e só o resultado a preencher, ou aceite que o aluno dite os passos. Reduzir a escrita ao mínimo é o que permite ver o raciocínio — que é o que a questão mede.",
      "Offer a form with the steps already printed and only the result to fill in, or accept the student dictating the steps. Cutting writing to a minimum is what makes the reasoning visible — which is what the question measures.",
      "Ofrezca un formulario con las etapas ya impresas y solo el resultado por completar, o acepte que el estudiante dicte los pasos. Reducir la escritura al mínimo es lo que permite ver el razonamiento — que es lo que la pregunta mide.",
    ),
    citations: [WWC_ESCRITA_FINAIS, NCII],
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "A questão longa em etapas é onde a ansiedade de desempenho mais aparece: o aluno não sabe quanto falta, e a incerteza sobre o fim pesa mais que qualquer passo isolado. Travar na primeira etapa costuma ser sobre isso, não sobre o conteúdo.",
      "A long stepwise question is where performance anxiety shows most: the student does not know how much is left, and uncertainty about the end weighs more than any single step. Freezing at the first step is usually about that, not about the content.",
      "La pregunta larga por etapas es donde más aparece la ansiedad de desempeño: el estudiante no sabe cuánto falta, y la incertidumbre sobre el final pesa más que cualquier paso aislado. Trabarse en la primera etapa suele tratarse de eso, no del contenido.",
    ),
    oQueFazer: ml(
      "Mostre o número de etapas de antemão e trate cada uma como uma parada legítima. Saber que são quatro passos, e que parar no segundo é aceitável, muda o que o aluno está enfrentando.",
      "Show the number of steps upfront and treat each as a legitimate stopping point. Knowing there are four steps, and that stopping at the second is acceptable, changes what the student is facing.",
      "Muestre de antemano el número de etapas y trate cada una como una parada legítima. Saber que son cuatro pasos, y que detenerse en el segundo es aceptable, cambia lo que el estudiante está enfrentando.",
    ),
    citations: [CDC_SAUDE_MENTAL, CAST_UDL],
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "Esta é a única barreira da matriz que pode ser oportunidade. O aluno costuma resolver as etapas de cabeça e saltar direto ao resultado — o que dá certo até a questão em que uma etapa foi pulada por engano, e aí não há registro para encontrar o erro.",
      "This is the only barrier in the matrix that can be an opportunity. The student usually solves the steps mentally and jumps to the result — which works until the question where a step was skipped by mistake, and then there is no record in which to find the error.",
      "Esta es la única barrera de la matriz que puede ser oportunidad. El estudiante suele resolver las etapas de cabeza y saltar al resultado — lo que funciona hasta la pregunta donde se saltó un paso por error, y entonces no hay registro donde encontrar la equivocación.",
    ),
    oQueFazer: ml(
      "Em vez de exigir o passo a passo, peça o caminho alternativo: outra forma de chegar ao mesmo resultado, ou o que mudaria na resposta se um dado fosse outro. Aprofundar em vez de repetir é o princípio dos modelos de enriquecimento, e conserva o registro sem transformá-lo em burocracia.",
      "Instead of demanding step-by-step work, ask for the alternative route: another way to the same result, or what would change if one datum were different. Deepening rather than repeating is the principle of enrichment models, and it preserves a record without turning it into bureaucracy.",
      "En lugar de exigir el paso a paso, pida el camino alternativo: otra forma de llegar al mismo resultado, o qué cambiaría en la respuesta si un dato fuera otro. Profundizar en vez de repetir es el principio de los modelos de enriquecimiento, y conserva el registro sin volverlo burocracia.",
    ),
    citations: [UCONN_SEM, ERIC_ENRIQUECIMENTO],
  },

  // === vocabulario-denso =====================================================
  {
    barreira: "vocabulario-denso",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "Vocabulário é o núcleo do TDL, e o termo técnico longo costuma ser justamente a palavra que carrega a resposta. O aluno pode dominar o conceito e não reconhecer o rótulo — e a questão registra isso como desconhecimento do conteúdo.",
      "Vocabulary is at the core of DLD, and the long technical term is usually the very word carrying the answer. The student may master the concept and not recognise the label — and the question records that as not knowing the content.",
      "El vocabulario es el núcleo del TDL, y el término técnico largo suele ser justamente la palabra que carga la respuesta. El estudiante puede dominar el concepto y no reconocer la etiqueta — y la pregunta lo registra como desconocimiento del contenido.",
    ),
    oQueFazer: ml(
      "Antes de aplicar, liste os termos longos e confira um a um se o aluno os reconhece. Ensinar o rótulo antes da questão não entrega a resposta: separa o que é vocabulário do que é conteúdo, que a questão sozinha mistura.",
      "Before setting the question, list the long terms and check one by one whether the student recognises them. Teaching the label beforehand does not give the answer away: it separates vocabulary from content, which the question alone conflates.",
      "Antes de aplicar, liste los términos largos y verifique uno a uno si el estudiante los reconoce. Enseñar la etiqueta antes de la pregunta no entrega la respuesta: separa lo que es vocabulario de lo que es contenido, que la pregunta sola mezcla.",
    ),
    citations: [ASHA, DLD_PROJECT, RADLD],
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "Palavra longa e pouco frequente é o pior caso da decodificação: não há reconhecimento automático a que recorrer, e cada ocorrência é decodificada do zero. Numa questão que repete o termo cinco vezes, são cinco decodificações completas.",
      "A long, infrequent word is decoding's worst case: there is no automatic recognition to fall back on, and each occurrence is decoded from scratch. In a question that repeats the term five times, that is five full decodings.",
      "Palabra larga y poco frecuente es el peor caso de la decodificación: no hay reconocimiento automático al que recurrir, y cada aparición se decodifica desde cero. En una pregunta que repite el término cinco veces, son cinco decodificaciones completas.",
    ),
    oQueFazer: ml(
      "Trabalhe o termo por sílabas e por partes com significado — bio / disponi / bilidade — antes da questão. O ensino explícito da estrutura da palavra é traço central do ensino estruturado de leitura, e o ganho vale para as próximas questões, não só para esta.",
      "Work the term by syllables and by meaningful parts — bio / availa / bility — before the question. Explicit teaching of word structure is a central feature of structured literacy, and the gain carries to future questions, not only this one.",
      "Trabaje el término por sílabas y por partes con significado — bio / disponi / bilidad — antes de la pregunta. La enseñanza explícita de la estructura de la palabra es rasgo central de la enseñanza estructurada de lectura, y la ganancia vale para las próximas preguntas, no solo para esta.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY],
    evidence: "established",
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "O termo técnico raramente aparece na conversa cotidiana, e o aluno surdo costuma tê-lo encontrado só no texto escrito — sem o apoio da língua oral que os colegas usaram para consolidá-lo. Muitos desses termos não têm sinal padronizado em Libras.",
      "Technical terms seldom appear in everyday conversation, and the Deaf student usually met them only in writing — without the spoken-language support classmates used to consolidate them. Many of these terms have no standardised sign.",
      "El término técnico rara vez aparece en la conversación cotidiana, y el estudiante sordo suele haberlo encontrado solo en el texto escrito — sin el apoyo de la lengua oral que los compañeros usaron para consolidarlo. Muchos de esos términos no tienen seña estandarizada.",
    ),
    oQueFazer: ml(
      "Combine com o aluno e com o intérprete um sinal ou uma soletração para cada termo longo da questão, antes de aplicá-la, e registre a combinação para as próximas. Improvisar o sinal no meio da questão custa a atenção que deveria estar no conteúdo.",
      "Agree with the student and the interpreter on a sign or fingerspelling for each long term in the question before setting it, and record the agreement for next time. Improvising the sign mid-question costs the attention that should be on the content.",
      "Acuerde con el estudiante y el intérprete una seña o un deletreo para cada término largo de la pregunta antes de aplicarla, y registre el acuerdo para las próximas. Improvisar la seña en plena pregunta cuesta la atención que debería estar en el contenido.",
    ),
    citations: [INES_DEBASI, INES],
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "Termos abstratos e longos acumulam duas exigências: reconhecer a palavra e sustentar o conceito que ela nomeia. Substituí-los sem mais nada resolve a leitura e apaga o conteúdo — o termo costuma ser o que a questão está avaliando.",
      "Long abstract terms stack two demands: recognising the word and sustaining the concept it names. Replacing them outright solves the reading and erases the content — the term is often what the question is assessing.",
      "Términos abstractos y largos acumulan dos exigencias: reconocer la palabra y sostener el concepto que nombra. Sustituirlos sin más resuelve la lectura y borra el contenido — el término suele ser lo que la pregunta evalúa.",
    ),
    oQueFazer: ml(
      "Mantenha o termo e acrescente a explicação ao lado, em aposto: \"biodisponibilidade (quanto do remédio o corpo consegue usar)\". O aluno lê a palavra que a questão exige e entende o que ela quer dizer.",
      "Keep the term and add the explanation beside it, in apposition: \"bioavailability (how much of the drug the body can use)\". The student reads the word the question requires and understands what it means.",
      "Mantenga el término y agregue la explicación al lado, en aposición: \"biodisponibilidad (cuánto del medicamento puede usar el cuerpo)\". El estudiante lee la palabra que la pregunta exige y entiende qué significa.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS],
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Termo novo e abstrato é o caso mais difícil quando o acesso é tátil: não há como apontar para o objeto nem mostrar a imagem, e a palavra chega sem referente. Sem experiência direta associada, ela fica sendo só uma sequência de letras longa.",
      "A new abstract term is the hardest case when access is tactile: there is no pointing at the object and no showing the picture, and the word arrives without a referent. With no direct experience attached, it remains just a long string of letters.",
      "Un término nuevo y abstracto es el caso más difícil cuando el acceso es táctil: no hay cómo señalar el objeto ni mostrar la imagen, y la palabra llega sin referente. Sin experiencia directa asociada, queda solo como una secuencia larga de letras.",
    ),
    oQueFazer: ml(
      "Construa o referente antes do termo, com o interveniente e com experiência tátil quando houver como. É trabalho de dias, não de minutos — e por isso a questão de vocabulário denso precisa ser escolhida com antecedência.",
      "Build the referent before the term, with the intervener and with tactile experience where possible. It is days of work, not minutes — which is why a dense-vocabulary question must be chosen in advance.",
      "Construya el referente antes que el término, con el interviniente y con experiencia táctil cuando sea posible. Es trabajo de días, no de minutos — y por eso la pregunta de vocabulario denso debe elegirse con antelación.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, NCDB_MODULOS],
  },
]

/** As células escritas para uma especialidade, entre as barreiras detectadas na questão. */
export function celulasDe(barreiras: readonly string[], especialidade: string): CelulaDaMatriz[] {
  return MATRIZ.filter((c) => c.especialidade === especialidade && barreiras.includes(c.barreira))
}

/**
 * Quantos pares têm célula, de quantos possíveis — e quais especialidades ainda
 * não têm nenhuma.
 *
 * Existe pelo mesmo motivo do `cobertura()` dos guias: lacuna precisa aparecer.
 * Uma especialidade sem nenhuma célula é indistinguível, na tela, de uma
 * especialidade para a qual nenhuma barreira importa — e as duas coisas são
 * muito diferentes.
 */
export function coberturaDaMatriz(especialidades: readonly string[], barreiras: readonly string[]) {
  const escritas = new Set(MATRIZ.map((c) => `${c.barreira}|${c.especialidade}`))
  const semNenhuma = especialidades.filter((e) => !MATRIZ.some((c) => c.especialidade === e))

  return {
    escritas: escritas.size,
    total: especialidades.length * barreiras.length,
    especialidadesSemCelula: semNenhuma,
  }
}
