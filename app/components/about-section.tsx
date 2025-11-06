import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Heart, Target, Award, Code, Search, Star } from "lucide-react"

export default function AboutSection() {
  const team = [
    {
      name: "Felipe Peixoto",
      role: "Desenvolvedor Web",
      specialization: "Desenvolvimento Frontend e UX/UI",
      description: "Responsável pela criação da plataforma, interface do usuário e experiência de navegação",
      image: "/placeholder.svg?height=120&width=120",
      icon: Code,
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Irabe Alexandre",
      role: "Pesquisador Geral",
      specialization: "Pesquisa Acadêmica e Conteúdo",
      description: "Responsável pela pesquisa bibliográfica e fundamentação teórica dos recursos",
      image: "/placeholder.svg?height=120&width=120",
      icon: Search,
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Samuel Olegário",
      role: "Pesquisador Geral",
      specialization: "Análise e Sistematização",
      description: "Responsável pela organização e análise crítica das informações coletadas",
      image: "/placeholder.svg?height=120&width=120",
      icon: BookOpen,
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Vinicius Gabriel",
      role: "Exemplo Prático",
      specialization: "Vivência em Neurodiversidade",
      description:
        "Pessoa com Síndrome de Down e Autismo, oferece perspectiva única e validação prática dos recursos desenvolvidos",
      image: "/placeholder.svg?height=120&width=120",
      icon: Star,
      color: "from-blue-300 to-blue-500",
      special: true,
    },
  ]

  const process = [
    {
      icon: BookOpen,
      title: "1. Pesquisa Bibliográfica",
      description: "Análise de literatura especializada em educação inclusiva e neuroeducação",
    },
    {
      icon: Users,
      title: "2. Consulta a Especialistas",
      description: "Entrevistas e consultas com educadores experientes em inclusão",
    },
    {
      icon: Star,
      title: "3. Validação Prática",
      description: "Teste e validação dos recursos com perspectiva neurodiversa real",
    },
    {
      icon: Award,
      title: "4. Refinamento Contínuo",
      description: "Aprimoramento baseado em feedback e experiências práticas",
    },
  ]

  const motivation = [
    {
      icon: Heart,
      title: "Nossa Motivação",
      description:
        "Acreditamos que todos os alunos merecem oportunidades iguais de aprendizado e desenvolvimento, independentemente de suas características individuais.",
    },
    {
      icon: Target,
      title: "Nosso Diferencial",
      description:
        "Combinamos pesquisa acadêmica com experiência real de neurodiversidade, criando recursos verdadeiramente inclusivos e eficazes.",
    },
  ]

  return (
    <div className="space-y-16">
      {/* Mission Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-6">
          Sobre o AtypicalClass
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-slate-300 mb-8">
            O AtypicalClass é uma plataforma dedicada a apoiar educadores no desenvolvimento de práticas inclusivas
            eficazes. Nosso trabalho combina pesquisa fundamentada, experiência prática e vivência real em
            neurodiversidade para criar recursos que fazem a diferença na vida de alunos atípicos.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {motivation.map((item, index) => {
              const IconComponent = item.icon
              return (
                <Card key={index} className="bg-slate-900/50 border-slate-700">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                    <CardDescription className="text-slate-400">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h3 className="text-3xl font-bold text-center text-white mb-4">Nossa Equipe</h3>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Uma equipe multidisciplinar que combina conhecimento acadêmico com experiência real em neurodiversidade,
          garantindo autenticidade e eficácia em nossos recursos.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => {
            const IconComponent = member.icon
            return (
              <Card
                key={index}
                className={`bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300 ${
                  member.special ? "ring-2 ring-blue-500/50" : ""
                }`}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 ${
                      member.special ? "ring-2 ring-blue-400/50" : ""
                    }`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{member.name}</CardTitle>
                  <CardDescription className="text-blue-400 mb-2">{member.role}</CardDescription>
                  <Badge className={`bg-blue-600 text-white mb-3 ${member.special ? "bg-blue-500" : ""}`}>
                    {member.specialization}
                  </Badge>
                  {member.special && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white mb-2">
                      Perspectiva Neurodiversa
                    </Badge>
                  )}
                  <p className="text-sm text-slate-400">{member.description}</p>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Process */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white text-center mb-6">Nossa Metodologia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-400">{step.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Values and Principles */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-8">Nossos Princípios</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-400 mb-2">📚</div>
            <div className="text-lg font-semibold text-white mb-2">Fundamentação Científica</div>
            <div className="text-sm text-slate-400">
              Todos os recursos são baseados em pesquisas atuais e práticas comprovadas
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-400 mb-2">🌟</div>
            <div className="text-lg font-semibold text-white mb-2">Experiência Autêntica</div>
            <div className="text-sm text-slate-400">Validação real através da perspectiva de pessoa neurodiversa</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-400 mb-2">🎯</div>
            <div className="text-lg font-semibold text-white mb-2">Praticidade</div>
            <div className="text-sm text-slate-400">Recursos prontos para aplicação imediata em sala de aula</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <Card className="bg-slate-900/80 border-blue-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white mb-4">Entre em Contato</CardTitle>
          <CardDescription className="text-slate-200 mb-6">
            Tem sugestões, dúvidas ou gostaria de colaborar? Estamos sempre abertos ao diálogo com educadores e
            especialistas.
          </CardDescription>
          <div className="space-y-4 text-white">
            <p className="bg-blue-600/20 p-3 rounded-lg">📧 Email: contato@atypicalclass.com.br</p>
            <p className="bg-blue-600/20 p-3 rounded-lg">💬 Feedback e sugestões são sempre bem-vindos</p>
            <p className="bg-blue-600/20 p-3 rounded-lg">🤝 Abertos a parcerias e colaborações</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
