-- Atualizar conteúdos focados em estratégias para alunos atípicos
-- Este script substitui os conteúdos existentes ou adiciona novos

-- Limpar conteúdos antigos e inserir os novos adaptados
TRUNCATE TABLE content RESTART IDENTITY CASCADE;

-- Corrigido sintaxe de arrays PostgreSQL: usar {} em vez de []
-- Conteúdos de Matemática para alunos atípicos
INSERT INTO content (subject, specialty, title, content_type, description, content_text, tags) VALUES
('Matemática', 'Autismo',
'Como Ensinar Números para Alunos com Autismo',
'Guia Pedagógico',
'Estratégias multissensoriais e visuais para ensino de conceitos numéricos',
'## Estratégias Principais

### 1. Use Materiais Concretos e Manipuláveis
- **Blocos de contagem coloridos**: Permita que o aluno toque, organize e conte fisicamente
- **Ábacos adaptados**: Com cores distintas e texturas diferentes
- **Fichas com números grandes**: Fonte clara, alto contraste
- **Objetos de interesse especial**: Se o aluno gosta de carros, use carrinhos para contar

### 2. Rotina Visual Estruturada
- Crie um quadro visual mostrando os passos da atividade matemática
- Use timer visual para indicar tempo de cada atividade
- Mantenha a mesma sequência de ensino sempre que possível
- Sinalize transições com antecedência

### 3. Apoio Visual Constante
- **Linha numérica sempre visível** na mesa do aluno
- **Cartões com números e quantidades** correspondentes
- **Tabelas de referência** com operações básicas
- **Símbolos visuais** para operações (+, -, ×, ÷)

### 4. Ensino Explícito e Direto
- Explique cada passo verbalmente de forma clara e objetiva
- Evite linguagem figurada ou ambígua
- Use frases curtas e diretas: "Pegue 3 blocos azuis"
- Demonstre antes de pedir que o aluno faça

### 5. Conexão com Interesses Especiais
- Se o aluno gosta de trens, crie problemas sobre trens
- Use temas de interesse para motivar o aprendizado
- Incorpore personagens ou objetos favoritos nos exercícios

### 6. Ambiente Sensorial Adequado
- Minimize distrações visuais e auditivas
- Ofereça fones de ouvido com cancelamento de ruído se necessário
- Permita uso de fidget toys durante atividades
- Respeite necessidades sensoriais individuais

### Atividades Práticas
1. **Contagem com Objetos Reais**: Contar brinquedos, lanches, materiais escolares
2. **Jogos de Correspondência**: Associar número ao quantidade
3. **Padrões com Cores**: Criar sequências visuais previsíveis
4. **Matemática na Rotina**: Contar passos, contar até a hora do lanche

### Adaptações Importantes
- Permita tempo extra para processar informações
- Aceite respostas não-verbais (apontar, usar tablet)
- Celebre pequenos progressos
- Mantenha expectativas claras e consistentes

### Recursos Recomendados
Blocos de contagem, Linha numérica visual, Timer visual, Cartões de números, Objetos manipuláveis',
'{"autismo", "matemática", "visual", "concreto", "estruturado"}'),

