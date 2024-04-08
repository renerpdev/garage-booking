import BookingInfo from "@/src/components/ui/calendar/BookingInfo"
import React, { useMemo } from "react"
import { CalendarState } from "react-stately"
import { useBookingContext } from "@/src/context/booking-context"
import { LOCAL_TIME_ZONE } from "@/src/lib/utils"
import { isSameDay } from "date-fns"
import { useTranslations } from "next-intl"

interface CalendarFooterProps {
  state: CalendarState
}
export const CalendarFooter = ({ state }: CalendarFooterProps) => {
  const { scheduledBookings } = useBookingContext()
  const t = useTranslations("Components.Calendar")

  const events = useMemo(
    () =>
      scheduledBookings.filter((booking) => {
        const currentDate = state.focusedDate?.toDate(LOCAL_TIME_ZONE)
        return (
          isSameDay(booking.startDate, currentDate) ||
          isSameDay(booking.endDate, currentDate) ||
          (booking.startDate < currentDate && booking.endDate > currentDate)
        )
      }),
    [state.focusedDate, scheduledBookings]
  )

  if (!state.focusedDate) return null

  return (
    <div className={"px-4 py-6 lg:hidden"} tabIndex={-1}>
      {events.length > 0 ? (
        <ul className="bg-white shadow rounded-lg overflow-hidden" tabIndex={-1}>
          {events.map((event, index) => (
            <li key={index} className={"ring-1 ring-gray-100 first:ring-0 hover:bg-gray-50"} tabIndex={-1}>
              <div className={"px-4 py-4 flex flex-col w-full"}>
                <BookingInfo {...event} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={"text-sm md:text-base text-center text-muted-foreground"}>{t("noEvents")}</p>
      )}
    </div>
  )
}
