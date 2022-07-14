const express = require('express')

const db = require('../db/products')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await db.getAllProducts()
    res.json(products)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  try {
    const {
      name,
      openDate: open_date,
      expiryDate: expiry_date,
      isUsed: is_used,
      compartment,
      productTypeId: product_type_id,
    } = req.body

    const product = {
      name,
      open_date,
      expiry_date,
      is_used,
      compartment,
      product_type_id,
    }

    const id = await db.addProduct(product)

    res.json(id)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

module.exports = router
