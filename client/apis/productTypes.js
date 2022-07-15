import request from 'superagent'

const rootUrl = '/api/v1'

export function fetchProductTypes() {
  return request.get(rootUrl + '/productTypes').then((res) => {
    return res.body
  })
}
