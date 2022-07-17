const connection = require('./connection')

function getProductDefaultsByName(productName, db = connection) {
  return db('product_defaults')
    .leftJoin(
      'product_types',
      'product_types.id',
      'product_defaults.product_type_id'
    )
    .where('product_defaults.name', productName)
    .select(
      'product_defaults.id as id',
      'product_defaults.name as name',
      'product_types.id as productTypeId',
      'lifespan',
      'compartment'
    )
    .first()
}

module.exports = { getProductDefaultsByName }
