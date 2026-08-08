import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre",
  description: "Quem somos e como o AtypicalClass é construído.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
