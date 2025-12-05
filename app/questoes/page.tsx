"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Lightbulb,
  Brain,
  Heart,
  Eye,
  Ear,
  Sparkles,
} from "lucide-react"
import Header from "../components/header"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"

interface Question {
  id: string
  title: string
  subject: string
  specialty: string
  difficulty: string
  question_text: string
  options: string[]
  correct_answer: string
  explanation: string
  source: string
}

const SUBJECTS = [
  { value: "all", label: "Todas as Matérias" },
  { value: "Português", label: "Português" },
  { value: "Matemática", label: "Matemática" },
  { value: "História", label: "História" },
  { value: "Geografia", label: "Geografia" },
  { value: "Biologia", label: "Biologia" },
  { value: "Física", label: "Física" },
  { value: "Química", label: "Química" },
  { value: "Inglês", label: "Inglês" },
]

const SPECIALTIES = [
  { value: "all", label: "Todas as Especialidades", icon: Sparkles },
  { value: "Álgebra", label: "Álgebra", icon: Brain },
  { value: "Geometria", label: "Geometria", icon: Brain },
  { value: "Gramática", label: "Gramática", icon: BookOpen },
  { value: "Literatura", label: "Literatura", icon: BookOpen },
  { value: "História do Brasil", label: "História do Brasil", icon: Heart },
  { value: "História Geral", label: "História Geral", icon: Heart },
  { value: "Geografia Física", label: "Geografia Física", icon: Eye },
  { value: "Geografia Humana", label: "Geografia Humana", icon: Eye },
  { value: "Mecânica", label: "Mecânica (Física)", icon: Lightbulb },
  { value: "Química Geral", label: "Química Geral", icon: Lightbulb },
  { value: "Citologia", label: "Citologia (Biologia)", icon: Ear },
  { value: "Ecologia", label: "Ecologia", icon: Ear },
  { value: "Vocabulário", label: "Vocabulário (Inglês)", icon: BookOpen },
]

export default function QuestoesPage() {
  const { t } = useLanguage()

  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [userAnswer, setUserAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadQuestions = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("questions").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading questions:", error)
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
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.question_text.toLowerCase().includes(searchQuery.toLowerCase())

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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300">{t("loadingQuestions")}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
              {t("questionsBank")}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">{t("questionsBankDesc")}</p>
          </div>

          {/* Filters */}
          <Card className="bg-gray-900/50 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Filter className="w-5 h-5 mr-2" />
                {t("filters")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">{t("subject")}</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {SUBJECTS.map((subject) => (
                        <SelectItem key={subject.value} value={subject.value}>
                          {subject.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">{t("specialty")}</label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {SPECIALTIES.map((specialty) => (
                        <SelectItem key={specialty.value} value={specialty.value}>
                          {specialty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">{t("difficulty")}</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700">
                      <SelectValue placeholder={t("all")} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">{t("all")}</SelectItem>
                      <SelectItem value="Fácil">{t("easy")}</SelectItem>
                      <SelectItem value="Médio">{t("medium")}</SelectItem>
                      <SelectItem value="Difícil">{t("hard")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="mb-4 text-slate-400">
            {t("found")} <span className="text-blue-400 font-semibold">{filteredQuestions.length}</span>{" "}
            {t("questionsLabel")}
          </div>

          {selectedQuestion ? (
            <motion.div
              key={selectedQuestion.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-white mb-2">{selectedQuestion.title}</CardTitle>
                      <CardDescription className="text-slate-400">{selectedQuestion.specialty}</CardDescription>
                    </div>
                    <Button variant="ghost" onClick={() => setSelectedQuestion(null)} className="text-slate-400">
                      ✕
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-600">{selectedQuestion.subject}</Badge>
                    <Badge className="bg-purple-600">{selectedQuestion.specialty}</Badge>
                    <Badge className="bg-green-600">{selectedQuestion.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <p className="text-lg text-white leading-relaxed whitespace-pre-wrap">
                      {selectedQuestion.question_text}
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
                              ? "border-green-500 bg-green-900/20"
                              : showIncorrectAnswer
                                ? "border-red-500 bg-red-900/20"
                                : isSelected
                                  ? "border-blue-500 bg-blue-900/20"
                                  : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white">{option}</span>
                            {showCorrectAnswer && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {showIncorrectAnswer && <XCircle className="w-5 h-5 text-red-500" />}
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
                          ? "border-green-500 bg-green-900/20"
                          : "border-red-500 bg-red-900/20"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Lightbulb className="w-5 h-5 mt-1 text-yellow-400" />
                        <div>
                          <h4 className="font-semibold text-white mb-2">Explicação:</h4>
                          <p className="text-slate-300 whitespace-pre-wrap">{selectedQuestion.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      onClick={handlePreviousQuestion}
                      disabled={filteredQuestions.findIndex((q) => q.id === selectedQuestion.id) === 0}
                      variant="outline"
                      className="border-gray-700"
                    >
                      ← {t("previous")}
                    </Button>
                    <Button
                      onClick={handleNextQuestion}
                      disabled={
                        filteredQuestions.findIndex((q) => q.id === selectedQuestion.id) ===
                        filteredQuestions.length - 1
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
                    className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all cursor-pointer h-full"
                    onClick={() => setSelectedQuestion(question)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg text-white line-clamp-2">{question.title}</CardTitle>
                      <CardDescription className="text-slate-400">{question.specialty}</CardDescription>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge className="bg-blue-600 text-xs">{question.subject}</Badge>
                        <Badge className="bg-purple-600 text-xs">{question.specialty}</Badge>
                        <Badge className="bg-green-600 text-xs">{question.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="py-12 text-center">
                <p className="text-slate-400 text-lg">{t("noQuestionsFound")}</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>
    </div>
  )
}
