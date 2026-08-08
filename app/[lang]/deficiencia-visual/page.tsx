"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { deficienciaVisualData } from "@/lib/specialty-data/deficiencia-visual"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function DeficienciaVisualPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("deficiencia-visual")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView
          specialty={specialty}
          data={deficienciaVisualData(t)}
          title={t("visualTitle")}
          intro={t("visualDescription")}
        />
      </main>
    </>
  )
}
