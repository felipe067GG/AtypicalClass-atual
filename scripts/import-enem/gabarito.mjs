/**
 * Leitura do gabarito oficial.
 *
 * O PDF do gabarito é uma tabela simples: número da questão à esquerda, letra
 * à direita, em duas colunas de números por página. Extraído com `-layout`,
 * cada linha vira algo como:
 *
 *     1        B              A     46       C
 *     6                D            51       C
 *
 * As cinco primeiras questões de cada primeiro dia trazem duas letras porque
 * são o bloco de língua estrangeira: uma resposta para quem fez inglês, outra
 * para espanhol. As duas são guardadas — descartar uma silenciosamente daria
 * gabarito errado para metade dos participantes.
 */
import { execFile } from "node:child_process"
import { promisify } from "node:util"

const exec = promisify(execFile)

/**
 * Devolve `Map(numero -> { resposta, respostaEspanhol? })`.
 *
 * A linha é lida da esquerda para a direita, e cada número encontrado leva
 * consigo as letras que aparecem até o próximo número. Ler por posição de
 * coluna seria mais frágil: o alinhamento muda entre anos.
 */
export async function lerGabarito(pdf) {
  const { stdout } = await exec("pdftotext", ["-layout", pdf, "-"], { maxBuffer: 32 * 1024 * 1024 })

  const respostas = new Map()

  for (const linha of stdout.split("\n")) {
    // Cada ocorrência de "<número> <letras>" na linha é uma questão. Uma linha
    // pode conter duas, porque o gabarito é impresso em duas colunas.
    for (const match of linha.matchAll(/\b(\d{1,3})\b((?:\s+[A-E]\b)+)/g)) {
      const numero = Number(match[1])
      const letras = match[2].trim().split(/\s+/)
      if (numero < 1 || numero > 180) continue
      if (respostas.has(numero)) continue

      respostas.set(numero, {
        resposta: letras[0],
        ...(letras.length > 1 ? { respostaEspanhol: letras[1] } : {}),
      })
    }
  }

  return respostas
}

/**
 * Confere se o gabarito cobre exatamente a faixa esperada.
 *
 * Existe porque um gabarito lido pela metade não se denuncia sozinho: as
 * questões que faltam simplesmente não aparecem, e o importador seguiria em
 * frente gravando menos questões sem avisar ninguém.
 */
export function conferirCobertura(respostas, primeira, ultima) {
  const faltando = []
  for (let n = primeira; n <= ultima; n += 1) {
    if (!respostas.has(n)) faltando.push(n)
  }
  return faltando
}
