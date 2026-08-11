# Banco de questões e biblioteca de conteúdos — onde parou e o que vem

Escrito em 08/08/2026 na branch `importador-enem`; o trabalho está na `main`
desde 09/08/2026. Serve para retomar sem precisar reconstruir o raciocínio.

---

# ⏵ RETOMAR AQUI — biblioteca de conteúdos (10/08/2026)

**A frente aberta é a biblioteca de conteúdos, e ela não está no ar.** O banco de
questões está fechado; a parte de baixo desta página é sobre ele e não precisa
ser lida para continuar.

## O próximo passo, já decidido

**Ligar vídeos formativos às 98 células da matriz de conteúdos.** O mantenedor
escolheu esta opção em 10/08/2026, entre:

1. ✅ **escolhida** — vídeo formativo por célula da matriz, cobrindo as catorze
   especialidades com material sobre *como aplicar* aquela adaptação;
2. ❌ parar a curadoria com uma especialidade servida e as treze restantes
   contando só com a matriz escrita.

O que isso implica, e ainda não foi feito: **vídeo passa a existir em dois
lugares** — no conteúdo (aula da matéria acessível ao aluno) e na célula da
matriz (formação do professor). São dois papéis diferentes e o modelo precisa
distingui-los, como já distingue `paraEspecialidade` de vídeo geral.

**89 das 98 células já têm vídeo formativo** (10/08/2026), todas aguardando
alguém assistir. O modelo está em `VideoFormativo`, em `lib/conteudos/matriz.ts`.

### O campo que impede o conselho genérico

`porQue` é obrigatório e diz por que o vídeo serve **àquela célula**. Com um
acervo colhido por especialidade, a tentação é pendurar o mesmo vídeo de dislexia
nas sete células de dislexia — sete ligações, nenhuma sobre a exigência. O
`npm run conteudos` recusa: `porQue` repetido dentro da mesma especialidade é
acusado como "ligação feita pela especialidade, não pela célula".

| especialidade | células | fonte |
|---|---|---|
| **autismo** | **7 de 7** | DIVERSA |
| **deficiência intelectual** | **7 de 7** | DIVERSA |
| **dislexia** | **7 de 7** | International Dyslexia Association |
| **deficiência visual** | **7 de 7** | DIVERSA + TSBVI |
| **surdocegueira** | **7 de 7** | Perkins + TSBVI |
| **saúde mental** | **7 de 7** | Anna Freud |
| **síndrome de Down** | **7 de 7** | DSE + DIVERSA + DSRF |
| **discalculia** | **7 de 7** | Dyscalculia Network + NCII |
| **disgrafia** | **7 de 7** | Understood + Reading Rockets + IRIS |
| tdah | 6 | CHADD + Understood + DIVERSA + NCII |
| deficiência física | 6 | DIVERSA + AssistiveWare |
| transtorno de linguagem | 5 | RADLD + ASHA + IRIS |
| deficiência auditiva | 5 | DIVERSA + Reading Rockets + IRIS |
| altas habilidades | 4 | NAGC + DIVERSA + IRIS |

**Nove especialidades completas, e a lacuna quase sempre era da fonte, não da
especialidade.** Saúde mental saiu de 0 para 7 de 7 com o Anna Freud; discalculia
de 4 para 7 com o NCII; síndrome de Down e disgrafia fecharam com DSRF e IRIS.
Foram doze fontes novas em duas rodadas — Reading Rockets, AssistiveWare, TSBVI,
ASHA, Anna Freud, Johns Hopkins CTY na primeira; TV INES, DSRF, NCII, IRIS
Center, Speech and Language UK e Belin-Blank na segunda.

### Cinco ligações foram desfeitas depois de feitas

A página do DIVERSA dá o **id** e não o título do vídeo, então o assunto da
página é hipótese até o oEmbed responder — e quando a página embute mais de um
vídeo, o primeiro id nem sempre é o do assunto. Em cinco casos o oEmbed devolveu
outra coisa: a página falava de pesquisa como produção e o vídeo era
institucional; falava de musical encenado e o vídeo era um panorama de escola;
falava de uma aluna cega palestrando e o vídeo era "Palestra Quintiliano 2017".
Foram removidas — manter seria escrever um `porQue` sobre um vídeo que ninguém
confirmou, que é o erro que o título deslocado do portal do IMPA quase produziu.

**Cuidado ao refazer:** as quatro primeiras voltaram sozinhas na rodada seguinte,
porque continuavam na lista do script de ligação. Tirar da matriz sem tirar da
lista não resolve.

