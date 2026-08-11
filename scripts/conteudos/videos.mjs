/**
 * Confere os vídeos indicados pelos conteúdos, e preenche o que dá para saber.
 *
 * ## O que este script pode e o que não pode
 *
 * Pode confirmar que o vídeo **existe**, que não foi removido nem ficou
 * privado, e qual é o título, o canal e a duração. Isso vem de uma origem de
 * máquina — oEmbed, schema.org ou Open Graph, conforme o que a fonte publica —
 * e nunca de digitação: um título digitado à mão é uma afirmação sobre um vídeo
 * que ninguém abriu.
 *
 * **O vídeo não precisa ser do YouTube.** Quem lê a descrição é
 * `procedencia.mjs`, que atende qualquer endereço https e registra em `via` de
 * onde a descrição veio. Enquanto todo vídeo do acervo era do YouTube, a regra
 * "a descrição vem de uma fonte, não da memória" e "o vídeo é do YouTube"
 * pareciam a mesma coisa; não são, e confundi-las deixava de fora webinar de
 * instituição, aula de campus virtual e vídeo hospedado em Vimeo.
 *
 * **Não pode dizer se o vídeo presta.** Nenhuma verificação automática assiste a
 * nada. Por isso todo vídeo entra com `revisado: false` e o envio para o
 * Supabase recusa vídeo não revisado: a alternativa é um professor abrir, no
 * meio da aula, um vídeo que ninguém viu — e o site perder de uma vez a
 * procedência que o resto do acervo tem.
 *
 * Uso:
 *   npm run videos              # confere e preenche título, canal e duração
 *   npm run videos -- --fila    # lista o que está esperando alguém assistir
 */
