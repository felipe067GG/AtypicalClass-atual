import type { Language } from "./translations"

/**
 * Texto de conteúdo nos três idiomas.
 *
 * O conteúdo das especialidades não passa por `lib/translations.ts` — ele é
 * longo, muda junto com a área e ficaria ilegível espalhado em três blocos
 * distantes. Aqui as três versões ficam lado a lado, no mesmo lugar onde o
 * conteúdo é escrito.
 *
 * O tipo é o que garante a tradução: faltando um idioma, o TypeScript acusa.
 * Não dá para "deixar o inglês para depois" sem quebrar o build.
 */
export interface LocalizedText {
  pt: string
  en: string
  es: string
}

/** Açúcar sintático para escrever as três versões em uma linha. */
export function ml(pt: string, en: string, es: string): LocalizedText {
  return { pt, en, es }
}

/** Lista com as três versões. O comprimento precisa bater entre os idiomas. */
export interface LocalizedList {
  pt: string[]
  en: string[]
  es: string[]
}

export function mlList(pt: string[], en: string[], es: string[]): LocalizedList {
  return { pt, en, es }
}

/**
 * Resolve um campo que pode ser texto simples (áreas legadas, já traduzidas
 * via chave) ou `LocalizedText` (áreas migradas).
 */
export function text(value: string | LocalizedText | undefined, language: Language): string {
  if (value === undefined) return ""
  return typeof value === "string" ? value : value[language]
}

export function list(value: string[] | LocalizedList | undefined, language: Language): string[] {
  if (value === undefined) return []
  return Array.isArray(value) ? value : value[language]
}
