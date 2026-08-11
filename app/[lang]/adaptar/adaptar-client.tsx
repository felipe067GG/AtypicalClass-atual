"use client"

import { useRef, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wand2, Ruler, AlertCircle, Copy, Check, Square } from "lucide-react"
import Header from "@/app/components/header"
import { useLanguage } from "@/lib/language-context"
import { text } from "@/lib/i18n-content"
import type { Barreira, CelulaDaMatriz } from "@/lib/adaptacao"

type Tipo = "questao" | "atividade"

interface Analise {
  barreiras: string[]
  semCelula: string[]
  relatorio: { medida: string; valor: number; percentil: number | null }[]
  medidas: { caracteres: number; palavras: number; palavrasPorFrase: number; numeros: number; alternativas: number }
}

interface SemAdaptacao {
  semAdaptacao: true
  barreiras: string[]
  relatorio: { medida: string; valor: number; percentil: number | null }[]
  semCelula: string[]
}

/** Nomes das medidas, para o relatório não sair em nome de variável. */
const NOME_DA_MEDIDA: Record<string, string> = {
  caracteres: "Tamanho do enunciado",
  palavrasPorFrase: "Palavras por frase",
  caracteresAlternativas: "Tamanho das alternativas",
  numeros: "Números a reter",
  densidadeVocabulario: "Palavras longas",
}

