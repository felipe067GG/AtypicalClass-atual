import type { Metadata } from "next"

import { specialtyMetadata } from "@/lib/page-metadata"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return specialtyMetadata("transtorno-de-linguagem", lang)
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
