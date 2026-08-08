import type { Course, Resource } from "@/components/specialty/types"
import { ml } from "@/lib/i18n-content"

/**
 * Cursos e materiais que valem para qualquer especialidade.
 *
 * Existiam copiados em cada arquivo de área — o mesmo fascículo do MEC, o
 * mesmo DIVERSA, as mesmas diretrizes do DUA. Além de duplicação, isso inflava
 * a contagem de materiais sem acrescentar conteúdo real: o professor via oito
 * itens e metade era a mesma coisa que já tinha visto na área anterior.
 *
 * Agora cada área importa daqui o que é comum e escreve só o que é específico.
 * Acrescentar um item aqui acrescenta em todas as áreas de uma vez.
 */

const FREE = ml("Gratuito", "Free", "Gratuito")
const SELF_PACED = ml("Autoinstrucional", "Self-paced", "Autoinstruccional")
const INTRO = ml("Introdutório", "Introductory", "Introductorio")

/** Formação gratuita em educação inclusiva, aberta a qualquer professor. */
export const COMMON_COURSES: Course[] = [
  {
    title: ml(
      "Fundamentos da Educação Inclusiva",
      "Foundations of Inclusive Education",
      "Fundamentos de la Educación Inclusiva",
    ),
    provider: "Instituto Rodrigo Mendes",
    duration: SELF_PACED,
    price: FREE,
    certificate: true,
    level: INTRO,
    language: "pt",
    url: "https://formacao.institutorodrigomendes.org.br/curso/fundamentos-da-educacao-inclusiva",
  },
  {
    title: ml(
      "AVAMEC — plataforma de formação do MEC",
      "AVAMEC — the Ministry of Education training platform",
      "AVAMEC — plataforma de formación del MEC",
    ),
    provider: "Ministério da Educação",
    duration: ml("Varia por curso", "Varies per course", "Varía por curso"),
    price: FREE,
    certificate: true,
    level: ml("Todos os níveis", "All levels", "Todos los niveles"),
    language: "pt",
    url: "https://avamec.mec.gov.br/",
  },
  {
    title: ml(
      "15 cursos a distância em educação especial",
      "15 distance courses in special education",
      "15 cursos a distancia en educación especial",
    ),
    provider: "Ministério da Educação",
    duration: ml("Varia por curso", "Varies per course", "Varía por curso"),
    price: FREE,
    certificate: true,
    level: ml("Todos os níveis", "All levels", "Todos los niveles"),
    language: "pt",
    url: "https://www.gov.br/mec/pt-br/assuntos/noticias/2022/mec-oferece-15-novos-cursos-a-distancia-focados-em-educacao-especial",
  },
  {
    title: ml("Escola Virtual.Gov", "Escola Virtual.Gov", "Escola Virtual.Gov"),
    provider: "Enap / Governo Federal",
    duration: ml("Varia por curso", "Varies per course", "Varía por curso"),
    price: FREE,
    certificate: true,
    level: ml("Todos os níveis", "All levels", "Todos los niveles"),
    language: "pt",
    url: "https://www.escolavirtual.gov.br/",
  },
  {
    title: ml("Escola Virtual — Fundação Bradesco", "Escola Virtual — Fundação Bradesco", "Escola Virtual — Fundação Bradesco"),
    provider: "Fundação Bradesco",
    duration: ml("Varia por curso", "Varies per course", "Varía por curso"),
    price: FREE,
    certificate: true,
    level: ml("Todos os níveis", "All levels", "Todos los niveles"),
    language: "pt",
    url: "https://www.ev.org.br/cursos",
  },
]

