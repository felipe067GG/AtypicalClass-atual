"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, BookMarked, BookOpen, Pencil, LogIn, LogOut, User, Languages, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "../actions/auth"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "@/lib/theme-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; specialty: string } | null>(null)
  const router = useRouter()
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
        if (teacher) {
          setUser(teacher)
        }
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

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await signOut()
    setUser(null)
    setIsMenuOpen(false)
    router.push("/")
    router.refresh()
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-950/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 light:bg-white/90 light:border-gray-200"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
            >
              AtypicalClass
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-slate-300 hover:text-blue-400 transition-colors light:text-slate-700 light:hover:text-blue-600"
              >
                {t("home")}
              </motion.div>
            </Link>
            <Link href="/questoes">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 text-slate-300 hover:text-blue-400 transition-colors light:text-slate-700 light:hover:text-blue-600"
              >
                <BookMarked className="w-4 h-4" />
                <span>{t("questions")}</span>
              </motion.div>
            </Link>
            <Link href="/conteudos">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 text-slate-300 hover:text-blue-400 transition-colors light:text-slate-700 light:hover:text-blue-600"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t("content")}</span>
              </motion.div>
            </Link>
            {user && (
              <Link href="/contribuir">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-1 text-slate-300 hover:text-blue-400 transition-colors light:text-slate-700 light:hover:text-blue-600"
                >
                  <Pencil className="w-4 h-4" />
                  <span>{t("contribute")}</span>
                </motion.div>
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-blue-400 light:text-slate-700">
                  <Languages className="w-4 h-4 mr-2" />
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700 light:bg-white light:border-gray-200">
                <DropdownMenuItem
                  onClick={() => setLanguage("pt")}
                  className="text-white hover:bg-gray-800 light:text-slate-900 light:hover:bg-gray-100"
                >
                  Português
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("en")}
                  className="text-white hover:bg-gray-800 light:text-slate-900 light:hover:bg-gray-100"
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("es")}
                  className="text-white hover:bg-gray-800 light:text-slate-900 light:hover:bg-gray-100"
                >
                  Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-slate-300 hover:text-blue-400 light:text-slate-700"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-900/50 rounded-lg border border-gray-700 light:bg-gray-100 light:border-gray-300">
                  <User className="w-4 h-4 text-blue-400 light:text-blue-600" />
                  <div className="flex flex-col">
                    <span className="text-sm text-white font-medium light:text-slate-900">{user.name}</span>
                    <span className="text-xs text-blue-400 light:text-blue-600">{user.specialty}</span>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-red-500/50 text-red-400 hover:bg-red-950/50 hover:text-red-300 bg-transparent light:border-red-400 light:text-red-600 light:hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t("logout")}
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <LogIn className="w-4 h-4 mr-2" />
                  {t("login")}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-blue-400 transition-colors light:text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-3 pb-4 border-t border-gray-800 pt-4 light:border-gray-200"
            >
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <div className="block py-2 text-slate-300 hover:text-blue-400 transition-colors light:text-slate-700">
                  {t("home")}
                </div>
              </Link>
              <Link href="/questoes" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center space-x-2 py-2 text-slate-300 hover:text-blue-400 transition-colors light:text-slate-700">
                  <BookMarked className="w-4 h-4" />
                  <span>{t("questions")}</span>
                </div>
              </Link>
              <Link href="/conteudos" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center space-x-2 py-2 text-slate-300 hover:text-blue-400 transition-colors light:text-slate-700">
                  <BookOpen className="w-4 h-4" />
                  <span>{t("content")}</span>
                </div>
              </Link>
              {user && (
                <Link href="/contribuir" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center space-x-2 py-2 text-slate-300 hover:text-blue-400 transition-colors light:text-slate-700">
                    <Pencil className="w-4 h-4" />
                    <span>{t("contribute")}</span>
                  </div>
                </Link>
              )}

              <div className="pt-3 border-t border-gray-800 space-y-2 light:border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400 light:text-slate-600">Idioma:</span>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLanguage("pt")}
                      className={language === "pt" ? "text-blue-400" : "text-slate-400"}
                    >
                      PT
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLanguage("en")}
                      className={language === "en" ? "text-blue-400" : "text-slate-400"}
                    >
                      EN
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLanguage("es")}
                      className={language === "es" ? "text-blue-400" : "text-slate-400"}
                    >
                      ES
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400 light:text-slate-600">Tema:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="text-slate-300 hover:text-blue-400 light:text-slate-700"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                    {theme === "dark" ? "Claro" : "Escuro"}
                  </Button>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800 light:border-gray-200">
                {user ? (
                  <div className="space-y-3">
                    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 light:bg-gray-100 light:border-gray-300">
                      <div className="flex items-center space-x-2 text-white mb-1 light:text-slate-900">
                        <User className="w-4 h-4 text-blue-400 light:text-blue-600" />
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <div className="text-xs text-blue-400 ml-6 light:text-blue-600">{user.specialty}</div>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      size="sm"
                      className="w-full border-red-500/50 text-red-400 hover:bg-red-950/50 hover:text-red-300 bg-transparent light:border-red-400 light:text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t("logout")}
                    </Button>
                  </div>
                ) : (
                  <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <LogIn className="w-4 h-4 mr-2" />
                      {t("login")}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
