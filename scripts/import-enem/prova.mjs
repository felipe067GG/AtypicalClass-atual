/**
 * Separação dos itens dentro do PDF da prova.
 *
 * O caderno impresso não traz o número da questão como texto: o INEP desenha
 * esse número, então nenhum extrator o enxerga. A numeração aqui vem da ordem
 * de leitura, e é justamente por isso que a validação é tão dura — se um item
 * escapar da segmentação, todos os seguintes se deslocam e passam a receber a
 * resposta do vizinho. Um erro assim não aparece: a questão continua bonita na
 * tela, só com o gabarito errado. Daí a regra de tudo-ou-nada em `importar.mjs`.
 *
 * A âncora das alternativas é a margem. As cinco opções são impressas coladas
 * na borda da coluna, enquanto poema, citação e legenda vêm indentados:
 *
 *     A medo da morte.            <- alternativa
 *           A part of the main.   <- verso de poema
 *
 * Sem essa distinção o separador não funciona, porque em português é comum uma
 * frase começar com "A" ou "E" — na primeira tentativa isso produziu 272
 * falsos positivos numa prova de 225 alternativas.
 */
import { extrairTexto } from "./inep.mjs"

/**
 * Ponto de corte entre as colunas, em pontos.
 *
 * Medido, não estimado: em 300 o recorte passa por cima da primeira letra da
 * coluna da direita — "manipulador" chega como "anipulador" e as alternativas
 * perdem a letra que as identifica. Em 290 a coluna sai inteira.
 */
const MEIO = 290

/**
 * Quantas páginas vazias seguidas encerram a leitura.
 *
 * Precisa ser generoso: a prova tem páginas em branco entre as seções e folhas
 * de rascunho no fim. Com o limite em 3, a leitura parava no meio do caderno e
 * o importador acusava metade dos itens — parecia falha de segmentação e era
 * só a leitura tendo desistido cedo.
 */
const FIM = 10

const LETRAS = ["A", "B", "C", "D", "E"]

/**
 * Tira o recuo comum de uma coluna, preservando o recuo relativo.
 *
 * A coluna da direita começa no meio da página, então o extrator devolve suas
 * linhas com trezentos pontos de espaço à esquerda. Como a âncora das
 * alternativas é justamente "estar colada na margem", sem isto nenhuma
 * alternativa da direita é reconhecida — e some exatamente metade da prova,
 * que foi o sintoma: 46 itens de 90.
 *
 * O recuo relativo entre as linhas continua valendo, que é o que separa
 * alternativa de verso citado.
 */
function desindentar(texto) {
  // No Windows o extrator termina cada linha com CRLF, e o `\r` sobrando faz
  // o `$` dos padrões nunca casar.
  const linhas = texto.split(/\r?\n/).map((l) => l.trimEnd())
  const comConteudo = linhas.filter((l) => l.trim())
  if (!comConteudo.length) return []

  const menorRecuo = Math.min(...comConteudo.map((l) => l.length - l.trimStart().length))
  return linhas.map((l) => l.slice(menorRecuo))
}

/**
 * Lê o PDF inteiro, coluna a coluna, em ordem de leitura.
 *
 * Cada página vira dois blocos: primeiro a coluna esquerda, depois a direita.
 * É a ordem em que a prova é lida, e é o que permite numerar por posição.
 */
export async function lerColunas(pdf, { maxPaginas = 60 } = {}) {
  const linhas = []
  let vazias = 0

  for (let pagina = 1; pagina <= maxPaginas; pagina += 1) {
    const esquerda = await extrairTexto(pdf, { pagina, margemDireita: MEIO })
    const direita = await extrairTexto(pdf, { pagina, margemEsquerda: MEIO })

    if (!`${esquerda}${direita}`.trim()) {
      vazias += 1
      if (vazias >= FIM) break
      continue
    }
    vazias = 0

    for (const coluna of [esquerda, direita]) {
      for (const texto of desindentar(repararCifra(coluna))) {
        linhas.push({ pagina, texto })
      }
    }
  }

  return linhas
}

/**
 * Lê a versão acessível da prova, quando ela existe.
 *
 * O INEP publica, para alguns cadernos, a prova preparada para leitor de tela.
 * Ela resolve sozinha os dois problemas que o caderno impresso impõe: é de
 * coluna única, então não precisa de recorte ao meio, e traz a notação
 * matemática verbalizada — "6 vezes raiz cúbica de 6" no lugar de um radical
 * tipografado, que nenhum extrator de texto alcança. Era o que fazia uma em
 * cada dez questões de Matemática ser rejeitada.
 *
 * Usá-la de preferência também é coerente com o site: é a versão feita para
 * quem precisa de acessibilidade, e é a mais completa em texto.
 *
 * As alternativas aqui vêm em minúsculas e com ponto — "a. Verde e Preto." —
 * em vez do "A Verde e Preto" do impresso.
 */
