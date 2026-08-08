import type { Language } from "./translations"

/**
 * Idioma na URL.
 *
 * Antes o idioma vivia só num cookie e era aplicado depois da hidratação: o
 * primeiro quadro saía sempre em português, e quem escolheu inglês ou espanhol
 * via a página piscar. Pior, as três versões dividiam a mesma URL, então só
 * uma podia ser indexada, e o `lang` do `<html>` mentia para o leitor de tela.
 *
 * Com o idioma na rota, cada versão tem endereço próprio, é estática e pode
 * ser indexada em separado — e o servidor já sabe em que idioma renderizar.
 *
 * O português não leva prefixo. Isso é deliberado: `/questoes` e as catorze
 * páginas de especialidade já estavam indexadas quando esta mudança foi feita,
 * e mover essas URLs jogaria fora o trabalho. Quem carrega prefixo é o que
 * ainda não existia: `/en/...` e `/es/...`.
 */
export const LOCALES = ["pt", "en", "es"] as const

export const DEFAULT_LOCALE: Language = "pt"

export function isLocale(value: string): value is Language {
  return (LOCALES as readonly string[]).includes(value)
}

/** Prefixo de URL do idioma — vazio no padrão, que mora na raiz. */
export function localePrefix(locale: Language): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`
}

/**
 * Traduz um caminho interno para o idioma pedido.
 * `localizedHref("/questoes", "es")` → `"/es/questoes"`.
 */
export function localizedHref(path: string, locale: Language): string {
  const normalized = path === "/" ? "" : path
  return `${localePrefix(locale)}${normalized}` || "/"
}

/**
 * Separa o idioma do resto do caminho.
 * `/es/questoes` → `{ locale: "es", path: "/questoes" }`
 * `/questoes`    → `{ locale: "pt", path: "/questoes" }`
 */
export function splitLocale(pathname: string): { locale: Language; path: string } {
  const [, first = "", ...rest] = pathname.split("/")
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return { locale: first, path: `/${rest.join("/")}` }
  }
  return { locale: DEFAULT_LOCALE, path: pathname }
}
