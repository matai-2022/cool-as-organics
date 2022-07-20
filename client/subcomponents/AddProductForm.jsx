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
    <>
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}>

    <div className='h-screen flex flex-col items-center bg-zinc-50'>

    <Form className='w-11/12 border rounded border-zinc-200 bg-white mt-4 mb-4'>
        <label className='label block pb-4 pt-2 ml-4'>
        Name
        <Field name='name' type='text' 
        className='border border-zinc-200 block py-2 px-8 w-2/3 hover:border-0'/>
        </label>

        <label className='label block pb-4 ml-4'>
        Open Date
          <Field name='openDate' type='date'
          className='border border-zinc-200 block py-2 px-4 w-2/3'/>
        </label>
      

      <label className='label block pb-4 ml-4'>
        Expiry Date
        <ExpiryDate name='expiryDate' type='date'
        className='border border-zinc-200 block py-2 px-4 w-2/3'/>
      </label>
      

      <label className='label block pb-4 ml-4'>
        Lifespan
        <Lifespan name='lifespan' type='number' 
        className='border border-zinc-200 block py-2 px-4 w-1/4'/>
      </label>

      <label className='label block pb-4 ml-4'>
        Product Type
        
        <Field as='select' name='productTypeId' 
        className='border border-zinc-200 block py-2 px-4 w-1/3'>
          <option value=''></option>
          {productTypes.map(
            productType => <option key={productType.id} value={productType.id}>{productType.name}</option>
          )}
        </Field>
      </label>
      
      <label className='label block pb-4 ml-4'>
        Compartment
        <Field as='select' name='compartment' className='border border-zinc-200 block py-2 px-4 w-1/3'>
          <option value=''></option>
          <option value='fridge'>fridge</option>
          <option value='freezer'>freezer</option>
        </Field>
      </label>
      
      <div className='relative'>
        <button type='submit' className='p-2 border border-zinc-400 rounded bg-white mb-4 ml-4'>Add product</button>
      </div>
    </Form>
    </div>
  </Formik>
  </>
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

