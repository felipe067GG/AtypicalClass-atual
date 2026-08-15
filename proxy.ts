import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n-routing"
import { translations } from "@/lib/translations"

/**
 * Mantém a sessão do Supabase renovada e resolve o idioma da rota.
 *
 * Sem a parte do Supabase, o access token expira e as Server Actions passam a
 * enxergar o usuário como deslogado mesmo com o refresh token válido no
 * cookie. É a chamada a `getUser()` que dispara o refresh.
 *
 * A parte de idioma existe porque todas as páginas moram em `app/[lang]`, mas
 * o português não tem prefixo na URL. `/questoes` é reescrito internamente
 * para `/pt/questoes` — reescrita, não redirecionamento: o endereço que o
 * usuário vê e que o Google indexou continua sendo `/questoes`. Preservar
 * essas URLs foi o motivo de o padrão ficar sem prefixo.
 *
 * Não há headers de CORS aqui: `/api/chat` só é chamado pelo próprio site
 * (mesma origem), e o par `Allow-Origin: *` + `Allow-Credentials: true` que
 * existia antes é inválido e desnecessariamente permissivo.
 *
 * Chamava-se `middleware.ts` até o Next 16, que renomeou a convenção para
 * `proxy`. Mesmo comportamento, nome novo.
 */

/**
 * Caminhos que não são página e por isso não recebem prefixo de idioma.
 *
 * `/auth/callback` é o endereço de confirmação de e-mail cadastrado no painel
 * do Supabase: se ele mudasse, todo cadastro novo quebraria no link do e-mail.
 *
 * `sitemap.xml` e `robots.txt` estão aqui além de excluídos no `matcher`, de
 * propósito. O matcher só dispensa extensões de imagem, então sem esta guarda
 * os dois virariam `/pt/sitemap.xml` e responderiam 404 — justamente os
 * arquivos que dizem ao Google o que indexar.
 */
const UNLOCALIZED_FILES = new Set(["/sitemap.xml", "/robots.txt"])

function isUnlocalized(pathname: string): boolean {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth/callback") ||
    UNLOCALIZED_FILES.has(pathname)
  )
}

function hasLocalePrefix(pathname: string): boolean {
  const first = pathname.split("/")[1] ?? ""
  return isLocale(first) && first !== DEFAULT_LOCALE
}

/**
 * `/pt/questoes` é o mesmo que `/questoes`, e precisa dizer isso em vez de 404.
 *
 * O português mora na raiz, então `localizedHref` nunca gera `/pt/` e o sitemap
 * também não — nada no site aponta para lá. Mas `hasLocalePrefix` responde
 * `false` para `pt`, porque para ele prefixo é o que o padrão não tem. O
 * resultado é que `/pt/questoes` era tratado como caminho sem idioma e recebia o
 * prefixo padrão por cima: reescrito para `/pt/pt/questoes`, que não existe.
 *
 * Quebrava para qualquer visitante, não só para quem tem cookie de outro idioma,
 * e de um jeito difícil de acreditar quando acontece: `/pt/questoes` é uma
 * página que o build realmente gera, e ainda assim não abre. Quem digita o
 * endereço à mão, ou guardou um de antes de o idioma entrar na rota, cai nisso.
 *
 * Redirecionamento, e não reescrita, porque as duas URLs serviriam a mesma
 * página em português — deixar as duas vivas seria conteúdo duplicado, o mesmo
 * motivo de o redirecionamento por cookie logo abaixo também ser redirecionamento.
 */
function semPrefixoRedundante(pathname: string): string | null {
  const raiz = `/${DEFAULT_LOCALE}`
  if (pathname === raiz) return "/"
  if (pathname.startsWith(`${raiz}/`)) return pathname.slice(raiz.length)
  return null
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Tira o `/pt` redundante antes de qualquer outra coisa. Quem tem cookie de
  // outro idioma dá mais um salto no pedido seguinte, e é de propósito: são duas
  // regras independentes, e juntá-las numa só esconderia as duas.
  const semPt = semPrefixoRedundante(pathname)
  if (!isUnlocalized(pathname) && semPt) {
    const url = request.nextUrl.clone()
    url.pathname = semPt
    return NextResponse.redirect(url)
  }

  /**
   * Quem já escolheu um idioma vai para a versão dele.
   *
   * Aqui é redirecionamento, não reescrita, para que a URL na barra combine
   * com o conteúdo — uma mesma URL servindo idiomas diferentes conforme o
   * cookie confundiria cache e indexação. Como depende de cookie, robô não é
   * afetado: sem cookie, `/questoes` é sempre português.
   */
  const preferred = request.cookies.get("language")?.value
  if (
    !isUnlocalized(pathname) &&
    !hasLocalePrefix(pathname) &&
    preferred &&
    isLocale(preferred) &&
    preferred !== DEFAULT_LOCALE &&
    translations[preferred]
  ) {
    const url = request.nextUrl.clone()
    url.pathname = `/${preferred}${pathname}`
    return NextResponse.redirect(url)
  }

  /**
   * A resposta precisa ser reconstruída quando o Supabase renova cookies, e a
   * reconstrução tem que repetir a reescrita — senão a renovação de sessão
   * jogaria fora o prefixo de idioma e a rota cairia em 404.
   */
  const buildResponse = () => {
    if (isUnlocalized(pathname) || hasLocalePrefix(pathname)) {
      return NextResponse.next({ request })
    }
    const url = request.nextUrl.clone()
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`
    return NextResponse.rewrite(url, { request })
  }

  let response = buildResponse()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = buildResponse()
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )

  // Necessário: é esta chamada que dispara o refresh do token.
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    // Tudo, menos arquivos estáticos, imagens e os arquivos de indexação.
    "/((?!_next/static|_next/image|favicon.ico|favicon.jpg|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
  ],
}
