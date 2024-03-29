"use client"

import { notificationsSupported, subscribe } from "@/lib/notifications"
import { useEffect } from "react"

export default function Notifications() {
  useEffect(() => {
    if (!notificationsSupported()) {
      console.error("Notifications not supported. You might need to install the PWA first.")
    }

    subscribe().catch(console.error)
  }, [])

  return null
}
