import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { ThemeProvider } from "@/lib/theme-context"
import { CookieConsent } from "@/components/cookie-consent"
import { RavenaChat } from "@/components/ravena-chat"

export const metadata: Metadata = {
  title: "AtypicalClass",
  description: "Plataforma dedicada a apoiar professores com recursos e estratégias inclusivas.",
  generator: "AtypicalClass",
  icons: {
    icon: "/favicon.jpg",
  },
}

/**
 * Aplica o tema salvo antes da primeira pintura, evitando o flash de tema
 * escuro para quem escolheu o claro. Roda antes do React hidratar.
 */
const THEME_SCRIPT = `try{if(document.cookie.split('; ').find(c=>c.startsWith('theme='))?.split('=')[1]==='light'){document.documentElement.classList.add('light')}}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <CookieConsent />
            <RavenaChat />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
