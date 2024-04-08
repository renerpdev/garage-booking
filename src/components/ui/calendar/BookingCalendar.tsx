"use client"
import React from "react"

import { useCalendar } from "react-aria"
import { CalendarStateOptions, useCalendarState } from "react-stately"
import { createCalendar } from "@internationalized/date"
import { CalendarFooter } from "@/src/components/ui/calendar/BookingCalendarFooter"
import { CalendarGrid } from "@/src/components/ui/calendar/BookingCalendarGrid"
import { CalendarHeader } from "@/src/components/ui/calendar/BookingCalendarHeader"
import { useLocale, useNow } from "next-intl"
import { formatToCalendarDate } from "@/src/lib/utils"

// TODO: get more inspiration from https://tailwindui.com/components/application-ui/application-shells/calendar

type BookingCalendarProps = Partial<CalendarStateOptions>

export const BookingCalendar = ({ ...props }: BookingCalendarProps) => {
  const locale = useLocale()
  const now = useNow()
  const state = useCalendarState({
    minValue: formatToCalendarDate(now),
    ...props,
    locale,
    createCalendar
  })

  const { calendarProps } = useCalendar(props, state)

  return (
    <div className="lg:flex lg:h-full lg:flex-col rounded-lg bg-gray-50 overflow-hidden shadow-md" {...calendarProps}>
      {/* Here goes the calendar title and action buttons */}
      <CalendarHeader state={state} {...props} />
      {/* Here goes the whole calendar grid */}
      <CalendarGrid state={state} />
      {/* Here goes the info for the selected day */}
      <CalendarFooter state={state} />
    </div>
  )
}
