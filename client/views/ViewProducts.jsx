import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { fetchProducts } from '../../client/apis/products'

function ViewProducts() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetchProducts()
      .then((res) => setList(res))
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const isUsed = list.filter((product) => {
    if (!product.isUsed) {
      return product
    }
  })

  return (
    <div>
      <table>
        <th>
          {' '}
          Food
          {isUsed.map((item) => (
            <tr key={item.id}>{item.name} </tr>
          ))}
        </th>
        <th>
          {' '}
          Open date
          {isUsed.map((item) => (
            <tr key={item.id}>
              {moment(item.openDate).format('ddd D MMM YYYY')}{' '}
            </tr>
          ))}
        </th>
        <th>
          {' '}
          Expiry date
          {isUsed.map((item) => (
            <tr key={item.id}>
              {moment(item.expiryDate).format('ddd D MMM YYYY')}{' '}
            </tr>
          ))}
        </th>
        <th>
          {' '}
          Compartment
          {isUsed.map((item) => (
            <tr key={item.id}>{item.compartment} </tr>
          ))}
        </th>
        <th>
          {' '}
          Product type
          {isUsed.map((item) => (
            <tr key={item.id}>{item.productType} </tr>
          ))}
        </th>
      </table>
    </div>
  )
}

export default ViewProducts
