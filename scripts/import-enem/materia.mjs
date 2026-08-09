/**
 * Matéria da questão, dentro da área oficial.
 *
 * O ENEM não classifica por matéria: a matriz para na área, porque a prova é
 * interdisciplinar de propósito. Uma questão sobre cloreto de cálcio pode
 * existir para falar de umidade, e o INEP não a chama de "Química". Então tudo
 * o que sai daqui é **interpretação do AtypicalClass**, e é gravado dizendo
 * isso — nunca como rótulo oficial.
 *
 * Só o vestibular separado por disciplina dá matéria oficial, porque ali a
 * própria banca imprimiu a prova dividida.
 *
 * O que impede o rótulo de virar chute é a auditoria: a matéria proposta tem
 * que pertencer à área que o INEP publicou. "Química" só pode existir dentro
 * de Ciências da Natureza. Rótulo fora da área é contradição entre uma fonte
 * oficial e uma interpretação nossa, e nesse caso quem cede é a interpretação.
 */

/** Quais matérias podem existir dentro de cada área. */
export const MATERIAS_POR_AREA = {
  CN: ["Física", "Química", "Biologia"],
  CH: ["História", "Geografia", "Filosofia", "Sociologia"],
  LC: ["Português", "Literatura", "Inglês", "Espanhol", "Artes", "Educação Física"],
  MT: ["Matemática"],
}

/**
 * Vocabulário por matéria.
 *
 * Termos escolhidos por serem pouco ambíguos entre as três de Natureza:
 * "célula" e "mol" não se confundem, enquanto "energia" aparece nas três e por
 * isso não entra. Pesos maiores marcam palavras que praticamente decidem
 * sozinhas — quem fala em "tabela periódica" está em Química.
 */
