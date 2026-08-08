import type { Citation, SpecialtyData, Translate } from "@/components/specialty/types"
import { ml, mlList } from "@/lib/i18n-content"
import { withCommonCourses, withCommonResources } from "./shared"

/**
 * Conteúdo de Deficiência Visual — migrado para o padrão verificado.
 *
 * Fontes de referência da área: Paths to Literacy (comunidade de prática
 * mantida com a Perkins School for the Blind e o TSBVI) e a American Printing
 * House for the Blind, além dos fascículos do MEC.
 *
 * Nota sobre verificação: a perkins.org responde 403 ao verificador automático
 * (bloqueio de robô). O mantenedor abriu a página no navegador e confirmou em
 * 08/08/2026, então ela entra com exceção registrada em
 * `scripts/check-links.mjs` — só o endereço confirmado, não o site inteiro.
 */

const PATHS: Citation = {
  label: "Paths to Literacy — comunidade de prática em letramento para cegueira e baixa visão",
  url: "https://www.pathstoliteracy.org/",
}

const PATHS_BRAILLE: Citation = {
  label: "Paths to Literacy — braille: estratégias, pré-braille e gráficos táteis",
  url: "https://www.pathstoliteracy.org/braille/",
}

const APH: Citation = {
  label: "American Printing House for the Blind — recursos para educadores",
  url: "https://www.aph.org/resources/",
}

const APH_EDU: Citation = {
  label: "American Printing House — recursos educacionais",
  url: "https://www.aph.org/educational-resources/",
}

const PATHS_TECH: Citation = {
  label: "Paths to Literacy — tecnologia para alunos cegos e com baixa visão",
  url: "https://www.pathstoliteracy.org/technology/",
}

const UDL: Citation = {
  label: "CAST — Diretrizes do Desenho Universal para a Aprendizagem",
  url: "https://udlguidelines.cast.org/",
}

const BASICO = ml("Básico", "Basic", "Básico")
const INTERMEDIARIO = ml("Intermediário", "Intermediate", "Intermedio")

