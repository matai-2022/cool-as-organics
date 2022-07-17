import React, {useState, useEffect} from 'react'
import {Formik, Field, Form, useField, useFormikContext } from 'formik'
import moment from 'moment'

import { fetchProductTypes } from '../apis/productTypes'
import { postProduct} from '../apis/products'

function AddProductForm({initialValues}) {
  const [productTypes, setProductTypes] = useState([])

  useEffect(async () => {
    try {
      setProductTypes(await fetchProductTypes())
    }
    catch(error) {
      console.error(error.message)
    }
  }, [])

  async function handleSubmit(values, {resetForm}) {
    const {useableDays, ...product} = values
    product.isUsed = false

    try {
      await postProduct(product)
      // TODO Replace this alert with a microanimation that says "<name> added"
      // alert(`${values.name} added`)
      resetForm()
    }
    catch(error) {
      console.error(error.message)
    }
  }

  return (
    <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}>
      <div className='flex justify-center box-content items-center w-30'>
      <Form className='w-1/2 px-20 my-32 space-y-9 border-8 border-yellow-300 rounded focus-yellow-400 drop-shadow-md'> 
        <h1 className='font-bold text-3xl text-center pt-10'>Add a product!</h1>
        <label className='label block text-gray-600 mt-8'>
          Name
          <Field name='name' type='text' className='border border-grey-600 block py-2 px-4 w-rounded w-1/2'/>
        </label>

        <div className='flex space-x-8 w-full'>
          <label className='label block text-gray-600'>
            Open Date
            <Field name='openDate' type='date' className='border border-grey-600 block py-2 px-4 w-rounded w-full'/>
          </label>

          <label className='label block text-gray-600'>
            Expiry Date
            <ExpiryDate name='expiryDate' type='date' className='border border-grey-600 block py-2 px-4 w-rounded w-full' />
          </label>
        </div>

        <label className='label block text-gray-600'>
          Useable Days
          <UseableDays name='useableDays' type='number' className='border border-grey-600 block py-2 px-4 w-rounded w-1/4' />
        </label>

        <label className='label block text-gray-600'>
          Product Type
          <Field as='select' name='productTypeId' className='border border-grey-600 block py-2 px-4 w-rounded w-1/3'>
            <option value=''></option>
            {productTypes.map(
              productType => <option key={productType.id} value={productType.id}>{productType.name}</option>
            )}
          </Field>
        </label>
        
        <label className='label block text-gray-600'>
          Compartment
          <Field as='select' name='compartment' className='border border-grey-600 block py-2 px-4 w-rounded w-1/3'>
            <option value=''></option>
            <option value='fridge'>fridge</option>
            <option value='freezer'>freezer</option>
          </Field>
        </label>
        
        <div className=''>
        <button type='submit' className='hover:bg-yellow-300 rounded mb-8'>Add product</button>
        </div>
      </Form>
    </div>
  </Formik>
  )
}

export default AddProductForm

// Custom Formik component
// useableDays field displays the difference in days between openDate and expiryDate
// It will update itself if the user changes either openDate or expiryDate
function UseableDays(props) {
  const {
    values: {openDate, expiryDate},
    setFieldValue
  } = useFormikContext()

  const [field] = useField(props.name)

  useEffect(() => {
    (openDate && expiryDate) && 
      setFieldValue(
        props.name, 
        moment(expiryDate)
          .diff(moment(openDate), 'days'))
  }, [openDate, expiryDate])

  return <input {...props} {...field} />
}

// Custom Formik component
// expiryDate field displays the expiry date based on openDate + useableDays
// It will update itself if the user changes either openDate or useableDays
function ExpiryDate(props) {
  const {
    values: {openDate, useableDays},
    setFieldValue
  } = useFormikContext()

  const [field] = useField(props.name)

  useEffect(() => {
    (openDate && useableDays) && 
      setFieldValue(
        props.name, 
        moment(openDate)
          .add(useableDays, 'days')
          .format('yyyy-MM-DD'))
  }, [useableDays])

  return <input {...props} {...field} />
}
