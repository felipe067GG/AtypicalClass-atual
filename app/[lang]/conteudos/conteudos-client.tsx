"use client"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  BookOpen,
  FileText,
  AlertCircle,
  Clock,
  Users,
  Video,
  ExternalLink,
  GraduationCap,
} from "lucide-react"
import Header from "@/app/components/header"
import { useLanguage } from "@/lib/language-context"
import { localizedField } from "@/lib/localized"
import { staggerDelay } from "@/lib/motion"
import { text } from "@/lib/i18n-content"
import { exigenciaDe } from "@/lib/conteudos/exigencias"
import type { CelulaDeConteudo } from "@/lib/conteudos/matriz"

/** O que o professor contribui pelo site. Continua na tabela `content`. */
export interface Content {
  id: string
  title: string
  subject: string
  specialty: string
  content_type: string
  description: string
  content_text: string
  content_text_en: string | null
  content_text_es: string | null
  tags: string[]
  source: string
  created_at: string
}

/**
 * Uma linha da tabela `conteudos` — a biblioteca curricular.
 *
 * Os campos JSONB chegam como objeto já desserializado pelo cliente do Supabase.
 * Note o que **não** existe aqui: coluna de especialidade. O conteúdo declara o
 * que exige, e a orientação por aluno vem da matriz, no código.
 */
export interface ConteudoRow {
  id: string
  materia: string
  etapa: "EF1" | "EF2" | "EM"
  ano: string
  titulo: string
  descricao: string
  bncc: string[]
  exigencias: string[]
  plano: {
    objetivo: string
    duracao: number
    materiais: string[]
    etapas: { minutos: number; titulo: string; comoFazer: string }[]
    comoAvaliar: string
    errosComuns: string[]
  }
  fontes: { label: string; url: string }[]
  videos: {
    url: string
    titulo: string
    canal: string
    duracaoSegundos: number
    paraEspecialidade?: string
    recursoDeAcessibilidade?: string
  }[]
  notas: { especialidade: string; texto: string }[]
}

/**
 * Só um enfeite: a lista de matérias vem dos dados, o emoji é opcional.
 * A lista fixa que existia aqui não incluía "Ciências", então esses conteúdos
 * ficavam inalcançáveis pelo filtro.
 */
const SUBJECT_ICONS: Record<string, string> = {
  Português: "📖",
  Matemática: "🔢",
  História: "🏛️",
  Geografia: "🌍",
  Ciências: "🔬",
  Biologia: "🧬",
  Física: "⚡",
  Química: "⚗️",
  Inglês: "🇬🇧",
  Espanhol: "🇪🇸",
  Literatura: "📚",
  Filosofia: "🤔",
  Sociologia: "👥",
  Artes: "🎨",
}

function duracaoLegivel(segundos: number) {
  const m = Math.round(segundos / 60)
  return m >= 60 ? `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}` : `${m} min`
}

/**
 * Só a interação vive no cliente. Os conteúdos chegam prontos do servidor
 * (veja `page.tsx`), então não há estado de carregamento aqui: o primeiro
 * render — inclusive o do servidor — já mostra a biblioteca inteira.
 */