### As 9 restantes, e por que param aqui

Seis fontes novas foram declaradas e varridas de propósito para fechá-las, e
fecharam dez das dezenove. Estas nove sobraram, e **cada uma foi procurada com
termo próprio antes de ser declarada lacuna**:

| especialidade | células | o que falta, e o que fecharia |
|---|---|---|
| altas habilidades | 3 | vocabulário técnico, representação visual, leitura extensa. Precisa de material sobre **aprofundar dentro da unidade** — o NAGC e o CTY publicam institucional e socioemocional, e o Belin-Blank publica prêmio e identificação. Fonte provável: Renzulli Center (UConn), Purdue GER2I, William & Mary. |
| deficiência auditiva | 2 | sequência de passos (conectivos) e representação visual (legenda e rótulo como segunda língua). O TV INES entrou e é rico, mas publica **conteúdo para o aluno**, não formação do professor. |
| transtorno de linguagem | 2 | representação visual e prática concreta — as duas pedem *vocabulário para descrever o que se vê*. A Speech and Language UK entrou e é campanha; a RADLD é conscientização. |
| tdah | 1 | vocabulário técnico: pré-resolver o termo **fora** do texto. O que há é desenvolvimento de vocabulário como rotina, que é outra coisa. |
| deficiência física | 1 | abstração simbólica: **produzir notação** por varredura ou acionador. O acervo de CAA trata de fala e texto, não de subscrito e fração. |

**O TV INES é o caso que vale guardar.** Entrou com 17 playlists e 405 vídeos —
"de olho na ciência", "Contação de Histórias", "Manuário" — e nada disso foi para
a matriz. É aula em Libras **para o aluno**, e o `VideoFormativo` existe
justamente para não se confundir com isso: vídeo de conteúdo mora em
`data/conteudos`, vídeo de formação mora na célula. Pendurar "O Sistema Solar em
Libras" numa célula colapsaria a distinção que o modelo inteiro sustenta. **Esse
acervo deve ser lido como candidato a vídeo de conteúdo**, e é uma frente
separada — Ciências em Libras é exatamente o que falta no acervo do aluno.

Forçar as nove faria voltar o conselho genérico que o `porQue` existe para
impedir, e estragaria as 89 que estão certas.

**Uma terceira rodada foi tentada e não fechou nenhuma.** Quatro canais novos,
procurados desta vez **pelo assunto da célula** e não pelo rótulo de diagnóstico:
Purdue GER2I, DCMP (US Dept. of Education), AEM Center (CAST) e DO-IT (UW). O
resultado está comentado em `canais.mjs`, ao lado de cada um, e o mais útil é o
que ele fecha como assunto:

- **Altas habilidades é conclusão, não azar.** O Purdue tem uma playlist e ela é
  lip sync de monitores e anuário. É o **quarto** canal de altas habilidades —
  com NAGC, CTY e Belin-Blank — a publicar comunidade em vez de didática. A
  didática de enriquecimento parece viver em livro, curso pago e artigo, não em
  vídeo aberto. Quem tentar de novo comece por aí, e não por mais um canal.
- **O AEM Center trata de obter material acessível**, não de produzir notação:
  compra, PEI, autoadvocacia. É outra pergunta.
- **O DO-IT tem "Alternative Keyboards"**, que é ergonomia e destreza — acesso
  físico em geral, e caberia igual na célula de produção do aluno. Reprova no
  mesmo teste dos outros três.
- **O DCMP tem material bom que não serve a estas células**: "Vocabulary
  Builders in Sign Language", seis vídeos por matéria, e "Captions Help Children
  Learn To Read". Vocabulário × deficiência auditiva já está fechada — **isto vai
  para o acervo do aluno**, junto com o TV INES.

São **dez canais declarados em três rodadas** para estas nove células. A lacuna é
de material publicado, e está medida.

**O Clerc Center (Gallaudet) está declarado em `canais.mjs` e não serve.** Foi
colhido — 26 vídeos em 3 playlists, dentro de `playlists.json` —, mas os 26
títulos foram resolvidos um a um pelo oEmbed e **todos** são institucionais:
plano estratégico, cúpulas de advocacy, town hall de funcionários, aniversário de
escola. Fica declarado aqui para ninguém recolher esperando material de sala. Era
a única fonte de deficiência auditiva fora do DIVERSA, e é por isso que as três
células dela continuam abertas.

**Três candidatos foram recusados no teste do `porQue`,** e valem como exemplo do
que a régua rejeita:

