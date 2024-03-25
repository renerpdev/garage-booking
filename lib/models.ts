export type Booking = {
  id: number
  startDate: Date
  endDate: Date
  nickName?: string
  createdAt: Date
}

export type FeatureFlag = {
  calendarFeature?: boolean
  loginFeature?: boolean
}
