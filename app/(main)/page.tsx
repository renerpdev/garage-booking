import { BookingForm } from "@/components/core/BookingForm"

export default async function Home() {
  return (
    <div className="flex w-full min-h-full flex-col items-center justify-center p-4 md:px-6">
      <BookingForm />
    </div>
  )
}
