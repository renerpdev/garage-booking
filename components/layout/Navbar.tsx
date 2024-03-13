import { Button } from "@/components/ui/button"
import { LogInIcon } from "lucide-react"
import { LoginSheet } from "@/components/core/LoginSheet"

export const Navbar = () => (
  <div className={"bg-gray-50 w-100 h-auto mb-auto py-3 sm:py-5 px-5 border-b-2 border-b-gray-50"}>
    <div className={"flex justify-between items-center"}>
      <div className={"flex flex-col"}>
        <div className={"text-xl md:text-2xl font-bold"}>
          Garage<span className={"text-primary"}>Booking</span>
        </div>
        <div className={"text-xs text-black font-light mt-[-5px]"}>GalaPoint</div>
      </div>
      <div className={"flex space-x-4"}>
        <LoginSheet>
          <Button variant={"ghost"} className={"p-2 hover:text-primary"}>
            <LogInIcon />
          </Button>
        </LoginSheet>
      </div>
    </div>
  </div>
)
