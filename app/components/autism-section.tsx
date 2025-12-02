"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, BookOpen, Download, Clock, ExternalLink, Target, Star } from "lucide-react"
import ActivityDetailsModal from "./activity-details-modal"
import { DownloadButton } from "@/components/download-button"

export default function AutismSection() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const strategies = [
    {
      title: "Estruturação Visual",
      description: "Implementação de cronogramas e rotinas visuais",
      tips: ["Utilize pictogramas claros", "Mantenha sequência lógica", "Posicione em local visível"],
      source: "Baseado em Gauderer (2019) - 'Autismo e Educação'",
      difficulty: "Básico",
      effectiveness: 92,
    },
    {
      title: "Comunicação Adaptada",
      description: "Estratégias para comunicação eficaz",
      tips: ["Use linguagem clara e objetiva", "Dê tempo para processamento", "Evite metáforas complexas"],
      source: "Consulta com Prof. Maria Santos - Especialista em TEA",
      difficulty: "Intermediário",
      effectiveness: 88,
    },
    {
      title: "Ambiente Sensorial",
      description: "Adaptações do espaço físico",
      tips: ["Controle estímulos sonoros", "Organize espaços definidos", "Crie área de descompressão"],
      source: "Artigo 'Ambiente Escolar Inclusivo' - Rev. Educação Especial",
      difficulty: "Avançado",
      effectiveness: 85,
    },
    {
      title: "Interesses Especiais",
      description: "Aproveitamento pedagógico de interesses específicos",
      tips: ["Identifique os interesses", "Conecte com conteúdo curricular", "Use como motivação"],
      source: "Validado por Vinicius Gabriel - Experiência pessoal",
      difficulty: "Intermediário",
      effectiveness: 95,
    },
    {
      title: "Pausas Regulares",
      description: "Gestão de sobrecarga e autorregulação",
      tips: ["Estabeleça sinais de pausa", "Crie espaço de descanso", "Respeite os limites"],
      source: "Baseado em Temple Grandin - 'O Cérebro Autista'",
      difficulty: "Básico",
      effectiveness: 90,
    },
    {
      title: "Feedback Positivo",
      description: "Sistema de reforço e motivação",
      tips: ["Celebre pequenos progressos", "Use reforços visuais", "Seja específico nos elogios"],
      source: "Método ABA adaptado",
      difficulty: "Básico",
      effectiveness: 87,
    },
  ]

  const activities = [
    {
      name: "Sistema de Rotina Visual Personalizada",
      age: "6-16 anos",
      duration: "15-30 min",
      description: "Cronograma visual adaptável para diferentes necessidades e preferências",
      materials: ["Cartões pictográficos", "Velcro", "Base magnética", "Timer visual"],
      implementation: "Desenvolvido com base na metodologia TEACCH e validado na prática",
      objectives: ["Autonomia", "Redução de ansiedade", "Organização temporal"],
      rating: 4.9,
      downloads: 1850,
    },
    {
      name: "Histórias Sociais Interativas",
      age: "5-12 anos",
      duration: "10-20 min",
      description: "Narrativas personalizáveis para ensino de habilidades sociais específicas",
      materials: ["Templates digitais", "Fotos pessoais", "Sequências visuais"],
      implementation: "Seguindo protocolo de Carol Gray com adaptações práticas",
      objectives: ["Habilidades sociais", "Compreensão emocional", "Comportamento adequado"],
      rating: 4.8,
      downloads: 2100,
    },
    {
      name: "Kit de Autorregulação Sensorial",
      age: "7-15 anos",
      duration: "5-15 min",
      description: "Conjunto de estratégias para gestão de sobrecarga sensorial",
      materials: ["Fidgets", "Fones com cancelamento", "Cartões de estratégias"],
      implementation: "Baseado em terapia ocupacional e experiência pessoal",
      objectives: ["Autorregulação", "Redução de estresse", "Foco atencional"],
      rating: 4.7,
      downloads: 1650,
    },
    {
      name: "Jogo de Reconhecimento Emocional",
      age: "6-14 anos",
      duration: "20-30 min",
      description: "Atividade lúdica para desenvolvimento de inteligência emocional",
      materials: ["Cartas com expressões", "Espelho", "Situações contextuais"],
      implementation: "Adaptado de técnicas de psicoeducação emocional",
      objectives: ["Reconhecimento emocional", "Empatia", "Comunicação"],
      rating: 4.6,
      downloads: 1420,
    },
    {
      name: "Atividade de História - Família Real no Brasil",
      age: "8-12 anos",
      duration: "45-60 min",
      description: "Exercícios sobre a chegada da Família Real Portuguesa (1808) - 2º série",
      materials: ["Quadro com palavras", "Imagens", "Respostas visuais"],
      implementation: "Adaptado para alunos com TEA",
      objectives: ["Conhecimento histórico", "Leitura", "Compreensão de texto"],
      rating: 4.5,
      downloads: 1200,
      downloadFile: "historia-familia-real",
    },
    {
      name: "Atividade de Química - Pilha de Daniell",
      age: "10-14 anos",
      duration: "40-50 min",
      description: "Exercícios sobre pilhas elétricas com atividades de pintura e identificação",
      materials: ["Lápis de cor", "Diagrama da pilha", "Lista de objetos"],
      implementation: "Adaptado com suportes visuais e instruções claras",
      objectives: ["Conhecimento científico", "Identificação", "Coordenação motora"],
      rating: 4.4,
      downloads: 980,
      downloadFile: "quimica-pilha-daniell",
    },
  ]

  const courses = [
    {
      title: "Pós-Graduação Intervenção ABA para Autismo",
      provider: "CBI of Miami",
      duration: "600h",
      price: "Consultar",
      rating: 4.9,
      students: 2500,
      certificate: true,
      level: "Pós-graduação",
      modules: 24,
      url: "https://cbiofmiami.com/pos-graduacao/intervencao-aba-para-autismo/",
    },
    {
      title: "Cuidador de Criança Autista",
      provider: "Prime Cursos",
      duration: "40h",
      price: "R$ 79",
      rating: 4.7,
      students: 8900,
      certificate: true,
      level: "Básico",
      modules: 8,
      url: "https://www.primecursos.com.br/cuidador-de-crianca-autista/",
    },
    {
      title: "Pós-Graduação em TEA - Transtorno do Espectro Autista",
      provider: "CENES",
      duration: "360h",
      price: "R$ 189/mês",
      rating: 4.8,
      students: 3200,
      certificate: true,
      level: "Pós-graduação",
      modules: 15,
      url: "https://cenes.com.br/curso/pos-graduacao-em-tea-transtorno-do-espectro-autista",
    },
    {
      title: "Curso de Autismo",
      provider: "Cursos Educaweb",
      duration: "60h",
      price: "R$ 97",
      rating: 4.6,
      students: 5600,
      certificate: true,
      level: "Intermediário",
      modules: 10,
      url: "https://cursoseducaweb.com.br/curso-de-autismo",
    },
  ]

  const resources = [
    {
      title: "Guia Completo - TEA em Sala de Aula",
      type: "Manual PDF",
      description: "Estratégias fundamentadas e validadas na prática",
      featured: true,
      content: "Conteúdo completo do guia sobre TEA...",
    },
    {
      title: "Kit de Pictogramas Personalizáveis",
      type: "Recursos Visuais",
      description: "Conjunto editável de 120 pictogramas",
      featured: false,
      content: "Kit completo de pictogramas...",
    },
    {
      title: "Checklist de Adaptações Ambientais",
      type: "Ferramenta de Avaliação",
      description: "Lista completa para ambiente inclusivo",
      featured: false,
      content: "Checklist completo...",
    },
    {
      title: "Modelo de Plano Educacional Individualizado",
      type: "Template",
      description: "Estrutura completa para PEI específico para TEA",
      featured: true,
      content: "Template de PEI...",
    },
    {
      title: "Atividade de História - Família Real no Brasil",
      type: "Atividade Adaptada",
      description: "Exercícios sobre a chegada da Família Real Portuguesa (1808) - 2º série",
      featured: false,
      content: `ATIVIDADE DE HISTÓRIA 2º SÉRIE

1- Encontre as palavras abaixo no quadro abaixo.
REI; DIA DO FICO; BLOQUEIO CONTINENTAL; CASA DA MOEDA.

B L O Q U E I O R A P
C O N T I N E N T A L
E D U P A T O U H X O
T G E A R E I I M C U
G O B L I K P A E S T
A D I A D O F I C O Q
Y X A E I F I O V E F
C A S A D A M O E D A

2- Escreva os nomes das imagens abaixo, que fizeram parte do período joanino no Brasil.

REI                    BIBLIOTECA              BANCO DO BRASIL

____________________________________________
____________________________________________
____________________________________________

TEXTO: A CHEGADA DA FAMÍLIA REAL AO BRASIL

NO ANO DE 1808, A FAMÍLIA REAL PORTUGUESA VEIO PARA O BRASIL.
ELES FUGIRAM DE PORTUGAL PORQUE A FRANÇA QUERIA INVADIR O PAÍS.
O LÍDER DA FAMÍLIA REAL ERA DOM JOÃO VI.

A VIAGEM FOI FEITA DE NAVIO E DUROU MUITOS DIAS. QUANDO
CHEGARAM, FORAM MORAR NO RIO DE JANEIRO. COM A CHEGADA DA
CORTE, O BRASIL GANHOU ESCOLAS, BIBLIOTECAS E FÁBRICAS. TAMBÉM
FOI CRIADA A PRIMEIRA ORQUESTRA E O PRIMEIRO BANCO DO BRASIL.

A VINDA DA FAMÍLIA REAL AJUDOU O BRASIL A CRESCER E SE
PREPARAR PARA O FUTURO.

3- Em que ano a família real veio para o Brasil?
A) 1500
B) 1808 ✓
C) 1900

4) De onde veio a família real?
A) Da França
B) De Portugal ✓
C) Da África

5- Como a família real viajou para o Brasil?
A) De avião
B) De navio ✓
C) De carro

6- Para qual cidade a família real foi morar?
A) Salvador
B) São Paulo
C) Rio de Janeiro ✓

ADAPTAÇÕES PARA ALUNOS ATÍPICOS:
✓ Texto em letras maiúsculas para facilitar leitura
✓ Frases curtas e diretas
✓ Vocabulário acessível
✓ Questões de múltipla escolha
✓ Caça-palavras com palavras-chave
✓ Espaços para respostas visuais

O tempo utilizado para o estudo nunca é
um tempo perdido. Estudar é investir no
seu futuro. Sei que você dará o seu
melhor, pois sei do seu potencial.
Boa prova!!

© AtypicalClass 2025 - Material Adaptado para Educação Inclusiva`,
    },
    {
      title: "Atividade de Química - Pilha de Daniell",
      type: "Atividade Adaptada",
      description: "Exercícios sobre componentes da pilha e energia elétrica",
      featured: false,
      content: `ATIVIDADE DE QUÍMICA
OBSERVE A IMAGEM E RESPONDA

1. RELACIONE OS COMPONENTES DA PILHA DE DANIELL NOS LUGARES CORRETOS:

A – ELETRODO –  
B – VOLTÍMETRO
C – PONTE SALINA
D – ÂNODO
E – ELETRODO +
F – CÁTODO

INSTRUÇÕES:
- OBSERVE O DIAGRAMA DA PILHA DE DANIELL
- IDENTIFIQUE CADA COMPONENTE
- ESCREVA A LETRA CORRESPONDENTE NO LUGAR CORRETO

COMPONENTES DA PILHA:
□ ELETRODO NEGATIVO (-)
□ ELETRODO POSITIVO (+)
□ VOLTÍMETRO (MEDE A VOLTAGEM)
□ PONTE SALINA (CONECTA AS SOLUÇÕES)
□ ÂNODO (ONDE OCORRE OXIDAÇÃO)
□ CÁTODO (ONDE OCORRE REDUÇÃO)

2. PINTE OS OBJETOS QUE FUNCIONAM COM ENERGIA ELÉTRICA:

LISTA DE OBJETOS:
□ LÂMPADA
□ ÁRVORE
□ CELULAR
□ PEDRA
□ COMPUTADOR
□ FLOR
□ TELEVISÃO
□ NUVEM
□ VENTILADOR
□ MONTANHA
□ GELADEIRA
□ RIO

INSTRUÇÕES:
- LEIA CADA OBJETO COM ATENÇÃO
- PINTE APENAS OS OBJETOS QUE PRECISAM DE ENERGIA ELÉTRICA
- SE TIVER DÚVIDA, PERGUNTE AO PROFESSOR

DICA: OBJETOS ELÉTRICOS GERALMENTE TÊM FIO OU BATERIA!

CONCEITOS TRABALHADOS:
• Componentes de uma pilha elétrica
• Energia elétrica no cotidiano
• Identificação de objetos elétricos
• Vocabulário científico básico

O conhecimento é uma jornada, não um destino.
Cada passo que você dá é uma vitória!
Continue assim!

© AtypicalClass 2025 - Material Adaptado para Educação Inclusiva`,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return "bg-green-600"
      case "Intermediário":
        return "bg-yellow-600"
      case "Avançado":
        return "bg-red-600"
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
  }

  const handleViewDetails = (activity: any) => {
    setSelectedActivity(activity)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl blur-3xl"></div>
        <div className="relative z-10 p-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Transtorno do Espectro Autista</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-6">
            Recursos especializados e estratégias fundamentadas para apoiar alunos no espectro autista
          </p>
          <div className="flex justify-center space-x-6">
            <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">19</div>
              <div className="text-sm text-slate-400">recursos disponíveis</div>
            </div>
            <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">✓</div>
              <div className="text-sm text-slate-400">validação prática</div>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="strategies" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-slate-700">
          <TabsTrigger value="strategies" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Estratégias
          </TabsTrigger>
          <TabsTrigger value="activities" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Atividades
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Cursos
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Materiais
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
                    <CardDescription className="text-slate-300">{strategy.description}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{strategy.effectiveness}% eficaz</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {strategy.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center text-sm text-slate-300">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs text-slate-500 italic border-t border-slate-700 pt-2">
                      {strategy.source}
                    </div>
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
                          <div className="flex items-center space-x-1 text-sm text-slate-400">
                            <Clock className="w-4 h-4" />
                            <span>{activity.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-slate-400">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{activity.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-slate-300">{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-slate-400 mb-2">Materiais:</h5>
                      <div className="flex flex-wrap gap-1">
                        {activity.materials.map((material, i) => (
                          <Badge key={i} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-400 mb-2">Objetivos:</h5>
                      <div className="flex flex-wrap gap-1">
                        {activity.objectives.map((objective, i) => (
                          <Badge key={i} className="bg-blue-600 text-white text-xs">
                            {objective}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-400 mb-2">Fundamentação:</h5>
                      <p className="text-sm text-slate-300">{activity.implementation}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-slate-400">{activity.downloads} downloads</span>
                      {activity.downloadFile ? (
                        <DownloadButton fileBaseName={activity.downloadFile} label="Baixar" />
                      ) : (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleViewDetails(activity)}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Ver Detalhes
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
                      {course.certificate && <Badge className="bg-blue-600 text-white">Certificado</Badge>}
                    </div>
                    <CardDescription className="text-blue-400">{course.provider}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.modules} módulos</span>
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
                        <span className="text-slate-400">({course.students} alunos)</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-400">{course.price}</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                      onClick={() => window.open(course.url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Acessar Curso
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
                      {resource.featured && <Badge className="bg-blue-500 text-white">Destaque</Badge>}
                    </div>
                    <Badge className="bg-blue-600 text-white w-fit">{resource.type}</Badge>
                    <CardDescription className="text-slate-300">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                      onClick={() => handleDownload(resource)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Gratuito
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <ActivityDetailsModal activity={selectedActivity} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
