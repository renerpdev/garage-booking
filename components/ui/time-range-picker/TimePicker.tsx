import React from "react"
import { TimeSelect } from "./TimeSelect"
import { Time } from "@internationalized/date"

const HOURS = Array.from({ length: 24 }, (_, i) => i).map((value) => ({
  label: `${value < 10 ? "0" : ""}${value}`,
  value: `${value}`
}))

const MINUTES = Array.from({ length: 60 }, (_, i) => i).map((value) => ({
  label: `${value < 10 ? "0" : ""}${value}`,
  value: `${value}`
}))

interface TimePickerProps {
  onChange?: (_value: Time) => void
  defaultValue?: Time
}

export function TimePicker({ onChange, defaultValue }: TimePickerProps) {
  const [hour, setHour] = React.useState("00")
  const [minutes, setMinutes] = React.useState("00")

  const handleHourChange = (value: string) => {
    setHour(value)
    onChange?.(new Time(parseInt(value), parseInt(minutes)))
  }

  const handleMinutesChange = (value: string) => {
    setMinutes(value)
    onChange?.(new Time(parseInt(hour), parseInt(value)))
  }

  return (
    <div className={"flex justify-center items-center gap-x-2"}>
      <TimeSelect
        options={HOURS}
        defaultValue={`${defaultValue?.hour || HOURS[0].value}`}
        onChange={handleHourChange}
      />
      <span className="text-gray-800 dark:text-white">:</span>
      <TimeSelect
        options={MINUTES}
        defaultValue={`${defaultValue?.minute || MINUTES[0].value}`}
        onChange={handleMinutesChange}
      />
    </div>
  )
}
