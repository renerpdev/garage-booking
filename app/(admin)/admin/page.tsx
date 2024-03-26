import React from "react"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs"

const AdminPage = async () => {
  const user = await currentUser()

  if (user?.privateMetadata.role !== "admin") {
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
