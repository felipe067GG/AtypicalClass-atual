import { medirDeEscola, type Medicao, type QuestaoMedivel } from "@/scripts/detectores/medir.mjs"
import { text } from "@/lib/i18n-content"
import type { Language } from "@/lib/translations"
import { barreiraDe, type BarreiraId } from "./barreiras"
import { celulasDe, type CelulaDaMatriz } from "./matriz"

/**
 * O adaptador: pega o material do professor e devolve o dele, adaptado.
 *
 * ## A decisão que define se isso presta
 *
 * O caminho fácil seria dar o texto ao modelo e pedir "adapte para dislexia".
 * Isso devolve "dê tempo estendido e leia em voz alta" — conselho que não adapta
 * *aquela* atividade, e que é exatamente a crítica que originou os detectores e
 * as duas matrizes.
 *
 * Aqui a ordem é outra, e ela não é negociável:
 *
 * 1. **Medir** — `medirDeEscola` conta as oito barreiras, sem opinar. A régua é
 *    a escolar, calibrada no Encceja Ensino Fundamental, porque o que o
 *    professor cola é material de aula e não prova de vestibular. Com a régua do
 *    ENEM, 91% do que ele colasse sairia como "nenhuma barreira".
 * 2. **Consultar** — `celulasDe` devolve as células daquele par barreira ×
 *    especialidade, escritas por gente e com fonte que o `check:links` valida.
 * 3. **Transformar** — só aqui entra o modelo, e com trabalho fechado: aplicar
 *    *aquela* instrução *àquele* texto.
 *
 * **O modelo não escreve fonte nenhuma.** As citações vêm da matriz e são
 * montadas pela tela. Um modelo que cita é um modelo que pode inventar citação,
 * e a promessa do site inteiro é que toda afirmação tem procedência conferida.
 */

/**
 * Quanto texto o adaptador aceita de uma vez.
 *
 * O teto não é limite de modelo: é limite de promessa. Acima disso o que chega
 * já não é "a atividade de quinta", é uma apostila, e a adaptação de apostila
 * inteira numa passada devolve resumo, não adaptação.
 *
 * Moram aqui, e não na rota, porque a tela também precisa deles: ela mostra o
 * contador e desabilita o botão antes de gastar uma chamada de modelo. Enquanto
 * eram literais repetidos nos dois lados, dava para mudar o limite da rota e
 * deixar a tela prometendo outro número.
 */
export const MINIMO_DE_CARACTERES = 40
export const MAXIMO_DE_CARACTERES = 12_000

/** O que o professor colou. */
export interface MaterialColado {
  texto: string
  /** Só muda o texto de apresentação; a medida é a mesma. */
  tipo: "questao" | "atividade" | "plano"
}

/**
 * Uma alternativa de múltipla escolha, como aparece em material colado.
 *
 * Aceita "A)", "a)", "A -", "(A)" e o marcador no começo da linha. Não aceita
 * "A" solto no meio do parágrafo — em português isso é artigo, e casar com ele
 * transformaria qualquer texto corrido numa questão de cinco alternativas.
 */
const ALTERNATIVA = /^\s*[(]?([a-eA-E])[)\].\-–]\s+(\S.*)$/

/**
 * Separa enunciado de alternativas no que foi colado.
 *
 * Sem isso, as alternativas entram na conta do enunciado: `leitura-longa`
 * dispara por engano e `alternativas-longas` mede zero. Material sem
 * alternativa nenhuma — uma atividade dissertativa, um plano de aula — passa
 * inteiro como enunciado, que é o certo.
 */
export function separar(texto: string): QuestaoMedivel {
  const linhas = texto.split(/\r?\n/)
  const alternativas: { texto: string }[] = []
  let corte = linhas.length
  let esperada = "a"

  for (let i = 0; i < linhas.length; i += 1) {
    const casa = linhas[i].match(ALTERNATIVA)
    if (!casa) continue
    // As letras têm de vir em ordem a partir de "a": um "b)" isolado no meio de
    // um parágrafo é enumeração de texto, não alternativa de questão.
    if (casa[1].toLowerCase() !== esperada) continue
    if (esperada === "a") corte = i
    alternativas.push({ texto: casa[2].trim() })
    esperada = String.fromCharCode(esperada.charCodeAt(0) + 1)
  }

  // Uma alternativa sozinha não é conjunto de alternativas.
  if (alternativas.length < 2) return { enunciado: texto.trim(), alternativas: [] }

  return { enunciado: linhas.slice(0, corte).join("\n").trim(), alternativas }
}

export interface Analise {
  medicao: Medicao
  /** As células que existem para as barreiras medidas, naquela especialidade. */
  celulas: CelulaDaMatriz[]
  /** Barreiras medidas que não têm célula escrita para esta especialidade. */
  semCelula: string[]
  /** O material separado, para o prompt receber a mesma coisa que foi medida. */
  material: QuestaoMedivel
}

