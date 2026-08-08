import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Área do professor",
  description: "Acesso à área do professor.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
