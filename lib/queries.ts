"use server"

import prisma from "@/lib/prisma"
import { logger } from "@/logger"
import { Booking } from "@/lib/models"

const defaultEmailAccount = process.env.TEST_EMAIL_ACCOUNT

/****************************************************
                Booking Actions
 *****************************************************/

export async function createBooking(booking: Booking) {
  const { nickName, startDate, endDate } = booking

  logger.info(`Creating booking for "${nickName}" from "${startDate}" to "${endDate}"`)
  try {
    const activeBooking = await getActiveBooking(startDate, endDate)

    if (activeBooking?.startDate) {
      logger.error(`There is already an active booking from "${activeBooking.startDate}" to "${activeBooking.endDate}"`)
      return {
        error: true,
        message: "Ya existe una reserva activa en ese rango de fechas. Por favor intente con uno diferente."
      }
    }

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

export async function getActiveBooking(startDate: Date = new Date(), endDate: Date = new Date()): Promise<Booking> {
  await clearActiveBookings()
  try {
    return (await prisma.booking.findFirst({
      select: {
        startDate: true,
        endDate: true,
        nickName: true,
        createdAt: true
      },
      where: {
        status: "ACTIVE",
        startDate: {
          lte: endDate
        },
        endDate: {
          gte: startDate
        }
      },
      orderBy: { startDate: "asc" }
    })) as Booking
  } catch (error) {
    logger.error(`Error getting active booking: ${error}`)
    throw new Error(error as any)
  }
}

export async function getScheduledBookings(): Promise<Booking[]> {
  try {
    return (await prisma.booking.findMany({
      select: {
        startDate: true,
        endDate: true,
        nickName: true,
        createdAt: true
      },
      where: {
        OR: [
          {
            status: "ACTIVE",
            startDate: {
              gte: new Date()
            }
          },
          {
            status: "ACTIVE",
            startDate: {
              lte: new Date()
            },
            endDate: {
              gte: new Date()
            }
          }
        ]
      },
      orderBy: { startDate: "asc" }
    })) as Booking[]
  } catch (error) {
    logger.error(`Error getting scheduled bookings: ${error}`)
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
