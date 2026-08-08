/**
 * Confere o acervo importado, questão por questão.
 *
 * Existe porque quase todo defeito desta importação foi silencioso: gabarito de
 * outro caderno, enunciado sem contexto, imagem embutida em markdown, texto de
 * fonte cifrada. Nenhum deles quebrava nada — a questão continuava bonita na
 * tela, e só falhava na mão de quem fosse usá-la.
 *
 * Sai com código 1 se algo estiver errado, para poder rodar no CI ao lado do
 * `check:links`.
 *
 * Uso:  node scripts/import-enem/conferir.mjs
 */
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

import { MATERIAS_POR_AREA } from "./materia.mjs"

const PASTA = join(process.cwd(), "data", "enem")
const LETRAS = ["A", "B", "C", "D", "E"]

/**
 * A ordem das áreas na prova mudou ao longo dos anos.
 *
 * Em 2023 é Linguagens 1-45, Humanas 46-90, Natureza 91-135 e Matemática
 * 136-180. Em 2010 e 2013 era Humanas 1-45, Natureza 46-90 e Linguagens
 * 91-135. Fixar o layout moderno como se fosse universal fez esta conferência
 * acusar 656 questões corretas de estarem fora de faixa — o erro era da regra,
 * não do acervo.
 *
 * O que continua valendo é a forma: as 45 questões de uma área ocupam um bloco
 * contíguo que começa em 1, 46, 91 ou 136. Isso pega prova misturada sem
 * presumir qual área vem primeiro.
 */
const INICIOS = [1, 46, 91, 136]

function blocoValido(numeros) {
  const menor = Math.min(...numeros)
  const maior = Math.max(...numeros)
  const inicio = INICIOS.find((i) => menor >= i && maior <= i + 44)
  return inicio ? null : `números de ${menor} a ${maior} não cabem num bloco de 45`
}

const arquivos = (await readdir(PASTA)).filter((n) => /^\d{4}-(CN|CH|LC|MT)\.json$/.test(n)).sort()

const problemas = []
const vistas = new Set()
let total = 0

for (const arquivo of arquivos) {
  const [ano, area] = arquivo.replace(".json", "").split("-")
  const questoes = JSON.parse(await readFile(join(PASTA, arquivo), "utf8"))

  // O bloco de 45 é conferido por arquivo, não por questão.
  if (questoes.length) {
    const erro = blocoValido(questoes.map((q) => q.numero))
    if (erro) problemas.push(`${arquivo}: ${erro}`)
  }

  for (const q of questoes) {
    total += 1
    const onde = `${arquivo} q${q.numero}`

    // Identidade única. Duas questões com o mesmo ano e número seriam a mesma
    // entrando duas vezes, e ninguém notaria numa lista de mil.
    //
    // O idioma faz parte da identidade: as cinco questões de língua estrangeira
    // existem em inglês e espanhol, com enunciados e gabaritos diferentes, e
    // são duas questões legítimas na mesma posição.
    const chave = `${ano}-${q.numero}-${q.idioma ?? ""}`
    if (vistas.has(chave)) problemas.push(`${onde}: repetida`)
    vistas.add(chave)

    if (!Array.isArray(q.alternativas) || q.alternativas.length !== 5) {
      problemas.push(`${onde}: ${q.alternativas?.length ?? 0} alternativas`)
    } else {
      const letras = q.alternativas.map((a) => a.letra)
      if (letras.join("") !== LETRAS.join("")) problemas.push(`${onde}: letras fora de ordem (${letras.join("")})`)
      // Alternativa pode ser imagem em vez de texto — aí texto vazio é válido.
      for (const a of q.alternativas) {
        if (!a.texto && !a.imagem) problemas.push(`${onde}: alternativa ${a.letra} sem texto nem imagem`)
      }
    }

    // A resposta precisa apontar para uma alternativa que existe. Um gabarito
    // "F" ou vazio passaria despercebido até alguém tentar responder.
    if (!LETRAS.includes(q.resposta)) problemas.push(`${onde}: resposta inválida (${q.resposta})`)

    const temFigura = q.imagens?.length > 0 || q.alternativas?.some((a) => a.imagem)
    if (!q.enunciado || q.enunciado.length < (temFigura ? 40 : 200)) {
      problemas.push(`${onde}: enunciado com ${q.enunciado?.length ?? 0} caracteres`)
    }

    // Markdown de imagem no texto é o resíduo que fazia o professor ler
    // "![](https://...)" no meio da frase.
    if (/!\[[^\]]*\]\(/.test(q.enunciado ?? "")) problemas.push(`${onde}: markdown de imagem no enunciado`)

    if (q.materia && !(MATERIAS_POR_AREA[area] ?? []).includes(q.materia)) {
      problemas.push(`${onde}: matéria "${q.materia}" não pertence a ${area}`)
    }

    if (!q.fonte?.exame || !q.fonte?.ano || !q.fonte?.questaoApi) {
      problemas.push(`${onde}: procedência incompleta`)
    }
    if (q.fonte?.ano !== Number(ano)) problemas.push(`${onde}: ano da fonte (${q.fonte?.ano}) diverge do arquivo`)
  }
}

// Relatório
const porArea = {}
const porMateria = {}
let comImagem = 0
let semMateria = 0

for (const arquivo of arquivos) {
  const [, area] = arquivo.replace(".json", "").split("-")
  for (const q of JSON.parse(await readFile(join(PASTA, arquivo), "utf8"))) {
    porArea[area] = (porArea[area] ?? 0) + 1
    if (q.imagens?.length || q.alternativas?.some((a) => a.imagem)) comImagem += 1
    if (q.materia) porMateria[q.materia] = (porMateria[q.materia] ?? 0) + 1
    else semMateria += 1
  }
}

console.log(`Arquivos:   ${arquivos.length}`)
console.log(`Questões:   ${total}`)
console.log(`Por área:   ${JSON.stringify(porArea)}`)
console.log(`Por matéria:${JSON.stringify(porMateria)}`)
console.log(`Sem matéria:${semMateria}`)
console.log(`Com imagem: ${comImagem}`)

if (problemas.length) {
  console.log(`\n${problemas.length} problema(s):`)
  for (const p of problemas.slice(0, 30)) console.log(`  ${p}`)
  if (problemas.length > 30) console.log(`  ... e mais ${problemas.length - 30}`)
  process.exit(1)
}

console.log("\nNenhum problema encontrado.")