const LEXICO = {
  Física: {
    3: ["newton", "joule", "watt", "ampère", "volt", "ohm", "hertz", "decibel", "quilowatt", "kwh", "energia cinética", "energia potencial", "circuito elétrico", "resistor", "resistência elétrica", "campo magnético", "campo elétrico", "onda sonora", "refração", "reflexão da luz", "atrito", "empuxo", "aceleração", "efeito fotoelétrico", "meia-vida", "termodinâmica", "entropia", "velocidade média", "queda livre", "movimento uniforme", "espelho côncavo", "lente convergente", "índice de refração", "capacitor", "transformador", "corrente contínua", "corrente alternada"],
    2: ["força resultante", "trabalho realizado", "potência", "corrente elétrica", "tensão elétrica", "espelho", "lente", "frequência", "comprimento de onda", "pressão", "densidade", "calor específico", "dilatação", "condução térmica", "irradiação", "colisão", "gravitacional", "fóton", "radiação", "espectro", "usina", "turbina", "motor", "aceleração da gravidade", "massa específica", "vetor", "inércia"],
    1: ["velocidade", "força", "movimento", "calor", "temperatura", "luz", "som"],
  },
  Química: {
    3: ["mol", "tabela periódica", "ligação covalente", "ligação iônica", "ligação metálica", "número atômico", "massa molar", "massa atômica", "estequiometria", "hidrocarboneto", "isômero", "eletronegatividade", "eletrólise", "entalpia", "exotérmica", "endotérmica", "equilíbrio químico", "cátion", "ânion", "oxirredução", "número de oxidação", "molaridade", "concentração molar", "grupo funcional", "química orgânica", "alcano", "alceno", "éster", "cetona", "aldeído", "ácido carboxílico", "solução aquosa", "titulação"],
    2: ["reação química", "ácido", "base", "sal", "óxido", "átomo", "molécula", "íon", "concentração", "catalisador", "combustão", "polímero", "solubilidade", "soluto", "solvente", "oxidação", "redução", "pilha", "corrosão", "ph", "acidez", "alcalino", "gás carbônico", "precipitado"],
    1: ["substância", "composto", "elemento químico", "mistura", "fórmula"],
  },
  Biologia: {
    3: ["célula", "dna", "rna", "gene", "cromossomo", "fotossíntese", "respiração celular", "mitose", "meiose", "ecossistema", "bioma", "seleção natural", "cadeia alimentar", "teia alimentar", "enzima", "hormônio", "anticorpo", "antígeno", "mitocôndria", "cloroplasto", "ribossomo", "membrana plasmática", "genótipo", "fenótipo", "alelo", "hereditariedade", "mutação", "sistema nervoso", "sistema imunológico", "atp", "aminoácido", "clorofila", "fungo", "protozoário", "parasita", "hospedeiro"],
    2: ["organismo", "tecido", "membrana", "reprodução", "metabolismo", "população", "biodiversidade", "vacina", "imunidade", "proteína", "espécie", "evolução", "bactéria", "vírus", "predador", "cadeia trófica", "polinização", "germinação", "hábitat", "nutriente", "digestão", "sangue", "neurônio"],
    1: ["ambiente", "planta", "animal", "vida", "saúde"],
  },

  História: {
    3: ["idade média", "idade moderna", "antiguidade", "feudalismo", "absolutismo", "revolução francesa", "revolução industrial", "primeira guerra", "segunda guerra", "guerra fria", "escravidão", "abolição", "colonização", "período colonial", "império romano", "renascimento", "cruzadas", "inquisição", "estado novo", "ditadura militar", "proclamação da república", "independência do brasil", "getúlio vargas", "revolução russa", "nazismo", "fascismo", "descolonização", "iluminismo"],
    2: ["século xix", "século xx", "século xviii", "monarquia", "revolta", "tratado", "conquista", "metrópole e colônia", "senhores de engenho", "quilombo", "imigração", "república velha", "guerra civil", "revolução", "império"],
    1: ["história", "passado", "época", "período"],
  },
  Geografia: {
    3: ["urbanização", "êxodo rural", "relevo", "bacia hidrográfica", "clima tropical", "zona rural", "agronegócio", "industrialização", "globalização", "blocos econômicos", "densidade demográfica", "pirâmide etária", "desmatamento", "recursos hídricos", "cartografia", "latitude", "longitude", "escala do mapa", "placas tectônicas", "erosão", "aquecimento global", "matriz energética", "rede urbana", "metropolização"],
    2: ["território", "fronteira", "migração", "população urbana", "clima", "solo", "vegetação", "produção agrícola", "mineração", "transporte", "região", "espaço geográfico", "crescimento demográfico", "favela", "periferia"],
    1: ["mapa", "país", "cidade", "estado", "região"],
  },
  Filosofia: {
    3: ["platão", "aristóteles", "sócrates", "kant", "nietzsche", "descartes", "hegel", "hobbes", "rousseau", "john locke", "epicuro", "santo agostinho", "tomás de aquino", "contrato social", "imperativo categórico", "maiêutica", "mito da caverna", "existencialismo", "empirismo", "racionalismo", "metafísica", "epistemologia", "ética aristotélica", "livre-arbítrio"],
    2: ["filósofo", "filosofia", "ética", "moral", "virtude", "razão", "conhecimento verdadeiro", "essência", "existência", "dialética", "ceticismo", "senso comum"],
    1: ["pensamento", "reflexão", "verdade"],
  },
  Sociologia: {
    3: ["durkheim", "max weber", "bourdieu", "movimento social", "estratificação social", "mobilidade social", "classe social", "desigualdade social", "divisão do trabalho", "fato social", "indústria cultural", "alienação", "mais-valia", "burocracia", "cidadania", "direitos sociais", "exclusão social", "políticas afirmativas", "sindicato"],
    2: ["sociedade", "cultura", "identidade cultural", "trabalho assalariado", "capitalismo", "consumo", "mídia", "democracia", "poder político", "minorias", "preconceito", "estereótipo"],
    1: ["social", "grupo", "comunidade"],
  },

  Português: {
    3: ["variação linguística", "norma culta", "norma padrão", "função da linguagem", "figura de linguagem", "coesão textual", "coerência textual", "ambiguidade", "polissemia", "regência verbal", "concordância verbal", "oração subordinada", "sujeito e predicado", "registro formal", "linguagem coloquial", "gíria", "regionalismo", "intertextualidade", "gênero textual", "tipologia textual"],
    2: ["gramática", "sintaxe", "semântica", "morfologia", "pronome", "verbo", "advérbio", "conjunção", "sentido conotativo", "sentido denotativo", "argumentação", "oralidade", "dialeto", "sotaque"],
    1: ["texto", "palavra", "frase", "leitura"],
  },
  Literatura: {
    3: ["romantismo", "modernismo", "barroco literário", "arcadismo", "realismo", "naturalismo", "parnasianismo", "simbolismo", "semana de arte moderna", "machado de assis", "carlos drummond", "clarice lispector", "guimarães rosa", "castro alves", "manuel bandeira", "mário de andrade", "oswald de andrade", "graciliano ramos", "cecília meireles", "soneto", "estrofe", "eu lírico", "narrador-personagem"],
    2: ["poema", "poesia", "verso", "romance", "conto", "crônica", "prosa", "personagem", "narrador", "obra literária", "escritor", "literatura brasileira", "cordel"],
    1: ["autor", "livro", "escrita"],
  },
  Artes: {
    3: ["artes visuais", "artista plástico", "obra de arte", "escultura", "pintura a óleo", "instalação artística", "performance artística", "arte contemporânea", "arte moderna", "grafite", "museu de arte", "bienal", "estética visual", "artes cênicas", "dramaturgia", "cenografia"],
    2: ["pintura", "quadro", "tela", "exposição", "museu", "teatro", "espetáculo", "dança", "coreografia", "música popular", "cinema", "fotografia", "desenho"],
    1: ["arte", "artístico", "criação"],
  },
  "Educação Física": {
    3: ["atividade física", "aptidão física", "sedentarismo", "treinamento físico", "esporte olímpico", "jogos olímpicos", "modalidade esportiva", "ginástica artística", "capoeira", "educação física escolar", "esporte de rendimento", "lazer e recreação"],
    2: ["esporte", "atleta", "exercício", "corrida", "futebol", "vôlei", "basquete", "natação", "luta", "competição esportiva", "movimento corporal"],
    1: ["jogo", "corpo", "prática"],
  },
}

