"use client"

import { Button } from "@/components/ui/button"
import { Download, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"

interface DownloadButtonProps {
  fileBaseName: string
  label?: string
  size?: "sm" | "default" | "lg"
  className?: string
}

export function DownloadButton({ fileBaseName, label, size = "sm", className = "" }: DownloadButtonProps) {
  const { language } = useLanguage()

  const downloads = {
    pt: `/downloads/${fileBaseName}-pt.pdf`,
    en: `/downloads/${fileBaseName}-en.pdf`,
    es: `/downloads/${fileBaseName}-es.pdf`,
  }

  const languageNames = {
    pt: "Português",
    en: "English",
    es: "Español",
  }

  const handleDownload = (lang: "pt" | "en" | "es") => {
    const link = document.createElement("a")
    link.href = downloads[lang]
    link.download = `${fileBaseName}-${lang}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={size} className={`bg-blue-600 hover:bg-blue-700 ${className}`}>
          <Download className="w-4 h-4 mr-2" />
          {label || "Download"}
          <Globe className="w-3 h-3 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-gray-700 light:bg-white light:border-gray-200">
        <DropdownMenuItem
          onClick={() => handleDownload("pt")}
          className="text-white hover:bg-gray-800 cursor-pointer light:text-slate-900 light:hover:bg-gray-100"
        >
          <span className={language === "pt" ? "font-bold text-blue-400" : ""}>{languageNames.pt}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDownload("en")}
          className="text-white hover:bg-gray-800 cursor-pointer light:text-slate-900 light:hover:bg-gray-100"
        >
          <span className={language === "en" ? "font-bold text-blue-400" : ""}>{languageNames.en}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDownload("es")}
          className="text-white hover:bg-gray-800 cursor-pointer light:text-slate-900 light:hover:bg-gray-100"
        >
          <span className={language === "es" ? "font-bold text-blue-400" : ""}>{languageNames.es}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
