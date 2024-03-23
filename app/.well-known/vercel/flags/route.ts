import { NextResponse } from "next/server"
import { type ApiData } from "@vercel/flags"

export async function GET() {
  const apiData = {
    definitions: {
      calendarFeature: {
        description: "Controls whether the Calendar feature is visible",
        origin: "https://garage-booking.renerp.dev/calendar",
        options: [
          { value: false, label: "Off" },
          { value: true, label: "On" }
        ]
      },
      loginFeature: {
        description: "Controls whether the Login feature is visible",
        origin: "https://garage-booking.renerp.dev",
        options: [
          { value: false, label: "Off" },
          { value: true, label: "On" }
        ]
      }
    }
  }
  return NextResponse.json<ApiData>(apiData)
}
