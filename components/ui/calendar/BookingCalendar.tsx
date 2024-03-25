"use client"
import React from "react"

import { useCalendar, useLocale } from "react-aria"
import { CalendarStateOptions, useCalendarState } from "react-stately"
import { CalendarDate, createCalendar } from "@internationalized/date"
import { CalendarFooter } from "@/components/ui/calendar/BookingCalendarFooter"
import { CalendarGrid } from "@/components/ui/calendar/BookingCalendarGrid"
import { CalendarHeader } from "@/components/ui/calendar/BookingCalendarHeader"

// TODO: get more inspiration from https://tailwindui.com/components/application-ui/application-shells/calendar

interface BookingCalendarProps extends Partial<CalendarStateOptions> {
  currentDate?: Date
}
export const BookingCalendar = ({ currentDate = new Date(), ...props }: BookingCalendarProps) => {
  let { locale } = useLocale()
  let state = useCalendarState({
    minValue: new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()),
    ...props,
    locale,
    createCalendar
  })

  let { calendarProps } = useCalendar(props, state)

  return (
    <div className="lg:flex lg:h-full lg:flex-col rounded-lg bg-gray-50 overflow-hidden" {...calendarProps}>
      {/* Here goes the calendar title and action buttons */}
      <CalendarHeader state={state} {...props} />
      {/* Here goes the whole calendar grid */}
      <CalendarGrid state={state} />
      {/* Here goes the info for the selected day */}
      <CalendarFooter state={state} />
    </div>
  )
}
