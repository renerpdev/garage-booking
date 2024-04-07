import React, { PropsWithChildren } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { RangeCalendar } from "@/src/components/ui/date-range-picker/RangeCalendar"
import { DateValue, getLocalTimeZone } from "@internationalized/date"
import { RangeTime, RangeTimeValue } from "@/src/components/ui/time-range-picker"
import { RangeValue } from "@react-types/shared"
import { formatInTimeZone, LONG_FORMAT } from "@/src/lib/utils"
import { useBookingContext } from "@/src/context/booking-context"

interface DateRangePickerProps extends PropsWithChildren {
  isPopoverOpen: boolean
  startDateTime: Date
  endDateTime: Date
  dateRangeValue: RangeValue<DateValue>
  onDateRangeChange: (_value: RangeValue<DateValue>) => void
  onTimeRangeChange: (_value: RangeTimeValue) => void
  onDialogOpen: (_open: boolean) => void
  onDatePickerCancel: () => void
  onDatePickerApply: () => void
}
const DateTimeRangePicker = ({
  children,
  isPopoverOpen,
  onDialogOpen,
  onDateRangeChange,
  onTimeRangeChange,
  startDateTime,
  endDateTime,
  dateRangeValue,
  onDatePickerCancel,
  onDatePickerApply
}: DateRangePickerProps) => {
  const { disabledHours, disabledDays } = useBookingContext()

  const isDisabledDate = (date: Date) => disabledHours.has(date.toISOString())

  return (
    <div>
      <Dialog onOpenChange={onDialogOpen} open={isPopoverOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className={"h-full overflow-y-auto p-6 lg:h-auto max-h-[700px]"}>
          <DialogHeader>
            <DialogDescription asChild>
              <div>
                <div className={"flex flex-col items-center px-4"}>
                  <RangeCalendar
                    onChange={onDateRangeChange}
                    value={dateRangeValue}
                    isDateUnavailable={(date) => disabledDays.has(date.toDate(getLocalTimeZone()).toISOString())}
                  />
                  <RangeTime
                    onChange={onTimeRangeChange}
                    value={{
                      start: startDateTime,
                      end: endDateTime
                    }}
                    disabledDates={disabledHours}
                  />
                </div>
                <br />
                <DateRangeSelected start={startDateTime} end={endDateTime} />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className={"flex gap-2 sm:justify-center sm:pt-4 mt-auto"}>
            <Button variant={"outline"} className={"min-w-28"} onClick={onDatePickerCancel}>
              Cancelar
            </Button>
            <Button
              className={"min-w-28"}
              onClick={onDatePickerApply}
              disabled={
                isDisabledDate(startDateTime) ||
                isDisabledDate(endDateTime) ||
                startDateTime >= endDateTime ||
                startDateTime < new Date()
              }>
              Aplicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export const DateRangeSelected = ({ start, end }: Record<"start" | "end", Date>) => {
  if (!start || !end) return null

  const formattedStartDate = formatInTimeZone(start, LONG_FORMAT)
  const formattedEndDate = formatInTimeZone(end, LONG_FORMAT)

  return (
    <div className={"flex justify-center items-center text-xs md:text-sm w-full text-gray-600"}>
      <time dateTime={formattedStartDate}>{formattedStartDate}</time>
      <span>&nbsp;-&nbsp;</span>
      <time dateTime={formattedEndDate}>{formattedEndDate}</time>
    </div>
  )
}

export default DateTimeRangePicker
