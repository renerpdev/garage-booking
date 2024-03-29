"use client"
import React, { PropsWithChildren, Suspense } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"
import { SignInButton, useUser } from "@clerk/nextjs"

interface InfoAlertProps extends PropsWithChildren {
  className?: string
}
const UnAuthAlert = ({ className }: InfoAlertProps) => {
  const { isSignedIn } = useUser()

  if (isSignedIn) return null

  return (
    <Alert className={cn("max-w-md mx-auto bg-orange-50 my-2", className)}>
      <Info className="h-4 w-4 fill-orange-300" />
      <AlertTitle className={"text-orange-700 font-bold"}>Aviso</AlertTitle>
      <AlertDescription className={"text-orange-700"}>
        Para reservar un estacionamiento,{" "}
        <span className={"*:underline"}>
          <Suspense fallback={<span>inicia sesión</span>}>
            <SignInButton mode="modal">inicia sesión</SignInButton>
          </Suspense>
          .
        </span>
      </AlertDescription>
    </Alert>
  )
}

export default UnAuthAlert
