"use client"

import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { cancelBookingById, clearActiveBookings, createBooking, getScheduledBookings } from "@/src/lib/queries"
import { formatInTimeZone, getDisabledDates, LONG_FORMAT } from "@/src/lib/utils"
import { toast } from "@/src/components/ui/use-toast"
import { ActiveBooking, Booking, CanceledBooking } from "@/src/lib/models"
import { useUser } from "@clerk/nextjs"
import { isPermissionGranted, notifySubscribers } from "@/src/lib/notifications"
import useSWR from "swr"
import { useTranslations } from "next-intl"

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
  const toastT = useTranslations("ToastMessages")
  const notifT = useTranslations("Notification")
  const { user } = useUser()
  const {
    data: activeBookingData,
    error: activeBookingError,
    isLoading: isLoadingActiveBooking
  } = useSWR("/api/bookings/active", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: true
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

      try {
        setIsLoading(true)
        if (!nickName) {
          throw new Error(toastT("error.missingTitle"))
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
            title: toastT("success.createBooking.title"),
            description: (
              <p>
                {toastT.rich(`success.createBooking.${isStarted ? "shortDescription" : "description"}`, {
                  startDate,
                  endDate,
                  time: (chunks) => <time dateTime={endDate.toISOString()}>{chunks}</time>,
                  from: (chunks) => <time dateTime={startDate.toISOString()}>{chunks}</time>,
                  to: (chunks) => <time dateTime={endDate.toISOString()}>{chunks}</time>
                })}
              </p>
            )
          })
        }
      } catch (e: any) {
        toast({
          title: toastT("error.createBooking.title"),
          description: toastT("error.createBooking.description"),
          className: "text-red-500 bg-white"
        })
        console.error(e)
        throw e
      } finally {
        setIsLoading(false)
      }

      try {
        // Notify subscribers about the new booking
        await notifySubscribers({
          title: notifT("title"),
          body: notifT("body", { startDate: formattedStartDate, endDate: formattedEndDate })
        })
      } catch (e: any) {
        console.error(e.message)
      }

      // now update the scheduled bookings with real data
      updateScheduledBookings().catch(console.error)
    },
    [notifT, toastT, updateActiveBooking, updateScheduledBookings, user]
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
          title: toastT("error.cancelBooking.title"),
          description: toastT("error.cancelBooking.description"),
          className: "text-red-500 bg-white"
        })
        throw e
      } finally {
        setIsLoading(false)
      }

      // now update the scheduled bookings with real data
      updateScheduledBookings().catch(console.error)
    },
    [activeBooking, toastT, updateScheduledBookings]
  )

  // Clear active bookings when the component mounts
  useEffect(() => {
    clearActiveBookings().catch(console.error)
  }, [updateScheduledBookings])

  // Update the active booking and scheduled bookings when it changes
  useEffect(() => {
    if (activeBookingError) {
      toast({
        title: toastT("error.fetchActiveBooking.title"),
        description: toastT("error.fetchActiveBooking.description"),
        className: "text-red-500 bg-white"
      })
      return
    }

    if (!activeBookingData) {
      setActiveBooking(null)
    } else {
      setActiveBooking({
        ...activeBookingData,
        startDate: new Date(activeBookingData.startDate),
        endDate: new Date(activeBookingData.endDate)
      })
    }

    updateScheduledBookings().catch(console.error)
  }, [activeBookingData, activeBookingError, toastT, updateScheduledBookings])

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
