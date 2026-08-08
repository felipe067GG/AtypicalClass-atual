import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { ThemeProvider } from "@/lib/theme-context"
import { CookieConsent } from "@/components/cookie-consent"
import { RavenaChat } from "@/components/ravena-chat"
import { SiteFooter } from "@/components/site-footer"
import { SITE_URL } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  // Mesmo endereço do sitemap. Antes isto caía em `localhost:3000` quando a
  // variável não estava definida, e é a partir daqui que saem as URLs
  // absolutas de `og:` — ou seja, um preview de link compartilhado apontando
  // para a máquina de quem fez o build.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AtypicalClass — Educação inclusiva na prática",
    template: "%s · AtypicalClass",
  },
  description:
    "Estratégias, atividades e questões adaptadas para professores que trabalham com alunos atípicos: autismo, TDAH, síndrome de Down, deficiência visual e auditiva.",
  generator: "AtypicalClass",
  // O ícone vem de app/icon.svg — a marca própria, não mais o logo padrão do v0.
  openGraph: {
    type: "website",
    siteName: "AtypicalClass",
    title: "AtypicalClass — Educação inclusiva na prática",
    description: "Recursos e estratégias inclusivas para professores de alunos atípicos.",
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
    <html lang="pt" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <a
              href="#conteudo"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Pular para o conteúdo
            </a>
            {children}
            <SiteFooter />
            <CookieConsent />
            <RavenaChat />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
