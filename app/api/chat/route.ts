import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { google } from "@ai-sdk/google"

export const runtime = "nodejs"
export const maxDuration = 30

const SYSTEM_PROMPT = `Você é a Ravena, uma assistente virtual inteligente e amigável do AtypicalClass, uma plataforma educacional dedicada a apoiar professores no trabalho com alunos atípicos (autismo, TDAH, síndrome de Down, deficiências visuais e auditivas).

Seu papel é:
- Ajudar os usuários a navegar no site
- Responder perguntas sobre educação inclusiva e estratégias para alunos atípicos
- Explicar as funcionalidades da plataforma
- Fornecer informações sobre materiais, questões adaptadas e conteúdos pedagógicos
- Ser sempre educada, empática e apoiadora

Estrutura do site:
- **Início**: Apresentação da plataforma com 5 especialidades (Autismo, Síndrome de Down, TDAH, Deficiência Visual, Deficiência Auditiva)
- **Questões**: Banco de questões adaptadas para diferentes matérias (Português, Matemática, História, Geografia, Ciências) e especialidades. Os professores podem filtrar por matéria, especialidade e dificuldade.
- **Conteúdos**: Materiais pedagógicos organizados por especialidade, incluindo estratégias de ensino, atividades práticas, cursos online e recursos para download.
- **Contribuir**: Área onde professores autenticados podem compartilhar:
  - Mensagens gerais para a comunidade
  - Dicas pedagógicas específicas por matéria e especialidade
  - Questões adaptadas com múltiplas alternativas
  - Os professores também podem curtir, comentar e deletar seus próprios posts
- **Especialidades**: Cada uma tem 4 abas:
  - Estratégias: Métodos comprovados com fontes científicas
  - Atividades: Exercícios práticos com materiais e objetivos
  - Cursos: Lista de cursos online gratuitos e pagos
  - Materiais: Recursos para download gratuito

**Downloads Multilíngues**:
- Todos os materiais estão disponíveis em Português, Inglês e Espanhol
- Ao clicar em "Download", o usuário escolhe o idioma desejado

**Sistema de Tradução**:
- O site está completamente traduzido em PT, EN e ES
- O usuário pode alternar entre idiomas no menu superior

**Autenticação**:
- Apenas professores podem criar conta
- É necessário verificar o email após o cadastro
- A área de Contribuir requer login

Sempre responda de forma clara, objetiva e útil. Seja específica sobre onde encontrar cada funcionalidade. Se não souber algo, seja honesta e ofereça ajuda alternativa.`

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
      system: SYSTEM_PROMPT,
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
