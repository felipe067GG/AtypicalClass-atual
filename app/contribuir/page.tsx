"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { createPost, likePost, addComment, deletePost } from "../actions/posts"
import { useLanguage } from "@/lib/language-context"

const subjects = [
  "Português",
  "Matemática",
  "História",
  "Geografia",
  "Biologia",
  "Física",
  "Química",
  "Inglês",
  "Educação Especial",
]

const specialties = [
  "Álgebra",
  "Geometria",
  "Gramática",
  "Literatura",
  "História do Brasil",
  "História Geral",
  "Geografia Física",
  "Geografia Humana",
  "Mecânica",
  "Química Geral",
  "Citologia",
  "Ecologia",
  "Vocabulário",
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
  const { t } = useLanguage() // Added translation hook
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const [posts, setPosts] = useState<Post[]>([])
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

  useEffect(() => {
    const loadPosts = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading posts:", error)
      } else if (data) {
        // Load comments for each post
        const postsWithComments = await Promise.all(
          data.map(async (post) => {
            const { data: comments } = await supabase
              .from("comments")
              .select("*")
              .eq("post_id", post.id)
              .order("created_at", { ascending: true })
            return { ...post, comments: comments || [] }
          }),
        )
        setPosts(postsWithComments)
      }
      setLoadingPosts(false)
    }

    loadPosts()
  }, [])

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

    const formData = new FormData(e.currentTarget)
    formData.append("post_type", "message")

    const result = await createPost(formData)

    setLoading(false)
    setMessage(result.message)
    setMessageType(result.success ? "success" : "error")

    if (result.success) {
      e.currentTarget.reset()
      // Reload posts
      window.location.reload()
    }
  }

  const handleSubmitTip = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    formData.append("post_type", "tip")
    formData.append("tags", JSON.stringify([formData.get("subject"), formData.get("specialty")]))

    const result = await createPost(formData)

    setLoading(false)
    setMessage(result.message)
    setMessageType(result.success ? "success" : "error")

    if (result.success) {
      e.currentTarget.reset()
      window.location.reload()
    }
  }

  const handleSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    formData.append("post_type", "question")
    formData.append("options", JSON.stringify(options.filter((o) => o.trim() !== "")))
    formData.append("correct_answer", options[Number.parseInt(correctAnswer)])

    const result = await createPost(formData)

    setLoading(false)
    setMessage(result.message)
    setMessageType(result.success ? "success" : "error")

    if (result.success) {
      e.currentTarget.reset()
      setOptions(["", "", "", ""])
      setCorrectAnswer("0")
      window.location.reload()
    }
  }

  const handleLike = async (postId: string) => {
    await likePost(postId)
    // Update local state
    setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)))
  }

  const handleComment = async (postId: string) => {
    if (!commentText.trim()) return

    const result = await addComment(postId, commentText)
    if (result.success) {
      setCommentText("")
      window.location.reload()
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Tem certeza que deseja deletar esta publicação?")) {
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
        return "Mensagem"
      case "tip":
        return "Dica"
      case "question":
        return "Questão"
      default:
        return type
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">{t("authenticating")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
            {t("contribute")} - {t("teacherCommunity")}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("shareWithCommunity")}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-950/30 border border-green-500/30 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-green-300">
              {t("loggedAs")}: {user.name}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Create Post Section */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="bg-gray-950/70 border-gray-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">{t("createPost")}</CardTitle>
                  <CardDescription className="text-slate-400">{t("shareWithCommunity")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="message" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-900">
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
                          <Label htmlFor="message-title" className="text-gray-300">
                            {t("title")}
                          </Label>
                          <Input
                            id="message-title"
                            name="title"
                            placeholder={t("messageTitle")}
                            className="bg-gray-900 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message-content" className="text-gray-300">
                            {t("message")}
                          </Label>
                          <Textarea
                            id="message-content"
                            name="content"
                            placeholder={t("shareIdeas")}
                            className="bg-gray-900 border-gray-700 text-white min-h-[120px]"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                          {loading ? t("publishing") : t("publishMessage")}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="tip">
                      <form onSubmit={handleSubmitTip} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label className="text-gray-300">{t("subject")}</Label>
                            <Select name="subject" required>
                              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
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
                            <Label className="text-gray-300">{t("specialty")}</Label>
                            <Select name="specialty" required>
                              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
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
                          <Label htmlFor="tip-title" className="text-gray-300">
                            {t("tipTitle")}
                          </Label>
                          <Input
                            id="tip-title"
                            name="title"
                            placeholder="Ex: Como ensinar frações"
                            className="bg-gray-900 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tip-description" className="text-gray-300">
                            {t("description")}
                          </Label>
                          <Input
                            id="tip-description"
                            name="description"
                            placeholder={t("tipDescription")}
                            className="bg-gray-900 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tip-content" className="text-gray-300">
                            {t("content")}
                          </Label>
                          <Textarea
                            id="tip-content"
                            name="content"
                            placeholder={t("sharePedagogicalTip")}
                            className="bg-gray-900 border-gray-700 text-white min-h-[120px]"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                          {loading ? t("publishing") : t("publishTip")}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="question">
                      <form onSubmit={handleSubmitQuestion} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label className="text-gray-300">{t("subject")}</Label>
                            <Select name="subject" required>
                              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
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
                            <Label className="text-gray-300">{t("specialty")}</Label>
                            <Select name="specialty" required>
                              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
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
                          <Label htmlFor="question-title" className="text-gray-300">
                            {t("title")}
                          </Label>
                          <Input
                            id="question-title"
                            name="title"
                            placeholder={t("questionTitle")}
                            className="bg-gray-900 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="question-text" className="text-gray-300">
                            {t("enunciation")}
                          </Label>
                          <Textarea
                            id="question-text"
                            name="question_text"
                            placeholder={t("writeEnunciation")}
                            className="bg-gray-900 border-gray-700 text-white min-h-[80px]"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-gray-300">{t("alternatives")}</Label>
                            <Button
                              type="button"
                              onClick={addOption}
                              size="sm"
                              variant="outline"
                              className="border-blue-500 text-blue-400 bg-transparent h-7"
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
                                className="bg-gray-900 border-gray-700 text-white text-sm"
                                required
                              />
                              {options.length > 2 && (
                                <Button
                                  type="button"
                                  onClick={() => removeOption(index)}
                                  size="icon"
                                  variant="ghost"
                                  className="text-red-400 h-9 w-9"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">{t("correctAnswer")}</Label>
                          <Select value={correctAnswer} onValueChange={setCorrectAnswer} required>
                            <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
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
                          <Label htmlFor="explanation" className="text-gray-300">
                            {t("explanation")}
                          </Label>
                          <Textarea
                            id="explanation"
                            name="explanation"
                            placeholder={t("explainAnswer")}
                            className="bg-gray-900 border-gray-700 text-white min-h-[60px]"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="difficulty" className="text-gray-300">
                            {t("difficulty")}
                          </Label>
                          <Select name="difficulty" required>
                            <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                              <SelectValue placeholder={t("select")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Fácil">{t("easy")}</SelectItem>
                              <SelectItem value="Médio">{t("medium")}</SelectItem>
                              <SelectItem value="Difícil">{t("hard")}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
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
                          ? "bg-green-950/50 border border-green-500/30 text-green-300"
                          : "bg-red-950/50 border border-red-500/30 text-red-300"
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
              <h2 className="text-2xl font-bold text-white mb-4">{t("communityFeed")}</h2>

              {loadingPosts ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-300">{t("loadingPosts")}</p>
                </div>
              ) : posts.length === 0 ? (
                <Card className="bg-gray-950/70 border-gray-800">
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">{t("noPosts")}</p>
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
                      <Card className="bg-gray-950/70 border-gray-800 hover:border-gray-700 transition-colors">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                                <span className="text-white font-semibold">{post.teacher_name[0]}</span>
                              </div>
                              <div>
                                <p className="text-white font-semibold">{post.teacher_name}</p>
                                <p className="text-xs text-gray-400">
                                  {new Date(post.created_at).toLocaleDateString("pt-BR")} às{" "}
                                  {new Date(post.created_at).toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-600 flex items-center gap-1">
                                {getPostIcon(post.post_type)}
                                {getPostTypeLabel(post.post_type)}
                              </Badge>
                              {user && post.teacher_id === user.id && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-950/30 h-8 w-8"
                                  title={t("delete")}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {post.title && <h3 className="text-xl font-semibold text-white">{post.title}</h3>}
                          {post.subject && post.specialty && (
                            <div className="flex gap-2">
                              <Badge variant="outline" className="border-gray-600 text-gray-300">
                                {post.subject}
                              </Badge>
                              <Badge variant="outline" className="border-gray-600 text-gray-300">
                                {post.specialty}
                              </Badge>
                            </div>
                          )}
                          <p className="text-gray-300 whitespace-pre-wrap">{post.content}</p>

                          <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(post.id)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              {post.likes} {t("likes")}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                              className="text-gray-400 hover:text-blue-400"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments?.length || 0} {t("comments")}
                            </Button>
                          </div>

                          {showComments === post.id && (
                            <div className="space-y-3 pt-4 border-t border-gray-700">
                              {post.comments && post.comments.length > 0 && (
                                <div className="space-y-2 mb-3">
                                  {post.comments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-800/50 p-3 rounded-lg">
                                      <p className="text-sm font-semibold text-blue-400">{comment.teacher_name}</p>
                                      <p className="text-sm text-gray-300 mt-1">{comment.comment_text}</p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {new Date(comment.created_at).toLocaleDateString("pt-BR")}
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
                                  className="bg-gray-800 border-gray-700 text-white"
                                />
                                <Button
                                  onClick={() => handleComment(post.id)}
                                  size="icon"
                                  className="bg-blue-600 hover:bg-blue-700"
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
