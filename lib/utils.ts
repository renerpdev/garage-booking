import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatInTimeZone as formatInTimeZoneFNS } from "date-fns-tz"
import { CalendarDate, DateValue, getLocalTimeZone } from "@internationalized/date"
import { addDays, differenceInDays, subDays } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEFAULT_FORMAT = "dd/MMM hh:mmaa"
export const TIME_FORMAT = "hh:mm:ssaa"
export const LONG_FORMAT = "dd/MM/yyyy hh:mmaa"

export const FULL_FORMAT = "dd/MMM/yyyy hh:mmaa"

export const LOCAL_TIME_ZONE = getLocalTimeZone()

export function formatInTimeZone(date: Date, format: string = DEFAULT_FORMAT, timeZone: string = LOCAL_TIME_ZONE) {
  return formatInTimeZoneFNS(date, timeZone, format, {
    locale: require("date-fns/locale/es").default
  })
}

export function formatToCalendarDate(date: Date = new Date()) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return new CalendarDate(year, month, day)
}

export function formatCalendarToDate(date: DateValue) {
  return new Date(date.year, date.month - 1, date.day)
}

export function getDaysInRange(startDate: Date, endDate: Date) {
  const dates: Date[] = []
  const currentDate = new Date(startDate)
  const _endDate = new Date(endDate)

  currentDate.setHours(0, 0)
  _endDate.setHours(0, 0)

  while (currentDate <= _endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

export function getMinutesInRange(startDate: Date, endDate: Date) {
  const minutes: Date[] = []
  const currentDate = new Date(startDate)
  const _endDate = new Date(endDate)

  currentDate.setSeconds(0)
  _endDate.setSeconds(0)

  while (currentDate <= _endDate) {
    minutes.push(new Date(currentDate))
    currentDate.setMinutes(currentDate.getMinutes() + 1)
  }

  return minutes
}

export function getDisabledDates(dates: { startDate: Date; endDate: Date }[]) {
  const disabledTimesSet = new Set<string>()
  const disabledDaysSet = new Set<string>()

  dates.forEach(({ startDate, endDate }) => {
    if (differenceInDays(endDate, startDate) > 1) {
      const daysToAdd = startDate.getHours() === 0 && startDate.getMinutes() === 0 ? 0 : 1
      const daysToSubtract = endDate.getHours() === 23 && endDate.getMinutes() === 59 ? 0 : 1

      if (daysToAdd > 0) {
        const startFrom = new Date(startDate)
        const startTo = addDays(startDate, 1)
        startTo.setHours(0, 0)

        const minutesBeforeStart = getMinutesInRange(startFrom, startTo)
        minutesBeforeStart.forEach((date) => {
          disabledTimesSet.add(date.toISOString())
        })
      }

      if (daysToSubtract > 0) {
        const endFrom = new Date(endDate)
        endFrom.setHours(0, 0)

        const minutesAfterEnd = getMinutesInRange(endFrom, endDate)
        minutesAfterEnd.forEach((date) => {
          disabledTimesSet.add(date.toISOString())
        })
      }

      const daysBetweenDates = getDaysInRange(addDays(startDate, daysToAdd), subDays(endDate, daysToSubtract))
      daysBetweenDates.forEach((date) => {
        disabledDaysSet.add(date.toISOString())
      })
    } else {
      const minutesInRange = getMinutesInRange(startDate, endDate)
      minutesInRange.forEach((date) => {
        disabledTimesSet.add(date.toISOString())
      })
    }
  })

  return [disabledTimesSet, disabledDaysSet]
}
