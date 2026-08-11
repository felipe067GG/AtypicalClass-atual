import { createClient } from "@supabase/supabase-js"

import { SPECIALTIES } from "@/lib/specialties"
import { BARREIRAS, MATERIAS, MATRIZ } from "@/lib/adaptacao"
import { EXIGENCIAS } from "@/lib/conteudos/exigencias"
import { MATRIZ_DE_CONTEUDOS } from "@/lib/conteudos/matriz"
import { translations } from "@/lib/translations"

/**
 * O que a Ravena sabe sobre o site, montado a partir dos dados.
 *
 * ## Por que não é texto escrito à mão
 *
 * Porque já foi, e apodreceu. O prompt anterior vivia dentro de
 * `app/api/chat/route.ts` e afirmava, em 11/08/2026, que o site tinha **5
 * especialidades** (tem 14), que Questões cobria **5 matérias** (cobre 14, com
 * 3.775 questões) e que Conteúdos eram "materiais organizados por
 * especialidade" — que era o desenho antigo, substituído no mesmo dia.
 *
 * Nada disso foi mentira quando foi escrito. O defeito é de forma: número
 * digitado à mão num prompt não tem como acompanhar o acervo, e ninguém revisa
 * um texto que já está lá. É a mesma regra que vale para título de vídeo neste
 * projeto — **não se digita o que a fonte pode dizer**.
 *
 * As listas vêm das constantes que o site já usa para renderizar, e as
 * contagens vêm do banco. Se uma especialidade entrar amanhã, a Ravena a conhece
 * sem ninguém lembrar de editar o prompt.
 */

/**
 * Nome em português da especialidade, pela mesma chave que a tela usa.
 *
 * O dicionário tem valores aninhados além de textos soltos, por isso a leitura
 * confere o tipo em vez de assumir: chave que não devolver string cai no
 * próprio slug, que é feio mas verdadeiro — melhor que `undefined` chegar ao
 * prompt como "undefined".
 */
function nomeDaEspecialidade(nameKey: string): string {
  const valor = (translations.pt as Record<string, unknown>)[nameKey]
  return typeof valor === "string" ? valor : nameKey
}

export interface ContagensDoAcervo {
  questoesReais: number
  questoesAutorais: number
  questoesDaComunidade: number
  conteudos: number
  dicasDaComunidade: number
}

/**
 * As contagens, lidas do banco.
 *
 * Guardadas em memória por dez minutos: são cinco `count` por chamada, e o
 * acervo muda por importação — não a cada mensagem de chat. O cache é por
 * instância e some no cold start, que é o comportamento desejado (uma consulta
 * a mais, e não um número velho preso em disco).
 */
let cache: { em: number; valor: ContagensDoAcervo } | null = null
const VALIDADE_MS = 10 * 60 * 1000

export async function contagensDoAcervo(): Promise<ContagensDoAcervo | null> {
  if (cache && Date.now() - cache.em < VALIDADE_MS) return cache.valor

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const chave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !chave) return null

  // Cliente anônimo e sem sessão: só conta linha de tabela pública. A Ravena
  // não deve enxergar nada que o visitante não enxergue.
  const supabase = createClient(url, chave, { auth: { persistSession: false } })
  const contar = (tabela: string) => supabase.from(tabela).select("id", { count: "exact", head: true })
  const contarAcervo = (acervo: string) =>
    supabase.from("questoes").select("id", { count: "exact", head: true }).eq("acervo", acervo)

  try {
    const [reais, autorais, antigas, conteudos, dicas] = await Promise.all([
      contarAcervo("real"),
      contarAcervo("autoral"),
      contar("questions"),
      contar("conteudos"),
      contar("content"),
    ])

    const valor: ContagensDoAcervo = {
      questoesReais: reais.count ?? 0,
      questoesAutorais: autorais.count ?? 0,
      questoesDaComunidade: antigas.count ?? 0,
      conteudos: conteudos.count ?? 0,
      dicasDaComunidade: dicas.count ?? 0,
    }
    cache = { em: Date.now(), valor }
    return valor
  } catch {
    // Sem contagem a Ravena continua útil — ela só deixa de citar números, que
    // é melhor que citar números inventados.
    return null
  }
}

/**
 * O prompt do sistema.
 *
 * Recebe as contagens em vez de buscá-las, para que quem chama decida o que
 * fazer quando o banco não responde.
 */
