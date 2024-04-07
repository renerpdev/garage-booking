import { ElementType, useRef } from "react"
import { useButton, useFocusRing, mergeProps, AriaButtonOptions } from "react-aria"

interface CalendarButtonProps extends AriaButtonOptions<ElementType> {
  isDisabled?: boolean
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
export const CalendarButton = ({
  className,
  ...props
}: CalendarButtonProps & React.HTMLAttributes<HTMLButtonElement>) => {
  let ref = useRef<HTMLButtonElement>(null)
  let { buttonProps } = useButton(props, ref)
  let { focusProps, isFocusVisible } = useFocusRing()
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`${props.isDisabled ? "text-gray-400 pointer-events-none" : ""} ${
        !props.isDisabled ? "hover:bg-violet-100 active:bg-violet-200" : ""
      } outline-none ${isFocusVisible ? "ring-2 ring-offset-2 ring-indigo-600" : ""} ${className || "p-2 rounded-full"}`}>
      {props.children}
    </button>
  )
}
