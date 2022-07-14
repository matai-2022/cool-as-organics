exports.up = function (knex) {
  return knex.schema.createTable('product_types', (table) => {
    table.increments('id')
    table.string('name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('product_types')
}
