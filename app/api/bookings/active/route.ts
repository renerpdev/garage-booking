import { NextResponse } from "next/server"
import { getActiveBooking } from "@/lib/queries"
import { logger } from "@/logger"
import { ActiveBooking } from "@/lib/models"

export const revalidate = 0

export async function GET() {
  try {
    const activeBooking: ActiveBooking = await getActiveBooking()

    return NextResponse.json(activeBooking)
  } catch (e: any) {
    logger.error(e.message)
    return new NextResponse(JSON.stringify({ message: e.message }), { status: 500 })
  }
}
