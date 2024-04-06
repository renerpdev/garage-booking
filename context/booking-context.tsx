"use client"

import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { cancelBookingById, clearActiveBookings, createBooking, getScheduledBookings } from "@/lib/queries"
import { formatInTimeZone, getDisabledDates, LONG_FORMAT, TIME_FORMAT } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { ActiveBooking, Booking, CanceledBooking } from "@/lib/models"
import { useUser } from "@clerk/nextjs"
import { isPermissionGranted, notifySubscribers } from "@/lib/notifications"
import useSWR from "swr"

type ContextType = {
  activeBooking: ActiveBooking | null
  setActiveBooking: (_booking: Booking | null) => void
  isLoading: boolean
  isFetching: boolean
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
  isFetching: false,
  disabledHours: new Set<string>(),
  disabledDays: new Set<string>(),
  createNewBooking: (_: Booking) => Promise.resolve(),
  scheduledBookings: [],
  setScheduledBookings: (_: Booking[]) => {},
  cancelBooking: (_: CanceledBooking) => Promise.resolve()
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const BookingContext = createContext<ContextType>(defaultValue)

export function BookingProvider({ children }: PropsWithChildren) {
  const [activeBooking, setActiveBooking] = useState<ActiveBooking | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [scheduledBookings, setScheduledBookings] = useState<Booking[]>([])
  const { user } = useUser()
  const {
    data: activeBookingData,
    error: activeBookingError,
    isLoading: isLoadingActiveBooking
  } = useSWR("/api/bookings/active", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  })

  const updateScheduledBookings = useCallback(async () => {
    try {
      setIsFetching(true)
      const scheduledDates = (await getScheduledBookings()) ?? []
      setScheduledBookings(scheduledDates)
    } catch (e) {
      console.error(e)
    } finally {
      setIsFetching(false)
    }
  }, [setScheduledBookings])

  const updateActiveBooking = useCallback(
    (booking: Booking) => {
      setScheduledBookings((prev) => [
        ...prev,
        {
          ...booking,
          createdAt: new Date(),
          owner: {
            externalId: user?.id,
            name: user?.fullName || undefined,
            avatarUrl: user?.imageUrl || undefined
          }
        }
      ])
    },
    [user?.fullName, user?.id, user?.imageUrl]
  )

  const createNewBooking = useCallback(
    async (booking: Booking) => {
      const { startDate, endDate, nickName } = booking
      const formattedStartDate = formatInTimeZone(startDate, LONG_FORMAT)
      const formattedEndDate = formatInTimeZone(endDate, LONG_FORMAT)
      const shortFormattedEndDate = formatInTimeZone(endDate, TIME_FORMAT)

      try {
        setIsLoading(true)
        if (!nickName) {
          throw new Error("La reserva debe tener un nombre.")
        }

        const { error, message, data } = await createBooking(booking)

        if (error) {
          throw new Error(message)
        }

        // Update the scheduled bookings, using optimistic updates
        updateActiveBooking({ ...booking, id: data?.id || -1 })

        const isStarted = startDate <= new Date()

        // If the booking is started, set the active booking and display the alert banner, using optimistic updates
        if (isStarted) {
          setActiveBooking({
            id: data?.id || -1,
            startDate,
            endDate,
            nickName,
            owner: {
              externalId: user?.id,
              name: user?.fullName || undefined,
              avatarUrl: user?.imageUrl || undefined
            },
            createdAt: new Date()
          })
        }

        // Display a toast notification if push notifications are disabled
        if (!isPermissionGranted()) {
          toast({
            title: "Reserva Confirmada",
            description: isStarted ? (
              <p>
                Tienes estacionamiento reservado hasta las{" "}
                <time dateTime={shortFormattedEndDate}>{shortFormattedEndDate}</time> horas.
              </p>
            ) : (
              <p>
                Se ha confirmado el estacionamiento desde el{" "}
                <time dateTime={formattedStartDate}>{formattedStartDate}</time> hasta{" "}
                <time dateTime={formattedEndDate}>{formattedEndDate}</time>.
              </p>
            )
          })
        }
      } catch (e: any) {
        toast({
          title: "Reserva Inválida",
          description: e.message,
          className: "text-red-500 bg-red-50"
        })
        throw e
      } finally {
        setIsLoading(false)
      }

      try {
        // Notify subscribers about the new booking
        await notifySubscribers({
          title: "Nueva Reserva Confirmada",
          body: `La reserva comienza el ${formattedStartDate} y termina el ${formattedEndDate}.`
        })
      } catch (e: any) {
        console.error(e.message)
      }

      // now update the scheduled bookings with real data
      updateScheduledBookings().catch(console.error)
    },
    [updateActiveBooking, updateScheduledBookings, user]
  )

  const { disabledHours, disabledDays } = useMemo(() => getDisabledDates(scheduledBookings), [scheduledBookings])

  const cancelBooking = useCallback(
    async (booking: CanceledBooking) => {
      try {
        setIsLoading(true)
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

        // Update the scheduled bookings using optimistic updates
        setScheduledBookings((prev: Booking[]) => prev.filter((booking) => booking.id !== id))
      } catch (e) {
        toast({
          title: "Error",
          description: "No se pudo cancelar la reserva. Por favor, intente nuevamente en unos segundos.",
          className: "text-red-50 bg-red-500"
        })
        throw e
      } finally {
        setIsLoading(false)
      }

      // now update the scheduled bookings with real data
      updateScheduledBookings().catch(console.error)
    },
    [activeBooking, updateScheduledBookings]
  )

  // Clear active bookings when the component mounts
  useEffect(() => {
    clearActiveBookings().catch(console.error)
  }, [updateScheduledBookings])

  // Update the active booking and scheduled bookings when it changes
  useEffect(() => {
    if (activeBookingError) {
      toast({
        title: "Error",
        description: "Ocurrio un error al obtener la reserva activa. Por favor, recargue la aplicación nuevamente.",
        className: "text-red-50 bg-red-500"
      })
      return
    }

    if (!activeBookingData) {
      setActiveBooking(null)
      return
    }

    setActiveBooking({
      ...activeBookingData,
      endDate: new Date(activeBookingData.endDate)
    })
    updateScheduledBookings().catch(console.error)
  }, [activeBookingData, activeBookingError, updateScheduledBookings])

  return (
    <BookingContext.Provider
      value={{
        activeBooking,
        setActiveBooking,
        isLoading,
        isFetching: isFetching || isLoading || isLoadingActiveBooking,
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