- *"With today's technology is handwriting instruction important?"* (Reading
  Rockets) para leitura extensa × disgrafia — a descrição defende **instrução
  explícita de caligrafia**, o contrário do que a célula pede, que é separar a
  demonstração da leitura da resistência de traçado. O título sozinho não
  mostrava isso.
- *"BCRP 2: Supporting language in the classroom"* (RADLD) para representação
  visual × transtorno de linguagem — é sobre apoio à linguagem na sala em geral,
  e serviria igualmente a três outras células de TDL. Serve a várias, logo não
  serve a esta.
- *"Setting up Prediction in Proloquo4Text"* (AssistiveWare) para abstração
  simbólica × deficiência física — predição de **palavra**, não de notação, e
  cabe melhor na célula de produção do aluno, que já está ocupada.

### As dez que fecharam com fonte nova (segunda rodada)

Seis canais declarados em `canais.mjs`, todos verificados antes de entrar:

| célula | vídeo | fonte |
|---|---|---|
| leitura extensa × disgrafia | *PALS High School: Partner Reading with Retell* | IRIS Center |
| leitura extensa × def. auditiva | *PALS High School: Paragraph Shrinking* | IRIS Center |
| sequência de passos × altas habilidades | *Metacognitive Strategies: High School* | IRIS Center |
| abstração simbólica × altas habilidades | *Presenting and Comparing Multiple Solutions Strategies* | IRIS Center |
| abstração simbólica × TDL | *Explicit, Systematic Instruction: Elementary* | IRIS Center |
| sequência de passos × síndrome de Down | *Successful Strategies: Memory, Phonological Awareness…* | DSRF |
| leitura extensa × discalculia | *A tutor and student work on word problems* | NCII |
| vocabulário técnico × discalculia | *A tutor and student add fractions with unlike denominators* | NCII |
| produção do aluno × discalculia | *A student independently solves an addition problem with fractions* | NCII |
| abstração simbólica × tdah | *Error Analysis in Math: Using Student Work* | NCII |

**A armadilha do `@dseinternational` reapareceu, e por pouco.** `@TVINES` é um
canal de nome "tvines" que **não** é o TV INES; o verdadeiro é
`UCUcf1gG-ph6k_rbTMZBN60A`. Foi conferido contra os 9 vídeos do TV INES que já
estavam no acervo de conteúdos — o acervo já validado é o melhor conferidor de
canal que existe aqui, melhor que o oEmbed, que só prova que o id pertence ao
canal e não que o canal seja a instituição.

**Um vídeo de 15 segundos foi recusado depois de escolhido.** "Mr. Flores asks
how to help students understand fraction concepts" tinha o assunto certo para
vocabulário × discalculia, e a duração denunciou o que o título não dizia: é a
pergunta de abertura do módulo, não a resposta. Foi trocado pelo exemplo de 501
segundos. **Duração é sinal de conteúdo**, e o campo já estava lá.

### As cinco que fecharam com playlist não triada (primeira rodada)

O que destravou não foi triagem nova: foi **playlist que nunca tinha sido
triada** dentro de canal já colhido. `triagem.json` é subconjunto curado de
`playlists.json` — a playlist entra pelo título, e título institucional foi
descartado na primeira passada. Reabrir três desses descartes fechou cinco
células e três especialidades inteiras.

| célula | vídeo | de onde |
|---|---|---|
| vocabulário técnico × saúde mental | *Supporting students' mental health through everyday interactions* | Anna Freud, Schools in Mind |
| representação visual × saúde mental | *Young People and Traumatic Events* | Anna Freud, Schools in Mind |
| vocabulário técnico × surdocegueira | *Tania's Two Month Review of Calendar* | TSBVI, playlist não triada |
| produção do aluno × surdocegueira | *Tania Signs Daily Tactile Calendar* | TSBVI, playlist não triada |
| produção do aluno × deficiência visual | *Low Vision Tools in ONE Minute: Chromebook — Select-to-Speak & Dictation* | TSBVI, playlist não triada |

O calendário tátil da Tania é o caso mais claro: a célula de vocabulário ×
surdocegueira diz que construir o referente **é o cronograma**, e o vídeo é a
revisão de dois meses desse calendário. Nenhum vídeo de "surdocegueira em geral"
diria isso.

**O TSBVI ainda tem acervo não triado que ninguém olhou:** código Nemeth (8),
capítulos de ábaco (~40), TI-84 falante (17), compassos e pranchas de desenho em
relevo (~15), sólidos de Platão (7). É material de matemática acessível, e as
células que ele serviria — deficiência visual e surdocegueira — já estão em 7 de
7. Fica registrado porque é bom demais para se perder, não porque falte onde usar.

