import ActiveBookingAlert from "@/components/core/ActiveBookingAlert"
import { BookingCalendar } from "@/components/ui/calendar"
import React from "react"
import UnauthAlert from "@/components/ui/UnauthAlert"
import Head from "next/head"

export default async function Home() {
  return (
    <div className={"h-full w-full p-4 md:px-6"}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className={"hidden bg-red-50"}>{/* this element is used for adding tailwind classes */}</div>
      <UnauthAlert />
      <ActiveBookingAlert className={"mb-4"} />
      <BookingCalendar />
    </div>
  )
}
