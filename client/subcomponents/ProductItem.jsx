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
    <tr key={product.id} className='border border-zinc leading-10 border-collapse'>
      <td className='px-4'>{product.name}</td>

      <td className='px-4'>{moment(product.expiryDate).format('D MMM')}</td>
      <td className='px-4'>{`${product.wastage * 100} %`}</td>

      <td>
        <button name="discarded" onClick={handleClick} className='px-4'>
          <img src='/images/rubbish-bin.png' alt='rubbish icon' className='h-4 w-4'/>
        </button>
        <button name="used" onClick={handleClick} className=''>
          <img src='/images/tick.png' alt='tick icon' className='h-4 w-4'/>
        </button>
      </td>


    </tr>
  )
}

export default ProductItem
