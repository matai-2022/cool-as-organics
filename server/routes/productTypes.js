const express = require('express')

const db = require('../db/productTypes')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const productTypes = await db.getAllProductTypes()
    res.json(productTypes)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

module.exports = router
