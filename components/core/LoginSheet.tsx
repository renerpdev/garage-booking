import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { PropsWithChildren } from "react"
import { LucideMessageCircleWarning } from "lucide-react"

export const LoginSheet = ({ children }: PropsWithChildren) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Acesso Panel</SheetTitle>
          <SheetDescription>
            <p className={"text-primary flex gap-2 border-1 border-primary bg-purple-100 p-4"}>
              <LucideMessageCircleWarning /> Aún no está disponible esta feature
            </p>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
