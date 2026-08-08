import { createClient } from "@/lib/supabase/server"
import QuestoesClient, { type Question } from "./questoes-client"

// O `<title>` e a `description` vivem no `layout.tsx` desta rota, que os
// monta traduzidos a partir do idioma. Metadata declarada aqui venceria a do
// layout e devolveria a página ao português.

/**
 * A busca das questões acontece aqui, no servidor.
 *
 * Antes esta rota inteira era um componente cliente e só ia ao banco depois de
 * hidratar: o HTML da resposta trazia apenas o spinner, então quem indexa o
 * site não via questão nenhuma. Buscando no servidor, o conteúdo já sai pronto
 * na primeira resposta e ao cliente resta só filtrar e responder.
 *
 * A rota é dinâmica por consequência do `createClient`, que lê cookies para
 * manter a sessão do Supabase — a mesma leitura que o cliente fazia antes, com
 * as mesmas regras de RLS.
 */
export default async function QuestoesPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error loading questions:", error)
  }

  return <QuestoesClient questions={(data as Question[] | null) ?? []} loadError={Boolean(error)} />
}
