import React, {useState, useEffect} from 'react'
import {Formik, Field, Form, useField, useFormikContext } from 'formik'
import moment from 'moment'

import { fetchProductTypes } from '../apis/productTypes'

function AddProductForm({initialValues, handleSubmit}) {
  const [productTypes, setProductTypes] = useState([])

  useEffect(async () => {
    try {
      setProductTypes(await fetchProductTypes())
    }
    catch(error) {
      console.error(error.message)
    }
  }, [])

  return (
    <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}>

  <div className='items-center md:shrink-0 w-full'>
    <Form className='px-5 my-10 space-y-9 border-x-8 border-y-4 border-yellow-300 bg-yellow-50 rounded focus-yellow-400 drop-shadow-md'>
      <h1 className='font-bold text-3xl text-center pt-10'>Add a product!</h1>
        <label className='label block text-gray-600 mt-8'>
        Name
        <Field name='name' type='text' className='border border-grey-600 block py-2 px-8 w-rounded w-1/2'/>
        </label>

        <label className='label block text-gray-600'>
        Open Date
          <Field name='openDate' type='date' className='border border-grey-600 block py-2 px-4 w-rounded w-full'/>
        </label>
      

      <label className='label block text-gray-600'>
        Expiry Date
        <ExpiryDate name='expiryDate' type='date' className='border border-grey-600 block py-2 px-4 w-rounded w-full'/>
      </label>
      

      <label className='label block text-gray-600'>
        Lifespan
        <Lifespan name='lifespan' type='number' className='border border-grey-600 block py-2 px-4 w-rounded w-1/4'/>
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
      
      <div className='pb-10 relative'>
        <button type='submit' className='p-2 border border-yellow-500 rounded bg-white'>Add product</button>
      </div>
    </Form>
    </div>
  </Formik>
  )
}

export default AddProductForm

// Custom Formik component
// lifespan field displays the difference in days between openDate and expiryDate
// It will update itself if the user changes either openDate or expiryDate
function Lifespan(props) {
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
// expiryDate field displays the expiry date based on openDate + lifespan
// It will update itself if the user changes either openDate or lifespan
function ExpiryDate(props) {
  const {
    values: {openDate, lifespan},
    setFieldValue
  } = useFormikContext()

  const [field] = useField(props.name)

  useEffect(() => {
    (openDate && lifespan) && 
      setFieldValue(
        props.name, 
        moment(openDate)
          .add(lifespan, 'days')
          .format('yyyy-MM-DD'))
  }, [lifespan])

  return <input {...props} {...field} />
}
