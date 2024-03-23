"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarCheck, Loader, Calendar } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Timer } from "@/components/core/Timer"
import React, { useEffect, useState } from "react"
import { createBooking, getActiveBooking, getScheduledBookings } from "@/lib/queries"
import {
  formatInTimeZone,
  formatToCalendarDate,
  TIME_FORMAT,
  LONG_FORMAT,
  formatCalendarToDate,
  getDisabledDates
} from "@/lib/utils"
import { RangeCalendar } from "@/components/ui/date-range-picker"
import { RangeTime, RangeTimeValue } from "@/components/ui/time-range-picker"
import { RangeValue } from "@react-types/shared"
import { DateValue, getLocalTimeZone } from "@internationalized/date"
import { isToday } from "date-fns"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"

const OPTIONS = [15, 30, 45, 60]

const FormSchema = z.object({
  nickName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres."
  }),
  time: z.string().optional(),
  startDate: z.date(),
  endDate: z.date()
})

export const BookingCard = () => {
  const { toast } = useToast()
  const [expirationDate, setExpirationDate] = useState<Date | null>(null)
  const [nickName, setNickName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [disabledDateTimes, setDisabledDateTimes] = useState<Set<string>>(new Set())
  const [disabledDays, setDisabledDays] = useState<Set<string>>(new Set())
  const [dateRangeValue, setDateRangeValue] = useState<RangeValue<DateValue>>({
    start: formatToCalendarDate(new Date()),
    end: formatToCalendarDate(new Date())
  })
  const [ownerName, setOwnerName] = useState<string>("")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nickName: "",
      time: ""
    }
  })

  useEffect(() => {
    async function fetchActiveBooking() {
      try {
        setIsLoading(true)
        const activeBooking = await getActiveBooking()

        if (activeBooking) {
          setExpirationDate(activeBooking.endDate)
          setNickName(activeBooking.nickName)
        }
        // we end loading here to not block the UI with background requests
        setIsLoading(false)

        const scheduledDates = await getScheduledBookings()

        const [disabledTimesMap, disabledDaysMap] = getDisabledDates(scheduledDates)

        setDisabledDateTimes(disabledTimesMap)
        setDisabledDays(disabledDaysMap)
      } catch (e) {
        toast({
          title: "Error",
          description: "Ocurrió un error al obtener la reserva activa. Por favor, intenta nuevamente.",
          className: "text-red-500"
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchActiveBooking().then()
  }, [toast])

  const onExpiry = () => {
    setExpirationDate(null)
    form.reset()
    setOwnerName("")
  }

  const resetForm = () => {
    const date = new Date()
    setStartDate(date)
    setEndDate(date)
    setDateRangeValue({
      start: formatToCalendarDate(date),
      end: formatToCalendarDate(date)
    })
    form.reset()
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    const { startDate, endDate, nickName } = data

    try {
      const { error, message } = await createBooking(startDate, endDate, nickName)
      if (error) {
        throw new Error(message)
      }

      setOwnerName(nickName)
      const isStarted = startDate <= new Date()

      if (isStarted) setExpirationDate(endDate)

      const formattedStartDate = formatInTimeZone(startDate, LONG_FORMAT)
      const formattedEndDate = formatInTimeZone(endDate, LONG_FORMAT)
      const shortFormattedEndDate = formatInTimeZone(endDate, TIME_FORMAT)

      resetForm()

      toast({
        title: "Reserva Confirmada",
        description: isStarted ? (
          <p>
            {data.nickName}, tienes estacionamiento reservado hasta las{" "}
            <time dateTime={shortFormattedEndDate}>{shortFormattedEndDate}</time> horas.
          </p>
        ) : (
          <p>
            {data.nickName}, tienes estacionamiento reservado desde el{" "}
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
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickOptionsSelectionChange = (time: string, callback: any) => {
    const _startDate = new Date()
    const _endDate = new Date()

    _endDate.setMinutes(_endDate.getMinutes() + parseInt(time), _endDate.getSeconds())
    form.setValue("startDate", _startDate)
    form.setValue("endDate", _endDate)
    setStartDate(_startDate)
    setEndDate(_endDate)

    setDateRangeValue({
      start: formatToCalendarDate(_startDate),
      end: formatToCalendarDate(_endDate)
    })

    callback(time)
  }

  const handleDateRangeChange = (rangeValue: RangeValue<DateValue>) => {
    const { start, end } = rangeValue

    const _startDate = formatCalendarToDate(start)
    setStartDate(_startDate)

    const _endDate = formatCalendarToDate(end)
    setEndDate(_endDate)

    setDateRangeValue(rangeValue)
  }

  const handleOnDialogOpen = (isOpen: boolean) => {
    if (isOpen) {
      const _startDate = form.getValues("startDate") || startDate
      const _endDate = form.getValues("endDate") || endDate
      _startDate.setSeconds(0)
      _endDate.setSeconds(0)
    }
    setIsPopoverOpen(isOpen)
  }

  const handleTimeRangeChange = (rangeTime: RangeTimeValue) => {
    const { start, end } = rangeTime

    setStartDate(start)
    setEndDate(end)
  }

  const handleOnDatePickerCancel = () => {
    setIsPopoverOpen(false)
  }

  const handleOnDatePickerApply = () => {
    form.setValue("startDate", startDate)
    form.setValue("endDate", endDate)
    form.resetField("time")

    setIsPopoverOpen(false)
  }

  const isDisabledDate = (date: Date) => disabledDateTimes.has(date.toISOString())

  const DateRangeSelected = ({ start, end }: Record<"start" | "end", Date>) => {
    if (!start || !end) return null

    const formattedStartDate = formatInTimeZone(start, LONG_FORMAT)
    const formattedEndDate = formatInTimeZone(end, LONG_FORMAT)

    return (
      <div className={"flex justify-center items-center text-xs md:text-sm w-full text-gray-600"}>
        <time dateTime={formattedStartDate}>{formattedStartDate}</time>
        <span>&nbsp;-&nbsp;</span>
        <time dateTime={formattedEndDate}>{formattedEndDate}</time>
      </div>
    )
  }

  return (
    <>
      {isLoading && (
        <div
          className={
            "flex flex-col items-center justify-center w-full h-full z-30 fixed top-0 left-0 bg-opacity-50 bg-black"
          }>
          <Loader size={50} className={"animate-spin"} />
        </div>
      )}
      {expirationDate && (
        <Card className={"mb-4"}>
          <CardHeader className={"text-center pb-0 text-primary"}>
            <CardTitle className={"text-2xl md:text-3xl 2xl:text-4xl mb-[-5px] md:mb-0"}>Reservado</CardTitle>
            <CardDescription className={"space-y-0 md:space-y-1"}>
              <span className={"text-md md:text-lg"}>Faltan</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Timer expiryTimestamp={expirationDate} onExpire={onExpiry} />
          </CardContent>
          <CardFooter className={"flex justify-center text-sm"}>
            <code>
              por <span className={"text-primary"}>{ownerName || nickName}</span> hasta{" "}
              <time
                dateTime={formatInTimeZone(expirationDate, isToday(expirationDate) ? TIME_FORMAT : undefined)}
                className={"text-primary"}>
                {expirationDate && formatInTimeZone(expirationDate, isToday(expirationDate) ? TIME_FORMAT : undefined)}
              </time>
            </code>
          </CardFooter>
        </Card>
      )}
      <Card className={"p-2 sm:p-6 shadow-md"}>
        <CardHeader className={"text-center"}>
          <CardTitle className={"text-2xl md:text-3xl 2xl:text-4xl mb-[-5px] md:mb-0"}>
            Reservar Estacionamiento
          </CardTitle>
          <CardDescription className={"space-y-0 md:space-y-1"}>
            <span className={"max-w-[34ch]"}>Complete los campos para continuar</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 sm:80">
              <FormField
                control={form.control}
                name="nickName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Escribe tu nombre aquí" {...field} />
                    </FormControl>
                    {!fieldState.invalid && (
                      <FormDescription className={"text-xs md:text-sm"}>
                        El nombre se usará para la confirmación.
                      </FormDescription>
                    )}
                    <FormMessage className={"text-xs md:text-sm"} />
                  </FormItem>
                )}
              />
              <FormField
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Duración</FormLabel>
                    <div className={"flex"}>
                      <Select
                        {...field}
                        onValueChange={(value) => handleQuickOptionsSelectionChange(value, field.onChange)}>
                        <FormControl>
                          <SelectTrigger className="w-full border-r-0 rounded-r-none  pr-0">
                            <SelectValue placeholder="Opciones rápidas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {OPTIONS.map((option) => (
                            <SelectItem key={option} value={`${option}`}>
                              {`${option} minutos`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {
                        <AlertDialog onOpenChange={handleOnDialogOpen} open={isPopoverOpen}>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className={`border-l-0 rounded-l-none px-[12px] ${isPopoverOpen ? "bg-gray-100 hover:bg-gray-100" : ""}`}>
                              <Calendar size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogDescription>
                                <div className={"flex flex-col items-center px-4"}>
                                  <RangeCalendar
                                    onChange={handleDateRangeChange}
                                    value={dateRangeValue}
                                    isDateUnavailable={(date) =>
                                      disabledDays.has(date.toDate(getLocalTimeZone()).toISOString())
                                    }
                                  />
                                  <RangeTime
                                    onChange={handleTimeRangeChange}
                                    value={{
                                      start: startDate,
                                      end: endDate
                                    }}
                                    disabledDates={disabledDateTimes}
                                  />
                                </div>
                                <br />
                                <DateRangeSelected start={startDate} end={endDate} />
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className={"flex"}>
                              <AlertDialogCancel className={"sm:w-[50%]"} onClick={handleOnDatePickerCancel}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className={"sm:w-[50%]"}
                                onClick={handleOnDatePickerApply}
                                disabled={
                                  isDisabledDate(startDate) ||
                                  isDisabledDate(endDate) ||
                                  startDate >= endDate ||
                                  startDate < new Date()
                                }>
                                Applicar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      }
                    </div>
                    {!fieldState.invalid && (
                      <FormDescription className={"text-xs md:text-sm"}>
                        Para más opciones haga click en el ícono calendario
                      </FormDescription>
                    )}
                    <FormMessage className={"text-xs md:text-sm"} />
                  </FormItem>
                )}
                name="time"
                control={form.control}
              />
              <DateRangeSelected start={form.getValues("startDate")} end={form.getValues("endDate")} />
              <Button
                type="submit"
                className={"w-full flex items-center"}
                disabled={!form.formState.isValid || isSubmitting}>
                {(isSubmitting && <Loader size={16} className={"animate-spin"} />) || (
                  <>
                    <CalendarCheck size={16} />
                    &nbsp;Reservar
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
