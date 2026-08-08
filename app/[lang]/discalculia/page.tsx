"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { discalculiaData } from "@/lib/specialty-data/discalculia"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function DiscalculiaPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("discalculia")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView specialty={specialty} data={discalculiaData(t)} title={t("dyscalculiaTitle")} intro={t("dyscalculiaIntro")} />
      </main>
    </>
  )
}
