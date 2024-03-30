"use client"

import { isPermissionGranted, subscribe } from "@/lib/notifications"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function Notifications() {
  const [isBannerVisible, setIsBannerVisible] = useState(false)

  useEffect(() => {
    if (isPermissionGranted()) {
      setIsBannerVisible(false)
    } else {
      setIsBannerVisible(true)
    }
  }, [])

  if (!isBannerVisible) {
    return null
  }

  return (
    <div
      className={
        "fixed bottom-0 left-0 z-10 bg-white shadow-md flex items-center py-4 px-6 justify-center w-full ring-1 ring-primary/50"
      }>
      <div className={"mx-auto flex items-center"}>
        <p className={"mr-2"}>Para activar las notificaciones, por favor, acepta el permiso de notificación.</p>
        <Button onClick={subscribe} title="Aceptar notificaciones" variant={"secondary"}>
          Activar
        </Button>
      </div>
      <Button
        onClick={() => setIsBannerVisible(false)}
        title="Cerrar banner de notificación"
        variant={"link"}
        className={"p-0"}>
        <X className={"w-4 h-4"} />
      </Button>
    </div>
  )
}
