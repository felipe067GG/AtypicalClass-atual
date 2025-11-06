"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogIn, UserPlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { signUp, signIn } from "../actions/auth"
import { useRouter } from "next/navigation"
import Header from "../components/header"

const specialties = [
  "Matemática",
  "Português",
  "História",
  "Geografia",
  "Biologia",
  "Física",
  "Química",
  "Inglês",
  "Educação Especial",
  "Pedagogia",
  "Outro",
]

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await signUp(formData)

    setIsLoading(false)
    setMessage({ type: result.success ? "success" : "error", text: result.message })

    if (result.success) {
      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 2000)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)

    setIsLoading(false)
    setMessage({ type: result.success ? "success" : "error", text: result.message })

    if (result.success) {
      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
              Área do Professor
            </h1>
            <p className="text-slate-300">Entre ou cadastre-se para acessar a plataforma</p>
          </div>

          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Alert
                className={`${
                  message.type === "success" ? "bg-green-950/50 border-green-500/50" : "bg-red-950/50 border-red-500/50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {message.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                  <AlertDescription className={message.type === "success" ? "text-green-300" : "text-red-300"}>
                    {message.text}
                  </AlertDescription>
                </div>
              </Alert>
            </motion.div>
          )}

          <Card className="bg-gray-950/70 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Autenticação</CardTitle>
              <CardDescription className="text-slate-400">Acesso exclusivo para professores</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-900">
                  <TabsTrigger value="login" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Cadastro
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-slate-300">
                        Email
                      </Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-slate-300">
                        Senha
                      </Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Entrando...
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4 mr-2" />
                          Entrar
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name" className="text-slate-300">
                        Nome Completo
                      </Label>
                      <Input
                        id="register-name"
                        name="name"
                        type="text"
                        placeholder="Seu nome completo"
                        required
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-slate-300">
                        Email
                      </Label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-slate-300">
                        Senha
                      </Label>
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        required
                        minLength={6}
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty" className="text-slate-300">
                        Especialidade
                      </Label>
                      <Select name="specialty" required disabled={isLoading}>
                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                          <SelectValue placeholder="Selecione sua especialidade" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white max-h-[300px]">
                          {specialties.map((specialty) => (
                            <SelectItem
                              key={specialty}
                              value={specialty}
                              className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white"
                            >
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Cadastrando...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Cadastrar
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
