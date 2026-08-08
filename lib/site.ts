/**
 * Endereço canônico do site.
 *
 * Existe porque o sitemap e o robots.txt não podem errar isto. O
 * `NEXT_PUBLIC_APP_URL` nasceu para o link de confirmação de e-mail do
 * Supabase e vale `http://localhost:3000` no `.env.local` — se o sitemap
 * saísse direto dessa variável e ela não estivesse configurada no build de
 * produção, o site entregaria ao Google uma lista de URLs `localhost`. Um
 * sitemap errado é pior que sitemap nenhum: o Google passa a tentar rastrear
 * endereços que não existem.
 *
 * Por isso a variável só é aceita quando é mesmo uma URL https. Em qualquer
 * outro caso cai no domínio canônico, que é o mesmo registrado na Vercel — o
 * apex `atypicalclass.com.br` responde 307 para a forma com `www`, então é a
 * forma com `www` que deve aparecer em links públicos.
 */
const CANONICAL = "https://www.atypicalclass.com.br"

function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (configured?.startsWith("https://")) {
    return configured.replace(/\/+$/, "")
  }
  return CANONICAL
}

export const SITE_URL = resolveSiteUrl()
