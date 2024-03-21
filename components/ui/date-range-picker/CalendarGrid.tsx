import { useCalendarGrid, useLocale } from "react-aria"
import { getWeeksInMonth } from "@internationalized/date"
import { CalendarCell } from "./CalendarCell"
import { RangeCalendarState } from "react-stately"
import { AriaCalendarGridProps } from "@react-aria/calendar"

interface CalendarGridProps extends AriaCalendarGridProps {
  state: RangeCalendarState
}
export const CalendarGrid = ({ state, ...props }: CalendarGridProps) => {
  const { locale } = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state)

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)
  const daysInMonth: number[] = Array.from({ length: weeksInMonth }).map((_, i) => i)

  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps} className="text-gray-600">
        <tr>
          {weekDays.map((day, index) => (
            <th className="text-center font-light text-sm pb-1.5" key={index}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {daysInMonth.map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) => (date ? <CalendarCell key={i} state={state} date={date} /> : <td key={i} />))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
