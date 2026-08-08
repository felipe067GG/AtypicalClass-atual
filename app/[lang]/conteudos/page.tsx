import { createClient } from "@/lib/supabase/server"
import ConteudosClient, { type Content } from "./conteudos-client"

// O `<title>` e a `description` vivem no `layout.tsx` desta rota, que os
// monta traduzidos a partir do idioma. Metadata declarada aqui venceria a do
// layout e devolveria a página ao português.

/**
 * A busca dos conteúdos acontece aqui, no servidor — mesmo motivo de
 * `app/questoes/page.tsx`: como componente cliente, esta rota entregava só o
 * spinner no HTML e a biblioteca inteira ficava invisível para buscadores.
 */
export default async function ConteudosPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error loading contents:", error)
  }

  return <ConteudosClient contents={(data as Content[] | null) ?? []} loadError={Boolean(error)} />
}
