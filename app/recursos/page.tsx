"use client"

import Header from "@/app/components/header"
import ResourcesSection from "@/app/components/resources-section"
import { useLanguage } from "@/lib/language-context"

export default function RecursosPage() {
  const { t } = useLanguage()

  return (
    <>
      <Header />
      <main id="conteudo" className="container py-12">
        {/* A seção abaixo começa em h2; sem este h1 a página ficava sem
            cabeçalho de nível 1, o que quebra a hierarquia para leitores de tela. */}
        <h1 className="mb-10 text-4xl font-bold md:text-5xl">{t("resourcesLabel")}</h1>
        <ResourcesSection />
      </main>
    </>
  )
}
