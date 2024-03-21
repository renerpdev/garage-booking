import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatInTimeZone as formatInTimeZoneFNS } from "date-fns-tz"
import { CalendarDate, getLocalTimeZone } from "@internationalized/date"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEFAULT_FORMAT = "dd/MMM hh:mmaa"
export const TIME_FORMAT = "hh:mm:ssaa"
export const LONG_FORMAT = "dd/MM/yyyy hh:mmaa"

export function formatInTimeZone(date: Date, format: string = DEFAULT_FORMAT, timeZone: string = getLocalTimeZone()) {
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

export function getDaysInRange(startDate: Date, endDate: Date) {
  const dates = []
  let currentDate = new Date(startDate)
  currentDate.setDate(currentDate.getDate() + 1)

  while (currentDate < endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
}