('Matemática', 'TDAH',
'Como Ensinar Matemática para Alunos com TDAH',
'Guia Pedagógico',
'Estratégias dinâmicas e engajadoras para manter foco e motivação',
'## Estratégias Principais

### 1. Atividades Curtas e Dinâmicas
- **Divida tarefas longas** em mini-desafios de 5-10 minutos
- **Use timer**: "Quantos você consegue fazer em 3 minutos?"
- **Alterne tipos de atividade**: Não faça 20 contas iguais seguidas
- **Movimento integrado**: Matemática com pulos, passos, gestos

### 2. Gamificação e Competição Saudável
- **Sistema de pontos e recompensas** imediatas
- **Desafios contra o relógio**: "Bata seu próprio recorde!"
- **Jogos de tabuleiro matemáticos**: Dados, cartas, dominó
- **Apps e jogos digitais**: Tecnologia como aliada

### 3. Aprendizado Ativo e Cinestésico
- **Matemática em movimento**: Pular em números no chão
- **Jogos ao ar livre**: Caça ao tesouro matemático
- **Construção com blocos**: Geometria prática
- **Culinária**: Medidas, frações, proporções

### 4. Feedback Imediato e Positivo
- Corrija imediatamente (não espere até o fim)
- Celebre acertos com entusiasmo
- Transforme erros em oportunidades de aprendizado
- Use reforço positivo constante

### 5. Organização Visual Clara
- **Uma atividade por página**: Evite páginas cheias
- **Destaque o que é importante**: Cores, marcadores
- **Checklist visual**: Marque o que já foi feito
- **Espaço organizado**: Menos bagunça = mais foco

### 6. Variedade e Novidade
- Mude o formato das atividades frequentemente
- Use materiais diferentes (giz, lousa, tablet, papel colorido)
- Introduza elementos surpresa
- Evite monotonia

### Atividades Práticas
1. **Bingo Matemático**: Chamada de operações, marcar resultados
2. **Corrida de Cálculo**: Resolver e correr até a resposta
3. **Matemática com Música**: Canções com contagem e operações
4. **Desafios Rápidos**: Flashcards com tempo limitado

### Adaptações Importantes
- Permita movimento (ficar em pé, usar bola de exercício)
- Ofereça pausas frequentes (a cada 15-20 minutos)
- Reduza distrações visuais e auditivas
- Forneça instruções claras e objetivas
- Use lembretes visuais para manter no caminho

### Recursos Recomendados
Timer visual, Jogos matemáticos, Materiais manipuláveis, Apps educativos, Sistema de recompensas',
'{"TDAH", "matemática", "dinâmico", "jogo", "movimento"}'),

('Matemática', 'Dislexia',
'Como Ensinar Matemática para Alunos com Dislexia',
'Guia Pedagógico',
'Estratégias para reduzir carga de leitura e focar em conceitos matemáticos',
'## Estratégias Principais

### 1. Minimize a Carga de Leitura
- **Use números grandes e claros**: Fonte sem serifa, tamanho 14+
- **Evite problemas com muito texto**: Foque no cálculo
- **Leia problemas em voz alta**: Ou forneça áudio
- **Use símbolos visuais**: Desenhos em vez de palavras quando possível

### 2. Organização Visual Clara
- **Muito espaço em branco**: Não aperte informações
- **Uma operação por linha**: Evite amontoar cálculos
- **Papel quadriculado**: Ajuda a alinhar números
- **Cores para organizar**: Unidades em azul, dezenas em vermelho

### 3. Apoios Visuais e Concretos
- **Linha numérica sempre disponível**
- **Tabelas de multiplicação coloridas**
- **Calculadora permitida**: Foco no raciocínio, não no cálculo
- **Blocos e manipuláveis**: Tornar abstrato em concreto

### 4. Ensino Multissensorial
- **Ver**: Demonstrações visuais claras
- **Ouvir**: Explicações verbais passo a passo
- **Tocar**: Manipular objetos concretos
- **Fazer**: Prática guiada antes de independente

### 5. Estratégias de Memória
- **Músicas e rimas**: Para tabuada e fórmulas
- **Mnemônicos visuais**: Imagens para lembrar conceitos
- **Prática espaçada**: Revisão frequente em pequenas doses
- **Conexões com vida real**: Matemática no cotidiano

### 6. Redução de Ansiedade
- Permita uso de materiais de apoio em avaliações
- Dê tempo extra sem pressão
- Celebre o processo, não só o resultado
- Evite comparações com outros alunos

### Atividades Práticas
1. **Matemática Visual**: Gráficos, diagramas, mapas mentais
2. **Jogos com Dados e Cartas**: Menos leitura, mais ação
3. **Problemas Ilustrados**: Desenhe a situação-problema
4. **Tecnologia Assistiva**: Apps com leitura de texto

### Adaptações Importantes
- Forneça folha de fórmulas e referências
- Permita respostas orais quando possível
- Use papel colorido (bege ou azul claro reduz contraste)
- Aceite diferentes formas de mostrar raciocínio
- Evite cópias longas do quadro

### Recursos Recomendados
Linha numérica, Papel quadriculado, Calculadora, Tabelas de referência, Materiais coloridos',
'{"dislexia", "matemática", "visual", "apoio", "leitura"}'),

