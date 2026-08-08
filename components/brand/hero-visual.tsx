"use client"

import { motion } from "framer-motion"
import { SPECIALTIES } from "@/lib/specialties"

/**
 * Composição decorativa da abertura.
 *
 * Cada nó é uma especialidade, na sua própria cor — os mesmos acentos usados
 * no resto do site. Em vez de uma imagem genérica de banco, a ilustração
 * apresenta o sistema de cores que o usuário vai encontrar navegando.
 *
 * Os nós herdam a cor via `data-specialty` + `fill-brand`, então acompanham a
 * troca de tema sozinhos. É puramente decorativo: `aria-hidden`.
 */

/** Posições escolhidas à mão para dar equilíbrio assimétrico à composição. */
const NODES = [
  { slug: "autismo", cx: 112, cy: 88, r: 26 },
  { slug: "tdah", cx: 258, cy: 58, r: 19 },
  { slug: "sindrome-de-down", cx: 326, cy: 158, r: 23 },
  { slug: "deficiencia-visual", cx: 204, cy: 172, r: 31 },
  { slug: "deficiencia-auditiva", cx: 88, cy: 218, r: 21 },
]

const HUB = NODES[3] // a partir dele saem as ligações

export function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className} aria-hidden focusable="false">
      {/* malha de fundo, bem discreta */}
      <defs>
        <pattern id="grade" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" stroke="currentColor" strokeWidth="1" opacity="0.06" fill="none" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#grade)" />

      {/* ligações entre o nó central e os demais */}
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.18">
        {NODES.filter((n) => n.slug !== HUB.slug).map((node) => (
          <motion.line
            key={node.slug}
            x1={HUB.cx}
            y1={HUB.cy}
            x2={node.cx}
            y2={node.cy}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </g>

      {NODES.map((node, index) => {
        const specialty = SPECIALTIES.find((s) => s.slug === node.slug)
        if (!specialty) return null

        return (
          <motion.g
            key={node.slug}
            data-specialty={specialty.accent}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
          >
            {/* halo */}
            <circle cx={node.cx} cy={node.cy} r={node.r * 2.1} className="fill-brand" opacity="0.07" />
            <circle cx={node.cx} cy={node.cy} r={node.r * 1.45} className="fill-brand" opacity="0.12" />

            {/* flutuação suave e contínua */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              className="fill-brand"
              animate={{ translateY: [0, -6, 0] }}
              transition={{
                duration: 5 + index * 0.7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.4,
              }}
            />
          </motion.g>
        )
      })}
    </svg>
  )
}
