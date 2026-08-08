import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Questões adaptadas",
  description: "Banco de questões adaptadas, filtráveis por matéria, especialidade e dificuldade.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
