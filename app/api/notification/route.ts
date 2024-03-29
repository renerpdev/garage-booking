import { NextResponse, NextRequest } from "next/server"
import webpush, { PushSubscription } from "web-push"
import { config } from "@/config"
import { getSubscriptionsFromDb, saveSubscriptionToDb } from "@/db/in-memory-db"

webpush.setVapidDetails("mailto:i2rhop@gmail.com", config.vapidPublicKey, config.vapidPrivateKey)

export async function POST(request: NextRequest) {
  const subscription = (await request.json()) as PushSubscription | null

  if (!subscription) {
    console.error("No subscription was provided!")
    return
  }

  const updatedDb = await saveSubscriptionToDb(subscription)

  return NextResponse.json({ message: "success", updatedDb })
}

export async function GET(_: NextRequest) {
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
