/**
 * Monta o acervo de questões de uma área do ENEM.
 *
 * Junta as quatro fontes, cada uma respondendo pelo que só ela sabe:
 *
 *  - a prova em PDF dá o enunciado e as alternativas;
 *  - o gabarito em PDF dá a resposta certa;
 *  - os microdados dão a dificuldade oficial (parâmetro `b` da TRI);
 *  - a API pública dá as imagens da questão.
 *
 * Nenhuma delas é confiada cegamente. O gabarito do PDF e o dos microdados
 * são independentes, e a prova certa dentro dos microdados é justamente a que
 * bate 100% com o PDF — o que, de quebra, prova que o parser de PDF leu certo.
 * Se esse casamento não for perfeito, a importação para: um gabarito trocado
 * não se denuncia sozinho, a questão continua bonita na tela com a resposta
 * errada.
 *
 * Uso:  node scripts/import-enem/importar.mjs 2023 2 MT
 */
import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { baixar } from "./inep.mjs"
import { lerGabarito, conferirCobertura, lerCor } from "./gabarito.mjs"
import { lerColunas, lerAcessivel, segmentar, conferir, separarDescricoes } from "./prova.mjs"
import { lerItens, identificarProva, classificarDificuldade, obterItens } from "./microdados.mjs"

/** Onde cada área começa e termina, igual em todas as cores de caderno. */
const FAIXAS = {
  LC: [1, 45],
  CH: [46, 90],
  CN: [91, 135],
  MT: [136, 180],
}

/**
 * Área e matéria coincidem só em Matemática.
 *
 * Nas outras três, o ENEM não classifica por matéria — a matriz para na área,
 * porque a prova é interdisciplinar de propósito. Qualquer rótulo mais fino é
 * interpretação, e por isso entra marcado como tal, nunca como oficial.
 */
const MATERIA_OFICIAL = { MT: "Matemática" }

const BASE_PDF = "https://download.inep.gov.br/enem/provas_e_gabaritos"

async function imagensDaApi(ano, numero) {
  try {
    const resposta = await fetch(`https://api.enem.dev/v1/exams/${ano}/questions/${numero}`, {
      headers: { "User-Agent": "AtypicalClass-Importador/1.0" },
    })
    if (!resposta.ok) return []
    const dados = await resposta.json()
    return Array.isArray(dados.files) ? dados.files : []
  } catch {
    // A API é conveniência, não fonte de verdade: se cair, a questão entra
    // sem imagem em vez de a importação inteira parar.
    return []
  }
}