### Um link quebrou hoje, e não era bloqueio de robô — **resolvido em 10/08/2026**

`https://www.invivo.fiocruz.br/` — usado como fonte em **seis** conteúdos de
Biologia, já na `main` — passou a falhar no `npm run check:links` em 10/08/2026,
depois de ter passado várias vezes no mesmo dia. Não entrou em
`CONFIRMED_BLOCKED` de propósito: aquela lista perdoa 403 de robô, e certificado
inválido é aviso vermelho no navegador do professor.

**O certificado dizia o que tinha acontecido.** É um curinga `*.fiocruz.br`
emitido pela RNP **naquele mesmo dia, às 17:01 GMT** — o que explica ter passado
de manhã e falhar à tarde. Curinga cobre **um nível** de subdomínio, então
`invivo.fiocruz.br` casa e `www.invivo.fiocruz.br` não.

**Tirar o `www.` não resolvia, e essa é a parte que quase enganou.**
`https://invivo.fiocruz.br/` valida o TLS, mas responde **301 para o host `www`**
— o próprio site devolve o professor para o endereço que o navegador recusa. Não
havia porta de entrada boa; a fonte tinha de sair.

Trocada pelo **Museu da Vida / Fiocruz** (`https://museudavida.fiocruz.br/`), nos
seis. É a mesma instituição e o mesmo papel — divulgação científica para a
escola, que era o que o rótulo do InVivo dizia — e o `www` dele **está** no
certificado, porque `*.museudavida.fiocruz.br` é uma das entradas do SAN. Os seis
já citavam `portal.fiocruz.br` ao lado, que nunca falhou.

Quatro dos seis tinham o rótulo curto "InVivo / Fiocruz", que não dizia o papel
da fonte; os seis ficaram com o rótulo descritivo.

### A aba /videos engana; as playlists não

O primeiro acervo tinha 362 candidatos e quase não servia: o coletor pegava os 30
vídeos **mais recentes** de cada canal, e o que instituição publica de mais
recente é campanha, notícia e podcast. O Understood devolveu 30 episódios de
podcast sobre TDAH e **nenhum** sobre disgrafia, que era o motivo de ele estar na
lista; a PAHO devolveu HIV e amamentação; o NAGC, "Volunteer Appreciation Week".

`npm run canais -- --playlists` colhe por playlist — **200 playlists, 2.901
vídeos** — e a playlist é organizada por assunto pela própria instituição, o que
faz do título dela a unidade de triagem. Foi assim que "For Educators" (CHADD),
"Tips & Tools" (Understood) e "Supporting DLD" (RADLD) apareceram.

**Um erro que a conferência automática não pega:** `@dseinternational` **não** é
a Down Syndrome Education International — é um canal de moda. Ele passou pelo
oEmbed porque o oEmbed prova que o id pertence àquele canal, e não que o canal
seja a instituição declarada. Nome parecido bastou. A verdadeira é
`@DseinternationalOrg`.

## De onde vêm os candidatos

Duas varreduras, nenhuma delas escolhe vídeo — as duas produzem lista com
procedência, e quem escolhe é quem assiste.

```bash
npm run diversa    # varre o diversa.org.br pelo mapa do site
npm run canais     # colhe os canais institucionais declarados
```

**`data/formacao/triagem.json` não tem script que o produza**, e é o único dos
quatro arquivos nessa situação — nenhum lugar de `scripts/` o menciona. Ele foi
montado à mão a partir de `playlists.json`: escolhem-se as playlists cujo título
promete material de sala e resolvem-se os títulos dos vídeos por oEmbed, porque
`playlists.json` guarda **só ids**. Quem apagar o arquivo perde as 891 escolhas,
e não há como regerá-lo. Rever essas escolhas é barato e rende: foi reabrindo
três playlists descartadas por título institucional que cinco células fecharam.

`data/formacao/diversa.json` — 1.516 páginas lidas, **303 com vídeo próprio**,
**102 com vídeo e especialidade que casa com a nossa**. Entra-se pelo
`wp-sitemap.xml`; a API REST do WordPress do DIVERSA responde 200 e **mente por
omissão** (expõe 1 post e 46 páginas, porque os tipos próprios não estão
registrados nela). A taxonomia `especificidades` do DIVERSA cobre oito das nossas
catorze; `paralisia-cerebral`, `multiplas-deficiencias` e `outras` **não** foram
casadas, porque casá-las seria tratar a especialidade pelo sintoma mais visível.

