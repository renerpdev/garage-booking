export type BookingStatus = "ACTIVE" | "CANCELLED"

export type Booking = {
  id: number
  startDate: Date
  endDate: Date
  nickName?: string
  status: BookingStatus
  createdAt: Date
  updatedAt: Date
  owner: Partial<User>
}

export type ActiveBooking =
  | (Pick<Booking, "startDate" | "endDate" | "nickName"> & {
      owner: Partial<User>
    })
  | null

export type FeatureFlag = {
  calendarFeature?: boolean
  loginFeature?: boolean
}

export type UserRole = "ADMIN" | "USER"

export type User = {
  id: number
  externalId: string
  email: string
  name?: string
  avatarUrl?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}
