/**
 * Tira as imagens de dentro dos enunciados já gravados.
 *
 * A API embute cada figura no corpo da questão em markdown, e os primeiros
 * lotes foram gravados com essa marcação dentro do texto — o professor leria
 * `![](https://.../figura.png)` no meio da frase, porque a página mostra o
 * enunciado como texto puro.
 *
 * Existe como script separado para não refazer 36 importações e mais de mil
 * chamadas à API só para mover uma URL de campo. A correção definitiva está no
 * importador; isto conserta o que já está no disco.
 *
 * Uso:  node scripts/import-enem/limpar-imagens.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

const PASTA = join(process.cwd(), "data", "enem")
const MARKDOWN = /!\[[^\]]*\]\((https?:\/\/[^)]+)\)/g

function separar(texto) {
  const imagens = []
  const limpo = texto
    .replace(MARKDOWN, (_, url) => {
      imagens.push(url)
      return ""
    })
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  return { texto: limpo, imagens }
}

const arquivos = (await readdir(PASTA)).filter((nome) => /^\d{4}-(CN|CH|LC|MT)\.json$/.test(nome))

let questoesTocadas = 0
let urlsMovidas = 0
let urlsNovas = 0

for (const arquivo of arquivos) {
  const caminho = join(PASTA, arquivo)
  const questoes = JSON.parse(await readFile(caminho, "utf8"))
  let mudou = false

  for (const questao of questoes) {
    const { texto, imagens } = separar(questao.enunciado)
    if (!imagens.length) continue

    questoesTocadas += 1
    urlsMovidas += imagens.length

    // A mesma figura costuma estar nos dois lugares: o `Set` evita duplicar, e
    // a diferença de contagem mostra quantas só existiam dentro do texto — que
    // são as que estariam perdidas se o enunciado fosse simplesmente limpo.
    const antes = questao.imagens.length
    questao.imagens = [...new Set([...questao.imagens, ...imagens])]
    urlsNovas += questao.imagens.length - antes

    questao.enunciado = texto
    mudou = true
  }

  if (mudou) await writeFile(caminho, `${JSON.stringify(questoes, null, 2)}\n`)
}

console.log(`Arquivos analisados:     ${arquivos.length}`)
console.log(`Questões corrigidas:     ${questoesTocadas}`)
console.log(`Imagens tiradas do texto: ${urlsMovidas}`)
console.log(`Imagens que só existiam ali: ${urlsNovas}`)
