import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import Head from "next/head"

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <body className={`${inter.className} h-dvh min-h-dvh w-dvw max-h-dvh`}>
        <div
          className={"flex flex-col h-full w-full mx-auto my-0 overflow-hidden max-w-[800px]"}
          style={{
            background:
              "url('https://images.pexels.com/photos/2280148/pexels-photo-2280148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') no-repeat center center/cover"
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
