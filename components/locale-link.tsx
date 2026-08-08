"use client"

import Link from "next/link"
import type { ComponentProps } from "react"

import { useLanguage } from "@/lib/language-context"
import { localizedHref } from "@/lib/i18n-routing"

/**
 * Link interno que respeita o idioma da página atual.
 *
 * Existe para que ninguém precise lembrar do prefixo. Escreve-se sempre o
 * caminho em português — `/questoes` — e ele vira `/es/questoes` quando o
 * visitante está na versão em espanhol. Sem isto, clicar em qualquer link
 * devolveria a pessoa ao português no meio da navegação, que é o tipo de bug
 * que só aparece depois, e para o usuário e não para quem programou.
 *
 * Como o português mora na raiz, em português o resultado é o caminho
 * inalterado — as URLs já indexadas continuam idênticas.
 */
export function LocaleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const { language } = useLanguage()
  return <Link href={localizedHref(href, language)} {...props} />
}
