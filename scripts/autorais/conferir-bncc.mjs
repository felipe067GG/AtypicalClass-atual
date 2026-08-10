/**
 * Confere os códigos da BNCC que as questões autorais declaram.
 *
 * As 280 questões autorais declaram uma habilidade da BNCC cada uma. Até certo
 * ponto o código era **declarado, não conferido** — e a conferência pagou o
 * próprio custo na estreia, achando dois códigos que não existem: `EM13CHS606`
 * numa competência que vai até 605, e `EM13LGG504` numa que vai até 503. Nenhuma
 * checagem estrutural pegaria isso, porque os dois têm forma válida e área
 * coerente com a matéria.
 *
 * A leitura do PDF oficial vive em `scripts/bncc/`, e não mais aqui: quando a
 * biblioteca de conteúdos passou a precisar dos códigos do Ensino Fundamental,
 * a alternativa era duplicar um parser que falha em silêncio. As armadilhas
 * todas — dicionário de fontes herdado, largura do código vinda do `/Subtype`, o
 * `/Span<</ActualText<…>>>` que fecha com três `>` — estão comentadas lá, onde
 * acontecem.
 *
 * Uso:
 *   npm run bncc
 *   node scripts/autorais/conferir-bncc.mjs --familia CHS6
 */
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

import { DOCUMENTOS, extrairCodigos } from "../bncc/documentos.mjs"

const PASTA = join(process.cwd(), "data", "autorais")
const DOCUMENTO = DOCUMENTOS.find((d) => d.id === "ensino-medio")

const { codigos: encontrados, paginasLidas, paginasTotais } = await extrairCodigos(DOCUMENTO)

console.log(`Documento: ${DOCUMENTO.url}`)
console.log(`Páginas lidas: ${paginasLidas} de ${paginasTotais}`)
console.log(`Códigos encontrados no PDF: ${encontrados.size}`)

// `--familia CHS6` lista o que existe num grupo, com o começo do texto. Serve
// para escolher o código certo quando um declarado se revela inexistente.
if (process.argv.includes("--familia")) {
  const familia = process.argv[process.argv.indexOf("--familia") + 1]
  for (const [codigo, seguinte] of [...encontrados].sort()) {
    if (codigo.includes(familia)) console.log(`  ${codigo}  ${seguinte.slice(0, 110)}`)
  }
  process.exit(0)
}

const porArea = {}
for (const codigo of encontrados.keys()) {
  const area = codigo.match(/EM13([A-Z]+)/)[1]
  porArea[area] = (porArea[area] ?? 0) + 1
}
console.log(`Por área: ${JSON.stringify(porArea)}`)

// --- Confrontar com o que as questões usam -----------------------------------

const usados = new Map()
for (const arquivo of (await readdir(PASTA)).filter((n) => n.endsWith(".json"))) {
  const acervo = JSON.parse(await readFile(join(PASTA, arquivo), "utf8"))
  for (const questao of acervo.questoes ?? []) {
    if (!usados.has(questao.bncc)) usados.set(questao.bncc, [])
    usados.get(questao.bncc).push(`${acervo.materia} q${questao.numero}`)
  }
}

const inexistentes = [...usados.keys()].filter((codigo) => !encontrados.has(codigo)).sort()

console.log(`\nCódigos usados pelas questões: ${usados.size}`)
console.log(`Confirmados no documento:      ${usados.size - inexistentes.length}`)

if (inexistentes.length) {
  console.log(`\n${inexistentes.length} código(s) NÃO existem na BNCC:`)
  for (const codigo of inexistentes) {
    console.log(`  ${codigo}  — usado em: ${usados.get(codigo).join(", ")}`)
  }
  process.exit(1)
}

console.log("\nTodos os códigos usados existem no documento oficial.")
console.log("\nPara conferir a olho que cada um é do assunto certo:")
for (const codigo of [...usados.keys()].sort()) {
  console.log(`  ${codigo}  ${encontrados.get(codigo).slice(0, 90)}`)
}
