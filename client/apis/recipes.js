import request from 'superagent'

function getRecipes(ingredient) {
  return request
    .get('/api/v1/recipes')
    .query({ ingredient })
    .then((response) => {
      return response.body
    })
}

export { getRecipes }
