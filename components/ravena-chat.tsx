"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, MessageCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/lib/language-context"

const FAQ_QUESTIONS = {
  pt: [
    "Como usar o banco de questões?",
    "O que são questões adaptadas?",
    "Como contribuir com materiais?",
    "Quais especialidades são cobertas?",
    "Como baixar materiais?",
  ],
  en: [
    "How to use the question bank?",
    "What are adapted questions?",
    "How to contribute materials?",
    "Which specialties are covered?",
    "How to download materials?",
  ],
  es: [
    "¿Cómo usar el banco de preguntas?",
    "¿Qué son preguntas adaptadas?",
    "¿Cómo contribuir con materiales?",
    "¿Qué especialidades están cubiertas?",
    "¿Cómo descargar materiales?",
  ],
}

/** Concatena as partes de texto de uma mensagem — o formato atual do AI SDK. */
function messageText(message: UIMessage): string {
  return message.parts.map((part) => (part.type === "text" ? part.text : "")).join("")
}

export function RavenaChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const { language, t } = useLanguage()
  const bottomRef = useRef<HTMLDivElement>(null)

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), [])

  const { messages, sendMessage, status, error } = useChat({
    transport,
    onError: (error) => {
      console.error("Erro no chat:", error)
    },
  })

  const isBusy = status === "submitted" || status === "streaming"

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isBusy) return
    sendMessage({ text: trimmed })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    handleSend(inputValue)
    setInputValue("")
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              aria-label="Abrir chat com a Ravena"
              className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="flex flex-col h-[600px] max-h-[80vh] shadow-2xl border-2">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <div>
                    <h3 className="font-bold">Ravena</h3>
                    <p className="text-xs opacity-90">{t("assistantSubtitle")}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar chat"
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
                {messages.length === 0 && (
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800 shadow-sm">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        {t("assistantWelcome")}
                      </p>
                      <div className="space-y-2">
                        {FAQ_QUESTIONS[language].map((question, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(question)}
                            disabled={isBusy}
                            className="w-full text-left text-sm p-3 rounded-lg bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/70 transition-colors font-medium text-gray-800 dark:text-gray-100 border border-blue-100 dark:border-gray-600 disabled:opacity-50"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{messageText(message)}</p>
                    </div>
                  </div>
                ))}

                {status === "submitted" && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        {error.message || "Erro ao conectar com a assistente. Tente novamente em instantes."}
                      </p>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </ScrollArea>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t("assistantPlaceholder")}
                    aria-label={t("assistantPlaceholder")}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" aria-label="Enviar" disabled={isBusy || !inputValue.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
