import { config } from "@/config"

export const notificationsSupported = () =>
  "Notification" in window && "serviceWorker" in navigator && "PushManager" in window

export const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations()
  await Promise.all(registrations.map((r) => r.unregister()))
}

export const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("/sw.js")
}

export const subscribe = async () => {
  await unregisterServiceWorkers()

  const swRegistration = await registerServiceWorker()
  await window?.Notification.requestPermission()

  try {
    const options = {
      applicationServerKey: config.vapidPublicKey,
      userVisibleOnly: true
    }
    const subscription = await swRegistration.pushManager.subscribe(options)

    await saveSubscription(subscription)
  } catch (err) {
    console.error("Error", err)
  }
}

export const saveSubscription = async (subscription: PushSubscription) => {
  const ORIGIN = window.location.origin
  const BACKEND_URL = `${ORIGIN}/api/notification`

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(subscription)
  })
  return response.json()
}

export const notifySubscribers = async () => {
  const ORIGIN = window.location.origin
  const BACKEND_URL = `${ORIGIN}/api/notification`

  const response = await fetch(BACKEND_URL, {
    method: "GET"
  })
  return response.json()
}
