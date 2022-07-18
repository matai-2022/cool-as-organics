exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        // Add seed objects here
        {
          id: 1,
          name: 'banana',
          open_date: '2022-07-14',
          expiry_date: '2022-07-16',
          status: 'open',
          product_type_id: 3,
          compartment: 'fridge',
        },
        {
          id: 2,
          name: 'sirloin steak',
          open_date: '2022-07-13',
          expiry_date: '2022-07-14',
          status: 'discarded',
          product_type_id: 2,
          compartment: 'fridge',
        },
        {
          id: 3,
          name: 'milk',
          open_date: '2022-07-14',
          expiry_date: '2022-07-22',
          status: 'open',
          product_type_id: 1,
          compartment: 'fridge',
        },
        {
          id: 4,
          name: 'ice cream',
          open_date: '2022-07-10',
          expiry_date: '2022-08-16',
          status: 'open',
          product_type_id: 1,
          compartment: 'freezer',
        },
        {
          id: 5,
          name: 'banana',
          open_date: '2022-07-14',
          expiry_date: '2022-07-16',
          status: 'discarded',
          product_type_id: 3,
          compartment: 'fridge',
        },
        {
          id: 6,
          name: 'banana',
          open_date: '2022-07-14',
          expiry_date: '2022-07-16',
          status: 'used',
          product_type_id: 3,
          compartment: 'fridge',
        },
      ])
    })
}
