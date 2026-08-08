import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Autismo",
  description: "Estratégias, atividades, cursos e materiais para trabalhar com alunos autistas em sala de aula.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
