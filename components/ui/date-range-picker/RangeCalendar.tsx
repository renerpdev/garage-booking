import { useRef } from "react"
import { useRangeCalendarState } from "react-stately"
import { useRangeCalendar, useLocale } from "react-aria"
import { CalendarDate, createCalendar } from "@internationalized/date"
import { CalendarButton } from "./CalendarButton"
import { CalendarGrid } from "./CalendarGrid"
import { ChevronLeftIcon, ChevronRightIcon, DotIcon } from "lucide-react"
import { RangeCalendarStateOptions } from "@react-stately/calendar"

const currentDate = new Date()

export const RangeCalendar = (props: Partial<RangeCalendarStateOptions>) => {
  let { locale } = useLocale()
  let state = useRangeCalendarState({
    allowsNonContiguousRanges: false,
    minValue: new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()),
    ...props,
    locale,
    createCalendar
  })

  let ref = useRef<HTMLDivElement>(null)
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(props, state, ref)

  const goToToday = () => {
    state.setFocusedDate(new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()))
  }

  return (
    <div {...calendarProps} ref={ref} className="inline-block">
      <div className="flex items-center pb-4">
        <h2 className="flex-1 font-semibold text-md ml-2">{title}</h2>
        <div className={"flex items-center"}>
          <CalendarButton {...prevButtonProps}>
            <ChevronLeftIcon className="h-6 w-6" />
          </CalendarButton>
          <CalendarButton onClick={goToToday}>
            <DotIcon className="h-6 w-6" />
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
