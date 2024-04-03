"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { PropsWithChildren, useState } from "react"
import { formatToCalendarDate, formatCalendarToDate } from "@/lib/utils"
import { RangeTimeValue } from "@/components/ui/time-range-picker"
import { RangeValue } from "@react-types/shared"
import { DateValue } from "@internationalized/date"

import { useBookingContext } from "@/context/booking-context"
import { Booking } from "@/lib/models"
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DateTimeRangePicker, { DateRangeSelected } from "@/components/ui/DateTimeRangePicker"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarCheck, Loader } from "lucide-react"

const QUICK_OPTIONS = [15, 30, 45, 60]

const FormSchema = z.object({
  nickName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres."
  }),
  time: z.string().optional(),
  startDate: z.date(),
  endDate: z.date()
})

export const BookingModal = ({ children }: PropsWithChildren) => {
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
    createNewBooking({ ...data, nickName: data.nickName.trim() ?? undefined } as Booking)
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
    setIsPopoverOpen(isOpen)
  }

  const handleTimeRangeChange = (rangeTime: RangeTimeValue) => {
    const { start, end } = rangeTime

    start.setSeconds(0, 0)
    end.setSeconds(0, 0)

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
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        className={"flex flex-col items-center p-6 md:py-8 lg:py-10 h-full overflow-y-auto lg:h-auto max-h-[700px]"}>
        <AlertDialogHeader>
          <AlertDialogTitle className={"text-2xl md:text-3xl 2xl:text-4xl mb-[-5px] md:mb-0 self-center"}>
            Reservar Estacionamiento
          </AlertDialogTitle>
          <AlertDialogDescription className={"space-y-0 md:space-y-1 self-center"}>
            <span className={"max-w-[34ch]"}>Complete los campos para continuar</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={"w-full md:w-auto h-full"}>
          <div className={"flex flex-col items-center w-full h-full"}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 h-full flex flex-col">
                <FormField
                  control={form.control}
                  name="nickName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Escribe un título para la reserva"
                          {...field}
                          onBlur={(e) => {
                            field.onChange(e.target.value.trim())
                          }}
                        />
                      </FormControl>
                      {!fieldState.invalid && (
                        <FormDescription className={"text-xs md:text-sm"}>
                          El título se usará para identificar a la reserva.
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
                <div className={"flex flex-col md:flex-row gap-0 md:gap-2 !mt-auto pt-6"}>
                  <AlertDialogCancel className={"w-full md:w-[50%] order-2 md:order-1"}>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    type="submit"
                    className={"md:w-[50%] flex items-center  order-1 md:order-2"}
                    disabled={!form.formState.isValid || isSubmitting}>
                    {(isSubmitting && <Loader size={16} className={"animate-spin"} />) || (
                      <>
                        <CalendarCheck size={16} />
                        &nbsp;Reservar
                      </>
                    )}
                  </AlertDialogAction>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
