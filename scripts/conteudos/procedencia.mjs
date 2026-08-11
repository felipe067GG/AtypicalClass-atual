/**
 * Lê título, canal e duração de um vídeo — em qualquer lugar da internet, não só
 * no YouTube.
 *
 * ## A regra que este módulo existe para preservar
 *
 * **Título de vídeo nunca é digitado.** A regra nasceu de um prejuízo concreto:
 * a página do portal do IMPA lista os títulos deslocados em um em relação aos
 * ids, e oito vídeos de Matemática teriam entrado com o nome errado se alguém
 * tivesse copiado da tela. Desde então, título, canal e duração vêm de uma
 * origem de máquina, e a verificação também serve de prova de que o vídeo existe.
 *
 * Enquanto todo vídeo era do YouTube, "origem de máquina" e "API do YouTube"
 * eram a mesma coisa, e o conferidor chegava a recusar URL que não contivesse
 * "youtu". Isso confundia a regra com um fornecedor: um webinar do Perkins, uma
 * aula do Campus Virtual da OPAS ou um vídeo hospedado no Vimeo por uma
 * universidade são material institucional legítimo, e ficavam de fora por
 * detalhe de implementação.
 *
 * Aqui a regra volta a ser o que sempre foi: **entra o vídeo cuja descrição pode
 * ser lida de uma fonte declarada, e não da memória de quem cadastra.** São três
 * fontes, tentadas nesta ordem, e a que respondeu fica registrada em `via`:
 *
 *  1. **oEmbed** — padrão que o YouTube e o Vimeo implementam em endereço
 *     conhecido, e que muitos outros anunciam na própria página com
 *     `<link rel="alternate" type="application/json+oembed">`.
 *  2. **JSON-LD `VideoObject`** — o schema.org que buscadores exigem de quem
 *     publica vídeo. Traz `name` e `duration` em ISO 8601.
 *  3. **Open Graph** — `og:title`, `og:site_name` e `og:video:duration`.
 *
 * ## O que continua não sendo verificável
 *
 * Nenhuma das três diz se o vídeo presta, e é por isso que `revisado` continua
 * começando em `false`. O que mudou foi de onde a descrição pode vir, não a
 * regra de que alguém precisa assistir antes de o vídeo ir ao ar.
 */

const TENTATIVAS = 4

const CABECALHOS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
  "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8,es;q=0.7",
}

export const dormir = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Um pedido com repetição no 429 e nos erros de servidor.
 *
 * O 429 responde com uma página curta e sem o que se procura, o que se parece
 * com "este vídeo não tem descrição" — tratá-lo como resposta válida faria o
 * conferidor recusar vídeos perfeitos, e já quase fez uma vez, com treze.
 */
async function pedir(url, { json = false } = {}) {
  let ultimoStatus = 0

  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa += 1) {
    let resposta
    try {
      resposta = await fetch(url, { headers: CABECALHOS, redirect: "follow" })
    } catch (erro) {
      if (tentativa === TENTATIVAS) return { erro: `falha de rede: ${erro.message}` }
      await dormir(2000 * tentativa)
      continue
    }

    ultimoStatus = resposta.status
    if (resposta.ok) {
      try {
        return json ? { dados: await resposta.json() } : { texto: await resposta.text() }
      } catch (erro) {
        return { erro: `resposta ilegível: ${erro.message}` }
      }
    }

    const valeRepetir = resposta.status === 429 || resposta.status >= 500
    if (!valeRepetir) break
    if (tentativa < TENTATIVAS) await dormir(3000 * tentativa)
  }

  return {
    erro:
      ultimoStatus === 429
        ? "limite de taxa (429) mesmo após as tentativas — rode de novo daqui a alguns minutos"
        : `respondeu ${ultimoStatus}`,
  }
}

// --- Duração -----------------------------------------------------------------

/**
 * Converte a duração ISO 8601 do schema.org (`PT1H2M30S`) para segundos.
 *
 * Aceita também o formato sem `T` que alguns publicadores emitem por engano
 * (`P1H2M30S`), porque recusar isso descartaria a única duração disponível numa
 * página que de resto está correta.
 */
export function segundosDeISO(texto) {
  if (typeof texto !== "string") return null
  const m = texto.match(/^P(?:\d+D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i)
  if (!m) return null
  const [, h, min, s] = m
  const total = Number(h ?? 0) * 3600 + Number(min ?? 0) * 60 + Math.round(Number(s ?? 0))
  return total > 0 ? total : null
}

// --- YouTube -----------------------------------------------------------------

export function idDoYouTube(url) {
  return (
    url.match(/[?&]v=([A-Za-z0-9_-]{11})/)?.[1] ??
    url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/)?.[1] ??
    url.match(/embed\/([A-Za-z0-9_-]{11})/)?.[1] ??
    null
  )
}

