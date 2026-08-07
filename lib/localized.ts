import type { Language } from "./translations"

/**
 * Escolhe a variante traduzida de um campo vindo do banco.
 *
 * As tabelas `questions`, `content` e `posts` guardam o texto em português na
 * coluna base e as traduções em colunas com sufixo (`_en`, `_es`) — veja
 * scripts/06-add-translations-columns.sql. Quando a tradução não existe,
 * cai de volta no português.
 */
export function localizedField(row: object, field: string, language: Language): string {
  const record = row as Record<string, string | null | undefined>

  const base = record[field] ?? ""
  if (language === "pt") return base

  const translated = record[`${field}_${language}`]
  return translated?.trim() ? translated : base
}
