"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { saudeMentalData } from "@/lib/specialty-data/saude-mental"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function SaudeMentalPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("saude-mental")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView specialty={specialty} data={saudeMentalData(t)} title={t("mentalHealthTitle")} intro={t("mentalHealthIntro")} />
      </main>
    </>
  )
}
