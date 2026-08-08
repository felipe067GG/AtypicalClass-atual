import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/site"

/**
 * robots.txt.
 *
 * O site não tinha um: `/robots.txt` respondia 404. Não é proibição — sem
 * arquivo o rastreador entende que pode ler tudo —, mas é aqui que se aponta o
 * sitemap, e é isso que faz o Google achar as rotas sem pedido manual.
 *
 * O bloqueio é curto de propósito. `/api/` não são páginas, e `/auth` é tela
 * de login: aparecer na busca não ajuda ninguém e ainda gasta rastreamento
 * que deveria ir para o conteúdo.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