/** Materiais de referência que servem a qualquer área. */
export const COMMON_RESOURCES: Resource[] = [
  {
    title: ml("A Escola Comum Inclusiva", "The Inclusive Mainstream School", "La Escuela Común Inclusiva"),
    type: ml("Formação", "Training", "Formación"),
    description: ml(
      "Fascículo do MEC/SEESP sobre a organização da escola comum na perspectiva da inclusão escolar.",
      "MEC/SEESP booklet on organising the mainstream school from an inclusion perspective.",
      "Fascículo del MEC/SEESP sobre la organización de la escuela común desde la perspectiva de la inclusión.",
    ),
    featured: false,
    url: "https://iparadigma.org.br/wp-content/uploads/Ed-incluisva-85.pdf",
    publisher: "MEC / SEESP",
    language: "pt",
    format: "PDF",
  },
  {
    title: ml(
      "A Educação Especial na Perspectiva da Inclusão Escolar",
      "Special Education from an Inclusion Perspective",
      "La Educación Especial desde la Perspectiva de la Inclusión",
    ),
    type: ml("Formação", "Training", "Formación"),
    description: ml(
      "Fundamentos da educação especial inclusiva, publicação oficial do Ministério da Educação.",
      "Foundations of inclusive special education, an official Ministry of Education publication.",
      "Fundamentos de la educación especial inclusiva, publicación oficial del Ministerio de Educación.",
    ),
    featured: false,
    url: "https://www.udesc.br/arquivos/faed/id_cpmenu/4477/fasciculo_1_15841018257729_4477.pdf",
    publisher: "MEC / SEESP",
    language: "pt",
    format: "PDF",
  },
  {
    title: ml("DIVERSA — educação inclusiva na prática", "DIVERSA — inclusive education in practice", "DIVERSA — educación inclusiva en la práctica"),
    type: ml("Repositório", "Repository", "Repositorio"),
    description: ml(
      "Plataforma gratuita do Instituto Rodrigo Mendes com relatos de prática, artigos e materiais.",
      "Free platform by Instituto Rodrigo Mendes with practice reports, articles and materials.",
      "Plataforma gratuita del Instituto Rodrigo Mendes con relatos de práctica, artículos y materiales.",
    ),
    featured: false,
    url: "https://diversa.org.br/educacao-inclusiva/",
    publisher: "Instituto Rodrigo Mendes",
    language: "pt",
    format: "Site",
  },
  {
    title: ml(
      "Diretrizes do Desenho Universal para a Aprendizagem (DUA)",
      "Universal Design for Learning Guidelines",
      "Pautas del Diseño Universal para el Aprendizaje (DUA)",
    ),
    type: ml("Referência", "Reference", "Referencia"),
    description: ml(
      "Referencial para planejar aulas acessíveis a todos desde o início, em vez de adaptar depois caso a caso.",
      "A framework for planning lessons accessible to everyone from the start, instead of adapting case by case.",
      "Referencia para planificar clases accesibles a todos desde el inicio, en vez de adaptar caso por caso.",
    ),
    featured: false,
    url: "https://udlguidelines.cast.org/",
    publisher: "CAST",
    language: "en",
    format: "Site",
  },
  {
    title: ml("Portal do Ministério da Educação", "Brazilian Ministry of Education portal", "Portal del Ministerio de Educación"),
    type: ml("Referência", "Reference", "Referencia"),
    description: ml(
      "Legislação, políticas e publicações oficiais sobre educação especial na perspectiva inclusiva.",
      "Legislation, policies and official publications on special education from an inclusive perspective.",
      "Legislación, políticas y publicaciones oficiales sobre educación especial desde la perspectiva inclusiva.",
    ),
    featured: false,
    url: "https://www.gov.br/mec/pt-br",
    publisher: "Ministério da Educação",
    language: "pt",
    format: "Site",
  },
  {
    title: ml(
      "Progress Center — práticas instrucionais com evidência",
      "Progress Center — evidence-based instructional practices",
      "Progress Center — prácticas instruccionales con evidencia",
    ),
    type: ml("Repositório", "Repository", "Repositorio"),
    description: ml(
      "Coleção de práticas instrucionais com evidência e material de apoio, aplicável a várias condições.",
      "A collection of evidence-based instructional practices and support material, applicable across conditions.",
      "Colección de prácticas instruccionales con evidencia y material de apoyo, aplicable a varias condiciones.",
    ),
    featured: false,
    url: "https://promotingprogress.org/resource-collections/evidence-based-instructional-practices",
    publisher: "Progress Center — American Institutes for Research",
    language: "en",
    format: "Site",
  },
  {
    title: ml(
      "Intervenção intensiva — ferramentas de decisão",
      "Intensive intervention — decision tools",
      "Intervención intensiva — herramientas de decisión",
    ),
    type: ml("Repositório", "Repository", "Repositorio"),
    description: ml(
      "O que fazer quando a intervenção não produz progresso: como medir, decidir e intensificar.",
      "What to do when an intervention produces no progress: how to measure, decide and intensify.",
      "Qué hacer cuando la intervención no produce progreso: cómo medir, decidir e intensificar.",
    ),
    featured: false,
    url: "https://intensiveintervention.org/",
    publisher: "NCII — American Institutes for Research",
    language: "en",
    format: "Site",
  },
]

/** Junta o específico da área com o comum, sem repetir link. */
export function withCommonCourses(specific: Course[]): Course[] {
  const seen = new Set(specific.map((c) => c.url))
  return [...specific, ...COMMON_COURSES.filter((c) => !seen.has(c.url))]
}

export function withCommonResources(specific: Resource[]): Resource[] {
  const seen = new Set(specific.map((r) => r.url).filter(Boolean))
  return [...specific, ...COMMON_RESOURCES.filter((r) => !seen.has(r.url))]
}
