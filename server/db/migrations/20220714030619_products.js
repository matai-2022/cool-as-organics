exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id')
    table.string('name')
    table.string('open_date')
    table.string('expiry_date')
    table.boolean('is_used')
    table.string('compartment')
    table.integer('product_type_id').references('product_types.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('products')
}
