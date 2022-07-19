exports.seed = function (knex) {
  return knex('product_defaults')
    .del()
    .then(function () {
      return knex('product_defaults').insert([
        {
          id: 1,
          name: 'banana',
          lifespan: '6',
          product_type_id: 3,
          compartment: 'fridge',
        },
        {
          id: 2,
          name: 'apple',
          lifespan: '4',
          product_type_id: 3,
          compartment: 'fridge',
        },
        {
          id: 3,
          name: 'milk',
          lifespan: '3',
          product_type_id: 1,
          compartment: 'fridge',
        },
        {
          id: 4,
          name: 'butter',
          lifespan: '14',
          product_type_id: 1,
          compartment: 'fridge',
        },
      ])
    })
}
