const express = require('express')

const db = require('../db/products')

const router = express.Router()

router.get('/all', async (req, res) => {
  try {
    const products = await db.getAllProducts()
    res.json(products)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

router.get('/', async (req, res) => {
  try {
    const products = await db.getOpenProducts()
    res.json(products)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

router.get('/by_name', async (req, res) => {
  try {
    const products = await db.getProductsByName(req.query.products)
    console.log(req.query.products)
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
      status,
      compartment,
      productTypeId: product_type_id,
    } = req.body

    const product = {
      name,
      open_date,
      expiry_date,
      status,
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

router.patch('/', async (req, res) => {
  try {
    const {
      id,
      name,
      openDate: open_date,
      expiryDate: expiry_date,
      status,
      compartment,
      productTypeId: product_type_id,
    } = req.body

    await db.updateProduct(id, {
      name,
      open_date,
      expiry_date,
      status,
      compartment,
      product_type_id,
    })

    res.sendStatus(200)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

module.exports = router
