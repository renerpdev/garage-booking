import React from "react"
import Calendar from "@/components/core/Calendar"
import { getFlags } from "@/lib/flags"

async function CalendarPage() {
  const flags = await getFlags()

  if (!flags.calendarFeature) {
    return null
  }
  return (
    <div className={"h-full w-full p-2 sm:px-4"}>
      <Calendar />
    </div>
  )
}

export default CalendarPage
