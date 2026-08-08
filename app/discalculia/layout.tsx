import type { Metadata } from "next"

export const metadata: Metadata = { title: "Discalculia", description: "Instrução explícita, sequência concreto-abstrato e senso numérico para alunos com discalculia." }

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
