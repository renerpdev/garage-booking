"use client"

import React, { PropsWithChildren } from "react"
import { I18nProvider } from "react-aria"
import { useLocale } from "next-intl"
import Head from "next/head"

export default function PageLayout({ children }: PropsWithChildren) {
  const locale = useLocale()

  return (
    <I18nProvider locale={locale}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className={"h-full w-full"}>
        <div className={"hidden bg-red-50"}>{/* this element is used for adding tailwind classes */}</div>
        {children}
      </div>
    </I18nProvider>
  )
}