import { readdir, readFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"

import { descreverVideo, dormir } from "./procedencia.mjs"

const PASTA = join(process.cwd(), "data", "conteudos")
const SO_FILA = process.argv.includes("--fila")

/**
 * Canais aceitos, por id do canal ou por nome exato.
 *
 * A decisão de origem foi tomada junto com o mantenedor: só canal de
 * instituição. Não é esnobismo com professor que grava sozinho — é que a
 * verificação automática não distingue um bom vídeo de um ruim, e a origem
 * institucional é o único filtro que sobra antes de alguém assistir.
 *
 * Um canal fora desta lista não é recusado: vai para a fila com a origem
 * marcada como não institucional, e a revisão decide. O que a lista faz é dizer
 * o que já se sabe sobre a procedência.
 */
const CANAIS_INSTITUCIONAIS = [
  "Khan Academy Brasil",
  "TV Escola",
  "MEC",
  "Ministério da Educação",
  "USP",
  "Univesp",
  "UNIVESP",
  "Instituto Federal",
  "Fundação Roberto Marinho",
  "Nova Escola",
  "Canal Futura",
  "IMPA",
  "Instituto de Matemática Pura e Aplicada",
  // O canal do Portal da Matemática, mantido pela OBMEP/IMPA, cobre do 6º ano
  // ao 3º do médio em videoaulas gratuitas. Entrou na lista depois de o script
  // marcá-lo como não institucional na primeira execução: o nome do canal não
  // contém "IMPA", e a lista casa por nome.
  "OBMEP",
  "Portal da Matemática",
  "Fiocruz",
  "Museu da Língua Portuguesa",
  // TV INES é a televisão do Instituto Nacional de Educação de Surdos, do MEC,
  // com toda a programação em Libras, legenda e narração. É a fonte mais
  // relevante para vídeo de conteúdo escolar acessível ao aluno surdo.
  "TV INES",
  "INES",
]

/**
 * O intervalo entre vídeos existe pelo mesmo motivo que a repetição com espera
 * crescente dentro de `procedencia.mjs`: numa curadoria de oito vídeos seguidos
 * o YouTube passou a responder 429, com uma página de três mil bytes e nenhuma
 * duração. Tratar isso como "não consegui ler a duração" se parece com vídeo
 * defeituoso, e não com "tente daqui a pouco" — teria feito o conferidor
 * recusar oito vídeos perfeitos. Pedir devagar é mais rápido que ser bloqueado.
 */
const ESPERA_ENTRE_VIDEOS_MS = 1500

// --- Percorrer o acervo ------------------------------------------------------

if (!existsSync(PASTA)) {
  console.error(`Falta ${PASTA}. Nenhum conteúdo para conferir.`)
  process.exit(1)
}

const arquivos = (await readdir(PASTA)).filter((n) => n.endsWith(".json")).sort()

const fila = []
const falhas = []
let verificados = 0
let alterados = 0

/**
 * Grava as atualizações relendo o arquivo primeiro.
 *
 * A primeira versão lia o JSON, alterava em memória e regravava o objeto
 * inteiro. Parece inofensivo num script de um usuário só, e não é: numa
 * curadoria em que este script rodava em segundo plano enquanto novos vídeos
 * eram acrescentados aos mesmos arquivos, a regravação **apagou um vídeo
 * recém-adicionado** — o objeto em memória era de antes da adição.
 *
 * Reler imediatamente antes de gravar e aplicar só os campos que este script
 * apura, casando por URL, faz a perda deixar de ser possível. O custo é uma
 * leitura a mais por arquivo.
 */
async function gravarAtualizacoes(caminho, atualizacoes) {
  const atual = JSON.parse(await readFile(caminho, "utf8"))
  let aplicadas = 0

  for (const conteudo of atual.conteudos ?? []) {
    for (const video of conteudo.videos ?? []) {
      const nova = atualizacoes.get(video.url)
      if (!nova) continue
      video.titulo = nova.titulo
      video.canal = nova.canal
      video.duracaoSegundos = nova.duracaoSegundos
      video.metadadosDe = nova.metadadosDe
      aplicadas += 1
    }
  }

  await writeFile(caminho, `${JSON.stringify(atual, null, 1)}\n`)
  return aplicadas
}

for (const arquivo of arquivos) {
  const caminho = join(PASTA, arquivo)
  const acervo = JSON.parse(await readFile(caminho, "utf8"))
  const atualizacoes = new Map()
  let mudou = false

  for (const conteudo of acervo.conteudos ?? []) {
    for (const video of conteudo.videos ?? []) {
      if (SO_FILA) {
        if (!video.revisado) fila.push(`${arquivo} :: ${conteudo.id} — ${video.titulo ?? video.url}\n      ${video.url}`)
        continue
      }

      const info = await descreverVideo(video.url ?? "")
      verificados += 1
      await dormir(ESPERA_ENTRE_VIDEOS_MS)

      if (info.erro) {
        falhas.push(`${arquivo} :: ${conteudo.id} — ${video.url}: ${info.erro}`)
        continue
      }

      // Sem duração o vídeo não é publicável: a lista precisa dizer ao professor
      // quanto tempo de aula aquilo custa. Fora do YouTube e do Vimeo há fontes
      // que não a declaram, e aí a falha aponta para onde procurar.
      const segundos = info.duracaoSegundos
      if (!(segundos > 0)) {
        falhas.push(
          `${arquivo} :: ${conteudo.id} — ${video.url}: a fonte (${info.via}) não declara duração`,
        )
        continue
      }
      if (!info.canal) {
        falhas.push(`${arquivo} :: ${conteudo.id} — ${video.url}: a fonte (${info.via}) não diz quem publicou`)
        continue
      }

      if (
        video.titulo !== info.titulo ||
        video.canal !== info.canal ||
        video.duracaoSegundos !== segundos ||
        video.metadadosDe !== info.via
      ) {
        atualizacoes.set(video.url, {
          titulo: info.titulo,
          canal: info.canal,
          duracaoSegundos: segundos,
          metadadosDe: info.via,
        })
        mudou = true
        alterados += 1
      }
      video.metadadosDe = info.via
      // A fila é montada com o que a API acabou de responder, e não com o que
      // está no arquivo — que só será atualizado no fim.
      video.titulo = info.titulo
      video.canal = info.canal
      video.duracaoSegundos = segundos

      const institucional = CANAIS_INSTITUCIONAIS.some((c) => info.canal?.toLowerCase().includes(c.toLowerCase()))
      if (!video.revisado) {
        fila.push(
          `${arquivo} :: ${conteudo.id}\n      ${info.titulo}\n      canal: ${info.canal}${institucional ? " (institucional)" : " — NÃO institucional"}` +
            `\n      ${Math.floor(segundos / 60)}min${String(segundos % 60).padStart(2, "0")}  ${video.url}`,
        )
      }
    }
  }

  if (mudou) await gravarAtualizacoes(caminho, atualizacoes)
}

// --- Relatório ---------------------------------------------------------------

if (SO_FILA) {
  console.log(`Vídeos aguardando alguém assistir: ${fila.length}\n`)
  for (const linha of fila) console.log(`  ${linha}\n`)
  process.exit(0)
}

console.log(`Vídeos verificados: ${verificados}`)
console.log(`Registros atualizados: ${alterados}`)

if (fila.length) {
  console.log(`\n${fila.length} vídeo(s) esperando revisão — nenhum vai ao ar antes:`)
  for (const linha of fila) console.log(`  ${linha}\n`)
}

if (falhas.length) {
  console.error(`\n${falhas.length} falha(s):`)
  for (const linha of falhas) console.error(`  ${linha}`)
  process.exit(1)
}

console.log("\nTodos os vídeos indicados existem e estão descritos pelo que a API respondeu.")
