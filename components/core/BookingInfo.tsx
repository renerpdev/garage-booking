import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDays, Clock, MoreHorizontal, StopCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useCallback } from "react"
import { Booking } from "@/lib/models"
import { formatInTimeZone, FULL_FORMAT } from "@/lib/utils"
import { useAuth } from "@clerk/nextjs"
import { toast } from "@/components/ui/use-toast"
import { useBookingContext } from "@/context/booking-context"

interface BookingInfoProps extends Booking {}
const BookingInfo = ({ nickName, createdAt, endDate, startDate, owner, id }: BookingInfoProps) => {
  const { userId } = useAuth()
  const { cancelBooking } = useBookingContext()

  const cancelCurrentBooking = useCallback(async () => {
    try {
      await cancelBooking({
        id,
        startDate,
        endDate
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cancelar la reserva",
        className: "text-red-500"
      })
    }
  }, [cancelBooking, endDate, id, startDate])

  const start = formatInTimeZone(startDate)
  const end = formatInTimeZone(endDate)
  const created = formatInTimeZone(createdAt, FULL_FORMAT)

  return (
    <div className="flex gap-4 relative w-full group z-30">
      {owner.externalId === userId && (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center rounded-full border border-transparent text-gray-400 hover:text-gray-500 absolute right-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align={"end"}>
            <ul className={"flex flex-col"}>
              <li className={"flex items-center ring-1 first:ring-0 ring-gray-100"}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      type={"button"}
                      className="px-4 py-4 text-sm gap-2 flex items-center hover:text-red-500 text-red-400"
                      role="menuitem">
                      <StopCircle size={14} /> Cancelar
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. ¿Estás seguro de que deseas cancelar esta reserva?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Volver</AlertDialogCancel>
                      <AlertDialogAction className={"bg-red-600 hover:bg-red-700"} onClick={cancelCurrentBooking}>
                        Cancelar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      )}

      <Avatar>
        {owner && <AvatarImage src={owner.avatarUrl} />}
        <AvatarFallback>{owner.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">{nickName}</h3>
        {owner && <h4 className="text-sm">{owner.name}</h4>}
        <div className="flex items-center gap-1 text-sm text-gray-900 lg:text-nowrap">
          <Clock size={16} />{" "}
          <time className="font-light" dateTime={start}>
            {start}
          </time>
          <span> - </span>
          <time className="font-light" dateTime={end}>
            {end}
          </time>
        </div>
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
          <span className="text-xs text-muted-foreground">
            Creado el <time dateTime={created}>{created}</time>
          </span>
        </div>
      </div>
    </div>
  )
}
export default BookingInfo
