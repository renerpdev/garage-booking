import { BookingCalendar } from "@/components/ui/calendar"
import React from "react"

export default function Home() {
  return (
    <div className={"h-full w-full"}>
      <div className={"hidden bg-red-50"}>{/* this element is used for adding tailwind classes */}</div>
      <BookingCalendar />
    </div>
  )
}
