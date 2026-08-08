"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { surdocegueiraData } from "@/lib/specialty-data/surdocegueira"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function SurdocegueiraPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("surdocegueira")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView specialty={specialty} data={surdocegueiraData(t)} title={t("deafblindnessTitle")} intro={t("deafblindnessIntro")} />
      </main>
    </>
  )
}
