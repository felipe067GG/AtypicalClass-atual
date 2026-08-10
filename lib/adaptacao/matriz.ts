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
 * ## A matriz está completa, e o que isso custou para ser verdade
 *
 * São 8 barreiras × 14 especialidades = 112 pares possíveis, e as 112 células
 * estão escritas. Não foi assim desde o começo: três pares ficaram declarados
 * como lacuna por um tempo — período longo e vocabulário denso em disgrafia, e
 * período longo em deficiência física —, sob o argumento de que comprimento de
 * frase e palavra longa "não passam pela mão".
 *
 * O argumento estava errado, e vale registrar por quê, porque é o mesmo erro
 * que qualquer célula futura pode repetir: ele tratava a especialidade pelo
 * sintoma mais visível. Disgrafia não é só traçado — quem escreve com esforço
 * produz frases curtas, e o período longo é uma construção que essa escrita não
 * exercita; a palavra longa é o pior caso da ortografia, e é evitada em vez de
 * errada, o que se registra como desconhecimento do termo. Deficiência física
 * não é só o custo de acionamento — linha longa é onde o acompanhamento visual
 * se perde quando sustentar a cabeça custa esforço, e um período de 25 palavras
 * lido em voz alta pede fôlego que nem toda condição neuromuscular tem.
 *
 * Nenhuma dessas três é conselho genérico, e nenhuma repete outra célula.
 * **Lacuna declarada continua sendo uma opção legítima** — mas ela precisa
 * sobreviver a uma segunda leitura, e estas três não sobreviveram.
 *
 * Célula ausente quer dizer **não escrita**, e `coberturaDaMatriz()` a mostra
 * como lacuna em vez de deixá-la passar por acabada. É a mesma convenção do
 * `cobertura()` dos guias, em `index.ts`, e continua valendo se uma barreira
 * nova entrar: as 14 células dela nascem vazias.
 *
 * ## A linha de altas habilidades é invertida de propósito
 *
 * Cinco das oito células de altas habilidades não descrevem dificuldade, e sim
 * o contrário: a barreira que trava a turma costuma ser o único ponto da questão
 * que ainda exige algo deste aluno, e a adaptação é aprofundar ali em vez de
 * aliviar. Dizer isso é mais honesto do que deixar a linha vazia como se a
 * barreira não tivesse efeito nenhum sobre ele — tem, e é o desinteresse. As
 * outras três (enunciado longo, período longo e alternativas longas) são
 * dificuldade de verdade, e por motivos que não valem para mais ninguém aqui:
 * ler rápido demais, ler a mais, e não conhecer a convenção da melhor
 * alternativa.
 *
 * ## O teto do alcance é 87%, e não 100%
 *
 * 470 das 3.495 questões (13%) não disparam barreira nenhuma. Para elas não há
 * o que orientar — e não deveria haver: o detector diz que a questão não impõe
 * nenhuma das oito dificuldades medidas. Onze das catorze especialidades já
 * estão nesse teto.
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

export const WWC_MATEMATICA_2021: Citation = {
  label: "IES / What Works Clearinghouse — Assisting Students Struggling with Mathematics (guia de 2021, PDF)",
  url: "https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/WWC2021006-Math-PG.pdf",
}

export const WWC_RESOLUCAO: Citation = {
  label: "IES / What Works Clearinghouse — Improving Mathematical Problem Solving in Grades 4 Through 8 (PDF)",
  url: "https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/MPS_PG_043012.pdf",
}

export const WWC_MATEMATICA_INICIAIS: Citation = {
  label: "WWC — Assisting Students Struggling with Mathematics: intervenção nos anos iniciais",
  url: "https://ies.ed.gov/ncee/wwc/practiceguide/26",
}

export const WWC_ESCRITA_FINAIS: Citation = {
  label: "WWC — guia prático de escrita para os anos finais",
  url: "https://ies.ed.gov/ncee/wwc/practiceguide/28",
}

export const WWC_ESCRITA_INICIAIS: Citation = {
  label: "IES / WWC — Teaching Elementary School Students to Be Effective Writers",
  url: "https://ies.ed.gov/ncee/wwc/practiceguide/17",
}

export const WWC_ESCRITA_RESUMO: Citation = {
  label: "WWC — resumo do guia de escrita (PDF)",
  url: "https://ies.ed.gov/ncee/wwc/Docs/practiceguide/wwc_writingpg_summary_092314.pdf",
}

export const READING_ROCKETS_ESCRITA: Citation = {
  label: "Reading Rockets — escrita: artigos e estratégias",
  url: "https://www.readingrockets.org/topics/writing",
}

export const WWC_RTI_MATEMATICA: Citation = {
  label: "WWC — resposta à intervenção em matemática, ensino fundamental (guia de 2009)",
  url: "https://ies.ed.gov/ncee/wwc/practiceguide/2",
}

export const ERIC_RTI_MATEMATICA: Citation = {
  label: "ERIC — registro completo do guia de resposta à intervenção em matemática",
  url: "https://eric.ed.gov/?id=ED504995",
}

export const NCII: Citation = {
  label: "NCII — National Center on Intensive Intervention",
  url: "https://intensiveintervention.org/",
}

export const NCII_MATEMATICA: Citation = {
  label: "NCII — princípios para desenhar intervenção em matemática",
  url: "https://intensiveintervention.org/resource/principles-designing-intervention-mathematics",
}

export const NCIL_DEFICIENCIA_INTELECTUAL: Citation = {
  label: "National Center on Improving Literacy — planejar o ensino de leitura na deficiência intelectual",
  url: "https://improvingliteracy.org/resource/considerations-when-planning-literacy-instruction-for-students-with-intellectual-disabilities/",
}

export const NCIL_STRUCTURED_LITERACY: Citation = {
  label: "National Center on Improving Literacy — os traços do ensino estruturado de leitura",
  url: "https://improvingliteracy.org/resource/features-of-structured-literacy-instruction/",
}

export const READING_ROCKETS_SL: Citation = {
  label: "Reading Rockets — Structured Literacy: os fundamentos",
  url: "https://www.readingrockets.org/topics/about-reading/articles/structured-literacy-instruction-basics",
}

export const UNDERSTOOD_TDAH: Citation = {
  label: "Understood — adaptações de sala de aula para alunos com TDAH",
  url: "https://www.understood.org/en/articles/classroom-accommodations-for-adhd",
}

export const CDC_TDAH: Citation = {
  label: "CDC — ADHD in the Classroom: estratégias de manejo comportamental",
  url: "https://www.cdc.gov/adhd/treatment/classroom.html",
}

export const CDC_SAUDE_MENTAL: Citation = {
  label: "CDC — saúde mental e bem-estar na escola",
  url: "https://www.cdc.gov/healthy-youth/mental-health/index.html",
}

export const CDC_SAUDE_MENTAL_AULA: Citation = {
  label: "CDC — educação em saúde mental em sala de aula",
  url: "https://www.cdc.gov/healthy-youth/mental-health/mental-health-education.html",
}

export const OMS_ADOLESCENTE: Citation = {
  label: "Organização Mundial da Saúde — saúde do adolescente",
  url: "https://www.who.int/health-topics/adolescent-health",
}

export const CAST_UDL: Citation = {
  label: "CAST — Diretrizes do Desenho Universal para a Aprendizagem",
  url: "https://udlguidelines.cast.org/",
}

export const PATHS_BRAILLE: Citation = {
  label: "Paths to Literacy — braille: estratégias, pré-braille e gráficos táteis",
  url: "https://www.pathstoliteracy.org/braille/",
}

export const PATHS_SURDOCEGUEIRA: Citation = {
  label: "Paths to Literacy — letramento e surdocegueira",
  url: "https://www.pathstoliteracy.org/deafblindness/",
}

export const PATHS_TECNOLOGIA: Citation = {
  label: "Paths to Literacy — tecnologia assistiva para leitura",
  url: "https://www.pathstoliteracy.org/technology/",
}

export const APH: Citation = {
  label: "American Printing House — recursos educacionais",
  url: "https://www.aph.org/educational-resources/",
}

export const NCDB_MODULOS: Citation = {
  label: "NCDB — módulos Open Hands, Open Access para interventores",
  url: "https://moodle.nationaldb.org/course/index.php",
}

export const DSE_LEITURA: Citation = {
  label: "DSE — ensinar a ler na síndrome de Down",
  url: "https://www.down-syndrome.org/en-us/library/research-practice/01/1/teaching-down-syndrome-read/",
}

export const DSE_MEMORIA: Citation = {
  label: "DSE — efeito do ensino de leitura sobre linguagem e memória (estudo de 4 anos)",
  url: "https://www.down-syndrome.org/en-us/library/research-practice/03/2/influence-reading-instruction-language-memory-development-down-syndrome/",
}

export const IES_DOWN: Citation = {
  label: "IES — ensino de leitura para crianças com síndrome de Down",
  url: "https://ies.ed.gov/learn/blog/enhancing-reading-instruction-children-down-syndrome",
}

export const RADLD: Citation = {
  label: "RADLD — campanha internacional de conscientização sobre TDL",
  url: "https://radld.org/",
}

export const DLD_PROJECT: Citation = {
  label: "The DLD Project — formação baseada em evidência sobre TDL",
  url: "https://thedldproject.com/dld-training/",
}

export const ASHA: Citation = {
  label: "ASHA — American Speech-Language-Hearing Association",
  url: "https://www.asha.org/",
}

export const AFIRM_APOIOS_VISUAIS: Citation = {
  label: "AFIRM (FPG / UNC) — apoios visuais como prática com evidência no TEA",
  url: "https://afirm.fpg.unc.edu/visual-supports",
}

export const NCAEP: Citation = {
  label: "NCAEP (2020) — 28 práticas com evidência para TEA, revisão 1990–2017",
  url: "https://autismpdc.fpg.unc.edu/ebps/",
}

export const INES_DEBASI: Citation = {
  label: "INES — biblioteca digital com material em Libras e Português",
  url: "https://debasi.ines.gov.br/",
}

export const INES: Citation = {
  label: "INES — Instituto Nacional de Educação de Surdos (MEC)",
  url: "https://www.ines.gov.br/",
}

export const UCONN_SEM: Citation = {
  label: "UConn / Renzulli Center — pesquisa sobre o Schoolwide Enrichment Model",
  url: "https://gifted.uconn.edu/schoolwide-enrichment-model/semresearch/",
}

export const UCONN_SEM_ARTIGOS: Citation = {
  label: "Renzulli Center / UConn — artigos e apresentações do Schoolwide Enrichment Model",
  url: "https://gifted.uconn.edu/schoolwide-enrichment-model/semart/",
}

export const RENZULLI_SEM_PDF: Citation = {
  label: "The Schoolwide Enrichment Model — visão geral do modelo (PDF)",
  url: "https://renzullilearning.com/wp-content/uploads/2018/07/The-Schoolwide-Enrichment-Model.pdf",
}

export const ERIC_ENRIQUECIMENTO: Citation = {
  label: "Enriquecimento e pedagogia da educação de superdotados (ERIC, PDF)",
  url: "https://files.eric.ed.gov/fulltext/EJ1317646.pdf",
}

export const CEEDAR_ALTERNATIVO: Citation = {
  label: "CEEDAR / Univ. da Flórida — práticas com evidência para deficiências severas (PDF)",
  url: "https://ceedar.education.ufl.edu/wp-content/uploads/2014/03/Evidence-based-Practices-for-Students-with-Severe-Disabilities.pdf",
}

export const PROMOTING_PROGRESS: Citation = {
  label: "Promoting Progress — práticas de ensino com evidência",
  url: "https://promotingprogress.org/resource-collections/evidence-based-instructional-practices",
}

export const TIES_PARTICIPACAO: Citation = {
  label: "TIES Center / Univ. de Minnesota — práticas instrucionais e participação (PDF)",
  url: "https://ici-s.umn.edu/files/YtCaKA6y-K?fileGroup=pdf",
}

export const AFIRM_ANALISE_DE_TAREFA: Citation = {
  label: "AFIRM (FPG / UNC) — análise de tarefa como prática com evidência no TEA",
  url: "https://afirm.fpg.unc.edu/task-analysis",
}

export const AFIRM_ANTECEDENTES: Citation = {
  label: "AFIRM (FPG / UNC) — intervenções baseadas em antecedentes",
  url: "https://afirm.fpg.unc.edu/antecedent-based-interventions",
}

export const AFIRM_NARRATIVAS: Citation = {
  label: "AFIRM (FPG / UNC) — narrativas sociais",
  url: "https://afirm.fpg.unc.edu/social-narratives",
}

export const NAGC: Citation = {
  label: "NAGC — National Association for Gifted Children",
  url: "https://www.nagc.org/",
}

export const APH_RECURSOS: Citation = {
  label: "American Printing House for the Blind — recursos para educadores",
  url: "https://www.aph.org/resources/",
}

export const PATHS_LETRAMENTO: Citation = {
  label: "Paths to Literacy — comunidade de prática em letramento para cegueira e baixa visão",
  url: "https://www.pathstoliteracy.org/",
}

export const NCIL: Citation = {
  label: "National Center on Improving Literacy",
  url: "https://improvingliteracy.org/",
}

export const UNDERSTOOD_LITERACIA: Citation = {
  label: "Understood — o que é Structured Literacy, em linguagem para famílias e professores",
  url: "https://www.understood.org/en/articles/what-is-structured-literacy",
}

export const READING_ROCKETS_FONOLOGIA: Citation = {
  label: "Reading Rockets — consciência fonológica e fonêmica",
  url: "https://www.readingrockets.org/topics/phonological-and-phonemic-awareness",
}

export const DSRF_LEITURA: Citation = {
  label: "Down Syndrome Resource Foundation — leitura",
  url: "https://dsrf.org/resources/information/education/reading/",
}

export const PMC_TDL_LEITURA: Citation = {
  label: "Estratégias de leitura para crianças com TDL — revisão (PMC)",
  url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9688349/",
}

export const PMC_TDAH_REVISAO: Citation = {
  label: "Revisão de intervenções psicossociais com evidência para TDAH (2024)",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11162428/",
}

export const INES_MATERIAIS: Citation = {
  label: "INES — materiais didáticos para uso em sala",
  url: "https://debasi.ines.gov.br/materiais-did%C3%A1ticos",
}

export const CADEAFBLIND_INTERVENTOR: Citation = {
  label: "California Deafblind Services — o papel do interventor",
  url: "https://cadeafblind.org/interveners/",
}

export const USU_INTERVENTOR: Citation = {
  label: "Utah State University — recursos de formação de interventores",
  url: "https://idrpp.usu.edu/projects/intervener/niaa-resources/index.php",
}

export const NCDB_MOODLE: Citation = {
  label: "NCDB — plataforma de cursos Open Hands, Open Access",
  url: "https://moodle.nationaldb.org/",
}

export const AAC_APRENDER: Citation = {
  label: "AssistiveWare — Learn AAC: guia prático sobre comunicação alternativa",
  url: "https://www.assistiveware.com/learn-aac",
}

export const AAC_INSTITUTE: Citation = {
  label: "AAC Institute — comunicação aumentativa e alternativa",
  url: "https://www.aacinstitute.org/",
}

