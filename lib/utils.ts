import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatInTimeZone as formatInTimeZoneFNS } from "date-fns-tz"
import { CalendarDate } from "@internationalized/date"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEFAULT_FORMAT = "dd/MMM hh:mmaa"
export const LONG_FORMAT = "dd/MM/yyyy hh:mmaa"
export const DEFAULT_TIMEZONE = "America/Montevideo"

export function formatInTimeZone(date: Date, format: string = DEFAULT_FORMAT, timeZone: string = DEFAULT_TIMEZONE) {
  return formatInTimeZoneFNS(date, timeZone, format, {
    locale: require("date-fns/locale/es").default
  })
}

export function formatToCalendarDate(date: Date) {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return new CalendarDate(day, month, year)
}
