/**
 * O nível de garantia da resposta, declarado por acervo.
 *
 * Vive num módulo próprio, sem nada mais dentro, porque é importado tanto pelo
 * conferidor quanto pelo script que escreve a declaração nos arquivos. Se
 * morasse dentro daquele script, importá-lo do conferidor rodaria a escrita a
 * cada conferência.
 *
 * As duas frases são diferentes de propósito, e a diferença é o ponto: o ENEM
 * tem a resposta conferida contra duas fontes independentes, o vestibular tem
 * uma só. Misturar os dois níveis sem avisar seria o pior dos dois mundos, e é
 * por isso que toda questão declara em qual está — inclusive no banco, onde a
 * restrição `questoes_fonte_declara_validacao` recusa quem chegar sem.
 */

export const VALIDACAO_ENEM = "duas fontes independentes (API enem.dev e TX_GABARITO dos microdados do INEP)"

export const VALIDACAO_VESTIBULAR = "fonte única (BLUEX)"
