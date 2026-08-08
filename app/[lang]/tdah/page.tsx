"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { tdahData } from "@/lib/specialty-data/tdah"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function TdahPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("tdah")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView
          specialty={specialty}
          data={tdahData(t)}
          title={t("adhdTitle")}
          intro={t("adhdDescription")}
        />
      </main>
    </>
  )
}
