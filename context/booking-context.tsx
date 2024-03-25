"use client"

import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"
import { createBooking, getActiveBooking, getScheduledBookings } from "@/lib/queries"
import { formatInTimeZone, getDisabledDates, LONG_FORMAT, TIME_FORMAT } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Booking } from "@/lib/models"

type ContextType = {
  activeBooking: Omit<Booking, "createdAt"> | null
  setActiveBooking: (_booking: Booking | null) => void
  isLoading: boolean
  disabledHours: Set<string>
  setDisabledHours: (_disabledHours: Set<string>) => void
  disabledDays: Set<string>
  setDisabledDays: (_disabledDays: Set<string>) => void
  createNewBooking: (_booking: Booking) => Promise<void>
  scheduledBookings: Booking[]
  setScheduledBookings: (_bookings: Booking[]) => void
}

const defaultValue = {
  activeBooking: null,
  setActiveBooking: () => {},
  isLoading: false,
  disabledHours: new Set<string>(),
  setDisabledHours: (_: Set<string>) => {},
  disabledDays: new Set<string>(),
  setDisabledDays: (_: Set<string>) => {},
  createNewBooking: (_: Booking) => Promise.resolve(),
  scheduledBookings: [],
  setScheduledBookings: (_: Booking[]) => {}
}

const BookingContext = createContext<ContextType>(defaultValue)

export function BookingProvider({ children }: PropsWithChildren) {
  const [activeBooking, setActiveBooking] = useState<Omit<Booking, "createdAt"> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [disabledHours, setDisabledHours] = useState<Set<string>>(new Set())
  const [disabledDays, setDisabledDays] = useState<Set<string>>(new Set())
  const [scheduledBookings, setScheduledBookings] = useState<Booking[]>([])

  const createNewBooking = useCallback(async (booking: Booking) => {
    const { startDate, endDate, nickName } = booking

    try {
      const { error, message } = await createBooking(booking)

      if (error) {
        throw new Error(message)
      }

      const isStarted = startDate <= new Date()

      if (isStarted) {
        setActiveBooking({
          startDate,
          endDate,
          nickName
        })
      }

      const formattedStartDate = formatInTimeZone(startDate, LONG_FORMAT)
      const formattedEndDate = formatInTimeZone(endDate, LONG_FORMAT)
      const shortFormattedEndDate = formatInTimeZone(endDate, TIME_FORMAT)

      toast({
        title: "Reserva Confirmada",
        description: isStarted ? (
          <p>
            {booking.nickName}, tienes estacionamiento reservado hasta las{" "}
            <time dateTime={shortFormattedEndDate}>{shortFormattedEndDate}</time> horas.
          </p>
        ) : (
          <p>
            {booking.nickName}, tienes estacionamiento reservado desde el{" "}
            <time dateTime={formattedStartDate}>{formattedStartDate}</time> hasta{" "}
            <time dateTime={formattedEndDate}>{formattedEndDate}</time>.
          </p>
        )
      })
    } catch (e: any) {
      toast({
        title: "Reserva Inválida",
        description: e.message,
        className: "text-red-500"
      })
      throw e
    }
  }, [])

  useEffect(() => {
    async function fetchActiveBooking() {
      try {
        setIsLoading(true)
        const _activeBooking: Booking | null = await getActiveBooking()

        if (_activeBooking) {
          setActiveBooking(_activeBooking)
        }

        const scheduledDates = await getScheduledBookings()

        setScheduledBookings(scheduledDates)
        setIsLoading(false)

        const [disabledTimesMap, disabledDaysMap] = getDisabledDates(scheduledDates)

        setDisabledHours(disabledTimesMap)
        setDisabledDays(disabledDaysMap)
      } catch (e) {
        toast({
          title: "Error",
          description: "Ocurrió un error al obtener la reserva activa. Por favor, intenta nuevamente.",
          className: "text-red-500"
        })
        throw e
      } finally {
        setIsLoading(false)
      }
    }

    fetchActiveBooking().then()
  }, [])

  return (
    <BookingContext.Provider
      value={{
        activeBooking,
        setActiveBooking,
        isLoading,
        disabledDays,
        setDisabledDays,
        disabledHours,
        setDisabledHours,
        createNewBooking,
        scheduledBookings,
        setScheduledBookings
      }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBookingContext() {
  return useContext(BookingContext)
}
