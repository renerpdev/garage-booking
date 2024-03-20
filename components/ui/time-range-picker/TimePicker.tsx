import React from "react"
import { TimeSelect } from "./TimeSelect"

const HOURS = Array.from({ length: 24 }, (_, i) => i).map((value) => ({
  label: `${value < 10 ? "0" : ""}${value}`,
  value
}))

const MINUTES = Array.from({ length: 60 }, (_, i) => i).map((value) => ({
  label: `${value < 10 ? "0" : ""}${value}`,
  value
}))

interface TimePickerProps {
  onChange?: (_value: Date) => void
  value?: Date
  isInvalid?: (_time: Date) => boolean
}

export function TimePicker({ onChange, value, isInvalid }: TimePickerProps) {
  const handleHourChange = (hour: string) => {
    const date = new Date(value || 0)
    date.setHours(parseInt(hour))
    onChange?.(date)
  }

  const handleMinutesChange = (minutes: string) => {
    const date = new Date(value || 0)
    date.setMinutes(parseInt(minutes))
    onChange?.(date)
  }

  const disabledHours = HOURS.filter((hour) => {
    const date = new Date(value || 0)
    date.setHours(hour.value)
    return isInvalid?.(date)
  }).map((hour) => hour.value)

  const disabledMinutes = MINUTES.filter((minute) => {
    const date = new Date(value || 0)
    date.setMinutes(minute.value)
    return isInvalid?.(date)
  }).map((minute) => minute.value)

  return (
    <div className={"flex justify-center items-center gap-x-2"}>
      <TimeSelect
        options={HOURS}
        onChange={handleHourChange}
        value={value?.getHours()}
        disabledOptions={disabledHours}
      />
      <span className="text-gray-800 dark:text-white">:</span>
      <TimeSelect
        options={MINUTES}
        onChange={handleMinutesChange}
        value={value?.getMinutes()}
        disabledOptions={disabledMinutes}
      />
    </div>
  )
}
