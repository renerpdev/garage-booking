import { Toaster } from "@/components/ui/toaster"
import { BookingCard } from "@/components/core/BookingCard"

export default async function Home() {
  return (
    <div className="flex w-full min-h-full flex-col items-center justify-center p-5">
      <BookingCard />
      <Toaster />
    </div>
  )
}
