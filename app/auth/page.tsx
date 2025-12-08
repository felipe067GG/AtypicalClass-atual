"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogIn, UserPlus, Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react"
import { signUp, signIn } from "../actions/auth"
import { useRouter } from "next/navigation"
import Header from "../components/header"
import { useLanguage } from "@/lib/language-context"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null)
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  const specialties = [
    t("mathematics"),
    t("portuguese"),
    t("history"),
    t("geography"),
    t("biology"),
    t("physics"),
    t("chemistry"),
    t("english"),
    t("specialEducation"),
    t("pedagogy"),
    t("other"),
  ]

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    setShowEmailVerification(false)

    const formData = new FormData(e.currentTarget)
    const result = await signUp(formData)

    setIsLoading(false)

    if (result.success) {
      setShowEmailVerification(true)
    } else {
      setMessage({ type: "error", text: result.message })
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white light:bg-gradient-to-br light:from-gray-50 light:via-white light:to-gray-50 light:text-slate-900">
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
              {t("teacherArea")}
            </h1>
            <p className="text-slate-300 light:text-slate-600">{t("authSubtitle")}</p>
          </div>

          {showEmailVerification && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Alert className="bg-blue-950/50 border-blue-500/50 light:bg-blue-50 light:border-blue-200">
                <Mail className="w-5 h-5 text-blue-400 light:text-blue-600" />
                <AlertTitle className="text-blue-300 light:text-blue-900">{t("emailVerificationTitle")}</AlertTitle>
                <AlertDescription className="text-blue-200 light:text-blue-800 mt-2">
                  {t("emailVerificationMessage")}
                  <br />
                  <span className="text-xs mt-1 inline-block">{t("emailVerificationNote")}</span>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Alert
                className={`${
                  message.type === "success"
                    ? "bg-green-950/50 border-green-500/50 light:bg-green-50 light:border-green-200"
                    : "bg-red-950/50 border-red-500/50 light:bg-red-50 light:border-red-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {message.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400 light:text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 light:text-red-600" />
                  )}
                  <AlertDescription
                    className={
                      message.type === "success"
                        ? "text-green-300 light:text-green-800"
                        : "text-red-300 light:text-red-800"
                    }
                  >
                    {message.text}
                  </AlertDescription>
                </div>
              </Alert>
            </motion.div>
          )}

          <Card className="bg-gray-950/70 border-gray-800 backdrop-blur-sm light:bg-white light:border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-white light:text-slate-900">{t("authentication")}</CardTitle>
              <CardDescription className="text-slate-400 light:text-slate-600">{t("exclusiveAccess")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-900 light:bg-gray-100">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white light:data-[state=active]:bg-blue-600"
                  >
                    {t("login")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white light:data-[state=active]:bg-blue-600"
                  >
                    {t("register")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-slate-300 light:text-slate-700">
                        {t("email")}
                      </Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 light:bg-white light:border-gray-300 light:text-slate-900"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-slate-300 light:text-slate-700">
                        {t("password")}
                      </Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 light:bg-white light:border-gray-300 light:text-slate-900"
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
                          {t("entering")}
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4 mr-2" />
                          {t("login")}
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name" className="text-slate-300 light:text-slate-700">
                        {t("fullName")}
                      </Label>
                      <Input
                        id="register-name"
                        name="name"
                        type="text"
                        placeholder={t("fullName")}
                        required
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 light:bg-white light:border-gray-300 light:text-slate-900"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-slate-300 light:text-slate-700">
                        {t("email")}
                      </Label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 light:bg-white light:border-gray-300 light:text-slate-900"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-slate-300 light:text-slate-700">
                        {t("password")}
                      </Label>
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        placeholder={t("minChars")}
                        required
                        minLength={6}
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 light:bg-white light:border-gray-300 light:text-slate-900"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty" className="text-slate-300 light:text-slate-700">
                        {t("specialty")}
                      </Label>
                      <Select name="specialty" required disabled={isLoading}>
                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white light:bg-white light:border-gray-300 light:text-slate-900">
                          <SelectValue placeholder={t("selectSpecialty")} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white max-h-[300px] light:bg-white light:border-gray-300 light:text-slate-900">
                          {specialties.map((specialty) => (
                            <SelectItem
                              key={specialty}
                              value={specialty}
                              className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white light:text-slate-900 light:hover:bg-gray-100 light:focus:bg-gray-100"
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
                          {t("registering")}
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          {t("register")}
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
