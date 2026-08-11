import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { google } from "@ai-sdk/google"

import { contagensDoAcervo, promptDaRavena } from "@/lib/ravena/contexto"

export const runtime = "nodejs"
export const maxDuration = 30

function errorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return errorResponse(
        "GOOGLE_GENERATIVE_AI_API_KEY não está configurada. Adicione sua chave do Gemini no arquivo .env.local",
        500,
      )
    }

    const body = await req.json()
    const messages: UIMessage[] = body?.messages ?? []

    if (!Array.isArray(messages) || messages.length === 0) {
      return errorResponse("Nenhuma mensagem fornecida", 400)
    }

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: promptDaRavena(await contagensDoAcervo()),
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
      maxOutputTokens: 800,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Erro na API do chat:", error)
    const message = error instanceof Error ? error.message : "Erro ao processar a mensagem."
    return errorResponse(message, 500)
  }
}
