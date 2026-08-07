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
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const tokenHash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null

  const supabase = await createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}/?confirmado=1`)
    }
    return NextResponse.redirect(`${origin}/auth?erro=${encodeURIComponent(error.message)}`)
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) {
      return NextResponse.redirect(`${origin}/?confirmado=1`)
    }
    return NextResponse.redirect(`${origin}/auth?erro=${encodeURIComponent(error.message)}`)
  }

  return NextResponse.redirect(`${origin}/auth?erro=link_invalido`)
}