export async function lerAcessivel(pdf) {
  const texto = repararCifra(await extrairTexto(pdf))
  return texto.split(/\r?\n/).map((linha, i) => ({ pagina: null, texto: linha.trimEnd(), ordem: i }))
}

/**
 * Casa uma linha de alternativa, no formato do documento que está sendo lido.
 *
 * O formato precisa ser dito, não adivinhado. Na prova impressa a alternativa é
 * "A texto", e o que a distingue de uma frase comum é estar colada na margem
 * enquanto o texto corrido vem indentado. Na versão acessível não há indentação
 * nenhuma — é tudo coluna única — e "A figura representa uma escada" seria lida
 * como a alternativa A, engolindo o enunciado inteiro. Foi exatamente o que
 * aconteceu em seis questões, todas começando por "A " ou "E ".
 */
function casarAlternativa(texto, formato) {
  if (formato === "acessivel") {
    const match = texto.match(/^\s*([a-e])\.\s+(.+)$/)
    return match ? { letra: match[1].toUpperCase(), texto: match[2] } : null
  }

  const match = texto.match(/^([A-E]) (.+)$/)
  return match ? { letra: match[1], texto: match[2] } : null
}

/**
 * Agrupa as linhas em itens, usando o número impresso na prova.
 *
 * A primeira versão disto inferia o número pela ordem de leitura, porque o
 * marcador "QUESTÃO" parecia não existir no texto. Ele existe: sumia na
 * extração em Latin-1, onde "QUESTÃO" vira uma sequência de bytes que não
 * casa com busca nenhuma. Ler em UTF-8 devolve os 90 marcadores.
 *
 * A diferença não é de conveniência. Numerar por ordem significa que um item
 * perdido desloca todos os seguintes e cada um passa a receber a resposta do
 * vizinho — erro que não se denuncia, porque a questão continua plausível na
 * tela. Lendo o número impresso, cada item carrega a própria identidade e um
 * item perdido é só um item a menos.
 */
export function segmentar(linhas, { formato = "impressa" } = {}) {
  const marcadores = []
  for (let i = 0; i < linhas.length; i += 1) {
    const match = linhas[i].texto.match(/^\s*QUESTÃO\s+(\d+)/i)
    if (match) marcadores.push({ indice: i, numero: Number(match[1]), pagina: linhas[i].pagina })
  }

  return marcadores.map((marcador, posicao) => {
    const fim = posicao + 1 < marcadores.length ? marcadores[posicao + 1].indice : linhas.length
    const corpo = linhas.slice(marcador.indice + 1, fim)

    const alternativas = []
    let inicioAlternativas = corpo.length

    for (let i = 0; i < corpo.length; i += 1) {
      const match = casarAlternativa(corpo[i].texto, formato)
      if (!match) continue
      // Só conta se for a próxima letra esperada: assim "A partir de..." no
      // meio do enunciado não é confundido com a alternativa A.
      if (match.letra !== LETRAS[alternativas.length]) continue
      if (!alternativas.length) inicioAlternativas = i

      // A alternativa continua nas linhas seguintes até aparecer a próxima
      // letra. Sem juntar essas linhas, toda alternativa longa é entregue
      // cortada no meio da frase — e a resposta certa pode ficar em pedaço
      // que não se lê.
      const continuacao = []
      for (let j = i + 1; j < corpo.length; j += 1) {
        const proxima = corpo[j].texto
        if (casarAlternativa(proxima, formato) || /^\s*QUESTÃO\s+\d+/i.test(proxima)) break
        if (!proxima.trim()) break
        continuacao.push(proxima.trim())
      }

      alternativas.push({ letra: match.letra, texto: [match.texto.trim(), ...continuacao].join(" ").trim() })
      if (alternativas.length === 5) break
    }

    return {
      numero: marcador.numero,
      pagina: marcador.pagina,
      enunciado: corpo
        .slice(0, inicioAlternativas)
        .map((l) => l.texto.trim())
        .filter(Boolean)
        .join("\n")
        .trim(),
      alternativas,
    }
  })
}

/**
 * Confere um item antes de deixá-lo entrar.
 *
 * Devolve a lista de motivos para rejeitar — vazia quer dizer aprovado.
 */
