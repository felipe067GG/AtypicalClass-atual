import coreWebVitals from "eslint-config-next/core-web-vitals"

/**
 * Configuração do ESLint no formato flat.
 *
 * Substitui o `.eslintrc.json`: o Next 16 removeu o comando `next lint` (que
 * era o que lia o formato antigo) e o ESLint 9 usa flat config por padrão. O
 * conjunto de regras é o mesmo de antes — `next/core-web-vitals` —, só que
 * importado direto e executado pela CLI do ESLint via `npm run lint`.
 */
const config = [
  { ignores: [".next/**", "node_modules/**", "out/**", "build/**", "next-env.d.ts"] },
  ...coreWebVitals,
]

export default config
