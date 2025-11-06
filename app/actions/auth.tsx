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
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:3000"}/auth/callback`,
    },
  })

  if (authError) {
    console.log("[v0] SignUp auth error:", authError)
    return { success: false, message: authError.message }
  }

  if (!authData.user) {
    console.log("[v0] SignUp no user returned")
    return { success: false, message: "Erro ao criar usuário" }
  }

  console.log("[v0] User created:", authData.user.id)

  const { error: profileError } = await supabase.from("teachers").insert({
    id: authData.user.id,
    email,
    name,
    specialty,
  })

  if (profileError) {
    console.log("[v0] Profile creation error:", profileError)
    return { success: false, message: "Erro ao criar perfil: " + profileError.message }
  }

  console.log("[v0] Teacher profile created successfully")

  return {
    success: true,
    message: "Cadastro realizado com sucesso! Você já pode fazer login.",
  }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("[v0] Attempting login for:", email)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log("[v0] Login error:", error)
    if (error.message.includes("Email not confirmed")) {
      return { success: false, message: "Por favor, confirme seu email antes de fazer login" }
    }
    return { success: false, message: "Email ou senha incorretos" }
  }

  console.log("[v0] Login successful for user:", data.user?.id)

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
