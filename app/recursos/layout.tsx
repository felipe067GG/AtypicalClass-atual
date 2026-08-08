import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recursos",
  description: "Materiais e recursos de apoio para educação inclusiva.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
