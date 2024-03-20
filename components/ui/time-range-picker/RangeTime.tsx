import React from "react"
import { TimePicker } from "./TimePicker"

export type RangeTimeValue = {
  startTime: Date
  endTime: Date
}

interface RangeTimeProps {
  value?: RangeTimeValue
  onChange?: (_value: RangeTimeValue) => void
  disabledDates?: Date[]
}
export function RangeTime({ onChange, value, disabledDates = [] }: RangeTimeProps) {
  const handleStartTimeChange = (start: Date) => {
    onChange?.({
      startTime: start,
      endTime: value?.endTime || new Date()
    })
  }

  const handleEndTimeChange = (end: Date) => {
    onChange?.({
      startTime: value?.startTime || new Date(),
      endTime: end
    })
  }

  const isTimeInvalid = (date: Date) => {
    return !!disabledDates?.find((dDate) => {
      return dDate.getTime() === date.getTime()
    })
  }

  return (
    <div className={"flex flex-col gap-2 mt-2"}>
      <div className={"flex items-center justify-center gap-2"}>
        <span className={"text-xs"}>Desde:</span>
        <TimePicker
          value={value?.startTime}
          onChange={handleStartTimeChange}
          isInvalid={isTimeInvalid}
          minValue={new Date()}
        />
      </div>
      <div className={"flex items-center justify-center gap-2"}>
        <span className={"text-xs"}>Hasta:</span>
        <TimePicker
          value={value?.endTime}
          onChange={handleEndTimeChange}
          isInvalid={isTimeInvalid}
          minValue={value?.startTime}
        />
      </div>
    </div>
  )
}
