import React, { PropsWithChildren } from "react"
import { AriaButtonProps } from "@react-types/button"
import { CalendarButton as DatePickerButton } from "@/src/components/ui/date-range-picker/CalendarButton"

interface CalendarButtonProps extends PropsWithChildren, AriaButtonProps {
  className?: string
  onClick?: () => void
}
export const CalendarButton = ({ children, ...props }: CalendarButtonProps) => (
  <DatePickerButton {...props}>{children}</DatePickerButton>
)
