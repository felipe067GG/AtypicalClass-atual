"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { deficienciaIntelectualData } from "@/lib/specialty-data/deficiencia-intelectual"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function DeficienciaIntelectualPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("deficiencia-intelectual")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView specialty={specialty} data={deficienciaIntelectualData(t)} title={t("intellectualTitle")} intro={t("intellectualIntro")} />
      </main>
    </>
  )
}
