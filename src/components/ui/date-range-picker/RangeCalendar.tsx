import React, { useRef } from "react"
import { useRangeCalendarState } from "react-stately"
import { useRangeCalendar, useLocale } from "react-aria"
import { CalendarDate, createCalendar } from "@internationalized/date"
import { CalendarButton } from "./CalendarButton"
import { CalendarGrid } from "./CalendarGrid"
import { ChevronLeftIcon, ChevronRightIcon, Circle } from "lucide-react"
import { RangeCalendarStateOptions } from "@react-stately/calendar"
import { useNow } from "next-intl"

export const RangeCalendar = (props: Partial<RangeCalendarStateOptions>) => {
  let { locale } = useLocale()
  const now = useNow()
  let state = useRangeCalendarState({
    allowsNonContiguousRanges: false,
    minValue: new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()),
    ...props,
    locale,
    createCalendar
  })

  let ref = useRef<HTMLDivElement>(null)
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(props, state, ref)

  const goToToday = () => {
    state.setFocusedDate(new CalendarDate(now.getFullYear(), now.getMonth(), now.getDate()))
  }

  return (
    <div {...calendarProps} ref={ref} className="inline-block">
      <div className="flex items-center pb-4">
        <h2 className="flex-1 font-semibold text-lg ml-2 text-primary">{title}</h2>
        <div className={"flex items-center"}>
          <CalendarButton {...prevButtonProps}>
            <ChevronLeftIcon className="h-6 w-6" />
          </CalendarButton>
          <CalendarButton onClick={goToToday}>
            <span className="sr-only">Current day</span>
            <Circle size={10} fill={""} className={"fill-gray-500 group-hover:fill-gray-600 m-1.5"} />
          </CalendarButton>
          <CalendarButton {...nextButtonProps}>
            <ChevronRightIcon className="h-6 w-6" />
          </CalendarButton>
        </div>
      </div>
      <CalendarGrid state={state} />
    </div>
  )
}
