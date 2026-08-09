import { createClient } from "@/lib/supabase/server"
import { BARREIRAS, MATRIZ } from "@/lib/adaptacao"
import { SPECIALTIES } from "@/lib/specialties"
import QuestoesClient, { type QuestaoDoAcervo } from "./questoes-client"

// O `<title>` e a `description` vivem no `layout.tsx` desta rota, que os
// monta traduzidos a partir do idioma. Metadata declarada aqui venceria a do
// layout e devolveria a página ao português.

/** Quantas questões por página. O acervo tem 3.775 e não cabe numa resposta só. */
const POR_PAGINA = 24

/**
 * As colunas que a tela precisa.
 *
 * `select("*")` traria `medidas` e `fonte` inteiros de cada linha — campos que a
 * lista não usa e que multiplicariam o tamanho da resposta.
 */
const COLUNAS =
  "id, acervo, exame, ano, numero, materia, enunciado, alternativas, resposta, dificuldade_escala, dificuldade_faixa, bncc, imagens, imagens_em, descricoes_de_figuras, barreiras, fonte"

const LETRAS = ["A", "B", "C", "D", "E"]

/**
 * As barreiras para as quais existe orientação escrita para esta especialidade.
 *
 * É aqui que o filtro por especialidade muda de sentido. Antes, `specialty` era
 * uma coluna da questão e o filtro perguntava "esta questão foi feita para o
 * autismo?". Uma questão do ENEM não foi feita para especialidade nenhuma, e
 * fingir que foi era exatamente o dado sem procedência que este trabalho
 * eliminou.
 *
 * Agora o filtro pergunta outra coisa, verdadeira e verificável: "as barreiras
 * medidas desta questão têm orientação escrita para este aluno?". A resposta sai
 * da matriz, e uma especialidade sem célula devolve lista vazia em vez de
 * devolver o acervo inteiro sem orientação nenhuma.
 */
function barreirasComOrientacao(especialidade: string): string[] {
  return MATRIZ.filter((celula) => celula.especialidade === especialidade).map((celula) => celula.barreira)
}

/**
 * O que a tabela antiga declara sobre a procedência de cada linha.
 *
 * As duas origens que existem lá não são a mesma coisa, e a tela não deve
 * apresentá-las como se fossem. Dizer isso em voz alta é o mínimo que se pode
 * fazer pelas 43 antigas, que nunca declararam nada.
 */
function validacaoDaComunidade(source: string | null): string {
  if (source === "community") return "contribuição de professor — sem conferência contra prova"
  return "questão antiga do site, escrita antes das regras de procedência"
}

