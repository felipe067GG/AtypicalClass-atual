"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Star, Target, Users, CheckCircle, Lightbulb, BookOpen, Settings } from "lucide-react"

interface ActivityDetailsModalProps {
  activity: any
  isOpen: boolean
  onClose: () => void
}

export default function ActivityDetailsModal({ activity, isOpen, onClose }: ActivityDetailsModalProps) {
  if (!activity) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-950 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white mb-2">{activity.name}</DialogTitle>
          <DialogDescription className="text-gray-300 text-base">{activity.detailedDescription}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações básicas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Idade</span>
              </div>
              <span className="text-white">{activity.age}</span>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Duração</span>
              </div>
              <span className="text-white">{activity.duration}</span>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-400 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Avaliação</span>
              </div>
              <span className="text-white">{activity.rating}/5.0</span>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-400 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Downloads</span>
              </div>
              <span className="text-white">{activity.downloads}</span>
            </div>
          </div>

          {/* Objetivos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-400" />
              Objetivos de Aprendizagem
            </h4>
            <div className="flex flex-wrap gap-2">
              {activity.objectives?.map((objective: string, i: number) => (
                <Badge key={i} className="bg-blue-600 text-white">
                  {objective}
                </Badge>
              ))}
            </div>
          </div>

          {/* Materiais */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-blue-400" />
              Materiais Necessários
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {activity.materials?.map((material: string, i: number) => (
                <div key={i} className="flex items-center space-x-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{material}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs com detalhes */}
          <Tabs defaultValue="steps" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/50">
              <TabsTrigger value="steps">Passo a Passo</TabsTrigger>
              <TabsTrigger value="tips">Dicas</TabsTrigger>
              <TabsTrigger value="variations">Variações</TabsTrigger>
              <TabsTrigger value="assessment">Avaliação</TabsTrigger>
            </TabsList>

            <TabsContent value="steps" className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                Como Implementar
              </h4>
              <ol className="space-y-3">
                {activity.stepByStep?.map((step: string, i: number) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-blue-400" />
                Dicas Importantes
              </h4>
              <ul className="space-y-3">
                {activity.tips?.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="variations" className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-400" />
                Variações e Adaptações
              </h4>
              <ul className="space-y-3">
                {activity.variations?.map((variation: string, i: number) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-gray-300">{variation}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-400" />
                Como Avaliar o Progresso
              </h4>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <p className="text-gray-300">{activity.assessment}</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Fundamentação */}
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
            <h4 className="text-lg font-semibold text-white mb-2">Fundamentação Científica</h4>
            <p className="text-gray-300">{activity.implementation}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
            Fechar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Baixar Material Completo</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
