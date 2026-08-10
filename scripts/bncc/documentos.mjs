/**
 * Os códigos de habilidade da BNCC, extraídos dos documentos oficiais do MEC.
 *
 * São dois documentos, e essa é a razão de este arquivo existir. O do Ensino
 * Médio já era lido por `scripts/autorais/conferir-bncc.mjs` para conferir as
 * 280 questões autorais. O da Educação Infantil e do Ensino Fundamental entrou
 * quando a biblioteca de conteúdos passou a cobrir do 1º ano ao 3º do médio: sem
 * ele, um conteúdo de 6º ano declararia um código que nada confere, que é
 * exatamente como `EM13CHS606` e `EM13LGG504` — dois códigos inexistentes —
 * ficaram meses no acervo com forma válida e área coerente.
 *
 * Uso:
 *   node scripts/bncc/documentos.mjs            # baixa, extrai e relata
 *   node scripts/bncc/documentos.mjs --familia EF69LP
 *
 * Os PDFs ficam em `data/bncc/`, fora do git. O resultado é gravado em
 * `data/bncc/codigos.json`, que **entra** no git: é o que os outros
 * verificadores leem, para que conferir um conteúdo não dependa de baixar 20 MB
 * do MEC a cada execução.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { pathToFileURL } from "node:url"

import { extrairTexto } from "./extrair-pdf.mjs"

export const PASTA = join(process.cwd(), "data", "bncc")
export const CATALOGO = join(PASTA, "codigos.json")

/**
 * Os dois documentos, com o piso de leitura de cada um.
 *
 * `minimoDePaginas` é a fração das páginas que precisa devolver texto para a
 * extração contar como bem-sucedida. Existe porque o modo de falha deste parser
 * não é erro: é devolver pouco texto e nenhum código, o que se parece com "os
 * códigos não existem" e não com "li errado". Duas versões anteriores falharam
 * exatamente assim, com três páginas legíveis e nenhum aviso.
 *
 * A fração é do documento, e não um número absoluto, para não envelhecer em
 * silêncio se o MEC republicar o PDF com outra paginação.
 */
export const DOCUMENTOS = [
  {
    id: "ensino-medio",
    nome: "BNCC — Ensino Médio",
    url: "http://basenacionalcomum.mec.gov.br/images/historico/BNCC_EnsinoMedio_embaixa_site_110518.pdf",
    arquivo: ".bncc-em.pdf",
    // EM13 + área (LGG, LP, MAT, CNT, CHS) + dois ou três dígitos.
    codigo: /EM13(?:LGG|LP|MAT|CNT|CHS)\d{2,3}/g,
    minimoDePaginas: 0.65,
    minimoDeCodigos: 100,
  },
  {
    id: "infantil-fundamental",
    nome: "BNCC — Educação Infantil e Ensino Fundamental",
    url: "http://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf",
    arquivo: ".bncc-ei-ef.pdf",
    /**
     * EF + ano ou faixa de anos + componente + número.
     *
     * A faixa vem em dois dígitos e nem sempre é um ano: `EF15LP01` vale do 1º
     * ao 5º, `EF69LP01` do 6º ao 9º, `EF35LP01` do 3º ao 5º. Por isso `\d{2}` e
     * não uma lista de anos.
     *
     * `EF` aparece duas vezes nos códigos de Educação Física (`EF35EF01`), o que
     * quebra qualquer tentativa de casar o componente por posição relativa. A
     * âncora é o `EF` inicial seguido de dois dígitos, e o componente é lido
     * depois.
     */
    codigo: /EF\d{2}(?:LP|MA|CI|HI|GE|AR|EF|ER|LI)\d{2}/g,
    minimoDePaginas: 0.65,
    minimoDeCodigos: 800,
  },
]

async function baixar(documento) {
  const destino = join(PASTA, documento.arquivo)
  if (existsSync(destino)) return readFile(destino)

  console.log(`Baixando ${documento.nome}...`)
  const resposta = await fetch(documento.url, { redirect: "follow" })
  if (!resposta.ok) {
    throw new Error(`${documento.nome} respondeu ${resposta.status}. Sem o documento não há conferência.`)
  }
  const tipo = resposta.headers.get("content-type") ?? ""
  if (!tipo.includes("pdf")) {
    // Já aconteceu no projeto: um PDF do MEC respondendo 200 com HTML. Um
    // soft-404 salvo como .pdf viraria "nenhum código encontrado", que parece
    // resultado e não é.
    throw new Error(`${documento.nome} respondeu ${tipo}, não um PDF.`)
  }

  const dados = Buffer.from(await resposta.arrayBuffer())
  await mkdir(PASTA, { recursive: true })
  await writeFile(destino, dados)
  return dados
}

