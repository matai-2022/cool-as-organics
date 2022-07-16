import React from 'react'

import AddProductForm from '../subcomponents/AddProductForm.jsx'

function AddProduct() {
  const initialValues = {
    name: '',
    expiryDate: '',
    openDate: '',
    useableDays: 0,
    productTypeId: '',
    compartment: ''
  }

  return (
    <AddProductForm initialValues={initialValues} />
  )
}

export default AddProduct