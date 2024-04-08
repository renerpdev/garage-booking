import { BookingCalendar } from "@/src/components/ui/calendar"
import React from "react"
import PageLayout from "@/src/components/layout/PageLayout"
import { unstable_setRequestLocale } from "next-intl/server"
import { PropsWithParams } from "@/src/lib/models"

export default function Home({ params: { locale } }: PropsWithParams) {
  unstable_setRequestLocale(locale)

  return (
    <PageLayout>
      <BookingCalendar />
    </PageLayout>
  )
}
