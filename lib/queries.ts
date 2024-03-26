"use server"

import prisma from "@/lib/prisma"
import { logger } from "@/logger"
import { Booking, User } from "@/lib/models"
import { currentUser } from "@clerk/nextjs"

/****************************************************
                Booking Actions
 *****************************************************/

export async function createBooking(booking: Booking) {
  const { nickName, startDate, endDate } = booking

  logger.info(`Creating booking for "${nickName}" from "${startDate}" to "${endDate}"`)
  try {
    const user = await currentUser()
    const email = user?.emailAddresses[0].emailAddress

    if (!email) {
      logger.error("No email found for user")
      return {
        error: true,
        message: "No se pudo obtener el email del usuario. Por favor inicie sesión e inténtelo nuevamente."
      }
    }

    const activeBooking = await getActiveBooking(startDate, endDate)

    if (activeBooking?.startDate) {
      logger.error(`There is already an active booking from "${activeBooking.startDate}" to "${activeBooking.endDate}"`)
      return {
        error: true,
        message: "Ya existe una reserva activa en ese rango de fechas. Por favor intente con uno diferente."
      }
    }

    const data = await prisma.booking.create({
      data: {
        startDate,
        endDate,
        nickName,
        owner: {
          connect: {
            email
          }
        }
      }
    })

    logger.info(`Booking created for "${email}" from "${startDate}" to "${endDate}"`)

    return { success: true, data }
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
        id: true,
        startDate: true,
        endDate: true,
        nickName: true,
        createdAt: true,
        owner: true
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

export async function cancelBookingById(id: number) {
  logger.info(`Cancelling booking with id: ${id}`)
  try {
    await prisma.booking.update({
      where: {
        id
      },
      data: {
        status: "CANCELLED"
      }
    })

    logger.info(`Booking with id: ${id} was cancelled`)
    return { success: true }
  } catch (error) {
    logger.error(`Error cancelling booking with id: ${id}: ${error}`)
    throw new Error(error as any)
  }
}

/****************************************************
          User Actions
 *****************************************************/

export async function createUser(user: Omit<User, "createdAt" | "updatedAt" | "id" | "role">) {
  try {
    await prisma.user.create({
      data: {
        ...user
      }
    })
  } catch (error) {
    logger.error(`Error creating user: ${error}`)
    throw new Error(error as any)
  }
}

export async function deleteUserByExternalId(externalId: string) {
  try {
    await prisma.user.delete({
      where: {
        externalId
      }
    })
  } catch (error) {
    logger.error(`Error deleting user by external id: ${error}`)
    throw new Error(error as any)
  }
}

export async function updateUserByExternalId(externalId: string, user: Partial<User>) {
  try {
    await prisma.user.update({
      where: {
        externalId
      },
      data: {
        ...user
      }
    })
  } catch (error) {
    logger.error(`Error updating user by external id: ${error}`)
    throw new Error(error as any)
  }
}
