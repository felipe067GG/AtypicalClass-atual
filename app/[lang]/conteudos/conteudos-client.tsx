"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, FileText, AlertCircle } from "lucide-react"
import Header from "@/app/components/header"
import { useLanguage } from "@/lib/language-context"
import { localizedField } from "@/lib/localized"
import { staggerDelay } from "@/lib/motion"

export interface Content {
  id: string
  title: string
  subject: string
  specialty: string
  content_type: string
  description: string
  content_text: string
  content_text_en: string | null
  content_text_es: string | null
  tags: string[]
  source: string
  created_at: string
}

/**
 * Só um enfeite: a lista de matérias vem dos dados, o emoji é opcional.
 * A lista fixa que existia aqui não incluía "Ciências", então esses conteúdos
 * ficavam inalcançáveis pelo filtro.
 */
const SUBJECT_ICONS: Record<string, string> = {
  Português: "📖",
  Matemática: "🔢",
  História: "🏛️",
  Geografia: "🌍",
  Ciências: "🔬",
  Biologia: "🧬",
  Física: "⚡",
  Química: "⚗️",
  Inglês: "🇬🇧",
}

/**
 * Só a interação vive no cliente. Os conteúdos chegam prontos do servidor
 * (veja `page.tsx`), então não há estado de carregamento aqui: o primeiro
 * render — inclusive o do servidor — já mostra a biblioteca inteira.
 */
export default function ConteudosClient({
  contents,
  loadError,
}: {
  contents: Content[]
  loadError: boolean
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)

  const subjects = useMemo(
    () =>
      Array.from(new Set(contents.map((c) => c.subject).filter(Boolean))).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [contents],
  )
  const { t, language } = useLanguage()

  const filteredContents = contents.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSubject = selectedSubject === "all" || c.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main id="conteudo" className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center accent-soft rounded-full px-6 py-2 mb-4">
            <BookOpen className="w-5 h-5 mr-2 text-brand" />
            <span className="text-brand">{t("contentLibrary")}</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {t("educationalContent")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("contentDesc")}</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder={t("searchContent")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-surface border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["all", ...subjects].map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                onClick={() => setSelectedSubject(subject)}
                className={
                  selectedSubject === subject
                    ? "bg-primary hover:bg-primary/90"
                    : "border-border text-muted-foreground hover:bg-surface-2"
                }
              >
                {subject === "all" ? `📚 ${t("all")}` : `${SUBJECT_ICONS[subject] ?? "📘"} ${subject}`}
              </Button>
            ))}
          </div>
        </motion.div>

        {loadError && (
          <Card className="bg-destructive/10 border-destructive/40 mb-8">
            <CardContent className="py-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
              <p className="text-destructive">{t("loadError")}</p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-4"
        >
          <p className="text-muted-foreground">
            {t("showing")} <span className="text-brand font-semibold">{filteredContents.length}</span>{" "}
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
            <Card className="bg-surface border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-3xl text-foreground mb-2">{selectedContent.title}</CardTitle>
                    <CardDescription className="text-muted-foreground text-lg">{selectedContent.description}</CardDescription>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedContent(null)} className="text-muted-foreground">
                    ✕
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary">{selectedContent.subject}</Badge>
                  <Badge className="bg-brand">{selectedContent.specialty}</Badge>
                  <Badge className="bg-success">{selectedContent.content_type}</Badge>
                  {selectedContent.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="border-border text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-surface-2 p-6 rounded-lg">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {localizedField(selectedContent, "content_text", language)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-border">
                  <Button
                    onClick={() => {
                      const currentIndex = filteredContents.findIndex((c) => c.id === selectedContent.id)
                      if (currentIndex > 0) {
                        setSelectedContent(filteredContents[currentIndex - 1])
                      }
                    }}
                    disabled={filteredContents.findIndex((c) => c.id === selectedContent.id) === 0}
                    variant="outline"
                    className="border-border"
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
                    className="bg-primary hover:bg-primary/90"
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
              return (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: staggerDelay(index), duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card
                    className="bg-surface border-border hover:border-brand/50 transition-all cursor-pointer h-full"
                    onClick={() => setSelectedContent(content)}
                  >
                    <CardHeader>
                      <div className="flex gap-2 flex-wrap mb-3">
                        <Badge className="bg-primary hover:bg-primary/90">
                          {SUBJECT_ICONS[content.subject] ?? "📘"} {content.subject}
                        </Badge>
                        <Badge className="bg-brand">{content.specialty}</Badge>
                      </div>
                      <CardTitle className="text-foreground text-xl line-clamp-2">{content.title}</CardTitle>
                      <CardDescription className="text-muted-foreground text-sm mt-2 line-clamp-3">
                        {content.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {content.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="border-border text-muted-foreground text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {content.tags.length > 3 && (
                          <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                            +{content.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90">
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

        {filteredContents.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Card className="bg-surface border-border">
              <CardContent className="py-12">
                <p className="text-muted-foreground text-lg">{t("noContentFound")}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  )
}
