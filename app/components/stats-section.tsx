import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, BookOpen, Award, Clock, Star } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      title: "Professores Ativos",
      value: "127,543",
      change: "+12%",
      color: "text-blue-400",
    },
    {
      icon: BookOpen,
      title: "Recursos Disponíveis",
      value: "2,847",
      change: "+8%",
      color: "text-green-400",
    },
    {
      icon: Award,
      title: "Certificações Emitidas",
      value: "45,892",
      change: "+23%",
      color: "text-purple-400",
    },
    {
      icon: Clock,
      title: "Horas de Treinamento",
      value: "892,156",
      change: "+15%",
      color: "text-yellow-400",
    },
    {
      icon: Star,
      title: "Avaliação Média",
      value: "4.9/5",
      change: "+0.2",
      color: "text-orange-400",
    },
    {
      icon: TrendingUp,
      title: "Taxa de Sucesso",
      value: "94.7%",
      change: "+3%",
      color: "text-red-400",
    },
  ]

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Impacto em Números
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <p className="text-xs text-green-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change} este mês
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
