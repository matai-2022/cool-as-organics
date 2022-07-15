import request from 'superagent'

function getRecipes(ingredient) {
  return request
    .get('/api/v1/recipes')
    .query({ ingredient })

    .then((response) => {
      return response.body
    })
}
//.query is not called from here, must be from backend

export { getRecipes }