/**
 * Propõe uma matéria para uma questão.
 *
 * Devolve `null` quando não há vencedor claro — de propósito. Metade das
 * questões de Humanas é legitimamente ambígua, e um rótulo inventado ali é
 * pior que nenhum: o professor filtra por "História", recebe uma questão de
 * Sociologia e perde a confiança no filtro inteiro. Sem matéria, a questão
 * continua aparecendo na busca; ela só não entra num filtro que mentiria.
 */
export function proporMateria(questao, area) {
  const permitidas = MATERIAS_POR_AREA[area] ?? []
  if (permitidas.length === 1) {
    return { materia: permitidas[0], confianca: "oficial", placar: null }
  }

  const texto = [
    questao.enunciado,
    ...(questao.descricoesDeFiguras ?? []),
    ...questao.alternativas.map((a) => a.texto),
  ]
    .join(" ")
    .toLowerCase()

  const placar = permitidas
    .filter((materia) => LEXICO[materia])
    .map((materia) => {
      let pontos = 0
      for (const [peso, termos] of Object.entries(LEXICO[materia])) {
        for (const termo of termos) {
          if (texto.includes(termo)) pontos += Number(peso)
        }
      }
      return { materia, pontos }
    })
    .sort((a, b) => b.pontos - a.pontos)

  const [primeiro, segundo] = placar
  if (!primeiro || primeiro.pontos < 3) return { materia: null, confianca: "indefinida", placar }

  // Precisa vencer com folga. Empate técnico costuma ser questão de fronteira
  // — bioquímica entre Química e Biologia —, e nesses casos o silêncio é a
  // resposta honesta.
  const folga = primeiro.pontos - (segundo?.pontos ?? 0)
  if (folga < 2) return { materia: null, confianca: "disputada", placar }

  return { materia: primeiro.materia, confianca: folga >= 4 ? "alta" : "media", placar }
}

/**
 * Confere se um rótulo cabe na área oficial.
 *
 * É a rede que separa interpretação de invenção: se a matéria proposta não
 * pertence à área publicada pelo INEP, alguma das duas está errada — e não é
 * a do INEP.
 */
export function materiaCabeNaArea(materia, area) {
  if (!materia) return true
  return (MATERIAS_POR_AREA[area] ?? []).includes(materia)
}
