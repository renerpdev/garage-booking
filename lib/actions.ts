"use server"

import prisma from "@/lib/prisma"
import { sendWhatsappMsg } from "@/lib/whatsapp"
import { logger } from "@/logger"

const defaultEmailAccount = process.env.TEST_EMAIL_ACCOUNT

/****************************************************
                Booking Actions
 *****************************************************/

export async function createBooking(nickname: string, dueDate: Date) {
  logger.info(`Trying to create booking for "${nickname}" with due date "${dueDate}"`)
  try {
    await clearActiveBookings()
    await prisma.booking.create({
      data: {
        dueDate,
        nickname,
        owner: {
          connect: {
            // TODO: get the user from the session. Right now we are using a default user
            email: defaultEmailAccount
          }
        }
      }
    })

    await sendWhatsappMsg(dueDate, nickname)

    logger.info(`Booking created for "${nickname}" with due date "${dueDate}"`)

    return { success: true }
  } catch (error) {
    logger.error(`Error creating booking for "${nickname}" with due date "${dueDate}": ${error}`)
    throw new Error(error as any)
  }
}

export async function getActiveBooking() {
  try {
    const data = await prisma.booking.findFirst({
      where: {
        status: "ACTIVE"
      },
      orderBy: { createdAt: "desc" }
    })

    let dueDate = data?.dueDate || null

    if (dueDate && (data?.dueDate || new Date()).getTime() <= new Date().getTime()) {
      dueDate = null
    }

    return { dueDate, nickname: data?.nickname || null }
  } catch (error) {
    logger.error(`Error getting active booking: ${error}`)
    throw new Error(error as any)
  }
}

export async function clearActiveBookings() {
  logger.info("Trying to clear ACTIVE bookings")
  try {
    const data = await prisma.booking.updateMany({
      where: {
        status: "ACTIVE"
      },
      data: {
        status: "INACTIVE"
      }
    })

    logger.info(`${data?.count} Bookings ${data?.count > 1 ? "were" : "was"} set to INACTIVE`)

    return { success: true }
  } catch (error) {
    logger.error(`Error clearing ACTIVE bookings: ${error}`)
    throw new Error(error as any)
  }
}
