import type { LocalizedList, LocalizedText } from "@/lib/i18n-content"

export type Translate = (key: string) => string

/** Texto de conteúdo: string nas áreas legadas, trilíngue nas migradas. */
type Text = string | LocalizedText
type TextList = string[] | LocalizedList

/**
 * Nível de evidência conforme a classificação do NCAEP (National Clearinghouse
 * on Autism Evidence and Practice), revisão 1990–2017.
 *
 * Substitui os percentuais de eficácia que existiam antes — aqueles números
 * (85% a 98%) eram inventados e não tinham fonte alguma. Nível de evidência é
 * verificável; percentual sem estudo não é.
 */
export type EvidenceLevel = "established" | "emerging" | "insufficient"

/** Referência real, com link. Sem `url`, não entra. */
export interface Citation {
  label: string
  url: string
}

/**
 * De onde veio o conteúdo. Existe para não repetir o erro de dar a entender
 * que uma atividade escrita pelo site foi publicada por um pesquisador.
 *
 *  - `published`: reproduz material de terceiro; `citations` aponta para ele.
 *  - `adapted`:   aplicação em sala de uma prática com evidência, redigida
 *                 pelo AtypicalClass; `citations` aponta para a prática, não
 *                 para a atividade.
 */
export type Authorship = "published" | "adapted"

export interface Strategy {
  title: Text
  description: Text
  tips: TextList
  evidence?: EvidenceLevel
  citations?: Citation[]
  difficulty: Text

  // --- Campos legados, presentes só nas áreas ainda não migradas -------------
  /** @deprecated Número sem fonte. Sai quando a área ganhar `evidence`. */
  effectiveness?: number
  /** @deprecated Texto livre sem link. Substituído por `citations`. */
  source?: string
}

export interface Activity {
  name: Text
  age: Text
  duration: Text
  description: Text
  materials: TextList
  implementation: Text
  objectives: TextList

  /** Quem escreveu. Sem isto, o cartão não afirma nada sobre autoria. */
  authorship?: Authorship
  citations?: Citation[]

  /** Passos reais desta atividade — não texto genérico repetido. */
  stepByStep?: TextList
  tips?: TextList
  variations?: TextList
  assessment?: Text

  /** Quando presente, oferece o PDF multilíngue. */
  downloadFile?: string

  // --- Campos legados --------------------------------------------------------
  /** @deprecated O site não tem sistema de avaliação. */
  rating?: number
  /** @deprecated O site não conta downloads. */
  downloads?: number
}

export interface Course {
  title: Text
  provider: string
  duration: Text
  price: Text
  certificate: boolean
  level: Text
  url: string
  language?: "pt" | "en" | "es"

  // --- Campos legados --------------------------------------------------------
  /** @deprecated Nota inventada. */
  rating?: number
  /** @deprecated Número de alunos inventado. */
  students?: number
  modules?: number
}

/**
 * Material de apoio.
 *
 * Com `url`, é um recurso externo real e verificado. Sem `url`, cai no
 * comportamento antigo, que gera um .txt de placeholder e será removido
 * quando todas as áreas estiverem migradas.
 */
export interface Resource {
  title: Text
  type: Text
  description: Text
  featured: boolean
  url?: string
  publisher?: string
  language?: "pt" | "en" | "es"
  format?: "PDF" | "Módulo online" | "Vídeo" | "Site" | "Planilha"

  /** @deprecated Texto-placeholder baixado como .txt. */
  content?: string
}

export interface SpecialtyData {
  strategies: Strategy[]
  activities: Activity[]
  courses: Course[]
  resources: Resource[]
}
