"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Lightbulb,
  HelpCircle,
  Heart,
  MessageCircle,
  Send,
  Plus,
  X,
  CheckCircle2,
  Trash2,
} from "lucide-react"
import Header from "../components/header"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { createPost, toggleLike, addComment, deletePost } from "../actions/posts"
import { useLanguage } from "@/lib/language-context"

const subjects = [
  "Português",
  "Matemática",
  "História",
  "Geografia",
  "Ciências",
  "Biologia",
  "Física",
  "Química",
  "Inglês",
  "Educação Especial",
]

/**
 * Condições atípicas — é isso que a coluna `specialty` guarda hoje e é por isso
 * que o filtro de /questoes filtra. A lista antiga aqui era de tópicos
 * (Álgebra, Citologia), então tudo que fosse contribuído nascia com um valor
 * que nenhuma tela conseguia filtrar.
 *
 * As quatro primeiras já têm conteúdo no banco; as três seguintes aparecem na
 * home e estão aqui para que a comunidade possa começar a cobri-las.
 */
const specialties = [
  "Autismo",
  "TDAH",
  "Dislexia",
  "Discalculia",
  "Síndrome de Down",
  "Deficiência Visual",
  "Deficiência Auditiva",
  "Outro",
]

interface Post {
  id: string
  teacher_id: string
  teacher_name: string
  post_type: string
  title: string
  content: string
  subject: string
  specialty: string
  likes: number
  created_at: string
  comments?: Comment[]
}

interface Comment {
  id: string
  teacher_name: string
  comment_text: string
  created_at: string
}

