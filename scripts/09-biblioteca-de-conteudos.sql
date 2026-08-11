-- =============================================================================
-- 09 — A biblioteca de conteúdos curriculares
--
-- Rode no SQL Editor do Supabase DEPOIS dos scripts 01..08.
-- É idempotente: pode ser executado mais de uma vez sem efeito colateral.
--
-- Cria a tabela `conteudos`, que recebe os 170 conteúdos curriculares com plano
-- de aula de `data/conteudos/`. Depois dela, rode `npm run enviar:conteudos`.
--
-- -----------------------------------------------------------------------------
-- JÁ FOI APLICADO em 11/08/2026, e não pelo SQL Editor
-- -----------------------------------------------------------------------------
--
-- Diferente do 08, que o mantenedor rodou no SQL Editor, este foi aplicado por
-- conexão direta ao Postgres (`POSTGRES_URL_NON_POOLING`), com um cliente `pg`
-- instalado fora do repositório — o projeto não tem essa dependência e não
-- precisa ganhar uma por causa de um DDL de uma vez só.
--
-- Duas pegadinhas, se for preciso repetir:
--
--  1. **Tire `sslmode` da string de conexão** e passe
--     `ssl: { rejectUnauthorized: false }`. O `pg` novo trata `sslmode=require`
--     como `verify-full`, e a cadeia do Supabase tem raiz própria (RNP/ICPEdu no
--     caso de outros hosts; aqui, a do próprio Supabase).
--  2. As duas restrições de array **foram corrigidas depois**, por `ALTER`
--     (ver o comentário em `conteudos_tem_bncc`). Num banco novo este arquivo já
--     nasce certo; num banco que rodou a primeira versão, `CREATE TABLE IF NOT
--     EXISTS` não conserta nada — é preciso o `ALTER` à mão.
--
-- O estado no banco foi conferido depois: 170 linhas, 6 restrições, leitura
-- pública, e comparação campo a campo com `data/conteudos/` sem divergência.
--
-- -----------------------------------------------------------------------------
-- Por que uma tabela nova, e não colunas em `content`
-- -----------------------------------------------------------------------------
--
-- Pelo mesmo motivo que separou `questoes` de `questions`: a chave mudou.
--
-- Em `content`, cada linha é um conteúdo **para uma especialidade** — "Como
-- Ensinar Números para Alunos com Autismo". Isso obrigava a multiplicar 170
-- conteúdos por 14 especialidades, e a única forma de escrever 2.380 textos é
-- repetindo conselho. Foi exatamente o que aconteceu: as onze linhas antigas não
-- têm ano, não têm código da BNCC e não têm uma única fonte.
--
-- Por isso **não existe coluna de especialidade aqui**, e a ausência é o
-- desenho. Cada conteúdo declara o que **exige** de quem vai aprendê-lo, e a
-- orientação por aluno vem da matriz de 98 células em `lib/conteudos/matriz.ts`.
--
-- `content` continua existindo para o que o professor contribui pelo site — a
-- "Dica Pedagógica" de `app/actions/posts.tsx`. As duas tabelas não se misturam,
-- e a página mostra as duas separadas, como `/questoes` já faz.
--
-- -----------------------------------------------------------------------------
-- A matriz não vem para o banco
-- -----------------------------------------------------------------------------
--
-- `lib/conteudos/matriz.ts` fica no código e é lida pelo site, como já acontece
-- com `lib/adaptacao/matriz.ts`. É conteúdo com fonte, que muda por revisão e
-- não por importação — e os 89 vídeos formativos dela ainda não foram
-- assistidos. Colocá-la aqui faria o banco publicar recomendação que ninguém viu.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. A regra que precisa de função para virar restrição
-- -----------------------------------------------------------------------------

-- Vídeo não revisado não vai ao ar. A regra já existe no tipo e no verificador;
-- aqui ela vira restrição do banco, que é o único lugar que nenhuma importação
-- futura contorna por engano.
--
-- Precisa ser função porque CHECK não aceita subconsulta, e conferir cada item
-- de um array JSON exige percorrê-lo. `IMMUTABLE` é o que permite usá-la em
-- CHECK: o resultado depende só do argumento.
CREATE OR REPLACE FUNCTION conteudos_videos_revisados(videos JSONB)
RETURNS BOOLEAN
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT coalesce(bool_and(item->>'revisado' = 'true'), true)
  FROM jsonb_array_elements(coalesce(videos, '[]'::jsonb)) AS item
$$;