/**
 * A duração de um vídeo do YouTube, lida da página.
 *
 * O oEmbed do YouTube não devolve duração e a API oficial exigiria chave;
 * `lengthSeconds` está no JSON que a própria página embute. Se o formato mudar,
 * isto para de achar — e a falha é reportada em vez de silenciosa, porque sem
 * duração o conferidor recusa o vídeo em vez de publicá-lo sem ela.
 */
/**
 * ## 200 sem duração também é limite de taxa
 *
 * A primeira versão devolvia "o formato do YouTube pode ter mudado" assim que a
 * página respondia 200 sem `lengthSeconds`, e não repetia — o raciocínio era que
 * mudança de formato não melhora tentando de novo. O raciocínio estava certo e a
 * premissa, errada: numa curadoria de 24 vídeos, **5 passaram e 19 falharam
 * assim, intercalados**. Formato não muda no meio de uma execução; o que muda é
 * o humor do servidor, que sob pressão devolve 200 com uma página sem o dado.
 *
 * É a mesma lição do 429, com outra roupa: a resposta que se parece com "está
 * quebrado" era "tente daqui a pouco". Por isso agora repete com espera
 * crescente, e só depois de esgotar é que fala em mudança de formato.
 */
async function duracaoDoYouTube(id) {
  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa += 1) {
    const r = await pedir(`https://www.youtube.com/watch?v=${id}`)
    if (r.erro) return { erro: r.erro }

    const achado = r.texto.match(/"lengthSeconds":"(\d+)"/)
    if (achado) return { segundos: Number(achado[1]) }

    if (tentativa < TENTATIVAS) await dormir(4000 * tentativa)
  }

  return {
    erro: `a página respondeu 200 sem \`lengthSeconds\` em ${TENTATIVAS} tentativas — pode ser limite de taxa (rode de novo daqui a alguns minutos) ou mudança de formato do YouTube`,
  }
}

// --- oEmbed ------------------------------------------------------------------

/** Provedores com endereço de oEmbed conhecido — não precisam de descoberta. */
const OEMBED_CONHECIDOS = [
  { casa: /(?:youtube\.com|youtu\.be)/i, endereco: (u) => `https://www.youtube.com/oembed?url=${encodeURIComponent(u)}&format=json` },
  { casa: /vimeo\.com/i, endereco: (u) => `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(u)}` },
  { casa: /dailymotion\.com|dai\.ly/i, endereco: (u) => `https://www.dailymotion.com/services/oembed?url=${encodeURIComponent(u)}&format=json` },
  { casa: /ted\.com/i, endereco: (u) => `https://www.ted.com/services/v1/oembed.json?url=${encodeURIComponent(u)}` },
]

function deOEmbed(dados) {
  if (!dados || typeof dados !== "object") return null
  const titulo = typeof dados.title === "string" ? dados.title.trim() : null
  if (!titulo) return null
  return {
    titulo,
    canal: typeof dados.author_name === "string" ? dados.author_name.trim() : null,
    segundos: Number.isFinite(dados.duration) && dados.duration > 0 ? Math.round(dados.duration) : null,
  }
}

// --- Leitura da página -------------------------------------------------------

const semTags = (t) =>
  t
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .trim()

function metaOG(html, propriedade) {
  const expressao = new RegExp(
    `<meta[^>]+(?:property|name)=["']${propriedade}["'][^>]*content=["']([^"']*)["']`,
    "i",
  )
  const alternativa = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${propriedade}["']`,
    "i",
  )
  const m = html.match(expressao) ?? html.match(alternativa)
  return m ? semTags(m[1]) : null
}

/** Percorre o JSON-LD da página atrás de um `VideoObject`, inclusive aninhado. */
function videoObjectDoJsonLd(html) {
  for (const bloco of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    let dados
    try {
      dados = JSON.parse(bloco[1].trim())
    } catch {
      continue
    }

    const pilha = [dados]
    while (pilha.length) {
      const no = pilha.pop()
      if (Array.isArray(no)) {
        pilha.push(...no)
        continue
      }
      if (!no || typeof no !== "object") continue

      const tipo = no["@type"]
      const ehVideo = tipo === "VideoObject" || (Array.isArray(tipo) && tipo.includes("VideoObject"))
      if (ehVideo && typeof no.name === "string") return no

      pilha.push(...Object.values(no))
    }
  }
  return null
}

