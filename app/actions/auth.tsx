"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { SITE_URL } from "@/lib/site"

/**
 * De onde o link do e-mail deve apontar.
 *
 * Sai do próprio pedido, e não de `NEXT_PUBLIC_APP_URL`. A variável vale
 * `http://localhost:3000` no `.env.local`, e se ela não estiver configurada no
 * ambiente de produção o professor recebe um e-mail cujo link aponta para a
 * máquina dele — que não abre, sem erro nenhum do lado do site. É o mesmo
 * defeito que `lib/site.ts` já contorna para o sitemap, e aqui ele é pior:
 * sitemap errado o Google reclama, link de recuperação errado ninguém reclama,
 * porque quem recebeu simplesmente desiste.
 *
 * O cabeçalho do pedido acerta nos dois ambientes: em desenvolvimento aponta
 * para localhost, em produção para o domínio de verdade. `SITE_URL` fica de
 * reserva para o caso de o cabeçalho não vir.
 */
async function enderecoDoSite(): Promise<string> {
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  if (!host) return SITE_URL
  const protocolo = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")
  return `${protocolo}://${host}`
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const specialty = formData.get("specialty") as string

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        specialty,
      },
      emailRedirectTo: `${await enderecoDoSite()}/auth/callback`,
    },
  })

  if (authError) {
    return { success: false, message: authError.message }
  }

  if (!authData.user) {
    return { success: false, message: "Erro ao criar usuário" }
  }

  // O perfil em `teachers` é criado pelo trigger `on_auth_user_created`
  // (scripts/07-fix-rls-and-likes.sql), a partir dos metadados acima.
  //
  // A tentativa de insert abaixo é a rede de segurança para o caso de o script
  // 07 ainda não ter sido aplicado: nesse cenário a policy antiga permite
  // gravar e o cadastro segue funcionando. Depois do script, a policy recusa o
  // insert — e tudo bem, porque o trigger já criou o perfil. Por isso o erro
  // não interrompe o cadastro: os dois cenários ficam cobertos e a ordem entre
  // rodar o script e publicar o site deixa de importar.
  const { error: profileError } = await supabase.from("teachers").insert({
    id: authData.user.id,
    email,
    name,
    specialty,
  })

  if (profileError) {
    console.info("Perfil não inserido pelo client (esperado com o trigger ativo):", profileError.message)
  }

  return {
    success: true,
    message: "Cadastro realizado com sucesso! Verifique seu email antes de fazer login.",
    needsVerification: true,
  }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      return { success: false, message: "Por favor, confirme seu email antes de fazer login" }
    }
    return { success: false, message: "Email ou senha incorretos" }
  }

  revalidatePath("/", "layout")
  return { success: true, message: "Login realizado com sucesso!" }
}

/**
 * Manda o link de recuperação de senha.
 *
 * ## A resposta é a mesma para e-mail cadastrado e não cadastrado
 *
 * Dizer "este e-mail não existe" transforma a tela de recuperação num
 * verificador de cadastro: qualquer um descobre quem tem conta aqui, um
 * endereço por vez. Como o site é de professor de educação especial e o perfil
 * traz a especialidade em que ele trabalha, isso não é lista inócua.
 *
 * Por isso o erro é engolido de propósito, e a tela mostra sempre "se este
 * e-mail estiver cadastrado, o link saiu".
 */
export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = String(formData.get("email") ?? "").trim()

  if (!email) return { success: false }

  const base = await enderecoDoSite()

  await supabase.auth.resetPasswordForEmail(email, {
    // O `proximo` é lido por `/auth/callback`, que estabelece a sessão e só
    // então manda para a tela da senha nova. Sem ele, o callback devolveria o
    // professor para a home com a sessão de recuperação aberta e sem tela para
    // trocar a senha — que é o mesmo que não ter recuperação.
    redirectTo: `${base}/auth/callback?proximo=${encodeURIComponent("/auth/nova-senha")}`,
  })

  return { success: true }
}

/**
 * Grava a senha nova.
 *
 * Só funciona com a sessão que o link de recuperação abriu: `updateUser` sem
 * sessão devolve erro, e é isso que impede alguém de trocar a senha de outro.
 */
export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const senha = String(formData.get("password") ?? "")

  if (senha.length < 6) return { success: false, motivo: "curta" as const }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { success: false, motivo: "expirado" as const }

  const { error } = await supabase.auth.updateUser({ password: senha })
  if (error) return { success: false, motivo: "erro" as const, message: error.message }

  revalidatePath("/", "layout")
  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
}

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: teacher } = await supabase.from("teachers").select("*").eq("id", user.id).single()

  return teacher
}
