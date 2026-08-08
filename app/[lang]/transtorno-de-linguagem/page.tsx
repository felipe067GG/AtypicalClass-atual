"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { transtornoDeLinguagemData } from "@/lib/specialty-data/transtorno-de-linguagem"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function TranstornoDeLinguagemPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("transtorno-de-linguagem")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView specialty={specialty} data={transtornoDeLinguagemData(t)} title={t("languageDisorderTitle")} intro={t("languageDisorderIntro")} />
      </main>
    </>
  )
}
