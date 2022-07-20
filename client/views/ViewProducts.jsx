import React, { useEffect, useState } from 'react'

import {
  getProducts,
  patchProduct,
  getProductsByName,
} from '../../client/apis/products'
import sortByExpiryDate from '../utils/sortByExpiryDate'

import ProductItem from '../subcomponents/ProductItem.jsx'

const headers = ['Name', 'Expiry']

function ViewProducts() {
  const [products, setProducts] = useState([])
  console.log(products)

  useEffect(async () => {
    try {
      const openProducts = await getProducts()
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
    <>
      <h1 className="mb-4 mt-4 text-center text-3xl">Current items</h1>
      <div className="h-screen flex justify-center bg-zinc-50">
        <table className="w-11/12 border-collapse border rounded border-zinc-200 bg-white mt-4">
          <thead className="border-b-2 border-zinc-200">
            <tr className="text-left">
              {headers.map((header) => {
                return (
                  <th
                    className="leading-10 font-medium px-4 text-sm"
                    key={header}
                  >
                    {header}
                  </th>
                )
              })}
              <th className="leading-10 font-medium px-4 text-sm text-right">
                Bin/Use
              </th>
            </tr>
          </thead>

          <tbody>
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
      </div>
    </>
  )
}

export default ViewProducts
