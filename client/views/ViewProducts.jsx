import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { getProducts } from '../../client/apis/products'

function ViewProducts() {
  const [products, setProducts] = useState([])

  useEffect(async () => {
    try {
      setProducts(await getProducts())
    } catch(error) {
      console.error(error.message)
    }
  }, [])

  return (
    <table className="border-2">
      <thead className="border-2">
        <tr className="divide-y-2">
          <th>Product</th>
          <th>Open date</th>
          <th>Expiry date</th>
          <th>Compartment</th>
          <th>Product type</th>
        </tr>
      </thead>
      <tbody className=" divide-y-2">
        {products.map((item) => (
          <tr className=" divide-x-2" key={item.id}>
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
