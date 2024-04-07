"use server"

import { logger } from "@/logger"
import { formatInTimeZone } from "@/src/lib/utils"

const whatsappAccountNumber = process.env.WHATSAPP_API_ACCOUNT_NUMBER
const whatsappApiUrl = process.env.WHATSAPP_API_BASE_URL
const whatsappAuthToken = process.env.WHATSAPP_API_AUTH_TOKEN

const phoneNumber = process.env.TEST_PHONE_NUMBER

const GARAGE_NUMBER = 15 // this is hardcoded for now since we just have one garage available

export async function sendWhatsappMsg(dueDate: Date, nickname: string) {
  logger.info(
    `Trying to send whatsapp message to "${phoneNumber}" with due date "${dueDate}" and nickname "${nickname}"`
  )
  const sendWhatsappMsg = await fetch(`${whatsappApiUrl}/${whatsappAccountNumber}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${whatsappAuthToken}`
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name: "reserva_confirmada",
        language: {
          code: "es"
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: nickname //TODO: later we could use the current user's name
              },
              {
                type: "text",
                text: `${GARAGE_NUMBER}`
              },
              {
                type: "text",
                text: `${formatInTimeZone(dueDate)}`
              }
            ]
          }
        ]
      }
    })
  })
  const data = await sendWhatsappMsg.json()

  if (!sendWhatsappMsg.ok) {
    logger.error(
      `Error sending whatsapp message to "${phoneNumber}" with due date "${dueDate}" and nickname "${nickname}"`
    )
    throw new Error(data.message)
  }

  logger.info(
    `Whatsapp message sent successfully to "${phoneNumber}" with due date "${dueDate}" and nickname "${nickname}"`
  )

  return { success: true, data }
}
