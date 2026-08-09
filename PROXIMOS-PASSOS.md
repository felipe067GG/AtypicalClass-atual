# Banco de questões — onde parou e o que vem

Escrito em 08/08/2026 na branch `importador-enem`; o trabalho está na `main`
desde 09/08/2026. Serve para retomar sem precisar reconstruir o raciocínio.

Conferido de ponta a ponta em 09/08/2026, na `main`: os quatro verificadores
passam, os 105 links respondem, e o banco tem as linhas que esta página diz que
tem. O que não passava está no fim, em "Armadilhas".

## Retomar aqui

Parei em 09/08/2026 com **nada pendente e nada pela metade**: árvore limpa, site
respondendo, e a matriz de adaptação completa. Não há trabalho interrompido para
reconstruir — dá para começar pelo próximo assunto sem ler o resto desta página.

Para conferir em trinta segundos que continua assim:

```bash
git status --short          # vazio
npm run detectores          # código 0
```

**A matriz de adaptação foi completada em 09/08/2026**: 112 células dos 112
pares, as catorze especialidades no teto de 87% de alcance — teto porque 470
questões não disparam barreira nenhuma. A frente seguinte é outra, e está em
"O que sobrou": as 723 questões com figura e sem audiodescrição.

O último commit mexeu em `lib/adaptacao/matriz.ts`, e a mudança é visível no
site: o filtro por especialidade em `/questoes` passa a devolver 3.025 questões
para qualquer um dos catorze alunos, contra as 351 a 2.598 de antes. Se o número
na tela não bater com isso, o deploy é que não subiu.

## Estado

**3.495 questões reais**, em `data/`, todas com conferência limpa
(`node scripts/import-enem/conferir.mjs`).

| acervo | questões | anos | procedência |
|---|---|---|---|
| ENEM | 2.085 | 2010–2023 | resposta conferida em **duas** fontes independentes: a API `enem.dev` e o `TX_GABARITO` dos microdados do INEP |
| Vestibular (USP, UNICAMP) | 1.410 | 2018–2025 | **uma** fonte (BLUEX), declarado em `fonte.validacao` de cada questão |

1.363 com imagem, 686 com audiodescrição oficial, 14 matérias, nenhuma questão
sem matéria. Dificuldade oficial (parâmetro `b` da TRI) em todo o acervo do
ENEM.

Somam-se a elas **280 questões autorais**, escritas aqui e mantidas em acervo
separado (`data/autorais/`), e as **barreiras medidas** de cada uma das 3.495
(`data/barreiras.json`).

**Tudo isso está no ar desde 09/08/2026.** As 43 questões antigas continuam no
site, na aba "Da comunidade", ao lado do que o professor contribui — com a
procedência dita em voz alta e sem o `✓` que vazava o gabarito.

## O que falta, na ordem combinada

### 1. Detectores + matriz barreira × especialidade — **feito em 09/08/2026**

O que torna a adaptação **concreta por questão**, em vez de conselho genérico.
Foi a crítica certa do mantenedor a uma proposta anterior minha: "dê tempo
estendido e leia em voz alta" não adapta *aquela* questão.

**Detectores** (`scripts/detectores/`) — oito medidas por questão, sem opinião,
rodadas nas 3.495. Os limiares são percentis da distribuição do próprio acervo,
não números escolhidos a dedo, e `npm run detectores` reimprime os percentis de
hoje ao lado deles para que nenhum envelheça em silêncio.

| barreira | questões | % |
|---|---|---|
| figura-essencial | 1.409 | 40% |
| muitos-numeros | 915 | 26% |
| periodo-longo | 893 | 26% |
| leitura-longa | 875 | 25% |
| alternativas-longas | 874 | 25% |
| alternativas-numericas | 394 | 11% |
| vocabulario-denso | 360 | 10% |
| cadeia-de-etapas | 351 | 10% |

470 questões (13%) não têm barreira nenhuma, e nenhuma barreira dispara em mais
de 40% — `rodar.mjs` derruba o build se alguma passar de 60% ou cair abaixo de
1%, porque detector que acusa tudo não separa nada.

**Matriz** (`lib/adaptacao/matriz.ts`) — **as 112 células dos 112 pares estão
escritas**, cada uma com fonte que o `check:links` valida. A matriz saiu de 40
para 112 em 09/08/2026, em três rodadas: 12 células para tirar do chão as três
especialidades que estavam em 10%, 57 para preencher o resto, e 3 para fechar.

**As catorze especialidades bateram o teto de alcance: 87%.** O teto não é 100%
porque 470 das 3.495 questões (13%) não disparam barreira nenhuma — para elas
não há o que orientar, e é assim que deve ser. Quem vir 87% e tentar "completar"
vai acabar escrevendo o conselho genérico que a matriz existe para evitar.

