"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { deficienciaAuditivaData } from "@/lib/specialty-data/deficiencia-auditiva"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function DeficienciaAuditivaPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("deficiencia-auditiva")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView
          specialty={specialty}
          data={deficienciaAuditivaData(t)}
          title={t("hearing_impairment_section_title")}
          intro={t("hearing_impairment_section_description")}
        />
      </main>
    </>
  )
}
