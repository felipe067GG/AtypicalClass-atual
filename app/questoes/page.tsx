"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Filter, CheckCircle, XCircle, Lightbulb, AlertCircle } from "lucide-react"
import Header from "../components/header"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"
import { localizedField } from "@/lib/localized"

interface Question {
  id: string
  title: string
  subject: string
  specialty: string
  difficulty: string
  question_text: string
  question_text_en: string | null
  question_text_es: string | null
  options: string[]
  correct_answer: string
  explanation: string
  explanation_en: string | null
  explanation_es: string | null
  source: string
}

/**
 * As opções dos filtros saem dos próprios dados carregados.
 *
 * Antes eram listas fixas no código, e elas tinham ficado defasadas: nenhuma
 * das especialidades listadas existia mais no banco (o script 04 substituiu os
 * tópicos por condições atípicas), então qualquer filtro devolvia zero
 * resultados. Derivando dos dados, isso não volta a acontecer.
 */
function distinctValues(rows: Question[], field: "subject" | "specialty"): string[] {
  return Array.from(new Set(rows.map((row) => row[field]).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  )
}

export default function QuestoesPage() {
  const { t, language } = useLanguage()

  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [userAnswer, setUserAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const subjects = useMemo(() => distinctValues(questions, "subject"), [questions])
  const specialties = useMemo(() => distinctValues(questions, "specialty"), [questions])

  useEffect(() => {
    const loadQuestions = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("questions").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading questions:", error)
        setLoadError(true)
      } else if (data) {
        setQuestions(data)
      }
      setLoading(false)
    }

    loadQuestions()
  }, [])

  const filteredQuestions = questions.filter((q) => {
    const matchesSubject = selectedSubject === "all" || q.subject === selectedSubject
    const matchesSpecialty = selectedSpecialty === "all" || q.specialty === selectedSpecialty
    const matchesDifficulty = selectedDifficulty === "all" || q.difficulty === selectedDifficulty
    const search = searchQuery.toLowerCase()
    const matchesSearch =
      q.title.toLowerCase().includes(search) ||
      q.specialty.toLowerCase().includes(search) ||
      localizedField(q, "question_text", language).toLowerCase().includes(search)

    return matchesSubject && matchesSpecialty && matchesDifficulty && matchesSearch
  })

  const handleAnswerSelect = (answer: string) => {
    setUserAnswer(answer)
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    const currentIndex = filteredQuestions.findIndex((q) => q.id === selectedQuestion?.id)
    if (currentIndex < filteredQuestions.length - 1) {
      setSelectedQuestion(filteredQuestions[currentIndex + 1])
      setUserAnswer(null)
      setShowResult(false)
    }
  }

  const handlePreviousQuestion = () => {
    const currentIndex = filteredQuestions.findIndex((q) => q.id === selectedQuestion?.id)
    if (currentIndex > 0) {
      setSelectedQuestion(filteredQuestions[currentIndex - 1])
      setUserAnswer(null)
      setShowResult(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t("loadingQuestions")}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">
              {t("questionsBank")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("questionsBankDesc")}</p>
          </div>

          {/* Filters */}
          <Card className="bg-surface border-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-brand">
                <Filter className="w-5 h-5 mr-2" />
                {t("filters")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t("subject")}</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="bg-surface-2 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-surface-2 border-border">
                      <SelectItem value="all">{t("all")}</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t("specialty")}</label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger className="bg-surface-2 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-surface-2 border-border">
                      <SelectItem value="all">{t("all")}</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t("difficulty")}</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="bg-surface-2 border-border">
                      <SelectValue placeholder={t("all")} />
                    </SelectTrigger>
                    <SelectContent className="bg-surface-2 border-border">
                      <SelectItem value="all">{t("all")}</SelectItem>
                      <SelectItem value="Fácil">{t("easy")}</SelectItem>
                      <SelectItem value="Médio">{t("medium")}</SelectItem>
                      <SelectItem value="Difícil">{t("hard")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-surface-2 border-border"
                />
              </div>
            </CardContent>
          </Card>

          {loadError && (
            <Card className="bg-destructive/10 border-destructive/40 mb-8">
              <CardContent className="py-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                <p className="text-destructive">{t("loadError")}</p>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          <div className="mb-4 text-muted-foreground">
            {t("found")} <span className="text-brand font-semibold">{filteredQuestions.length}</span>{" "}
            {t("questionsLabel")}
          </div>

          {selectedQuestion ? (
            <motion.div
              key={selectedQuestion.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-surface border-border">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-foreground mb-2">{selectedQuestion.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{selectedQuestion.specialty}</CardDescription>
                    </div>
                    <Button variant="ghost" onClick={() => setSelectedQuestion(null)} className="text-muted-foreground">
                      ✕
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary">{selectedQuestion.subject}</Badge>
                    <Badge className="bg-brand">{selectedQuestion.specialty}</Badge>
                    <Badge className="bg-success">{selectedQuestion.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-surface-2 p-6 rounded-lg">
                    <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap">
                      {localizedField(selectedQuestion, "question_text", language)}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {selectedQuestion.options.map((option, index) => {
                      const isSelected = userAnswer === option
                      const isCorrect = option === selectedQuestion.correct_answer
                      const showCorrectAnswer = showResult && isCorrect
                      const showIncorrectAnswer = showResult && isSelected && !isCorrect

                      return (
                        <button
                          key={index}
                          onClick={() => !showResult && handleAnswerSelect(option)}
                          disabled={showResult}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                            showCorrectAnswer
                              ? "border-success/40 bg-success/10"
                              : showIncorrectAnswer
                                ? "border-destructive/40 bg-destructive/10"
                                : isSelected
                                  ? "border-brand bg-primary/10"
                                  : "border-border bg-surface-2 hover:border-border"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-foreground">{option}</span>
                            {showCorrectAnswer && <CheckCircle className="w-5 h-5 text-success" />}
                            {showIncorrectAnswer && <XCircle className="w-5 h-5 text-destructive" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg border-2 ${
                        userAnswer === selectedQuestion.correct_answer
                          ? "border-success/40 bg-success/10"
                          : "border-destructive/40 bg-destructive/10"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Lightbulb className="w-5 h-5 mt-1 text-warning" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{t("explanation")}:</h4>
                          <p className="text-muted-foreground whitespace-pre-wrap">
                            {localizedField(selectedQuestion, "explanation", language)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      onClick={handlePreviousQuestion}
                      disabled={filteredQuestions.findIndex((q) => q.id === selectedQuestion.id) === 0}
                      variant="outline"
                      className="border-border"
                    >
                      ← {t("previous")}
                    </Button>
                    <Button
                      onClick={handleNextQuestion}
                      disabled={
                        filteredQuestions.findIndex((q) => q.id === selectedQuestion.id) ===
                        filteredQuestions.length - 1
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card
                    className="bg-surface border-border hover:border-brand/50 transition-all cursor-pointer h-full"
                    onClick={() => setSelectedQuestion(question)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground line-clamp-2">{question.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{question.specialty}</CardDescription>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge className="bg-primary text-xs">{question.subject}</Badge>
                        <Badge className="bg-brand text-xs">{question.specialty}</Badge>
                        <Badge className="bg-success text-xs">{question.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <BookOpen className="w-4 h-4 mr-2" />
                        {t("answer")}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {filteredQuestions.length === 0 && !loading && (
            <Card className="bg-surface border-border">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground text-lg">{t("noQuestionsFound")}</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>
    </div>
  )
}
