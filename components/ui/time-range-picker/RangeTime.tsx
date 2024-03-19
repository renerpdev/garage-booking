import React, { useState } from "react"
import { TimePicker } from "./TimePicker"
import { Time } from "@internationalized/date"

export const DEFAULT_START_TIME = new Time(0, 0)
export const DEFAULT_END_TIME = new Time(23, 59)

interface RangeTimeProps {
  defaultStartTime?: Time
  defaultEndTime?: Time
  onChange?: (_value: Time[]) => void
}
export function RangeTime({
  defaultStartTime = DEFAULT_START_TIME,
  defaultEndTime = DEFAULT_END_TIME,
  onChange
}: RangeTimeProps) {
  const [currentStartTime, setCurrentStartTime] = useState(defaultStartTime)
  const [currentEndTime, setCurrentEndTime] = useState(defaultEndTime)

  const handleStartTimeChange = (value: Time) => {
    setCurrentStartTime(value)
    onChange?.([value, currentEndTime])
  }

  const handleEndTimeChange = (value: Time) => {
    setCurrentEndTime(value)
    onChange?.([currentStartTime, value])
  }

  return (
    <div className={"flex flex-col gap-2 mt-2"}>
      <div className={"flex items-center justify-center gap-2"}>
        <span className={"text-xs"}>Desde:</span>
        <TimePicker defaultValue={defaultStartTime} onChange={handleStartTimeChange} />
      </div>
      <div className={"flex items-center justify-center gap-2"}>
        <span className={"text-xs"}>Hasta:</span>
        <TimePicker defaultValue={defaultEndTime} onChange={handleEndTimeChange} />
      </div>
    </div>
  )
}
