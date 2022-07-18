import React, { useState, useEffect } from 'react'

import {fetchProducts} from '../../client/apis/products'
import sortByExpiryDate from '../utils/sortByExpiryDate'
import { Link } from 'react-router-dom'


function Index() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    fetchProducts()
    .then(products => {
      setProducts(sortByExpiryDate(products).slice(0,3))
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  return (
  <>
    <div className='flex flex-row justify-center mb-8 mt-10'>  
      <h1 className='text-center text-[#038753] text-5xl font-reem order-last'>Cool As Organics</h1>
      <img src='/images/fridge.png' alt='fridge icon' className='w-12 h-12'/>
    </div>
    <div className='font-reem flex justify-center box-content items-center'>
    <div className='mx-40 border-x-4 border-y-8 border-darkYellow bg-lightYellow rounded'>
      <p className='text-center font-bold my-3'>Products close to expiry!</p>
        <table className='w-full'> 
          <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className='p-4'>{product.name}</td>
              <td className='p-4'>{product.expiryDate.format('ddd D MMM YYYY')}</td>
              <td className='p-4 hover:bg-yellow-200 rounded'> <Link to= {`/products/${product.name}/recipes`}>Recipes</Link> </td>
            </tr>  
        ))}
          </tbody>
        </table>
      </div>
      </div>
      
    <div className='flex flex-row justify-center mt-10 '>
      <Link to='/products/view'>
        <button type='button' className='font-reem flex space-x-10 mr-80 border-x-2 border-y-2 border-darkYellow bg-lightYellow rounded'>View Products</button>
      </Link>
      <Link to='/products/add'>
        <button type='button' className=' font-reem border-x-2 border-y-2 border-darkYellow bg-lightYellow rounded'>Add Products</button>
      </Link>
    </div>
  </>
  )
}

export default Index
