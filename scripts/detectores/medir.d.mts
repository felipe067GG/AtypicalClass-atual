/**
 * Tipos do detector, para o site poder importar o **mesmo** arquivo que os
 * scripts usam.
 *
 * `medir.mjs` roda em Node sem etapa de build, ao lado dos importadores. O site
 * é TypeScript. A saída fácil seria escrever uma segunda versão em `lib/`, e é
 * exatamente o que não se pode fazer: duas cópias de um detector divergem em
 * silêncio, e aí a barreira que o professor vê na tela deixa de ser a que
 * `npm run detectores` mediu. Este arquivo existe para que haja **um** detector.
 */

export interface Medidas {
  caracteres: number
  palavras: number
  frases: number
  palavrasPorFrase: number
  numeros: number
  caracteresAlternativas: number
  maiorAlternativa: number
  densidadeVocabulario: number
  marcadoresDeOrdem: number
  temFigura: boolean
  temDescricaoDeFigura: boolean
  alternativasSoNumero: boolean
  comando: string
}

export interface Regua {
  caracteres: number
  palavrasPorFrase: number
  caracteresAlternativas: number
  numeros: number
  densidadeVocabulario: number
  palavrasParaDensidade: number
  marcadoresDeEtapa: number
  numerosParaCadeia: number
}

export interface LinhaDoRelatorio {
  medida: string
  valor: number
  percentil: number | null
}

export interface QuestaoMedivel {
  enunciado?: string
  alternativas?: { texto?: string; imagem?: string }[]
  imagens?: unknown[]
  descricoesDeFiguras?: unknown[]
}

export interface Medicao {
  medidas: Medidas
  barreiras: string[]
  relatorio: LinhaDoRelatorio[]
}

export declare const IDS: string[]
export declare const LIMIARES: Regua
export declare const LIMIARES_ESCOLARES: Regua
export declare const PERCENTIS: Record<string, Record<string, Record<string, number>>>

export declare function textoLimpo(questao: QuestaoMedivel): string
export declare function comando(questao: QuestaoMedivel): string
export declare function medidas(questao: QuestaoMedivel): Medidas
export declare function barreirasDe(m: Medidas, regua?: Regua): string[]
export declare function percentilDe(medida: string, valor: number, corpus?: string): number | null
export declare function relatar(m: Medidas, corpus?: string): LinhaDoRelatorio[]
export declare function medir(questao: QuestaoMedivel, opcoes?: { regua?: Regua; corpus?: string }): Medicao
export declare function medirDeEscola(questao: QuestaoMedivel): Medicao
