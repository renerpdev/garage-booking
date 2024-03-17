"use server"

import { decrypt, FlagOverridesType } from "@vercel/flags"
import { cookies } from "next/headers"

export async function getFlags() {
  const overrideCookie = cookies().get("vercel-flag-overrides")?.value
  const overrides = overrideCookie ? await decrypt<FlagOverridesType>(overrideCookie) : {}

  return {
    calendarFeature: overrides?.calendarFeature ?? false,
    loginFeature: overrides?.loginFeature ?? false
  }
}