/**
 * Extrai os códigos de um documento, com o trecho de texto que segue cada um.
 *
 * O trecho serve para conferir a olho que a habilidade é mesmo do assunto em que
 * foi usada — forma válida e área coerente não bastam, e foi assim que os dois
 * códigos inexistentes passaram despercebidos.
 */
export async function extrairCodigos(documento) {
  const pdf = await baixar(documento)
  const { texto, paginasLidas, paginasTotais } = extrairTexto(pdf)

  const lidas = paginasTotais ? paginasLidas / paginasTotais : 0
  if (lidas < documento.minimoDePaginas) {
    throw new Error(
      `${documento.nome}: só ${paginasLidas} de ${paginasTotais} páginas foram lidas ` +
        `(${(lidas * 100).toFixed(0)}%, piso ${(documento.minimoDePaginas * 100).toFixed(0)}%). ` +
        `A extração falhou; não dá para concluir nada.`,
    )
  }

  const codigos = new Map()
  for (const achado of texto.matchAll(documento.codigo)) {
    if (codigos.has(achado[0])) continue
    const seguinte = texto.slice(achado.index + achado[0].length, achado.index + achado[0].length + 200)
    codigos.set(achado[0], seguinte.replace(/\s+/g, " ").trim())
  }

  if (codigos.size < documento.minimoDeCodigos) {
    throw new Error(
      `${documento.nome}: ${codigos.size} códigos encontrados, menos que o piso de ` +
        `${documento.minimoDeCodigos}. Extração insuficiente; não dá para concluir nada daqui.`,
    )
  }

  return { codigos, paginasLidas, paginasTotais }
}

/** O catálogo já gravado: código → começo do texto da habilidade. */
export async function catalogo() {
  if (!existsSync(CATALOGO)) {
    throw new Error(`${CATALOGO} não existe. Rode: node scripts/bncc/documentos.mjs`)
  }
  return JSON.parse(await readFile(CATALOGO, "utf8"))
}

// --- Execução direta ---------------------------------------------------------

// No Windows, `file://${caminho}` produz `file://C:/...` e o real é
// `file:///C:/...` — a comparação ingênua nunca casa, e o script sai sem
// executar nada e sem erro. `pathToFileURL` monta a forma certa nos dois
// sistemas.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const saida = {}
  let total = 0

  for (const documento of DOCUMENTOS) {
    const { codigos, paginasLidas, paginasTotais } = await extrairCodigos(documento)
    console.log(`\n${documento.nome}`)
    console.log(`  páginas lidas: ${paginasLidas} de ${paginasTotais}`)
    console.log(`  códigos:       ${codigos.size}`)

    const porComponente = {}
    for (const codigo of codigos.keys()) {
      const componente = codigo.startsWith("EM13")
        ? codigo.slice(4).replace(/\d+$/, "")
        : codigo.slice(2).replace(/^\d{2}/, "").replace(/\d+$/, "")
      porComponente[componente] = (porComponente[componente] ?? 0) + 1
    }
    console.log(`  por componente: ${JSON.stringify(porComponente)}`)

    saida[documento.id] = Object.fromEntries([...codigos].sort())
    total += codigos.size
  }

  const familia = process.argv.includes("--familia") ? process.argv[process.argv.indexOf("--familia") + 1] : null
  if (familia) {
    console.log(`\nCódigos que contêm "${familia}":`)
    for (const grupo of Object.values(saida)) {
      for (const [codigo, texto] of Object.entries(grupo)) {
        if (codigo.includes(familia)) console.log(`  ${codigo}  ${texto.slice(0, 120)}`)
      }
    }
    process.exit(0)
  }

  await mkdir(PASTA, { recursive: true })
  await writeFile(CATALOGO, `${JSON.stringify(saida, null, 1)}\n`)
  console.log(`\nTotal: ${total} códigos. Gravado em ${CATALOGO}`)
}
