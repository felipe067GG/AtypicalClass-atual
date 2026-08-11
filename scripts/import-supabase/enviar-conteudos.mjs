/**
 * Envia a biblioteca de conteúdos para o Supabase.
 *
 * Lê `data/conteudos/` e escreve na tabela `conteudos`, criada por
 * `scripts/09-biblioteca-de-conteudos.sql`. Rode o SQL antes.
 *
 * **Não escreve nada sem `--confirmar`.** Sem a flag, faz o trabalho inteiro em
 * memória e relata exatamente o que faria. O banco é o de produção, que serve
 * www.atypicalclass.com.br — mesma régua do `enviar.mjs`.
 *
 * Uso:
 *   node scripts/import-supabase/enviar-conteudos.mjs             # ensaio
 *   node scripts/import-supabase/enviar-conteudos.mjs --confirmar # escreve
 *
 * ## Por que é um script separado, e não uma flag do `enviar.mjs`
 *
 * Porque a única coisa que os dois compartilham é o destino. O `enviar.mjs`
 * carrega 3.775 questões, mede barreiras, sobe 2.367 imagens para o Storage e
 * tem a armadilha do `--rehospedar-enem`, que devolve 802 linhas para 'externo'
 * quando esquecida. Nada disso vale aqui, e pendurar a biblioteca naquele script
 * faria quem quisesse subir 170 conteúdos carregar o acervo inteiro de questões
 * para descobrir se pode.
 *
 * ## O que este script recusa antes de escrever
 *
 * A regra que o banco também guarda, em `conteudos_videos_revisados`: vídeo com
 * `revisado: false` derruba a execução inteira, e não só a linha dele. Uma
 * importação parcial deixaria a tabela dizendo menos do que os arquivos dizem,
 * sem nada acusando — que é o defeito que já custou um vídeo em `videos.mjs`.
 */
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

import { createClient } from "@supabase/supabase-js"

const CONFIRMAR = process.argv.includes("--confirmar")
const PASTA = join(process.cwd(), "data", "conteudos")
const LOTE = 50

// --- Credenciais -------------------------------------------------------------

async function lerEnv() {
  const env = { ...process.env }
  try {
    const arquivo = await readFile(join(process.cwd(), ".env.local"), "utf8")
    for (const linha of arquivo.split(/\r?\n/)) {
      if (!linha.includes("=") || linha.trimStart().startsWith("#")) continue
      const i = linha.indexOf("=")
      const chave = linha.slice(0, i).trim()
      if (!env[chave]) env[chave] = linha.slice(i + 1).trim().replace(/^"|"$/g, "")
    }
  } catch {
    // Sem .env.local, resta o ambiente — é o caso do CI.
  }
  return env
}

const env = await lerEnv()
const URL_SUPABASE = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL
const CHAVE = env.SUPABASE_SERVICE_ROLE_KEY

if (!URL_SUPABASE || !CHAVE) {
  console.error("Faltam NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.")
  process.exit(1)
}

// --- Leitura -----------------------------------------------------------------

/**
 * A matéria vem do arquivo, e não do conteúdo.
 *
 * `data/conteudos/matematica.json` declara `materia` uma vez no topo e a lista
 * de conteúdos embaixo. Repetir a matéria em cada um deixaria o arquivo poder
 * discordar de si mesmo.
 */
async function lerConteudos() {
  const linhas = []
  const problemas = []

  const arquivos = (await readdir(PASTA)).filter((n) => n.endsWith(".json")).sort()

  for (const nome of arquivos) {
    const acervo = JSON.parse(await readFile(join(PASTA, nome), "utf8"))
    const materia = acervo.materia
    if (!materia) {
      problemas.push(`${nome} — não declara \`materia\` no topo`)
      continue
    }

    for (const c of acervo.conteudos ?? []) {
      const onde = `${nome} :: ${c.id}`

      if (!c.id) problemas.push(`${onde} — sem id`)
      if (!(c.fontes ?? []).length) problemas.push(`${onde} — sem fonte`)
      if (!(c.bncc ?? []).length) problemas.push(`${onde} — sem código da BNCC`)
      if (!(c.exigencias ?? []).length) problemas.push(`${onde} — sem exigência declarada`)
      if (!c.plano?.etapas?.length) problemas.push(`${onde} — plano sem etapas`)

      for (const v of c.videos ?? []) {
        if (v.revisado !== true) {
          problemas.push(`${onde} — vídeo não revisado: ${v.url}`)
        }
      }

      linhas.push({
        id: c.id,
        materia,
        etapa: c.etapa,
        ano: c.ano,
        titulo: c.titulo,
        descricao: c.descricao,
        bncc: c.bncc ?? [],
        exigencias: c.exigencias ?? [],
        plano: c.plano,
        fontes: c.fontes ?? [],
        videos: c.videos ?? [],
        notas: c.notas ?? [],
        updated_at: new Date().toISOString(),
      })
    }
  }

  return { linhas, problemas }
}

const { linhas, problemas } = await lerConteudos()

if (problemas.length) {
  console.error(`\n${problemas.length} problema(s) — nada foi enviado:\n`)
  for (const p of problemas) console.error(`  ${p}`)
  process.exit(1)
}

// --- Relatório ---------------------------------------------------------------

const porMateria = new Map()
for (const l of linhas) porMateria.set(l.materia, (porMateria.get(l.materia) ?? 0) + 1)

const videos = linhas.reduce((s, l) => s + l.videos.length, 0)
const acessiveis = linhas.reduce(
  (s, l) => s + l.videos.filter((v) => v.paraEspecialidade).length,
  0,
)

console.log(`Projeto:   ${URL_SUPABASE}`)
console.log(`Conteúdos: ${linhas.length} em ${porMateria.size} matérias`)
console.log(`Vídeos:    ${videos} — ${acessiveis} acessíveis, ${videos - acessiveis} gerais`)
console.log(`Notas:     ${linhas.reduce((s, l) => s + l.notas.length, 0)}`)
console.log("")
for (const [materia, n] of [...porMateria].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(3)}  ${materia}`)
}

if (!CONFIRMAR) {
  console.log("\nENSAIO — nada foi escrito.")
  console.log("Para escrever de verdade: npm run enviar:conteudos -- --confirmar")
  process.exit(0)
}

// --- Escrita -----------------------------------------------------------------

const supabase = createClient(URL_SUPABASE, CHAVE, { auth: { persistSession: false } })

console.log("\nEnviando…")
let enviadas = 0

for (let i = 0; i < linhas.length; i += LOTE) {
  const lote = linhas.slice(i, i + LOTE)
  const { error } = await supabase.from("conteudos").upsert(lote, { onConflict: "id" })
  if (error) {
    console.error(`\nFalhou no lote ${i}–${i + lote.length}: ${error.message}`)
    console.error(`${enviadas} linha(s) já haviam entrado. Corrija e rode de novo — o upsert é por id.`)
    process.exit(1)
  }
  enviadas += lote.length
  console.log(`  ${enviadas}/${linhas.length}`)
}

// A contagem final vem do banco, e não do laço acima: o que interessa é o que
// está lá, não o que este processo acha que mandou.
const { count, error } = await supabase.from("conteudos").select("id", { count: "exact", head: true })
if (error) {
  console.error(`Enviado, mas não consegui reler para conferir: ${error.message}`)
  process.exit(1)
}

console.log(`\nPronto. A tabela \`conteudos\` tem ${count} linha(s).`)
if (count !== linhas.length) {
  console.log(
    `Atenção: os arquivos têm ${linhas.length}. A diferença é de linha antiga que não veio desta importação.`,
  )
}