-- Conteúdos de Português para alunos atípicos
('Português', 'Autismo',
'Como Ensinar Leitura e Escrita para Alunos com Autismo',
'Guia Pedagógico',
'Abordagens estruturadas e visuais para alfabetização',
'## Estratégias Principais

### 1. Método Fônico com Apoio Visual
- **Associe som à imagem**: Letra "A" com figura de Abelha
- **Gestos para cada som**: Movimento corporal ajuda memória
- **Cartões multissensoriais**: Letras com textura, relevo
- **Repetição estruturada**: Mesma sequência de ensino sempre

### 2. Interesses Especiais como Ponte
- Se o aluno gosta de dinossauros, use palavras sobre dinossauros
- Crie histórias com personagens favoritos
- Livros sobre temas de interesse especial
- Motivação através do que é significativo

### 3. Comunicação Alternativa e Aumentativa (CAA)
- **PECS (Picture Exchange Communication System)**: Troca de figuras
- **Pranchas de comunicação**: Símbolos e palavras
- **Tablets com apps de CAA**: Tecnologia assistiva
- **Aceite todas as formas de comunicação**: Verbal, gestual, visual

### 4. Rotina de Leitura Estruturada
- Mesmo horário, mesmo lugar, mesma sequência
- Quadro visual mostrando etapas da atividade
- Livros organizados por categoria com etiquetas visuais
- Transições suaves e previsíveis

### 5. Histórias Sociais e Sequências
- **Histórias sociais personalizadas**: Sobre rotinas e situações
- **Sequências visuais**: Começo, meio, fim com imagens
- **Livros com estrutura previsível**: Repetição de frases
- **Conexão com experiências reais**: Fotos do próprio aluno

### 6. Ambiente Sensorial Adequado
- Canto de leitura tranquilo e organizado
- Iluminação adequada (evite fluorescente piscante)
- Fones de ouvido disponíveis
- Almofadas e assentos confortáveis

### Atividades Práticas
1. **Leitura Compartilhada**: Adulto e criança leem juntos
2. **Livros Interativos**: Com abas, texturas, sons
3. **Escrita com Apoio**: Tracejado, pontilhado, cópia
4. **Jogos de Alfabetização**: Memória de letras, bingo de palavras

### Adaptações Importantes
- Aceite comunicação não-verbal
- Permita tempo de processamento
- Use apoios visuais permanentes
- Respeite necessidades sensoriais
- Celebre todas as tentativas de comunicação

### Recursos Recomendados
Cartões de alfabetização, Livros com imagens, Prancha de comunicação, Apps de CAA, Histórias sociais',
'{"autismo", "alfabetização", "visual", "CAA", "estruturado"}'),

