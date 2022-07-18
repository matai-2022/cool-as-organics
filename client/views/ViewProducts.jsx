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
    <>
    <h2 className="text-slate-900">All products in the fridge</h2>
   <div className="w-3/4 ..."></div>
   <div className="whitespace-pre-line ..."></div>
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
      <tbody className="divide-y-2">
        {list.map((item) => (
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
    </>
  )
}

export default ViewProducts
