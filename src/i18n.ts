import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"
import { locales } from "./intl.config"
import { IntlErrorCode } from "next-intl"

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        console.error(error)
      } else {
        console.error(error)
        // TODO: Other errors indicate a bug in the app and should be reported
        // reportToErrorTracking(error);
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join(".")

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return path + " is not yet translated"
      } else {
        return "Dear developer, please fix this message: " + path
      }
    },
    messages: (await import(`../messages/${locale}.json`)).default,
    formats: {
      dateTime: {
        short: {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      }
    },
    now: new Date(),
    timeZone: "America/Montevideo"
  }
})
