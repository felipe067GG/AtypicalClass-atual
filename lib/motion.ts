import type { Variants, Transition } from "framer-motion"

/**
 * Vocabulário de movimento do site.
 *
 * Antes cada página inventava seus próprios `initial`/`animate`/`delay`, com
 * durações e distâncias diferentes — parte da sensação de "não padronizado".
 * Aqui ficam as poucas primitivas que todas as telas devem reutilizar.
 *
 * O movimento é contido de propósito: o público inclui pessoas com
 * sensibilidade sensorial. `prefers-reduced-motion` é respeitado no globals.css.
 */

/** Saída suave, sem elástico. Sensação de "assentar" em vez de "quicar". */
export const EASE_OUT: Transition["ease"] = [0.22, 1, 0.36, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } },
}

/** Aplique no contêiner e use `fadeUp` nos filhos para entrada em cascata. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
}

/**
 * Anima na entrada em tela, uma única vez. Espalhar isto pelas listas longas
 * evita animar o que ninguém está vendo.
 */
export const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-64px" },
} as const

/** Realce discreto de card sob o cursor. */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2, ease: EASE_OUT } },
  whileTap: { y: -1 },
} as const
