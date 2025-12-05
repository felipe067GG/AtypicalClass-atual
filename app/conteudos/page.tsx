"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, FileText } from "lucide-react"
import Header from "../components/header"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/hooks/useLanguage"

interface Content {
  id: string
  title: string
  subject: string
  specialty: string
  content_type: string
  description: string
  content_text: string
  tags: string[]
  source: string
  created_at: string
}

const SUBJECTS = [
  { value: "all", label: "Todas as Matérias", icon: "📚" },
  { value: "Português", label: "Português", icon: "📖" },
  { value: "Matemática", label: "Matemática", icon: "🔢" },
  { value: "História", label: "História", icon: "🏛️" },
  { value: "Geografia", label: "Geografia", icon: "🌍" },
  { value: "Biologia", label: "Biologia", icon: "🧬" },
  { value: "Física", label: "Física", icon: "⚡" },
  { value: "Química", label: "Química", icon: "⚗️" },
  { value: "Inglês", label: "Inglês", icon: "🇬🇧" },
]

export default function ConteudosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const loadContents = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("content").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading contents:", error)
      } else if (data) {
        setContents(data)
      }
      setLoading(false)
    }

    loadContents()
  }, [])

  const filteredContents = contents.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSubject = selectedSubject === "all" || c.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300">Carregando conteúdos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-full px-6 py-2 mb-4">
            <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
            <span className="text-blue-300">{t("contentLibrary")}</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
            {t("educationalContent")}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">{t("contentDesc")}</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={t("searchContent")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((subject) => (
              <Button
                key={subject.value}
                variant={selectedSubject === subject.value ? "default" : "outline"}
                onClick={() => setSelectedSubject(subject.value)}
                className={
                  selectedSubject === subject.value
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                {subject.icon} {subject.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-4"
        >
          <p className="text-gray-400">
            {t("showing")} <span className="text-blue-400 font-semibold">{filteredContents.length}</span>{" "}
            {t("contents")}
          </p>
        </motion.div>

        {/* Content Detail View */}
        {selectedContent ? (
          <motion.div
            key={selectedContent.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gray-950/70 border-gray-800">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-3xl text-white mb-2">{selectedContent.title}</CardTitle>
                    <CardDescription className="text-slate-400 text-lg">{selectedContent.description}</CardDescription>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedContent(null)} className="text-slate-400">
                    ✕
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-600">{selectedContent.subject}</Badge>
                  <Badge className="bg-purple-600">{selectedContent.specialty}</Badge>
                  <Badge className="bg-green-600">{selectedContent.content_type}</Badge>
                  {selectedContent.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="border-gray-600 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-lg">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-white leading-relaxed whitespace-pre-wrap">{selectedContent.content_text}</div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-700">
                  <Button
                    onClick={() => {
                      const currentIndex = filteredContents.findIndex((c) => c.id === selectedContent.id)
                      if (currentIndex > 0) {
                        setSelectedContent(filteredContents[currentIndex - 1])
                      }
                    }}
                    disabled={filteredContents.findIndex((c) => c.id === selectedContent.id) === 0}
                    variant="outline"
                    className="border-gray-700"
                  >
                    ← {t("previous")}
                  </Button>
                  <Button
                    onClick={() => {
                      const currentIndex = filteredContents.findIndex((c) => c.id === selectedContent.id)
                      if (currentIndex < filteredContents.length - 1) {
                        setSelectedContent(filteredContents[currentIndex + 1])
                      }
                    }}
                    disabled={
                      filteredContents.findIndex((c) => c.id === selectedContent.id) === filteredContents.length - 1
                    }
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {t("next")} →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Content Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContents.map((content, index) => {
              const subjectData = SUBJECTS.find((s) => s.value === content.subject)

              return (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card
                    className="bg-gray-950/70 border-gray-800 hover:border-blue-500/50 transition-all cursor-pointer h-full"
                    onClick={() => setSelectedContent(content)}
                  >
                    <CardHeader>
                      <div className="flex gap-2 flex-wrap mb-3">
                        <Badge className="bg-blue-600 hover:bg-blue-700">
                          {subjectData?.icon} {content.subject}
                        </Badge>
                        <Badge className="bg-purple-600">{content.specialty}</Badge>
                      </div>
                      <CardTitle className="text-white text-xl line-clamp-2">{content.title}</CardTitle>
                      <CardDescription className="text-gray-300 text-sm mt-2 line-clamp-3">
                        {content.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {content.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {content.tags.length > 3 && (
                          <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                            +{content.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <FileText className="w-4 h-4 mr-2" />
                        {t("readContent")}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        {filteredContents.length === 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="py-12">
                <p className="text-gray-400 text-lg">{t("noContentFound")}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  )
}
