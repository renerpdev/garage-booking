import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatInTimeZone as formatInTimeZoneFNS } from "date-fns-tz"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DEFAULT_FORMAT = "hh:mmaa"
const DEFAULT_TIMEZONE = "America/Montevideo"

export function formatInTimeZone(date: Date, timeZone: string = DEFAULT_TIMEZONE, format: string = DEFAULT_FORMAT) {
  return formatInTimeZoneFNS(date, timeZone, format, {
    locale: require("date-fns/locale/es").default
  })
}
