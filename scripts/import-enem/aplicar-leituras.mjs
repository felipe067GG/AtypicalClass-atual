/**
 * Aplica ao acervo as matérias atribuídas por leitura.
 *
 * As leituras vivem em `materias-lidas.json`, separadas das automáticas, e
 * precisam ser gravadas nas questões. Sem este passo elas ficam só no arquivo
 * de anotações — e a lista de indefinidas devolve as mesmas questões a cada
 * consulta, o que faz reler o que já foi lido.
 *
 * A auditoria de área vale aqui como em qualquer outro caminho: matéria que
 * não pertence à área publicada pelo INEP é recusada, mesmo vindo de leitura.
 *
 * Uso:  node scripts/import-enem/aplicar-leituras.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { materiaCabeNaArea } from "./materia.mjs"

const PASTA = join(process.cwd(), "data", "enem")

const lidas = JSON.parse(await readFile(join(PASTA, "materias-lidas.json"), "utf8"))
const arquivos = (await readdir(PASTA)).filter((n) => /^\d{4}-(CN|CH|LC|MT)\.json$/.test(n))

let aplicadas = 0
let recusadas = 0
const usadas = new Set()

for (const arquivo of arquivos) {
  const [, area] = arquivo.replace(".json", "").split("-")
  const caminho = join(PASTA, arquivo)
  const questoes = JSON.parse(await readFile(caminho, "utf8"))
  let mudou = false

  for (const questao of questoes) {
    const chave = `${questao.fonte.ano}-${questao.fonte.cor}-${questao.numero}`
    const materia = lidas[chave]
    if (!materia) continue

    usadas.add(chave)

    if (!materiaCabeNaArea(materia, area)) {
      console.log(`recusada: ${chave} -> "${materia}" não pertence a ${area}`)
      recusadas += 1
      continue
    }

    // A leitura sobrescreve o palpite por vocabulário de propósito: ela viu o
    // enunciado inteiro, ele contou palavras.
    if (questao.materia === materia && questao.origemDaMateria === "leitura") continue
    questao.materia = materia
    questao.origemDaMateria = "leitura"
    aplicadas += 1
    mudou = true
  }

  if (mudou) await writeFile(caminho, `${JSON.stringify(questoes, null, 2)}\n`)
}

// Chave anotada que não encontrou questão é anotação perdida: ou o número está
// errado, ou a cor, ou a questão saiu do acervo por outro motivo.
const orfas = Object.keys(lidas).filter((k) => k !== "_leia-me" && !usadas.has(k))

console.log(`Aplicadas:  ${aplicadas}`)
if (recusadas) console.log(`Recusadas:  ${recusadas}`)
if (orfas.length) {
  console.log(`Sem questão correspondente: ${orfas.length}`)
  for (const chave of orfas.slice(0, 10)) console.log(`  ${chave}`)
}
