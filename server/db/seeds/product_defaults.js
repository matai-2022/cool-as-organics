exports.seed = function(knex) {
  return knex ('product_defaults')
    .del()
    .then(function () {
      return knex ('product_defaults').insert([
        {id: 1, name: 'banana', lifespan: '6', category:'produce', compartment:'fridge'},
        {id: 2, name: 'sirloin steak', lifespan: '4', category:'meat', compartment:'fridge'},
        {id: 3, name: 'milk', lifespan: '3', category:'dairy', compartment:'fridge'},
        {id: 4, name: 'icecream', lifespan: '3', category:'dairy', compartment:'freezer'},
      ])
    })
  };
  