import React from "react"
import { BookingCalendar } from "@/components/ui/calendar"
import ActiveBookingAlert from "@/components/core/ActiveBookingAlert"

async function CalendarPage() {
  return (
    <div className={"h-full w-full p-4 md:px-6"}>
      <ActiveBookingAlert className={"mb-4"} />
      <BookingCalendar />
    </div>
  )
}

export default CalendarPage
