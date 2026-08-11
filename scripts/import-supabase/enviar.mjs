/**
 * Envia o acervo para o Supabase.
 *
 * Lê `data/` e escreve na tabela `questoes`, criada por
 * `scripts/08-acervo-de-questoes.sql`. Rode o SQL antes.
 *
 * **Não escreve nada sem `--confirmar`.** Sem a flag, faz o trabalho inteiro em
 * memória e relata exatamente o que faria. O banco é o de produção, que serve
 * www.atypicalclass.com.br, e 3.775 linhas entrando por engano é o tipo de coisa
 * que se desfaz mal.
 *
 * Uso:
 *   node scripts/import-supabase/enviar.mjs                # ensaio, não escreve
 *   node scripts/import-supabase/enviar.mjs --confirmar    # escreve de verdade
 *   node scripts/import-supabase/enviar.mjs --confirmar --so-imagens
 *   node scripts/import-supabase/enviar.mjs --confirmar --so-questoes
 *   node scripts/import-supabase/enviar.mjs --confirmar --rehospedar-enem
 *
 * Credenciais: lidas de `.env.local` (as mesmas que a Vercel já tem). Usa a
 * `SUPABASE_SERVICE_ROLE_KEY` porque a tabela `questoes` não tem policy de
 * escrita — o acervo entra por aqui e por mais nenhum caminho.
 */
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

import { createClient } from "@supabase/supabase-js"

import { medir } from "../detectores/medir.mjs"

const CONFIRMAR = process.argv.includes("--confirmar")
const SO_IMAGENS = process.argv.includes("--so-imagens")
const SO_QUESTOES = process.argv.includes("--so-questoes")

/**
 * Baixar as 1.442 imagens do ENEM e servi-las daqui.
 *
 * É opcional de propósito, e não porque seja discutível guardar o próprio
 * acervo: são 1.442 requisições ao `enem.dev`, que é serviço de outra pessoa, e
 * isso é decisão de quem mantém o site — não efeito colateral de uma importação
 * de rotina. Sem a flag, as linhas do ENEM guardam a URL de lá e declaram
 * `imagens_em = 'externo'`, que é a dependência dita em voz alta.
 *
 * Com a flag, elas passam a apontar para o Storage e a declarar 'storage'. O
 * ganho é o acervo parar de depender da disponibilidade de terceiro para 40% das
 * questões — foi exatamente assim que um PDF do MEC sumiu debaixo do site.
 */
const REHOSPEDAR_ENEM = process.argv.includes("--rehospedar-enem")

const BUCKET = "questoes"
const LOTE = 200
const CONCORRENCIA_DE_UPLOAD = 6

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

const supabase = createClient(URL_SUPABASE, CHAVE, { auth: { persistSession: false } })

// --- Carregar os arquivos ----------------------------------------------------

/** A mesma identidade que `scripts/detectores/rodar.mjs` grava em barreiras.json. */
function identidadeReal(questao) {
  const { exame, ano, prova } = questao.fonte ?? {}
  return [exame, ano, prova, questao.numero, questao.idioma].filter(Boolean).join("-")
}

async function carregarReais() {
  const questoes = []
  for (const pasta of [join("data", "enem"), join("data", "vestibular")]) {
    for (const arquivo of await readdir(pasta)) {
      if (!arquivo.endsWith(".json")) continue
      const conteudo = JSON.parse(await readFile(join(pasta, arquivo), "utf8"))
      if (!Array.isArray(conteudo)) continue // materias-lidas.json não é acervo
      questoes.push(...conteudo)
    }
  }
  return questoes
}

async function carregarAutorais() {
  const acervos = []
  for (const arquivo of await readdir(join("data", "autorais"))) {
    if (!arquivo.endsWith(".json")) continue
    const acervo = JSON.parse(await readFile(join("data", "autorais", arquivo), "utf8"))
    acervos.push({ ...acervo, slug: arquivo.replace(".json", "") })
  }
  return acervos
}

const barreirasPorId = new Map(
  JSON.parse(await readFile(join("data", "barreiras.json"), "utf8")).map((r) => [r.id, r]),
)

// --- Montar as linhas --------------------------------------------------------

const LETRAS = ["A", "B", "C", "D", "E"]

/** Imagens em base64 a subir: uma entrada por arquivo, com o caminho de destino. */
const imagensParaSubir = []