export const UNDERSTOOD_MATEMATICA: Citation = {
  label: "Understood — ensino de matemática com evidência para alunos com dificuldade",
  url: "https://www.understood.org/en/articles/evidence-based-math-instruction-for-struggling-students",
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
  {
    barreira: "leitura-longa",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "Um enunciado do quarto superior do acervo é lido como veredito antes de ser lido como pergunta — \"isto vai demorar, e eu não vou dar conta\". O que se gasta nos primeiros minutos é antecipação, não leitura, e o aluno relê o mesmo parágrafo sem que nada fique. Não saber onde o texto termina é parte do peso: o vão sem fim é pior que o texto.",
      "A stem in the collection's top quarter is read as a verdict before it is read as a question — \"this will take long, and I will not manage\". What the first minutes spend is anticipation, not reading, and the student rereads the same paragraph with nothing sticking. Not knowing where the text ends is part of the weight: the open-ended stretch is worse than the text.",
      "Un enunciado del cuarto superior del acervo se lee como veredicto antes que como pregunta — \"esto va a tardar, y no voy a poder\". Lo que se gasta en los primeros minutos es anticipación, no lectura, y el estudiante relee el mismo párrafo sin que nada quede. No saber dónde termina el texto es parte del peso: el tramo sin final es peor que el texto.",
    ),
    oQueFazer: ml(
      "Diga de antemão quantos parágrafos são e onde fica a pergunta, e marque no papel um ponto de parada legítimo no meio. E combine uma regra para a releitura — ler duas vezes e seguir —, porque sem regra reler vira o modo de adiar a resposta, e o tempo inteiro cabe no primeiro parágrafo.",
      "Say in advance how many paragraphs there are and where the question sits, and mark a legitimate stopping point mid-text on the paper. And agree on a rule for re-reading — read twice, then move on — because without a rule re-reading becomes the way to postpone answering, and the whole time fits inside the first paragraph.",
      "Diga de antemano cuántos párrafos son y dónde está la pregunta, y marque en el papel un punto de parada legítimo en el medio. Y acuerde una regla para la relectura — leer dos veces y seguir —, porque sin regla releer se vuelve el modo de aplazar la respuesta, y todo el tiempo cabe en el primer párrafo.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, CAST_UDL],
  },
  {
    barreira: "leitura-longa",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "O enunciado longo não pede mais leitura, pede mais acesso: rolar a tela, sustentar a postura, manter o olhar no rastreador por minutos seguidos. Cada volta ao começo do texto custa a sequência de acionamentos inteira de novo, e a fadiga chega antes do fim da prova — o desempenho cai ao longo das questões por motivo que nada tem a ver com o que o aluno sabe.",
      "A long stem does not ask for more reading, it asks for more access: scrolling, holding posture, keeping the gaze on the tracker for minutes on end. Every return to the top of the text costs the whole sequence of activations again, and fatigue arrives before the test ends — performance drops across questions for a reason that has nothing to do with what the student knows.",
      "El enunciado largo no pide más lectura, pide más acceso: desplazar la pantalla, sostener la postura, mantener la mirada en el seguidor por minutos seguidos. Cada vuelta al comienzo del texto cuesta la secuencia de activaciones completa otra vez, y la fatiga llega antes del final de la prueba — el desempeño cae a lo largo de las preguntas por un motivo que nada tiene que ver con lo que el estudiante sabe.",
    ),
    oQueFazer: ml(
      "Ponha o enunciado inteiro numa única superfície de leitura, sem rolagem, e mantenha o comando visível junto do texto para que consultar não exija navegar. Combine as pausas por tempo, e não por questão terminada: parar no meio de uma questão longa precisa ser possível sem perder o lugar.",
      "Put the whole stem on a single reading surface, with no scrolling, and keep the question visible alongside the text so that checking it does not require navigating. Schedule breaks by time, not by finished question: stopping in the middle of a long question must be possible without losing your place.",
      "Ponga el enunciado entero en una sola superficie de lectura, sin desplazamiento, y mantenga el comando visible junto al texto para que consultarlo no exija navegar. Acuerde las pausas por tiempo, y no por pregunta terminada: detenerse en medio de una pregunta larga debe ser posible sin perder el lugar.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO],
  },
  {
    barreira: "leitura-longa",
    especialidade: "autismo",
    oQueSignifica: ml(
      "O que cresce com o tamanho não é só a leitura: é a quantidade de contexto que não vai ser usada. Enunciado longo do ENEM costuma trazer texto literário ou jornalístico, com expressão figurada que não vem marcada como figurada — e a questão passa a depender de decidir o que é literal, decisão que o texto não ajuda a tomar.",
      "What grows with length is not only the reading: it is the amount of context that will not be used. A long ENEM stem usually carries literary or journalistic text, with figurative expressions that arrive unmarked as figurative — and the question comes to depend on deciding what is literal, a decision the text gives no help with.",
      "Lo que crece con la extensión no es solo la lectura: es la cantidad de contexto que no se usará. Un enunciado largo del ENEM suele traer texto literario o periodístico, con expresiones figuradas que no vienen marcadas como tales — y la pregunta pasa a depender de decidir qué es literal, decisión que el texto no ayuda a tomar.",
    ),
    oQueFazer: ml(
      "Marque no próprio texto o trecho de que a resposta depende, e diga quais expressões estão em sentido figurado antes de perguntar qualquer coisa. Não é entregar a resposta: é separar \"o que o texto diz\" de \"o que a questão quer\", que num enunciado longo chegam embaralhados.",
      "Mark on the text itself the passage the answer depends on, and say which expressions are figurative before asking anything. It is not giving the answer away: it is separating \"what the text says\" from \"what the question wants\", which in a long stem arrive tangled together.",
      "Marque en el propio texto el fragmento del que depende la respuesta, y diga qué expresiones están en sentido figurado antes de preguntar nada. No es entregar la respuesta: es separar \"lo que el texto dice\" de \"lo que la pregunta quiere\", que en un enunciado largo llegan mezclados.",
    ),
    citations: [AFIRM_APOIOS_VISUAIS, AFIRM_ANTECEDENTES, NCAEP],
    evidence: "established",
  },
  {
    barreira: "leitura-longa",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "Ler oito parágrafos em segunda língua não é ler oito parágrafos: é traduzir sem parar, e o cansaço chega antes da pergunta. A coesão entre parágrafos distantes — \"esse processo\", \"como se viu\" — é onde o português escrito mais se afasta da Libras, e o texto longo tem mais dessas amarras do que o curto.",
      "Reading eight paragraphs in a second language is not reading eight paragraphs: it is translating without pause, and fatigue arrives before the question does. Cohesion across distant paragraphs — \"this process\", \"as was seen\" — is where written Portuguese departs most from sign language, and a long text has more of those ties than a short one.",
      "Leer ocho párrafos en segunda lengua no es leer ocho párrafos: es traducir sin parar, y el cansancio llega antes que la pregunta. La cohesión entre párrafos distantes — \"ese proceso\", \"como se vio\" — es donde el portugués escrito más se aleja de la lengua de señas, y el texto largo tiene más de esas amarras que el corto.",
    ),
    oQueFazer: ml(
      "Divida o enunciado em blocos e feche cada bloco com o aluno dizendo em Libras o que aquele trecho afirmou, antes de seguir. E registre os termos que reaparecem ao longo do texto: quando o mesmo referente muda de nome entre parágrafos, é aí que o fio se perde, e não no vocabulário isolado.",
      "Split the stem into blocks and close each block with the student saying in sign language what that passage stated, before moving on. And note the terms that reappear along the text: when the same referent changes name between paragraphs, that is where the thread is lost, not in isolated vocabulary.",
      "Divida el enunciado en bloques y cierre cada bloque con el estudiante diciendo en lengua de señas qué afirmó ese fragmento, antes de seguir. Y registre los términos que reaparecen a lo largo del texto: cuando el mismo referente cambia de nombre entre párrafos, ahí es donde se pierde el hilo, y no en el vocabulario aislado.",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, INES],
  },
  {
    barreira: "leitura-longa",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Aqui o problema não é a quantidade de números, é a distância entre eles. Num enunciado longo, a relação entre duas grandezas — \"o triplo de\", \"a cada dois\", \"metade do anterior\" — é dita em palavras num parágrafo e cobrada três parágrafos depois. Reconstruir a relação a cada vez que ela é necessária é o que custa, e num texto longo ela é necessária três vezes.",
      "Here the problem is not how many numbers there are, it is the distance between them. In a long stem, the relation between two quantities — \"three times\", \"for every two\", \"half the previous one\" — is stated in words in one paragraph and required three paragraphs later. Rebuilding the relation each time it is needed is what costs, and in a long text it is needed three times.",
      "Aquí el problema no es la cantidad de números, es la distancia entre ellos. En un enunciado largo, la relación entre dos magnitudes — \"el triple de\", \"cada dos\", \"la mitad de la anterior\" — se dice con palabras en un párrafo y se exige tres párrafos después. Reconstruir la relación cada vez que hace falta es lo que cuesta, y en un texto largo hace falta tres veces.",
    ),
    oQueFazer: ml(
      "Antes de olhar valor nenhum, monte com o aluno o mapa das relações: quem é maior que quem, o que depende do quê — só com palavras e setas. Os números entram depois, num mapa que já está pronto. Inverter a ordem, valores primeiro, é o que obriga a ler o enunciado longo duas vezes.",
      "Before looking at a single value, build the map of relations with the student: which is larger than which, what depends on what — words and arrows only. The numbers come afterwards, into a map already built. Reversing the order, values first, is what forces the long stem to be read twice.",
      "Antes de mirar valor alguno, arme con el estudiante el mapa de las relaciones: quién es mayor que quién, qué depende de qué — solo con palabras y flechas. Los números entran después, en un mapa ya listo. Invertir el orden, valores primero, es lo que obliga a leer dos veces el enunciado largo.",
    ),
    citations: [WWC_RESOLUCAO, WWC_MATEMATICA_2021, UNDERSTOOD_MATEMATICA],
    evidence: "established",
  },
  {
    barreira: "leitura-longa",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "Texto longo se atravessa anotando: sublinhar o dado, escrever a palavra-chave na margem, marcar o parágrafo que interessa. Para quem escrever custa, o enunciado longo cobra duas coisas ao mesmo tempo — acompanhar o texto e produzir o registro que o acompanha —, e a segunda é abandonada. Sem registro resta reler, que é o gasto que a anotação existia para evitar.",
      "A long text is crossed by annotating: underlining the datum, writing the key word in the margin, marking the paragraph that matters. For a student to whom writing costs, a long stem demands two things at once — following the text and producing the record that follows it — and the second is dropped. With no record, re-reading is what is left, which is the expense annotation existed to avoid.",
      "El texto largo se atraviesa anotando: subrayar el dato, escribir la palabra clave al margen, marcar el párrafo que interesa. Para quien escribir cuesta, el enunciado largo exige dos cosas a la vez — seguir el texto y producir el registro que lo acompaña — y la segunda se abandona. Sin registro queda releer, que es el gasto que la anotación existía para evitar.",
    ),
    oQueFazer: ml(
      "Troque a anotação escrita por marcação que não exija traçado: colchete, cor, uma etiqueta adesiva por parágrafo. Onde a marca precisar de palavra, aceite a abreviação combinada ou o ditado. O que a anotação faz pelo aluno é permitir voltar ao ponto certo, e isso um traço de caneta faz tão bem quanto uma frase bem escrita.",
      "Swap written annotation for marking that needs no handwriting: a bracket, a colour, one sticky tab per paragraph. Where the mark needs a word, accept an agreed abbreviation or dictation. What annotation does for the student is allow returning to the right spot, and a pen stroke does that as well as a well-formed sentence.",
      "Cambie la anotación escrita por marcación que no exija trazo: corchete, color, una etiqueta adhesiva por párrafo. Donde la marca necesite palabra, acepte la abreviatura acordada o el dictado. Lo que la anotación hace por el estudiante es permitir volver al punto correcto, y eso un trazo de lápiz lo hace tan bien como una frase bien escrita.",
    ),
    citations: [WWC_ESCRITA_FINAIS, READING_ROCKETS_ESCRITA, NCII],
  },
  {
    barreira: "leitura-longa",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "Enunciado longo raramente é obstáculo aqui — é onde a leitura rápida vira armadilha. O aluno atravessa o texto em segundos, reconhece o assunto e responde pelo que sabe do assunto, não pelo que aquele texto específico afirma. O dado que muda a resposta costuma estar na última linha, e é exatamente a linha que a leitura por reconhecimento pula.",
      "A long stem is rarely an obstacle here — it is where fast reading turns into a trap. The student crosses the text in seconds, recognises the topic and answers from what they know about the topic, not from what this particular text states. The datum that changes the answer usually sits in the last line, and that is exactly the line recognition-reading skips.",
      "El enunciado largo rara vez es obstáculo aquí — es donde la lectura rápida se vuelve trampa. El estudiante atraviesa el texto en segundos, reconoce el tema y responde por lo que sabe del tema, no por lo que ese texto específico afirma. El dato que cambia la respuesta suele estar en la última línea, y es justamente la línea que la lectura por reconocimiento se salta.",
    ),
    oQueFazer: ml(
      "Peça, antes da resposta, a condição que o enunciado impõe — o ano, a exceção, o \"desde que\". Uma pergunta só, e antes. Não é desconfiança do aluno: é que a leitura por reconhecimento acerta quase sempre, e por isso o erro dela nunca chega a ser revisto.",
      "Before the answer, ask for the condition the stem imposes — the year, the exception, the \"provided that\". One question, and beforehand. It is not distrust of the student: it is that recognition-reading is right nearly always, and so its errors never get reviewed.",
      "Pida, antes de la respuesta, la condición que impone el enunciado — el año, la excepción, el \"siempre que\". Una sola pregunta, y antes. No es desconfianza del estudiante: es que la lectura por reconocimiento acierta casi siempre, y por eso su error nunca llega a revisarse.",
    ),
    citations: [NAGC, UCONN_SEM],
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
  {
    barreira: "periodo-longo",
    especialidade: "autismo",
    oQueSignifica: ml(
      "A oração encaixada é onde o enunciado esconde a condição sem dizer que é condição — \"admitindo que a temperatura se mantenha\", \"ainda que o preço varie\". O aluno costuma responder com precisão à frase que leu; se a condição ficou dentro de uma subordinada no meio de um período de trinta palavras, ele responde com precisão à pergunta errada.",
      "The embedded clause is where the stem hides the condition without saying it is a condition — \"assuming the temperature holds\", \"even if the price varies\". The student usually answers precisely the sentence they read; if the condition sat inside a subordinate clause in the middle of a thirty-word period, they answer the wrong question precisely.",
      "La oración subordinada es donde el enunciado esconde la condición sin decir que es condición — \"admitiendo que la temperatura se mantenga\", \"aunque el precio varíe\". El estudiante suele responder con precisión a la frase que leyó; si la condición quedó dentro de una subordinada en medio de un período de treinta palabras, responde con precisión a la pregunta equivocada.",
    ),
    oQueFazer: ml(
      "Separe o período em duas linhas: a afirmação principal e, embaixo, a condição, marcada como condição. Ver que existe uma condição, e que ela é uma só, resolve o que parecia interpretação — é o que a análise de tarefa faz com sequência, aplicado à frase: tornar explícito o que estava implícito.",
      "Split the period into two lines: the main claim and, below it, the condition, marked as a condition. Seeing that a condition exists, and that there is only one, resolves what looked like interpretation — it is what task analysis does with sequence, applied to a sentence: making explicit what was implicit.",
      "Separe el período en dos líneas: la afirmación principal y, debajo, la condición, marcada como condición. Ver que existe una condición, y que es una sola, resuelve lo que parecía interpretación — es lo que el análisis de tarea hace con la secuencia, aplicado a la frase: explicitar lo que estaba implícito.",
    ),
    citations: [AFIRM_ANALISE_DE_TAREFA, AFIRM_APOIOS_VISUAIS, NCAEP],
    evidence: "established",
  },
  {
    barreira: "periodo-longo",
    especialidade: "tdah",
    oQueSignifica: ml(
      "A diferença entre um período de 12 palavras e um de 25 não é o tamanho: é que o segundo não oferece ponto de reentrada. Quando a atenção se solta no meio — e ela se solta —, não há onde retomar sem voltar ao começo do período, e o aluno relê a frase inteira várias vezes achando que não entendeu.",
      "The difference between a 12-word period and a 25-word one is not size: it is that the second offers no re-entry point. When attention slips mid-sentence — and it does — there is nowhere to resume without going back to the start of the period, and the student rereads the whole sentence several times believing they did not understand it.",
      "La diferencia entre un período de 12 palabras y uno de 25 no es el tamaño: es que el segundo no ofrece punto de reentrada. Cuando la atención se suelta en medio — y se suelta —, no hay dónde retomar sin volver al comienzo del período, y el estudiante relee la frase entera varias veces creyendo que no entendió.",
    ),
    oQueFazer: ml(
      "Marque as vírgulas do período com uma barra e trate cada pedaço como uma parada onde é permitido reentrar; peça que ele diga o pedaço em voz alta antes de seguir. Não é para simplificar a frase: é para que perder o fio custe um pedaço, e não o período inteiro.",
      "Mark the period's commas with a slash and treat each chunk as a stop where re-entry is allowed; ask the student to say the chunk aloud before moving on. It is not to simplify the sentence: it is so that losing the thread costs one chunk instead of the whole period.",
      "Marque las comas del período con una barra y trate cada trozo como una parada donde se permite reentrar; pida que diga el trozo en voz alta antes de seguir. No es para simplificar la frase: es para que perder el hilo cueste un trozo, y no el período entero.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, PMC_TDAH_REVISAO],
  },
  {
    barreira: "periodo-longo",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "O leitor de tela navega por frase: um período de 25 palavras é uma unidade só, que se ouve inteira ou não se ouve. Voltar para conferir o sujeito custa reouvir tudo, e a fala sintética não dá a entonação que ajudaria a segurar a estrutura — o que na leitura visual seria uma passada de olho no começo da linha, aqui é o período de novo, do zero.",
      "A screen reader navigates by sentence: a 25-word period is a single unit, heard whole or not at all. Going back to check the subject costs listening to all of it again, and synthetic speech gives none of the intonation that would help hold the structure — what in visual reading would be a glance at the start of the line is, here, the period again from scratch.",
      "El lector de pantalla navega por frase: un período de 25 palabras es una sola unidad, que se oye entera o no se oye. Volver para verificar el sujeto cuesta reoír todo, y el habla sintética no da la entonación que ayudaría a sostener la estructura — lo que en la lectura visual sería un vistazo al comienzo de la línea, aquí es el período otra vez, desde cero.",
    ),
    oQueFazer: ml(
      "Reescreva o período mais longo em duas ou três frases antes de entregar o material em áudio ou em braille, mantendo as palavras. Assim cada unidade de navegação passa a ser uma unidade de sentido, e o aluno consegue voltar ao pedaço em vez de voltar ao começo.",
      "Rewrite the longest period as two or three sentences before delivering the material in audio or braille, keeping the words. Each navigation unit then becomes a unit of meaning, and the student can go back to the chunk instead of back to the beginning.",
      "Reescriba el período más largo en dos o tres frases antes de entregar el material en audio o en braille, manteniendo las palabras. Así cada unidad de navegación pasa a ser una unidad de sentido, y el estudiante puede volver al trozo en vez de volver al comienzo.",
    ),
    citations: [PATHS_TECNOLOGIA, PATHS_LETRAMENTO, APH_RECURSOS],
  },
  {
    barreira: "periodo-longo",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Num período longo, a ordem das operações vem da sintaxe: \"o triplo do que sobrou depois de retirados dois quintos\" pede que se calcule de trás para frente, e a frase não avisa. Executar na ordem em que se leu produz a conta correta na ordem errada — o erro mais difícil de encontrar depois, porque cada passo isolado está certo.",
      "In a long period, the order of operations comes from the syntax: \"three times what was left after two fifths were removed\" asks to be computed backwards, and the sentence gives no warning. Executing in reading order produces correct arithmetic in the wrong order — the hardest error to find afterwards, because every isolated step is right.",
      "En un período largo, el orden de las operaciones viene de la sintaxis: \"el triple de lo que sobró después de retirados dos quintos\" pide calcular de atrás hacia adelante, y la frase no avisa. Ejecutar en el orden en que se leyó produce la cuenta correcta en el orden equivocado — el error más difícil de encontrar después, porque cada paso aislado está bien.",
    ),
    oQueFazer: ml(
      "Numere as operações na própria frase, na ordem em que devem ser feitas, antes de calcular qualquer coisa: 1 sobre \"retirados dois quintos\", 2 sobre \"o triplo\". Traduzir a frase para a ordem das contas é uma etapa, e tratá-la como etapa é o que a torna ensinável.",
      "Number the operations on the sentence itself, in the order they must be done, before calculating anything: 1 over \"two fifths were removed\", 2 over \"three times\". Translating the sentence into the order of operations is a step, and treating it as a step is what makes it teachable.",
      "Numere las operaciones en la propia frase, en el orden en que deben hacerse, antes de calcular nada: 1 sobre \"retirados dos quintos\", 2 sobre \"el triple\". Traducir la frase al orden de las cuentas es una etapa, y tratarla como etapa es lo que la vuelve enseñable.",
    ),
    citations: [WWC_RESOLUCAO, WWC_MATEMATICA_2021, NCII_MATEMATICA],
    evidence: "established",
  },
  {
    barreira: "periodo-longo",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "Perder o fio no meio de um período de 25 palavras acontece com qualquer um; a diferença aqui é a leitura que se faz disso. Reler a mesma frase três vezes produz uma conclusão sobre si — \"não consigo nem ler uma frase\" — que pesa na questão seguinte mais do que a frase pesou nesta.",
      "Losing the thread halfway through a 25-word period happens to anyone; the difference here is the reading made of it. Rereading the same sentence three times produces a conclusion about oneself — \"I cannot even read a sentence\" — that weighs on the next question more than the sentence weighed on this one.",
      "Perder el hilo en medio de un período de 25 palabras le pasa a cualquiera; la diferencia aquí es la lectura que se hace de eso. Releer la misma frase tres veces produce una conclusión sobre sí mismo — \"no consigo ni leer una frase\" — que pesa en la pregunta siguiente más de lo que la frase pesó en esta.",
    ),
    oQueFazer: ml(
      "Diga em voz alta que aquele período é longo, e que reler é o que se faz com período longo. Situar a causa no texto, e não no aluno, é o que impede que uma releitura vire conclusão sobre capacidade. Depois quebre a frase nas vírgulas — o mesmo ajuste que se faria por qualquer outro motivo.",
      "Say aloud that this period is a long one, and that re-reading is what one does with long periods. Placing the cause in the text, not in the student, is what stops a re-reading from becoming a conclusion about ability. Then break the sentence at its commas — the same adjustment you would make for any other reason.",
      "Diga en voz alta que ese período es largo, y que releer es lo que se hace con un período largo. Situar la causa en el texto, y no en el estudiante, es lo que impide que una relectura se vuelva conclusión sobre la capacidad. Después quiebre la frase en las comas — el mismo ajuste que se haría por cualquier otro motivo.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, OMS_ADOLESCENTE],
  },
  {
    barreira: "periodo-longo",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Em braille tátil ou em Libras tátil, o período longo chega em pedaços separados por segundos — a mão percorre, o interveniente transmite, e a frase se monta na memória, não na página. Quanto mais longa, mais tempo entre o sujeito e o verbo, e a estrutura se perde por intervalo, não por dificuldade de língua.",
      "In tactile braille or tactile sign, a long period arrives in pieces separated by seconds — the hand travels, the intervener conveys, and the sentence is assembled in memory, not on the page. The longer it is, the more time between subject and verb, and the structure is lost to the gap, not to language difficulty.",
      "En braille táctil o en lengua de señas táctil, el período largo llega en trozos separados por segundos — la mano recorre, el interviniente transmite, y la frase se arma en la memoria, no en la página. Cuanto más largo, más tiempo entre el sujeto y el verbo, y la estructura se pierde por el intervalo, no por dificultad de lengua.",
    ),
    oQueFazer: ml(
      "Combine com o interveniente que períodos longos serão transmitidos em unidades curtas, com o sujeito repetido a cada unidade — \"a usina; a usina produz; a usina produz energia a partir de\". A repetição parece redundante para quem vê a frase inteira, e é ela que sustenta a estrutura para quem a recebe em pedaços.",
      "Agree with the intervener that long periods will be conveyed in short units, with the subject repeated in each — \"the plant; the plant produces; the plant produces energy from\". The repetition looks redundant to someone seeing the whole sentence, and it is what holds the structure for someone receiving it in pieces.",
      "Acuerde con el interviniente que los períodos largos se transmitirán en unidades cortas, con el sujeto repetido en cada una — \"la planta; la planta produce; la planta produce energía a partir de\". La repetición parece redundante para quien ve la frase entera, y es la que sostiene la estructura para quien la recibe en trozos.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, CADEAFBLIND_INTERVENTOR, USU_INTERVENTOR],
  },
  {
    barreira: "periodo-longo",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "Sintaxe complexa não trava este aluno — o que trava é supor que ela esconde sofisticação. Diante de um período de 25 palavras, é comum procurar a sutileza que justificaria a frase e escolher a alternativa mais elaborada, quando a resposta era a leitura direta. O erro não vem de ler mal: vem de ler a mais.",
      "Complex syntax does not stall this student — what stalls them is assuming it hides sophistication. Facing a 25-word period, they commonly hunt for the subtlety that would justify the sentence and pick the most elaborate option, when the answer was the plain reading. The error does not come from reading badly: it comes from reading extra.",
      "La sintaxis compleja no traba a este estudiante — lo que lo traba es suponer que esconde sofisticación. Ante un período de 25 palabras, es común buscar la sutileza que justificaría la frase y elegir la alternativa más elaborada, cuando la respuesta era la lectura directa. El error no viene de leer mal: viene de leer de más.",
    ),
    oQueFazer: ml(
      "Peça a paráfrase em ordem direta antes da resposta, e depois pergunte se a versão simplificada muda alguma alternativa. Quase sempre não muda, e é aí que ele vê que a complexidade era do texto e não da questão. Quando mudar, você encontrou uma questão que merece discussão — e essa vale a aula.",
      "Ask for a paraphrase in direct order before the answer, then ask whether the simplified version changes any option. It almost never does, and that is where the student sees the complexity belonged to the text and not to the question. When it does change one, you have found a question worth discussing — and that one is worth the lesson.",
      "Pida la paráfrasis en orden directo antes de la respuesta, y después pregunte si la versión simplificada cambia alguna alternativa. Casi nunca cambia, y ahí es donde él ve que la complejidad era del texto y no de la pregunta. Cuando cambie, encontró una pregunta que merece discusión — y esa vale la clase.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, NAGC],
  },
  {
    barreira: "periodo-longo",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "A disgrafia não fica só no traçado: quem escreve com esforço produz frases curtas e simples, porque cada estrutura mais longa custa mais transcrição. O período de 25 palavras é, então, uma construção que este aluno praticamente não usa — e a construção que não se produz costuma ser também a menos familiar na leitura. A questão não pede que ele escreva nada, e mesmo assim cobra um repertório que a escrita dele não exercita.",
      "Dysgraphia does not stop at handwriting: a student who writes with effort produces short, simple sentences, because every longer structure costs more transcription. A 25-word period is therefore a construction this student barely uses — and the construction one does not produce tends to be the least familiar in reading too. The question asks them to write nothing, and still draws on a repertoire their writing never exercises.",
      "La disgrafía no se queda solo en el trazo: quien escribe con esfuerzo produce frases cortas y simples, porque cada estructura más larga cuesta más transcripción. El período de 25 palabras es, entonces, una construcción que este estudiante casi no usa — y la construcción que no se produce suele ser también la menos familiar en la lectura. La pregunta no le pide escribir nada, y aun así exige un repertorio que su escritura no ejercita.",
    ),
    oQueFazer: ml(
      "Desmonte o período em voz alta e remonte-o com o aluno, sem escrever: quantas ideias há aqui, qual é a principal, o que se pode tirar sem mudar o sentido. É combinação de frases, prática recomendada no ensino de escrita, feita oralmente para não cobrar o traçado — e o ganho passa desta questão, porque é a mesma construção que falta quando ele escreve.",
      "Take the period apart aloud and put it back together with the student, without writing: how many ideas are here, which is the main one, what can be removed without changing the meaning. It is sentence combining, a recommended practice in writing instruction, done orally so as not to charge the handwriting — and the gain outlives this question, because it is the same construction missing when they write.",
      "Desmonte el período en voz alta y vuelva a armarlo con el estudiante, sin escribir: cuántas ideas hay aquí, cuál es la principal, qué se puede quitar sin cambiar el sentido. Es combinación de frases, práctica recomendada en la enseñanza de la escritura, hecha oralmente para no cobrar el trazo — y la ganancia va más allá de esta pregunta, porque es la misma construcción que falta cuando escribe.",
    ),
    citations: [WWC_ESCRITA_INICIAIS, WWC_ESCRITA_FINAIS, READING_ROCKETS_ESCRITA],
    evidence: "established",
  },
  {
    barreira: "periodo-longo",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Período longo é linha longa, e linha longa é onde o acompanhamento visual se perde quando manter a cabeça e o tronco custa esforço: ao voltar para o começo, a linha reencontrada não é a mesma. E quando a leitura é em voz alta, um período de 25 palavras pede um fôlego que nem todo aluno com condição neuromuscular tem — a frase acaba sendo interrompida onde o corpo pede, e não onde o sentido permite.",
      "A long period is a long line, and a long line is where visual tracking is lost when holding the head and trunk takes effort: on returning to the start, the line found again is not the same one. And when reading aloud, a 25-word period asks for breath support that not every student with a neuromuscular condition has — the sentence ends up broken where the body requires, not where the meaning allows.",
      "Período largo es línea larga, y línea larga es donde se pierde el seguimiento visual cuando sostener la cabeza y el tronco cuesta esfuerzo: al volver al comienzo, la línea reencontrada no es la misma. Y cuando la lectura es en voz alta, un período de 25 palabras pide un aliento que no todo estudiante con condición neuromuscular tiene — la frase termina interrumpida donde el cuerpo lo pide, y no donde el sentido lo permite.",
    ),
    oQueFazer: ml(
      "Quebre o período em linhas curtas, cortando nas vírgulas, e ofereça um guia de linha — régua, realce, cursor largo. E não peça leitura em voz alta de período longo sem antes combinar onde ele pode ser interrompido: a pausa escolhida pelo aluno é acesso, e tratá-la como erro de leitura é medir o fôlego, não a compreensão.",
      "Break the period into short lines, cutting at the commas, and offer a line guide — a ruler, a highlight, a wide cursor. And do not ask for a long period to be read aloud without first agreeing where it may be interrupted: the pause the student chooses is access, and treating it as a reading error measures breath, not comprehension.",
      "Quiebre el período en líneas cortas, cortando en las comas, y ofrezca una guía de línea — regla, resaltado, cursor ancho. Y no pida lectura en voz alta de un período largo sin acordar antes dónde puede interrumpirse: la pausa que elige el estudiante es acceso, y tratarla como error de lectura es medir el aliento, no la comprensión.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO, AAC_INSTITUTE],
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
  {
    barreira: "alternativas-longas",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "Cinco textos longos de sentido próximo é onde a dúvida encontra do que se alimentar: sempre há uma leitura em que a alternativa já descartada volta a caber. O aluno relê as cinco várias vezes, troca no último minuto a resposta que estava certa, e sai da questão sem saber por que escolheu — o que devolve a mesma dúvida, maior, na questão seguinte.",
      "Five long options of similar meaning is where doubt finds something to feed on: there is always a reading under which the option already discarded fits again. The student rereads all five several times, swaps the answer that was right at the last minute, and leaves the question not knowing why they chose — which hands the same doubt back, larger, on the next question.",
      "Cinco textos largos de sentido próximo es donde la duda encuentra de qué alimentarse: siempre hay una lectura en que la alternativa ya descartada vuelve a caber. El estudiante relee las cinco varias veces, cambia en el último minuto la respuesta que estaba correcta, y sale de la pregunta sin saber por qué eligió — lo que devuelve la misma duda, mayor, en la pregunta siguiente.",
    ),
    oQueFazer: ml(
      "Peça o motivo escrito ao lado de cada alternativa já na primeira passada — uma linha basta — e combine que trocar exige um motivo novo, não uma sensação. O registro dá com o que comparar na releitura e transforma \"e se eu estiver errado?\" numa pergunta que se responde olhando o que já está escrito.",
      "Ask for a written reason beside each option on the first pass — one line is enough — and agree that changing requires a new reason, not a feeling. The record gives something to compare against on re-reading and turns \"what if I am wrong?\" into a question answered by looking at what is already written.",
      "Pida el motivo escrito al lado de cada alternativa ya en la primera pasada — basta una línea — y acuerde que cambiar exige un motivo nuevo, no una sensación. El registro da con qué comparar en la relectura y convierte \"¿y si me equivoco?\" en una pregunta que se responde mirando lo que ya está escrito.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, CAST_UDL],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "Comparar cinco textos longos é, na prática, tarefa escrita: quem elimina rabisca ao lado, risca a descartada, anota a palavra que decide. O aluno que evita escrever faz tudo isso de cabeça — e perde por memória o que evitava perder por traçado. A questão ficou mais difícil pelo meio de registro, não pelo conteúdo.",
      "Comparing five long texts is, in practice, a writing task: whoever eliminates scribbles beside them, crosses out the discarded one, notes the deciding word. A student who avoids writing does all that mentally — and loses through memory what they were avoiding losing through handwriting. The question got harder through the recording medium, not the content.",
      "Comparar cinco textos largos es, en la práctica, tarea escrita: quien elimina garabatea al lado, tacha la descartada, anota la palabra que decide. El estudiante que evita escribir hace todo eso de cabeza — y pierde por memoria lo que evitaba perder por trazo. La pregunta se volvió más difícil por el medio de registro, no por el contenido.",
    ),
    oQueFazer: ml(
      "Dê a comparação já impressa: as cinco letras numa coluna, com um quadrado ao lado de cada. Marcar sim, não ou talvez com um traço custa quase nada e devolve a eliminação por escrito. Se ele preferir dizer em voz alta, anote você — o registro existe para ser relido, e não importa de quem é a letra.",
      "Hand over the comparison already printed: the five letters in a column, with a box beside each. Marking yes, no or maybe with a stroke costs almost nothing and gives back elimination in writing. If they prefer to say it aloud, write it down yourself — the record exists to be reread, and whose handwriting it is does not matter.",
      "Entregue la comparación ya impresa: las cinco letras en una columna, con un cuadro al lado de cada una. Marcar sí, no o quizá con un trazo cuesta casi nada y devuelve la eliminación por escrito. Si prefiere decirlo en voz alta, anote usted — el registro existe para ser releído, y no importa de quién es la letra.",
    ),
    citations: [WWC_ESCRITA_FINAIS, READING_ROCKETS_ESCRITA, CAST_UDL],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "Com cinco textos longos quase sempre existe uma leitura em que a distratora também é verdadeira — e o aluno que lê fundo encontra essa leitura. Marcar a alternativa defensável em vez da esperada não é falha de conteúdo: é desconhecimento da convenção do item, que pede a melhor alternativa e não uma alternativa possível. Tratar isso como falta de estudo é o caminho mais curto para ele concluir que a prova não mede nada.",
      "With five long options there is almost always a reading under which the distractor is also true — and a student who reads deeply finds that reading. Marking the defensible option instead of the expected one is not a content failure: it is unfamiliarity with the item's convention, which asks for the best option and not for a possible one. Treating it as not having studied is the shortest path to their concluding that the test measures nothing.",
      "Con cinco textos largos casi siempre existe una lectura en que la distractora también es verdadera — y el estudiante que lee a fondo encuentra esa lectura. Marcar la alternativa defendible en vez de la esperada no es falla de contenido: es desconocimiento de la convención del ítem, que pide la mejor alternativa y no una alternativa posible. Tratarlo como falta de estudio es el camino más corto para que concluya que la prueba no mide nada.",
    ),
    oQueFazer: ml(
      "Peça por escrito a leitura que torna verdadeira a alternativa escolhida, e ponha ao lado a que torna verdadeiro o gabarito. A comparação vira análise do próprio item — que condição a banca assumiu sem dizer —, e isso é aprofundamento, não correção. Quando a leitura dele se sustentar, diga que se sustenta: o que estava em jogo era qual das duas o item pedia.",
      "Ask them to write the reading that makes their chosen option true, and set beside it the one that makes the key true. The comparison becomes an analysis of the item itself — which condition the examiners assumed without saying — and that is enrichment, not correction. When their reading holds up, say that it holds up: what was at stake was which of the two the item asked for.",
      "Pida por escrito la lectura que vuelve verdadera la alternativa elegida, y ponga al lado la que vuelve verdadera la clave. La comparación se convierte en análisis del propio ítem — qué condición asumió la banca sin decirlo — y eso es profundización, no corrección. Cuando su lectura se sostenga, diga que se sostiene: lo que estaba en juego era cuál de las dos pedía el ítem.",
    ),
    citations: [UCONN_SEM_ARTIGOS, ERIC_ENRIQUECIMENTO, UCONN_SEM],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "autismo",
    oQueSignifica: ml(
      "Quando as cinco alternativas são longas e próximas, a escolha deixa de ser \"qual é verdadeira\" e passa a ser \"qual é a melhor\" — juízo que depende de convenções não ditas. E as generalizações típicas desse tipo de alternativa (\"sempre\", \"a população passou a\"), verdadeiras no geral e falsas num caso, são rejeitadas com razão por quem lê com precisão.",
      "When all five options are long and close in meaning, the choice stops being \"which is true\" and becomes \"which is best\" — a judgement resting on unstated conventions. And the generalisations typical of such options (\"always\", \"the population came to\"), true in general and false in one case, are rightly rejected by a precise reader.",
      "Cuando las cinco alternativas son largas y próximas, la elección deja de ser \"cuál es verdadera\" y pasa a ser \"cuál es la mejor\" — juicio que depende de convenciones no dichas. Y las generalizaciones típicas de ese tipo de alternativa (\"siempre\", \"la población pasó a\"), verdaderas en general y falsas en un caso, son rechazadas con razón por quien lee con precisión.",
    ),
    oQueFazer: ml(
      "Peça que ele marque na alternativa o ponto exato que a torna falsa, quando julgar que é falsa. Se o ponto for uma exceção real, diga que é real e explique que o item pede a alternativa mais adequada, não a impecável — a convenção precisa ser ensinada uma vez, e depois vale para a prova inteira.",
      "Ask the student to mark the exact point in the option that makes it false, when they judge it false. If the point is a real exception, say that it is real and explain that the item asks for the most adequate option, not the flawless one — the convention needs teaching once, and then holds for the whole test.",
      "Pida que marque en la alternativa el punto exacto que la vuelve falsa, cuando la juzgue falsa. Si el punto es una excepción real, diga que es real y explique que el ítem pide la alternativa más adecuada, no la impecable — la convención debe enseñarse una vez, y después vale para toda la prueba.",
    ),
    citations: [AFIRM_NARRATIVAS, AFIRM_APOIOS_VISUAIS, NCAEP],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Comparar cinco textos longos é segurar quatro enquanto se lê o quinto, e é exatamente a memória verbal de curto prazo que a literatura da síndrome descreve como o ponto mais custoso. O aluno pode ter compreendido cada alternativa isoladamente e não conseguir sustentá-las juntas — na tela isso aparece como escolha ao acaso, e não foi ao acaso.",
      "Comparing five long texts means holding four while reading the fifth, and that is exactly the short-term verbal memory the syndrome's literature describes as costliest. The student may have understood each option on its own and still not be able to hold them together — on screen that looks like a random choice, and it was not random.",
      "Comparar cinco textos largos es sostener cuatro mientras se lee el quinto, y es justamente la memoria verbal a corto plazo que la literatura del síndrome describe como el punto más costoso. El estudiante puede haber comprendido cada alternativa por separado y no lograr sostenerlas juntas — en la pantalla eso parece elección al azar, y no lo fue.",
    ),
    oQueFazer: ml(
      "Reduza cada alternativa a uma imagem ou a três palavras escritas, num cartão por alternativa, e deixe os cinco cartões à vista lado a lado. A comparação passa a acontecer na mesa e não na memória; o texto integral continua disponível para conferir a que o cartão se refere.",
      "Reduce each option to a picture or three written words, one card per option, and keep the five cards in sight side by side. The comparison then happens on the table instead of in memory; the full text stays available for checking what each card refers to.",
      "Reduzca cada alternativa a una imagen o a tres palabras escritas, en una tarjeta por alternativa, y deje las cinco tarjetas a la vista lado a lado. La comparación pasa a ocurrir en la mesa y no en la memoria; el texto íntegro sigue disponible para verificar a qué se refiere cada tarjeta.",
    ),
    citations: [DSE_MEMORIA, DSE_LEITURA, DSRF_LEITURA],
    evidence: "established",
  },
  {
    barreira: "alternativas-longas",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "As cinco alternativas longas costumam diferir por pouco: um conectivo, um tempo verbal, uma negação deslocada. Para quem lê o português como segunda língua, é essa a camada mais difícil — o vocabulário das cinco é praticamente o mesmo, e a diferença está na gramática que menos se parece com a da Libras.",
      "Five long options usually differ by very little: a connective, a verb tense, a displaced negation. For a student reading Portuguese as a second language, that is the hardest layer — the vocabulary of all five is practically the same, and the difference lies in the grammar that least resembles sign language.",
      "Las cinco alternativas largas suelen diferir por poco: un conector, un tiempo verbal, una negación desplazada. Para quien lee el portugués como segunda lengua, esa es la capa más difícil — el vocabulario de las cinco es prácticamente el mismo, y la diferencia está en la gramática que menos se parece a la de la lengua de señas.",
    ),
    oQueFazer: ml(
      "Aponte onde as cinco divergem antes de discutir qual está certa, e traduza só a diferença — \"esta diz que aumentou, esta diz que teria aumentado\". Comparar as cinco inteiras é traduzir cinco vezes o que é igual, e o cansaço chega antes da parte que decide.",
      "Point out where the five diverge before discussing which is right, and translate only the difference — \"this one says it increased, this one says it would have increased\". Comparing all five in full means translating what is identical five times, and fatigue arrives before the deciding part.",
      "Señale dónde divergen las cinco antes de discutir cuál es correcta, y traduzca solo la diferencia — \"esta dice que aumentó, esta dice que habría aumentado\". Comparar las cinco enteras es traducir cinco veces lo que es igual, y el cansancio llega antes de la parte que decide.",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, INES],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Em questão de matemática, alternativa longa quase sempre é afirmação sobre quantidade dita em palavras — \"mais que o dobro do valor inicial\", \"menos de um terço do total\". Comparar as cinco exige converter cinco frases em cinco relações numéricas antes de decidir, e é essa conversão, não a conta, que a discalculia torna custosa.",
      "In a mathematics question, a long option is almost always a claim about quantity stated in words — \"more than twice the initial value\", \"less than a third of the total\". Comparing the five requires converting five sentences into five numeric relations before deciding, and it is that conversion, not the arithmetic, that dyscalculia makes costly.",
      "En una pregunta de matemática, la alternativa larga casi siempre es una afirmación sobre cantidad dicha en palabras — \"más del doble del valor inicial\", \"menos de un tercio del total\". Comparar las cinco exige convertir cinco frases en cinco relaciones numéricas antes de decidir, y es esa conversión, no la cuenta, la que la discalculia vuelve costosa.",
    ),
    oQueFazer: ml(
      "Traduza cada alternativa para um símbolo ao lado dela — > 2×, < ⅓ — antes de qualquer comparação, e deixe o resultado do aluno escrito no mesmo formato. Cinco símbolos se comparam de relance; cinco frases, não.",
      "Translate each option into a symbol beside it — > 2×, < ⅓ — before any comparison, and write the student's own result in the same format. Five symbols can be compared at a glance; five sentences cannot.",
      "Traduzca cada alternativa a un símbolo a su lado — > 2×, < ⅓ — antes de cualquier comparación, y deje el resultado del estudiante escrito en el mismo formato. Cinco símbolos se comparan de un vistazo; cinco frases, no.",
    ),
    citations: [WWC_RESOLUCAO, UNDERSTOOD_MATEMATICA, NCII_MATEMATICA],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Comparar exige voltar, e voltar é o que o acesso tátil não faz de graça: cada retorno a uma alternativa é percorrê-la de novo, ponto a ponto. Cinco alternativas longas podem custar mais tempo que o enunciado inteiro, e a escolha acaba sendo feita entre as duas últimas — as únicas ainda disponíveis na memória.",
      "Comparing requires going back, and going back is what tactile access does not do for free: each return to an option means travelling it again, dot by dot. Five long options can cost more time than the whole stem, and the choice ends up being made between the last two — the only ones still available in memory.",
      "Comparar exige volver, y volver es lo que el acceso táctil no hace gratis: cada retorno a una alternativa es recorrerla de nuevo, punto a punto. Cinco alternativas largas pueden costar más tiempo que el enunciado entero, y la elección termina haciéndose entre las dos últimas — las únicas todavía disponibles en la memoria.",
    ),
    oQueFazer: ml(
      "Transmita uma alternativa por vez e registre o veredito logo depois de cada uma, antes de passar à seguinte: sim, não, talvez. O registro substitui o retorno, que é o que custa — no fim, só as marcadas como \"talvez\" precisam ser percorridas de novo.",
      "Convey one option at a time and record the verdict right after each, before moving to the next: yes, no, maybe. The record replaces the return, which is what costs — in the end, only those marked \"maybe\" need travelling again.",
      "Transmita una alternativa por vez y registre el veredicto justo después de cada una, antes de pasar a la siguiente: sí, no, quizá. El registro sustituye el retorno, que es lo que cuesta — al final, solo las marcadas como \"quizá\" necesitan recorrerse de nuevo.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, NCDB_MOODLE, CADEAFBLIND_INTERVENTOR],
  },
  {
    barreira: "alternativas-longas",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "Cada alternativa longa é mais uma frase complexa para desmontar, e a diferença entre elas costuma estar na estrutura, não nas palavras: uma passiva, uma negação encaixada, uma condicional. São cinco análises sintáticas seguidas, feitas por quem gasta o dobro em cada uma — e a quinta é analisada com o que sobrou.",
      "Each long option is one more complex sentence to unpack, and the difference between them usually lies in structure, not words: a passive, an embedded negation, a conditional. That is five syntactic analyses in a row, done by a student who spends twice as much on each — and the fifth is analysed with whatever is left.",
      "Cada alternativa larga es una frase compleja más que desmontar, y la diferencia entre ellas suele estar en la estructura, no en las palabras: una pasiva, una negación encajada, una condicional. Son cinco análisis sintácticos seguidos, hechos por quien gasta el doble en cada uno — y la quinta se analiza con lo que quedó.",
    ),
    oQueFazer: ml(
      "Reescreva as cinco em ordem direta e na mesma forma, mudando só o que de fato as distingue. Quando as cinco têm a mesma estrutura, a comparação passa a ser sobre conteúdo — que é o que a questão queria medir — e não sobre qual delas foi escrita de um jeito mais difícil.",
      "Rewrite all five in direct order and in the same shape, changing only what actually distinguishes them. When the five share a structure, the comparison becomes about content — which is what the question meant to measure — and not about which of them was written in a harder way.",
      "Reescriba las cinco en orden directo y en la misma forma, cambiando solo lo que de hecho las distingue. Cuando las cinco tienen la misma estructura, la comparación pasa a ser sobre el contenido — que es lo que la pregunta quería medir — y no sobre cuál fue escrita de un modo más difícil.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, DLD_PROJECT],
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
  {
    barreira: "muitos-numeros",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "Quatro ou mais números espalhados pelo enunciado funcionam como aviso de dificuldade antes de qualquer leitura: a questão é recusada pela aparência, não pelo conteúdo. É comum o mesmo aluno resolver sem hesitar a conta idêntica quando ela chega sem a parede de dados — o que travou não foi a matemática, e insistir na explicação do conteúdo não desfaz o travamento.",
      "Four or more numbers scattered through the stem work as a difficulty warning before any reading: the question is refused on appearance, not on content. The same student often solves the identical calculation without hesitation when it arrives without the wall of data — what jammed was not the mathematics, and insisting on explaining the content does not unjam it.",
      "Cuatro o más números repartidos por el enunciado funcionan como aviso de dificultad antes de cualquier lectura: la pregunta se rechaza por la apariencia, no por el contenido. Es común que el mismo estudiante resuelva sin dudar la cuenta idéntica cuando llega sin la pared de datos — lo que se trabó no fue la matemática, e insistir en explicar el contenido no lo destraba.",
    ),
    oQueFazer: ml(
      "Comece pedindo só a leitura dos dados: o que é cada número, sem calcular nada ainda. Separar \"ler os dados\" de \"resolver\" cria um primeiro passo que termina, e é a conclusão desse passo — não o incentivo — que costuma destravar o resto. Se travar mesmo assim, pergunte se o que falta é a matéria ou o começo; a resposta muda o que fazer, e só a pergunta separa as duas.",
      "Start by asking only for the data to be read: what each number is, with no calculating yet. Separating \"reading the data\" from \"solving\" creates a first step that finishes, and it is finishing that step — not encouragement — that usually unjams the rest. If it still jams, ask whether what is missing is the subject or the start; the answer changes what to do, and only asking tells them apart.",
      "Empiece pidiendo solo la lectura de los datos: qué es cada número, sin calcular nada todavía. Separar \"leer los datos\" de \"resolver\" crea un primer paso que termina, y es concluir ese paso — no el ánimo — lo que suele destrabar el resto. Si aun así se traba, pregunte si lo que falta es la materia o el comienzo; la respuesta cambia qué hacer, y solo la pregunta las separa.",
    ),
    citations: [CDC_SAUDE_MENTAL, OMS_ADOLESCENTE, WWC_RESOLUCAO],
  },
  {
    barreira: "muitos-numeros",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "O custo aqui está na cópia, não na conta. Quatro ou mais valores precisam sair do enunciado para o papel antes de qualquer operação, e é na transcrição que o erro entra — dígito trocado, vírgula fora do lugar, coluna desalinhada. A conta seguinte fica correta sobre números errados, e o resultado se parece com erro de matemática.",
      "The cost here is in the copying, not the arithmetic. Four or more values must move from the stem to the paper before any operation, and it is in the transcription that the error enters — a swapped digit, a misplaced decimal point, a misaligned column. The next calculation comes out correct over wrong numbers, and the result looks like a mathematics error.",
      "El costo aquí está en la copia, no en la cuenta. Cuatro o más valores deben salir del enunciado al papel antes de cualquier operación, y es en la transcripción donde entra el error — dígito cambiado, coma fuera de lugar, columna desalineada. La cuenta siguiente queda correcta sobre números equivocados, y el resultado parece error de matemática.",
    ),
    oQueFazer: ml(
      "Entregue os valores já impressos e rotulados, para que a folha comece com os dados prontos: o aluno não copia nada, resolve. Quando a operação exigir alinhamento em coluna, dê a grade quadriculada já montada — desalinhar é problema de traçado, e não deveria custar a questão.",
      "Provide the values already printed and labelled, so the sheet starts with the data in place: the student copies nothing and solves. When the operation requires column alignment, give the squared grid already laid out — misalignment is a handwriting problem, and it should not cost the question.",
      "Entregue los valores ya impresos y etiquetados, para que la hoja empiece con los datos listos: el estudiante no copia nada, resuelve. Cuando la operación exija alineación en columna, dé la cuadrícula ya montada — desalinear es problema de trazo, y no debería costar la pregunta.",
    ),
    citations: [WWC_ESCRITA_INICIAIS, NCII, CAST_UDL],
  },
  {
    barreira: "muitos-numeros",
    especialidade: "autismo",
    oQueSignifica: ml(
      "O enunciado com seis números costuma usar três. Decidir quais entram na conta é inferência sobre o que a banca considerou relevante, e essa decisão não está escrita em lugar nenhum — para quem trata todo dado apresentado como dado a usar, a questão passa a ter uma etapa a mais, que os colegas não veem porque a resolvem sem perceber.",
      "A stem with six numbers usually uses three. Deciding which enter the calculation is an inference about what the examiners considered relevant, and that decision is written nowhere — for a student who treats every datum presented as a datum to use, the question gains an extra step, one classmates never see because they resolve it without noticing.",
      "El enunciado con seis números suele usar tres. Decidir cuáles entran en la cuenta es una inferencia sobre lo que la banca consideró relevante, y esa decisión no está escrita en ninguna parte — para quien trata todo dato presentado como dato a usar, la pregunta pasa a tener una etapa más, que los compañeros no ven porque la resuelven sin darse cuenta.",
    ),
    oQueFazer: ml(
      "Diga de antemão quantos números a resolução usa, sem dizer quais. A informação muda a tarefa de \"adivinhar o que é relevante\" para \"testar qual conjunto de três fecha\", que é trabalho de execução — e é onde este aluno costuma ir melhor que a turma.",
      "Say in advance how many numbers the solution uses, without saying which. That turns the task from \"guess what is relevant\" into \"test which set of three closes\", which is execution work — and that is where this student usually does better than the class.",
      "Diga de antemano cuántos números usa la resolución, sin decir cuáles. La información cambia la tarea de \"adivinar qué es relevante\" a \"probar qué conjunto de tres cierra\", que es trabajo de ejecución — y es donde este estudiante suele ir mejor que la clase.",
    ),
    citations: [AFIRM_ANALISE_DE_TAREFA, AFIRM_ANTECEDENTES, NCAEP],
    evidence: "established",
  },
  {
    barreira: "muitos-numeros",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "Número lido por síntese de voz perde o que a página mostra: 10³ pode sair como \"dez três\", 1.500 e 1,500 soam iguais, e a unidade vem colada no valor. Com quatro ou mais valores, o aluno não está segurando números — está segurando interpretações de números, e qualquer uma delas pode estar errada sem aviso.",
      "A number read by speech synthesis loses what the page shows: 10³ may come out as \"ten three\", 1,500 and 1.500 sound alike, and the unit arrives glued to the value. With four or more values, the student is not holding numbers — they are holding interpretations of numbers, and any one of them may be wrong with no warning.",
      "Un número leído por síntesis de voz pierde lo que la página muestra: 10³ puede salir como \"diez tres\", 1.500 y 1,500 suenan igual, y la unidad viene pegada al valor. Con cuatro o más valores, el estudiante no está sosteniendo números — está sosteniendo interpretaciones de números, y cualquiera de ellas puede estar equivocada sin aviso.",
    ),
    oQueFazer: ml(
      "Confira em voz alta como cada valor está sendo lido antes de resolver, e escreva expoentes e unidades por extenso no material entregue — \"dez elevado a três\", \"mil e quinhentos reais\". É ajuste de transcrição, não de conteúdo, e ele decide se a questão vai ser sobre matemática ou sobre adivinhar o que a voz disse.",
      "Check aloud how each value is being read before solving, and spell out exponents and units in the material handed over — \"ten to the third\", \"one thousand five hundred reais\". It is a transcription adjustment, not a content one, and it decides whether the question will be about mathematics or about guessing what the voice said.",
      "Verifique en voz alta cómo se está leyendo cada valor antes de resolver, y escriba exponentes y unidades completos en el material entregado — \"diez elevado a tres\", \"mil quinientos reales\". Es ajuste de transcripción, no de contenido, y decide si la pregunta será sobre matemática o sobre adivinar qué dijo la voz.",
    ),
    citations: [APH_RECURSOS, PATHS_TECNOLOGIA, PATHS_BRAILLE],
  },
  {
    barreira: "muitos-numeros",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "Os números atravessam a barreira de língua; as relações entre eles, não. \"A cada dois\", \"para cada três habitantes\", \"o restante\" — é aí que o enunciado volta a ser segunda língua, e um enunciado com muitos valores costuma trazer muitas dessas expressões. O aluno lê os dados sem esforço e erra a relação.",
      "Numbers cross the language barrier; the relations between them do not. \"For every two\", \"per three inhabitants\", \"the remainder\" — that is where the stem becomes second language again, and a stem with many values usually carries many such expressions. The student reads the data effortlessly and gets the relation wrong.",
      "Los números atraviesan la barrera de lengua; las relaciones entre ellos, no. \"Cada dos\", \"por cada tres habitantes\", \"el restante\" — ahí el enunciado vuelve a ser segunda lengua, y un enunciado con muchos valores suele traer muchas de esas expresiones. El estudiante lee los datos sin esfuerzo y se equivoca en la relación.",
    ),
    oQueFazer: ml(
      "Traduza as expressões de proporção em Libras uma a uma, com o valor à vista, antes da conta. E use o resultado como diagnóstico: se ele acerta a operação depois de a relação estar clara, o que faltava era a língua — e é isso que precisa ser registrado, não \"dificuldade em matemática\".",
      "Translate the proportion expressions into sign language one by one, with the value in sight, before the calculation. And use the outcome diagnostically: if the operation comes out right once the relation is clear, what was missing was language — and that is what should be recorded, not \"difficulty in mathematics\".",
      "Traduzca las expresiones de proporción a lengua de señas una a una, con el valor a la vista, antes de la cuenta. Y use el resultado como diagnóstico: si acierta la operación una vez clara la relación, lo que faltaba era la lengua — y es eso lo que hay que registrar, no \"dificultad en matemática\".",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, INES],
  },
  {
    barreira: "muitos-numeros",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "O número não é decodificado, mas a palavra que diz o que ele é, sim — e é essa palavra que precisa ser reencontrada toda vez que o aluno volta ao texto para conferir. Com quatro valores são quatro buscas no enunciado, e cada busca é decodificação inteira. O custo não está em ler os números: está em voltar.",
      "The number is not decoded, but the word saying what it is certainly is — and that word must be found again every time the student returns to the text to check. With four values that is four searches through the stem, and each search is a full decoding. The cost is not in reading the numbers: it is in going back.",
      "El número no se decodifica, pero la palabra que dice qué es, sí — y es esa palabra la que hay que reencontrar cada vez que el estudiante vuelve al texto a verificar. Con cuatro valores son cuatro búsquedas en el enunciado, y cada búsqueda es decodificación completa. El costo no está en leer los números: está en volver.",
    ),
    oQueFazer: ml(
      "Extraia os pares valor-rótulo para uma lista à parte, com o rótulo em palavra curta e o texto original intacto ao lado. Conferir deixa de exigir varrer o enunciado — e a lista serve à turma inteira, o que evita que o ajuste vire material separado só para ele.",
      "Pull the value-label pairs into a separate list, the label in a short word and the original text intact alongside. Checking no longer requires sweeping the stem — and the list serves the whole class, which keeps the adjustment from becoming separate material just for this student.",
      "Extraiga los pares valor-etiqueta a una lista aparte, con la etiqueta en palabra corta y el texto original intacto al lado. Verificar deja de exigir barrer el enunciado — y la lista sirve a toda la clase, lo que evita que el ajuste se vuelva material separado solo para él.",
    ),
    citations: [READING_ROCKETS_SL, UNDERSTOOD_LITERACIA, NCIL],
  },
  {
    barreira: "muitos-numeros",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Cada valor precisa sair do enunciado e entrar em algum lugar onde a conta aconteça — papel, calculadora, planilha —, e é essa transferência que o acesso por acionador ou rastreamento torna cara. Quatro números podem custar mais tempo para serem transportados do que a operação inteira leva para ser pensada.",
      "Each value must leave the stem and enter somewhere the calculation can happen — paper, calculator, spreadsheet — and it is that transfer that switch or eye-tracking access makes expensive. Four numbers can cost more time to move than the whole operation takes to think through.",
      "Cada valor debe salir del enunciado y entrar en algún lugar donde ocurra la cuenta — papel, calculadora, planilla —, y es esa transferencia la que el acceso por pulsador o seguimiento vuelve cara. Cuatro números pueden costar más tiempo de transporte que lo que la operación entera tarda en pensarse.",
    ),
    oQueFazer: ml(
      "Entregue os valores já digitados no mesmo ambiente em que a conta vai ser feita, e mantenha enunciado e área de trabalho na mesma tela, sem alternância. Quando a resposta for numérica, aceite o valor dito e registre você: transportar número não é o que a questão mede.",
      "Provide the values already typed into the same environment where the calculation will happen, and keep stem and workspace on one screen, with no switching. When the answer is numeric, accept the value spoken and record it yourself: moving numbers around is not what the question measures.",
      "Entregue los valores ya digitados en el mismo entorno donde se hará la cuenta, y mantenga enunciado y área de trabajo en la misma pantalla, sin alternancia. Cuando la respuesta sea numérica, acepte el valor dicho y regístrelo usted: transportar números no es lo que la pregunta mide.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO, AAC_APRENDER],
  },
  {
    barreira: "muitos-numeros",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Quatro valores em braille tátil não estão à vista: estão em quatro lugares do papel, alcançáveis um de cada vez. Conferir o segundo significa perder o contato com o primeiro, e a notação matemática em braille exige sinais próprios que ocupam espaço e afastam ainda mais os dados uns dos outros.",
      "Four values in tactile braille are not in sight: they are in four places on the page, reachable one at a time. Checking the second means losing contact with the first, and mathematical braille notation requires its own signs, which take up space and push the data further apart.",
      "Cuatro valores en braille táctil no están a la vista: están en cuatro lugares del papel, alcanzables de a uno. Verificar el segundo significa perder el contacto con el primero, y la notación matemática en braille exige signos propios que ocupan espacio y alejan aún más los datos entre sí.",
    ),
    oQueFazer: ml(
      "Prepare os valores numa linha tátil única e curta, na ordem em que serão usados, separada do texto — e combine com o interveniente que ela fica sob a mão o tempo todo. É preparo de véspera: montar isso durante a aula é o que faz a questão não caber no tempo.",
      "Prepare the values on a single short tactile line, in the order they will be used, separate from the text — and agree with the intervener that it stays under the hand throughout. It is work for the day before: assembling it during the lesson is what makes the question not fit in the time.",
      "Prepare los valores en una única línea táctil corta, en el orden en que se usarán, separada del texto — y acuerde con el interviniente que quede bajo la mano todo el tiempo. Es preparación de la víspera: montarlo durante la clase es lo que hace que la pregunta no quepa en el tiempo.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, NCDB_MOODLE, APH_RECURSOS],
  },
  {
    barreira: "muitos-numeros",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "Os números não são o problema; os quantificadores são. \"A cada\", \"o restante\", \"a mais que\", \"o dobro de\" — expressões curtas, frequentes nos enunciados e mal compreendidas no TDL, porque o sentido delas está na estrutura e não no vocabulário. Um enunciado com quatro valores costuma trazer três dessas expressões.",
      "The numbers are not the problem; the quantifiers are. \"For every\", \"the remainder\", \"more than\", \"twice as\" — short expressions, frequent in stems and poorly understood in DLD, because their meaning lives in structure and not in vocabulary. A stem with four values usually carries three of them.",
      "Los números no son el problema; los cuantificadores sí. \"Cada\", \"el restante\", \"más que\", \"el doble de\" — expresiones cortas, frecuentes en los enunciados y mal comprendidas en el TDL, porque su sentido está en la estructura y no en el vocabulario. Un enunciado con cuatro valores suele traer tres de esas expresiones.",
    ),
    oQueFazer: ml(
      "Antes da conta, peça que ele demonstre a expressão com objetos ou com um desenho — \"a cada dois\" vira dois grupos na mesa. Demonstrar é diferente de traduzir: mostra se a relação foi entendida, e é o único jeito de separar o que ele não sabe de matemática do que não decodificou da frase.",
      "Before the calculation, ask the student to demonstrate the expression with objects or a drawing — \"for every two\" becomes two groups on the table. Demonstrating is different from translating: it shows whether the relation was understood, and it is the only way to separate what they do not know of mathematics from what they did not decode from the sentence.",
      "Antes de la cuenta, pida que demuestre la expresión con objetos o con un dibujo — \"cada dos\" se vuelve dos grupos en la mesa. Demostrar es distinto de traducir: muestra si la relación se entendió, y es la única manera de separar lo que no sabe de matemática de lo que no decodificó de la frase.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, RADLD],
  },
  {
    barreira: "muitos-numeros",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "Seis valores num enunciado que usa três é, para este aluno, a parte mais interessante da questão — e a que ninguém pergunta. Ele costuma identificar em segundos quais dados sobram, e a questão termina aí, sem que a percepção vire coisa alguma.",
      "Six values in a stem that uses three is, for this student, the most interesting part of the question — and the part nobody asks about. They usually spot in seconds which data are spare, and the question ends there, with the observation turning into nothing.",
      "Seis valores en un enunciado que usa tres es, para este estudiante, la parte más interesante de la pregunta — y la que nadie pregunta. Suele identificar en segundos qué datos sobran, y la pregunta termina ahí, sin que la percepción se convierta en nada.",
    ),
    oQueFazer: ml(
      "Pergunte por que os dados que sobram estão lá: qual erro cada um deles produziria se fosse usado. Ler a questão pelo lado de quem a escreveu é aprofundamento sobre o mesmo item, e devolve trabalho a quem já terminou — sem exigir uma segunda questão nem material novo.",
      "Ask why the spare data are there: which error each of them would produce if used. Reading the question from the writer's side is depth on the same item, and it gives work back to a student who has already finished — with no second question and no new material.",
      "Pregunte por qué están ahí los datos que sobran: qué error produciría cada uno si se usara. Leer la pregunta desde el lado de quien la escribió es profundización sobre el mismo ítem, y devuelve trabajo a quien ya terminó — sin exigir una segunda pregunta ni material nuevo.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, UCONN_SEM_ARTIGOS, NAGC],
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
  {
    barreira: "figura-essencial",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Gráfico é número em outra forma, e a leitura da escala cobra exatamente o que a discalculia torna custoso: perceber que um passo do eixo vale 50 e não 5, comparar duas barras como razão e não como diferença, situar um ponto entre duas marcas. O aluno pode descrever corretamente a tendência da curva e ainda assim tirar dela o valor errado — e a descrição certa esconde o erro.",
      "A chart is number in another form, and reading its scale demands exactly what dyscalculia makes costly: seeing that one step on the axis is worth 50 and not 5, comparing two bars as a ratio and not as a difference, placing a point between two marks. The student may describe the curve's trend correctly and still take the wrong value from it — and the correct description hides the error.",
      "Un gráfico es número en otra forma, y leer la escala exige justamente lo que la discalculia vuelve costoso: percibir que un paso del eje vale 50 y no 5, comparar dos barras como razón y no como diferencia, situar un punto entre dos marcas. El estudiante puede describir correctamente la tendencia de la curva y aun así sacar de ella el valor equivocado — y la descripción correcta esconde el error.",
    ),
    oQueFazer: ml(
      "Antes de qualquer conta, leia a escala em voz alta com o aluno: quanto vale um passo do eixo, onde está o zero, o que muda se o passo for outro. Depois peça a estimativa antes da leitura exata — \"está mais perto de 200 ou de 400?\" —, porque é a estimativa que denuncia a escala lida errado, e o valor exato sozinho não denuncia nada.",
      "Before any calculation, read the scale aloud with the student: what one step of the axis is worth, where zero sits, what changes if the step were different. Then ask for the estimate before the exact reading — \"closer to 200 or to 400?\" — because it is the estimate that exposes a misread scale, and the exact value alone exposes nothing.",
      "Antes de cualquier cuenta, lea la escala en voz alta con el estudiante: cuánto vale un paso del eje, dónde está el cero, qué cambia si el paso fuera otro. Después pida la estimación antes de la lectura exacta — \"¿está más cerca de 200 o de 400?\" —, porque es la estimación la que delata la escala mal leída, y el valor exacto solo no delata nada.",
    ),
    citations: [WWC_MATEMATICA_2021, WWC_RTI_MATEMATICA, ERIC_RTI_MATEMATICA],
    evidence: "established",
  },
  {
    barreira: "figura-essencial",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Explorar uma figura é justamente o que o acesso por varredura, acionador ou rastreamento ocular faz mal: ampliar, mover, voltar ao ponto anterior são operações caras, e ler um gráfico é ir e voltar entre eixo, curva e legenda dezenas de vezes. A figura não é inacessível — ela é lenta, e a lentidão vira erro quando o tempo é o mesmo da turma.",
      "Exploring a figure is precisely what access by scanning, switch or eye tracking does worst: zooming, panning, returning to the previous point are expensive operations, and reading a chart means going back and forth between axis, curve and legend dozens of times. The figure is not inaccessible — it is slow, and slowness turns into error when the time allowed is the class's.",
      "Explorar una figura es justamente lo que el acceso por barrido, pulsador o seguimiento ocular hace peor: ampliar, mover, volver al punto anterior son operaciones caras, y leer un gráfico es ir y volver entre eje, curva y leyenda decenas de veces. La figura no es inaccesible — es lenta, y la lentitud se vuelve error cuando el tiempo es el mismo de la clase.",
    ),
    oQueFazer: ml(
      "Entregue a figura já no tamanho em que ela é legível e, quando tiver várias partes, também recortada em cada parte com o eixo repetido — assim comparar deixa de exigir navegação. E conte o tempo a partir do momento em que a figura está pronta na tela, não da entrega da questão: o que veio antes foi acesso, não resolução.",
      "Provide the figure already at the size where it is legible and, when it has several parts, also split into each part with the axis repeated — so comparing no longer requires navigating. And count the time from the moment the figure is ready on screen, not from when the question was handed out: what came before was access, not solving.",
      "Entregue la figura ya en el tamaño en que es legible y, cuando tenga varias partes, también recortada en cada parte con el eje repetido — así comparar deja de exigir navegación. Y cuente el tiempo desde el momento en que la figura está lista en la pantalla, no desde la entrega de la pregunta: lo anterior fue acceso, no resolución.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO],
  },
  {
    barreira: "figura-essencial",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "A figura costuma trazer bem mais informação do que a pergunta usa: o gráfico tem duas séries e o item cobra uma, o mapa mostra um período inteiro e a alternativa fala de um ano. Para este aluno a questão termina em segundos, e o que sobra na tela é justamente a parte interessante — uma sequência de questões assim é o mecanismo cotidiano do desinteresse, e ele não anuncia que começou.",
      "The figure usually carries far more information than the question uses: the chart has two series and the item asks about one, the map shows a whole period and the option speaks of a single year. For this student the question ends in seconds, and what remains on screen is exactly the interesting part — a run of questions like this is the everyday mechanism of disengagement, and it does not announce that it has started.",
      "La figura suele traer mucha más información de la que usa la pregunta: el gráfico tiene dos series y el ítem pide una, el mapa muestra un período entero y la alternativa habla de un año. Para este estudiante la pregunta termina en segundos, y lo que sobra en la pantalla es justamente la parte interesante — una serie de preguntas así es el mecanismo cotidiano del desinterés, y no avisa cuándo empezó.",
    ),
    oQueFazer: ml(
      "Depois da resposta, faça à mesma figura uma pergunta que o item não fez: o que a escala esconde, o que aconteceria com a conclusão se o eixo começasse em zero, que dado faltaria para afirmar causa. É aprofundamento sobre o material que a turma inteira já tem à frente — e não tarefa extra por ter acabado antes, que é o que ensina a não acabar antes.",
      "After the answer, put to the same figure a question the item did not ask: what the scale hides, what would happen to the conclusion if the axis started at zero, what datum would be missing to claim causation. It is depth over material the whole class already has in front of them — not extra work for finishing early, which is what teaches a student not to finish early.",
      "Después de la respuesta, hágale a la misma figura una pregunta que el ítem no hizo: qué esconde la escala, qué pasaría con la conclusión si el eje empezara en cero, qué dato faltaría para afirmar causa. Es profundización sobre el material que toda la clase ya tiene delante — y no tarea extra por haber terminado antes, que es lo que enseña a no terminar antes.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, RENZULLI_SEM_PDF, UCONN_SEM],
  },
  {
    barreira: "figura-essencial",
    especialidade: "tdah",
    oQueSignifica: ml(
      "A figura é o ponto da questão com mais coisa para olhar e menos instrução sobre onde olhar. Sem alvo definido, o aluno percorre o gráfico inteiro, encontra algo interessante que a pergunta não usa e volta ao texto sem o dado. O vaivém entre figura e enunciado, três ou quatro vezes, é onde a questão se perde.",
      "The figure is the part of the question with the most to look at and the least instruction on where to look. With no defined target, the student sweeps the whole chart, finds something interesting the question does not use, and returns to the text without the datum. The back-and-forth between figure and stem, three or four times, is where the question is lost.",
      "La figura es el punto de la pregunta con más cosas que mirar y menos instrucción sobre dónde mirar. Sin un objetivo definido, el estudiante recorre el gráfico entero, encuentra algo interesante que la pregunta no usa y vuelve al texto sin el dato. El vaivén entre figura y enunciado, tres o cuatro veces, es donde la pregunta se pierde.",
    ),
    oQueFazer: ml(
      "Dê o alvo antes de mostrar a figura: \"procure o valor de 2015 no eixo de baixo\". Um alvo por vez, e escrito. E deixe figura e enunciado lado a lado — cada alternância entre os dois é uma oportunidade de recomeçar, e recomeçar é o custo que se quer evitar.",
      "Give the target before showing the figure: \"find the 2015 value on the bottom axis\". One target at a time, and in writing. And keep figure and stem side by side — every switch between them is a chance to start over, and starting over is the cost to be avoided.",
      "Dé el objetivo antes de mostrar la figura: \"busque el valor de 2015 en el eje de abajo\". Un objetivo por vez, y escrito. Y deje figura y enunciado lado a lado — cada alternancia entre ambos es una oportunidad de recomenzar, y recomenzar es el costo que se quiere evitar.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, CAST_UDL],
  },
  {
    barreira: "figura-essencial",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Aqui a figura joga a favor, e é a melhor notícia desta linha: o apoio visual é via de força na síndrome, e a questão ilustrada costuma ser mais acessível que a puramente verbal. A ressalva é o gráfico — barra, linha e setor não se parecem com o que representam, e a convenção precisa ter sido ensinada antes, senão a figura vira mais um símbolo a decifrar.",
      "Here the figure plays in favour, and that is this row's best news: visual support is a channel of strength in the syndrome, and an illustrated question tends to be more accessible than a purely verbal one. The caveat is the chart — bars, lines and pie slices do not look like what they represent, and the convention must have been taught beforehand, or the figure becomes one more symbol to decipher.",
      "Aquí la figura juega a favor, y es la mejor noticia de esta fila: el apoyo visual es vía de fortaleza en el síndrome, y la pregunta ilustrada suele ser más accesible que la puramente verbal. La salvedad es el gráfico — barra, línea y sector no se parecen a lo que representan, y la convención debe haberse enseñado antes, o la figura se vuelve un símbolo más que descifrar.",
    ),
    oQueFazer: ml(
      "Separe as duas coisas: se for foto, mapa ou esquema, aproveite e ancore o enunciado nela. Se for gráfico, ensine a convenção com um exemplo do cotidiano do aluno antes de usar a questão, e mantenha os dois à vista — o gráfico da questão e o exemplo conhecido, lado a lado.",
      "Keep the two apart: if it is a photo, map or diagram, use it and anchor the stem to it. If it is a chart, teach the convention with an example from the student's daily life before using the question, and keep both in sight — the question's chart and the familiar example, side by side.",
      "Separe las dos cosas: si es foto, mapa o esquema, aprovéchela y ancle el enunciado en ella. Si es gráfico, enseñe la convención con un ejemplo del día a día del estudiante antes de usar la pregunta, y mantenga ambos a la vista — el gráfico de la pregunta y el ejemplo conocido, lado a lado.",
    ),
    citations: [DSE_LEITURA, IES_DOWN, DSRF_LEITURA],
    evidence: "established",
  },
  {
    barreira: "figura-essencial",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "Uma figura densa — legenda, duas séries, eixos com escala — apresenta muitos elementos ao mesmo tempo, e nada nela diz por onde começar. O aluno costuma responder pelo que reconhece na imagem, e não pelo que ela mede, porque a ordem de leitura de um gráfico é convenção ensinada e não coisa evidente.",
      "A dense figure — legend, two series, scaled axes — presents many elements at once, and nothing in it says where to begin. The student tends to answer from what they recognise in the image rather than from what it measures, because the reading order of a chart is a taught convention and not something self-evident.",
      "Una figura densa — leyenda, dos series, ejes con escala — presenta muchos elementos a la vez, y nada en ella dice por dónde empezar. El estudiante suele responder por lo que reconoce en la imagen, y no por lo que ella mide, porque el orden de lectura de un gráfico es una convención enseñada y no algo evidente.",
    ),
    oQueFazer: ml(
      "Ensine uma rotina fixa e use sempre a mesma: título, o que está no eixo de baixo, o que está no de lado, só então a pergunta. Rotina explícita e repetida é o que torna a figura utilizável em qualquer questão seguinte, e não só nesta.",
      "Teach a fixed routine and always use the same one: title, what is on the bottom axis, what is on the side axis, and only then the question. An explicit, repeated routine is what makes figures usable in every later question, not only in this one.",
      "Enseñe una rutina fija y use siempre la misma: título, qué hay en el eje de abajo, qué hay en el de al lado, y solo entonces la pregunta. La rutina explícita y repetida es lo que vuelve la figura utilizable en cualquier pregunta siguiente, y no solo en esta.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS, CEEDAR_ALTERNATIVO],
  },
  {
    barreira: "figura-essencial",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "A figura alivia — até a legenda. Rótulo de eixo e legenda são palavras isoladas, curtas, sem frase em volta: some exatamente o contexto que quem tem dislexia usa para compensar a decodificação. Ler \"densidade demográfica\" no meio de um parágrafo é mais fácil do que ler a mesma expressão sozinha embaixo de um eixo.",
      "The figure gives relief — until the legend. Axis labels and legends are isolated short words with no sentence around them: exactly the context a dyslexic reader uses to compensate for decoding disappears. Reading \"population density\" inside a paragraph is easier than reading the same phrase alone under an axis.",
      "La figura alivia — hasta la leyenda. Rótulo de eje y leyenda son palabras aisladas, cortas, sin frase alrededor: desaparece justamente el contexto que quien tiene dislexia usa para compensar la decodificación. Leer \"densidad demográfica\" dentro de un párrafo es más fácil que leer la misma expresión sola debajo de un eje.",
    ),
    oQueFazer: ml(
      "Leia em voz alta os rótulos e a legenda antes de o aluno olhar o gráfico, e deixe-os escritos em tamanho maior ao lado. O gráfico, esse, ele lê — o que precisava de apoio eram as sete palavras em volta dele.",
      "Read the labels and legend aloud before the student looks at the chart, and leave them written in larger type alongside. The chart itself they can read — what needed support were the seven words around it.",
      "Lea en voz alta los rótulos y la leyenda antes de que el estudiante mire el gráfico, y déjelos escritos en tamaño mayor al lado. El gráfico, ese lo lee — lo que necesitaba apoyo eran las siete palabras a su alrededor.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY, UNDERSTOOD_LITERACIA],
  },
  {
    barreira: "figura-essencial",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "A figura traz o conteúdo que o texto ameniza: gráfico de mortalidade, foto de violência, mapa de fome. O enunciado pode falar de \"indicadores sociais\" e a imagem mostrar a coisa. Para um aluno em sofrimento, encontrar isso sem aviso, dentro de uma prova cronometrada, é diferente de encontrá-lo numa aula em que dá para respirar.",
      "The figure carries the content the text softens: a mortality chart, a photograph of violence, a hunger map. The stem may speak of \"social indicators\" while the image shows the thing itself. For a student in distress, meeting that unannounced inside a timed test is not the same as meeting it in a lesson where there is room to breathe.",
      "La figura trae el contenido que el texto suaviza: gráfico de mortalidad, foto de violencia, mapa de hambre. El enunciado puede hablar de \"indicadores sociales\" y la imagen mostrar la cosa. Para un estudiante en sufrimiento, encontrar eso sin aviso, dentro de una prueba cronometrada, es distinto de encontrarlo en una clase donde se puede respirar.",
    ),
    oQueFazer: ml(
      "Olhe a figura antes de propor a questão, e diga o assunto da imagem em uma frase antes de mostrá-la. Se o tema for pesado para aquele aluno naquela semana, troque a questão — há 3.495 no acervo e várias medem o mesmo conteúdo. Trocar por causa da imagem não é baixar a exigência: é escolher qual das equivalentes vai ser usada.",
      "Look at the figure before setting the question, and say the image's subject in one sentence before showing it. If the theme is heavy for that student that week, swap the question — there are 3,495 in the collection and several measure the same content. Swapping because of the image is not lowering the bar: it is choosing which of the equivalent questions gets used.",
      "Mire la figura antes de proponer la pregunta, y diga el asunto de la imagen en una frase antes de mostrarla. Si el tema es pesado para ese estudiante esa semana, cambie la pregunta — hay 3.495 en el acervo y varias miden el mismo contenido. Cambiar por causa de la imagen no es bajar la exigencia: es elegir cuál de las equivalentes se usa.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, OMS_ADOLESCENTE],
  },
  {
    barreira: "figura-essencial",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "A figura tira carga de linguagem da leitura e devolve na hora de falar sobre ela: o aluno vê a tendência e não encontra as palavras para dizê-la — \"aumentou\", \"aumentou mais rápido\", \"aumentou e depois estabilizou\" são distinções finas, e é nelas que as alternativas costumam diferir.",
      "The figure removes language load from the reading and returns it when it is time to speak about it: the student sees the trend and cannot find the words for it — \"rose\", \"rose faster\", \"rose and then levelled off\" are fine distinctions, and they are where the options usually differ.",
      "La figura quita carga de lenguaje de la lectura y la devuelve a la hora de hablar sobre ella: el estudiante ve la tendencia y no encuentra las palabras para decirla — \"aumentó\", \"aumentó más rápido\", \"aumentó y después se estabilizó\" son distinciones finas, y es en ellas donde las alternativas suelen diferir.",
    ),
    oQueFazer: ml(
      "Dê o vocabulário da figura antes da pergunta: escreva as três ou quatro expressões que descrevem o que se vê, e peça que ele escolha a que serve. Escolher entre expressões dadas mostra o que ele entendeu do gráfico; pedir que produza a descrição mede a linguagem, que não é o que a questão pergunta.",
      "Give the figure's vocabulary before the question: write the three or four expressions that describe what is shown, and ask the student to pick the one that fits. Choosing among given expressions shows what they understood of the chart; asking them to produce the description measures language, which is not what the question asks.",
      "Dé el vocabulario de la figura antes de la pregunta: escriba las tres o cuatro expresiones que describen lo que se ve, y pida que elija la que sirve. Elegir entre expresiones dadas muestra qué entendió del gráfico; pedirle que produzca la descripción mide el lenguaje, que no es lo que la pregunta pide.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, DLD_PROJECT],
  },
  {
    barreira: "figura-essencial",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "Ler um gráfico com precisão costuma exigir marcar nele: traçar a linha até o eixo, circular o ponto, anotar o valor ao lado da barra. São gestos de precisão, do mesmo tipo que o traçado da letra — e o aluno que os evita passa a ler o gráfico no olho, o que introduz erro exatamente onde a questão exige exatidão.",
      "Reading a chart precisely usually requires marking it: drawing the line to the axis, circling the point, noting the value beside the bar. Those are precision movements, of the same kind as forming letters — and a student who avoids them ends up reading the chart by eye, which introduces error exactly where the question demands exactness.",
      "Leer un gráfico con precisión suele exigir marcarlo: trazar la línea hasta el eje, encerrar el punto, anotar el valor al lado de la barra. Son gestos de precisión, del mismo tipo que el trazo de la letra — y el estudiante que los evita pasa a leer el gráfico a ojo, lo que introduce error justo donde la pregunta exige exactitud.",
    ),
    oQueFazer: ml(
      "Ofereça régua, papel transparente ou a versão digital com linha-guia, para que marcar não dependa do traço. E, quando o valor lido for para uma conta, escreva-o você ao lado da figura: o que a questão mede é a leitura do gráfico, e não a caligrafia do número lido.",
      "Offer a ruler, transparent overlay, or the digital version with a guide line, so that marking does not depend on handwriting. And when the value read feeds a calculation, write it yourself beside the figure: what the question measures is the reading of the chart, not the penmanship of the number read.",
      "Ofrezca regla, papel transparente o la versión digital con línea guía, para que marcar no dependa del trazo. Y cuando el valor leído vaya a una cuenta, escríbalo usted al lado de la figura: lo que la pregunta mide es la lectura del gráfico, no la caligrafía del número leído.",
    ),
    citations: [WWC_ESCRITA_INICIAIS, READING_ROCKETS_ESCRITA, CAST_UDL],
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
  {
    barreira: "alternativas-numericas",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "O resultado precisa ser escrito para ser comparado, e é aí que o dígito inverte ou o algarismo sai ilegível. O aluno confere as alternativas contra o que escreveu — não contra o que calculou — e marca a opção que casa com a própria transcrição. Sem texto nas alternativas nada denuncia a troca: 2 400 e 240 são as duas plausíveis.",
      "The result must be written down to be compared, and that is where a digit flips or comes out illegible. The student checks the options against what they wrote — not against what they calculated — and marks the option matching their own transcription. With no text in the options, nothing exposes the slip: 2,400 and 240 are both plausible.",
      "El resultado debe escribirse para ser comparado, y ahí es donde el dígito se invierte o la cifra sale ilegible. El estudiante coteja las alternativas con lo que escribió — no con lo que calculó — y marca la opción que coincide con su propia transcripción. Sin texto en las alternativas nada delata el cambio: 2.400 y 240 son las dos plausibles.",
    ),
    oQueFazer: ml(
      "Peça o resultado dito em voz alta antes de ser escrito, e só então a marcação. E, quando a leitura do que ele escreveu ficar duvidosa, pergunte em vez de deduzir: a diferença entre errar a conta e errar o traçado muda o que se ensina depois, e só a pergunta separa as duas.",
      "Ask for the result said aloud before it is written, and only then for the mark. And when what they wrote is hard to read, ask rather than assume: the difference between getting the arithmetic wrong and getting the handwriting wrong changes what gets taught next, and only asking tells them apart.",
      "Pida el resultado dicho en voz alta antes de escribirlo, y solo entonces la marcación. Y cuando la lectura de lo que escribió resulte dudosa, pregunte en vez de deducir: la diferencia entre equivocar la cuenta y equivocar el trazo cambia lo que se enseña después, y solo la pregunta las separa.",
    ),
    citations: [WWC_ESCRITA_INICIAIS, WWC_ESCRITA_RESUMO, NCII],
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "autismo",
    oQueSignifica: ml(
      "Alternativa numérica é terreno favorável — não há ambiguidade a resolver. O atrito é de precisão: a conta dá 1,87 e a alternativa diz 1,9. Quem trabalha com exatidão não vê aproximação, vê divergência, e a resposta certa passa a parecer errada. O item raramente diz que se espera arredondamento.",
      "Numeric options are favourable terrain — there is no ambiguity to resolve. The friction is about precision: the calculation gives 1.87 and the option says 1.9. A student working exactly does not see an approximation, they see a discrepancy, and the right answer starts to look wrong. The item rarely states that rounding is expected.",
      "La alternativa numérica es terreno favorable — no hay ambigüedad que resolver. La fricción es de precisión: la cuenta da 1,87 y la alternativa dice 1,9. Quien trabaja con exactitud no ve una aproximación, ve una divergencia, y la respuesta correcta pasa a parecer equivocada. El ítem rara vez dice que se espera redondeo.",
    ),
    oQueFazer: ml(
      "Diga antes qual é a regra do arredondamento e onde ela vale — \"a alternativa mais próxima, com uma casa decimal\". Uma vez explicitada, serve para a prova inteira. Sem isso, o aluno refaz a conta procurando um erro que não existe, e gasta na terceira verificação o tempo de duas questões.",
      "State the rounding rule beforehand and where it applies — \"the nearest option, to one decimal place\". Once made explicit, it holds for the whole test. Without it, the student redoes the calculation hunting for an error that is not there, and spends on the third check the time of two questions.",
      "Diga antes cuál es la regla del redondeo y dónde vale — \"la alternativa más próxima, con un decimal\". Una vez explicitada, sirve para toda la prueba. Sin eso, el estudiante rehace la cuenta buscando un error que no existe, y gasta en la tercera verificación el tiempo de dos preguntas.",
    ),
    citations: [AFIRM_ANTECEDENTES, AFIRM_ANALISE_DE_TAREFA, NCAEP],
    evidence: "established",
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Cinco números sem texto exigem comparar grandezas de cabeça, e a tarefa soma as duas dificuldades descritas na síndrome: a memória verbal de curto prazo e o número como símbolo abstrato. O aluno pode ter chegado ao resultado e ainda assim não localizar qual das cinco é o dele.",
      "Five numbers with no text require comparing magnitudes mentally, and the task stacks the two difficulties described in the syndrome: short-term verbal memory and the number as an abstract symbol. The student may have reached the result and still not locate which of the five is theirs.",
      "Cinco números sin texto exigen comparar magnitudes de cabeza, y la tarea suma las dos dificultades descritas en el síndrome: la memoria verbal a corto plazo y el número como símbolo abstracto. El estudiante puede haber llegado al resultado y aun así no localizar cuál de las cinco es el suyo.",
    ),
    oQueFazer: ml(
      "Escreva o resultado do aluno num cartão e coloque-o fisicamente ao lado das alternativas, uma a uma, até casar. Comparar duas coisas presentes é diferente de procurar entre cinco lembradas — e o passo que se elimina é justamente o que a memória verbal tornaria caro.",
      "Write the student's result on a card and place it physically beside the options, one at a time, until it matches. Comparing two things that are present is different from searching among five remembered ones — and the step removed is precisely the one verbal memory would make expensive.",
      "Escriba el resultado del estudiante en una tarjeta y colóquela físicamente al lado de las alternativas, una por una, hasta que coincida. Comparar dos cosas presentes es distinto de buscar entre cinco recordadas — y el paso que se elimina es justamente el que la memoria verbal encarecería.",
    ),
    citations: [DSE_MEMORIA, IES_DOWN, DSRF_LEITURA],
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "Ouvidas em sequência, cinco alternativas puramente numéricas se confundem: 1,9 / 19 / 0,19 soam quase iguais na síntese de voz, e não há como passar o olho pelas cinco para ver de que ordem de grandeza se trata. A comparação, que na tela é instantânea, vira memória de cinco itens parecidos.",
      "Heard in sequence, five purely numeric options blur together: 1.9 / 19 / 0.19 sound almost identical in speech synthesis, and there is no glancing across the five to see what order of magnitude is at stake. The comparison, instantaneous on screen, becomes memory of five similar items.",
      "Oídas en secuencia, cinco alternativas puramente numéricas se confunden: 1,9 / 19 / 0,19 suenan casi iguales en la síntesis de voz, y no hay cómo pasar la vista por las cinco para ver de qué orden de magnitud se trata. La comparación, instantánea en la pantalla, se vuelve memoria de cinco ítems parecidos.",
    ),
    oQueFazer: ml(
      "Peça que o leitor de tela soletre os valores por dígito e diga a vírgula, e leia as cinco uma vez antes de resolver, para fixar a ordem de grandeza. Em braille, entregue as cinco numa coluna alinhada pela vírgula — o alinhamento é o que devolve a comparação ao tato.",
      "Have the screen reader spell the values digit by digit and announce the decimal point, and read all five once before solving, to fix the order of magnitude. In braille, provide the five in a column aligned on the decimal point — alignment is what gives comparison back to touch.",
      "Pida que el lector de pantalla deletree los valores dígito a dígito y diga la coma, y lea las cinco una vez antes de resolver, para fijar el orden de magnitud. En braille, entregue las cinco en una columna alineada por la coma — la alineación es lo que devuelve la comparación al tacto.",
    ),
    citations: [APH_RECURSOS, PATHS_TECNOLOGIA, PATHS_BRAILLE],
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "É o único lugar da questão em que não há segunda língua: o número é o mesmo em qualquer idioma. Por isso o erro aqui é informativo — se o aluno lê os dados corretamente e erra a escolha entre cinco números, o que falhou foi matemática, e não português escrito. Quando as alternativas têm texto, essa distinção fica indisponível.",
      "It is the one place in the question with no second language: a number is the same in any tongue. That makes the error here informative — if the student reads the data correctly and gets the choice among five numbers wrong, what failed was mathematics, not written Portuguese. When the options carry text, that distinction is unavailable.",
      "Es el único lugar de la pregunta donde no hay segunda lengua: el número es el mismo en cualquier idioma. Por eso el error aquí es informativo — si el estudiante lee bien los datos y falla la elección entre cinco números, lo que falló fue la matemática, y no el portugués escrito. Cuando las alternativas tienen texto, esa distinción no está disponible.",
    ),
    oQueFazer: ml(
      "Use estas questões para separar o que costuma vir junto: aplique a mesma habilidade uma vez com alternativas numéricas e uma vez com alternativas em texto, e compare. A diferença entre os dois resultados é a medida de quanto a língua está pesando — número que costuma faltar na hora de decidir o que ensinar em seguida.",
      "Use these questions to separate what usually comes bundled: set the same skill once with numeric options and once with text options, and compare. The difference between the two results measures how much language is weighing — a figure usually missing when deciding what to teach next.",
      "Use estas preguntas para separar lo que suele venir junto: aplique la misma habilidad una vez con alternativas numéricas y una vez con alternativas en texto, y compare. La diferencia entre ambos resultados mide cuánto pesa la lengua — número que suele faltar a la hora de decidir qué enseñar después.",
    ),
    citations: [INES_DEBASI, INES, CAST_UDL],
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "Alternativa numérica tira a compensação que melhor funciona na dislexia: confirmar pelo sentido. Num texto, quem decodifica com esforço usa o contexto para checar a palavra; entre cinco números não há contexto nenhum — e a troca de dígitos, que numa frase seria corrigida pelo sentido, aqui passa direto.",
      "Numeric options remove the compensation that works best in dyslexia: confirming by meaning. In text, a laboured decoder uses context to check the word; among five numbers there is no context at all — and a digit swap, which a sentence would correct through meaning, goes straight through.",
      "La alternativa numérica quita la compensación que mejor funciona en la dislexia: confirmar por el sentido. En un texto, quien decodifica con esfuerzo usa el contexto para verificar la palabra; entre cinco números no hay contexto alguno — y el cambio de dígitos, que en una frase se corregiría por el sentido, aquí pasa de largo.",
    ),
    oQueFazer: ml(
      "Leia as cinco alternativas em voz alta uma vez, com o aluno acompanhando, antes de resolver. E confira o resultado dele dizendo o número em voz alta, dígito a dígito, em vez de comparar visualmente — a conferência por audição pega a inversão que a conferência por leitura repete.",
      "Read the five options aloud once, with the student following, before solving. And check their result by saying the number aloud, digit by digit, rather than comparing visually — checking by ear catches the inversion that checking by eye repeats.",
      "Lea las cinco alternativas en voz alta una vez, con el estudiante siguiendo, antes de resolver. Y verifique su resultado diciendo el número en voz alta, dígito a dígito, en vez de comparar visualmente — la verificación por oído atrapa la inversión que la verificación por lectura repite.",
    ),
    citations: [READING_ROCKETS_SL, READING_ROCKETS_FONOLOGIA, UNDERSTOOD_LITERACIA],
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Os cinco alvos de resposta ficam próximos e são curtos — uma linha cada —, e alvo curto e próximo é a pior combinação para seleção por acionador, varredura ou olhar. O erro de seleção não tem como ser percebido pelo conteúdo: 240 e 2 400 são as duas plausíveis, e marcar a linha vizinha não parece engano.",
      "The five answer targets sit close together and are short — one line each — and short, close targets are the worst combination for selection by switch, scanning or gaze. A selection error cannot be caught by content: 240 and 2,400 are both plausible, and marking the neighbouring line does not look like a slip.",
      "Los cinco objetivos de respuesta están próximos y son cortos — una línea cada uno —, y objetivo corto y próximo es la peor combinación para la selección por pulsador, barrido o mirada. El error de selección no puede percibirse por el contenido: 240 y 2.400 son las dos plausibles, y marcar la línea vecina no parece un desliz.",
    ),
    oQueFazer: ml(
      "Aumente o espaçamento entre as alternativas e a área clicável de cada uma antes de aplicar, e peça a confirmação da escolha em voz ou por um segundo acionamento. Confirmar custa um passo; corrigir uma seleção errada que ninguém notou custa a questão.",
      "Increase the spacing between options and each one's clickable area before setting the question, and ask for the choice to be confirmed by voice or a second activation. Confirming costs one step; correcting a wrong selection nobody noticed costs the question.",
      "Aumente el espaciado entre las alternativas y el área seleccionable de cada una antes de aplicar, y pida la confirmación de la elección por voz o por una segunda activación. Confirmar cuesta un paso; corregir una selección equivocada que nadie notó cuesta la pregunta.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO, AAC_INSTITUTE],
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "Alternativa numérica não dá margem: o resultado está entre as cinco ou não está, e não estar não diz onde foi o erro. Para quem já lê o próprio desempenho de forma dura, é o formato que mais confirma a leitura — \"errei tudo\" —, quando na maior parte das vezes o que houve foi um passo trocado no meio de um raciocínio correto.",
      "Numeric options leave no margin: the result is among the five or it is not, and not being there says nothing about where the error was. For a student who already reads their own performance harshly, it is the format that most confirms that reading — \"I got everything wrong\" — when most of the time what happened was one step swapped inside correct reasoning.",
      "La alternativa numérica no da margen: el resultado está entre las cinco o no está, y no estar no dice dónde estuvo el error. Para quien ya lee su propio desempeño con dureza, es el formato que más confirma esa lectura — \"me equivoqué en todo\" —, cuando la mayoría de las veces lo que hubo fue un paso cambiado dentro de un razonamiento correcto.",
    ),
    oQueFazer: ml(
      "Confira o percurso, e não só o resultado: mostre em qual etapa a conta saiu do caminho e o que estava certo até ali. A informação existe e quase nunca é dita — e é ela que separa \"não sei fazer\" de \"troquei um sinal\", que são coisas diferentes e produzem semanas diferentes.",
      "Check the route, not just the result: show at which step the calculation left the path and what was right up to there. The information exists and is almost never said — and it is what separates \"I cannot do this\" from \"I flipped a sign\", which are different things and produce different weeks.",
      "Verifique el recorrido, y no solo el resultado: muestre en qué etapa la cuenta se salió del camino y qué estaba bien hasta ahí. La información existe y casi nunca se dice — y es la que separa \"no sé hacerlo\" de \"cambié un signo\", que son cosas distintas y producen semanas distintas.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, WWC_RESOLUCAO],
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Em braille, o número vem precedido do sinal que o anuncia, e cinco alternativas numéricas são cinco linhas quase idênticas ao tato — a diferença entre elas pode ser um ponto de uma cela. Comparar exige percorrer as cinco em sequência, sem visão de conjunto, e uma troca de dígito não se denuncia por sentido.",
      "In braille the number is preceded by the sign announcing it, and five numeric options are five almost identical lines to the touch — the difference between them may be one dot of one cell. Comparing means travelling all five in sequence, with no overview, and a digit swap does not announce itself through meaning.",
      "En braille, el número viene precedido del signo que lo anuncia, y cinco alternativas numéricas son cinco líneas casi idénticas al tacto — la diferencia entre ellas puede ser un punto de una celda. Comparar exige recorrer las cinco en secuencia, sin visión de conjunto, y un cambio de dígito no se delata por el sentido.",
    ),
    oQueFazer: ml(
      "Entregue as cinco numa coluna alinhada, com o resultado do aluno numa linha à parte logo acima, para que a comparação seja sempre entre duas linhas vizinhas. E combine que o valor final será dito e conferido em voz — a conferência por outro canal é o que pega o que o tato repetiria igual.",
      "Provide the five in an aligned column, with the student's result on a separate line just above, so the comparison is always between two neighbouring lines. And agree that the final value will be spoken and checked by voice — checking through another channel is what catches what touch would repeat identically.",
      "Entregue las cinco en una columna alineada, con el resultado del estudiante en una línea aparte justo encima, para que la comparación sea siempre entre dos líneas vecinas. Y acuerde que el valor final se dirá y verificará por voz — la verificación por otro canal es la que atrapa lo que el tacto repetiría igual.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, APH_RECURSOS, NCDB_MOODLE],
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "Sem texto nas alternativas, some a última chance de perceber que o enunciado foi entendido ao contrário. Quando as opções são frases, uma delas costuma soar impossível e denuncia a leitura errada da relação; entre cinco números, a interpretação invertida produz um resultado que existe na lista e parece certo.",
      "With no text in the options, the last chance to notice the stem was understood backwards disappears. When the options are sentences, one of them usually sounds impossible and exposes the misread relation; among five numbers, the inverted interpretation produces a result that exists in the list and looks right.",
      "Sin texto en las alternativas, desaparece la última oportunidad de percibir que el enunciado se entendió al revés. Cuando las opciones son frases, una suele sonar imposible y delata la lectura equivocada de la relación; entre cinco números, la interpretación invertida produce un resultado que existe en la lista y parece correcto.",
    ),
    oQueFazer: ml(
      "Antes de calcular, peça que ele diga a relação com as próprias palavras — quem é maior, o que é parte do quê. Confirmada a relação, a conta se resolve; sem confirmá-la, acertar ou errar depende de sorte, e nenhuma das duas ensina alguma coisa.",
      "Before calculating, ask the student to state the relation in their own words — which is larger, what is part of what. Once the relation is confirmed, the arithmetic resolves itself; without confirming it, right and wrong both come down to luck, and neither teaches anything.",
      "Antes de calcular, pida que diga la relación con sus propias palabras — quién es mayor, qué es parte de qué. Confirmada la relación, la cuenta se resuelve; sin confirmarla, acertar o errar depende de la suerte, y ninguna de las dos enseña nada.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, RADLD],
  },
  {
    barreira: "alternativas-numericas",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "As cinco alternativas numéricas entregam mais do que parecem: quem entende do assunto vê nelas os erros que a banca previu. Este aluno costuma resolver de trás para frente, testando alternativa, e chegar ao resultado sem ter feito o percurso — o que é legítimo e não deixa nada para conversar depois.",
      "Five numeric options give away more than they seem to: someone who knows the subject sees in them the errors the examiners anticipated. This student often works backwards, testing options, and reaches the result without having walked the route — which is legitimate and leaves nothing to discuss afterwards.",
      "Las cinco alternativas numéricas entregan más de lo que parece: quien entiende del asunto ve en ellas los errores que la banca previó. Este estudiante suele resolver de atrás hacia adelante, probando alternativas, y llegar al resultado sin haber hecho el recorrido — lo que es legítimo y no deja nada para conversar después.",
    ),
    oQueFazer: ml(
      "Peça que ele diga qual erro produz cada uma das quatro distratoras. É análise do item, exige o conteúdo inteiro e não se resolve por eliminação — e, ao contrário de exigir o passo a passo, não é repetir o que ele já fez de cabeça.",
      "Ask which error produces each of the four distractors. That is item analysis, it requires the whole content and cannot be settled by elimination — and, unlike demanding step-by-step work, it is not repeating what they already did mentally.",
      "Pida que diga qué error produce cada una de las cuatro distractoras. Es análisis del ítem, exige el contenido entero y no se resuelve por eliminación — y, a diferencia de exigir el paso a paso, no es repetir lo que ya hizo de cabeza.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, UCONN_SEM_ARTIGOS, NAGC],
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
      "Aqui a medida aponta para o lado contrário do que aponta nas outras linhas: o encadeamento é a parte da questão que ainda exige algo deste aluno. Ele costuma resolver as etapas de cabeça e saltar direto ao resultado — o que dá certo até a questão em que uma etapa foi pulada por engano, e aí não há registro para encontrar o erro.",
      "Here the measure points the opposite way from the other rows: chaining is the part of the question that still demands something of this student. They usually solve the steps mentally and jump to the result — which works until the question where a step was skipped by mistake, and then there is no record in which to find the error.",
      "Aquí la medida apunta al lado contrario que en las otras filas: el encadenamiento es la parte de la pregunta que todavía exige algo de este estudiante. Suele resolver las etapas de cabeza y saltar al resultado — lo que funciona hasta la pregunta donde se saltó un paso por error, y entonces no hay registro donde encontrar la equivocación.",
    ),
    oQueFazer: ml(
      "Em vez de exigir o passo a passo, peça o caminho alternativo: outra forma de chegar ao mesmo resultado, ou o que mudaria na resposta se um dado fosse outro. Aprofundar em vez de repetir é o princípio dos modelos de enriquecimento, e conserva o registro sem transformá-lo em burocracia.",
      "Instead of demanding step-by-step work, ask for the alternative route: another way to the same result, or what would change if one datum were different. Deepening rather than repeating is the principle of enrichment models, and it preserves a record without turning it into bureaucracy.",
      "En lugar de exigir el paso a paso, pida el camino alternativo: otra forma de llegar al mismo resultado, o qué cambiaría en la respuesta si un dato fuera otro. Profundizar en vez de repetir es el principio de los modelos de enriquecimiento, y conserva el registro sin volverlo burocracia.",
    ),
    citations: [UCONN_SEM, ERIC_ENRIQUECIMENTO],
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Cada etapa concluída precisa ser guardada enquanto a seguinte acontece, e isso é memória verbal de curto prazo — o ponto mais custoso descrito na literatura da síndrome. O aluno costuma executar bem cada passo isolado e chegar ao terceiro sem o resultado do primeiro.",
      "Each completed step must be held while the next one happens, and that is short-term verbal memory — the costliest point described in the syndrome's literature. The student usually executes each isolated step well and arrives at the third without the result of the first.",
      "Cada etapa concluida debe guardarse mientras ocurre la siguiente, y eso es memoria verbal a corto plazo — el punto más costoso descrito en la literatura del síndrome. El estudiante suele ejecutar bien cada paso aislado y llegar al tercero sin el resultado del primero.",
    ),
    oQueFazer: ml(
      "Monte a sequência em cartões, um por etapa, e vá virando cada um com o resultado escrito nele. O que estava na memória passa a estar na mesa, em ordem, e a etapa seguinte pergunta ao cartão anterior em vez de perguntar à lembrança.",
      "Lay the sequence out on cards, one per step, turning each over with its result written on it. What was in memory comes to sit on the table, in order, and the next step asks the previous card instead of asking recollection.",
      "Arme la secuencia en tarjetas, una por etapa, y vaya girando cada una con el resultado escrito en ella. Lo que estaba en la memoria pasa a estar en la mesa, en orden, y la etapa siguiente le pregunta a la tarjeta anterior en vez de preguntarle al recuerdo.",
    ),
    citations: [DSE_MEMORIA, DSE_LEITURA, DSRF_LEITURA],
    evidence: "established",
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "O papel de rascunho é onde as etapas ficam à vista, e a leitura tátil ou por voz não tem \"à vista\": conferir o resultado da etapa 2 durante a etapa 4 significa procurá-lo de novo, linha a linha. É por isso que o encadeamento custa aqui mais do que a conta de cada passo.",
      "Scratch paper is where the steps stay in sight, and tactile or spoken reading has no \"in sight\": checking step 2's result during step 4 means finding it again, line by line. That is why chaining costs more here than the arithmetic of each step.",
      "El papel borrador es donde las etapas quedan a la vista, y la lectura táctil o por voz no tiene \"a la vista\": verificar el resultado de la etapa 2 durante la etapa 4 significa buscarlo de nuevo, línea a línea. Por eso el encadenamiento cuesta aquí más que la cuenta de cada paso.",
    ),
    oQueFazer: ml(
      "Combine um lugar fixo para cada resultado intermediário — a primeira linha da folha braille, ou uma nota de voz numerada — e diga o número da etapa junto do valor ao registrar. Endereço fixo é o que substitui a passada de olho; sem ele, o rascunho vira uma segunda leitura sequencial.",
      "Agree on a fixed place for each intermediate result — the first line of the braille sheet, or a numbered voice note — and say the step number alongside the value when recording it. A fixed address is what replaces the glance; without one, the scratch work becomes a second sequential reading.",
      "Acuerde un lugar fijo para cada resultado intermedio — la primera línea de la hoja braille, o una nota de voz numerada — y diga el número de la etapa junto al valor al registrarlo. La dirección fija es lo que sustituye al vistazo; sin ella, el borrador se vuelve una segunda lectura secuencial.",
    ),
    citations: [PATHS_TECNOLOGIA, APH_RECURSOS, PATHS_BRAILLE],
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "A ordem das etapas está nos conectivos — \"em seguida\", \"sabendo que\", \"após o que\" —, e conectivo é a classe de palavra em que o português escrito mais se afasta da Libras. O aluno pode dominar todas as operações e executar na ordem errada porque a ordem foi dita por três palavras sem equivalente direto.",
      "The order of the steps lives in the connectives — \"then\", \"knowing that\", \"after which\" — and connectives are the word class where written Portuguese departs most from sign language. The student may master every operation and execute in the wrong order because the order was stated by three words with no direct equivalent.",
      "El orden de las etapas está en los conectores — \"en seguida\", \"sabiendo que\", \"tras lo cual\" —, y el conector es la clase de palabra en que el portugués escrito más se aleja de la lengua de señas. El estudiante puede dominar todas las operaciones y ejecutar en el orden equivocado porque el orden lo dijeron tres palabras sin equivalente directo.",
    ),
    oQueFazer: ml(
      "Numere as etapas no enunciado junto com o aluno, e confirme a ordem em Libras antes de qualquer conta. Se ele reordenar corretamente com os passos já numerados, o que faltava era o conectivo — e é isso que precisa ser ensinado, não a operação.",
      "Number the steps on the stem together with the student, and confirm the order in sign language before any calculation. If they reorder correctly once the steps are numbered, what was missing was the connective — and that is what needs teaching, not the operation.",
      "Numere las etapas en el enunciado junto con el estudiante, y confirme el orden en lengua de señas antes de cualquier cuenta. Si reordena correctamente con los pasos ya numerados, lo que faltaba era el conector — y es eso lo que hay que enseñar, no la operación.",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, INES],
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "Questão em etapas obriga a voltar ao enunciado entre um passo e outro, e cada volta é decodificação de novo. O aluno tende a resolver o máximo possível sem voltar, para não pagar a leitura duas vezes — e é aí que uma etapa é pulada, por economia e não por desconhecimento.",
      "A stepwise question forces returning to the stem between one step and the next, and each return is decoding again. The student tends to solve as much as possible without going back, to avoid paying for the reading twice — and that is where a step gets skipped, out of economy and not out of ignorance.",
      "La pregunta por etapas obliga a volver al enunciado entre un paso y otro, y cada vuelta es decodificación otra vez. El estudiante tiende a resolver lo máximo posible sin volver, para no pagar la lectura dos veces — y ahí es donde se salta una etapa, por economía y no por desconocimiento.",
    ),
    oQueFazer: ml(
      "Extraia a sequência do texto para uma lista numerada antes de começar, com o dado de cada etapa ao lado dela. Voltar passa a custar uma linha, e não um parágrafo — o enunciado continua ali para conferir, mas a resolução deixa de depender de reler.",
      "Pull the sequence out of the text into a numbered list before starting, with each step's datum beside it. Going back then costs a line instead of a paragraph — the stem is still there to check against, but solving no longer depends on re-reading.",
      "Extraiga la secuencia del texto a una lista numerada antes de empezar, con el dato de cada etapa a su lado. Volver pasa a costar una línea, y no un párrafo — el enunciado sigue ahí para verificar, pero la resolución deja de depender de releer.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY, NCIL],
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Cada resultado intermediário precisa ser registrado, e registrar é o que custa: uma sequência de acionamentos por número. Numa questão de quatro etapas, o custo de acesso se multiplica por quatro, e a fadiga da última etapa não é a mesma da primeira — o erro aparece no fim e parece falta de atenção.",
      "Each intermediate result must be recorded, and recording is what costs: a sequence of activations per number. In a four-step question the access cost multiplies by four, and the fatigue of the last step is not that of the first — the error shows up at the end and looks like carelessness.",
      "Cada resultado intermedio debe registrarse, y registrar es lo que cuesta: una secuencia de activaciones por número. En una pregunta de cuatro etapas, el costo de acceso se multiplica por cuatro, y la fatiga de la última etapa no es la de la primera — el error aparece al final y parece falta de atención.",
    ),
    oQueFazer: ml(
      "Reduza o registro ao mínimo: formulário com as etapas já escritas e só o valor a preencher, ou o aluno ditando os passos enquanto você anota. E não conte a questão em etapas como uma questão só para efeito de tempo — para ele são quatro.",
      "Cut recording to a minimum: a form with the steps already written and only the value to fill in, or the student dictating the steps while you write. And do not count a stepwise question as a single question for timing purposes — for this student it is four.",
      "Reduzca el registro al mínimo: formulario con las etapas ya escritas y solo el valor por completar, o el estudiante dictando los pasos mientras usted anota. Y no cuente la pregunta por etapas como una sola pregunta a efectos de tiempo — para él son cuatro.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO, AAC_APRENDER],
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Cada etapa passa pelo interveniente, e o resultado de uma precisa estar disponível quando a seguinte começa — mas o canal é um só, e serve tanto para transmitir a próxima instrução quanto para conferir o valor anterior. A questão encadeada é, na prática, uma conversa longa com quem também está lendo por você.",
      "Each step passes through the intervener, and one step's result must be available when the next begins — but there is a single channel, serving both to convey the next instruction and to check the previous value. A chained question is, in practice, a long conversation with the person who is also reading for you.",
      "Cada etapa pasa por el interviniente, y el resultado de una debe estar disponible cuando empieza la siguiente — pero el canal es uno solo, y sirve tanto para transmitir la próxima instrucción como para verificar el valor anterior. La pregunta encadenada es, en la práctica, una conversación larga con quien también está leyendo por usted.",
    ),
    oQueFazer: ml(
      "Combine antes quantas etapas são e onde cada resultado será registrado em relevo, para que conferir não dependa de pedir. E defina quem faz o quê em cada passo: sem essa divisão combinada, a ajuda entra no meio da etapa e fica impossível saber qual parte foi do aluno.",
      "Agree beforehand how many steps there are and where each result will be recorded in relief, so that checking does not depend on asking. And define who does what at each step: without that agreed division, help enters mid-step and it becomes impossible to know which part was the student's.",
      "Acuerde antes cuántas etapas son y dónde se registrará cada resultado en relieve, para que verificar no dependa de pedir. Y defina quién hace qué en cada paso: sin esa división acordada, la ayuda entra en medio de la etapa y se vuelve imposible saber qué parte fue del estudiante.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, CADEAFBLIND_INTERVENTOR, USU_INTERVENTOR],
  },
  {
    barreira: "cadeia-de-etapas",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "Planejar uma sequência costuma ser feito falando consigo mesmo — \"primeiro isso, depois aquilo\" —, e é justamente esse ensaio verbal que o TDL torna frágil. Somado a isso, a ordem no enunciado vem por conectivos, o ponto de dificuldade conhecido. O aluno entende cada etapa e não consegue manter o plano.",
      "Planning a sequence is usually done by talking to oneself — \"first this, then that\" — and it is precisely that verbal rehearsal that DLD makes fragile. On top of that, the order in the stem arrives through connectives, the known point of difficulty. The student understands each step and cannot hold the plan.",
      "Planificar una secuencia suele hacerse hablando consigo mismo — \"primero esto, después aquello\" —, y es justamente ese ensayo verbal el que el TDL vuelve frágil. Sumado a eso, el orden en el enunciado viene por conectores, el punto de dificultad conocido. El estudiante entiende cada etapa y no logra mantener el plan.",
    ),
    oQueFazer: ml(
      "Deixe o plano fora da fala: as etapas numeradas, cada uma com um ícone ou uma palavra curta, à vista durante a resolução. Peça que ele aponte em que etapa está, em vez de dizer — apontar não cobra a linguagem que a questão não está medindo.",
      "Keep the plan out of speech: the steps numbered, each with an icon or a short word, in sight while solving. Ask the student to point at which step they are on rather than say it — pointing does not charge the language the question is not measuring.",
      "Deje el plan fuera del habla: las etapas numeradas, cada una con un ícono o una palabra corta, a la vista durante la resolución. Pida que señale en qué etapa está, en vez de decirlo — señalar no cobra el lenguaje que la pregunta no está midiendo.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, DLD_PROJECT],
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
  {
    barreira: "vocabulario-denso",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "O termo longo costuma ser o único ponto da questão em que aparece algo que este aluno ainda não sabe. O risco aqui é o inverso do das outras linhas desta barreira: a adaptação que troca o termo por uma palavra fácil resolve a leitura de quem precisava e apaga a única parte com tração para quem não precisava.",
      "The long term is usually the one point in the question where something this student does not yet know shows up. The risk here is the inverse of the other rows of this barrier: the adaptation that swaps the term for an easy word solves the reading for those who needed it and erases the only part with traction for those who did not.",
      "El término largo suele ser el único punto de la pregunta donde aparece algo que este estudiante todavía no sabe. El riesgo aquí es el inverso del de las otras filas de esta barrera: la adaptación que cambia el término por una palabra fácil resuelve la lectura de quien la necesitaba y borra la única parte con tracción para quien no la necesitaba.",
    ),
    oQueFazer: ml(
      "Mantenha o termo e use-o como porta: de onde vem a palavra, o que ela quer dizer em outra matéria, por que a banca escolheu essa e não a corrente. Se a turma recebeu a versão com o termo explicado, ele pode receber a original — a mesma questão com o vocabulário intacto já é diferenciação, e não exige preparar outro material.",
      "Keep the term and use it as a door: where the word comes from, what it means in another subject, why the examiners chose it over the everyday one. If the class got the version with the term explained, this student can get the original — the same question with its vocabulary intact is already differentiation, and it requires preparing no second material.",
      "Mantenga el término y úselo como puerta: de dónde viene la palabra, qué significa en otra materia, por qué la banca eligió esa y no la corriente. Si la clase recibió la versión con el término explicado, él puede recibir la original — la misma pregunta con el vocabulario intacto ya es diferenciación, y no exige preparar otro material.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, UCONN_SEM_ARTIGOS],
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "autismo",
    oQueSignifica: ml(
      "Termo técnico costuma ser terreno favorável, e às vezes o aluno sabe dele mais do que a questão exige. O atrito aparece quando a mesma palavra tem um sentido no uso comum e outro na matéria — \"trabalho\" em física, \"força\" em biologia — e a leitura precisa do termo entra em conflito com o sentido que a questão usa.",
      "Technical terms are usually favourable terrain, and sometimes the student knows more about one than the question requires. Friction appears when the same word has one sense in everyday use and another in the subject — \"work\" in physics, \"force\" in biology — and the precise reading of the term conflicts with the sense the question uses.",
      "El término técnico suele ser terreno favorable, y a veces el estudiante sabe de él más de lo que la pregunta exige. La fricción aparece cuando la misma palabra tiene un sentido en el uso común y otro en la materia — \"trabajo\" en física, \"fuerza\" en biología — y la lectura precisa del término entra en conflicto con el sentido que la pregunta usa.",
    ),
    oQueFazer: ml(
      "Diga em qual sentido o termo está sendo usado, e reconheça o outro em voz alta em vez de ignorá-lo. Discordância sobre definição resolvida com \"aqui significa isto\" custa dez segundos; ignorada, ela ocupa a questão inteira — e com razão.",
      "Say which sense the term is being used in, and acknowledge the other one aloud rather than ignoring it. A disagreement about definitions settled with \"here it means this\" costs ten seconds; ignored, it takes over the whole question — and rightly so.",
      "Diga en qué sentido se está usando el término, y reconozca el otro en voz alta en vez de ignorarlo. Un desacuerdo sobre definiciones resuelto con \"aquí significa esto\" cuesta diez segundos; ignorado, ocupa la pregunta entera — y con razón.",
    ),
    citations: [AFIRM_NARRATIVAS, AFIRM_ANTECEDENTES, NCAEP],
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "tdah",
    oQueSignifica: ml(
      "A palavra longa é atravessada, não lida: o aluno segue em frente com o sentido geral e volta ao termo só se a alternativa exigir — e aí já não sabe onde ele estava. Não é desconhecimento do termo; é que parar para processar uma palavra difícil no meio do enunciado é exatamente onde a leitura se interrompe e não recomeça.",
      "The long word is crossed, not read: the student carries on with the general sense and returns to the term only if an option demands it — and by then no longer knows where it was. It is not ignorance of the term; it is that stopping to process a hard word mid-stem is exactly where reading breaks off and does not resume.",
      "La palabra larga se atraviesa, no se lee: el estudiante sigue adelante con el sentido general y vuelve al término solo si la alternativa lo exige — y para entonces ya no sabe dónde estaba. No es desconocimiento del término; es que detenerse a procesar una palabra difícil en medio del enunciado es justamente donde la lectura se interrumpe y no recomienza.",
    ),
    oQueFazer: ml(
      "Circule os dois ou três termos longos antes da leitura e resolva-os primeiro, fora do texto. Assim a leitura corre sem obstáculo que exija parada, e o aluno não precisa escolher entre parar — e perder o fio — ou seguir — e perder o termo.",
      "Circle the two or three long terms before reading and settle them first, outside the text. The reading then runs with no obstacle demanding a stop, and the student does not have to choose between stopping — and losing the thread — or carrying on — and losing the term.",
      "Encierre los dos o tres términos largos antes de la lectura y resuélvalos primero, fuera del texto. Así la lectura corre sin obstáculo que exija detenerse, y el estudiante no debe elegir entre parar — y perder el hilo — o seguir — y perder el término.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, PMC_TDAH_REVISAO],
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Palavra longa é sequência longa de sons a segurar, e a memória fonológica de curto prazo é o ponto descrito como mais custoso na síndrome. O termo pode ter sido ensinado e mesmo assim não se sustentar dentro da frase — o aluno reconhece a palavra isolada e a perde quando ela aparece no meio de um enunciado.",
      "A long word is a long sequence of sounds to hold, and short-term phonological memory is the point described as costliest in the syndrome. The term may have been taught and still not hold up inside the sentence — the student recognises the word in isolation and loses it when it appears mid-stem.",
      "Palabra larga es secuencia larga de sonidos que sostener, y la memoria fonológica a corto plazo es el punto descrito como más costoso en el síndrome. El término puede haber sido enseñado y aun así no sostenerse dentro de la frase — el estudiante reconoce la palabra aislada y la pierde cuando aparece en medio de un enunciado.",
    ),
    oQueFazer: ml(
      "Apresente o termo escrito e em imagem, e deixe o cartão à vista durante a questão inteira. O apoio visual é via de força documentada, e aqui ele serve para tirar a palavra da memória: a cada vez que o termo aparecer no texto, o aluno o reencontra no cartão em vez de recuperá-lo de cabeça.",
      "Present the term in writing and in a picture, and keep the card in sight through the whole question. Visual support is a documented channel of strength, and here it serves to take the word out of memory: each time the term appears in the text, the student finds it again on the card instead of retrieving it mentally.",
      "Presente el término escrito y en imagen, y deje la tarjeta a la vista durante toda la pregunta. El apoyo visual es vía de fortaleza documentada, y aquí sirve para sacar la palabra de la memoria: cada vez que el término aparezca en el texto, el estudiante lo reencuentra en la tarjeta en vez de recuperarlo de cabeza.",
    ),
    citations: [DSE_LEITURA, DSE_MEMORIA, IES_DOWN],
    evidence: "established",
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "A síntese de voz erra justamente as palavras longas e pouco frequentes: divide errado, acentua no lugar errado, e o aluno ouve algo que não corresponde a termo nenhum que ele conheça. Em braille, o termo longo costuma vir com abreviações que só se identificam depois de reconhecida a palavra — e reconhecer é o que está em questão.",
      "Speech synthesis errs precisely on long, infrequent words: it splits them wrongly, stresses the wrong syllable, and the student hears something matching no term they know. In braille, a long term usually arrives with contractions that can only be identified once the word has been recognised — and recognising is what is at stake.",
      "La síntesis de voz se equivoca justamente en las palabras largas y poco frecuentes: divide mal, acentúa en el lugar equivocado, y el estudiante oye algo que no corresponde a ningún término que conozca. En braille, el término largo suele venir con abreviaturas que solo se identifican una vez reconocida la palabra — y reconocer es lo que está en juego.",
    ),
    oQueFazer: ml(
      "Confira antes como o leitor pronuncia os termos longos da questão e, se sair errado, escreva a pronúncia junto do material. E soletre o termo uma vez, ponto a ponto, quando ele aparecer pela primeira vez: uma soletração no começo evita ouvir a palavra errada cinco vezes.",
      "Check beforehand how the reader pronounces the question's long terms and, if it gets them wrong, write the pronunciation alongside the material. And spell the term out once, dot by dot, the first time it appears: one spelling at the start saves hearing the wrong word five times.",
      "Verifique antes cómo pronuncia el lector los términos largos de la pregunta y, si sale mal, escriba la pronunciación junto al material. Y deletree el término una vez, punto a punto, cuando aparezca por primera vez: un deletreo al comienzo evita oír la palabra equivocada cinco veces.",
    ),
    citations: [PATHS_TECNOLOGIA, APH_RECURSOS, PATHS_LETRAMENTO],
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Em questão de matemática, o termo longo costuma ser o que define a operação: \"inversamente proporcional\", \"acréscimo percentual\", \"razão entre\". Não é vocabulário decorativo — é a instrução da conta escrita em palavra. Quem não reconhece o termo não erra a leitura, erra a operação, e o erro aparece como se fosse de cálculo.",
      "In a mathematics question, the long term is usually the one defining the operation: \"inversely proportional\", \"percentage increase\", \"ratio between\". It is not decorative vocabulary — it is the instruction for the calculation written as a word. A student who does not recognise the term does not misread, they misoperate, and the error surfaces as if it were arithmetic.",
      "En una pregunta de matemática, el término largo suele ser el que define la operación: \"inversamente proporcional\", \"incremento porcentual\", \"razón entre\". No es vocabulario decorativo — es la instrucción de la cuenta escrita en palabra. Quien no reconoce el término no falla la lectura, falla la operación, y el error aparece como si fuera de cálculo.",
    ),
    oQueFazer: ml(
      "Traduza cada termo longo para o gesto que ele manda fazer, por escrito ao lado: \"inversamente proporcional → quando um dobra, o outro cai pela metade\". E confira essa tradução antes da conta — ela é a etapa que costuma faltar, e é onde a questão de fato se decide.",
      "Translate each long term into the move it orders, written beside it: \"inversely proportional → when one doubles, the other halves\". And check that translation before the calculation — it is the step usually missing, and it is where the question is actually decided.",
      "Traduzca cada término largo al gesto que manda hacer, por escrito al lado: \"inversamente proporcional → cuando uno se duplica, el otro cae a la mitad\". Y verifique esa traducción antes de la cuenta — es la etapa que suele faltar, y es donde la pregunta de hecho se decide.",
    ),
    citations: [WWC_MATEMATICA_2021, UNDERSTOOD_MATEMATICA, NCII_MATEMATICA],
    evidence: "established",
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "O termo técnico costuma não existir no sistema de comunicação do aluno: quem responde por prancha ou por software tem um vocabulário programado, e \"biodisponibilidade\" não está nele. A questão passa a ser respondível apenas por soletração, letra a letra — o que é lento a ponto de mudar a resposta que ele decide dar.",
      "The technical term usually does not exist in the student's communication system: someone answering through a board or software has a programmed vocabulary, and \"bioavailability\" is not in it. The question becomes answerable only by spelling, letter by letter — slow enough to change the answer they decide to give.",
      "El término técnico suele no existir en el sistema de comunicación del estudiante: quien responde por tablero o por software tiene un vocabulario programado, y \"biodisponibilidad\" no está en él. La pregunta pasa a ser respondible solo por deletreo, letra a letra — lo bastante lento como para cambiar la respuesta que decide dar.",
    ),
    oQueFazer: ml(
      "Programe os termos longos da questão no sistema antes da aula, junto com o aluno. É trabalho de minutos e vale para todas as questões daquele conteúdo — sem isso, o que se mede é o tamanho do vocabulário programado, e não o que ele sabe da matéria.",
      "Programme the question's long terms into the system before the lesson, together with the student. It is minutes of work and it holds for every question on that content — without it, what gets measured is the size of the programmed vocabulary, not what the student knows of the subject.",
      "Programe los términos largos de la pregunta en el sistema antes de la clase, junto con el estudiante. Es trabajo de minutos y vale para todas las preguntas de ese contenido — sin eso, lo que se mide es el tamaño del vocabulario programado, y no lo que sabe de la materia.",
    ),
    citations: [AAC_APRENDER, AAC_INSTITUTE, CAST_UDL],
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "Termo técnico é onde a questão parece dizer que não é para este aluno. A palavra que ele não reconhece confirma, em três segundos, a conclusão que ele já estava disposto a tirar — e a desistência que vem depois não é sobre a palavra, que se explicaria em meio minuto.",
      "A technical term is where the question seems to say it is not for this student. The word they do not recognise confirms, in three seconds, the conclusion they were already prepared to draw — and the giving up that follows is not about the word, which would take half a minute to explain.",
      "El término técnico es donde la pregunta parece decir que no es para este estudiante. La palabra que no reconoce confirma, en tres segundos, la conclusión que ya estaba dispuesto a sacar — y el abandono que viene después no es sobre la palabra, que se explicaría en medio minuto.",
    ),
    oQueFazer: ml(
      "Explique o termo antes de perguntar qualquer coisa, e diga que ele é técnico e que quase ninguém o conhece de antemão. Situar a dificuldade na palavra, e não no aluno, é o ajuste — e custa uma frase dita antes, que não funciona se dita depois da desistência.",
      "Explain the term before asking anything, and say that it is technical and that almost nobody knows it in advance. Placing the difficulty in the word, not in the student, is the adjustment — and it costs one sentence said beforehand, which does not work if said after they have given up.",
      "Explique el término antes de preguntar nada, y diga que es técnico y que casi nadie lo conoce de antemano. Situar la dificultad en la palabra, y no en el estudiante, es el ajuste — y cuesta una frase dicha antes, que no funciona si se dice después del abandono.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, OMS_ADOLESCENTE],
  },
  {
    barreira: "vocabulario-denso",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "O termo longo é o pior caso da ortografia, e a dificuldade ortográfica costuma acompanhar a disgrafia. Quando a palavra precisa ser usada — na anotação, na justificativa, na resposta escrita —, o aluno troca \"biodisponibilidade\" por \"aquilo do remédio\". O que fica registrado é que ele não domina o termo, quando o que houve foi a decisão de não escrevê-lo.",
      "The long term is spelling's worst case, and spelling difficulty commonly accompanies dysgraphia. When the word has to be used — in a note, in a justification, in a written answer — the student swaps \"bioavailability\" for \"that drug thing\". What gets recorded is that they do not master the term, when what happened was a decision not to write it.",
      "El término largo es el peor caso de la ortografía, y la dificultad ortográfica suele acompañar a la disgrafía. Cuando la palabra debe usarse — en la anotación, en la justificación, en la respuesta escrita —, el estudiante cambia \"biodisponibilidad\" por \"eso del remedio\". Lo que queda registrado es que no domina el término, cuando lo que hubo fue la decisión de no escribirlo.",
    ),
    oQueFazer: ml(
      "Deixe o termo impresso e disponível para ser apontado, copiado ou colado, e não conte a grafia dele como parte do que a questão mede. Para saber se o conceito está lá, peça a explicação oral com a palavra à vista: assim o termo é usado sem precisar ser escrito, que é o único jeito de separar o conceito da ortografia.",
      "Keep the term printed and available to be pointed at, copied or pasted, and do not count its spelling as part of what the question measures. To find out whether the concept is there, ask for the explanation orally with the word in sight: the term then gets used without having to be written, which is the only way to separate concept from spelling.",
      "Deje el término impreso y disponible para señalarlo, copiarlo o pegarlo, y no cuente su ortografía como parte de lo que la pregunta mide. Para saber si el concepto está ahí, pida la explicación oral con la palabra a la vista: así el término se usa sin necesidad de escribirlo, que es la única manera de separar el concepto de la ortografía.",
    ),
    citations: [WWC_ESCRITA_INICIAIS, WWC_ESCRITA_RESUMO, NCII],
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
