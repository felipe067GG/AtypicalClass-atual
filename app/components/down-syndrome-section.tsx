"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, BookOpen, Download, Clock, ExternalLink, Target, Star } from "lucide-react"
import ActivityDetailsModal from "./activity-details-modal"
import { useState } from "react"
import { DownloadButton } from "@/components/download-button"
import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/useLanguage"

export default function DownSyndromeSection() {
  const { t } = useLanguage()
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const strategies = [
    {
      title: t("strategies.aprendizagemVisual.title"),
      description: t("strategies.aprendizagemVisual.description"),
      tips: [
        t("strategies.aprendizagemVisual.tips1"),
        t("strategies.aprendizagemVisual.tips2"),
        t("strategies.aprendizagemVisual.tips3"),
      ],
      source: t("strategies.aprendizagemVisual.source"),
      difficulty: t("strategies.aprendizagemVisual.difficulty"),
      effectiveness: 94,
    },
    {
      title: t("strategies.repeticaoReforco.title"),
      description: t("strategies.repeticaoReforco.description"),
      tips: [
        t("strategies.repeticaoReforco.tips1"),
        t("strategies.repeticaoReforco.tips2"),
        t("strategies.repeticaoReforco.tips3"),
      ],
      source: t("strategies.repeticaoReforco.source"),
      difficulty: t("strategies.repeticaoReforco.difficulty"),
      effectiveness: 96,
    },
    {
      title: t("strategies.tempoAdicional.title"),
      description: t("strategies.tempoAdicional.description"),
      tips: [
        t("strategies.tempoAdicional.tips1"),
        t("strategies.tempoAdicional.tips2"),
        t("strategies.tempoAdicional.tips3"),
      ],
      source: t("strategies.tempoAdicional.source"),
      difficulty: t("strategies.tempoAdicional.difficulty"),
      effectiveness: 89,
    },
    {
      title: t("strategies.comunicacaoSimplificada.title"),
      description: t("strategies.comunicacaoSimplificada.description"),
      tips: [
        t("strategies.comunicacaoSimplificada.tips1"),
        t("strategies.comunicacaoSimplificada.tips2"),
        t("strategies.comunicacaoSimplificada.tips3"),
      ],
      source: t("strategies.comunicacaoSimplificada.source"),
      difficulty: t("strategies.comunicacaoSimplificada.difficulty"),
      effectiveness: 92,
    },
    {
      title: t("strategies.motivacaoAutoestima.title"),
      description: t("strategies.motivacaoAutoestima.description"),
      tips: [
        t("strategies.motivacaoAutoestima.tips1"),
        t("strategies.motivacaoAutoestima.tips2"),
        t("strategies.motivacaoAutoestima.tips3"),
      ],
      source: t("strategies.motivacaoAutoestima.source"),
      difficulty: t("strategies.motivacaoAutoestima.difficulty"),
      effectiveness: 98,
    },
    {
      title: t("strategies.habilidadesSociais.title"),
      description: t("strategies.habilidadesSociais.description"),
      tips: [
        t("strategies.habilidadesSociais.tips1"),
        t("strategies.habilidadesSociais.tips2"),
        t("strategies.habilidadesSociais.tips3"),
      ],
      source: t("strategies.habilidadesSociais.source"),
      difficulty: t("strategies.habilidadesSociais.difficulty"),
      effectiveness: 87,
    },
  ]

  const activities = [
    {
      id: "sistemaRecompensasVisuais",
      name: t("activities.sistemaRecompensasVisuais.name"),
      age: t("activities.sistemaRecompensasVisuais.age"),
      duration: t("activities.sistemaRecompensasVisuais.duration"),
      description: t("activities.sistemaRecompensasVisuais.description"),
      materials: [
        t("activities.sistemaRecompensasVisuais.materials1"),
        t("activities.sistemaRecompensasVisuais.materials2"),
        t("activities.sistemaRecompensasVisuais.materials3"),
        t("activities.sistemaRecompensasVisuais.materials4"),
      ],
      implementation: t("activities.sistemaRecompensasVisuais.implementation"),
      objectives: [
        t("activities.sistemaRecompensasVisuais.objectives1"),
        t("activities.sistemaRecompensasVisuais.objectives2"),
        t("activities.sistemaRecompensasVisuais.objectives3"),
      ],
      rating: 4.9,
      downloads: 2340,
    },
    {
      id: "jogosMemoriaAdaptados",
      name: t("activities.jogosMemoriaAdaptados.name"),
      age: t("activities.jogosMemoriaAdaptados.age"),
      duration: t("activities.jogosMemoriaAdaptados.duration"),
      description: t("activities.jogosMemoriaAdaptados.description"),
      materials: [
        t("activities.jogosMemoriaAdaptados.materials1"),
        t("activities.jogosMemoriaAdaptados.materials2"),
        t("activities.jogosMemoriaAdaptados.materials3"),
      ],
      implementation: t("activities.jogosMemoriaAdaptados.implementation"),
      objectives: [
        t("activities.jogosMemoriaAdaptados.objectives1"),
        t("activities.jogosMemoriaAdaptados.objectives2"),
        t("activities.jogosMemoriaAdaptados.objectives3"),
      ],
      rating: 4.8,
      downloads: 1890,
    },
    {
      id: "rotinaVidaDiaria",
      name: t("activities.rotinaVidaDiaria.name"),
      age: t("activities.rotinaVidaDiaria.age"),
      duration: t("activities.rotinaVidaDiaria.duration"),
      description: t("activities.rotinaVidaDiaria.description"),
      materials: [
        t("activities.rotinaVidaDiaria.materials1"),
        t("activities.rotinaVidaDiaria.materials2"),
        t("activities.rotinaVidaDiaria.materials3"),
      ],
      implementation: t("activities.rotinaVidaDiaria.implementation"),
      objectives: [
        t("activities.rotinaVidaDiaria.objectives1"),
        t("activities.rotinaVidaDiaria.objectives2"),
        t("activities.rotinaVidaDiaria.objectives3"),
      ],
      rating: 4.7,
      downloads: 2100,
    },
    {
      id: "teatroExpressaoEmocional",
      name: t("activities.teatroExpressaoEmocional.name"),
      age: t("activities.teatroExpressaoEmocional.age"),
      duration: t("activities.teatroExpressaoEmocional.duration"),
      description: t("activities.teatroExpressaoEmocional.description"),
      materials: [
        t("activities.teatroExpressaoEmocional.materials1"),
        t("activities.teatroExpressaoEmocional.materials2"),
        t("activities.teatroExpressaoEmocional.materials3"),
      ],
      implementation: t("activities.teatroExpressaoEmocional.implementation"),
      objectives: [
        t("activities.teatroExpressaoEmocional.objectives1"),
        t("activities.teatroExpressaoEmocional.objectives2"),
        t("activities.teatroExpressaoEmocional.objectives3"),
      ],
      rating: 4.6,
      downloads: 1650,
    },
    {
      id: "atividadeHistoria",
      name: t("activities.atividadeHistoria.name"),
      age: t("activities.atividadeHistoria.age"),
      duration: t("activities.atividadeHistoria.duration"),
      description: t("activities.atividadeHistoria.description"),
      materials: [
        t("activities.atividadeHistoria.materials1"),
        t("activities.atividadeHistoria.materials2"),
        t("activities.atividadeHistoria.materials3"),
      ],
      implementation: t("activities.atividadeHistoria.implementation"),
      objectives: [
        t("activities.atividadeHistoria.objectives1"),
        t("activities.atividadeHistoria.objectives2"),
        t("activities.atividadeHistoria.objectives3"),
      ],
      rating: 4.5,
      downloads: 1100,
      downloadFile: "historia-familia-real",
    },
    {
      id: "atividadeQuimica",
      name: t("activities.atividadeQuimica.name"),
      age: t("activities.atividadeQuimica.age"),
      duration: t("activities.atividadeQuimica.duration"),
      description: t("activities.atividadeQuimica.description"),
      materials: [
        t("activities.atividadeQuimica.materials1"),
        t("activities.atividadeQuimica.materials2"),
        t("activities.atividadeQuimica.materials3"),
      ],
      implementation: t("activities.atividadeQuimica.implementation"),
      objectives: [
        t("activities.atividadeQuimica.objectives1"),
        t("activities.atividadeQuimica.objectives2"),
        t("activities.atividadeQuimica.objectives3"),
      ],
      rating: 4.4,
      downloads: 890,
      downloadFile: "quimica-pilha-daniell",
    },
  ]

  const courses = [
    {
      title: t("courses.desenvolvimentoPessoa.title"),
      provider: t("courses.desenvolvimentoPessoa.provider"),
      duration: t("courses.desenvolvimentoPessoa.duration"),
      price: t("courses.desenvolvimentoPessoa.price"),
      rating: 4.8,
      students: 4200,
      certificate: true,
      level: t("courses.desenvolvimentoPessoa.level"),
      modules: 12,
      url: t("courses.desenvolvimentoPessoa.url"),
    },
    {
      title: t("courses.desenvolvimentoPessoa.title"),
      provider: t("courses.desenvolvimentoPessoa.provider"),
      duration: t("courses.desenvolvimentoPessoa.duration"),
      price: t("courses.desenvolvimentoPessoa.priceFree"),
      rating: 4.6,
      students: 6800,
      certificate: true,
      level: t("courses.desenvolvimentoPessoa.levelBasic"),
      modules: 8,
      url: t("courses.desenvolvimentoPessoa.url"),
    },
    {
      title: t("courses.cursosEspecial.title"),
      provider: t("courses.cursosEspecial.provider"),
      duration: t("courses.cursosEspecial.duration"),
      price: t("courses.cursosEspecial.price"),
      rating: 4.7,
      students: 3500,
      certificate: true,
      level: t("courses.cursosEspecial.level"),
      modules: 15,
      url: t("courses.cursosEspecial.url"),
    },
    {
      title: t("courses.inclusaoCrianca.title"),
      provider: t("courses.inclusaoCrianca.provider"),
      duration: t("courses.inclusaoCrianca.duration"),
      price: t("courses.inclusaoCrianca.price"),
      rating: 4.5,
      students: 2900,
      certificate: true,
      level: t("courses.inclusaoCrianca.level"),
      modules: 6,
      url: t("courses.inclusaoCrianca.url"),
    },
  ]

  const resources = [
    {
      title: t("resources.manualCompleto.title"),
      type: t("resources.manualCompleto.type"),
      description: t("resources.manualCompleto.description"),
      featured: true,
      content: t("resources.manualCompleto.content"),
    },
    {
      title: t("resources.kitAtividades.title"),
      type: t("resources.kitAtividades.type"),
      description: t("resources.kitAtividades.description"),
      featured: false,
      content: t("resources.kitAtividades.content"),
    },
    {
      title: t("resources.protocoloAvaliacao.title"),
      type: t("resources.protocoloAvaliacao.type"),
      description: t("resources.protocoloAvaliacao.description"),
      featured: true,
      content: t("resources.protocoloAvaliacao.content"),
    },
    {
      title: t("resources.jogosEducativos.title"),
      type: t("resources.jogosEducativos.type"),
      description: t("resources.jogosEducativos.description"),
      featured: false,
      content: t("resources.jogosEducativos.content"),
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case t("common.basic"):
        return "bg-blue-600"
      case t("common.intermediate"):
        return "bg-blue-500"
      case t("common.advanced"):
        return "bg-blue-700"
      default:
        return "bg-gray-600"
    }
  }

  const handleDownload = (resource: any) => {
    const blob = new Blob([resource.content], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${resource.title.toLowerCase().replace(/\s+/g, "-")}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    const notification = document.createElement("div")
    notification.innerHTML = `✅ ${t("common.downloadStarted")}: ${resource.title}`
    notification.style.cssText =
      "position:fixed;top:20px;right:20px;background:#10b981;color:white;padding:12px;border-radius:8px;z-index:9999;"
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 3000)
  }

  const handleViewDetails = (activity: any) => {
    const detailedActivity = {
      ...activity,
      detailedDescription: getDetailedDescription(activity.id || activity.name),
      stepByStep: getStepByStep(activity.id || activity.name),
      tips: getTips(activity.id || activity.name),
      variations: getVariations(activity.id || activity.name),
      assessment: getAssessment(activity.id || activity.name),
    }
    setSelectedActivity(detailedActivity)
    setIsModalOpen(true)
  }

  const getDetailedDescription = (idOrName: string) => {
    if (idOrName === "sistemaRecompensasVisuais" || idOrName === t("activities.sistemaRecompensasVisuais.name")) {
      return t("activities.sistemaRecompensasVisuais.detailedDescription")
    }
    if (idOrName === "jogosMemoriaAdaptados" || idOrName === t("activities.jogosMemoriaAdaptados.name")) {
      return t("activities.jogosMemoriaAdaptados.detailedDescription")
    }
    if (idOrName === "rotinaVidaDiaria" || idOrName === t("activities.rotinaVidaDiaria.name")) {
      return t("activities.rotinaVidaDiaria.detailedDescription")
    }
    if (idOrName === "teatroExpressaoEmocional" || idOrName === t("activities.teatroExpressaoEmocional.name")) {
      return t("activities.teatroExpressaoEmocional.detailedDescription")
    }
    return t("common.activityDeveloped") || "Atividade desenvolvida especificamente para alunos com Síndrome de Down"
  }

  const getStepByStep = (idOrName: string) => {
    if (idOrName === "sistemaRecompensasVisuais" || idOrName === t("activities.sistemaRecompensasVisuais.name")) {
      return [
        t("activities.sistemaRecompensasVisuais.step1"),
        t("activities.sistemaRecompensasVisuais.step2"),
        t("activities.sistemaRecompensasVisuais.step3"),
        t("activities.sistemaRecompensasVisuais.step4"),
        t("activities.sistemaRecompensasVisuais.step5"),
        t("activities.sistemaRecompensasVisuais.step6"),
        t("activities.sistemaRecompensasVisuais.step7"),
        t("activities.sistemaRecompensasVisuais.step8"),
      ]
    }
    if (idOrName === "jogosMemoriaAdaptados" || idOrName === t("activities.jogosMemoriaAdaptados.name")) {
      return [
        t("activities.jogosMemoriaAdaptados.step1"),
        t("activities.jogosMemoriaAdaptados.step2"),
        t("activities.jogosMemoriaAdaptados.step3"),
        t("activities.jogosMemoriaAdaptados.step4"),
        t("activities.jogosMemoriaAdaptados.step5"),
        t("activities.jogosMemoriaAdaptados.step6"),
        t("activities.jogosMemoriaAdaptados.step7"),
        t("activities.jogosMemoriaAdaptados.step8"),
      ]
    }
    if (idOrName === "rotinaVidaDiaria" || idOrName === t("activities.rotinaVidaDiaria.name")) {
      return [
        t("activities.rotinaVidaDiaria.step1"),
        t("activities.rotinaVidaDiaria.step2"),
        t("activities.rotinaVidaDiaria.step3"),
        t("activities.rotinaVidaDiaria.step4"),
        t("activities.rotinaVidaDiaria.step5"),
        t("activities.rotinaVidaDiaria.step6"),
        t("activities.rotinaVidaDiaria.step7"),
        t("activities.rotinaVidaDiaria.step8"),
      ]
    }
    return [
      t("common.prepareMaterials") || "Prepare materiais",
      t("common.explainSimply") || "Explique de forma simples",
      t("common.demonstrateFirst") || "Demonstre primeiro",
      t("common.allowExtraTime") || "Permita tempo extra",
      t("common.offerHelp") || "Ofereça ajuda",
      t("common.celebrateProgress") || "Celebre progressos",
    ]
  }

  const getTips = (idOrName: string) => {
    if (idOrName === "sistemaRecompensasVisuais" || idOrName === t("activities.sistemaRecompensasVisuais.name")) {
      return [
        t("activities.sistemaRecompensasVisuais.tip1"),
        t("activities.sistemaRecompensasVisuais.tip2"),
        t("activities.sistemaRecompensasVisuais.tip3"),
        t("activities.sistemaRecompensasVisuais.tip4"),
        t("activities.sistemaRecompensasVisuais.tip5"),
      ]
    }
    if (idOrName === "jogosMemoriaAdaptados" || idOrName === t("activities.jogosMemoriaAdaptados.name")) {
      return [
        t("activities.jogosMemoriaAdaptados.tip1"),
        t("activities.jogosMemoriaAdaptados.tip2"),
        t("activities.jogosMemoriaAdaptados.tip3"),
        t("activities.jogosMemoriaAdaptados.tip4"),
        t("activities.jogosMemoriaAdaptados.tip5"),
      ]
    }
    if (idOrName === "rotinaVidaDiaria" || idOrName === t("activities.rotinaVidaDiaria.name")) {
      return [
        t("activities.rotinaVidaDiaria.tip1"),
        t("activities.rotinaVidaDiaria.tip2"),
        t("activities.rotinaVidaDiaria.tip3"),
        t("activities.rotinaVidaDiaria.tip4"),
      ]
    }
    return [
      t("common.useSimpleLanguage") || "Use linguagem simples",
      t("common.allowExtraTimeAlways") || "Permita tempo extra sempre",
      t("common.celebrateSmallWins") || "Celebre pequenas vitórias",
      t("common.maintainPatience") || "Mantenha paciência",
    ]
  }

  const getVariations = (idOrName: string) => {
    if (idOrName === "sistemaRecompensasVisuais" || idOrName === t("activities.sistemaRecompensasVisuais.name")) {
      return [
        t("activities.sistemaRecompensasVisuais.variation1"),
        t("activities.sistemaRecompensasVisuais.variation2"),
        t("activities.sistemaRecompensasVisuais.variation3"),
        t("activities.sistemaRecompensasVisuais.variation4"),
        t("activities.sistemaRecompensasVisuais.variation5"),
      ]
    }
    if (idOrName === "jogosMemoriaAdaptados" || idOrName === t("activities.jogosMemoriaAdaptados.name")) {
      return [
        t("activities.jogosMemoriaAdaptados.variation1"),
        t("activities.jogosMemoriaAdaptados.variation2"),
        t("activities.jogosMemoriaAdaptados.variation3"),
      ]
    }
    return []
  }

  const getAssessment = (idOrName: string) => {
    if (idOrName === "sistemaRecompensasVisuais" || idOrName === t("activities.sistemaRecompensasVisuais.name")) {
      return [
        t("activities.sistemaRecompensasVisuais.assessment1"),
        t("activities.sistemaRecompensasVisuais.assessment2"),
        t("activities.sistemaRecompensasVisuais.assessment3"),
        t("activities.sistemaRecompensasVisuais.assessment4"),
      ]
    }
    if (idOrName === "jogosMemoriaAdaptados" || idOrName === t("activities.jogosMemoriaAdaptados.name")) {
      return [
        t("activities.jogosMemoriaAdaptados.assessment1"),
        t("activities.jogosMemoriaAdaptados.assessment2"),
        t("activities.jogosMemoriaAdaptados.assessment3"),
        t("activities.jogosMemoriaAdaptados.assessment4"),
      ]
    }
    if (idOrName === "rotinaVidaDiaria" || idOrName === t("activities.rotinaVidaDiaria.name")) {
      return [
        t("activities.rotinaVidaDiaria.assessment1"),
        t("activities.rotinaVidaDiaria.assessment2"),
        t("activities.rotinaVidaDiaria.assessment3"),
      ]
    }
    return []
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl blur-3xl"></div>
        <div className="relative z-10 p-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">{t("downSyndromeTitle")}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">{t("downSyndromeDescription")}</p>
          <div className="flex justify-center space-x-6">
            <div className="bg-gray-950/70 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">19</div>
              <div className="text-sm text-gray-400">{t("downSyndromeResources")}</div>
            </div>
            <div className="bg-gray-950/70 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">✓</div>
              <div className="text-sm text-gray-400">{t("downSyndromePracticalValidation")}</div>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="strategies" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-950/70 border border-gray-800">
          <TabsTrigger value="strategies" className="data-[state=active]:bg-blue-600">
            {t("tabStrategies")}
          </TabsTrigger>
          <TabsTrigger value="activities" className="data-[state=active]:bg-blue-600">
            {t("tabActivities")}
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-blue-600">
            {t("tabCourses")}
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600">
            {t("tabResources")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-blue-400">{strategy.title}</CardTitle>
                      <Badge className={`${getDifficultyColor(strategy.difficulty)} text-white`}>
                        {strategy.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300">{strategy.description}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>
                          {strategy.effectiveness}% {t("efficacious")}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {strategy.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs text-gray-500 italic border-t border-gray-800 pt-2">{strategy.source}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-white mb-2">{activity.name}</CardTitle>
                        <div className="flex items-center space-x-4 mb-3">
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {activity.age}
                          </Badge>
                          <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{activity.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{activity.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-300">{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">{t("materials")}</h5>
                      <div className="flex flex-wrap gap-1">
                        {activity.materials.map((material, i) => (
                          <Badge key={i} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">{t("objectives")}</h5>
                      <div className="flex flex-wrap gap-1">
                        {activity.objectives.map((objective, i) => (
                          <Badge key={i} className="bg-blue-600 text-white text-xs">
                            {objective}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">{t("implementation")}</h5>
                      <p className="text-sm text-gray-300">{activity.implementation}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-400">
                        {activity.downloads} {t("downloads")}
                      </span>
                      {activity.downloadFile ? (
                        <DownloadButton fileBaseName={activity.downloadFile} label={t("downloadFree")} />
                      ) : (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleViewDetails(activity)}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          {t("viewDetails")}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg text-white">{course.title}</CardTitle>
                      {course.certificate && <Badge className="bg-blue-600 text-white">{t("certificate")}</Badge>}
                    </div>
                    <CardDescription className="text-blue-400">{course.provider}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {course.modules} {t("modules")}
                        </span>
                      </div>
                      <Badge className={getDifficultyColor(course.level)}>{course.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-white">{course.rating}</span>
                        </div>
                        <span className="text-gray-400">
                          ({course.students} {t("students")})
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-blue-400">{course.price}</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                      onClick={() => window.open(course.url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("accessCourse")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  className={`bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300 ${
                    resource.featured ? "ring-2 ring-blue-500/50" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-white">{resource.title}</CardTitle>
                      {resource.featured && <Badge className="bg-blue-500 text-white">{t("featured")}</Badge>}
                    </div>
                    <Badge className="bg-blue-600 text-white w-fit">{resource.type}</Badge>
                    <CardDescription className="text-gray-300">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                      onClick={() => handleDownload(resource)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t("downloadFree")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <ActivityDetailsModal isOpen={isModalOpen} onClose={closeModal} activity={selectedActivity} />
    </div>
  )
}
