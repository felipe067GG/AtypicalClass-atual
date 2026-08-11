/**
 * Os cadernos acessíveis do ENEM, que é onde mora a audiodescrição oficial.
 *
 * O INEP publica, para cada aplicação, um caderno preparado para leitor de tela.
 * Ele traz, no corpo do texto, a descrição escrita de cada figura — feita por
 * quem elaborou a prova, para quem não pode vê-la. Num site de educação
 * inclusiva isso não é acessório: sem a descrição, uma questão com gráfico não
 * é difícil para um aluno cego, é indisponível.
 *
 * ## O caderno acessível não se chama sempre a mesma coisa
 *
 * São três convenções em treze anos, e só uma delas diz "ledor" no nome:
 *
 * - **2011–2013**: `dia1_caderno3_branco_ledor.pdf`, `dia2_caderno6_cinza_ledor.pdf`
 * - **2018–2022**: `AAAA_PV_impresso_D1_CD9.pdf` e `D2_CD11` — o caderno 9 (dia 1)
 *   e o 11 (dia 2) são os **laranja**, que são os do ledor. A palavra não aparece
 *   no nome do arquivo, e é por isso que procurar por "ledor" perde quatro anos.
 *   O caderno 10 e o 12, verdes, são a videoprova em Libras: outra coisa.
 * - **2023**: além do PDF para NVDA, há um **`.txt` para DOSVOX** — texto puro,
 *   50 KB, sem PDF nenhum no caminho. É a forma mais limpa que existe.
 *
 * ## Os quatro anos que não têm
 *
 * 2010, 2014, 2015 e 2020 não publicaram caderno acessível da aplicação
 * regular. Em 2015 existe um "ledor", mas é da **reaplicação/PPL**, que é prova
 * diferente, com outras questões — casá-lo com o acervo colaria descrição de
 * uma questão em outra, que é o erro mais caro possível aqui.
 *
 * ## Isto não é voltar para o parser de PDF
 *
 * A armadilha registrada em PROXIMOS-PASSOS.md é sobre o caderno impresso:
 * colunas embaralhadas, fonte cifrada com deslocamento de 29. O caderno do
 * ledor é feito para ser lido por máquina — `extrairTexto` devolve as 32
 * páginas inteiras e as 40 descrições do dia 2 de 2013.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { extrairTexto } from "../bncc/extrair-pdf.mjs"

const ANTIGO = "https://download.inep.gov.br/educacao_basica/enem/provas"
const NOVO = "https://download.inep.gov.br/enem/provas_e_gabaritos"

/** Onde os cadernos ficam depois de baixados. Não versionado: é fonte pública e pesada. */
export const CACHE = join(process.cwd(), "data", "ledor")

/**
 * Um caderno acessível por ano e dia.
 *
 * `dia` não vira mapeamento para área de propósito. O ENEM trocou a divisão em
 * 2017 — até 2016 o dia 2 era Linguagens e Matemática, de 2017 em diante é
 * Natureza e Matemática —, e errar isso faria a busca procurar a questão no
 * arquivo errado. O casamento é por semelhança de texto contra **todas** as
 * questões do ano, o que dispensa saber o dia.
 */
