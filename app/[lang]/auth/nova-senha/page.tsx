"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { KeyRound, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import Header from "@/app/components/header"
import { useLanguage } from "@/lib/language-context"
import { createClient } from "@/lib/supabase/client"

/**
 * Onde o link de "esqueci minha senha" chega.
 *
 * ## Por que a sessão é aberta aqui, no navegador
 *
 * A primeira versão mandava o link para `/auth/callback`, que abria a sessão no
 * servidor. Ela caía na tela de login sem mensagem nenhuma, e o motivo é que o
 * Supabase pode devolver a sessão de três formas diferentes:
 *
 * - `?code=…`                  — fluxo PKCE
 * - `?token_hash=…&type=…`     — templates de e-mail mais recentes
 * - `#access_token=…`          — fluxo implícito
 *
 * **A terceira o servidor não enxerga.** Fragmento de URL nunca é enviado ao
 * servidor: fica só no navegador. A rota recebia um pedido sem `code` e sem
 * `token_hash`, concluía "link inválido" e mandava para `/auth` — que é
 * exatamente o sintoma de quem clica no e-mail e cai no login.
 *
 * Aqui as três funcionam, porque o cliente do navegador vê a URL inteira. É
 * também o motivo de esta página ser cliente e não servidor.
 *
 * ## O formulário só aparece com sessão aberta
 *
 * `updateUser` sem sessão recusa, e é isso que impede alguém de trocar a senha
 * de outro. Mas descobrir isso só ao salvar faz o professor digitar a senha
 * duas vezes para depois ouvir que o link venceu — por isso a conferência é
 * antes, e quem chegou com link velho já vê o caminho de pedir outro.
 */
export default function NovaSenhaPage() {
  const [estado, setEstado] = useState<"verificando" | "comSessao" | "semSessao">("verificando")
  const [isLoading, setIsLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [pronto, setPronto] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    let cancelado = false

    async function abrirSessao() {
      const supabase = createClient()
      const url = new URL(window.location.href)

      const tokenHash = url.searchParams.get("token_hash")
      const tipo = url.searchParams.get("type")
      const code = url.searchParams.get("code")

      /**
       * `token_hash` vem primeiro, e a ordem é a correção de um defeito.
       *
       * É o único dos três formatos que funciona em outro aparelho. O `code` é
       * o fluxo PKCE, e o PKCE guarda o verificador num cookie do navegador que
       * pediu a recuperação: quem pede no celular e abre o e-mail no computador
       * não tem esse cookie, e a troca falha. `verifyOtp` não depende de nada
       * guardado antes — o token do próprio e-mail basta.
       *
       * Quem manda `token_hash` é o template de e-mail, que mora no painel do
       * Supabase (Authentication → Email Templates → Reset Password) e **não
       * neste repositório**. Fica registrado porque é acoplamento invisível: se
       * alguém restaurar o template padrão, o link volta a chegar como `?code=`
       * e o caminho de baixo assume — funciona, mas só no mesmo navegador.
       *
       * `type` é conferido em vez de convertido: um `token_hash` de confirmação
       * de cadastro não deve abrir a tela de trocar senha.
       */
      if (tokenHash && tipo === "recovery") {
        await supabase.auth.verifyOtp({ type: "recovery", token_hash: tokenHash })
      } else if (code) {
        // Pode falhar por já ter sido consumido: `detectSessionInUrl` faz a
        // troca sozinho ao criar o cliente. Se foi isso, a sessão logo abaixo
        // já existe — por isso o erro não interrompe nada.
        await supabase.auth.exchangeCodeForSession(code)
      }
      // O terceiro formato, `#access_token=…`, não aparece aqui de propósito:
      // `detectSessionInUrl` consome o fragmento sozinho, e `getSession` abaixo
      // é que enxerga o resultado.

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (cancelado) return
      setEstado(session ? "comSessao" : "semSessao")

      // O token sai da barra de endereços depois de usado: link de recuperação
      // no histórico do navegador é credencial no histórico do navegador.
      if (session && (url.search || url.hash)) {
        window.history.replaceState({}, "", url.pathname)
      }
    }

    abrirSessao()
    return () => {
      cancelado = true
    }
  }, [])

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

    /**
     * A senha é gravada pelo cliente, e não pela ação de servidor.
     *
     * A sessão da recuperação foi aberta aqui no navegador; a ação de servidor
     * lê a sessão dos cookies e não a enxergaria. Depois de gravar, `updateUser`
     * atualiza os cookies e aí sim o servidor passa a conhecer o professor.
     */
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: senha })
    setIsLoading(false)

    if (!error) {
      setPronto(true)
      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 2500)
      return
    }

    setErro(error.message)
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
              {estado === "verificando" ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("authenticating")}
                </div>
              ) : estado === "semSessao" ? (
                <div className="space-y-4">
                  <Alert className="bg-destructive/10 border-destructive/40">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                      <AlertDescription className="text-destructive">{t("newPasswordExpired")}</AlertDescription>
                    </div>
                  </Alert>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/auth">{t("backToLogin")}</Link>
                  </Button>
                </div>
              ) : pronto ? (
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
