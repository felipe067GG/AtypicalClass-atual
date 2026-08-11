import { ml } from "@/lib/i18n-content"
import type { LocalizedText } from "@/lib/i18n-content"
import type { Citation, EvidenceLevel } from "@/components/specialty/types"
import type { ExigenciaId } from "./exigencias"

import {
  AFIRM_ANALISE_DE_TAREFA,
  AFIRM_ANTECEDENTES,
  AFIRM_APOIOS_VISUAIS,
  AFIRM_NARRATIVAS,
  APH_RECURSOS,
  ASHA,
  CADEAFBLIND_INTERVENTOR,
  CAST_UDL,
  CDC_SAUDE_MENTAL,
  CDC_SAUDE_MENTAL_AULA,
  CDC_TDAH,
  DLD_PROJECT,
  DSE_LEITURA,
  DSE_MEMORIA,
  DSRF_LEITURA,
  ERIC_ENRIQUECIMENTO,
  IES_DOWN,
  INES,
  INES_DEBASI,
  INES_MATERIAIS,
  NAGC,
  NCAEP,
  NCDB_MOODLE,
  NCIL,
  NCIL_DEFICIENCIA_INTELECTUAL,
  NCIL_STRUCTURED_LITERACY,
  NCII_MATEMATICA,
  OMS_ADOLESCENTE,
  PATHS_BRAILLE,
  PATHS_LETRAMENTO,
  PATHS_SURDOCEGUEIRA,
  PATHS_TECNOLOGIA,
  PMC_TDAH_REVISAO,
  PMC_TDL_LEITURA,
  PROMOTING_PROGRESS,
  READING_ROCKETS_ESCRITA,
  READING_ROCKETS_SL,
  TIES_PARTICIPACAO,
  UCONN_SEM,
  UNDERSTOOD_LITERACIA,
  UNDERSTOOD_TDAH,
  WWC_ESCRITA_FINAIS,
  WWC_MATEMATICA_2021,
  WWC_RESOLUCAO,
} from "@/lib/adaptacao/matriz"

/**
 * O que cada exigência de um conteúdo curricular significa para cada aluno.
 *
 * ## Por que existe uma segunda matriz, e não uma só
 *
 * `lib/adaptacao/matriz.ts` responde a uma pergunta diferente: dada **uma
 * questão** cujas barreiras foram medidas por um detector, o que o professor faz
 * com aquela questão na tela. Aqui a pergunta é outra: dado **um conteúdo
 * curricular** que vai ser ensinado em cinquenta minutos, o que muda no plano de
 * aula.
 *
 * As duas coisas se parecem e não são a mesma. "Enunciado longo" é uma medida de
 * um texto que já existe; "leitura extensa" é uma propriedade do conteúdo — há
 * assuntos que só se aprendem atravessando texto, e nenhuma adaptação de questão
 * resolve isso, porque o problema aparece antes da avaliação. Fundir as duas
 * matrizes obrigaria cada célula a servir aos dois usos, e célula que serve a
 * tudo é a que não adapta nada.
 *
 * As fontes são as mesmas, e por isso vêm importadas em vez de redigitadas: são
 * as mesmas especialidades e a mesma literatura. Duplicar a lista criaria duas
 * verdades sobre o mesmo endereço.
 *
 * ## O que uma célula deve conter
 *
 * `oQueSignifica` fala do **aprendizado**, não da prova: o que acontece com este
 * aluno quando o conteúdo exige isso dele. `oQueFazer` é ajuste no plano de aula
 * — na sequência, no material, no que se pede como evidência. Se uma célula
 * pudesse ser colada na matriz de questões, ela está no arquivo errado.
 *
 * São 7 exigências × 14 especialidades = 98 pares.
 */

export interface CelulaDeConteudo {
  exigencia: ExigenciaId
  /** Slug da especialidade, como em `SPECIALTIES`. */
  especialidade: string
  /** O que esta exigência significa para o aprendizado deste aluno. */
  oQueSignifica: LocalizedText
  /** O que muda no plano de aula. */
  oQueFazer: LocalizedText
  citations: Citation[]
  evidence?: EvidenceLevel
  /** Formação do professor para **esta** célula. Opcional; ver `VideoFormativo`. */
  videoFormativo?: VideoFormativo
}

/**
 * Um vídeo que forma o professor para aplicar **esta** célula da matriz.
 *
 * ## O segundo papel do vídeo, e por que ele não mora no conteúdo
 *
 * `Video`, em `lib/conteudos/tipos.ts`, é a aula da matéria acessível ao aluno:
 * fração em Libras, ciências com audiodescrição. Ele pertence ao conteúdo,
 * porque é sobre o assunto. Este aqui é outro papel — é sobre **como ensinar**
 * aquele assunto a um aluno específico quando o conteúdo exige aquilo dele — e
 * por isso pertence à célula, que é o único lugar onde o par exigência ×
 * especialidade existe.
 *
 * ## O campo que impede o conselho genérico
 *
 * `porQue` é obrigatório, e é o que segura o desenho inteiro. A tentação, com um
 * acervo colhido por especialidade, é pendurar o mesmo vídeo de dislexia nas
 * sete células de dislexia: sete ligações, nenhuma delas sobre a exigência. Um
 * `porQue` que sirva a duas células da mesma especialidade é a prova de que a
 * ligação foi feita pela especialidade, e não pela célula — é o mesmo teste que
 * o cabeçalho deste arquivo aplica às células ("se pudesse ser colada na outra
 * matriz, está no arquivo errado").
 *
 * `revisado` começa `false` pelo mesmo motivo de sempre: nenhuma verificação
 * automática assiste a nada.
 */
export interface VideoFormativo {
  /** Endereço `https://` — de qualquer origem, não só do YouTube. */
  url: string
  /** Preenchido por `npm run videos`, pela API. Nunca digitado. */
  titulo: string
  canal: string
  duracaoSegundos: number
  /** De onde a descrição veio: `oEmbed`, `schema.org VideoObject` ou `Open Graph`. */
  metadadosDe?: string
  /**
   * Por que este vídeo serve a **esta** célula, e não à especialidade inteira.
   * Uma frase que cite a exigência. Se ela couber noutra célula da mesma
   * especialidade, a ligação está errada.
   */
  porQue: string
  /** Alguém assistiu e aprovou. Sem isto, o vídeo não é publicado. */
  revisado: boolean
  revisadoPor?: string
  revisadoEm?: string
}

