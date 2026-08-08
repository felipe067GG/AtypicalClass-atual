import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dislexia",
  description: "Structured Literacy: consciência fonêmica, fonética sistemática e fluência para alunos com dislexia.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
