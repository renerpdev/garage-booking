import { CalendarDays, LogInIcon } from "lucide-react"
import Link from "next/link"
import { getFlags } from "@/lib/flags"
import { LoginSheet } from "@/components/core/LoginSheet"

export async function Navbar() {
  const flags = await getFlags()

  return (
    <div className={"bg-gray-50 w-screen h-auto py-2 md:py-3 px-5 md:px-8 border-b-2 border-b-gray-50"}>
      <div className={"flex justify-between items-center"}>
        <div className={"flex flex-col"}>
          <Link href={"/"} className={"text-xl md:text-2xl font-bold"}>
            Garage<span className={"text-primary"}>Booking</span>
          </Link>
          <div className={"text-xs text-black font-light mt-[-5px]"}>GalaPoint</div>
        </div>
        <div className={"flex gap-4 items-center"}>
          {flags.calendarFeature && (
            <Link href={"/calendar"} className={"hover:text-primary"}>
              <CalendarDays />
            </Link>
          )}
          {flags.loginFeature && (
            <LoginSheet>
              <Link href={"/calendar"}>
                <LogInIcon />
              </Link>
            </LoginSheet>
          )}
        </div>
      </div>
    </div>
  )
}
