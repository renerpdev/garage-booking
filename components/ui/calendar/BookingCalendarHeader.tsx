import React from "react"
import { CalendarButton } from "@/components/ui/calendar/BookingCalendarButton"
import { CalendarCheck, CalendarFold, ChevronLeft, ChevronRight, Circle, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useCalendar } from "react-aria"
import { CalendarDate } from "@internationalized/date"
import { CalendarState, CalendarStateOptions } from "react-stately"

interface CalendarHeaderProps extends Partial<CalendarStateOptions> {
  state: CalendarState
}
export const CalendarHeader = ({ state, ...props }: CalendarHeaderProps) => {
  let { prevButtonProps, nextButtonProps, title } = useCalendar(props, state)

  const goToToday = () => {
    const currentDate = new Date()
    state.setFocusedDate(new CalendarDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()))
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
      <h1 className="text-base font-semibold leading-6 text-black">
        <time dateTime="2022-01">{title}</time>
      </h1>
      <div className="flex items-center">
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
        <div className="hidden md:flex md:items-center">
          <div className="ml-6 h-6 w-px bg-gray-300"></div>
          <Link
            href={"/"}
            className="ml-6 rounded-md bg-primary text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            <Button className={"flex gap-1 items-center"}>
              <CalendarCheck size={16} /> Reservar
            </Button>
          </Link>
        </div>
        <div className="ml-6 md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
                id="menu-0-button"
                aria-expanded="false"
                aria-haspopup="true">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal size={18} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-0" align={"end"}>
              <ul className={"flex flex-col"}>
                <li className={"flex items-center ring-1 first:ring-0 ring-gray-100"}>
                  <Link
                    href={"/"}
                    className="text-gray-700 px-4 py-4 text-sm gap-2 flex items-center hover:text-primary">
                    <CalendarCheck size={14} /> Ir a reservar
                  </Link>
                </li>
                <li className={"flex items-center ring-1 first:ring-0 ring-gray-100"}>
                  <button
                    type={"button"}
                    onClick={goToToday}
                    className="px-4 py-4 text-sm gap-2 flex items-center hover:text-primary"
                    role="menuitem">
                    <CalendarFold size={14} /> Fecha actual
                  </button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
