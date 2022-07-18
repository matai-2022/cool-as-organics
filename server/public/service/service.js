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

  console.log('subscribed')

  await fetch('/api/v1/subscription', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  })
})

self.addEventListener('push', (event) => {
  self.registration.showNotification('Yolo', {
    body: event.data.text(),
    dir: 'rtl',
  })
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
