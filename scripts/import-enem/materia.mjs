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
