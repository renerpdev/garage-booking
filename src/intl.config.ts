import { Pathnames } from "next-intl/navigation"

export const locales = ["es"] as const

export const defaultLocale = "es"

export const pathnames = {
  "/": "/",
  "/admin": "/admin"
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = "as-needed"

export type AppPathnames = keyof typeof pathnames
