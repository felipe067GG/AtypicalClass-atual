import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import "../globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { ThemeProvider } from "@/lib/theme-context"
import { CookieConsent } from "@/components/cookie-consent"
import { RavenaChat } from "@/components/ravena-chat"
import { SiteFooter } from "@/components/site-footer"
import { SITE_URL } from "@/lib/site"
import { LOCALES, isLocale } from "@/lib/i18n-routing"
import { translations } from "@/lib/translations"
import { resolveLang } from "@/lib/page-metadata"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

/** Título e descrição herdados por quem não define os seus — a home, na prática. */
const PT_TITLE = "AtypicalClass — Educação inclusiva na prática"
const PT_DESCRIPTION =
  "Estratégias, atividades e questões adaptadas para professores que trabalham com alunos atípicos: autismo, TDAH, síndrome de Down, deficiência visual e auditiva."

/**
 * O português é mantido exatamente como está, letra por letra: é o título que
 * o Google já indexou, e trocá-lo por tradução de outra chave seria churn sem
 * ganho. Inglês e espanhol usam a manchete da home, que já existe traduzida e
 * conferida — é o que evita uma página em inglês se anunciar em português no
 * resultado de busca.
 */
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const locale = resolveLang(lang)
  const t = translations[locale]

  const title = locale === "pt" ? PT_TITLE : `AtypicalClass — ${t.heroHeadline}`
  const description = locale === "pt" ? PT_DESCRIPTION : t.inclusiveDesc

  return {
    // Mesmo endereço do sitemap. Antes isto caía em `localhost:3000` quando a
    // variável não estava definida, e é a partir daqui que saem as URLs
    // absolutas de `og:` — ou seja, um preview de link compartilhado apontando
    // para a máquina de quem fez o build.
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s · AtypicalClass",
    },
    description,
    generator: "AtypicalClass",
    // O ícone vem de app/icon.svg — a marca própria, não mais o logo padrão do v0.
    openGraph: {
      type: "website",
      siteName: "AtypicalClass",
      locale,
      title,
      description,
    },
  }
}

/**
 * Gera as três versões no build. É isto que mantém as páginas estáticas: sem
 * `generateStaticParams`, um segmento dinâmico como `[lang]` obrigaria a
 * renderizar a cada requisição — exatamente o custo que esta abordagem existe
 * para evitar.
 */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

/**
 * Aplica o tema salvo antes da primeira pintura, evitando o flash de tema
 * escuro para quem escolheu o claro. Roda antes do React hidratar.
 *
 * O idioma não precisa mais de um truque assim: ele vem na rota, então o
 * servidor já renderiza o texto certo.
 */
const THEME_SCRIPT = `try{if(document.cookie.split('; ').find(c=>c.startsWith('theme='))?.split('=')[1]==='light'){document.documentElement.classList.add('light')}}catch(e){}`

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  // A reescrita do proxy só produz idiomas válidos, mas o segmento é público:
  // `/xx/questoes` chega aqui como "xx" e tem que virar 404, não uma página em
  // branco com traduções faltando.
  if (!isLocale(lang) || !translations[lang]) notFound()

  return (
    <html lang={lang} className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <LanguageProvider language={lang}>
            <a
              href="#conteudo"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              {translations[lang].skipToContent}
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
