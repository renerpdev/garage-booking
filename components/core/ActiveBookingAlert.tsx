"use client"

import React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { cn, formatInTimeZone, FULL_FORMAT } from "@/lib/utils"
import { useTimer } from "react-timer-hook"
import { useBookingContext } from "@/context/booking-context"

interface BookingActiveAlertProps {
  className?: string
}
const ActiveBookingAlert = ({ className }: BookingActiveAlertProps) => {
  const { activeBooking, setActiveBooking } = useBookingContext()

  const handleOnExpire = () => {
    setActiveBooking?.(null)
  }

  // if there is no active booking, return null
  if (!activeBooking?.endDate) return null

  return (
    <Alert className={cn("max-w-md mx-auto", className)}>
      <Info className="h-4 w-4" />
      <AlertTitle className={"text-primary font-bold"}>Reserva Activa</AlertTitle>
      <AlertDescription>
        <AlertContent expiryDate={activeBooking.endDate} onExpire={handleOnExpire} />
      </AlertDescription>
    </Alert>
  )
}

const AlertContent = ({ expiryDate, onExpire }: { expiryDate: Date; onExpire: () => void }) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: expiryDate,
    onExpire,
    autoStart: true
  })

  return (
    <div>
      <p
        className={`${days === 0 && hours === 0 && minutes < 5 ? "text-orange-500" : ""} ${days === 0 && hours === 0 && minutes < 1 ? "text-red-500" : ""}`}>
        Quedan{" "}
        {days > 0 ? (
          <>
            <b>{days} días</b>,{" "}
          </>
        ) : null}
        {hours > 0 ? (
          <>
            <b>{hours} horas</b>,{" "}
          </>
        ) : null}
        <b>{minutes} minutos</b> y <b>{seconds} segundos</b>.
      </p>
      <p className={"text-xs text-gray-500"}>
        Finaliza el <span>{formatInTimeZone(expiryDate, FULL_FORMAT)}</span>
      </p>
    </div>
  )
}

export default ActiveBookingAlert
