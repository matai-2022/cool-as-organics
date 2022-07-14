import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { fetchProducts } from '../../client/apis/products'

function ViewProducts() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetchProducts()
      .then((res) =>
        setList(
          res.filter((product) => {
            if (!product.isUsed) {
              return product
            }
          })
        )
      )
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Open date</th>
          <th>Expiry date</th>
          <th>Compartment</th>
          <th>Product type</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>{item.name} </td>
            <td>{moment(item.openDate).format('ddd D MMM YYYY')}</td>
            <td>{moment(item.expiryDate).format('ddd D MMM YYYY')}</td>
            <td>{item.compartment} </td>
            <td>{item.productType} </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ViewProducts
