import React from 'react'
import {useLocation} from 'react-router-dom'

import { postProduct} from '../apis/products'

import AddProductForm from '../subcomponents/AddProductForm.jsx'

function AddProduct() {
  const location = useLocation()
  console.log(location.pathname)


  const initialValues = {
    name: '',
    expiryDate: '',
    openDate: '',
    lifespan: 0,
    productTypeId: '',
    compartment: ''
  }

  async function handleSubmit(values, {resetForm}) {  
    const {lifespan, ...product} = values

    try {
      await postProduct(product)
      // TODO Replace this alert with a microanimation that says "<name> added"
      alert(`${values.name} added`)
      resetForm()
    }
    catch(error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <h1 className='my-4 text-3xl text-center'>Add a product</h1>
      <AddProductForm initialValues={initialValues} handleSubmit={handleSubmit}/>
    </>
  )
}

export default AddProduct