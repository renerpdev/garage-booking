import { Toaster } from "@/components/ui/toaster"
import { BookingCard } from "@/components/core/BookingCard"

export default function Home() {
  return (
    <main
      className="flex w-full h-full flex-col items-center justify-center p-5"
      style={{
        backdropFilter: "blur(3px) brightness(0.5) saturate(1.5) contrast(0.9)"
      }}>
      <BookingCard />
      <Toaster />
    </main>
  )
}
