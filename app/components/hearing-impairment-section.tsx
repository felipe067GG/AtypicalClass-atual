"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ear, BookOpen, Download, Clock, ExternalLink, Target, Star } from "lucide-react"
import ActivityDetailsModal from "./activity-details-modal"
import { useState } from "react"

export default function HearingImpairmentSection() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const strategies = [
    {
      title: "Comunicação Visual",
      description: "Uso de recursos visuais para facilitar a comunicação",
      tips: ["Libras e gestos claros", "Expressões faciais marcantes", "Escrita e desenhos"],
      source: "Instituto Nacional de Educação de Surdos - INES",
      difficulty: "Básico",
      effectiveness: 96,
    },
    {
      title: "Tecnologia Assistiva",
      description: "Utilização de equipamentos de apoio auditivo",
      tips: ["Aparelhos auditivos modernos", "Sistema FM", "Aplicativos de tradução"],
      source: "Associação Brasileira de Audiologia",
      difficulty: "Avançado",
      effectiveness: 89,
    },
    {
      title: "Ambiente Adaptado",
      description: "Criação de um ambiente favorável à comunicação",
      tips: ["Boa iluminação facial", "Redução de ruídos", "Posicionamento adequado"],
      source: "Federação Nacional de Educação e Integração dos Surdos",
      difficulty: "Intermediário",
      effectiveness: 93,
    },
    {
      title: "Leitura Labial",
      description: "Técnicas para facilitar a leitura labial",
      tips: ["Articulação clara", "Velocidade adequada", "Posição frontal"],
      source: "Centro de Estudos da Surdez - CES",
      difficulty: "Intermediário",
      effectiveness: 85,
    },
    {
      title: "Recursos Visuais Educativos",
      description: "Materiais didáticos adaptados para surdos",
      tips: ["Imagens explicativas", "Vídeos com legendas", "Gráficos e esquemas"],
      source: "Ministério da Educação - Política de Inclusão",
      difficulty: "Básico",
      effectiveness: 91,
    },
    {
      title: "Cultura Surda",
      description: "Valorização da identidade e cultura surda",
      tips: ["Respeito à Libras", "História da comunidade surda", "Identidade cultural"],
      source: "Confederação Brasileira de Desportos de Surdos",
      difficulty: "Intermediário",
      effectiveness: 88,
    },
  ]

  const activities = [
    {
      name: "Teatro de Sinais Educativo",
      age: "8-16 anos",
      duration: "40-60 min",
      description: "Dramatizações usando Libras e expressão corporal para aprendizagem",
      materials: ["Roteiros adaptados", "Figurinos", "Cenários visuais", "Câmera para gravação"],
      implementation: "Combina arteterapia com educação bilíngue",
      objectives: ["Expressão", "Criatividade", "Comunicação"],
      rating: 4.8,
      downloads: 1750,
    },
    {
      name: "Jogos Visuais Interativos",
      age: "6-12 anos",
      duration: "30-45 min",
      description: "Jogos que usam recursos visuais para estimular o aprendizado",
      materials: ["Cartas ilustradas", "Tabuleiros", "Dados coloridos", "Timer visual"],
      implementation: "Baseado em gamificação aplicada à educação de surdos",
      objectives: ["Vocabulário", "Raciocínio", "Socialização"],
      rating: 4.7,
      downloads: 2100,
    },
    {
      name: "Histórias Ilustradas com Libras",
      age: "5-10 anos",
      duration: "25-35 min",
      description: "Contação de histórias com ilustrações e tradução em Libras",
      materials: ["Livros ilustrados", "Vídeos em Libras", "Fantoches", "Cenários"],
      implementation: "Promove literatura surda e bilinguismo educacional",
      objectives: ["Compreensão", "Imaginação", "Linguagem"],
      rating: 4.6,
      downloads: 1890,
    },
    {
      name: "Laboratório de Comunicação Visual",
      age: "10-17 anos",
      duration: "50-70 min",
      description: "Criação de projetos visuais usando tecnologia e comunicação alternativa",
      materials: ["Câmeras", "Softwares de edição", "Computadores", "Iluminação"],
      implementation: "Utiliza tecnologia educacional para comunicação alternativa",
      objectives: ["Tecnologia", "Autonomia", "Criatividade"],
      rating: 4.9,
      downloads: 1650,
    },
  ]

  const courses = [
    {
      title: "Audiologia Educacional",
      provider: "CENES",
      duration: "360h",
      price: "R$ 189/mês",
      rating: 4.8,
      students: 2100,
      certificate: true,
      level: "Pós-graduação",
      modules: 15,
      url: "https://cenes.com.br/curso/audiologia-educacional",
    },
    {
      title: "Deficiência Auditiva e Surdez",
      provider: "EW Cursos",
      duration: "50h",
      price: "Gratuito",
      rating: 4.6,
      students: 6200,
      certificate: true,
      level: "Básico",
      modules: 8,
      url: "https://www.ewcursos.com/curso/curso-gratuito-de-deficiencia-auditiva-e-surdez",
    },
    {
      title: "Trabalhando com Deficientes Auditivos",
      provider: "Educamundo",
      duration: "60h",
      price: "R$ 69,90",
      rating: 4.7,
      students: 3800,
      certificate: true,
      level: "Intermediário",
      modules: 9,
      url: "https://educamundo.com.br/cursos-online/trabalhando-com-deficientes-auditivos/",
    },
    {
      title: "Capacitação Deficiência Auditiva",
      provider: "FA Souza",
      duration: "180h",
      price: "R$ 297",
      rating: 4.5,
      students: 1500,
      certificate: true,
      level: "Avançado",
      modules: 12,
      url: "https://fasouza.com.br/capacitacao-profissional/capacitacao-deficiencia-auditiva-180-horas",
    },
  ]

  const resources = [
    {
      title: "Manual de Libras para Educadores",
      type: "Guia PDF",
      description: "Estratégias práticas para comunicação em Libras na sala de aula",
      featured: true,
      content: `MANUAL DE LIBRAS PARA EDUCADORES

SUMÁRIO
1. Introdução à Língua Brasileira de Sinais
2. Fundamentos da Comunicação Visual
3. Estratégias Pedagógicas para Surdos
4. Recursos Tecnológicos
5. Cultura Surda
6. Atividades Práticas
7. Avaliação Adaptada
8. Trabalho com Famílias

1. INTRODUÇÃO À LIBRAS

A Língua Brasileira de Sinais (Libras) é a língua natural da comunidade surda brasileira, reconhecida oficialmente pela Lei 10.436/2002.

CARACTERÍSTICAS PRINCIPAIS:
• Língua visual-espacial
• Gramática própria e complexa
• Expressões faciais e corporais
• Modalidade gestual-visual
• Cultura surda associada

2. FUNDAMENTOS DA COMUNICAÇÃO VISUAL

ELEMENTOS BÁSICOS:
- Configuração de mãos
- Ponto de articulação
- Movimento
- Orientação
- Expressões não-manuais

IMPLEMENTAÇÃO PRÁTICA:
• Mantenha contato visual constante
• Use expressões faciais claras
• Posicione-se adequadamente
• Ilumine bem o rosto

3. ESTRATÉGIAS PEDAGÓGICAS

3.1 COMUNICAÇÃO VISUAL
- Use recursos visuais abundantes
- Organize informações espacialmente
- Demonstre antes de explicar
- Crie materiais visuais personalizados

IMPLEMENTAÇÃO PRÁTICA:
• Imagens são mais eficazes que texto
• Use sequências visuais para processos
• Mantenha organização visual limpa
• Adapte velocidade de comunicação

3.2 BILINGUISMO EDUCACIONAL
- Libras como primeira língua
- Português escrito como segunda língua
- Respeite a modalidade de cada língua
- Valorize a cultura surda

DICAS PRÁTICAS:
• Ensine conceitos primeiro em Libras
• Use português escrito para registro
• Conecte as duas línguas
• Respeite preferências individuais

4. RECURSOS TECNOLÓGICOS

FERRAMENTAS BÁSICAS:
- Aplicativos de tradução
- Vídeos em Libras
- Softwares educativos
- Plataformas visuais

ESTRATÉGIAS:
- Legendas em vídeos
- Intérpretes virtuais
- Comunicação por vídeo
- Recursos de acessibilidade

5. CULTURA SURDA

ASPECTOS IMPORTANTES:
• Identidade visual
• História da comunidade surda
• Valores e tradições
• Arte e literatura surda
• Orgulho da diferença

6. ATIVIDADES PRÁTICAS

SUGESTÕES:
- Teatro em Libras
- Jogos visuais
- Contação de histórias
- Projetos colaborativos
- Apresentações visuais

7. AVALIAÇÃO ADAPTADA

MÉTODOS:
- Avaliação em Libras
- Recursos visuais
- Tempo adequado
- Múltiplas formas de expressão

© AtypicalClass 2025 - Educação Inclusiva para Todos`,
    },
    {
      title: "Dicionário Visual de Libras Educacional",
      type: "Recursos Visuais",
      description: "500 sinais essenciais para o ambiente escolar",
      featured: false,
      content: `DICIONÁRIO VISUAL DE LIBRAS EDUCACIONAL

500 SINAIS ORGANIZADOS POR CATEGORIA

SAUDAÇÕES E CORTESIA (25 sinais):
- Olá, oi, tchau
- Bom dia, boa tarde, boa noite
- Por favor, obrigado, desculpa
- Com licença, tudo bem
- Parabéns, feliz aniversário

FAMÍLIA E PESSOAS (40 sinais):
- Pai, mãe, filho, filha
- Avô, avó, tio, tia
- Irmão, irmã, primo, prima
- Bebê, criança, adulto, idoso
- Homem, mulher, menino, menina

ESCOLA E EDUCAÇÃO (80 sinais):
- Professor, aluno, diretor
- Sala de aula, biblioteca, laboratório
- Livro, caderno, lápis, caneta
- Quadro, mesa, cadeira
- Estudar, aprender, ensinar

DISCIPLINAS ESCOLARES (60 sinais):
- Matemática, português, ciências
- História, geografia, educação física
- Arte, música, inglês
- Números de 1 a 100
- Operações matemáticas

CORES E FORMAS (30 sinais):
- Vermelho, azul, amarelo, verde
- Preto, branco, rosa, roxo
- Círculo, quadrado, triângulo
- Grande, pequeno, médio

ANIMAIS (50 sinais):
- Cachorro, gato, pássaro
- Peixe, cavalo, vaca, porco
- Leão, elefante, macaco
- Borboleta, abelha, formiga

ALIMENTOS (60 sinais):
- Frutas: maçã, banana, laranja
- Verduras: alface, tomate, cenoura
- Carnes: frango, peixe, carne
- Bebidas: água, leite, suco
- Doces: bolo, chocolate, sorvete

TEMPO E CALENDÁRIO (40 sinais):
- Hoje, ontem, amanhã
- Semana, mês, ano
- Dias da semana
- Meses do ano
- Horas e minutos

EMOÇÕES E SENTIMENTOS (35 sinais):
- Feliz, triste, bravo
- Medo, surpresa, nojo
- Amor, carinho, saudade
- Nervoso, calmo, ansioso

AÇÕES E VERBOS (80 sinais):
- Ir, vir, estar, ter
- Comer, beber, dormir
- Correr, andar, pular
- Ver, ouvir, falar, pensar
- Trabalhar, brincar, estudar

INSTRUÇÕES DE USO:
1. Pratique os sinais diariamente
2. Use expressões faciais adequadas
3. Mantenha velocidade apropriada
4. Combine sinais em frases
5. Respeite a gramática da Libras

DICAS IMPORTANTES:
- Configuração de mãos correta
- Ponto de articulação preciso
- Movimento adequado
- Orientação da palma
- Expressão facial correspondente

© AtypicalClass 2025`,
    },
    {
      title: "Protocolo de Avaliação Auditiva Educacional",
      type: "Ferramenta",
      description: "Instrumento para avaliação de necessidades educacionais",
      featured: true,
      content: `PROTOCOLO DE AVALIAÇÃO AUDITIVA EDUCACIONAL

DADOS DO ALUNO:
Nome: _________________________________
Data de Nascimento: ____________________
Grau de Perda Auditiva: _________________
Escola: _______________________________
Professor(a): ___________________________
Data da Avaliação: _____________________

1. COMUNICAÇÃO

LIBRAS:
□ Usa Libras como língua principal
□ Vocabulário adequado para idade
□ Gramática da Libras desenvolvida
□ Expressões faciais apropriadas
Observações: ___________________________

PORTUGUÊS ESCRITO:
□ Lê textos adequados para idade
□ Escreve com clareza
□ Compreende instruções escritas
□ Usa português como segunda língua
Observações: ___________________________

LEITURA LABIAL:
□ Compreende fala através da leitura labial
□ Identifica palavras familiares
□ Usa contexto para compreensão
□ Solicita repetição quando necessário
Observações: ___________________________

2. RECURSOS TECNOLÓGICOS

APARELHOS AUDITIVOS:
□ Usa aparelho auditivo regularmente
□ Aparelho funcionando adequadamente
□ Bateria sempre carregada
□ Manutenção em dia
Observações: ___________________________

SISTEMA FM:
□ Utiliza sistema FM na escola
□ Professor usa microfone adequadamente
□ Sistema funcionando corretamente
□ Reduz ruído de fundo efetivamente
Observações: ___________________________

3. PARTICIPAÇÃO ACADÊMICA

COMPREENSÃO:
□ Compreende explicações do professor
□ Acompanha ritmo da aula
□ Faz perguntas quando necessário
□ Participa de discussões
Observações: ___________________________

EXPRESSÃO:
□ Expressa ideias claramente
□ Participa de apresentações
□ Interage com colegas
□ Demonstra conhecimento adquirido
Observações: ___________________________

4. ASPECTOS SOCIAIS

INTERAÇÃO:
□ Interage bem com colegas ouvintes
□ Participa de atividades em grupo
□ Tem amigos na escola
□ Demonstra autoconfiança
Observações: ___________________________

IDENTIDADE:
□ Aceita sua condição auditiva
□ Orgulha-se da cultura surda
□ Usa recursos de acessibilidade
□ Advoga por suas necessidades
Observações: ___________________________

5. AMBIENTE ESCOLAR

ADAPTAÇÕES FÍSICAS:
□ Sala com boa acústica
□ Iluminação adequada para Libras
□ Posicionamento favorável
□ Redução de ruídos
Observações: ___________________________

RECURSOS HUMANOS:
□ Intérprete de Libras disponível
□ Professor conhece Libras básica
□ Colegas sensibilizados
□ Equipe preparada
Observações: ___________________________

6. RECOMENDAÇÕES

COMUNICAÇÃO:
_____________________________________
_____________________________________

TECNOLOGIA:
_____________________________________
_____________________________________

AMBIENTE:
_____________________________________
_____________________________________

PEDAGÓGICAS:
_____________________________________
_____________________________________

7. ACOMPANHAMENTO

PRÓXIMA AVALIAÇÃO: ___________________
RESPONSÁVEL: _________________________
OBSERVAÇÕES GERAIS:
_____________________________________
_____________________________________

© AtypicalClass 2025`,
    },
    {
      title: "Atividades Visuais para Surdos",
      type: "Material Lúdico",
      description: "30 atividades educativas adaptadas para comunicação visual",
      featured: false,
      content: `ATIVIDADES VISUAIS PARA SURDOS

30 ATIVIDADES ORGANIZADAS POR FAIXA ETÁRIA

EDUCAÇÃO INFANTIL (4-6 anos) - 10 atividades:

1. JOGO DAS EXPRESSÕES
Objetivo: Reconhecer emoções
Material: Cartas com expressões faciais
Como jogar: Imitar expressões e adivinhar emoções
Adaptação: Use espelho para prática

2. MEMÓRIA VISUAL DE SINAIS
Objetivo: Vocabulário em Libras
Material: Cartas com sinais básicos
Como jogar: Encontrar pares de sinais iguais
Adaptação: Comece com 6 pares

3. TEATRO DE FANTOCHES
Objetivo: Narrativa visual
Material: Fantoches e cenário
Como jogar: Contar histórias sem som
Adaptação: Use gestos exagerados

4. CLASSIFICAÇÃO POR CORES
Objetivo: Organização visual
Material: Objetos coloridos
Como jogar: Separar por cores usando sinais
Adaptação: Ensine sinais das cores

5. QUEBRA-CABEÇA GIGANTE
Objetivo: Coordenação e lógica
Material: Peças grandes e coloridas
Como jogar: Montar imagem completa
Adaptação: Use imagens familiares

6. JOGO DO ESPELHO
Objetivo: Imitação e coordenação
Material: Espelho grande
Como jogar: Imitar movimentos e sinais
Adaptação: Movimentos lentos e claros

7. BINGO VISUAL
Objetivo: Atenção e vocabulário
Material: Cartelas com imagens
Como jogar: Marcar imagens mostradas
Adaptação: Use sinais junto com imagens

8. DANÇA VISUAL
Objetivo: Expressão corporal
Material: Música com vibração
Como jogar: Dançar seguindo ritmo visual
Adaptação: Use luzes piscantes

9. CAÇA AO TESOURO VISUAL
Objetivo: Seguir instruções visuais
Material: Pistas em imagens
Como jogar: Seguir pistas até o tesouro
Adaptação: Pistas em Libras

10. JOGO DA IMITAÇÃO
Objetivo: Observação e coordenação
Material: Cartões com ações
Como jogar: Imitar ações mostradas
Adaptação: Use ações do cotidiano

ENSINO FUNDAMENTAL I (7-10 anos) - 10 atividades:

11. STOP EM LIBRAS
Objetivo: Vocabulário e agilidade
Material: Papel e lápis
Como jogar: Completar categorias com sinais
Adaptação: Use categorias conhecidas

12. JOGO DA FORCA VISUAL
Objetivo: Soletração e vocabulário
Material: Quadro e marcador
Como jogar: Adivinhar palavras por sinais
Adaptação: Use alfabeto manual

13. TEATRO DE HISTÓRIAS
Objetivo: Narrativa e expressão
Material: Roteiros adaptados
Como jogar: Representar histórias conhecidas
Adaptação: Use expressões faciais marcantes

14. DOMINÓ DE SINAIS
Objetivo: Associação e lógica
Material: Peças com sinais e imagens
Como jogar: Conectar sinais com significados
Adaptação: Comece com sinais básicos

15. JOGO DA MEMÓRIA SEQUENCIAL
Objetivo: Memória e ordem
Material: Cartões numerados
Como jogar: Repetir sequências de sinais
Adaptação: Aumente gradualmente

16. QUEBRA-CABEÇA DE FRASES
Objetivo: Estrutura da Libras
Material: Peças com sinais
Como jogar: Montar frases corretas
Adaptação: Use frases simples

17. BINGO DE NÚMEROS
Objetivo: Matemática em Libras
Material: Cartelas com números
Como jogar: Marcar números sinalizados
Adaptação: Use números de 1 a 50

18. JOGO DAS PROFISSÕES
Objetivo: Conhecimento social
Material: Cartas de profissões
Como jogar: Associar profissão ao sinal
Adaptação: Use profissões familiares

19. TRILHA DO CONHECIMENTO
Objetivo: Conhecimentos gerais
Material: Tabuleiro e cartas
Como jogar: Avançar respondendo em Libras
Adaptação: Perguntas com múltipla escolha

20. JOGO DO ALFABETO
Objetivo: Soletração manual
Material: Cartas do alfabeto
Como jogar: Soletrar palavras rapidamente
Adaptação: Comece com palavras curtas

ENSINO FUNDAMENTAL II (11-14 anos) - 10 atividades:

21. DEBATE VISUAL
Objetivo: Argumentação em Libras
Material: Temas para discussão
Como jogar: Debater temas em grupos
Adaptação: Use temas de interesse

22. JOGO DE INTERPRETAÇÃO
Objetivo: Compreensão e expressão
Material: Textos e vídeos
Como jogar: Interpretar conteúdos
Adaptação: Use materiais visuais

23. CRIAÇÃO DE VÍDEOS
Objetivo: Produção em Libras
Material: Câmera e roteiro
Como jogar: Criar vídeos educativos
Adaptação: Temas escolares

24. JOGO DE ESTRATÉGIA
Objetivo: Planejamento e lógica
Material: Tabuleiro adaptado
Como jogar: Vencer usando estratégia
Adaptação: Instruções em Libras

25. TEATRO CIENTÍFICO
Objetivo: Ciências em Libras
Material: Experimentos visuais
Como jogar: Demonstrar conceitos
Adaptação: Use experimentos seguros

26. JOGO DE GEOGRAFIA
Objetivo: Conhecimento geográfico
Material: Mapas e sinais
Como jogar: Localizar países e capitais
Adaptação: Use mapas táteis

27. MATEMÁTICA VISUAL
Objetivo: Conceitos matemáticos
Material: Materiais manipuláveis
Como jogar: Resolver problemas
Adaptação: Use representações visuais

28. JOGO DE HISTÓRIA
Objetivo: Conhecimento histórico
Material: Linha do tempo visual
Como jogar: Ordenar eventos históricos
Adaptação: Use imagens e datas

29. LABORATÓRIO DE LÍNGUAS
Objetivo: Bilinguismo
Material: Textos em duas línguas
Como jogar: Traduzir entre Libras e português
Adaptação: Use textos simples

30. PROJETO COLABORATIVO
Objetivo: Trabalho em equipe
Material: Tema de pesquisa
Como jogar: Desenvolver projeto em grupo
Adaptação: Apresentação em Libras

DICAS GERAIS:
- Use sempre recursos visuais
- Mantenha boa iluminação
- Respeite o ritmo individual
- Celebre participação e progresso
- Inclua elementos da cultura surda

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
      case "Teatro de Sinais Educativo":
        return "Combina arteterapia com educação bilíngue, utilizando Libras como língua principal de instrução. Esta atividade desenvolve expressão corporal, criatividade e habilidades comunicativas através de dramatizações estruturadas que respeitam a cultura surda."
      case "Jogos Visuais Interativos":
        return "Baseado em gamificação aplicada à educação de surdos, utiliza recursos visuais como principal canal de aprendizagem. Desenvolve vocabulário em Libras, raciocínio lógico e coordenação através de atividades lúdicas e envolventes."
      case "Histórias Ilustradas com Libras":
        return "Promove literatura surda e bilinguismo educacional através de narrativas visuais. Combina elementos da cultura surda com desenvolvimento de linguagem, imaginação e compreensão textual através de múltiplos canais visuais."
      case "Laboratório de Comunicação Visual":
        return "Utiliza tecnologia educacional para desenvolver diferentes formas de comunicação alternativa. Promove autonomia comunicativa através do uso de ferramentas digitais, edição de vídeo e criação de conteúdo visual."
      default:
        return "Atividade desenvolvida especificamente para alunos surdos, utilizando recursos visuais e respeitando a cultura surda como base para o aprendizado."
    }
  }

  const getStepByStep = (name: string) => {
    switch (name) {
      case "Teatro de Sinais Educativo":
        return [
          "Selecione roteiro adequado para idade e nível",
          "Adapte diálogos para Libras",
          "Ensine sinais específicos necessários",
          "Pratique expressões faciais e corporais",
          "Organize ensaios com figurinos",
          "Prepare cenário visual atrativo",
          "Filme apresentação para análise",
          "Celebre performance e aprendizado",
        ]
      case "Jogos Visuais Interativos":
        return [
          "Prepare cartas ilustradas grandes e claras",
          "Organize tabuleiro com sinalizações visuais",
          "Explique regras usando Libras e demonstração",
          "Inicie com versão simplificada",
          "Use timer visual para controle de tempo",
          "Ofereça dicas visuais quando necessário",
          "Aumente complexidade gradualmente",
          "Registre progresso em gráfico visual",
        ]
      case "Histórias Ilustradas com Libras":
        return [
          "Selecione livros com ilustrações ricas",
          "Prepare vídeos com tradução em Libras",
          "Crie personagens visuais marcantes",
          "Conte história usando múltiplos recursos",
          "Faça pausas para discussão visual",
          "Conecte com experiências pessoais",
          "Estimule reconto em Libras",
          "Crie atividades relacionadas à história",
        ]
      case "Laboratório de Comunicação Visual":
        return [
          "Configure equipamentos (câmeras, computadores)",
          "Ensine uso básico de software de edição",
          "Pratique gravação de sinais em Libras",
          "Explore diferentes ângulos e iluminação",
          "Crie projetos de comunicação pessoal",
          "Edite vídeos com legendas",
          "Compartilhe criações com colegas",
          "Avalie progresso técnico e comunicativo",
        ]
      default:
        return [
          "Prepare materiais visuais claros",
          "Use Libras como língua de instrução",
          "Demonstre atividades visualmente",
          "Ofereça tempo adequado para compreensão",
          "Forneça feedback visual constante",
          "Adapte conforme necessidades individuais",
        ]
    }
  }

  const getTips = (name: string) => {
    switch (name) {
      case "Teatro de Sinais Educativo":
        return [
          "Use iluminação adequada para visualização dos sinais",
          "Mantenha expressões faciais marcantes",
          "Permita improvisação dentro do roteiro",
          "Inclua elementos da cultura surda",
          "Celebre a expressão criativa individual",
        ]
      case "Jogos Visuais Interativos":
        return [
          "Use cores contrastantes para melhor visualização",
          "Mantenha regras simples e visuais",
          "Ofereça múltiplas chances de participação",
          "Adapte velocidade conforme grupo",
          "Inclua elementos competitivos saudáveis",
        ]
      case "Histórias Ilustradas com Libras":
        return [
          "Escolha histórias com temas universais",
          "Use expressões faciais dramáticas",
          "Permita interação durante narrativa",
          "Conecte com cultura e identidade surda",
          "Estimule criação de histórias próprias",
        ]
      case "Laboratório de Comunicação Visual":
        return [
          "Mantenha ambiente tecnológico organizado",
          "Ensine cuidados com equipamentos",
          "Estimule criatividade e experimentação",
          "Promova colaboração entre alunos",
          "Documente progresso através de portfólio digital",
        ]
      default:
        return [
          "Use comunicação visual clara",
          "Respeite ritmo individual de aprendizagem",
          "Mantenha ambiente visualmente organizado",
          "Celebre progressos e tentativas",
        ]
    }
  }

  const getVariations = (name: string) => {
    switch (name) {
      case "Teatro de Sinais Educativo":
        return [
          "Crie versões com diferentes gêneros teatrais",
          "Inclua música e dança adaptadas",
          "Use fantoches e marionetes",
          "Desenvolva peças autorais dos alunos",
          "Crie apresentações para comunidade",
        ]
      case "Jogos Visuais Interativos":
        return [
          "Adapte jogos tradicionais para versão visual",
          "Crie versões digitais em tablets",
          "Inclua elementos de realidade aumentada",
          "Desenvolva jogos colaborativos",
          "Crie competições entre turmas",
        ]
      case "Histórias Ilustradas com Libras":
        return [
          "Use diferentes formatos (livros, vídeos, teatro)",
          "Crie histórias interativas digitais",
          "Inclua elementos multimídia",
          "Desenvolva narrativas em primeira pessoa",
          "Crie versões bilíngues (Libras/Português)",
        ]
      case "Laboratório de Comunicação Visual":
        return [
          "Explore diferentes tecnologias (VR, AR)",
          "Crie projetos multimídia complexos",
          "Desenvolva aplicativos simples",
          "Inclua elementos de design gráfico",
          "Crie conteúdo para redes sociais",
        ]
      default:
        return [
          "Adapte para diferentes faixas etárias",
          "Crie versões para uso domiciliar",
          "Inclua elementos tecnológicos",
          "Desenvolva atividades colaborativas",
        ]
    }
  }

  const getAssessment = (name: string) => {
    switch (name) {
      case "Teatro de Sinais Educativo":
        return "Avalie expressão em Libras, criatividade na interpretação, colaboração em grupo e desenvolvimento da autoconfiança. Observe melhoria na fluência dos sinais e expressão corporal."
      case "Jogos Visuais Interativos":
        return "Monitore desenvolvimento do vocabulário em Libras, velocidade de compreensão visual, e capacidade de seguir regras. Avalie progresso no raciocínio lógico e coordenação motora."
      case "Histórias Ilustradas com Libras":
        return "Observe compreensão narrativa, capacidade de reconto em Libras, e desenvolvimento da imaginação. Avalie conexão com elementos culturais surdos e expressão criativa."
      case "Laboratório de Comunicação Visual":
        return "Avalie competência tecnológica, criatividade na comunicação visual, e autonomia no uso de ferramentas. Monitore desenvolvimento de habilidades técnicas e expressão pessoal."
      default:
        return "Observe participação ativa, desenvolvimento de habilidades visuais, e progresso na comunicação. Avalie transferência de aprendizagem para situações cotidianas."
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
          <h2 className="text-4xl font-bold text-white mb-4">Deficiência Auditiva</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Estratégias e recursos para promover a inclusão de alunos surdos e com deficiência auditiva, valorizando a
            cultura surda e desenvolvendo comunicação efetiva através de Libras e recursos visuais.
          </p>
          <div className="flex justify-center space-x-6">
            <div className="bg-gray-950/70 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">18</div>
              <div className="text-sm text-gray-400">recursos disponíveis</div>
            </div>
            <div className="bg-gray-950/70 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">91%</div>
              <div className="text-sm text-gray-400">eficácia média</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue={"strategies"} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-950/70 border border-gray-800">
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
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <ActivityDetailsModal activity={selectedActivity} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
