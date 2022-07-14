import request from 'superagent'

const rootUrl = '/api/v1'

export function fetchProducts() {
  return request.get(rootUrl + '/products').then((res) => {
    return res.body
  })
}