export default function ConteudosClient({
  conteudos,
  contents,
  especialidades,
  celulas,
  especialidadeEscolhida,
  loadError,
}: {
  conteudos: ConteudoRow[]
  contents: Content[]
  especialidades: { slug: string; nameKey: string }[]
  celulas: CelulaDeConteudo[]
  especialidadeEscolhida: string
  loadError: boolean
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selected, setSelected] = useState<ConteudoRow | null>(null)
  const { t, language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // A especialidade vive na URL, e não no estado: assim o professor manda o
  // endereço ao colega e ele abre com o mesmo aluno escolhido — mesma decisão
  // dos filtros de `/questoes`.
  const escolherEspecialidade = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) params.set("especialidade", slug)
    else params.delete("especialidade")
    router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname)
  }

  /**
   * As células que dizem algo sobre **este** conteúdo.
   *
   * O cruzamento é pela exigência: a matriz fala de "leitura extensa para o
   * aluno com dislexia", e o conteúdo declara que exige leitura extensa. Sem
   * especialidade escolhida a lista chega vazia do servidor, e a seção não
   * aparece — orientação sem aluno escolhido é o conselho genérico de novo.
   */
  const orientacoesDe = (c: ConteudoRow) =>
    celulas.filter((celula) => c.exigencias.includes(celula.exigencia))

  const subjects = useMemo(
    () =>
      Array.from(new Set(conteudos.map((c) => c.materia).filter(Boolean))).sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [conteudos],
  )

  const busca = searchTerm.toLowerCase()
  const filtrados = conteudos.filter((c) => {
    const casaBusca =
      !busca ||
      c.titulo.toLowerCase().includes(busca) ||
      c.descricao.toLowerCase().includes(busca) ||
      c.ano.toLowerCase().includes(busca) ||
      c.bncc.some((b) => b.toLowerCase().includes(busca)) ||
      c.exigencias.some((e) => text(exigenciaDe(e)?.nome, language).toLowerCase().includes(busca))
    const casaMateria = selectedSubject === "all" || c.materia === selectedSubject
    return casaBusca && casaMateria
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main id="conteudo" className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center accent-soft rounded-full px-6 py-2 mb-4">
            <BookOpen className="w-5 h-5 mr-2 text-brand" />
            <span className="text-brand">{t("contentLibrary")}</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{t("educationalContent")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("contentDesc")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder={t("searchContent")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-surface border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["all", ...subjects].map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                onClick={() => setSelectedSubject(subject)}
                className={
                  selectedSubject === subject
                    ? "bg-primary hover:bg-primary/90"
                    : "border-border text-muted-foreground hover:bg-surface-2"
                }
              >
                {subject === "all" ? `📚 ${t("all")}` : `${SUBJECT_ICONS[subject] ?? "📘"} ${subject}`}
              </Button>
            ))}
          </div>

          {/* Escolher o aluno não filtra a biblioteca — todo conteúdo continua
              à vista. O que muda é o que o plano de aula passa a dizer. */}
          <div className="max-w-sm">
            <label className="text-sm text-muted-foreground mb-2 block">{t("chooseSpecialty")}</label>
            <Select
              value={especialidadeEscolhida || "all"}
              onValueChange={(v) => escolherEspecialidade(v === "all" ? "" : v)}
            >
              <SelectTrigger className="bg-surface-2 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-surface-2 border-border">
                <SelectItem value="all">{t("all")}</SelectItem>
                {especialidades.map((e) => (
                  <SelectItem key={e.slug} value={e.slug}>
                    {t(e.nameKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {loadError && (
          <Card className="bg-destructive/10 border-destructive/40 mb-8">
            <CardContent className="py-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
              <p className="text-destructive">{t("loadError")}</p>
            </CardContent>
          </Card>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-4"
        >
          <p className="text-muted-foreground">
            {t("showing")} <span className="text-brand font-semibold">{filtrados.length}</span> {t("contents")}
          </p>
        </motion.div>

        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-surface border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-3xl text-foreground mb-2">{selected.titulo}</CardTitle>
                    <CardDescription className="text-muted-foreground text-lg">{selected.descricao}</CardDescription>
                  </div>
                  <Button variant="ghost" onClick={() => setSelected(null)} className="text-muted-foreground">
                    ✕
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary">
                    {SUBJECT_ICONS[selected.materia] ?? "📘"} {selected.materia}
                  </Badge>
                  <Badge className="bg-brand">{selected.ano}</Badge>
                  {selected.bncc.map((codigo) => (
                    <Badge key={codigo} variant="outline" className="border-border text-muted-foreground font-mono">
                      {codigo}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* O que o conteúdo exige — é isto que move a matriz de adaptação. */}
                <section>
                  <h2 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    {t("requiresOfStudent")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selected.exigencias.map((id) => (
                      <Badge key={id} className="bg-success">
                        {text(exigenciaDe(id)?.nome, language) || id}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section className="bg-surface-2 p-6 rounded-lg space-y-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl font-semibold">{t("lessonPlan")}</h2>
                    <span className="inline-flex items-center text-muted-foreground text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {selected.plano.duracao} {t("minutesShort")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-1">{t("objective")}</h3>
                    <p className="text-foreground">{selected.plano.objetivo}</p>
                  </div>

                  {selected.plano.materiais.length > 0 && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-1">{t("materials")}</h3>
                      <ul className="list-disc list-inside text-foreground space-y-1">
                        {selected.plano.materiais.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-2">{t("steps")}</h3>
                    <ol className="space-y-3">
                      {selected.plano.etapas.map((etapa, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="shrink-0 text-brand font-mono text-sm pt-1">{etapa.minutos}′</span>
                          <div>
                            <p className="font-medium text-foreground">{etapa.titulo}</p>
                            <p className="text-muted-foreground text-sm">{etapa.comoFazer}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-1">{t("howToAssess")}</h3>
                    <p className="text-foreground">{selected.plano.comoAvaliar}</p>
                  </div>

                  {selected.plano.errosComuns.length > 0 && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-1">
                        {t("commonErrors")}
                      </h3>
                      <ul className="list-disc list-inside text-foreground space-y-1">
                        {selected.plano.errosComuns.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>

                {/* O que muda para o aluno escolhido. Vem da matriz de 98
                    células, cruzada pela exigência — e não por uma coluna de
                    especialidade no conteúdo, que é o que produzia texto
                    genérico no acervo antigo. */}
                {especialidadeEscolhida && orientacoesDe(selected).length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="w-4 h-4 text-brand" />
                      <h2 className="text-sm uppercase tracking-wide text-muted-foreground">
                        {t("forThisStudent")}:{" "}
                        {t(especialidades.find((e) => e.slug === especialidadeEscolhida)?.nameKey ?? "")}
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {orientacoesDe(selected).map((celula) => (
                        <div key={celula.exigencia} className="bg-surface-2 p-4 rounded-lg space-y-3">
                          <Badge className="bg-success">
                            {text(exigenciaDe(celula.exigencia)?.nome, language) || celula.exigencia}
                          </Badge>

                          <div>
                            <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                              {t("whatItMeans")}
                            </h3>
                            <p className="text-foreground">{text(celula.oQueSignifica, language)}</p>
                          </div>

                          <div>
                            <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                              {t("whatToDo")}
                            </h3>
                            <p className="text-foreground">{text(celula.oQueFazer, language)}</p>
                          </div>

                          {/* Formação do professor para esta célula. É outro
                              papel do vídeo: o de cima é aula acessível ao
                              aluno, este é sobre como ensinar. */}
                          {celula.videoFormativo && (
                            <a
                              href={celula.videoFormativo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-3 p-3 rounded-lg bg-surface hover:bg-surface/70 transition-colors"
                            >
                              <Video className="w-4 h-4 mt-1 shrink-0 text-brand" />
                              <span className="flex-1">
                                <span className="block text-xs uppercase tracking-wide text-muted-foreground mb-1">
                                  {t("teacherTraining")}
                                </span>
                                <span className="block text-foreground">{celula.videoFormativo.titulo}</span>
                                <span className="block text-muted-foreground text-sm">
                                  {celula.videoFormativo.canal} ·{" "}
                                  {duracaoLegivel(celula.videoFormativo.duracaoSegundos)}
                                </span>
                                <span className="block text-muted-foreground text-sm mt-1 italic">
                                  {celula.videoFormativo.porQue}
                                </span>
                              </span>
                            </a>
                          )}

                          <ul className="flex flex-wrap gap-x-4 gap-y-1">
                            {celula.citations.map((citacao) => (
                              <li key={citacao.url}>
                                <a
                                  href={citacao.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-brand text-sm hover:underline"
                                >
                                  {citacao.label}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Vídeo só chega aqui depois de alguém ter assistido: o banco
                    recusa linha com vídeo não revisado. */}
                {selected.videos.length > 0 && (
                  <section>
                    <h2 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">{t("videosLabel")}</h2>
                    <ul className="space-y-2">
                      {selected.videos.map((v) => (
                        <li key={v.url}>
                          <a
                            href={v.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 p-3 rounded-lg bg-surface-2 hover:bg-surface-2/70 transition-colors"
                          >
                            <Video className="w-4 h-4 mt-1 shrink-0 text-brand" />
                            <span className="flex-1">
                              <span className="block text-foreground">{v.titulo}</span>
                              <span className="block text-muted-foreground text-sm">
                                {v.canal} · {duracaoLegivel(v.duracaoSegundos)}
                                {v.recursoDeAcessibilidade ? ` · ${v.recursoDeAcessibilidade}` : ""}
                              </span>
                            </span>
                            {v.paraEspecialidade && <Badge className="bg-success shrink-0">{t("accessibleVideo")}</Badge>}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {selected.notas.length > 0 && (
                  <section>
                    <h2 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">{t("specificNotes")}</h2>
                    <ul className="space-y-3">
                      {selected.notas.map((n, i) => (
                        <li key={i} className="p-3 rounded-lg bg-surface-2">
                          <Badge className="bg-brand mb-2">{n.especialidade}</Badge>
                          <p className="text-foreground">{n.texto}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Nenhuma afirmação pedagógica entra sem endereço que o
                    `npm run check:links` consiga validar. */}
                <section>
                  <h2 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">{t("sources")}</h2>
                  <ul className="space-y-1">
                    {selected.fontes.map((f) => (
                      <li key={f.url}>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-brand hover:underline"
                        >
                          {f.label}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="flex justify-between pt-4 border-t border-border">
                  <Button
                    onClick={() => {
                      const i = filtrados.findIndex((c) => c.id === selected.id)
                      if (i > 0) setSelected(filtrados[i - 1])
                    }}
                    disabled={filtrados.findIndex((c) => c.id === selected.id) <= 0}
                    variant="outline"
                    className="border-border"
                  >
                    ← {t("previous")}
                  </Button>
                  <Button
                    onClick={() => {
                      const i = filtrados.findIndex((c) => c.id === selected.id)
                      if (i < filtrados.length - 1) setSelected(filtrados[i + 1])
                    }}
                    disabled={filtrados.findIndex((c) => c.id === selected.id) === filtrados.length - 1}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {t("next")} →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrados.map((c, index) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: staggerDelay(index), duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card
                  className="bg-surface border-border hover:border-brand/50 transition-all cursor-pointer h-full flex flex-col"
                  onClick={() => setSelected(c)}
                >
                  <CardHeader>
                    <div className="flex gap-2 flex-wrap mb-3">
                      <Badge className="bg-primary hover:bg-primary/90">
                        {SUBJECT_ICONS[c.materia] ?? "📘"} {c.materia}
                      </Badge>
                      <Badge className="bg-brand">{c.ano}</Badge>
                    </div>
                    <CardTitle className="text-foreground text-xl line-clamp-2">{c.titulo}</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm mt-2 line-clamp-3">
                      {c.descricao}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {c.exigencias.slice(0, 3).map((id) => (
                        <Badge key={id} variant="outline" className="border-border text-muted-foreground text-xs">
                          {text(exigenciaDe(id)?.nome, language) || id}
                        </Badge>
                      ))}
                      {c.exigencias.length > 3 && (
                        <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                          +{c.exigencias.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-xs mb-4">
                      <span className="inline-flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {c.plano.duracao} {t("minutesShort")}
                      </span>
                      {c.videos.length > 0 && (
                        <span className="inline-flex items-center">
                          <Video className="w-3 h-3 mr-1" />
                          {c.videos.length}
                        </span>
                      )}
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <FileText className="w-4 h-4 mr-2" />
                      {t("viewLessonPlan")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {filtrados.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Card className="bg-surface border-border">
              <CardContent className="py-12">
                <p className="text-muted-foreground text-lg">{t("noContentFound")}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* O que o professor contribuiu continua no site, com a procedência
            dita em voz alta — mesma decisão de `/questoes`. */}
        {!selected && contents.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-brand" />
              <h2 className="text-2xl font-bold">{t("fromCommunity")}</h2>
              <Badge variant="outline" className="border-border text-muted-foreground">
                {contents.length}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6">{t("communityTipsDesc")}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contents.map((c) => (
                <Card key={c.id} className="bg-surface border-border h-full">
                  <CardHeader>
                    <div className="flex gap-2 flex-wrap mb-3">
                      <Badge className="bg-primary">
                        {SUBJECT_ICONS[c.subject] ?? "📘"} {c.subject}
                      </Badge>
                      <Badge className="bg-brand">{c.specialty}</Badge>
                    </div>
                    <CardTitle className="text-foreground text-lg line-clamp-2">{c.title}</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm mt-2 line-clamp-4">
                      {localizedField(c, "content_text", language) || c.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
