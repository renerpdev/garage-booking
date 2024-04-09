import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
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
} from "@/src/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import React, { useCallback } from "react"
import { Booking } from "@/src/lib/models"
import { useAuth } from "@clerk/nextjs"
import { toast } from "@/src/components/ui/use-toast"
import { useBookingContext } from "@/src/context/booking-context"
import { useTranslations } from "next-intl"

interface BookingInfoProps extends Booking {}
const BookingInfo = ({ nickName, createdAt, endDate, startDate, owner, id }: BookingInfoProps) => {
  const { userId } = useAuth()
  const { cancelBooking } = useBookingContext()
  const t = useTranslations("Components.Calendar")
  const toastT = useTranslations("ToastMessages")

  const cancelCurrentBooking = useCallback(async () => {
    try {
      await cancelBooking({
        id,
        startDate,
        endDate
      })
    } catch (error) {
      toast({
        title: toastT("error.cancelBooking.title"),
        description: toastT("error.cancelBooking.description"),
        className: "text-red-500"
      })
    }
  }, [cancelBooking, endDate, id, startDate, toastT])

  return (
    <div className="grid grid-cols-[40px_1fr] gap-x-4 relative w-full group z-30">
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
                      <StopCircle size={14} /> {t("cancel")}
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t("cancelModal.title")}</AlertDialogTitle>
                      <AlertDialogDescription>{t("cancelModal.description")}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t("cancelModal.cancel")}</AlertDialogCancel>
                      <AlertDialogAction className={"bg-red-600 hover:bg-red-700"} onClick={cancelCurrentBooking}>
                        {t("cancelModal.confirm")}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      )}

      <Avatar className={""}>
        {owner && <AvatarImage src={owner.avatarUrl} />}
        <AvatarFallback>{owner.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold">{nickName}</h3>
        {owner && <h4 className="text-sm">{owner.name}</h4>}
      </div>
      <div className="mt-2 sm:mt-1 gap-1 flex flex-col col-span-full sm:col-start-2">
        <div className="flex items-center gap-1 text-sm text-gray-900 lg:text-nowrap">
          <Clock size={16} />{" "}
          {t.rich("dateRange", {
            startDate,
            endDate,
            from: (chunks) => (
              <time className="font-light" dateTime={startDate.toISOString()}>
                {chunks}
              </time>
            ),
            to: (chunks) => (
              <time className="font-light" dateTime={endDate.toISOString()}>
                {chunks}
              </time>
            )
          })}
        </div>
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
          <span className="text-xs text-muted-foreground">
            {t.rich("createdAt", {
              createdAt,
              time: (chunks) => <time dateTime={createdAt.toISOString()}>{chunks}</time>
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
export default BookingInfo