`data/formacao/canais.json` — **362 candidatos em 13 canais**, para as seis que o
DIVERSA não cobre e para as três que ele cobre pouco. Cada id é confirmado pelo
oEmbed contra o nome do canal: id que veio da página de um canal e pertence a
outro é bloco de recomendação, e sai da lista ali.

| especialidade | DIVERSA | canais | fonte dos canais |
|---|---|---|---|
| saúde mental | — | 60 | PAHO TV (OPAS/OMS), UNICEF Brasil |
| transtorno de linguagem | — | 58 | RADLD, ASHA |
| dislexia | — | 51 | Instituto ABCD, IDA |
| autismo | 47 | — | |
| síndrome de Down | 3 | 44 | Movimento Down, DSE International |
| deficiência intelectual | 43 | — | |
| altas habilidades | 3 | 30 | NAGC |
| tdah | 3 | 29 | Help for ADHD (CHADD) |
| discalculia | — | 30 | The Dyscalculia Network |
| disgrafia | — | 30 | Understood |
| surdocegueira | — | 30 | Perkins School for the Blind |
| deficiência física | 25 | — | |
| deficiência visual | 24 | — | |
| deficiência auditiva | 17 | — | |

**A taxonomia não dá o eixo da exigência.** O DIVERSA classifica por
especificidade, dimensão, segmento e série, e o canal não classifica nada. As 7
exigências continuam sendo leitura, como foram nas células escritas.

## Estado em 10/08/2026

| peça | estado |
|---|---|
| **170 conteúdos**, 13 das 14 matérias (Matemática com 26) | ✅ 156 na `main`, 14 novos não commitados |
| **41 vídeos**, 33 acessíveis e 8 gerais | ✅ marcados, não commitados |
| matriz de conteúdos, 98 de 98 células | ✅ na `main` |
| verificadores (`conteudos`, `videos`, BNCC EF+EM) | ✅ na `main` |
| 17 vídeos, **assistidos e aprovados em 10/08/2026** | ✅ marcados, não commitados |
| vídeo acessível de Matemática | ❌ não existe — ver abaixo |
| candidatos a vídeo formativo, ~6.100 em 25 canais | ✅ colhidos (`playlists.json`) |
| triagem por playlist, 891 candidatos com título | ✅ curada (`triagem.json`) |
| vídeo formativo escolhido por célula | ⏳ **89 de 98** — 9 especialidades em 7 de 7 |
| vídeo formativo aprovado | ✅ **89 de 89**, em bloco — ver abaixo |
| matriz de conteúdos ligada ao site | ✅ `/conteudos?especialidade=…` |
| tabela `conteudos` no Supabase | ✅ **170 linhas no ar** |
| página `/conteudos` | ✅ lê a biblioteca; as 11 antigas viraram "Da comunidade" |

Educação Física fica em zero por decisão do mantenedor — o conferidor a lista
como "nenhum", que é lacuna declarada e não esquecimento.

## Os 89 vídeos formativos foram aprovados, e o dado diz como (11/08/2026)

Todos com `revisado: true`, `revisadoPor` e `revisadoEm`. O `revisadoPor` diz
**"aprovação em bloco da matriz, sem visionamento individual"**, palavra por
palavra — que é a mesma fórmula usada nos 7 vídeos de Matemática em Libras, e
não a dos 17 que foram assistidos um a um.

Escrever o texto dos 17 aqui faria o acervo afirmar que alguém assistiu 89
vídeos, e **esse é o defeito das 43 questões antigas**: o problema nunca foi
serem o que eram, foi não dizerem o que eram. Quem for revisar um a um depois
sabe exatamente quais ainda não passaram por isso.

A fila (`npm run conteudos`) está vazia nos dois acervos: 41 vídeos de conteúdo e
89 formativos, nenhum aguardando.

## A matriz de conteúdos passou a aparecer no site (11/08/2026)

Escolher o aluno em `/conteudos` **não filtra a biblioteca** — os 170 conteúdos
continuam à vista. O que muda é o que o plano de aula passa a dizer: para cada
exigência daquele conteúdo, a célula da especialidade escolhida entra com
`oQueSignifica`, `oQueFazer`, as fontes e o **vídeo formativo com o `porQue`**.

O cruzamento é pela **exigência**, e não por uma coluna de especialidade no
conteúdo — a pergunta que a tela faz é "este conteúdo exige algo que tem
orientação escrita para este aluno?", que é verificável, e não "este conteúdo é
do autismo?", que era falsa. Mesmo desenho de `/questoes`.

