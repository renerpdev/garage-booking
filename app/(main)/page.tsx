"use client"

import ActiveBookingAlert from "@/components/core/ActiveBookingAlert"
import { BookingCalendar } from "@/components/ui/calendar"
import React from "react"
import UnauthorizedAlert from "@/components/ui/UnauthorizedAlert"
import Head from "next/head"

export default function Home() {
  return (
    <div className={"h-full w-full p-4 md:px-6"}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#7B39ED" />
      </Head>
      <div className={"hidden bg-red-50"}>{/* this element is used for adding tailwind classes */}</div>
      <UnauthorizedAlert />
      <ActiveBookingAlert className={"mb-4"} />
      <BookingCalendar />
    </div>
  )
}
