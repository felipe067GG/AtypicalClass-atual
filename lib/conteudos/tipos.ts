import type { Citation } from "@/components/specialty/types"
import type { ExigenciaId } from "./exigencias"

/**
 * Um conteúdo curricular da biblioteca, com plano de aula.
 *
 * ## O que este tipo impede
 *
 * A biblioteca antiga tinha onze linhas, todas do tipo "Guia Pedagógico", todas
 * sem uma única fonte, e nenhuma delas era um conteúdo — eram temas. "Como
 * Ensinar Números para Alunos com Autismo" não diz de que ano é, não aponta para
 * habilidade nenhuma da BNCC, e serviria igual para qualquer assunto.
 *
 * Os campos obrigatórios aqui são a resposta a isso, um a um:
 *
 *  - `bncc` amarra o conteúdo a habilidades que existem no documento oficial, e
 *    `scripts/conteudos/conferir.mjs` recusa código que não esteja em
 *    `data/bncc/codigos.json`. Dois códigos inexistentes já passaram meses no
 *    acervo de questões com forma válida e área coerente.
 *  - `fontes` faz valer no conteúdo a mesma regra do resto do site: nada entra
 *    sem endereço que o `npm run check:links` consiga validar.
 *  - `exigencias` é o que liga o conteúdo à matriz de adaptação. Sem ela, a
 *    orientação por aluno voltaria a ser uma coluna `specialty` e o texto
 *    voltaria a ser genérico.
 *  - `plano` é o que separa "guia" de material aplicável: etapas com minutos,
 *    materiais, e como saber que o aluno aprendeu.
 */
export interface Conteudo {
  /** Slug estável — `matematica-fracoes-equivalentes`. Nunca muda depois de publicado. */
  id: string
  /** Uma das catorze matérias do site, escrita como no acervo de questões. */
  materia: string
  /** `EF1` (1º–5º), `EF2` (6º–9º) ou `EM`. */
  etapa: "EF1" | "EF2" | "EM"
  /** O ano ou a série — "6º ano", "1ª série". Texto, porque a BNCC usa faixas. */
  ano: string
  titulo: string
  /** Uma frase: o que o aluno passa a saber fazer. */
  descricao: string
  /** Códigos de habilidade da BNCC, conferidos contra o documento oficial. */
  bncc: string[]
  /** O que este conteúdo exige de quem vai aprendê-lo. Move a matriz. */
  exigencias: ExigenciaId[]
  plano: PlanoDeAula
  /** Obrigatório e não vazio: afirmação pedagógica sem fonte não entra. */
  fontes: Citation[]
  /** Opcional, e nenhum vai ao ar sem alguém ter assistido. Ver `revisado`. */
  videos?: Video[]
  /**
   * Nota para um aluno específico, quando o par conteúdo × especialidade tiver
   * algo a dizer que a matriz não cobre — a matriz fala da exigência em geral,
   * e aqui se fala *deste* conteúdo.
   *
   * É exceção, não regra. Nota que serviria para qualquer conteúdo com a mesma
   * exigência pertence à matriz, e repeti-la aqui é como o acervo antigo
   * produziu conselho genérico catorze vezes.
   */
  notas?: NotaEspecifica[]
  /**
   * Sinais que o verificador levanta e alguém já conferiu e dispensou, com o
   * motivo — por exigência.
   *
   * `scripts/conteudos/conferir.mjs` procura, no texto do plano, palavras que
   * denunciam exigência não declarada. São heurísticas, e erram: num conteúdo
   * sobre poema, "esquema de rimas" disparou `representacao-visual`, e ali
   * esquema é padrão sonoro e não figura.
   *
   * Sem este campo, esse aviso apareceria em toda execução para sempre. Lista de
   * avisos que sempre traz o mesmo item conhecido é lista que se para de ler, e
   * aí o verificador deixa de servir. O verificador recusa dispensa sem motivo
   * escrito e dispensa sem sinal correspondente, para que o campo não vire algo
   * que se copia junto com o resto do conteúdo.
   */
  sinaisDispensados?: Record<string, string>
}

export interface PlanoDeAula {
  /** O que o aluno vai saber fazer ao final. Verbo observável, não "compreender". */
  objetivo: string
  /** Minutos previstos para a aula inteira. */
  duracao: number
  materiais: string[]
  etapas: EtapaDaAula[]
  /** Como o professor sabe que aprendeu — a evidência, não a nota. */
  comoAvaliar: string
  /** O que costuma dar errado neste conteúdo, com quem já ensinou. */
  errosComuns: string[]
}

export interface EtapaDaAula {
  minutos: number
  titulo: string
  /** Instrução aplicável, na ordem. Não princípio. */
  comoFazer: string
}

export interface NotaEspecifica {
  /** Slug da especialidade, como em `SPECIALTIES`. */
  especialidade: string
  texto: string
  citations: Citation[]
}

/**
 * Um vídeo indicado, e o campo que impede que ele vá ao ar sem alguém ter visto.
 *
 * `titulo`, `canal` e `duracaoSegundos` são preenchidos por
 * `scripts/conteudos/videos.mjs` — não são digitados à mão. Isso garante que o
 * vídeo existe e é o que diz ser.
 *
 * **O vídeo pode estar em qualquer lugar da internet.** Durante um tempo o
 * conferidor exigia URL do YouTube, e isso confundia a regra com um fornecedor:
 * o que a regra sempre quis dizer é que a descrição vem de uma fonte legível por
 * máquina, e não da memória de quem cadastra. `scripts/conteudos/procedencia.mjs`
 * lê essa descrição de oEmbed, de `schema.org/VideoObject` ou de Open Graph,
 * conforme o que a fonte publica, e `metadadosDe` registra qual das três
 * respondeu. Webinar de instituição, aula de campus virtual e vídeo hospedado em
 * Vimeo ficavam de fora por detalhe de implementação, e não por critério.
 *
 * O que a verificação automática **não** faz é dizer se o vídeo presta. Por isso
 * `revisado` começa `false`, e o envio para o Supabase recusa vídeo não revisado:
 * a alternativa seria recomendar a um professor um vídeo que ninguém assistiu.
 */
export interface Video {
  /** Endereço `https://` — de qualquer origem, não só do YouTube. */
  url: string
  titulo: string
  /** Quem publicou: o canal, o autor declarado, ou o domínio quando é só o que há. */
  canal: string
  duracaoSegundos: number
  /** De onde a descrição veio: `oEmbed`, `schema.org VideoObject` ou `Open Graph`. */
  metadadosDe?: string
  /**
   * A especialidade a que este vídeo serve, quando ele existe por causa dela.
   *
   * Uma videoaula comum de fração serve a turma inteira e não declara nada
   * aqui. Uma aula da mesma fração **em Libras** existe por causa do aluno
   * surdo; uma com audiodescrição, por causa do aluno cego. Sem este campo, os
   * dois casos ficam indistinguíveis na lista, e o professor que procura
   * material acessível precisa abrir um por um para descobrir qual é qual.
   *
   * Slug da especialidade, como em `SPECIALTIES`.
   */
  paraEspecialidade?: string
  /** O que torna este vídeo acessível — "aula em Libras", "com audiodescrição". */
  recursoDeAcessibilidade?: string
  /** Alguém assistiu e aprovou. Sem isto, o vídeo não é publicado. */
  revisado: boolean
  /** Quem revisou e quando — preenchido junto com `revisado`. */
  revisadoPor?: string
  revisadoEm?: string
}