('Português', 'TDAH',
'Como Ensinar Leitura e Escrita para Alunos com TDAH',
'Guia Pedagógico',
'Estratégias dinâmicas para manter engajamento na alfabetização',
'## Estratégias Principais

### 1. Leitura Ativa e Interativa
- **Leitura em voz alta com dramatização**: Vozes diferentes, gestos
- **Livros com ação e aventura**: Histórias empolgantes
- **Leitura compartilhada**: Alterne quem lê
- **Perguntas durante a leitura**: Mantenha engajamento

### 2. Escrita Criativa e Significativa
- **Escreva sobre interesses**: Jogos, esportes, hobbies
- **Histórias em quadrinhos**: Visual e dinâmico
- **Diário pessoal**: Expressão livre
- **Textos curtos e variados**: Evite redações longas

### 3. Movimento e Aprendizado
- **Alfabeto no chão**: Pular nas letras
- **Caça às palavras**: Procurar palavras pela sala
- **Teatro e dramatização**: Encenar histórias
- **Escrita em diferentes superfícies**: Lousa, areia, tablet

### 4. Tecnologia como Aliada
- **Apps de leitura interativa**: Jogos e animações
- **Audiolivros**: Para acompanhar leitura
- **Digitação em vez de escrita manual**: Quando apropriado
- **Gravação de áudio**: Contar histórias oralmente

### 5. Organização e Estrutura Flexível
- **Textos curtos e espaçados**: Não aperte informação
- **Marcadores coloridos**: Destaque partes importantes
- **Checklist de escrita**: Passos para revisar texto
- **Pausas frequentes**: A cada 10-15 minutos

### 6. Feedback Imediato e Positivo
- Corrija enquanto escreve (não depois)
- Elogie esforço e criatividade
- Foque no conteúdo antes da forma
- Celebre progressos pequenos

### Atividades Práticas
1. **Jogos de Palavras**: Forca, stop, caça-palavras
2. **Leitura com Timer**: "Quantas páginas em 5 minutos?"
3. **Escrita Colaborativa**: História coletiva
4. **Rimas e Músicas**: Consciência fonológica divertida

### Adaptações Importantes
- Permita movimento durante leitura
- Ofereça escolhas (qual livro, qual atividade)
- Use materiais variados e coloridos
- Reduza quantidade, aumente qualidade
- Aceite respostas orais quando apropriado

### Recursos Recomendados
Livros ilustrados, Apps de leitura, Materiais coloridos, Timer visual, Jogos de alfabetização',
'{"TDAH", "alfabetização", "dinâmico", "interativo", "movimento"}'),

-- Conteúdos de Ciências para alunos atípicos
('Ciências', 'Autismo',
'Como Ensinar Ciências para Alunos com Autismo',
'Guia Pedagógico',
'Experimentos estruturados e observação sistemática',
'## Estratégias Principais

### 1. Experimentos Estruturados e Previsíveis
- **Roteiro visual passo a passo**: Fotos de cada etapa
- **Materiais organizados**: Cada item em seu lugar
- **Sequência clara**: Primeiro, depois, então, finalmente
- **Resultados previsíveis**: Evite experimentos com resultados aleatórios inicialmente

### 2. Observação Sistemática
- **Diário de observação com estrutura**: Tabelas, não texto livre
- **Fotos e vídeos**: Documentar processos
- **Listas de verificação**: O que observar especificamente
- **Comparações visuais**: Antes e depois lado a lado

### 3. Conexão com Interesses Especiais
- Se gosta de trens, estude física do movimento
- Se gosta de animais, foque em biologia animal
- Se gosta de clima, explore meteorologia
- Use o interesse como porta de entrada

### 4. Materiais Concretos e Manipuláveis
- **Modelos 3D**: Corpo humano, células, planetas
- **Coleções**: Rochas, folhas, insetos (se apropriado sensorialmente)
- **Lupas e microscópios**: Observação detalhada
- **Terrários e aquários**: Ecossistemas observáveis

### 5. Linguagem Clara e Literal
- Evite metáforas: "O coração é uma bomba" pode confundir
- Use termos científicos corretos e consistentes
- Explique cada palavra nova explicitamente
- Forneça glossário visual

### 6. Ambiente Sensorial Controlado
- Avise sobre experimentos com cheiros fortes
- Permita uso de luvas para texturas desconfortáveis
- Controle ruídos (explosões, estalos)
- Ofereça óculos de proteção confortáveis

### Atividades Práticas
1. **Plantio e Observação**: Crescimento de plantas dia a dia
2. **Experimentos com Água**: Estados da matéria, flutuação
3. **Observação de Animais**: Comportamento, características
4. **Classificação**: Organizar objetos por propriedades

### Adaptações Importantes
- Forneça roteiro escrito e visual
- Permita observação antes de participação
- Aceite diferentes níveis de envolvimento
- Respeite sensibilidades sensoriais
- Documente tudo visualmente

### Recursos Recomendados
Roteiros visuais, Modelos 3D, Lupas, Diário de observação, Materiais de experimento',
'{"autismo", "ciências", "experimentos", "observação", "estruturado"}'),

