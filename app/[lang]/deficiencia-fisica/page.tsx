"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { deficienciaFisicaData } from "@/lib/specialty-data/deficiencia-fisica"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function DeficienciaFisicaPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("deficiencia-fisica")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView specialty={specialty} data={deficienciaFisicaData(t)} title={t("physicalTitle")} intro={t("physicalIntro")} />
      </main>
    </>
  )
}
