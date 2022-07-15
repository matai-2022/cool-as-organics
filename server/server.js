const express = require('express')
const path = require('path')

const productRoutes = require('./routes/products')
const productTypeRoutes = require('./routes/productTypes')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/products', productRoutes)
server.use('/api/v1/productTypes', productTypeRoutes)

server.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = server
