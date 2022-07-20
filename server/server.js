const express = require('express')
const path = require('path')
const fsPromise = require('fs').promises
const webpush = require('web-push')

const productRoutes = require('./routes/products')
const productTypeRoutes = require('./routes/productTypes')
const recipeRoutes = require('./routes/recipes')
const productDefaultsRoutes = require('./routes/productDefaults')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/products', productRoutes)
server.use('/api/v1/product_types', productTypeRoutes)
server.use('/api/v1/recipes', recipeRoutes)
server.use('/api/v1/product_defaults', productDefaultsRoutes)

server.post('/api/v1/subscription', async (req, res) => {
  try {
    const subscription = req.body
    await fsPromise.writeFile(
      path.join(__dirname, 'subscription.json'),
      JSON.stringify(subscription)
    )
    res.send('Subscription saved')
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

server.get('/api/v1/vapidkey', async (req, res) => {
  try {
    const vapidKeys = webpush.generateVAPIDKeys()

    await fsPromise.writeFile(
      path.join(__dirname, 'vapidkey.json'),
      JSON.stringify(vapidKeys)
    )
    res.json(vapidKeys.publicKey)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

server.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = server
