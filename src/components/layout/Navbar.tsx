"use client"

import { LogInIcon, LockKeyhole } from "lucide-react"
import NextLink from "next/link"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/src/components/ui/button"
import { FeatureFlag, UserRole } from "@/src/lib/models"
import Image from "next/image"
import logo from "@/public/logo.svg"
import { usePathname } from "next/navigation"
import React, { useEffect, useMemo } from "react"
import { getFlags } from "@/src/lib/flags"
import Link from "@/src/components/ui/NavigationLink"

export function Navbar() {
  const { user } = useUser()
  const pathname = usePathname()
  const [flags, setFlags] = React.useState<FeatureFlag | null>(null)

  const isAdminFeatureEnabled = useMemo(() => flags?.adminFeature, [flags])

  useEffect(() => {
    getFlags().then((value) => {
      setFlags(value)
    })
  }, [isAdminFeatureEnabled])

  const isAdmin = ((user?.publicMetadata?.role as string)?.toUpperCase() as UserRole) === "ADMIN"

  return (
    <div className={"bg-gray-50 w-screen h-auto py-2 md:py-3 px-4 md:px-6 border-b-2 border-b-gray-50 shadow-md"}>
      <div className={"flex justify-between items-center"}>
        <NextLink href={"/"} className={"flex gap-1"}>
          <Image
            priority
            src={logo}
            alt="garage booking logo"
            className={"w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] self-center"}
          />
          <div className={"flex flex-col"}>
            <p className={"text-lg sm:text-xl md:text-2xl font-bold"}>
              Garage<span className={"text-primary"}>Booking</span>
            </p>
            <p className={"text-xs text-black font-light mt-[-5px]"}>GalaPoint</p>
          </div>
        </NextLink>
        <div className={"flex gap-4 items-center justify-between"}>
          {isAdminFeatureEnabled && isAdmin ? (
            <Link
              href={"/admin"}
              className={`hover:text-primary ${pathname == "/admin" ? "text-primary" : ""}`}
              title="Administración">
              <LockKeyhole />
            </Link>
          ) : null}
          {!user ? (
            <SignInButton>
              <Button variant={"outline"} className={"hover:text-primary"} title="Inciar sesión">
                <LogInIcon />
              </Button>
            </SignInButton>
          ) : null}
          {user ? <UserButton /> : null}
        </div>
      </div>
    </div>
  )
}
