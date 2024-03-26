"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarCheck, Loader, Calendar } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { formatToCalendarDate, formatCalendarToDate } from "@/lib/utils"
import { RangeTimeValue } from "@/components/ui/time-range-picker"
import { RangeValue } from "@react-types/shared"
import { DateValue } from "@internationalized/date"

import { useBookingContext } from "@/context/booking-context"
import { Booking } from "@/lib/models"
import ActiveBookingAlert from "@/components/core/ActiveBookingAlert"
import DateTimeRangePicker, { DateRangeSelected } from "@/components/ui/DateTimeRangePicker"

const QUICK_OPTIONS = [15, 30, 45, 60]

const FormSchema = z.object({
  nickName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres."
  }),
  time: z.string().optional(),
  startDate: z.date(),
  endDate: z.date()
})

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [startDateTime, setStartDateTime] = useState(new Date())
  const [endDateTime, setEndDateTime] = useState(new Date())
  const [dateRangeValue, setDateRangeValue] = useState<RangeValue<DateValue>>({
    start: formatToCalendarDate(new Date()),
    end: formatToCalendarDate(new Date())
  })
  const { createNewBooking } = useBookingContext()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nickName: "",
      time: ""
    }
  })

  const resetForm = () => {
    const date = new Date()
    setStartDateTime(date)
    setEndDateTime(date)
    setDateRangeValue({
      start: formatToCalendarDate(date),
      end: formatToCalendarDate(date)
    })
    form.reset()
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    createNewBooking(data as Booking)
      .then(() => {
        resetForm()
      })
      .catch(console.error)
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleQuickOptionsSelectionChange = (time: string, callback: any) => {
    const _startDate = new Date()
    const _endDate = new Date()

    _endDate.setMinutes(_endDate.getMinutes() + parseInt(time), _endDate.getSeconds())
    form.setValue("startDate", _startDate)
    form.setValue("endDate", _endDate)
    setStartDateTime(_startDate)
    setEndDateTime(_endDate)

    setDateRangeValue({
      start: formatToCalendarDate(_startDate),
      end: formatToCalendarDate(_endDate)
    })

    callback(time)
  }

  const handleDateRangeChange = (rangeValue: RangeValue<DateValue>) => {
    const { start, end } = rangeValue

    const _startDate = formatCalendarToDate(start)
    setStartDateTime(_startDate)

    const _endDate = formatCalendarToDate(end)
    setEndDateTime(_endDate)

    setDateRangeValue(rangeValue)
  }

  const handleOnDialogOpen = (isOpen: boolean) => {
    if (isOpen) {
      const _startDate = form.getValues("startDate") || startDateTime
      const _endDate = form.getValues("endDate") || endDateTime
      _startDate.setSeconds(0)
      _endDate.setSeconds(0)
    }
    setIsPopoverOpen(isOpen)
  }

  const handleTimeRangeChange = (rangeTime: RangeTimeValue) => {
    const { start, end } = rangeTime

    setStartDateTime(start)
    setEndDateTime(end)
  }

  const handleOnDatePickerCancel = () => {
    setIsPopoverOpen(false)
  }

  const handleOnDatePickerApply = () => {
    form.setValue("startDate", startDateTime)
    form.setValue("endDate", endDateTime)
    form.resetField("time")

    setIsPopoverOpen(false)
  }

  return (
    <>
      <ActiveBookingAlert className={"mb-4"} />
      <Card className={"p-2 sm:p-6 shadow-md max-w-md w-full"}>
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
                      <Input placeholder="Escribe un nombre para la reserva" {...field} />
                    </FormControl>
                    {!fieldState.invalid && (
                      <FormDescription className={"text-xs md:text-sm"}>
                        El nombre se usará para identificar a la reserva.
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
                          {QUICK_OPTIONS.map((option) => (
                            <SelectItem key={option} value={`${option}`}>
                              {`${option} minutos`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <DateTimeRangePicker
                        startDateTime={startDateTime}
                        endDateTime={endDateTime}
                        dateRangeValue={dateRangeValue}
                        onDatePickerApply={handleOnDatePickerApply}
                        onDatePickerCancel={handleOnDatePickerCancel}
                        onDateRangeChange={handleDateRangeChange}
                        onTimeRangeChange={handleTimeRangeChange}
                        isPopoverOpen={isPopoverOpen}
                        onDialogOpen={handleOnDialogOpen}>
                        <Button
                          type="button"
                          variant="outline"
                          className={`border-l-0 rounded-l-none px-[12px] ${isPopoverOpen ? "bg-gray-100 hover:bg-gray-100" : ""}`}>
                          <Calendar size={16} />
                        </Button>
                      </DateTimeRangePicker>
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
