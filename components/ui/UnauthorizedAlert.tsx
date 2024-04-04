"use client"
import React, { PropsWithChildren } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"
import { useUser } from "@clerk/nextjs"

interface InfoAlertProps extends PropsWithChildren {
  className?: string
}
const UnauthorizedAlert = ({ className }: InfoAlertProps) => {
  const { isSignedIn } = useUser()

  if (isSignedIn) return null

  return (
    <Alert className={cn("md:max-w-md mx-auto bg-orange-50 shadow-md", className)}>
      <Info className="h-4 w-4 fill-orange-300" />
      <AlertTitle className={"text-orange-700 font-bold"}>Aviso</AlertTitle>
      <AlertDescription className={"text-orange-700"}>
        Para reservar un estacionamiento debes iniciar sesión.
      </AlertDescription>
    </Alert>
  )
}

export default UnauthorizedAlert
