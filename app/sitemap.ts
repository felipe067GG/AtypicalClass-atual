import type { MetadataRoute } from "next"

import { SPECIALTIES } from "@/lib/specialties"
import { SITE_URL } from "@/lib/site"
import { LOCALES, localizedHref } from "@/lib/i18n-routing"

/**
 * Sitemap do site.
 *
 * Antes não existia, e a única forma de avisar o Google sobre uma página era
 * pedir a indexação dela à mão, uma a uma, dentro de uma cota diária. Com o
 * sitemap enviado uma vez no Search Console, as rotas passam a ser descobertas
 * sozinhas — inclusive as que ainda vão nascer.
 *
 * As especialidades saem de `SPECIALTIES`, o mesmo registro que alimenta a
 * navegação e o rodapé. É de propósito: uma área nova entra no sitemap no
 * mesmo commit em que entra no menu, sem ninguém precisar lembrar daqui.
 *
 * Cada caminho aparece uma vez por idioma, e cada entrada declara as outras
 * duas em `alternates.languages` — é o `hreflang`, que diz ao Google que
 * `/questoes` e `/en/questoes` são a mesma página em línguas diferentes, e não
 * conteúdo duplicado competindo entre si.
 *
 * Fica de fora só o que não serve a quem chega pela busca: `/auth` é tela de
 * login, e `/auth/callback` e `/api/*` não são páginas.
 */

interface Rota {
  path: string
  changeFrequency: "weekly" | "monthly" | "yearly"
  priority: number
}

const ROTAS: Rota[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  // As duas rotas que vêm do banco: mudam sempre que entra material novo.
  { path: "/questoes", changeFrequency: "weekly", priority: 0.9 },
  { path: "/conteudos", changeFrequency: "weekly", priority: 0.9 },
  // Ferramenta, e não acervo: o conteúdo dela é o material que o professor
  // traz, então não muda com o que entra aqui.
  { path: "/adaptar", changeFrequency: "monthly", priority: 0.9 },
  ...SPECIALTIES.map((specialty) => ({
    path: `/${specialty.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  { path: "/recursos", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contribuir", changeFrequency: "weekly", priority: 0.5 },
  { path: "/sobre", changeFrequency: "yearly", priority: 0.4 },
]

function absolute(path: string, locale: (typeof LOCALES)[number]): string {
  const href = localizedHref(path, locale)
  return href === "/" ? SITE_URL : `${SITE_URL}${href}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return ROTAS.flatMap((rota) =>
    LOCALES.map((locale) => ({
      url: absolute(rota.path, locale),
      lastModified,
      changeFrequency: rota.changeFrequency,
      priority: rota.priority,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((outro) => [outro, absolute(rota.path, outro)])),
      },
    })),
  )
}
