"use client"

import React from "react"
import { Loader } from "lucide-react"
import { useBookingContext } from "@/context/booking-context"

const Spinner = () => {
  const { isLoading } = useBookingContext()

  if (!isLoading) return null

  return (
    <div
      className={
        "flex flex-col items-center justify-center w-full h-full z-30 fixed top-0 left-0 bg-opacity-50 bg-black"
      }>
      <Loader size={50} className={"animate-spin"} />
    </div>
  )
}

export default Spinner
