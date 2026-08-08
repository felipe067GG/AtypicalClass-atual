import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Síndrome de Down",
  description: "Estratégias, atividades, cursos e materiais para trabalhar com alunos com síndrome de Down.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
