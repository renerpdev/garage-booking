import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormControl } from "@/components/ui/form"

interface TimeSelectProps {
  defaultValue: string
  options: { label: string; value: string }[]
  onChange?: (_value: string) => void
}
export function TimeSelect({ options, defaultValue, onChange }: TimeSelectProps) {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <FormControl>
        <SelectTrigger className="w-[65px] text-black text-sm">
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={`${option.value}`}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
