"use client"

import { LocaleLink as Link } from "@/components/locale-link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  ChevronDown,
  FileText,
  GraduationCap,
  Lightbulb,
  Pencil,
  Star,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/app/components/header"
import { HeroVisual } from "@/components/brand/hero-visual"
import { LogoMark } from "@/components/brand/logo"
import { LiveStats } from "@/components/home/live-stats"
import { useLanguage } from "@/lib/language-context"
import { SPECIALTIES } from "@/lib/specialties"
import { fadeUp, inView, stagger } from "@/lib/motion"

export default function HomePage() {
  const { t } = useLanguage()

  /** O que existe dentro de cada especialidade — as 4 abas de toda seção. */
  const insideSpecialty = [
    { icon: Star, title: t("strategiesLabel"), description: t("insideStrategiesDesc") },
    { icon: BookOpen, title: t("practicalActivities"), description: t("insideActivitiesDesc") },
    { icon: GraduationCap, title: t("educationalCourses"), description: t("insideCoursesDesc") },
    { icon: FileText, title: t("materials"), description: t("insideMaterialsDesc") },
  ]

  const destinations = [
    { href: "/questoes", icon: BookMarked, title: t("adaptedQuestions"), description: t("questionsBankDesc") },
    { href: "/conteudos", icon: BookOpen, title: t("pedagogicalContent"), description: t("contentDesc") },
    { href: "/contribuir", icon: Pencil, title: t("contribute"), description: t("shareWithCommunity") },
  ]

  const pillars = [
    { icon: BookOpen, title: t("researchBased"), description: t("researchDesc") },
    { icon: Users, title: t("realExperience"), description: t("experienceDesc") },
    { icon: Lightbulb, title: t("practicalResources"), description: t("practicalDesc") },
    { icon: GraduationCap, title: t("inclusiveEducation"), description: t("inclusiveDesc") },
  ]

  const faq = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ]

  return (
    <>
      <Header />

      <main id="conteudo">
        {/* ---------------------------------------------------------- Abertura */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="accent-glow absolute inset-0" aria-hidden />
          <div className="container relative z-10 py-16 md:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.div variants={fadeUp} className="mb-7 flex items-center gap-3">
                  <LogoMark className="h-12 w-12 text-foreground" />
                  <span className="text-2xl font-bold tracking-tight">
                    Atypical<span className="text-brand">Class</span>
                  </span>
                </motion.div>

                <motion.span
                  variants={fadeUp}
                  className="accent-soft inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium"
                >
                  {t("platformSubtitle")}
                </motion.span>

                <motion.h1
                  variants={fadeUp}
                  className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl"
                >
                  {t("heroHeadline")}
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
                >
                  {t("platformDescription")}
                </motion.p>

                <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="/questoes">
                      <BookMarked className="mr-2 h-5 w-5" />
                      {t("adaptedQuestions")}
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/conteudos">
                      <BookOpen className="mr-2 h-5 w-5" />
                      {t("pedagogicalContent")}
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="hidden text-foreground lg:block"
              >
                <HeroVisual className="h-auto w-full" />
              </motion.div>
            </div>

            <div className="mt-16">
              <LiveStats />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- Especialidades */}
        <section className="container py-20">
          <motion.div variants={stagger} {...inView} className="mx-auto mb-12 max-w-2xl text-center">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold md:text-4xl">
              {t("specializationAreas")}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-pretty">
              {t("specializationDesc")}
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} {...inView} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALTIES.map((specialty) => {
              const Icon = specialty.icon
              return (
                <motion.div key={specialty.slug} variants={fadeUp} data-specialty={specialty.accent}>
                  <Link
                    href={`/${specialty.slug}`}
                    className="surface-card group flex h-full flex-col overflow-hidden rounded-lg focus-visible:outline-none"
                  >
                    <span className="h-1.5 w-full bg-brand" aria-hidden />
                    <span className="flex flex-1 flex-col p-6">
                      <span className="accent-soft mb-5 flex h-12 w-12 items-center justify-center rounded-xl">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="text-xl font-semibold">{t(specialty.nameKey)}</span>
                      <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                        {t(specialty.descriptionKey)}
                      </span>
                      <span className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <span className="text-sm text-muted-foreground">
                          <span className="font-semibold text-brand">{specialty.resourceCount}</span>{" "}
                          {t("availableResources")}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                          {t("viewDetails")}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </span>
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* ------------------------------------ O que existe em cada especialidade */}
        <section className="border-y border-border bg-surface-2/50">
          <div className="container py-20">
            <motion.div variants={stagger} {...inView} className="mx-auto mb-12 max-w-2xl text-center">
              <motion.h2 variants={fadeUp} className="text-3xl font-bold md:text-4xl">
                {t("insideSpecialty")}
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-pretty">
                {t("insideSpecialtyDesc")}
              </motion.p>
            </motion.div>

            <motion.ol variants={stagger} {...inView} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {insideSpecialty.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.li key={index} variants={fadeUp} className="surface-card rounded-lg p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="accent-soft flex h-10 w-10 items-center justify-center rounded-lg">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-2xl font-bold text-border-strong" aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {item.description}
                    </p>
                  </motion.li>
                )
              })}
            </motion.ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- Destinos */}
        <section className="container py-20">
          <motion.div variants={stagger} {...inView} className="grid gap-6 md:grid-cols-3">
            {destinations.map((destination) => {
              const Icon = destination.icon
              return (
                <motion.div key={destination.href} variants={fadeUp}>
                  <Link
                    href={destination.href}
                    className="surface-card group flex h-full flex-col rounded-lg p-6 focus-visible:outline-none"
                  >
                    <Icon className="mb-4 h-7 w-7 text-brand" />
                    <span className="text-lg font-semibold">{destination.title}</span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {destination.description}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
                      {t("accessNow")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* ------------------------------------------------------------ Pilares */}
        <section className="border-t border-border">
          <div className="container py-20">
            <motion.h2 variants={fadeUp} {...inView} className="mb-12 text-center text-3xl font-bold md:text-4xl">
              {t("whyTitle")}
            </motion.h2>
            <motion.div variants={stagger} {...inView} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <motion.div key={index} variants={fadeUp}>
                    <Icon className="mb-4 h-6 w-6 text-brand" aria-hidden />
                    <h3 className="text-base font-semibold">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {pillar.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- FAQ */}
        <section className="border-t border-border bg-surface-2/50">
          <div className="container py-20">
            <motion.h2 variants={fadeUp} {...inView} className="mb-10 text-center text-3xl font-bold md:text-4xl">
              {t("faqTitle")}
            </motion.h2>
            <motion.div variants={stagger} {...inView} className="mx-auto max-w-3xl space-y-3">
              {faq.map((item, index) => (
                <motion.details
                  key={index}
                  variants={fadeUp}
                  className="surface-card group rounded-lg [&_svg]:open:rotate-180"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium marker:hidden">
                    {item.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform" aria-hidden />
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground text-pretty">{item.a}</p>
                </motion.details>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ------------------------------------------------------- Chamada final */}
        <section className="container py-20">
          <motion.div
            variants={fadeUp}
            {...inView}
            className="surface-card relative overflow-hidden rounded-2xl px-8 py-14 text-center"
          >
            <div className="accent-glow absolute inset-0" aria-hidden />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold md:text-4xl">{t("teacherCommunity")}</h2>
              <p className="mt-4 text-muted-foreground text-pretty">{t("shareWithCommunity")}</p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/contribuir">
                  <Pencil className="mr-2 h-5 w-5" />
                  {t("contribute")}
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  )
}
