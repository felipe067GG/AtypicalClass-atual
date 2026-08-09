import type { Citation, EvidenceLevel } from "@/components/specialty/types"
import type { LocalizedText } from "@/lib/i18n-content"

/**
 * Guias de adaptação de questões, por matéria e especialidade.
 *
 * São 196 pares possíveis — catorze matérias por catorze especialidades — e
 * cada guia faz afirmações pedagógicas: que tal barreira atrapalha tal aluno,
 * que tal ajuste ajuda. Isso é conteúdo, e vale aqui a mesma regra que vale no
 * resto do site: **nada entra sem fonte que o `npm run check:links` consiga
 * validar**.
 *
 * A regra está no tipo, e não só na disciplina de quem escreve. Ao longo de
 * quase duzentos textos, confiar na memória de quem redige é o caminho certo
 * para o décimo guia sair sem fonte e ninguém notar. Aqui, barreira e
 * estratégia carregam `citations` obrigatórias — um guia sem fonte não
 * compila, e o conferidor recusa antes de chegar ao ar.
 *
 * O que **não** precisa de fonte é o que a própria questão informa: que ela
 * tem figura, que o enunciado é longo, que a dificuldade é 699 na escala do
 * ENEM. Isso é dado, não afirmação.
 */

/** Uma dificuldade que a questão impõe a este aluno, e por que ela existe. */
export interface Barreira {
  titulo: LocalizedText
  /** O que acontece com o aluno diante desta questão. */
  descricao: LocalizedText
  /** Sem fonte, a barreira é palpite — e por isso o campo é obrigatório. */
  citations: Citation[]
}

/** O que o professor faz a respeito. */
export interface Estrategia {
  titulo: LocalizedText
  /** Instrução aplicável em sala, não princípio abstrato. */
  comoFazer: LocalizedText
  citations: Citation[]
  /**
   * Nível de evidência, quando a fonte o declara. Ausente quer dizer que a
   * fonte descreve a prática sem classificar a força da evidência — o que é
   * honesto dizer, e melhor que inventar um nível.
   */
  evidence?: EvidenceLevel
}

/**
 * O guia de um par matéria × especialidade.
 *
 * `materia` e `especialidade` usam exatamente os nomes já em uso no acervo de
 * questões e em `lib/specialties.ts`. Divergir aqui criaria um filtro que não
 * casa com nada, falha que só aparece quando o professor procura e não acha.
 */
export interface GuiaDeAdaptacao {
  materia: string
  /** Slug da especialidade, como em `SPECIALTIES` — "discalculia", "autismo". */
  especialidade: string
  /** Por que este par merece guia próprio, em vez do geral da especialidade. */
  porQueEstePar: LocalizedText
  barreiras: Barreira[]
  estrategias: Estrategia[]
}