A especialidade vive na URL (`?especialidade=dislexia`), para o professor poder
mandar o endereço ao colega. **Sem especialidade escolhida a seção não aparece** e
o servidor nem manda as células: orientação sem aluno escolhido é o conselho
genérico de volta, e a matriz inteira são 98 células em três idiomas.

Conferido servindo o build: com `?especialidade=dislexia` a página cresce 18 KB e
traz o texto das células, o título do vídeo formativo e o `porQue`; sem o
parâmetro, nada disso vai. Todos os 170 conteúdos recebem ao menos uma orientação
para dislexia, porque as 7 exigências dela estão preenchidas.

**Cuidado ao conferir isto no navegador:** `next start` não substitui um servidor
já rodando — ele falha com `EADDRINUSE` e **o processo velho continua
respondendo**, servindo o build anterior. A primeira conferência aqui deu "nada
chegou ao cliente" por isso, com o código certo em disco. No Windows o `pkill`
não resolve; é `Get-NetTCPConnection -LocalPort 3000` e `Stop-Process`.

## A biblioteca foi ao ar (11/08/2026)

`scripts/09-biblioteca-de-conteudos.sql` cria a tabela `conteudos` e
`npm run enviar:conteudos` a preenche. **170 linhas, 13 matérias, 41 vídeos e
427 fontes**, conferidas relendo do banco. Como em `questoes`, o script não
escreve nada sem `--confirmar`.

**A matriz não vai para o banco**, pelo mesmo motivo da matriz de questões: vive
em `lib/conteudos/matriz.ts`, porque é conteúdo com fonte que muda por revisão e
não por importação.

**Mas ela não estava ligada a lugar nenhum, e isso passou despercebido.** A
matriz de questões é importada por `/questoes`; a de conteúdos **não era
importada por arquivo nenhum** de `app/` — 98 células escritas, 89 vídeos
escolhidos, e nada disso aparecia no site. Um `grep` de trinta segundos mostrou o
que a afirmação "vive no código e é lida pelo site" escondia: metade dela era
verdade. Ligada em 11/08/2026, no mesmo desenho de `/questoes`.

### Cinco regras viraram restrição do banco

Fonte obrigatória, âncora na BNCC, exigência declarada, plano com etapas e
duração, e **vídeo não revisado não entra**. A última precisou de função
`IMMUTABLE` (`conteudos_videos_revisados`), porque CHECK não aceita subconsulta e
conferir cada item de um array JSON exige percorrê-lo.

**Duas das cinco não recusavam nada, e pareciam certas.** `array_length(bncc, 1)
>= 1` devolve **NULL** para o array vazio, e CHECK que resulta em NULL é
considerado satisfeito — a restrição existia, tinha o nome certo e aceitava
`'{}'`. O mesmo valia para `exigencias`. Corrigidas para `cardinality()`, que
devolve 0.

Só apareceu porque as cinco foram testadas uma a uma, com `INSERT` de linha ruim
dentro de transação desfeita. **Restrição que nunca viu uma linha ruim é
suposição, não garantia** — e é barato transformar em garantia.

### A tabela antiga não foi apagada

`content` continua recebendo a "Dica Pedagógica" que o professor publica por
`app/actions/posts.tsx`. As onze linhas antigas passam a aparecer em "Da
comunidade", separadas da biblioteca — mesma decisão de `/questoes`, e pelo mesmo
motivo: apagar a contribuição do professor para estrear a biblioteca seria trocar
uma coisa pela outra sem ele ter pedido. O contador da home soma as duas.

## Os 17 vídeos foram assistidos e aprovados (10/08/2026)

Todos os 17 estão com `revisado: true`, `revisadoPor` e `revisadoEm` — 9 do
**TV INES** (Libras, INES/MEC) e 8 do **Portal da Matemática OBMEP/IMPA**. A
fila (`npm run videos -- --fila`) está vazia, e o envio ao Supabase deixou de ter
vídeo como impedimento.

### Matemática não tem nenhum vídeo acessível, e as outras seis só têm disso

A revisão levantou uma assimetria que o acervo não declarava em lugar nenhum:

| matéria | acessível a uma especialidade | videoaula geral |
|---|---|---|
| biologia, física, química, filosofia, geografia, história | 9 | 0 |
| **matemática** | **0** | **8** |

Os oito de Matemática **estão certos como estão**: são videoaulas comuns do
Portal da Matemática, servem a turma inteira, e por isso não declaram
`paraEspecialidade` — é o que o tipo manda. O problema não é o dado, é a
cobertura: Matemática é a matéria com mais vídeos e a única sem nenhum acessível.

