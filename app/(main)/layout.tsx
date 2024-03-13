import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Garage Booking | Gala Point",
  description: "Sitio web para reservar estacionamiento en Gala Point"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div
          className={"flex flex-col h-screen w-screen mx-auto my-0 overflow-hidden max-w-[800px]"}
          style={{
            background:
              "url('https://images.pexels.com/photos/2280148/pexels-photo-2280148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') no-repeat center center/cover"
          }}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
