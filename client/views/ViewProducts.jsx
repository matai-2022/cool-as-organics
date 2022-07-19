import React, { useEffect, useState } from 'react'

import {
  getProducts,
  patchProduct,
  getProductsByName,
} from '../../client/apis/products'
import sortByExpiryDate from '../utils/sortByExpiryDate'
import calculateWastage from '../utils/calculateWastage'

import ProductItem from '../subcomponents/ProductItem.jsx'

const headers = ['Name','Expiry','Wastage', 'Status']

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
    <>
    <h1 className='font-bold mb-9 mt-9 text-center'>Current items in your fridge</h1>
    <div className='flex justify-center'>
      <table className= 'w-11/12 border rounded border-zinc-200 bg-white mt-4'>
        <thead className='border-b-2 border-zinc'>
          <tr className='text-left'>
            {headers.map(header => {return (
            <th className='leading-10 font-medium px-4 text-sm' 
            key={header}>{header}</th>
            )})}
          </tr>
       </thead>

      <tbody>
          {products.map((product) => {
          return (
              <ProductItem 
              product={product}
              key={product.id}
              updateProduct={updateProduct}/>
          )
          })}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default ViewProducts
