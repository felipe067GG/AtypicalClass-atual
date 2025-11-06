"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContributeResponse {
  success: boolean
  message: string
}

export async function submitQuestion(formData: FormData): Promise<ContributeResponse> {
  try {
    const subject = formData.get("subject") as string
    const specialNeed = formData.get("specialNeed") as string
    const topic = formData.get("topic") as string
    const difficulty = formData.get("difficulty") as string
    const question = formData.get("question") as string
    const options = JSON.parse(formData.get("options") as string)
    const correctAnswer = formData.get("correctAnswer") as string
    const explanation = formData.get("explanation") as string
    const authorId = formData.get("authorId") as string
    const authorName = formData.get("authorName") as string

    try {
      await resend.emails.send({
        from: "AtypicalClass <onboarding@resend.dev>",
        to: "felipegpeixoto19@gmail.com",
        subject: "📝 Nova Questão Contribuída - AtypicalClass",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: white;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .header {
                  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                  color: white;
                  padding: 30px;
                  text-align: center;
                }
                .content {
                  padding: 30px;
                  color: #333;
                }
                .info-box {
                  background-color: #f8fafc;
                  border-left: 4px solid #6366f1;
                  padding: 15px;
                  margin: 15px 0;
                  border-radius: 4px;
                }
                .question-box {
                  background-color: #fef3c7;
                  border: 2px solid #f59e0b;
                  padding: 15px;
                  margin: 15px 0;
                  border-radius: 8px;
                }
                .button {
                  display: inline-block;
                  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
                  color: white;
                  padding: 14px 30px;
                  text-decoration: none;
                  border-radius: 8px;
                  margin: 10px 0;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>📝 Nova Questão Contribuída</h1>
                </div>
                <div class="content">
                  <h2>Detalhes da Contribuição</h2>
                  
                  <div class="info-box">
                    <p><strong>Autor:</strong> ${authorName}</p>
                    <p><strong>Matéria:</strong> ${subject}</p>
                    <p><strong>Necessidade Especial:</strong> ${specialNeed}</p>
                    <p><strong>Tópico:</strong> ${topic}</p>
                    <p><strong>Dificuldade:</strong> ${difficulty}</p>
                  </div>

                  <div class="question-box">
                    <h3>Enunciado:</h3>
                    <p>${question}</p>
                    
                    <h4>Alternativas:</h4>
                    <ul>
                      ${options.map((opt: string, i: number) => `<li>${i === Number.parseInt(correctAnswer) ? "<strong>✓ " : ""}${opt}${i === Number.parseInt(correctAnswer) ? " (CORRETA)</strong>" : ""}</li>`).join("")}
                    </ul>

                    <h4>Explicação:</h4>
                    <p>${explanation}</p>
                  </div>

                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin" class="button">
                    Revisar Contribuição
                  </a>
                </div>
              </div>
            </body>
          </html>
        `,
      })
    } catch (emailError) {
      console.error("Erro ao enviar email:", emailError)
    }

    return {
      success: true,
      message: "Questão enviada com sucesso! Você receberá um email quando for aprovada.",
    }
  } catch (error) {
    console.error("Erro ao submeter questão:", error)
    return {
      success: false,
      message: "Erro ao enviar questão. Tente novamente.",
    }
  }
}

export async function submitTeachingTip(formData: FormData): Promise<ContributeResponse> {
  try {
    const subject = formData.get("subject") as string
    const specialNeed = formData.get("specialNeed") as string
    const topic = formData.get("topic") as string
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const strategies = JSON.parse(formData.get("strategies") as string)
    const resources = JSON.parse(formData.get("resources") as string)
    const authorId = formData.get("authorId") as string
    const authorName = formData.get("authorName") as string

    try {
      await resend.emails.send({
        from: "AtypicalClass <onboarding@resend.dev>",
        to: "felipegpeixoto19@gmail.com",
        subject: "💡 Nova Dica Pedagógica Contribuída - AtypicalClass",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: white;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .header {
                  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                  color: white;
                  padding: 30px;
                  text-align: center;
                }
                .content {
                  padding: 30px;
                  color: #333;
                }
                .info-box {
                  background-color: #f8fafc;
                  border-left: 4px solid #10b981;
                  padding: 15px;
                  margin: 15px 0;
                  border-radius: 4px;
                }
                .tip-box {
                  background-color: #d1fae5;
                  border: 2px solid #10b981;
                  padding: 15px;
                  margin: 15px 0;
                  border-radius: 8px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>💡 Nova Dica Pedagógica</h1>
                </div>
                <div class="content">
                  <h2>Detalhes da Contribuição</h2>
                  
                  <div class="info-box">
                    <p><strong>Autor:</strong> ${authorName}</p>
                    <p><strong>Matéria:</strong> ${subject}</p>
                    <p><strong>Necessidade Especial:</strong> ${specialNeed}</p>
                    <p><strong>Tópico:</strong> ${topic}</p>
                  </div>

                  <div class="tip-box">
                    <h3>${title}</h3>
                    <p>${content}</p>
                    
                    <h4>Estratégias:</h4>
                    <ul>
                      ${strategies.map((s: string) => `<li>${s}</li>`).join("")}
                    </ul>

                    <h4>Recursos:</h4>
                    <ul>
                      ${resources.map((r: string) => `<li>${r}</li>`).join("")}
                    </ul>
                  </div>

                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; margin: 10px 0; font-weight: bold;">
                    Revisar Contribuição
                  </a>
                </div>
              </div>
            </body>
          </html>
        `,
      })
    } catch (emailError) {
      console.error("Erro ao enviar email:", emailError)
    }

    return {
      success: true,
      message: "Dica pedagógica enviada com sucesso! Você receberá um email quando for aprovada.",
    }
  } catch (error) {
    console.error("Erro ao submeter dica:", error)
    return {
      success: false,
      message: "Erro ao enviar dica. Tente novamente.",
    }
  }
}
