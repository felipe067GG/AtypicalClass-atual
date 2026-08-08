/**
 * Descoberta e download das provas do ENEM no repositório do INEP.
 *
 * A lista de PDFs não está no HTML da página principal: cada ano é uma aba
 * carregada por JavaScript, com URL própria em
 * `.../provas-e-gabaritos/{ano}`. Buscar essa URL direto dá o HTML com os
 * links — é por isso que aqui não há padrão de nome de arquivo adivinhado.
 * Adivinhar quebraria a cada ano em que o INEP mudasse a convenção, e já
 * mudou: 2015 usa `educacao_basica/enem/provas/`, 2023 usa
 * `enem/provas_e_gabaritos/`.
 *
 * O host de download oscila: a mesma URL responde 200 numa tentativa e falha
 * na seguinte, sem padrão. Daí o retry — sem ele, metade dos downloads volta
 * vazia e o importador acusa prova incompleta quando o problema era a rede.
 */
import { execFile } from "node:child_process"
import { mkdir, stat } from "node:fs/promises"
import { dirname, join } from "node:path"
import { promisify } from "node:util"

const exec = promisify(execFile)

const BASE = "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos"
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

/** Onde os PDFs baixados ficam. São grandes (até 8 MB) e não entram no git. */
export const CACHE = join(process.cwd(), ".cache", "enem")

/**
 * Lista os PDFs publicados para um ano.
 *
 * Devolve tudo o que a página oferece, sem filtrar: quem chama decide se quer
 * a prova impressa, a versão acessível ou a reaplicação.
 */
export async function listarPdfs(ano) {
  const resposta = await fetch(`${BASE}/${ano}`, { headers: { "User-Agent": UA } })
  if (!resposta.ok) {
    throw new Error(`Página do ano ${ano} respondeu ${resposta.status}`)
  }
  const html = await resposta.text()
  const urls = new Set()
  for (const match of html.matchAll(/href="(https:\/\/download\.inep\.gov\.br\/[^"]+\.pdf)"/g)) {
    urls.add(match[1])
  }
  return [...urls].sort()
}

/**
 * Classifica um PDF pelo nome do arquivo.
 *
 * O INEP codifica no nome tudo o que precisamos: ano, dia, área e caderno.
 * `2023_Dia_1_P1_LC_Caderno_09_Laranja_NVDA.pdf` é a versão acessível de
 * Linguagens do primeiro dia; `2023_GB_impresso_D1_CD1.pdf` é o gabarito do
 * caderno 1. Ler isso do nome evita abrir 62 PDFs para descobrir o que são.
 */
export function classificar(url) {
  const nome = url.split("/").pop() ?? ""
  const ano = Number(nome.match(/^(\d{4})/)?.[1])
  const dia = Number(nome.match(/(?:Dia_|D)(\d)/)?.[1])
  const caderno = Number(nome.match(/(?:Caderno_|CD)(\d+)/)?.[1])
  const area = nome.match(/_(LC|CH|CN|MT)_/)?.[1] ?? null

  return {
    url,
    nome,
    ano,
    dia: Number.isNaN(dia) ? null : dia,
    caderno: Number.isNaN(caderno) ? null : caderno,
    area,
    tipo: /_GB_/.test(nome) ? "gabarito" : "prova",
    acessivel: /NVDA/i.test(nome),
    reaplicacao: /reaplicacao|PPL/i.test(nome),
  }
}

/** Baixa um PDF para o cache, reaproveitando o que já está lá. */
export async function baixar(url) {
  const destino = join(CACHE, url.split("/").pop())
  await mkdir(dirname(destino), { recursive: true })

  try {
    const info = await stat(destino)
    if (info.size > 0) return destino
  } catch {
    // ainda não baixado
  }

  await exec("curl", [
    "-sL",
    "--retry", "5",
    "--retry-all-errors",
    "--retry-delay", "3",
    "--max-time", "300",
    "-A", UA,
    "-o", destino,
    url,
  ])

  const info = await stat(destino)
  if (info.size === 0) throw new Error(`Download vazio: ${url}`)
  return destino
}

/**
 * Converte um PDF em texto.
 *
 * `margemDireita` e `margemEsquerda` existem para separar as colunas. A prova
 * impressa tem duas colunas, e o extrator lê a página inteira linha a linha —
 * o resultado mistura, linha sim linha não, dois textos diferentes. Recortando
 * a página ao meio e extraindo cada lado em separado, cada questão volta a ser
 * um bloco contínuo.
 */
export async function extrairTexto(pdf, { pagina, margemDireita, margemEsquerda } = {}) {
  // Sem `-enc UTF-8` o extrator devolve Latin-1 e todo acento vira lixo —
  // "alterações" chega como "altera��es".
  const args = ["-simple", "-enc", "UTF-8"]
  if (pagina) args.push("-f", String(pagina), "-l", String(pagina))
  if (margemDireita) args.push("-marginr", String(margemDireita))
  if (margemEsquerda) args.push("-marginl", String(margemEsquerda))
  args.push(pdf, "-")

  const { stdout } = await exec("pdftotext", args, { maxBuffer: 64 * 1024 * 1024 })
  return stdout
}
