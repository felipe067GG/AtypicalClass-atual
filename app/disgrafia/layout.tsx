import type { Metadata } from "next"

export const metadata: Metadata = { title: "Disgrafia", description: "Fluência no traçado, separar escrever de compor, e avaliar conteúdo em vez de letra." }

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
