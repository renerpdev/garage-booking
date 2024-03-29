"use client"

import { notificationsSupported, subscribe } from "@/lib/notification"
import { useEffect } from "react"

export default function Notifications() {
  useEffect(() => {
    if (notificationsSupported()) {
      subscribe().catch(console.error)
    }
  }, [])

  return null
}