export default function ContribuirPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const dateLocale = language === "en" ? "en-US" : language === "es" ? "es-ES" : "pt-BR"
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const [posts, setPosts] = useState<Post[]>([])
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [commentText, setCommentText] = useState("")
  const [showComments, setShowComments] = useState<string | null>(null)

  // Question form states
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState("0")

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        const { data: teacher } = await supabase.from("teachers").select("*").eq("id", authUser.id).single()
        if (teacher) {
          setUser(teacher)
        } else {
          router.push("/auth")
        }
      } else {
        router.push("/auth")
      }
    }

    checkUser()
  }, [router])

  const loadPosts = useCallback(async () => {
    const supabase = createClient()

    const { data: postsData, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error loading posts:", error)
      setLoadingPosts(false)
      return
    }

    const postRows: Post[] = postsData ?? []
    const postIds = postRows.map((p) => p.id)

    if (postIds.length === 0) {
      setPosts([])
      setLikedPosts(new Set())
      setLoadingPosts(false)
      return
    }

    // Comentários e curtidas em duas queries, não uma por post.
    const [{ data: comments }, { data: likes }] = await Promise.all([
      supabase.from("comments").select("*").in("post_id", postIds).order("created_at", { ascending: true }),
      supabase.from("post_likes").select("post_id, teacher_id").in("post_id", postIds),
    ])

    const commentsByPost = new Map<string, Comment[]>()
    for (const comment of comments ?? []) {
      const list = commentsByPost.get(comment.post_id) ?? []
      list.push(comment)
      commentsByPost.set(comment.post_id, list)
    }

    setPosts(postRows.map((post) => ({ ...post, comments: commentsByPost.get(post.id) ?? [] })))
    const likeRows = (likes ?? []) as { post_id: string; teacher_id: string }[]
    setLikedPosts(new Set(likeRows.filter((like) => like.teacher_id === user?.id).map((like) => like.post_id)))
    setLoadingPosts(false)
  }, [user?.id])

  // Busca dos posts ao montar e a cada troca de usuário. O setState acontece
  // depois do await, dentro de `loadPosts` — não é render em cascata.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPosts()
  }, [loadPosts])

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("post_type", "message")

    const result = await createPost(formData)

    setLoading(false)
    setMessage(result.message)
    setMessageType(result.success ? "success" : "error")

    if (result.success) {
      form.reset()
      await loadPosts()
    }
  }

  const handleSubmitTip = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("post_type", "tip")
    formData.append("tags", JSON.stringify([formData.get("subject"), formData.get("specialty")]))

    const result = await createPost(formData)

    setLoading(false)
    setMessage(result.message)
    setMessageType(result.success ? "success" : "error")

    if (result.success) {
      form.reset()
      await loadPosts()
    }
  }

  const handleSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("post_type", "question")
    formData.append("options", JSON.stringify(options.filter((o) => o.trim() !== "")))
    formData.append("correct_answer", options[Number.parseInt(correctAnswer)])

    const result = await createPost(formData)

    setLoading(false)
    setMessage(result.message)
    setMessageType(result.success ? "success" : "error")

    if (result.success) {
      form.reset()
      setOptions(["", "", "", ""])
      setCorrectAnswer("0")
      await loadPosts()
    }
  }

  const handleLike = async (postId: string) => {
    const wasLiked = likedPosts.has(postId)

    // Atualiza na hora e desfaz se o servidor recusar.
    setLikedPosts((prev) => {
      const next = new Set(prev)
      wasLiked ? next.delete(postId) : next.add(postId)
      return next
    })
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: Math.max(p.likes + (wasLiked ? -1 : 1), 0) } : p)),
    )

    const result = await toggleLike(postId)

    if (!result.success) {
      setLikedPosts((prev) => {
        const next = new Set(prev)
        wasLiked ? next.add(postId) : next.delete(postId)
        return next
      })
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes: Math.max(p.likes + (wasLiked ? 1 : -1), 0) } : p)),
      )
      setMessage(result.message ?? "Erro ao curtir post")
      setMessageType("error")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const handleComment = async (postId: string) => {
    if (!commentText.trim()) return

    const result = await addComment(postId, commentText)
    if (result.success) {
      setCommentText("")
      await loadPosts()
    } else {
      setMessage(result.message ?? "Erro ao comentar")
      setMessageType("error")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm(t("confirmDelete"))) {
      return
    }

    const result = await deletePost(postId)

    if (result.success) {
      // Remove post from local state
      setPosts(posts.filter((p) => p.id !== postId))
      setMessage(result.message)
      setMessageType("success")
    } else {
      setMessage(result.message)
      setMessageType("error")
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000)
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-5 h-5" />
      case "tip":
        return <Lightbulb className="w-5 h-5" />
      case "question":
        return <HelpCircle className="w-5 h-5" />
      default:
        return <MessageSquare className="w-5 h-5" />
    }
  }

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case "message":
        return t("message")
      case "tip":
        return t("tip")
      case "question":
        return t("question")
      default:
        return type
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t("authenticating")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {t("contribute")} - {t("teacherCommunity")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("shareWithCommunity")}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/40 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-success">
              {t("loggedAs")}: {user.name}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Create Post Section */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="bg-surface border-border sticky top-24">
                <CardHeader>
                  <CardTitle className="text-foreground">{t("createPost")}</CardTitle>
                  <CardDescription className="text-muted-foreground">{t("shareWithCommunity")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="message" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-surface">
                      <TabsTrigger value="message" className="text-xs">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {t("message")}
                      </TabsTrigger>
                      <TabsTrigger value="tip" className="text-xs">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        {t("tip")}
                      </TabsTrigger>
                      <TabsTrigger value="question" className="text-xs">
                        <HelpCircle className="w-3 h-3 mr-1" />
                        {t("question")}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="message">
                      <form onSubmit={handleSubmitMessage} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="message-title" className="text-muted-foreground">
                            {t("title")}
                          </Label>
                          <Input
                            id="message-title"
                            name="title"
                            placeholder={t("messageTitle")}
                            className="bg-surface border-border text-foreground"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message-content" className="text-muted-foreground">
                            {t("message")}
                          </Label>
                          <Textarea
                            id="message-content"
                            name="content"
                            placeholder={t("shareIdeas")}
                            className="bg-surface border-border text-foreground min-h-[120px]"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                          {loading ? t("publishing") : t("publishMessage")}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="tip">
                      <form onSubmit={handleSubmitTip} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label className="text-muted-foreground">{t("subject")}</Label>
                            <Select name="subject" required>
                              <SelectTrigger className="bg-surface border-border text-foreground">
                                <SelectValue placeholder={t("select")} />
                              </SelectTrigger>
                              <SelectContent>
                                {subjects.map((subject) => (
                                  <SelectItem key={subject} value={subject}>
                                    {subject}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-muted-foreground">{t("specialty")}</Label>
                            <Select name="specialty" required>
                              <SelectTrigger className="bg-surface border-border text-foreground">
                                <SelectValue placeholder={t("select")} />
                              </SelectTrigger>
                              <SelectContent>
                                {specialties.map((specialty) => (
                                  <SelectItem key={specialty} value={specialty}>
                                    {specialty}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tip-title" className="text-muted-foreground">
                            {t("tipTitle")}
                          </Label>
                          <Input
                            id="tip-title"
                            name="title"
                            placeholder="Ex: Como ensinar frações"
                            className="bg-surface border-border text-foreground"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tip-description" className="text-muted-foreground">
                            {t("description")}
                          </Label>
                          <Input
                            id="tip-description"
                            name="description"
                            placeholder={t("tipDescription")}
                            className="bg-surface border-border text-foreground"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tip-content" className="text-muted-foreground">
                            {t("content")}
                          </Label>
                          <Textarea
                            id="tip-content"
                            name="content"
                            placeholder={t("sharePedagogicalTip")}
                            className="bg-surface border-border text-foreground min-h-[120px]"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                          {loading ? t("publishing") : t("publishTip")}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="question">
                      <form onSubmit={handleSubmitQuestion} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label className="text-muted-foreground">{t("subject")}</Label>
                            <Select name="subject" required>
                              <SelectTrigger className="bg-surface border-border text-foreground">
                                <SelectValue placeholder={t("select")} />
                              </SelectTrigger>
                              <SelectContent>
                                {subjects.map((subject) => (
                                  <SelectItem key={subject} value={subject}>
                                    {subject}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-muted-foreground">{t("specialty")}</Label>
                            <Select name="specialty" required>
                              <SelectTrigger className="bg-surface border-border text-foreground">
                                <SelectValue placeholder={t("select")} />
                              </SelectTrigger>
                              <SelectContent>
                                {specialties.map((specialty) => (
                                  <SelectItem key={specialty} value={specialty}>
                                    {specialty}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="question-title" className="text-muted-foreground">
                            {t("title")}
                          </Label>
                          <Input
                            id="question-title"
                            name="title"
                            placeholder={t("questionTitle")}
                            className="bg-surface border-border text-foreground"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="question-text" className="text-muted-foreground">
                            {t("enunciation")}
                          </Label>
                          <Textarea
                            id="question-text"
                            name="question_text"
                            placeholder={t("writeEnunciation")}
                            className="bg-surface border-border text-foreground min-h-[80px]"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-muted-foreground">{t("alternatives")}</Label>
                            <Button
                              type="button"
                              onClick={addOption}
                              size="sm"
                              variant="outline"
                              className="border-brand text-brand bg-transparent h-7"
                              disabled={options.length >= 6}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              {t("add")}
                            </Button>
                          </div>
                          {options.map((option, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={option}
                                onChange={(e) => updateOption(index, e.target.value)}
                                placeholder={`${t("alternative")} ${index + 1}`}
                                className="bg-surface border-border text-foreground text-sm"
                                required
                              />
                              {options.length > 2 && (
                                <Button
                                  type="button"
                                  onClick={() => removeOption(index)}
                                  size="icon"
                                  variant="ghost"
                                  aria-label={`${t("delete")} ${t("alternative")} ${index + 1}`}
                                  className="text-destructive h-9 w-9"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-muted-foreground">{t("correctAnswer")}</Label>
                          <Select value={correctAnswer} onValueChange={setCorrectAnswer} required>
                            <SelectTrigger className="bg-surface border-border text-foreground">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {options.map((option, index) =>
                                option.trim() ? (
                                  <SelectItem key={index} value={index.toString()}>
                                    {t("alt")}. {index + 1}: {option.substring(0, 30)}
                                    {option.length > 30 ? "..." : ""}
                                  </SelectItem>
                                ) : null,
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="explanation" className="text-muted-foreground">
                            {t("explanation")}
                          </Label>
                          <Textarea
                            id="explanation"
                            name="explanation"
                            placeholder={t("explainAnswer")}
                            className="bg-surface border-border text-foreground min-h-[60px]"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="difficulty" className="text-muted-foreground">
                            {t("difficulty")}
                          </Label>
                          <Select name="difficulty" required>
                            <SelectTrigger className="bg-surface border-border text-foreground">
                              <SelectValue placeholder={t("select")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Fácil">{t("easy")}</SelectItem>
                              <SelectItem value="Médio">{t("medium")}</SelectItem>
                              <SelectItem value="Difícil">{t("hard")}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                          {loading ? t("publishing") : t("publishQuestion")}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>

                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-3 rounded-lg text-sm ${
                        messageType === "success"
                          ? "bg-success/10 border border-success/40 text-success"
                          : "bg-destructive/10 border border-destructive/40 text-destructive"
                      }`}
                    >
                      {message}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t("communityFeed")}</h2>

              {loadingPosts ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">{t("loadingPosts")}</p>
                </div>
              ) : posts.length === 0 ? (
                <Card className="bg-surface border-border">
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{t("noPosts")}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="bg-surface border-border hover:border-border transition-colors">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-foreground font-semibold">{post.teacher_name[0]}</span>
                              </div>
                              <div>
                                <p className="text-foreground font-semibold">{post.teacher_name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(post.created_at).toLocaleDateString(dateLocale)}{" "}
                                  {new Date(post.created_at).toLocaleTimeString(dateLocale, {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-primary flex items-center gap-1">
                                {getPostIcon(post.post_type)}
                                {getPostTypeLabel(post.post_type)}
                              </Badge>
                              {user && post.teacher_id === user.id && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                                  aria-label={t("delete")}
                                  title={t("delete")}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {post.title && <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>}
                          {post.subject && post.specialty && (
                            <div className="flex gap-2">
                              <Badge variant="outline" className="border-border text-muted-foreground">
                                {post.subject}
                              </Badge>
                              <Badge variant="outline" className="border-border text-muted-foreground">
                                {post.specialty}
                              </Badge>
                            </div>
                          )}
                          <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>

                          <div className="flex items-center gap-4 pt-4 border-t border-border">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(post.id)}
                              aria-pressed={likedPosts.has(post.id)}
                              className={
                                likedPosts.has(post.id)
                                  ? "text-destructive hover:text-destructive"
                                  : "text-muted-foreground hover:text-destructive"
                              }
                            >
                              <Heart
                                className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? "fill-current" : ""}`}
                              />
                              {post.likes} {t("likes")}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                              className="text-muted-foreground hover:text-brand"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments?.length || 0} {t("comments")}
                            </Button>
                          </div>

                          {showComments === post.id && (
                            <div className="space-y-3 pt-4 border-t border-border">
                              {post.comments && post.comments.length > 0 && (
                                <div className="space-y-2 mb-3">
                                  {post.comments.map((comment) => (
                                    <div key={comment.id} className="bg-surface-2 p-3 rounded-lg">
                                      <p className="text-sm font-semibold text-brand">{comment.teacher_name}</p>
                                      <p className="text-sm text-muted-foreground mt-1">{comment.comment_text}</p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(comment.created_at).toLocaleDateString(dateLocale)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="flex gap-2">
                                <Input
                                  placeholder={t("writeComment")}
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  className="bg-surface-2 border-border text-foreground"
                                />
                                <Button
                                  onClick={() => handleComment(post.id)}
                                  size="icon"
                                  className="bg-primary hover:bg-primary/90"
                                  aria-label={t("send")}
                                  title={t("send")}
                                >
                                  <Send className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
