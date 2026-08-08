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
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {t("teacherArea")}
            </h1>
            <p className="text-muted-foreground">{t("authSubtitle")}</p>
          </div>

          {showEmailVerification && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Alert className="bg-primary/10 border-brand/50">
                <Mail className="w-5 h-5 text-brand" />
                <AlertTitle className="text-brand">{t("emailVerificationTitle")}</AlertTitle>
                <AlertDescription className="text-brand mt-2">
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
                    ? "bg-success/10 border-success/40"
                    : "bg-destructive/10 border-destructive/40"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {message.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                  <AlertDescription
                    className={
                      message.type === "success"
                        ? "text-success"
                        : "text-destructive"
                    }
                  >
                    {message.text}
                  </AlertDescription>
                </div>
              </Alert>
            </motion.div>
          )}

          <Card className="bg-surface border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">{t("authentication")}</CardTitle>
              <CardDescription className="text-muted-foreground">{t("exclusiveAccess")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-surface">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-primary data-[state=active]:text-foreground=active]:bg-primary"
                  >
                    {t("login")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-primary data-[state=active]:text-foreground=active]:bg-primary"
                  >
                    {t("register")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-muted-foreground">
                        {t("email")}
                      </Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        className="bg-surface border-border text-foreground placeholder:text-muted-foreground"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-muted-foreground">
                        {t("password")}
                      </Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="bg-surface border-border text-foreground placeholder:text-muted-foreground"
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-foreground"
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
                      <Label htmlFor="register-name" className="text-muted-foreground">
                        {t("fullName")}
                      </Label>
                      <Input
                        id="register-name"
                        name="name"
                        type="text"
                        placeholder={t("fullName")}
                        required
                        className="bg-surface border-border text-foreground placeholder:text-muted-foreground"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-muted-foreground">
                        {t("email")}
                      </Label>
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        className="bg-surface border-border text-foreground placeholder:text-muted-foreground"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-muted-foreground">
                        {t("password")}
                      </Label>
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        placeholder={t("minChars")}
                        required
                        minLength={6}
                        className="bg-surface border-border text-foreground placeholder:text-muted-foreground"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty" className="text-muted-foreground">
                        {t("specialty")}
                      </Label>
                      <Select name="specialty" required disabled={isLoading}>
                        <SelectTrigger className="bg-surface border-border text-foreground">
                          <SelectValue placeholder={t("selectSpecialty")} />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-border text-foreground max-h-[300px]">
                          {specialties.map((specialty, index) => (
                            <SelectItem
                              key={index}
                              value={specialty}
                              className="text-foreground hover:bg-surface-2 focus:bg-surface-2 focus:text-foreground"
                            >
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-foreground"
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
