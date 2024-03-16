import { CalendarDays } from "lucide-react"
import Link from "next/link"

export const Navbar = () => (
  <div className={"bg-gray-50 w-100 h-auto mb-auto py-2 md:py-3 px-5 md:px-8 border-b-2 border-b-gray-50"}>
    <div className={"flex justify-between items-center"}>
      <div className={"flex flex-col"}>
        <Link href={"/"} className={"text-xl md:text-2xl font-bold"}>
          Garage<span className={"text-primary"}>Booking</span>
        </Link>
        <div className={"text-xs text-black font-light mt-[-5px]"}>GalaPoint</div>
      </div>
      <div className={"flex gap-4 items-center"}>
        <Link href={"/calendar"} className={"hover:text-primary"}>
          <CalendarDays />
        </Link>
        {/*TODO: bring back once we support login*/}
        {/*<LoginSheet>*/}
        {/*  <Link href={"/calendar"}>*/}
        {/*    <LogInIcon />*/}
        {/*  </Link>*/}
        {/*</LoginSheet>*/}
      </div>
    </div>
  </div>
)
