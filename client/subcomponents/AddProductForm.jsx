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
        Useable Days
        <UseableDays name='useableDays' type='number' />
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
