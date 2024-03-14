import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

const imageUrl =
  "https://images.pexels.com/photos/2280148/pexels-photo-2280148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

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
        url: imageUrl,
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-dvh min-h-dvh w-dvw max-h-dvh`}>
        <div
          className={"flex flex-col h-full w-full mx-auto my-0 overflow-hidden max-w-[800px]"}
          style={{
            background: `url(${imageUrl}) no-repeat center center/cover`
          }}>
          <Navbar />
          <main
            className={"h-full w-full flex-grow"}
            style={{
              backdropFilter: "blur(3px) brightness(0.5) saturate(1.5) contrast(0.9)"
            }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
