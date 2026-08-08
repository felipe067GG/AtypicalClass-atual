"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { BookMarked, FileText, Layers, Languages } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"
import { SPECIALTIES } from "@/lib/specialties"
import { fadeUp, inView, stagger } from "@/lib/motion"

/**
 * Números da plataforma.
 *
 * Questões e conteúdos vêm do banco em tempo real — nada aqui é inventado.
 * Se a consulta falhar, o bloco simplesmente não mostra o número em vez de
 * exibir um valor de fachada.
 */
function Counter({ value }: { value: number | null }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, margin: "-40px" })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (visible && value !== null) motionValue.set(value)
  }, [visible, value, motionValue])

  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring])

  if (value === null) {
    return <span ref={ref} className="inline-block h-9 w-12 animate-pulse rounded bg-surface-3" aria-hidden />
  }

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}

export function LiveStats() {
  const { t } = useLanguage()
  const [counts, setCounts] = useState<{ questions: number | null; contents: number | null }>({
    questions: null,
    contents: null,
  })

  useEffect(() => {
    const supabase = createClient()

    Promise.all([
      supabase.from("questions").select("id", { count: "exact", head: true }),
      supabase.from("content").select("id", { count: "exact", head: true }),
    ])
      .then(([questions, contents]) =>
        setCounts({ questions: questions.count ?? 0, contents: contents.count ?? 0 }),
      )
      .catch(() => setCounts({ questions: 0, contents: 0 }))
  }, [])

  const stats = [
    { icon: BookMarked, value: counts.questions, label: t("statQuestions") },
    { icon: FileText, value: counts.contents, label: t("statContents") },
    { icon: Layers, value: SPECIALTIES.length, label: t("statSpecialties") },
    { icon: Languages, value: 3, label: t("statLanguages") },
  ]

  return (
    <motion.dl variants={stagger} {...inView} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div key={index} variants={fadeUp} className="bg-surface p-6">
            <Icon className="mb-3 h-5 w-5 text-brand" aria-hidden />
            <dd className="text-3xl font-bold leading-none">
              <Counter value={stat.value} />
            </dd>
            <dt className="mt-2 text-sm text-muted-foreground">{stat.label}</dt>
          </motion.div>
        )
      })}
    </motion.dl>
  )
}
