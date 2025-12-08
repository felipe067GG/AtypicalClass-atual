"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Video, Users, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function ResourcesSection() {
  const { t, language } = useLanguage()

  const materials = [
    {
      title: {
        pt: "Guia Completo de Educação Inclusiva",
        en: "Complete Guide to Inclusive Education",
        es: "Guía Completa de Educación Inclusiva",
      },
      type: "PDF",
      size: "2.5 MB",
      description: {
        pt: "Manual abrangente com estratégias para todas as deficiências",
        en: "Comprehensive manual with strategies for all disabilities",
        es: "Manual completo con estrategias para todas las discapacidades",
      },
      icon: FileText,
    },
    {
      title: {
        pt: "Vídeos Educativos - Práticas Inclusivas",
        en: "Educational Videos - Inclusive Practices",
        es: "Videos Educativos - Prácticas Inclusivas",
      },
      type: {
        pt: "Vídeo",
        en: "Video",
        es: "Video",
      },
      size: {
        pt: "Série",
        en: "Series",
        es: "Serie",
      },
      description: {
        pt: "Coleção de vídeos demonstrando técnicas em sala de aula",
        en: "Collection of videos demonstrating classroom techniques",
        es: "Colección de videos demostrando técnicas en el aula",
      },
      icon: Video,
    },
    {
      title: {
        pt: "Kit de Atividades Adaptadas",
        en: "Adapted Activities Kit",
        es: "Kit de Actividades Adaptadas",
      },
      type: "ZIP",
      size: "15 MB",
      description: {
        pt: "Mais de 100 atividades prontas para usar",
        en: "Over 100 ready-to-use activities",
        es: "Más de 100 actividades listas para usar",
      },
      icon: Download,
    },
  ]

  const organizations = [
    {
      name: "APAE - Associação de Pais e Amigos dos Excepcionais",
      contact: "(11) 3346-2000",
      email: "contato@apae.org.br",
      description: {
        pt: "Suporte para pessoas com deficiência intelectual",
        en: "Support for people with intellectual disabilities",
        es: "Apoyo para personas con discapacidad intelectual",
      },
    },
    {
      name: "Instituto Benjamin Constant",
      contact: "(21) 3478-4442",
      email: "ibc@ibc.gov.br",
      description: {
        pt: "Especializado em deficiência visual",
        en: "Specialized in visual impairment",
        es: "Especializado en discapacidad visual",
      },
    },
    {
      name: "INES - Instituto Nacional de Educação de Surdos",
      contact: "(21) 2285-7546",
      email: "ines@ines.gov.br",
      description: {
        pt: "Referência em educação de surdos",
        en: "Reference in deaf education",
        es: "Referencia en educación para sordos",
      },
    },
  ]

  const handleDownload = (title: string, type: string) => {
    let content = ""

    if (title === "Guia Completo de Educação Inclusiva") {
      content = `GUIA COMPLETO DE EDUCAÇÃO INCLUSIVA

SUMÁRIO
1. Introdução à Educação Inclusiva
2. Legislação e Direitos
3. Transtorno do Espectro Autista (TEA)
4. Síndrome de Down
5. TDAH - Transtorno do Déficit de Atenção
6. Deficiência Visual
7. Deficiência Auditiva
8. Estratégias Pedagógicas Gerais
9. Avaliação Inclusiva
10. Trabalho com Famílias
11. Recursos e Tecnologias
12. Casos Práticos

1. INTRODUÇÃO À EDUCAÇÃO INCLUSIVA

A educação inclusiva é um paradigma educacional que visa garantir o direito de todos os alunos à educação de qualidade, independentemente de suas características, necessidades ou diferenças. Este guia apresenta estratégias práticas e fundamentadas para implementar uma educação verdadeiramente inclusiva.

PRINCÍPIOS FUNDAMENTAIS:
• Todos os alunos podem aprender
• Diversidade enriquece o ambiente educacional
• Adaptações beneficiam todos os estudantes
• Colaboração é essencial
• Foco nas potencialidades, não nas limitações

2. LEGISLAÇÃO E DIREITOS

MARCO LEGAL BRASILEIRO:
- Constituição Federal de 1988 (Art. 205, 206, 208)
- Lei de Diretrizes e Bases da Educação (LDB 9.394/96)
- Estatuto da Criança e do Adolescente (ECA)
- Lei Brasileira de Inclusão (13.146/2015)
- Política Nacional de Educação Especial (2008)

DIREITOS GARANTIDOS:
• Acesso à educação regular
• Atendimento educacional especializado
• Adaptações curriculares
• Recursos de tecnologia assistiva
• Formação de professores
• Acessibilidade arquitetônica

3. TRANSTORNO DO ESPECTRO AUTISTA (TEA)

CARACTERÍSTICAS:
- Dificuldades na comunicação social
- Padrões restritos e repetitivos de comportamento
- Processamento sensorial atípico
- Necessidade de previsibilidade

ESTRATÉGIAS EFICAZES:
• Estruturação visual do ambiente
• Cronogramas pictográficos
• Comunicação clara e objetiva
• Uso de interesses especiais
• Pausas regulares
• Feedback positivo constante

ADAPTAÇÕES CURRICULARES:
- Instruções visuais
- Tempo adicional
- Ambiente com poucos estímulos
- Atividades estruturadas
- Avaliação diferenciada

4. SÍNDROME DE DOWN

CARACTERÍSTICAS:
- Desenvolvimento cognitivo em ritmo próprio
- Processamento visual como ponto forte
- Necessidade de repetição e reforço
- Capacidade de aprendizagem contínua

ESTRATÉGIAS PEDAGÓGICAS:
• Aprendizagem visual
• Repetição em contextos variados
• Tempo adicional respeitado
• Comunicação simplificada
• Motivação constante
• Celebração de conquistas

RECURSOS RECOMENDADOS:
- Materiais visuais
- Jogos educativos
- Tecnologia assistiva
- Atividades lúdicas
- Sistema de recompensas

5. TDAH - TRANSTORNO DO DÉFICIT DE ATENÇÃO

CARACTERÍSTICAS:
- Dificuldade de atenção sustentada
- Hiperatividade
- Impulsividade
- Variabilidade no desempenho

ESTRATÉGIAS DE MANEJO:
• Estrutura e organização
• Pausas ativas regulares
• Técnicas de foco
• Autorregulação emocional
• Gamificação
• Multissensorialidade

AMBIENTE FAVORÁVEL:
- Redução de distrações
- Organização visual
- Rotinas claras
- Espaço para movimento
- Sinalizações visuais

6. DEFICIÊNCIA VISUAL

TIPOS:
- Baixa visão
- Cegueira total
- Cegueira congênita ou adquirida

RECURSOS ESSENCIAIS:
• Sistema Braille
• Tecnologias assistivas
• Materiais táteis
• Audiodescrição
• Orientação e mobilidade

ADAPTAÇÕES:
- Textos ampliados
- Alto contraste
- Materiais em relevo
- Descrições verbais
- Organização espacial

7. DEFICIÊNCIA AUDITIVA

CLASSIFICAÇÃO:
- Surdez leve, moderada, severa, profunda
- Surdez pré ou pós-lingual

RECURSOS DE COMUNICAÇÃO:
• Libras (Língua Brasileira de Sinais)
• Leitura labial
• Tecnologia assistiva
• Comunicação visual
• Intérprete de Libras

ESTRATÉGIAS:
- Comunicação visual
- Ambiente bem iluminado
- Posicionamento adequado
- Recursos visuais
- Cultura surda

8. ESTRATÉGIAS PEDAGÓGICAS GERAIS

PLANEJAMENTO INCLUSIVO:
• Desenho Universal para Aprendizagem (DUA)
• Múltiplas formas de representação
• Múltiplas formas de engajamento
• Múltiplas formas de expressão

METODOLOGIAS ATIVAS:
- Aprendizagem colaborativa
- Projetos interdisciplinares
- Gamificação
- Tecnologias digitais
- Avaliação formativa

9. AVALIAÇÃO INCLUSIVA

PRINCÍPIOS:
• Foco no progresso individual
• Múltiplas formas de avaliação
• Adaptações necessárias
• Feedback construtivo
• Participação do aluno

INSTRUMENTOS:
- Portfólio
- Observação sistemática
- Autoavaliação
- Avaliação por pares
- Projetos práticos

10. TRABALHO COM FAMÍLIAS

IMPORTÂNCIA:
- Parceria escola-família
- Continuidade das estratégias
- Apoio emocional
- Troca de informações
- Desenvolvimento integral

ESTRATÉGIAS:
• Comunicação regular
• Reuniões periódicas
• Orientações práticas
• Grupos de apoio
• Formação para pais

11. RECURSOS E TECNOLOGIAS

TECNOLOGIA ASSISTIVA:
- Software educativo
- Aplicativos móveis
- Equipamentos adaptativos
- Comunicação alternativa
- Acessibilidade digital

MATERIAIS PEDAGÓGICOS:
• Jogos educativos
• Materiais manipuláveis
• Recursos visuais
• Livros adaptados
• Multimídia

12. CASOS PRÁTICOS

CASO 1 - ALUNO COM TEA:
João, 8 anos, diagnóstico de autismo
Estratégias implementadas:
- Cronograma visual diário
- Área de descompressão
- Atividades com trens (interesse especial)
- Comunicação por pictogramas
Resultados: Melhora significativa na participação

CASO 2 - ALUNA COM SÍNDROME DE DOWN:
Maria, 10 anos, síndrome de Down
Estratégias implementadas:
- Material visual ampliado
- Tempo adicional nas atividades
- Sistema de recompensas
- Atividades em duplas
Resultados: Progresso acadêmico e social

CASO 3 - ALUNO COM TDAH:
Pedro, 12 anos, TDAH
Estratégias implementadas:
- Pausas de movimento a cada 20 minutos
- Organização visual da mesa
- Atividades gamificadas
- Técnicas de respiração
Resultados: Melhora na concentração e comportamento

CONCLUSÃO

A educação inclusiva é um direito fundamental e uma responsabilidade de todos. Com estratégias adequadas, recursos apropriados e atitude inclusiva, é possível garantir que todos os alunos tenham acesso a uma educação de qualidade.

LEMBRE-SE:
- Cada aluno é único
- Foque nas potencialidades
- Seja paciente e persistente
- Busque formação continuada
- Trabalhe em equipe
- Celebre cada conquista

© AtypicalClass 2025 - Educação Inclusiva para Todos`
    } else if (title === "Vídeos Educativos - Práticas Inclusivas") {
      content = `VÍDEOS EDUCATIVOS - PRÁTICAS INCLUSIVAS

CATÁLOGO COMPLETO DE VÍDEOS EDUCACIONAIS

SÉRIE 1: FUNDAMENTOS DA EDUCAÇÃO INCLUSIVA (10 vídeos)

Vídeo 1: "O que é Educação Inclusiva?" (15 min)
- Conceitos fundamentais
- Histórico e evolução
- Princípios básicos
- Benefícios para todos

Vídeo 2: "Legislação e Direitos" (12 min)
- Marco legal brasileiro
- Direitos dos estudantes
- Responsabilidades das escolas
- Casos práticos

Vídeo 3: "Mitos e Verdades sobre Inclusão" (18 min)
- Desmistificando preconceitos
- Evidências científicas
- Experiências bem-sucedidas
- Depoimentos de educadores

Vídeo 4: "Desenho Universal para Aprendizagem" (20 min)
- Princípios do DUA
- Múltiplas representações
- Estratégias práticas
- Exemplos em sala de aula

Vídeo 5: "Adaptações Curriculares" (16 min)
- Tipos de adaptações
- Como implementar
- Exemplos por disciplina
- Avaliação das adaptações

SÉRIE 2: TRANSTORNO DO ESPECTRO AUTISTA (8 vídeos)

Vídeo 6: "Compreendendo o Autismo" (14 min)
- Características do TEA
- Espectro de manifestações
- Pontos fortes e desafios
- Desmistificando estereótipos

Vídeo 7: "Estratégias Visuais para TEA" (22 min)
- Cronogramas pictográficos
- Organização do ambiente
- Comunicação visual
- Demonstração prática

Vídeo 8: "Comunicação e Interação Social" (19 min)
- Desenvolvimento da comunicação
- Habilidades sociais
- Histórias sociais
- Role-playing

Vídeo 9: "Gestão de Comportamentos" (17 min)
- Compreendendo comportamentos
- Estratégias preventivas
- Intervenções positivas
- Casos práticos

SÉRIE 3: SÍNDROME DE DOWN (6 vídeos)

Vídeo 10: "Síndrome de Down na Escola" (16 min)
- Características de aprendizagem
- Potencialidades
- Estratégias eficazes
- Inclusão social

Vídeo 11: "Aprendizagem Visual" (20 min)
- Recursos visuais
- Materiais adaptados
- Técnicas de ensino
- Demonstrações práticas

Vídeo 12: "Desenvolvimento da Autonomia" (18 min)
- Habilidades de vida diária
- Independência escolar
- Estratégias graduais
- Celebração de conquistas

SÉRIE 4: TDAH EM SALA DE AULA (7 vídeos)

Vídeo 13: "Entendendo o TDAH" (15 min)
- Características principais
- Tipos de TDAH
- Impacto na aprendizagem
- Estratégias gerais

Vídeo 14: "Organização e Estrutura" (21 min)
- Ambiente organizado
- Rotinas claras
- Sistemas visuais
- Gestão do tempo

Vídeo 15: "Pausas Ativas e Movimento" (16 min)
- Importância do movimento
- Exercícios em sala
- Pausas estratégicas
- Atividades físicas

SÉRIE 5: DEFICIÊNCIA VISUAL (6 vídeos)

Vídeo 16: "Recursos Táteis" (19 min)
- Materiais em relevo
- Texturas educativas
- Mapas táteis
- Braille básico

Vídeo 17: "Tecnologia Assistiva" (17 min)
- Leitores de tela
- Lupas eletrônicas
- Software adaptativo
- Aplicativos móveis

Vídeo 18: "Orientação e Mobilidade" (23 min)
- Técnicas básicas
- Uso da bengala
- Navegação escolar
- Independência

SÉRIE 6: DEFICIÊNCIA AUDITIVA (5 vídeos)

Vídeo 19: "Introdução à Libras" (25 min)
- Alfabeto manual
- Sinais básicos
- Estrutura da língua
- Prática inicial

Vídeo 20: "Comunicação Visual" (18 min)
- Recursos visuais
- Leitura labial
- Expressões faciais
- Ambiente adequado

SÉRIE 7: CASOS PRÁTICOS (10 vídeos)

Vídeo 21: "Sala de Aula Inclusiva - Educação Infantil" (20 min)
Vídeo 22: "Ensino Fundamental - Estratégias Práticas" (22 min)
Vídeo 23: "Ensino Médio - Preparação para o Futuro" (18 min)
Vídeo 24: "Trabalho em Equipe - Professores e Especialistas" (16 min)
Vídeo 25: "Parceria com Famílias" (19 min)
Vídeo 26: "Avaliação Inclusiva" (21 min)
Vídeo 27: "Tecnologia na Educação Inclusiva" (17 min)
Vídeo 28: "Formação Continuada" (15 min)
Vídeo 29: "Superando Desafios" (20 min)
Vídeo 30: "Celebrando Sucessos" (14 min)

RECURSOS ADICIONAIS:

MATERIAIS DE APOIO:
- Roteiros de cada vídeo
- Atividades práticas
- Listas de verificação
- Recursos complementares
- Bibliografia recomendada

COMO USAR OS VÍDEOS:
1. Assista individualmente para formação pessoal
2. Use em reuniões pedagógicas
3. Compartilhe com famílias
4. Aplique em cursos de formação
5. Adapte para sua realidade

FORMATOS DISPONÍVEIS:
- HD 1080p
- Legendas em português
- Audiodescrição
- Versão em Libras
- Materiais para download

ACESSO:
- Plataforma online
- Download para uso offline
- Aplicativo móvel
- Streaming adaptativo
- Suporte técnico

© AtypicalClass 2025 - Educação Inclusiva para Todos`
    } else if (title === "Kit de Atividades Adaptadas") {
      content = `KIT DE ATIVIDADES ADAPTADAS

COLEÇÃO COMPLETA COM 100+ ATIVIDADES

ORGANIZAÇÃO POR FAIXA ETÁRIA E NECESSIDADE

EDUCAÇÃO INFANTIL (4-6 anos) - 25 atividades

ATIVIDADES SENSORIAIS:
1. Caixa de Texturas Educativas
- Materiais: diferentes texturas, caixas, vendas
- Objetivo: desenvolvimento sensorial
- Adaptações: para deficiência visual, TEA

2. Jogo dos Sons
- Materiais: objetos sonoros, gravações
- Objetivo: discriminação auditiva
- Adaptações: para deficiência auditiva, TDAH

3. Cores e Formas Táteis
- Materiais: formas em relevo, tintas texturizadas
- Objetivo: reconhecimento visual-tátil
- Adaptações: múltiplas deficiências

4. Circuito Sensorial
- Materiais: diferentes superfícies, obstáculos
- Objetivo: integração sensorial
- Adaptações: deficiência física, TEA

5. Massinha Aromática
- Materiais: massinha, essências naturais
- Objetivo: criatividade e sensorialidade
- Adaptações: todas as necessidades

ATIVIDADES COGNITIVAS:
6. Quebra-cabeça Gigante
- Materiais: peças grandes, imagens simples
- Objetivo: raciocínio lógico
- Adaptações: deficiência visual, Down

7. Memória dos Animais
- Materiais: cartas grandes, sons de animais
- Objetivo: memória e associação
- Adaptações: deficiência auditiva, TDAH

8. Classificação por Cores
- Materiais: objetos coloridos, recipientes
- Objetivo: categorização
- Adaptações: deficiência visual, TEA

9. Sequência Lógica
- Materiais: cartões sequenciais, histórias
- Objetivo: pensamento sequencial
- Adaptações: todas as necessidades

10. Contagem Divertida
- Materiais: objetos manipuláveis, números grandes
- Objetivo: conceitos matemáticos
- Adaptações: deficiência visual, Down

ENSINO FUNDAMENTAL I (7-10 anos) - 35 atividades

PORTUGUÊS ADAPTADO:
11. Alfabeto Tátil
- Materiais: letras em relevo, lixa, velcro
- Objetivo: alfabetização
- Adaptações: deficiência visual

12. Histórias com Pictogramas
- Materiais: livros adaptados, símbolos
- Objetivo: compreensão leitora
- Adaptações: TEA, deficiência intelectual

13. Rimas e Aliterações
- Materiais: cartões, objetos, gravações
- Objetivo: consciência fonológica
- Adaptações: deficiência auditiva

14. Teatro de Fantoches Inclusivo
- Materiais: fantoches adaptados, roteiros
- Objetivo: expressão oral
- Adaptações: todas as necessidades

15. Jornal da Turma
- Materiais: papel, imagens, gravador
- Objetivo: produção textual
- Adaptações: múltiplas necessidades

MATEMÁTICA INCLUSIVA:
16. Ábaco Colorido
- Materiais: ábaco adaptado, contas grandes
- Objetivo: operações básicas
- Adaptações: deficiência visual, Down

17. Geometria Tátil
- Materiais: formas 3D, texturas
- Objetivo: conceitos geométricos
- Adaptações: deficiência visual

18. Medidas do Corpo
- Materiais: fitas métricas, réguas adaptadas
- Objetivo: conceitos de medida
- Adaptações: deficiência física

19. Gráficos Vivos
- Materiais: cartolinas, adesivos grandes
- Objetivo: interpretação de dados
- Adaptações: deficiência visual, TEA

20. Frações Comestíveis
- Materiais: frutas, pizzas, bolos
- Objetivo: conceito de fração
- Adaptações: todas as necessidades

CIÊNCIAS EXPERIMENTAIS:
21. Horta Sensorial
- Materiais: sementes, terra, recipientes
- Objetivo: ciclo das plantas
- Adaptações: deficiência visual, TEA

22. Experimentos Sonoros
- Materiais: instrumentos, objetos diversos
- Objetivo: propriedades do som
- Adaptações: deficiência auditiva

23. Misturas Coloridas
- Materiais: tintas, água, recipientes
- Objetivo: misturas e soluções
- Adaptações: deficiência visual

24. Magnetismo Divertido
- Materiais: ímãs, objetos metálicos
- Objetivo: propriedades magnéticas
- Adaptações: deficiência visual, TDAH

25. Ciclo da Água Tátil
- Materiais: recipientes, gelo, vapor
- Objetivo: estados da matéria
- Adaptações: deficiência visual

ENSINO FUNDAMENTAL II (11-14 anos) - 25 atividades

PROJETOS INTERDISCIPLINARES:
26. Maquete Tátil da Cidade
- Materiais: diversos materiais de construção
- Objetivo: geografia urbana
- Adaptações: deficiência visual

27. Linha do Tempo Interativa
- Materiais: cartolinas, imagens, áudio
- Objetivo: história cronológica
- Adaptações: múltiplas necessidades

28. Laboratório de Química Seguro
- Materiais: reagentes seguros, lupas
- Objetivo: reações químicas
- Adaptações: deficiência visual

29. Simulação de Ecossistemas
- Materiais: terrários, plantas, animais pequenos
- Objetivo: ecologia
- Adaptações: TEA, deficiência visual

30. Jornal Científico
- Materiais: computador, gravador, câmera
- Objetivo: divulgação científica
- Adaptações: deficiência auditiva

ENSINO MÉDIO (15-18 anos) - 15 atividades

PREPARAÇÃO PARA VIDA ADULTA:
31. Simulação de Entrevista de Emprego
- Materiais: roteiros, câmera, roupas
- Objetivo: habilidades profissionais
- Adaptações: todas as necessidades

32. Orçamento Familiar
- Materiais: calculadoras adaptadas, planilhas
- Objetivo: educação financeira
- Adaptações: deficiência visual

33. Projeto de Vida
- Materiais: cartolinas, revistas, computador
- Objetivo: planejamento futuro
- Adaptações: múltiplas necessidades

34. Simulação de Vestibular
- Materiais: provas adaptadas, tempo extra
- Objetivo: preparação acadêmica
- Adaptações: todas as necessidades

35. Empreendedorismo Social
- Materiais: materiais de apresentação
- Objetivo: inovação social
- Adaptações: múltiplas necessidades

INSTRUÇÕES GERAIS DE ADAPTAÇÃO:

PARA DEFICIÊNCIA VISUAL:
- Use materiais com texturas contrastantes
- Forneça descrições verbais detalhadas
- Organize materiais de forma consistente
- Use recursos sonoros complementares

PARA DEFICIÊNCIA AUDITIVA:
- Use recursos visuais abundantes
- Forneça instruções escritas claras
- Use gestos e demonstrações
- Mantenha contato visual

PARA TEA:
- Estruture atividades claramente
- Use cronogramas visuais
- Permita pausas quando necessário
- Incorpore interesses especiais

PARA SÍNDROME DE DOWN:
- Use materiais visuais grandes
- Permita tempo adicional
- Repita instruções quando necessário
- Celebre cada conquista

PARA TDAH:
- Divida atividades em etapas menores
- Permita movimento durante atividades
- Use elementos de gamificação
- Forneça feedback imediato

MATERIAIS BÁSICOS NECESSÁRIOS:
- Papel colorido e cartolinas
- Materiais de diferentes texturas
- Objetos manipuláveis diversos
- Recursos tecnológicos básicos
- Materiais de arte e artesanato
- Jogos educativos adaptados

AVALIAÇÃO DAS ATIVIDADES:
- Observe participação e engajamento
- Documente progressos individuais
- Adapte conforme necessidades
- Celebre sucessos alcançados
- Compartilhe estratégias eficazes

© AtypicalClass 2025 - Educação Inclusiva para Todos`
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    const notification = document.createElement("div")
    notification.innerHTML = `✅ Download iniciado: ${title}`
    notification.style.cssText =
      "position:fixed;top:20px;right:20px;background:#10b981;color:white;padding:12px;border-radius:8px;z-index:9999;"
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 3000)
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl blur-3xl"></div>
        <div className="relative z-10 p-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            {language === "pt" && "Recursos e Materiais"}
            {language === "en" && "Resources and Materials"}
            {language === "es" && "Recursos y Materiales"}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {language === "pt" && "Downloads gratuitos, organizações parceiras e materiais de apoio para educadores"}
            {language === "en" && "Free downloads, partner organizations and support materials for educators"}
            {language === "es" && "Descargas gratuitas, organizaciones asociadas y materiales de apoyo para educadores"}
          </p>
        </div>
      </motion.div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-6">
          {language === "pt" && "Materiais Educativos"}
          {language === "en" && "Educational Materials"}
          {language === "es" && "Materiales Educativos"}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {materials.map((material, index) => {
            const IconComponent = material.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-center">
                      {typeof material.title === "object" ? material.title[language] : material.title}
                    </CardTitle>
                    <div className="flex justify-center space-x-4 text-sm">
                      <Badge className="bg-blue-600">
                        {typeof material.type === "object" ? material.type[language] : material.type}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {typeof material.size === "object" ? material.size[language] : material.size}
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-300 text-center">
                      {typeof material.description === "object" ? material.description[language] : material.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                      onClick={() =>
                        handleDownload(
                          typeof material.title === "object" ? material.title.pt : material.title,
                          typeof material.type === "object" ? material.type.pt : material.type,
                        )
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {language === "pt" && "Download Gratuito"}
                      {language === "en" && "Free Download"}
                      {language === "es" && "Descarga Gratuita"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-6">
          {language === "pt" && "Organizações Parceiras"}
          {language === "en" && "Partner Organizations"}
          {language === "es" && "Organizaciones Asociadas"}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {organizations.map((org, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-slate-900/50 border-slate-700 hover:bg-slate-900/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-center text-lg">{org.name}</CardTitle>
                  <CardDescription className="text-slate-300 text-center">{org.description[language]}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
                    <Phone className="w-4 h-4" />
                    <span>{org.contact}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-blue-400">
                    <Mail className="w-4 h-4" />
                    <span>{org.email}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
