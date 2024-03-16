"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarCheck, Loader } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Timer } from "@/components/core/Timer"
import { useEffect, useState } from "react"
import { createBooking, getActiveBooking } from "@/lib/queries"
import { formatInTimeZone } from "@/lib/utils"

const OPTIONS = [
  {
    value: "15",
    label: "15 Minutos"
  },
  {
    value: "30",
    label: "30 Minutos"
  },
  {
    value: "45",
    label: "45 Minutos"
  },
  {
    value: "60",
    label: "60 Minutos"
  }
]

const FormSchema = z.object({
  nickName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres."
  }),
  time: z.string().min(1, {
    message: "Debe seleccionar un cantidad válida."
  })
})

export const BookingCard = () => {
  const { toast } = useToast()
  const [expirationDate, setExpirationDate] = useState<Date | null>(null)
  const [nickName, setNickName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const onExpiry = () => {
    setExpirationDate(null)
    form.reset()
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)

    try {
      const startDate = new Date()
      const endDate = new Date()
      endDate.setMinutes(endDate.getMinutes() + parseInt(data.time))

      await createBooking(startDate, endDate, data.nickName)

      setExpirationDate(endDate)

      toast({
        title: "Reserva Confirmada",
        description: (
          <p>
            {data.nickName}, tienes estacionamiento reservado hasta las <time>{formatInTimeZone(endDate)}</time> horas.
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

  return (
    <Card className={"p-2 sm:p-6"}>
      {!isLoading && (
        <CardHeader className={`text-center ${expirationDate ? "pb-0 text-primary" : ""}`}>
          <CardTitle>{!expirationDate ? "Reservar Estacionamiento" : "Reservado"}</CardTitle>
          {!expirationDate && (
            <CardDescription>
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
                        <FormDescription>El nombre se usará para la confirmación.</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Duración</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Elije una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!fieldState.invalid && (
                        <FormDescription>Define el tiempo que durará la reserva.</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                  name="time"
                  control={form.control}
                />
                <Button type="submit" className={"w-full"} disabled={!form.formState.isValid || isSubmitting}>
                  {(isSubmitting && <Loader size={18} className={"animate-spin"} />) || (
                    <>
                      <CalendarCheck size={18} />
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
            <span className={"underline"}>{expirationDate && formatInTimeZone(expirationDate)}</span>
          </code>
        </CardFooter>
      )}
    </Card>
  )
}
