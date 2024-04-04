import React from "react"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs"
import { getFlags } from "@/lib/flags"

const AdminPage = async () => {
  const user = await currentUser()
  const flags = await getFlags()

  if (!flags?.adminFeature) {
    return null
  }

  if (user?.publicMetadata.role !== "admin") {
    return <div>Unauthorized</div>
  }

  return (
    <div>
      hello from admin page!!
      <p>
        <Link href={"/"}>Go to home</Link>
      </p>
    </div>
  )
}

export default AdminPage
