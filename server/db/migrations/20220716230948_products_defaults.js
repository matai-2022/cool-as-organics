exports.up = function (knex) {
  return knex.schema.createTable('product_defaults', (table) => {
    table.increments('id')
    table.string('name').references('products.name')
    table.integer('lifespan')
    table.string('category').references('product_types.name')
    table.string('compartment').references('products.compartment')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('product_defaults')
}
