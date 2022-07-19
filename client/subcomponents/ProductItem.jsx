import React from 'react'
import moment from 'moment'

function ProductItem(props) {
  const { product, updateProduct } = props

  function handleClick(event) {
    event.preventDefault()

    const updatedProduct = {
      ...product,
      openDate: moment(product.openDate).format('YYYY-MM-DD'),
      expiryDate: moment(product.expiryDate).format('YYYY-MM-DD'),
      status: event.target.name,
    }

    updateProduct(updatedProduct)
  }

  return (
    <tr className=" divide-x-2" key={product.id}>
      <td>{product.name} </td>
      <td>{moment(product.expiryDate).format('ddd D MMM YYYY')}</td>
      <td>{`${product.wastage * 100} %`}</td>
      <td>
        <button name="discarded" onClick={handleClick}>
          Discard
        </button>
      </td>
      <td>
        <button name="used" onClick={handleClick}>
          Use
        </button>
      </td>
    </tr>
  )
}

export default ProductItem
