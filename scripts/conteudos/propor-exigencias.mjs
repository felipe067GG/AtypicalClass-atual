/**
 * Propõe as exigências de um conteúdo, e nunca as declara.
 *
 * Barreira de questão é **medida**: o detector conta caracteres e não tem
 * opinião. Exigência de conteúdo não é assim — "o texto é a aula" e "o aluno
 * precisa operar com o símbolo" são leituras, e por isso as 170 exigências do
 * acervo foram declaradas por gente.
 *
 * O que faltava era saber **quanto** disso uma máquina consegue enxergar, e o
 * acervo responde: 170 conteúdos com exigência declarada por leitura humana são
 * 1.190 rótulos contra os quais medir. `medir-exigencias.mjs` faz essa conta.
 *
 * ## Por que este não é o `conferir.mjs`
 *
 * `conferir.mjs` levanta **sinal**: acha uma palavra e pede que alguém olhe.
 * Ele erra muito de propósito, e por isso existe `sinaisDispensados`. Este aqui
 * faz outra pergunta — *quais exigências este conteúdo faz?* — e a resposta é
 * uma proposta a ser confirmada. É a peça que o adaptador vai precisar quando o
 * professor colar um plano de aula, porque plano de aula não tem detector.
 *
 * ## A regra que muda tudo: olhar o campo certo
 *
 * A primeira versão do `conferir.mjs` procurava a palavra no texto inteiro e
 * errou nove de nove — "quadra" dentro de *quadrado*, "conto" dentro de
 * *desconto*. A diferença aqui é que cada exigência olha só onde ela poderia
 * aparecer: `producao-do-aluno` pergunta ao `comoAvaliar`, `pratica-concreta`
 * pergunta aos `materiais`. Campo errado é metade do falso positivo.
 */

const norm = (t) => String(t ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
const junta = (...partes) => norm(partes.filter(Boolean).join(" \n "))

/** Os campos do conteúdo, separados — a pergunta muda conforme onde se olha. */
export function campos(conteudo) {
  const plano = conteudo.plano ?? {}
  const etapas = (plano.etapas ?? []).map((e) => `${e.titulo ?? ""} ${e.comoFazer ?? ""}`).join(" \n ")
  return {
    assunto: junta(conteudo.titulo, conteudo.descricao),
    objetivo: junta(plano.objetivo),
    materiais: junta(...(plano.materiais ?? [])),
    etapas: junta(etapas),
    avaliar: junta(plano.comoAvaliar),
    tudo: junta(
      conteudo.titulo,
      conteudo.descricao,
      plano.objetivo,
      (plano.materiais ?? []).join(" "),
      etapas,
      plano.comoAvaliar,
    ),
  }
}

const tem = (texto, ...termos) => termos.some((t) => new RegExp(t, "i").test(texto))

export const REGRAS = {
  "leitura-extensa": (f) =>
    tem(
      f.materiais,
      "\\btexto",
      "livro",
      "romance",
      "conto\\b",
      "cronica",
      "poema",
      "artigo",
      "reportagem",
      "documento",
      "fonte escrita",
      "capitulo",
      "trecho",
      "obra",
    ) ||
    tem(
      f.etapas,
      "ler o texto",
      "leitura do texto",
      "leitura integral",
      "ler a obra",
      "ler o capitulo",
      "ler o conto",
      "leitura silenciosa",
      "leitura compartilhada",
    ),

  "sequencia-de-passos": (f) =>
    tem(
      f.assunto,
      "algoritmo",
      "balanceament",
      "passo a passo",
      "procediment",
      "analise sintatica",
      "fluxograma",
      "notacao cientifica",
      "divisao",
      "equacao",
    ) ||
    tem(f.etapas, "na ordem", "ordem obrigatoria", "cada passo", "primeiro passo", "passo a passo", "algoritmo", "trocar a ordem"),

  "vocabulario-tecnico": (f) =>
    tem(f.assunto, "nomenclatura", "classificar", "termos", "conceito de", "glossario", "taxonomia") ||
    tem(f.etapas, "glossario", "lista de termos", "vocabulario", "nomear os termos", "definir o termo"),

  "representacao-visual": (f) =>
    tem(
      f.tudo,
      "grafico",
      "mapa\\b",
      "mapas\\b",
      "diagrama",
      "esquema",
      "linha do tempo",
      "tabela",
      "plano cartesiano",
      "malha",
      "croqui",
      "planta baixa",
      "cartograma",
      "histograma",
      "pictograma",
      "imagem",
      "reproduc",
    ),

  "abstracao-simbolica": (f) =>
    tem(
      f.tudo,
      "formula",
      "equacao",
      "variavel",
      "incognita",
      "notacao",
      "simbolo",
      "algebric",
      "expressao algebrica",
      "funcao\\b",
      "coeficiente",
      "vetor",
    ),

  "producao-do-aluno": (f) =>
    tem(
      f.avaliar,
      "produz",
      "escrev",
      "redig",
      "apresent",
      "cria\\b",
      "criar",
      "elabor",
      "desenh",
      "seminario",
      "cartaz",
      "relatorio",
      "texto do aluno",
      "producao",
    ) ||
    tem(f.objetivo, "produz", "escrev", "redig", "apresent", "criar", "elabor", "desenh") ||
    /**
     * O artefato costuma vir como **substantivo**, e não como verbo.
     *
     * "A intervenção realizada", "A ficha completa", "A proposta com dois
     * critérios", "As duas explicações escritas" — o `comoAvaliar` nomeia a
     * coisa que o aluno entrega, e nenhum verbo de produção aparece. Procurar
     * verbo perdia 48 das 89 declaradas, e esta linha sozinha recuperou treze.
     * É também o limite do método: reconhecer que "a ficha" é algo que o aluno
     * produz e "a relação padrão-matriz" não é leitura, não casamento.
     */
    tem(
      f.avaliar,
      "^(a|o|as|os) (intervencao|versao|proposta|ficha|projeto|maquete|cartaz|mural|roteiro|percurso|linha do tempo|mapa|texto|redacao|carta|resenha|resumo|esquema|desenho|composicao|arranjo|coreografia|encenacao|jogo|modelo|prototipo|relato|registro|argumento|explicacoes|justificativa)",
    ),

  "pratica-concreta": (f) =>
    tem(
      f.materiais,
      "barbante",
      "regua",
      "tesoura",
      "cola",
      "massa de model",
      "balanca",
      "termometro",
      "corda",
      "bola",
      "material dourado",
      "transferidor",
      "compasso",
      "recipiente",
      "copo",
      "agua\\b",
      "sement",
      "lupa",
      "ima\\b",
      "pilha",
      "fita metrica",
      "cronometro",
      "vela",
      "espelho",
    ) ||
    tem(
      f.etapas,
      "experiment",
      "manipul",
      "medir com",
      "montar",
      "construir com",
      "saida de campo",
      "laboratorio",
      "com o corpo",
      "movimento do corpo",
      "recortar",
      "manuseia",
    ),
}

export const IDS = Object.keys(REGRAS)

/** As exigências que este conteúdo aparenta fazer. Proposta, não declaração. */
export function proporExigencias(conteudo) {
  const f = campos(conteudo)
  return IDS.filter((id) => REGRAS[id](f))
}
