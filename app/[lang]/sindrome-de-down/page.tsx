"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { sindromeDeDownData } from "@/lib/specialty-data/sindrome-de-down"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function SindromeDeDownPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("sindrome-de-down")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView
          specialty={specialty}
          data={sindromeDeDownData(t)}
          title={t("downSyndromeTitle")}
          intro={t("downSyndromeDescription")}
        />
      </main>
    </>
  )
}
