import React from "react"
import { CalendarButton } from "@/components/ui/calendar/BookingCalendarButton"
import { CalendarCheck, ChevronLeft, ChevronRight, Circle, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCalendar } from "react-aria"
import { CalendarDate } from "@internationalized/date"
import { CalendarState, CalendarStateOptions } from "react-stately"
import { BookingModal } from "@/components/core/BookingModal"
import { useBookingContext } from "@/context/booking-context"

interface CalendarHeaderProps extends Partial<CalendarStateOptions> {
  state: CalendarState
}
export const CalendarHeader = ({ state, ...props }: CalendarHeaderProps) => {
  let { prevButtonProps, nextButtonProps, title } = useCalendar(props, state)
  const { isLoading } = useBookingContext()

  const goToToday = () => {
    const currentDate = new Date()
    state.setFocusedDate(new CalendarDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()))
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-4 md:px-6 py-4 lg:flex-none">
      <h1 className="text-base font-semibold leading-6 text-black">
        <time dateTime="2022-01">{title}</time>
      </h1>
      <div className="flex items-center">
        {isLoading && <LoaderCircle className={"h-6 w-6 mr-2 text-primary animate-spin"} />}
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <CalendarButton
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-r-none rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:bg-white hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            {...prevButtonProps}>
            <span className="sr-only">Previous month</span>
            <ChevronLeft size={18} />
          </CalendarButton>
          <CalendarButton
            className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-primary focus:relative md:block"
            onClick={goToToday}>
            Hoy
          </CalendarButton>
          <CalendarButton
            type="button"
            className="flex h-9 w-8 items-center justify-center border-gray-300 border-y fill-gray-400 hover:fill-gray-500 text-gray-400 hover:text-gray-500 focus:relative md:hidden"
            onClick={goToToday}>
            <span className="sr-only">Current day</span>
            <Circle size={10} className="md:hidden" fill={""} />
          </CalendarButton>
          <CalendarButton
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-l-none rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:bg-white hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            {...nextButtonProps}>
            <span className="sr-only">Next month</span>
            <ChevronRight size={18} />
          </CalendarButton>
        </div>
        <div className="flex md:items-center">
          <div className="hidden md:inline-block ml-6 h-6 w-px bg-gray-300"></div>
          <BookingModal>
            <Button className={"ml-4 md:ml-6 flex gap-1 items-center"}>
              <CalendarCheck size={16} />
              <span className={"sr-only md:not-sr-only"}> Reservar</span>
            </Button>
          </BookingModal>
        </div>
      </div>
    </header>
  )
}
