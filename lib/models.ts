export type Booking = {
  id: number
  startDate: Date
  endDate: Date
  nickName?: string
  createdAt: Date
}

export type ActiveBooking = Omit<Booking, "createdAt" | "id"> | null

export type FeatureFlag = {
  calendarFeature?: boolean
  loginFeature?: boolean
}
