const express = require('express')

const db = require('../db/productDefaults')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    console.log(req.query.product)
    const productDefaults = await db.getProductDefaultsByName(req.query.product)
    res.json(productDefaults)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

module.exports = router
