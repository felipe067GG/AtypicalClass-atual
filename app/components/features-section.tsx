import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Smartphone, Video, MessageCircle, Zap, Shield, Clock, Target } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "IA Educacional",
      description: "Algoritmos inteligentes que personalizam o aprendizado para cada perfil de aluno",
      status: "Em desenvolvimento",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Smartphone,
      title: "App Mobile",
      description: "Acesse recursos e atividades diretamente do seu smartphone ou tablet",
      status: "Lançamento Q1 2025",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Video,
      title: "Vídeo-aulas Interativas",
      description: "Conteúdo audiovisual especializado com legendas e recursos de acessibilidade",
      status: "Disponível",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MessageCircle,
      title: "Fórum Especializado",
      description: "Comunidade de educadores para troca de experiências e dúvidas",
      status: "Beta fechado",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Avaliações Adaptativas",
      description: "Sistema de avaliação que se ajusta ao ritmo e necessidades do aluno",
      status: "Em breve",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Dados Seguros",
      description: "Proteção total dos dados dos alunos conforme LGPD",
      status: "Implementado",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível":
      case "Implementado":
        return "bg-green-600"
      case "Beta fechado":
        return "bg-blue-600"
      case "Em desenvolvimento":
      case "Em breve":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Recursos Inovadores
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Tecnologia de ponta desenvolvida especificamente para as necessidades da educação inclusiva moderna.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <Badge className={`${getStatusColor(feature.status)} text-white text-xs`}>{feature.status}</Badge>
              </div>
              <CardHeader className="pb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-4`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white mb-4">Seja um dos Primeiros Educadores</CardTitle>
          <CardDescription className="text-xl text-gray-300 mb-6">
            Cadastre-se para acesso antecipado e ajude a moldar o futuro da educação inclusiva no Brasil.
          </CardDescription>
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Target className="w-5 h-5 mr-2" />
              Acesso Antecipado
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Clock className="w-5 h-5 mr-2" />
              Agendar Demo
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">* Acesso gratuito durante o período beta • Sem compromisso</p>
        </CardHeader>
      </Card>
    </div>
  )
}
