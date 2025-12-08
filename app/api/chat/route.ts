import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { google } from "@ai-sdk/google"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Verificar se a chave da API está configurada
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    
    if (!apiKey) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY não está configurada")
      // Retornar erro simples - o useChat vai capturar via onError
      return new Response(
        JSON.stringify({
          error: "GOOGLE_GENERATIVE_AI_API_KEY não está configurada. Por favor, adicione sua chave do Gemini no arquivo .env.local",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const body = await req.json()
    
    // O useChat envia { messages: [...] }
    const messages: UIMessage[] = body?.messages || []

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhuma mensagem fornecida" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Converter mensagens para o formato esperado
    const modelMessages = messages.map((msg: any) => {
      if (msg.role === "user") {
        return {
          role: "user" as const,
          content: msg.content || "",
        }
      } else if (msg.role === "assistant") {
        return {
          role: "assistant" as const,
          content: msg.content || "",
        }
      } else if (msg.role === "system") {
        return {
          role: "system" as const,
          content: msg.content || "",
        }
      }
      return {
        role: "user" as const,
        content: String(msg.content || ""),
      }
    })

    const systemPrompt = `Você é a Ravena, uma assistente virtual inteligente e amigável do AtypicalClass, uma plataforma educacional dedicada a apoiar professores no trabalho com alunos atípicos (autismo, TDAH, síndrome de Down, deficiências visuais e auditivas).

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

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      messages: modelMessages,
      temperature: 0.7,
      maxTokens: 800,
    })

    // Log para debug
    console.log("StreamText criado, retornando resposta...")
    
    const response = result.toUIMessageStreamResponse()
    console.log("Resposta criada, tipo:", response.constructor.name)
    
    return response
  } catch (error: any) {
    console.error("Erro na API do chat:", error)
    return new Response(
      JSON.stringify({
        error: error.message || "Erro ao processar a mensagem. Verifique se a chave do Gemini está configurada corretamente.",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