export const MATRIZ_DE_CONTEUDOS: CelulaDeConteudo[] = [
  // === leitura-extensa =======================================================
  {
    exigencia: "leitura-extensa",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "O conteúdo que só existe dentro de um texto longo põe este aluno num impasse: o assunto está ao alcance dele, e o meio de chegar até o assunto não. Ao longo de uma unidade inteira, a diferença não é de uma questão — é de quantas páginas ele conseguiu atravessar enquanto a turma atravessou o dobro.",
      "Content that exists only inside a long text puts this student in a bind: the subject is within reach, the route to it is not. Across a whole unit, the difference is not one question — it is how many pages they managed to cross while the class crossed twice as many.",
      "El contenido que solo existe dentro de un texto largo pone a este estudiante en un aprieto: el asunto está a su alcance, y el medio para llegar a él no. A lo largo de una unidad entera, la diferencia no es de una pregunta — es cuántas páginas logró atravesar mientras la clase atravesó el doble.",
    ),
    oQueFazer: ml(
      "Ofereça o mesmo texto em áudio desde o começo da unidade, e não como socorro depois da dificuldade. Combine a leitura em duplas com revezamento em voz alta e reserve a leitura silenciosa para trechos curtos — o objetivo da aula é o conteúdo do texto, e a decodificação é o pedágio, não a matéria.",
      "Offer the same text in audio from the start of the unit, not as a rescue after the difficulty appears. Pair reading with alternating aloud turns, and save silent reading for short passages — the lesson's goal is the text's content, and decoding is the toll, not the subject.",
      "Ofrezca el mismo texto en audio desde el comienzo de la unidad, y no como auxilio tras la dificultad. Combine la lectura en parejas con turnos en voz alta y reserve la lectura silenciosa para fragmentos cortos — el objetivo de la clase es el contenido del texto, y la decodificación es el peaje, no la materia.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY, UNDERSTOOD_LITERACIA],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=QzxzCNOSObQ",
      titulo: "Dyslexia Conference Recording | Reading Comprehension Strategies for Students with Dyslexia",
      canal: "International Dyslexia Association",
      duracaoSegundos: 4895,
      metadadosDe: "oEmbed",
      porQue:
        "Trata da compreensão de texto longo, que é onde a decodificação lenta consome o aluno antes de ele chegar ao sentido.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "tdah",
    oQueSignifica: ml(
      "Ler quarenta minutos seguidos é a forma de tarefa que este aluno sustenta pior, e conteúdos de leitura extensa costumam ser planejados exatamente assim. O que se perde não é o texto: é o fio entre o começo e o fim, porque a interrupção acontece sempre no mesmo lugar — no meio.",
      "Reading for forty unbroken minutes is the task shape this student sustains worst, and extended-reading content is usually planned exactly that way. What is lost is not the text: it is the thread between beginning and end, because the interruption always happens in the same place — the middle.",
      "Leer cuarenta minutos seguidos es la forma de tarea que este estudiante sostiene peor, y los contenidos de lectura extensa suelen planificarse exactamente así. Lo que se pierde no es el texto: es el hilo entre el comienzo y el final, porque la interrupción ocurre siempre en el mismo lugar — en el medio.",
    ),
    oQueFazer: ml(
      "Divida a leitura em blocos com uma tarefa curta ao fim de cada um — uma pergunta, uma frase escrita, uma marca no texto. E dê a estrutura do texto antes de começar: saber que são três partes e o que cada uma trata transforma a leitura numa sequência com marcos, em vez de um percurso sem sinalização.",
      "Break the reading into blocks with a short task at the end of each — one question, one written sentence, one mark on the text. And give the text's structure before starting: knowing there are three parts and what each covers turns reading into a sequence with landmarks instead of an unsignposted stretch.",
      "Divida la lectura en bloques con una tarea corta al final de cada uno — una pregunta, una frase escrita, una marca en el texto. Y dé la estructura del texto antes de empezar: saber que son tres partes y de qué trata cada una convierte la lectura en una secuencia con hitos, en vez de un recorrido sin señalización.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, PMC_TDAH_REVISAO],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=HFa33hpMU_I",
      titulo: "What Is Slow Processing Speed?",
      canal: "Understood",
      duracaoSegundos: 161,
      metadadosDe: "oEmbed",
      porQue:
        "Velocidade de processamento é o que decide quanto texto cabe no tempo da aula, e é o que faz a leitura longa terminar inacabada.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "O volume de informação nova por página é o que decide, e não o número de páginas. Um capítulo apresenta contexto, conceito e aplicação sem pausa para consolidar — e o que se perde costuma ser o conceito, que ficou espremido entre o exemplo inicial e o exercício final.",
      "What decides is the amount of new information per page, not the number of pages. A chapter presents context, concept and application with no pause to consolidate — and what gets lost is usually the concept, squeezed between the opening example and the closing exercise.",
      "El volumen de información nueva por página es lo que decide, y no el número de páginas. Un capítulo presenta contexto, concepto y aplicación sin pausa para consolidar — y lo que se pierde suele ser el concepto, apretado entre el ejemplo inicial y el ejercicio final.",
    ),
    oQueFazer: ml(
      "Reduza a quantidade de ideias por sessão, e não a extensão do conteúdo. Uma ideia por aula, com o texto integral disponível e a parte do dia marcada, chega mais longe em um bimestre do que o capítulo inteiro numa aula. Feche cada sessão com o aluno dizendo a ideia com as próprias palavras.",
      "Reduce the number of ideas per session, not the extent of the content. One idea per lesson, with the full text available and the day's part marked, gets further over a term than the whole chapter in one lesson. Close each session with the student stating the idea in their own words.",
      "Reduzca la cantidad de ideas por sesión, y no la extensión del contenido. Una idea por clase, con el texto íntegro disponible y la parte del día marcada, llega más lejos en un bimestre que el capítulo entero en una clase. Cierre cada sesión con el estudiante diciendo la idea con sus propias palabras.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=wmgg40nNgYI",
      titulo: "Materiais pedagógicos acessíveis | Corrida do Desafio | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 332,
      metadadosDe: "oEmbed",
      porQue:
        "Quebra a alfabetização em jogo com voltas curtas, reduzindo ideias por sessão em vez de reduzir o conteúdo.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "Texto longo acumula justamente as construções em que o TDL tropeça: encaixamento, retomada a distância, conectivo que sinaliza relação. O aluno entende cada parágrafo e não constrói o texto — e a avaliação registra isso como não ter compreendido o conteúdo, quando o conteúdo nunca chegou inteiro.",
      "Long text accumulates exactly the constructions DLD stumbles on: embedding, distant reference, connectives signalling relations. The student understands each paragraph and does not build the text — and assessment records that as not having grasped the content, when the content never arrived whole.",
      "El texto largo acumula justamente las construcciones en que el TDL tropieza: subordinación, retoma a distancia, conector que señala relación. El estudiante entiende cada párrafo y no construye el texto — y la evaluación registra eso como no haber comprendido el contenido, cuando el contenido nunca llegó entero.",
    ),
    oQueFazer: ml(
      "Construa com a turma um mapa do texto antes da leitura: quem são os elementos, como se relacionam, o que o texto quer mostrar. Depois leia com o mapa à vista, marcando nele cada retomada. O mapa carrega a estrutura que a memória de trabalho não sustenta ao longo de páginas.",
      "Build a map of the text with the class before reading: who the elements are, how they relate, what the text is out to show. Then read with the map in sight, marking each reference on it. The map carries the structure that working memory cannot hold across pages.",
      "Construya con la clase un mapa del texto antes de la lectura: quiénes son los elementos, cómo se relacionan, qué quiere mostrar el texto. Después lea con el mapa a la vista, marcando en él cada retoma. El mapa lleva la estructura que la memoria de trabajo no sostiene a lo largo de páginas.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, DLD_PROJECT],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=6Vt41eM3-xg",
      titulo: "SLI and reading: 2. Understanding written language",
      canal: "RADLD",
      duracaoSegundos: 181,
      metadadosDe: "oEmbed",
      porQue:
        "É sobre compreender a língua escrita ao longo do texto, que é onde o TDL deixa de construir o todo apesar de entender cada parágrafo.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "A leitura pode estar bem estabelecida e a retenção do que foi lido, não — é a memória verbal de curto prazo, o ponto que a literatura da síndrome descreve como mais custoso. Num conteúdo de leitura extensa, o aluno chega ao fim do texto sem o começo, e a conversa sobre o texto começa já em desvantagem.",
      "Reading may be well established while retention of what was read is not — it is short-term verbal memory, the point the syndrome's literature describes as costliest. In extended-reading content, the student reaches the end of the text without its beginning, and the discussion about the text starts at a disadvantage.",
      "La lectura puede estar bien establecida y la retención de lo leído, no — es la memoria verbal a corto plazo, el punto que la literatura del síndrome describe como más costoso. En un contenido de lectura extensa, el estudiante llega al final del texto sin el comienzo, y la conversación sobre el texto empieza ya en desventaja.",
    ),
    oQueFazer: ml(
      "Registre visualmente o que já foi lido, à medida que se lê: uma linha do tempo da narrativa, uma tira com os personagens, uma frase por parágrafo. O apoio visual é via de força documentada na síndrome, e aqui ele serve para que a retenção deixe de ser condição para participar da discussão.",
      "Record visually what has been read as reading goes on: a timeline of the narrative, a strip with the characters, one sentence per paragraph. Visual support is a documented channel of strength in the syndrome, and here it stops retention from being the price of admission to the discussion.",
      "Registre visualmente lo ya leído, a medida que se lee: una línea de tiempo de la narrativa, una tira con los personajes, una frase por párrafo. El apoyo visual es vía de fortaleza documentada en el síndrome, y aquí sirve para que la retención deje de ser condición para participar de la discusión.",
    ),
    citations: [DSE_MEMORIA, DSE_LEITURA, DSRF_LEITURA],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=zPfj1HYphfQ",
      titulo: "See and Learn First Phrases 1 - Reading Books",
      canal: "Down Syndrome Education International",
      duracaoSegundos: 55,
      metadadosDe: "oEmbed",
      porQue:
        "Mostra a leitura de livro apoiada, que é como o texto longo se torna atravessável quando a retenção verbal é o ponto caro.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "O problema não é ler — é o tempo e a antecedência. Um capítulo em braille chega em várias vezes o volume do impresso, e o material precisa existir transcrito antes da aula. Conteúdo de leitura extensa decidido na véspera é conteúdo do qual este aluno fica de fora, e a exclusão não aparece como recusa: aparece como atraso.",
      "The problem is not reading — it is time and lead time. A chapter in braille comes to several times the printed bulk, and the material must exist transcribed before the lesson. Extended-reading content decided the night before is content this student is left out of, and the exclusion does not look like refusal: it looks like being behind.",
      "El problema no es leer — es el tiempo y la antelación. Un capítulo en braille llega en varias veces el volumen del impreso, y el material debe existir transcrito antes de la clase. El contenido de lectura extensa decidido la víspera es contenido del que este estudiante queda fuera, y la exclusión no aparece como rechazo: aparece como atraso.",
    ),
    oQueFazer: ml(
      "Escolha o texto com semanas de antecedência e providencie a versão acessível junto com o planejamento, não depois dele. Prefira formatos que o leitor de tela navegue por títulos — um PDF digitalizado como imagem é inacessível mesmo estando no computador do aluno.",
      "Choose the text weeks ahead and arrange the accessible version alongside the planning, not after it. Prefer formats a screen reader can navigate by headings — a PDF scanned as an image is inaccessible even sitting on the student's computer.",
      "Elija el texto con semanas de antelación y provea la versión accesible junto con la planificación, no después. Prefiera formatos que el lector de pantalla navegue por títulos — un PDF digitalizado como imagen es inaccesible aun estando en la computadora del estudiante.",
    ),
    citations: [PATHS_BRAILLE, PATHS_TECNOLOGIA, APH_RECURSOS],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=FpHy1X3aZ40",
      titulo: "Materiais Pedagógicos Acessíveis | Lousa Interativa | Libras e Audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 258,
      metadadosDe: "oEmbed",
      porQue:
        "Lousa interativa como via de alfabetização, atacando a leitura pelo canal que o aluno tem.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Todo o texto passa por um canal só, e lento. Um conteúdo que pressupõe leitura extensa não cabe no tempo de aula, e a decisão de resumir — que sempre acaba acontecendo — é tomada no corredor, sem registro, por quem estiver ali. O aluno recebe outra versão do conteúdo, e ninguém sabe qual.",
      "All the text passes through a single, slow channel. Content that presumes extended reading does not fit the lesson's time, and the decision to summarise — which always ends up happening — gets made in the corridor, unrecorded, by whoever is there. The student receives a different version of the content, and nobody knows which.",
      "Todo el texto pasa por un solo canal, y lento. Un contenido que presupone lectura extensa no cabe en el tiempo de clase, y la decisión de resumir — que siempre termina ocurriendo — se toma en el pasillo, sin registro, por quien esté ahí. El estudiante recibe otra versión del contenido, y nadie sabe cuál.",
    ),
    oQueFazer: ml(
      "Decida com o interveniente, no planejamento, o que será transmitido na íntegra e o que será resumido — e registre essa decisão junto do plano de aula. Distribua a leitura ao longo de vários dias em vez de concentrar numa aula, e trate o tempo de acesso como parte da carga horária do conteúdo.",
      "Decide with the intervener, at planning time, what will be conveyed in full and what will be summarised — and record that decision alongside the lesson plan. Spread the reading over several days rather than concentrating it in one lesson, and treat access time as part of the content's hours.",
      "Decida con el interviniente, en la planificación, qué se transmitirá íntegro y qué se resumirá — y registre esa decisión junto al plan de clase. Distribuya la lectura a lo largo de varios días en vez de concentrarla en una clase, y trate el tiempo de acceso como parte de la carga horaria del contenido.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, CADEAFBLIND_INTERVENTOR, NCDB_MOODLE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=jitKitlDcX0",
      titulo: "iOS VoiceOver in ONE Minute: Rotor",
      canal: "TSBVI Distance",
      duracaoSegundos: 60,
      metadadosDe: "oEmbed",
      porQue:
        "O rotor é o que torna o texto longo navegável por título e por palavra, em vez de percorrível só do começo ao fim.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "Para o aluno surdo cuja primeira língua é a Libras, atravessar um capítulo é traduzir sem parar. O cansaço chega antes do fim, e a coesão entre partes distantes do texto — que é onde o português escrito mais se afasta da Libras — é justamente o que um conteúdo de leitura extensa mais exige.",
      "For a Deaf student whose first language is a sign language, crossing a chapter means translating without pause. Fatigue arrives before the end, and cohesion across distant parts of the text — where written Portuguese departs most from sign language — is exactly what extended-reading content demands most.",
      "Para el estudiante sordo cuya primera lengua es la lengua de señas, atravesar un capítulo es traducir sin parar. El cansancio llega antes del final, y la cohesión entre partes distantes del texto — donde el portugués escrito más se aleja de la lengua de señas — es justamente lo que más exige un contenido de lectura extensa.",
    ),
    oQueFazer: ml(
      "Trabalhe o texto em blocos, cada um fechado com a síntese feita pelo aluno em Libras antes de seguir. Quando houver material bilíngue do mesmo conteúdo, use-o como porta de entrada e o texto escrito como aprofundamento — a ordem inversa gasta o fôlego na tradução e deixa o conteúdo para depois.",
      "Work the text in blocks, each closed with the student's synthesis in sign language before moving on. When bilingual material on the same content exists, use it as the way in and the written text as the deepening — the reverse order spends the energy on translation and leaves the content for later.",
      "Trabaje el texto en bloques, cada uno cerrado con la síntesis hecha por el estudiante en lengua de señas antes de seguir. Cuando haya material bilingüe del mismo contenido, úselo como puerta de entrada y el texto escrito como profundización — el orden inverso gasta el aliento en la traducción y deja el contenido para después.",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, INES],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=J9NN7g7W-pU",
      titulo: "PALS High School: Paragraph Shrinking",
      canal: "The IRIS Center Video Collection",
      duracaoSegundos: 83,
      metadadosDe: "oEmbed",
      porQue:
        "Fecha cada parágrafo com a ideia principal dita pelo aluno, que é a estrutura em blocos que impede o capítulo inteiro de virar tradução sem parada.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "autismo",
    oQueSignifica: ml(
      "O texto longo traz muito contexto que não será cobrado, e nada nele indica o que é central. Quando o conteúdo é literário ou histórico, soma-se a linguagem figurada não sinalizada — e a precisão de leitura, que é força deste aluno, passa a ser gasta no detalhe que a aula não vai usar.",
      "A long text brings a lot of context that will not be assessed, and nothing in it marks what is central. When the content is literary or historical, unmarked figurative language is added — and this student's precision in reading, a strength, gets spent on the detail the lesson will never use.",
      "El texto largo trae mucho contexto que no se evaluará, y nada en él indica qué es central. Cuando el contenido es literario o histórico, se suma el lenguaje figurado no señalizado — y la precisión de lectura, que es fuerza de este estudiante, pasa a gastarse en el detalle que la clase no va a usar.",
    ),
    oQueFazer: ml(
      "Diga antes da leitura o que será discutido depois, e marque no texto os trechos que sustentam essa discussão. Sinalize as passagens em sentido figurado como figuradas. Não é reduzir a leitura: é dar o critério de relevância que o texto não dá, e que a turma infere sem perceber.",
      "Say before the reading what will be discussed afterwards, and mark on the text the passages that support that discussion. Flag figurative passages as figurative. It is not shrinking the reading: it is supplying the relevance criterion the text does not give, and which the class infers without noticing.",
      "Diga antes de la lectura qué se discutirá después, y marque en el texto los fragmentos que sostienen esa discusión. Señalice los pasajes en sentido figurado como figurados. No es reducir la lectura: es dar el criterio de relevancia que el texto no da, y que la clase infiere sin darse cuenta.",
    ),
    citations: [AFIRM_APOIOS_VISUAIS, AFIRM_ANTECEDENTES, NCAEP],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=XGEjzU-1bLI",
      titulo: "Materiais Pedagógicos Acessíveis | Pique Bandeira de Tabuleiro | Libras e Audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 134,
      metadadosDe: "oEmbed",
      porQue:
        "Põe o multiletramento dentro de um jogo com regras explícitas, que é o que torna a leitura longa previsível o bastante para ser atravessada.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "A tarefa de ler um livro inteiro é anunciada semanas antes e cobrada uma vez só, no fim. Para um aluno com ansiedade ou em episódio depressivo, esse desenho concentra todo o risco num ponto: quem não começou na primeira semana já não começa mais, e o adiamento vira dívida que cresce sozinha.",
      "The task of reading a whole book is announced weeks ahead and assessed once, at the end. For a student with anxiety or in a depressive episode, that design concentrates all the risk in one point: whoever did not start in the first week no longer starts, and postponement becomes a debt that grows on its own.",
      "La tarea de leer un libro entero se anuncia semanas antes y se evalúa una sola vez, al final. Para un estudiante con ansiedad o en episodio depresivo, ese diseño concentra todo el riesgo en un punto: quien no empezó la primera semana ya no empieza, y el aplazamiento se vuelve una deuda que crece sola.",
    ),
    oQueFazer: ml(
      "Fragmente o prazo, e não o livro: pontos de conversa a cada semana, curtos e sem nota. O que se quer não é vigiar o ritmo — é criar cinco pontos de retomada em vez de um ponto de fracasso. E deixe explícito que voltar depois de parar é previsto, porque o que trava não é a leitura, é a certeza de já ter perdido.",
      "Fragment the deadline, not the book: short, ungraded check-ins each week. The point is not monitoring pace — it is creating five points of re-entry instead of one point of failure. And make explicit that coming back after stopping is expected, because what jams is not the reading, it is the certainty of having already lost.",
      "Fragmente el plazo, y no el libro: puntos de conversación cada semana, cortos y sin nota. Lo que se busca no es vigilar el ritmo — es crear cinco puntos de retorno en vez de un punto de fracaso. Y deje explícito que volver después de parar está previsto, porque lo que traba no es la lectura, es la certeza de haber perdido ya.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, OMS_ADOLESCENTE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=WcCksFh5l70",
      titulo: "Low Mood",
      canal: "Anna Freud",
      duracaoSegundos: 276,
      metadadosDe: "oEmbed",
      porQue:
        "Humor deprimido corrói a energia que a leitura longa exige, e o vídeo trata do que isso parece na sala.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Sustentar a leitura por muito tempo é sustentar a postura por muito tempo, e virar página ou rolar a tela é uma sequência de acionamentos repetida centenas de vezes. A fadiga não aparece como queixa: aparece como leitura interrompida antes do fim, e é lida como desinteresse.",
      "Sustaining reading for a long time means sustaining posture for a long time, and turning a page or scrolling is a sequence of activations repeated hundreds of times. Fatigue does not show up as a complaint: it shows up as reading stopped before the end, and it gets read as disinterest.",
      "Sostener la lectura por mucho tiempo es sostener la postura por mucho tiempo, y pasar página o desplazar la pantalla es una secuencia de activaciones repetida cientos de veces. La fatiga no aparece como queja: aparece como lectura interrumpida antes del final, y se lee como desinterés.",
    ),
    oQueFazer: ml(
      "Prefira o formato que exija menos operações — áudio sincronizado, rolagem automática ajustável, texto contínuo em vez de páginas. Distribua a leitura em sessões curtas ao longo da semana e conte as pausas de posicionamento como tempo de aula, e não como interrupção da tarefa.",
      "Prefer the format requiring fewest operations — synced audio, adjustable auto-scroll, continuous text instead of pages. Spread the reading into short sessions across the week and count repositioning breaks as lesson time, not as interruption of the task.",
      "Prefiera el formato que exija menos operaciones — audio sincronizado, desplazamiento automático ajustable, texto continuo en vez de páginas. Distribuya la lectura en sesiones cortas a lo largo de la semana y cuente las pausas de posicionamiento como tiempo de clase, y no como interrupción de la tarea.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=cSxsROi-ZrA",
      titulo: "AAC, literacy, and fun: The Twits",
      canal: "AssistiveWare",
      duracaoSegundos: 1550,
      metadadosDe: "oEmbed",
      porQue:
        "Leitura compartilhada de livro longo com comunicação alternativa, que é como o texto extenso segue sendo discutido por quem não fala.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Em conteúdo de leitura extensa que carrega quantidade — um texto de história com datas e cifras, um artigo com proporções —, a dificuldade não está no texto e sim nas relações numéricas ditas em palavras, espalhadas por páginas. Ele acompanha a narrativa e não retém a ordem de grandeza do que foi narrado.",
      "In extended-reading content carrying quantity — a history text with dates and figures, an article with proportions — the difficulty is not the text but the numeric relations stated in words, spread across pages. The student follows the narrative and does not retain the order of magnitude of what was narrated.",
      "En contenido de lectura extensa que lleva cantidad — un texto de historia con fechas y cifras, un artículo con proporciones —, la dificultad no está en el texto sino en las relaciones numéricas dichas en palabras, dispersas por páginas. Sigue la narrativa y no retiene el orden de magnitud de lo narrado.",
    ),
    oQueFazer: ml(
      "Monte, junto com a leitura, uma linha ou uma tabela que guarde as quantidades à medida que aparecem. Não é resumo do texto: é o registro do que é numérico, que a leitura corrida dissolve. Ao fim, a linha responde perguntas que o texto responderia se ele pudesse ser relido inteiro.",
      "Build, alongside the reading, a line or table that stores the quantities as they appear. It is not a summary of the text: it is the record of what is numeric, which running reading dissolves. At the end, the line answers questions the text would answer if it could be reread whole.",
      "Arme, junto con la lectura, una línea o una tabla que guarde las cantidades a medida que aparecen. No es resumen del texto: es el registro de lo numérico, que la lectura corrida disuelve. Al final, la línea responde preguntas que el texto respondería si pudiera releerse entero.",
    ),
    citations: [WWC_MATEMATICA_2021, NCII_MATEMATICA],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=KpWCX0x1CVw",
      titulo: "Video Example: A tutor and student work on word problems",
      canal: "National Center on Intensive Intervention",
      duracaoSegundos: 288,
      metadadosDe: "oEmbed",
      porQue:
        "Problema em palavras é onde a quantidade vem dentro do texto, e o vídeo mostra o trabalho de retê-la em vez de deixá-la dissolver na leitura corrida.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "Conteúdo de leitura extensa vem quase sempre acompanhado de escrita extensa — fichamento, resumo, resposta dissertativa. A leitura em si não é o obstáculo; o obstáculo é que a única forma prevista de demonstrar que se leu passa pela mão, e é ela que não acompanha.",
      "Extended-reading content almost always comes with extended writing — reading notes, summaries, essay answers. Reading itself is not the obstacle; the obstacle is that the only planned way to show one has read runs through the hand, and the hand does not keep up.",
      "El contenido de lectura extensa viene casi siempre acompañado de escritura extensa — fichaje, resumen, respuesta ensayística. La lectura en sí no es el obstáculo; el obstáculo es que la única forma prevista de demostrar que se leyó pasa por la mano, y es ella la que no acompaña.",
    ),
    oQueFazer: ml(
      "Separe as duas coisas no planejamento: avalie a leitura por conversa, gravação ou marcação no próprio texto, e trate a escrita como outro conteúdo, com seu próprio tempo e apoio. Fichamento manuscrito de um capítulo mede resistência de traçado, não compreensão.",
      "Separate the two in the planning: assess the reading through conversation, recording or marks on the text itself, and treat writing as separate content with its own time and support. A handwritten chapter summary measures handwriting stamina, not comprehension.",
      "Separe las dos cosas en la planificación: evalúe la lectura por conversación, grabación o marcación en el propio texto, y trate la escritura como otro contenido, con su tiempo y apoyo. El fichaje manuscrito de un capítulo mide resistencia de trazo, no comprensión.",
    ),
    citations: [WWC_ESCRITA_FINAIS, READING_ROCKETS_ESCRITA],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=fpwIC7z1uXE",
      titulo: "PALS High School: Partner Reading with Retell",
      canal: "The IRIS Center Video Collection",
      duracaoSegundos: 101,
      metadadosDe: "oEmbed",
      porQue:
        "O reconto oral demonstra a leitura sem passar pela mão, que é o que separa avaliar a compreensão de medir resistência de traçado.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "leitura-extensa",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "Aqui a exigência é o contrário de obstáculo: leitura extensa costuma ser o único ponto do currículo em que este aluno encontra material à altura. O risco é o oposto do das outras linhas — o texto ser fatiado, resumido e transformado em roteiro de perguntas, e a única parte interessante do bimestre desaparecer no processo.",
      "Here the demand is the opposite of an obstacle: extended reading is usually the one place in the curriculum where this student meets material at their level. The risk is the inverse of the other rows — the text being sliced, summarised and turned into a question sheet, with the term's one interesting part vanishing in the process.",
      "Aquí la exigencia es lo contrario de un obstáculo: la lectura extensa suele ser el único punto del currículo donde este estudiante encuentra material a su altura. El riesgo es el opuesto al de las otras filas — que el texto sea troceado, resumido y convertido en cuestionario, y la única parte interesante del bimestre desaparezca en el proceso.",
    ),
    oQueFazer: ml(
      "Deixe o texto inteiro disponível a quem quiser, mesmo quando a turma trabalhar com trechos, e ofereça uma leitura paralela mais densa sobre o mesmo assunto. A pergunta que se faz a ele não é sobre o que o texto diz, e sim sobre o que o texto faz — a estrutura, a escolha do autor, o que ficou de fora.",
      "Keep the whole text available to whoever wants it, even when the class works with excerpts, and offer a denser parallel reading on the same subject. The question put to this student is not what the text says but what it does — its structure, the author's choices, what was left out.",
      "Deje el texto entero disponible para quien lo quiera, aun cuando la clase trabaje con fragmentos, y ofrezca una lectura paralela más densa sobre el mismo asunto. La pregunta que se le hace no es sobre lo que el texto dice, sino sobre lo que el texto hace — la estructura, la elección del autor, lo que quedó fuera.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, UCONN_SEM, NAGC],
  },

  // === sequencia-de-passos ===================================================
  {
    exigencia: "sequencia-de-passos",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "O procedimento com ordem obrigatória é onde a discalculia mais aparece no currículo, e não na conta isolada. O aluno domina cada operação e perde a ordem — e como a ordem é o conteúdo, o erro reaparece em todos os exercícios da unidade, não em um.",
      "A procedure with mandatory order is where dyscalculia shows up most in the curriculum, not in the isolated calculation. The student masters each operation and loses the order — and since the order is the content, the error reappears across every exercise in the unit, not in one.",
      "El procedimiento con orden obligatorio es donde la discalculia más aparece en el currículo, y no en la cuenta aislada. El estudiante domina cada operación y pierde el orden — y como el orden es el contenido, el error reaparece en todos los ejercicios de la unidad, no en uno.",
    ),
    oQueFazer: ml(
      "Ensine o procedimento com o passo a passo escrito e à vista desde a primeira aula, e só o retire quando o aluno pedir. Cada passo com um resultado registrado na própria linha: o papel passa a ser a memória de trabalho, e o erro fica localizado num passo em vez de contaminar o exercício inteiro.",
      "Teach the procedure with the steps written and in sight from the first lesson, and remove it only when the student asks. Each step with its result recorded on its own line: the paper becomes working memory, and the error stays located in one step instead of contaminating the whole exercise.",
      "Enseñe el procedimiento con el paso a paso escrito y a la vista desde la primera clase, y retírelo solo cuando el estudiante lo pida. Cada paso con un resultado registrado en su propia línea: el papel pasa a ser la memoria de trabajo, y el error queda localizado en un paso en vez de contaminar el ejercicio entero.",
    ),
    citations: [WWC_RESOLUCAO, NCII_MATEMATICA, WWC_MATEMATICA_2021],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=ubFuVJeFcgE",
      titulo: "Long Multiplication for learners with dyscalculia and maths difficulties",
      canal: "The Dyscalculia Network",
      duracaoSegundos: 880,
      metadadosDe: "oEmbed",
      porQue:
        "Destrincha a multiplicação longa passo a passo, que é o procedimento de ordem obrigatória mais custoso neste perfil.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "autismo",
    oQueSignifica: ml(
      "Executar sequência costuma ser terreno favorável; o que atrapalha é a sequência ser ensinada implicitamente, com o professor demonstrando enquanto fala de outra coisa. O aluno infere a ordem errada e a executa com precisão — e a precisão faz o erro parecer teimosia.",
      "Executing a sequence is usually favourable terrain; what hinders is the sequence being taught implicitly, with the teacher demonstrating while talking about something else. The student infers the wrong order and executes it precisely — and the precision makes the error look like stubbornness.",
      "Ejecutar una secuencia suele ser terreno favorable; lo que estorba es que la secuencia se enseñe implícitamente, con el docente demostrando mientras habla de otra cosa. El estudiante infiere el orden equivocado y lo ejecuta con precisión — y la precisión hace que el error parezca terquedad.",
    ),
    oQueFazer: ml(
      "Escreva a sequência numerada antes de demonstrar, e demonstre seguindo exatamente a lista escrita. É análise de tarefa, prática com evidência no TEA — e o ganho é que o aluno passa a poder conferir sozinho onde está, sem depender de perguntar.",
      "Write the numbered sequence before demonstrating, and demonstrate following exactly the written list. It is task analysis, an evidence-based practice in autism — and the gain is that the student can check where they are without having to ask.",
      "Escriba la secuencia numerada antes de demostrar, y demuestre siguiendo exactamente la lista escrita. Es análisis de tarea, práctica con evidencia en el TEA — y la ganancia es que el estudiante puede verificar dónde está sin depender de preguntar.",
    ),
    citations: [AFIRM_ANALISE_DE_TAREFA, AFIRM_APOIOS_VISUAIS, NCAEP],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=UijE01ge7Oo",
      titulo: "Materiais pedagógicos acessíveis | Trilhando os campos de experiências | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 339,
      metadadosDe: "oEmbed",
      porQue:
        "A trilha torna a ordem dos passos visível e percorrível, em vez de ela existir só na instrução falada.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "tdah",
    oQueSignifica: ml(
      "Sequência é função executiva, e o erro típico não é errar um passo: é pular um, ou parar no penúltimo. Num conteúdo procedimental, isso se repete ao longo de semanas e produz a leitura de que o aluno não aprendeu o método — quando o que falta é o controle de onde se está nele.",
      "Sequence is executive function, and the typical error is not getting a step wrong: it is skipping one, or stopping at the penultimate. In procedural content this repeats across weeks and produces the reading that the student has not learned the method — when what is missing is control of where one is inside it.",
      "La secuencia es función ejecutiva, y el error típico no es equivocar un paso: es saltarse uno, o detenerse en el penúltimo. En un contenido procedimental esto se repite durante semanas y produce la lectura de que el estudiante no aprendió el método — cuando lo que falta es el control de dónde se está en él.",
    ),
    oQueFazer: ml(
      "Dê a lista de passos como material permanente do caderno, com caixas para riscar. A pergunta de fechamento passa a ser \"risquei todas?\", que se verifica, em vez de \"terminei?\", que não se verifica. Vale mais que qualquer lembrete verbal repetido.",
      "Give the list of steps as permanent notebook material, with boxes to tick. The closing question becomes \"did I tick them all?\", which is checkable, instead of \"am I done?\", which is not. It is worth more than any repeated verbal reminder.",
      "Dé la lista de pasos como material permanente del cuaderno, con casillas para tachar. La pregunta de cierre pasa a ser \"¿las taché todas?\", que se verifica, en vez de \"¿terminé?\", que no. Vale más que cualquier recordatorio verbal repetido.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, WWC_RESOLUCAO],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=D7Bs1TU8LVA",
      titulo: "Six Keys to Developing Executive Function Skills at School and at Home",
      canal: "Help for ADHD",
      duracaoSegundos: 3192,
      metadadosDe: "oEmbed",
      porQue:
        "Função executiva é o que mantém a ordem dos passos até o fim, e é o alvo declarado do vídeo.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "O que se perde é o destino, e não o passo: o aluno executa corretamente a primeira etapa e entrega o resultado dela como resposta final. Num conteúdo de várias etapas, isso se repete em cada exercício, e a correção sozinha não desfaz, porque o problema é de manter o objetivo em vista.",
      "What is lost is the destination, not the step: the student executes the first stage correctly and hands in its result as the final answer. In multi-step content this repeats in every exercise, and correction alone does not undo it, because the problem is holding the goal in view.",
      "Lo que se pierde es el destino, y no el paso: el estudiante ejecuta correctamente la primera etapa y entrega su resultado como respuesta final. En un contenido de varias etapas esto se repite en cada ejercicio, y la corrección sola no lo deshace, porque el problema es mantener el objetivo a la vista.",
    ),
    oQueFazer: ml(
      "Escreva a pergunta original no alto da folha e releia-a ao fim de cada etapa. Ensine uma etapa por vez até estar firme, encadeando depois — encadear tudo desde o início é o que produz o abandono no segundo passo.",
      "Write the original question at the top of the sheet and reread it at the end of each stage. Teach one stage at a time until it is solid, chaining afterwards — chaining everything from the start is what produces abandonment at the second step.",
      "Escriba la pregunta original en lo alto de la hoja y reléala al final de cada etapa. Enseñe una etapa por vez hasta que esté firme, encadenando después — encadenar todo desde el inicio es lo que produce el abandono en el segundo paso.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=B6h8nKvylVQ",
      titulo: "Materiais pedagógicos acessíveis | Jogo de Trilha Interativo - Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 337,
      metadadosDe: "oEmbed",
      porQue:
        "A trilha materializa a ordem obrigatória, e cada casa é um passo que o aluno vê antes de executar.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "O procedimento obriga a registrar resultados intermediários, e é o registro que custa. O aluno tenta fazer de cabeça para escrever menos — e perde por memória o que evitava perder por traçado. Num conteúdo procedimental inteiro, essa troca acontece todos os dias.",
      "The procedure forces recording intermediate results, and recording is what costs. The student tries to do it mentally to write less — and loses through memory what they were avoiding losing through handwriting. Across a whole procedural unit, that trade happens every day.",
      "El procedimiento obliga a registrar resultados intermedios, y es el registro lo que cuesta. El estudiante intenta hacerlo de cabeza para escribir menos — y pierde por memoria lo que evitaba perder por trazo. En una unidad procedimental entera, ese intercambio ocurre todos los días.",
    ),
    oQueFazer: ml(
      "Ofereça o formulário com as etapas já impressas e só o valor a preencher, como material padrão da unidade — e não como adaptação pontual. Aceite o procedimento ditado quando o objetivo for verificar o raciocínio.",
      "Provide the form with the steps already printed and only the value to fill in, as the unit's standard material — not as a one-off adaptation. Accept the procedure dictated when the goal is to verify reasoning.",
      "Ofrezca el formulario con las etapas ya impresas y solo el valor por completar, como material estándar de la unidad — y no como adaptación puntual. Acepte el procedimiento dictado cuando el objetivo sea verificar el razonamiento.",
    ),
    citations: [WWC_ESCRITA_FINAIS, READING_ROCKETS_ESCRITA],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=CYi2EzPkErs",
      titulo: "What Is Executive Function?",
      canal: "Understood",
      duracaoSegundos: 202,
      metadadosDe: "oEmbed",
      porQue:
        "A função executiva é o que sustenta a ordem do procedimento enquanto a mão luta com o traço, e é o que se perde primeiro quando escrever custa.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "O rascunho é onde as etapas ficam à vista, e leitura tátil ou por voz não tem \"à vista\": conferir a etapa dois durante a quatro custa procurá-la de novo. Aprender um procedimento novo por demonstração visual também não funciona — e é assim que a maioria é ensinada.",
      "Scratch work is where the steps stay in sight, and tactile or spoken reading has no \"in sight\": checking step two during step four costs finding it again. Learning a new procedure through visual demonstration also fails — and that is how most are taught.",
      "El borrador es donde las etapas quedan a la vista, y la lectura táctil o por voz no tiene \"a la vista\": verificar la etapa dos durante la cuatro cuesta buscarla de nuevo. Aprender un procedimiento nuevo por demostración visual tampoco funciona — y así se enseña la mayoría.",
    ),
    oQueFazer: ml(
      "Descreva cada passo em voz alta enquanto o executa, dizendo o número da etapa junto do valor, e combine um lugar fixo para cada resultado intermediário. Endereço fixo substitui a passada de olho — sem ele, o rascunho vira uma segunda leitura sequencial.",
      "Describe each step aloud as you execute it, saying the step number alongside the value, and agree on a fixed place for each intermediate result. A fixed address replaces the glance — without it, scratch work becomes a second sequential reading.",
      "Describa cada paso en voz alta mientras lo ejecuta, diciendo el número de etapa junto al valor, y acuerde un lugar fijo para cada resultado intermedio. La dirección fija sustituye al vistazo — sin ella, el borrador se vuelve una segunda lectura secuencial.",
    ),
    citations: [PATHS_TECNOLOGIA, APH_RECURSOS, PATHS_BRAILLE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=B6h8nKvylVQ",
      titulo: "Materiais pedagógicos acessíveis | Jogo de Trilha Interativo - Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 337,
      metadadosDe: "oEmbed",
      porQue:
        "Percorrer a trilha com as mãos dá a ordem dos passos sem depender de acompanhar uma linha com os olhos.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "A ordem de um procedimento é transmitida por conectivos — \"em seguida\", \"antes de\", \"só depois que\" —, e conectivo é a classe em que o português escrito mais se afasta da Libras. O aluno domina as operações e executa fora de ordem, e o diagnóstico erra o alvo.",
      "A procedure's order is conveyed by connectives — \"then\", \"before\", \"only after\" — and connectives are the class where written Portuguese departs most from sign language. The student masters the operations and executes out of order, and the diagnosis misses the target.",
      "El orden de un procedimiento se transmite por conectores — \"en seguida\", \"antes de\", \"solo después de\" —, y el conector es la clase donde el portugués escrito más se aleja de la lengua de señas. El estudiante domina las operaciones y ejecuta fuera de orden, y el diagnóstico yerra el blanco.",
    ),
    oQueFazer: ml(
      "Numere as etapas visualmente e confirme a ordem em Libras antes de qualquer execução. Se, com os passos numerados, o aluno ordena certo, o que faltava era o conectivo — e é isso que precisa ser ensinado, e não o procedimento de novo.",
      "Number the steps visually and confirm the order in sign language before any execution. If, with the steps numbered, the student orders them correctly, what was missing was the connective — and that is what needs teaching, not the procedure again.",
      "Numere las etapas visualmente y confirme el orden en lengua de señas antes de cualquier ejecución. Si, con los pasos numerados, el estudiante ordena bien, lo que faltaba era el conector — y es eso lo que hay que enseñar, no el procedimiento otra vez.",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, INES],
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Cada etapa concluída precisa ser guardada enquanto a seguinte acontece — memória verbal de curto prazo, o ponto mais custoso descrito na literatura da síndrome. Cada passo isolado sai bem, e o terceiro chega sem o resultado do primeiro.",
      "Each completed stage must be held while the next happens — short-term verbal memory, the costliest point described in the syndrome's literature. Each isolated step comes out well, and the third arrives without the first one's result.",
      "Cada etapa concluida debe guardarse mientras ocurre la siguiente — memoria verbal a corto plazo, el punto más costoso descrito en la literatura del síndrome. Cada paso aislado sale bien, y el tercero llega sin el resultado del primero.",
    ),
    oQueFazer: ml(
      "Use cartões, um por etapa, virados à medida que se conclui, com o resultado escrito neles. O que estava na memória passa a estar na mesa, em ordem — e a etapa seguinte consulta o cartão anterior em vez da lembrança.",
      "Use cards, one per stage, turned over as each is completed, with the result written on them. What was in memory comes to sit on the table, in order — and the next stage consults the previous card instead of recollection.",
      "Use tarjetas, una por etapa, giradas a medida que se concluye, con el resultado escrito en ellas. Lo que estaba en la memoria pasa a estar en la mesa, en orden — y la etapa siguiente consulta la tarjeta anterior en vez del recuerdo.",
    ),
    citations: [DSE_MEMORIA, DSE_LEITURA, DSRF_LEITURA],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=unKKz2Fe5hc",
      titulo: "Successful Strategies: Memory, Phonological Awareness and Beginning Phonics",
      canal: "DSRFCANADA",
      duracaoSegundos: 1757,
      metadadosDe: "oEmbed",
      porQue:
        "Trata da memória verbal de curto prazo, que é o que decide se o resultado do primeiro passo ainda está disponível quando o terceiro chega.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "Planejar sequência costuma ser feito falando consigo mesmo, e é esse ensaio verbal que o TDL torna frágil. Somado ao fato de a ordem chegar por conectivos, o aluno entende cada etapa e não consegue manter o plano de uma para a outra.",
      "Planning a sequence is usually done by talking to oneself, and it is that verbal rehearsal that DLD makes fragile. Added to the order arriving through connectives, the student understands each stage and cannot hold the plan from one to the next.",
      "Planificar una secuencia suele hacerse hablando consigo mismo, y es ese ensayo verbal el que el TDL vuelve frágil. Sumado a que el orden llega por conectores, el estudiante entiende cada etapa y no logra mantener el plan de una a otra.",
    ),
    oQueFazer: ml(
      "Deixe o plano fora da fala: etapas numeradas com ícone ou palavra curta, à vista durante toda a resolução. Peça que ele aponte em que etapa está, em vez de dizer — apontar não cobra a linguagem que o conteúdo não está medindo.",
      "Keep the plan out of speech: numbered steps with an icon or short word, in sight throughout. Ask the student to point at which step they are on rather than say it — pointing does not charge the language the content is not measuring.",
      "Deje el plan fuera del habla: etapas numeradas con ícono o palabra corta, a la vista durante toda la resolución. Pida que señale en qué etapa está, en vez de decirlo — señalar no cobra el lenguaje que el contenido no está midiendo.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, DLD_PROJECT],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=AAmLmMEiX4c",
      titulo: "SLI & reading: 1. Decoding (phonics)",
      canal: "RADLD",
      duracaoSegundos: 225,
      metadadosDe: "oEmbed",
      porQue:
        "A decodificação é procedimento de ordem obrigatória, e o vídeo mostra por que ela emperra quando a base é a linguagem oral.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Cada resultado intermediário precisa ser registrado, e registrar é uma sequência de acionamentos por número. Num procedimento de quatro etapas o custo de acesso se multiplica por quatro, e a fadiga da última não é a da primeira — o erro aparece no fim e é lido como desatenção.",
      "Each intermediate result must be recorded, and recording is a sequence of activations per number. In a four-step procedure the access cost multiplies by four, and the last step's fatigue is not the first's — the error shows at the end and is read as carelessness.",
      "Cada resultado intermedio debe registrarse, y registrar es una secuencia de activaciones por número. En un procedimiento de cuatro etapas el costo de acceso se multiplica por cuatro, y la fatiga de la última no es la de la primera — el error aparece al final y se lee como distracción.",
    ),
    oQueFazer: ml(
      "Reduza o registro ao mínimo — formulário com etapas impressas, ditado aceito — e não conte um exercício de quatro etapas como um exercício para efeito de tempo e de quantidade. Para este aluno são quatro.",
      "Cut recording to a minimum — a form with printed steps, dictation accepted — and do not count a four-step exercise as one exercise for timing and quantity. For this student it is four.",
      "Reduzca el registro al mínimo — formulario con etapas impresas, dictado aceptado — y no cuente un ejercicio de cuatro etapas como un ejercicio a efectos de tiempo y cantidad. Para este estudiante son cuatro.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=iDOZ4TJrrE4",
      titulo: "Portas abertas para a inclusão | Jogos de tabuleiro | Natal (RN)",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 289,
      metadadosDe: "oEmbed",
      porQue:
        "Tabuleiro gigante põe o passo no chão, na escala em que o aluno consegue agir sobre ele.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Cada etapa passa pelo interveniente, e o canal é um só: ele serve tanto para transmitir a próxima instrução quanto para conferir o valor anterior. Aprender um procedimento vira uma conversa longa com quem também está lendo pelo aluno, e a fronteira entre ajudar e fazer some sem que ninguém perceba.",
      "Each stage passes through the intervener, and there is a single channel: it serves both to convey the next instruction and to check the previous value. Learning a procedure becomes a long conversation with the person who is also reading for the student, and the line between helping and doing dissolves unnoticed.",
      "Cada etapa pasa por el interviniente, y el canal es uno solo: sirve tanto para transmitir la próxima instrucción como para verificar el valor anterior. Aprender un procedimiento se vuelve una conversación larga con quien también lee por el estudiante, y la frontera entre ayudar y hacer desaparece sin que nadie lo note.",
    ),
    oQueFazer: ml(
      "Combine antes quantas etapas são, onde cada resultado fica registrado em relevo, e quem faz o quê em cada passo. Sem essa divisão acordada no planejamento, a ajuda entra no meio da etapa e depois é impossível saber qual parte foi do aluno.",
      "Agree beforehand how many stages there are, where each result is recorded in relief, and who does what at each step. Without that division agreed at planning time, help enters mid-stage and afterwards it is impossible to know which part was the student's.",
      "Acuerde antes cuántas etapas son, dónde queda registrado cada resultado en relieve, y quién hace qué en cada paso. Sin esa división acordada en la planificación, la ayuda entra en medio de la etapa y después es imposible saber qué parte fue del estudiante.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, CADEAFBLIND_INTERVENTOR, NCDB_MOODLE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=lo3qXFOc3vk",
      titulo: "BLV FirstSteps App: Teaching VoiceOver to Young Students",
      canal: "Perkins School for the Blind",
      duracaoSegundos: 5769,
      metadadosDe: "oEmbed",
      porQue:
        "Ensinar o leitor de tela é ensinar uma sequência de comandos com ordem obrigatória, que é a única via de acesso autônomo aqui.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "Um procedimento longo é onde a ansiedade de desempenho mais aparece: não se sabe quanto falta, e a incerteza sobre o fim pesa mais que qualquer passo. Travar na primeira etapa costuma ser sobre isso — e, num conteúdo procedimental, o travamento se repete em cada exercício da unidade.",
      "A long procedure is where performance anxiety shows most: how much is left is unknown, and uncertainty about the end weighs more than any step. Freezing at the first stage is usually about that — and in procedural content the freeze repeats in every exercise of the unit.",
      "Un procedimiento largo es donde más aparece la ansiedad de desempeño: no se sabe cuánto falta, y la incertidumbre sobre el final pesa más que cualquier paso. Trabarse en la primera etapa suele tratarse de eso — y en un contenido procedimental el bloqueo se repite en cada ejercicio de la unidad.",
    ),
    oQueFazer: ml(
      "Mostre o número de etapas de antemão e trate cada uma como parada legítima. Corrija por etapa, e não só no fim: saber que a etapa dois estava certa muda a disposição de tentar a três, e é informação que existe e quase nunca é dita.",
      "Show the number of stages upfront and treat each as a legitimate stopping point. Correct stage by stage, not only at the end: knowing stage two was right changes the willingness to attempt stage three, and it is information that exists and is almost never said.",
      "Muestre de antemano el número de etapas y trate cada una como parada legítima. Corrija por etapa, y no solo al final: saber que la etapa dos estaba bien cambia la disposición a intentar la tres, y es información que existe y casi nunca se dice.",
    ),
    citations: [CDC_SAUDE_MENTAL, CAST_UDL, OMS_ADOLESCENTE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=1WfmDrDQy3I",
      titulo: "The Adolescent Brain: Practical Advice for Schools",
      canal: "Anna Freud",
      duracaoSegundos: 210,
      metadadosDe: "oEmbed",
      porQue:
        "Traz o que o cérebro adolescente sustenta de fato numa sequência longa, em vez de tratar a desistência no meio como falta de esforço.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "O procedimento costuma ser apresentado por escrito, e cada consulta ao passo a passo é decodificação de novo. O aluno tende a resolver o máximo possível sem voltar ao texto — e é aí que uma etapa é pulada, por economia de leitura e não por desconhecimento do método.",
      "The procedure is usually presented in writing, and each consultation of the steps is decoding again. The student tends to solve as much as possible without going back to the text — and that is where a stage gets skipped, out of reading economy and not out of ignorance of the method.",
      "El procedimiento suele presentarse por escrito, y cada consulta al paso a paso es decodificación otra vez. El estudiante tiende a resolver lo máximo posible sin volver al texto — y ahí es donde se salta una etapa, por economía de lectura y no por desconocimiento del método.",
    ),
    oQueFazer: ml(
      "Dê o passo a passo em ícones ou em palavras muito curtas, e grave-o em áudio para consulta. Voltar precisa custar segundos, e não um parágrafo — quando a consulta é barata, a etapa deixa de ser pulada.",
      "Give the steps as icons or very short words, and record them as audio for consultation. Going back must cost seconds, not a paragraph — when consulting is cheap, the step stops being skipped.",
      "Dé el paso a paso en íconos o en palabras muy cortas, y grábelo en audio para consulta. Volver debe costar segundos, y no un párrafo — cuando la consulta es barata, la etapa deja de saltarse.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY, NCIL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=3GF1cPR0t6A",
      titulo: "Dyslexia Conference Recording | Multisensory Strategies for Better Working Memory",
      canal: "International Dyslexia Association",
      duracaoSegundos: 5167,
      metadadosDe: "oEmbed",
      porQue:
        "A memória de trabalho é o que segura a ordem obrigatória dos passos, e é dela que o vídeo trata.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "sequencia-de-passos",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "Este aluno resolve o procedimento de cabeça e salta ao resultado, o que funciona até o dia em que uma etapa foi pulada por engano e não há registro onde procurar. Exigir o passo a passo que ele não precisa é a receita mais rápida para ele parar de mostrar o que faz.",
      "This student solves the procedure mentally and jumps to the result, which works until the day a step was skipped by mistake and there is no record to search. Demanding the step-by-step they do not need is the fastest recipe for them to stop showing their work.",
      "Este estudiante resuelve el procedimiento de cabeza y salta al resultado, lo que funciona hasta el día en que se saltó un paso por error y no hay registro donde buscar. Exigir el paso a paso que no necesita es la receta más rápida para que deje de mostrar lo que hace.",
    ),
    oQueFazer: ml(
      "Em vez do passo a passo, peça o caminho alternativo: outra forma de chegar ao mesmo resultado, ou o que mudaria se um dado fosse outro. Aprofundar em vez de repetir conserva o registro sem transformá-lo em burocracia, e é o princípio dos modelos de enriquecimento.",
      "Instead of the step-by-step, ask for the alternative route: another way to the same result, or what would change if one datum were different. Deepening rather than repeating preserves a record without turning it into bureaucracy, and it is the principle of enrichment models.",
      "En lugar del paso a paso, pida el camino alternativo: otra forma de llegar al mismo resultado, o qué cambiaría si un dato fuera otro. Profundizar en vez de repetir conserva el registro sin volverlo burocracia, y es el principio de los modelos de enriquecimiento.",
    ),
    citations: [UCONN_SEM, ERIC_ENRIQUECIMENTO],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=80tGOvMHSVE",
      titulo: "Metacognitive Strategies: High School",
      canal: "The IRIS Center Video Collection",
      duracaoSegundos: 175,
      metadadosDe: "oEmbed",
      porQue:
        "O aluno narra o próprio raciocínio por automonitoramento, que é o registro que o passo a passo tenta obter e que este aluno recusa por não precisar dele.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },

  // === vocabulario-tecnico ===================================================
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "Vocabulário é o núcleo do TDL, e aqui o termo não é acessório do conteúdo: ele **é** o conteúdo. O aluno pode construir o conceito na prática e não fixar o rótulo — e como a escola avalia pelo rótulo, o que se registra é que ele não aprendeu, quando o que faltou foi a etiqueta.",
      "Vocabulary is at the core of DLD, and here the term is not an accessory to the content: it **is** the content. The student may build the concept in practice and not fix the label — and since school assesses by the label, what gets recorded is that they did not learn, when what was missing was the tag.",
      "El vocabulario es el núcleo del TDL, y aquí el término no es accesorio del contenido: **es** el contenido. El estudiante puede construir el concepto en la práctica y no fijar la etiqueta — y como la escuela evalúa por la etiqueta, lo que se registra es que no aprendió, cuando lo que faltó fue el rótulo.",
    ),
    oQueFazer: ml(
      "Ensine o termo em muitos encontros curtos ao longo da unidade, e não uma vez no começo. Cada retomada com o conceito à mão: definição, exemplo, contraexemplo e a palavra escrita. O que fixa vocabulário técnico no TDL é repetição espaçada com contexto, não a lista do início do capítulo.",
      "Teach the term across many short encounters through the unit, not once at the start. Each return with the concept at hand: definition, example, counterexample and the written word. What fixes technical vocabulary in DLD is spaced repetition with context, not the list at the chapter's opening.",
      "Enseñe el término en muchos encuentros cortos a lo largo de la unidad, y no una vez al comienzo. Cada retorno con el concepto a mano: definición, ejemplo, contraejemplo y la palabra escrita. Lo que fija vocabulario técnico en el TDL es la repetición espaciada con contexto, no la lista del inicio del capítulo.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, DLD_PROJECT],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=Jnpd22aEZvg",
      titulo: "A Taste of the Core: Building CCSS-Aligned Vocabulary Skills",
      canal: "American Speech-Language-Hearing Association",
      duracaoSegundos: 2378,
      metadadosDe: "oEmbed",
      porQue:
        "Construção de vocabulário alinhada ao currículo, que é o que separa ensinar a palavra de esperar que ela seja pega no uso.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "Palavra longa e pouco frequente é o pior caso da decodificação: não há reconhecimento automático a que recorrer, e cada aparição é decodificada do zero. Numa unidade que repete o termo dezenas de vezes, o custo se acumula — e o aluno passa a evitar os textos em que ele aparece.",
      "A long, infrequent word is decoding's worst case: there is no automatic recognition to fall back on, and each appearance is decoded from scratch. In a unit that repeats the term dozens of times, the cost accumulates — and the student starts avoiding the texts where it appears.",
      "Palabra larga y poco frecuente es el peor caso de la decodificación: no hay reconocimiento automático al que recurrir, y cada aparición se decodifica desde cero. En una unidad que repite el término decenas de veces, el costo se acumula — y el estudiante empieza a evitar los textos donde aparece.",
    ),
    oQueFazer: ml(
      "Trabalhe a estrutura da palavra antes do conteúdo — sílabas e partes com significado, bio / diversi / dade —, e deixe o termo escrito grande e visível durante a unidade inteira. O ensino explícito da estrutura da palavra é traço central do ensino estruturado de leitura, e o ganho vale para os termos seguintes.",
      "Work the word's structure before the content — syllables and meaningful parts, bio / diversi / ty — and keep the term written large and visible through the whole unit. Explicit teaching of word structure is a central feature of structured literacy, and the gain carries to the terms that follow.",
      "Trabaje la estructura de la palabra antes del contenido — sílabas y partes con significado, bio / diversi / dad —, y deje el término escrito grande y visible durante toda la unidad. La enseñanza explícita de la estructura de la palabra es rasgo central de la enseñanza estructurada de lectura, y la ganancia vale para los términos siguientes.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY, UNDERSTOOD_LITERACIA],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=xeQqGYUfs7Q",
      titulo: "Dyslexia Conference Recording | Morphology and Syntax Rock!",
      canal: "International Dyslexia Association",
      duracaoSegundos: 2730,
      metadadosDe: "oEmbed",
      porQue:
        "Ensina a atacar o termo novo pela morfologia — o caminho para o vocabulário técnico quando ler a palavra inteira é o que custa.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "O termo técnico raramente circula na conversa, e o aluno surdo costuma tê-lo encontrado só no texto — sem o apoio da língua oral que os colegas usaram para consolidá-lo por repetição ambiente. Muitos desses termos não têm sinal padronizado, e cada aula improvisa um diferente.",
      "Technical terms rarely circulate in conversation, and the Deaf student usually met them only in text — without the spoken-language support classmates used to consolidate them through ambient repetition. Many such terms have no standardised sign, and each lesson improvises a different one.",
      "El término técnico rara vez circula en la conversación, y el estudiante sordo suele haberlo encontrado solo en el texto — sin el apoyo de la lengua oral que los compañeros usaron para consolidarlo por repetición ambiente. Muchos de esos términos no tienen seña estandarizada, y cada clase improvisa una distinta.",
    ),
    oQueFazer: ml(
      "Combine com o aluno e com o intérprete um sinal ou uma soletração para cada termo da unidade, **antes** de começá-la, e registre a combinação num glossário que atravessa o ano. Improvisar o sinal a cada aula custa a atenção que deveria estar no conteúdo, e produz três nomes para a mesma coisa.",
      "Agree with the student and the interpreter on a sign or fingerspelling for each term of the unit **before** it starts, and record the agreement in a glossary that carries across the year. Improvising the sign each lesson costs the attention that should be on the content, and produces three names for one thing.",
      "Acuerde con el estudiante y el intérprete una seña o un deletreo para cada término de la unidad **antes** de empezarla, y registre el acuerdo en un glosario que atraviese el año. Improvisar la seña en cada clase cuesta la atención que debería estar en el contenido, y produce tres nombres para la misma cosa.",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, INES],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=FZa25ESMVfw",
      titulo: "Materiais Pedagógicos Acessíveis | Jogo da Memória | Libras e Audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 410,
      metadadosDe: "oEmbed",
      porQue:
        "Casa sinal e palavra escrita no mesmo jogo, que é como o termo novo entra quando o português é segunda língua.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "Termos abstratos acumulam duas exigências: reconhecer a palavra e sustentar o conceito que ela nomeia. Substituí-los por sinônimo fácil resolve a leitura e apaga o conteúdo — porque, num conteúdo de vocabulário técnico, o termo é o que está sendo ensinado.",
      "Abstract terms stack two demands: recognising the word and sustaining the concept it names. Replacing them with an easy synonym solves the reading and erases the content — because, in technical-vocabulary content, the term is what is being taught.",
      "Los términos abstractos acumulan dos exigencias: reconocer la palabra y sostener el concepto que nombra. Sustituirlos por un sinónimo fácil resuelve la lectura y borra el contenido — porque, en un contenido de vocabulario técnico, el término es lo que se está enseñando.",
    ),
    oQueFazer: ml(
      "Mantenha o termo e acrescente a explicação ao lado, em aposto, sempre com as mesmas palavras: \"fotossíntese (a planta usando luz para fazer alimento)\". A constância da explicação importa mais que a elegância dela — variar a paráfrase a cada aula é o que impede a consolidação.",
      "Keep the term and add the explanation beside it, in apposition, always in the same words: \"photosynthesis (the plant using light to make food)\". The constancy of the explanation matters more than its elegance — varying the paraphrase each lesson is what prevents consolidation.",
      "Mantenga el término y agregue la explicación al lado, en aposición, siempre con las mismas palabras: \"fotosíntesis (la planta usando luz para hacer alimento)\". La constancia de la explicación importa más que su elegancia — variar la paráfrasis cada clase es lo que impide la consolidación.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=n_oZEaoNS4o",
      titulo: "Materiais pedagógicos acessíveis | Painel de nomes e sons dos animais",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 294,
      metadadosDe: "oEmbed",
      porQue:
        "Liga nome e som do animal no mesmo painel, que é a associação que o termo novo exige e que a leitura sozinha não dá.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Termo novo e abstrato é o caso mais difícil quando o acesso é tátil: não há como apontar para o objeto nem mostrar a imagem, e a palavra chega sem referente. Sem experiência direta associada, ela permanece uma sequência longa de sinais, e o conceito não se forma.",
      "A new abstract term is the hardest case when access is tactile: there is no pointing at the object and no showing the picture, and the word arrives without a referent. With no direct experience attached, it stays a long sequence of signs, and the concept does not form.",
      "Un término nuevo y abstracto es el caso más difícil cuando el acceso es táctil: no hay cómo señalar el objeto ni mostrar la imagen, y la palabra llega sin referente. Sin experiencia directa asociada, queda como una secuencia larga de signos, y el concepto no se forma.",
    ),
    oQueFazer: ml(
      "Construa o referente antes do termo, com o interveniente e com experiência tátil quando houver como — e planeje isso com semanas de antecedência. Numa unidade de vocabulário técnico, essa construção é o cronograma, e não uma etapa preparatória rápida.",
      "Build the referent before the term, with the intervener and with tactile experience where possible — and plan it weeks ahead. In a technical-vocabulary unit, that construction is the schedule, not a quick preparatory step.",
      "Construya el referente antes del término, con el interviniente y con experiencia táctil cuando sea posible — y planifíquelo con semanas de antelación. En una unidad de vocabulario técnico, esa construcción es el cronograma, y no una etapa preparatoria rápida.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, CADEAFBLIND_INTERVENTOR, NCDB_MOODLE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=Ki6DmqS_cb8",
      titulo: "Tania's Two Month Review of Calendar",
      canal: "TSBVI Distance",
      duracaoSegundos: 582,
      metadadosDe: "oEmbed",
      porQue:
        "Mostra o referente sendo construído ao longo de dois meses de calendário tátil, que é a escala de tempo que o termo novo exige quando não há objeto para apontar.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "autismo",
    oQueSignifica: ml(
      "Termo técnico costuma ser terreno favorável, e às vezes o aluno sabe dele mais que a unidade exige. O atrito aparece quando a mesma palavra tem um sentido cotidiano e outro na matéria — trabalho em física, força em biologia — e a leitura precisa entra em conflito com o uso da aula.",
      "Technical terms are usually favourable terrain, and sometimes the student knows more of one than the unit requires. Friction appears when the same word has an everyday sense and another in the subject — work in physics, force in biology — and the precise reading conflicts with the lesson's usage.",
      "El término técnico suele ser terreno favorable, y a veces el estudiante sabe de él más de lo que la unidad exige. La fricción aparece cuando la misma palabra tiene un sentido cotidiano y otro en la materia — trabajo en física, fuerza en biología — y la lectura precisa entra en conflicto con el uso de la clase.",
    ),
    oQueFazer: ml(
      "Anuncie o sentido em que o termo será usado na unidade e reconheça o outro em voz alta, em vez de ignorá-lo. Discordância sobre definição resolvida com \"aqui significa isto\" custa dez segundos; ignorada, ela ocupa a unidade inteira — e com razão.",
      "Announce the sense in which the term will be used in the unit and acknowledge the other aloud, rather than ignoring it. A disagreement about definitions settled with \"here it means this\" costs ten seconds; ignored, it occupies the whole unit — and rightly so.",
      "Anuncie el sentido en que se usará el término en la unidad y reconozca el otro en voz alta, en vez de ignorarlo. Un desacuerdo sobre definiciones resuelto con \"aquí significa esto\" cuesta diez segundos; ignorado, ocupa la unidad entera — y con razón.",
    ),
    citations: [AFIRM_NARRATIVAS, AFIRM_ANTECEDENTES, NCAEP],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=B8MMkw0crEQ",
      titulo: "Materiais pedagógicos acessíveis | Meu Passeio Animal | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 354,
      metadadosDe: "oEmbed",
      porQue:
        "O termo de ciências entra ligado a um objeto que o aluno percorre, em vez de a uma definição que ele teria de aceitar de ouvido.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Palavra longa é sequência longa de sons a segurar, e a memória fonológica de curto prazo é o ponto descrito como mais custoso na síndrome. O termo pode ter sido ensinado e mesmo assim não se sustentar dentro da frase — reconhecido isolado, perdido no meio do texto.",
      "A long word is a long sequence of sounds to hold, and short-term phonological memory is the point described as costliest in the syndrome. The term may have been taught and still not hold up inside the sentence — recognised alone, lost mid-text.",
      "Palabra larga es secuencia larga de sonidos que sostener, y la memoria fonológica a corto plazo es el punto descrito como más costoso en el síndrome. El término puede haber sido enseñado y aun así no sostenerse dentro de la frase — reconocido aislado, perdido en medio del texto.",
    ),
    oQueFazer: ml(
      "Apresente o termo escrito e em imagem, num cartão que fica à vista durante toda a unidade. O apoio visual é via de força documentada na síndrome, e aqui serve para tirar a palavra da memória: a cada aparição no texto, o aluno a reencontra no cartão em vez de recuperá-la de cabeça.",
      "Present the term in writing and in a picture, on a card that stays in sight through the whole unit. Visual support is a documented channel of strength in the syndrome, and here it takes the word out of memory: at each appearance in the text, the student finds it again on the card instead of retrieving it mentally.",
      "Presente el término escrito y en imagen, en una tarjeta que queda a la vista durante toda la unidad. El apoyo visual es vía de fortaleza documentada en el síndrome, y aquí sirve para sacar la palabra de la memoria: en cada aparición en el texto, el estudiante la reencuentra en la tarjeta en vez de recuperarla de cabeza.",
    ),
    citations: [DSE_LEITURA, DSE_MEMORIA, IES_DOWN],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=6ZvXQsWeWsg",
      titulo: "See and Learn First Phrases 1 - Matching Sight Words",
      canal: "Down Syndrome Education International",
      duracaoSegundos: 95,
      metadadosDe: "oEmbed",
      porQue:
        "Palavra reconhecida à vista é a via documentada para o termo novo neste perfil, sem passar pela decodificação.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "tdah",
    oQueSignifica: ml(
      "A palavra longa é atravessada, não lida: o aluno segue com o sentido geral e volta ao termo só quando a avaliação exige — e aí já não sabe onde ele estava. Não é desconhecimento; é que parar para processar uma palavra difícil no meio do texto é exatamente onde a leitura se interrompe e não recomeça.",
      "The long word is crossed, not read: the student carries on with the general sense and returns to the term only when assessment demands it — and by then no longer knows where it was. It is not ignorance; it is that stopping to process a hard word mid-text is exactly where reading breaks off and does not resume.",
      "La palabra larga se atraviesa, no se lee: el estudiante sigue con el sentido general y vuelve al término solo cuando la evaluación lo exige — y para entonces ya no sabe dónde estaba. No es desconocimiento; es que detenerse a procesar una palabra difícil en medio del texto es justo donde la lectura se interrumpe y no recomienza.",
    ),
    oQueFazer: ml(
      "Resolva os termos antes da leitura, fora do texto, e deixe-os afixados. Assim a leitura corre sem obstáculo que exija parada, e o aluno não precisa escolher entre parar — e perder o fio — ou seguir — e perder o termo.",
      "Settle the terms before the reading, outside the text, and keep them posted. The reading then runs with no obstacle demanding a stop, and the student does not have to choose between stopping — and losing the thread — or carrying on — and losing the term.",
      "Resuelva los términos antes de la lectura, fuera del texto, y déjelos fijados. Así la lectura corre sin obstáculo que exija detenerse, y el estudiante no debe elegir entre parar — y perder el hilo — o seguir — y perder el término.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, PMC_TDAH_REVISAO],
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "A síntese de voz erra justamente as palavras longas e pouco frequentes: divide errado, acentua no lugar errado, e o aluno ouve algo que não corresponde a termo nenhum. Numa unidade inteira, ele consolida a pronúncia errada — e depois não reconhece o termo quando alguém o diz certo.",
      "Speech synthesis errs precisely on long, infrequent words: it splits them wrongly, stresses the wrong syllable, and the student hears something matching no term at all. Across a whole unit, they consolidate the wrong pronunciation — and then do not recognise the term when someone says it correctly.",
      "La síntesis de voz se equivoca justamente en las palabras largas y poco frecuentes: divide mal, acentúa en el lugar equivocado, y el estudiante oye algo que no corresponde a ningún término. En una unidad entera, consolida la pronunciación equivocada — y después no reconoce el término cuando alguien lo dice bien.",
    ),
    oQueFazer: ml(
      "Confira, antes da unidade, como o leitor pronuncia cada termo, e corrija no dicionário do software quando der. Soletre o termo uma vez na primeira aparição. É ajuste de transcrição, e ele decide se o aluno vai passar o bimestre com o nome certo do conceito.",
      "Check, before the unit, how the reader pronounces each term, and fix it in the software's dictionary where possible. Spell the term out once on first appearance. It is a transcription adjustment, and it decides whether the student will spend the term with the concept's right name.",
      "Verifique, antes de la unidad, cómo pronuncia el lector cada término, y corríjalo en el diccionario del software cuando se pueda. Deletree el término una vez en la primera aparición. Es ajuste de transcripción, y decide si el estudiante pasará el bimestre con el nombre correcto del concepto.",
    ),
    citations: [PATHS_TECNOLOGIA, APH_RECURSOS, PATHS_LETRAMENTO],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=n_oZEaoNS4o",
      titulo: "Materiais pedagógicos acessíveis | Painel de nomes e sons dos animais",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 294,
      metadadosDe: "oEmbed",
      porQue:
        "Liga o termo ao som e ao relevo do painel, que é como a palavra nova chega sem depender da imagem que a acompanha no livro.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Em conteúdo quantitativo, o termo longo costuma ser o que define a operação: \"inversamente proporcional\", \"acréscimo percentual\", \"razão entre\". Não é vocabulário decorativo — é a instrução da conta escrita em palavra. Quem não reconhece o termo não erra a leitura: erra a operação, e o erro aparece como se fosse de cálculo.",
      "In quantitative content, the long term is usually the one defining the operation: \"inversely proportional\", \"percentage increase\", \"ratio between\". It is not decorative vocabulary — it is the instruction for the calculation written as a word. A student who does not recognise the term does not misread: they misoperate, and the error surfaces as if it were arithmetic.",
      "En contenido cuantitativo, el término largo suele ser el que define la operación: \"inversamente proporcional\", \"incremento porcentual\", \"razón entre\". No es vocabulario decorativo — es la instrucción de la cuenta escrita en palabra. Quien no reconoce el término no falla la lectura: falla la operación, y el error aparece como si fuera de cálculo.",
    ),
    oQueFazer: ml(
      "Monte, ao longo da unidade, um glossário de termos traduzidos para o gesto que mandam fazer: \"inversamente proporcional → quando um dobra, o outro cai pela metade\". A tradução é a etapa que costuma faltar, e é onde a maioria dos erros da unidade se decide.",
      "Build, across the unit, a glossary of terms translated into the move they order: \"inversely proportional → when one doubles, the other halves\". The translation is the step usually missing, and it is where most of the unit's errors get decided.",
      "Arme, a lo largo de la unidad, un glosario de términos traducidos al gesto que mandan hacer: \"inversamente proporcional → cuando uno se duplica, el otro cae a la mitad\". La traducción es la etapa que suele faltar, y es donde se decide la mayoría de los errores de la unidad.",
    ),
    citations: [WWC_MATEMATICA_2021, NCII_MATEMATICA],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=fpbjHOJOfZc",
      titulo: "Video Example: A tutor and student add fractions with unlike denominators.",
      canal: "National Center on Intensive Intervention",
      duracaoSegundos: 501,
      metadadosDe: "oEmbed",
      porQue:
        "\"Denominadores diferentes\" é o termo que manda fazer a operação, e o vídeo mostra o termo sendo traduzido em ação em vez de memorizado como nome.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "O termo técnico costuma não existir no sistema de comunicação do aluno: quem responde por prancha ou software tem vocabulário programado, e \"biodisponibilidade\" não está nele. A unidade inteira passa a ser respondível só por soletração, letra a letra — lento a ponto de mudar a resposta que ele decide dar.",
      "The technical term usually does not exist in the student's communication system: someone answering through a board or software has a programmed vocabulary, and \"bioavailability\" is not in it. The whole unit becomes answerable only by spelling, letter by letter — slow enough to change the answer they decide to give.",
      "El término técnico suele no existir en el sistema de comunicación del estudiante: quien responde por tablero o software tiene vocabulario programado, y \"biodisponibilidad\" no está en él. La unidad entera pasa a ser respondible solo por deletreo, letra a letra — lo bastante lento como para cambiar la respuesta que decide dar.",
    ),
    oQueFazer: ml(
      "Programe os termos da unidade no sistema antes de começá-la, junto com o aluno. São minutos de trabalho que valem para todas as aulas do conteúdo — sem isso, o que se mede é o tamanho do vocabulário programado, e não o que ele sabe da matéria.",
      "Programme the unit's terms into the system before it starts, together with the student. It is minutes of work that hold for every lesson of the content — without it, what gets measured is the size of the programmed vocabulary, not what they know of the subject.",
      "Programe los términos de la unidad en el sistema antes de empezarla, junto con el estudiante. Son minutos de trabajo que valen para todas las clases del contenido — sin eso, lo que se mide es el tamaño del vocabulario programado, y no lo que sabe de la materia.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=Gh61f0zLoXY",
      titulo: "AAC, literacy, and fun: Science experiment",
      canal: "AssistiveWare",
      duracaoSegundos: 1762,
      metadadosDe: "oEmbed",
      porQue:
        "O termo de ciências entra pela prancha de comunicação, e não pela repetição oral que este aluno não pode fazer.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "O termo técnico é onde a matéria parece dizer que não é para este aluno. A palavra desconhecida confirma, em três segundos, a conclusão que ele já estava disposto a tirar — e a desistência que vem depois não é sobre a palavra, que se explicaria em meio minuto.",
      "The technical term is where the subject seems to say it is not for this student. The unknown word confirms, in three seconds, the conclusion they were already prepared to draw — and the giving up that follows is not about the word, which would take half a minute to explain.",
      "El término técnico es donde la materia parece decir que no es para este estudiante. La palabra desconocida confirma, en tres segundos, la conclusión que ya estaba dispuesto a sacar — y el abandono que sigue no es sobre la palabra, que se explicaría en medio minuto.",
    ),
    oQueFazer: ml(
      "Apresente os termos da unidade dizendo que são técnicos e que ninguém os conhece de antemão — antes de qualquer pergunta, e não depois da primeira dificuldade. Situar a dificuldade na palavra, e não no aluno, é um ajuste que custa uma frase e só funciona se vier primeiro.",
      "Introduce the unit's terms saying they are technical and that nobody knows them in advance — before any question, not after the first difficulty. Placing the difficulty in the word, not in the student, is an adjustment that costs one sentence and only works if it comes first.",
      "Presente los términos de la unidad diciendo que son técnicos y que nadie los conoce de antemano — antes de cualquier pregunta, y no después de la primera dificultad. Situar la dificultad en la palabra, y no en el estudiante, es un ajuste que cuesta una frase y solo funciona si viene primero.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, OMS_ADOLESCENTE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=ULn3yxd3dG0",
      titulo: "Supporting students’ mental health through everyday interactions in school settings webinar",
      canal: "Anna Freud",
      duracaoSegundos: 5365,
      metadadosDe: "oEmbed",
      porQue:
        "Trata das interações miúdas do dia a dia, que é a escala da frase dita antes do termo técnico — a que situa a dificuldade na palavra e não no aluno.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "O termo longo é o pior caso da ortografia, e a dificuldade ortográfica costuma acompanhar a disgrafia. Quando a palavra precisa ser usada por escrito, o aluno a troca por uma perífrase vaga — e o que se registra na avaliação é que ele não domina o termo, quando o que houve foi a decisão de não escrevê-lo.",
      "The long term is spelling's worst case, and spelling difficulty commonly accompanies dysgraphia. When the word must be used in writing, the student swaps it for a vague paraphrase — and what assessment records is that they do not master the term, when what happened was a decision not to write it.",
      "El término largo es el peor caso de la ortografía, y la dificultad ortográfica suele acompañar a la disgrafía. Cuando la palabra debe usarse por escrito, el estudiante la cambia por una perífrasis vaga — y lo que registra la evaluación es que no domina el término, cuando lo que hubo fue la decisión de no escribirlo.",
    ),
    oQueFazer: ml(
      "Deixe o glossário da unidade impresso e disponível para consulta e cópia em toda avaliação, e não conte a grafia do termo como parte do que se mede. Para saber se o conceito está lá, peça a explicação oral com a palavra à vista.",
      "Keep the unit's glossary printed and available for consultation and copying in every assessment, and do not count the term's spelling as part of what is measured. To find out whether the concept is there, ask for the explanation orally with the word in sight.",
      "Deje el glosario de la unidad impreso y disponible para consulta y copia en toda evaluación, y no cuente la ortografía del término como parte de lo que se mide. Para saber si el concepto está ahí, pida la explicación oral con la palabra a la vista.",
    ),
    citations: [WWC_ESCRITA_FINAIS, READING_ROCKETS_ESCRITA],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=p3tpup40A74",
      titulo: "Writing SOS: Is there value to having my child learn prefixes and suffixes?",
      canal: "Reading Rockets",
      duracaoSegundos: 151,
      metadadosDe: "oEmbed",
      porQue:
        "Prefixo e sufixo dão ao termo novo uma via de montagem por partes, mais barata que escrevê-lo inteiro para memorizá-lo.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "vocabulario-tecnico",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "O termo longo é, com frequência, o único ponto da unidade em que aparece algo que este aluno ainda não sabe. O risco é o inverso do das outras linhas: a adaptação que troca o termo por palavra fácil resolve a leitura de quem precisava e apaga a única parte com tração para quem não precisava.",
      "The long term is often the one point in the unit where something this student does not yet know shows up. The risk is the inverse of the other rows: the adaptation that swaps the term for an easy word solves the reading for those who needed it and erases the only part with traction for those who did not.",
      "El término largo es, con frecuencia, el único punto de la unidad donde aparece algo que este estudiante todavía no sabe. El riesgo es el inverso al de las otras filas: la adaptación que cambia el término por una palabra fácil resuelve la lectura de quien la necesitaba y borra la única parte con tracción para quien no.",
    ),
    oQueFazer: ml(
      "Mantenha o termo e use-o como porta: de onde vem a palavra, o que significa em outra matéria, por que este nome e não o corrente. Se a turma recebeu a versão com o termo explicado, ele pode receber a original — mesma unidade, vocabulário intacto, sem preparar material separado.",
      "Keep the term and use it as a door: where the word comes from, what it means in another subject, why this name and not the everyday one. If the class got the version with the term explained, this student can get the original — same unit, vocabulary intact, no separate material to prepare.",
      "Mantenga el término y úselo como puerta: de dónde viene la palabra, qué significa en otra materia, por qué este nombre y no el corriente. Si la clase recibió la versión con el término explicado, él puede recibir la original — misma unidad, vocabulario intacto, sin preparar material aparte.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, UCONN_SEM, NAGC],
  },

  // === representacao-visual ==================================================
  {
    exigencia: "representacao-visual",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "Aqui a distinção entre difícil e indisponível é tudo. Se o conteúdo só existe na forma espacial — um mapa, um gráfico, um diagrama —, sem versão tátil ou descrita ele não foi ensinado a este aluno: foi ensinado ao redor dele. E, ao contrário de uma questão isolada, isso se repete em cada aula da unidade.",
      "Here the distinction between hard and unavailable is everything. If the content exists only in spatial form — a map, a chart, a diagram — then without a tactile or described version it was not taught to this student: it was taught around them. And unlike a single question, this repeats in every lesson of the unit.",
      "Aquí la distinción entre difícil e indisponible lo es todo. Si el contenido solo existe en forma espacial — un mapa, un gráfico, un diagrama —, sin versión táctil o descrita no se le enseñó a este estudiante: se enseñó a su alrededor. Y, a diferencia de una pregunta aislada, esto se repite en cada clase de la unidad.",
    ),
    oQueFazer: ml(
      "Produza a versão tátil ou a descrição no planejamento da unidade, e não na véspera de cada aula. Descreva o que a figura mostra, não o que ela significa — a interpretação é o que o aluno vai fazer. E prefira relevo simplificado a relevo fiel: gráfico tátil com dez séries não se lê com as mãos.",
      "Produce the tactile version or the description when planning the unit, not the night before each lesson. Describe what the figure shows, not what it means — interpretation is what the student will do. And prefer simplified relief to faithful relief: a tactile chart with ten series cannot be read by hand.",
      "Produzca la versión táctil o la descripción en la planificación de la unidad, y no la víspera de cada clase. Describa qué muestra la figura, no qué significa — la interpretación es lo que hará el estudiante. Y prefiera relieve simplificado a relieve fiel: un gráfico táctil con diez series no se lee con las manos.",
    ),
    citations: [PATHS_BRAILLE, APH_RECURSOS, CAST_UDL],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=eYGX2oL6euo",
      titulo: "Materiais Pedagógicos Acessíveis | Modelo do Sistema Nervoso",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 274,
      metadadosDe: "oEmbed",
      porQue:
        "O modelo tátil é a única tradução da figura que carrega informação não repetida no texto.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "A audiodescrição, que resolve para a deficiência visual, aqui resolve pela metade: o canal auditivo também está comprometido. Gráficos e mapas precisam virar tátil, e isso não se improvisa — o que significa que conteúdo com representação visual precisa entrar no planejamento da semana, não na escolha do dia.",
      "The audio description that solves it for blindness only half-solves it here: the auditory channel is affected too. Charts and maps must become tactile, and that cannot be improvised — which means content with visual representation belongs in the week's planning, not the day's picking.",
      "La audiodescripción, que resuelve para la discapacidad visual, aquí resuelve a medias: el canal auditivo también está comprometido. Gráficos y mapas deben volverse táctiles, y eso no se improvisa — lo que significa que el contenido con representación visual debe entrar en la planificación de la semana, no en la elección del día.",
    ),
    oQueFazer: ml(
      "Prepare a versão tátil com antecedência e combine com o interveniente o vocabulário do que será explorado com as mãos, antes da aula. Reserve tempo de exploração tátil no plano: a leitura de um gráfico em relevo leva vários minutos, e não os trinta segundos que a versão visual leva.",
      "Prepare the tactile version in advance and agree with the intervener on the vocabulary for what will be explored by hand, before the lesson. Reserve tactile exploration time in the plan: reading a relief chart takes several minutes, not the thirty seconds the visual version takes.",
      "Prepare la versión táctil con antelación y acuerde con el interviniente el vocabulario de lo que se explorará con las manos, antes de la clase. Reserve tiempo de exploración táctil en el plan: leer un gráfico en relieve lleva varios minutos, y no los treinta segundos de la versión visual.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, CADEAFBLIND_INTERVENTOR, APH_RECURSOS],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=UFCMlDJropA",
      titulo: "Tactile Graphicacy Webinar Part 1- 02/11/2025",
      canal: "Perkins School for the Blind",
      duracaoSegundos: 4192,
      metadadosDe: "oEmbed",
      porQue:
        "Grafia tátil é a tradução da informação espacial para quem não a alcança pela visão — o único caminho para gráfico e diagrama aqui.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "autismo",
    oQueSignifica: ml(
      "Aqui a exigência costuma jogar a favor: apoio visual é prática com evidência no TEA, e o conteúdo que se organiza em diagrama é mais acessível que o puramente verbal. O atrito aparece quando a figura é decorativa ou ambígua, e a precisão do aluno é gasta num detalhe que a unidade não vai usar.",
      "Here the demand usually plays in favour: visual support is an evidence-based practice in autism, and content organised as a diagram is more accessible than the purely verbal. Friction appears when the figure is decorative or ambiguous, and the student's precision gets spent on a detail the unit will never use.",
      "Aquí la exigencia suele jugar a favor: el apoyo visual es práctica con evidencia en el TEA, y el contenido que se organiza en diagrama es más accesible que el puramente verbal. La fricción aparece cuando la figura es decorativa o ambigua, y la precisión del estudiante se gasta en un detalle que la unidad no usará.",
    ),
    oQueFazer: ml(
      "Use o diagrama como estrutura da aula, e não como ilustração ao lado dela — e diga explicitamente o que na figura importa e o que é contexto. Mantenha a mesma convenção visual ao longo da unidade: trocar cores e formatos entre aulas desfaz o apoio que a figura oferecia.",
      "Use the diagram as the lesson's structure, not as an illustration beside it — and state explicitly what in the figure matters and what is context. Keep the same visual convention across the unit: changing colours and formats between lessons undoes the support the figure was giving.",
      "Use el diagrama como estructura de la clase, y no como ilustración al lado — y diga explícitamente qué de la figura importa y qué es contexto. Mantenga la misma convención visual a lo largo de la unidad: cambiar colores y formatos entre clases deshace el apoyo que la figura ofrecía.",
    ),
    citations: [AFIRM_APOIOS_VISUAIS, NCAEP, AFIRM_ANTECEDENTES],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=snBwz6JNDmg",
      titulo: "Materiais Pedagógicos Acessíveis | Sistema Solar Interativo | Libras e Audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 322,
      metadadosDe: "oEmbed",
      porQue:
        "Traz o sistema solar para três dimensões, tornando manipulável a figura que no papel exige inferir profundidade.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "A figura costuma jogar a favor: informação que não depende do português escrito chega inteira. O cuidado é com legenda, título e rótulos de eixo, que voltam a ser segunda língua — e que num gráfico carregam justamente o que decide a leitura.",
      "The figure usually plays in favour: information not dependent on written Portuguese arrives whole. The care is with caption, title and axis labels, which are second language again — and which in a chart carry exactly what decides the reading.",
      "La figura suele jugar a favor: información que no depende del portugués escrito llega entera. El cuidado está en la leyenda, el título y los rótulos de eje, que vuelven a ser segunda lengua — y que en un gráfico llevan justamente lo que decide la lectura.",
    ),
    oQueFazer: ml(
      "Trate legenda e rótulos como texto a ser traduzido, com o mesmo cuidado do enunciado, e faça isso antes de propor a leitura da figura. Aproveite a exigência: numa unidade com representação visual, o conteúdo pode ser construído com menos texto corrido do que o habitual.",
      "Treat caption and labels as text to be translated, with the same care as the stem, and do it before proposing the figure's reading. Take advantage of the demand: in a unit with visual representation, the content can be built with less running text than usual.",
      "Trate la leyenda y los rótulos como texto a traducir, con el mismo cuidado que el enunciado, y hágalo antes de proponer la lectura de la figura. Aproveche la exigencia: en una unidad con representación visual, el contenido puede construirse con menos texto corrido de lo habitual.",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, CAST_UDL],
  },
  {
    exigencia: "representacao-visual",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Gráfico é número em outra forma, e a escala cobra exatamente o que a discalculia torna custoso: perceber que um passo do eixo vale 50 e não 5, comparar como razão e não como diferença, situar um ponto entre duas marcas. O aluno descreve a tendência corretamente e tira dela o valor errado.",
      "A chart is number in another form, and the scale demands exactly what dyscalculia makes costly: seeing that one axis step is worth 50 and not 5, comparing as a ratio and not a difference, placing a point between two marks. The student describes the trend correctly and takes the wrong value from it.",
      "Un gráfico es número en otra forma, y la escala exige justamente lo que la discalculia vuelve costoso: percibir que un paso del eje vale 50 y no 5, comparar como razón y no como diferencia, situar un punto entre dos marcas. El estudiante describe la tendencia correctamente y saca de ella el valor equivocado.",
    ),
    oQueFazer: ml(
      "Comece toda aula com figura pela leitura da escala em voz alta, como rotina fixa: quanto vale um passo, onde está o zero. Depois exija a estimativa antes da leitura exata — é a estimativa que denuncia a escala lida errado, e o valor exato sozinho não denuncia nada.",
      "Begin every lesson with a figure by reading the scale aloud, as a fixed routine: what one step is worth, where zero sits. Then require the estimate before the exact reading — the estimate is what exposes a misread scale, and the exact value alone exposes nothing.",
      "Empiece toda clase con figura por la lectura de la escala en voz alta, como rutina fija: cuánto vale un paso, dónde está el cero. Después exija la estimación antes de la lectura exacta — la estimación es la que delata la escala mal leída, y el valor exacto solo no delata nada.",
    ),
    citations: [WWC_MATEMATICA_2021, NCII_MATEMATICA, WWC_RESOLUCAO],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=IxZduIv1a7c",
      titulo: "Decoding Dyscalculia -  Making Sense of Decimal Place Value",
      canal: "The Dyscalculia Network",
      duracaoSegundos: 577,
      metadadosDe: "oEmbed",
      porQue:
        "O valor posicional é informação espacial antes de ser numérica, e o vídeo trabalha exatamente essa leitura.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "Uma figura densa apresenta muitos elementos ao mesmo tempo, e nada nela diz por onde começar. O aluno responde pelo que reconhece na imagem, e não pelo que ela mede — porque a ordem de leitura de um gráfico é convenção ensinada, e quase nunca é ensinada.",
      "A dense figure presents many elements at once, and nothing in it says where to begin. The student answers from what they recognise in the image rather than from what it measures — because the reading order of a chart is a taught convention, and it is almost never taught.",
      "Una figura densa presenta muchos elementos a la vez, y nada en ella dice por dónde empezar. El estudiante responde por lo que reconoce en la imagen, y no por lo que ella mide — porque el orden de lectura de un gráfico es convención enseñada, y casi nunca se enseña.",
    ),
    oQueFazer: ml(
      "Ensine uma rotina fixa de leitura e use sempre a mesma na unidade inteira: título, eixo de baixo, eixo de lado, só então a pergunta. Simplifique a figura antes de simplificar o conteúdo — reduzir de três séries para uma preserva o assunto e torna a leitura possível.",
      "Teach a fixed reading routine and use the same one across the whole unit: title, bottom axis, side axis, only then the question. Simplify the figure before simplifying the content — cutting from three series to one preserves the subject and makes the reading possible.",
      "Enseñe una rutina fija de lectura y use siempre la misma en toda la unidad: título, eje de abajo, eje de al lado, y solo entonces la pregunta. Simplifique la figura antes de simplificar el contenido — reducir de tres series a una preserva el asunto y vuelve posible la lectura.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS, CAST_UDL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=AD8tTiMCHJk",
      titulo: "Materiais Pedagógicos Acessíveis | Modelo do DNA",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 380,
      metadadosDe: "oEmbed",
      porQue:
        "Transforma a molécula, que é figura abstrata no livro, em objeto que se monta e se desmonta.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "tdah",
    oQueSignifica: ml(
      "A figura é a parte do material com mais coisa para olhar e menos instrução sobre onde olhar. Sem alvo definido, o aluno percorre o gráfico inteiro, acha algo interessante que a aula não usa e volta ao texto sem o dado. O vaivém entre figura e texto é onde a aula se perde.",
      "The figure is the part of the material with the most to look at and the least instruction on where to look. With no defined target, the student sweeps the whole chart, finds something interesting the lesson does not use, and returns to the text without the datum. The back-and-forth between figure and text is where the lesson is lost.",
      "La figura es la parte del material con más cosas que mirar y menos instrucción sobre dónde mirar. Sin objetivo definido, el estudiante recorre el gráfico entero, encuentra algo interesante que la clase no usa y vuelve al texto sin el dato. El vaivén entre figura y texto es donde la clase se pierde.",
    ),
    oQueFazer: ml(
      "Dê o alvo antes de mostrar a figura, um por vez e por escrito. E ponha figura e texto na mesma superfície, sem alternância — cada troca entre os dois é uma oportunidade de recomeçar, e recomeçar é o custo a evitar.",
      "Give the target before showing the figure, one at a time and in writing. And put figure and text on the same surface, with no switching — every swap between them is a chance to start over, and starting over is the cost to avoid.",
      "Dé el objetivo antes de mostrar la figura, uno por vez y por escrito. Y ponga figura y texto en la misma superficie, sin alternancia — cada cambio entre ambos es una oportunidad de recomenzar, y recomenzar es el costo a evitar.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, CAST_UDL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=UijE01ge7Oo",
      titulo: "Materiais pedagógicos acessíveis | Trilhando os campos de experiências | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 339,
      metadadosDe: "oEmbed",
      porQue:
        "A trilha põe a estrutura da atividade à vista, que é o apoio visual que segura a atenção quando a instrução falada se perde no meio.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Aqui a exigência é a melhor notícia da linha: o apoio visual é via de força documentada na síndrome, e o conteúdo que se organiza em figura chega melhor que o verbal. A ressalva é o gráfico abstrato — barra, linha e setor não se parecem com o que representam, e a convenção precisa ter sido ensinada antes.",
      "Here the demand is the row's best news: visual support is a documented channel of strength in the syndrome, and content organised as a figure lands better than verbal content. The caveat is the abstract chart — bars, lines and pie slices do not resemble what they represent, and the convention must have been taught first.",
      "Aquí la exigencia es la mejor noticia de la fila: el apoyo visual es vía de fortaleza documentada en el síndrome, y el contenido organizado en figura llega mejor que el verbal. La salvedad es el gráfico abstracto — barra, línea y sector no se parecen a lo que representan, y la convención debe haberse enseñado antes.",
    ),
    oQueFazer: ml(
      "Aproveite foto, mapa e esquema como âncora do conteúdo. Para gráfico, ensine a convenção com um exemplo do cotidiano do aluno antes de usá-la na matéria, e mantenha os dois à vista — o gráfico da unidade e o exemplo conhecido, lado a lado.",
      "Use photos, maps and diagrams as the content's anchor. For charts, teach the convention with an example from the student's daily life before using it in the subject, and keep both in sight — the unit's chart and the familiar example, side by side.",
      "Aproveche foto, mapa y esquema como ancla del contenido. Para el gráfico, enseñe la convención con un ejemplo del día a día del estudiante antes de usarla en la materia, y mantenga ambos a la vista — el gráfico de la unidad y el ejemplo conocido, lado a lado.",
    ),
    citations: [DSE_LEITURA, IES_DOWN, DSRF_LEITURA],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=Yzb7DTg6AhE",
      titulo: "Materiais Pedagógicos Acessíveis | Mapa Tátil | Libras e Audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 379,
      metadadosDe: "oEmbed",
      porQue:
        "O mapa tátil transforma a projeção cartográfica em relevo percorrível, e a memória visual deixa de ser condição para ler o mapa.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "A figura alivia — até a legenda. Rótulo de eixo e legenda são palavras isoladas, curtas, sem frase em volta: some exatamente o contexto que quem tem dislexia usa para compensar a decodificação. O gráfico ele lê; as sete palavras em volta dele, não.",
      "The figure gives relief — until the legend. Axis labels and legends are isolated short words with no sentence around them: exactly the context a dyslexic reader uses to compensate for decoding disappears. The chart they can read; the seven words around it, not.",
      "La figura alivia — hasta la leyenda. Rótulo de eje y leyenda son palabras aisladas, cortas, sin frase alrededor: desaparece justamente el contexto que quien tiene dislexia usa para compensar la decodificación. El gráfico lo lee; las siete palabras a su alrededor, no.",
    ),
    oQueFazer: ml(
      "Leia os rótulos e a legenda em voz alta antes de o aluno olhar a figura, e deixe-os escritos em corpo maior ao lado. Numa unidade inteira, use sempre os mesmos rótulos para as mesmas grandezas — variar o nome do eixo entre aulas recria o obstáculo a cada vez.",
      "Read the labels and legend aloud before the student looks at the figure, and leave them written in larger type alongside. Across a whole unit, always use the same labels for the same quantities — varying the axis name between lessons recreates the obstacle each time.",
      "Lea los rótulos y la leyenda en voz alta antes de que el estudiante mire la figura, y déjelos escritos en cuerpo mayor al lado. En una unidad entera, use siempre los mismos rótulos para las mismas magnitudes — variar el nombre del eje entre clases recrea el obstáculo cada vez.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY, UNDERSTOOD_LITERACIA],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=CMKjNHWkL2Y",
      titulo: "Dyslexia Conference Recording | Best Graphic Organizers to Teach Math",
      canal: "International Dyslexia Association",
      duracaoSegundos: 3459,
      metadadosDe: "oEmbed",
      porQue:
        "Organizador gráfico como forma de carregar a informação que o aluno perderia se ela chegasse só por texto.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "A figura tira carga de linguagem da entrada e devolve na saída: o aluno vê a tendência e não encontra as palavras para dizê-la. \"Aumentou\", \"aumentou mais rápido\", \"aumentou e estabilizou\" são distinções finas, e é nelas que a avaliação costuma se decidir.",
      "The figure removes language load on the way in and returns it on the way out: the student sees the trend and cannot find the words for it. \"Rose\", \"rose faster\", \"rose and levelled off\" are fine distinctions, and they are where assessment usually gets decided.",
      "La figura quita carga de lenguaje en la entrada y la devuelve en la salida: el estudiante ve la tendencia y no encuentra las palabras para decirla. \"Aumentó\", \"aumentó más rápido\", \"aumentó y se estabilizó\" son distinciones finas, y es en ellas donde suele decidirse la evaluación.",
    ),
    oQueFazer: ml(
      "Dê o vocabulário da figura antes da pergunta: três ou quatro expressões que descrevem o que se vê, escritas e afixadas para a unidade inteira. Escolher entre expressões dadas mostra o que ele entendeu do gráfico; pedir que produza a descrição mede a linguagem, que não é o conteúdo.",
      "Give the figure's vocabulary before the question: three or four expressions describing what is shown, written and posted for the whole unit. Choosing among given expressions shows what they understood of the chart; asking them to produce the description measures language, which is not the content.",
      "Dé el vocabulario de la figura antes de la pregunta: tres o cuatro expresiones que describen lo que se ve, escritas y fijadas para toda la unidad. Elegir entre expresiones dadas muestra qué entendió del gráfico; pedirle que produzca la descripción mide el lenguaje, que no es el contenido.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, DLD_PROJECT],
  },
  {
    exigencia: "representacao-visual",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Explorar uma figura é o que o acesso por varredura, acionador ou rastreamento faz pior: ampliar, mover e voltar ao ponto anterior são operações caras, e ler um gráfico é ir e voltar entre eixo, curva e legenda dezenas de vezes. A figura não é inacessível — é lenta, e a lentidão vira defasagem ao longo da unidade.",
      "Exploring a figure is what access by scanning, switch or tracking does worst: zooming, panning and returning to the previous point are expensive operations, and reading a chart means going back and forth between axis, curve and legend dozens of times. The figure is not inaccessible — it is slow, and slowness becomes a gap across the unit.",
      "Explorar una figura es lo que el acceso por barrido, pulsador o seguimiento hace peor: ampliar, mover y volver al punto anterior son operaciones caras, y leer un gráfico es ir y volver entre eje, curva y leyenda decenas de veces. La figura no es inaccesible — es lenta, y la lentitud se vuelve desfase a lo largo de la unidad.",
    ),
    oQueFazer: ml(
      "Entregue a figura já no tamanho legível e, quando tiver várias partes, também recortada em cada parte com o eixo repetido. Conte o tempo de acesso à figura como tempo de aula, e não como parte do tempo de resolução.",
      "Provide the figure already at legible size and, when it has several parts, also split into each part with the axis repeated. Count figure access time as lesson time, not as part of the solving time.",
      "Entregue la figura ya en tamaño legible y, cuando tenga varias partes, también recortada en cada parte con el eje repetido. Cuente el tiempo de acceso a la figura como tiempo de clase, y no como parte del tiempo de resolución.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=cLf-p-DQgg4",
      titulo: "Materiais pedagógicos acessíveis | Jogo das formas tridimensionais",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 230,
      metadadosDe: "oEmbed",
      porQue:
        "Formas tridimensionais manipuláveis substituem a figura no papel, que exige manter o traço e a folha no lugar.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "A figura carrega o conteúdo que o texto ameniza: gráfico de mortalidade, foto de violência, mapa de fome. Numa unidade inteira sobre esses temas, o aluno em sofrimento encontra a imagem várias vezes, sem aviso — e a diferença entre encontrá-la preparado e encontrá-la de surpresa é grande.",
      "The figure carries the content the text softens: a mortality chart, a photograph of violence, a hunger map. Across a whole unit on such themes, a student in distress meets the image repeatedly, unannounced — and the difference between meeting it prepared and by surprise is large.",
      "La figura lleva el contenido que el texto suaviza: gráfico de mortalidad, foto de violencia, mapa de hambre. En una unidad entera sobre esos temas, el estudiante en sufrimiento encuentra la imagen varias veces, sin aviso — y la diferencia entre encontrarla preparado y de sorpresa es grande.",
    ),
    oQueFazer: ml(
      "Olhe as figuras da unidade antes de começá-la e anuncie o assunto das imagens pesadas em uma frase, antes de mostrá-las. Quando houver figura equivalente que sirva ao mesmo conteúdo, use-a — trocar por causa da imagem não é baixar a exigência, é escolher entre materiais que ensinam o mesmo.",
      "Look at the unit's figures before starting it and announce the subject of the heavy images in one sentence before showing them. When an equivalent figure serves the same content, use it — swapping because of the image is not lowering the bar, it is choosing among materials that teach the same thing.",
      "Mire las figuras de la unidad antes de empezarla y anuncie el asunto de las imágenes pesadas en una frase, antes de mostrarlas. Cuando haya figura equivalente que sirva al mismo contenido, úsela — cambiar por causa de la imagen no es bajar la exigencia, es elegir entre materiales que enseñan lo mismo.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, OMS_ADOLESCENTE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=eDEYhKIXCEU",
      titulo: "Young People and Traumatic Events",
      canal: "Anna Freud",
      duracaoSegundos: 180,
      metadadosDe: "oEmbed",
      porQue:
        "Trata do aluno que já viveu o que a figura mostra, que é o risco de exibir a imagem pesada da unidade sem o aviso de uma frase.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "Ler uma figura com precisão costuma exigir marcar nela — traçar a linha até o eixo, circular o ponto, anotar o valor ao lado da barra. São gestos de precisão, do mesmo tipo que o traçado da letra, e o aluno que os evita passa a ler no olho, o que introduz erro exatamente onde a unidade exige exatidão.",
      "Reading a figure precisely usually requires marking it — drawing the line to the axis, circling the point, noting the value beside the bar. These are precision movements of the same kind as forming letters, and a student who avoids them reads by eye, introducing error exactly where the unit demands exactness.",
      "Leer una figura con precisión suele exigir marcarla — trazar la línea hasta el eje, encerrar el punto, anotar el valor al lado de la barra. Son gestos de precisión del mismo tipo que el trazo de la letra, y el estudiante que los evita lee a ojo, introduciendo error justo donde la unidad exige exactitud.",
    ),
    oQueFazer: ml(
      "Ofereça régua, papel transparente ou versão digital com linha-guia como material padrão da unidade. Quando o valor lido alimentar uma conta, registre-o você ao lado da figura — o conteúdo é a leitura do gráfico, e não a caligrafia do número lido.",
      "Offer a ruler, transparent overlay or a digital version with a guide line as the unit's standard material. When the value read feeds a calculation, record it yourself beside the figure — the content is the reading of the chart, not the penmanship of the number read.",
      "Ofrezca regla, papel transparente o versión digital con línea guía como material estándar de la unidad. Cuando el valor leído alimente una cuenta, regístrelo usted al lado de la figura — el contenido es la lectura del gráfico, y no la caligrafía del número leído.",
    ),
    citations: [WWC_ESCRITA_FINAIS, READING_ROCKETS_ESCRITA, CAST_UDL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=zVOu_Q-O9vo",
      titulo: "Writing SOS: How can I help my child organize their ideas to help them write?",
      canal: "Reading Rockets",
      duracaoSegundos: 130,
      metadadosDe: "oEmbed",
      porQue:
        "Organizar ideias fora do texto corrido tira do papel a estrutura que a escrita à mão não consegue sustentar enquanto se escreve.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "representacao-visual",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "A figura costuma trazer muito mais informação do que a unidade usa: o gráfico tem duas séries e a aula cobra uma. Para este aluno a leitura termina em segundos, e o que sobra na tela é justamente a parte interessante — uma sequência de aulas assim é o mecanismo cotidiano do desinteresse.",
      "The figure usually carries far more information than the unit uses: the chart has two series and the lesson asks about one. For this student the reading ends in seconds, and what remains on screen is exactly the interesting part — a run of lessons like this is the everyday mechanism of disengagement.",
      "La figura suele traer mucha más información de la que la unidad usa: el gráfico tiene dos series y la clase pide una. Para este estudiante la lectura termina en segundos, y lo que sobra en la pantalla es justamente la parte interesante — una serie de clases así es el mecanismo cotidiano del desinterés.",
    ),
    oQueFazer: ml(
      "Depois da leitura prevista, faça à mesma figura uma pergunta que a unidade não fez: o que a escala esconde, o que mudaria se o eixo começasse em zero, que dado faltaria para afirmar causa. É aprofundamento sobre o material que a turma já tem à frente, sem exigir segunda atividade.",
      "After the planned reading, put to the same figure a question the unit did not ask: what the scale hides, what would change if the axis started at zero, what datum would be missing to claim causation. It is depth over material the class already has, with no second activity required.",
      "Después de la lectura prevista, hágale a la misma figura una pregunta que la unidad no hizo: qué esconde la escala, qué cambiaría si el eje empezara en cero, qué dato faltaría para afirmar causa. Es profundización sobre el material que la clase ya tiene delante, sin exigir una segunda actividad.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, UCONN_SEM],
  },

  // === abstracao-simbolica ===================================================
  {
    exigencia: "abstracao-simbolica",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Operar com símbolo exige que o símbolo já signifique alguma coisa, e é aí que a unidade costuma pular uma etapa: a letra entra como regra a aplicar, não como número que varia. O aluno decora o procedimento e não sustenta o sentido — e quando o formato muda, nada transfere.",
      "Operating on a symbol requires the symbol to already mean something, and that is where the unit usually skips a step: the letter arrives as a rule to apply, not as a number that varies. The student memorises the procedure and does not sustain the meaning — and when the format changes, nothing transfers.",
      "Operar con símbolo exige que el símbolo ya signifique algo, y ahí es donde la unidad suele saltarse una etapa: la letra entra como regla a aplicar, no como número que varía. El estudiante memoriza el procedimiento y no sostiene el sentido — y cuando el formato cambia, nada transfiere.",
    ),
    oQueFazer: ml(
      "Percorra concreto, pictórico e simbólico na mesma aula e na mesma ordem, com o mesmo problema: material, desenho, notação. A sequência tem respaldo em intervenção matemática, e o ganho aparece justamente em quem não constrói a representação sozinho. Só retire o apoio quando o aluno o dispensar.",
      "Walk through concrete, pictorial and symbolic in the same lesson and the same order, on the same problem: material, drawing, notation. The sequence is supported in mathematics intervention, and the gain shows precisely in students who do not build the representation on their own. Remove the support only when the student drops it.",
      "Recorra concreto, pictórico y simbólico en la misma clase y en el mismo orden, con el mismo problema: material, dibujo, notación. La secuencia tiene respaldo en intervención matemática, y la ganancia aparece justamente en quien no construye la representación por sí mismo. Retire el apoyo solo cuando el estudiante lo deje.",
    ),
    citations: [WWC_MATEMATICA_2021, NCII_MATEMATICA, WWC_RESOLUCAO],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=eYX2stWBN60",
      titulo: "Decoding Dyscalculia: Unlocking Algebra with Algebra Tiles",
      canal: "The Dyscalculia Network",
      duracaoSegundos: 601,
      metadadosDe: "oEmbed",
      porQue:
        "Usa material de álgebra para dar referente concreto ao símbolo, que é o ponto em que a discalculia perde a conta.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "O símbolo é convenção pura, e convenção se sustenta por referência a algo que se pode apontar. Sem essa âncora, a notação vira uma segunda língua sem tradutor — e o aluno reproduz a forma da escrita sem que ela signifique nada, o que passa por acerto até a primeira variação.",
      "The symbol is pure convention, and convention holds up by reference to something one can point at. Without that anchor, notation becomes a second language with no translator — and the student reproduces the written form without it meaning anything, which passes as correct until the first variation.",
      "El símbolo es convención pura, y la convención se sostiene por referencia a algo que se pueda señalar. Sin esa ancla, la notación se vuelve una segunda lengua sin traductor — y el estudiante reproduce la forma de la escritura sin que signifique nada, lo que pasa por acierto hasta la primera variación.",
    ),
    oQueFazer: ml(
      "Mantenha o referente concreto disponível durante toda a unidade, e não só na aula de introdução. Cada símbolo novo entra com o objeto ao lado e com a frase que o lê em voz alta, sempre a mesma. Reduza a quantidade de símbolos por aula antes de reduzir a profundidade do conteúdo.",
      "Keep the concrete referent available through the whole unit, not just the introductory lesson. Each new symbol enters with the object beside it and with the sentence that reads it aloud, always the same one. Reduce the number of symbols per lesson before reducing the content's depth.",
      "Mantenga el referente concreto disponible durante toda la unidad, y no solo en la clase de introducción. Cada símbolo nuevo entra con el objeto al lado y con la frase que lo lee en voz alta, siempre la misma. Reduzca la cantidad de símbolos por clase antes de reducir la profundidad del contenido.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS, WWC_MATEMATICA_2021],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=pPB7dQZx71U",
      titulo: "Materiais pedagógicos acessíveis | Contando as luzes",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 136,
      metadadosDe: "oEmbed",
      porQue:
        "Usa luz para dar existência física ao número, atacando o símbolo pelo lado que não exige memória verbal.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "A notação simbólica é espacial: expoente em cima, índice embaixo, fração em dois andares, matriz em grade. Lida por voz, ela vira uma linha, e a posição — que é o que carrega o sentido — desaparece. Em braille há notação própria para isso, e ela precisa ter sido ensinada antes da unidade.",
      "Symbolic notation is spatial: exponent above, index below, fraction on two levels, matrix as a grid. Read by voice, it becomes one line, and the position — which is what carries the meaning — disappears. In braille there is a dedicated notation for this, and it must have been taught before the unit.",
      "La notación simbólica es espacial: exponente arriba, índice abajo, fracción en dos pisos, matriz en cuadrícula. Leída por voz, se vuelve una línea, y la posición — que es lo que lleva el sentido — desaparece. En braille hay notación propia para eso, y debe haberse enseñado antes de la unidad.",
    ),
    oQueFazer: ml(
      "Combine em voz alta como cada estrutura será dita — \"fração de numerador x mais um, denominador dois\" — e use sempre a mesma formulação na unidade inteira. Garanta o material em notação matemática braille, e não em texto corrido: descrever fórmula em prosa é possível para uma, e insustentável para uma unidade.",
      "Agree aloud how each structure will be said — \"fraction with numerator x plus one, denominator two\" — and always use the same formulation across the unit. Ensure material in braille mathematical notation, not running text: describing a formula in prose works for one, and is unsustainable for a unit.",
      "Acuerde en voz alta cómo se dirá cada estructura — \"fracción de numerador x más uno, denominador dos\" — y use siempre la misma formulación en toda la unidad. Garantice el material en notación matemática braille, y no en texto corrido: describir una fórmula en prosa es posible para una, e insostenible para una unidad.",
    ),
    citations: [PATHS_BRAILLE, APH_RECURSOS, PATHS_TECNOLOGIA],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=p82vuC9r-yM",
      titulo: "Materiais pedagógicos acessíveis | Máquina de somar - Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 142,
      metadadosDe: "oEmbed",
      porQue:
        "A máquina de somar dá forma manipulável à operação, que no quadro existe só como símbolo visual.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "autismo",
    oQueSignifica: ml(
      "Sistema de regras explícitas costuma ser terreno favorável, e a notação é exatamente isso. O atrito aparece quando a convenção é usada de modo inconsistente entre aulas — o mesmo símbolo com dois sentidos, a mesma letra ora variável ora unidade — e a inconsistência, que a turma absorve sem notar, aqui trava.",
      "A system of explicit rules is usually favourable terrain, and notation is exactly that. Friction appears when the convention is used inconsistently between lessons — the same symbol with two meanings, the same letter now a variable now a unit — and the inconsistency, which the class absorbs without noticing, jams here.",
      "Un sistema de reglas explícitas suele ser terreno favorable, y la notación es exactamente eso. La fricción aparece cuando la convención se usa de modo inconsistente entre clases — el mismo símbolo con dos sentidos, la misma letra ora variable ora unidad — y la inconsistencia, que la clase absorbe sin notar, aquí traba.",
    ),
    oQueFazer: ml(
      "Declare a convenção por escrito no começo da unidade e mantenha-a. Quando o mesmo símbolo mudar de sentido — m de metro e m de massa —, avise explicitamente em vez de deixar o contexto resolver. Aproveite a força: a notação pode ser o caminho de entrada, e não a chegada.",
      "Declare the convention in writing at the unit's start and stick to it. When the same symbol changes meaning — m for metre and m for mass — announce it explicitly instead of leaving context to resolve it. Use the strength: notation can be the way in, not the destination.",
      "Declare la convención por escrito al comienzo de la unidad y manténgala. Cuando el mismo símbolo cambie de sentido — m de metro y m de masa —, avise explícitamente en vez de dejar que el contexto lo resuelva. Aproveche la fuerza: la notación puede ser el camino de entrada, y no la llegada.",
    ),
    citations: [AFIRM_ANTECEDENTES, AFIRM_APOIOS_VISUAIS, NCAEP],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=tx2PC4rtQAE",
      titulo: "Materiais Pedagógicos Acessíveis | Arizinho | Libras e Audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 331,
      metadadosDe: "oEmbed",
      porQue:
        "Dá referente físico ao número antes de ele virar símbolo escrito, que é o degrau que a notação pula.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "tdah",
    oQueSignifica: ml(
      "O erro aqui não é conceitual, é de transcrição: sinal perdido ao copiar, expoente que não desceu, parêntese esquecido. O aluno entende a manipulação e a executa sobre uma expressão que já estava errada — e a correção, que olha só o resultado, devolve a conclusão errada sobre o que ele sabe.",
      "The error here is not conceptual, it is transcriptional: a sign lost while copying, an exponent that did not come down, a forgotten parenthesis. The student understands the manipulation and performs it on an expression that was already wrong — and marking, which looks only at the result, returns the wrong conclusion about what they know.",
      "El error aquí no es conceptual, es de transcripción: signo perdido al copiar, exponente que no bajó, paréntesis olvidado. El estudiante entiende la manipulación y la ejecuta sobre una expresión que ya estaba equivocada — y la corrección, que mira solo el resultado, devuelve la conclusión equivocada sobre lo que sabe.",
    ),
    oQueFazer: ml(
      "Entregue a expressão já impressa em vez de pedir a cópia, e exija uma linha por operação. Corrija apontando em qual linha a expressão deixou de corresponder à anterior — o aluno passa a ver que o defeito é de registro, e não de compreensão, o que muda o que ele treina.",
      "Provide the expression already printed instead of asking for a copy, and require one line per operation. Mark by pointing at which line the expression stopped matching the previous one — the student comes to see the defect is in recording, not in understanding, which changes what they practise.",
      "Entregue la expresión ya impresa en vez de pedir la copia, y exija una línea por operación. Corrija señalando en qué línea la expresión dejó de corresponder a la anterior — el estudiante pasa a ver que el defecto es de registro, y no de comprensión, lo que cambia lo que entrena.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, WWC_RESOLUCAO],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=q5IDRtXpsEU",
      titulo: "Error Analysis in Math: Using Student Work to Intensify Intervention",
      canal: "National Center on Intensive Intervention",
      duracaoSegundos: 3458,
      metadadosDe: "oEmbed",
      porQue:
        "Analisar o trabalho do aluno por padrão de erro é o que separa engano de transcrição de erro de compreensão, que aqui é a diferença entre corrigir e concluir errado.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "A notação é o pior caso do traçado: posição no espaço decide o sentido, e um expoente escrito baixo demais vira multiplicação. O aluno copia a expressão errada e opera corretamente sobre ela — e o resultado errado é registrado como erro de conteúdo, quando foi da mão.",
      "Notation is handwriting's worst case: position in space decides meaning, and an exponent written too low becomes multiplication. The student copies the wrong expression and operates correctly on it — and the wrong result is recorded as a content error, when it came from the hand.",
      "La notación es el peor caso del trazo: la posición en el espacio decide el sentido, y un exponente escrito demasiado bajo se vuelve multiplicación. El estudiante copia la expresión equivocada y opera correctamente sobre ella — y el resultado equivocado se registra como error de contenido, cuando fue de la mano.",
    ),
    oQueFazer: ml(
      "Use papel quadriculado ou grade impressa como material padrão da unidade, e ofereça editor de equações quando houver computador. Quando a dúvida for sobre o que ele escreveu, pergunte em vez de deduzir: a diferença entre errar a manipulação e errar o traçado muda o que se ensina em seguida.",
      "Use squared paper or a printed grid as the unit's standard material, and offer an equation editor where a computer exists. When what they wrote is unclear, ask rather than assume: the difference between getting the manipulation wrong and getting the handwriting wrong changes what gets taught next.",
      "Use papel cuadriculado o cuadrícula impresa como material estándar de la unidad, y ofrezca editor de ecuaciones cuando haya computadora. Cuando la duda sea sobre lo que escribió, pregunte en vez de deducir: la diferencia entre equivocar la manipulación y equivocar el trazo cambia lo que se enseña después.",
    ),
    citations: [WWC_ESCRITA_FINAIS, READING_ROCKETS_ESCRITA, CAST_UDL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=-DtAh_DKyak",
      titulo: "Writing SOS: How can learning to spell help my child?",
      canal: "Reading Rockets",
      duracaoSegundos: 114,
      metadadosDe: "oEmbed",
      porQue:
        "A ortografia é convenção pura, e é onde a disgrafia é mais penalizada por um erro que não é de raciocínio.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Manipular símbolo exige segurar valores enquanto se opera, e é memória verbal de curto prazo — o ponto mais custoso descrito na literatura da síndrome. A operação pode estar dominada e ainda assim não sobrar capacidade para chegar até ela.",
      "Manipulating symbols requires holding values while operating, and that is short-term verbal memory — the costliest point described in the syndrome's literature. The operation may be mastered and there still be no capacity left to reach it.",
      "Manipular símbolos exige sostener valores mientras se opera, y es memoria verbal a corto plazo — el punto más costoso descrito en la literatura del síndrome. La operación puede estar dominada y aun así no quedar capacidad para llegar a ella.",
    ),
    oQueFazer: ml(
      "Escreva os valores num cartão à vista, com rótulo em palavra e, quando possível, em imagem, e mantenha-o durante toda a unidade. O apoio visual é via de força documentada — usá-lo aqui não é concessão, é escolher o canal que funciona para tirar o valor da memória.",
      "Write the values on a card kept in sight, labelled in words and, where possible, in pictures, and keep it through the whole unit. Visual support is a documented channel of strength — using it here is not a concession, it is choosing the channel that works to take the value out of memory.",
      "Escriba los valores en una tarjeta a la vista, con rótulo en palabra y, cuando sea posible, en imagen, y manténgala durante toda la unidad. El apoyo visual es vía de fortaleza documentada — usarlo aquí no es concesión, es elegir el canal que funciona para sacar el valor de la memoria.",
    ),
    citations: [DSE_MEMORIA, IES_DOWN, DSRF_LEITURA],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=a2KHC_5zRZU",
      titulo: "See and Learn First Counting",
      canal: "Down Syndrome Education International",
      duracaoSegundos: 94,
      metadadosDe: "oEmbed",
      porQue:
        "Trabalha o número como símbolo desde a contagem, que é o degrau anterior a qualquer notação.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "O símbolo é introduzido por definição verbal — \"x representa a quantidade desconhecida\" — e é justamente a definição verbal que o TDL processa mal. O aluno não entende o símbolo porque não reteve a frase que o apresentou, e ninguém volta à frase.",
      "The symbol is introduced by a verbal definition — \"x stands for the unknown quantity\" — and it is precisely the verbal definition that DLD processes poorly. The student does not understand the symbol because they did not retain the sentence that introduced it, and nobody returns to the sentence.",
      "El símbolo se introduce por definición verbal — \"x representa la cantidad desconocida\" — y es justamente la definición verbal la que el TDL procesa mal. El estudiante no entiende el símbolo porque no retuvo la frase que lo presentó, y nadie vuelve a la frase.",
    ),
    oQueFazer: ml(
      "Introduza o símbolo por demonstração, e não por definição: mostre a mesma situação com três valores diferentes e deixe a letra aparecer no lugar que varia. A definição vem depois, por escrito e curta, para consulta — e não como a porta de entrada.",
      "Introduce the symbol by demonstration, not definition: show the same situation with three different values and let the letter appear in the place that varies. The definition comes afterwards, written and short, for consultation — not as the way in.",
      "Introduzca el símbolo por demostración, y no por definición: muestre la misma situación con tres valores distintos y deje que la letra aparezca en el lugar que varía. La definición viene después, por escrito y corta, para consulta — y no como puerta de entrada.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, DLD_PROJECT],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=YDRsmxPA-J8",
      titulo: "Explicit, Systematic Instruction: Elementary",
      canal: "The IRIS Center Video Collection",
      duracaoSegundos: 188,
      metadadosDe: "oEmbed",
      porQue:
        "A professora demonstra antes de definir, que é a ordem que o símbolo precisa aqui — a definição verbal é justamente o que o TDL não retém.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "O símbolo em si atravessa a barreira de língua — a notação é a mesma em qualquer idioma. O que não atravessa é a explicação de como manipulá-la, dita oralmente enquanto o professor escreve no quadro de costas. O aluno tem o símbolo e não tem a regra de uso.",
      "The symbol itself crosses the language barrier — notation is the same in any tongue. What does not cross is the explanation of how to manipulate it, delivered orally while the teacher writes on the board with their back turned. The student has the symbol and not the rule for using it.",
      "El símbolo en sí atraviesa la barrera de lengua — la notación es la misma en cualquier idioma. Lo que no atraviesa es la explicación de cómo manipularla, dicha oralmente mientras el docente escribe en el pizarrón de espaldas. El estudiante tiene el símbolo y no tiene la regla de uso.",
    ),
    oQueFazer: ml(
      "Escreva a regra de manipulação, não só a expressão, e nunca explique de costas para a turma. Aproveite a exigência como diagnóstico: se ele acerta a manipulação e erra o problema em texto, o que pesa é a língua, e é isso que precisa ser registrado.",
      "Write the manipulation rule, not just the expression, and never explain with your back to the class. Use the demand diagnostically: if they get the manipulation right and the worded problem wrong, what weighs is language, and that is what should be recorded.",
      "Escriba la regla de manipulación, no solo la expresión, y nunca explique de espaldas a la clase. Aproveche la exigencia como diagnóstico: si acierta la manipulación y falla el problema en texto, lo que pesa es la lengua, y es eso lo que hay que registrar.",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, CAST_UDL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=LLgB_V2Cth0",
      titulo: "Materiais Pedagógicos Acessíveis | Roda das Frações",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 247,
      metadadosDe: "oEmbed",
      porQue:
        "A roda das frações torna a notação manipulável, tirando a explicação do terreno falado.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "Letra como símbolo matemático colide com letra como som — o mesmo caractere que se decodifica agora se manipula. E a leitura da expressão da esquerda para a direita, que a decodificação treina, é justamente o que a notação contraria em fração, expoente e radical.",
      "A letter as a mathematical symbol collides with a letter as a sound — the same character that gets decoded is now manipulated. And reading the expression left to right, which decoding trains, is exactly what notation contradicts in fractions, exponents and roots.",
      "La letra como símbolo matemático choca con la letra como sonido — el mismo carácter que se decodifica ahora se manipula. Y la lectura de la expresión de izquierda a derecha, que la decodificación entrena, es justamente lo que la notación contradice en fracción, exponente y radical.",
    ),
    oQueFazer: ml(
      "Leia a expressão em voz alta junto com o aluno, sempre na mesma ordem e com as mesmas palavras, e escreva essa leitura ao lado da expressão. Prefira letras que não se confundam na leitura e evite as que se parecem entre si na mesma expressão.",
      "Read the expression aloud with the student, always in the same order and the same words, and write that reading beside the expression. Prefer letters that do not get confused in reading, and avoid ones that look alike within the same expression.",
      "Lea la expresión en voz alta junto con el estudiante, siempre en el mismo orden y con las mismas palabras, y escriba esa lectura al lado de la expresión. Prefiera letras que no se confundan en la lectura y evite las que se parecen entre sí en la misma expresión.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY, WWC_MATEMATICA_2021],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=wSY1VGlErWE",
      titulo: "Dyslexia Conference Recording | Multisensory Math: From Arithmetic to Algebra",
      canal: "International Dyslexia Association",
      duracaoSegundos: 3925,
      metadadosDe: "oEmbed",
      porQue:
        "Mostra como sustentar o símbolo algébrico com material multissensorial, quando a via verbal é justamente a mais cara para este aluno.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Escrever notação é o caso mais caro do acesso alternativo: subscrito, sobrescrito e frações não existem no teclado comum, e produzi-los por varredura ou acionador multiplica o número de operações por expressão. A unidade inteira passa a custar em tempo o que a turma gasta em atenção.",
      "Writing notation is alternative access's most expensive case: subscripts, superscripts and fractions do not exist on an ordinary keyboard, and producing them by scanning or switch multiplies the operations per expression. The whole unit comes to cost in time what the class spends in attention.",
      "Escribir notación es el caso más caro del acceso alternativo: subíndice, superíndice y fracciones no existen en el teclado común, y producirlos por barrido o pulsador multiplica el número de operaciones por expresión. La unidad entera pasa a costar en tiempo lo que la clase gasta en atención.",
    ),
    oQueFazer: ml(
      "Configure o editor de equações antes da unidade, com atalhos para os símbolos que ela usa, e aceite a expressão ditada quando o objetivo for verificar a manipulação. Produzir notação não é o conteúdo — operar com ela é.",
      "Set up the equation editor before the unit, with shortcuts for the symbols it uses, and accept the expression dictated when the goal is to verify the manipulation. Producing notation is not the content — operating with it is.",
      "Configure el editor de ecuaciones antes de la unidad, con atajos para los símbolos que usa, y acepte la expresión dictada cuando el objetivo sea verificar la manipulación. Producir notación no es el contenido — operar con ella sí.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO],
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "A notação é a cara da matéria que muita gente decidiu que não é para si. Uma expressão cheia de símbolos é lida como veredito antes de ser lida como problema — e, numa unidade inteira de conteúdo simbólico, essa leitura se confirma todos os dias.",
      "Notation is the face of the subject many people decided is not for them. An expression full of symbols is read as a verdict before it is read as a problem — and across a whole unit of symbolic content, that reading confirms itself daily.",
      "La notación es la cara de la materia que mucha gente decidió que no es para sí. Una expresión llena de símbolos se lee como veredicto antes que como problema — y en una unidad entera de contenido simbólico, esa lectura se confirma todos los días.",
    ),
    oQueFazer: ml(
      "Comece cada aula por um passo que se conclui — ler a expressão, dizer o que cada símbolo representa — antes de qualquer manipulação. É a conclusão do primeiro passo, e não o incentivo, que costuma destravar o resto. E corrija por etapa: saber que a leitura estava certa muda a disposição de tentar a conta.",
      "Start each lesson with a step that finishes — reading the expression, saying what each symbol stands for — before any manipulation. It is finishing the first step, not encouragement, that usually unjams the rest. And mark stage by stage: knowing the reading was right changes the willingness to attempt the calculation.",
      "Empiece cada clase por un paso que se concluye — leer la expresión, decir qué representa cada símbolo — antes de cualquier manipulación. Es concluir el primer paso, y no el ánimo, lo que suele destrabar el resto. Y corrija por etapa: saber que la lectura estaba bien cambia la disposición a intentar la cuenta.",
    ),
    citations: [CDC_SAUDE_MENTAL, WWC_RESOLUCAO, OMS_ADOLESCENTE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=H9UaMZ3hLAU",
      titulo: "Anxiety",
      canal: "Anna Freud",
      duracaoSegundos: 352,
      metadadosDe: "oEmbed",
      porQue:
        "O símbolo abstrato costuma ser o primeiro ponto em que a ansiedade de desempenho aparece, porque nele não há contexto onde se apoiar.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "A notação é espacial e o acesso é linear e tátil: uma expressão em dois andares chega em duas passagens da mão, e a relação entre elas precisa ser reconstruída de memória. Sem notação matemática em braille dominada de antes, a unidade não é acessível — e isso não se resolve em aula.",
      "Notation is spatial and access is linear and tactile: a two-level expression arrives in two passes of the hand, and the relation between them must be rebuilt from memory. Without braille mathematical notation already mastered, the unit is not accessible — and that cannot be solved in class.",
      "La notación es espacial y el acceso es lineal y táctil: una expresión en dos pisos llega en dos pasadas de la mano, y la relación entre ellas debe reconstruirse de memoria. Sin notación matemática en braille dominada de antes, la unidad no es accesible — y eso no se resuelve en clase.",
    ),
    oQueFazer: ml(
      "Verifique, no planejamento, se a notação exigida já foi ensinada — e, se não foi, ensine-a antes como conteúdo próprio, com tempo próprio. Combine com o interveniente uma forma fixa de dizer cada estrutura, e mantenha as expressões da unidade curtas e numeradas para poderem ser referidas sem serem relidas.",
      "Check, at planning time, whether the required notation has been taught — and if not, teach it beforehand as its own content, with its own time. Agree with the intervener on a fixed way of saying each structure, and keep the unit's expressions short and numbered so they can be referred to without being reread.",
      "Verifique, en la planificación, si la notación exigida ya fue enseñada — y, si no, enséñela antes como contenido propio, con tiempo propio. Acuerde con el interviniente una forma fija de decir cada estructura, y mantenga las expresiones de la unidad cortas y numeradas para poder referirlas sin releerlas.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, CADEAFBLIND_INTERVENTOR, APH_RECURSOS],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=yWlQDfBj5BM",
      titulo: "How do tactile symbols drive conversations?",
      canal: "Perkins School for the Blind",
      duracaoSegundos: 58,
      metadadosDe: "oEmbed",
      porQue:
        "Símbolo tátil é convenção pura sustentada pelo tato, e o vídeo trata de como ele passa a significar.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "abstracao-simbolica",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "A manipulação simbólica costuma vir fácil, e o risco é a unidade se transformar em repetição de exercícios do mesmo tipo. Este aluno chega ao resultado por caminho próprio e é corrigido por não ter usado o método ensinado — o que ensina, rápido, a não mostrar o caminho.",
      "Symbolic manipulation usually comes easily, and the risk is the unit turning into repetition of the same exercise type. This student reaches the result by their own route and is marked down for not using the taught method — which quickly teaches them not to show their route.",
      "La manipulación simbólica suele venir fácil, y el riesgo es que la unidad se convierta en repetición de ejercicios del mismo tipo. Este estudiante llega al resultado por camino propio y se le corrige por no haber usado el método enseñado — lo que enseña, rápido, a no mostrar el camino.",
    ),
    oQueFazer: ml(
      "Aceite o caminho alternativo quando estiver correto, e peça que ele o justifique — justificar um método próprio é mais exigente que aplicar o ensinado. Ofereça a generalização: por que a regra vale, em que casos falha, o que aconteceria com outra convenção.",
      "Accept the alternative route when it is correct, and ask them to justify it — justifying one's own method is more demanding than applying the taught one. Offer the generalisation: why the rule holds, where it fails, what would happen under another convention.",
      "Acepte el camino alternativo cuando sea correcto, y pida que lo justifique — justificar un método propio es más exigente que aplicar el enseñado. Ofrezca la generalización: por qué vale la regla, en qué casos falla, qué pasaría con otra convención.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, UCONN_SEM, NAGC],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=zs5eJFQMrmY",
      titulo: "Presenting and Comparing Multiple Solutions Strategies",
      canal: "The IRIS Center Video Collection",
      duracaoSegundos: 271,
      metadadosDe: "oEmbed",
      porQue:
        "Compara estratégias diferentes para a mesma operação, que é o que transforma o caminho próprio deste aluno em objeto de aula em vez de desvio a corrigir.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },

  // === producao-do-aluno =====================================================
  {
    exigencia: "producao-do-aluno",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "Esta é a exigência que define a disgrafia no currículo. Quando a única forma prevista de demonstrar aprendizado é escrever, o conteúdo passa a ser medido pela mão — e o aluno que sabe entrega menos, ou entrega tarde, ou não entrega. A defasagem que aparece no boletim é de transcrição, e é lida como de conteúdo.",
      "This is the demand that defines dysgraphia in the curriculum. When the only planned way to demonstrate learning is writing, the content gets measured by the hand — and the student who knows hands in less, or late, or not at all. The gap on the report card is transcriptional, and it is read as a content gap.",
      "Esta es la exigencia que define la disgrafía en el currículo. Cuando la única forma prevista de demostrar aprendizaje es escribir, el contenido pasa a medirse por la mano — y el estudiante que sabe entrega menos, o entrega tarde, o no entrega. El desfase que aparece en el boletín es de transcripción, y se lee como de contenido.",
    ),
    oQueFazer: ml(
      "Separe no planejamento o que é conteúdo do que é transcrição, e ofereça mais de uma via de produção como padrão da unidade — digitação, ditado, gravação, esquema. Quando a escrita à mão for o próprio objetivo, diga isso e avalie só ela, em texto curto e com tempo próprio.",
      "Separate content from transcription in the planning, and offer more than one production route as the unit's standard — typing, dictation, recording, outline. When handwriting is itself the objective, say so and assess only that, in a short text with its own time.",
      "Separe en la planificación lo que es contenido de lo que es transcripción, y ofrezca más de una vía de producción como estándar de la unidad — tecleado, dictado, grabación, esquema. Cuando la escritura a mano sea el objetivo, dígalo y evalúe solo eso, en texto corto y con tiempo propio.",
    ),
    citations: [WWC_ESCRITA_FINAIS, READING_ROCKETS_ESCRITA, CAST_UDL],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=pPN-foAXezY",
      titulo: "Strategies to Help Your Child With Written Expression",
      canal: "Understood",
      duracaoSegundos: 2569,
      metadadosDe: "oEmbed",
      porQue:
        "Trata da expressão escrita como produto, que é exatamente o que a disgrafia impede de mostrar.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "Produzir cobra exatamente o que o TDL torna custoso: organizar, encadear e escolher a palavra sob pressão de tempo. O aluno sabe o conteúdo e entrega um texto ou uma fala que não o mostra — e a avaliação registra o conteúdo como ausente.",
      "Producing demands exactly what DLD makes costly: organising, sequencing and choosing words under time pressure. The student knows the content and delivers a text or a talk that does not show it — and assessment records the content as absent.",
      "Producir exige justamente lo que el TDL vuelve costoso: organizar, encadenar y elegir la palabra bajo presión de tiempo. El estudiante sabe el contenido y entrega un texto o un habla que no lo muestra — y la evaluación registra el contenido como ausente.",
    ),
    oQueFazer: ml(
      "Dê o andaime antes da produção: roteiro com a estrutura, banco de conectivos, vocabulário da unidade afixado. E separe a nota de conteúdo da nota de forma — sem essa separação, o mesmo aluno é penalizado duas vezes pela mesma dificuldade.",
      "Give the scaffold before production: an outline with the structure, a bank of connectives, the unit's vocabulary posted. And separate the content mark from the form mark — without that separation, the same student is penalised twice for the same difficulty.",
      "Dé el andamiaje antes de la producción: guion con la estructura, banco de conectores, vocabulario de la unidad fijado. Y separe la nota de contenido de la de forma — sin esa separación, el mismo estudiante es penalizado dos veces por la misma dificultad.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, WWC_ESCRITA_FINAIS],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=RevbZGsNLHg",
      titulo: "Yield Powerful Payoffs Using Written Language Assessment and Intervention",
      canal: "American Speech-Language-Hearing Association",
      duracaoSegundos: 2165,
      metadadosDe: "oEmbed",
      porQue:
        "Avaliação e intervenção em linguagem escrita, que é a forma de produção onde o TDL é mais confundido com desatenção.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "tdah",
    oQueSignifica: ml(
      "O obstáculo não é produzir: é começar, sustentar e terminar. Trabalhos longos com entrega única concentram todo o risco no planejamento, que é justamente a função executiva mais frágil — e o resultado típico é a produção feita na véspera, aquém do que o aluno sabe.",
      "The obstacle is not producing: it is starting, sustaining and finishing. Long assignments with a single deadline concentrate all the risk in planning, which is precisely the most fragile executive function — and the typical result is work done the night before, below what the student knows.",
      "El obstáculo no es producir: es empezar, sostener y terminar. Los trabajos largos con entrega única concentran todo el riesgo en la planificación, que es justamente la función ejecutiva más frágil — y el resultado típico es la producción hecha la víspera, por debajo de lo que el estudiante sabe.",
    ),
    oQueFazer: ml(
      "Fatie a produção em entregas curtas com prazos próprios — esboço, primeira versão, revisão — e dê retorno em cada uma. Comece a produção em aula, com o professor presente: o primeiro parágrafo escrito em sala é o que decide se o trabalho existe.",
      "Slice the production into short deliverables with their own deadlines — outline, first version, revision — and give feedback on each. Start the production in class, with the teacher present: the first paragraph written in the room is what decides whether the work exists.",
      "Divida la producción en entregas cortas con plazos propios — esbozo, primera versión, revisión — y dé retorno en cada una. Empiece la producción en clase, con el docente presente: el primer párrafo escrito en el aula es lo que decide si el trabajo existe.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, WWC_ESCRITA_FINAIS],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=ApqSMzsGwXQ",
      titulo: "“I Can’t Focus!” When ADHD Impacts Your Child’s Math & Writing Performance",
      canal: "Help for ADHD",
      duracaoSegundos: 3281,
      metadadosDe: "oEmbed",
      porQue:
        "Trata do que acontece com o desempenho em escrita quando a atenção falha no meio da produção.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Produzir por acionador, varredura ou rastreamento custa uma sequência de operações por caractere. Um texto de trinta linhas não é trinta linhas: é milhares de acionamentos, e a fadiga chega antes do fim. O que se mede, sem ajuste, é a velocidade do acesso.",
      "Producing by switch, scanning or tracking costs a sequence of operations per character. A thirty-line text is not thirty lines: it is thousands of activations, and fatigue arrives before the end. What gets measured, unadjusted, is access speed.",
      "Producir por pulsador, barrido o seguimiento cuesta una secuencia de operaciones por carácter. Un texto de treinta líneas no son treinta líneas: son miles de activaciones, y la fatiga llega antes del final. Lo que se mide, sin ajuste, es la velocidad del acceso.",
    ),
    oQueFazer: ml(
      "Defina a extensão pelo conteúdo exigido, e não pelo número de linhas, e aceite ditado, seleção entre alternativas produzidas e resposta gravada. Configure predição de texto e atalhos antes da unidade — e conte o tempo de produção separado do tempo de pensar.",
      "Set the length by the content required, not by line count, and accept dictation, selection among produced options and recorded answers. Configure text prediction and shortcuts before the unit — and count production time separately from thinking time.",
      "Defina la extensión por el contenido exigido, y no por el número de líneas, y acepte dictado, selección entre alternativas producidas y respuesta grabada. Configure predicción de texto y atajos antes de la unidad — y cuente el tiempo de producción aparte del tiempo de pensar.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=AlmAZjfiKt0",
      titulo: "Materiais pedagógicos acessíveis | Tabuleiro de RPG | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 399,
      metadadosDe: "oEmbed",
      porQue:
        "O RPG desloca a produção da escrita à mão para a narrativa construída em grupo.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "Produzir em português escrito é produzir em segunda língua, e a avaliação costuma corrigir a estrutura como se fosse erro de conteúdo. O aluno domina o assunto e entrega um texto com marcas de interlíngua — que é o que se espera de qualquer pessoa escrevendo na segunda língua, e que aqui é lido como desconhecimento.",
      "Producing in written Portuguese is producing in a second language, and assessment usually marks the structure as if it were a content error. The student masters the subject and hands in a text with interlanguage marks — what is expected of anyone writing in a second language, and what here is read as ignorance.",
      "Producir en portugués escrito es producir en segunda lengua, y la evaluación suele corregir la estructura como si fuera error de contenido. El estudiante domina el asunto y entrega un texto con marcas de interlengua — lo que se espera de cualquiera escribiendo en segunda lengua, y que aquí se lee como desconocimiento.",
    ),
    oQueFazer: ml(
      "Aceite a produção em Libras — gravada — como demonstração legítima do conteúdo, e trate o texto escrito como objetivo de língua, com critério próprio. Quando as duas forem exigidas, avalie-as separadamente, e diga ao aluno qual está sendo avaliada em cada momento.",
      "Accept production in sign language — recorded — as legitimate demonstration of the content, and treat the written text as a language objective with its own criteria. When both are required, assess them separately, and tell the student which is being assessed when.",
      "Acepte la producción en lengua de señas — grabada — como demostración legítima del contenido, y trate el texto escrito como objetivo de lengua, con criterio propio. Cuando se exijan ambas, evalúelas por separado, y dígale al estudiante cuál se evalúa en cada momento.",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, INES],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=YZlFPxV0GA8",
      titulo: "Writing SOS: How do I encourage my deaf child to write more at home?",
      canal: "Reading Rockets",
      duracaoSegundos: 200,
      metadadosDe: "oEmbed",
      porQue:
        "Trata diretamente de fazer o aluno surdo escrever mais, que é a produção onde a distância entre Libras e português escrito aparece inteira.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "A produção aberta — \"escreva sobre\", \"faça um trabalho sobre\" — é a forma de tarefa com menos estrutura, e é justamente a estrutura que falta. O aluno sabe partes do conteúdo e não tem como organizá-las sozinho, e a folha em branco registra isso como ausência de aprendizado.",
      "Open-ended production — \"write about\", \"do a project on\" — is the least structured task shape, and structure is exactly what is missing. The student knows parts of the content and has no way to organise them alone, and the blank page records that as absence of learning.",
      "La producción abierta — \"escriba sobre\", \"haga un trabajo sobre\" — es la forma de tarea con menos estructura, y es justamente la estructura lo que falta. El estudiante sabe partes del contenido y no tiene cómo organizarlas solo, y la hoja en blanco registra eso como ausencia de aprendizaje.",
    ),
    oQueFazer: ml(
      "Dê a estrutura pronta e o conteúdo por completar: frases iniciadas, campos rotulados, sequência de perguntas curtas. Reduzir a abertura não reduz a exigência de conteúdo — e é o que permite ver o que ele sabe, em vez de ver a dificuldade de começar.",
      "Give the structure ready and the content to complete: sentence starters, labelled fields, a sequence of short questions. Reducing openness does not reduce the content demand — and it is what makes what they know visible, instead of showing the difficulty of starting.",
      "Dé la estructura lista y el contenido por completar: frases iniciadas, campos rotulados, secuencia de preguntas cortas. Reducir la apertura no reduce la exigencia de contenido — y es lo que permite ver lo que sabe, en vez de ver la dificultad de empezar.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS, WWC_ESCRITA_FINAIS],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=9KweyLv6e64",
      titulo: "Material Pedagógico Acessível (MPA) | Lata de criação de histórias | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 186,
      metadadosDe: "oEmbed",
      porQue:
        "Produção com material de baixo custo, que muda o que se aceita como evidência de aprendizado.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "Escrever cobra a ortografia, que é o outro lado da mesma dificuldade de decodificação. O aluno evita a palavra que não sabe grafar e entrega um texto mais pobre do que o seu vocabulário — e o que se avalia é a versão empobrecida pela evitação, não o que ele pensa.",
      "Writing charges spelling, which is the other side of the same decoding difficulty. The student avoids the word they cannot spell and hands in a text poorer than their vocabulary — and what gets assessed is the version impoverished by avoidance, not what they think.",
      "Escribir cobra la ortografía, que es la otra cara de la misma dificultad de decodificación. El estudiante evita la palabra que no sabe escribir y entrega un texto más pobre que su vocabulario — y lo que se evalúa es la versión empobrecida por la evitación, no lo que piensa.",
    ),
    oQueFazer: ml(
      "Libere corretor ortográfico e ditado por voz como padrão, e diga que a ortografia não conta quando o objetivo é o conteúdo. Separe as duas avaliações: texto para conteúdo, com apoio, e exercício curto de ortografia, com ensino explícito — juntar as duas empobrece as duas.",
      "Allow spellchecker and voice dictation as standard, and say that spelling does not count when the objective is content. Separate the two assessments: text for content, with support, and a short spelling exercise with explicit teaching — merging them impoverishes both.",
      "Libere corrector ortográfico y dictado por voz como estándar, y diga que la ortografía no cuenta cuando el objetivo es el contenido. Separe las dos evaluaciones: texto para contenido, con apoyo, y ejercicio corto de ortografía, con enseñanza explícita — juntarlas empobrece ambas.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY, WWC_ESCRITA_FINAIS],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=44ieGKyACTM",
      titulo: "Dyslexia Conference Recording | Note-Taking Strategies for Students with Dyslexia",
      canal: "International Dyslexia Association",
      duracaoSegundos: 3492,
      metadadosDe: "oEmbed",
      porQue:
        "Anotar em aula é produção escrita sob pressão de tempo, e é a forma de produção que a escrita disléxica menos sustenta sem estratégia.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "autismo",
    oQueSignifica: ml(
      "A produção aberta traz um critério implícito de \"o que é esperado\" que nunca é dito, e apresentar oralmente acrescenta a exigência social de olhar, ritmo e improviso. O aluno pode dominar o conteúdo e não saber o que a tarefa quer — e ninguém escreveu o que ela queria.",
      "Open production carries an implicit criterion of \"what is expected\" that never gets stated, and presenting orally adds the social demands of eye contact, pacing and improvisation. The student may master the content and not know what the task wants — and nobody wrote down what it wanted.",
      "La producción abierta trae un criterio implícito de \"lo que se espera\" que nunca se dice, y presentar oralmente agrega la exigencia social de mirada, ritmo e improvisación. El estudiante puede dominar el contenido y no saber qué quiere la tarea — y nadie escribió qué quería.",
    ),
    oQueFazer: ml(
      "Escreva o critério de avaliação em itens verificáveis e entregue-o junto com a tarefa, com um exemplo de produção que atende ao critério. Ofereça alternativas à apresentação oral para a turma inteira — gravar, apresentar a um grupo pequeno, entregar por escrito.",
      "Write the assessment criteria as verifiable items and hand them out with the task, with one example of work that meets them. Offer alternatives to whole-class oral presentation for everyone — recording, presenting to a small group, submitting in writing.",
      "Escriba el criterio de evaluación en ítems verificables y entréguelo junto con la tarea, con un ejemplo de producción que lo cumple. Ofrezca alternativas a la presentación oral para toda la clase — grabar, presentar a un grupo pequeño, entregar por escrito.",
    ),
    citations: [AFIRM_ANTECEDENTES, AFIRM_NARRATIVAS, NCAEP],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=9KweyLv6e64",
      titulo: "Material Pedagógico Acessível (MPA) | Lata de criação de histórias | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 186,
      metadadosDe: "oEmbed",
      porQue:
        "Dá à criação de história um suporte físico com começo e fim visíveis, que é o que destrava a produção quando a folha em branco paralisa.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "Produção com entrega única e pública concentra o risco num ponto e o expõe. Para um aluno com ansiedade de desempenho, o adiamento não é preguiça: é a tentativa de evitar o momento em que o trabalho será julgado — e cada dia de adiamento aumenta o custo de entregar.",
      "Production with a single, public deadline concentrates the risk in one point and exposes it. For a student with performance anxiety, postponement is not laziness: it is the attempt to avoid the moment the work gets judged — and each day of delay raises the cost of handing in.",
      "La producción con entrega única y pública concentra el riesgo en un punto y lo expone. Para un estudiante con ansiedad de desempeño, el aplazamiento no es pereza: es el intento de evitar el momento en que el trabajo será juzgado — y cada día de demora aumenta el costo de entregar.",
    ),
    oQueFazer: ml(
      "Crie pontos de entrega parcial sem nota, e deixe explícito que versão incompleta é aceita e comentada. Torne a exposição pública opcional. E responda ao que funcionou antes de apontar o que falta — em produção, a ordem do retorno decide se haverá uma próxima.",
      "Create ungraded partial checkpoints, and make explicit that an incomplete version is accepted and commented on. Make public exposure optional. And respond to what worked before pointing at what is missing — in production, the order of feedback decides whether there will be a next one.",
      "Cree puntos de entrega parcial sin nota, y deje explícito que una versión incompleta se acepta y se comenta. Haga opcional la exposición pública. Y responda a lo que funcionó antes de señalar lo que falta — en producción, el orden del retorno decide si habrá una próxima.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, OMS_ADOLESCENTE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=hOZdqFFxfAU",
      titulo: "Exam Stress",
      canal: "Anna Freud",
      duracaoSegundos: 211,
      metadadosDe: "oEmbed",
      porQue:
        "A entrega avaliada é onde a ansiedade de desempenho se materializa, e é disso que o vídeo trata.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Produzir exige manter o plano enquanto se executa, e é memória verbal de curto prazo — o ponto mais custoso descrito na literatura da síndrome. O aluno sabe o que quer dizer no começo e perde o plano no meio, entregando algo mais curto do que sabia.",
      "Producing requires holding the plan while executing, and that is short-term verbal memory — the costliest point described in the syndrome's literature. The student knows what they want to say at the start and loses the plan midway, handing in something shorter than what they knew.",
      "Producir exige mantener el plan mientras se ejecuta, y es memoria verbal a corto plazo — el punto más costoso descrito en la literatura del síndrome. El estudiante sabe qué quiere decir al comienzo y pierde el plan a mitad, entregando algo más corto de lo que sabía.",
    ),
    oQueFazer: ml(
      "Deixe o plano visível durante a produção — imagens em sequência, tópicos em cartões, esquema na mesa — e produza uma parte por vez, marcando a concluída. O apoio visual é via de força documentada, e aqui ele carrega o plano que a memória não sustenta.",
      "Keep the plan visible during production — images in sequence, topics on cards, an outline on the table — and produce one part at a time, marking off what is done. Visual support is a documented channel of strength, and here it carries the plan memory cannot hold.",
      "Deje el plan visible durante la producción — imágenes en secuencia, tópicos en tarjetas, esquema en la mesa — y produzca una parte por vez, marcando la concluida. El apoyo visual es vía de fortaleza documentada, y aquí lleva el plan que la memoria no sostiene.",
    ),
    citations: [DSE_MEMORIA, DSE_LEITURA, IES_DOWN],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=_FYa7Qo0wXg",
      titulo: "Introducing See and Learn Speech",
      canal: "Down Syndrome Education International",
      duracaoSegundos: 3557,
      metadadosDe: "oEmbed",
      porQue:
        "É sobre produção de fala, que é a forma de produção que a avaliação mais cobra e a que mais subestima este aluno.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "Produzir é possível e revisar é o que custa: reler o próprio texto por voz ou tato é sequencial, e localizar o parágrafo a mudar exige percorrer tudo de novo. Produção que pressupõe várias revisões — e boa produção pressupõe — custa aqui várias leituras completas.",
      "Producing is possible and revising is what costs: rereading one's own text by voice or touch is sequential, and locating the paragraph to change means traversing everything again. Production that presumes several revisions — and good production does — costs several full readings here.",
      "Producir es posible y revisar es lo que cuesta: releer el propio texto por voz o tacto es secuencial, y localizar el párrafo a cambiar exige recorrerlo todo de nuevo. La producción que presupone varias revisiones — y la buena producción lo presupone — cuesta aquí varias lecturas completas.",
    ),
    oQueFazer: ml(
      "Produza em ambiente digital com navegação por títulos desde o começo, e numere os parágrafos para que a revisão possa ser dirigida — \"mude o terceiro\" em vez de \"mude aquele trecho\". Dê o retorno com a referência do lugar, e não só o comentário.",
      "Produce in a digital environment with heading navigation from the start, and number the paragraphs so revision can be directed — \"change the third\" instead of \"change that bit\". Give feedback with the location reference, not just the comment.",
      "Produzca en entorno digital con navegación por títulos desde el comienzo, y numere los párrafos para que la revisión pueda dirigirse — \"cambie el tercero\" en vez de \"cambie ese fragmento\". Dé el retorno con la referencia del lugar, y no solo el comentario.",
    ),
    citations: [PATHS_TECNOLOGIA, APH_RECURSOS, CAST_UDL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=QYyMYlJAc2Y",
      titulo: "Low Vision Tools in ONE Minute: Chromebook- Select-to-Speak & Dictation",
      canal: "TSBVI Distance",
      duracaoSegundos: 60,
      metadadosDe: "oEmbed",
      porQue:
        "Select-to-Speak relê o trecho escolhido em vez do texto inteiro, que é o que torna a revisão dirigida possível quando reler por voz é sequencial.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "A produção passa pelo interveniente, e é aí que a fronteira entre a voz do aluno e a de quem transcreve se desfaz. Sem combinação prévia, o texto entregue é de autoria incerta — e ninguém consegue dizer depois qual parte foi dele.",
      "Production passes through the intervener, and that is where the line between the student's voice and the transcriber's dissolves. Without a prior agreement, the submitted text is of uncertain authorship — and afterwards nobody can say which part was theirs.",
      "La producción pasa por el interviniente, y ahí es donde la frontera entre la voz del estudiante y la de quien transcribe se deshace. Sin acuerdo previo, el texto entregado es de autoría incierta — y después nadie puede decir qué parte fue suya.",
    ),
    oQueFazer: ml(
      "Combine antes o que o interveniente faz: transcreve literalmente, pergunta para esclarecer, ou não intervém. Registre a combinação junto da tarefa. E prefira produções curtas e frequentes a uma longa — o custo de transmissão torna a revisão de texto longo inviável.",
      "Agree beforehand what the intervener does: transcribes literally, asks to clarify, or does not intervene. Record the agreement with the task. And prefer short, frequent productions to one long piece — transmission cost makes revising a long text unviable.",
      "Acuerde antes qué hace el interviniente: transcribe literalmente, pregunta para aclarar, o no interviene. Registre el acuerdo junto a la tarea. Y prefiera producciones cortas y frecuentes a una larga — el costo de transmisión vuelve inviable revisar un texto largo.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, CADEAFBLIND_INTERVENTOR, NCDB_MOODLE],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=LCAUnodVW04",
      titulo: "Tania Signs Daily Tactile Calendar",
      canal: "TSBVI Distance",
      duracaoSegundos: 148,
      metadadosDe: "oEmbed",
      porQue:
        "É a aluna produzindo com o adulto ao lado, que é a cena exata em que a fronteira entre a voz dela e a de quem transcreve se decide.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "Quando a produção exigida é quantitativa — relatório com dados, gráfico próprio, memorial de cálculo —, o aluno é avaliado duas vezes pela mesma dificuldade: no conteúdo e na forma de apresentá-lo. E o registro do cálculo, que é onde a discalculia mais aparece, costuma valer mais que a conclusão.",
      "When the required production is quantitative — a report with data, a chart of one's own, a calculation record — the student is assessed twice for the same difficulty: in the content and in how it is presented. And the calculation record, where dyscalculia shows most, usually counts for more than the conclusion.",
      "Cuando la producción exigida es cuantitativa — informe con datos, gráfico propio, memoria de cálculo —, el estudiante es evaluado dos veces por la misma dificultad: en el contenido y en la forma de presentarlo. Y el registro del cálculo, donde más aparece la discalculia, suele valer más que la conclusión.",
    ),
    oQueFazer: ml(
      "Ofereça o modelo do registro já estruturado — tabela com colunas rotuladas, gráfico com eixos prontos — e libere calculadora quando o objetivo for a interpretação. Avalie a conclusão e o raciocínio separadamente da execução aritmética.",
      "Offer the record's model already structured — a table with labelled columns, a chart with axes ready — and allow a calculator when interpretation is the objective. Assess the conclusion and the reasoning separately from arithmetic execution.",
      "Ofrezca el modelo del registro ya estructurado — tabla con columnas rotuladas, gráfico con ejes listos — y libere la calculadora cuando el objetivo sea la interpretación. Evalúe la conclusión y el razonamiento por separado de la ejecución aritmética.",
    ),
    citations: [WWC_RESOLUCAO, NCII_MATEMATICA, WWC_MATEMATICA_2021],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=8yW0wID_h9Y",
      titulo: "Video Example: A student independently solves an addition problem with fractions",
      canal: "National Center on Intensive Intervention",
      duracaoSegundos: 255,
      metadadosDe: "oEmbed",
      porQue:
        "É o aluno resolvendo sozinho com o registro do cálculo à vista, que é a forma de produção pela qual a discalculia acaba avaliada duas vezes.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "producao-do-aluno",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "Aqui a exigência é a mais bem-vinda da linha: produzir é onde este aluno finalmente decide alguma coisa. O risco é a produção vir com formato tão fechado que só reste executar — e a tarefa aberta, que seria a chance, ser a que menos aparece no currículo.",
      "Here the demand is the row's most welcome: producing is where this student finally decides something. The risk is production arriving in a format so closed that only execution is left — and the open task, which would be the chance, being the rarest in the curriculum.",
      "Aquí la exigencia es la más bienvenida de la fila: producir es donde este estudiante finalmente decide algo. El riesgo es que la producción venga con formato tan cerrado que solo quede ejecutar — y que la tarea abierta, que sería la oportunidad, sea la que menos aparece en el currículo.",
    ),
    oQueFazer: ml(
      "Deixe o formato em aberto e negocie o produto: o critério é o conteúdo demonstrado, não o gênero entregue. Exija público real — alguém fora da turma que leia ou assista —, porque é o destinatário, e não a nota, que sustenta o trabalho de quem já domina o conteúdo.",
      "Leave the format open and negotiate the product: the criterion is the content demonstrated, not the genre submitted. Require a real audience — someone outside the class who reads or watches — because it is the recipient, not the grade, that sustains work by someone who already masters the content.",
      "Deje el formato abierto y negocie el producto: el criterio es el contenido demostrado, no el género entregado. Exija público real — alguien fuera de la clase que lea o vea —, porque es el destinatario, y no la nota, lo que sostiene el trabajo de quien ya domina el contenido.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, UCONN_SEM, NAGC],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=rmpZrFXssJo",
      titulo: "NAGC Corner Chat, How Children Show Their Creative Potential",
      canal: "nagcgifted",
      duracaoSegundos: 716,
      metadadosDe: "oEmbed",
      porQue:
        "Trata de como o potencial criativo aparece no que a criança produz, que é onde este aluno mostra o que a prova não capta.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },

  // === pratica-concreta ======================================================
  {
    exigencia: "pratica-concreta",
    especialidade: "deficiencia-fisica",
    oQueSignifica: ml(
      "Esta é a exigência em que a exclusão acontece de forma mais visível e menos discutida: a bancada é alta, a pipeta pede pinça fina, a atividade pressupõe ficar de pé. O aluno costuma receber o papel de anotar o que os colegas fazem — e anotar não é a prática que o conteúdo exigia.",
      "This is the demand where exclusion happens most visibly and is least discussed: the bench is high, the pipette needs a fine pinch, the activity presumes standing. The student usually gets the role of writing down what classmates do — and writing down is not the practice the content required.",
      "Esta es la exigencia donde la exclusión ocurre de forma más visible y menos discutida: la mesada es alta, la pipeta pide pinza fina, la actividad presupone estar de pie. El estudiante suele recibir el papel de anotar lo que hacen los compañeros — y anotar no es la práctica que el contenido exigía.",
    ),
    oQueFazer: ml(
      "Redesenhe a atividade, e não o papel do aluno: altura de bancada ajustável, material com pegada ampliada, montagem prévia das partes que exigem precisão fina. Quando uma etapa não for possível, distribua-a entre todos por rodízio — assim ninguém fica com o papel de observador permanente.",
      "Redesign the activity, not the student's role: adjustable bench height, materials with enlarged grips, pre-assembly of the parts requiring fine precision. When a step is not possible, rotate it among everyone — so nobody ends up as the permanent observer.",
      "Rediseñe la actividad, y no el papel del estudiante: altura de mesada ajustable, material con agarre ampliado, montaje previo de las partes que exigen precisión fina. Cuando una etapa no sea posible, distribúyala entre todos por rotación — así nadie queda con el papel de observador permanente.",
    ),
    citations: [CAST_UDL, TIES_PARTICIPACAO],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=koNRX40dI1I",
      titulo: "Materiais pedagógicos acessíveis | Mancala Acessível | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 378,
      metadadosDe: "oEmbed",
      porQue:
        "Mancala adaptado para que a atividade prática caiba no alcance e no acionamento possíveis.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "deficiencia-visual",
    oQueSignifica: ml(
      "Muita prática é acessível e uma parte é perigosa sem adaptação — fogo, vidro, reagente. O risco é a escola resolver por exclusão: o aluno assiste, ou faz a parte segura. E a prática concreta é justamente onde ele teria acesso direto ao fenômeno, sem depender de descrição.",
      "Much practice is accessible and some is dangerous without adaptation — flame, glass, reagents. The risk is the school resolving it by exclusion: the student watches, or does the safe part. And hands-on practice is exactly where they would have direct access to the phenomenon, with no description in between.",
      "Mucha práctica es accesible y una parte es peligrosa sin adaptación — fuego, vidrio, reactivo. El riesgo es que la escuela lo resuelva por exclusión: el estudiante mira, o hace la parte segura. Y la práctica concreta es justamente donde tendría acceso directo al fenómeno, sin depender de descripción.",
    ),
    oQueFazer: ml(
      "Substitua o que sinaliza por visão por sinal tátil ou sonoro — termômetro falante, balança com voz, marcação em relevo nas vidrarias — e faça o reconhecimento tátil da bancada antes de começar. Prefira reação com mudança de temperatura ou de cheiro à que só muda de cor.",
      "Replace what signals visually with tactile or audible signals — talking thermometer, speaking scale, raised marking on glassware — and do a tactile survey of the bench before starting. Prefer a reaction with a temperature or smell change over one that only changes colour.",
      "Sustituya lo que señaliza por visión con señal táctil o sonora — termómetro parlante, balanza con voz, marcación en relieve en el vidrio — y haga el reconocimiento táctil de la mesada antes de empezar. Prefiera reacción con cambio de temperatura o de olor a la que solo cambia de color.",
    ),
    citations: [PATHS_BRAILLE, APH_RECURSOS, CAST_UDL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=U0QnLUoeLw4",
      titulo: "Ciência Sem Limites| Ensino de física para deficientes visuais",
      canal: "TV Unesp",
      duracaoSegundos: 1509,
      metadadosDe: "oEmbed",
      porQue:
        "Kit construído pelos próprios colegas para que o experimento de física aconteça pelo tato.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "autismo",
    oQueSignifica: ml(
      "A prática concreta é imprevisível por natureza — barulho, cheiro, textura, mudança de sala — e é isso, e não a tarefa, que costuma derrubar. O aluno pode dominar o procedimento e não conseguir entrar no ambiente em que ele acontece.",
      "Hands-on practice is unpredictable by nature — noise, smell, texture, room change — and that, not the task, is what usually defeats. The student may master the procedure and be unable to enter the environment where it happens.",
      "La práctica concreta es imprevisible por naturaleza — ruido, olor, textura, cambio de sala — y es eso, y no la tarea, lo que suele derribar. El estudiante puede dominar el procedimiento y no lograr entrar en el ambiente donde ocurre.",
    ),
    oQueFazer: ml(
      "Antecipe o ambiente antes da aula: fotos do laboratório, o que vai cheirar, o que vai fazer barulho, quanto tempo dura. Dê a sequência escrita e mantenha-a à vista durante a prática. Permita luva ou pinça quando a textura for o obstáculo — evitar o toque não é evitar o conteúdo.",
      "Preview the environment before the lesson: photos of the lab, what will smell, what will make noise, how long it lasts. Give the written sequence and keep it in sight during the practice. Allow gloves or tongs when texture is the obstacle — avoiding the touch is not avoiding the content.",
      "Anticipe el ambiente antes de la clase: fotos del laboratorio, qué olerá, qué hará ruido, cuánto dura. Dé la secuencia escrita y manténgala a la vista durante la práctica. Permita guante o pinza cuando la textura sea el obstáculo — evitar el tacto no es evitar el contenido.",
    ),
    citations: [AFIRM_ANTECEDENTES, AFIRM_ANALISE_DE_TAREFA, NCAEP],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=FDN5yHbgYfA",
      titulo: "Materiais pedagógicos acessíveis | Caixa de Instrumentos Musicais | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 403,
      metadadosDe: "oEmbed",
      porQue:
        "Material sonoro construído para sustentar escuta e concentração na atividade prática, em vez de a atividade virar excesso sensorial.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "deficiencia-intelectual",
    oQueSignifica: ml(
      "Aqui a exigência joga a favor: o concreto é a via mais direta ao conceito abstrato, e a prática costuma ser onde este aluno mais aprende da unidade. O risco é a prática virar demonstração — o professor faz e a turma assiste —, e aí a via de força é fechada justamente para quem mais dependia dela.",
      "Here the demand plays in favour: the concrete is the most direct route to the abstract concept, and practice is usually where this student learns most in the unit. The risk is practice turning into demonstration — the teacher does and the class watches — closing the channel of strength precisely for whoever depended on it most.",
      "Aquí la exigencia juega a favor: lo concreto es la vía más directa al concepto abstracto, y la práctica suele ser donde este estudiante más aprende de la unidad. El riesgo es que la práctica se vuelva demostración — el docente hace y la clase mira —, cerrando la vía de fortaleza justo para quien más dependía de ella.",
    ),
    oQueFazer: ml(
      "Garanta que ele execute, e não observe. Divida a prática em passos curtos com um resultado visível em cada um, e repita a mesma prática mais de uma vez ao longo da unidade — a repetição com material é o que consolida, e ela quase nunca está no plano.",
      "Ensure they execute, not observe. Split the practice into short steps with a visible result at each, and repeat the same practice more than once across the unit — repetition with materials is what consolidates, and it is almost never in the plan.",
      "Garantice que ejecute, y no que observe. Divida la práctica en pasos cortos con un resultado visible en cada uno, y repita la misma práctica más de una vez a lo largo de la unidad — la repetición con material es lo que consolida, y casi nunca está en el plan.",
    ),
    citations: [NCIL_DEFICIENCIA_INTELECTUAL, PROMOTING_PROGRESS, CAST_UDL],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=7E2ltdXw1Bw",
      titulo: "Materiais pedagógicos acessíveis | Célula Tátil - Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 260,
      metadadosDe: "oEmbed",
      porQue:
        "A célula tátil põe na mão a estrutura que a aula normalmente só descreve.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "tdah",
    oQueSignifica: ml(
      "A prática é a forma de tarefa que este aluno costuma sustentar melhor — há ação, resultado imediato e movimento. O risco é o oposto do das outras exigências: o ambiente com muitos estímulos e a espera entre etapas, que é onde a atenção se solta e o material vira brinquedo.",
      "Practice is the task shape this student usually sustains best — there is action, immediate result and movement. The risk is the inverse of the other demands: an environment with many stimuli and the waiting between steps, where attention slips and the material becomes a toy.",
      "La práctica es la forma de tarea que este estudiante suele sostener mejor — hay acción, resultado inmediato y movimiento. El riesgo es el opuesto al de las otras exigencias: el ambiente con muchos estímulos y la espera entre etapas, donde la atención se suelta y el material se vuelve juguete.",
    ),
    oQueFazer: ml(
      "Entregue o material etapa por etapa, e não tudo de uma vez no começo. Dê função explícita durante os tempos de espera — cronometrar, registrar, conferir — porque é o intervalo sem tarefa, e não a tarefa, que produz o problema.",
      "Hand out the material step by step, not all at once at the start. Give an explicit role during waiting times — timing, recording, checking — because it is the taskless interval, not the task, that produces the problem.",
      "Entregue el material etapa por etapa, y no todo de una vez al comienzo. Dé función explícita durante los tiempos de espera — cronometrar, registrar, verificar — porque es el intervalo sin tarea, y no la tarea, lo que produce el problema.",
    ),
    citations: [UNDERSTOOD_TDAH, CDC_TDAH, PMC_TDAH_REVISAO],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=LApNRgeMyf8",
      titulo: "Teacher Tip: How Proximity and Movement Improve Attention in Students with ADHD",
      canal: "Help for ADHD",
      duracaoSegundos: 169,
      metadadosDe: "oEmbed",
      porQue:
        "Mostra como proximidade e movimento sustentam a atenção na atividade prática, em vez de a atividade prática virar dispersão.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "sindrome-de-down",
    oQueSignifica: ml(
      "Material manipulável é via de força documentada, e a prática costuma ser a melhor aula da unidade. A ressalva é a instrução: sequências longas ditas oralmente não se sustentam, e o aluno executa bem o passo que ouviu por último.",
      "Manipulable material is a documented channel of strength, and practice is usually the unit's best lesson. The caveat is the instruction: long sequences delivered orally do not hold, and the student executes well the step they heard last.",
      "El material manipulable es vía de fortaleza documentada, y la práctica suele ser la mejor clase de la unidad. La salvedad es la instrucción: las secuencias largas dichas oralmente no se sostienen, y el estudiante ejecuta bien el paso que oyó último.",
    ),
    oQueFazer: ml(
      "Dê a instrução em imagens, um passo por cartão, e deixe a sequência na mesa durante a prática. Aproveite a exigência para ancorar o conceito abstrato da unidade — o que foi feito com as mãos é o que fica disponível quando o símbolo voltar.",
      "Give the instruction in images, one step per card, and leave the sequence on the table during the practice. Use the demand to anchor the unit's abstract concept — what was done with the hands is what stays available when the symbol returns.",
      "Dé la instrucción en imágenes, un paso por tarjeta, y deje la secuencia en la mesa durante la práctica. Aproveche la exigencia para anclar el concepto abstracto de la unidad — lo hecho con las manos es lo que queda disponible cuando el símbolo vuelva.",
    ),
    citations: [DSE_LEITURA, IES_DOWN, DSRF_LEITURA],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=0W-_gL3xaDU",
      titulo: "Materiais Pedagógicos Acessíveis | Fogão Musical | Libras e Audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 369,
      metadadosDe: "oEmbed",
      porQue:
        "Material sonoro operado com as mãos, que sustenta a atividade prática sem depender de instrução verbal retida.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "deficiencia-auditiva",
    oQueSignifica: ml(
      "A prática é favorável — se vê o que acontece — e o obstáculo é a instrução dada de costas, enquanto o professor manipula o material. O aluno não pode olhar as mãos e o intérprete ao mesmo tempo, e é exatamente isso que a demonstração pede.",
      "Practice is favourable — one sees what happens — and the obstacle is instruction given with the back turned, while the teacher handles the material. The student cannot watch the hands and the interpreter at once, and that is exactly what a demonstration asks.",
      "La práctica es favorable — se ve lo que ocurre — y el obstáculo es la instrucción dada de espaldas, mientras el docente manipula el material. El estudiante no puede mirar las manos y al intérprete a la vez, y eso es justamente lo que pide la demostración.",
    ),
    oQueFazer: ml(
      "Separe explicar de demonstrar: explique de frente, com o material parado, e só então demonstre em silêncio. Deixe a sequência escrita ou em imagens na bancada, para que ele não dependa de olhar duas coisas ao mesmo tempo.",
      "Separate explaining from demonstrating: explain facing the class with the material still, and only then demonstrate in silence. Leave the sequence written or in images on the bench, so they need not watch two things at once.",
      "Separe explicar de demostrar: explique de frente, con el material quieto, y solo entonces demuestre en silencio. Deje la secuencia escrita o en imágenes en la mesada, para que no dependa de mirar dos cosas a la vez.",
    ),
    citations: [INES_DEBASI, INES_MATERIAIS, CAST_UDL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=r3zMxkn5K-g",
      titulo: "Materiais pedagógicos acessíveis | Librando | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 329,
      metadadosDe: "oEmbed",
      porQue:
        "Material construído para a aprendizagem de Libras acontecer com objeto na mão, e não por instrução oral traduzida.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "surdocegueira",
    oQueSignifica: ml(
      "Esta é a exigência com mais potencial e mais preparo: o tátil é o canal principal deste aluno, e a prática concreta é onde o conteúdo pode chegar sem intermediação verbal. Mas a segurança e o vocabulário do que será tocado precisam ter sido combinados antes — e improvisar aqui é arriscado, não só ineficaz.",
      "This is the demand with the most potential and the most preparation: touch is this student's main channel, and hands-on practice is where content can arrive without verbal mediation. But the safety and the vocabulary of what will be touched must have been agreed beforehand — and improvising here is risky, not merely ineffective.",
      "Esta es la exigencia con más potencial y más preparación: lo táctil es el canal principal de este estudiante, y la práctica concreta es donde el contenido puede llegar sin intermediación verbal. Pero la seguridad y el vocabulario de lo que se tocará deben haberse acordado antes — e improvisar aquí es arriesgado, no solo ineficaz.",
    ),
    oQueFazer: ml(
      "Faça o reconhecimento tátil da bancada e do material com o interveniente antes da aula, combinando o sinal de cada objeto e o sinal de parada. Prefira materiais de temperatura e textura contrastantes, e planeje tempo de exploração — a prática tátil é mais lenta e mais rica, e o plano precisa comportar as duas coisas.",
      "Do the tactile survey of bench and materials with the intervener before the lesson, agreeing the sign for each object and the stop signal. Prefer materials with contrasting temperature and texture, and plan exploration time — tactile practice is slower and richer, and the plan must accommodate both.",
      "Haga el reconocimiento táctil de la mesada y el material con el interviniente antes de la clase, acordando la seña de cada objeto y la seña de parada. Prefiera materiales de temperatura y textura contrastantes, y planifique tiempo de exploración — la práctica táctil es más lenta y más rica, y el plan debe contemplar ambas cosas.",
    ),
    citations: [PATHS_SURDOCEGUEIRA, CADEAFBLIND_INTERVENTOR, NCDB_MOODLE],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=67sVA0f6YfM",
      titulo: "Deep Dive Into The Manipulatives Checklist Webinar",
      canal: "Perkins School for the Blind",
      duracaoSegundos: 5630,
      metadadosDe: "oEmbed",
      porQue:
        "Percorre a escolha de material manipulável, que é a via de acesso ao conteúdo quando nem visão nem audição sustentam a atividade.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "discalculia",
    oQueSignifica: ml(
      "O material concreto é a base do ensino de matemática com mais respaldo em intervenção, e aqui ele não é recurso infantilizado: é a etapa que dá sentido ao símbolo. O erro comum é retirá-lo cedo demais, quando o aluno acerta com o material — e acertar com o material é justamente o sinal de que ainda não é hora.",
      "Concrete material is the best-supported base of mathematics intervention, and here it is not an infantilising resource: it is the step that gives the symbol meaning. The common error is removing it too early, when the student succeeds with the material — and succeeding with the material is precisely the sign that it is not yet time.",
      "El material concreto es la base del enseño de matemática con más respaldo en intervención, y aquí no es un recurso infantilizado: es la etapa que da sentido al símbolo. El error común es retirarlo demasiado pronto, cuando el estudiante acierta con el material — y acertar con el material es justamente la señal de que aún no es momento.",
    ),
    oQueFazer: ml(
      "Mantenha o material disponível até que o aluno deixe de recorrer a ele por conta própria, e faça a ponte explícita: mesma situação com o material, com o desenho e com o símbolo, na mesma aula. Retirar por idade ou por série é o que quebra a sequência.",
      "Keep the material available until the student stops reaching for it on their own, and make the bridge explicit: the same situation with material, with drawing and with symbol, in the same lesson. Removing it by age or grade is what breaks the sequence.",
      "Mantenga el material disponible hasta que el estudiante deje de recurrir a él por sí mismo, y haga el puente explícito: misma situación con el material, con el dibujo y con el símbolo, en la misma clase. Retirarlo por edad o por grado es lo que rompe la secuencia.",
    ),
    citations: [WWC_MATEMATICA_2021, NCII_MATEMATICA, WWC_RESOLUCAO],
    evidence: "established",
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=2fT-aKeyJlk",
      titulo: "Fixit with Karen - Bridging 10 to Subtract a Single Digit",
      canal: "The Dyscalculia Network",
      duracaoSegundos: 410,
      metadadosDe: "oEmbed",
      porQue:
        "Ensina a subtração por decomposição com material na mão, em vez de pela regra escrita.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "dislexia",
    oQueSignifica: ml(
      "A prática costuma ser a aula em que este aluno não é penalizado pela leitura — e o roteiro escrito do experimento devolve o obstáculo pela porta dos fundos. Ele erra a etapa porque leu errado o passo três, e o erro é registrado como falha de procedimento.",
      "Practice is usually the lesson where this student is not penalised for reading — and the written experiment protocol brings the obstacle back through the side door. They get the step wrong because they misread step three, and the error is recorded as a procedural failure.",
      "La práctica suele ser la clase donde este estudiante no es penalizado por la lectura — y el guion escrito del experimento devuelve el obstáculo por la puerta trasera. Se equivoca en la etapa porque leyó mal el paso tres, y el error se registra como falla de procedimiento.",
    ),
    oQueFazer: ml(
      "Dê o roteiro em imagens numeradas, com o texto curto ao lado, e leia a sequência em voz alta antes de começar. Aproveite a aula prática como o momento em que o conteúdo entra por outro canal — e não repita ali a mesma exigência de leitura da aula anterior.",
      "Give the protocol as numbered images with short text alongside, and read the sequence aloud before starting. Use the practical lesson as the moment content enters through another channel — and do not repeat there the same reading demand as the previous lesson.",
      "Dé el guion en imágenes numeradas, con el texto corto al lado, y lea la secuencia en voz alta antes de empezar. Aproveche la clase práctica como el momento en que el contenido entra por otro canal — y no repita allí la misma exigencia de lectura de la clase anterior.",
    ),
    citations: [READING_ROCKETS_SL, NCIL_STRUCTURED_LITERACY, NCIL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=gVNQ7WkN_eY",
      titulo: "Sound Walls - Making the Speech to Print Connection",
      canal: "International Dyslexia Association",
      duracaoSegundos: 642,
      metadadosDe: "oEmbed",
      porQue:
        "A parede de sons é material fixo na sala, consultado e manipulado, que dá apoio físico à correspondência entre som e letra.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "transtorno-de-linguagem",
    oQueSignifica: ml(
      "A prática é favorável na execução e cobra na hora de relatar: o aluno faz o experimento corretamente e não consegue dizer o que observou. Como a avaliação da prática costuma ser o relatório, o que se registra é que ele não entendeu — quando ele entendeu e não descreveu.",
      "Practice is favourable in execution and charges when it is time to report: the student runs the experiment correctly and cannot say what they observed. Since practice is usually assessed by the report, what gets recorded is that they did not understand — when they understood and did not describe.",
      "La práctica es favorable en la ejecución y cobra a la hora de relatar: el estudiante hace el experimento correctamente y no logra decir qué observó. Como la evaluación de la práctica suele ser el informe, lo que se registra es que no entendió — cuando entendió y no describió.",
    ),
    oQueFazer: ml(
      "Ofereça o vocabulário da observação antes da prática, afixado — mudou de cor, aqueceu, formou bolhas — e aceite o registro por fotografia com legenda escolhida entre as expressões dadas. Escolher entre descrições mostra o que ele observou; produzi-las mede a linguagem.",
      "Offer the observation vocabulary before the practice, posted — changed colour, warmed, formed bubbles — and accept a photographic record with a caption chosen among the given expressions. Choosing among descriptions shows what they observed; producing them measures language.",
      "Ofrezca el vocabulario de la observación antes de la práctica, fijado — cambió de color, se calentó, formó burbujas — y acepte el registro por fotografía con leyenda elegida entre las expresiones dadas. Elegir entre descripciones muestra qué observó; producirlas mide el lenguaje.",
    ),
    citations: [ASHA, PMC_TDL_LEITURA, DLD_PROJECT],
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "saude-mental",
    oQueSignifica: ml(
      "A prática costuma ser em grupo, em outro espaço e com resultado visível a todos — três coisas que, para um aluno com ansiedade social ou em sofrimento, pesam mais que o conteúdo. Errar o experimento na frente da turma é o tipo de exposição que decide se ele vai à próxima aula prática.",
      "Practice is usually in groups, in another space and with a result visible to everyone — three things that, for a student with social anxiety or in distress, weigh more than the content. Getting the experiment wrong in front of the class is the kind of exposure that decides whether they come to the next practical lesson.",
      "La práctica suele ser en grupo, en otro espacio y con resultado visible para todos — tres cosas que, para un estudiante con ansiedad social o en sufrimiento, pesan más que el contenido. Equivocar el experimento frente a la clase es el tipo de exposición que decide si irá a la próxima clase práctica.",
    ),
    oQueFazer: ml(
      "Defina os grupos antes, e não por escolha na hora. Diga de antemão que resultado inesperado é resultado, e não erro — em experimento, isso é verdade e quase nunca é dito. Ofereça um papel definido dentro do grupo, para que participar não dependa de se impor.",
      "Set the groups beforehand, not by picking on the spot. Say upfront that an unexpected result is a result, not a mistake — in experiments this is true and almost never said. Offer a defined role within the group, so participating does not depend on asserting oneself.",
      "Defina los grupos antes, y no por elección en el momento. Diga de antemano que un resultado inesperado es resultado, y no error — en un experimento eso es verdad y casi nunca se dice. Ofrezca un papel definido dentro del grupo, para que participar no dependa de imponerse.",
    ),
    citations: [CDC_SAUDE_MENTAL, CDC_SAUDE_MENTAL_AULA, CAST_UDL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=NvyktxmjTA8",
      titulo: "Creating a Safe Environment in Schools",
      canal: "Anna Freud",
      duracaoSegundos: 180,
      metadadosDe: "oEmbed",
      porQue:
        "Atividade prática é exposta e coletiva; sem ambiente seguro, ela vira o momento em que o aluno se retira.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "disgrafia",
    oQueSignifica: ml(
      "A execução costuma ser acessível, e o relatório é o que devolve a barreira. Além disso, algumas práticas exigem precisão fina de mão parecida com a do traçado — verter sem derramar, montar peça pequena — e é a mesma dificuldade aparecendo com outro nome.",
      "Execution is usually accessible, and the report is what brings the barrier back. Beyond that, some practices require fine hand precision similar to handwriting's — pouring without spilling, assembling a small part — and it is the same difficulty appearing under another name.",
      "La ejecución suele ser accesible, y el informe es lo que devuelve la barrera. Además, algunas prácticas exigen precisión fina de mano parecida a la del trazo — verter sin derramar, montar una pieza pequeña — y es la misma dificultad apareciendo con otro nombre.",
    ),
    oQueFazer: ml(
      "Aceite o registro por foto, áudio ou formulário com campos curtos, e reserve o relatório escrito para quando ele for o objetivo declarado. Nas etapas de precisão fina, ofereça suporte — funil, pinça de pegada larga, apoio — em vez de trocar o papel do aluno na atividade.",
      "Accept a record by photo, audio or a form with short fields, and reserve the written report for when it is the declared objective. In fine-precision steps, offer support — a funnel, wide-grip tongs, a rest — instead of changing the student's role in the activity.",
      "Acepte el registro por foto, audio o formulario con campos cortos, y reserve el informe escrito para cuando sea el objetivo declarado. En las etapas de precisión fina, ofrezca soporte — embudo, pinza de agarre ancho, apoyo — en vez de cambiar el papel del estudiante en la actividad.",
    ),
    citations: [WWC_ESCRITA_FINAIS, READING_ROCKETS_ESCRITA, CAST_UDL],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=KVf51TojK1U",
      titulo: "The Different Types of Pencil Grips for Kids",
      canal: "Understood",
      duracaoSegundos: 143,
      metadadosDe: "oEmbed",
      porQue:
        "Compara adaptadores de lápis — material na mão do aluno, que é o que muda a atividade prática para quem escreve com esforço.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
  {
    exigencia: "pratica-concreta",
    especialidade: "altas-habilidades",
    oQueSignifica: ml(
      "A prática com roteiro fechado é, para este aluno, a atividade menos interessante da unidade: o resultado é conhecido de antemão e o trabalho é executar. É onde o desinteresse mais aparece, justamente na aula que a turma acha mais divertida.",
      "Scripted practice is, for this student, the unit's least interesting activity: the result is known in advance and the work is execution. It is where disengagement shows most, precisely in the lesson the class finds most fun.",
      "La práctica con guion cerrado es, para este estudiante, la actividad menos interesante de la unidad: el resultado se conoce de antemano y el trabajo es ejecutar. Es donde más aparece el desinterés, justamente en la clase que la clase encuentra más divertida.",
    ),
    oQueFazer: ml(
      "Abra a variável: em vez do roteiro, dê a pergunta e deixe que ele planeje o procedimento, com o material disponível declarado. Peça a previsão antes e a explicação da diferença depois — investigar é o que a prática pode ser, e o roteiro fechado é o que ela virou.",
      "Open the variable: instead of the protocol, give the question and let them plan the procedure, with the available materials declared. Ask for the prediction before and the explanation of the difference after — investigating is what practice can be, and the closed protocol is what it became.",
      "Abra la variable: en lugar del guion, dé la pregunta y deje que planifique el procedimiento, con el material disponible declarado. Pida la previsión antes y la explicación de la diferencia después — investigar es lo que la práctica puede ser, y el guion cerrado es en lo que se convirtió.",
    ),
    citations: [ERIC_ENRIQUECIMENTO, UCONN_SEM, NAGC],
    videoFormativo: {
      url: "https://www.youtube.com/watch?v=UQ5Yu4-83qU",
      titulo: "Materiais pedagógicos acessíveis | Caminho Sustentável | Libras e audiodescrição",
      canal: "Instituto Rodrigo Mendes",
      duracaoSegundos: 369,
      metadadosDe: "oEmbed",
      porQue:
        "Material interativo aberto, em que a atividade prática deixa de ter teto e passa a ser onde este aluno ainda encontra desafio.",
      revisado: true,
      revisadoPor: "felipe067GG — aprovação em bloco da matriz, sem visionamento individual",
      revisadoEm: "2026-08-11",
    },
  },
]

/** As células escritas para uma especialidade, entre as exigências que o conteúdo declara. */
export function celulasDeConteudo(exigencias: readonly string[], especialidade: string): CelulaDeConteudo[] {
  return MATRIZ_DE_CONTEUDOS.filter(
    (c) => c.especialidade === especialidade && exigencias.includes(c.exigencia),
  )
}

/**
 * Quantos pares têm célula, de quantos possíveis — e quais especialidades ainda
 * não têm nenhuma.
 *
 * Mesma convenção do `coberturaDaMatriz()` das questões: lacuna precisa
 * aparecer, porque especialidade sem célula é indistinguível, na tela, de
 * especialidade para a qual nenhuma exigência importa.
 */
export function coberturaDeConteudos(especialidades: readonly string[], exigencias: readonly string[]) {
  const escritas = new Set(MATRIZ_DE_CONTEUDOS.map((c) => `${c.exigencia}|${c.especialidade}`))
  const semNenhuma = especialidades.filter((e) => !MATRIZ_DE_CONTEUDOS.some((c) => c.especialidade === e))

  return {
    escritas: escritas.size,
    total: especialidades.length * exigencias.length,
    especialidadesSemCelula: semNenhuma,
  }
}
