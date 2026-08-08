import type { MetadataRoute } from "next"

import { SPECIALTIES } from "@/lib/specialties"
import { SITE_URL } from "@/lib/site"

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
 * Fica de fora só o que não serve a quem chega pela busca: `/auth` é tela de
 * login, e `/auth/callback` e `/api/*` não são páginas.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const specialtyRoutes = SPECIALTIES.map((specialty) => ({
    url: `${SITE_URL}/${specialty.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    // As duas rotas que vêm do banco: mudam sempre que entra material novo.
    {
      url: `${SITE_URL}/questoes`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/conteudos`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...specialtyRoutes,
    {
      url: `${SITE_URL}/recursos`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contribuir`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
  ]
}
