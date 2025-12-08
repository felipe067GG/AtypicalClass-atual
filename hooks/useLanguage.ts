"use client"

import { useLanguage as useLanguageContext } from "@/lib/language-context"

export function useLanguage() {
  return useLanguageContext()
}
