import { useRef } from "react"
import { useCalendarCell, useLocale, useFocusRing, mergeProps } from "react-aria"
import { isSameDay, getDayOfWeek, isToday, getLocalTimeZone, CalendarDate } from "@internationalized/date"
import { RangeCalendarState } from "react-stately"

interface CalendarCellProps {
  state: RangeCalendarState
  date: CalendarDate
}
export const CalendarCell = ({ state, date }: CalendarCellProps) => {
  let ref = useRef<HTMLDivElement>(null)
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
    isUnavailable
  } = useCalendarCell({ date }, state, ref)

  // The start and end date of the selected range will have
  // an emphasized appearance.
  let isSelectionStart = state.highlightedRange ? isSameDay(date, state.highlightedRange.start) : isSelected
  let isSelectionEnd = state.highlightedRange ? isSameDay(date, state.highlightedRange.end) : isSelected

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  let { locale } = useLocale()
  let dayOfWeek = getDayOfWeek(date, locale)
  let isRoundedLeft = isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1)
  let isRoundedRight =
    isSelected && (isSelectionEnd || dayOfWeek === 6 || date.day === date.calendar.getDaysInMonth(date))

  let { focusProps, isFocusVisible } = useFocusRing()

  return (
    <td {...cellProps} className={`py-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}>
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={`w-10 h-10 outline-none group text-sm size-10 text-gray-900 ${
          isRoundedLeft ? "rounded-l-full" : ""
        } ${isRoundedRight ? "rounded-r-full" : ""} ${
          isSelected ? (isInvalid ? "bg-red-100" : "bg-gray-100") : ""
        } ${isDisabled || isUnavailable || isOutsideVisibleRange ? `disabled pointer-events-none ${isOutsideVisibleRange ? "opacity-10" : "opacity-25"}` : ""} ${
          // Hover state for cells in the middle of the range.
          isSelected && !isDisabled && !(isSelectionStart || isSelectionEnd)
            ? isInvalid
              ? "hover:bg-red-200"
              : "hover:bg-violet-200"
            : ""
        }`}>
        <div
          className={`w-full h-full rounded-full flex items-center justify-center ${isToday(date, getLocalTimeZone()) ? "ring-1 ring-black" : ""} ${
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible ? "ring-2 group-focus:z-2 ring-violet-600 ring-offset-2" : ""
          } ${
            // Darker selection background for the start and end.
            isSelectionStart || isSelectionEnd
              ? isInvalid
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-primary text-white hover:bg-violet-700 opacity-100"
              : ""
          } ${
            // Hover state for non-selected cells.
            !isSelected && !isDisabled ? "hover:ring-1 hover:ring-primary" : ""
          } cursor-default`}>
          {formattedDate}
        </div>
      </div>
    </td>
  )
}
