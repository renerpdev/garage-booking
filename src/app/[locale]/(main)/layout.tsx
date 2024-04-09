import type { Viewport } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "@/src/components/layout/Navbar"
import { Footer } from "@/src/components/layout/Footer"
import { Toolbar } from "@/src/components/layout/Toolbar"
import React, { PropsWithChildren, Suspense } from "react"
import { BookingProvider } from "@/src/context/booking-context"
import { Toaster } from "@/src/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs"
import Notifications from "@/src/components/core/Notifications"
import { getFlags } from "@/src/lib/flags"
import { encrypt, type FlagValuesType } from "@vercel/flags"
import { FlagValues } from "@vercel/flags/react"
import UnauthenticatedAlert from "@/src/components/ui/UnauthenticatedAlert"
import ActiveBookingAlert from "@/src/components/ui/ActiveBookingAlert"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { PropsWithParams } from "@/src/lib/models"
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { esES, enUS } from "@clerk/localizations"
import { locales } from "@/src/intl.config"
import { NextIntlClientProvider } from "next-intl"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#B0B3FB"
}

async function ConfidentialFlagValues({ values }: { values: FlagValuesType }) {
  const encryptedFlagValues = await encrypt(values)
  return <FlagValues values={encryptedFlagValues} />
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PropsWithParams) {
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    title: t("title"),
    description: t("description"),
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale,
      url: "https://garage-booking.renerp.dev",
      siteName: t("openGraph.siteName"),
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      images: [
        {
          url: "https://garage-booking.renerp.dev/screenshot.jpeg",
          width: 800,
          height: 600,
          alt: t("openGraph.imageAlt")
        }
      ]
    }
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<PropsWithChildren & PropsWithParams>) {
  const values = await getFlags()
  const messages = await getMessages()

  unstable_setRequestLocale(locale)

  return (
    <ClerkProvider localization={locale === "es" ? esES : enUS}>
      <html lang={locale}>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body
          className={`${inter.className} flex flex-col min-h-screen w-screen antialiased bg-gradient-to-r from-violet-300 to-indigo-300`}>
          <NextIntlClientProvider messages={messages}>
            <SpeedInsights />
            <Notifications />
            <Navbar />
            <BookingProvider>
              <main className={"flex-1 flex flex-col p-4 md:px-6 gap-2"}>
                <UnauthenticatedAlert />
                <ActiveBookingAlert />
                {children}
              </main>
              <Toaster />
            </BookingProvider>
            <Footer />
            <Toolbar />
            <Suspense fallback={null}>
              <ConfidentialFlagValues values={values} />
            </Suspense>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
