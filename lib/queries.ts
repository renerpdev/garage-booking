"use server"

import prisma from "@/lib/prisma"
import { logger } from "@/logger"

const defaultEmailAccount = process.env.TEST_EMAIL_ACCOUNT

/****************************************************
                Booking Actions
 *****************************************************/

export async function createBooking(startDate: Date, endDate: Date, nickName: string = "<UNKNOWN>") {
  logger.info(`Creating booking for "${nickName}" from "${startDate}" to "${endDate}"`)
  try {
    await prisma.booking.create({
      data: {
        startDate,
        endDate,
        nickName,
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

    logger.info(`Booking created for "${nickName}" from "${startDate}" to "${endDate}"`)

    return { success: true }
  } catch (error) {
    logger.error(`Error creating booking for "${nickName}" from "${startDate}" to "${endDate}": ${error}`)
    throw new Error(error as any)
  }
}

export async function getActiveBooking() {
  await clearActiveBookings()
  try {
    const data = await prisma.booking.findFirst({
      where: {
        status: "ACTIVE",
        startDate: {
          gte: new Date()
        },
        endDate: {
          gt: new Date()
        }
      },
      orderBy: { createdAt: "asc" }
    })

    let startDate = data?.startDate || null
    let endDate = data?.endDate || null
    let nickName = data?.nickName || null

    return { startDate, endDate, nickName }
  } catch (error) {
    logger.error(`Error getting active booking: ${error}`)
    throw new Error(error as any)
  }
}

export async function clearActiveBookings() {
  logger.info("Setting old ACTIVE bookings to INACTIVE")
  try {
    const data = await prisma.booking.updateMany({
      where: {
        status: "ACTIVE",
        endDate: {
          lt: new Date()
        }
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
    logger.error(`Error deactivating previous ACTIVE bookings: ${error}`)
    throw new Error(error as any)
  }
}
