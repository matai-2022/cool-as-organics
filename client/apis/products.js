import request from 'superagent'

import convertDate from '../utils/convertDateWithDay'

const rootUrl = '/api/v1'

export function fetchProducts() {
  return request.get(rootUrl + '/products').then((res) => {
    return res.body.map(product =>  convertDate(product))
    })
  }

