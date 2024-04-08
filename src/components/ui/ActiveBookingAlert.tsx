"use client"

import React, { useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { Info } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { useTimer } from "react-timer-hook"
import { useBookingContext } from "@/src/context/booking-context"
import { Booking } from "@/src/lib/models"
import { useTranslations } from "next-intl"

interface BookingActiveAlertProps {
  className?: string
}
const ActiveBookingAlert = ({ className }: BookingActiveAlertProps) => {
  const { activeBooking, setActiveBooking, setScheduledBookings } = useBookingContext()

  const t = useTranslations("Components.ActiveBookingAlert")

  const handleOnExpire = () => {
    // @ts-ignore
    setScheduledBookings((prev: Booking[]) => prev.filter((booking) => booking.id !== activeBooking.id))
    setActiveBooking?.(null)
  }

  // if there is no active booking, return null
  if (!activeBooking?.endDate) return null

  return (
    <Alert className={cn("md:max-w-md mx-auto shadow-md", className)}>
      <Info className="h-4 w-4" />
      <AlertTitle className={"text-primary font-bold"}>{t("title")}</AlertTitle>
      <AlertDescription>
        <AlertContent expiryDate={activeBooking.endDate} onExpire={handleOnExpire} />
      </AlertDescription>
    </Alert>
  )
}

const AlertContent = ({ expiryDate, onExpire }: { expiryDate: Date; onExpire: () => void }) => {
  const { seconds, minutes, hours, days, isRunning, restart } = useTimer({
    expiryTimestamp: expiryDate,
    onExpire,
    autoStart: true
  })
  const t = useTranslations("Components.ActiveBookingAlert")

  useEffect(() => {
    if (isRunning) {
      restart(expiryDate, true)
    }
  }, [expiryDate, isRunning, restart])

  return (
    <div>
      <p
        className={`${days === 0 && hours === 0 && minutes < 5 ? "text-orange-500" : ""} ${days === 0 && hours === 0 && minutes < 1 ? "text-red-500" : ""}`}>
        {t.rich("description", {
          b: (chunks) => <b className="font-semibold">{chunks}</b>,
          days,
          minutes,
          seconds
        })}
      </p>
      <p className={"text-xs text-gray-500"}>{t("info", { expiryDate })}</p>
    </div>
  )
}

export default ActiveBookingAlert
