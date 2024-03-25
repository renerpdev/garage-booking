import React, { useMemo, useRef } from "react"
import { mergeProps, useCalendarCell, useFocusRing } from "react-aria"
import { CalendarDate, DateValue, isToday, isSameDay as isSameCalendarDay } from "@internationalized/date"
import { CalendarState } from "react-stately"
import { formatInTimeZone, LOCAL_TIME_ZONE } from "@/lib/utils"
import { useBookingContext } from "@/context/booking-context"
import { isSameDay } from "date-fns"
import { Booking } from "@/lib/models"

interface CalendarCellProps {
  state: CalendarState
  date: CalendarDate
}
export const CalendarCell = ({ state, date }: CalendarCellProps) => {
  let ref = useRef<HTMLDivElement>(null)
  let { cellProps, buttonProps, isSelected, isOutsideVisibleRange, isDisabled, formattedDate } = useCalendarCell(
    { date },
    state,
    ref
  )

  let { focusProps, isFocusVisible } = useFocusRing()
  const { scheduledBookings } = useBookingContext()

  const isInBetween = (date: DateValue, booking: Booking) => {
    const currentDate = date.toDate(LOCAL_TIME_ZONE)
    return booking.startDate < currentDate && booking.endDate > currentDate
  }

  const events = useMemo(
    () =>
      scheduledBookings.filter((booking) => {
        const currentDate = date.toDate(LOCAL_TIME_ZONE)
        return (
          isSameDay(booking.startDate, currentDate) ||
          isSameDay(booking.endDate, currentDate) ||
          isInBetween(date, booking)
        )
      }),
    [date, scheduledBookings]
  )

  return (
    <button
      type="button"
      className={`relative focus:z-10 border-l-2 ${isFocusVisible ? "z-10" : "z-0"} ${isSelected ? "bg-primary" : ""} ${isOutsideVisibleRange || isDisabled ? "bg-gray-50 text-gray-400 pointer-events-none" : "bg-white hover:bg-gray-100"} ${isOutsideVisibleRange ? " opacity-70" : ""} ${isSameCalendarDay(date, state.focusedDate) ? "border-primary" : "border-transparent"}`}
      {...cellProps}>
      <div className={"flex flex-col h-14 px-3 py-2 w-full"} {...mergeProps(buttonProps, focusProps)} ref={ref}>
        <time
          dateTime={formatInTimeZone(date.toDate(LOCAL_TIME_ZONE))}
          className={`ml-auto ${isToday(date, LOCAL_TIME_ZONE) ? "bg-black p-1 font-medium rounded-full text-white leading-none" : ""}`}>
          {formattedDate}
        </time>
        <span className="sr-only">{events.length} reservas</span>

        <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
          {events.map((event, index) => (
            <span key={index} className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
          ))}
        </span>
      </div>
    </button>
  )
}