function duracaoDoOpenGraph(html) {
  const bruto = metaOG(html, "og:video:duration") ?? metaOG(html, "video:duration")
  if (!bruto) return null
  const segundos = /^\d+$/.test(bruto) ? Number(bruto) : segundosDeISO(bruto)
  return segundos > 0 ? segundos : null
}

/**
 * Quem publicou, quando a página não declara.
 *
 * Última escolha, e ainda assim um fato de máquina: o vídeo está hospedado
 * naquele domínio, e é isso que a linha diz. Vale para páginas institucionais
 * que publicam vídeo sem `og:site_name` — recusá-las obrigaria a digitar o nome
 * da instituição, que é justamente o que este módulo existe para evitar.
 */
const donoDoDominio = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return null
  }
}

function nomeDoPublicador(no) {
  const candidatos = [no?.publisher, no?.author, no?.creator, no?.productionCompany]
  for (const c of candidatos) {
    if (typeof c === "string" && c.trim()) return c.trim()
    if (c && typeof c === "object" && typeof c.name === "string" && c.name.trim()) return c.name.trim()
  }
  return null
}

// --- A porta de entrada ------------------------------------------------------

/**
 * Descreve o vídeo em `url`, tentando oEmbed, depois JSON-LD, depois Open Graph.
 *
 * Devolve `{ titulo, canal, duracaoSegundos, via }` ou `{ erro }`. `canal` pode
 * vir nulo quando a fonte não declara quem publicou — quem chama decide se isso
 * basta. `duracaoSegundos` nulo é o caso comum fora do YouTube e do Vimeo: nem
 * todo publicador declara duração, e inventá-la seria pior que não tê-la.
 */
export async function descreverVideo(url) {
  if (!/^https:\/\//i.test(url)) return { erro: "endereço precisa ser https" }

  // 1. oEmbed de provedor conhecido.
  const conhecido = OEMBED_CONHECIDOS.find((p) => p.casa.test(url))
  if (conhecido) {
    const r = await pedir(conhecido.endereco(url), { json: true })
    if (r.erro) return { erro: `oEmbed: ${r.erro}` }

    const lido = deOEmbed(r.dados)
    if (!lido) return { erro: "o oEmbed respondeu sem título" }

    /**
     * Nem todo oEmbed traz duração — o do YouTube não traz nunca, e o do TED
     * também não. Quando falta, vale procurar na página: recusar o vídeo por
     * causa de um campo que a fonte publica em outro lugar seria descartar
     * material bom por detalhe de formato.
     */
    if (lido.segundos == null) {
      const id = idDoYouTube(url)
      if (id) {
        const medida = await duracaoDoYouTube(id)
        if (medida.erro) return { erro: medida.erro }
        lido.segundos = medida.segundos
      } else {
        const pagina = await pedir(url)
        if (!pagina.erro) {
          const objeto = videoObjectDoJsonLd(pagina.texto)
          lido.segundos =
            segundosDeISO(objeto?.duration) ?? duracaoDoOpenGraph(pagina.texto)
        }
      }
    }

    return { titulo: lido.titulo, canal: lido.canal, duracaoSegundos: lido.segundos, via: "oEmbed" }
  }

  // 2. A página. Serve para a descoberta de oEmbed, para o JSON-LD e para o OG.
  const pagina = await pedir(url)
  if (pagina.erro) return { erro: pagina.erro }
  const html = pagina.texto

  const descoberto = html.match(
    /<link[^>]+type=["']application\/json\+oembed["'][^>]*href=["']([^"']+)["']/i,
  )?.[1]
  if (descoberto) {
    const r = await pedir(semTags(descoberto), { json: true })
    const lido = r.erro ? null : deOEmbed(r.dados)
    if (lido) {
      return { titulo: lido.titulo, canal: lido.canal, duracaoSegundos: lido.segundos, via: "oEmbed anunciado na página" }
    }
  }

  // 3. JSON-LD.
  const objeto = videoObjectDoJsonLd(html)
  if (objeto) {
    return {
      titulo: semTags(objeto.name),
      canal: nomeDoPublicador(objeto) ?? metaOG(html, "og:site_name") ?? donoDoDominio(url),
      duracaoSegundos: segundosDeISO(objeto.duration) ?? duracaoDoOpenGraph(html),
      via: "schema.org VideoObject",
    }
  }

  // 4. Open Graph.
  const titulo = metaOG(html, "og:title")
  if (titulo) {
    return {
      titulo,
      canal: metaOG(html, "og:site_name") ?? donoDoDominio(url),
      duracaoSegundos: duracaoDoOpenGraph(html),
      via: "Open Graph",
    }
  }

  return {
    erro:
      "a página respondeu, e não declara o vídeo de nenhuma forma legível (sem oEmbed, sem schema.org VideoObject, sem Open Graph)",
  }
}
