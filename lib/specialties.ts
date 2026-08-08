import {
  Brain,
  Heart,
  Lightbulb,
  Eye,
  Ear,
  Puzzle,
  BookA,
  Sparkles,
  Calculator,
  Accessibility,
  HeartPulse,
  Hand,
  MessagesSquare,
  PenLine,
  type LucideIcon,
} from "lucide-react"

/**
 * Registro único das especialidades.
 *
 * Antes, cada tela repetia a sua própria lista — com nomes, ícones e cores
 * ligeiramente diferentes. Centralizar aqui é o que mantém a navegação, a home
 * e as páginas de especialidade dizendo a mesma coisa.
 *
 * `accent` casa com os seletores `[data-specialty="..."]` do globals.css: é ele
 * que define a cor que acompanha o usuário dentro da seção.
 */
export type SpecialtyAccent =
  | "autismo"
  | "tdah"
  | "down"
  | "visual"
  | "auditiva"
  | "intelectual"
  | "dislexia"
  | "altas-habilidades"
  | "discalculia"
  | "fisica-motora"
  | "saude-mental"
  | "surdocegueira"
  | "linguagem"
  | "disgrafia"

export interface Specialty {
  /** Segmento da URL: /autismo, /tdah, ... */
  slug: string
  accent: SpecialtyAccent
  /** Chaves de tradução já existentes em lib/translations.ts */
  nameKey: string
  descriptionKey: string
  icon: LucideIcon
  /** Quantos recursos a seção oferece hoje */
  resourceCount: number
}

export const SPECIALTIES: Specialty[] = [
  {
    slug: "autismo",
    accent: "autismo",
    nameKey: "autism",
    descriptionKey: "autismDesc",
    icon: Brain,
    resourceCount: 12,
  },
  {
    slug: "tdah",
    accent: "tdah",
    nameKey: "adhd",
    descriptionKey: "adhdDesc",
    icon: Lightbulb,
    resourceCount: 8,
  },
  {
    slug: "sindrome-de-down",
    accent: "down",
    nameKey: "downSyndrome",
    descriptionKey: "downDesc",
    icon: Heart,
    resourceCount: 10,
  },
  {
    slug: "deficiencia-visual",
    accent: "visual",
    nameKey: "visualImpairment",
    descriptionKey: "visualDesc",
    icon: Eye,
    resourceCount: 6,
  },
  {
    slug: "deficiencia-auditiva",
    accent: "auditiva",
    nameKey: "hearingImpairment",
    descriptionKey: "hearingDesc",
    icon: Ear,
    resourceCount: 7,
  },
  {
    slug: "deficiencia-intelectual",
    accent: "intelectual",
    nameKey: "intellectualDisability",
    descriptionKey: "intellectualDesc",
    icon: Puzzle,
    resourceCount: 13,
  },
  {
    slug: "dislexia",
    accent: "dislexia",
    nameKey: "dyslexia",
    descriptionKey: "dyslexiaDesc",
    icon: BookA,
    resourceCount: 13,
  },
  {
    slug: "altas-habilidades",
    accent: "altas-habilidades",
    nameKey: "giftedness",
    descriptionKey: "giftednessDesc",
    icon: Sparkles,
    resourceCount: 12,
  },
  {
    slug: "discalculia",
    accent: "discalculia",
    nameKey: "dyscalculia",
    descriptionKey: "dyscalculiaDesc",
    icon: Calculator,
    resourceCount: 13,
  },
  {
    slug: "deficiencia-fisica",
    accent: "fisica-motora",
    nameKey: "physicalDisability",
    descriptionKey: "physicalDesc",
    icon: Accessibility,
    resourceCount: 13,
  },
  {
    slug: "saude-mental",
    accent: "saude-mental",
    nameKey: "mentalHealth",
    descriptionKey: "mentalHealthDesc",
    icon: HeartPulse,
    resourceCount: 12,
  },
  {
    slug: "surdocegueira",
    accent: "surdocegueira",
    nameKey: "deafblindness",
    descriptionKey: "deafblindnessDesc",
    icon: Hand,
    resourceCount: 12,
  },
  {
    slug: "transtorno-de-linguagem",
    accent: "linguagem",
    nameKey: "languageDisorder",
    descriptionKey: "languageDisorderDesc",
    icon: MessagesSquare,
    resourceCount: 12,
  },
  {
    slug: "disgrafia",
    accent: "disgrafia",
    nameKey: "dysgraphia",
    descriptionKey: "dysgraphiaDesc",
    icon: PenLine,
    resourceCount: 12,
  },
]

export function getSpecialty(slug: string): Specialty | undefined {
  return SPECIALTIES.find((s) => s.slug === slug)
}
