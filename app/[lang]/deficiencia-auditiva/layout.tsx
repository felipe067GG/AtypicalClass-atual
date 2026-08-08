import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deficiência Auditiva",
  description: "Estratégias, atividades, cursos e materiais para alunos com deficiência auditiva.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
