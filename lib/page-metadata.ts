import type { Metadata } from "next"

import { getSpecialty } from "./specialties"
import { translations, type Language } from "./translations"
import { DEFAULT_LOCALE, isLocale } from "./i18n-routing"

/**
 * Metadata das páginas nas três línguas.
 *
 * Quando o idioma passou para a rota, o corpo das páginas passou a ser
 * traduzido pelo servidor — mas o `<title>` e a `description` continuavam
 * escritos à mão em português dentro de cada `layout.tsx`. O resultado era uma
 * página em inglês anunciando-se em português na aba do navegador e no
 * resultado de busca, que é justamente o texto que decide se alguém clica.
 *
 * Nada aqui inventa tradução: tudo sai de `lib/translations.ts`, das mesmas
 * chaves que a página já usa para o título e o texto de abertura visíveis. Foi
 * o que permitiu fazer isto sem escrever conteúdo novo em duas línguas.
 */

function texto(lang: Language, key: string): string | undefined {
  const valor = (translations[lang] as Record<string, unknown>)[key]
  return typeof valor === "string" && valor.trim() ? valor : undefined
}

/** O segmento da URL é público, então pode chegar qualquer coisa aqui. */
export function resolveLang(value: string): Language {
  return isLocale(value) ? value : DEFAULT_LOCALE
}

/**
 * Monta a metadata a partir de chaves de tradução.
 *
 * `fallbackDescription` existe para as três páginas cuja descrição ainda não
 * tem versão traduzida (`/recursos`, `/sobre` e `/contribuir`): elas mantêm o
 * texto em português nos três idiomas, em vez de ganharem uma tradução
 * inventada. O título dessas páginas é traduzido normalmente.
 */
export function pageMetadata(
  langParam: string,
  titleKey: string,
  descriptionKey?: string,
  fallbackDescription?: string,
): Metadata {
  const lang = resolveLang(langParam)
  const title = texto(lang, titleKey)
  const description = (descriptionKey ? texto(lang, descriptionKey) : undefined) ?? fallbackDescription

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  }
}

/** Metadata de uma página de especialidade, vinda do registro em `specialties.ts`. */
export function specialtyMetadata(slug: string, langParam: string): Metadata {
  const specialty = getSpecialty(slug)
  if (!specialty) return {}
  return pageMetadata(langParam, specialty.nameKey, specialty.introKey)
}
