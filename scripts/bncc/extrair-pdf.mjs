/**
 * Extrair texto de um PDF, acompanhando a fonte ativa em cada trecho.
 *
 * Este arquivo nasceu dentro de `scripts/autorais/conferir-bncc.mjs`, onde
 * custou três tentativas para funcionar. Saiu de lá quando um segundo documento
 * oficial precisou ser lido — o da Educação Infantil e do Ensino Fundamental —
 * e a alternativa era duplicar o parser. Duplicar um parser que falha em
 * silêncio é como se perde a memória de por que ele é assim.
 *
 * As armadilhas estão comentadas onde acontecem. Todas foram pagas.
 *
 * O que este módulo **não** faz: decidir se a leitura foi suficiente. Ele
 * devolve `paginasLidas` e `paginasTotais`, e quem chama decide o piso — porque
 * o piso depende do documento, e um número fixo aqui envelheceria em silêncio no
 * dia em que o MEC republicasse o PDF com outra paginação.
 */
import { inflateSync } from "node:zlib"

/**
 * @param {Buffer} pdf
 * @returns {{ texto: string, paginasLidas: number, paginasTotais: number }}
 */
export function extrairTexto(pdf) {
  const bruto = pdf.toString("latin1")

  // --- Objetos do PDF --------------------------------------------------------

  /** Corpo de cada objeto indireto, por número. */
  const objetos = new Map()

  for (const achado of bruto.matchAll(/(\d+)\s+\d+\s+obj\b([\s\S]*?)endobj/g)) {
    objetos.set(Number(achado[1]), achado[2])
  }

  /** O trecho binário de um `stream ... endstream`, já descomprimido quando dá. */
  function fluxoDe(corpo) {
    const inicio = corpo.indexOf("stream")
    if (inicio < 0) return null
    let i = inicio + 6
    if (corpo[i] === "\r") i += 1
    if (corpo[i] === "\n") i += 1
    const fim = corpo.indexOf("endstream", i)
    if (fim < 0) return null

    const dados = Buffer.from(corpo.slice(i, fim), "latin1")
    if (!/\/FlateDecode/.test(corpo.slice(0, inicio))) return dados
    try {
      return inflateSync(dados)
    } catch {
      return null
    }
  }

  /**
   * Objetos que moram dentro de outros.
   *
   * A partir do PDF 1.5, o gerador pode empacotar objetos sem fluxo dentro de um
   * `/Type /ObjStm` comprimido. Um leitor que só varre `N 0 obj` no arquivo cru
   * simplesmente não os enxerga — e é aí que costumam estar os dicionários de
   * recursos e de fonte, justamente o que este módulo precisa.
   */
  for (const [, corpo] of [...objetos]) {
    if (!/\/Type\s*\/ObjStm/.test(corpo)) continue
    const conteudo = fluxoDe(corpo)
    if (!conteudo) continue

    const n = Number(corpo.match(/\/N\s+(\d+)/)?.[1] ?? 0)
    const primeiro = Number(corpo.match(/\/First\s+(\d+)/)?.[1] ?? 0)
    const texto = conteudo.toString("latin1")
    const cabecalho = texto.slice(0, primeiro).trim().split(/\s+/).map(Number)

    for (let k = 0; k < n; k += 1) {
      const numero = cabecalho[k * 2]
      const deslocamento = cabecalho[k * 2 + 1]
      const proximo = k + 1 < n ? cabecalho[k * 2 + 3] : texto.length - primeiro
      if (numero === undefined || deslocamento === undefined) continue
      if (!objetos.has(numero)) objetos.set(numero, texto.slice(primeiro + deslocamento, primeiro + proximo))
    }
  }

  // --- Mapas de caractere ----------------------------------------------------

  const cacheDeCmap = new Map()

  /**
   * O ToUnicode de uma fonte: código do byte → caractere de verdade.
   *
   * Quando a fonte não traz ToUnicode, isso não quer dizer que o texto seja
   * ilegível. Fonte simples com `WinAnsiEncoding` — a maior parte destes
   * documentos — usa o próprio byte como caractere, e basta lê-lo. Descartar
   * essas fontes, como a primeira versão fazia, jogava fora 103 das 154 páginas
   * da BNCC do Ensino Médio: sobravam as 51 que por acaso usavam fonte com mapa
   * embutido, e o documento parecia quase vazio.
   */
  function cmapDaFonte(corpoDaFonte) {
    const referencia = corpoDaFonte.match(/\/ToUnicode\s+(\d+)\s+\d+\s+R/)
    if (!referencia) {
      const simples = /\/Subtype\s*\/(Type1|TrueType|MMType1)/.test(corpoDaFonte)
      return simples ? { identidade: true, bytes: 1 } : null
    }

    const numero = Number(referencia[1])
    // A chave inclui o tipo da fonte porque a largura do código vem dele, e não
    // do mapa: duas fontes podem apontar para o mesmo ToUnicode e lê-lo com
    // larguras diferentes.
    const chave = `${numero}-${/\/Subtype\s*\/Type0/.test(corpoDaFonte) ? 2 : 1}`
    if (cacheDeCmap.has(chave)) return cacheDeCmap.get(chave)

    const conteudo = fluxoDe(objetos.get(numero) ?? "")
    if (!conteudo) {
      cacheDeCmap.set(chave, null)
      return null
    }

    const texto = conteudo.toString("latin1")
    const mapa = new Map()

    for (const bloco of texto.match(/beginbfchar([\s\S]*?)endbfchar/g) ?? []) {
      for (const par of bloco.matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
        mapa.set(parseInt(par[1], 16), String.fromCharCode(parseInt(par[2].slice(0, 4), 16)))
      }
    }
    for (const bloco of texto.match(/beginbfrange([\s\S]*?)endbfrange/g) ?? []) {
      for (const faixa of bloco.matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
        const de = parseInt(faixa[1], 16)
        const ate = parseInt(faixa[2], 16)
        const inicio = parseInt(faixa[3].slice(0, 4), 16)
        if (ate - de > 65535) continue
        for (let c = de; c <= ate; c += 1) mapa.set(c, String.fromCharCode(inicio + c - de))
      }
    }

    /**
     * Quantos bytes por caractere — e a resposta não está em nenhum dos dois
     * lugares onde ela parece estar.
     *
     * Não está no `codespacerange`: nestes documentos até a fonte simples
     * declara `<0000> <FFFF>`. E não está na largura das chaves do mapa: o
     * gerador escreve `<0041>` mesmo para código de um byte. Tentei os dois, e
     * os dois fazem o leitor consumir os bytes aos pares numa fonte de um byte —
     * aí nenhum código cai no mapa, tudo decodifica para string vazia, e o
     * resultado é um documento sem uma letra. Que se parece com "não achei os
     * códigos" e não com "li errado", que é o que torna esse erro caro.
     *
     * Quem responde é o tipo da fonte, e só ele: `/Type0` é a fonte composta, de
     * dois bytes; `/Type1` e `/TrueType` são simples, de um.
     */
    const bytes = /\/Subtype\s*\/Type0/.test(corpoDaFonte) ? 2 : 1

    const resultado = { mapa, bytes }
    cacheDeCmap.set(chave, resultado)
    return resultado
  }

  // --- Decodificar as páginas ------------------------------------------------

  function bytesDeLiteral(texto) {
    const saida = []
    for (let i = 0; i < texto.length; i += 1) {
      if (texto[i] !== "\\") {
        saida.push(texto.charCodeAt(i))
        continue
      }
      i += 1
      const c = texto[i]
      if (c >= "0" && c <= "7") {
        let octal = ""
        while (octal.length < 3 && texto[i] >= "0" && texto[i] <= "7") {
          octal += texto[i]
          i += 1
        }
        i -= 1
        saida.push(parseInt(octal, 8))
      } else if (c === "n") saida.push(10)
      else if (c === "r") saida.push(13)
      else if (c === "t") saida.push(9)
      else if (c === "b") saida.push(8)
      else if (c === "f") saida.push(12)
      else if (c !== undefined) saida.push(texto.charCodeAt(i))
    }
    return saida
  }

  function decodificar(bytes, cmap) {
    if (!cmap) return ""
    if (cmap.identidade) return bytes.map((b) => String.fromCharCode(b)).join("")
    let saida = ""
    const passo = cmap.bytes
    for (let i = 0; i + passo <= bytes.length; i += passo) {
      const codigo = passo === 2 ? (bytes[i] << 8) | bytes[i + 1] : bytes[i]
      saida += cmap.mapa.get(codigo) ?? ""
    }
    return saida
  }

  /**
   * O dicionário de fontes de uma página.
   *
   * Procurar `/Font` direto no corpo da página resolve a maioria dos casos,
   * porque o `/Resources` costuma vir embutido ali. Mas ele pode vir por
   * referência, e pode não vir de jeito nenhum — o PDF permite que a página
   * herde os recursos do nó pai da árvore de páginas. Uma primeira versão só
   * tratava o caso embutido e devolvia página sem fonte nenhuma nos outros dois;
   * como página sem fonte é pulada, o documento saía quase vazio sem nenhum erro
   * aparecer.
   */
  function dicionarioDeFontes(corpo, profundidade = 0) {
    if (!corpo || profundidade > 4) return ""

    const direto = corpo.match(/\/Font\s*(?:(\d+)\s+\d+\s+R|<<([\s\S]*?)>>)/)
    if (direto) return direto[1] ? (objetos.get(Number(direto[1])) ?? "") : direto[2]

    const recursos = corpo.match(/\/Resources\s+(\d+)\s+\d+\s+R/)
    if (recursos) {
      const achado = dicionarioDeFontes(objetos.get(Number(recursos[1])), profundidade + 1)
      if (achado) return achado
    }

    const pai = corpo.match(/\/Parent\s+(\d+)\s+\d+\s+R/)
    return pai ? dicionarioDeFontes(objetos.get(Number(pai[1])), profundidade + 1) : ""
  }

  /** As fontes declaradas nos recursos de uma página: nome do recurso → cmap. */
  function fontesDaPagina(corpoDaPagina) {
    const dicionario = dicionarioDeFontes(corpoDaPagina)
    if (!dicionario) return new Map()

    const fontes = new Map()

    for (const entrada of dicionario.matchAll(/\/([A-Za-z0-9_.+-]+)\s+(\d+)\s+\d+\s+R/g)) {
      const corpo = objetos.get(Number(entrada[2]))
      if (!corpo) continue

      // Fonte composta: o ToUnicode pode estar no descendente.
      const descendente = corpo.match(/\/DescendantFonts\s*\[\s*(\d+)\s+\d+\s+R/)
      const cmap = cmapDaFonte(corpo) ?? (descendente ? cmapDaFonte(objetos.get(Number(descendente[1])) ?? "") : null)
      if (cmap) fontes.set(entrada[1], cmap)
    }
    return fontes
  }

  /** O texto de uma página, decodificado com o mapa da fonte ativa em cada trecho. */
  function textoDaPagina(corpoDaPagina) {
    const fontes = fontesDaPagina(corpoDaPagina)
    if (!fontes.size) return ""

    const conteudos = corpoDaPagina.match(/\/Contents\s*(?:(\d+)\s+\d+\s+R|\[([\s\S]*?)\])/)
    if (!conteudos) return ""

    const numeros = conteudos[1]
      ? [Number(conteudos[1])]
      : [...conteudos[2].matchAll(/(\d+)\s+\d+\s+R/g)].map((r) => Number(r[1]))

    let saida = ""

    for (const numero of numeros) {
      const conteudo = fluxoDe(objetos.get(numero) ?? "")
      if (!conteudo) continue
      // `/Span<</ActualText<FEFF0009>>>` carrega uma string hexadecimal que não é
      // texto da página — é metadado de acessibilidade. Sai antes da varredura
      // para não entrar no meio das palavras.
      //
      // Os `>>+` e o limite de tamanho não são zelo: o marcador fecha com três
      // `>` seguidos (`<FEFF0009>` + `>>`), e uma versão que exigia exatamente
      // dois não casava ali — a busca preguiçosa então corria até o `>>`
      // seguinte, a páginas de distância, apagando o texto inteiro do caminho. O
      // documento saiu com três páginas legíveis e nenhum erro.
      const fluxo = conteudo.toString("latin1").replace(/\/Span\s*<<[\s\S]{0,300}?>>+\s*BDC/g, " ")

      let atual = null
      // Um passo por operador que interessa: troca de fonte, texto literal,
      // texto em hexadecimal e as quebras que separam palavras.
      const passos = fluxo.matchAll(
        /\/([A-Za-z0-9_.+-]+)\s+[\d.]+\s+Tf|\(((?:\\.|[^()\\])*)\)|<([0-9A-Fa-f\s]+)>|(T\*|TD|Td|TJ|ET)/g,
      )

      for (const passo of passos) {
        if (passo[1] !== undefined) {
          atual = fontes.get(passo[1]) ?? null
        } else if (passo[2] !== undefined) {
          saida += decodificar(bytesDeLiteral(passo[2]), atual)
        } else if (passo[3] !== undefined) {
          const hex = passo[3].replace(/\s+/g, "")
          const bytes = []
          for (let i = 0; i + 1 < hex.length; i += 2) bytes.push(parseInt(hex.slice(i, i + 2), 16))
          saida += decodificar(bytes, atual)
        } else if (passo[4] === "T*" || passo[4] === "TD" || passo[4] === "Td" || passo[4] === "ET") {
          saida += " "
        }
      }
      saida += "\n"
    }

    return saida
  }

  let texto = ""
  let paginasLidas = 0
  let paginasTotais = 0

  for (const [, corpo] of objetos) {
    if (!/\/Type\s*\/Page\b/.test(corpo)) continue
    paginasTotais += 1
    const trecho = textoDaPagina(corpo)
    if (trecho.trim()) paginasLidas += 1
    texto += trecho
  }

  return { texto, paginasLidas, paginasTotais }
}
