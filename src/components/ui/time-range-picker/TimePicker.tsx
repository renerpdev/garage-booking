import React from "react"
import { TimeSelect } from "./TimeSelect"
import { useTranslations } from "next-intl"

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
  minValue?: Date
}

export const TimePicker = ({ onChange, value, isInvalid, minValue }: TimePickerProps) => {
  const t = useTranslations("Components.TimeRangePicker")

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
    return date.getTime() < (minValue?.getTime() || 0) && hour.value < (minValue?.getHours() || 0)
  }).map((hour) => hour.value)

  const disabledMinutes = MINUTES.filter((minute) => {
    const date = new Date(value || 0)
    date.setMinutes(minute.value)
    return isInvalid?.(date) || (minValue?.getTime() || 0) >= date.getTime()
  }).map((minute) => minute.value)

  const isInvalidTime =
    disabledHours.includes(value?.getHours() || 0) || disabledMinutes.includes(value?.getMinutes() || 0)

  return (
    <div>
      <div className={`flex justify-center items-center gap-x-2 ${isInvalidTime ? "*:text-red-600" : ""}`}>
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
      {isInvalidTime && <div className={"text-red-500 text-xs mt-1 text-center"}>{t("invalidTime")}</div>}
    </div>
  )
}
