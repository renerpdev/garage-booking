import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Toolbar } from "@/components/layout/Toolbar"
import React, { Suspense } from "react"
import { BookingProvider } from "@/context/booking-context"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs"
import Notifications from "@/components/core/Notifications"
import { getFlags } from "@/lib/flags"
import { encrypt, type FlagValuesType } from "@vercel/flags"
import { FlagValues } from "@vercel/flags/react"
import UnauthorizedAlert from "@/components/ui/UnauthorizedAlert"
import ActiveBookingAlert from "@/components/core/ActiveBookingAlert"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Garage Booking | Gala Point",
  description: "Sitio web para reservar estacionamiento en Gala Point",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "es",
    url: "https://garage-booking.renerp.dev",
    siteName: "Garage Booking | Gala Point",
    title: "Garage Booking | Gala Point",
    description: "Sitio web para reservar estacionamiento en Gala Point",
    images: [
      {
        url: "https://garage-booking.renerp.dev/screenshot.jpeg",
        width: 800,
        height: 600,
        alt: "Garage Booking | Gala Point"
      }
    ]
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

async function ConfidentialFlagValues({ values }: { values: FlagValuesType }) {
  const encryptedFlagValues = await encrypt(values)
  return <FlagValues values={encryptedFlagValues} />
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const values = await getFlags()

  return (
    <ClerkProvider>
      <html lang="es">
        <body className={`${inter.className} flex flex-col min-h-screen w-screen antialiased bg-gray-200`}>
          <Notifications />
          <Navbar />
          <BookingProvider>
            <main className={"flex-1 flex flex-col p-4 md:px-6 gap-2"}>
              <UnauthorizedAlert />
              <ActiveBookingAlert />
              {children}
            </main>
            <Toaster />
          </BookingProvider>
          <Footer />
          <Suspense>
            <Toolbar />
          </Suspense>
          <Suspense fallback={null}>
            <ConfidentialFlagValues values={values} />
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  )
}
