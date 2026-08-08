import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deficiência Visual",
  description: "Estratégias, atividades, cursos e materiais para alunos com deficiência visual.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
