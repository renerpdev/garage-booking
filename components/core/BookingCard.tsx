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
import { format } from "date-fns"

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
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres."
  }),
  time: z.string().min(1, {
    message: "Debe seleccionar un cantidad válida."
  })
})

export const BookingCard = () => {
  const { toast } = useToast()
  const [expirationTime, setExpirationTime] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      time: ""
    }
  })

  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 200)

    return () => clearTimeout(timeout)
  }, [])

  const onExpiry = () => {
    setExpirationTime(null)
    form.reset()
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    setTimeout(() => {
      const time = new Date()
      time.setMinutes(time.getMinutes() + parseInt(data.time))
      setExpirationTime(time)

      toast({
        title: "Reserva Confirmada",
        description: (
          <p>
            {data.name}, tienes estacionamiento reservado hasta las <time>{format(time, "hh:mm:aa")}</time> horas.
          </p>
        )
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card className={"p-2 sm:p-6"}>
      {!isLoading && (
        <CardHeader className={`text-center ${expirationTime ? "pb-0 text-primary" : ""}`}>
          <CardTitle>{!expirationTime ? "Reservar Estacionamiento" : "Reservado"}</CardTitle>
          {!expirationTime && (
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
          {expirationTime && <Timer expiryTimestamp={expirationTime} onExpire={onExpiry} />}
          {!expirationTime && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-100 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
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
      {expirationTime && (
        <CardFooter className={"flex justify-center text-sm"}>
          <code>
            por <span className={"underline"}>{form.getValues("name")}</span> hasta{" "}
            <span className={"underline"}>{expirationTime && format(expirationTime, "hh:mm:aa")}</span>
          </code>
        </CardFooter>
      )}
    </Card>
  )
}
