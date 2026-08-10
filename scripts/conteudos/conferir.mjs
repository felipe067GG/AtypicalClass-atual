/**
 * Confere a biblioteca de conteúdos.
 *
 * A biblioteca que este acervo substitui tinha onze linhas, cinco matérias das
 * catorze, três especialidades das catorze e **nenhuma fonte** — nem uma. Nada
 * impedia aquilo de existir, e é por isso que este script vem antes dos
 * conteúdos: sem ele, a segunda versão erra igual à primeira, só que em escala.
 *
 * Uso:  npm run conteudos
 * Sai com código 1 se algum conteúdo falhar, para poder rodar no CI.
 *
 * ## O que é erro e o que é "confira a olho"
 *
 * Erro é o que se decide sem julgamento: código da BNCC que não existe no
 * documento oficial, conteúdo sem fonte, id repetido, soma das etapas que não
 * fecha com a duração.
 *
 * O resto vai para uma lista de conferência, e **não derruba o build**. A
 * tentação é transformar todo sinal em erro, e este projeto já pagou por isso
 * quatro vezes no importador de questões — regras de segurança que rejeitaram
 * dado bom e custaram horas apontando para o lugar errado. Um verificador que
 * acusa falso positivo é pior que nenhum, porque ensina a ignorá-lo.
 */
