import React, { PropsWithChildren } from "react"

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className={"h-full w-full"}>
      <div className={"hidden bg-red-50"}>{/* this element is used for adding tailwind classes */}</div>
      {children}
    </div>
  )
}
