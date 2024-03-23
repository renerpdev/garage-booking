import React from "react"
import { TimePicker } from "./TimePicker"

export type RangeTimeValue = {
  start: Date
  end: Date
}

interface RangeTimeProps {
  value?: RangeTimeValue
  onChange?: (_value: RangeTimeValue) => void
  disabledDates?: Set<string>
}
export const RangeTime = ({ onChange, value, disabledDates = new Set() }: RangeTimeProps) => {
  const handleStartTimeChange = (start: Date) => {
    onChange?.({
      start: start,
      end: value?.end || new Date()
    })
  }

  const handleEndTimeChange = (end: Date) => {
    onChange?.({
      start: value?.start || new Date(),
      end: end
    })
  }

  const isTimeInvalid = (date: Date) => disabledDates.has(date.toISOString())

  return (
    <div className={"flex flex-col sm:flex-row gap-2 mt-2"}>
      <div className={"flex items-center justify-center sm:flex-col gap-2"}>
        <span className={"text-xs self-center"}>Desde:</span>
        <TimePicker
          value={value?.start}
          onChange={handleStartTimeChange}
          isInvalid={isTimeInvalid}
          minValue={new Date()}
        />
      </div>
      <span className={"hidden sm:block self-center"}>-</span>
      <div className={"flex items-center justify-center sm:flex-col gap-2"}>
        <span className={"text-xs self-center"}>Hasta:</span>
        <TimePicker
          value={value?.end}
          onChange={handleEndTimeChange}
          isInvalid={isTimeInvalid}
          minValue={value?.start}
        />
      </div>
    </div>
  )
}
