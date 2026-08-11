import { BARREIRAS, MATRIZ } from "@/lib/adaptacao"
import { SPECIALTIES } from "@/lib/specialties"
import AdaptarClient from "./adaptar-client"

/**
 * O adaptador: o professor cola o material dele e recebe aquilo adaptado.
 *
 * Não é escolher no acervo do site — é o material que ele já usa e vai dar na
 * aula de quinta. O acervo continua em `/questoes` e `/conteudos`.
 *
 * ## A especialidade vive na URL
 *
 * Mesmo desenho de `/questoes` e `/conteudos`, e pelo mesmo motivo: o professor
 * manda o endereço ao colega que tem o mesmo aluno. E, como lá, **só as células
 * daquela especialidade descem** — são 112 na matriz inteira, em três idiomas, e
 * mandar todas a cada visita seria pagar por catorze alunos para mostrar um.
 *
 * Sem especialidade escolhida a tela pede que se escolha, em vez de assumir uma:
 * adaptar sem aluno definido é o conselho genérico de volta.
 */
export default async function AdaptarPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const bruto = params.especialidade
  const especialidade = (Array.isArray(bruto) ? bruto[0] : bruto) ?? ""

  return (
    <AdaptarClient
      especialidades={SPECIALTIES.map((s) => ({ slug: s.slug, nameKey: s.nameKey }))}
      barreiras={BARREIRAS}
      celulas={especialidade ? MATRIZ.filter((c) => c.especialidade === especialidade) : []}
      especialidade={especialidade}
    />
  )
}
