import React from 'react'
import moment from 'moment'

function ProductItem(props) {
  const { product, updateProduct } = props

  function handleClick(event) {
    console.log(event.target.name)
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
    <tr
      key={product.id}
      className="h-10 border border-zinc leading-10 border-collapse "
    >
      <td className="px-4">{product.name}</td>

      <td className="px-4">
        {moment(product.expiryDate).format('ddd D MMM YYYY')}
      </td>

      <td className="text-right pr-4">
        <button
          className="material-symbols-outlined mr-2"
          name="discarded"
          onClick={handleClick}
        >
          delete
        </button>
        <button
          className="material-symbols-outlined ml-2"
          name="used"
          onClick={handleClick}
        >
          done
        </button>
        {/* <button name="used" onClick={handleClick} className="">
          <img src="/images/tick.png" alt="tick icon" className="h-4 w-4" />
        </button> */}
      </td>
    </tr>
  )
}

export default ProductItem
