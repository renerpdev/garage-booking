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
import { useEffect, useState } from "react"
import { createBooking, getActiveBooking } from "@/lib/queries"
import { formatInTimeZone, LONG_FORMAT } from "@/lib/utils"
import DateRangePicker from "@/components/ui/date-range-picker"
import { getFlags } from "@/lib/flags"

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
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [flags, setFlags] = useState<any>({})

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
        const activeBooking = await getActiveBooking()

        if (activeBooking) {
          setExpirationDate(activeBooking.endDate)
          setNickName(activeBooking.nickName)
        }
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
  }, [])

  const onExpiry = () => {
    setExpirationDate(null)
    form.reset()
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

      form.reset()

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

  const handleTimeSelectionChange = (time: string, callback: any) => {
    const startDate = new Date()
    const endDate = new Date()

    endDate.setMinutes(endDate.getMinutes() + parseInt(time))
    form.setValue("startDate", startDate)
    form.setValue("endDate", endDate)

    callback(time)
  }

  return (
    <Card className={"p-2 sm:p-6 shadow-md"}>
      {!isLoading && (
        <CardHeader className={`text-center ${expirationDate ? "pb-0 text-primary" : ""}`}>
          <CardTitle className={"text-xl md:text-2xl xl:text-3xl mb-[-5px] md:mb-0"}>
            {!expirationDate ? "Reservar Estacionamiento" : "Reservado"}
          </CardTitle>
          {!expirationDate && (
            <CardDescription className={"space-y-0 md:space-y-1"}>
              <span className={"max-w-[34ch]"}>Complete los campos para continuar</span>
            </CardDescription>
          )}
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-100 space-y-6">
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
                          onValueChange={(value) => handleTimeSelectionChange(value, field.onChange)}
                          defaultValue={field.value}
                          disabled={showDatePicker}>
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
                          <Button
                            type="button"
                            variant="outline"
                            className={`border-l-0 rounded-l-none px-[12px] ${showDatePicker ? "bg-gray-100 hover:bg-gray-100" : ""}`}
                            onClick={() => setShowDatePicker(!showDatePicker)}>
                            <Calendar size={16} />
                          </Button>
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
                {showDatePicker && <DateRangePicker />}
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
