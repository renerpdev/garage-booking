self.addEventListener("push", async (event) => {
  if (event.data) {
    const eventData = await event.data.json()
    await showLocalNotification(eventData.title, eventData.body, self.registration)
  }
})

const showLocalNotification = async (title, body, swRegistration) => {
  try {
    await swRegistration.showNotification(title, {
      body,
      icon: "/ios/192.png"
    })
  } catch (error) {
    console.error(error)
  }
}
