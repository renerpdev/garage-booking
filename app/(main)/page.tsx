"use client"

import ActiveBookingAlert from "@/components/core/ActiveBookingAlert"
import { BookingCalendar } from "@/components/ui/calendar"
import React from "react"
import UnAuthAlert from "@/components/ui/UnAuthAlert"
import Head from "next/head"
import Notifications from "@/components/core/Notifications"

export default async function Home() {
  return (
    <div className={"h-full w-full p-4 md:px-6"}>
      <Notifications />
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#90cdf4" />
      </Head>
      <div className={"hidden bg-red-50"}>{/* this element is used for adding tailwind classes */}</div>
      <UnAuthAlert />
      <ActiveBookingAlert className={"mb-4"} />
      <BookingCalendar />
    </div>
  )
}
