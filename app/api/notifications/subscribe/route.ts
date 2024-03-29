import { NextRequest, NextResponse } from "next/server"
import { PushSubscription } from "web-push"
import { logger } from "@/logger"
import { createSubscription } from "@/lib/queries"

export async function POST(request: NextRequest) {
  try {
    const subscription = (await request.json()) as PushSubscription | null

    if (!subscription) {
      return new NextResponse(JSON.stringify({ message: "No subscription was provided!" }), { status: 400 })
    }

    const savedSubscription = await createSubscription({
      data: JSON.stringify(subscription),
      endpoint: subscription.endpoint
    })

    return NextResponse.json({
      message: `Subscription saved successfully! Your endpoint is ${savedSubscription.endpoint}`
    })
  } catch (e: any) {
    logger.error(e.message)
    return new NextResponse(JSON.stringify({ message: e.message }), { status: 500 })
  }
}
