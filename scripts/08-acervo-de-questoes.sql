-- =============================================================================
-- 08 — O acervo de questões reais e autorais
--
-- Rode no SQL Editor do Supabase DEPOIS dos scripts 01..07.
-- É idempotente: pode ser executado mais de uma vez sem efeito colateral.
--
-- Cria a tabela `questoes`, que recebe as 3.495 questões reais (ENEM, USP e
-- UNICAMP) e as 280 autorais. E corrige, nas 43 questões antigas da tabela
-- `questions`, o "✓" que entrega o gabarito dentro do texto da alternativa.
--
-- -----------------------------------------------------------------------------
-- Por que uma tabela nova, e não colunas em `questions`
-- -----------------------------------------------------------------------------
--
-- Porque a chave mudou. Em `questions`, cada linha é uma questão **para uma
-- especialidade**: "Contagem com Maçãs" é de Matemática e é do Autismo. Uma
-- questão do ENEM não é "do autismo" — ela é uma questão, e o que muda por
-- especialidade é a orientação de adaptação, que vive em
-- `lib/adaptacao/matriz.ts` e é escolhida pelas barreiras medidas da questão.
--
-- Por isso **não existe coluna de especialidade aqui**, e a ausência é a parte
-- importante do desenho. Manter a coluna obrigaria a inventar uma especialidade
-- para cada uma das 3.495, que é exatamente o tipo de dado sem procedência que
-- este trabalho existe para eliminar.
--
-- `questions` continua existindo para as 43 antigas e para o que o professor
-- contribui pelo site. As duas tabelas não se misturam.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. A tabela
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS questoes (
  -- A identidade estável vinda dos arquivos: "ENEM-2023-91",
  -- "UNICAMP-2021-2021_day2-14", "AUTORAL-Matematica-1". Não é UUID de propósito:
  -- reimportar precisa atualizar a mesma linha, e um id gerado pelo banco faria
  -- cada importação duplicar o acervo inteiro.
  id TEXT PRIMARY KEY,

  -- A separação que é regra, não preferência de tela. Questão escrita por nós
  -- nunca se mistura com questão de prova real.
  acervo TEXT NOT NULL CHECK (acervo IN ('real', 'autoral')),

  exame TEXT NOT NULL,
  ano INTEGER NOT NULL,
  numero INTEGER NOT NULL,
  -- As cinco questões de língua estrangeira do ENEM existem em inglês e em
  -- espanhol, na mesma posição, com enunciados e gabaritos diferentes.
  idioma TEXT,

  materia TEXT NOT NULL,
  -- De onde veio o rótulo de matéria: 'oficial', 'leitura' (alguém leu a
  -- questão), 'vocabulário' (classificador automático) ou 'autoral'.
  origem_da_materia TEXT NOT NULL,

  enunciado TEXT NOT NULL,
  -- [{ letra, texto, imagem }] — a letra vem no dado porque as provas reais a
  -- trazem, e conferi-la é o que pegou gabarito de caderno trocado.
  alternativas JSONB NOT NULL,
  resposta TEXT NOT NULL CHECK (resposta IN ('A', 'B', 'C', 'D', 'E')),

  -- Dificuldade medida: só o ENEM tem, e vem do parâmetro `b` da TRI, calculado
  -- pelo INEP sobre milhões de respostas. Vestibular e autorais ficam nulos, e o
  -- CHECK adiante impede que alguém preencha isso com estimativa.
  dificuldade_b NUMERIC,
  dificuldade_escala INTEGER,
  dificuldade_faixa TEXT,
  -- Habilidade da matriz de referência do ENEM (1 a 30), quando conhecida.
  habilidade INTEGER,
  -- Habilidade da BNCC — a âncora das autorais. Ver `lib/autorais.ts`.
  bncc TEXT,

  imagens TEXT[] NOT NULL DEFAULT '{}',
  -- Onde as imagens moram hoje: 'storage' (rehospedadas aqui) ou 'externo'
  -- (ainda apontando para enem.dev). Declarar é o que impede o acervo de
  -- depender de terceiro sem que ninguém perceba.
  imagens_em TEXT NOT NULL DEFAULT 'nenhuma' CHECK (imagens_em IN ('nenhuma', 'storage', 'externo')),
  -- Audiodescrição oficial do INEP. Sem ela, uma questão com figura não é
  -- difícil para quem não enxerga: é indisponível.
  descricoes_de_figuras JSONB NOT NULL DEFAULT '[]',

  -- Barreiras medidas por `scripts/detectores/`. São derivadas e regeráveis —
  -- vivem aqui para o site não recalcular texto a cada requisição.
  barreiras TEXT[] NOT NULL DEFAULT '{}',
  medidas JSONB NOT NULL DEFAULT '{}',

  -- Procedência inteira, como está nos arquivos: exame, ano, caderno, links da
  -- API e dos microdados, e o nível de validação.
  fonte JSONB NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- -----------------------------------------------------------------------------
-- 2. As regras do acervo, escritas como restrição
--
-- Cada uma destas já é conferida por um script antes do envio. Estarem também
-- aqui não é redundância: script se esquece de rodar, e o banco é a última
-- fronteira antes de o professor ver o dado. As três correspondem, uma a uma, às
-- regras que este acervo levou meses para estabelecer.
-- -----------------------------------------------------------------------------

DO $$
BEGIN
  -- Toda questão declara o nível de garantia da sua resposta: duas fontes
  -- independentes no ENEM, uma só no vestibular, nenhuma nas autorais. Misturar
  -- os níveis sem avisar seria o pior dos dois mundos.
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'questoes_fonte_declara_validacao') THEN
    ALTER TABLE questoes ADD CONSTRAINT questoes_fonte_declara_validacao
      CHECK (fonte ? 'validacao');
  END IF;

  -- Questão autoral não tem dificuldade medida, e não pode ganhar uma inventada.
  -- É a mesma razão pela qual o `effectiveness` sem fonte saiu do site.
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'questoes_autoral_sem_dificuldade') THEN
    ALTER TABLE questoes ADD CONSTRAINT questoes_autoral_sem_dificuldade
      CHECK (acervo = 'real' OR (dificuldade_b IS NULL AND dificuldade_escala IS NULL));
  END IF;

  -- E toda autoral tem âncora na BNCC, que é o que a torna verificável.
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'questoes_autoral_tem_bncc') THEN
    ALTER TABLE questoes ADD CONSTRAINT questoes_autoral_tem_bncc
      CHECK (acervo = 'real' OR bncc IS NOT NULL);
  END IF;
