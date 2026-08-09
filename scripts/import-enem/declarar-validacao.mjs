/**
 * Escreve `fonte.validacao` nas questões do ENEM.
 *
 * O acervo do ENEM sempre teve as duas fontes independentes — a API `enem.dev`
 * e o `TX_GABARITO` dos microdados do INEP, ambas registradas em `fonte` —, mas
 * nunca **declarou** que tinha. Quem declarava era só o acervo de vestibular,
 * com "fonte única (BLUEX)", e a assimetria significava que uma questão sem
 * declaração podia ser tanto uma do ENEM (conferida duas vezes) quanto um
 * descuido. As duas coisas ficavam iguais na leitura.
 *
 * Este script fecha isso. Roda uma vez; depois dele, `conferir.mjs` passa a
 * exigir a declaração dos dois acervos, e a restrição `questoes_fonte_declara_validacao`
 * do banco recusa qualquer questão que chegue sem ela.
 *
 * Só escreve em questão que tenha, de fato, as duas procedências registradas.
 * Se alguma não tiver, ela é relatada e fica sem declaração — que é o
 * comportamento certo: a declaração descreve a garantia, não a substitui.
 *
 * Uso:  node scripts/import-enem/declarar-validacao.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { VALIDACAO_ENEM } from "./validacao.mjs"

const PASTA = join(process.cwd(), "data", "enem")

const arquivos = (await readdir(PASTA)).filter((n) => /^\d{4}-(CN|CH|LC|MT)\.json$/.test(n)).sort()

let declaradas = 0
let jaTinham = 0
const semAsDuasFontes = []

for (const arquivo of arquivos) {
  const caminho = join(PASTA, arquivo)
  const questoes = JSON.parse(await readFile(caminho, "utf8"))
  let mudou = false

  for (const questao of questoes) {
    const temApi = Boolean(questao.fonte?.questaoApi)
    const temMicrodados = Boolean(questao.fonte?.provaMicrodados && questao.fonte?.microdados)

    if (!temApi || !temMicrodados) {
      semAsDuasFontes.push(`${arquivo} q${questao.numero}`)
      continue
    }
    if (questao.fonte.validacao === VALIDACAO_ENEM) {
      jaTinham += 1
      continue
    }

    questao.fonte.validacao = VALIDACAO_ENEM
    declaradas += 1
    mudou = true
  }

  if (mudou) await writeFile(caminho, `${JSON.stringify(questoes, null, 2)}\n`, "utf8")
}

console.log(`Declaradas agora:  ${declaradas}`)
console.log(`Já declaradas:     ${jaTinham}`)
console.log(`Sem as duas fontes: ${semAsDuasFontes.length}`)
for (const q of semAsDuasFontes.slice(0, 10)) console.log(`  ${q}`)
if (semAsDuasFontes.length > 10) console.log(`  ... e mais ${semAsDuasFontes.length - 10}`)
