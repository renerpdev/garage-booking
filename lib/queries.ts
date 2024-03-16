"use server"

import prisma from "@/lib/prisma"
import { logger } from "@/logger"

const defaultEmailAccount = process.env.TEST_EMAIL_ACCOUNT

/****************************************************
                Booking Actions
 *****************************************************/

export async function createBooking(nickname: string, dueDate: Date) {
  logger.info(`Creating booking for "${nickname}" with due date "${dueDate}"`)
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

    // TODO: Uncomment this line when the whatsapp integration is ready
    // await sendWhatsappMsg(dueDate, nickname)

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
        status: "ACTIVE",
        dueDate: {
          gt: new Date()
        }
      },
      orderBy: { createdAt: "desc" }
    })

    let dueDate = data?.dueDate || null

    return { dueDate, nickname: data?.nickname || null }
  } catch (error) {
    logger.error(`Error getting active booking: ${error}`)
    throw new Error(error as any)
  }
}

export async function clearActiveBookings() {
  logger.info("Setting current ACTIVE bookings to INACTIVE")
  try {
    const data = await prisma.booking.updateMany({
      where: {
        status: "ACTIVE"
      },
      data: {
        status: "INACTIVE"
      }
    })

    const deactivatedBookings = data.count
    if (deactivatedBookings > 0) {
      logger.info(`${deactivatedBookings} Bookings ${deactivatedBookings > 1 ? "were" : "was"} set to INACTIVE`)
    }

    return { success: true }
  } catch (error) {
    logger.error(`Error deactivating ACTIVE bookings: ${error}`)
    throw new Error(error as any)
  }
}