export default async function QuestoesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const texto = (chave: string) => (Array.isArray(params[chave]) ? params[chave][0] : params[chave]) ?? ""

  const pedido = texto("acervo")
  const acervo = pedido === "autoral" || pedido === "comunidade" ? pedido : "real"
  const materia = texto("materia")
  const especialidade = texto("especialidade")
  const busca = texto("busca").trim()
  const pagina = Math.max(1, Number(texto("pagina")) || 1)
  const de = (pagina - 1) * POR_PAGINA

  const supabase = await createClient()

  let questoes: QuestaoDoAcervo[] = []
  let total = 0
  let materias: string[] = []
  let erro = false

  if (acervo === "comunidade") {
    // O acervo da comunidade mora na tabela antiga, com outra forma. Continua na
    // tela porque é o que o professor contribui pelo `/contribuir` — trocar de
    // tabela e deixá-lo para trás faria a contribuição sumir do site sem aviso.
    let consulta = supabase.from("questions").select("*", { count: "exact" })
    if (materia) consulta = consulta.eq("subject", materia)
    if (busca) consulta = consulta.ilike("question_text", `%${busca}%`)

    const { data, error, count } = await consulta
      .order("created_at", { ascending: false })
      .range(de, de + POR_PAGINA - 1)

    erro = Boolean(error)
    total = count ?? 0
    questoes = (data ?? []).map((linha) => {
      const opcoes: string[] = Array.isArray(linha.options) ? linha.options : []
      return {
        id: linha.id,
        acervo: "comunidade" as const,
        exame: linha.title ?? "",
        ano: new Date(linha.created_at).getFullYear(),
        numero: 0,
        materia: linha.subject,
        enunciado: linha.question_text,
        enunciado_en: linha.question_text_en,
        enunciado_es: linha.question_text_es,
        alternativas: opcoes.map((texto, i) => ({ letra: LETRAS[i], texto, imagem: null })),
        // A tabela antiga guarda o texto da resposta, não a letra. A letra sai
        // da posição — e é por isso que o script 08 tira o "✓" das duas pontas
        // ao mesmo tempo: limpar só uma faria a comparação não achar nada.
        resposta: LETRAS[opcoes.indexOf(linha.correct_answer)] ?? "",
        // A dificuldade daqui foi digitada por alguém, não medida. Fica como
        // faixa, e a escala segue nula — a tela dirá "sem dificuldade medida",
        // que é a verdade.
        dificuldade_escala: null,
        dificuldade_faixa: linha.difficulty ?? null,
        bncc: null,
        imagens: [],
        imagens_em: "nenhuma" as const,
        descricoes_de_figuras: [],
        barreiras: [],
        fonte: { validacao: validacaoDaComunidade(linha.source), especialidade: linha.specialty },
      }
    })

    const { data: assuntos } = await supabase.from("questions").select("subject")
    materias = [...new Set((assuntos ?? []).map((a) => a.subject))].sort((a, b) => a.localeCompare(b, "pt-BR"))
  } else {
    let consulta = supabase.from("questoes").select(COLUNAS, { count: "exact" }).eq("acervo", acervo)

    if (materia) consulta = consulta.eq("materia", materia)

    if (especialidade) {
      const barreiras = barreirasComOrientacao(especialidade)
      // Sem célula escrita, não há o que oferecer — e devolver o acervo inteiro
      // seria pior que devolver nada, porque pareceria orientação existente.
      consulta = barreiras.length
        ? consulta.overlaps("barreiras", barreiras)
        : consulta.eq("id", "__sem-orientacao__")
    }

    if (busca) {
      // `ilike` sobre o enunciado. Não é busca semântica, e não precisa ser: o
      // professor chega procurando por assunto ("cone", "fotossíntese"), e o
      // termo costuma estar escrito no enunciado.
      consulta = consulta.ilike("enunciado", `%${busca}%`)
    }

    // As do ENEM saem da mais fácil para a mais difícil, pela escala oficial,
    // que é a ordem em que se monta uma sequência. `nullsFirst: false` põe
    // vestibular e autorais — sem dificuldade medida — no fim, e não no começo,
    // onde pareceriam as mais fáceis.
    const { data, error, count } = await consulta
      .order("dificuldade_escala", { ascending: true, nullsFirst: false })
      .order("id", { ascending: true })
      .range(de, de + POR_PAGINA - 1)

    erro = Boolean(error)
    total = count ?? 0
    questoes = (data as unknown as QuestaoDoAcervo[] | null) ?? []

    const { data: assuntos } = await supabase.from("questoes").select("materia").eq("acervo", acervo)
    materias = [...new Set((assuntos ?? []).map((a) => a.materia))].sort((a, b) => a.localeCompare(b, "pt-BR"))
  }

  if (erro) console.error("Erro ao carregar o acervo de questões.")

  return (
    <QuestoesClient
      questoes={questoes}
      total={total}
      pagina={pagina}
      porPagina={POR_PAGINA}
      materias={materias}
      especialidades={SPECIALTIES.map((s) => ({ slug: s.slug, nameKey: s.nameKey }))}
      barreiras={BARREIRAS}
      // Só as células da especialidade escolhida. A matriz inteira são 40
      // células em três idiomas, e mandá-la toda a cada página seria pagar
      // trânsito por 39 textos que a tela não vai mostrar.
      celulas={especialidade ? MATRIZ.filter((c) => c.especialidade === especialidade) : []}
      filtros={{ acervo, materia, especialidade, busca }}
      loadError={erro}
    />
  )
}
