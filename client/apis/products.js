import request from 'superagent'

import convertDate from '../utils/convertDate'

const rootUrl = '/api/v1'

export function getProducts() {
  return request.get(rootUrl + '/products').then((res) => {
    return res.body.map((product) => convertDate(product))
  })
}

export function postProduct(product) {
  product.status = 'open'

  return request
    .post(rootUrl + '/products')
    .send(product)
    .then((res) => res.body)
}

export function patchProduct(product) {
  return request.patch(rootUrl + '/products').send(product)
}

export function getProductsByName(products) {
  return request
    .get(rootUrl + '/products/by_name')
    .query(products.map((product) => `products=${product}&`).join(''))
    .then((res) => res.body)
}