import { readdir, readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"

const PASTA = join(process.cwd(), "data", "conteudos")
const CATALOGO_BNCC = join(process.cwd(), "data", "bncc", "codigos.json")

const MATERIAS = [
  "Matemática",
  "Português",
  "História",
  "Física",
  "Geografia",
  "Biologia",
  "Química",
  "Inglês",
  "Sociologia",
  "Literatura",
  "Filosofia",
  "Artes",
  "Espanhol",
  "Educação Física",
]

const EXIGENCIAS = [
  "leitura-extensa",
  "sequencia-de-passos",
  "vocabulario-tecnico",
  "representacao-visual",
  "abstracao-simbolica",
  "producao-do-aluno",
  "pratica-concreta",
]

const ESPECIALIDADES = [
  "autismo",
  "tdah",
  "sindrome-de-down",
  "deficiencia-visual",
  "deficiencia-auditiva",
  "deficiencia-intelectual",
  "dislexia",
  "altas-habilidades",
  "discalculia",
  "deficiencia-fisica",
  "saude-mental",
  "surdocegueira",
  "transtorno-de-linguagem",
  "disgrafia",
]

const ETAPAS = ["EF1", "EF2", "EM"]

// --- Catálogo oficial da BNCC ------------------------------------------------

if (!existsSync(CATALOGO_BNCC)) {
  console.error(`Falta ${CATALOGO_BNCC}. Rode primeiro: node scripts/bncc/documentos.mjs`)
  process.exit(1)
}

const bncc = JSON.parse(await readFile(CATALOGO_BNCC, "utf8"))
const codigosValidos = new Set([...Object.keys(bncc["ensino-medio"] ?? {}), ...Object.keys(bncc["infantil-fundamental"] ?? {})])

// --- Ler o acervo ------------------------------------------------------------

if (!existsSync(PASTA)) {
  console.error(`Falta ${PASTA}. Nenhum conteúdo para conferir.`)
  process.exit(1)
}

const arquivos = (await readdir(PASTA)).filter((n) => n.endsWith(".json")).sort()
const conteudos = []

for (const arquivo of arquivos) {
  const bruto = JSON.parse(await readFile(join(PASTA, arquivo), "utf8"))
  for (const conteudo of bruto.conteudos ?? []) {
    conteudos.push({ ...conteudo, arquivo, materia: conteudo.materia ?? bruto.materia })
  }
}

// --- Conferir ----------------------------------------------------------------

const erros = []
const conferir = []
const vistos = new Set()

/**
 * Sinais que alguém já olhou e dispensou, com o motivo escrito no conteúdo.
 *
 * Existe porque o primeiro sinal legítimo a se repetir para sempre foi
 * "esquema": num conteúdo sobre poema, "esquema de rimas" é padrão sonoro e não
 * figura. Sem uma forma de registrar que o aviso foi conferido, ele apareceria
 * em toda execução — e lista de avisos que sempre traz o mesmo item conhecido é
 * lista que se para de ler, que é o modo como um verificador morre.
 *
 * A dispensa é por conteúdo e por exigência, exige motivo, e o próprio
 * verificador recusa dispensa sem sinal correspondente: assim ela não vira um
 * campo que se copia junto com o resto.
 */
let dispensados = 0

const acusar = (conteudo, mensagem) => erros.push(`${conteudo.arquivo} :: ${conteudo.id ?? "(sem id)"} — ${mensagem}`)
const anotar = (conteudo, mensagem) => conferir.push(`${conteudo.arquivo} :: ${conteudo.id} — ${mensagem}`)

/**
 * Sinais de que uma exigência existe no conteúdo mas não foi declarada.
 *
 * São heurísticas de palavra, e por isso alimentam a lista de conferência e não
 * a de erros. Servem para o caso em que alguém escreve o plano inteiro com um
 * experimento no meio e esquece de declarar `pratica-concreta` — o que quebra a
 * ligação com a matriz e faz o aluno perder a orientação sem que nada apareça.
 *
 * **Os `\b` não são zelo.** Sem eles, na primeira execução, "quadra" casou
 * dentro de *quadrado*, "conto" dentro de *desconto* e "meça" dentro de
 * *começa* — nove avisos, todos falsos, num acervo de doze conteúdos. É a mesma
 * lição que o importador de questões já tinha pago: verificador que acusa falso
 * positivo ensina a ignorá-lo, e aí ele não serve para mais nada.
 *
 * "monte" saiu da lista pelo mesmo motivo: "monte a tabela" não é prática
 * concreta, e o sinal não tem como distinguir os dois usos.
 */
const SINAIS = {
  "pratica-concreta": /\b(experimento|experimental|manipul\w+|construa|meça|medir com|laborat[óo]rio|quadra|material concreto|recorte)\b/i,
  "representacao-visual": /\b(gr[áa]fico|gr[áa]ficos|mapa|diagrama|esquema|linha do tempo|tabela|croqui|maquete)\b/i,
  "producao-do-aluno": /\b(reda[çc][ãa]o|relat[óo]rio|semin[áa]rio|apresenta[çc][ãa]o|produza|desenhe|grave um)\b/i,
  // "fórmula" só com acento, de propósito: sem ele, "formula" é o verbo
  // ("o aluno formula duas perguntas") e o sinal disparava em conteúdo de
  // História. E `\b` no JavaScript é ASCII, então "formulações" também casava —
  // o `ç` conta como não-palavra e abre uma fronteira onde não há.
  "abstracao-simbolica": /\b(fórmulas?|vari[áa]ve(l|is)|inc[óo]gnitas?|equa[çc](ão|ões)|nota[çc]ão|s[íi]mbolos?)\b/i,
  "leitura-extensa": /\b(cap[íi]tulo|conto|romance|artigo|fonte hist[óo]rica|texto integral|poema)\b/i,
}

for (const c of conteudos) {
  // --- Identidade
  if (!c.id) {
    erros.push(`${c.arquivo} — conteúdo sem id`)
    continue
  }
  if (!/^[a-z0-9-]+$/.test(c.id)) acusar(c, `id fora do formato slug: "${c.id}"`)
  if (vistos.has(c.id)) acusar(c, "id repetido — ids são estáveis e únicos")
  vistos.add(c.id)

  // --- Classificação
  if (!MATERIAS.includes(c.materia)) acusar(c, `matéria "${c.materia}" não é uma das catorze do site`)
  if (!ETAPAS.includes(c.etapa)) acusar(c, `etapa "${c.etapa}" inválida (EF1, EF2 ou EM)`)
  if (!c.ano?.trim()) acusar(c, "sem ano/série")
  if (!c.titulo?.trim()) acusar(c, "sem título")
  if (!c.descricao?.trim()) acusar(c, "sem descrição")

  // --- BNCC
  if (!Array.isArray(c.bncc) || c.bncc.length === 0) {
    acusar(c, "não declara nenhuma habilidade da BNCC")
  } else {
    for (const codigo of c.bncc) {
      if (!codigosValidos.has(codigo)) {
        acusar(c, `código da BNCC inexistente no documento oficial: ${codigo}`)
        continue
      }
      // A etapa do código tem de bater com a etapa do conteúdo. Um código EM13
      // num conteúdo de 6º ano tem forma válida e está errado — foi exatamente
      // assim que dois códigos inexistentes sobreviveram no acervo de questões.
      const doMedio = codigo.startsWith("EM13")
      if (doMedio && c.etapa !== "EM") acusar(c, `${codigo} é do Ensino Médio, e o conteúdo é ${c.etapa}`)
      if (!doMedio && c.etapa === "EM") acusar(c, `${codigo} é do Fundamental, e o conteúdo é EM`)
    }
  }

  // --- Exigências
  if (!Array.isArray(c.exigencias) || c.exigencias.length === 0) {
    acusar(c, "não declara nenhuma exigência — sem elas a matriz não alcança este conteúdo")
  } else {
    for (const e of c.exigencias) {
      if (!EXIGENCIAS.includes(e)) acusar(c, `exigência desconhecida: "${e}"`)
    }
    if (new Set(c.exigencias).size !== c.exigencias.length) acusar(c, "exigência repetida")
    // Declarar todas é o mesmo que não declarar nenhuma: não separa conteúdo
    // nenhum, e faz a tela mostrar todas as orientações para todo mundo.
    if (c.exigencias.length >= EXIGENCIAS.length) acusar(c, "declara todas as exigências — isso não separa nada")
  }

  // --- Plano de aula
  const p = c.plano
  if (!p) {
    acusar(c, "sem plano de aula")
  } else {
    if (!p.objetivo?.trim()) acusar(c, "plano sem objetivo")
    if (!(p.duracao > 0)) acusar(c, "plano sem duração")
    if (!Array.isArray(p.etapas) || p.etapas.length === 0) {
      acusar(c, "plano sem etapas")
    } else {
      const soma = p.etapas.reduce((t, e) => t + (e.minutos ?? 0), 0)
      if (soma !== p.duracao) acusar(c, `as etapas somam ${soma} min e a duração declarada é ${p.duracao} min`)
      for (const [i, e] of p.etapas.entries()) {
        if (!e.titulo?.trim()) acusar(c, `etapa ${i + 1} sem título`)
        if (!e.comoFazer?.trim()) acusar(c, `etapa ${i + 1} sem instrução`)
        if (!(e.minutos > 0)) acusar(c, `etapa ${i + 1} sem minutos`)
      }
    }
    if (!p.comoAvaliar?.trim()) acusar(c, "plano não diz como saber que o aluno aprendeu")
    if (!Array.isArray(p.errosComuns) || p.errosComuns.length === 0) acusar(c, "plano não registra nenhum erro comum")
    if (!Array.isArray(p.materiais)) acusar(c, "plano sem lista de materiais (use [] se não precisar de nenhum)")
  }

  // --- Fontes
  if (!Array.isArray(c.fontes) || c.fontes.length === 0) {
    acusar(c, "sem fonte — a regra do site vale aqui como vale no resto")
  } else {
    for (const f of c.fontes) {
      if (!f?.url?.startsWith("http")) acusar(c, `fonte sem URL: ${JSON.stringify(f)}`)
      if (!f?.label?.trim()) acusar(c, `fonte sem rótulo: ${f?.url}`)
    }
  }

  // --- Vídeos
  for (const v of c.videos ?? []) {
    if (!v.url?.includes("youtu")) acusar(c, `vídeo com URL que não é do YouTube: ${v.url}`)
    // Título, canal e duração são preenchidos pela API, não digitados. Vazio
    // quer dizer que `npm run videos` ainda não passou por aqui.
    if (!v.titulo || !v.canal || !(v.duracaoSegundos > 0)) {
      acusar(c, `vídeo não verificado (rode: npm run videos): ${v.url}`)
    }
    if (!v.revisado) anotar(c, `vídeo aguardando alguém assistir: ${v.titulo ?? v.url}`)
  }

  // --- Notas específicas
  for (const n of c.notas ?? []) {
    if (!ESPECIALIDADES.includes(n.especialidade)) acusar(c, `nota para especialidade desconhecida: "${n.especialidade}"`)
    if (!n.texto?.trim()) acusar(c, `nota vazia para ${n.especialidade}`)
    if (!Array.isArray(n.citations) || n.citations.length === 0) {
      acusar(c, `nota para ${n.especialidade} sem fonte — é afirmação pedagógica como qualquer outra`)
    }
  }

  // --- Sinais de exigência não declarada
  const textoDoPlano = JSON.stringify(p ?? {})
  for (const [exigencia, sinal] of Object.entries(SINAIS)) {
    if (!sinal.test(textoDoPlano) || c.exigencias?.includes(exigencia)) continue
    const dispensa = c.sinaisDispensados?.[exigencia]
    if (dispensa) {
      dispensados += 1
      continue
    }
    anotar(c, `o plano fala em "${textoDoPlano.match(sinal)[0]}" e "${exigencia}" não está declarada`)
  }

  for (const exigencia of Object.keys(c.sinaisDispensados ?? {})) {
    if (!EXIGENCIAS.includes(exigencia)) acusar(c, `dispensa de sinal para exigência desconhecida: "${exigencia}"`)
    if (!c.sinaisDispensados[exigencia]?.trim()) acusar(c, `dispensa de "${exigencia}" sem motivo escrito`)
    if (!SINAIS[exigencia]?.test(textoDoPlano)) {
      acusar(c, `dispensa de "${exigencia}" sem sinal correspondente no plano — dispensa que não dispensa nada`)
    }
  }
}

// --- Relatório ---------------------------------------------------------------

console.log(`Arquivos: ${arquivos.length}`)
console.log(`Conteúdos: ${conteudos.length}`)

const porMateria = {}
const porEtapa = {}
const porExigencia = {}
let comVideo = 0
let videosRevisados = 0
let videosTotais = 0

for (const c of conteudos) {
  porMateria[c.materia] = (porMateria[c.materia] ?? 0) + 1
  porEtapa[c.etapa] = (porEtapa[c.etapa] ?? 0) + 1
  for (const e of c.exigencias ?? []) porExigencia[e] = (porExigencia[e] ?? 0) + 1
  if (c.videos?.length) comVideo += 1
  for (const v of c.videos ?? []) {
    videosTotais += 1
    if (v.revisado) videosRevisados += 1
  }
}

console.log(`\nPor matéria (das ${MATERIAS.length} do site)`)
for (const materia of MATERIAS) {
  const n = porMateria[materia] ?? 0
  console.log(`  ${materia.padEnd(18)} ${String(n).padStart(4)}${n === 0 ? "   — nenhum" : ""}`)
}

console.log(`\nPor etapa: ${JSON.stringify(porEtapa)}`)

console.log(`\nPor exigência`)
for (const e of EXIGENCIAS) {
  console.log(`  ${e.padEnd(22)} ${String(porExigencia[e] ?? 0).padStart(4)}`)
}

console.log(`\nVídeos: ${videosTotais} em ${comVideo} conteúdos — ${videosRevisados} revisados, ${videosTotais - videosRevisados} aguardando`)
if (dispensados) console.log(`Sinais conferidos e dispensados, com motivo no conteúdo: ${dispensados}`)

if (conferir.length) {
  console.log(`\n${conferir.length} ponto(s) para conferir a olho (não derrubam o build):`)
  for (const linha of conferir) console.log(`  ${linha}`)
}

if (erros.length) {
  console.error(`\n${erros.length} erro(s):`)
  for (const linha of erros) console.error(`  ${linha}`)
  process.exit(1)
}

console.log("\nAcervo de conteúdos íntegro.")
