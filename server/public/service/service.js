self.addEventListener('activate', async (event) => {
  console.log('service worker activated')

  const response = await fetch('/api/v1/vapidkey', {
    method: 'get',
  })

  const applicationServerKey = urlB64ToUint8Array(await response.json())

  const subscription = await self.registration.pushManager.subscribe({
    applicationServerKey,
    userVisibleOnly: true,
  })

  console.log('subscribed to push service')

  await fetch('/api/v1/subscription', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  })
})

self.addEventListener('push', (event) => {
  self.registration.showNotification('You have items expiring', {
    // TODO This data will eventually come from the database, accessed via event.data.json()
    body: 'Sirlon steak, banana +2 items\nTap for recipes and tips',
  })
})

self.addEventListener('notificationclick', (event) => {
  clients.openWindow('http://localhost:3000')
})

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
// TODO atob is deprecated - revise this function at a later date
const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
