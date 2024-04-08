import React from "react"
import { CalendarButton } from "@/src/components/ui/calendar/BookingCalendarButton"
import { CalendarCheck, ChevronLeft, ChevronRight, Circle, LoaderCircle } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useCalendar } from "react-aria"
import { CalendarDate } from "@internationalized/date"
import { CalendarState, CalendarStateOptions } from "react-stately"
import { BookingModal } from "@/src/components/core/BookingModal"
import { useBookingContext } from "@/src/context/booking-context"
import { useAuth } from "@clerk/nextjs"
import { useTranslations } from "next-intl"

interface CalendarHeaderProps extends Partial<CalendarStateOptions> {
  state: CalendarState
}
export const CalendarHeader = ({ state, ...props }: CalendarHeaderProps) => {
  let { prevButtonProps, nextButtonProps, title } = useCalendar(props, state)
  const { isLoading, isFetching } = useBookingContext()
  const { isSignedIn } = useAuth()
  const t = useTranslations("Components.Calendar")

  const goToToday = () => {
    const currentDate = new Date()
    state.setFocusedDate(new CalendarDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()))
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-4 md:px-6 py-4 lg:flex-none">
      <h1 className="text-base font-semibold leading-6 text-black">
        <time dateTime="2022-01" className={"capitalize text-sm sm:text-base"}>
          {title}
        </time>
      </h1>
      <div className="flex items-center">
        {(isLoading || isFetching) && <LoaderCircle className={"h-6 w-6 mr-2 text-primary animate-spin"} />}
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <CalendarButton
            type="button"
            className="flex h-9 w-8 sm:w-9 items-center justify-center rounded-r-none rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:bg-white hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            {...prevButtonProps}>
            <span className="sr-only">Previous month</span>
            <ChevronLeft size={18} />
          </CalendarButton>
          <CalendarButton
            className="border-y h-9 border-gray-300 px-2.5 text-sm hover:bg-gray-50 group focus:relative md:block fill-gray-400 hover:fill-gray-500 "
            onClick={goToToday}>
            <span className="sr-only">Current day</span>
            <Circle size={10} className="md:hidden text-gray-400 group-hover:hover:text-gray-500" fill={""} />
            <span className={"sr-only md:not-sr-only font-semibold text-gray-900 group-hover:hover:text-primary"}>
              {t("today")}
            </span>
          </CalendarButton>
          <CalendarButton
            type="button"
            className="flex h-9 w-8 sm:w-9 items-center justify-center rounded-l-none rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:bg-white hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            {...nextButtonProps}>
            <span className="sr-only">Next month</span>
            <ChevronRight size={18} />
          </CalendarButton>
        </div>
        {isSignedIn && (
          <div className="flex md:items-center">
            <div className="hidden md:inline-block ml-6 h-6 w-px bg-gray-300"></div>
            <BookingModal>
              <Button className={"ml-4 md:ml-6 flex gap-1 items-center h-8 md:h-auto px-3 md:px-4"}>
                <CalendarCheck size={16} />
                <span className={"sr-only ml-2 md:not-sr-only"}>{t("bookNow")}</span>
              </Button>
            </BookingModal>
          </div>
        )}
      </div>
    </header>
  )
}