O que a procura por material acessível de Matemática encontrou, em 10/08/2026:

- **O INES não tem videoaula curricular de Matemática.** O portal DEBASI
  (`debasi.ines.gov.br/oficina-de-matemática`, já fonte citada aqui) embute
  quatro vídeos do TV INES, e três deles documentam um projeto de sala
  ("Colecionando Tampinhas"), não ensinam conteúdo. É registro de experiência,
  não aula.
- **O material que existe não é institucional.** A playlist
  `[Libras e LSE] - Matemática` reúne 26 vídeos exatamente do que falta — número
  decimal, operações com naturais, inteiros negativos, múltiplos e divisores, em
  Libras e legenda —, mas os vídeos são de **canais de professores individuais**
  (Gis com Giz, Matemática com Demóclis Rocha, Matemática no Papel, Prof. Rodrigo
  Ribeiro). Não foi possível identificar dono institucional da playlist.

**Decidido em 10/08/2026: entram.** A régua de `videos.mjs` nunca recusou canal
não institucional — manda para a fila com a origem marcada e deixa a revisão
decidir, e a revisão decidiu por eles. O acervo foi de 17 para **24 vídeos, 16
acessíveis contra 8 gerais**, e Matemática de 0 para 7 acessíveis.

Três coisas ficaram declaradas junto, porque nenhuma delas se vê no número:

1. **A aprovação diz como foi aprovada.** Os 17 primeiros foram assistidos um a
   um. Estes o mantenedor aprovou em bloco, sem visionamento individual, e é isso
   que `revisadoPor` diz — palavra por palavra. Escrever o mesmo texto dos outros
   faria o acervo afirmar que alguém assistiu, que é o defeito das 43 questões
   antigas: o problema não era serem autorais, era não dizerem que eram.
2. **Dois da playlist ficaram de fora**: `EfLS_euI870` (porcentagem) e
   `BXzoQR-poZk` (proporção), ambos do Dicasdemat, são os únicos cujo título
   **não declara Libras**. Estar na playlist é indício; `recursoDeAcessibilidade`
   é afirmação sobre acessibilidade, e não se faz afirmação por indício.
3. **17 da playlist não tinham conteúdo onde entrar — e a aula foi escrita.**
   O que eles cobriam apontava um buraco maior que o do vídeo: os 12 conteúdos
   de Matemática não tinham **um único de geometria nem de estatística**.

## Matemática foi de 12 para 26 conteúdos (10/08/2026)

Catorze conteúdos novos, escritos para que os vídeos em Libras que sobravam
tivessem onde entrar — e porque a lacuna era do currículo, não do acervo de
vídeo. **A biblioteca foi de 156 para 170 conteúdos**, e os vídeos de 17 para
**41: 33 acessíveis contra 8 gerais**.

| assunto | ano | BNCC |
|---|---|---|
| ângulo como abertura: reto, agudo, obtuso, raso | 6º | EF06MA25, EF06MA26 |
| polígonos: classificar por lados, vértices e ângulos | 6º | EF06MA18 |
| divisão com naturais: o que sobra e o que significa | 6º | EF06MA03 |
| múltiplos e divisores: duas leituras da mesma relação | 6º | EF06MA05 |
| fluxograma | 6º | EF06MA34 |
| adição e subtração de frações | 6º | EF06MA10 |
| área de figuras planas por composição e decomposição | 7º | EF07MA32 |
| volume do bloco retangular | 7º | EF07MA30 |
| agrupar valores contínuos em classes | 8º | EF08MA23, EF08MA24 |
| média, moda e mediana: qual responde a pergunta | 8º | EF08MA25 |
| princípio multiplicativo da contagem | 8º | EF08MA22 |
| ângulos central e inscrito na circunferência | 9º | EF09MA11 |
| distância entre dois pontos no plano cartesiano | 9º | EF09MA14 |
| notação científica | 9º | EF09MA04 |

**Todos entraram já adaptados** — `exigencias` declaradas pelo critério de
`lib/conteudos/exigencias.ts`, que é o que faz a matriz de 98 células agir sobre
eles. Conteúdo sem exigência declarada volta a ser conselho genérico por aluno,
que é o defeito da biblioteca antiga.

O conferidor levantou três sinais, e **os três estavam certos**: faltava
`abstracao-simbolica` em área por decomposição (o aluno opera com a fórmula do
triângulo, não só a vê) e `pratica-concreta` em circunferência e em distância
entre pontos (barbante, transferidor, malha na mão do aluno). Nenhum precisou de
`sinaisDispensados` — o sinal apontou exigência de verdade, não sentido de
palavra.

