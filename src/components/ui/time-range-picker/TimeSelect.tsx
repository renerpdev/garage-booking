import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { FormControl } from "@/src/components/ui/form"

interface TimeSelectProps {
  options: { label: string; value: number }[]
  value?: number
  onChange?: (_value: string) => void
  disabledOptions?: number[]
}
export const TimeSelect = ({ options, value, onChange, disabledOptions = [] }: TimeSelectProps) => {
  return (
    <Select onValueChange={onChange} value={`${value}`}>
      <FormControl>
        <SelectTrigger className="w-[65px] text-black text-sm">
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={`${option.value}`} disabled={disabledOptions?.includes(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
