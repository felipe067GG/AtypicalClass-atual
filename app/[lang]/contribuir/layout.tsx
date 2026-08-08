import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contribuir",
  description: "Compartilhe dicas, questões e experiências com a comunidade de professores.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
