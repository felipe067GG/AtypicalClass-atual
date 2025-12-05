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

export default function DownSyndromeSection() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const strategies = [
    {
      title: "Aprendizagem Visual",
      description: "Uso de recursos visuais para facilitar a compreensão",
      tips: ["Imagens e fotografias claras", "Gráficos e diagramas simples", "Demonstrações práticas"],
      source: "Baseado em Pueschel (2020) - 'Síndrome de Down: Guia para Pais e Educadores'",
      difficulty: "Básico",
      effectiveness: 94,
    },
    {
      title: "Repetição e Reforço",
      description: "Prática de conceitos múltiplas vezes de formas diferentes",
      tips: ["Exercícios variados", "Jogos educativos", "Atividades lúdicas"],
      source: "Validado por Vinicius Gabriel - Experiência pessoal",
      difficulty: "Básico",
      effectiveness: 96,
    },
    {
      title: "Tempo Adicional",
      description: "Permitir mais tempo para processamento e execução",
      tips: ["Pausas frequentes", "Ritmo individualizado", "Flexibilidade nas avaliações"],
      source: "Protocolo de Inclusão - MEC 2023",
      difficulty: "Intermediário",
      effectiveness: 89,
    },
    {
      title: "Comunicação Simplificada",
      description: "Adaptação da linguagem para melhor compreensão",
      tips: ["Frases curtas e diretas", "Vocabulário acessível", "Confirmação de entendimento"],
      source: "Instituto Jô Clemente - Pesquisa 2024",
      difficulty: "Básico",
      effectiveness: 92,
    },
    {
      title: "Motivação e Autoestima",
      description: "Estratégias para manter engajamento e confiança",
      tips: ["Celebrar conquistas", "Desafios graduais", "Feedback positivo constante"],
      source: "Baseado em experiência de Vinicius Gabriel",
      difficulty: "Intermediário",
      effectiveness: 98,
    },
    {
      title: "Habilidades Sociais",
      description: "Desenvolvimento de interação e comunicação social",
      tips: ["Atividades em grupo", "Role-playing", "Modelagem de comportamentos"],
      source: "Terapia Comportamental Aplicada - ABA",
      difficulty: "Avançado",
      effectiveness: 87,
    },
  ]

  const activities = [
    {
      name: "Sistema de Recompensas Visuais",
      age: "5-16 anos",
      duration: "10-25 min",
      description: "Quadro de incentivos personalizado com objetivos graduais",
      materials: ["Quadro magnético", "Estrelas coloridas", "Cartões de metas", "Timer visual"],
      implementation: "Desenvolvido com base em reforço positivo e validado na prática",
      objectives: ["Motivação", "Autonomia", "Autoestima"],
      rating: 4.9,
      downloads: 2340,
    },
    {
      name: "Jogos de Memória Adaptados",
      age: "6-14 anos",
      duration: "15-30 min",
      description: "Atividades de memória com níveis progressivos de dificuldade",
      materials: ["Cartas ilustradas", "Tabuleiro adaptado", "Cronômetro"],
      implementation: "Baseado em neuroplasticidade e estimulação cognitiva",
      objectives: ["Memória", "Concentração", "Raciocínio"],
      rating: 4.8,
      downloads: 1890,
    },
    {
      name: "Rotina de Vida Diária Estruturada",
      age: "8-18 anos",
      duration: "30-45 min",
      description: "Sequências visuais para atividades cotidianas",
      materials: ["Fotos sequenciais", "Checklist visual", "Calendário adaptado"],
      implementation: "Método TEACCH adaptado para Síndrome de Down",
      objectives: ["Independência", "Organização", "Autonomia"],
      rating: 4.7,
      downloads: 2100,
    },
    {
      name: "Teatro de Expressão Emocional",
      age: "7-15 anos",
      duration: "25-40 min",
      description: "Atividades dramáticas para desenvolvimento emocional",
      materials: ["Máscaras expressivas", "Cenários simples", "Roteiros adaptados"],
      implementation: "Arteterapia combinada com educação emocional",
      objectives: ["Expressão", "Criatividade", "Socialização"],
      rating: 4.6,
      downloads: 1650,
    },
    {
      name: "Atividade de História - Família Real no Brasil",
      age: "8-12 anos",
      duration: "45-60 min",
      description: "Exercícios sobre a chegada da Família Real Portuguesa (1808) - 2º série",
      materials: ["Quadro com palavras", "Imagens", "Respostas visuais"],
      implementation: "Adaptado para alunos com Síndrome de Down",
      objectives: ["Conhecimento histórico", "Leitura", "Compreensão de texto"],
      rating: 4.5,
      downloads: 1100,
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
      downloads: 890,
      downloadFile: "quimica-pilha-daniell",
    },
  ]

  const courses = [
    {
      title: "Desenvolvimento da Pessoa com Síndrome de Down",
      provider: "Educamundo",
      duration: "80h",
      price: "R$ 69,90",
      rating: 4.8,
      students: 4200,
      certificate: true,
      level: "Intermediário",
      modules: 12,
      url: "https://educamundo.com.br/cursos-online/desenvolvimento-da-pessoa-com-sindrome-de-down/",
    },
    {
      title: "Desenvolvimento da Pessoa com Síndrome de Down",
      provider: "Unova Cursos",
      duration: "50h",
      price: "Gratuito",
      rating: 4.6,
      students: 6800,
      certificate: true,
      level: "Básico",
      modules: 8,
      url: "https://www.unovacursos.com.br/curso/desenvolvimento-da-pessoa-com-sindrome-de-down",
    },
    {
      title: "Cursos de Educação Especial",
      provider: "SóEducador",
      duration: "120h",
      price: "R$ 147",
      rating: 4.7,
      students: 3500,
      certificate: true,
      level: "Intermediário",
      modules: 15,
      url: "https://www.soeducador.com.br/cursos",
    },
    {
      title: "A Inclusão da Criança com Síndrome de Down",
      provider: "Portal Educa",
      duration: "40h",
      price: "R$ 89",
      rating: 4.5,
      students: 2900,
      certificate: true,
      level: "Básico",
      modules: 6,
      url: "https://www.portaleduca.com.br/cursos/a-inclusao-da-crianca-com-sindrome-de-down",
    },
  ]

  const resources = [
    {
      title: "Manual Completo - Síndrome de Down na Escola",
      type: "Guia PDF",
      description: "Estratégias práticas validadas por experiência real com Vinicius Gabriel",
      featured: true,
      content: `MANUAL COMPLETO - SÍNDROME DE DOWN NA ESCOLA

SUMÁRIO
1. Introdução à Síndrome de Down
2. Características do Desenvolvimento
3. Estratégias Educacionais Eficazes
4. Adaptações Curriculares
5. Recursos e Materiais
6. Avaliação e Acompanhamento
7. Trabalho com Famílias
8. Validação Prática - Caso Vinicius Gabriel

1. INTRODUÇÃO
A Síndrome de Down é uma condição genética que resulta em características físicas específicas e desenvolvimento cognitivo diferenciado. Este manual oferece estratégias práticas validadas para promover a inclusão educacional efetiva.

2. CARACTERÍSTICAS DO DESENVOLVIMENTO
• Desenvolvimento cognitivo em ritmo próprio
• Processamento visual como ponto forte
• Necessidade de tempo adicional para aprendizagem
• Capacidade de aprendizagem ao longo da vida
• Importância da motivação e autoestima

3. ESTRATÉGIAS EDUCACIONAIS

3.1 APRENDIZAGEM VISUAL
- Use fotografias e imagens claras
- Organize informações visualmente
- Demonstre antes de explicar verbalmente
- Crie materiais visuais personalizados

IMPLEMENTAÇÃO PRÁTICA:
• Fotografias reais são mais eficazes que desenhos
• Use sequências visuais para atividades complexas
• Mantenha organização visual limpa
• Adapte tamanho conforme necessidade visual

3.2 REPETIÇÃO E REFORÇO
- Pratique conceitos múltiplas vezes
- Varie as formas de apresentação
- Use jogos educativos
- Celebre cada progresso

DICAS PRÁTICAS:
• Repita em contextos diferentes
• Use múltiplos sentidos
• Crie rotinas de prática
• Registre progressos visualmente

3.3 COMUNICAÇÃO SIMPLIFICADA
- Frases curtas e diretas
- Vocabulário acessível
- Confirmação de entendimento
- Paciência para respostas

4. VALIDAÇÃO PRÁTICA - VINICIUS GABRIEL
Este manual foi desenvolvido com base na experiência real de Vinicius Gabriel, que possui Síndrome de Down e Autismo:

ESTRATÉGIAS QUE FUNCIONARAM:
• Rotinas visuais estruturadas
• Feedback positivo constante
• Atividades baseadas em interesses
• Tempo adicional respeitado
• Celebração de conquistas

LIÇÕES APRENDIDAS:
- Cada pessoa é única
- Paciência é fundamental
- Pequenos progressos são grandes vitórias
- Envolvimento familiar é essencial

5. RECURSOS PRÁTICOS
CHECKLIST DE ADAPTAÇÕES:
□ Material visual preparado
□ Tempo adicional planejado
□ Atividades de interesse incluídas
□ Sistema de recompensas ativo
□ Comunicação simplificada
□ Ambiente organizado

6. CONCLUSÃO
A educação inclusiva para pessoas com Síndrome de Down requer compreensão, adaptação e principalmente amor. Este manual oferece ferramentas práticas validadas pela experiência real.

© AtypicalClass 2025 - Educação Inclusiva para Todos`,
    },
    {
      title: "Kit de Atividades Cognitivas",
      type: "Recursos Práticos",
      description: "45 exercícios para estimulação cognitiva adaptados",
      featured: false,
      content: `KIT DE ATIVIDADES COGNITIVAS - SÍNDROME DE DOWN

CONTEÚDO: 45 atividades organizadas por área de desenvolvimento

MEMÓRIA (15 atividades):
1. Jogo da Memória com Fotos Familiares
2. Sequência de Objetos do Cotidiano
3. Memória Auditiva com Sons
4. Lembrar Rotinas Diárias
5. Associação Imagem-Palavra
6. Memória de Posições
7. Sequência de Cores
8. Lembrar Lista de Compras
9. Memória de Histórias Simples
10. Associação Nome-Rosto
11. Sequência de Movimentos
12. Memória de Números
13. Lembrar Regras de Jogos
14. Memória Visual de Detalhes
15. Sequência de Ações

ATENÇÃO E CONCENTRAÇÃO (15 atividades):
1. Encontrar Diferenças
2. Labirintos Simples
3. Completar Desenhos
4. Seguir Instruções Sequenciais
5. Classificar por Categorias
6. Jogos de Encaixe
7. Quebra-cabeças Adaptados
8. Atividades de Coordenação
9. Exercícios de Respiração
10. Jogos de Ritmo
11. Atividades com Timer
12. Organizar por Tamanho
13. Seguir Padrões
14. Atividades de Pareamento
15. Exercícios de Foco Visual

RACIOCÍNIO LÓGICO (15 atividades):
1. Sequências Lógicas
2. Causa e Efeito
3. Resolução de Problemas Simples
4. Classificação por Critérios
5. Analogias Visuais
6. Completar Padrões
7. Jogos de Estratégia Simples
8. Organização Temporal
9. Relações Espaciais
10. Comparações
11. Seriação
12. Inclusão de Classes
13. Conservação
14. Correspondência
15. Reversibilidade

INSTRUÇÕES GERAIS:
- Adapte o nível conforme a capacidade individual
- Use reforço positivo constante
- Permita tempo adicional
- Celebre cada conquista
- Registre progressos

MATERIAIS NECESSÁRIOS:
- Papel e lápis coloridos
- Objetos do cotidiano
- Fotos familiares
- Timer visual
- Materiais de diferentes texturas

© AtypicalClass 2025`,
    },
    {
      title: "Protocolo de Avaliação Pedagógica",
      type: "Ferramenta",
      description: "Instrumento para acompanhamento do desenvolvimento",
      featured: true,
      content: `PROTOCOLO DE AVALIAÇÃO PEDAGÓGICA - SÍNDROME DE DOWN

DADOS DO ALUNO:
Nome: _________________________________
Data de Nascimento: ____________________
Escola: _______________________________
Professor(a): ___________________________
Data da Avaliação: _____________________

1. DESENVOLVIMENTO COGNITIVO

ATENÇÃO E CONCENTRAÇÃO:
□ Mantém atenção por 5-10 minutos
□ Segue instruções simples
□ Completa atividades iniciadas
□ Resiste a distrações
Observações: ___________________________

MEMÓRIA:
□ Lembra rotinas diárias
□ Reconhece pessoas familiares
□ Retém informações simples
□ Associa imagens a palavras
Observações: ___________________________

RACIOCÍNIO:
□ Resolve problemas simples
□ Faz associações lógicas
□ Compreende causa e efeito
□ Classifica objetos
Observações: ___________________________

2. DESENVOLVIMENTO DA LINGUAGEM

COMPREENSÃO:
□ Entende instruções verbais simples
□ Responde a perguntas básicas
□ Compreende conceitos espaciais
□ Segue comandos de duas etapas
Observações: ___________________________

EXPRESSÃO:
□ Usa palavras funcionais
□ Forma frases simples
□ Expressa necessidades básicas
□ Participa de conversas
Observações: ___________________________

3. HABILIDADES ACADÊMICAS

LEITURA:
□ Reconhece letras
□ Identifica palavras familiares
□ Compreende textos simples
□ Associa imagem-texto
Observações: ___________________________

MATEMÁTICA:
□ Conta até 10
□ Reconhece números
□ Faz operações simples
□ Compreende conceitos de quantidade
Observações: ___________________________

ESCRITA:
□ Segura lápis adequadamente
□ Traça linhas e formas
□ Copia letras e palavras
□ Escreve nome próprio
Observações: ___________________________

4. HABILIDADES SOCIAIS

INTERAÇÃO:
□ Cumprimenta pessoas
□ Participa de atividades em grupo
□ Compartilha materiais
□ Demonstra empatia
Observações: ___________________________

AUTONOMIA:
□ Cuida de pertences pessoais
□ Segue rotinas independentemente
□ Toma decisões simples
□ Pede ajuda quando necessário
Observações: ___________________________

5. COMPORTAMENTO

AUTORREGULAÇÃO:
□ Controla impulsos
□ Aceita mudanças na rotina
□ Lida com frustrações
□ Usa estratégias de calma
Observações: ___________________________

6. RECOMENDAÇÕES

PONTOS FORTES IDENTIFICADOS:
_____________________________________
_____________________________________

ÁREAS PARA DESENVOLVIMENTO:
_____________________________________
_____________________________________

ESTRATÉGIAS RECOMENDADAS:
_____________________________________
_____________________________________

PRÓXIMA AVALIAÇÃO: ___________________

© AtypicalClass 2025`,
    },
    {
      title: "Jogos Educativos Adaptados",
      type: "Material Lúdico",
      description: "Coleção de 20 jogos para diferentes faixas etárias",
      featured: false,
      content: `JOGOS EDUCATIVOS ADAPTADOS - SÍNDROME DE DOWN

COLEÇÃO DE 20 JOGOS ORGANIZADOS POR FAIXA ETÁRIA

JOGOS PARA 4-7 ANOS (5 jogos):

1. JOGO DAS EMOÇÕES
Objetivo: Reconhecer e expressar emoções
Material: Cartas com expressões faciais
Como jogar: Mostrar carta e imitar a emoção
Adaptações: Use fotos reais, espelho para prática

2. MEMÓRIA DOS ANIMAIS
Objetivo: Desenvolver memória visual
Material: Cartas com animais
Como jogar: Encontrar pares iguais
Adaptações: Comece com 4 pares, aumente gradualmente

3. QUEBRA-CABEÇA GIGANTE
Objetivo: Coordenação e raciocínio
Material: Peças grandes e coloridas
Como jogar: Montar imagem completa
Adaptações: Peças com encaixe facilitado

4. JOGO DO ESPELHO
Objetivo: Imitação e coordenação
Material: Apenas um espelho
Como jogar: Imitar movimentos
Adaptações: Movimentos lentos e claros

5. CLASSIFICAÇÃO DE CORES
Objetivo: Organização e categorização
Material: Objetos coloridos
Como jogar: Separar por cores
Adaptações: Use objetos do cotidiano

JOGOS PARA 8-12 ANOS (8 jogos):

6. BINGO DAS PALAVRAS
Objetivo: Reconhecimento de palavras
Material: Cartelas com palavras/imagens
Como jogar: Marcar palavras sorteadas
Adaptações: Combine palavra e imagem

7. JOGO DA ROTINA
Objetivo: Sequência temporal
Material: Cartas de atividades diárias
Como jogar: Organizar em ordem cronológica
Adaptações: Use fotos da própria rotina

8. DOMINÓ EDUCATIVO
Objetivo: Associação e raciocínio
Material: Peças com imagens/números
Como jogar: Conectar peças relacionadas
Adaptações: Temas de interesse da criança

9. JOGO DOS OPOSTOS
Objetivo: Conceitos e vocabulário
Material: Cartas com opostos
Como jogar: Encontrar pares opostos
Adaptações: Use gestos e demonstrações

10. TRILHA DO CONHECIMENTO
Objetivo: Conhecimentos gerais
Material: Tabuleiro e cartas de perguntas
Como jogar: Avançar respondendo perguntas
Adaptações: Perguntas com múltipla escolha

11. JOGO DA PROFISSÃO
Objetivo: Conhecimento social
Material: Cartas de profissões e ferramentas
Como jogar: Associar profissão à ferramenta
Adaptações: Use profissões familiares

12. CAÇA AO TESOURO
Objetivo: Seguir instruções e orientação
Material: Pistas visuais
Como jogar: Seguir pistas até o tesouro
Adaptações: Pistas com imagens claras

13. JOGO DO MERCADO
Objetivo: Matemática funcional
Material: Produtos e dinheiro de brinquedo
Como jogar: Comprar e vender produtos
Adaptações: Use valores simples

JOGOS PARA 13+ ANOS (7 jogos):

14. JOGO DA INDEPENDÊNCIA
Objetivo: Habilidades de vida diária
Material: Cartas de situações
Como jogar: Resolver situações práticas
Adaptações: Situações reais do cotidiano

15. QUIZ ADAPTADO
Objetivo: Conhecimentos gerais
Material: Perguntas de múltipla escolha
Como jogar: Responder perguntas
Adaptações: Temas de interesse pessoal

16. JOGO DE ESTRATÉGIA SIMPLES
Objetivo: Planejamento e tomada de decisão
Material: Tabuleiro e peças
Como jogar: Alcançar objetivo estratégico
Adaptações: Regras simplificadas

17. TEATRO DE FANTOCHES
Objetivo: Expressão e criatividade
Material: Fantoches e cenários
Como jogar: Criar e representar histórias
Adaptações: Roteiros simples e conhecidos

18. JOGO DA AMIZADE
Objetivo: Habilidades sociais
Material: Cartas de situações sociais
Como jogar: Discutir e resolver situações
Adaptações: Situações da vida real

19. CULINÁRIA EDUCATIVA
Objetivo: Seguir instruções e autonomia
Material: Receitas visuais simples
Como jogar: Preparar receitas
Adaptações: Receitas sem fogo

20. JOGO DO TEMPO
Objetivo: Conceitos temporais
Material: Relógio e cartas de horários
Como jogar: Associar atividades a horários
Adaptações: Use relógio digital

DICAS GERAIS:
- Adapte regras conforme necessidade
- Use reforço positivo constante
- Permita tempo adicional
- Celebre participação, não apenas vitória
- Inclua interesses pessoais

© AtypicalClass 2025`,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return "bg-blue-600"
      case "Intermediário":
        return "bg-blue-500"
      case "Avançado":
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
    notification.innerHTML = `✅ Download iniciado: ${resource.title}`
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
      case "Sistema de Recompensas Visuais":
        return "Baseado em princípios de reforço positivo, este sistema motiva alunos com Síndrome de Down através de objetivos visuais claros e recompensas tangíveis. A visualização do progresso aumenta a autoestima e mantém o engajamento, respeitando o processamento visual como ponto forte."
      case "Jogos de Memória Adaptados":
        return "Desenvolvidos considerando o perfil cognitivo da Síndrome de Down, estes jogos estimulam a neuroplasticidade através de atividades progressivas. A repetição estruturada fortalece conexões neurais e melhora a capacidade de retenção e recuperação de informações."
      case "Rotina de Vida Diária Estruturada":
        return "Adaptação do método TEACCH para Síndrome de Down, focando no desenvolvimento de autonomia e independência. As sequências visuais quebram tarefas complexas em passos simples, promovendo aprendizagem gradual e autoconfiança."
      case "Teatro de Expressão Emocional":
        return "Combina arteterapia com educação emocional, aproveitando a natureza sociável e expressiva típica da Síndrome de Down. Desenvolve habilidades de comunicação, expressão criativa e reconhecimento emocional através de atividades lúdicas."
      default:
        return "Atividade desenvolvida considerando as características específicas da Síndrome de Down: processamento visual forte, necessidade de repetição, e potencial para aprendizagem contínua."
    }
  }

  const getStepByStep = (name: string) => {
    switch (name) {
      case "Sistema de Recompensas Visuais":
        return [
          "Crie um quadro magnético colorido e atrativo",
          "Defina metas pequenas e alcançáveis",
          "Escolha estrelas ou adesivos coloridos",
          "Explique o sistema de forma simples e visual",
          "Demonstre como ganhar e colar estrelas",
          "Celebre cada estrela conquistada",
          "Defina recompensas significativas para o aluno",
          "Ajuste metas conforme progresso",
        ]
      case "Jogos de Memória Adaptados":
        return [
          "Comece com 4 pares de cartas grandes",
          "Use imagens claras e familiares",
          "Demonstre como jogar passo a passo",
          "Jogue junto inicialmente",
          "Celebre cada acerto com entusiasmo",
          "Aumente gradualmente o número de pares",
          "Varie as imagens para manter interesse",
          "Registre progressos em gráfico visual",
        ]
      case "Rotina de Vida Diária Estruturada":
        return [
          "Fotografe cada etapa da rotina",
          "Organize fotos em sequência lógica",
          "Plastifique para durabilidade",
          "Cole em local de fácil acesso",
          "Ensine a sequência passo a passo",
          "Pratique cada etapa separadamente",
          "Combine etapas gradualmente",
          "Celebre independência crescente",
        ]
      default:
        return [
          "Prepare materiais visuais grandes e claros",
          "Explique de forma simples e direta",
          "Demonstre antes de pedir execução",
          "Ofereça tempo adicional",
          "Forneça apoio quando necessário",
          "Celebre cada tentativa e progresso",
        ]
    }
  }

  const getTips = (name: string) => {
    switch (name) {
      case "Sistema de Recompensas Visuais":
        return [
          "Use cores vibrantes e atrativas",
          "Escolha recompensas realmente desejadas pelo aluno",
          "Mantenha metas pequenas e frequentes",
          "Celebre com entusiasmo genuíno",
          "Permita que o aluno cole as estrelas",
        ]
      case "Jogos de Memória Adaptados":
        return [
          "Use imagens de interesse do aluno",
          "Mantenha ambiente calmo e sem distrações",
          "Seja paciente com o tempo de resposta",
          "Ofereça dicas visuais quando necessário",
          "Foque no progresso, não na perfeição",
        ]
      case "Rotina de Vida Diária Estruturada":
        return [
          "Use fotos reais do próprio aluno",
          "Mantenha sequência sempre igual",
          "Permita tempo extra para cada etapa",
          "Ofereça ajuda física quando necessário",
          "Celebre independência crescente",
        ]
      default:
        return [
          "Use linguagem simples e clara",
          "Ofereça tempo adicional sempre",
          "Celebre pequenas conquistas",
          "Mantenha paciência e positividade",
        ]
    }
  }

  const getVariations = (name: string) => {
    switch (name) {
      case "Sistema de Recompensas Visuais":
        return [
          "Use diferentes formatos (estrelas, corações, smileys)",
          "Crie versões temáticas (animais, personagens)",
          "Adicione sons de celebração",
          "Crie versões digitais em tablet",
          "Inclua fotos do aluno nas conquistas",
        ]
      case "Jogos de Memória Adaptados":
        return ["Use sons além de imagens", "Crie versões com texturas", "Adicione elementos de diversão"]
      default:
        return []
    }
  }

  const getAssessment = (name: string) => {
    switch (name) {
      case "Sistema de Recompensas Visuais":
        return [
          "Observe o engajamento do aluno",
          "Registre a frequência de uso",
          "Avalie a motivação em atingir metas",
          "Ajuste recompensas conforme necessário",
        ]
      case "Jogos de Memória Adaptados":
        return [
          "Registre o número de acertos",
          "Monitore o tempo de resposta",
          "Observe a concentração do aluno",
          "Ajuste a dificuldade gradualmente",
        ]
      case "Rotina de Vida Diária Estruturada":
        return [
          "Observe a independência do aluno",
          "Registre a frequência de uso",
          "Avalie a autonomia nas tarefas",
          "Ajuste a sequência conforme necessário",
        ]
      default:
        return [
          "Observe a participação do aluno",
          "Registre o progresso nas habilidades",
          "Avalie a compreensão das atividades",
          "Ajuste as estratégias conforme necessário",
        ]
    }
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
          <h2 className="text-4xl font-bold text-white mb-4">Síndrome de Down</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Estratégias e recursos para promover o desenvolvimento integral de alunos com Síndrome de Down, baseados em
            pesquisa científica e validados através da experiência real de Vinicius Gabriel.
          </p>
          <div className="flex justify-center space-x-6">
            <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">19</div>
              <div className="text-sm text-gray-400">recursos disponíveis</div>
            </div>
            <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">✓</div>
              <div className="text-sm text-gray-400">validação prática</div>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="strategies" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-slate-700">
          <TabsTrigger value="strategies" className="data-[state=active]:bg-blue-600">
            Estratégias
          </TabsTrigger>
          <TabsTrigger value="activities" className="data-[state=active]:bg-blue-600">
            Atividades
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-blue-600">
            Cursos
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600">
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
                    <CardDescription className="text-gray-300">{strategy.description}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{strategy.effectiveness}% eficaz</span>
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
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">Materiais:</h5>
                      <div className="flex flex-wrap gap-1">
                        {activity.materials.map((material, i) => (
                          <Badge key={i} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">Objetivos:</h5>
                      <div className="flex flex-wrap gap-1">
                        {activity.objectives.map((objective, i) => (
                          <Badge key={i} className="bg-blue-600 text-white text-xs">
                            {objective}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">Fundamentação:</h5>
                      <p className="text-sm text-gray-300">{activity.implementation}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-400">{activity.downloads} downloads</span>
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
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
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
                        <span className="text-gray-400">({course.students} alunos)</span>
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
                    <CardDescription className="text-gray-300">{resource.description}</CardDescription>
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
      <ActivityDetailsModal isOpen={isModalOpen} onClose={closeModal} activity={selectedActivity} />
    </div>
  )
}