('Ciências', 'TDAH',
'Como Ensinar Ciências para Alunos com TDAH',
'Guia Pedagógico',
'Experimentos dinâmicos e aprendizado ativo',
'## Estratégias Principais

### 1. Experimentos Práticos e Surpreendentes
- **Reações químicas visíveis**: Vulcão de bicarbonato, slime
- **Experimentos rápidos**: Resultados em minutos, não dias
- **Elementos de surpresa**: "O que vai acontecer?"
- **Hands-on sempre**: Menos teoria, mais prática

### 2. Aprendizado ao Ar Livre
- **Aulas na natureza**: Observação de plantas e animais
- **Coleta de amostras**: Folhas, rochas, insetos
- **Experimentos com movimento**: Física em ação
- **Caça ao tesouro científica**: Encontrar exemplos de conceitos

### 3. Ciência como Investigação
- **Perguntas instigantes**: "Por que o céu é azul?"
- **Hipóteses e testes**: Método científico ativo
- **Competições amigáveis**: Qual ponte aguenta mais peso?
- **Desafios de engenharia**: Construir, testar, melhorar

### 4. Tecnologia e Multimídia
- **Vídeos curtos e impactantes**: Documentários de 5-10 min
- **Apps de ciências**: Simulações interativas
- **Realidade aumentada**: Explorar corpo humano, espaço
- **Fotos e vídeos**: Documentar experimentos

### 5. Variedade e Novidade
- Mude de tema frequentemente
- Use materiais diferentes a cada aula
- Introduza elementos inesperados
- Evite rotina previsível demais

### 6. Conexão com Vida Real
- **Ciência na cozinha**: Química dos alimentos
- **Ciência no esporte**: Física do movimento
- **Ciência na tecnologia**: Como funcionam os aparelhos
- **Ciência no corpo**: Biologia pessoal

### Atividades Práticas
1. **Experimentos Explosivos**: (Seguros!) Reações visíveis
2. **Construção de Modelos**: Foguetes, pontes, circuitos
3. **Observação de Fenômenos**: Chuva, arco-íris, sombras
4. **Jogos Científicos**: Quiz, corrida de conhecimento

### Adaptações Importantes
- Atividades curtas (10-15 minutos)
- Permita movimento constante
- Ofereça pausas ativas
- Use reforço positivo imediato
- Minimize tempo de espera

### Recursos Recomendados
Kit de experimentos, Materiais de construção, Apps de ciências, Equipamento de coleta, Vídeos educativos',
'{"TDAH", "ciências", "experimentos", "prático", "dinâmico"}'),

-- Conteúdos de História para alunos atípicos
('História', 'Autismo',
'Como Ensinar História para Alunos com Autismo',
'Guia Pedagógico',
'Linhas do tempo visuais e conexões concretas com o passado',
'## Estratégias Principais

### 1. Linhas do Tempo Visuais
- **Linha do tempo pessoal primeiro**: Vida do aluno
- **Fotos e imagens reais**: Não apenas texto
- **Escala visual clara**: Distâncias representam tempo
- **Cores para períodos**: Cada época uma cor

### 2. Conexão com o Concreto
- **Objetos históricos**: Réplicas para tocar
- **Visitas a museus**: (Com preparação prévia)
- **Roupas e artefatos**: Tornar tangível
- **Mapas físicos**: Não apenas digitais

### 3. Histórias Estruturadas
- **Começo, meio, fim claros**: Estrutura narrativa
- **Causa e efeito explícitos**: "Isso aconteceu porque..."
- **Personagens principais identificados**: Quem é quem
- **Cronologia linear**: Evite flashbacks inicialmente

### 4. Apoio Visual Constante
- **Mapas sempre disponíveis**: Onde aconteceu
- **Glossário ilustrado**: Termos históricos com imagens
- **Organizadores gráficos**: Tabelas, diagramas
- **Referências visuais**: Linha do tempo na parede

### 5. Conexão com Presente
- **Compare passado e presente**: Fotos lado a lado
- **"Como seria hoje?"**: Traduza para contexto atual
- **Rotinas e vida cotidiana**: Como as pessoas viviam
- **Tecnologia de cada época**: Evolução concreta

### 6. Interesses Especiais como Ponte
- Se gosta de trens, história das ferrovias
- Se gosta de castelos, Idade Média
- Se gosta de dinossauros, pré-história
- Use o interesse para engajar

### Atividades Práticas
1. **Linha do Tempo Pessoal**: Fotos do aluno em ordem
2. **Maquetes Históricas**: Construir cenários
3. **Dramatização Estruturada**: Encenar eventos com roteiro
4. **Comparação Visual**: Antes e depois, ontem e hoje

### Adaptações Importantes
- Forneça roteiro escrito das aulas
- Use linguagem literal e clara
- Permita tempo para processar
- Aceite diferentes formas de demonstrar conhecimento
- Respeite sensibilidades (imagens de guerra podem ser difíceis)

### Recursos Recomendados
Linha do tempo visual, Mapas históricos, Réplicas de objetos, Livros ilustrados, Organizadores gráficos',
'{"autismo", "história", "visual", "linha do tempo", "concreto"}'),