function extensaoDe(base64) {
  if (base64.startsWith("/9j/")) return "jpg"
  if (base64.startsWith("iVBOR")) return "png"
  if (base64.startsWith("R0lGOD")) return "gif"
  if (base64.startsWith("UklGR")) return "webp"
  return "bin"
}

/**
 * Onde cada imagem vai parar.
 *
 * O acervo tem dois regimes e eles não se resolvem do mesmo jeito. As 925
 * imagens do vestibular estão em base64 dentro do JSON — 92 MB que não podem ir
 * para uma coluna de texto: inflariam o banco e viriam junto em toda consulta da
 * tela. Vão para o Storage, e a linha guarda o caminho.
 *
 * As 1.442 do ENEM são URLs de `enem.dev`. Ficam apontando para lá por ora, e a
 * coluna `imagens_em` registra isso como 'externo' — é dependência de terceiro,
 * e o acervo declara que tem em vez de fingir que não. Rehospedá-las é um passo
 * à parte, porque são 1.442 requisições a um serviço de outra pessoa.
 */
/** Uma imagem: devolve o caminho no Storage e enfileira a subida, ou deixa a URL. */
function resolverImagem(nome, imagem) {
  if (/^https?:/.test(imagem)) {
    if (!REHOSPEDAR_ENEM) return { destino: imagem, externo: true }
    // A extensão vem da própria URL: as do ENEM terminam em .jpg ou .png, e
    // adivinhar pelo conteúdo exigiria baixar antes de saber o nome.
    const extensao = imagem.split(".").pop().split(/[?#]/)[0].toLowerCase()
    const caminho = `${nome}.${/^(jpe?g|png|gif|webp)$/.test(extensao) ? extensao : "jpg"}`
    imagensParaSubir.push({ caminho, url: imagem })
    return { destino: caminho, externo: false }
  }

  const caminho = `${nome}.${extensaoDe(imagem)}`
  imagensParaSubir.push({ caminho, base64: imagem })
  return { destino: caminho, externo: false }
}

/**
 * Todas as imagens de uma questão — as do enunciado e as de dentro das
 * alternativas.
 *
 * As 570 que moram nas alternativas, em 114 questões, precisam do mesmo
 * tratamento das outras. Rehospedar só as do enunciado faria a linha declarar
 * `imagens_em = 'storage'` enquanto parte dela continuaria em `enem.dev` — e uma
 * declaração que vale para uma parte só é pior que nenhuma, porque ninguém vai
 * conferir a parte.
 */
function resolverImagens(id, questao) {
  const imagens = questao.imagens ?? []
  const alternativas = questao.alternativas ?? []
  const temAlgumaImagem = imagens.length > 0 || alternativas.some((a) => a.imagem)
  if (!temAlgumaImagem) return { caminhos: [], alternativas, onde: "nenhuma" }

  let algumExterno = false

  const caminhos = imagens.map((imagem, i) => {
    const { destino, externo } = resolverImagem(`${id}-${i}`, imagem)
    if (externo) algumExterno = true
    return destino
  })

  const alternativasResolvidas = alternativas.map((alternativa) => {
    if (!alternativa.imagem) return alternativa
    const { destino, externo } = resolverImagem(`${id}-alt-${alternativa.letra}`, alternativa.imagem)
    if (externo) algumExterno = true
    return { ...alternativa, imagem: destino }
  })

  return { caminhos, alternativas: alternativasResolvidas, onde: algumExterno ? "externo" : "storage" }
}

function linhaReal(questao) {
  const id = identidadeReal(questao)
  const medido = barreirasPorId.get(id)
  const { caminhos, alternativas, onde } = resolverImagens(id, questao)

  return {
    id,
    acervo: "real",
    exame: questao.fonte.exame,
    ano: questao.fonte.ano,
    numero: questao.numero,
    idioma: questao.idioma ?? null,
    materia: questao.materia,
    origem_da_materia: questao.origemDaMateria ?? "vocabulário",
    enunciado: questao.enunciado,
    alternativas,
    resposta: questao.resposta,
    dificuldade_b: questao.dificuldade?.b ?? null,
    dificuldade_escala: questao.dificuldade?.escala ?? null,
    dificuldade_faixa: questao.dificuldade?.faixa ?? null,
    habilidade: questao.habilidade ?? null,
    bncc: null,
    imagens: caminhos,
    imagens_em: onde,
    descricoes_de_figuras: questao.descricoesDeFiguras ?? [],
    barreiras: medido?.barreiras ?? [],
    medidas: medido?.medidas ?? {},
    fonte: questao.fonte,
  }
}

/**
 * As autorais são medidas aqui, e não em `data/barreiras.json`.
 *
 * Os limiares dos detectores são percentis do acervo real, e é isso que os torna
 * verificáveis ("um quarto das questões do ENEM é mais longa que esta"). Jogar
 * 280 questões curtas na mesma distribuição moveria os percentis e o relatório
 * de `npm run detectores` passaria a comparar limiar com uma distribuição que já
 * não é a que o gerou. Medir com o mesmo código, à parte, preserva as duas
 * coisas: a régua continua sendo a do ENEM, e a questão autoral também ganha
 * suas barreiras.
 */
function linhaAutoral(acervo, questao) {
  const id = `AUTORAL-${acervo.slug}-${questao.numero}`
  const { barreiras, medidas } = medir({
    enunciado: questao.enunciado,
    alternativas: questao.alternativas.map((texto, i) => ({ letra: LETRAS[i], texto })),
    imagens: [],
    descricoesDeFiguras: [],
  })

  return {
    id,
    acervo: "autoral",
    exame: acervo.fonte.autoria,
    ano: acervo.fonte.ano,
    numero: questao.numero,
    idioma: null,
    materia: acervo.materia,
    origem_da_materia: "autoral",
    enunciado: questao.enunciado,
    alternativas: questao.alternativas.map((texto, i) => ({ letra: LETRAS[i], texto, imagem: null })),
    resposta: questao.resposta,
    dificuldade_b: null,
    dificuldade_escala: null,
    dificuldade_faixa: null,
    habilidade: null,
    bncc: questao.bncc,
    imagens: [],
    imagens_em: "nenhuma",
    descricoes_de_figuras: [],
    barreiras,
    medidas,
    fonte: {
      exame: acervo.fonte.autoria,
      autoria: acervo.fonte.autoria,
      ano: acervo.fonte.ano,
      validacao: acervo.fonte.validacao,
      bncc: { codigo: questao.bncc, documento: acervo.bncc.documento, validacao: acervo.bncc.validacao },
    },
  }
}

const linhas = []
for (const questao of await carregarReais()) linhas.push(linhaReal(questao))
for (const acervo of await carregarAutorais()) {
  for (const questao of acervo.questoes) linhas.push(linhaAutoral(acervo, questao))
}

// --- Conferir antes de escrever ----------------------------------------------

const problemas = []
const vistos = new Set()

for (const linha of linhas) {
  if (vistos.has(linha.id)) problemas.push(`id repetido: ${linha.id}`)
  vistos.add(linha.id)

  if (!linha.materia) problemas.push(`${linha.id}: sem matéria`)
  if (!LETRAS.includes(linha.resposta)) problemas.push(`${linha.id}: resposta ${linha.resposta}`)
  if (!linha.fonte?.validacao) problemas.push(`${linha.id}: fonte não declara validação`)
  if (linha.acervo === "autoral" && !linha.bncc) problemas.push(`${linha.id}: autoral sem BNCC`)
  if (linha.acervo === "autoral" && linha.dificuldade_b !== null) {
    problemas.push(`${linha.id}: autoral com dificuldade`)
  }
  if (linha.acervo === "real" && !barreirasPorId.has(linha.id)) {
    problemas.push(`${linha.id}: sem medida em barreiras.json — rode 'npm run detectores'`)
  }
}

if (problemas.length) {
  console.error(`${problemas.length} problema(s) antes de qualquer escrita:`)
  for (const p of problemas.slice(0, 20)) console.error(`  ${p}`)
  if (problemas.length > 20) console.error(`  ... e mais ${problemas.length - 20}`)
  process.exit(1)
}

// --- Relatório ---------------------------------------------------------------

const porAcervo = {}
const porImagens = {}
for (const l of linhas) {
  porAcervo[l.acervo] = (porAcervo[l.acervo] ?? 0) + 1
  porImagens[l.imagens_em] = (porImagens[l.imagens_em] ?? 0) + 1
}
const locais = imagensParaSubir.filter((i) => i.base64)
const aBaixar = imagensParaSubir.filter((i) => i.url)
const bytesLocais = locais.reduce((s, i) => s + Math.floor((i.base64.length * 3) / 4), 0)

console.log(`Projeto:   ${URL_SUPABASE}`)
console.log(`Linhas:    ${linhas.length}  ${JSON.stringify(porAcervo)}`)
console.log(`Imagens:   ${JSON.stringify(porImagens)}`)
console.log(`Para subir: ${locais.length} arquivos locais, ${(bytesLocais / 1048576).toFixed(1)} MB`)
if (aBaixar.length) console.log(`            + ${aBaixar.length} a baixar do enem.dev e rehospedar`)
else console.log(`            (as do ENEM seguem apontando para enem.dev — use --rehospedar-enem para trazê-las)`)
console.log("")

if (!CONFIRMAR) {
  console.log("ENSAIO — nada foi escrito.")
  console.log("Para escrever de verdade: node scripts/import-supabase/enviar.mjs --confirmar")
  process.exit(0)
}

// --- Escrever ----------------------------------------------------------------

async function emLotesParalelos(itens, tamanho, tarefa) {
  let feitos = 0
  for (let i = 0; i < itens.length; i += tamanho) {
    await Promise.all(itens.slice(i, i + tamanho).map(tarefa))
    feitos += Math.min(tamanho, itens.length - i)
    process.stdout.write(`\r  ${feitos}/${itens.length}`)
  }
  process.stdout.write("\n")
}

if (!SO_QUESTOES && imagensParaSubir.length) {
  const { data: buckets } = await supabase.storage.listBuckets()
  if (!buckets?.some((b) => b.name === BUCKET)) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true })
    if (error) {
      console.error(`Não foi possível criar o bucket "${BUCKET}": ${error.message}`)
      process.exit(1)
    }
    console.log(`Bucket "${BUCKET}" criado (leitura pública).`)
  }

  console.log(`Subindo ${imagensParaSubir.length} imagens...`)
  const falhas = []
  await emLotesParalelos(imagensParaSubir, CONCORRENCIA_DE_UPLOAD, async ({ caminho, base64, url }) => {
    let bytes
    if (base64) {
      bytes = Buffer.from(base64, "base64")
    } else {
      try {
        const resposta = await fetch(url)
        if (!resposta.ok) {
          falhas.push(`${caminho}: ${url} respondeu ${resposta.status}`)
          return
        }
        bytes = Buffer.from(await resposta.arrayBuffer())
      } catch (erro) {
        falhas.push(`${caminho}: ${url} — ${erro.message}`)
        return
      }
    }

    /**
     * Três tentativas, com espera crescente.
     *
     * Subindo 2 367 arquivos em paralelo, o Storage devolve um "Bad Request"
     * avulso de vez em quando — a mesma imagem sobe sozinha, sem erro, um
     * minuto depois. Sem repetição isso derrubava o envio inteiro **antes de
     * gravar uma linha sequer**, porque a saída por falha de imagem acontece
     * antes da gravação: dez minutos de upload perdidos por um 400 passageiro,
     * e o banco ficando com o conteúdo velho enquanto o disco já tinha o novo.
     */
    let ultimoErro = null
    for (let tentativa = 1; tentativa <= 3; tentativa += 1) {
      const { error } = await supabase.storage.from(BUCKET).upload(caminho, bytes, {
        // `upsert` é o que torna a reexecução barata e segura: subir de novo
        // substitui o mesmo arquivo em vez de acumular cópias.
        upsert: true,
        contentType: `image/${caminho.split(".").pop().replace("jpg", "jpeg")}`,
      })
      if (!error) return
      ultimoErro = error
      if (tentativa < 3) await new Promise((r) => setTimeout(r, 1500 * tentativa))
    }
    falhas.push(`${caminho}: ${ultimoErro.message} (3 tentativas)`)
  })

  if (falhas.length) {
    console.error(`${falhas.length} imagem(ns) falharam:`)
    for (const f of falhas.slice(0, 10)) console.error(`  ${f}`)
    process.exit(1)
  }
}

if (!SO_IMAGENS) {
  console.log(`Gravando ${linhas.length} questões...`)
  for (let i = 0; i < linhas.length; i += LOTE) {
    const lote = linhas.slice(i, i + LOTE).map((l) => ({ ...l, updated_at: new Date().toISOString() }))
    const { error } = await supabase.from("questoes").upsert(lote, { onConflict: "id" })
    if (error) {
      console.error(`\nLote a partir de ${i} falhou: ${error.message}`)
      process.exit(1)
    }
    process.stdout.write(`\r  ${Math.min(i + LOTE, linhas.length)}/${linhas.length}`)
  }
  process.stdout.write("\n")
}

const { count } = await supabase.from("questoes").select("id", { count: "exact", head: true })
console.log(`\nPronto. A tabela "questoes" tem ${count} linhas.`)
