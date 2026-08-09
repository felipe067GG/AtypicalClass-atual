import type { Citation } from "@/components/specialty/types"

/**
 * O acervo autoral: 280 questões escritas pelo AtypicalClass.
 *
 * Elas existem para o aluno que ainda não alcança uma questão de ENEM. São
 * vinte por matéria, simples, e **não se misturam com as 3.495 questões reais**
 * — vivem em `data/autorais/`, em arquivos próprios, e aparecerão em aba
 * separada em `/questoes`.
 *
 * O defeito das 43 questões antigas do Supabase nunca foi serem autorais: foi
 * não dizerem que eram, e virem com `source: 'adapted'` sem procedência
 * nenhuma. Por isso cada arquivo declara autoria e nível de validação, e
 * `scripts/autorais/conferir.mjs` recusa o que não declarar.
 *
 * Este arquivo existe em TypeScript por um motivo prático além dos tipos: o
 * `check:links` varre `lib/**.ts` e não varre `data/**.json`. O link do
 * documento da BNCC precisa estar aqui para ser verificado como qualquer outra
 * fonte do site — em JSON, ele envelheceria sem que ninguém percebesse.
 */

/**
 * O documento oficial contra o qual os códigos da BNCC são conferidos.
 *
 * `npm run bncc` baixa este PDF, extrai os 179 códigos que ele traz e recusa
 * qualquer questão que aponte para habilidade inexistente. A conferência pagou
 * o próprio custo na estreia: encontrou `EM13CHS606` e `EM13LGG504`, dois
 * códigos de forma válida e área coerente que simplesmente não existem na
 * BNCC — sete questões apontavam para eles.
 */
export const BNCC_ENSINO_MEDIO: Citation = {
  label: "BNCC — Base Nacional Comum Curricular do Ensino Médio (MEC, PDF)",
  url: "http://basenacionalcomum.mec.gov.br/images/historico/BNCC_EnsinoMedio_embaixa_site_110518.pdf",
}

/**
 * As duas frases que declaram procedência, e o conferidor as exige literais.
 *
 * Estão aqui e em `scripts/autorais/conferir.mjs`, que confere que as duas
 * cópias batem. Duplicação é o preço de os scripts rodarem em Node sem etapa de
 * build; a conferência é o que impede que ela vire divergência.
 */
export const VALIDACAO_FONTE = "questão autoral do AtypicalClass — não é questão de prova real"
export const VALIDACAO_BNCC = "código conferido contra o documento oficial da BNCC (npm run bncc)"

/** Uma questão autoral. A letra da alternativa vem da posição na lista. */
export interface QuestaoAutoral {
  numero: number
  /** Código da habilidade da BNCC — a âncora que torna a questão verificável. */
  bncc: string
  enunciado: string
  /** Cinco alternativas, na ordem A a E. */
  alternativas: string[]
  /** Letra da alternativa correta. */
  resposta: "A" | "B" | "C" | "D" | "E"
}

/** Um arquivo do acervo autoral: uma matéria, com a procedência declarada uma vez. */
export interface AcervoAutoral {
  materia: string
  autoral: true
  fonte: {
    autoria: "AtypicalClass"
    ano: number
    validacao: string
  }
  bncc: {
    documento: string
    validacao: string
  }
  questoes: QuestaoAutoral[]
}
