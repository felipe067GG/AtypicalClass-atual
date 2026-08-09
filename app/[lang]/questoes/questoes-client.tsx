"use client"

import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Filter, CheckCircle, XCircle, AlertCircle, Info, EyeOff } from "lucide-react"
import Header from "@/app/components/header"
import { useLanguage } from "@/lib/language-context"
import { text } from "@/lib/i18n-content"
import { staggerDelay } from "@/lib/motion"
import type { Barreira, CelulaDaMatriz } from "@/lib/adaptacao"

export interface QuestaoDoAcervo {
  id: string
  acervo: "real" | "autoral" | "comunidade"
  exame: string
  ano: number
  numero: number
  materia: string
  enunciado: string
  /** Só o acervo da comunidade tem tradução: questão de prova fica no original. */
  enunciado_en?: string | null
  enunciado_es?: string | null
  alternativas: { letra: string; texto: string | null; imagem: string | null }[]
  resposta: string
  dificuldade_escala: number | null
  dificuldade_faixa: string | null
  bncc: string | null
  imagens: string[]
  imagens_em: "nenhuma" | "storage" | "externo"
  descricoes_de_figuras: string[]
  barreiras: string[]
  fonte: Record<string, unknown>
}

/**
 * O endereço público de uma imagem do acervo.
 *
 * As do vestibular foram rehospedadas no Storage e a linha guarda só o caminho;
 * as do ENEM continuam apontando para `enem.dev` e a linha guarda a URL inteira.
 * `imagens_em` diz qual é o caso, e é por isso que ele existe como coluna: sem
 * ele, distinguir um caminho de uma URL seria adivinhação por formato de string.
 */
