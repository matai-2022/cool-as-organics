import React, { useState, useEffect } from 'react'

import {getProducts} from '../../client/apis/products'
import sortByExpiryDate from '../utils/sortByExpiryDate'
import { Link } from 'react-router-dom'


function Index() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    getProducts()
    .then(products => {
      setProducts(sortByExpiryDate(products).slice(0,3))
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  return (
  <> 
    
     <h1 className='mb-4 mt-4 text-center text-3xl'>Expiring soon</h1>
    <div className='h-screen flex flex-col items-center bg-zinc-50'>
      

          {products.map((product) => (
          (<div key={product.id} className='flex flex-col items-start w-11/12 border rounded border-zinc-200 bg-white mt-4 px-4 py-4'>
            <div className='text-xl font-medium mb-4' >{product.name}</div>
            <div className='flex justify-start text-sm mb-4'>{product.expiryDate.format('ddd D MMM YYYY')}</div> 
            
            <Link to= {`/products/${product.name}/recipes`}><div className=' bg-zinc-200 rounded p-1 text-sm'>Recipes</div></Link></div>)     
        ))}
        

    
    </div>
  </>
  )
}

export default Index