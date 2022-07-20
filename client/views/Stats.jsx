import React, { useState, useEffect } from 'react'

import { getTopPurchasedProducts, getTopWastedProducts } from '../apis/products'

function Stats() {
  const [topPurchased, setTopPurchased] = useState([])
  const [topWasted, setTopWasted] = useState([])

  useEffect(async () => {
    setTopPurchased(await getTopPurchasedProducts())
    setTopWasted(await getTopWastedProducts())
  }, [])
  console.log(topWasted)
  return (
    <div>
      <h1 className="mb-4 mt-4 text-center text-3xl"> Stats </h1>
      <div className=" h-screen flex flex-col items-center bg-zinc-50 ">
        <div className="w-11/12 border rounded border-zinc-200 bg-white mt-4 px-4 py-4">
          <h2 className="text-xl font-medium mb-4 ">Top purchases </h2>
          <ul>
            {topPurchased.map((product, i) => {
              return (
                <li key={product} className="flex justify-start p-2 pl-4 ">
                  <div className=" w-6 h-6 border-2 rounded-full flex items-center justify-center bg-zinc-200 mr-4 ">
                    {i + 1}
                  </div>
                  {product}
                </li>
              )
            })}
          </ul>
        </div>

        <ul className="w-11/12 border rounded border-zinc-200 bg-white mt-4 px-4 py-4">
          <h2 className="text-xl font-medium mb-4 ">Top wasted </h2>
          {topWasted.map((product, i) => {
            return (
              <li key={product.name} className="flex justify-start p-2 pl-4">
                <span className="w-6 h-6 border-2 rounded-full flex items-center justify-center bg-zinc-200 mr-4 ">
                  {i + 1}
                </span>{' '}
                {product.name} {`${product.wasted * 100} %`}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Stats
