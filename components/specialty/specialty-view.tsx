"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Clock,
  Download,
  ExternalLink,
  Star,
  Users,
  GraduationCap,
  FileText,
  ShieldCheck,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DownloadButton } from "@/components/download-button"
import ActivityDetailsModal from "@/app/components/activity-details-modal"
import { useLanguage } from "@/lib/language-context"
import { list, text } from "@/lib/i18n-content"
import { fadeUp, inView, stagger, staggerFast } from "@/lib/motion"
import type { Specialty } from "@/lib/specialties"
import type { Activity, Citation, Resource, SpecialtyData, Strategy } from "./types"

/**
 * Apresentação única para todas as especialidades.
 *
 * Antes eram cinco arquivos de ~700 linhas com o mesmo layout copiado e
 * pequenas divergências entre eles. Agora o conteúdo entra por `data` e a
 * aparência vive num lugar só — é isso que faz as seções parecerem parte do
 * mesmo site.
 *
 * A cor vem do `data-specialty` no contêiner: tudo aqui usa `brand`, que
 * resolve para o acento da especialidade ativa.
 */
/**
 * Selo de nível de evidência.
 *
 * Substitui a barra de "eficácia %" que existia antes — aqueles percentuais
 * (85 a 98%) eram inventados. O nível vem da classificação do NCAEP e pode
 * ser conferido na fonte listada logo abaixo, no próprio card.
 */