END $$;


-- -----------------------------------------------------------------------------
-- 3. Índices
--
-- Os quatro caminhos que a tela de questões percorre: filtrar por matéria,
-- separar os dois acervos, ordenar por dificuldade e — o que é novo — encontrar
-- as questões que têm determinada barreira, que é como a especialidade passa a
-- ser consultada.
-- -----------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS questoes_materia_idx ON questoes (materia);
CREATE INDEX IF NOT EXISTS questoes_acervo_idx ON questoes (acervo);
CREATE INDEX IF NOT EXISTS questoes_dificuldade_idx ON questoes (dificuldade_escala);
CREATE INDEX IF NOT EXISTS questoes_barreiras_idx ON questoes USING GIN (barreiras);


-- -----------------------------------------------------------------------------
-- 4. Row Level Security
--
-- Leitura para qualquer um; escrita para ninguém.
--
-- Não há policy de INSERT, UPDATE ou DELETE de propósito. O acervo entra pelo
-- importador (`scripts/import-supabase/enviar.mjs`), que usa a service role e
-- por isso passa por cima do RLS. Professor autenticado não escreve aqui: o que
-- ele contribui vai para `questions`, onde a procedência é outra e está
-- declarada como outra.
-- -----------------------------------------------------------------------------

ALTER TABLE questoes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Qualquer um pode ler o acervo" ON questoes;
CREATE POLICY "Qualquer um pode ler o acervo" ON questoes FOR SELECT USING (true);


-- -----------------------------------------------------------------------------
-- 5. O "✓" que vazava o gabarito nas 43 questões antigas
--
-- As questões do script 04 trazem a marca dentro do texto da alternativa:
-- '["1 maçã", "2 maçãs", "3 maçãs ✓", "4 maçãs"]'. Quem lê a alternativa já sabe
-- a resposta. O mantenedor considerou aceitável porque o público é professor,
-- não aluno — mas o acervo novo não repete isso, e não custa consertar o antigo.
--
-- A marca sai das duas pontas ao mesmo tempo, e é isso que mantém a tela
-- funcionando: o cliente compara `option === correct_answer` para saber qual
-- alternativa é a certa. Limpar só uma das pontas quebraria a comparação e
-- nenhuma resposta seria reconhecida como correta.
-- -----------------------------------------------------------------------------

UPDATE questions
SET
  options = (
    SELECT jsonb_agg(TRIM(REPLACE(opcao #>> '{}', '✓', '')) ORDER BY indice)
    FROM jsonb_array_elements(options) WITH ORDINALITY AS t(opcao, indice)
  ),
  correct_answer = TRIM(REPLACE(correct_answer, '✓', ''))
WHERE options::text LIKE '%✓%' OR correct_answer LIKE '%✓%';


-- -----------------------------------------------------------------------------
-- 6. Conferência
--
-- Rode depois de importar. As três primeiras linhas devem bater com o que
-- `node scripts/import-enem/conferir.mjs` e `npm run autorais` relatam; a
-- quarta deve devolver zero.
-- -----------------------------------------------------------------------------

-- SELECT acervo, COUNT(*) FROM questoes GROUP BY acervo;
-- SELECT materia, COUNT(*) FROM questoes GROUP BY materia ORDER BY 2 DESC;
-- SELECT UNNEST(barreiras) AS barreira, COUNT(*) FROM questoes GROUP BY 1 ORDER BY 2 DESC;
-- SELECT COUNT(*) FROM questions WHERE options::text LIKE '%✓%';