export function conferir(item) {
  const problemas = []

  if (item.alternativas.length !== 5) {
    problemas.push(alternativasSaoImagem(item) ? "alternativas são figuras, não texto" : `${item.alternativas.length} alternativas`)
  }
  if (item.alternativas.some((a) => !a.texto)) problemas.push("alternativa vazia")
  if (!item.enunciado) problemas.push("enunciado vazio")
  if (item.enunciado && !pareacePortugues(item.enunciado)) problemas.push("texto ilegível (fonte sem mapa de caracteres)")

  // As alternativas precisam da mesma checagem, e não só o enunciado.
  // Cinco questões de 2021 atravessaram tudo com enunciado aceitável e
  // alternativas cifradas — a de número 131 oferecia "UHGXomR" no lugar de
  // "redução". Enunciado legível com opções ilegíveis é pior que questão
  // rejeitada: parece utilizável até o aluno tentar responder.
  if (item.alternativas.some((a) => a.texto && temLetraTrocada(a.texto))) {
    problemas.push("alternativa ilegível (fonte sem mapa de caracteres)")
  }

  return problemas
}

/**
 * Desfaz a cifra de fonte, quando ela existe.
 *
 * Alguns cadernos — 2021 é o pior — trazem parte do texto numa fonte sem mapa
 * de caracteres, e o extrator devolve cada letra deslocada 29 posições no
 * código: "DOFRRO{PHWUR" no lugar de "alcoolímetro". O deslocamento é fixo,
 * mas atinge só alguns trechos: dentro da mesma questão, uma linha sai cifrada
 * e a seguinte sai limpa. Decodificar o documento inteiro estragaria as linhas
 * boas.
 *
 * Por isso a decisão é por linha e por comparação: decodifica-se, e fica a
 * versão que mais se parece com português. Nenhuma tabela de acentos precisa
 * estar completa para isso funcionar — se o resultado não melhorar, a linha
 * original é mantida como estava.
 */
const PALAVRAS_COMUNS = [" de ", " que ", " para ", " com ", " uma ", " em ", " os ", " as ", " do ", " da "]

const DESLOCAMENTO = 29

function decodificar(linha) {
  return linha.replace(/[!-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + DESLOCAMENTO))
}

/** Quanto uma linha se parece com português: conta partículas frequentes. */
function pontuarPortugues(linha) {
  const alvo = ` ${linha.toLowerCase()} `
  return PALAVRAS_COMUNS.filter((p) => alvo.includes(p)).length
}

export function repararCifra(texto) {
  return texto
    .split("\n")
    .map((linha) => {
      if (linha.trim().length < 12) return linha
      const decodificada = decodificar(linha)
      if (pontuarPortugues(decodificada) <= pontuarPortugues(linha)) return linha

      // A decifragem devolve as letras, mas não os acentos: "deficiência" volta
      // como "de¿cincia" e "doença" como "doena", porque os caracteres
      // acentuados vivem fora da faixa deslocada e se perdem na extração.
      //
      // O resultado é pior do que parece. Texto meio consertado passa na
      // checagem de legibilidade — tem "de", tem "que" — e entra no banco com
      // palavras mutiladas, enquanto o texto cifrado seria rejeitado na hora.
      // Consertar pela metade transforma um erro barulhento em um silencioso,
      // então a linha decifrada só vale se tiver sobrevivido inteira.
      return perdeuAcentos(decodificada) ? linha : decodificada
    })
    .join("\n")
}

/** Português sem nenhum acento em texto longo é sinal de caractere perdido. */
function perdeuAcentos(linha) {
  return linha.length > 60 && !/[áàâãéêíóôõúüç]/i.test(linha)
}

/**
 * Verifica se o texto extraído é português legível.
 *
 * Alguns cadernos — 2021 é um deles — usam fonte sem mapa de caracteres, e o
 * extrator devolve o texto cifrado: "DOFRRO{PHWUR *D\ /XVVDF" no lugar de
 * "alcoolímetro Gay-Lussac", cada letra deslocada três posições. O engano é
 * traiçoeiro porque é parcial: dentro da mesma questão um trecho sai legível e
 * o outro não, então a importação parece ter dado certo e a questão chega
 * ilegível ao professor.
 *
 * A checagem é grosseira de propósito. Texto em português tem palavras curtas
 * e frequentes — "de", "que", "para" —, e nenhuma sobrevive à cifra. Bastam
 * algumas delas para distinguir texto de ruído, sem tentar adivinhar idioma.
 */
