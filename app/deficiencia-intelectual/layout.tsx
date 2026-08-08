import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deficiência Intelectual",
  description: "Instrução sistemática, análise de tarefa e decisão baseada em dados para alunos com deficiência intelectual.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
