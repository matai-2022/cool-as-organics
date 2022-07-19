import request from 'superagent'

const rootUrl = '/api/v1'

export function fetchProductTypes() {
  return request.get(rootUrl + '/product_types').then((res) => {
    return res.body
  })
}