function urlDaImagem(caminho: string, onde: QuestaoDoAcervo["imagens_em"]): string {
  if (onde === "externo" || /^https?:/.test(caminho)) return caminho
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/questoes/${caminho}`
}

/**
 * Só a interação vive no cliente. As questões chegam filtradas e paginadas do
 * servidor (veja `page.tsx`) — o acervo tem 3.775 questões e nunca caberia numa
 * resposta só, então os filtros são navegação, não estado local.
 */
export default function QuestoesClient({
  questoes,
  total,
  pagina,
  porPagina,
  materias,
  especialidades,
  barreiras,
  celulas,
  filtros,
  loadError,
}: {
  questoes: QuestaoDoAcervo[]
  total: number
  pagina: number
  porPagina: number
  materias: string[]
  especialidades: { slug: string; nameKey: string }[]
  barreiras: Barreira[]
  celulas: CelulaDaMatriz[]
  filtros: { acervo: string; materia: string; especialidade: string; busca: string }
  loadError: boolean
}) {
  const { t, language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selecionada, setSelecionada] = useState<QuestaoDoAcervo | null>(null)
  const [resposta, setResposta] = useState<string | null>(null)
  const [busca, setBusca] = useState(filtros.busca)

  /** Todo filtro é uma navegação, e mudar qualquer um volta para a página 1. */
  const navegar = (mudancas: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    for (const [chave, valor] of Object.entries(mudancas)) {
      if (valor) params.set(chave, valor)
      else params.delete(chave)
    }
    if (!("pagina" in mudancas)) params.delete("pagina")
    setSelecionada(null)
    setResposta(null)
    router.push(`${pathname}?${params.toString()}`)
  }

  const ultimaPagina = Math.max(1, Math.ceil(total / porPagina))
  const nomeDaBarreira = (id: string) => barreiras.find((b) => b.id === id)

  /**
   * O enunciado no idioma da tela, quando existe tradução.
   *
   * Só o acervo da comunidade tem: as questões de prova ficam em português
   * porque foi assim que foram aplicadas, e traduzi-las mudaria o que o
   * candidato leu. Um aviso no topo da lista diz isso ao visitante.
   */
  const enunciadoDe = (q: QuestaoDoAcervo) =>
    (language === "en" ? q.enunciado_en : language === "es" ? q.enunciado_es : null)?.trim() || q.enunciado

  /** As orientações escritas para esta questão: as células que casam com as barreiras dela. */
  const orientacoesDe = (questao: QuestaoDoAcervo) =>
    celulas.filter((celula) => questao.barreiras.includes(celula.barreira))

  const procedencia = (q: QuestaoDoAcervo) => {
    if (q.acervo === "comunidade") return q.exame || q.materia
    if (q.acervo === "autoral") return `${q.exame} · ${q.materia} nº ${q.numero}`
    return `${q.exame} ${q.ano} · questão ${q.numero}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main id="conteudo" className="container mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">{t("questionsBank")}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("questionsBankDesc")}</p>
          </div>

          {/* Os dois acervos, separados de verdade e não só por filtro. Questão
              escrita por nós nunca aparece na mesma lista que questão de prova. */}
          <div className="flex justify-center gap-2 mb-8">
            <Button
              variant={filtros.acervo === "real" ? "default" : "outline"}
              onClick={() => navegar({ acervo: "" })}
              className={filtros.acervo === "real" ? "bg-primary" : "border-border"}
            >
              {t("realExams")}
            </Button>
            <Button
              variant={filtros.acervo === "autoral" ? "default" : "outline"}
              onClick={() => navegar({ acervo: "autoral" })}
              className={filtros.acervo === "autoral" ? "bg-primary" : "border-border"}
            >
              {t("authoredQuestions")}
            </Button>
            <Button
              variant={filtros.acervo === "comunidade" ? "default" : "outline"}
              onClick={() => navegar({ acervo: "comunidade" })}
              className={filtros.acervo === "comunidade" ? "bg-primary" : "border-border"}
            >
              {t("communityQuestions")}
            </Button>
          </div>

          <Card className="bg-surface border-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-brand">
                <Filter className="w-5 h-5 mr-2" />
                {t("filters")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t("subject")}</label>
                  <Select value={filtros.materia || "all"} onValueChange={(v) => navegar({ materia: v === "all" ? "" : v })}>
                    <SelectTrigger className="bg-surface-2 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-surface-2 border-border">
                      <SelectItem value="all">{t("all")}</SelectItem>
                      {materias.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t("chooseSpecialty")}</label>
                  <Select
                    value={filtros.especialidade || "all"}
                    onValueChange={(v) => navegar({ especialidade: v === "all" ? "" : v })}
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
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  navegar({ busca })
                }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10 bg-surface-2 border-border"
                />
              </form>
            </CardContent>
          </Card>

          {loadError && (
            <Card className="bg-destructive/10 border-destructive/40 mb-8">
              <CardContent className="py-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                <p className="text-destructive">{t("loadError")}</p>
              </CardContent>
            </Card>
          )}

          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 text-muted-foreground">
            <span>
              {t("found")} <span className="text-brand font-semibold">{total}</span> {t("questionsLabel")}
            </span>
            {/* Só vale para as provas: o acervo da comunidade tem tradução. */}
            {filtros.acervo !== "comunidade" && <span className="text-sm">{t("originalLanguageNotice")}</span>}
          </div>

          {selecionada ? (
            <motion.div key={selecionada.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="bg-surface border-border">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-1">{procedencia(selecionada)}</CardTitle>
                      <CardDescription>{String(selecionada.fonte?.validacao ?? "")}</CardDescription>
                    </div>
                    <Button variant="ghost" onClick={() => setSelecionada(null)} className="text-muted-foreground">
                      ✕
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary">{selecionada.materia}</Badge>
                    {selecionada.dificuldade_escala ? (
                      <Badge className="bg-success">
                        {selecionada.dificuldade_faixa} · {selecionada.dificuldade_escala}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-border">
                        {t("noMeasuredDifficulty")}
                      </Badge>
                    )}
                    {selecionada.bncc && <Badge className="bg-brand">{selecionada.bncc}</Badge>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {selecionada.acervo === "autoral" && (
                    <p className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Info className="w-4 h-4 mt-0.5 shrink-0" />
                      {t("authoredNotice")}
                    </p>
                  )}

                  <div className="bg-surface-2 p-6 rounded-lg">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">{enunciadoDe(selecionada)}</p>
                  </div>

                  {selecionada.imagens.map((caminho, i) => (
                    <figure key={caminho} className="space-y-2">
                      {/* Imagem de acervo externo e de tamanho desconhecido; o
                          `next/image` exigiria dimensões que não temos. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={urlDaImagem(caminho, selecionada.imagens_em)}
                        alt={selecionada.descricoes_de_figuras[i] ?? ""}
                        className="max-w-full rounded-lg border border-border"
                      />
                      {selecionada.descricoes_de_figuras[i] ? (
                        <figcaption className="text-sm text-muted-foreground">
                          {selecionada.descricoes_de_figuras[i]}
                        </figcaption>
                      ) : (
                        // Sem audiodescrição, a questão não é difícil para quem
                        // não enxerga: é indisponível. Dizer isso ao professor
                        // vale mais que deixar a figura muda.
                        <figcaption className="flex items-center gap-2 text-sm text-warning">
                          <EyeOff className="w-4 h-4 shrink-0" />
                          {t("figureWithoutDescription")}
                        </figcaption>
                      )}
                    </figure>
                  ))}

                  <div className="space-y-3">
                    {selecionada.alternativas.map((alternativa) => {
                      const escolhida = resposta === alternativa.letra
                      const certa = alternativa.letra === selecionada.resposta
                      const mostrarCerta = resposta !== null && certa
                      const mostrarErrada = resposta !== null && escolhida && !certa

                      return (
                        <button
                          key={alternativa.letra}
                          onClick={() => resposta === null && setResposta(alternativa.letra)}
                          disabled={resposta !== null}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                            mostrarCerta
                              ? "border-success/40 bg-success/10"
                              : mostrarErrada
                                ? "border-destructive/40 bg-destructive/10"
                                : "border-border bg-surface-2"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-brand w-5 shrink-0">{alternativa.letra}</span>
                            <span className="flex-1">{alternativa.texto}</span>
                            {alternativa.imagem && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={urlDaImagem(alternativa.imagem, selecionada.imagens_em)}
                                alt=""
                                className="max-h-24 rounded"
                              />
                            )}
                            {mostrarCerta && <CheckCircle className="w-5 h-5 text-success shrink-0" />}
                            {mostrarErrada && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* O que os detectores mediram nesta questão. É dado, não
                      opinião, e por isso aparece com ou sem especialidade
                      escolhida. */}
                  {selecionada.barreiras.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">{t("measuredBarriers")}</h3>
                      <div className="flex flex-wrap gap-2">
                        {selecionada.barreiras.map((id) => (
                          <Badge key={id} variant="outline" className="border-border">
                            {text(nomeDaBarreira(id)?.nome, language) || id}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* E o que elas significam para o aluno escolhido. Isto é
                      afirmação pedagógica, e por isso vem com fonte. */}
                  {filtros.especialidade && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">
                        {t("howToAdaptFor")}{" "}
                        {t(especialidades.find((e) => e.slug === filtros.especialidade)?.nameKey ?? "")}
                      </h3>

                      {orientacoesDe(selecionada).length === 0 ? (
                        <p className="text-muted-foreground">{t("noGuidanceYet")}</p>
                      ) : (
                        orientacoesDe(selecionada).map((celula) => (
                          <div key={celula.barreira} className="bg-surface-2 p-4 rounded-lg space-y-3">
                            <Badge className="bg-brand">
                              {text(nomeDaBarreira(celula.barreira)?.nome, language) || celula.barreira}
                            </Badge>
                            <div>
                              <p className="text-sm font-semibold text-muted-foreground">{t("whatItMeans")}</p>
                              <p>{text(celula.oQueSignifica, language)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-muted-foreground">{t("whatToDo")}</p>
                              <p>{text(celula.oQueFazer, language)}</p>
                            </div>
                            <ul className="text-sm space-y-1">
                              {celula.citations.map((citacao) => (
                                <li key={citacao.url}>
                                  <a
                                    href={citacao.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand underline underline-offset-2"
                                  >
                                    {citacao.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {questoes.map((questao, i) => (
                  <motion.div
                    key={questao.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: staggerDelay(i), duration: 0.3 }}
                  >
                    <Card
                      className="bg-surface border-border hover:border-brand/50 transition-all cursor-pointer h-full flex flex-col"
                      onClick={() => {
                        setSelecionada(questao)
                        setResposta(null)
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{procedencia(questao)}</CardTitle>
                        <CardDescription className="line-clamp-3">{enunciadoDe(questao)}</CardDescription>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge className="bg-primary text-xs">{questao.materia}</Badge>
                          {questao.dificuldade_faixa && (
                            <Badge className="bg-success text-xs">{questao.dificuldade_faixa}</Badge>
                          )}
                          {questao.barreiras.length > 0 && (
                            <Badge variant="outline" className="text-xs border-border">
                              {questao.barreiras.length} {t("measuredBarriers").toLowerCase()}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <BookOpen className="w-4 h-4 mr-2" />
                          {t("answer")}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {questoes.length === 0 && (
                <Card className="bg-surface border-border">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground text-lg">{t("noQuestionsFound")}</p>
                  </CardContent>
                </Card>
              )}

              {ultimaPagina > 1 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <Button
                    variant="outline"
                    className="border-border"
                    disabled={pagina <= 1}
                    onClick={() => navegar({ pagina: String(pagina - 1) })}
                  >
                    ← {t("previous")}
                  </Button>
                  <span className="text-muted-foreground">
                    {t("pageLabel")} {pagina} / {ultimaPagina}
                  </span>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    disabled={pagina >= ultimaPagina}
                    onClick={() => navegar({ pagina: String(pagina + 1) })}
                  >
                    {t("next")} →
                  </Button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </main>
    </div>
  )
}