export default function AdaptarClient({
  especialidades,
  barreiras,
  celulas,
  especialidade,
}: {
  especialidades: { slug: string; nameKey: string }[]
  barreiras: Barreira[]
  celulas: CelulaDaMatriz[]
  especialidade: string
}) {
  const { t, language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [material, setMaterial] = useState("")
  const [tipo, setTipo] = useState<Tipo>("atividade")
  const [adaptando, setAdaptando] = useState(false)
  const [saida, setSaida] = useState("")
  const [analise, setAnalise] = useState<Analise | null>(null)
  const [semAdaptacao, setSemAdaptacao] = useState<SemAdaptacao | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [copiado, setCopiado] = useState(false)
  const abortar = useRef<AbortController | null>(null)

  const escolherAluno = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) params.set("especialidade", slug)
    else params.delete("especialidade")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const nomeDaBarreira = (id: string) => {
    const b = barreiras.find((x) => x.id === id)
    return b ? text(b.nome, language) : id
  }

  /** As células que respondem às barreiras que foram medidas neste material. */
  const celulasAplicadas = analise ? celulas.filter((c) => analise.barreiras.includes(c.barreira)) : []

  /** Fontes, sem repetir: várias células citam o mesmo guia. */
  const fontes = Array.from(
    new Map(celulasAplicadas.flatMap((c) => c.citations).map((c) => [c.url, c])).values(),
  )

  async function adaptar() {
    if (!especialidade || material.trim().length < 40 || adaptando) return
    setAdaptando(true)
    setSaida("")
    setErro(null)
    setAnalise(null)
    setSemAdaptacao(null)

    const controlador = new AbortController()
    abortar.current = controlador

    try {
      const resposta = await fetch("/api/adaptar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: material, tipo, especialidade, idioma: language }),
        signal: controlador.signal,
      })

      if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => null)
        setErro(corpo?.error ?? "Não foi possível adaptar agora.")
        return
      }

      // Nada de barreira: o servidor devolve a medida em vez de texto inventado.
      const tipoDoCorpo = resposta.headers.get("Content-Type") ?? ""
      if (tipoDoCorpo.includes("application/json")) {
        setSemAdaptacao(await resposta.json())
        return
      }

      const cabecalho = resposta.headers.get("X-Analise")
      if (cabecalho) setAnalise(JSON.parse(decodeURIComponent(cabecalho)))

      const leitor = resposta.body?.getReader()
      if (!leitor) return
      const decodificador = new TextDecoder()
      for (;;) {
        const { done, value } = await leitor.read()
        if (done) break
        setSaida((anterior) => anterior + decodificador.decode(value, { stream: true }))
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setErro("Não foi possível adaptar agora.")
    } finally {
      setAdaptando(false)
      abortar.current = null
    }
  }

  const copiar = async () => {
    await navigator.clipboard.writeText(saida)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main id="conteudo" className="container mx-auto max-w-5xl px-4 py-24">
        <header className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Adaptar meu material</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Cole a atividade ou a questão que você já usa, escolha o aluno, e receba aquilo adaptado. O material é
            seu — nada do que você colar é guardado.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. O material</CardTitle>
                <CardDescription>
                  Uma atividade ou uma questão por vez. Cole o texto como ele está na sua folha.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder={
                    "Cole aqui.\n\nExemplo: o enunciado de uma questão, com as alternativas em a) b) c), ou o comando de uma atividade dissertativa."
                  }
                  className="min-h-[220px] font-mono text-sm"
                  aria-label="Material a adaptar"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <Select value={tipo} onValueChange={(v) => setTipo(v as Tipo)}>
                    <SelectTrigger className="w-[190px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="atividade">É uma atividade</SelectItem>
                      <SelectItem value="questao">É uma questão</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">
                    {material.trim().length} caracteres
                    {material.trim().length > 12_000 ? " — acima do limite de 12.000" : ""}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. O aluno</CardTitle>
                <CardDescription>
                  A orientação muda por aluno. Sem escolher um, o que sai é conselho genérico — e é isso que este
                  site existe para não fazer.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Select value={especialidade} onValueChange={escolherAluno}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Escolha o aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {especialidades.map((e) => (
                      <SelectItem key={e.slug} value={e.slug}>
                        {t(e.nameKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={adaptar}
                  disabled={!especialidade || material.trim().length < 40 || adaptando}
                  className="gap-2"
                >
                  <Wand2 className="h-4 w-4" />
                  {adaptando ? "Adaptando…" : "Adaptar"}
                </Button>

                {adaptando ? (
                  <Button variant="ghost" size="sm" className="gap-2" onClick={() => abortar.current?.abort()}>
                    <Square className="h-3 w-3" />
                    Parar
                  </Button>
                ) : null}
              </CardContent>
            </Card>

            {erro ? (
              <Card className="border-destructive/40">
                <CardContent className="flex items-start gap-3 pt-6 text-sm">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span>{erro}</span>
                </CardContent>
              </Card>
            ) : null}

            {/* Nada disparou. Diz o que mediu, em vez de inventar adaptação. */}
            {semAdaptacao ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Ruler className="h-4 w-4" />
                    Medi, e não encontrei barreira neste material
                  </CardTitle>
                  <CardDescription>
                    Não é elogio nem defeito: quer dizer que nada aqui cruzou os limiares medidos em material de
                    escola. Adaptar mesmo assim seria inventar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-2 sm:grid-cols-2">
                    {semAdaptacao.relatorio.map((r) => (
                      <div key={r.medida} className="flex items-baseline justify-between gap-3 rounded-md border px-3 py-2">
                        <dt className="text-sm text-muted-foreground">{NOME_DA_MEDIDA[r.medida] ?? r.medida}</dt>
                        <dd className="text-sm font-medium">
                          {r.valor} <span className="text-muted-foreground">· p{r.percentil}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {semAdaptacao.semCelula.length ? (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Foram medidas estas barreiras, mas ainda não há orientação escrita para este aluno:{" "}
                      {semAdaptacao.semCelula.map(nomeDaBarreira).join(", ")}.
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}

            {saida ? (
              <Card>
                <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
                  <div>
                    <CardTitle className="text-lg">Proposta de adaptação</CardTitle>
                    <CardDescription>
                      É rascunho, não material pronto. Leia antes de levar para a sala — quem conhece o aluno é você.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 gap-2" onClick={copiar}>
                    {copiado ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiado ? "Copiado" : "Copiar"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{saida}</div>
                </CardContent>
              </Card>
            ) : null}
          </div>

          <aside className="space-y-6">
            {analise ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Ruler className="h-4 w-4" />O que foi medido
                  </CardTitle>
                  <CardDescription>Contagem, não opinião. É daqui que sai a orientação.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    {analise.medidas.caracteres} caracteres · {analise.medidas.palavrasPorFrase} palavras por frase ·{" "}
                    {analise.medidas.numeros} números
                    {analise.medidas.alternativas ? ` · ${analise.medidas.alternativas} alternativas` : ""}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analise.barreiras.map((b) => (
                      <Badge key={b} variant="secondary">
                        {nomeDaBarreira(b)}
                      </Badge>
                    ))}
                  </div>
                  {analise.semCelula.length ? (
                    <p className="text-muted-foreground">
                      Sem orientação escrita para este aluno: {analise.semCelula.map(nomeDaBarreira).join(", ")}.
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}

            {celulasAplicadas.length ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">A orientação aplicada</CardTitle>
                  <CardDescription>
                    Escrita por gente, com fonte. O modelo não decidiu isto — ele aplicou ao seu texto.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {celulasAplicadas.map((c) => (
                    <div key={c.barreira} className="space-y-1 border-l-2 border-primary/30 pl-3">
                      <p className="font-medium">{nomeDaBarreira(c.barreira)}</p>
                      <p className="text-muted-foreground">{text(c.oQueSignifica, language)}</p>
                      <p>{text(c.oQueFazer, language)}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : null}

            {fontes.length ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Fontes</CardTitle>
                  <CardDescription>Vêm da matriz, não do modelo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {fontes.map((f) => (
                      <li key={f.url}>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline underline-offset-4"
                        >
                          {f.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
          </aside>
        </div>
      </main>
    </div>
  )
}
