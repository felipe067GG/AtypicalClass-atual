/**
 * Confere o acervo autoral.
 *
 * As questões autorais são o oposto do resto do acervo em procedência: não vêm
 * de prova nenhuma, foram escritas aqui. O defeito das 43 antigas do Supabase
 * nunca foi serem autorais — foi não dizerem que eram, e virem com
 * `source: 'adapted'` sem procedência alguma. Este conferidor existe para que
 * isso não se repita: arquivo que não se declara autoral não passa.
 *
 * Sai com código 1 se algo estiver errado, para poder rodar no CI ao lado do
 * `conferir.mjs` do acervo real.
 *
 * Uso:  node scripts/autorais/conferir.mjs
 */
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

const PASTA = join(process.cwd(), "data", "autorais")
const LETRAS = ["A", "B", "C", "D", "E"]

/** As catorze matérias, com a área da BNCC a que cada uma pertence. */
const AREA_DA_MATERIA = {
  Matemática: "MAT",
  Física: "CNT",
  Química: "CNT",
  Biologia: "CNT",
  História: "CHS",
  Geografia: "CHS",
  Filosofia: "CHS",
  Sociologia: "CHS",
  Português: "LP",
  Literatura: "LGG",
  Inglês: "LGG",
  Espanhol: "LGG",
  Artes: "LGG",
  "Educação Física": "LGG",
}

/**
 * O código da BNCC é conferido contra o documento oficial, um a um.
 *
 * Por um tempo ele foi apenas **declarado**, e o acervo dizia isso em voz alta,
 * porque a primeira tentativa de ler o PDF do MEC devolveu lixo. Quem fecha
 * isso agora é `conferir-bncc.mjs` (`npm run bncc`), que baixa o documento e
 * extrai os 179 códigos que ele traz.
 *
 * A conferência pagou o próprio custo na primeira execução: dois dos códigos
 * usados não existem na BNCC — `EM13CHS606` numa competência que vai até 605, e
 * `EM13LGG504` numa que vai até 503. Sete questões apontavam para habilidade
 * inexistente, e nenhuma conferência estrutural pegaria isso: os dois têm forma
 * válida e área coerente com a matéria.
 */
const VALIDACAO_BNCC = "código conferido contra o documento oficial da BNCC (npm run bncc)"
const VALIDACAO_FONTE = "questão autoral do AtypicalClass — não é questão de prova real"

/** Marcas que entregam a resposta dentro do texto da alternativa. */
const VAZAMENTO = /[✓✔]|\((correta|certa|resposta|gabarito)\)/i

const problemas = []

/**
 * As mesmas frases existem em `lib/autorais.ts`, que é o que o site lê.
 *
 * Duplicar é o preço de os scripts rodarem em Node sem etapa de build. O que
 * torna o preço aceitável é conferir: se alguém reescrever a frase de um lado
 * só, o acervo inteiro passa a ser recusado aqui em vez de seguir com duas
 * versões da mesma declaração de procedência.
 */
const fonteDosTipos = await readFile(join(process.cwd(), "lib", "autorais.ts"), "utf8")
for (const frase of [VALIDACAO_FONTE, VALIDACAO_BNCC]) {
  if (!fonteDosTipos.includes(frase)) problemas.push(`lib/autorais.ts não declara: "${frase}"`)
}

const arquivos = (await readdir(PASTA)).filter((n) => n.endsWith(".json")).sort()

const porMateria = {}
const codigosUsados = new Map()

