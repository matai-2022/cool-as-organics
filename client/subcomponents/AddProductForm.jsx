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
    <Form>
      <label className='label block'>
        Name
        <Field name='name' type='text'/>
      </label>

      <label className='label block'>
        Open Date
        <Field name='openDate' type='date'/>
      </label>

      <label className='label block'>
        Expiry Date
        <ExpiryDate name='expiryDate' type='date' />
      </label>

      <label className='label block'>
        Lifespan
        <Lifespan name='lifespan' type='number' />
      </label>

      <label className='label block'>
        Product Type
        <Field as='select' name='productTypeId'>
          <option value=''></option>
          {productTypes.map(
            productType => <option key={productType.id} value={productType.id}>{productType.name}</option>
          )}
        </Field>
      </label>
      
      <label className='label block'>
        Compartment
        <Field as='select' name='compartment'>
          <option value=''></option>
          <option value='fridge'>fridge</option>
          <option value='freezer'>freezer</option>
        </Field>
      </label>

      <button type='submit'>Add product</button>
    </Form>
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
