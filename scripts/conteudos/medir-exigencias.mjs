/**
 * Mede o proponente de exigências contra as 170 declaradas por leitura humana.
 *
 * Sem esta conta, "o modelo propõe e o professor confirma" é intenção. Com ela
 * é compromisso verificável: sabe-se quanto da proposta o professor vai ter de
 * corrigir, e qualquer proponente novo — inclusive um modelo de linguagem —
 * passa a ter um número para bater.
 *
 * As 170 exigências não são gabarito perfeito: são a leitura de uma pessoa, e
 * há casos em que ela decidiu de um jeito defensável e outro seria igualmente
 * defensável ("O desenho com três estruturas nomeadas" foi lido como
 * representação visual e não como produção do aluno). O número mede concordância
 * com quem escreveu o acervo, que é o que interessa aqui.
 *
 * Uso:  npm run exigencias
 *       npm run exigencias -- --erros    # lista os desacertos, para inspeção
 */
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import { IDS, proporExigencias } from "./propor-exigencias.mjs"

const PASTA = join(process.cwd(), "data", "conteudos")
const MOSTRAR_ERROS = process.argv.includes("--erros")

/**
 * Piso de concordância, abaixo do qual a proposta não deve ser mostrada sozinha.
 *
 * Não é meta: é o registro do que foi medido em 11/08/2026, para que uma queda
 * apareça. Proponente que cai abaixo disto está pior que o que já existia.
 */
const PISO = { precisao: 0.65, cobertura: 0.45 }

const conteudos = []
for (const arquivo of (await readdir(PASTA)).filter((n) => n.endsWith(".json"))) {
  const bruto = JSON.parse(await readFile(join(PASTA, arquivo), "utf8"))
  const lista = Array.isArray(bruto) ? bruto : (bruto.conteudos ?? [])
  for (const conteudo of lista) conteudos.push({ ...conteudo, materia: arquivo.replace(".json", "") })
}

const contas = Object.fromEntries(IDS.map((id) => [id, { vp: 0, fp: 0, fn: 0 }]))
const erros = []

for (const conteudo of conteudos) {
  const propostas = new Set(proporExigencias(conteudo))
  const declaradas = new Set(conteudo.exigencias ?? [])
  for (const id of IDS) {
    const p = propostas.has(id)
    const d = declaradas.has(id)
    if (p && d) contas[id].vp += 1
    else if (p && !d) {
      contas[id].fp += 1
      erros.push({ tipo: "sobrou", id, titulo: conteudo.titulo, materia: conteudo.materia })
    } else if (!p && d) {
      contas[id].fn += 1
      erros.push({ tipo: "faltou", id, titulo: conteudo.titulo, materia: conteudo.materia })
    }
  }
}

const pct = (x) => (Number.isFinite(x) ? `${(x * 100).toFixed(0)}%` : "—")
let vpTotal = 0
let fpTotal = 0
let fnTotal = 0

console.log(`${conteudos.length} conteúdos, ${conteudos.length * IDS.length} rótulos\n`)
console.table(
  IDS.map((id) => {
    const { vp, fp, fn } = contas[id]
    vpTotal += vp
    fpTotal += fp
    fnTotal += fn
    const precisao = vp / (vp + fp)
    const cobertura = vp / (vp + fn)
    return {
      exigência: id,
      declaradas: vp + fn,
      propostas: vp + fp,
      acertou: vp,
      precisão: pct(precisao),
      cobertura: pct(cobertura),
      F1: pct((2 * precisao * cobertura) / (precisao + cobertura)),
    }
  }),
)

const precisao = vpTotal / (vpTotal + fpTotal)
const cobertura = vpTotal / (vpTotal + fnTotal)
console.log(
  `geral: precisão ${pct(precisao)} · cobertura ${pct(cobertura)} · F1 ${pct((2 * precisao * cobertura) / (precisao + cobertura))}`,
)

if (MOSTRAR_ERROS) {
  console.log("\n=== desacertos ===")
  for (const e of erros) console.log(`  ${e.tipo === "sobrou" ? "+" : "-"} ${e.id.padEnd(22)} ${e.titulo.slice(0, 62)}`)
}

console.log(
  "\nO que este número quer dizer: a proposta automática acerta " +
    `${pct(precisao)} do que propõe e enxerga ${pct(cobertura)} do que existe. ` +
    "É apoio à leitura, não substituto dela — exigência continua sendo declarada por gente.",
)

if (precisao < PISO.precisao || cobertura < PISO.cobertura) {
  console.error(
    `\nAbaixo do piso medido em 11/08/2026 (precisão ${pct(PISO.precisao)}, cobertura ${pct(PISO.cobertura)}).`,
  )
  process.exit(1)
}
