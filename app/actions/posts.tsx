"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

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
  const content = formData.get("content") as string
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

  revalidatePath("/contribuir")
  return { success: true, message: "Post criado com sucesso!" }
}

export async function likePost(postId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Você precisa estar logado" }
  }

  const { data: post } = await supabase.from("posts").select("likes").eq("id", postId).single()

  if (!post) {
    return { success: false, message: "Post não encontrado" }
  }

  const { error } = await supabase
    .from("posts")
    .update({ likes: post.likes + 1 })
    .eq("id", postId)

  if (error) {
    return { success: false, message: "Erro ao curtir post" }
  }

  revalidatePath("/contribuir")
  return { success: true }
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

  revalidatePath("/contribuir")
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

  // Check if the post belongs to the user
  const { data: post } = await supabase.from("posts").select("teacher_id").eq("id", postId).single()

  if (!post) {
    return { success: false, message: "Post não encontrado" }
  }

  if (post.teacher_id !== user.id) {
    return { success: false, message: "Você só pode deletar seus próprios posts" }
  }

  // Delete comments first (foreign key constraint)
  await supabase.from("comments").delete().eq("post_id", postId)

  // Delete the post
  const { error } = await supabase.from("posts").delete().eq("id", postId)

  if (error) {
    return { success: false, message: "Erro ao deletar post: " + error.message }
  }

  revalidatePath("/contribuir")
  return { success: true, message: "Post deletado com sucesso!" }
}
