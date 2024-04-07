import { NextResponse, NextRequest } from "next/server"
import webpush, { PushSubscription } from "web-push"
import { config } from "../../../../config"
import { Subscription } from "@/src/lib/models"
import { logger } from "@/logger"
import { deleteManySubscriptionsByEndpoint, getAllSubscriptions } from "@/src/lib/queries"

webpush.setVapidDetails("mailto:test@gmail.com", config.vapidPublicKey, config.vapidPrivateKey)

export async function POST(req: NextRequest) {
  try {
    const { title, body } = await req.json()

    logger.info("Sending push notification to subscribers")

    const subscriptions: Subscription[] = await getAllSubscriptions()

    const result = await Promise.allSettled(
      subscriptions.map((s) => {
        const payload = JSON.stringify({
          title,
          body
        })
        const subscription = JSON.parse(s.data) as PushSubscription
        return webpush.sendNotification(subscription, payload)
      })
    )

    const markedForDeletion: string[] = result
      .filter((r) => r.status === "rejected")
      .map((r) => (r as any).reason.endpoint)

    if (markedForDeletion.length > 0) {
      await deleteManySubscriptionsByEndpoint(markedForDeletion)
    }

    return NextResponse.json({
      message: `${subscriptions.length} messages sent!`
    })
  } catch (e: any) {
    logger.error(e.message)
    return new NextResponse(JSON.stringify({ message: e.message }), { status: 500 })
  }
}
