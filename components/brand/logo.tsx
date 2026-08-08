/**
 * Marca do AtypicalClass.
 *
 * O símbolo é um "A" cuja travessa está incompleta: a metade direita foi
 * substituída por um ponto deslocado, na cor de acento. É a ideia do site em
 * uma forma — a peça que não segue o padrão não está errada, só é diferente,
 * e é ela que dá identidade ao conjunto.
 *
 * Usa `currentColor` no traço, então herda a cor de onde for colocado e
 * funciona nos dois temas sem variante.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="AtypicalClass">
      {/* vértice do A */}
      <path
        d="M5.5 26.5 L16 5.5 L26.5 26.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* travessa incompleta */}
      <path d="M11 19.2 H16.2" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      {/* a peça atípica */}
      <circle cx="21.2" cy="19.2" r="2.6" className="fill-brand" />
    </svg>
  )
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-7 w-7 shrink-0" />
      <span className="text-lg font-bold tracking-tight">
        Atypical<span className="text-brand">Class</span>
      </span>
    </span>
  )
}
