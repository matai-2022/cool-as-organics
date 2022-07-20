import React, { useState, useEffect } from 'react'

import { getTopPurchasedProducts, getTopWastedProducts } from '../apis/products'

function Stats() {
  const [topPurchased, setTopPurchased] = useState([])
  const [topWasted, setTopWasted] = useState([])

  useEffect(async () => {
    setTopPurchased(await getTopPurchasedProducts())
    setTopWasted(await getTopWastedProducts())
  }, [])

  return (
    <>
      <div>
        <h2>Top purchases </h2>
        <ul>
          {topPurchased.map((product) => {
            return <li key={product}>{product}</li>
          })}
        </ul>
      </div>
      <div>
        <h2>Most wasted </h2>
        <ul>
          {topWasted.map((product) => {
            return (
              <li key={product.name}>
                {product.name} {`${product.wasted * 100} %`}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Stats
