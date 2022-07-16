import request from 'superagent'

import convertDate from '../utils/convertDate'

const rootUrl = '/api/v1'

export function fetchProducts() {
  return request.get(rootUrl + '/products').then((res) => {
    return res.body.map((product) => convertDate(product))
  })
}

export function postProduct(product) {
  return request
    .post(rootUrl + '/products')
    .send(product)
    .then((res) => res.body)
}
