import { NotificationContent } from "@/src/lib/models"
import { config } from "@/src/config"

export const notificationsSupported = () =>
  "Notification" in window && "serviceWorker" in navigator && "PushManager" in window

export const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations()
  await Promise.all(registrations.map((r) => r.unregister()))
}

export const isPermissionGrantedOrDefault = () =>
  isPermissionGranted() || window?.Notification?.permission !== "default"

export const isPermissionGranted = () => window?.Notification?.permission === "granted"

export const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("/sw.js")
}

export const subscribe = async () => {
  if (!notificationsSupported()) {
    console.error("Notifications not supported. You might need to accept the permissions.")
    return
  }

  try {
    await unregisterServiceWorkers()

    const swRegistration = await registerServiceWorker()

    const permission = await window?.Notification?.requestPermission()
    if (permission !== "granted") {
      throw new Error("Permission not granted")
    }

    const options: PushSubscriptionOptionsInit = {
      applicationServerKey: config.vapidPublicKey,
      userVisibleOnly: true
    }
    const subscription = await swRegistration.pushManager.subscribe(options)

    await saveSubscription(subscription)
    window.location.reload()
  } catch (err) {
    console.error("Error", err)
  }
}

export const saveSubscription = async (subscription: PushSubscription) => {
  const BACKEND_URL = "/api/notifications/subscribe"

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(subscription)
  })
  return response.json()
}

export const notifySubscribers = async (content: NotificationContent) => {
  const BACKEND_URL = "/api/notifications/send"

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(content)
  })
  return response.json()
}
