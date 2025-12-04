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
import { useLanguage } from "@/lib/language-context"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { t } = useLanguage()

  const conditions = [
    {
      id: "autism",
      name: t("autism"),
      icon: Brain,
      color: "from-blue-500 to-blue-700",
      description: t("autismDesc"),
      resourceCount: 12,
    },
    {
      id: "down",
      name: t("downSyndrome"),
      icon: Heart,
      color: "from-blue-400 to-blue-600",
      description: t("downDesc"),
      resourceCount: 10,
    },
    {
      id: "adhd",
      name: t("adhd"),
      icon: Lightbulb,
      color: "from-blue-600 to-blue-800",
      description: t("adhdDesc"),
      resourceCount: 8,
    },
    {
      id: "visual",
      name: t("visualImpairment"),
      icon: Eye,
      color: "from-blue-300 to-blue-500",
      description: t("visualDesc"),
      resourceCount: 6,
    },
    {
      id: "hearing",
      name: t("hearingImpairment"),
      icon: Ear,
      color: "from-blue-700 to-blue-900",
      description: t("hearingDesc"),
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
              {t("home")}
            </TabsTrigger>
            <TabsTrigger value="autism" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              {t("autism")}
            </TabsTrigger>
            <TabsTrigger value="down" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              {t("downSyndrome")}
            </TabsTrigger>
            <TabsTrigger value="adhd" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              {t("adhd")}
            </TabsTrigger>
            <TabsTrigger value="visual" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              {t("visualImpairment")}
            </TabsTrigger>
            <TabsTrigger value="hearing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              {t("hearingImpairment")}
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              {t("resources")}
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              {t("about")}
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
                  <span className="text-blue-300">{t("platformSubtitle")}</span>
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
                  {t("platformDescription")}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Link href="/questoes">
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 text-lg">
                      <BookMarked className="w-5 h-5 mr-2" />
                      {t("adaptedQuestions")}
                    </Button>
                  </Link>
                  <Link href="/conteudos">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 text-lg">
                      <BookOpen className="w-5 h-5 mr-2" />
                      {t("pedagogicalContent")}
                    </Button>
                  </Link>
                  <Link href="/contribuir">
                    <Button className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-3 text-lg">
                      <Pencil className="w-5 h-5 mr-2" />
                      {t("contribute")}
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
                  title: t("researchBased"),
                  description: t("researchDesc"),
                  gradient: "from-blue-500 to-blue-700",
                  delay: 0.1,
                },
                {
                  icon: Users,
                  title: t("realExperience"),
                  description: t("experienceDesc"),
                  gradient: "from-blue-400 to-blue-600",
                  delay: 0.2,
                },
                {
                  icon: Lightbulb,
                  title: t("practicalResources"),
                  description: t("practicalDesc"),
                  gradient: "from-blue-600 to-blue-800",
                  delay: 0.3,
                },
                {
                  icon: GraduationCap,
                  title: t("inclusiveEducation"),
                  description: t("inclusiveDesc"),
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
                {t("specializationAreas")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="text-center text-slate-400 mb-12 max-w-2xl mx-auto"
              >
                {t("specializationDesc")}
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
                            <span className="text-slate-200"> {t("availableResources")}</span>
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