Nenhuma fonte nova foi introduzida: os catorze reaproveitam endereços já
validados (WWC, NCII, OBMEP/IMPA, BNCC), e o `check:links` seguiu em 151.

## Vídeo pode vir de qualquer lugar da internet

Decidido em 10/08/2026. Até então o `conferir.mjs` recusava toda URL que não
contivesse `youtu`, e isso **confundia a regra com um fornecedor**: o que a regra
sempre quis dizer é que a descrição vem de uma fonte legível por máquina, e não
da memória de quem cadastra. Webinar de instituição, aula de campus virtual e
vídeo hospedado em Vimeo ficavam de fora por detalhe de implementação.

`scripts/conteudos/procedencia.mjs` lê título, canal e duração de três lugares,
nesta ordem — **oEmbed**, **schema.org `VideoObject`**, **Open Graph** — e o
campo `metadadosDe` registra qual respondeu. O conferidor agora exige https, os
três campos e a declaração de origem. Testado em YouTube, Vimeo, TED e página com
só Open Graph.

O que **não** mudou: nenhuma das três diz se o vídeo presta, e por isso
`revisado` continua começando em `false`.

## Quatro armadilhas desta frente, todas já pagas

- **"Canal e playlist do YouTube não devolvem ids" era falso**, e a crença errada
  custou caro: foi por causa dela que a curadoria de Matemática teve de entrar
  pelo portal do IMPA. No **HTML bruto**, pedido com User-Agent de navegador,
  `"videoId":"…"` está dentro do `ytInitialData` — a aba `/videos` entrega ~30
  ids e a playlist entrega os dela. O que não devolve nada é o **texto
  renderizado**: quem converte a página para markdown antes de procurar não acha
  id nenhum. O limite verdadeiro é outro — a primeira carga traz ~30 e o resto
  exige token de continuação, então playlist é a porta previsível para acervo
  grande.
- **A página do portal do IMPA lista os títulos deslocados em um** em relação
  aos ids. Os oito vídeos de Matemática entrariam com nome errado se o título
  tivesse sido copiado da página. Por isso `videos.mjs` lê da API e sobrescreve:
  **título de vídeo nunca é digitado.**
- **O YouTube responde 429 depois de algumas dezenas de requisições**, com uma
  página de três mil bytes e nenhuma duração. A primeira versão tratava isso
  como "não consegui ler a duração", que se parece com vídeo defeituoso, e teria
  feito o conferidor recusar treze vídeos perfeitos. Agora há repetição com
  espera crescente e a mensagem diz o que houve.
- **Ler-modificar-escrever apagou um vídeo.** O script rodava em segundo plano
  enquanto novos vídeos eram acrescentados aos mesmos arquivos; a regravação do
  objeto em memória sobrescreveu o que tinha entrado depois da leitura. Perdeu-se
  o vídeo de DNA, e só apareceu porque a contagem não bateu. `videos.mjs` agora
  relê o arquivo imediatamente antes de gravar.

## O verificador de conteúdos erra por sentido de palavra

`npm run conteudos` levanta sinais por palavra e **acerta pouco sozinho**. Na
primeira execução foram nove avisos e os nove eram falsos — "quadra" dentro de
*quadrado*, "conto" dentro de *desconto*, "meça" dentro de *começa*. Depois
vieram falsos por negação ("sem manipulação", "sem relatório") e por outro
sentido ("fórmula" como estrutura de produto cultural, "esquema de rimas").

Quando um sinal for legítimo, declare a exigência. Quando não for, use
`sinaisDispensados` **com o motivo escrito** — o verificador recusa dispensa sem
motivo e dispensa sem sinal correspondente. São 9 dispensas registradas.

---

# Banco de questões — fechado



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
npm run diversa                                    # varre o diversa.org.br (retoma de onde parou)
npm run diversa -- --refazer                       # ignora o que já foi visitado
npm run canais                                     # colhe os canais institucionais
npm run canais -- --so dislexia                    # só uma especialidade, preservando o resto do arquivo
npm run detectores                                 # mede as 3.495 e confere a matriz
npm run autorais                                   # confere as 280 questões autorais
npm run bncc                                       # confere os códigos da BNCC no PDF oficial
npm run check:links                                # valida todas as fontes
npm run enviar                                     # ensaio: relata sem escrever
npm run enviar -- --confirmar --rehospedar-enem    # grava no Supabase (forma correta)
npm run enviar -- --confirmar                      # sem a flag acima, devolve 802 linhas para 'externo'
```
