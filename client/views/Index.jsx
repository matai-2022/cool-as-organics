import React, { useState, useEffect } from 'react'
import {fetchProducts} from '../../client/apis/products'

function Index() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
    .then(products => {
      setProducts(products)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])
  return (
    <table> 
        <tr> 
          <th>Product</th>
          <th>Expiry Date</th>
        </tr>
      <p className="some font">Products close to expiry!</p>

    <table className="tailwind"> 
      {products.map((product) => (
        <tr className="tailwind" key={product.id}>
          <td>{product.name}</td>
          <td>{product.expiryDate}</td>
        </tr>
     ))}
    </table>
  </table>
  )
}

export default Index
