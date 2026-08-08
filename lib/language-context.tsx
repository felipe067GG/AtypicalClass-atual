"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { translations, type Language } from "./translations"
import Cookies from "js-cookie"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Começa em "pt" no servidor e no primeiro render do cliente (senão haveria
  // divergência de hidratação); o idioma salvo é aplicado logo após montar.
  const [language, setLanguageState] = useState<Language>("pt")

  // O setState em efeito é o preço de não divergir na hidratação: o idioma
  // salvo só pode ser aplicado depois que servidor e cliente já concordaram no
  // primeiro render. O efeito colateral é visível — quem escolheu EN ou ES vê
  // português no primeiro quadro.
  //
  // Some se o cookie for lido no servidor, mas isso torna a árvore inteira
  // dinâmica: medido em 08/08/2026, custaria 20 das 23 páginas estáticas.
  // Enquanto o site tiver uma só versão por URL, o preço não compensa; a
  // solução de verdade para idioma é rota por idioma (/en, /es), que também
  // resolveria o `lang` do <html>, hoje fixo em "pt".
  useEffect(() => {
    const savedLang = Cookies.get("language") as Language
    if (savedLang && translations[savedLang]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    Cookies.set("language", lang, { expires: 365 })
  }

  const t = useCallback((key: string): string => {
    try {
      const translationsObj = translations[language] || translations.pt
      
      // Support nested paths like "strategies.aprendizagemVisual.title"
      if (key.includes(".")) {
        const keys = key.split(".")
        let value: any = translationsObj
        
        // Try to access nested path in current language
        for (const k of keys) {
          if (value && typeof value === "object" && k in value) {
            value = value[k]
          } else {
            // If not found, try fallback to pt
            value = translations.pt
            for (const fallbackKey of keys) {
              if (value && typeof value === "object" && fallbackKey in value) {
                value = value[fallbackKey]
              } else {
                // If still not found, return the key
                return key
              }
            }
            break
          }
        }
        
        // Return the value if it's a string, otherwise return the key
        if (typeof value === "string") {
          return value
        }
        return key
      }
      
      // Support flat keys
      const flatValue = (translationsObj as any)[key]
      if (flatValue && typeof flatValue === "string") {
        return flatValue
      }
      
      // Fallback to pt for flat keys
      const ptValue = (translations.pt as any)[key]
      if (ptValue && typeof ptValue === "string") {
        return ptValue
      }
      
      return key
    } catch (error) {
      console.error("Translation error:", error, "key:", key, "language:", language)
      return key
    }
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