function pareacePortugues(texto) {
  const alvo = ` ${texto.toLowerCase()} `
  const encontradas = PALAVRAS_COMUNS.filter((palavra) => alvo.includes(palavra)).length
  return encontradas >= 3 && !temLetraTrocada(texto)
}

/**
 * Detecta caractere estranho no meio de palavra.
 *
 * A checagem por palavras comuns não basta. Quando a fonte quebrada atinge só
 * parte da questão, sobra um texto que tem "de" e "que" — e passa — mas traz
 * "semiequa}es" no lugar de "semiequações", "hidrxido de sdio" no lugar de
 * "hidróxido de sódio" e "Àavorizante" no lugar de "flavorizante". É legível
 * o bastante para enganar o teste e ilegível demais para um aluno.
 *
 * O sinal é o símbolo cercado de letras: `}`, `{`, `¿`, `|` e `À` não aparecem
 * dentro de palavra em português nenhuma.
 */
function temLetraTrocada(texto) {
  // Símbolo entre letras: "semiequa}es", "lisoss{mica", "identi¿car".
  if (/[a-zà-ú][{}¿À½][a-zà-ú]/i.test(texto)) return true

  // Símbolo abrindo palavra: "Àavorizante" por "flavorizante".
  if (/(^|\s)[{}¿À][a-zà-ú]{2,}/.test(texto)) return true

  // Texto longo sem um único acento. Em português isso não acontece: é sinal
  // de que os caracteres acentuados se perderam na extração e sobraram
  // "clulas tm" por "células têm", "hidrxido de sdio" por "hidróxido de sódio".
  // O corte é alto de propósito, para não confundir com enunciado curto ou
  // fórmula.
  const letras = texto.replace(/[^a-zà-ú]/gi, "").length
  if (letras > 200 && !/[áàâãéêíóôõúüç]/i.test(texto)) return true

  return false
}

/**
 * Distingue "não consegui ler" de "não há o que ler".
 *
 * Quando as cinco alternativas são gráficos — comum em Matemática e em
 * Ciências da Natureza —, a letra aparece sozinha na linha e o desenho vem
 * embaixo, invisível para o extrator de texto. Sem esta distinção, o relatório
 * diz "0 alternativas" e parece defeito do parser, quando na verdade a questão
 * é irrecuperável por texto e precisa da imagem ou de um link para a prova.
 */
function alternativasSaoImagem(item) {
  const letrasSozinhas = LETRAS.filter((letra) =>
    item.enunciado.split("\n").some((linha) => linha.trim() === letra),
  )
  return letrasSozinhas.length >= 4
}

/**
 * Separa a audiodescrição das figuras do resto do enunciado.
 *
 * A versão acessível traz, para cada imagem, um bloco entre "Descrição da
 * figura:" e "(Fim da descrição)" — escrito pelo INEP para quem não pode ver a
 * figura. Guardar isso num campo próprio, e não diluído no enunciado, é o que
 * permite ao site mostrar a imagem para quem enxerga e a descrição para quem
 * usa leitor de tela, em vez de escolher um dos dois públicos.
 *
 * O enunciado devolvido fica sem os blocos, porque repetir a descrição no meio
 * do texto atrapalha quem já está vendo a figura.
 */
export function separarDescricoes(enunciado) {
  const descricoes = []
  const padrao = /Descrição da figura:\s*([\s\S]*?)\(Fim da descrição\)/g

  for (const match of enunciado.matchAll(padrao)) {
    descricoes.push(match[1].replace(/\s+/g, " ").trim())
  }

  return {
    enunciado: enunciado.replace(padrao, "").replace(/\n{3,}/g, "\n\n").trim(),
    descricoes,
  }
}

/**
 * Marca os itens que dependem de imagem.
 *
 * Muita questão do ENEM se apoia em gráfico, mapa, charge ou tabela, e nada
 * disso sobrevive à extração de texto. O item fica com enunciado curto ou sem
 * pergunta nenhuma — e importá-lo assim entregaria ao professor uma questão
 * impossível de responder. Marcados aqui, eles podem ser guardados apontando
 * para a página da prova original em vez de fingir que estão completos.
 */
export function marcarDependenciaDeImagem(item) {
  const texto = item.enunciado
  const curto = texto.length < 120
  const semPergunta = !/[?:]\s*$/.test(texto) && !/\b(assinale|indique|conclui|constata|refere|apresenta|corresponde|justifica|explica|caracteriza)\b/i.test(texto)
  return curto || semPergunta
}
