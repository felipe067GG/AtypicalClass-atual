"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, BookOpen, Download, Clock, ExternalLink, Target, Star } from "lucide-react"
import ActivityDetailsModal from "./activity-details-modal"

export default function ADHDSection() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const strategies = [
    {
      title: "Estrutura e Organização",
      description: "Criação de ambientes organizados e rotinas claras",
      tips: ["Cronogramas visuais detalhados", "Listas de tarefas priorizadas", "Espaço físico organizado"],
      source: "Barkley (2020) - 'TDAH: Manual Completo'",
      difficulty: "Básico",
      effectiveness: 91,
    },
    {
      title: "Pausas Ativas",
      description: "Incorporação de movimento e pausas regulares",
      tips: ["Exercícios de 2-5 minutos", "Caminhadas curtas", "Atividades físicas direcionadas"],
      source: "Harvard (2024) - Neurociência Educacional",
      difficulty: "Básico",
      effectiveness: 88,
    },
    {
      title: "Foco e Atenção",
      description: "Técnicas para manter concentração sustentada",
      tips: ["Tarefas divididas em etapas", "Recompensas imediatas", "Ambiente sem distrações"],
      source: "Método Pomodoro adaptado",
      difficulty: "Intermediário",
      effectiveness: 85,
    },
    {
      title: "Autorregulação Emocional",
      description: "Estratégias para controle de impulsos e emoções",
      tips: ["Técnicas de respiração", "Pausas reflexivas", "Identificação de gatilhos"],
      source: "Terapia Cognitivo-Comportamental adaptada",
      difficulty: "Intermediário",
      effectiveness: 87,
    },
    {
      title: "Gamificação Educacional",
      description: "Uso de elementos de jogos para engajamento",
      tips: ["Sistema de pontos", "Desafios graduais", "Recompensas imediatas"],
      source: "Neuroeducação aplicada ao TDAH",
      difficulty: "Avançado",
      effectiveness: 93,
    },
    {
      title: "Multissensorialidade",
      description: "Atividades que envolvem múltiplos sentidos",
      tips: ["Recursos visuais e táteis", "Movimento corporal", "Estímulos auditivos controlados"],
      source: "Metodologia multissensorial",
      difficulty: "Básico",
      effectiveness: 89,
    },
  ]

  const activities = [
    {
      name: "Timer de Foco Progressivo",
      age: "7-16 anos",
      duration: "5-25 min",
      description: "Cronômetro visual que aumenta gradualmente o tempo de concentração",
      materials: ["Timer visual", "Cartões de tarefas", "Quadro de pontos"],
      implementation: "Técnica Pomodoro adaptada para TDAH",
      objectives: ["Concentração", "Persistência", "Autorregulação"],
      rating: 4.8,
      downloads: 2890,
    },
    {
      name: "Circuito de Movimento Cognitivo",
      age: "8-15 anos",
      duration: "20-35 min",
      description: "Atividade física aliada a desafios cognitivos",
      materials: ["Cones", "Cartões de desafios", "Cronômetro", "Música"],
      implementation: "Neurociência do movimento aplicada",
      objectives: ["Atenção", "Coordenação", "Funções executivas"],
      rating: 4.9,
      downloads: 3200,
    },
    {
      name: "Sistema de Recompensas Gamificado",
      age: "6-14 anos",
      duration: "15-30 min",
      description: "Plataforma de pontos e conquistas para motivação",
      materials: ["Quadro de pontos", "Badges", "Cartões de missão"],
      implementation: "Gamificação baseada em neurociência motivacional",
      objectives: ["Motivação", "Persistência", "Autoestima"],
      rating: 4.7,
      downloads: 2650,
    },
    {
      name: "Kit de Autorregulação TDAH",
      age: "8-16 anos",
      duration: "10-20 min",
      description: "Ferramentas para gestão de impulsos e emoções",
      materials: ["Cartões de estratégias", "Fidgets", "Timer de pausa"],
      implementation: "Terapia cognitivo-comportamental adaptada",
      objectives: ["Autorregulação", "Controle emocional", "Foco"],
      rating: 4.6,
      downloads: 2100,
    },
  ]

  const courses = [
    {
      title: "Transtorno do Déficit de Atenção e Hiperatividade",
      provider: "Ginead",
      duration: "60h",
      price: "Gratuito",
      rating: 4.7,
      students: 12500,
      certificate: true,
      level: "Básico",
      modules: 10,
      url: "https://www.ginead.com.br/curso/curso-online-gratis-transtorno-do-deficit-de-atencao-e-hiperatividade",
    },
    {
      title: "Transtorno do Déficit de Atenção e Hiperatividade",
      provider: "WR Educacional",
      duration: "40h",
      price: "Gratuito",
      rating: 4.6,
      students: 8900,
      certificate: true,
      level: "Básico",
      modules: 8,
      url: "https://www.wreducacional.com.br/curso-gratis-de-transtorno-do-deficit-de-atencao-e-hiperatividade",
    },
    {
      title: "TDAH - Curso Completo",
      provider: "Ello Cursos",
      duration: "30h",
      price: "R$ 97",
      rating: 4.8,
      students: 5200,
      certificate: true,
      level: "Intermediário",
      modules: 6,
      url: "https://www.ellocursos.com.br/tdah/",
    },
    {
      title: "Introdução ao TDAH",
      provider: "IPED",
      duration: "20h",
      price: "Gratuito",
      rating: 4.5,
      students: 7800,
      certificate: true,
      level: "Básico",
      modules: 4,
      url: "https://www.iped.com.br/cursos-gratis/educacao-e-pedagogia/curso-rapido/introducao-tdah",
    },
  ]

  const resources = [
    {
      title: "Guia Prático - TDAH na Educação",
      type: "Manual PDF",
      description: "Estratégias baseadas em neurociência educacional",
      featured: true,
      content: `GUIA PRÁTICO - TDAH NA EDUCAÇÃO

SUMÁRIO
1. Compreendendo o TDAH
2. Neurociência do TDAH
3. Estratégias de Foco e Atenção
4. Autorregulação Emocional
5. Gamificação Educacional
6. Ambiente Adaptado
7. Avaliação e Acompanhamento
8. Trabalho com Famílias

1. COMPREENDENDO O TDAH

O Transtorno do Déficit de Atenção com Hiperatividade (TDAH) é uma condição neurobiológica que afeta aproximadamente 5-7% das crianças em idade escolar.

CARACTERÍSTICAS PRINCIPAIS:
• Dificuldade de atenção sustentada
• Hiperatividade motora
• Impulsividade
• Dificuldades nas funções executivas
• Variabilidade no desempenho

TIPOS DE TDAH:
- Predominantemente desatento
- Predominantemente hiperativo-impulsivo
- Combinado (mais comum)

2. NEUROCIÊNCIA DO TDAH

ÁREAS CEREBRAIS AFETADAS:
• Córtex pré-frontal (funções executivas)
• Gânglios da base (controle motor)
• Cerebelo (coordenação e atenção)
• Rede atencional (foco sustentado)

NEUROTRANSMISSORES:
- Dopamina (motivação e recompensa)
- Noradrenalina (atenção e alerta)

3. ESTRATÉGIAS DE FOCO E ATENÇÃO

3.1 TÉCNICA POMODORO ADAPTADA
- Períodos curtos de foco (5-15 min)
- Pausas ativas regulares
- Timer visual
- Recompensas imediatas

IMPLEMENTAÇÃO:
• Comece com 5 minutos
• Aumente gradualmente
• Use sinais visuais
• Celebre cada conquista

3.2 AMBIENTE SEM DISTRAÇÕES
- Redução de estímulos visuais
- Organização física clara
- Posicionamento estratégico
- Materiais essenciais apenas

4. AUTORREGULAÇÃO EMOCIONAL

ESTRATÉGIAS PRÁTICAS:
• Técnicas de respiração
• Pausas reflexivas
• Identificação de emoções
• Estratégias de enfrentamento

IMPLEMENTAÇÃO:
- Ensine sinais de alerta
- Pratique técnicas de calma
- Use cartões de estratégias
- Modele comportamentos

5. GAMIFICAÇÃO EDUCACIONAL

ELEMENTOS EFICAZES:
• Sistema de pontos
• Badges e conquistas
• Desafios graduais
• Feedback imediato
• Narrativa envolvente

IMPLEMENTAÇÃO:
- Defina objetivos claros
- Recompense tentativas
- Varie os desafios
- Mantenha engajamento

6. AMBIENTE ADAPTADO

ORGANIZAÇÃO FÍSICA:
• Espaços definidos
• Materiais organizados
• Sinalizações visuais
• Área de movimento

ROTINAS ESTRUTURADAS:
- Cronogramas visuais
- Transições suaves
- Avisos antecipados
- Flexibilidade planejada

7. AVALIAÇÃO E ACOMPANHAMENTO

MÉTODOS ADAPTATIVOS:
• Avaliação contínua
• Múltiplas formas de expressão
• Tempo adicional
• Pausas durante provas

INDICADORES DE PROGRESSO:
- Tempo de atenção sustentada
- Redução de comportamentos impulsivos
- Melhoria na organização
- Aumento da autoestima

8. TRABALHO COM FAMÍLIAS

ESTRATÉGIAS DE PARCERIA:
• Comunicação regular
• Consistência entre ambientes
• Orientações práticas
• Apoio emocional

CONCLUSÃO:
O sucesso educacional de alunos com TDAH depende de estratégias específicas, ambiente adaptado e colaboração entre escola e família. Com as abordagens corretas, estes alunos podem alcançar seu pleno potencial.

© AtypicalClass 2025 - Educação Inclusiva para Todos`,
    },
    {
      title: "Kit de Atividades para Foco",
      type: "Recursos Práticos",
      description: "50 exercícios para desenvolvimento da atenção",
      featured: false,
      content: `KIT DE ATIVIDADES PARA FOCO - TDAH

50 EXERCÍCIOS ORGANIZADOS POR OBJETIVO

ATENÇÃO SUSTENTADA (15 exercícios):

1. CAÇA AO TESOURO VISUAL
Objetivo: Manter foco em tarefa específica
Material: Imagens complexas, lista de itens
Tempo: 5-15 minutos
Instruções: Encontrar itens específicos em imagem

2. SEQUÊNCIA DE CORES
Objetivo: Atenção sequencial
Material: Cartões coloridos
Tempo: 3-10 minutos
Instruções: Repetir sequência mostrada

3. LABIRINTO PROGRESSIVO
Objetivo: Concentração sustentada
Material: Labirintos de dificuldade crescente
Tempo: 5-20 minutos
Instruções: Completar sem levantar o lápis

4. CONTAGEM REGRESSIVA
Objetivo: Foco auditivo
Material: Apenas voz
Tempo: 2-5 minutos
Instruções: Contar de 100 a 1 de 3 em 3

5. DESENHO DIRIGIDO
Objetivo: Atenção às instruções
Material: Papel e lápis
Tempo: 10-15 minutos
Instruções: Desenhar seguindo comandos verbais

CONTROLE INIBITÓRIO (15 exercícios):

6. STOP AND GO
Objetivo: Controle de impulsos
Material: Música, sinais visuais
Tempo: 5-10 minutos
Instruções: Mover-se com música, parar no sinal

7. SIMON SAYS ADAPTADO
Objetivo: Inibição de respostas
Material: Comandos verbais
Tempo: 5-15 minutos
Instruções: Obedecer apenas comandos com "Simon says"

8. RESPIRAÇÃO CONTROLADA
Objetivo: Autorregulação
Material: Timer, cartões visuais
Tempo: 3-5 minutos
Instruções: Respirar seguindo ritmo visual

9. JOGO DO CONTRÁRIO
Objetivo: Flexibilidade cognitiva
Material: Cartões com ações
Tempo: 5-10 minutos
Instruções: Fazer o oposto do mostrado

10. PAUSA REFLEXIVA
Objetivo: Controle de impulsos
Material: Situações problema
Tempo: 2-5 minutos
Instruções: Pensar antes de responder

MEMÓRIA DE TRABALHO (10 exercícios):

11. SEQUÊNCIA NUMÉRICA
Objetivo: Memória auditiva
Material: Números falados
Tempo: 3-8 minutos
Instruções: Repetir sequência de números

12. HISTÓRIA COM DETALHES
Objetivo: Memória narrativa
Material: Histórias curtas
Tempo: 10-15 minutos
Instruções: Lembrar detalhes específicos

13. LISTA DE COMPRAS
Objetivo: Memória visual
Material: Imagens de produtos
Tempo: 5-10 minutos
Instruções: Lembrar lista mostrada

14. PADRÕES VISUAIS
Objetivo: Memória de padrões
Material: Formas geométricas
Tempo: 3-7 minutos
Instruções: Reproduzir padrão mostrado

15. INSTRUÇÕES MÚLTIPLAS
Objetivo: Memória de comandos
Material: Lista de tarefas
Tempo: 5-15 minutos
Instruções: Executar 3-5 comandos em sequência

FLEXIBILIDADE COGNITIVA (10 exercícios):

16. CLASSIFICAÇÃO MÚLTIPLA
Objetivo: Mudança de critérios
Material: Objetos diversos
Tempo: 5-10 minutos
Instruções: Classificar por diferentes critérios

17. JOGO DAS CATEGORIAS
Objetivo: Flexibilidade mental
Material: Cartas com categorias
Tempo: 10-15 minutos
Instruções: Mudar categoria rapidamente

18. PERSPECTIVAS DIFERENTES
Objetivo: Mudança de ponto de vista
Material: Situações problema
Tempo: 10-20 minutos
Instruções: Ver situação de diferentes ângulos

19. ALTERNÂNCIA DE TAREFAS
Objetivo: Flexibilidade executiva
Material: Duas atividades diferentes
Tempo: 10-15 minutos
Instruções: Alternar entre tarefas

20. CRIATIVIDADE DIRIGIDA
Objetivo: Pensamento divergente
Material: Objetos comuns
Tempo: 5-15 minutos
Instruções: Encontrar usos alternativos

DICAS DE IMPLEMENTAÇÃO:
- Comece com exercícios mais simples
- Aumente dificuldade gradualmente
- Use reforço positivo constante
- Permita pausas quando necessário
- Adapte tempo conforme necessidade
- Registre progressos visualmente

SINAIS DE FADIGA:
- Aumento de erros
- Inquietação motora
- Perda de interesse
- Comportamentos disruptivos

QUANDO PARAR:
- Sinais de fadiga aparecem
- Objetivo da sessão alcançado
- Tempo limite atingido
- Aluno solicita pausa

© AtypicalClass 2025`,
    },
    {
      title: "Protocolo de Avaliação TDAH Escolar",
      type: "Ferramenta",
      description: "Instrumento para acompanhamento educacional",
      featured: true,
      content: `PROTOCOLO DE AVALIAÇÃO TDAH ESCOLAR

DADOS DO ALUNO:
Nome: _________________________________
Data de Nascimento: ____________________
Diagnóstico: ___________________________
Escola: _______________________________
Professor(a): ___________________________
Data da Avaliação: _____________________

1. ATENÇÃO E CONCENTRAÇÃO

ATENÇÃO SUSTENTADA:
□ Mantém foco por 5-10 minutos
□ Completa tarefas iniciadas
□ Resiste a distrações externas
□ Segue instruções até o final
Observações: ___________________________

ATENÇÃO SELETIVA:
□ Foca no que é relevante
□ Ignora estímulos irrelevantes
□ Identifica informações importantes
□ Filtra distrações ambientais
Observações: ___________________________

2. HIPERATIVIDADE

ATIVIDADE MOTORA:
□ Permanece sentado quando necessário
□ Controla movimentos excessivos
□ Usa movimento de forma produtiva
□ Respeita espaço dos outros
Observações: ___________________________

INQUIETAÇÃO:
□ Controla fidgeting excessivo
□ Usa estratégias de autorregulação
□ Reconhece necessidade de movimento
□ Pede pausas quando necessário
Observações: ___________________________

3. IMPULSIVIDADE

CONTROLE DE IMPULSOS:
□ Pensa antes de agir
□ Espera sua vez para falar
□ Considera consequências
□ Usa estratégias de pausa
Observações: ___________________________

INTERAÇÃO SOCIAL:
□ Respeita regras sociais
□ Controla interrupções
□ Aguarda vez em atividades
□ Aceita feedback construtivo
Observações: ___________________________

4. FUNÇÕES EXECUTIVAS

ORGANIZAÇÃO:
□ Organiza materiais escolares
□ Planeja atividades
□ Gerencia tempo adequadamente
□ Segue rotinas estabelecidas
Observações: ___________________________

MEMÓRIA DE TRABALHO:
□ Lembra instruções múltiplas
□ Retém informações durante tarefas
□ Conecta informações novas com antigas
□ Usa estratégias de memória
Observações: ___________________________

5. DESEMPENHO ACADÊMICO

PARTICIPAÇÃO:
□ Participa ativamente das aulas
□ Faz perguntas relevantes
□ Contribui para discussões
□ Demonstra interesse pelo aprendizado
Observações: ___________________________

PRODUTIVIDADE:
□ Completa tarefas no tempo esperado
□ Mantém qualidade do trabalho
□ Persiste diante de dificuldades
□ Busca ajuda quando necessário
Observações: ___________________________

6. ASPECTOS EMOCIONAIS

AUTOESTIMA:
□ Demonstra confiança em suas habilidades
□ Aceita desafios apropriados
□ Lida bem com erros
□ Celebra conquistas pessoais
Observações: ___________________________

REGULAÇÃO EMOCIONAL:
□ Identifica próprias emoções
□ Usa estratégias de autorregulação
□ Controla frustrações
□ Busca apoio quando necessário
Observações: ___________________________

7. ESTRATÉGIAS UTILIZADAS

RECURSOS DE APOIO:
□ Timer visual
□ Fidgets apropriados
□ Pausas programadas
□ Sistema de recompensas
□ Organização visual
Observações: ___________________________

EFICÁCIA DAS ESTRATÉGIAS:
□ Estratégias são utilizadas independentemente
□ Mostram melhoria no comportamento
□ São generalizadas para diferentes contextos
□ São aceitas pelo aluno
Observações: ___________________________

8. RECOMENDAÇÕES

AMBIENTE:
_____________________________________
_____________________________________

ESTRATÉGIAS PEDAGÓGICAS:
_____________________________________
_____________________________________

RECURSOS NECESSÁRIOS:
_____________________________________
_____________________________________

ACOMPANHAMENTO:
_____________________________________
_____________________________________

9. PLANO DE AÇÃO

OBJETIVOS PRIORITÁRIOS:
1. ___________________________________
2. ___________________________________
3. ___________________________________

ESTRATÉGIAS A IMPLEMENTAR:
_____________________________________
_____________________________________

CRONOGRAMA:
_____________________________________
_____________________________________

PRÓXIMA AVALIAÇÃO: ___________________
RESPONSÁVEL: _________________________

© AtypicalClass 2025`,
    },
    {
      title: "Atividades de Movimento e Aprendizagem",
      type: "Material Lúdico",
      description: "25 atividades que combinam movimento com aprendizado",
      featured: false,
      content: `ATIVIDADES DE MOVIMENTO E APRENDIZAGEM - TDAH

25 ATIVIDADES ORGANIZADAS POR ÁREA

MATEMÁTICA EM MOVIMENTO (8 atividades):

1. PULAR TABUADA
Objetivo: Memorizar tabuada
Material: Corda, cartões numéricos
Como fazer: Pular corda contando tabuada
Adaptação: Use números menores para iniciantes

2. CORRIDA DOS NÚMEROS
Objetivo: Operações matemáticas
Material: Cones, cartões com operações
Como fazer: Correr até o cone com resposta correta
Adaptação: Varie dificuldade das operações

3. DANÇA DAS FORMAS
Objetivo: Geometria
Material: Música, formas no chão
Como fazer: Dançar e parar na forma solicitada
Adaptação: Use formas 3D para maior desafio

4. MEDINDO PASSOS
Objetivo: Conceitos de medida
Material: Fita métrica, objetos para medir
Como fazer: Medir distâncias caminhando
Adaptação: Use unidades não convencionais

5. GRÁFICO HUMANO
Objetivo: Estatística básica
Material: Perguntas, espaço amplo
Como fazer: Formar gráfico com posicionamento corporal
Adaptação: Use temas de interesse dos alunos

6. FRAÇÕES CORPORAIS
Objetivo: Conceito de frações
Material: Grupos de alunos
Como fazer: Formar frações com grupos de pessoas
Adaptação: Use objetos concretos também

7. SEQUÊNCIA NUMÉRICA ATIVA
Objetivo: Ordem numérica
Material: Números grandes, espaço
Como fazer: Organizar-se em ordem numérica
Adaptação: Use números decimais para avançados

8. PROBLEMA EM MOVIMENTO
Objetivo: Resolução de problemas
Material: Situações-problema, objetos
Como fazer: Representar problema fisicamente
Adaptação: Use problemas do cotidiano

PORTUGUÊS ATIVO (8 atividades):

9. ALFABETO CORPORAL
Objetivo: Reconhecimento de letras
Material: Corpo, espelho
Como fazer: Formar letras com o corpo
Adaptação: Forme palavras inteiras

10. CAÇA ÀS PALAVRAS GIGANTE
Objetivo: Vocabulário
Material: Letras grandes, espaço amplo
Como fazer: Encontrar e formar palavras caminhando
Adaptação: Use temas específicos

11. RIMA E MOVIMENTO
Objetivo: Consciência fonológica
Material: Palavras, movimentos
Como fazer: Mover-se conforme rimas
Adaptação: Crie movimentos específicos para cada som

12. HISTÓRIA EM AÇÃO
Objetivo: Compreensão narrativa
Material: História, adereços simples
Como fazer: Representar história com movimento
Adaptação: Alunos criam próprias histórias

13. SÍLABAS SALTITANTES
Objetivo: Divisão silábica
Material: Palavras, espaço para pular
Como fazer: Pular uma vez para cada sílaba
Adaptação: Use palmas junto com pulos

14. TEATRO DE VERBOS
Objetivo: Classes gramaticais
Material: Cartões com verbos
Como fazer: Representar ações dos verbos
Adaptação: Inclua advérbios de modo

15. PONTUAÇÃO CORPORAL
Objetivo: Pontuação
Material: Textos, gestos
Como fazer: Usar gestos para cada pontuação
Adaptação: Crie história com pontuação específica

16. DEBATE CAMINHANTE
Objetivo: Argumentação
Material: Tema polêmico, espaço
Como fazer: Debater caminhando em círculo
Adaptação: Use temas adequados à idade

CIÊNCIAS EM AÇÃO (5 atividades):

17. SISTEMA SOLAR HUMANO
Objetivo: Astronomia
Material: Fantasias simples, espaço
Como fazer: Representar planetas em órbita
Adaptação: Inclua luas e asteroides

18. CADEIA ALIMENTAR VIVA
Objetivo: Ecologia
Material: Cartões de animais
Como fazer: Formar cadeia alimentar com movimento
Adaptação: Use ecossistemas locais

19. CICLO DA ÁGUA CORPORAL
Objetivo: Ciclos naturais
Material: Gestos, música
Como fazer: Representar evaporação, condensação, etc.
Adaptação: Inclua poluição e tratamento

20. ESTADOS DA MATÉRIA
Objetivo: Física básica
Material: Espaço, imaginação
Como fazer: Mover-se como sólido, líquido, gás
Adaptação: Use temperatura como variável

21. EXPERIMENTO ATIVO
Objetivo: Método científico
Material: Experimento simples, movimento
Como fazer: Fazer experimento com participação corporal
Adaptação: Varie complexidade do experimento

HISTÓRIA E GEOGRAFIA ATIVAS (4 atividades):

22. LINHA DO TEMPO HUMANA
Objetivo: Cronologia histórica
Material: Eventos históricos, espaço linear
Como fazer: Posicionar-se cronologicamente
Adaptação: Use história local

23. MAPA HUMANO
Objetivo: Geografia
Material: Espaço amplo, pontos cardeais
Como fazer: Formar mapa com posicionamento
Adaptação: Use mapas de diferentes escalas

24. VIAGEM NO TEMPO
Objetivo: Períodos históricos
Material: Adereços simples, caracterização
Como fazer: Representar diferentes épocas
Adaptação: Foque em aspectos específicos

25. CLIMA E MOVIMENTO
Objetivo: Climatologia
Material: Diferentes tipos de clima
Como fazer: Mover-se conforme clima representado
Adaptação: Inclua vestuário adequado

DICAS GERAIS:
- Sempre aqueça antes das atividades
- Mantenha hidratação disponível
- Adapte intensidade conforme necessidade
- Use música quando apropriado
- Permita pausas regulares
- Celebre participação, não apenas performance
- Conecte movimento com objetivo pedagógico
- Varie atividades para manter interesse

BENEFÍCIOS:
- Melhora atenção e foco
- Reduz hiperatividade disruptiva
- Aumenta retenção de informações
- Desenvolve coordenação motora
- Promove regulação emocional
- Facilita socialização
- Torna aprendizagem mais prazerosa

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
      case "Timer de Foco Progressivo":
        return "Baseado na técnica Pomodoro adaptada para TDAH, este sistema desenvolve gradualmente a capacidade de atenção sustentada. Utiliza reforço positivo e gamificação para manter o engajamento, respeitando as limitações atencionais típicas do TDAH."
      case "Circuito de Movimento Cognitivo":
        return "Combina atividade física com desafios cognitivos, aproveitando a neurociência do movimento para melhorar funções executivas. O exercício físico aumenta a produção de neurotransmissores essenciais para atenção e foco."
      case "Sistema de Recompensas Gamificado":
        return "Utiliza princípios de gamificação baseados em neurociência motivacional para aumentar o engajamento. O sistema de recompensas imediatas atende à necessidade de feedback rápido característica do TDAH."
      case "Kit de Autorregulação TDAH":
        return "Conjunto de ferramentas baseadas em terapia cognitivo-comportamental adaptada para crianças. Desenvolve habilidades de autorregulação emocional e controle de impulsos através de estratégias práticas e acessíveis."
      default:
        return "Atividade desenvolvida especificamente para alunos com TDAH, considerando suas necessidades de movimento, estímulo e estrutura clara."
    }
  }

  const getStepByStep = (name: string) => {
    switch (name) {
      case "Timer de Foco Progressivo":
        return [
          "Configure timer visual para 5 minutos iniciais",
          "Escolha tarefa específica e clara",
          "Explique o objetivo da sessão",
          "Inicie timer e atividade",
          "Ofereça encorajamento discreto",
          "Celebre conclusão do tempo",
          "Permita pausa ativa de 2 minutos",
          "Aumente tempo gradualmente conforme sucesso",
        ]
      case "Circuito de Movimento Cognitivo":
        return [
          "Prepare estações com desafios diferentes",
          "Explique cada estação claramente",
          "Demonstre movimentos e tarefas",
          "Inicie com aquecimento leve",
          "Acompanhe execução oferecendo dicas",
          "Varie intensidade conforme energia do grupo",
          "Inclua pausas para hidratação",
          "Finalize com relaxamento",
        ]
      case "Sistema de Recompensas Gamificado":
        return [
          "Defina objetivos claros e alcançáveis",
          "Crie sistema de pontos visual",
          "Explique como ganhar badges",
          "Estabeleça recompensas significativas",
          "Monitore progresso diariamente",
          "Celebre conquistas imediatamente",
          "Ajuste dificuldade conforme progresso",
          "Mantenha variedade nas missões",
        ]
      default:
        return [
          "Prepare ambiente estruturado",
          "Explique atividade de forma clara",
          "Demonstre passo a passo",
          "Ofereça apoio constante",
          "Permita pausas quando necessário",
          "Celebre tentativas e progressos",
        ]
    }
  }

  const getTips = (name: string) => {
    switch (name) {
      case "Timer de Foco Progressivo":
        return [
          "Use timer visual colorido",
          "Comece sempre com tempo menor que a capacidade atual",
          "Celebre cada sessão completada",
          "Permita fidgets durante o foco",
          "Ajuste conforme energia do dia",
        ]
      case "Circuito de Movimento Cognitivo":
        return [
          "Mantenha estações simples e claras",
          "Use música motivadora",
          "Varie intensidade das atividades",
          "Inclua elementos competitivos saudáveis",
          "Monitore sinais de fadiga",
        ]
      case "Sistema de Recompensas Gamificado":
        return [
          "Use recompensas imediatas",
          "Varie tipos de recompensas",
          "Inclua recompensas sociais",
          "Mantenha sistema simples",
          "Ajuste conforme interesse individual",
        ]
      default:
        return [
          "Mantenha instruções claras e simples",
          "Use reforço positivo constante",
          "Permita movimento durante atividades",
          "Ofereça escolhas quando possível",
        ]
    }
  }

  const getVariations = (name: string) => {
    switch (name) {
      case "Timer de Foco Progressivo":
        return [
          "Use diferentes tipos de timer (visual, sonoro)",
          "Crie versões temáticas",
          "Inclua música de foco",
          "Adicione elementos de gamificação",
          "Crie versões para diferentes matérias",
        ]
      case "Circuito de Movimento Cognitivo":
        return [
          "Adapte para espaços menores",
          "Crie versões para diferentes matérias",
          "Inclua elementos de cooperação",
          "Use tecnologia (apps, sensores)",
          "Varie conforme estação do ano",
        ]
      case "Sistema de Recompensas Gamificado":
        return [
          "Crie versões digitais",
          "Inclua elementos de equipe",
          "Use temas de interesse do aluno",
          "Adicione desafios semanais",
          "Crie versões para casa e escola",
        ]
      default:
        return [
          "Adapte para diferentes idades",
          "Crie versões individuais e em grupo",
          "Inclua elementos tecnológicos",
          "Varie conforme interesses pessoais",
        ]
    }
  }

  const getAssessment = (name: string) => {
    switch (name) {
      case "Timer de Foco Progressivo":
        return "Monitore o aumento gradual no tempo de atenção sustentada, redução de comportamentos disruptivos durante o foco, e melhoria na qualidade das tarefas completadas. Registre progressos semanalmente."
      case "Circuito de Movimento Cognitivo":
        return "Avalie melhoria na coordenação motora, aumento na capacidade de seguir instruções complexas, e redução da hiperatividade após as atividades. Observe transferência para outras situações."
      case "Sistema de Recompensas Gamificado":
        return "Observe aumento na motivação para tarefas acadêmicas, melhoria na persistência diante de dificuldades, e desenvolvimento de autorregulação. Monitore se o sistema mantém eficácia ao longo do tempo."
      default:
        return "Observe redução de comportamentos impulsivos, aumento no tempo de atenção, e melhoria no desempenho acadêmico. Avalie transferência de habilidades para diferentes contextos."
    }
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl blur-3xl"></div>
        <div className="relative z-10 p-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lightbulb className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">TDAH – Transtorno do Déficit de Atenção</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Estratégias eficazes para foco, organização e autorregulação, baseadas em evidências da neurociência
            educacional e adaptadas às necessidades específicas de alunos com TDAH.
          </p>
          <div className="flex justify-center space-x-6">
            <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">9</div>
              <div className="text-sm text-gray-400">recursos disponíveis</div>
            </div>
            <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">89%</div>
              <div className="text-sm text-gray-400">eficácia média</div>
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
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleViewDetails(activity)}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
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
      <ActivityDetailsModal activity={selectedActivity} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
