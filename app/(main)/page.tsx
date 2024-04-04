import { BookingCalendar } from "@/components/ui/calendar"
import React from "react"
import Head from "next/head"

export default function Home() {
  return (
    <div className={"h-full w-full"}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#7B39ED" />
      </Head>
      <div className={"hidden bg-red-50"}>{/* this element is used for adding tailwind classes */}</div>
      <BookingCalendar />
    </div>
  )
}
