"use client"
import React, { PropsWithChildren } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { cn } from "@/src/lib/utils"
import { Info } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"

interface InfoAlertProps extends PropsWithChildren {
  className?: string
}
const UnauthenticatedAlert = ({ className }: InfoAlertProps) => {
  const { isSignedIn } = useUser()
  const t = useTranslations("Components.UnauthenticatedAlert")

  if (isSignedIn) return null

  return (
    <Alert className={cn("md:max-w-md mx-auto bg-orange-50 shadow-md", className)}>
      <Info className="h-4 w-4 fill-orange-300" />
      <AlertTitle className={"text-orange-700 font-bold"}>{t("title")}</AlertTitle>
      <AlertDescription className={"text-orange-700"}>{t("description")}</AlertDescription>
    </Alert>
  )
}

export default UnauthenticatedAlert
