import { NextResponse, NextRequest } from "next/server"
import { PushSubscription } from "web-push"
import { saveSubscriptionToDb } from "@/db/in-memory-db"

export async function POST(request: NextRequest) {
  const subscription = (await request.json()) as PushSubscription | null

  if (!subscription) {
    throw new Error("No subscription was provided!")
  }

  const updatedDb = await saveSubscriptionToDb(subscription)

  return NextResponse.json({ message: "success", updatedDb })
}
