"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { autismoData } from "@/lib/specialty-data/autismo"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function AutismoPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("autismo")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView
          specialty={specialty}
          data={autismoData(t)}
          title={t("autismTitle")}
          intro={t("autismIntro")}
        />
      </main>
    </>
  )
}
