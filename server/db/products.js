const connection = require('./connection')

function getAllProducts(db = connection) {
  return db('products').select()
}

function addProduct(product, db = connection) {
  return db('products').insert(product)
}

module.exports = { getAllProducts, addProduct }
