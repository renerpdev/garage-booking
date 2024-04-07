import { BookingCalendar } from "@/src/components/ui/calendar"
import React from "react"

export default function Home() {
  // // Enable static rendering
  // unstable_setRequestLocale(locale)
  //
  // const t = useTranslations("Index")
  return (
    <div className={"h-full w-full"}>
      <div className={"hidden bg-red-50"}>{/* this element is used for adding tailwind classes */}</div>
      <BookingCalendar />
    </div>
  )
}
