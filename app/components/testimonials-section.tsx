import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Prof. Maria Silva",
      role: "Educadora Especial - SP",
      content:
        "A plataforma revolucionou minha prática pedagógica. Os recursos para autismo são excepcionais e baseados em evidências científicas.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Dr. João Santos",
      role: "Coordenador Pedagógico - RJ",
      content:
        "Implementamos os métodos da EduInclusiva em nossa escola e vimos 40% de melhoria no engajamento dos alunos atípicos.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ana Costa",
      role: "Professora de LIBRAS - MG",
      content:
        "Os recursos para deficiência auditiva são os mais completos que já encontrei. Meus alunos adoram as atividades interativas.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Depoimentos de Educadores
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-gray-600"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <Quote className="w-6 h-6 text-blue-400 mb-2" />
              <p className="text-gray-300 italic">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
