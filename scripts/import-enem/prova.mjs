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
      for (const texto of desindentar(coluna)) {
        linhas.push({ pagina, texto })
      }
    }
  }

  return linhas
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
export function segmentar(linhas) {
  const marcadores = []
  for (let i = 0; i < linhas.length; i += 1) {
    const match = linhas[i].texto.match(/^\s*QUESTÃO\s+(\d+)/)
    if (match) marcadores.push({ indice: i, numero: Number(match[1]), pagina: linhas[i].pagina })
  }

  return marcadores.map((marcador, posicao) => {
    const fim = posicao + 1 < marcadores.length ? marcadores[posicao + 1].indice : linhas.length
    const corpo = linhas.slice(marcador.indice + 1, fim)

    const alternativas = []
    let inicioAlternativas = corpo.length

    for (let i = 0; i < corpo.length; i += 1) {
      const match = corpo[i].texto.match(/^([A-E]) (.+)$/)
      if (!match) continue
      // Só conta se for a próxima letra esperada: assim "A partir de..." no
      // meio do enunciado não é confundido com a alternativa A.
      if (match[1] !== LETRAS[alternativas.length]) continue
      if (!alternativas.length) inicioAlternativas = i

      // A alternativa continua nas linhas seguintes até aparecer a próxima
      // letra. Sem juntar essas linhas, toda alternativa longa é entregue
      // cortada no meio da frase — e a resposta certa pode ficar em pedaço
      // que não se lê.
      const continuacao = []
      for (let j = i + 1; j < corpo.length; j += 1) {
        const proxima = corpo[j].texto
        if (/^[A-E] /.test(proxima) || /^\s*QUESTÃO\s+\d+/.test(proxima)) break
        if (!proxima.trim()) break
        continuacao.push(proxima.trim())
      }

      alternativas.push({ letra: match[1], texto: [match[2].trim(), ...continuacao].join(" ").trim() })
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

  return problemas
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
