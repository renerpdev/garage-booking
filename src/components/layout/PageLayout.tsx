"use client"

import React, { PropsWithChildren } from "react"
import { I18nProvider } from "react-aria"
import { useLocale } from "next-intl"

export default function PageLayout({ children }: PropsWithChildren) {
  const locale = useLocale()

  return (
    <I18nProvider locale={locale}>
      <div className={"h-full w-full"}>
        <div className={"hidden bg-red-50"}>{/* this element is used for adding tailwind classes */}</div>
        {children}
      </div>
    </I18nProvider>
  )
}
