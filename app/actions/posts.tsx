"use server"

import { createClient } from "@/lib/supabase/server"

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Você precisa estar logado para criar um post" }
  }

  // Get teacher info
  const { data: teacher } = await supabase.from("teachers").select("name").eq("id", user.id).single()

  if (!teacher) {
    return { success: false, message: "Professor não encontrado" }
  }

  const post_type = formData.get("post_type") as string
  const title = formData.get("title") as string
  const content =
    (formData.get("content") as string) ||
    (formData.get("question_text") as string) ||
    (formData.get("description") as string) ||
    "Conteúdo não fornecido"
  const subject = formData.get("subject") as string
  const specialty = formData.get("specialty") as string

  const { error } = await supabase.from("posts").insert({
    teacher_id: user.id,
    teacher_name: teacher.name,
    post_type,
    title,
    content,
    subject,
    specialty,
  })

  if (error) {
    return { success: false, message: "Erro ao criar post: " + error.message }
  }

  // If it's a question or tip, also add to respective tables
  if (post_type === "question" && subject && specialty) {
    const question_text = formData.get("question_text") as string
    const options = JSON.parse(formData.get("options") as string)
    const correct_answer = formData.get("correct_answer") as string
    const explanation = formData.get("explanation") as string
    const difficulty = formData.get("difficulty") as string

    await supabase.from("questions").insert({
      title,
      subject,
      specialty,
      difficulty,
      question_text,
      options,
      correct_answer,
      explanation,
      source: "community",
      teacher_id: user.id,
    })
  }

  if (post_type === "tip" && subject && specialty) {
    const description = formData.get("description") as string
    const content_type = "Dica Pedagógica"
    const tags = JSON.parse(formData.get("tags") as string)

    await supabase.from("content").insert({
      title,
      subject,
      specialty,
      content_type,
      description,
      content_text: content,
      tags,
      source: "community",
      teacher_id: user.id,
    })
  }

  return { success: true, message: "Post criado com sucesso!" }
}

/**
 * Curte ou descurte um post.
 *
 * A curtida é uma linha em `post_likes` com PK (post_id, teacher_id): o banco
 * garante que ninguém curta duas vezes, e um trigger mantém `posts.likes`.
 */
export async function toggleLike(postId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Você precisa estar logado" }
  }

  const { data: existing } = await supabase
    .from("post_likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("teacher_id", user.id)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase.from("post_likes").delete().eq("post_id", postId).eq("teacher_id", user.id)

    if (error) {
      return { success: false, message: "Erro ao remover curtida" }
    }
    return { success: true, liked: false }
  }

  const { error } = await supabase.from("post_likes").insert({ post_id: postId, teacher_id: user.id })

  if (error) {
    return { success: false, message: "Erro ao curtir post" }
  }
  return { success: true, liked: true }
}

export async function addComment(postId: string, commentText: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Você precisa estar logado para comentar" }
  }

  const { data: teacher } = await supabase.from("teachers").select("name").eq("id", user.id).single()

  if (!teacher) {
    return { success: false, message: "Professor não encontrado" }
  }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    teacher_id: user.id,
    teacher_name: teacher.name,
    comment_text: commentText,
  })

  if (error) {
    return { success: false, message: "Erro ao adicionar comentário" }
  }

  return { success: true, message: "Comentário adicionado!" }
}

export async function deletePost(postId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Você precisa estar logado" }
  }

  // Comentários e curtidas somem junto pelo ON DELETE CASCADE.
  // O `.eq("teacher_id", user.id)` — reforçado pela policy de RLS — garante
  // que ninguém apague post de outra pessoa.
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .eq("teacher_id", user.id)
    .select("id")

  if (error) {
    return { success: false, message: "Erro ao deletar post: " + error.message }
  }

  if (!data || data.length === 0) {
    return { success: false, message: "Você só pode deletar seus próprios posts" }
  }

  return { success: true, message: "Post deletado com sucesso!" }
}
