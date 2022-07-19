import request from 'superagent'

function getProductDefaultsByName(product) {
  return request
    .get('/api/v1/product_defaults')
    .query({ product })
    .then((response) => {
      return response.body
    })
}

export { getProductDefaultsByName }
