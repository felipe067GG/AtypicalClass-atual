import { createClient } from "@/lib/supabase/server"
import { MATRIZ_DE_CONTEUDOS } from "@/lib/conteudos/matriz"
import { SPECIALTIES } from "@/lib/specialties"
import ConteudosClient, { type Content, type ConteudoRow } from "./conteudos-client"

// O `<title>` e a `description` vivem no `layout.tsx` desta rota, que os
// monta traduzidos a partir do idioma. Metadata declarada aqui venceria a do
// layout e devolveria a página ao português.

/**
 * A busca dos conteúdos acontece aqui, no servidor — mesmo motivo de
 * `app/questoes/page.tsx`: como componente cliente, esta rota entregava só o
 * spinner no HTML e a biblioteca inteira ficava invisível para buscadores.
 *
 * ## São dois acervos, e eles não se misturam
 *
 * `conteudos` é a biblioteca curricular: 170 conteúdos com plano de aula,
 * código da BNCC e fonte, criada por `scripts/09-biblioteca-de-conteudos.sql`.
 * `content` é o que o professor contribui pelo site — a "Dica Pedagógica" de
 * `app/actions/posts.tsx` —, e continua aparecendo com a procedência dita em voz
 * alta. É o mesmo desenho de `/questoes`, e pelo mesmo motivo: apagar a
 * contribuição do professor para estrear a biblioteca seria trocar uma coisa por
 * outra sem ele ter pedido.
 *
 * ## A matriz entra por aqui, e não pelo banco
 *
 * `lib/conteudos/matriz.ts` fica no código, como `lib/adaptacao/matriz.ts`: é
 * conteúdo com fonte, que muda por revisão e não por importação. O que a página
 * recebe são **só as células da especialidade escolhida** — a matriz inteira são
 * 98 células com texto em três idiomas, e mandá-la toda para o cliente a cada
 * visita seria pagar por catorze alunos para mostrar um.
 *
 * Sem especialidade escolhida, a lista vai vazia: a biblioteca é útil sem ela, e
 * escolher um aluno por padrão diria que a orientação vale para todos.
 */
export default async function ConteudosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const bruto = params.especialidade
  const especialidade = (Array.isArray(bruto) ? bruto[0] : bruto) ?? ""

  const supabase = await createClient()

  const [biblioteca, comunidade] = await Promise.all([
    supabase.from("conteudos").select("*").order("materia").order("ano"),
    supabase.from("content").select("*").order("created_at", { ascending: false }),
  ])

  if (biblioteca.error) console.error("Error loading conteudos:", biblioteca.error)
  if (comunidade.error) console.error("Error loading content:", comunidade.error)

  return (
    <ConteudosClient
      conteudos={(biblioteca.data as ConteudoRow[] | null) ?? []}
      contents={(comunidade.data as Content[] | null) ?? []}
      especialidades={SPECIALTIES.map((s) => ({ slug: s.slug, nameKey: s.nameKey }))}
      celulas={
        especialidade ? MATRIZ_DE_CONTEUDOS.filter((c) => c.especialidade === especialidade) : []
      }
      especialidadeEscolhida={especialidade}
      loadError={Boolean(biblioteca.error)}
    />
  )
}
