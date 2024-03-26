import { CalendarDays, UserIcon } from "lucide-react"
import Link from "next/link"
import { currentUser, SignInButton, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export async function Navbar() {
  const user = await currentUser()

  return (
    <div className={"bg-gray-50 w-screen h-auto py-2 md:py-3 px-5 md:px-8 border-b-2 border-b-gray-50"}>
      <div className={"flex justify-between items-center"}>
        <div className={"flex flex-col"}>
          <Link href={"/"} className={"text-xl md:text-2xl font-bold"}>
            Garage<span className={"text-primary"}>Booking</span>
          </Link>
          <div className={"text-xs text-black font-light mt-[-5px]"}>GalaPoint</div>
        </div>
        <div className={"flex gap-4 items-center justify-between"}>
          <Link href={"/calendar"} className={"hover:text-primary"} title="Ir al calendario">
            <CalendarDays />
          </Link>
          {!user ? (
            <SignInButton>
              <Button variant={"ghost"} className={"hover:text-primary"} title="Inciar sesión">
                <UserIcon />
              </Button>
            </SignInButton>
          ) : null}
          <UserButton />
        </div>
      </div>
    </div>
  )
}
