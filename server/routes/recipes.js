const express = require('express')
require('dotenv').config()

const router = express.Router()
const request = require('superagent')

//GET /api/v1/recipes
router.get('/', async (req, res) => {
  try {
    const recipe = await request
      .get('https://tasty.p.rapidapi.com/recipes/list')
      .set({
        'X-RapidAPI-Key': process.env.TASTY_API_KEY,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      })
      .query({ from: '0', size: '2', q: req.query.ingredient })

    res.json(recipe.body)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

module.exports = router
