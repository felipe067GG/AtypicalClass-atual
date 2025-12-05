"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Heart, Target, Award, Code, Search, Star } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function AboutSection() {
  const { language } = useLanguage()

  const team = [
    {
      name: "Felipe Peixoto",
      role: {
        pt: "Desenvolvedor Web",
        en: "Web Developer",
        es: "Desarrollador Web",
      },
      specialization: {
        pt: "Desenvolvimento Frontend e UX/UI",
        en: "Frontend Development and UX/UI",
        es: "Desarrollo Frontend y UX/UI",
      },
      description: {
        pt: "Responsável pela criação da plataforma, interface do usuário e experiência de navegação",
        en: "Responsible for creating the platform, user interface and navigation experience",
        es: "Responsable de crear la plataforma, interfaz de usuario y experiencia de navegación",
      },
      image: "/placeholder.svg?height=120&width=120",
      icon: Code,
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Irabe Alexandre",
      role: {
        pt: "Pesquisador Geral",
        en: "General Researcher",
        es: "Investigador General",
      },
      specialization: {
        pt: "Pesquisa Acadêmica e Conteúdo",
        en: "Academic Research and Content",
        es: "Investigación Académica y Contenido",
      },
      description: {
        pt: "Responsável pela pesquisa bibliográfica e fundamentação teórica dos recursos",
        en: "Responsible for bibliographic research and theoretical foundation of resources",
        es: "Responsable de la investigación bibliográfica y fundamentación teórica de los recursos",
      },
      image: "/placeholder.svg?height=120&width=120",
      icon: Search,
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Samuel Olegário",
      role: {
        pt: "Pesquisador Geral",
        en: "General Researcher",
        es: "Investigador General",
      },
      specialization: {
        pt: "Análise e Sistematização",
        en: "Analysis and Systematization",
        es: "Análisis y Sistematización",
      },
      description: {
        pt: "Responsável pela organização e análise crítica das informações coletadas",
        en: "Responsible for organizing and critical analysis of collected information",
        es: "Responsable de la organización y análisis crítico de la información recopilada",
      },
      image: "/placeholder.svg?height=120&width=120",
      icon: BookOpen,
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Vinicius Gabriel",
      role: {
        pt: "Exemplo Prático",
        en: "Practical Example",
        es: "Ejemplo Práctico",
      },
      specialization: {
        pt: "Vivência em Neurodiversidade",
        en: "Experience in Neurodiversity",
        es: "Experiencia en Neurodiversidad",
      },
      description: {
        pt: "Pessoa com Síndrome de Down e Autismo, oferece perspectiva única e validação prática dos recursos desenvolvidos",
        en: "Person with Down Syndrome and Autism, offers unique perspective and practical validation of developed resources",
        es: "Persona con Síndrome de Down y Autismo, ofrece perspectiva única y validación práctica de los recursos desarrollados",
      },
      image: "/placeholder.svg?height=120&width=120",
      icon: Star,
      color: "from-blue-300 to-blue-500",
      special: true,
    },
  ]

  const process = [
    {
      icon: BookOpen,
      title: {
        pt: "1. Pesquisa Bibliográfica",
        en: "1. Bibliographic Research",
        es: "1. Investigación Bibliográfica",
      },
      description: {
        pt: "Análise de literatura especializada em educação inclusiva e neuroeducação",
        en: "Analysis of specialized literature in inclusive education and neuroeducation",
        es: "Análisis de literatura especializada en educación inclusiva y neuroeducación",
      },
    },
    {
      icon: Users,
      title: {
        pt: "2. Consulta a Especialistas",
        en: "2. Consultation with Experts",
        es: "2. Consulta con Expertos",
      },
      description: {
        pt: "Entrevistas e consultas com educadores experientes em inclusão",
        en: "Interviews and consultations with experienced educators in inclusion",
        es: "Entrevistas y consultas con educadores experimentados en inclusión",
      },
    },
    {
      icon: Star,
      title: {
        pt: "3. Validação Prática",
        en: "3. Practical Validation",
        es: "3. Validación Práctica",
      },
      description: {
        pt: "Teste e validação dos recursos com perspectiva neurodiversa real",
        en: "Testing and validation of resources with real neurodiverse perspective",
        es: "Prueba y validación de recursos con perspectiva neurodiversa real",
      },
    },
    {
      icon: Award,
      title: {
        pt: "4. Refinamento Contínuo",
        en: "4. Continuous Refinement",
        es: "4. Refinamiento Continuo",
      },
      description: {
        pt: "Aprimoramento baseado em feedback e experiências práticas",
        en: "Improvement based on feedback and practical experiences",
        es: "Mejora basada en retroalimentación y experiencias prácticas",
      },
    },
  ]

  const motivation = [
    {
      icon: Heart,
      title: {
        pt: "Nossa Motivação",
        en: "Our Motivation",
        es: "Nuestra Motivación",
      },
      description: {
        pt: "Acreditamos que todos os alunos merecem oportunidades iguais de aprendizado e desenvolvimento, independentemente de suas características individuais.",
        en: "We believe that all students deserve equal opportunities for learning and development, regardless of their individual characteristics.",
        es: "Creemos que todos los estudiantes merecen igualdad de oportunidades para aprender y desarrollarse, independientemente de sus características individuales.",
      },
    },
    {
      icon: Target,
      title: {
        pt: "Nosso Diferencial",
        en: "Our Differentiation",
        es: "Nuestra Diferenciación",
      },
      description: {
        pt: "Combinamos pesquisa acadêmica com experiência real de neurodiversidade, criando recursos verdadeiramente inclusivos e eficazes.",
        en: "We combine evidence-based research with real-life experience in neurodiversity to create truly inclusive and effective resources.",
        es: "Combinamos investigación fundamentada con experiencia real en neurodiversidad para crear recursos verdaderamente inclusivos y efectivos.",
      },
    },
  ]

  return (
    <div className="space-y-16">
      {/* Mission Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-6">
          {language === "pt" && "Sobre o AtypicalClass"}
          {language === "en" && "About AtypicalClass"}
          {language === "es" && "Acerca de AtypicalClass"}
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-slate-300 mb-8">
            {language === "pt" &&
              "O AtypicalClass é uma plataforma dedicada a apoiar educadores no desenvolvimento de práticas inclusivas eficazes. Nosso trabalho combina pesquisa fundamentada, experiência prática e vivência real em neurodiversidade para criar recursos que fazem a diferença na vida de alunos atípicos."}
            {language === "en" &&
              "AtypicalClass is a platform dedicated to supporting educators in developing effective inclusive practices. Our work combines evidence-based research, practical experience, and real-life experience in neurodiversity to create resources that make a difference in the lives of atypical students."}
            {language === "es" &&
              "AtypicalClass es una plataforma dedicada a apoyar a los educadores en el desarrollo de prácticas inclusivas efectivas. Nuestro trabajo combina investigación fundamentada, experiencia práctica y experiencia real en neurodiversidad para crear recursos que marcan la diferencia en la vida de los estudiantes atípicos."}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {motivation.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 border-slate-700"
                >
                  <Card>
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{item.title[language]}</CardTitle>
                      <CardDescription className="text-slate-400">{item.description[language]}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <div>
        <h3 className="text-3xl font-bold text-center text-white mb-4">
          {language === "pt" && "Nossa Equipe"}
          {language === "en" && "Our Team"}
          {language === "es" && "Nuestro Equipo"}
        </h3>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          {language === "pt" &&
            "Uma equipe multidisciplinar que combina conhecimento acadêmico com experiência real em neurodiversidade, garantindo autenticidade e eficácia em nossos recursos."}
          {language === "en" &&
            "A multidisciplinary team that combines academic knowledge with real experience in neurodiversity, ensuring authenticity and effectiveness in our resources."}
          {language === "es" &&
            "Un equipo multidisciplinario que combina conocimiento académico con experiencia real en neurodiversidad, asegurando autenticidad y efectividad en nuestros recursos."}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => {
            const IconComponent = member.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card
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
                    <CardDescription className="text-blue-400 mb-2">{member.role[language]}</CardDescription>
                    <Badge className={`bg-blue-600 text-white mb-3 ${member.special ? "bg-blue-500" : ""}`}>
                      {member.specialization[language]}
                    </Badge>
                    {member.special && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white mb-2">
                        {language === "pt" && "Perspectiva Neurodiversa"}
                        {language === "en" && "Neurodiverse Perspective"}
                        {language === "es" && "Perspectiva Neurodiversa"}
                      </Badge>
                    )}
                    <p className="text-sm text-slate-400">{member.description[language]}</p>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Process */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white text-center mb-6">
            {language === "pt" && "Nosso Processo"}
            {language === "en" && "Our Process"}
            {language === "es" && "Nuestro Proceso"}
          </CardTitle>
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
                  <h4 className="text-lg font-semibold text-white mb-2">{step.title[language]}</h4>
                  <p className="text-sm text-slate-400">{step.description[language]}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Values and Principles */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-8">
          {language === "pt" && "Nossos Valores"}
          {language === "en" && "Our Values"}
          {language === "es" && "Nuestros Valores"}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-400 mb-2">📚</div>
            <div className="text-lg font-semibold text-white mb-2">
              {language === "pt" && "Fundamentação Científica"}
              {language === "en" && "Scientific Foundation"}
              {language === "es" && "Fundamentación Científica"}
            </div>
            <div className="text-sm text-slate-400">
              {language === "pt" && "Todos os recursos são baseados em pesquisas atuais e práticas comprovadas"}
              {language === "en" && "All resources are based on current and proven research practices"}
              {language === "es" && "Todos los recursos están basados en investigaciones actuales y prácticas probadas"}
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-400 mb-2">🌟</div>
            <div className="text-lg font-semibold text-white mb-2">
              {language === "pt" && "Experiência Autêntica"}
              {language === "en" && "Authentic Experience"}
              {language === "es" && "Experiencia Auténtica"}
            </div>
            <div className="text-sm text-slate-400">
              {language === "pt" && "Validação real através da perspectiva de pessoa neurodiversa"}
              {language === "en" && "Real validation through the perspective of a neurodiverse person"}
              {language === "es" && "Validación real a través de la perspectiva de una persona neurodiversa"}
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-400 mb-2">🎯</div>
            <div className="text-lg font-semibold text-white mb-2">
              {language === "pt" && "Praticidade"}
              {language === "en" && "Practicality"}
              {language === "es" && "Practicidad"}
            </div>
            <div className="text-sm text-slate-400">
              {language === "pt" && "Recursos prontos para aplicação imediata em sala de aula"}
              {language === "en" && "Resources ready for immediate application in the classroom"}
              {language === "es" && "Recursos listos para aplicación inmediata en el aula"}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <Card className="bg-slate-900/80 border-blue-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white mb-4">
            {language === "pt" && "Entre em Contato"}
            {language === "en" && "Contact Us"}
            {language === "es" && "Contáctenos"}
          </CardTitle>
          <CardDescription className="text-slate-200 mb-6">
            {language === "pt" &&
              "Tem sugestões, dúvidas ou gostaria de colaborar? Estamos sempre abertos ao diálogo com educadores e especialistas."}
            {language === "en" &&
              "Do you have suggestions, questions, or want to collaborate? We are always open to dialogue with educators and specialists."}
            {language === "es" &&
              "¿Tiene sugerencias, preguntas o desea colaborar? Siempre estamos abiertos al diálogo con educadores y especialistas."}
          </CardDescription>
          <div className="space-y-4 text-white">
            <p className="bg-blue-600/20 p-3 rounded-lg">
              {language === "pt" && "📧 Email: contato@atypicalclass.com.br"}
              {language === "en" && "📧 Email: contact@atypicalclass.com"}
              {language === "es" && "📧 Email: contacto@atypicalclass.com"}
            </p>
            <p className="bg-blue-600/20 p-3 rounded-lg">
              {language === "pt" && "💬 Feedback e sugestões são sempre bem-vindos"}
              {language === "en" && "💬 Feedback and suggestions are always welcome"}
              {language === "es" && "💬 Retroalimentación y sugerencias siempre son bienvenidas"}
            </p>
            <p className="bg-blue-600/20 p-3 rounded-lg">
              {language === "pt" && "🤝 Abertos a parcerias e colaborações"}
              {language === "en" && "🤝 Open to partnerships and collaborations"}
              {language === "es" && "🤝 Abiertos a asociaciones y colaboraciones"}
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