**As três últimas células valem por um registro sobre método.** Elas ficaram
declaradas como lacuna por algumas horas — período longo e vocabulário denso em
disgrafia, e período longo em deficiência física — com o argumento de que
comprimento de frase e palavra longa "não passam pela mão". O argumento estava
errado, e o erro é o que interessa: ele tratava a especialidade pelo sintoma
mais visível.

- **Disgrafia não é só traçado.** Quem escreve com esforço produz frases curtas,
  e o período longo é a construção que essa escrita não exercita. E a palavra
  longa é o pior caso da ortografia: ela é *evitada*, não errada — o aluno troca
  "biodisponibilidade" por "aquilo do remédio", e o que se registra é que ele não
  domina o termo.
- **Deficiência física não é só custo de acionamento.** Linha longa é onde o
  acompanhamento visual se perde quando sustentar cabeça e tronco custa esforço,
  e um período de 25 palavras lido em voz alta pede fôlego que nem toda condição
  neuromuscular tem.

Lacuna declarada continua sendo opção legítima — mas precisa sobreviver a uma
segunda leitura, e estas três não sobreviveram.

Duas linhas ficaram com desenho próprio. Em **altas habilidades**, cinco das oito
células não descrevem dificuldade e sim o contrário — a barreira que trava a
turma costuma ser o único ponto da questão que ainda exige algo desse aluno, e a
adaptação é aprofundar ali em vez de aliviar. As outras três são dificuldade de
verdade, por motivos que não valem para mais ninguém: ler rápido demais e pular
a condição da última linha, ler a mais e escolher a alternativa mais elaborada,
e não conhecer a convenção da melhor alternativa. Em **deficiência auditiva**,
a célula de alternativas numéricas diz o contrário do que a barreira diz para
todo mundo: é o único lugar da questão sem segunda língua, e por isso o erro ali
é informativo.

Foram 22 fontes novas, todas já validadas em `lib/specialty-data/` antes de
entrarem aqui — o `check:links` foi de 103 para 105 endereços distintos.

