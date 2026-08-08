"use client"

import { Button } from "@/components/ui/button"
import { Download, Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"

interface DownloadButtonProps {
  fileBaseName: string
  label?: string
  size?: "sm" | "default" | "lg"
  className?: string
}

export function DownloadButton({ fileBaseName, label, size = "sm", className = "" }: DownloadButtonProps) {
  const { t } = useLanguage()

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
        <Button size={size} className={`bg-primary hover:bg-primary/90 ${className}`}>
          <Download className="w-4 h-4 mr-2" />
          {label || t("download")}
          <Globe className="w-3 h-3 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-surface border-border">
        <DropdownMenuLabel className="text-muted-foreground">{t("selectLanguage")}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-surface-3" />
        <DropdownMenuItem
          onClick={() => handleDownload("pt")}
          className="text-foreground hover:bg-surface-2 cursor-pointer focus:bg-surface-2"
        >
          🇧🇷 {languageNames.pt}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDownload("en")}
          className="text-foreground hover:bg-surface-2 cursor-pointer focus:bg-surface-2"
        >
          🇺🇸 {languageNames.en}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDownload("es")}
          className="text-foreground hover:bg-surface-2 cursor-pointer focus:bg-surface-2"
        >
          🇪🇸 {languageNames.es}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