('História', 'TDAH',
'Como Ensinar História para Alunos com TDAH',
'Guia Pedagógico',
'Narrativas envolventes e aprendizado ativo',
'## Estratégias Principais

### 1. História como Narrativa Empolgante
- **Conte como uma história**: Drama, suspense, emoção
- **Personagens interessantes**: Heróis, vilões, aventureiros
- **Conflitos e resoluções**: O que estava em jogo?
- **Detalhes curiosos**: Fatos surpreendentes

### 2. Aprendizado Ativo e Dramatização
- **Teatro histórico**: Encenar eventos
- **Debates**: Diferentes perspectivas históricas
- **Júri simulado**: Julgar personagens históricos
- **Entrevistas**: "Entrevistar" figuras do passado

### 3. Recursos Multimídia
- **Vídeos curtos e dinâmicos**: 5-10 minutos
- **Documentários com ação**: Não apenas narração
- **Jogos históricos**: Simulações, estratégia
- **Realidade virtual**: Explorar lugares históricos

### 4. Conexões com Presente
- **"E se fosse hoje?"**: Traduza para contexto atual
- **Comparações visuais**: Tecnologia, roupas, casas
- **Impacto no presente**: Como o passado nos afeta
- **Linha do tempo até hoje**: Conexão contínua

### 5. Variedade de Formatos
- **Mapas interativos**: Explorar geograficamente
- **Linhas do tempo ilustradas**: Visual e colorido
- **Histórias em quadrinhos**: Eventos em HQ
- **Podcasts históricos**: Para ouvir

### 6. Atividades Curtas e Variadas
- Mude de atividade a cada 10-15 minutos
- Alterne entre visual, auditivo, cinestésico
- Use jogos e competições
- Mantenha ritmo dinâmico

### Atividades Práticas
1. **Linha do Tempo Interativa**: Adicionar eventos
2. **Caça ao Tesouro Histórica**: Encontrar informações
3. **Criação de Jornal**: Notícias de época histórica
4. **Jogos de Tabuleiro**: Sobre períodos históricos

### Adaptações Importantes
- Textos curtos e espaçados
- Permita movimento durante aula
- Use reforço positivo constante
- Ofereça escolhas (qual tema estudar primeiro)
- Celebre curiosidade e perguntas

### Recursos Recomendados
Vídeos históricos, Jogos educativos, Materiais de dramatização, Mapas interativos, Livros ilustrados',
'{"TDAH", "história", "narrativa", "dinâmico", "interativo"}'),

