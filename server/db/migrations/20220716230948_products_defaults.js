exports.up = function (knex) {
  return knex.schema.createTable('product_defaults', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('lifespan')
    table.integer('product_type_id').references('product_types.id')
    table.string('compartment')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('product_defaults')
}
