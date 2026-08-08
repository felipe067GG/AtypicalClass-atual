"use client"

import Header from "@/app/components/header"
import AboutSection from "@/app/components/about-section"
import { useLanguage } from "@/lib/language-context"

export default function SobrePage() {
  const { t } = useLanguage()

  return (
    <>
      <Header />
      <main id="conteudo" className="container py-12">
        <h1 className="mb-10 text-4xl font-bold md:text-5xl">{t("about")}</h1>
        <AboutSection />
      </main>
    </>
  )
}
