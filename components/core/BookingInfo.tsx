import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDays, Clock, MoreVertical, StopCircle, Trash } from "lucide-react"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import React, { useEffect, useState } from "react"
import { Booking, FeatureFlag } from "@/lib/models"
import { formatInTimeZone } from "@/lib/utils"
import { getFlags } from "@/lib/flags"

interface BookingInfoProps extends Booking {}
const BookingInfo = ({ nickName, createdAt, endDate, startDate }: BookingInfoProps) => {
  const [flags, setFlags] = useState<FeatureFlag>({})

  useEffect(() => {
    getFlags().then((flags) => {
      setFlags(flags)
    })
  }, [flags])

  const start = formatInTimeZone(startDate)
  const end = formatInTimeZone(endDate)
  const created = formatInTimeZone(createdAt)

  return (
    <div className="flex gap-4 relative w-full group">
      <Popover>
        <PopoverTrigger asChild>
          {flags.loginFeature ? (
            <button
              type="button"
              className="flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500 absolute right-0 top-0 transform  translate-x-1/4">
              <span className="sr-only">Open menu</span>
              <MoreVertical size={18} />
            </button>
          ) : null}
        </PopoverTrigger>
        <PopoverContent className="w-32 p-0" align={"end"}>
          <ul className={"flex flex-col"}>
            <li className={"flex items-center ring-1 first:ring-0 ring-gray-100"}>
              <button
                type={"button"}
                className="text-gray-700 px-4 py-4 text-sm gap-2 flex items-center hover:text-primary"
                role="menuitem">
                <StopCircle size={14} /> Cancelar
              </button>
            </li>
            <li className={"flex items-center ring-1 first:ring-0 ring-gray-100"}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type={"button"}
                    className="px-4 py-4 text-sm gap-2 flex items-center hover:text-red-500 text-red-400"
                    role="menuitem">
                    <Trash size={14} /> Eliminar
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className={"bg-red-600 hover:bg-red-700"}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          </ul>
        </PopoverContent>
      </Popover>

      <Avatar>
        {/*TODO: bring back when we support user accounts*/}
        {/*<AvatarImage src="https://github.com/vercel.png" />*/}
        <AvatarFallback>{nickName?.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">{nickName}</h4>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock size={16} />{" "}
          <time className="font-light" dateTime={start}>
            {start}
          </time>{" "}
          -{" "}
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
