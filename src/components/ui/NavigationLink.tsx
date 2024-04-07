"use client"

import clsx from "clsx"
import { useSelectedLayoutSegment } from "next/navigation"
import { ComponentProps } from "react"
import type { AppPathnames } from "@/src/intl.config"
import { Link } from "@/src/navigation"

export default function NavigationLink<Pathname extends AppPathnames>({
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/"
  const isActive = pathname === href

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={clsx("hover:text-primary", isActive ? "text-primary" : "text-gray-200")}
      href={href}
      {...rest}
    />
  )
}
