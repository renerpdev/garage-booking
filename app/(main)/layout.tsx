import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Toolbar } from "@/components/layout/Toolbar"
import React, { Suspense } from "react"
import { encrypt, type FlagValuesType } from "@vercel/flags"
import { FlagValues } from "@vercel/flags/react"
import { getFlags } from "@/lib/flags"
import { BookingProvider } from "@/context/booking-context"
import Spinner from "@/components/ui/Spinner"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

const imageUrl = "https://images.pexels.com/photos/2280148/pexels-photo-2280148.jpeg"

export const metadata: Metadata = {
  title: "Garage Booking | Gala Point",
  description: "Sitio web para reservar estacionamiento en Gala Point",
  openGraph: {
    type: "website",
    locale: "es",
    url: "https://garage-booking.renerp.dev",
    siteName: "Garage Booking | Gala Point",
    title: "Garage Booking | Gala Point",
    description: "Sitio web para reservar estacionamiento en Gala Point",
    images: [
      {
        url: `${imageUrl}?auto=compress&cs=tinysrgb&w=640&h=425&dpr=1`,
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
        <body
          className={`${inter.className} flex flex-col min-h-screen w-screen mx-auto my-0 antialiased`}
          style={{
            background: `url(${imageUrl}?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2) no-repeat center center/cover`
          }}>
          <Navbar />
          <BookingProvider>
            <Spinner />
            <main className={"min-h-full my-auto w-full"}>{children}</main>
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
