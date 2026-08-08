"use client"

import { useState, useEffect } from "react"
import { LocaleLink as Link } from "@/components/locale-link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  BookMarked,
  BookOpen,
  Pencil,
  LogIn,
  LogOut,
  User,
  Languages,
  Sun,
  Moon,
  ChevronDown,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoWordmark } from "@/components/brand/logo"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "../actions/auth"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "@/lib/theme-context"
import { SPECIALTIES } from "@/lib/specialties"
import { localizedHref, splitLocale } from "@/lib/i18n-routing"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; specialty: string } | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const supabase = createClient()

    const checkUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        const { data: teacher } = await supabase.from("teachers").select("*").eq("id", authUser.id).single()
        setUser(teacher ?? null)
      } else {
        setUser(null)
      }
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkUser()
    })

    return () => subscription.unsubscribe()
  }, [])

  /**
   * Fecha o menu móvel, que senão ficaria aberto sobre a página nova.
   *
   * Isto era um efeito que observava o `pathname`. Fechar no próprio clique é
   * mais direto — o menu fecha porque o usuário escolheu um destino, não como
   * reação tardia a uma rota que já mudou — e ainda cobre um caso que o efeito
   * não cobria: tocar no link da página em que já se está, que não altera o
   * `pathname` e portanto não disparava o efeito.
   */
  const closeMenu = () => setIsMenuOpen(false)

  const handleLogout = async () => {
    await signOut()
    setUser(null)
    // Sair também navega, então o menu móvel fecha junto. A ida para a home
    // respeita o idioma: quem estava em espanhol continua em espanhol.
    setIsMenuOpen(false)
    router.push(localizedHref("/", language))
    router.refresh()
  }

  const navLinks = [
    { href: "/questoes", label: t("questions"), icon: BookMarked },
    { href: "/conteudos", label: t("content"), icon: BookOpen },
    ...(user ? [{ href: "/contribuir", label: t("contribute"), icon: Pencil }] : []),
  ]

  // O idioma sai do caminho antes da comparação: em `/es/questoes` o link
  // ativo continua sendo `/questoes`. Sem isto, nenhum link apareceria
  // marcado como ativo fora do português.
  const { path } = splitLocale(pathname)
  const isActive = (href: string) => path === href
  const isSpecialtyActive = SPECIALTIES.some((s) => path === `/${s.slug}`)

  const languages = [
    { code: "pt" as const, label: "Português" },
    { code: "en" as const, label: "English" },
    { code: "es" as const, label: "Español" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="AtypicalClass — início" className="shrink-0" onClick={closeMenu}>
          <LogoWordmark />
        </Link>

        {/* ------------------------------------------------ Navegação (desktop) */}
        <nav className="hidden items-center gap-1 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={isSpecialtyActive ? "text-foreground" : "text-muted-foreground"}
              >
                {t("specialties")}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60">
              {SPECIALTIES.map((specialty) => {
                const Icon = specialty.icon
                return (
                  <DropdownMenuItem key={specialty.slug} asChild>
                    <Link href={`/${specialty.slug}`} data-specialty={specialty.accent} className="gap-2.5">
                      <span className="accent-soft flex h-7 w-7 items-center justify-center rounded-md">
                        <Icon className="h-4 w-4" />
                      </span>
                      {t(specialty.nameKey)}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              size="sm"
              className={isActive(link.href) ? "text-foreground" : "text-muted-foreground"}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}

          <Button
            asChild
            variant="ghost"
            size="sm"
            className={isActive("/recursos") ? "text-foreground" : "text-muted-foreground"}
          >
            <Link href="/recursos">{t("resourcesLabel")}</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={isActive("/sobre") ? "text-foreground" : "text-muted-foreground"}
          >
            <Link href="/sobre">{t("about")}</Link>
          </Button>
        </nav>

        {/* ----------------------------------------------------- Ações (desktop) */}
        <div className="hidden items-center gap-2 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Languages className="mr-1.5 h-4 w-4" />
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} className="gap-2">
                  <Check className={`h-4 w-4 ${language === lang.code ? "opacity-100" : "opacity-0"}`} />
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            className="text-muted-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5">
                <User className="h-4 w-4 text-primary" aria-hidden />
                <div className="leading-tight">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.specialty}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label={t("logout")}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth">
                <LogIn className="mr-1.5 h-4 w-4" />
                {t("login")}
              </Link>
            </Button>
          )}
        </div>

        {/* -------------------------------------------------------- Botão móvel */}
        <button
          className="rounded-lg p-2 text-muted-foreground hover:text-foreground lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ------------------------------------------------------ Navegação móvel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-surface lg:hidden"
          >
            <div className="container space-y-6 py-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("specialties")}
                </p>
                <div className="grid gap-1">
                  {SPECIALTIES.map((specialty) => {
                    const Icon = specialty.icon
                    return (
                      <Link
                        key={specialty.slug}
                        href={`/${specialty.slug}`}
                        data-specialty={specialty.accent}
                        onClick={closeMenu}
                        className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm hover:bg-surface-2"
                      >
                        <span className="accent-soft flex h-7 w-7 items-center justify-center rounded-md">
                          <Icon className="h-4 w-4" />
                        </span>
                        {t(specialty.nameKey)}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-1 border-t border-border pt-4">
                {[...navLinks, { href: "/recursos", label: t("resourcesLabel"), icon: BookOpen },
                  { href: "/sobre", label: t("about"), icon: User }].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm hover:bg-surface-2"
                  >
                    <link.icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex gap-1">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setLanguage(lang.code)}
                    >
                      {lang.code.toUpperCase()}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-muted-foreground"
                >
                  {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {theme === "dark" ? t("lightTheme") : t("darkTheme")}
                </Button>
              </div>

              <div className="border-t border-border pt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-surface-2 p-3">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.specialty}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("logout")}
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full">
                    <Link href="/auth" onClick={closeMenu}>
                      <LogIn className="mr-2 h-4 w-4" />
                      {t("login")}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