-- Conteúdos de Geografia para alunos atípicos
('Geografia', 'Autismo',
'Como Ensinar Geografia para Alunos com Autismo',
'Guia Pedagógico',
'Mapas concretos e exploração sistemática do espaço',
'## Estratégias Principais

### 1. Do Concreto ao Abstrato
- **Comece com o espaço pessoal**: Sala de aula, escola
- **Maquetes e modelos 3D**: Tornar tangível
- **Mapas táteis**: Com relevo e texturas
- **Progressão gradual**: Casa → rua → bairro → cidade → país → mundo

### 2. Mapas Visuais e Organizados
- **Cores consistentes**: Água sempre azul, floresta verde
- **Legendas claras**: Símbolos explicados
- **Escala visual**: Representação concreta de distância
- **Mapas simplificados**: Não sobrecarregar informação

### 3. Rotinas de Exploração
- **Mesma sequência**: Sempre começar do mesmo jeito
- **Checklist de observação**: O que procurar no mapa
- **Organização espacial**: Tudo em seu lugar
- **Referências fixas**: Norte sempre no mesmo lugar

### 4. Conexão com Experiências Reais
- **Fotos de lugares reais**: Não apenas desenhos
- **Google Earth**: Explorar virtualmente
- **Passeios planejados**: Com mapa e roteiro
- **Localização pessoal**: "Onde você mora no mapa?"

### 5. Interesses Especiais Integrados
- Se gosta de trens, mapas de ferrovias
- Se gosta de animais, habitats e biomas
- Se gosta de clima, mapas meteorológicos
- Use o interesse para motivar

### 6. Linguagem Clara e Específica
- Use termos geográficos corretos
- Explique cada conceito explicitamente
- Evite linguagem figurada
- Forneça glossário visual

### Atividades Práticas
1. **Maquete da Sala/Escola**: Construir modelo
2. **Caça ao Tesouro com Mapa**: Seguir coordenadas
3. **Álbum de Lugares**: Fotos organizadas por região
4. **Quebra-cabeça de Mapas**: Montar países, estados

### Adaptações Importantes
- Forneça mapas de referência sempre
- Permita tempo para processar informações espaciais
- Use apoios visuais permanentes
- Respeite dificuldades com abstração
- Celebre compreensão de conceitos espaciais

### Recursos Recomendados
Mapas táteis, Globo terrestre, Maquetes, Google Earth, Atlas ilustrado',
'{"autismo", "geografia", "mapas", "espacial", "concreto"}'),

('Geografia', 'Dislexia',
'Como Ensinar Geografia para Alunos com Dislexia',
'Guia Pedagógico',
'Mapas visuais e redução de carga de leitura',
'## Estratégias Principais

### 1. Mapas Visuais e Símbolos
- **Minimize texto nos mapas**: Use símbolos
- **Cores para diferenciar**: Regiões, países, biomas
- **Legendas com imagens**: Não apenas palavras
- **Mapas grandes e claros**: Fonte legível

### 2. Apoio Multissensorial
- **Mapas táteis**: Relevo, texturas
- **Globo terrestre**: Manipular e girar
- **Maquetes**: Construir geografias
- **Vídeos e documentários**: Menos leitura, mais visual

### 3. Tecnologia Assistiva
- **Google Earth**: Exploração visual
- **Apps de geografia**: Jogos interativos
- **Áudio-descrição**: Narração de mapas
- **Legendas e símbolos**: Em vez de texto longo

### 4. Organização Visual Clara
- **Um conceito por página**: Não sobrecarregar
- **Espaço em branco**: Não apertar informação
- **Destaque visual**: Cores, marcadores
- **Mapas mentais**: Organizar informações visualmente

### 5. Redução de Leitura
- **Explique oralmente**: Não dependa só de texto
- **Vídeos curtos**: Documentários de 5-10 min
- **Imagens e fotos**: Mostrar em vez de descrever
- **Glossário ilustrado**: Termos com imagens

### 6. Estratégias de Memória
- **Mnemônicos visuais**: Imagens para lembrar
- **Associações**: Conectar com conhecido
- **Mapas mentais coloridos**: Organizar conceitos
- **Repetição espaçada**: Revisar com frequência

### Atividades Práticas
1. **Exploração Virtual**: Google Earth, mapas interativos
2. **Construção de Maquetes**: Geografia física
3. **Jogos de Localização**: Onde fica? Aponte no mapa
4. **Álbum Visual**: Fotos de diferentes lugares

### Adaptações Importantes
- Forneça mapas de referência
- Permita respostas orais
- Use papel colorido (reduz contraste)
- Aceite diferentes formas de demonstrar conhecimento
- Minimize cópias e textos longos

### Recursos Recomendados
Mapas visuais, Globo terrestre, Google Earth, Atlas ilustrado, Materiais coloridos',
'{"dislexia", "geografia", "visual", "mapas", "apoio"}');
