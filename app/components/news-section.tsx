import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"

export default function NewsSection() {
  const news = [
    {
      title: "Nova Metodologia para TDAH Aprovada pelo MEC",
      description: "Técnicas inovadoras de neuroeducação mostram resultados promissores em estudos clínicos.",
      category: "Pesquisa",
      date: "15 Dez 2024",
      author: "Dr. Carlos Mendes",
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
    },
    {
      title: "Webinar: Tecnologias Assistivas em 2025",
      description: "Descubra as últimas inovações em tecnologia para educação inclusiva.",
      category: "Evento",
      date: "20 Dez 2024",
      author: "Equipe EduInclusiva",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Certificação Internacional em Autismo",
      description: "Novo programa de certificação reconhecido internacionalmente.",
      category: "Certificação",
      date: "10 Jan 2025",
      author: "Instituto TEA",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Estudo: Impacto da Educação Inclusiva",
      description: "Pesquisa revela benefícios para toda a comunidade escolar.",
      category: "Estudo",
      date: "5 Jan 2025",
      author: "Universidade Federal",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Últimas Novidades
        </h2>
        <Badge className="bg-blue-600 text-white">Atualizado hoje</Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Featured Article */}
        <Card className="lg:row-span-2 bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
          <div className="relative">
            <img
              src={news[0].image || "/placeholder.svg"}
              alt={news[0].title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <Badge className="absolute top-4 left-4 bg-red-600 text-white">Destaque</Badge>
          </div>
          <CardHeader>
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
              <Badge variant="outline" className="border-blue-500 text-blue-400">
                {news[0].category}
              </Badge>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{news[0].date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{news[0].author}</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-white mb-3">{news[0].title}</CardTitle>
            <CardDescription className="text-gray-300 text-base">{news[0].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-blue-400 hover:text-blue-300 cursor-pointer">
              <span className="mr-2">Ler mais</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        {/* Other Articles */}
        <div className="space-y-6">
          {news.slice(1).map((article, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="flex">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-32 h-32 object-cover rounded-l-lg"
                />
                <div className="flex-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        {article.category}
                      </Badge>
                      <span>{article.date}</span>
                    </div>
                    <CardTitle className="text-lg text-white leading-tight">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-400 text-sm mb-3">{article.description}</CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.author}</span>
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
