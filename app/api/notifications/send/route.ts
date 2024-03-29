import { NextResponse, NextRequest } from "next/server"
import { getSubscriptionsFromDb } from "@/db/in-memory-db"
import webpush from "web-push"
import { config } from "@/config"

webpush.setVapidDetails("mailto:test@gmail.com", config.vapidPublicKey, config.vapidPrivateKey)

export async function POST(_: NextRequest) {
  const subscriptions = await getSubscriptionsFromDb()

  subscriptions.forEach((s) => {
    const payload = JSON.stringify({
      title: "Nueva Reserva",
      body: "Una nueva reserva ha sido agregada a la base de datos"
    })
    webpush.sendNotification(s, payload)
  })

  return NextResponse.json({
    message: `${subscriptions.length} messages sent!`
  })
}
