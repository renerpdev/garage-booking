import ActiveBookingAlert from "@/components/core/ActiveBookingAlert"
import { BookingCalendar } from "@/components/ui/calendar"
import React from "react"

export default async function Home() {
  return (
    <div className={"h-full w-full p-4 md:px-6"}>
      <ActiveBookingAlert className={"mb-4"} />
      <BookingCalendar />
    </div>
  )
}
