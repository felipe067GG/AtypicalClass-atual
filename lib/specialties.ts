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
  /**
   * Título e texto de abertura da página, nas três línguas.
   *
   * Ficavam escritos à mão dentro de cada `page.tsx`. Vieram para cá quando o
   * idioma entrou na rota: a metadata das páginas (`<title>` e `description`)
   * precisa das mesmas chaves, e mantê-las em dois lugares garantiria que um
   * dia divergissem. Os nomes não seguem um padrão único porque são anteriores
   * a este registro — daí serem declarados, e não deduzidos do slug.
   */
  titleKey: string
  introKey: string
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
    titleKey: "autismTitle",
    introKey: "autismIntro",
    icon: Brain,
    resourceCount: 12,
  },
  {
    slug: "tdah",
    accent: "tdah",
    nameKey: "adhd",
    descriptionKey: "adhdDesc",
    titleKey: "adhdTitle",
    introKey: "adhdDescription",
    icon: Lightbulb,
    resourceCount: 8,
  },
  {
    slug: "sindrome-de-down",
    accent: "down",
    nameKey: "downSyndrome",
    descriptionKey: "downDesc",
    titleKey: "downSyndromeTitle",
    introKey: "downSyndromeDescription",
    icon: Heart,
    resourceCount: 10,
  },
  {
    slug: "deficiencia-visual",
    accent: "visual",
    nameKey: "visualImpairment",
    descriptionKey: "visualDesc",
    titleKey: "visualTitle",
    introKey: "visualDescription",
    icon: Eye,
    resourceCount: 6,
  },
  {
    slug: "deficiencia-auditiva",
    accent: "auditiva",
    nameKey: "hearingImpairment",
    descriptionKey: "hearingDesc",
    titleKey: "hearing_impairment_section_title",
    introKey: "hearing_impairment_section_description",
    icon: Ear,
    resourceCount: 7,
  },
  {
    slug: "deficiencia-intelectual",
    accent: "intelectual",
    nameKey: "intellectualDisability",
    descriptionKey: "intellectualDesc",
    titleKey: "intellectualTitle",
    introKey: "intellectualIntro",
    icon: Puzzle,
    resourceCount: 13,
  },
  {
    slug: "dislexia",
    accent: "dislexia",
    nameKey: "dyslexia",
    descriptionKey: "dyslexiaDesc",
    titleKey: "dyslexiaTitle",
    introKey: "dyslexiaIntro",
    icon: BookA,
    resourceCount: 13,
  },
  {
    slug: "altas-habilidades",
    accent: "altas-habilidades",
    nameKey: "giftedness",
    descriptionKey: "giftednessDesc",
    titleKey: "giftednessTitle",
    introKey: "giftednessIntro",
    icon: Sparkles,
    resourceCount: 12,
  },
  {
    slug: "discalculia",
    accent: "discalculia",
    nameKey: "dyscalculia",
    descriptionKey: "dyscalculiaDesc",
    titleKey: "dyscalculiaTitle",
    introKey: "dyscalculiaIntro",
    icon: Calculator,
    resourceCount: 13,
  },
  {
    slug: "deficiencia-fisica",
    accent: "fisica-motora",
    nameKey: "physicalDisability",
    descriptionKey: "physicalDesc",
    titleKey: "physicalTitle",
    introKey: "physicalIntro",
    icon: Accessibility,
    resourceCount: 13,
  },
  {
    slug: "saude-mental",
    accent: "saude-mental",
    nameKey: "mentalHealth",
    descriptionKey: "mentalHealthDesc",
    titleKey: "mentalHealthTitle",
    introKey: "mentalHealthIntro",
    icon: HeartPulse,
    resourceCount: 12,
  },
  {
    slug: "surdocegueira",
    accent: "surdocegueira",
    nameKey: "deafblindness",
    descriptionKey: "deafblindnessDesc",
    titleKey: "deafblindnessTitle",
    introKey: "deafblindnessIntro",
    icon: Hand,
    resourceCount: 12,
  },
  {
    slug: "transtorno-de-linguagem",
    accent: "linguagem",
    nameKey: "languageDisorder",
    descriptionKey: "languageDisorderDesc",
    titleKey: "languageDisorderTitle",
    introKey: "languageDisorderIntro",
    icon: MessagesSquare,
    resourceCount: 12,
  },
  {
    slug: "disgrafia",
    accent: "disgrafia",
    nameKey: "dysgraphia",
    descriptionKey: "dysgraphiaDesc",
    titleKey: "dysgraphiaTitle",
    introKey: "dysgraphiaIntro",
    icon: PenLine,
    resourceCount: 12,
  },
]

export function getSpecialty(slug: string): Specialty | undefined {
  return SPECIALTIES.find((s) => s.slug === slug)
}
