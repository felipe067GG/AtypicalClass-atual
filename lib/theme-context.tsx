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
  // antes da primeira pintura. Aqui só sincronizamos o estado do React.
  useEffect(() => {
    const savedTheme = Cookies.get("theme") as Theme | undefined
    if (savedTheme === "light" || savedTheme === "dark") {
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
