import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TDAH",
  description: "Estratégias, atividades, cursos e materiais para trabalhar com alunos com TDAH em sala de aula.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
