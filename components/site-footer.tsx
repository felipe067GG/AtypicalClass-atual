"use client"

import { LocaleLink as Link } from "@/components/locale-link"
import { Mail } from "lucide-react"
import { LogoWordmark } from "@/components/brand/logo"
import { useLanguage } from "@/lib/language-context"
import { SPECIALTIES } from "@/lib/specialties"

const CONTACT_EMAIL = "classatypical@gmail.com"

/**
 * Rodapé do site.
 *
 * O site não tinha nenhum — as páginas simplesmente acabavam. Além de fechar o
 * layout, ele é a segunda via de navegação: quem chegou ao fim de uma página
 * precisa de um próximo passo, não de um beco sem saída.
 */
export function SiteFooter() {
  const { t } = useLanguage()

  const columns = [
    {
      title: t("specialties"),
      links: SPECIALTIES.map((specialty) => ({
        href: `/${specialty.slug}`,
        label: t(specialty.nameKey),
      })),
    },
    {
      title: t("resourcesLabel"),
      links: [
        { href: "/questoes", label: t("questions") },
        { href: "/conteudos", label: t("content") },
        { href: "/recursos", label: t("resourcesLabel") },
      ],
    },
    {
      title: t("teacherCommunity"),
      links: [
        { href: "/contribuir", label: t("contribute") },
        { href: "/auth", label: t("teacherArea") },
        { href: "/sobre", label: t("about") },
      ],
    },
  ]

  return (
    <footer className="mt-24 border-t border-border bg-surface-2/50">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex">
              <LogoWordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              {t("footerDescription")}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {CONTACT_EMAIL}
            </a>
          </div>

          {columns.map((column, index) => (
            <nav key={index} aria-label={column.title}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {column.title}
              </h2>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AtypicalClass</p>
          <p className="text-pretty">{t("footerNote")}</p>
        </div>
      </div>
    </footer>
  )
}
