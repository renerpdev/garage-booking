import winston from "winston"
const { combine, timestamp, json, colorize, simple } = winston.format

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "app.log" })
  ]
})

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(simple(), colorize({ all: true }))
    })
  )
} else {
  logger.add(
    new winston.transports.Console({
      format: simple()
    })
  )
}

export { logger }
