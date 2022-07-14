exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('product_types')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('product_types').insert([
        {
          id: 1,
          name: 'dairy',
        },
        {
          id: 2,
          name: 'meat',
        },
        {
          id: 3,
          name: 'produce',
        },
      ])
    })
}
