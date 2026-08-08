import type { Metadata } from "next"

import { pageMetadata } from "@/lib/page-metadata"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return pageMetadata(lang, "resourcesLabel", undefined, "Materiais e recursos de apoio para educação inclusiva.")
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
