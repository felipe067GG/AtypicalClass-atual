import { NextResponse } from "next/server"
import type { EmailOtpType } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"

/**
 * Destino do link de confirmação de e-mail enviado pelo Supabase.
 *
 * Aceita os dois formatos de link que o Supabase pode gerar:
 *  - `?code=...`                  (fluxo PKCE)
 *  - `?token_hash=...&type=...`   (templates de e-mail mais recentes)
 */
/**
 * Para onde mandar depois de abrir a sessão.
 *
 * O link de recuperação pede `?proximo=/auth/nova-senha`, porque quem chega por
 * ele precisa de uma tela para trocar a senha — devolvê-lo à home com a sessão
 * de recuperação aberta e sem essa tela é o mesmo que não ter recuperação.
 *
 * **Só caminho interno.** Um `proximo` vindo da URL é entrada do usuário: sem a
 * conferência abaixo, `?proximo=https://outro-site` transformaria este endereço
 * — que é o do e-mail oficial do site — num redirecionador para qualquer lugar,
 * com a credibilidade do domínio junto. Barra dupla também sai, porque
 * `//outro-site` é URL de protocolo relativo e o navegador a segue para fora.
 */
function destino(origin: string, proximo: string | null): string {
  if (proximo && proximo.startsWith("/") && !proximo.startsWith("//")) return `${origin}${proximo}`
  return `${origin}/?confirmado=1`
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const tokenHash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const proximo = searchParams.get("proximo")

  const supabase = await createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(destino(origin, proximo))
    }
    return NextResponse.redirect(`${origin}/auth?erro=${encodeURIComponent(error.message)}`)
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) {
      // `type=recovery` é o link da senha esquecida. Ele pode chegar sem
      // `proximo` quando o template de e-mail do Supabase foi editado à mão no
      // painel e perdeu o parâmetro — daí o destino ser deduzido do tipo também.
      return NextResponse.redirect(destino(origin, proximo ?? (type === "recovery" ? "/auth/nova-senha" : null)))
    }
    return NextResponse.redirect(`${origin}/auth?erro=${encodeURIComponent(error.message)}`)
  }

  return NextResponse.redirect(`${origin}/auth?erro=link_invalido`)
}
