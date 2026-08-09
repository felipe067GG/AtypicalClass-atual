import { SPECIALTIES } from "@/lib/specialties"
import type { GuiaDeAdaptacao } from "./tipos"
import { matematicaDiscalculia } from "./matematica-discalculia"

/**
 * Registro dos guias de adaptação.
 *
 * São 196 pares possíveis e eles serão escritos aos poucos. Um par sem guia
 * não é erro: é lacuna conhecida, e `cobertura()` a torna visível em vez de
 * deixá-la passar por acabada.
 */
export const GUIAS: GuiaDeAdaptacao[] = [matematicaDiscalculia]

/** As catorze matérias do acervo de questões. */
export const MATERIAS = [
  "Matemática",
  "Português",
  "Literatura",
  "Inglês",
  "Espanhol",
  "Artes",
  "Educação Física",
  "História",
  "Geografia",
  "Filosofia",
  "Sociologia",
  "Física",
  "Química",
  "Biologia",
] as const

export function guiaDe(materia: string, especialidade: string): GuiaDeAdaptacao | undefined {
  return GUIAS.find((g) => g.materia === materia && g.especialidade === especialidade)
}

/** Quantos pares já têm guia, de quantos possíveis. */
export function cobertura() {
  const total = MATERIAS.length * SPECIALTIES.length
  return { escritos: GUIAS.length, total, faltam: total - GUIAS.length }
}

/**
 * Confere que todo guia tem fonte em cada afirmação.
 *
 * O tipo já obriga o campo `citations` a existir, mas não impede que ele venha
 * vazio — e um array vazio compila. Ao longo de duzentos textos, é exatamente
 * assim que a primeira afirmação sem fonte entra: não por decisão, por
 * distração. Esta função é chamada pelo conferidor do acervo e derruba o build.
 *
 * Também confere que matéria e especialidade existem de verdade. Um guia de
 * "Matematica" sem acento, ou de uma especialidade com slug errado, nunca
 * apareceria para o professor — e falharia em silêncio, que é o pior modo.
 */
export function conferirGuias(): string[] {
  const problemas: string[] = []
  const slugs = new Set(SPECIALTIES.map((s) => s.slug))
  const materias = new Set<string>(MATERIAS)
  const vistos = new Set<string>()

  for (const guia of GUIAS) {
    const onde = `${guia.materia} × ${guia.especialidade}`

    if (!materias.has(guia.materia)) problemas.push(`${onde}: matéria não existe no acervo`)
    if (!slugs.has(guia.especialidade)) problemas.push(`${onde}: especialidade não existe em SPECIALTIES`)

    const chave = `${guia.materia}|${guia.especialidade}`
    if (vistos.has(chave)) problemas.push(`${onde}: par duplicado`)
    vistos.add(chave)

    if (!guia.barreiras.length) problemas.push(`${onde}: nenhuma barreira descrita`)
    if (!guia.estrategias.length) problemas.push(`${onde}: nenhuma estratégia proposta`)

    for (const barreira of guia.barreiras) {
      if (!barreira.citations?.length) problemas.push(`${onde}: barreira sem fonte`)
    }
    for (const estrategia of guia.estrategias) {
      if (!estrategia.citations?.length) problemas.push(`${onde}: estratégia sem fonte`)
    }
  }

  return problemas
}
