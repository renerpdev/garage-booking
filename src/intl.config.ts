import { Pathnames } from "next-intl/navigation"

export const locales = ["es", "en"] as const

export const defaultLocale = "es"

export const pathnames = {
  "/": "/",
  "/admin": "/admin"
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
