"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Users,
  Lightbulb,
  GraduationCap,
  Heart,
  Brain,
  Eye,
  Ear,
  Code,
  BookMarked,
  Pencil,
} from "lucide-react"
import Header from "./components/header"
import AutismSection from "./components/autism-section"
import DownSyndromeSection from "./components/down-syndrome-section"
import ADHDSection from "./components/adhd-section"
import VisualImpairmentSection from "./components/visual-impairment-section"
import HearingImpairmentSection from "./components/hearing-impairment-section"
import ResourcesSection from "./components/resources-section"
import AboutSection from "./components/about-section"
import Link from "next/link"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const conditions = [
    {
      id: "autism",
      name: "Autismo",
      icon: Brain,
      color: "from-blue-500 to-blue-700",
      description: "Estratégias e recursos especializados",
      resourceCount: 12,
    },
    {
      id: "down",
      name: "Síndrome de Down",
      icon: Heart,
      color: "from-blue-400 to-blue-600",
      description: "Atividades e metodologias adaptadas",
      resourceCount: 10,
    },
    {
      id: "adhd",
      name: "TDAH",
      icon: Lightbulb,
      color: "from-blue-600 to-blue-800",
      description: "Técnicas de foco e concentração",
      resourceCount: 8,
    },
    {
      id: "visual",
      name: "Deficiência Visual",
      icon: Eye,
      color: "from-blue-300 to-blue-500",
      description: "Recursos táteis e adaptativos",
      resourceCount: 6,
    },
    {
      id: "hearing",
      name: "Deficiência Auditiva",
      icon: Ear,
      color: "from-blue-700 to-blue-900",
      description: "Comunicação visual e inclusiva",
      resourceCount: 7,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-1 mb-8 bg-gray-950/70 border border-gray-800 p-2">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Início
            </TabsTrigger>
            <TabsTrigger value="autism" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Autismo
            </TabsTrigger>
            <TabsTrigger value="down" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Síndrome de Down
            </TabsTrigger>
            <TabsTrigger value="adhd" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              TDAH
            </TabsTrigger>
            <TabsTrigger value="visual" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Def. Visual
            </TabsTrigger>
            <TabsTrigger value="hearing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Def. Auditiva
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Recursos
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Sobre
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-12">
            {/* Hero Section with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl blur-3xl"></div>
              <div className="relative z-10 p-12">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-full px-6 py-2 mb-6"
                >
                  <Code className="w-5 h-5 mr-2 text-blue-400" />
                  <span className="text-blue-300">Plataforma Educacional - 2025</span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-6"
                >
                  AtypicalClass
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-2xl text-slate-300 max-w-4xl mx-auto mb-8"
                >
                  Uma plataforma dedicada a apoiar professores no trabalho com alunos atípicos, oferecendo recursos
                  práticos, estratégias comprovadas e materiais adaptados para uma educação verdadeiramente inclusiva.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex justify-center space-x-4 mb-8"
                >
                  <div className="bg-gradient-to-r from-blue-600/30 to-blue-700/30 border border-blue-500/30 px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">81</div>
                    <div className="text-sm text-blue-200">Recursos Disponíveis</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/30 to-blue-600/30 border border-blue-400/30 px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">5</div>
                    <div className="text-sm text-blue-200">Áreas Especializadas</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-700/30 to-blue-800/30 border border-blue-600/30 px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">100%</div>
                    <div className="text-sm text-blue-200">Gratuito</div>
                  </div>
                </motion.div>

                {/* Quick Access Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Link href="/questoes">
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 text-lg">
                      <BookMarked className="w-5 h-5 mr-2" />
                      Questões Adaptadas
                    </Button>
                  </Link>
                  <Link href="/conteudos">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 text-lg">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Conteúdos Pedagógicos
                    </Button>
                  </Link>
                  <Link href="/contribuir">
                    <Button className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-3 text-lg">
                      <Pencil className="w-5 h-5 mr-2" />
                      Contribuir
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Project Info with Staggered Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {[
                {
                  icon: BookOpen,
                  title: "Pesquisa Fundamentada",
                  description: "Conteúdo baseado em literatura especializada e práticas comprovadas",
                  gradient: "from-blue-500 to-blue-700",
                  delay: 0.1,
                },
                {
                  icon: Users,
                  title: "Experiência Real",
                  description: "Desenvolvido com vivência prática em neurodiversidade",
                  gradient: "from-blue-400 to-blue-600",
                  delay: 0.2,
                },
                {
                  icon: Lightbulb,
                  title: "Recursos Práticos",
                  description: "Atividades e materiais prontos para uso em sala de aula",
                  gradient: "from-blue-600 to-blue-800",
                  delay: 0.3,
                },
                {
                  icon: GraduationCap,
                  title: "Educação Inclusiva",
                  description: "Promovendo igualdade de oportunidades para todos os alunos",
                  gradient: "from-blue-300 to-blue-500",
                  delay: 0.4,
                },
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + item.delay, duration: 0.5 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <Card className="bg-gray-950/70 border-gray-800 hover:bg-slate-900/70 transition-all duration-300 h-full">
                      <CardHeader className="text-center pb-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                        <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                        <CardDescription className="text-slate-400">{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Conditions Grid with Hover Effects */}
            <div className="mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
              >
                Áreas de Especialização
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="text-center text-slate-400 mb-12 max-w-2xl mx-auto"
              >
                Recursos especializados desenvolvidos para atender às necessidades específicas de diferentes perfis de
                alunos atípicos.
              </motion.p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {conditions.map((condition, index) => {
                  const IconComponent = condition.icon
                  return (
                    <motion.div
                      key={condition.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    >
                      <Card
                        className="bg-gray-950/70 border-gray-800 hover:bg-slate-900/70 transition-all duration-300 cursor-pointer group h-full"
                        onClick={() => setActiveTab(condition.id)}
                      >
                        <CardHeader className="text-center">
                          <motion.div
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                            className={`w-20 h-20 bg-gradient-to-br ${condition.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                          >
                            <IconComponent className="w-10 h-10 text-white" />
                          </motion.div>
                          <CardTitle className="text-2xl text-white mb-3">{condition.name}</CardTitle>
                          <CardDescription className="text-slate-200 mb-4">{condition.description}</CardDescription>
                          <div className="bg-slate-800/50 px-3 py-1 rounded-full inline-block">
                            <span className="text-blue-400 font-semibold">{condition.resourceCount}</span>
                            <span className="text-slate-200"> recursos disponíveis</span>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="autism">
            <AutismSection />
          </TabsContent>

          <TabsContent value="down">
            <DownSyndromeSection />
          </TabsContent>

          <TabsContent value="adhd">
            <ADHDSection />
          </TabsContent>

          <TabsContent value="visual">
            <VisualImpairmentSection />
          </TabsContent>

          <TabsContent value="hearing">
            <HearingImpairmentSection />
          </TabsContent>

          <TabsContent value="resources">
            <ResourcesSection />
          </TabsContent>

          <TabsContent value="about">
            <AboutSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
