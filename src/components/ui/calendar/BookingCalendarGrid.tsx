import { AriaCalendarGridProps } from "@react-aria/calendar"
import { CalendarState } from "react-stately"
import { useCalendarGrid } from "react-aria"
import { getWeeksInMonth } from "@internationalized/date"
import React from "react"
import { CalendarCell } from "@/src/components/ui/calendar/BookingCalendarCell"
import { useLocale } from "next-intl"

interface CalendarGridProps extends AriaCalendarGridProps {
  state: CalendarState
}
export const CalendarGrid = ({ state, ...props }: CalendarGridProps) => {
  const locale = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid({ weekdayStyle: "long", ...props }, state)

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)
  const daysInMonth: number[] = Array.from({ length: weeksInMonth }).map((_, i) => i)

  return (
    <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col" {...gridProps}>
      <div
        {...headerProps}
        className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
        {weekDays.map((day, index) => {
          return (
            <div className="flex justify-center bg-white py-2 capitalize" key={index}>
              <span className={"uppercase sm:sr-only"}>{day[0]}</span>
              <span className="sr-only sm:not-sr-only lg:sr-only">{day.substring(0, 3)}</span>
              <span className="sr-only lg:not-sr-only">{day}</span>
            </div>
          )
        })}
      </div>
      <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <div className="isolate grid w-full grid-cols-7 grid-rows-5 gap-px lg:hidden">
          {daysInMonth.map((weekIndex) =>
            state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? <CalendarCell key={i} state={state} date={date} mode="button" /> : <span key={i} />
              )
          )}
        </div>
        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
          {daysInMonth.map((weekIndex) =>
            state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? <CalendarCell key={i} state={state} date={date} mode="div" /> : <span key={i} />
              )
          )}
        </div>
      </div>
    </div>
  )
}
