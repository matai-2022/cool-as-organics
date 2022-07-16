const express = require('express')
const path = require('path')

const productRoutes = require('./routes/products')
<<<<<<< HEAD
const productTypeRoutes = require('./routes/productTypes')
=======
const recipeRoutes = require('./routes/recipes')
>>>>>>> main

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/products', productRoutes)
<<<<<<< HEAD
server.use('/api/v1/productTypes', productTypeRoutes)

=======
server.use('/api/v1/recipes', recipeRoutes)
>>>>>>> main
server.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = server
