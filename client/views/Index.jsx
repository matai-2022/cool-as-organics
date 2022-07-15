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
      setProducts(sortByExpiryDate(productsWithDates))
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  console.log(sortByExpiryDate(products))

  return (
    <table> 
      <p className="some font">Products close to expiry!</p>
        <tr> 
          <th>Product</th>
          <th>Expiry Date</th>
        </tr>
    <table className=""> 
      {products.map((product) => (
        <tr className="w-full grid grid-cols-2 gap-4 mt-5 pr-6" key={product.id}>
          <td>{product.name}</td>
          <td>{moment(product.expiryDate).format('ddd D MMM YYYY')}</td>
        </tr>
        
     ))}
    </table>
  </table>

  )
}

export default Index
