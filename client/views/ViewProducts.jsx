import React, { useEffect, useState } from 'react'

import {
  getProducts,
  patchProduct,
  getProductsByName,
} from '../../client/apis/products'
import sortByExpiryDate from '../utils/sortByExpiryDate'
import calculateWastage from '../utils/calculateWastage'

import ProductItem from '../subcomponents/ProductItem.jsx'

function ViewProducts() {
  const [products, setProducts] = useState([])

  useEffect(async () => {
    try {
      const openProducts = await getProducts()
      const stocktake = await getProductsByName(
        openProducts.map((product) => product.name)
      )

      openProducts.forEach((openProduct) => {
        const statuses = stocktake
          .filter((product) => product.name === openProduct.name)
          .map((item) => item.status)

        openProduct.wastage = calculateWastage(statuses)
      })

      setProducts(sortByExpiryDate(openProducts))
    } catch (error) {
      console.error(error.message)
    }
  }, [])

  async function updateProduct(product) {
    try {
      await patchProduct(product)
      setProducts(sortByExpiryDate(await getProducts()))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <table className="border-2">
      <thead className="border-2">
        <tr className="divide-y-2">
          <th>Name</th>
          <th>Expiry date</th>
          <th>Wastage</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className=" divide-y-2">
        {products.map((product) => {
          return (
            <ProductItem
              product={product}
              key={product.id}
              updateProduct={updateProduct}
            />
          )
        })}
      </tbody>
    </table>
  )
}

export default ViewProducts
