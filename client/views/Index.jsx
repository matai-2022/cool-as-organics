import React, { useState, useEffect } from 'react'
import moment from 'moment'
import {fetchProducts} from '../../client/apis/products'
import sortByExpiryDate from '../utils/sortByExpiryDate'

function Index() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    fetchProducts()
    .then(products => {
     const productsWithDates = products.map((product) => {
        return {...product, 
        openDate: moment(product.openDate),
        expiryDate: moment(product.expiryDate)}
      })
      setProducts(sortByExpiryDate(productsWithDates).slice(0,3))
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])
  
  return (
    <>
      <p className="some font">Products close to expiry!</p>
    <table> 
      <thead className="grid grid-cols-2 mt-5 pr-6 ml-6">
        <tr> 
          <th>Product</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
      {products.map((product) => (
        <tr className="grid grid-cols-2 gap-4 mt-5 pr-6 ml-6" key={product.id}>
          <td>{product.name}</td>
          <td>{moment(product.expiryDate).format('ddd D MMM YYYY')}</td>
        </tr>  
     ))}
      </tbody>
    </table>
  </>
  )
}

export default Index
