import Link from "next/link"

import { BARREIRAS, MATRIZ } from "@/lib/adaptacao"
import { SPECIALTIES } from "@/lib/specialties"
import { createClient } from "@/lib/supabase/server"
import { localizedHref } from "@/lib/i18n-routing"
import { resolveLang } from "@/lib/page-metadata"
import { translations } from "@/lib/translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/app/components/header"
import AdaptarClient from "./adaptar-client"

/**
 * O adaptador: o professor cola o material dele e recebe aquilo adaptado.
 *
 * Não é escolher no acervo do site — é o material que ele já usa e vai dar na
 * aula de quinta. O acervo continua em `/questoes` e `/conteudos`.
 *
 * ## Por que esta é a única página do site que exige conta
 *
 * `/questoes` e `/conteudos` são acervo: quanto mais gente vê, melhor, e servir
 * uma página estática não custa nada. Aqui cada uso é uma chamada de modelo
 * paga com a chave do site, num endereço público que aceita 12 mil caracteres de
 * entrada. Sem conta, um script chamaria em série e a conta seria do mantenedor.
 *
 * A conferência acontece **duas vezes**, e não é redundância: esta aqui é a que
 * explica ao professor por que ele precisa entrar; a de `app/api/adaptar/route.ts`
 * é a que realmente protege, porque quem chama a API direto nunca passa por esta
 * tela. Proteger só a página seria proteger a porta e deixar a janela aberta.
 *
 * ## A especialidade vive na URL
 *
 * Mesmo desenho de `/questoes` e `/conteudos`: o professor manda o endereço ao
 * colega que tem o mesmo aluno. E, como lá, **só as células daquela
 * especialidade descem** — são 112 na matriz inteira, em três idiomas.
 */
export default async function AdaptarPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { lang } = await params
  const idioma = resolveLang(lang)
  const busca = await searchParams
  const bruto = busca.especialidade
  const especialidade = (Array.isArray(bruto) ? bruto[0] : bruto) ?? ""

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const t = translations[idioma]
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main id="conteudo" className="container mx-auto max-w-xl px-4 py-24">
          <Card>
            <CardHeader>
              <CardTitle>{t.loginRequiredTitle}</CardTitle>
              <CardDescription>{t.loginRequiredHelp}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={localizedHref("/auth", idioma)}>{t.login}</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <AdaptarClient
      especialidades={SPECIALTIES.map((s) => ({ slug: s.slug, nameKey: s.nameKey }))}
      barreiras={BARREIRAS}
      celulas={especialidade ? MATRIZ.filter((c) => c.especialidade === especialidade) : []}
      especialidade={especialidade}
    />
  )
}
