"use client"

import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { cancelBookingById, createBooking, getActiveBooking, getScheduledBookings } from "@/lib/queries"
import { formatInTimeZone, getDisabledDates, LONG_FORMAT, TIME_FORMAT } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { ActiveBooking, Booking, CanceledBooking } from "@/lib/models"
import { useUser } from "@clerk/nextjs"

type ContextType = {
  activeBooking: ActiveBooking
  setActiveBooking: (_booking: Booking | null) => void
  isLoading: boolean
  disabledHours: Set<string>
  disabledDays: Set<string>
  createNewBooking: (_booking: Booking) => Promise<void>
  scheduledBookings: Booking[]
  setScheduledBookings: (_bookings: Booking[]) => void
  cancelBooking: (_booking: CanceledBooking) => Promise<void>
}

const defaultValue = {
  activeBooking: null,
  setActiveBooking: () => {},
  isLoading: false,
  disabledHours: new Set<string>(),
  disabledDays: new Set<string>(),
  createNewBooking: (_: Booking) => Promise.resolve(),
  scheduledBookings: [],
  setScheduledBookings: (_: Booking[]) => {},
  cancelBooking: (_: CanceledBooking) => Promise.resolve()
}

const BookingContext = createContext<ContextType>(defaultValue)

export function BookingProvider({ children }: PropsWithChildren) {
  const [activeBooking, setActiveBooking] = useState<ActiveBooking>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [scheduledBookings, setScheduledBookings] = useState<Booking[]>([])
  const { user } = useUser()

  const createNewBooking = useCallback(
    async (booking: Booking) => {
      const { startDate, endDate, nickName } = booking

      try {
        const { error, message, data } = await createBooking(booking)

        if (error) {
          throw new Error(message)
        }

        // Update the scheduled bookings
        setScheduledBookings((prev) => [
          ...prev,
          {
            ...booking,
            createdAt: new Date(),
            id: data?.id || -1,
            owner: {
              externalId: user?.id,
              name: user?.fullName || undefined,
              avatarUrl: user?.imageUrl || undefined
            }
          }
        ])

        const isStarted = startDate <= new Date()

        // If the booking is started, set the active booking and display the alert banner
        if (isStarted) {
          setActiveBooking({
            startDate,
            endDate,
            nickName,
            owner: {
              externalId: user?.id,
              name: user?.fullName || undefined
            }
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
    },
    [user?.fullName, user?.id, user?.imageUrl]
  )

  const [disabledDays, disabledHours] = useMemo(() => getDisabledDates(scheduledBookings), [scheduledBookings])

  const cancelBooking = useCallback(
    async (booking: CanceledBooking) => {
      try {
        const { id, startDate, endDate } = booking

        await cancelBookingById(id)

        // If the active booking is the same as the one being canceled, remove it
        if (
          activeBooking?.endDate &&
          activeBooking?.startDate &&
          activeBooking.endDate <= endDate &&
          activeBooking.startDate >= startDate
        ) {
          setActiveBooking(null)
        }
        // @ts-ignore
        setScheduledBookings((prev: Booking[]) => prev.filter((booking) => booking.id !== id))
      } catch (e) {
        toast({
          title: "Error",
          description: "No se pudo cancelar la reserva",
          className: "text-red-500"
        })
        throw e
      }
    },
    [activeBooking?.endDate, activeBooking?.startDate]
  )

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
        disabledHours,
        createNewBooking,
        scheduledBookings,
        setScheduledBookings,
        cancelBooking
      }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBookingContext() {
  return useContext(BookingContext)
}
