"use client"

import { createContext, useContext, useCallback, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { translations, type Language } from "./translations"
import { localizedHref, splitLocale } from "./i18n-routing"
import Cookies from "js-cookie"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/**
 * O idioma vem da rota, não de um cookie lido depois de montar.
 *
 * Antes o provider começava sempre em "pt" e trocava dentro de um efeito, o
 * que produzia dois problemas: quem escolheu inglês ou espanhol via o primeiro
 * quadro em português, e o servidor não tinha como renderizar outra coisa —
 * as três versões compartilhavam a mesma URL. Agora o idioma chega pronto do
 * `app/[lang]/layout.tsx`, então o primeiro render já é o certo, no servidor.
 *
 * O cookie continua existindo, mas mudou de papel: era a fonte da verdade e
 * agora é só memória de preferência, usada pelo proxy para mandar quem já
 * escolheu um idioma para a versão dele.
 */
export function LanguageProvider({
  language,
  children,
}: {
  language: Language
  children: ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  /**
   * Trocar de idioma é navegar. Continua gravando o cookie, para que a escolha
   * sobreviva a quem depois digitar o endereço sem prefixo.
   */
  const setLanguage = useCallback(
    (lang: Language) => {
      Cookies.set("language", lang, { expires: 365 })
      const { path } = splitLocale(pathname)
      router.push(localizedHref(path, lang))
    },
    [pathname, router],
  )

  const t = useCallback(
    (key: string): string => {
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
    },
    [language],
  )

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