export const CADERNOS = [
  { ano: 2011, dia: 1, arquivo: "2011_D1.pdf", url: `${ANTIGO}/2011/dia1_caderno3_branco_ledor.pdf` },
  { ano: 2011, dia: 2, arquivo: "2011_D2.pdf", url: `${ANTIGO}/2011/dia2_caderno6_cinza_ledor.pdf` },
  { ano: 2012, dia: 1, arquivo: "2012_D1.pdf", url: `${ANTIGO}/2012/dia1_caderno3_branco_ledor.pdf` },
  { ano: 2012, dia: 2, arquivo: "2012_D2.pdf", url: `${ANTIGO}/2012/dia2_caderno6_cinza_ledor.pdf` },
  { ano: 2013, dia: 1, arquivo: "2013_D1.pdf", url: `${ANTIGO}/2013/dia1_caderno3_branco_ledor.pdf` },
  { ano: 2013, dia: 2, arquivo: "2013_D2.pdf", url: `${ANTIGO}/2013/dia2_caderno6_cinza_ledor.pdf` },
  { ano: 2018, dia: 1, arquivo: "2018_D1.pdf", url: `${ANTIGO}/2018/2018_PV_impresso_D1_CD9.pdf` },
  { ano: 2018, dia: 2, arquivo: "2018_D2.pdf", url: `${ANTIGO}/2018/2018_PV_impresso_D2_CD11.pdf` },
  { ano: 2019, dia: 1, arquivo: "2019_D1.pdf", url: `${ANTIGO}/2019/2019_PV_impresso_D1_CD9.pdf` },
  { ano: 2019, dia: 2, arquivo: "2019_D2.pdf", url: `${ANTIGO}/2019/2019_PV_impresso_D2_CD11.pdf` },
  { ano: 2021, dia: 1, arquivo: "2021_D1.pdf", url: `${NOVO}/2021_PV_impresso_D1_CD9.pdf` },
  { ano: 2021, dia: 2, arquivo: "2021_D2.pdf", url: `${NOVO}/2021_PV_impresso_D2_CD11.pdf` },
  { ano: 2022, dia: 1, arquivo: "2022_D1.pdf", url: `${NOVO}/2022_PV_impresso_D1_CD9.pdf` },
  { ano: 2022, dia: 2, arquivo: "2022_D2.pdf", url: `${NOVO}/2022_PV_impresso_D2_CD11.pdf` },
  { ano: 2023, dia: 1, arquivo: "2023_CH.txt", url: `${NOVO}/2023_Dia_1_P1_CH_Caderno_09_Laranja_DOSVOX.txt` },
  { ano: 2023, dia: 1, arquivo: "2023_LC.txt", url: `${NOVO}/2023_Dia_1_P1_LC_Caderno_09_Laranja_DOSVOX.txt` },
  { ano: 2023, dia: 2, arquivo: "2023_CN.txt", url: `${NOVO}/2023_Dia_2_P1_CN_Caderno_11_Laranja_DOSVOX.txt` },
  { ano: 2023, dia: 2, arquivo: "2023_MT.txt", url: `${NOVO}/2023_Dia_2_P1_MT_Caderno_11_Laranja_DOSVOX.txt` },
]

/** Anos com figura sem descrição para os quais o INEP não publicou caderno acessível da aplicação regular. */
export const SEM_CADERNO = [2010, 2014, 2015, 2020]

/**
 * Baixa um caderno, se ainda não estiver em cache.
 *
 * O servidor do INEP recusa conexão quando se pede rápido demais — devolve
 * erro de transporte, não 429, de modo que não há status para inspecionar.
 * Daí a espera crescente entre tentativas e a gravação em arquivo temporário:
 * download interrompido no meio grava um PDF truncado, e PDF truncado se lê
 * como "este ano não tem descrição".
 */
export async function baixar(caderno, { tentativas = 4 } = {}) {
  await mkdir(CACHE, { recursive: true })
  const destino = join(CACHE, caderno.arquivo)
  try {
    const jaTenho = await readFile(destino)
    if (jaTenho.length > 10_000) return jaTenho
  } catch {
    // ainda não está em cache
  }

  for (let tentativa = 1; tentativa <= tentativas; tentativa += 1) {
    try {
      const resposta = await fetch(caderno.url, { headers: { "User-Agent": "Mozilla/5.0" } })
      if (resposta.ok) {
        const corpo = Buffer.from(await resposta.arrayBuffer())
        if (corpo.length > 10_000) {
          await writeFile(destino, corpo)
          return corpo
        }
      }
    } catch {
      // o INEP corta a conexão quando está limitando; tentar de novo mais devagar
    }
    if (tentativa < tentativas) await new Promise((r) => setTimeout(r, 15_000 * tentativa))
  }
  return null
}

/**
 * O texto do caderno, venha ele de PDF ou do `.txt` do DOSVOX.
 *
 * O `.txt` é **ISO-8859-1**. Lido como UTF-8 ele não falha: devolve `` no
 * lugar de cada acento, e aí "Descrição" deixa de casar e o ano inteiro sai
 * como se não tivesse descrição nenhuma. É o tipo de erro que não levanta
 * exceção e some no total.
 */
export function texto(caderno, corpo) {
  if (caderno.arquivo.endsWith(".txt")) return new TextDecoder("latin1").decode(corpo)
  return extrairTexto(corpo).texto
}