/**
 * Mede o material e busca o que a matriz tem a dizer sobre ele.
 *
 * Não chama modelo nenhum: é a parte verificável, e ela roda inteira antes de
 * qualquer token ser gasto. Se não houver barreira, isso se sabe de graça.
 */
export function analisar(material: MaterialColado, especialidade: string): Analise {
  const separado = separar(material.texto)
  const medicao = medirDeEscola(separado)
  const celulas = celulasDe(medicao.barreiras, especialidade)
  const comCelula = new Set<string>(celulas.map((c) => c.barreira))
  return {
    medicao,
    celulas,
    semCelula: medicao.barreiras.filter((b) => !comCelula.has(b)),
    material: separado,
  }
}

const NOME_DO_TIPO: Record<MaterialColado["tipo"], string> = {
  questao: "questão",
  atividade: "atividade",
  plano: "plano de aula",
}

/**
 * O prompt.
 *
 * É longo de propósito, e quase todo ele é proibição. O modelo aqui não decide
 * nada de pedagogia: ele recebe instrução que já tem procedência e a aplica a um
 * texto. Toda liberdade que sobra é liberdade de inventar.
 */
export function promptDeAdaptacao(
  material: MaterialColado,
  analise: Analise,
  especialidadeNome: string,
  language: Language = "pt",
): string {
  const { medicao, celulas } = analise

  const instrucoes = celulas
    .map((celula, i) => {
      const barreira = barreiraDe(celula.barreira as BarreiraId)
      const nome = barreira ? text(barreira.nome, language) : celula.barreira
      return [
        `${i + 1}. BARREIRA MEDIDA: ${nome}`,
        `   O que isso significa para este aluno: ${text(celula.oQueSignifica, language)}`,
        `   INSTRUÇÃO A APLICAR: ${text(celula.oQueFazer, language)}`,
      ].join("\n")
    })
    .join("\n\n")

  const medidas = [
    `- enunciado com ${medicao.medidas.caracteres} caracteres, ${medicao.medidas.palavras} palavras`,
    `- ${medicao.medidas.palavrasPorFrase} palavras por frase, em ${medicao.medidas.frases} frases`,
    `- ${medicao.medidas.numeros} números distintos a reter`,
    analise.material.alternativas?.length
      ? `- ${analise.material.alternativas.length} alternativas, somando ${medicao.medidas.caracteresAlternativas} caracteres`
      : "- sem alternativas: material dissertativo ou de planejamento",
  ].join("\n")

  return `Você adapta material didático que um professor brasileiro já usa em sala. Você NÃO decide pedagogia: as instruções abaixo vêm de uma matriz escrita por especialistas, com fonte verificada, e o seu trabalho é aplicá-las a ESTE texto.

ALUNO: ${especialidadeNome}
TIPO DE MATERIAL: ${NOME_DO_TIPO[material.tipo]}

O QUE FOI MEDIDO NESTE MATERIAL (contagem, não opinião):
${medidas}

INSTRUÇÕES A APLICAR, uma por barreira medida:

${instrucoes}

MATERIAL ORIGINAL DO PROFESSOR, entre as marcas:
<<<
${material.texto}
>>>

REGRAS, todas obrigatórias:

1. Devolva o material adaptado, inteiro e pronto para usar na aula. Não devolva conselho sobre como adaptar: devolva o texto já adaptado.
2. Preserve o que está sendo ensinado. Adaptar é mudar a forma de acesso, nunca o conteúdo nem o nível de exigência cognitiva. Se a questão pede para calcular uma área, a adaptada continua pedindo para calcular uma área.
3. Aplique apenas as instruções listadas acima. Não acrescente sugestão pedagógica que não esteja ali — nada de "dê tempo estendido", "sente o aluno na frente", "use reforço positivo", a menos que a instrução diga isso.
4. NÃO cite fontes, não invente referências, não escreva nomes de autores ou instituições. As fontes são mostradas pelo site, ao lado da sua resposta, e vêm da matriz.
5. Mantenha o português do Brasil e o registro do professor. Se ele escreveu para o 6º ano, a adaptação é para o 6º ano.
6. Se a instrução pedir algo que o material não permite (audiodescrição de uma figura que você não vê, por exemplo), diga isso em uma linha, no lugar, entre colchetes: [o professor precisa descrever a figura aqui]. Não invente o conteúdo da figura.

FORMATO DA RESPOSTA, exatamente nesta ordem:

## Material adaptado

(o texto adaptado, inteiro)

## O que mudou

(uma linha por mudança, dizendo o que foi alterado e a qual das barreiras acima ela responde — sem justificativa pedagógica, que já está na matriz)`
}
