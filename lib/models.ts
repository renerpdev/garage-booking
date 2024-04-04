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

export type ActiveBooking = Omit<Booking, "updatedAt" | "status">

export type CanceledBooking = Pick<Booking, "id" | "startDate" | "endDate">

export type FeatureFlag = {
  adminFeature?: boolean
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

export type Subscription = {
  id: number
  endpoint: string
  data: string
  createdAt: Date
}

export type SubscriptionDto = Pick<Subscription, "data" | "endpoint">

export type NotificationContent = {
  title: string
  body: string
}
