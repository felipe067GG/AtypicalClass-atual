import type { Activity } from "@/components/specialty/types"
import type { Language } from "./translations"
import { list, text } from "./i18n-content"

/**
 * Exporta uma atividade como arquivo de texto imprimível.
 *
 * Diferença em relação ao download que existia antes: aquele botão gerava um
 * .txt a partir de uma string-placeholder ("Conteúdo completo do guia...") e
 * o rotulava como "Manual PDF". Este monta o roteiro inteiro a partir dos
 * dados reais da atividade — materiais, passo a passo, variações, avaliação e
 * fontes — no idioma que o usuário está lendo.
 *
 * O arquivo é .txt de propósito: é o que o site realmente produz, e assim o
 * rótulo do botão corresponde ao que chega na mão do professor.
 */

interface ExportLabels {
  age: string
  duration: string
  objectives: string
  materials: string
  implementation: string
  tips: string
  variations: string
  assessment: string
  sources: string
  authorshipNote?: string
}

const RULE = "=".repeat(72)
const THIN = "-".repeat(72)

function section(title: string, body: string[]): string[] {
  if (body.length === 0) return []
  return ["", title.toUpperCase(), THIN, ...body]
}

export function buildActivityText(activity: Activity, language: Language, labels: ExportLabels): string {
  const name = text(activity.name, language)

  const lines: string[] = [
    RULE,
    name,
    RULE,
    "",
    text(activity.description, language),
    "",
    `${labels.age}: ${text(activity.age, language)}`,
    `${labels.duration}: ${text(activity.duration, language)}`,
  ]

  lines.push(...section(labels.objectives, list(activity.objectives, language).map((o) => `  • ${o}`)))
  lines.push(...section(labels.materials, list(activity.materials, language).map((m) => `  • ${m}`)))

  const steps = list(activity.stepByStep, language)
  lines.push(
    ...section(
      labels.implementation,
      steps.length
        ? steps.map((s, i) => `  ${String(i + 1).padStart(2, " ")}. ${s}`)
        : [`  ${text(activity.implementation, language)}`],
    ),
  )

  lines.push(...section(labels.tips, list(activity.tips, language).map((t) => `  • ${t}`)))
  lines.push(...section(labels.variations, list(activity.variations, language).map((v) => `  • ${v}`)))

  const assessment = text(activity.assessment, language)
  if (assessment) lines.push(...section(labels.assessment, [`  ${assessment}`]))

  if (activity.citations?.length) {
    lines.push(
      ...section(
        labels.sources,
        activity.citations.flatMap((c) => [`  ${c.label}`, `  ${c.url}`, ""]),
      ),
    )
  }

  if (labels.authorshipNote && activity.authorship === "adapted") {
    lines.push("", THIN, labels.authorshipNote)
  }

  lines.push("", THIN, "AtypicalClass — https://www.atypicalclass.com.br", "")

  return lines.join("\n")
}

/** Nome de arquivo seguro, sem acentos nem caracteres proibidos. */
export function activityFileName(activity: Activity, language: Language): string {
  const slug = text(activity.name, language)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return `${slug || "atividade"}.txt`
}

export function downloadActivity(activity: Activity, language: Language, labels: ExportLabels): void {
  // BOM para o Bloco de Notas do Windows não quebrar os acentos.
  const blob = new Blob(["﻿" + buildActivityText(activity, language, labels)], {
    type: "text/plain;charset=utf-8",
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = activityFileName(activity, language)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
