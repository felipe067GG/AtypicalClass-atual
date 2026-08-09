# Banco de questões — onde parou e o que vem

Escrito em 08/08/2026, na branch `importador-enem`. Serve para retomar sem
precisar reconstruir o raciocínio.

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

**Nada disso está no ar.** O site em produção ainda serve as 43 questões
antigas do Supabase — "Contagem com Maçãs", nível fundamental, com o gabarito
vazando dentro da alternativa.

## O que falta, na ordem combinada

### 1. Detectores + matriz barreira × especialidade

O que torna a adaptação **concreta por questão**, em vez de conselho genérico.
Foi a crítica certa do mantenedor a uma proposta anterior minha: "dê tempo
estendido e leia em voz alta" não adapta *aquela* questão.

**Detectores** — medidos de cada questão, sem opinião: carga de leitura
(caracteres, frases), números a reter, dependência de figura, alternativas que
só diferem no número, encadeamento de etapas. Rodam nas 3.495 automaticamente.

**Matriz** — o que cada barreira significa para cada especialidade, **com
fonte**. São ~8 barreiras × 14 especialidades, e a maioria das células é vazia
(carga de leitura não é barreira central em altas habilidades). Umas **40
células reais**, não 196 textos.

Exemplo do que sai, para a questão 136/2023 (769 caracteres, 6 números, figura,
alternativas numéricas) e um aluno com discalculia: *"são 6 números para
segurar através de 8 frases antes do primeiro cálculo; entregue-os numa tabela
à parte. As alternativas D e E são o dobro das outras — quem esquecer de
dividir por 3 no volume do cone cai exatamente nelas."*

O primeiro guia já existe como modelo em `lib/adaptacao/matematica-discalculia.ts`,
com fontes do What Works Clearinghouse (IES) e do NCII.

### 2. ~280 questões autorais

20 por matéria, simples, para quem ainda não alcança uma questão de ENEM.

**Regra inegociável:** são escritas pelo AtypicalClass e entram marcadas como
autorais, ancoradas numa habilidade da BNCC (que é verificável). **Nunca
misturadas com as 3.495 reais** — aba própria em `/questoes`. O problema das
43 atuais nunca foi serem autorais: foi não dizerem que eram, e virem com
`source: 'adapted'` sem procedência nenhuma.

### 3. Gravar no Supabase

É o único item que muda o que o professor vê. Envolve migrar o esquema: a
tabela `questions` de hoje não tem dificuldade, imagens, audiodescrição,
procedência nem matéria separada da especialidade.

Aproveitar para corrigir o `✓` que vaza o gabarito dentro do texto da
alternativa nas 43 antigas — o mantenedor considera aceitável, porque o público
é professor e não aluno, mas o banco novo não repete isso.

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
npm run check:links                                # valida todas as fontes
```
