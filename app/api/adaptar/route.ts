import { streamText } from "ai"
import { google } from "@ai-sdk/google"

import { analisar, promptDeAdaptacao, type MaterialColado } from "@/lib/adaptacao/adaptar"
import { SPECIALTIES } from "@/lib/specialties"
import { createClient } from "@/lib/supabase/server"
import { translations, type Language } from "@/lib/translations"

/**
 * O adaptador. **Não é a Ravena**, por decisão do mantenedor em 11/08/2026.
 *
 * A Ravena (`app/api/chat/route.ts`) é assistente de navegação: sabe o que o
 * site tem e ajuda a achar. Aqui se mexe no material que o professor vai dar na
 * aula de quinta, e isso é responsabilidade pedagógica — outro compromisso e
 * outro risco. Misturar as duas faria a assistente de navegação carregá-lo.
 *
 * ## O material do professor não é guardado
 *
 * Nada de banco, nada de log do texto colado. O material é dele: guardá-lo
 * levantaria posse e privacidade de um conteúdo que pode ter nome de aluno
 * dentro, e não guardar custa só o histórico. É a escolha reversível — dá para
 * passar a guardar depois, com consentimento; não dá para desguardar o que já
 * foi gravado.
 */

export const runtime = "nodejs"
export const maxDuration = 60

/**
 * Teto do que se aceita colar.
 *
 * Não é limite de modelo: é limite de promessa. Acima disso o que chega já não
 * é "a atividade de quinta", é uma apostila, e a adaptação de apostila inteira
 * numa passada devolve resumo, não adaptação.
 */
const MAXIMO_DE_CARACTERES = 12_000
const MINIMO_DE_CARACTERES = 40

/**
 * O nome do aluno, e não o slug.
 *
 * "sindrome-de-down" dentro do prompt é o tipo de detalhe que reaparece na
 * resposta ao professor. As traduções guardam valores aninhados além de texto,
 * daí a conferência de tipo em vez de um cast.
 */
function nomeDoAluno(nameKey: string, idioma: Language): string {
  const valor = (translations[idioma] as Record<string, unknown>)[nameKey]
  return typeof valor === "string" ? valor : nameKey
}

function erro(mensagem: string, status: number) {
  return new Response(JSON.stringify({ error: mensagem }), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return erro("GOOGLE_GENERATIVE_AI_API_KEY não está configurada.", 500)
    }

    /**
     * A conferência que realmente protege.
     *
     * A tela de `/adaptar` também confere, mas ela só alcança quem abre a
     * página. Cada adaptação é uma chamada de modelo paga com a chave do site,
     * e este endereço aceita 12 mil caracteres de entrada: sem esta linha, um
     * `curl` em laço gastaria a chave do mantenedor sem passar por tela nenhuma.
     */
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return erro("Entre na sua conta para adaptar material.", 401)

    const body = await req.json()
    const texto = String(body?.texto ?? "").trim()
    const tipo = (body?.tipo ?? "atividade") as MaterialColado["tipo"]
    const especialidade = String(body?.especialidade ?? "")
    const idioma: Language = body?.idioma === "en" || body?.idioma === "es" ? body.idioma : "pt"

    if (texto.length < MINIMO_DE_CARACTERES) {
      return erro(`Cole ao menos ${MINIMO_DE_CARACTERES} caracteres do material.`, 400)
    }
    if (texto.length > MAXIMO_DE_CARACTERES) {
      return erro(
        `O material tem ${texto.length} caracteres. Cole até ${MAXIMO_DE_CARACTERES} de cada vez — uma atividade ou uma questão por vez adapta melhor que uma apostila inteira.`,
        400,
      )
    }

    const specialty = SPECIALTIES.find((s) => s.slug === especialidade)
    if (!specialty) return erro("Escolha um aluno para adaptar.", 400)

    const material: MaterialColado = { texto, tipo }
    const analise = analisar(material, especialidade)

    /**
     * Sem célula, não se chama o modelo.
     *
     * 42% do material de escola não dispara barreira nenhuma, e uma IA que
     * sempre produz adaptação vai inventar nesses casos. A tela recebe a
     * medida e diz o que mediu — que é informação — em vez de receber texto
     * reescrito sem motivo.
     */
    if (!analise.celulas.length) {
      return new Response(
        JSON.stringify({
          semAdaptacao: true,
          medidas: analise.medicao.medidas,
          barreiras: analise.medicao.barreiras,
          relatorio: analise.medicao.relatorio,
          semCelula: analise.semCelula,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      )
    }

    const result = streamText({
      model: google("gemini-2.5-flash"),
      prompt: promptDeAdaptacao(material, analise, nomeDoAluno(specialty.nameKey, idioma), idioma),
      // Baixa de propósito: aqui não se quer variedade, quer-se aplicar a
      // instrução ao texto. A Ravena conversa e usa 0.7.
      temperature: 0.2,
      maxOutputTokens: 4000,
    })

    return result.toTextStreamResponse({
      headers: {
        // A tela precisa das barreiras e das fontes para montar o que fica ao
        // lado da adaptação. Vão no cabeçalho porque o corpo é o fluxo do texto.
        "X-Analise": encodeURIComponent(
          JSON.stringify({
            barreiras: analise.medicao.barreiras,
            semCelula: analise.semCelula,
            relatorio: analise.medicao.relatorio,
            medidas: {
              caracteres: analise.medicao.medidas.caracteres,
              palavras: analise.medicao.medidas.palavras,
              palavrasPorFrase: analise.medicao.medidas.palavrasPorFrase,
              numeros: analise.medicao.medidas.numeros,
              alternativas: analise.material.alternativas?.length ?? 0,
            },
          }),
        ),
      },
    })
  } catch (error) {
    console.error("Erro no adaptador:", error)
    return erro(error instanceof Error ? error.message : "Erro ao adaptar o material.", 500)
  }
}
