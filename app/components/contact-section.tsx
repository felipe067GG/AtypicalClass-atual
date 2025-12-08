import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageCircle, Calendar, Phone, Send, Users } from "lucide-react"

export default function ContactSection() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Direto",
      description: "Fale conosco diretamente",
      contact: "contato@eduinclusiva.com.br",
      availability: "Resposta em até 24h",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: MessageCircle,
      title: "Chat Online",
      description: "Suporte em tempo real",
      contact: "Chat disponível no site",
      availability: "Seg-Sex: 8h às 18h",
      color: "from-green-500 to-green-700",
    },
    {
      icon: Calendar,
      title: "Agendar Reunião",
      description: "Demonstração personalizada",
      contact: "Calendário online",
      availability: "Sessões de 30 min",
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      description: "Atendimento via WhatsApp",
      contact: "(11) 99999-9999",
      availability: "Seg-Sex: 9h às 17h",
      color: "from-green-600 to-green-800",
    },
  ]

  const faqs = [
    {
      question: "Quando a plataforma estará totalmente disponível?",
      answer: "Estamos em fase beta e planejamos o lançamento oficial para o primeiro semestre de 2025.",
    },
    {
      question: "O acesso beta é realmente gratuito?",
      answer: "Sim! Durante o período beta, todo o conteúdo está disponível gratuitamente para educadores cadastrados.",
    },
    {
      question: "Preciso de conhecimento técnico para usar a plataforma?",
      answer: "Não! Nossa interface foi desenvolvida para ser intuitiva e acessível a todos os educadores.",
    },
    {
      question: "Os recursos são baseados em evidências científicas?",
      answer:
        "Absolutamente. Todo nosso conteúdo é desenvolvido com base nas mais recentes pesquisas em neuroeducação.",
    },
  ]

  return (
    <div className="space-y-16">
      {/* Contact Methods */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Nossa equipe está pronta para ajudar você a transformar sua prática educacional. Escolha a forma de contato
            que preferir.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon
            return (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-white">{method.title}</CardTitle>
                  <CardDescription className="text-gray-400">{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-blue-400 font-medium mb-2">{method.contact}</p>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {method.availability}
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Contact Form - CORES CORRIGIDAS */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white mb-4">Acesso Antecipado</CardTitle>
          <CardDescription className="text-blue-100 text-lg">
            Cadastre-se para ser um dos primeiros a testar nossa plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-md mx-auto">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 focus:bg-white/20"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Seu melhor email"
                className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 focus:bg-white/20"
              />
            </div>
            <div>
              <select className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:bg-white/20">
                <option value="" className="bg-gray-800 text-white">
                  Sua área de atuação
                </option>
                <option value="professor" className="bg-gray-800 text-white">
                  Professor(a)
                </option>
                <option value="coordenador" className="bg-gray-800 text-white">
                  Coordenador(a) Pedagógico(a)
                </option>
                <option value="diretor" className="bg-gray-800 text-white">
                  Diretor(a)
                </option>
                <option value="terapeuta" className="bg-gray-800 text-white">
                  Terapeuta
                </option>
                <option value="familia" className="bg-gray-800 text-white">
                  Família
                </option>
                <option value="outro" className="bg-gray-800 text-white">
                  Outro
                </option>
              </select>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Send className="w-4 h-4 mr-2" />
              Solicitar Acesso
            </Button>
            <p className="text-xs text-blue-200 text-center">* Seus dados estão seguros e não serão compartilhados</p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div>
        <h3 className="text-3xl font-bold text-center text-white mb-8">Perguntas Frequentes</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white mb-4">Junte-se à Nossa Comunidade</CardTitle>
          <CardDescription className="text-gray-300 mb-6">
            Conecte-se com outros educadores, compartilhe experiências e ajude a construir o futuro da educação
            inclusiva no Brasil.
          </CardDescription>
          <div className="flex justify-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Grupo WhatsApp
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Mail className="w-4 h-4 mr-2" />
              Newsletter
            </Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
