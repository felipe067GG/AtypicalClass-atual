import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conteúdos pedagógicos",
  description: "Conteúdos pedagógicos organizados por matéria e especialidade.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
