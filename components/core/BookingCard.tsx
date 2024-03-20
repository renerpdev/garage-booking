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
import { formatInTimeZone, formatToCalendarDate, LONG_FORMAT } from "@/lib/utils"
import { getFlags } from "@/lib/flags"
import { RangeCalendar } from "@/components/ui/date-range-picker"
import { RangeTime, RangeTimeValue } from "@/components/ui/time-range-picker"
import { RangeValue } from "@react-types/shared"
import { DateValue, getLocalTimeZone } from "@internationalized/date"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
  const [flags, setFlags] = useState<any>({})
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [dateRangeStart, setDateRangeStart] = useState<DateValue>(formatToCalendarDate(new Date()))
  const [dateRangeEnd, setDateRangeEnd] = useState<DateValue>(formatToCalendarDate(new Date()))
  const [disabledDates, setDisabledDates] = useState<Date[]>([])
  const [, setTime] = useState(0)

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

        const scheduledDates = await getScheduledBookings()

        const scheduledDatesMap = new Map<string, Date>()
        scheduledDates.forEach((booking) => {
          scheduledDatesMap.set(booking.startDate.toISOString(), booking.startDate)
          scheduledDatesMap.set(booking.endDate.toISOString(), booking.endDate)
        })

        setDisabledDates(Array.from(scheduledDatesMap.values()))
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

  useEffect(() => {
    getFlags().then((flags) => {
      setFlags(flags)
    })
  }, [form])

  const onExpiry = () => {
    setExpirationDate(null)
    form.reset()
  }

  const resetForm = () => {
    form.reset()
    setStartDate(new Date())
    setEndDate(new Date())
    setDateRangeEnd(formatToCalendarDate(new Date()))
    setDateRangeStart(formatToCalendarDate(new Date()))
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    const { startDate, endDate, nickName } = data

    try {
      await createBooking(startDate, endDate, nickName)

      if (startDate <= new Date()) setExpirationDate(endDate)

      const formattedStartDate = formatInTimeZone(startDate, LONG_FORMAT)
      const formattedEndDate = formatInTimeZone(endDate, LONG_FORMAT)
      const shortFormattedEndDate = formatInTimeZone(endDate)

      resetForm()

      toast({
        title: "Reserva Confirmada",
        description:
          startDate <= new Date() ? (
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
    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrió un error al reservar el estacionamiento. Por favor, intenta nuevamente.",
        className: "text-red-500"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickOptionsSelectionChange = (time: string, callback: any) => {
    const startDate = new Date()
    const endDate = new Date()

    endDate.setMinutes(endDate.getMinutes() + parseInt(time))
    form.setValue("startDate", startDate)
    form.setValue("endDate", endDate)

    setTime(Date.now()) // force re-render

    callback(time)
  }

  const handleDateRangeChange = (rangeValue: RangeValue<DateValue>) => {
    const { start, end } = rangeValue
    const timezone = getLocalTimeZone()

    setDateRangeStart(start)
    setDateRangeEnd(end)

    const _startDate = start.toDate(timezone)
    setStartDate(_startDate)

    const _endDate = end.toDate(timezone)
    setEndDate(_endDate)
  }

  const handleTimeRangeChange = (rangeTime: RangeTimeValue) => {
    const { startTime, endTime } = rangeTime

    setStartDate(startTime)
    setEndDate(endTime)
  }

  const handleOnDatePickerCancel = () => {
    setIsPopoverOpen(false)
  }

  const handleOnDatePickerApply = () => {
    form.setValue("startDate", startDate)
    form.setValue("endDate", endDate)

    setIsPopoverOpen(false)
  }

  const isDisabledDate = (date: Date, dates: Date[]) => {
    return !!dates.find((d) => {
      const current = new Date()
      const dateA = new Date(date)
      const dateB = new Date(d)

      current.setSeconds(0)
      dateA.setSeconds(0)
      dateB.setSeconds(0)

      return (
        dateA.getTime() === dateB.getTime() ||
        current.getTime() >= dateA.getTime() ||
        current.getTime() >= dateB.getTime()
      )
    })
  }

  return (
    <Card className={"p-2 sm:p-6 shadow-md"}>
      {!isLoading && (
        <CardHeader className={`text-center ${expirationDate ? "pb-0 text-primary" : ""}`}>
          <CardTitle className={"text-2xl md:text-3xl 2xl:text-4xl mb-[-5px] md:mb-0"}>
            {!expirationDate ? "Reservar Estacionamiento" : "Reservado"}
          </CardTitle>
          <CardDescription className={"space-y-0 md:space-y-1"}>
            {!expirationDate && <span className={"max-w-[34ch]"}>Complete los campos para continuar</span>}
            {expirationDate && <span className={"text-md md:text-lg"}>Faltan</span>}
          </CardDescription>
        </CardHeader>
      )}
      {isLoading && (
        <div className={"p-6"}>
          <Loader size={50} className={"animate-spin"} />
        </div>
      )}
      {!isLoading && (
        <CardContent>
          {expirationDate && <Timer expiryTimestamp={expirationDate} onExpire={onExpiry} />}
          {!expirationDate && (
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
                          onValueChange={(value) => handleQuickOptionsSelectionChange(value, field.onChange)}
                          defaultValue={field.value}>
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
                        {flags?.calendarFeature && (
                          <Popover onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                className={`border-l-0 rounded-l-none px-[12px] ${isPopoverOpen ? "bg-gray-100 hover:bg-gray-100" : ""}`}>
                                <Calendar size={16} />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-80 translate-y-1/2 translate-x-[20px] origin-bottom-right"
                              align={"end"}>
                              <div className={"flex flex-col items-center px-4"}>
                                <RangeCalendar
                                  onChange={handleDateRangeChange}
                                  value={{
                                    start: dateRangeStart,
                                    end: dateRangeEnd
                                  }}
                                />
                                <RangeTime
                                  onChange={handleTimeRangeChange}
                                  value={{
                                    startTime: startDate,
                                    endTime: endDate
                                  }}
                                  disabledDates={disabledDates}
                                />
                                <div className={"flex gap-2 items-center mt-4 w-full"}>
                                  <Button className={"flex-1"} variant={"outline"} onClick={handleOnDatePickerCancel}>
                                    Cancelar
                                  </Button>
                                  <Button
                                    className={"flex-1"}
                                    variant={"default"}
                                    onClick={handleOnDatePickerApply}
                                    disabled={
                                      isDisabledDate(startDate, disabledDates) ||
                                      isDisabledDate(endDate, disabledDates) ||
                                      startDate >= endDate
                                    }>
                                    Aplicar
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        )}
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
                {form.getValues("startDate") && form.getValues("endDate") && (
                  <div className={"flex justify-center items-center text-xs md:text-sm w-full text-violet-800"}>
                    <time dateTime={formatInTimeZone(form.getValues("startDate"))}>
                      {formatInTimeZone(form.getValues("startDate"), LONG_FORMAT)}
                    </time>
                    <span>&nbsp;-&nbsp;</span>
                    <time dateTime={formatInTimeZone(form.getValues("endDate"))}>
                      {formatInTimeZone(form.getValues("endDate"), LONG_FORMAT)}
                    </time>
                  </div>
                )}
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
          )}
        </CardContent>
      )}
      {expirationDate && (
        <CardFooter className={"flex justify-center text-sm"}>
          <code>
            por <span className={"underline"}>{form.getValues("nickName") || nickName}</span> hasta{" "}
            <time dateTime={formatInTimeZone(expirationDate)} className={"underline"}>
              {expirationDate && formatInTimeZone(expirationDate)}
            </time>
          </code>
        </CardFooter>
      )}
    </Card>
  )
}