function EvidenceBadge({ level }: { level: NonNullable<Strategy["evidence"]> }) {
  const map = {
    established: { key: "evidenceEstablished", tone: "bg-success/15 text-success border-success/30" },
    emerging: { key: "evidenceEmerging", tone: "bg-warning/15 text-warning border-warning/30" },
    insufficient: { key: "evidenceInsufficient", tone: "bg-muted text-muted-foreground border-border" },
  } as const
  const { t } = useLanguage()
  const item = map[level]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium ${item.tone}`}
    >
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
      {t(item.key)}
    </span>
  )
}

/** Fontes com link. Sem link, a afirmação não é verificável — então não entra. */
function Sources({ citations }: { citations: Citation[] }) {
  const { t } = useLanguage()

  return (
    <div className="border-t border-border pt-3">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("sources")}</p>
      <ul className="space-y-1">
        {citations.map((citation, index) => (
          <li key={index}>
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-brand"
            >
              {citation.label}
              <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SpecialtyView({
  specialty,
  data,
  title,
  intro,
}: {
  specialty: Specialty
  data: SpecialtyData
  title: string
  intro: string
}) {
  const { t, language } = useLanguage()
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const Icon = specialty.icon
  const totalResources = data.strategies.length + data.activities.length + data.resources.length

  const difficultyTone = (level: string) => {
    if (level === t("basic")) return "bg-success/15 text-success border-success/30"
    if (level === t("advanced")) return "bg-destructive/15 text-destructive border-destructive/30"
    return "bg-warning/15 text-warning border-warning/30"
  }

  /** Comportamento legado: gera um .txt do texto-placeholder. Só sobrevive
   *  nas áreas ainda não migradas; materiais com `url` viram link real. */
  const handleDownload = (resource: Resource) => {
    const blob = new Blob([resource.content ?? ""], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${text(resource.title, language).toLowerCase().replace(/\s+/g, "-")}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  /**
   * Antes daqui saía um passo a passo genérico — os MESMOS seis passos para
   * qualquer atividade, de qualquer especialidade. Agora o detalhamento vem
   * da própria atividade; se ela não tiver, o modal simplesmente não mostra
   * a seção, em vez de inventar conteúdo.
   */
  const handleViewDetails = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsModalOpen(true)
  }

  return (
    <div data-specialty={specialty.accent}>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="accent-glow absolute inset-0" aria-hidden />
        <div className="container relative z-10 py-16 md:py-20">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-brand-contrast shadow-md">
                <Icon className="h-7 w-7" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
                {t("specialty")}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              {title}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              {intro}
            </motion.p>

            <motion.dl variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              {[
                { value: totalResources, label: t("resourcesAvailable") },
                { value: data.strategies.length, label: t("strategiesLabel") },
                { value: data.courses.length, label: t("educationalCourses") },
              ].map((stat, statIndex) => (
                <div key={statIndex} className="rounded-xl border border-border bg-surface px-4 py-3 shadow-sm">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-bold text-brand">{stat.value}</dd>
                  <dd className="text-xs text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Abas */}
      <div className="container py-12">
        <Tabs defaultValue="strategies" className="w-full">
          <TabsList className="mb-8 grid h-auto w-full grid-cols-2 gap-1 rounded-xl border border-border bg-surface-2 p-1 md:grid-cols-4">
            {[
              { value: "strategies", label: t("strategiesLabel"), icon: Star },
              { value: "activities", label: t("practicalActivities"), icon: BookOpen },
              { value: "courses", label: t("educationalCourses"), icon: GraduationCap },
              { value: "resources", label: t("materials"), icon: FileText },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="gap-2 rounded-lg py-2.5 text-sm data-[state=active]:bg-brand data-[state=active]:text-brand-contrast data-[state=active]:shadow-sm"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/*
            `forceMount` nas quatro abas: sem ele o Radix monta só o painel
            ativo, e três quartos do conteúdo verificado — atividades, cursos e
            materiais — não existiam no HTML entregue pelo servidor. Quem
            indexa o site via apenas as estratégias; o resto só aparecia depois
            de um clique que robô nenhum dá.

            Montado, o painel inativo continua com o atributo `hidden`, então
            leitor de tela e navegação por teclado seguem enxergando uma aba de
            cada vez. O que muda é só o que está presente no documento.

            Isto não vale para as abas de formulário (login/cadastro em /auth,
            e /contribuir): ali montar tudo duplicaria campos no DOM.
          */}

          {/* ------------------------------------------------------ Estratégias */}
          <TabsContent value="strategies" forceMount>
            <motion.div
              variants={stagger}
              {...inView}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {data.strategies.map((strategy, index) => (
                <motion.div key={index} variants={fadeUp}>
                  <Card className="surface-card group h-full overflow-hidden">
                    {/* Fio da cor da especialidade no topo do card */}
                    <div className="h-1 w-full bg-brand" aria-hidden />
                    <CardHeader className="gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold leading-snug">{text(strategy.title, language)}</h3>
                        <Badge variant="outline" className={`shrink-0 ${difficultyTone(text(strategy.difficulty, language))}`}>
                          {text(strategy.difficulty, language)}
                        </Badge>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text(strategy.description, language)}</p>

                      {strategy.evidence ? (
                        <div className="pt-1">
                          <EvidenceBadge level={strategy.evidence} />
                        </div>
                      ) : (
                        // Área ainda não migrada: exibe o percentual legado.
                        strategy.effectiveness !== undefined && (
                          <div className="pt-1">
                            <div className="mb-1.5 flex items-baseline justify-between text-xs">
                              <span className="text-muted-foreground">{t("efficacious")}</span>
                              <span className="font-semibold text-brand">{strategy.effectiveness}%</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
                              <motion.div
                                className="h-full rounded-full bg-brand"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${strategy.effectiveness}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {list(strategy.tips, language).map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex gap-2.5 text-sm leading-relaxed">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                      {strategy.citations?.length ? (
                        <Sources citations={strategy.citations} />
                      ) : strategy.source ? (
                        <p className="border-t border-border pt-3 text-xs italic text-muted-foreground">
                          {strategy.source}
                        </p>
                      ) : null}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* ------------------------------------------------------- Atividades */}
          <TabsContent value="activities" forceMount>
            <motion.div variants={stagger} {...inView} className="grid gap-6 md:grid-cols-2">
              {data.activities.map((activity, index) => (
                <motion.div key={index} variants={fadeUp}>
                  <Card className="surface-card flex h-full flex-col">
                    <CardHeader className="gap-3">
                      <h3 className="text-lg font-semibold leading-snug">{text(activity.name, language)}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="border-brand/40 text-brand">
                          {text(activity.age, language)}
                        </Badge>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4" aria-hidden />
                          {text(activity.duration, language)}
                        </span>
                        {activity.rating !== undefined && (
                          <span className="inline-flex items-center gap-1.5">
                            <Star className="h-4 w-4 fill-warning text-warning" aria-hidden />
                            {activity.rating}
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text(activity.description, language)}</p>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col gap-4">
                      <div>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {t("materials")}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {list(activity.materials, language).map((material, materialIndex) => (
                            <Badge key={materialIndex} variant="outline" className="text-xs font-normal">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {t("objectives")}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {list(activity.objectives, language).map((objective, objectiveIndex) => (
                            <span key={objectiveIndex} className="accent-soft rounded-md px-2 py-1 text-xs font-medium">
                              {objective}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {t("implementation")}
                        </h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">{text(activity.implementation, language)}</p>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                        {activity.downloads !== undefined && (
                          <span className="text-xs text-muted-foreground">
                            {activity.downloads.toLocaleString("pt-BR")} {t("downloads")}
                          </span>
                        )}
                        {activity.downloadFile ? (
                          <DownloadButton fileBaseName={activity.downloadFile} label={t("download")} />
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(activity)}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            {t("viewDetails")}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* ----------------------------------------------------------- Cursos */}
          <TabsContent value="courses" forceMount>
            <motion.div variants={stagger} {...inView} className="grid gap-6 md:grid-cols-2">
              {data.courses.map((course, index) => (
                <motion.div key={index} variants={fadeUp}>
                  <Card className="surface-card flex h-full flex-col">
                    <CardHeader className="gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold leading-snug">{text(course.title, language)}</h3>
                        {course.certificate && (
                          <Badge variant="outline" className="shrink-0 border-brand/40 text-brand">
                            {t("certificate")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium text-brand">{course.provider}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4" aria-hidden />
                          {text(course.duration, language)}
                        </span>
                        {course.modules !== undefined && (
                          <span className="inline-flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4" aria-hidden />
                            {course.modules} {t("modules")}
                          </span>
                        )}
                        <Badge variant="outline" className="text-xs font-normal">
                          {text(course.level, language)}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="mt-auto space-y-4">
                      <div className="flex items-end justify-between gap-3 border-t border-border pt-4">
                        <div className="text-sm">
                          {course.rating !== undefined && (
                            <span className="inline-flex items-center gap-1.5 font-medium">
                              <Star className="h-4 w-4 fill-warning text-warning" aria-hidden />
                              {course.rating}
                            </span>
                          )}
                          {course.students !== undefined && (
                            <span className="ml-2 inline-flex items-center gap-1 text-muted-foreground">
                              <Users className="h-3.5 w-3.5" aria-hidden />
                              {course.students.toLocaleString("pt-BR")}
                            </span>
                          )}
                        </div>
                        <span className="text-xl font-bold text-brand">{text(course.price, language)}</span>
                      </div>
                      <Button
                        className="w-full bg-brand text-brand-contrast hover:bg-brand/90"
                        onClick={() => window.open(course.url, "_blank", "noopener,noreferrer")}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {t("accessCourse")}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* -------------------------------------------------------- Materiais */}
          <TabsContent value="resources" forceMount>
            <motion.div variants={staggerFast} {...inView} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.resources.map((resource, index) => (
                <motion.div key={index} variants={fadeUp}>
                  <Card
                    className={`surface-card flex h-full flex-col ${
                      resource.featured ? "ring-1 ring-brand/40" : ""
                    }`}
                  >
                    <CardHeader className="gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold leading-snug">{text(resource.title, language)}</h3>
                        {resource.featured && (
                          <Badge className="shrink-0 bg-brand text-brand-contrast">{t("highlight")}</Badge>
                        )}
                      </div>
                      <span className="accent-soft w-fit rounded-md px-2 py-1 text-xs font-medium">
                        {text(resource.type, language)}
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text(resource.description, language)}</p>
                    </CardHeader>
                    <CardContent className="mt-auto space-y-3">
                      {resource.publisher && (
                        <p className="text-xs text-muted-foreground">
                          {t("publishedBy")}: <span className="font-medium">{resource.publisher}</span>
                          {resource.language && ` · ${resource.language.toUpperCase()}`}
                          {resource.format && ` · ${resource.format}`}
                        </p>
                      )}
                      {resource.url ? (
                        // Material real: abre na origem. O site não promete um
                        // arquivo que não tem.
                        <Button asChild variant="outline" className="w-full">
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {t("openMaterial")}
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" onClick={() => handleDownload(resource)}>
                          <Download className="mr-2 h-4 w-4" />
                          {t("downloadFree")}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <ActivityDetailsModal activity={selectedActivity} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
