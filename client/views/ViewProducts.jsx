import React, { useEffect, useState } from 'react'

import { fetchProducts } from '../../client/apis/products'

function ViewProducts() {
  // const allProducts = fetchProducts()
  console.log('rendered view')

  const [list, setList] = useState([])

  useEffect(() => {
    fetchProducts()
      .then((res) => setList(res))
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      {list.map((item) => (
        <p key={item.id}>{item.name} </p>
      ))}
    </div>
  )
}

export default ViewProducts
