"use client"
import React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"
import { useUser } from "@clerk/nextjs"

interface InfoAlertProps {
  title: string
  description: string
  className?: string
}
const InfoAlert = ({ title, description, className }: InfoAlertProps) => {
  const { isSignedIn } = useUser()

  if (isSignedIn) return null

  return (
    <Alert className={cn("max-w-md mx-auto bg-orange-50", className)}>
      <Info className="h-4 w-4 fill-orange-300" />
      <AlertTitle className={"text-orange-700 font-bold"}>{title}</AlertTitle>
      <AlertDescription className={"text-orange-700"}>{description}</AlertDescription>
    </Alert>
  )
}

export default InfoAlert
