"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import Cookies from "js-cookie"

type Theme = "dark" | "light"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")

  // A classe `light` já foi aplicada no <html> pelo script inline do layout,
  // antes da primeira pintura. Aqui só sincronizamos o estado do React, e é
  // por isso que o setState em efeito é o certo neste ponto: quem pinta a tela
  // é o script, não este estado.
  //
  // A alternativa canônica seria ler o cookie no servidor e passar o valor
  // inicial para baixo, o que dispensaria o efeito. Foi medido em 08/08/2026 e
  // descartado: `cookies()` no layout raiz propaga renderização dinâmica para
  // a árvore inteira e derrubaria 20 das 23 páginas estáticas, incluindo as 14
  // de especialidade, que são as que mais interessam à busca. O disable abaixo
  // é essa escolha, não um esquecimento.
  useEffect(() => {
    const savedTheme = Cookies.get("theme") as Theme | undefined
    if (savedTheme === "light" || savedTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(savedTheme)
      document.documentElement.classList.toggle("light", savedTheme === "light")
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    Cookies.set("theme", newTheme, { expires: 365 })
    document.documentElement.classList.toggle("light", newTheme === "light")
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
