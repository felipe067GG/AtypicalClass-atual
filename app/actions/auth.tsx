"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

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
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
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