**Uma barreira foi medida e descartada**: comando pela negativa ("assinale a
incorreta"). Existe 1 caso em 3.495 — o ENEM desaconselha item pela negativa na
diretriz de elaboração. A primeira versão do detector procurava a negação no
enunciado inteiro e acusava 922 questões, todas falso positivo. Está registrado
em `medir.mjs` para não ser reintroduzida sem medida.

### 2. 280 questões autorais — **feito em 09/08/2026**

20 por matéria, nas catorze, em `data/autorais/`. Simples, para quem ainda não
alcança uma questão de ENEM. Cada arquivo declara autoria e nível de validação
uma vez, e `npm run autorais` recusa o que não declarar — o problema das 43
antigas nunca foi serem autorais, foi não dizerem que eram.

A letra da alternativa vem da posição na lista, e não de um campo. Isso apaga
de uma vez a classe de erro que o acervo real precisa conferir questão a
questão: letra fora de ordem, letra repetida, gabarito apontando para letra
inexistente. Aqui não há como escrever isso errado.

Dois defeitos que só existem no conjunto também são conferidos: **gabarito
viciado** (nenhuma letra passa de 40% das respostas de uma matéria) e
**correta sempre a mais longa** (o vício clássico de quem escreve item, porque
a resposta certa precisa de ressalva e a distratora não). O segundo pegou
Artes com 9 de 20 na primeira rodada, e foi corrigido.

**Os códigos da BNCC são conferidos contra o documento oficial** por
`npm run bncc`, que baixa o PDF do MEC e extrai os 179 códigos que ele traz.

A conferência pagou o próprio custo na estreia: **dois códigos não existiam**.
`EM13CHS606` numa competência que vai até 605, e `EM13LGG504` numa que vai até
503 — sete questões apontavam para habilidade inexistente. Nenhuma checagem
estrutural pegaria isso: os dois têm forma válida e área coerente com a matéria.
Foram trocados por códigos escolhidos pelo texto da habilidade no documento.

Ler o PDF exigiu três tentativas, e as duas primeiras falharam do mesmo jeito
perigoso — devolvendo pouco texto e **nenhum erro**, o que se parece com "os
códigos não existem" e não com "li errado". As armadilhas, todas registradas em
`conferir-bncc.mjs`: o dicionário de fontes pode vir por referência ou herdado
do nó pai; a largura do código não está no `codespacerange` nem na largura das
chaves do mapa, e sim no `/Subtype` da fonte; e o marcador `/Span<</ActualText<
…>>>` fecha com três `>`, de modo que uma expressão que esperava dois corria
até o `>>` seguinte e apagava páginas inteiras. Por isso o script agora **exige
ler ao menos 100 das 154 páginas** antes de concluir qualquer coisa.

### 3. Gravar no Supabase — **aplicado em 09/08/2026**

O script 08 foi rodado no SQL Editor e o acervo foi enviado: a tabela `questoes`
tem **3.775 linhas** (3.495 reais + 280 autorais), as 2.367 imagens estão no
Storage e o `✓` saiu das 43 antigas — conferido que todo gabarito continua
casando com uma alternativa.

As oito contagens de barreira no banco batem, uma a uma, com `data/barreiras.json`.
A tela foi verificada contra o dado real: 3.495 em provas reais, 280 em autorais,
43 na comunidade, 1.217 com orientação para discalculia, 351 para altas
habilidades, 81 em Filosofia.

O código foi publicado na `main` em 09/08/2026, o que dispara o deploy da Vercel.

**A mudança de fundo: especialidade deixou de ser coluna da questão.** Em
`questions`, cada linha é uma questão *para uma especialidade* — "Contagem com
Maçãs" é de Matemática e é do Autismo. Uma questão do ENEM não é "do autismo".
Por isso a tabela nova **não tem coluna de especialidade**, e a ausência é a
parte importante do desenho: mantê-la obrigaria a inventar uma especialidade
para cada uma das 3.495. O que muda por aluno é a orientação, que vem da matriz
e é escolhida pelas barreiras medidas.

Na tela, o filtro por especialidade passou a fazer outra pergunta — não "esta
questão foi feita para o autismo?", que era falsa, mas "as barreiras desta
questão têm orientação escrita para este aluno?", que é verificável.

- `scripts/08-acervo-de-questoes.sql` — tabela `questoes`, com três regras do
  acervo escritas como restrição do banco: toda questão declara o nível de
  validação da resposta; autoral não pode ter dificuldade medida; autoral tem
  de ter âncora na BNCC. Também tira o `✓` que vazava o gabarito nas 43 antigas,
  das duas pontas ao mesmo tempo — limpar só uma quebraria a comparação da tela.
- `npm run enviar` — 3.775 linhas. **Não escreve nada sem `--confirmar`.**
- `/questoes` — três acervos separados de verdade: provas reais, autorais e o
  da comunidade (que continua na tabela antiga, para a contribuição do professor
  não sumir do site). Paginado de 24 em 24, com filtro no servidor.

**Todas as imagens são servidas daqui.** As 925 do vestibular eram 92 MB de
base64 dentro do JSON; as 1.442 do ENEM apontavam para `enem.dev`. As 2.367
estão no Storage, e **nenhuma das 1.409 questões com figura depende mais de
terceiro** — a coluna `imagens_em` diz `storage` em todas. Isso inclui as 570
imagens que moram dentro das alternativas, em 114 questões: trazer só as do
enunciado faria a linha declarar `storage` com parte ainda fora, e declaração
que vale pela metade é pior que nenhuma.

A rehospedagem achou um defeito antigo no acervo: **uma URL malformada** em
2010 q168, com a legenda do markdown colada no endereço
(`...png "imagem (Foto: Reprodução/Enem`). Ficou invisível por meses porque
endereço quebrado só falha quando alguém busca a imagem — na tela, figura que
não carrega parece problema de rede. O conferidor agora recusa URL de imagem com
espaço ou aspa.

**Um defeito antigo apareceu no caminho:** as 2.085 questões do ENEM tinham as
duas fontes registradas mas **nunca declaravam** que tinham — quem declarava era
só o vestibular, com "fonte única (BLUEX)". Uma questão sem declaração podia ser
tanto uma conferida duas vezes quanto um descuido, e as duas ficavam iguais na
leitura. `declarar-validacao.mjs` fechou isso nas 2.085, e o conferidor agora
exige a declaração dos dois acervos.

A matriz **não vai para o banco**: vive em `lib/adaptacao/matriz.ts` e é lida
pelo site, porque é conteúdo com fonte e muda com revisão, não com importação.

## O que sobrou

**A matriz deixou de ser a frente aberta.** Está completa: 112 de 112 pares, as
catorze especialidades no teto de alcance, nada declarado como lacuna.

O que existe daqui para a frente é de outra natureza, e nada disso está
começado:

- **As 723 questões com figura e sem audiodescrição** (de 1.409 com figura).
  Enquanto não têm descrição, para um aluno cego não são questões difíceis: são
  questões indisponíveis, como diz a célula de figura × deficiência visual.
  É o maior buraco de acessibilidade que resta no acervo.
- **Revisar as células com o professor que usa.** As 109 foram escritas a partir
  das fontes e da medida; nenhuma passou ainda pelo teste de alguém aplicando em
  sala e dizendo o que não serviu.
- **Uma nona barreira**, se o uso mostrar que falta alguma. A régua está em
  `medir.mjs`: mede-se primeiro, e só entra o que separar questões de verdade —
  foi assim que o comando pela negativa foi medido e descartado.

Cada célula nova exige fonte que o `npm run check:links` valide, e `npm run
detectores` reimprime o alcance, então dá para medir o efeito de cada uma.

## Regras que valem para qualquer conteúdo novo

- **Nada entra sem fonte que o `npm run check:links` consiga validar.** Vale
  para guias de adaptação como vale para o conteúdo das especialidades. Em
  `lib/adaptacao/tipos.ts` a regra está no tipo, e `conferirGuias()` recusa
  afirmação sem citação — ao longo de duzentos textos, confiar na memória de
  quem escreve é como a primeira afirmação sem fonte entra.
- **Blog comercial não serve como fonte.** O critério é o já usado no site:
  IES/What Works Clearinghouse, NCII, ERIC, órgãos oficiais.
- **Rótulo de matéria declara a origem** em `origemDaMateria`: `oficial`
  (só língua estrangeira no ENEM, e as provas de vestibular), `leitura`
  (li a questão) ou `vocabulário` (classificador automático).

## Armadilhas já pagas, para não repetir

- **A cor do caderno embaralha a ordem das questões dentro de cada área.** A 91
  do azul não é a 91 do amarelo. Qualquer casamento entre fontes precisa
  identificar o caderno antes — é o que `identificarCaderno()` faz, exigindo
  90% de concordância com o gabarito.
- **Regras de segurança rejeitaram dado bom quatro vezes**: exigir 100% de
  concordância, exigir "2,5× o segundo colocado" (impossível, taxa vai a 1,0),
  incluir `|` na lista de símbolos de texto corrompido (aparece no rodapé de
  toda página), e filtrar espanhol dos microdados (a API devolve espanhol).
  Nenhuma deixou entrar dado ruim, mas todas custaram horas apontando para o
  lugar errado.
- **Não voltar para o parser de PDF.** Colunas embaralhadas, fonte cifrada com
  deslocamento de 29 no código do caractere, três convenções de nome de arquivo
  e a prova digital disfarçada de impressa. A API resolveu tudo isso e ainda
  triplicou o acervo.
- **CRLF quebrou o conferidor dos detectores, e o erro apontou para o lugar
  errado.** No Windows o `core.autocrlf` grava CRLF na cópia de trabalho embora
  o índice guarde LF, então trocar de branch reescreve os `.ts` que os scripts
  leem como texto. Em `rodar.mjs`, a expressão que lê o `BarreiraId` terminava
  em `\n\n`, deixou de casar, e o script acusou que **nenhum dos oito
  detectores existia** em `barreiras.ts` — com o vocabulário intacto o tempo
  inteiro. `npm run detectores` saía com código 1 e não gravava nada. Corrigido
  normalizando a quebra de linha na leitura (`lerFonte`), o que também protege
  as outras duas fontes lidas ali. Script que lê `.ts` como texto normaliza na
  leitura; não adianta lembrar de escrever `\r?\n` em cada expressão nova.
- **`npm run enviar -- --confirmar` sem `--rehospedar-enem` desfaz a
  rehospedagem.** Os JSON locais ainda guardam as URLs do `enem.dev` — o que
  mudou foi o banco, não o acervo em disco. Rodar o envio sem a flag reescreve
  802 linhas de volta para `imagens_em = 'externo'` e derruba a afirmação de que
  nenhuma questão com figura depende de terceiro. **A forma completa é a
  correta**; a curta só serve quando nada de imagem mudou.
- **2016 e 2017 do ENEM ficam de fora**: a numeração da API não corresponde a
  caderno nenhum desses anos (bate 31% e 28%, contra 20% do acaso). 2009 não
  tem microdados no endereço padrão.

## Comandos

```bash
node scripts/import-enem/conferir.mjs              # confere os dois acervos
node scripts/import-enem/importar.mjs 2023 CN      # importa uma área de um ano
node scripts/import-enem/aplicar-leituras.mjs      # aplica materias-lidas.json
node scripts/import-vestibular/importar.mjs        # reimporta USP e UNICAMP
node scripts/import-enem/recuperar-descricoes.mjs  # audiodescrições do INEP
npm run detectores                                 # mede as 3.495 e confere a matriz
npm run autorais                                   # confere as 280 questões autorais
npm run bncc                                       # confere os códigos da BNCC no PDF oficial
npm run check:links                                # valida todas as fontes
npm run enviar                                     # ensaio: relata sem escrever
npm run enviar -- --confirmar --rehospedar-enem    # grava no Supabase (forma correta)
npm run enviar -- --confirmar                      # sem a flag acima, devolve 802 linhas para 'externo'
```
