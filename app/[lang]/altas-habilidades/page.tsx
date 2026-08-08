"use client"

import Header from "@/app/components/header"
import { SpecialtyView } from "@/components/specialty/specialty-view"
import { altasHabilidadesData } from "@/lib/specialty-data/altas-habilidades"
import { getSpecialty } from "@/lib/specialties"
import { useLanguage } from "@/lib/language-context"

export default function AltasHabilidadesPage() {
  const { t } = useLanguage()
  const specialty = getSpecialty("altas-habilidades")!

  return (
    <>
      <Header />
      <main id="conteudo">
        <SpecialtyView specialty={specialty} data={altasHabilidadesData(t)} title={t("giftednessTitle")} intro={t("giftednessIntro")} />
      </main>
    </>
  )
}