export function promptDaRavena(contagens: ContagensDoAcervo | null): string {
  const especialidades = SPECIALTIES.map((s) => nomeDaEspecialidade(s.nameKey))
  const barreiras = BARREIRAS.map((b) => b.id)
  const exigencias = EXIGENCIAS.map((e) => e.nome.pt)

  const acervo = contagens
    ? [
        `- Provas reais (ENEM, USP, UNICAMP): ${contagens.questoesReais} questões, com dificuldade oficial e barreiras medidas.`,
        `- Autorais: ${contagens.questoesAutorais} questões escritas pela equipe, mais simples, cada uma declarando autoria e nível de validação.`,
        `- Da comunidade: ${contagens.questoesDaComunidade} questões contribuídas por professores, com a procedência dita em voz alta.`,
        `- Biblioteca de conteúdos: ${contagens.conteudos} conteúdos curriculares com plano de aula.`,
        `- Dicas da comunidade: ${contagens.dicasDaComunidade}.`,
      ].join("\n")
    : "- (As contagens não puderam ser lidas agora. Não invente números: diga que o número exato está na própria página.)"

  return `Você é a Ravena, assistente do AtypicalClass — uma plataforma que ajuda professores a adaptar o ensino para alunos atípicos.

Seu papel é ajudar o professor a encontrar o que procura no site e a entender como ele funciona. Seja clara, objetiva e acolhedora. Quando não souber, diga que não sabe e aponte onde a pessoa pode ver.

## As ${SPECIALTIES.length} especialidades atendidas

${especialidades.join(", ")}.

## O acervo, hoje

${acervo}

## Como este site adapta, e o que NÃO dizer

Este é o ponto que mais gera pergunta, e o que mais se erra ao responder.

**Especialidade não é uma etiqueta da questão nem do conteúdo.** Uma questão do ENEM não é "do autismo" — ela é uma questão. O que muda por aluno é a **orientação de adaptação**.

Para as questões, o site **mede** ${BARREIRAS.length} barreiras em cada uma, por contagem e não por opinião: ${barreiras.join(", ")}. Uma matriz de ${MATRIZ.length} células diz, para cada par barreira × especialidade, o que significa para aquele aluno e o que fazer — cada célula com fonte.

Para os conteúdos, cada um declara o que **exige** de quem vai aprendê-lo (${exigencias.join(", ")}), e uma segunda matriz, de ${MATRIZ_DE_CONTEUDOS.length} células, diz o que muda no plano de aula por aluno.

Por isso, ao filtrar por especialidade, a pergunta que a tela responde é "as barreiras desta questão têm orientação escrita para este aluno?", e não "esta questão foi feita para este aluno?".

**Nunca diga que o acervo tem questões "feitas para" uma especialidade**, e nunca invente adaptação genérica do tipo "dê mais tempo e leia em voz alta" — o site existe justamente para substituir esse tipo de conselho por orientação com fonte.

## Onde fica cada coisa

- **/questoes** — o banco, com três acervos separados (provas reais, autorais, comunidade). Filtros por matéria, especialidade e busca. Escolher a especialidade mostra, em cada questão, a orientação para aquele aluno.
- **/conteudos** — a biblioteca curricular, em ${MATERIAS.length} matérias (${MATERIAS.join(", ")}), do 1º ano à 3ª série. Cada conteúdo traz plano de aula com etapas cronometradas, materiais, como avaliar, erros comuns, códigos da BNCC e fontes. Escolher uma especialidade **não filtra a lista** — muda o que o plano de aula diz para aquele aluno, e mostra o vídeo de formação do professor. Abaixo da biblioteca ficam as dicas da comunidade.
- **/contribuir** — onde o professor autenticado publica mensagem, dica pedagógica ou questão. Exige login; só professores criam conta, com verificação por e-mail.
- **Páginas de especialidade** (uma por especialidade, ex.: /autismo, /dislexia) — estratégias com fonte, atividades, cursos e materiais para download.

## Idiomas

O site inteiro existe em português, inglês e espanhol, e o idioma se troca no menu do topo. Responda sempre no idioma em que a pessoa escreveu.

## Regras de honestidade

- Não invente número, fonte, funcionalidade nem endereço de página.
- Se algo não existir no site, diga que não existe — não descreva como se existisse.
- Não dê diagnóstico nem conselho clínico. Você ajuda com o ensino, não com o diagnóstico.`
}
