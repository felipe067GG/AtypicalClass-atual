"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ear, BookOpen, Download, Clock, ExternalLink, Target, Star } from "lucide-react"
import ActivityDetailsModal from "./activity-details-modal"
import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"

export default function HearingImpairmentSection() {
  const { t } = useLanguage()
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const strategies = [
    {
      title: t("hearingStrategies.communicationVisual.title"),
      description: t("hearingStrategies.communicationVisual.description"),
      tips: [
        t("hearingStrategies.communicationVisual.tip1"),
        t("hearingStrategies.communicationVisual.tip2"),
        t("hearingStrategies.communicationVisual.tip3"),
      ],
      source: t("hearingStrategies.communicationVisual.source"),
      difficulty: t("hearingCommon.basic"),
      effectiveness: 96,
    },
    {
      title: t("hearingStrategies.assistiveTechnology.title"),
      description: t("hearingStrategies.assistiveTechnology.description"),
      tips: [
        t("hearingStrategies.assistiveTechnology.tip1"),
        t("hearingStrategies.assistiveTechnology.tip2"),
        t("hearingStrategies.assistiveTechnology.tip3"),
      ],
      source: t("hearingStrategies.assistiveTechnology.source"),
      difficulty: t("hearingCommon.advanced"),
      effectiveness: 89,
    },
    {
      title: t("hearingStrategies.adaptedEnvironment.title"),
      description: t("hearingStrategies.adaptedEnvironment.description"),
      tips: [
        t("hearingStrategies.adaptedEnvironment.tip1"),
        t("hearingStrategies.adaptedEnvironment.tip2"),
        t("hearingStrategies.adaptedEnvironment.tip3"),
      ],
      source: t("hearingStrategies.adaptedEnvironment.source"),
      difficulty: t("hearingCommon.intermediate"),
      effectiveness: 93,
    },
    {
      title: t("hearingStrategies.lipReading.title"),
      description: t("hearingStrategies.lipReading.description"),
      tips: [
        t("hearingStrategies.lipReading.tip1"),
        t("hearingStrategies.lipReading.tip2"),
        t("hearingStrategies.lipReading.tip3"),
      ],
      source: t("hearingStrategies.lipReading.source"),
      difficulty: t("hearingCommon.intermediate"),
      effectiveness: 85,
    },
    {
      title: t("hearingStrategies.visualEducationalResources.title"),
      description: t("hearingStrategies.visualEducationalResources.description"),
      tips: [
        t("hearingStrategies.visualEducationalResources.tip1"),
        t("hearingStrategies.visualEducationalResources.tip2"),
        t("hearingStrategies.visualEducationalResources.tip3"),
      ],
      source: t("hearingStrategies.visualEducationalResources.source"),
      difficulty: t("hearingCommon.basic"),
      effectiveness: 91,
    },
    {
      title: t("hearingStrategies.deafCulture.title"),
      description: t("hearingStrategies.deafCulture.description"),
      tips: [
        t("hearingStrategies.deafCulture.tip1"),
        t("hearingStrategies.deafCulture.tip2"),
        t("hearingStrategies.deafCulture.tip3"),
      ],
      source: t("hearingStrategies.deafCulture.source"),
      difficulty: t("hearingCommon.intermediate"),
      effectiveness: 88,
    },
  ]

  const activities = [
    {
      name: t("hearingActivities.dramaticSignLanguageEducation.name"),
      age: t("hearingActivities.dramaticSignLanguageEducation.age"),
      duration: t("hearingActivities.dramaticSignLanguageEducation.duration"),
      description: t("hearingActivities.dramaticSignLanguageEducation.description"),
      materials: [
        t("hearingActivities.dramaticSignLanguageEducation.material1"),
        t("hearingActivities.dramaticSignLanguageEducation.material2"),
        t("hearingActivities.dramaticSignLanguageEducation.material3"),
        t("hearingActivities.dramaticSignLanguageEducation.material4"),
      ],
      implementation: t("hearingActivities.dramaticSignLanguageEducation.implementation"),
      objectives: [
        t("hearingActivities.dramaticSignLanguageEducation.objective1"),
        t("hearingActivities.dramaticSignLanguageEducation.objective2"),
        t("hearingActivities.dramaticSignLanguageEducation.objective3"),
      ],
      rating: 4.8,
      downloads: 1750,
    },
    {
      name: t("hearingActivities.interactiveVisualGames.name"),
      age: t("hearingActivities.interactiveVisualGames.age"),
      duration: t("hearingActivities.interactiveVisualGames.duration"),
      description: t("hearingActivities.interactiveVisualGames.description"),
      materials: [
        t("hearingActivities.interactiveVisualGames.material1"),
        t("hearingActivities.interactiveVisualGames.material2"),
        t("hearingActivities.interactiveVisualGames.material3"),
        t("hearingActivities.interactiveVisualGames.material4"),
      ],
      implementation: t("hearingActivities.interactiveVisualGames.implementation"),
      objectives: [
        t("hearingActivities.interactiveVisualGames.objective1"),
        t("hearingActivities.interactiveVisualGames.objective2"),
        t("hearingActivities.interactiveVisualGames.objective3"),
      ],
      rating: 4.7,
      downloads: 2100,
    },
    {
      name: t("hearingActivities.illustratedStoriesWithLibras.name"),
      age: t("hearingActivities.illustratedStoriesWithLibras.age"),
      duration: t("hearingActivities.illustratedStoriesWithLibras.duration"),
      description: t("hearingActivities.illustratedStoriesWithLibras.description"),
      materials: [
        t("hearingActivities.illustratedStoriesWithLibras.material1"),
        t("hearingActivities.illustratedStoriesWithLibras.material2"),
        t("hearingActivities.illustratedStoriesWithLibras.material3"),
        t("hearingActivities.illustratedStoriesWithLibras.material4"),
      ],
      implementation: t("hearingActivities.illustratedStoriesWithLibras.implementation"),
      objectives: [
        t("hearingActivities.illustratedStoriesWithLibras.objective1"),
        t("hearingActivities.illustratedStoriesWithLibras.objective2"),
        t("hearingActivities.illustratedStoriesWithLibras.objective3"),
      ],
      rating: 4.6,
      downloads: 1890,
    },
    {
      name: t("hearingActivities.visualCommunicationLab.name"),
      age: t("hearingActivities.visualCommunicationLab.age"),
      duration: t("hearingActivities.visualCommunicationLab.duration"),
      description: t("hearingActivities.visualCommunicationLab.description"),
      materials: [
        t("hearingActivities.visualCommunicationLab.material1"),
        t("hearingActivities.visualCommunicationLab.material2"),
        t("hearingActivities.visualCommunicationLab.material3"),
        t("hearingActivities.visualCommunicationLab.material4"),
      ],
      implementation: t("hearingActivities.visualCommunicationLab.implementation"),
      objectives: [
        t("hearingActivities.visualCommunicationLab.objective1"),
        t("hearingActivities.visualCommunicationLab.objective2"),
        t("hearingActivities.visualCommunicationLab.objective3"),
      ],
      rating: 4.9,
      downloads: 1650,
    },
  ]

  const courses = [
    {
      title: t("hearingCourses.audiologyEducation.title"),
      provider: t("hearingCourses.audiologyEducation.provider"),
      duration: t("hearingCourses.audiologyEducation.duration"),
      price: t("hearingCourses.audiologyEducation.price"),
      rating: 4.8,
      students: 2100,
      certificate: true,
      level: t("hearingCommon.postGraduation"),
      modules: 15,
      url: "https://cenes.com.br/curso/audiologia-educacional",
    },
    {
      title: t("hearingCourses.hearingImpairmentAndDeafness.title"),
      provider: t("hearingCourses.hearingImpairmentAndDeafness.provider"),
      duration: t("hearingCourses.hearingImpairmentAndDeafness.duration"),
      price: t("hearingCommon.free"),
      rating: 4.6,
      students: 6200,
      certificate: true,
      level: t("hearingCommon.basic"),
      modules: 8,
      url: "https://www.ewcursos.com/curso/curso-gratuito-de-deficiencia-auditiva-e-surdez",
    },
    {
      title: t("hearingCourses.workingWithHearingImpaired.title"),
      provider: t("hearingCourses.workingWithHearingImpaired.provider"),
      duration: t("hearingCourses.workingWithHearingImpaired.duration"),
      price: t("hearingCourses.workingWithHearingImpaired.price"),
      rating: 4.7,
      students: 3800,
      certificate: true,
      level: t("hearingCommon.intermediate"),
      modules: 9,
      url: "https://educamundo.com.br/cursos-online/trabalhando-com-deficientes-auditivos/",
    },
    {
      title: t("hearingCourses.hearingImpairmentTraining.title"),
      provider: t("hearingCourses.hearingImpairmentTraining.provider"),
      duration: t("hearingCourses.hearingImpairmentTraining.duration"),
      price: t("hearingCourses.hearingImpairmentTraining.price"),
      rating: 4.5,
      students: 1500,
      certificate: true,
      level: t("hearingCommon.advanced"),
      modules: 12,
      url: "https://fasouza.com.br/capacitacao-profissional/capacitacao-deficiencia-auditiva-180-horas",
    },
  ]

  const resources = [
    {
      title: t("hearingResources.guideForTeachers.name"),
      type: t("hearingResources.guideForTeachers.type"),
      description: t("hearingResources.guideForTeachers.description"),
      featured: true,
      content: t("hearingResources.guideForTeachers.content"),
    },
    {
      title: t("hearingResources.visualLibrasDictionary.name"),
      type: t("hearingResources.visualLibrasDictionary.type"),
      description: t("hearingResources.visualLibrasDictionary.description"),
      featured: false,
      content: t("hearingResources.visualLibrasDictionary.content"),
    },
    {
      title: t("hearingResources.auditEvaluationProtocol.name"),
      type: t("hearingResources.auditEvaluationProtocol.type"),
      description: t("hearingResources.auditEvaluationProtocol.description"),
      featured: true,
      content: t("hearingResources.auditEvaluationProtocol.content"),
    },
    {
      title: t("hearingResources.visualActivitiesForDeaf.name"),
      type: t("hearingResources.visualActivitiesForDeaf.type"),
      description: t("hearingResources.visualActivitiesForDeaf.description"),
      featured: false,
      content: t("hearingResources.visualActivitiesForDeaf.content"),
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case t("hearingCommon.basic"):
        return "bg-blue-600"
      case t("hearingCommon.intermediate"):
        return "bg-blue-500"
      case t("hearingCommon.advanced"):
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
    notification.innerHTML = `✅ ${t("hearingCommon.downloadInitiated")}: ${resource.title}`
    notification.style.cssText =
      "position:fixed;top:20px;right:20px;background:#10b981;color:white;padding:12px;border-radius:8px;z-index:9999;"
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 3000)
  }

  const handleViewDetails = (activity: any) => {
    const detailedActivity = {
      ...activity,
      detailedDescription: getDetailedDescription(activity.name),
      stepByStep: getStepByStep(activity.name),
      tips: getTips(activity.name),
      variations: getVariations(activity.name),
      assessment: getAssessment(activity.name),
    }
    setSelectedActivity(detailedActivity)
    setIsModalOpen(true)
  }

  const getDetailedDescription = (name: string) => {
    switch (name) {
      case t("hearingActivities.dramaticSignLanguageEducation.name"):
        return t("hearingActivities.dramaticSignLanguageEducation.detailedDescription")
      case t("hearingActivities.interactiveVisualGames.name"):
        return t("hearingActivities.interactiveVisualGames.detailedDescription")
      case t("hearingActivities.illustratedStoriesWithLibras.name"):
        return t("hearingActivities.illustratedStoriesWithLibras.detailedDescription")
      case t("hearingActivities.visualCommunicationLab.name"):
        return t("hearingActivities.visualCommunicationLab.detailedDescription")
      default:
        return t("hearingActivities.defaultDescription")
    }
  }

  const getStepByStep = (name: string) => {
    switch (name) {
      case t("hearingActivities.dramaticSignLanguageEducation.name"):
        return [
          t("hearingActivities.dramaticSignLanguageEducation.step1"),
          t("hearingActivities.dramaticSignLanguageEducation.step2"),
          t("hearingActivities.dramaticSignLanguageEducation.step3"),
          t("hearingActivities.dramaticSignLanguageEducation.step4"),
          t("hearingActivities.dramaticSignLanguageEducation.step5"),
          t("hearingActivities.dramaticSignLanguageEducation.step6"),
          t("hearingActivities.dramaticSignLanguageEducation.step7"),
          t("hearingActivities.dramaticSignLanguageEducation.step8"),
        ]
      case t("hearingActivities.interactiveVisualGames.name"):
        return [
          t("hearingActivities.interactiveVisualGames.step1"),
          t("hearingActivities.interactiveVisualGames.step2"),
          t("hearingActivities.interactiveVisualGames.step3"),
          t("hearingActivities.interactiveVisualGames.step4"),
          t("hearingActivities.interactiveVisualGames.step5"),
          t("hearingActivities.interactiveVisualGames.step6"),
          t("hearingActivities.interactiveVisualGames.step7"),
          t("hearingActivities.interactiveVisualGames.step8"),
        ]
      case t("hearingActivities.illustratedStoriesWithLibras.name"):
        return [
          t("hearingActivities.illustratedStoriesWithLibras.step1"),
          t("hearingActivities.illustratedStoriesWithLibras.step2"),
          t("hearingActivities.illustratedStoriesWithLibras.step3"),
          t("hearingActivities.illustratedStoriesWithLibras.step4"),
          t("hearingActivities.illustratedStoriesWithLibras.step5"),
          t("hearingActivities.illustratedStoriesWithLibras.step6"),
          t("hearingActivities.illustratedStoriesWithLibras.step7"),
          t("hearingActivities.illustratedStoriesWithLibras.step8"),
        ]
      case t("hearingActivities.visualCommunicationLab.name"):
        return [
          t("hearingActivities.visualCommunicationLab.step1"),
          t("hearingActivities.visualCommunicationLab.step2"),
          t("hearingActivities.visualCommunicationLab.step3"),
          t("hearingActivities.visualCommunicationLab.step4"),
          t("hearingActivities.visualCommunicationLab.step5"),
          t("hearingActivities.visualCommunicationLab.step6"),
          t("hearingActivities.visualCommunicationLab.step7"),
          t("hearingActivities.visualCommunicationLab.step8"),
        ]
      default:
        return [
          t("hearingActivities.defaultStep1"),
          t("hearingActivities.defaultStep2"),
          t("hearingActivities.defaultStep3"),
          t("hearingActivities.defaultStep4"),
          t("hearingActivities.defaultStep5"),
          t("hearingActivities.defaultStep6"),
        ]
    }
  }

  const getTips = (name: string) => {
    switch (name) {
      case t("hearingActivities.dramaticSignLanguageEducation.name"):
        return [
          t("hearingActivities.dramaticSignLanguageEducation.tip1"),
          t("hearingActivities.dramaticSignLanguageEducation.tip2"),
          t("hearingActivities.dramaticSignLanguageEducation.tip3"),
          t("hearingActivities.dramaticSignLanguageEducation.tip4"),
          t("hearingActivities.dramaticSignLanguageEducation.tip5"),
        ]
      case t("hearingActivities.interactiveVisualGames.name"):
        return [
          t("hearingActivities.interactiveVisualGames.tip1"),
          t("hearingActivities.interactiveVisualGames.tip2"),
          t("hearingActivities.interactiveVisualGames.tip3"),
          t("hearingActivities.interactiveVisualGames.tip4"),
          t("hearingActivities.interactiveVisualGames.tip5"),
        ]
      case t("hearingActivities.illustratedStoriesWithLibras.name"):
        return [
          t("hearingActivities.illustratedStoriesWithLibras.tip1"),
          t("hearingActivities.illustratedStoriesWithLibras.tip2"),
          t("hearingActivities.illustratedStoriesWithLibras.tip3"),
          t("hearingActivities.illustratedStoriesWithLibras.tip4"),
          t("hearingActivities.illustratedStoriesWithLibras.tip5"),
        ]
      case t("hearingActivities.visualCommunicationLab.name"):
        return [
          t("hearingActivities.visualCommunicationLab.tip1"),
          t("hearingActivities.visualCommunicationLab.tip2"),
          t("hearingActivities.visualCommunicationLab.tip3"),
          t("hearingActivities.visualCommunicationLab.tip4"),
          t("hearingActivities.visualCommunicationLab.tip5"),
        ]
      default:
        return [
          t("hearingActivities.defaultTip1"),
          t("hearingActivities.defaultTip2"),
          t("hearingActivities.defaultTip3"),
          t("hearingActivities.defaultTip4"),
        ]
    }
  }

  const getVariations = (name: string) => {
    switch (name) {
      case t("hearingActivities.dramaticSignLanguageEducation.name"):
        return [
          t("hearingActivities.dramaticSignLanguageEducation.variation1"),
          t("hearingActivities.dramaticSignLanguageEducation.variation2"),
          t("hearingActivities.dramaticSignLanguageEducation.variation3"),
          t("hearingActivities.dramaticSignLanguageEducation.variation4"),
          t("hearingActivities.dramaticSignLanguageEducation.variation5"),
        ]
      case t("hearingActivities.interactiveVisualGames.name"):
        return [
          t("hearingActivities.interactiveVisualGames.variation1"),
          t("hearingActivities.interactiveVisualGames.variation2"),
          t("hearingActivities.interactiveVisualGames.variation3"),
          t("hearingActivities.interactiveVisualGames.variation4"),
          t("hearingActivities.interactiveVisualGames.variation5"),
        ]
      case t("hearingActivities.illustratedStoriesWithLibras.name"):
        return [
          t("hearingActivities.illustratedStoriesWithLibras.variation1"),
          t("hearingActivities.illustratedStoriesWithLibras.variation2"),
          t("hearingActivities.illustratedStoriesWithLibras.variation3"),
          t("hearingActivities.illustratedStoriesWithLibras.variation4"),
          t("hearingActivities.illustratedStoriesWithLibras.variation5"),
        ]
      case t("hearingActivities.visualCommunicationLab.name"):
        return [
          t("hearingActivities.visualCommunicationLab.variation1"),
          t("hearingActivities.visualCommunicationLab.variation2"),
          t("hearingActivities.visualCommunicationLab.variation3"),
          t("hearingActivities.visualCommunicationLab.variation4"),
          t("hearingActivities.visualCommunicationLab.variation5"),
        ]
      default:
        return [
          t("hearingActivities.defaultVariation1"),
          t("hearingActivities.defaultVariation2"),
          t("hearingActivities.defaultVariation3"),
          t("hearingActivities.defaultVariation4"),
        ]
    }
  }

  const getAssessment = (name: string) => {
    switch (name) {
      case t("hearingActivities.dramaticSignLanguageEducation.name"):
        return t("hearingActivities.dramaticSignLanguageEducation.assessment1")
      case t("hearingActivities.interactiveVisualGames.name"):
        return t("hearingActivities.interactiveVisualGames.assessment2")
      case t("hearingActivities.illustratedStoriesWithLibras.name"):
        return t("hearingActivities.illustratedStoriesWithLibras.assessment3")
      case t("hearingActivities.visualCommunicationLab.name"):
        return t("hearingActivities.visualCommunicationLab.assessment4")
      default:
        return t("hearingActivities.defaultAssessment")
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl blur-3xl"></div>
        <div className="relative z-10 p-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Ear className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">{t("hearing_impairment_section_title")}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">{t("hearing_impairment_section_description")}</p>
          <div className="flex justify-center space-x-6">
            <div className="bg-gray-950/70 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">18</div>
              <div className="text-sm text-gray-400">{t("available_resources")}</div>
            </div>
            <div className="bg-gray-950/70 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">91%</div>
              <div className="text-sm text-gray-400">{t("average_effectiveness")}</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue={"strategies"} className="w-full">
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
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300 h-full"
              >
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
                        {strategy.effectiveness}% {t("effective")}
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
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300"
              >
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
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleViewDetails(activity)}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      {t("viewDetails")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300"
              >
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
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className={`bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300 ${
                  resource.featured ? "ring-2 ring-blue-500/50" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-white">{resource.title}</CardTitle>
                    {resource.featured && <Badge className="bg-blue-500 text-white">{t("highlight")}</Badge>}
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
                    {t("freeDownload")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <ActivityDetailsModal activity={selectedActivity} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
