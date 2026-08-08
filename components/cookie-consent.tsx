"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Cookie } from "lucide-react"
import Cookies from "js-cookie"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = Cookies.get("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    Cookies.set("cookie-consent", "accepted", { expires: 365 })
    setShowBanner(false)
  }

  const handleReject = () => {
    Cookies.set("cookie-consent", "rejected", { expires: 365 })
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="bg-surface border-border p-6 shadow-2xl">
        <button
          onClick={handleReject}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-4">
          <div className="bg-primary p-3 rounded-lg">
            <Cookie className="w-6 h-6 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">Consentimento de Cookies</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Usamos cookies para salvar suas preferências de idioma e tema. Esses dados ficam armazenados localmente no
              seu navegador.
            </p>
            <div className="flex gap-2">
              <Button onClick={handleAccept} className="bg-primary hover:bg-primary/90">
                Aceitar
              </Button>
              <Button
                onClick={handleReject}
                variant="outline"
                className="border-border hover:bg-surface-2 bg-transparent"
              >
                Rejeitar
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
