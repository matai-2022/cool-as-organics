const connection = require('./connection')

function getAllProducts(db = connection) {
  return db('products')
    .leftJoin('product_types', 'product_types.id', 'products.product_type_id')
    .select(
      'products.id as id',
      'products.name as name',
      'open_date as openDate',
      'expiry_date as expiryDate',
      'status',
      'compartment',
      'product_types.name as productType'
    )
}

function getOpenProducts(db = connection) {
  return db('products')
    .leftJoin('product_types', 'product_types.id', 'products.product_type_id')
    .select(
      'products.id as id',
      'products.name as name',
      'open_date as openDate',
      'expiry_date as expiryDate',
      'status',
      'compartment',
      'product_types.name as productType'
    )
    .where('status', 'open')
}

function addProduct(product, db = connection) {
  return db('products').insert(product)
}

function updateProduct(id, product, db = connection) {
  return db('products').where('id', id).update(product)
}

module.exports = { getAllProducts, getOpenProducts, addProduct, updateProduct }
