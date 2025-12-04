"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, BookOpen, Download, Clock, ExternalLink, Target, Star } from "lucide-react"
import ActivityDetailsModal from "./activity-details-modal"
import { useState } from "react"

export default function VisualImpairmentSection() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const strategies = [
    {
      title: "Recursos Táteis",
      description: "Uso de materiais que podem ser explorados pelo tato",
      tips: ["Texturas variadas e contrastantes", "Objetos tridimensionais", "Mapas em relevo detalhados"],
      source: "Instituto Benjamin Constant - Metodologia 2024",
      difficulty: "Básico",
      effectiveness: 95,
    },
    {
      title: "Descrição Verbal Detalhada",
      description: "Fornecimento de descrições precisas do ambiente e atividades",
      tips: ["Narração clara e sequencial", "Orientação espacial precisa", "Descrição de imagens e gráficos"],
      source: "Associação Brasileira de Educadores de Deficientes Visuais",
      difficulty: "Intermediário",
      effectiveness: 92,
    },
    {
      title: "Tecnologia Assistiva",
      description: "Utilização de ferramentas tecnológicas adaptadas",
      tips: ["Leitores de tela atualizados", "Lupas eletrônicas", "Software de ampliação"],
      source: "Centro de Tecnologia Assistiva - USP",
      difficulty: "Avançado",
      effectiveness: 88,
    },
    {
      title: "Braille e Escrita Adaptada",
      description: "Sistemas de escrita e leitura para pessoas cegas",
      tips: ["Braille tradicional", "Braille digital", "Escrita ampliada"],
      source: "Fundação Dorina Nowill para Cegos",
      difficulty: "Avançado",
      effectiveness: 97,
    },
    {
      title: "Orientação e Mobilidade",
      description: "Técnicas para navegação independente no ambiente",
      tips: ["Uso da bengala", "Pontos de referência", "Rotas memorizadas"],
      source: "Instituto de Cegos Padre Chico",
      difficulty: "Intermediário",
      effectiveness: 90,
    },
    {
      title: "Adaptação de Materiais",
      description: "Modificação de recursos didáticos para acessibilidade",
      tips: ["Alto contraste", "Ampliação de textos", "Materiais em relevo"],
      source: "Ministério da Educação - Diretrizes 2023",
      difficulty: "Básico",
      effectiveness: 93,
    },
  ]

  const activities = [
    {
      name: "Kit de Exploração Tátil Educativa",
      age: "5-16 anos",
      duration: "20-40 min",
      description: "Conjunto de materiais para aprendizagem através do tato",
      materials: ["Texturas diversas", "Formas geométricas", "Objetos do cotidiano", "Mapas táteis"],
      implementation: "Baseado em metodologia Montessori adaptada",
      objectives: ["Percepção tátil", "Discriminação", "Conhecimento espacial"],
      rating: 4.9,
      downloads: 1950,
    },
    {
      name: "Audiolivros Interativos Educacionais",
      age: "6-18 anos",
      duration: "30-60 min",
      description: "Histórias e conteúdos educativos com recursos sonoros",
      materials: ["Fones de ouvido", "Dispositivo de áudio", "Roteiro interativo"],
      implementation: "Tecnologia de áudio espacial e narrativa imersiva",
      objectives: ["Compreensão auditiva", "Imaginação", "Aprendizado"],
      rating: 4.8,
      downloads: 2800,
    },
    {
      name: "Jogos Sonoros Educativos",
      age: "4-14 anos",
      duration: "15-30 min",
      description: "Atividades que utilizam sons e música para aprendizagem",
      materials: ["Instrumentos musicais", "Sons da natureza", "Efeitos sonoros"],
      implementation: "Musicoterapia aplicada à educação especial",
      objectives: ["Discriminação auditiva", "Memória", "Coordenação"],
      rating: 4.7,
      downloads: 2200,
    },
    {
      name: "Sistema de Navegação Escolar",
      age: "8-18 anos",
      duration: "45-60 min",
      description: "Treinamento para orientação e mobilidade no ambiente escolar",
      materials: ["Bengala", "Mapas táteis da escola", "Pontos de referência"],
      implementation: "Técnicas de orientação e mobilidade profissionais",
      objectives: ["Independência", "Confiança", "Autonomia"],
      rating: 4.6,
      downloads: 1650,
    },
  ]

  const courses = [
    {
      title: "Minicurso Deficiência Visual",
      provider: "Pensar Cursos",
      duration: "30h",
      price: "R$ 67",
      rating: 4.6,
      students: 3200,
      certificate: true,
      level: "Básico",
      modules: 6,
      url: "https://www.pensarcursos.com.br/curso/minicurso-deficiencia-visual",
    },
    {
      title: "Deficiência Visual",
      provider: "Educamundo",
      duration: "70h",
      price: "R$ 69,90",
      rating: 4.7,
      students: 4800,
      certificate: true,
      level: "Intermediário",
      modules: 10,
      url: "https://educamundo.com.br/cursos-online/deficiencia-visual/",
    },
    {
      title: "Deficiência Visual",
      provider: "Portal Educa",
      duration: "50h",
      price: "R$ 89",
      rating: 4.5,
      students: 2600,
      certificate: true,
      level: "Básico",
      modules: 8,
      url: "https://www.portaleduca.com.br/cursos/deficiencia-visual/conexaoonline",
    },
    {
      title: "Deficiência Intelectual",
      provider: "Unova Cursos",
      duration: "40h",
      price: "Gratuito",
      rating: 4.4,
      students: 5900,
      certificate: true,
      level: "Básico",
      modules: 7,
      url: "https://www.unovacursos.com.br/curso/curso-gratuito-online-deficiencia-intelectual",
    },
  ]

  const resources = [
    {
      title: "Manual de Adaptações para Deficiência Visual",
      type: "Guia PDF",
      description: "Estratégias práticas para sala de aula inclusiva",
      featured: true,
      content: `MANUAL DE ADAPTAÇÕES PARA DEFICIÊNCIA VISUAL

SUMÁRIO
1. Introdução à Deficiência Visual
2. Tipos e Características
3. Recursos Táteis na Educação
4. Tecnologias Assistivas
5. Adaptação de Materiais
6. Orientação e Mobilidade
7. Braille na Escola
8. Estratégias Pedagógicas

1. INTRODUÇÃO
A deficiência visual engloba desde baixa visão até cegueira total. Este manual oferece estratégias práticas para promover a inclusão educacional efetiva de alunos com deficiência visual.

2. TIPOS E CARACTERÍSTICAS

BAIXA VISÃO:
• Visão reduzida que não pode ser corrigida
• Uso funcional da visão residual
• Necessidade de adaptações visuais
• Recursos de ampliação

CEGUEIRA:
• Ausência total ou quase total de visão
• Dependência de recursos táteis e auditivos
• Uso do sistema Braille
• Técnicas de orientação e mobilidade

3. RECURSOS TÁTEIS

MATERIAIS BÁSICOS:
- Texturas variadas (lixa, tecidos, materiais naturais)
- Objetos tridimensionais
- Mapas e gráficos em relevo
- Formas geométricas táteis

IMPLEMENTAÇÃO:
• Organize materiais por categorias
• Use contrastes táteis claros
• Permita exploração livre inicial
• Guie a exploração quando necessário

4. TECNOLOGIAS ASSISTIVAS

PARA BAIXA VISÃO:
- Lupas eletrônicas
- Software de ampliação
- Contraste e iluminação adequados
- Telas de alto contraste

PARA CEGUEIRA:
- Leitores de tela (NVDA, JAWS)
- Linha Braille
- Impressora Braille
- Gravadores digitais

5. ADAPTAÇÃO DE MATERIAIS

TEXTOS:
• Fonte ampliada (mínimo 18pt)
• Alto contraste (preto no branco)
• Papel fosco (evita reflexos)
• Espaçamento adequado

IMAGENS:
• Descrição detalhada
• Versões táteis quando possível
• Audiodescrição
• Materiais em relevo

6. ORIENTAÇÃO E MOBILIDADE

TÉCNICAS BÁSICAS:
- Uso da bengala branca
- Técnica do guia vidente
- Pontos de referência
- Rotas memorizadas

AMBIENTE ESCOLAR:
• Mantenha organização consistente
• Evite obstáculos no caminho
• Sinalize mudanças no ambiente
• Ensine rotas principais

7. SISTEMA BRAILLE

FUNDAMENTOS:
- 6 pontos em relevo
- 63 combinações possíveis
- Leitura tátil com dedos
- Escrita com reglete ou máquina

IMPLEMENTAÇÃO:
• Inicie com reconhecimento tátil
• Pratique pontos individuais
• Combine pontos em letras
• Desenvolva fluência gradualmente

8. ESTRATÉGIAS PEDAGÓGICAS

COMUNICAÇÃO:
- Identifique-se ao se aproximar
- Descreva ações e ambiente
- Use linguagem clara e específica
- Confirme compreensão

ATIVIDADES:
• Adapte materiais antecipadamente
• Ofereça tempo adicional
• Use múltiplos sentidos
• Promova participação ativa

AVALIAÇÃO:
- Provas em Braille ou ampliadas
- Avaliação oral quando apropriado
- Tempo estendido
- Recursos tecnológicos

CONCLUSÃO:
A inclusão de alunos com deficiência visual requer adaptações específicas, mas é plenamente possível com as estratégias adequadas. O sucesso depende da preparação, recursos apropriados e atitude inclusiva.

© AtypicalClass 2025 - Educação Inclusiva para Todos`,
    },
    {
      title: "Kit de Materiais Táteis DIY",
      type: "Recursos Práticos",
      description: "Instruções para criar 60 materiais táteis educativos",
      featured: false,
      content: `KIT DE MATERIAIS TÁTEIS DIY - DEFICIÊNCIA VISUAL

60 PROJETOS ORGANIZADOS POR ÁREA

MATEMÁTICA (15 projetos):

1. ÁBACO TÁTIL
Material: Contas, arame, base de madeira
Objetivo: Operações básicas
Instruções: Monte fileiras com 10 contas cada

2. FORMAS GEOMÉTRICAS EM RELEVO
Material: Papelão, cola, texturas
Objetivo: Reconhecimento de formas
Instruções: Cole texturas diferentes em cada forma

3. RÉGUA TÁTIL
Material: Régua, pontos em relevo
Objetivo: Medidas e proporções
Instruções: Cole pontos a cada centímetro

4. GRÁFICOS EM RELEVO
Material: Papel, barbante, cola
Objetivo: Interpretação de dados
Instruções: Use barbante para criar linhas do gráfico

5. FRAÇÕES TÁTEIS
Material: Círculos de feltro, velcro
Objetivo: Conceito de frações
Instruções: Corte círculos em partes proporcionais

PORTUGUÊS (15 projetos):

6. ALFABETO TÁTIL
Material: Letras em lixa, cartões
Objetivo: Reconhecimento de letras
Instruções: Cole letras de lixa em cartões

7. PALAVRAS EM RELEVO
Material: Barbante, cola, cartões
Objetivo: Formação de palavras
Instruções: Escreva palavras com barbante colado

8. HISTÓRIAS TÁTEIS
Material: Tecidos, objetos pequenos
Objetivo: Compreensão narrativa
Instruções: Crie cenários táteis para histórias

9. RIMAS SONORAS
Material: Objetos que rimam
Objetivo: Consciência fonológica
Instruções: Agrupe objetos por sons similares

10. SÍLABAS TÁTEIS
Material: Caixas pequenas, objetos
Objetivo: Divisão silábica
Instruções: Uma caixa para cada sílaba

CIÊNCIAS (15 projetos):

11. SISTEMA SOLAR TÁTIL
Material: Bolas de diferentes tamanhos
Objetivo: Conhecimento astronômico
Instruções: Use texturas diferentes para cada planeta

12. PARTES DO CORPO
Material: Boneco, texturas
Objetivo: Anatomia básica
Instruções: Identifique partes com texturas específicas

13. CICLO DA ÁGUA
Material: Recipientes, texturas
Objetivo: Processos naturais
Instruções: Represente cada fase com material diferente

14. PLANTAS TÁTEIS
Material: Folhas, sementes, galhos
Objetivo: Botânica
Instruções: Monte herbário tátil

15. ANIMAIS EM MINIATURA
Material: Miniaturas texturizadas
Objetivo: Zoologia
Instruções: Agrupe por características táteis

GEOGRAFIA (15 projetos):

16. MAPAS EM RELEVO
Material: Massa de modelar, base
Objetivo: Geografia física
Instruções: Modele relevos e acidentes geográficos

17. BÚSSOLA TÁTIL
Material: Bússola adaptada
Objetivo: Orientação espacial
Instruções: Marque pontos cardeais em relevo

18. CLIMAS TÁTEIS
Material: Materiais diversos
Objetivo: Tipos de clima
Instruções: Represente cada clima com texturas

19. PAÍSES E CONTINENTES
Material: Quebra-cabeça adaptado
Objetivo: Geografia política
Instruções: Formas em relevo para encaixe

20. RECURSOS NATURAIS
Material: Amostras reais
Objetivo: Economia e natureza
Instruções: Coleção tátil de recursos

INSTRUÇÕES GERAIS:
- Use materiais seguros e duráveis
- Teste texturas antes de usar
- Mantenha organização consistente
- Permita exploração livre
- Adapte conforme necessidade individual

DICAS DE SEGURANÇA:
- Evite materiais pontiagudos
- Use colas atóxicas
- Verifique alergias
- Supervisione uso inicial
- Mantenha materiais limpos

© AtypicalClass 2025`,
    },
    {
      title: "Protocolo de Avaliação Visual Funcional",
      type: "Ferramenta",
      description: "Instrumento para avaliação de resíduo visual",
      featured: true,
      content: `PROTOCOLO DE AVALIAÇÃO VISUAL FUNCIONAL

DADOS DO ALUNO:
Nome: _________________________________
Data de Nascimento: ____________________
Diagnóstico Oftalmológico: ______________
Escola: _______________________________
Avaliador: ____________________________
Data da Avaliação: _____________________

1. ACUIDADE VISUAL

VISÃO DE LONGE:
□ Identifica objetos a 3 metros
□ Reconhece pessoas conhecidas
□ Lê letras grandes no quadro
□ Distingue formas básicas
Observações: ___________________________

VISÃO DE PERTO:
□ Lê texto impresso (tamanho: ____)
□ Identifica detalhes em figuras
□ Reconhece expressões faciais
□ Manipula objetos pequenos
Observações: ___________________________

2. CAMPO VISUAL

VISÃO CENTRAL:
□ Focaliza objetos diretamente
□ Mantém fixação estável
□ Segue objetos em movimento
□ Localiza objetos centrais
Observações: ___________________________

VISÃO PERIFÉRICA:
□ Detecta movimento lateral
□ Percebe objetos nas bordas
□ Navega sem esbarrar
□ Localiza objetos ao redor
Observações: ___________________________

3. SENSIBILIDADE AO CONTRASTE

ALTO CONTRASTE:
□ Distingue preto no branco
□ Identifica bordas definidas
□ Reconhece silhuetas
□ Lê textos contrastados
Observações: ___________________________

BAIXO CONTRASTE:
□ Percebe tons similares
□ Identifica texturas sutis
□ Distingue sombras
□ Reconhece detalhes finos
Observações: ___________________________

4. SENSIBILIDADE À LUZ

ILUMINAÇÃO NORMAL:
□ Funciona bem em luz ambiente
□ Não apresenta desconforto
□ Mantém desempenho estável
□ Adapta-se rapidamente
Observações: ___________________________

CONDIÇÕES ESPECIAIS:
□ Necessita mais iluminação
□ Sensível à luz forte
□ Prefere luz indireta
□ Usa proteção ocular
Observações: ___________________________

5. PERCEPÇÃO DE CORES

CORES PRIMÁRIAS:
□ Distingue vermelho
□ Identifica azul
□ Reconhece amarelo
□ Diferencia verde
Observações: ___________________________

DISCRIMINAÇÃO:
□ Diferencia tons similares
□ Identifica cores em objetos
□ Usa cor para organização
□ Prefere certas cores
Observações: ___________________________

6. COORDENAÇÃO VISUAL-MOTORA

MOVIMENTOS OCULARES:
□ Segue objetos suavemente
□ Faz movimentos sacádicos
□ Coordena ambos os olhos
□ Mantém fixação estável
Observações: ___________________________

COORDENAÇÃO MÃOS-OLHOS:
□ Alcança objetos precisamente
□ Coordena escrita/desenho
□ Manipula materiais pequenos
□ Realiza atividades de precisão
Observações: ___________________________

7. USO FUNCIONAL DA VISÃO

ATIVIDADES ACADÊMICAS:
□ Lê materiais impressos
□ Escreve de forma legível
□ Copia do quadro
□ Realiza atividades visuais
Observações: ___________________________

ATIVIDADES DIÁRIAS:
□ Navega independentemente
□ Reconhece pessoas/objetos
□ Participa de atividades visuais
□ Usa visão para aprender
Observações: ___________________________

8. RECURSOS E ADAPTAÇÕES

RECURSOS ÓPTICOS:
□ Óculos/lentes de contato
□ Lupas manuais
□ Lupas eletrônicas
□ Telescópios
Observações: ___________________________

RECURSOS NÃO-ÓPTICOS:
□ Iluminação adicional
□ Materiais ampliados
□ Alto contraste
□ Posicionamento especial
Observações: ___________________________

9. RECOMENDAÇÕES

AMBIENTE FÍSICO:
_____________________________________
_____________________________________

MATERIAIS ADAPTADOS:
_____________________________________
_____________________________________

ESTRATÉGIAS PEDAGÓGICAS:
_____________________________________
_____________________________________

RECURSOS NECESSÁRIOS:
_____________________________________
_____________________________________

10. ACOMPANHAMENTO

PRÓXIMA AVALIAÇÃO: ___________________
RESPONSÁVEL: _________________________
OBSERVAÇÕES GERAIS:
_____________________________________
_____________________________________

© AtypicalClass 2025`,
    },
    {
      title: "Biblioteca de Sons Educativos",
      type: "Recursos Sonoros",
      description: "Coleção de 200+ áudios para atividades pedagógicas",
      featured: false,
      content: `BIBLIOTECA DE SONS EDUCATIVOS - DEFICIÊNCIA VISUAL

CATÁLOGO DE 200+ SONS ORGANIZADOS POR CATEGORIA

SONS DA NATUREZA (50 sons):

ANIMAIS:
- Canto de pássaros (15 espécies)
- Sons de mamíferos (leão, elefante, cavalo, etc.)
- Insetos (abelha, grilo, cigarra)
- Animais aquáticos (golfinho, baleia)
- Animais domésticos (cão, gato, galinha)

ELEMENTOS NATURAIS:
- Chuva (leve, forte, tempestade)
- Vento (brisa, ventania)
- Água (rio, cachoeira, mar)
- Fogo (fogueira, lareira)
- Trovão e raios

SONS URBANOS (40 sons):

TRANSPORTES:
- Carros (motor, buzina, freada)
- Ônibus e caminhões
- Motocicletas
- Aviões (decolagem, voo, pouso)
- Trens e metrô
- Bicicletas

AMBIENTE URBANO:
- Sirenes (ambulância, bombeiros, polícia)
- Construção (martelo, furadeira, serra)
- Multidão e conversas
- Semáforo sonoro
- Passos em diferentes superfícies

SONS DOMÉSTICOS (30 sons):

ELETRODOMÉSTICOS:
- Liquidificador
- Aspirador de pó
- Máquina de lavar
- Micro-ondas
- Televisão
- Telefone (fixo e celular)

ATIVIDADES DOMÉSTICAS:
- Cozinhando (fritando, fervendo)
- Limpeza (vassoura, pano)
- Porta (abrindo, fechando, batendo)
- Chaves
- Torneira

INSTRUMENTOS MUSICAIS (40 sons):

CORDAS:
- Violão
- Piano
- Violino
- Harpa

SOPRO:
- Flauta
- Trompete
- Saxofone
- Harmônica

PERCUSSÃO:
- Bateria
- Tambor
- Pandeiro
- Chocalho

SONS EDUCATIVOS (40 sons):

LETRAS E FONEMAS:
- Alfabeto completo
- Sílabas básicas
- Sons iniciais
- Rimas

NÚMEROS:
- Contagem 1-100
- Operações matemáticas
- Tabuada cantada

CORES E FORMAS:
- Nomes das cores
- Formas geométricas
- Descrições táteis

COMO USAR OS SONS:

ATIVIDADES DE DISCRIMINAÇÃO:
1. Toque dois sons similares
2. Peça para identificar diferenças
3. Classifique por categorias
4. Associe sons a objetos reais

JOGOS SONOROS:
1. Bingo sonoro
2. Memória auditiva
3. Caça ao tesouro sonoro
4. Histórias sonoras

DESENVOLVIMENTO DA LINGUAGEM:
1. Imitação de sons
2. Descrição do que ouve
3. Criação de histórias
4. Associação som-palavra

ORIENTAÇÃO E MOBILIDADE:
1. Identificação de ambientes
2. Localização de objetos
3. Navegação por sons
4. Segurança no trânsito

RECURSOS TÉCNICOS:

FORMATO DOS ARQUIVOS:
- MP3 de alta qualidade
- Duração: 5-30 segundos cada
- Volume normalizado
- Sem ruídos de fundo

ORGANIZAÇÃO:
- Pastas por categoria
- Nomes descritivos
- Lista de reprodução temática
- Índice alfabético

EQUIPAMENTOS RECOMENDADOS:
- Fones de ouvido de qualidade
- Caixas de som direcionais
- Gravador digital
- Computador ou tablet

ATIVIDADES SUGERIDAS:

PARA EDUCAÇÃO INFANTIL:
- Reconhecimento de animais
- Sons do corpo humano
- Instrumentos musicais
- Sons da casa

PARA ENSINO FUNDAMENTAL:
- Geografia sonora
- História através de sons
- Ciências naturais
- Matemática musical

PARA ADOLESCENTES:
- Paisagens sonoras
- Cultura e música
- Tecnologia e sons
- Profissões e seus sons

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
      case "Kit de Exploração Tátil Educativa":
        return "Baseado na metodologia Montessori adaptada, este kit desenvolve a percepção tátil como canal principal de aprendizagem. Cada material é cuidadosamente selecionado para oferecer experiências sensoriais ricas e educativas, promovendo o desenvolvimento cognitivo através do tato."
      case "Audiolivros Interativos Educacionais":
        return "Utiliza tecnologia de áudio espacial para criar experiências imersivas de aprendizagem. Os audiolivros são estruturados com pausas interativas, efeitos sonoros e narração envolvente, desenvolvendo compreensão auditiva e imaginação."
      case "Jogos Sonoros Educativos":
        return "Aplicação da musicoterapia na educação especial, utilizando sons e música como ferramentas pedagógicas. Desenvolve discriminação auditiva, memória sonora e coordenação através de atividades lúdicas e estruturadas."
      case "Sistema de Navegação Escolar":
        return "Programa estruturado de orientação e mobilidade específico para ambiente escolar. Ensina técnicas profissionais de navegação independente, desenvolvendo confiança e autonomia para movimentação segura."
      default:
        return "Atividade desenvolvida especificamente para alunos com deficiência visual, utilizando canais sensoriais alternativos para promover aprendizagem efetiva."
    }
  }

  const getStepByStep = (name: string) => {
    switch (name) {
      case "Kit de Exploração Tátil Educativa":
        return [
          "Organize materiais por categorias (texturas, formas, objetos)",
          "Apresente um material por vez",
          "Permita exploração livre inicial",
          "Guie a exploração com perguntas direcionadas",
          "Conecte experiências táteis com conceitos acadêmicos",
          "Registre descobertas e preferências do aluno",
          "Varie materiais para manter interesse",
          "Avalie progresso na discriminação tátil",
        ]
      case "Audiolivros Interativos Educacionais":
        return [
          "Selecione conteúdo apropriado para idade e nível",
          "Configure equipamento de áudio de qualidade",
          "Prepare roteiro com pausas interativas",
          "Inicie com sessão de familiarização",
          "Faça pausas para discussão e reflexão",
          "Inclua atividades relacionadas ao conteúdo",
          "Registre compreensão e engajamento",
          "Avalie aprendizagem através de questões",
        ]
      case "Jogos Sonoros Educativos":
        return [
          "Prepare instrumentos e materiais sonoros",
          "Explique regras de forma clara e simples",
          "Demonstre atividades através de exemplos",
          "Inicie com jogos mais simples",
          "Aumente complexidade gradualmente",
          "Inclua momentos de criação livre",
          "Registre preferências e habilidades",
          "Conecte atividades com objetivos educacionais",
        ]
      case "Sistema de Navegação Escolar":
        return [
          "Mapeie rotas principais da escola",
          "Identifique pontos de referência táteis e sonoros",
          "Ensine uso correto da bengala",
          "Pratique rotas em horários de menor movimento",
          "Desenvolva mapas mentais dos espaços",
          "Pratique técnicas de orientação",
          "Aumente independência gradualmente",
          "Avalie segurança e confiança na navegação",
        ]
      default:
        return [
          "Prepare ambiente acessível",
          "Use descrições verbais detalhadas",
          "Ofereça tempo adicional",
          "Utilize múltiplos canais sensoriais",
          "Forneça feedback constante",
          "Adapte conforme necessidades individuais",
        ]
    }
  }

  const getTips = (name: string) => {
    switch (name) {
      case "Kit de Exploração Tátil Educativa":
        return [
          "Use materiais seguros e duráveis",
          "Varie texturas para enriquecer experiências",
          "Mantenha organização consistente",
          "Permita tempo suficiente para exploração",
          "Conecte experiências táteis com vocabulário",
        ]
      case "Audiolivros Interativos Educacionais":
        return [
          "Use fones de ouvido de boa qualidade",
          "Ajuste volume confortavelmente",
          "Faça pausas regulares para descanso",
          "Inclua efeitos sonoros envolventes",
          "Permita repetição de trechos quando necessário",
        ]
      case "Jogos Sonoros Educativos":
        return [
          "Mantenha ambiente acusticamente controlado",
          "Use instrumentos de qualidade",
          "Varie atividades para manter interesse",
          "Inclua momentos de silêncio para contraste",
          "Celebre participação e criatividade",
        ]
      case "Sistema de Navegação Escolar":
        return [
          "Pratique em horários de menor movimento",
          "Use pontos de referência consistentes",
          "Ensine técnicas de segurança",
          "Desenvolva confiança gradualmente",
          "Mantenha comunicação constante com equipe escolar",
        ]
      default:
        return [
          "Use linguagem descritiva clara",
          "Ofereça múltiplas formas de acesso",
          "Mantenha paciência e positividade",
          "Adapte conforme necessidades individuais",
        ]
    }
  }

  const getVariations = (name: string) => {
    switch (name) {
      case "Kit de Exploração Tátil Educativa":
        return [
          "Crie kits temáticos (ciências, matemática, geografia)",
          "Use materiais naturais e artificiais",
          "Inclua elementos com diferentes temperaturas",
          "Adicione componentes com aromas",
          "Crie versões portáteis para uso domiciliar",
        ]
      case "Audiolivros Interativos Educacionais":
        return [
          "Crie versões com múltiplas vozes",
          "Inclua trilha sonora ambiente",
          "Adicione efeitos sonoros 3D",
          "Crie versões em diferentes idiomas",
          "Desenvolva conteúdo personalizado",
        ]
      case "Jogos Sonoros Educativos":
        return [
          "Use instrumentos de diferentes culturas",
          "Crie jogos com sons da natureza",
          "Inclua tecnologia (apps, sintetizadores)",
          "Desenvolva jogos colaborativos",
          "Crie versões para diferentes faixas etárias",
        ]
      case "Sistema de Navegação Escolar":
        return [
          "Adapte para diferentes tipos de escola",
          "Inclua navegação em espaços externos",
          "Use tecnologia GPS adaptada",
          "Crie mapas táteis personalizados",
          "Desenvolva sistema de códigos sonoros",
        ]
      default:
        return [
          "Adapte para diferentes níveis de visão",
          "Crie versões para uso domiciliar",
          "Inclua elementos tecnológicos",
          "Desenvolva atividades colaborativas",
        ]
    }
  }

  const getAssessment = (name: string) => {
    switch (name) {
      case "Kit de Exploração Tátil Educativa":
        return "Avalie a capacidade de discriminação tátil, velocidade de reconhecimento de texturas e objetos, e transferência de aprendizagem tátil para conceitos acadêmicos. Observe melhoria na coordenação motora fina e desenvolvimento do vocabulário descritivo."
      case "Audiolivros Interativos Educacionais":
        return "Monitore compreensão auditiva, capacidade de retenção de informações, e habilidade de responder questões sobre o conteúdo. Avalie desenvolvimento da imaginação e capacidade de criar imagens mentais a partir de descrições auditivas."
      case "Jogos Sonoros Educativos":
        return "Observe desenvolvimento da discriminação auditiva, memória sonora, e coordenação rítmica. Avalie participação ativa, criatividade na produção sonora, e transferência de habilidades auditivas para outras áreas de aprendizagem."
      case "Sistema de Navegação Escolar":
        return "Avalie independência na navegação, uso correto de técnicas de orientação e mobilidade, e confiança em ambientes escolares. Monitore redução de ansiedade relacionada à movimentação e aumento da participação em atividades escolares."
      default:
        return "Observe participação ativa, desenvolvimento de habilidades compensatórias, e progresso na independência. Avalie transferência de aprendizagem para situações cotidianas."
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
          <h2 className="text-4xl font-bold text-white mb-4">Deficiência Visual</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Estratégias e recursos para promover a inclusão de alunos com deficiência visual, desenvolvidos com base nas
            melhores práticas de acessibilidade e educação inclusiva.
          </p>
          <div className="flex justify-center space-x-6">
            <div className="bg-gray-950/70 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">18</div>
              <div className="text-sm text-gray-400">recursos disponíveis</div>
            </div>
            <div className="bg-gray-950/70 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">92%</div>
              <div className="text-sm text-gray-400">eficácia média</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="strategies" className="w-full">
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
