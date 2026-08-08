import type { Metadata } from "next"

import { pageMetadata } from "@/lib/page-metadata"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return pageMetadata(lang, "contribute", "contributePageDesc")
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
