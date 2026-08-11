"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { KeyRound, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { updatePassword } from "@/app/actions/auth"
import Header from "@/app/components/header"
import { useLanguage } from "@/lib/language-context"

/**
 * Onde o link de "esqueci minha senha" chega.
 *
 * Quem abre esta página já teve a sessão aberta por `/auth/callback` — é ela que
 * autoriza `updateUser`. Sem essa sessão a ação recusa, e é isso que impede
 * alguém de trocar a senha de outro só por conhecer o endereço.
 *
 * A página não confere a sessão por conta própria antes de mostrar o formulário:
 * quem chega com link vencido descobre ao salvar, com a mensagem certa e o
 * caminho de pedir outro. Conferir antes trocaria uma mensagem clara por um
 * redirecionamento silencioso para o login, que se parece com "o site quebrou".
 */
export default function NovaSenhaPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [pronto, setPronto] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  const salvar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const senha = String(formData.get("password") ?? "")
    const repetida = String(formData.get("password_confirm") ?? "")

    setErro(null)

    if (senha.length < 6) {
      setErro(t("newPasswordShort"))
      return
    }
    if (senha !== repetida) {
      setErro(t("newPasswordMismatch"))
      return
    }

    setIsLoading(true)
    const resultado = await updatePassword(formData)
    setIsLoading(false)

    if (resultado.success) {
      setPronto(true)
      setTimeout(() => {
        router.push("/auth")
        router.refresh()
      }, 2500)
      return
    }

    setErro(resultado.motivo === "expirado" ? t("newPasswordExpired") : (resultado.message ?? t("newPasswordExpired")))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-md"
        >
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                {t("newPasswordTitle")}
              </CardTitle>
              <CardDescription>{t("newPasswordHelp")}</CardDescription>
            </CardHeader>
            <CardContent>
              {pronto ? (
                <Alert className="bg-success/10 border-success/40">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <AlertDescription className="text-success">{t("newPasswordSaved")}</AlertDescription>
                  </div>
                </Alert>
              ) : (
                <form onSubmit={salvar} className="space-y-4">
                  {erro ? (
                    <Alert className="bg-destructive/10 border-destructive/40">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                        <AlertDescription className="text-destructive">{erro}</AlertDescription>
                      </div>
                    </Alert>
                  ) : null}

                  <div className="space-y-2">
                    <Label htmlFor="nova-senha" className="text-muted-foreground">
                      {t("newPassword")}
                    </Label>
                    <Input
                      id="nova-senha"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="bg-surface border-border text-foreground placeholder:text-muted-foreground"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nova-senha-repetida" className="text-muted-foreground">
                      {t("newPasswordConfirm")}
                    </Label>
                    <Input
                      id="nova-senha-repetida"
                      name="password_confirm"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="bg-surface border-border text-foreground placeholder:text-muted-foreground"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-foreground hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("newPasswordSaving")}
                      </>
                    ) : (
                      t("newPasswordSave")
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
