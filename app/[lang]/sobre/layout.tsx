import type { Metadata } from "next"

import { pageMetadata } from "@/lib/page-metadata"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return pageMetadata(lang, "about", undefined, "Quem somos e como o AtypicalClass é construído.")
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
