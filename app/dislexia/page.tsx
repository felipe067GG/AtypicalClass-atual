"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { dislexiaData } from "@/lib/specialty-data/dislexia"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function DislexiaPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("dislexia")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView specialty={specialty} data={dislexiaData(t)} title={t("dyslexiaTitle")} intro={t("dyslexiaIntro")} />
      </main>
    </>
  )
}
