import { Webhook } from "svix"
import { headers } from "next/headers"
import { WebhookEvent } from "@clerk/nextjs/server"
import { logger } from "@/logger"
import { createUser, deleteUserByExternalId, updateUserByExternalId } from "@/src/lib/queries"
import { UserRole } from "@/src/lib/models"

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local")
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    }) as WebhookEvent
  } catch (err) {
    logger.error("Error verifying webhook:", err)
    return new Response("Error occured", {
      status: 400
    })
  }

  // Get the ID and type
  const { id } = evt.data
  const eventType = evt.type

  logger.info(`Webhook with and ID of ${id} and type of ${eventType}`)
  logger.info("Webhook body:", body)

  switch (evt.type) {
    case "user.created": {
      const { first_name, id: externalId, last_name, email_addresses, image_url: avatarUrl } = evt.data
      const name = `${first_name} ${last_name}`
      const email = email_addresses[0].email_address

      await createUser({
        name,
        externalId,
        avatarUrl,
        email
      })
      break
    }
    case "user.deleted": {
      const { id: externalId } = evt.data
      await deleteUserByExternalId(externalId || "-1")
      break
    }
    case "user.updated": {
      const { first_name, id: externalId, last_name, email_addresses, image_url: avatarUrl, public_metadata } = evt.data
      const name = `${first_name} ${last_name}`
      const email = email_addresses[0].email_address
      const role = ((public_metadata.role as string)?.toUpperCase() as UserRole) || undefined

      await updateUserByExternalId(externalId, {
        name,
        email,
        avatarUrl,
        role
      })
      break
    }
    default:
      return new Response("Not Implemented", {
        status: 501
      })
  }

  return new Response("", { status: 200 })
}
