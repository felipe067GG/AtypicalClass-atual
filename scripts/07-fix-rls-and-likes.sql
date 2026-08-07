-- =============================================================================
-- 07 — Correções de segurança (RLS) e sistema de curtidas
--
-- Rode este script no SQL Editor do Supabase DEPOIS dos scripts 01..06.
-- Ele é idempotente: pode ser executado mais de uma vez sem efeito colateral.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. Criação do perfil de professor via trigger
--
-- Antes, o app inseria em `teachers` pelo client logo após o signUp. Como a
-- confirmação de e-mail é obrigatória, nesse momento ainda não existe sessão —
-- então a policy de INSERT precisava ser `WITH CHECK (true)`, o que permitia a
-- QUALQUER anônimo com a anon key criar linhas em `teachers` forjando id e nome.
--
-- Agora o perfil nasce de um trigger em auth.users, que roda com privilégio
-- elevado (SECURITY DEFINER) e usa os metadados enviados no cadastro.
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.teachers (id, email, name, specialty)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'specialty', 'Outro')
  )
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill: cria o perfil de quem já se cadastrou antes deste script.
INSERT INTO public.teachers (id, email, name, specialty)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
  COALESCE(u.raw_user_meta_data->>'specialty', 'Outro')
FROM auth.users u
LEFT JOIN public.teachers t ON t.id = u.id
WHERE t.id IS NULL AND u.email IS NOT NULL
ON CONFLICT DO NOTHING;


-- -----------------------------------------------------------------------------
-- 2. Policies de `teachers`
--
-- SELECT era `USING (true)`: qualquer visitante conseguia listar o e-mail de
-- todos os professores. O app só precisa ler o próprio perfil — o nome do autor
-- já vem desnormalizado em posts.teacher_name e comments.teacher_name.
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS "Teachers can view all teachers"        ON teachers;
DROP POLICY IF EXISTS "Teachers can insert their own profile" ON teachers;
DROP POLICY IF EXISTS "Teachers can update their own profile" ON teachers;

CREATE POLICY "Teachers can view their own profile"
  ON teachers FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Teachers can insert their own profile"
  ON teachers FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Teachers can update their own profile"
  ON teachers FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);


-- -----------------------------------------------------------------------------
-- 3. Policies de escrita: exigir que o autor seja o próprio usuário
--
-- `WITH CHECK (auth.uid() IS NOT NULL)` deixava qualquer usuário logado gravar
-- uma linha com teacher_id de outra pessoa.
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS "Teachers can insert questions" ON questions;
CREATE POLICY "Teachers can insert questions"
  ON questions FOR INSERT WITH CHECK (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Teachers can insert content" ON content;
CREATE POLICY "Teachers can insert content"
  ON content FOR INSERT WITH CHECK (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Teachers can insert posts" ON posts;
CREATE POLICY "Teachers can insert posts"
  ON posts FOR INSERT WITH CHECK (auth.uid() = teacher_id);

DROP POLICY IF EXISTS "Teachers can insert comments" ON comments;
CREATE POLICY "Teachers can insert comments"
  ON comments FOR INSERT WITH CHECK (auth.uid() = teacher_id);


-- -----------------------------------------------------------------------------
-- 4. Curtidas
--
-- Antes: `posts.likes` era lido e reescrito pela aplicação (read-then-write).
-- Isso perde curtidas simultâneas e permite curtir infinitas vezes.
-- Agora cada curtida é uma linha, com PK composta impedindo duplicata, e um
-- trigger mantém o contador `posts.likes` em dia.
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS post_likes (
  post_id    UUID REFERENCES posts(id)    ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (post_id, teacher_id)
);

ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view likes"    ON post_likes;
DROP POLICY IF EXISTS "Teachers can like"        ON post_likes;
DROP POLICY IF EXISTS "Teachers can remove like" ON post_likes;

CREATE POLICY "Anyone can view likes"
  ON post_likes FOR SELECT USING (true);

CREATE POLICY "Teachers can like"
  ON post_likes FOR INSERT WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can remove like"
  ON post_likes FOR DELETE USING (auth.uid() = teacher_id);

CREATE OR REPLACE FUNCTION public.sync_post_likes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET likes = likes + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSE
    UPDATE posts SET likes = GREATEST(likes - 1, 0) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
END;
$$;

DROP TRIGGER IF EXISTS post_likes_sync ON post_likes;
CREATE TRIGGER post_likes_sync
  AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW EXECUTE FUNCTION public.sync_post_likes();

-- Os contadores já existentes são preservados: não dá para saber quem curtiu o
-- quê antes desta migração, e zerá-los apagaria engajamento real. O trigger
-- passa a somar/subtrair a partir do valor atual. Só normalizamos NULLs.
UPDATE posts SET likes = 0 WHERE likes IS NULL;


-- -----------------------------------------------------------------------------
-- 5. Padroniza o nome das colunas de tradução
--
-- O script 06 criou `content.content_en` / `content.content_es`, mas a coluna
-- base dessa tabela chama-se `content_text`. O app resolve a tradução por
-- convenção (`<campo>_<idioma>`), então as colunas passam a acompanhar a base.
-- -----------------------------------------------------------------------------

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'content' AND column_name = 'content_en'
  ) THEN
    ALTER TABLE content RENAME COLUMN content_en TO content_text_en;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'content' AND column_name = 'content_es'
  ) THEN
    ALTER TABLE content RENAME COLUMN content_es TO content_text_es;
  END IF;
END $$;

ALTER TABLE content
  ADD COLUMN IF NOT EXISTS content_text_en TEXT,
  ADD COLUMN IF NOT EXISTS content_text_es TEXT;
