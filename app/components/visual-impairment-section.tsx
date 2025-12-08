"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, BookOpen, Download, Clock, ExternalLink, Target, Star } from "lucide-react"
import ActivityDetailsModal from "./activity-details-modal"
import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"

export default function VisualImpairmentSection() {
  const { t } = useLanguage()
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const strategies = [
    {
      title: t("visualStrategies.title1"),
      description: t("visualStrategies.description1"),
      tips: [t("visualStrategies.tip1"), t("visualStrategies.tip2"), t("visualStrategies.tip3")],
      source: t("visualStrategies.source1"),
      difficulty: t("visualStrategies.difficulty1"),
      effectiveness: 95,
    },
    {
      title: t("visualStrategies.title2"),
      description: t("visualStrategies.description2"),
      tips: [t("visualStrategies.tip4"), t("visualStrategies.tip5"), t("visualStrategies.tip6")],
      source: t("visualStrategies.source2"),
      difficulty: t("visualStrategies.difficulty2"),
      effectiveness: 92,
    },
    {
      title: t("visualStrategies.title3"),
      description: t("visualStrategies.description3"),
      tips: [t("visualStrategies.tip7"), t("visualStrategies.tip8"), t("visualStrategies.tip9")],
      source: t("visualStrategies.source3"),
      difficulty: t("visualStrategies.difficulty3"),
      effectiveness: 88,
    },
    {
      title: t("visualStrategies.title4"),
      description: t("visualStrategies.description4"),
      tips: [t("visualStrategies.tip10"), t("visualStrategies.tip11"), t("visualStrategies.tip12")],
      source: t("visualStrategies.source4"),
      difficulty: t("visualStrategies.difficulty4"),
      effectiveness: 97,
    },
    {
      title: t("visualStrategies.title5"),
      description: t("visualStrategies.description5"),
      tips: [t("visualStrategies.tip13"), t("visualStrategies.tip14"), t("visualStrategies.tip15")],
      source: t("visualStrategies.source5"),
      difficulty: t("visualStrategies.difficulty5"),
      effectiveness: 90,
    },
    {
      title: t("visualStrategies.title6"),
      description: t("visualStrategies.description6"),
      tips: [t("visualStrategies.tip16"), t("visualStrategies.tip17"), t("visualStrategies.tip18")],
      source: t("visualStrategies.source6"),
      difficulty: t("visualStrategies.difficulty6"),
      effectiveness: 93,
    },
  ]

  const activities = [
    {
      name: t("visualActivities.name1"),
      age: t("visualActivities.age1"),
      duration: t("visualActivities.duration1"),
      description: t("visualActivities.description1"),
      materials: [
        t("visualActivities.material1"),
        t("visualActivities.material2"),
        t("visualActivities.material3"),
        t("visualActivities.material4"),
      ],
      implementation: t("visualActivities.implementation1"),
      objectives: [t("visualActivities.objective1"), t("visualActivities.objective2"), t("visualActivities.objective3")],
      rating: 4.9,
      downloads: 1950,
    },
    {
      name: t("visualActivities.name2"),
      age: t("visualActivities.age2"),
      duration: t("visualActivities.duration2"),
      description: t("visualActivities.description2"),
      materials: [t("visualActivities.material5"), t("visualActivities.material6"), t("visualActivities.material7")],
      implementation: t("visualActivities.implementation2"),
      objectives: [t("visualActivities.objective4"), t("visualActivities.objective5"), t("visualActivities.objective6")],
      rating: 4.8,
      downloads: 2800,
    },
    {
      name: t("visualActivities.name3"),
      age: t("visualActivities.age3"),
      duration: t("visualActivities.duration3"),
      description: t("visualActivities.description3"),
      materials: [t("visualActivities.material8"), t("visualActivities.material9"), t("visualActivities.material10")],
      implementation: t("visualActivities.implementation3"),
      objectives: [t("visualActivities.objective7"), t("visualActivities.objective8"), t("visualActivities.objective9")],
      rating: 4.7,
      downloads: 2200,
    },
    {
      name: t("visualActivities.name4"),
      age: t("visualActivities.age4"),
      duration: t("visualActivities.duration4"),
      description: t("visualActivities.description4"),
      materials: [t("visualActivities.material11"), t("visualActivities.material12"), t("visualActivities.material13")],
      implementation: t("visualActivities.implementation4"),
      objectives: [t("visualActivities.objective10"), t("visualActivities.objective11"), t("visualActivities.objective12")],
      rating: 4.6,
      downloads: 1650,
    },
  ]

  const courses = [
    {
      title: t("visualCourses.title1"),
      provider: t("visualCourses.provider1"),
      duration: t("visualCourses.duration1"),
      price: t("visualCourses.price1"),
      rating: 4.6,
      students: 3200,
      certificate: true,
      level: t("visualCourses.level1"),
      modules: 6,
      url: "https://www.pensarcursos.com.br/curso/minicurso-deficiencia-visual",
    },
    {
      title: t("visualCourses.title2"),
      provider: t("visualCourses.provider2"),
      duration: t("visualCourses.duration2"),
      price: t("visualCourses.price2"),
      rating: 4.7,
      students: 4800,
      certificate: true,
      level: t("visualCourses.level2"),
      modules: 10,
      url: "https://educamundo.com.br/cursos-online/deficiencia-visual/",
    },
    {
      title: t("visualCourses.title3"),
      provider: t("visualCourses.provider3"),
      duration: t("visualCourses.duration3"),
      price: t("visualCourses.price3"),
      rating: 4.5,
      students: 2600,
      certificate: true,
      level: t("visualCourses.level3"),
      modules: 8,
      url: "https://www.portaleduca.com.br/cursos/deficiencia-visual/conexaoonline",
    },
    {
      title: t("visualCourses.title4"),
      provider: t("visualCourses.provider4"),
      duration: t("visualCourses.duration4"),
      price: t("visualCourses.price4"),
      rating: 4.4,
      students: 5900,
      certificate: true,
      level: t("visualCourses.level4"),
      modules: 7,
      url: "https://www.unovacursos.com.br/curso/curso-gratuito-online-deficiencia-intelectual",
    },
  ]

  const resources = [
    {
      title: t("visualResources.title1"),
      type: t("visualResources.type1"),
      description: t("visualResources.description1"),
      featured: true,
      content: t("visualResources.content1"),
    },
    {
      title: t("visualResources.title2"),
      type: t("visualResources.type2"),
      description: t("visualResources.description2"),
      featured: false,
      content: t("visualResources.content2"),
    },
    {
      title: t("visualResources.title3"),
      type: t("visualResources.type3"),
      description: t("visualResources.description3"),
      featured: true,
      content: t("visualResources.content3"),
    },
    {
      title: t("visualResources.title4"),
      type: t("visualResources.type4"),
      description: t("visualResources.description4"),
      featured: false,
      content: t("visualResources.content4"),
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case t("visualDifficulty.basic"):
        return "bg-blue-600"
      case t("visualDifficulty.intermediate"):
        return "bg-blue-500"
      case t("visualDifficulty.advanced"):
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
    notification.innerHTML = `✅ ${t("visualDownload.started")}: ${resource.title}`
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
      case t("visualActivities.name1"):
        return t("visualActivities.description1")
      case t("visualActivities.name2"):
        return t("visualActivities.description2")
      case t("visualActivities.name3"):
        return t("visualActivities.description3")
      case t("visualActivities.name4"):
        return t("visualActivities.description4")
      default:
        return t("visualActivities.defaultDescription")
    }
  }

  const getStepByStep = (name: string) => {
    switch (name) {
      case t("visualActivities.name1"):
        return [
          t("visualActivities.step1"),
          t("visualActivities.step2"),
          t("visualActivities.step3"),
          t("visualActivities.step4"),
          t("visualActivities.step5"),
          t("visualActivities.step6"),
          t("visualActivities.step7"),
          t("visualActivities.step8"),
        ]
      case t("visualActivities.name2"):
        return [
          t("visualActivities.step9"),
          t("visualActivities.step10"),
          t("visualActivities.step11"),
          t("visualActivities.step12"),
          t("visualActivities.step13"),
          t("visualActivities.step14"),
          t("visualActivities.step15"),
          t("visualActivities.step16"),
        ]
      case t("visualActivities.name3"):
        return [
          t("visualActivities.step17"),
          t("visualActivities.step18"),
          t("visualActivities.step19"),
          t("visualActivities.step20"),
          t("visualActivities.step21"),
          t("visualActivities.step22"),
          t("visualActivities.step23"),
          t("visualActivities.step24"),
        ]
      case t("visualActivities.name4"):
        return [
          t("visualActivities.step25"),
          t("visualActivities.step26"),
          t("visualActivities.step27"),
          t("visualActivities.step28"),
          t("visualActivities.step29"),
          t("visualActivities.step30"),
          t("visualActivities.step31"),
          t("visualActivities.step32"),
        ]
      default:
        return [
          t("visualActivities.step33"),
          t("visualActivities.step34"),
          t("visualActivities.step35"),
          t("visualActivities.step36"),
          t("visualActivities.step37"),
          t("visualActivities.step38"),
        ]
    }
  }

  const getTips = (name: string) => {
    switch (name) {
      case t("visualActivities.name1"):
        return [
          t("visualActivities.tip1"),
          t("visualActivities.tip2"),
          t("visualActivities.tip3"),
          t("visualActivities.tip4"),
          t("visualActivities.tip5"),
        ]
      case t("visualActivities.name2"):
        return [
          t("visualActivities.tip6"),
          t("visualActivities.tip7"),
          t("visualActivities.tip8"),
          t("visualActivities.tip9"),
          t("visualActivities.tip10"),
        ]
      case t("visualActivities.name3"):
        return [
          t("visualActivities.tip11"),
          t("visualActivities.tip12"),
          t("visualActivities.tip13"),
          t("visualActivities.tip14"),
          t("visualActivities.tip15"),
        ]
      case t("visualActivities.name4"):
        return [
          t("visualActivities.tip16"),
          t("visualActivities.tip17"),
          t("visualActivities.tip18"),
          t("visualActivities.tip19"),
          t("visualActivities.tip20"),
        ]
      default:
        return [t("visualActivities.tip21"), t("visualActivities.tip22"), t("visualActivities.tip23"), t("visualActivities.tip24")]
    }
  }

  const getVariations = (name: string) => {
    switch (name) {
      case t("visualActivities.name1"):
        return [
          t("visualActivities.variation1"),
          t("visualActivities.variation2"),
          t("visualActivities.variation3"),
          t("visualActivities.variation4"),
          t("visualActivities.variation5"),
        ]
      case t("visualActivities.name2"):
        return [
          t("visualActivities.variation6"),
          t("visualActivities.variation7"),
          t("visualActivities.variation8"),
          t("visualActivities.variation9"),
          t("visualActivities.variation10"),
        ]
      case t("visualActivities.name3"):
        return [
          t("visualActivities.variation11"),
          t("visualActivities.variation12"),
          t("visualActivities.variation13"),
          t("visualActivities.variation14"),
          t("visualActivities.variation15"),
        ]
      case t("visualActivities.name4"):
        return [
          t("visualActivities.variation16"),
          t("visualActivities.variation17"),
          t("visualActivities.variation18"),
          t("visualActivities.variation19"),
          t("visualActivities.variation20"),
        ]
      default:
        return [
          t("visualActivities.variation21"),
          t("visualActivities.variation22"),
          t("visualActivities.variation23"),
          t("visualActivities.variation24"),
        ]
    }
  }

  const getAssessment = (name: string) => {
    switch (name) {
      case t("visualActivities.name1"):
        return t("visualActivities.assessment1")
      case t("visualActivities.name2"):
        return t("visualActivities.assessment2")
      case t("visualActivities.name3"):
        return t("visualActivities.assessment3")
      case t("visualActivities.name4"):
        return t("visualActivities.assessment4")
      default:
        return t("visualActivities.defaultAssessment")
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl blur-3xl"></div>
        <div className="relative z-10 p-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Eye className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">{t("visualTitle")}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">{t("visualDescription")}</p>
          <div className="flex justify-center space-x-6">
            <div className="bg-gray-950/70 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">18</div>
              <div className="text-sm text-gray-400">{t("visualResourcesLabel")}</div>
            </div>
            <div className="bg-gray-950/70 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">92%</div>
              <div className="text-sm text-gray-400">{t("visualEffectiveness")}</div>
            </div>
          </div>
        </div>
      </div>

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
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <ActivityDetailsModal activity={selectedActivity} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