export async function importar({ ano, dia, area, caderno, urlAcessivel = null }) {
  const [primeira, ultima] = FAIXAS[area]

  const prova = await baixar(`${BASE_PDF}/${ano}_PV_impresso_D${dia}_CD${caderno}.pdf`)
  const gabaritoPdf = await baixar(`${BASE_PDF}/${ano}_GB_impresso_D${dia}_CD${caderno}.pdf`)
  const acessivel = urlAcessivel ? await baixar(urlAcessivel) : null

  const cor = await lerCor(gabaritoPdf)
  if (!cor) throw new Error(`Não achei a cor do caderno ${caderno} no cabeçalho do gabarito`)

  const respostas = await lerGabarito(gabaritoPdf)
  const semResposta = conferirCobertura(respostas, primeira, ultima)
  if (semResposta.length) {
    throw new Error(`Gabarito não cobre as questões ${semResposta.join(", ")}`)
  }

  const itensMicrodados = lerItens(await obterItens(ano))
  const escolhida = identificarProva(itensMicrodados, respostas, { area, cor })
  if (!escolhida) {
    throw new Error(
      `Nenhum CO_PROVA de ${area}/${cor} bate 100% com o gabarito do caderno ${caderno}. ` +
        "Sem essa identificação a dificuldade viria de outra prova.",
    )
  }

  const porPosicao = new Map(
    itensMicrodados
      .filter((i) => i.prova === escolhida.prova && i.cor === cor && i.lingua !== 1)
      .map((i) => [i.posicao, i]),
  )

  /**
   * A versão acessível é preferida quando existe.
   *
   * Ela é de coluna única e traz a notação matemática verbalizada, o que
   * recupera as questões que o caderno impresso perde — e, de quebra, carrega
   * a audiodescrição de cada figura. As imagens continuam vindo da API, então
   * a página pode mostrar a figura para quem enxerga e a descrição para quem
   * usa leitor de tela, sem escolher entre os dois públicos.
   */
  const formato = acessivel ? "acessivel" : "impressa"
  const linhas = acessivel ? await lerAcessivel(acessivel) : await lerColunas(prova, { maxPaginas: 80 })
  const doPdf = segmentar(linhas, { formato }).filter((i) => i.numero >= primeira && i.numero <= ultima)

  const questoes = []
  const rejeitadas = []

  for (const item of doPdf) {
    const problemas = conferir(item)
    if (problemas.length) {
      rejeitadas.push({ numero: item.numero, problemas })
      continue
    }

    const oficial = porPosicao.get(item.numero)
    const doGabarito = respostas.get(item.numero)
    const resposta = doGabarito?.resposta

    // Questão anulada sai fora: não tem resposta certa, e oferecê-la ao
    // professor como se tivesse seria pior do que não tê-la.
    if (doGabarito?.anulado) {
      rejeitadas.push({ numero: item.numero, problemas: ["anulada no gabarito oficial"] })
      continue
    }

    if (oficial && oficial.gabarito !== resposta) {
      rejeitadas.push({ numero: item.numero, problemas: ["gabarito do PDF diverge dos microdados"] })
      continue
    }
    if (oficial?.anulado) {
      rejeitadas.push({ numero: item.numero, problemas: ["item anulado pelo INEP"] })
      continue
    }

    const limpo = separarDescricoes(item.enunciado)

    questoes.push({
      numero: item.numero,
      enunciado: limpo.enunciado,
      descricoesDeFiguras: limpo.descricoes,
      alternativas: item.alternativas,
      resposta,
      dificuldade: classificarDificuldade(oficial?.dificuldadeB ?? null),
      habilidade: oficial?.habilidade ?? null,
      imagens: await imagensDaApi(ano, item.numero),
      materia: MATERIA_OFICIAL[area] ?? null,
      materiaOficial: Boolean(MATERIA_OFICIAL[area]),
      fonte: {
        exame: "ENEM",
        ano,
        dia,
        area,
        caderno,
        cor,
        numero: item.numero,
        pagina: item.pagina,
        prova: `${BASE_PDF}/${ano}_PV_impresso_D${dia}_CD${caderno}.pdf`,
        gabarito: `${BASE_PDF}/${ano}_GB_impresso_D${dia}_CD${caderno}.pdf`,
      },
    })
  }

  return { questoes, rejeitadas, provaMicrodados: escolhida }
}

const [ano, dia, area, caderno = dia === "1" ? "1" : "5", urlAcessivel = null] = process.argv.slice(2)

if (ano) {
  const resultado = await importar({
    ano: Number(ano),
    dia: Number(dia),
    area,
    caderno: Number(caderno),
    urlAcessivel,
  })
  const destino = join(process.cwd(), "data", "enem")
  await mkdir(destino, { recursive: true })
  const arquivo = join(destino, `${ano}-d${dia}-${area}.json`)
  await writeFile(arquivo, `${JSON.stringify(resultado.questoes, null, 2)}\n`)

  const comImagem = resultado.questoes.filter((q) => q.imagens.length).length
  const faixas = {}
  for (const q of resultado.questoes) {
    const nome = q.dificuldade?.faixa ?? "sem dificuldade"
    faixas[nome] = (faixas[nome] ?? 0) + 1
  }

  console.log(`CO_PROVA identificado: ${resultado.provaMicrodados.prova} (${resultado.provaMicrodados.acertos}/${resultado.provaMicrodados.total})`)
  console.log(`Questões importadas:   ${resultado.questoes.length}`)
  console.log(`Com imagem:            ${comImagem}`)
  console.log(`Com audiodescrição:    ${resultado.questoes.filter((q) => q.descricoesDeFiguras.length).length}`)
  console.log(`Dificuldade:           ${JSON.stringify(faixas)}`)
  if (resultado.rejeitadas.length) {
    console.log(`\nRejeitadas (${resultado.rejeitadas.length}):`)
    for (const r of resultado.rejeitadas) console.log(`  q${r.numero}: ${r.problemas.join("; ")}`)
  }
  console.log(`\nGravado em ${arquivo}`)
}
