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

  const isStartTimeInvalid = (date: Date) => {
    return !!disabledDates?.find((dDate) => {
      const cDate = new Date()
      return (
        dDate.getTime() === date.getTime() ||
        cDate.getHours() > date.getHours() ||
        (cDate.getHours() === date.getHours() && cDate.getMinutes() > date.getMinutes())
      )
    })
  }

  const isEndTimeInvalid = (date: Date) => {
    return !!disabledDates?.find((dDate) => {
      return dDate.getTime() === date.getTime() || (value?.startTime?.getTime() || 0) >= date.getTime()
    })
  }

  return (
    <div className={"flex flex-col gap-2 mt-2"}>
      <div className={"flex items-center justify-center gap-2"}>
        <span className={"text-xs"}>Desde:</span>
        <TimePicker value={value?.startTime} onChange={handleStartTimeChange} isInvalid={isStartTimeInvalid} />
      </div>
      <div className={"flex items-center justify-center gap-2"}>
        <span className={"text-xs"}>Hasta:</span>
        <TimePicker value={value?.endTime} onChange={handleEndTimeChange} isInvalid={isEndTimeInvalid} />
      </div>
    </div>
  )
}