-- -----------------------------------------------------------------------------
-- 2. A tabela
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS conteudos (
  -- O slug estável dos arquivos: "matematica-fracoes-equivalentes". Não é UUID
  -- de propósito, pelo mesmo motivo de `questoes`: reimportar precisa atualizar
  -- a mesma linha, e um id gerado pelo banco faria cada importação duplicar a
  -- biblioteca inteira.
  id TEXT PRIMARY KEY,

  -- Uma das catorze matérias do site. Vem do arquivo (`data/conteudos/X.json`),
  -- e não de campo por conteúdo — é o arquivo que declara a matéria.
  materia TEXT NOT NULL,

  etapa TEXT NOT NULL CHECK (etapa IN ('EF1', 'EF2', 'EM')),
  -- Texto, e não número, porque a BNCC fala em "6º ano" e "1ª série".
  ano TEXT NOT NULL,

  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,

  -- Habilidades da BNCC, conferidas contra o documento oficial do MEC por
  -- `npm run bncc`. Dois códigos inexistentes já passaram meses no acervo de
  -- questões com forma válida e área coerente — forma não prova existência.
  bncc TEXT[] NOT NULL,

  -- O que o conteúdo exige de quem vai aprendê-lo. É o que move a matriz: sem
  -- isso, a orientação por aluno volta a ser conselho genérico.
  exigencias TEXT[] NOT NULL,

  -- { objetivo, duracao, materiais[], etapas[{minutos,titulo,comoFazer}],
  --   comoAvaliar, errosComuns[] } — é o que separa "guia" de material aplicável.
  plano JSONB NOT NULL,

  -- [{ label, url }] — obrigatório e não vazio. Afirmação pedagógica sem fonte
  -- não entra, aqui como no resto do site.
  fontes JSONB NOT NULL,

  -- [{ url, titulo, canal, duracaoSegundos, metadadosDe, paraEspecialidade,
  --    recursoDeAcessibilidade, revisado, revisadoPor, revisadoEm }]
  videos JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- [{ especialidade, texto, citations[] }] — exceção, não regra. Nota que
  -- serviria a qualquer conteúdo com a mesma exigência pertence à matriz.
  notas JSONB NOT NULL DEFAULT '[]'::jsonb,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- As quatro regras da biblioteca, escritas como restrição do banco:

  -- Nada entra sem fonte.
  CONSTRAINT conteudos_tem_fonte
    CHECK (jsonb_typeof(fontes) = 'array' AND jsonb_array_length(fontes) >= 1),

  -- Nada entra sem âncora na BNCC.
  --
  -- `cardinality()`, e **não** `array_length(bncc, 1) >= 1`. A primeira versão
  -- usava `array_length` e não recusava nada: para o array vazio ela devolve
  -- NULL, e CHECK que resulta em NULL é considerado satisfeito. A restrição
  -- existia, tinha o nome certo, e aceitava `'{}'`. Só apareceu porque as cinco
  -- foram testadas uma a uma com INSERT dentro de transação desfeita —
  -- restrição que nunca viu uma linha ruim é suposição, não garantia.
  CONSTRAINT conteudos_tem_bncc
    CHECK (cardinality(bncc) >= 1),

  -- Nada entra sem declarar o que exige — é isso que a matriz consome.
  -- Mesmo cuidado do anterior, e pelo mesmo motivo.
  CONSTRAINT conteudos_tem_exigencia
    CHECK (cardinality(exigencias) >= 1),

  -- Plano com etapas e duração de verdade. "Guia" sem isso é o acervo antigo.
  CONSTRAINT conteudos_tem_plano
    CHECK (
      plano ? 'objetivo'
      AND (plano->>'duracao')::numeric > 0
      AND jsonb_array_length(plano->'etapas') >= 1
    ),

  -- Vídeo não revisado não é publicado.
  CONSTRAINT conteudos_videos_revisados
    CHECK (conteudos_videos_revisados(videos))
);

CREATE INDEX IF NOT EXISTS conteudos_materia_idx ON conteudos (materia);
CREATE INDEX IF NOT EXISTS conteudos_etapa_idx ON conteudos (etapa);
-- GIN porque o filtro da tela pergunta "quais conteúdos exigem isto?", que é
-- contenção de array e não igualdade.
CREATE INDEX IF NOT EXISTS conteudos_exigencias_idx ON conteudos USING GIN (exigencias);


-- -----------------------------------------------------------------------------
-- 3. Leitura pública, escrita só pelo importador
-- -----------------------------------------------------------------------------
--
-- Mesma decisão de `questoes`: a biblioteca é pública para leitura e não tem
-- policy de escrita nenhuma. Ela entra por `npm run enviar:conteudos`, que usa a
-- service role, e por mais nenhum caminho. O que o professor contribui continua
-- indo para `content`, que tem as policies dele.

ALTER TABLE conteudos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "conteudos: leitura pública" ON conteudos;
CREATE POLICY "conteudos: leitura pública"
  ON conteudos FOR SELECT
  USING (true);


-- -----------------------------------------------------------------------------
-- 4. Conferência
-- -----------------------------------------------------------------------------

SELECT
  count(*)                                        AS linhas,
  count(*) FILTER (WHERE jsonb_array_length(videos) > 0) AS com_video,
  sum(jsonb_array_length(videos))                 AS videos,
  count(DISTINCT materia)                         AS materias
FROM conteudos;
