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
    <>
    <div className="tailwind">
      <p className="some font">Products close to expiry!</p>
    </div>

    <div> 
      {products.map((product) => {
        console.log(product) 
        return <p key={product.id}>{product.name} {product.expiryDate}</p>
      })}  
    </div>
    </>
  )
}

export default Index
