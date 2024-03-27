"use client"

import { CalendarDays, LogInIcon, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { UserRole } from "@/lib/models"
import Image from "next/image"
import logo from "@/app/logo.svg"
import { usePathname } from "next/navigation"

export function Navbar() {
  const { user } = useUser()
  const pathname = usePathname()

  const isAdmin = ((user?.publicMetadata?.role as string)?.toUpperCase() as UserRole) === "ADMIN"

  return (
    <div className={"bg-gray-50 w-screen h-auto py-2 md:py-3 px-4 md:px-6 border-b-2 border-b-gray-50"}>
      <div className={"flex justify-between items-center"}>
        <Link href={"/"} className={"flex gap-1"}>
          <Image
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
        </Link>
        <div className={"flex gap-4 items-center justify-between"}>
          <Link
            href={"/calendar"}
            className={`hover:text-primary ${pathname == "/calendar" ? "text-primary" : ""}`}
            title="Ir al calendario">
            <CalendarDays />
          </Link>
          {isAdmin ? (
            <Link
              href={"/admin"}
              className={`hover:text-primary ${pathname == "/admin" ? "text-primary" : ""}`}
              title="Ir al tablero">
              <LayoutDashboard />
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
