const connection = require('./connection')

function getAllProductTypes(db = connection) {
  return db('product_types').select()
}

module.exports = { getAllProductTypes }
