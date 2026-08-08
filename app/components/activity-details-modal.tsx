"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Clock,
  Users,
  CheckCircle,
  Lightbulb,
  BookOpen,
  Settings,
  Target,
  ExternalLink,
  Info,
  Download,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { list, text } from "@/lib/i18n-content"
import { downloadActivity } from "@/lib/activity-export"
import type { Activity } from "@/components/specialty/types"

/**
 * Detalhes de uma atividade.
 *
 * Três coisas foram corrigidas aqui:
 *
 *  1. Havia um botão "Baixar Material Completo" **sem nenhum onClick** — pura
 *     decoração prometendo um download que não existia. Foi removido; quando
 *     há material de fato, aparece o link real.
 *  2. Exibia nota e contagem de downloads que o site nunca mediu.
 *  3. O rótulo "Fundamentação Científica" apontava para o texto de como
 *     aplicar. Agora fundamentação são as fontes, com link.
 *
 * Tudo passou a respeitar o idioma ativo — antes era português fixo.
 */
export default function ActivityDetailsModal({
  activity,
  isOpen,
  onClose,
}: {
  activity: Activity | null
  isOpen: boolean
  onClose: () => void
}) {
  const { t, language } = useLanguage()

  if (!activity) return null

  const steps = list(activity.stepByStep, language)
  const tips = list(activity.tips, language)
  const variations = list(activity.variations, language)
  const assessment = text(activity.assessment, language)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{text(activity.name, language)}</DialogTitle>
          <DialogDescription className="text-base">{text(activity.description, language)}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-surface-2 p-3">
              <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-medium text-brand">
                <Users className="h-3.5 w-3.5" aria-hidden />
                {t("age")}
              </p>
              <p className="text-sm">{text(activity.age, language)}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-2 p-3">
              <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-medium text-brand">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {t("duration")}
              </p>
              <p className="text-sm">{text(activity.duration, language)}</p>
            </div>
          </div>

          {/* Quem escreveu — para não dar a entender autoria de terceiro */}
          {activity.authorship === "adapted" && (
            <div className="flex gap-2.5 rounded-lg border border-border bg-surface-2 p-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <p className="text-xs leading-relaxed text-muted-foreground">{t("authorshipAdapted")}</p>
            </div>
          )}

          <section>
            <h3 className="mb-3 inline-flex items-center gap-2 font-semibold">
              <Target className="h-4 w-4 text-brand" aria-hidden />
              {t("objectives")}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {list(activity.objectives, language).map((objective, index) => (
                <span key={index} className="accent-soft rounded-md px-2 py-1 text-xs font-medium">
                  {objective}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 inline-flex items-center gap-2 font-semibold">
              <Settings className="h-4 w-4 text-brand" aria-hidden />
              {t("materials")}
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {list(activity.materials, language).map((material, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 shrink-0 text-success" aria-hidden />
                  {material}
                </li>
              ))}
            </ul>
          </section>

          {steps.length > 0 && (
            <section>
              <h3 className="mb-3 inline-flex items-center gap-2 font-semibold">
                <BookOpen className="h-4 w-4 text-brand" aria-hidden />
                {t("implementation")}
              </h3>
              <ol className="space-y-2.5">
                {steps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-medium text-brand-contrast">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {tips.length > 0 && (
            <section>
              <h3 className="mb-3 inline-flex items-center gap-2 font-semibold">
                <Lightbulb className="h-4 w-4 text-brand" aria-hidden />
                {t("tips")}
              </h3>
              <ul className="space-y-2">
                {tips.map((tip, index) => (
                  <li key={index} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {variations.length > 0 && (
            <section>
              <h3 className="mb-3 font-semibold">{t("variations")}</h3>
              <ul className="space-y-2">
                {variations.map((variation, index) => (
                  <li key={index} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {variation}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {assessment && (
            <section>
              <h3 className="mb-3 font-semibold">{t("howToAssess")}</h3>
              <p className="rounded-lg border border-border bg-surface-2 p-4 text-sm leading-relaxed text-muted-foreground">
                {assessment}
              </p>
            </section>
          )}

          {activity.citations?.length ? (
            <section className="border-t border-border pt-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("sources")}
              </h3>
              <ul className="space-y-1">
                {activity.citations.map((citation, index) => (
                  <li key={index}>
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-brand"
                    >
                      {citation.label}
                      <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button variant="outline" onClick={onClose}>
            {t("close")}
          </Button>
          {/* Gera o roteiro completo a partir dos dados reais da atividade.
              O rótulo diz .txt porque é exatamente o que baixa. */}
          <Button
            onClick={() =>
              downloadActivity(activity, language, {
                age: t("age"),
                duration: t("duration"),
                objectives: t("objectives"),
                materials: t("materials"),
                implementation: t("implementation"),
                tips: t("tips"),
                variations: t("variations"),
                assessment: t("howToAssess"),
                sources: t("sources"),
                authorshipNote: activity.authorship === "adapted" ? t("authorshipAdapted") : undefined,
              })
            }
          >
            <Download className="mr-2 h-4 w-4" />
            {t("downloadActivity")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
