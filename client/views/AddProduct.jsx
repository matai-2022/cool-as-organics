import React from 'react'

import { postProduct} from '../apis/products'

import AddProductForm from '../subcomponents/AddProductForm.jsx'

function AddProduct() {
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
    <AddProductForm initialValues={initialValues} handleSubmit={handleSubmit}/>
  )
}

export default AddProduct