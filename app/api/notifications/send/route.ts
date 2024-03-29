import { NextResponse, NextRequest } from "next/server"
import webpush, { PushSubscription } from "web-push"
import { config } from "@/config"
import { Subscription } from "@/lib/models"
import { logger } from "@/logger"
import { getAllSubscriptions } from "@/lib/queries"

webpush.setVapidDetails("mailto:test@gmail.com", config.vapidPublicKey, config.vapidPrivateKey)

export async function POST(_: NextRequest) {
  try {
    logger.info("Sending push notification to subscribers")
    const subscriptions: Subscription[] = await getAllSubscriptions()

    await Promise.any(
      subscriptions.map((s) => {
        const payload = JSON.stringify({
          title: "Nueva Reserva",
          body: "Una nueva reserva ha sido agregada a la base de datos"
        })
        const subscription = JSON.parse(s.data) as PushSubscription
        webpush.sendNotification(subscription, payload)
      })
    )

    return NextResponse.json({
      message: `${subscriptions.length} messages sent!`
    })
  } catch (e: any) {
    logger.error(e.message)
    return new NextResponse(JSON.stringify({ message: e.message }), { status: 500 })
  }
}