for (const arquivo of arquivos) {
  const acervo = JSON.parse(await readFile(join(PASTA, arquivo), "utf8"))

  // --- Procedência: declarada uma vez por arquivo ----------------------------
  //
  // Uma vez, e não em cada questão. Repetir a mesma string de procedência 280
  // vezes é o arranjo em que a de número 217 diverge e ninguém nota.
  if (acervo.autoral !== true) problemas.push(`${arquivo}: não se declara autoral`)
  if (acervo.fonte?.autoria !== "AtypicalClass") problemas.push(`${arquivo}: sem autoria declarada`)
  if (acervo.fonte?.validacao !== VALIDACAO_FONTE) problemas.push(`${arquivo}: nível de validação não declarado`)
  if (acervo.bncc?.validacao !== VALIDACAO_BNCC) problemas.push(`${arquivo}: BNCC sem nível de validação`)
  if (!acervo.bncc?.documento?.startsWith("http")) problemas.push(`${arquivo}: sem link do documento da BNCC`)

  const area = AREA_DA_MATERIA[acervo.materia]
  if (!area) {
    problemas.push(`${arquivo}: matéria "${acervo.materia}" não é uma das catorze`)
    continue
  }

  const numeros = new Set()

  for (const q of acervo.questoes ?? []) {
    const onde = `${arquivo} q${q.numero}`

    if (numeros.has(q.numero)) problemas.push(`${onde}: número repetido`)
    numeros.add(q.numero)

    // Dificuldade medida não existe aqui: as questões do ENEM têm o parâmetro
    // `b` da TRI, calculado sobre milhões de respostas. Inventar um número para
    // as autorais repetiria o `effectiveness` sem fonte que já saiu do site.
    if (q.dificuldade !== undefined) problemas.push(`${onde}: traz dificuldade, que não existe para questão autoral`)

    if (!q.bncc || !/^EM13(MAT|CNT|LGG|LP|CHS)\d{2,3}$/.test(q.bncc)) {
      problemas.push(`${onde}: código da BNCC ausente ou malformado (${q.bncc})`)
    } else {
      const areaDoCodigo = q.bncc.match(/^EM13(MAT|CNT|LGG|LP|CHS)/)[1]
      if (areaDoCodigo !== area) {
        problemas.push(`${onde}: código ${q.bncc} é de ${areaDoCodigo}, mas ${acervo.materia} é de ${area}`)
      }
      codigosUsados.set(q.bncc, (codigosUsados.get(q.bncc) ?? 0) + 1)
    }

    // As alternativas são uma lista, e a letra vem da posição. É o que torna
    // impossível a classe inteira de erro que o acervo do ENEM precisa conferir
    // — letra fora de ordem, letra repetida, gabarito apontando para letra que
    // não existe. Aqui não há como escrever isso errado.
    if (!Array.isArray(q.alternativas) || q.alternativas.length !== 5) {
      problemas.push(`${onde}: ${q.alternativas?.length ?? 0} alternativas`)
    } else {
      for (const [i, texto] of q.alternativas.entries()) {
        if (!texto?.trim()) problemas.push(`${onde}: alternativa ${LETRAS[i]} vazia`)
        if (VAZAMENTO.test(texto ?? "")) problemas.push(`${onde}: alternativa ${LETRAS[i]} entrega o gabarito`)
      }
      const textos = q.alternativas.map((t) => t?.trim().toLowerCase())
      if (new Set(textos).size !== textos.length) problemas.push(`${onde}: alternativas repetidas`)
    }

    if (!LETRAS.includes(q.resposta)) problemas.push(`${onde}: resposta inválida (${q.resposta})`)
    if (!q.enunciado || q.enunciado.length < 40) {
      problemas.push(`${onde}: enunciado com ${q.enunciado?.length ?? 0} caracteres`)
    }
  }

  porMateria[acervo.materia] = acervo.questoes ?? []
}

/**
 * Dois defeitos que não quebram questão nenhuma e estragam o acervo inteiro.
 *
 * O primeiro é o gabarito viciado: um banco em que a resposta é quase sempre a
 * mesma letra ensina o aluno a chutar aquela letra, e o professor não percebe
 * porque cada questão, isolada, está correta.
 *
 * O segundo é a alternativa certa ser sempre a mais longa — o vício clássico de
 * quem escreve item, porque a correta costuma precisar de ressalva e a
 * distratora não. Quem aprende a marcar a maior acerta sem ler o enunciado.
 *
 * Os dois só existem no conjunto, e por isso são conferidos aqui e não questão
 * a questão.
 */
for (const [materia, questoes] of Object.entries(porMateria)) {
  if (!questoes.length) continue

  const porLetra = {}
  let maisLonga = 0

  for (const q of questoes) {
    porLetra[q.resposta] = (porLetra[q.resposta] ?? 0) + 1

    // "Mais longa" precisa ser mais longa que todas as outras, não empatada com
    // elas. Sem isso, uma questão de alternativas numéricas — "12", "15", "18",
    // todas com dois caracteres — contaria como vício em toda ocorrência, e o
    // aviso dispararia justamente onde não há nada a corrigir.
    const tamanhos = (q.alternativas ?? []).map((t) => (t ?? "").length)
    const maior = Math.max(...tamanhos, 0)
    const unica = tamanhos.filter((t) => t === maior).length === 1
    if (unica && tamanhos[LETRAS.indexOf(q.resposta)] === maior) maisLonga += 1
  }

  for (const [letra, n] of Object.entries(porLetra)) {
    if (n / questoes.length > 0.4) {
      problemas.push(`${materia}: ${n} de ${questoes.length} respostas são "${letra}" — gabarito viciado`)
    }
  }
  if (maisLonga / questoes.length > 0.4) {
    problemas.push(`${materia}: em ${maisLonga} de ${questoes.length}, a correta é a alternativa mais longa`)
  }
}

// --- Relatório ---------------------------------------------------------------

const total = Object.values(porMateria).reduce((s, qs) => s + qs.length, 0)
console.log(`Questões autorais: ${total} em ${Object.keys(porMateria).length} matérias`)
for (const [materia, questoes] of Object.entries(porMateria).sort()) {
  console.log(`  ${materia.padEnd(18)} ${questoes.length}`)
}

console.log(`\nCódigos da BNCC usados: ${codigosUsados.size} (existência conferida por 'npm run bncc')`)

if (problemas.length) {
  console.log(`\n${problemas.length} problema(s):`)
  for (const p of problemas.slice(0, 40)) console.log(`  ${p}`)
  if (problemas.length > 40) console.log(`  ... e mais ${problemas.length - 40}`)
  process.exit(1)
}

console.log("\nNenhum problema encontrado.")
