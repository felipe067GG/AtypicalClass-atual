import { LogoMark } from "@/components/brand/logo"

/**
 * Estado de carregamento das rotas.
 *
 * Antes cada `loading.tsx` devolvia `null` — a tela ficava simplesmente em
 * branco entre uma página e outra. A marca pulsando dá continuidade visual e
 * mostra que algo está acontecendo.
 */
export function PageLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Carregando">
      <LogoMark className="h-12 w-12 animate-pulse text-muted-foreground" />
    </div>
  )
}
