import { NextResponse } from "next/server"
import { type ApiData } from "@vercel/flags"

export async function GET() {
  const apiData = {
    definitions: {
      adminFeature: {
        description: "Controls whether the Admin feature is visible",
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
