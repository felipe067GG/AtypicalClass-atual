# AtypicalClass

Plataforma educacional que apoia professores no trabalho com alunos atípicos —
banco de questões adaptadas, conteúdos pedagógicos, área de contribuição da
comunidade e uma assistente virtual (Ravena).

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS 3** + shadcn/ui (Radix) + Framer Motion
- **Supabase** — autenticação e Postgres com Row Level Security
- **AI SDK** + Gemini (`gemini-2.5-flash`) para a Ravena

## Como rodar

```bash
npm install
cp .env.example .env.local   # preencha as chaves
npm run dev
```

| Script | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção (typecheck e lint incluídos) |
| `npm run typecheck` | só a checagem de tipos |
| `npm run lint` | ESLint |

### Variáveis de ambiente

| Variável | Onde obter |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | idem |
| `GOOGLE_GENERATIVE_AI_API_KEY` | https://aistudio.google.com/apikey |
| `NEXT_PUBLIC_APP_URL` | URL pública do site — usada no link de confirmação de e-mail |

Sem `NEXT_PUBLIC_APP_URL` correto em produção, o e-mail de verificação aponta
para `localhost` e o cadastro não se completa.

## Banco de dados

Rode os scripts de `scripts/` **em ordem** no SQL Editor do Supabase:

| Script | O que faz |
|---|---|
| `01-create-tables.sql` | tabelas e RLS inicial |
| `02` / `03` | seeds iniciais — **substituídos pelos scripts 04 e 05** |
| `04` / `05` | seeds atuais. Começam com `TRUNCATE`: substituem o conteúdo de 02/03 |
| `06-add-translations-columns.sql` | colunas de tradução |
| `07-fix-rls-and-likes.sql` | correções de RLS, trigger de perfil e tabela `post_likes` |

### Modelo

| Tabela | Observação |
|---|---|
| `teachers` | perfil do professor. Criado pelo trigger `on_auth_user_created` |
| `questions` | banco de questões |
| `content` | conteúdos pedagógicos |
| `posts` / `comments` / `post_likes` | feed da comunidade em `/contribuir` |

Dois campos são fáceis de confundir:

- **`subject`** — a matéria: Matemática, Português, Ciências, História…
- **`specialty`** — a condição atípica: Autismo, TDAH, Dislexia, Discalculia…

Em `teachers`, porém, `specialty` significa outra coisa: a **disciplina que o
professor leciona**. São conceitos distintos que compartilham o nome.

As telas `/questoes` e `/conteudos` montam os filtros a partir dos valores que
existem no banco, justamente para não voltarem a divergir dos dados.

### Traduções

O texto em português fica na coluna base; as traduções em colunas com sufixo
(`question_text_en`, `content_text_es`, …). `lib/localized.ts` resolve a
variante do idioma ativo e cai de volta no português quando não há tradução.
A interface em si é traduzida por `lib/translations.ts` (PT/EN/ES).

## Estrutura

```
app/
  actions/      Server Actions (auth, posts)
  api/chat/     endpoint da Ravena
  auth/         login, cadastro e callback de confirmação
  components/   seções da home, por especialidade
  conteudos/  questoes/  contribuir/
components/ui/  shadcn/ui
lib/            contextos de idioma e tema, clientes Supabase, utilitários
scripts/        migrações SQL
```
