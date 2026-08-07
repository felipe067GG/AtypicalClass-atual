import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Mantém a sessão do Supabase renovada.
 *
 * Sem isso, o access token expira e as Server Actions passam a enxergar o
 * usuário como deslogado mesmo com o refresh token válido no cookie.
 *
 * Não há headers de CORS aqui: `/api/chat` só é chamado pelo próprio site
 * (mesma origem), e o par `Allow-Origin: *` + `Allow-Credentials: true` que
 * existia antes é inválido e desnecessariamente permissivo.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

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
          response = NextResponse.next({ request })
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
    // Tudo, menos arquivos estáticos e imagens.
    "/((?!_next/static|_next/image|favicon.ico|favicon.jpg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
  ],
}
