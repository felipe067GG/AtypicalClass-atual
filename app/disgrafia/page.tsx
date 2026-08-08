"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { disgrafiaData } from "@/lib/specialty-data/disgrafia"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function DisgrafiaPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("disgrafia")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView specialty={specialty} data={disgrafiaData(t)} title={t("dysgraphiaTitle")} intro={t("dysgraphiaIntro")} />
      </main>
    </>
  )
}