export function deficienciaVisualData(_t: Translate): SpecialtyData {
  const strategies = [
    {
      title: ml("Descrição verbal do visual", "Verbal description of visual content", "Descripción verbal de lo visual"),
      description: ml(
        "Narrar em voz alta tudo que está sendo mostrado ou escrito. É a adaptação de maior alcance e menor custo em sala comum.",
        "Say out loud everything being shown or written. It is the highest-reach, lowest-cost adaptation in a mainstream classroom.",
        "Narrar en voz alta todo lo que se muestra o escribe. Es la adaptación de mayor alcance y menor costo en el aula común.",
      ),
      tips: mlList(
        [
          "Leia em voz alta tudo que escrever no quadro, enquanto escreve",
          "Descreva a imagem pelo que ela informa, não pela aparência",
          "Evite 'aqui', 'ali', 'este': diga o nome do objeto ou a posição",
          "Chame o aluno pelo nome antes de dirigir a fala a ele",
        ],
        [
          "Read aloud everything you write on the board, as you write it",
          "Describe an image by what it conveys, not by how it looks",
          "Avoid 'here', 'there', 'this one': say the object's name or its position",
          "Say the student's name before addressing them",
        ],
        [
          "Lea en voz alta todo lo que escriba en el pizarrón, mientras escribe",
          "Describa la imagen por lo que informa, no por su apariencia",
          "Evite 'aquí', 'allí', 'este': diga el nombre del objeto o la posición",
          "Llame al alumno por su nombre antes de dirigirle la palabra",
        ],
      ),
      evidence: "established" as const,
      citations: [PATHS, UDL],
      difficulty: BASICO,
    },
    {
      title: ml("Recursos táteis e gráficos em relevo", "Tactile resources and raised graphics", "Recursos táctiles y gráficos en relieve"),
      description: ml(
        "Converter o que é visual em algo explorável pelo tato, com texturas contrastantes e legenda em braille ou ampliada.",
        "Turn what is visual into something explorable by touch, with contrasting textures and a braille or enlarged key.",
        "Convertir lo visual en algo explorable al tacto, con texturas contrastantes y leyenda en braille o ampliada.",
      ),
      tips: mlList(
        [
          "Use texturas nitidamente diferentes entre si, não variações sutis",
          "Simplifique: um gráfico tátil com excesso de detalhe fica ilegível",
          "Apresente o material antes da aula, para a exploração não competir com a explicação",
          "Inclua sempre uma legenda tátil",
        ],
        [
          "Use textures that are clearly different from each other, not subtle variations",
          "Simplify: an overloaded tactile graphic becomes unreadable",
          "Hand the material over before the lesson, so exploring does not compete with listening",
          "Always include a tactile key",
        ],
        [
          "Use texturas claramente diferentes entre sí, no variaciones sutiles",
          "Simplifique: un gráfico táctil con exceso de detalle resulta ilegible",
          "Entregue el material antes de la clase, para que la exploración no compita con la explicación",
          "Incluya siempre una leyenda táctil",
        ],
      ),
      evidence: "established" as const,
      citations: [PATHS_BRAILLE, APH],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Pré-braille e braille", "Pre-braille and braille", "Pre-braille y braille"),
      description: ml(
        "Antes do braille vem a discriminação tátil, o rastreio com as duas mãos e o reconhecimento de padrões — etapa que costuma ser pulada.",
        "Before braille comes tactile discrimination, two-handed tracking and pattern recognition — a stage that is often skipped.",
        "Antes del braille vienen la discriminación táctil, el rastreo con ambas manos y el reconocimiento de patrones — etapa que suele saltarse.",
      ),
      tips: mlList(
        [
          "Trabalhe rastreio de linha com o dedo antes de introduzir a cela braille",
          "Use as duas mãos: a esquerda localiza, a direita lê",
          "Comece com contrastes grandes de textura e vá refinando",
          "Articule com o professor especializado — o braille é ensino sistemático, não improviso",
        ],
        [
          "Work on line tracking with the finger before introducing the braille cell",
          "Use both hands: the left locates, the right reads",
          "Start with large texture contrasts and refine gradually",
          "Coordinate with the specialist teacher — braille is systematic instruction, not improvisation",
        ],
        [
          "Trabaje el rastreo de línea con el dedo antes de introducir la celda braille",
          "Use ambas manos: la izquierda localiza, la derecha lee",
          "Empiece con contrastes grandes de textura y vaya refinando",
          "Articule con el docente especializado — el braille es enseñanza sistemática, no improvisación",
        ],
      ),
      evidence: "established" as const,
      citations: [PATHS_BRAILLE],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Material digital acessível", "Accessible digital materials", "Material digital accesible"),
      description: ml(
        "Documento em texto real, com estrutura de títulos e descrição de imagens, para o leitor de tela funcionar. PDF de imagem escaneada é inacessível.",
        "A document in real text, with heading structure and image descriptions, so the screen reader works. A scanned-image PDF is inaccessible.",
        "Documento en texto real, con estructura de títulos y descripción de imágenes, para que el lector de pantalla funcione. Un PDF escaneado es inaccesible.",
      ),
      tips: mlList(
        [
          "Nunca envie print de texto: o leitor de tela não lê imagem",
          "Use os estilos de título do editor, não texto grande em negrito",
          "Descreva cada imagem em texto alternativo",
          "Envie o material com antecedência, não no início da aula",
        ],
        [
          "Never send a screenshot of text: the screen reader cannot read an image",
          "Use the editor's heading styles, not just large bold text",
          "Describe every image in alt text",
          "Send the material in advance, not at the start of class",
        ],
        [
          "Nunca envíe captura de texto: el lector de pantalla no lee imágenes",
          "Use los estilos de título del editor, no texto grande en negrita",
          "Describa cada imagen en texto alternativo",
          "Envíe el material con antelación, no al inicio de la clase",
        ],
      ),
      evidence: "established" as const,
      citations: [UDL, APH],
      difficulty: BASICO,
    },
    {
      title: ml("Sala previsível e sinalizada", "A predictable, signposted classroom", "Aula previsible y señalizada"),
      description: ml(
        "Manter o mobiliário fixo e avisar qualquer mudança. A autonomia na locomoção depende da estabilidade do ambiente.",
        "Keep the furniture fixed and announce any change. Autonomous movement depends on a stable environment.",
        "Mantener el mobiliario fijo y avisar cualquier cambio. La autonomía en el desplazamiento depende de la estabilidad del ambiente.",
      ),
      tips: mlList(
        [
          "Não mude a disposição da sala sem avisar e sem permitir novo reconhecimento",
          "Mantenha corredores livres de mochilas e cadeiras deslocadas",
          "Combine referências fixas: a porta, a janela, a mesa do professor",
          "Ofereça o braço em vez de puxar pelo braço — quem conduz é o aluno",
        ],
        [
          "Do not rearrange the room without warning and without allowing a new walkthrough",
          "Keep aisles clear of bags and displaced chairs",
          "Agree on fixed reference points: the door, the window, the teacher's desk",
          "Offer your arm rather than pulling theirs — the student leads",
        ],
        [
          "No cambie la disposición del aula sin avisar y sin permitir un nuevo reconocimiento",
          "Mantenga los pasillos libres de mochilas y sillas desplazadas",
          "Acuerde referencias fijas: la puerta, la ventana, el escritorio del docente",
          "Ofrezca el brazo en vez de tirar del suyo — quien conduce es el alumno",
        ],
      ),
      evidence: "established" as const,
      citations: [PATHS, APH],
      difficulty: BASICO,
    },
    {
      title: ml("Baixa visão não é cegueira", "Low vision is not blindness", "Baja visión no es ceguera"),
      description: ml(
        "A maioria dos alunos com deficiência visual enxerga alguma coisa. Ampliação, contraste e iluminação resolvem mais do que braille nesses casos.",
        "Most students with visual impairment see something. Magnification, contrast and lighting solve more than braille in those cases.",
        "La mayoría de los alumnos con discapacidad visual ve algo. Ampliación, contraste e iluminación resuelven más que el braille en esos casos.",
      ),
      tips: mlList(
        [
          "Pergunte ao aluno o que funciona para ele: tamanho de fonte, cor de fundo, distância",
          "Contraste importa mais que tamanho: preto sobre amarelo costuma render mais que fonte gigante",
          "Controle o brilho: reflexo no papel plastificado atrapalha mais que letra pequena",
          "Fonte ampliada não é fonte enorme — 18 a 24 pt resolve a maioria dos casos",
        ],
        [
          "Ask the student what works for them: font size, background colour, distance",
          "Contrast matters more than size: black on yellow often beats a giant font",
          "Control glare: reflection on laminated paper hinders more than small type",
          "Large print is not huge print — 18 to 24 pt covers most cases",
        ],
        [
          "Pregunte al alumno qué le funciona: tamaño de fuente, color de fondo, distancia",
          "El contraste importa más que el tamaño: negro sobre amarillo suele rendir más que una fuente gigante",
          "Controle el brillo: el reflejo en papel plastificado estorba más que la letra pequeña",
          "Fuente ampliada no es fuente enorme — 18 a 24 pt resuelve la mayoría de los casos",
        ],
      ),
      evidence: "established" as const,
      citations: [APH, PATHS],
      difficulty: BASICO,
    },
    {
      title: ml("Tecnologia assistiva", "Assistive technology", "Tecnología asistiva"),
      description: ml(
        "Leitor de tela, ampliador e texto-para-fala já vêm no sistema operacional, sem custo. O obstáculo costuma ser não saber que existem.",
        "Screen reader, magnifier and text-to-speech already ship with the operating system, at no cost. The obstacle is usually not knowing they exist.",
        "Lector de pantalla, ampliador y texto a voz ya vienen en el sistema operativo, sin costo. El obstáculo suele ser no saber que existen.",
      ),
      tips: mlList(
        [
          "Ative o ampliador do sistema antes de comprar qualquer coisa",
          "Ensine o aluno a ajustar sozinho: a autonomia vale mais que a configuração perfeita",
          "Texto-para-fala serve para leitura longa; ampliação, para leitura curta e precisa",
          "Lupa eletrônica ou câmera do celular ampliam o material impresso que você não conseguiu adaptar",
        ],
        [
          "Turn on the system magnifier before buying anything",
          "Teach the student to adjust it themselves: autonomy is worth more than a perfect setup",
          "Text-to-speech suits long reading; magnification suits short, precise reading",
          "An electronic magnifier or the phone camera enlarges printed material you could not adapt",
        ],
        [
          "Active el ampliador del sistema antes de comprar nada",
          "Enseñe al alumno a ajustarlo solo: la autonomía vale más que la configuración perfecta",
          "El texto a voz sirve para lectura larga; la ampliación, para lectura corta y precisa",
          "Una lupa electrónica o la cámara del celular amplían el material impreso que no logró adaptar",
        ],
      ),
      evidence: "established" as const,
      citations: [PATHS_TECH, APH_EDU],
      difficulty: INTERMEDIARIO,
    },
    {
      title: ml("Fadiga visual e tempo", "Visual fatigue and time", "Fatiga visual y tiempo"),
      description: ml(
        "Enxergar com esforço cansa. O aluno com baixa visão gasta mais energia para a mesma tarefa — e o rendimento cai no fim da aula, não por desinteresse.",
        "Seeing with effort is tiring. A student with low vision spends more energy on the same task — and performance drops late in the lesson, not from disinterest.",
        "Ver con esfuerzo cansa. El alumno con baja visión gasta más energía en la misma tarea — y el rendimiento cae al final de la clase, no por desinterés.",
      ),
      tips: mlList(
        [
          "Tempo adicional é regra, não favor — a leitura leva mais tempo mesmo adaptada",
          "Programe pausas visuais em tarefas longas de leitura",
          "Distribua as atividades que exigem mais visão no início da aula",
          "Queda de rendimento no fim do período pode ser fadiga, não falta de atenção",
        ],
        [
          "Extra time is a rule, not a favour — reading takes longer even when adapted",
          "Schedule visual breaks during long reading tasks",
          "Place the most vision-demanding activities at the start of the lesson",
          "A drop in performance late in the period may be fatigue, not inattention",
        ],
        [
          "El tiempo adicional es regla, no favor — la lectura lleva más tiempo aun adaptada",
          "Programe pausas visuales en tareas largas de lectura",
          "Distribuya las actividades que exigen más visión al inicio de la clase",
          "La caída de rendimiento al final del período puede ser fatiga, no falta de atención",
        ],
      ),
      evidence: "emerging" as const,
      citations: [APH_EDU, PATHS],
      difficulty: BASICO,
    },
  ]

  const activities = [
    {
      name: ml("Converter um material da sua aula", "Convert one of your own materials", "Convertir un material de su clase"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("40 min", "40 min", "40 min"),
      description: ml(
        "Pegue um material que você já usa e torne-o acessível — o exercício mostra o que precisa mudar no seu processo, não só naquele arquivo.",
        "Take a material you already use and make it accessible — the exercise reveals what needs to change in your process, not just in that file.",
        "Tome un material que ya usa y hágalo accesible — el ejercicio muestra qué debe cambiar en su proceso, no solo en ese archivo.",
      ),
      materials: mlList(
        ["Um material seu, já usado em sala", "Editor de texto", "Leitor de tela para testar"],
        ["One of your own materials, already used in class", "A text editor", "A screen reader to test with"],
        ["Un material suyo, ya usado en clase", "Editor de texto", "Lector de pantalla para probar"],
      ),
      implementation: ml(
        "Reescreva o material com estrutura de títulos, texto real e descrição das imagens, e teste com leitor de tela.",
        "Rewrite the material with heading structure, real text and image descriptions, then test it with a screen reader.",
        "Reescriba el material con estructura de títulos, texto real y descripción de imágenes, y pruébelo con lector de pantalla.",
      ),
      objectives: mlList(
        ["Material acessível", "Consciência do próprio processo", "Autonomia do aluno"],
        ["Accessible material", "Awareness of your own process", "Student autonomy"],
        ["Material accesible", "Conciencia del propio proceso", "Autonomía del alumno"],
      ),
      authorship: "adapted" as const,
      citations: [UDL, APH],
      stepByStep: mlList(
        [
          "Escolha um material que você usou na última semana",
          "Verifique se o texto é texto real ou imagem de texto",
          "Aplique estilos de título de verdade na estrutura do documento",
          "Escreva descrição alternativa para cada imagem",
          "Substitua referências visuais como 'a figura acima' por nomes",
          "Teste com o leitor de tela do próprio sistema e corrija o que soar confuso",
        ],
        [
          "Choose a material you used in the last week",
          "Check whether the text is real text or an image of text",
          "Apply genuine heading styles to the document structure",
          "Write alt text for every image",
          "Replace visual references like 'the figure above' with names",
          "Test with your system's built-in screen reader and fix whatever sounds confusing",
        ],
        [
          "Elija un material que haya usado en la última semana",
          "Verifique si el texto es texto real o imagen de texto",
          "Aplique estilos de título reales en la estructura del documento",
          "Escriba descripción alternativa para cada imagen",
          "Sustituya referencias visuales como 'la figura de arriba' por nombres",
          "Pruébelo con el lector de pantalla del sistema y corrija lo que suene confuso",
        ],
      ),
      tips: mlList(
        ["Windows e macOS já trazem leitor de tela — não precisa instalar nada", "Se você não entende o material ouvindo, o aluno também não vai"],
        ["Windows and macOS already ship a screen reader — nothing to install", "If you cannot understand the material by listening, neither will the student"],
        ["Windows y macOS ya traen lector de pantalla — no hace falta instalar nada", "Si usted no entiende el material escuchándolo, el alumno tampoco"],
      ),
      variations: mlList(
        ["Versão em fonte ampliada e alto contraste, para baixa visão"],
        ["A large-print, high-contrast version for low vision"],
        ["Versión en fuente ampliada y alto contraste, para baja visión"],
      ),
      assessment: ml(
        "O material passa se fizer sentido ouvido do começo ao fim, sem depender de nenhuma informação visual.",
        "The material passes if it makes sense listened to from start to finish, without depending on any visual information.",
        "El material aprueba si tiene sentido escuchado de principio a fin, sin depender de información visual.",
      ),
    },
    {
      name: ml("Mapa tátil da sala", "Tactile map of the classroom", "Mapa táctil del aula"),
      age: ml("6-16 anos", "6-16 years", "6-16 años"),
      duration: ml("50 min", "50 min", "50 min"),
      description: ml(
        "Construir com o aluno uma representação tátil do espaço, para apoiar o deslocamento autônomo.",
        "Build a tactile representation of the space together with the student, to support independent movement.",
        "Construir con el alumno una representación táctil del espacio, para apoyar el desplazamiento autónomo.",
      ),
      materials: mlList(
        ["Papelão rígido", "Materiais de texturas diferentes", "Cola", "Etiquetas em braille, se disponíveis"],
        ["Stiff cardboard", "Materials with different textures", "Glue", "Braille labels, if available"],
        ["Cartón rígido", "Materiales de texturas diferentes", "Pegamento", "Etiquetas en braille, si hay"],
      ),
      implementation: ml(
        "Percorra a sala com o aluno, defina as referências e represente cada uma com uma textura distinta.",
        "Walk the room with the student, agree on reference points and represent each with a distinct texture.",
        "Recorra el aula con el alumno, defina las referencias y represente cada una con una textura distinta.",
      ),
      objectives: mlList(
        ["Orientação espacial", "Autonomia no deslocamento", "Leitura tátil"],
        ["Spatial orientation", "Independent movement", "Tactile reading"],
        ["Orientación espacial", "Autonomía en el desplazamiento", "Lectura táctil"],
      ),
      authorship: "adapted" as const,
      citations: [PATHS_BRAILLE, APH],
      stepByStep: mlList(
        [
          "Percorra a sala junto com o aluno, sem pressa",
          "Peça que ele indique quais pontos usa como referência",
          "Desenhe a planta simples em papelão, na proporção aproximada",
          "Represente cada referência com uma textura nitidamente diferente",
          "Monte a legenda tátil na borda do mapa",
          "Peça ao aluno que descreva um trajeto usando o mapa, e depois o percorra",
        ],
        [
          "Walk the room together with the student, without rushing",
          "Ask which points they use as references",
          "Draw a simple floor plan on cardboard, roughly to scale",
          "Represent each reference with a clearly different texture",
          "Build the tactile key on the edge of the map",
          "Ask the student to describe a route using the map, then walk it",
        ],
        [
          "Recorra el aula junto al alumno, sin prisa",
          "Pídale que indique qué puntos usa como referencia",
          "Dibuje el plano simple en cartón, en proporción aproximada",
          "Represente cada referencia con una textura claramente diferente",
          "Arme la leyenda táctil en el borde del mapa",
          "Pida al alumno que describa un trayecto usando el mapa, y luego lo recorra",
        ],
      ),
      tips: mlList(
        ["Menos elementos, mais legível — resista a mapear tudo", "Refaça o mapa se a sala for reorganizada"],
        ["Fewer elements, more readable — resist mapping everything", "Redo the map if the room is rearranged"],
        ["Menos elementos, más legible — resista mapear todo", "Rehaga el mapa si el aula se reorganiza"],
      ),
      variations: mlList(
        ["Versão da escola inteira, para os trajetos entre salas"],
        ["A whole-school version, for routes between rooms"],
        ["Versión de toda la escuela, para los trayectos entre aulas"],
      ),
      assessment: ml(
        "Verifique se o aluno consegue descrever e percorrer um trajeto novo consultando apenas o mapa.",
        "Check whether the student can describe and walk a new route using only the map.",
        "Verifique si el alumno puede describir y recorrer un trayecto nuevo consultando solo el mapa.",
      ),
    },
    {
      name: ml("Configurar a tecnologia do próprio aluno", "Set up the student's own technology", "Configurar la tecnología del propio alumno"),
      age: ml("8-18 anos", "8-18 years", "8-18 años"),
      duration: ml("40 min, uma vez", "40 min, once", "40 min, una vez"),
      description: ml(
        "Uma sessão para ativar e ajustar, junto com o aluno, os recursos de acessibilidade que já existem no dispositivo dele.",
        "One session to switch on and tune, together with the student, the accessibility features already on their device.",
        "Una sesión para activar y ajustar, junto al alumno, los recursos de accesibilidad que ya existen en su dispositivo.",
      ),
      materials: mlList(
        ["O computador ou celular que o aluno usa", "Um texto de teste"],
        ["The computer or phone the student uses", "A test text"],
        ["La computadora o celular que usa el alumno", "Un texto de prueba"],
      ),
      implementation: ml(
        "Ative ampliador, alto contraste e texto-para-fala, e deixe o aluno ajustar até achar o que funciona.",
        "Turn on magnifier, high contrast and text-to-speech, and let the student adjust until they find what works.",
        "Active el ampliador, el alto contraste y el texto a voz, y deje que el alumno ajuste hasta encontrar lo que funciona.",
      ),
      objectives: mlList(
        ["Autonomia tecnológica", "Configuração sob medida", "Acesso ao material digital"],
        ["Technological autonomy", "A tailored setup", "Access to digital material"],
        ["Autonomía tecnológica", "Configuración a medida", "Acceso al material digital"],
      ),
      authorship: "adapted" as const,
      citations: [PATHS_TECH, APH_EDU],
      stepByStep: mlList(
        [
          "Abra as configurações de acessibilidade do sistema junto com o aluno",
          "Ative o ampliador e teste níveis de zoom com um texto real",
          "Experimente os modos de alto contraste e pergunte qual cansa menos",
          "Ative o texto-para-fala e ajuste a velocidade da leitura",
          "Peça que o aluno refaça a configuração sozinho, do zero",
          "Anote as preferências dele numa ficha, para outros professores usarem",
        ],
        [
          "Open the system accessibility settings together with the student",
          "Turn on the magnifier and test zoom levels with a real text",
          "Try the high-contrast modes and ask which is less tiring",
          "Turn on text-to-speech and adjust the reading speed",
          "Ask the student to redo the setup alone, from scratch",
          "Note their preferences on a sheet, for other teachers to use",
        ],
        [
          "Abra la configuración de accesibilidad del sistema junto al alumno",
          "Active el ampliador y pruebe niveles de zoom con un texto real",
          "Pruebe los modos de alto contraste y pregunte cuál cansa menos",
          "Active el texto a voz y ajuste la velocidad de lectura",
          "Pida que el alumno rehaga la configuración solo, desde cero",
          "Anote sus preferencias en una ficha, para que otros docentes la usen",
        ],
      ),
      tips: mlList(
        ["A ficha de preferências evita que cada professor recomece do zero", "Quem decide o que funciona é o aluno, não o adulto que enxerga"],
        ["The preference sheet stops every teacher from starting over", "The student decides what works, not the sighted adult"],
        ["La ficha de preferencias evita que cada docente empiece de cero", "Quien decide qué funciona es el alumno, no el adulto que ve"],
      ),
      variations: mlList(
        ["Versão com a família, para replicar a configuração no dispositivo de casa"],
        ["A version with the family, to replicate the setup on the home device"],
        ["Versión con la familia, para replicar la configuración en el dispositivo de casa"],
      ),
      assessment: ml(
        "O aluno consegue configurar o dispositivo sozinho, sem consultar ninguém.",
        "The student can set up the device alone, without asking anyone.",
        "El alumno logra configurar el dispositivo solo, sin consultar a nadie.",
      ),
    },
    {
      name: ml("Prova em fonte ampliada e contraste", "Test in large print and high contrast", "Prueba en fuente ampliada y contraste"),
      age: ml("Qualquer", "Any", "Cualquiera"),
      duration: ml("15 min por avaliação", "15 min per assessment", "15 min por evaluación"),
      description: ml(
        "Adaptar uma prova que você já escreveu para baixa visão, sem alterar o conteúdo cobrado.",
        "Adapt a test you have already written for low vision, without changing the content assessed.",
        "Adaptar una prueba que ya escribió para baja visión, sin alterar el contenido evaluado.",
      ),
      materials: mlList(
        ["A prova em formato editável", "As preferências visuais do aluno"],
        ["The test in an editable format", "The student's visual preferences"],
        ["La prueba en formato editable", "Las preferencias visuales del alumno"],
      ),
      implementation: ml(
        "Ajuste fonte, contraste e espaçamento conforme a ficha de preferências, e evite qualquer informação só visual.",
        "Adjust font, contrast and spacing according to the preference sheet, and avoid any information carried only visually.",
        "Ajuste fuente, contraste y espaciado según la ficha de preferencias, y evite cualquier información solo visual.",
      ),
      objectives: mlList(
        ["Avaliação justa", "Medir o conteúdo, não a visão", "Autonomia na prova"],
        ["Fair assessment", "Measuring content, not vision", "Autonomy during the test"],
        ["Evaluación justa", "Medir el contenido, no la visión", "Autonomía en la prueba"],
      ),
      authorship: "adapted" as const,
      citations: [APH_EDU, UDL],
      stepByStep: mlList(
        [
          "Consulte a ficha de preferências do aluno antes de começar",
          "Aumente a fonte para o tamanho indicado e aumente o espaçamento entre linhas",
          "Aplique o esquema de contraste que ele prefere",
          "Substitua figuras que carregam informação por descrição em texto",
          "Deixe uma questão por página; adensar cansa a leitura",
          "Defina o tempo adicional antes da prova e avise o aluno",
        ],
        [
          "Check the student's preference sheet before starting",
          "Increase the font to the indicated size and widen the line spacing",
          "Apply the contrast scheme they prefer",
          "Replace figures that carry information with a text description",
          "Leave one question per page; crowding tires the reading",
          "Set the extra time before the test and tell the student",
        ],
        [
          "Consulte la ficha de preferencias del alumno antes de empezar",
          "Aumente la fuente al tamaño indicado y amplíe el espaciado entre líneas",
          "Aplique el esquema de contraste que prefiera",
          "Sustituya figuras que llevan información por descripción en texto",
          "Deje una pregunta por página; amontonar cansa la lectura",
          "Defina el tiempo adicional antes de la prueba y avise al alumno",
        ],
      ),
      tips: mlList(
        ["Imprima uma cópia e leia você mesmo à distância de um braço, com pouca luz", "Se a prova precisa de régua para acompanhar a linha, o espaçamento está apertado"],
        ["Print a copy and read it yourself at arm's length, in dim light", "If the test needs a ruler to follow the line, the spacing is too tight"],
        ["Imprima una copia y léala usted mismo a un brazo de distancia, con poca luz", "Si la prueba necesita regla para seguir la línea, el espaciado está apretado"],
      ),
      variations: mlList(
        ["Versão digital, para o aluno usar o próprio ampliador", "Versão em áudio para as partes que não avaliam leitura"],
        ["A digital version, so the student uses their own magnifier", "An audio version for the parts that do not assess reading"],
        ["Versión digital, para que el alumno use su propio ampliador", "Versión en audio para las partes que no evalúan lectura"],
      ),
      assessment: ml(
        "Compare o desempenho na prova adaptada com o que o aluno demonstra oralmente sobre o mesmo conteúdo.",
        "Compare performance on the adapted test with what the student demonstrates orally on the same content.",
        "Compare el desempeño en la prueba adaptada con lo que el alumno demuestra oralmente sobre el mismo contenido.",
      ),
    },
  ]

  const courses = [
    {
      title: ml("Minicurso de Deficiência Visual", "Short course on Visual Impairment", "Minicurso de Discapacidad Visual"),
      provider: "Pensar Cursos",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Gratuito", "Free", "Gratuito"),
      certificate: true,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "pt" as const,
      url: "https://www.pensarcursos.com.br/curso/minicurso-deficiencia-visual",
    },
    {
      title: ml("Deficiência Visual", "Visual Impairment", "Discapacidad Visual"),
      provider: "Educamundo",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Consultar", "On request", "Consultar"),
      certificate: true,
      level: ml("Intermediário", "Intermediate", "Intermedio"),
      language: "pt" as const,
      url: "https://educamundo.com.br/cursos-online/deficiencia-visual/",
    },
    {
      title: ml("Deficiência Visual — Conexão Online", "Visual Impairment — Conexão Online", "Discapacidad Visual — Conexão Online"),
      provider: "Portal Educa",
      duration: ml("Autoinstrucional", "Self-paced", "Autoinstruccional"),
      price: ml("Consultar", "On request", "Consultar"),
      certificate: true,
      level: ml("Introdutório", "Introductory", "Introductorio"),
      language: "pt" as const,
      url: "https://www.portaleduca.com.br/cursos/deficiencia-visual/conexaoonline",
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
      title: ml("Paths to Literacy", "Paths to Literacy", "Paths to Literacy"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Comunidade de prática em letramento para alunos cegos, com baixa visão ou surdocegueira.",
        "A community of practice on literacy for students who are blind, have low vision or are deafblind.",
        "Comunidad de práctica en alfabetización para alumnos ciegos, con baja visión o sordoceguera.",
      ),
      featured: true,
      url: "https://www.pathstoliteracy.org/",
      publisher: "Perkins School for the Blind / TSBVI",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Braille — estratégias e gráficos táteis", "Braille — strategies and tactile graphics", "Braille — estrategias y gráficos táctiles"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Pré-braille, estratégias de ensino, gráficos táteis e tecnologia para leitores braille.",
        "Pre-braille, teaching strategies, tactile graphics and technology for braille readers.",
        "Pre-braille, estrategias de enseñanza, gráficos táctiles y tecnología para lectores braille.",
      ),
      featured: true,
      url: "https://www.pathstoliteracy.org/braille/",
      publisher: "Perkins School for the Blind / TSBVI",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("American Printing House — recursos", "American Printing House — resources", "American Printing House — recursos"),
      type: ml("Repositório", "Repository", "Repositorio"),
      description: ml(
        "Materiais e recursos didáticos acessíveis para alunos cegos e com baixa visão.",
        "Accessible teaching materials and resources for blind and low-vision students.",
        "Materiales y recursos didácticos accesibles para alumnos ciegos y con baja visión.",
      ),
      featured: false,
      url: "https://www.aph.org/resources/",
      publisher: "American Printing House for the Blind",
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
        "Como planejar material acessível desde o início, em vez de adaptar depois.",
        "How to plan accessible material from the start, instead of adapting later.",
        "Cómo planificar material accesible desde el inicio, en vez de adaptar después.",
      ),
      featured: false,
      url: "https://udlguidelines.cast.org/",
      publisher: "CAST",
      language: "en" as const,
      format: "Site" as const,
    },
    {
      title: ml("Perkins School for the Blind", "Perkins School for the Blind", "Perkins School for the Blind"),
      type: ml("Referência", "Reference", "Referencia"),
      description: ml(
        "Instituição de referência mundial em cegueira e baixa visão, com formação docente e material sobre acesso à leitura e vida autônoma.",
        "A world reference institution in blindness and low vision, with teacher training and material on literacy access and independent living.",
        "Institución de referencia mundial en ceguera y baja visión, con formación docente y material sobre acceso a la lectura y vida autónoma.",
      ),
      featured: false,
      url: "https://www.perkins.org/",
      publisher: "Perkins School for the Blind",
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
