function getTopPurchased(products) {
  const totals = products.reduce((counts, product) => {
    return product.name in counts
      ? { ...counts, [product.name]: ++counts[product.name] }
      : { ...counts, [product.name]: 1 }
  }, {})

  const top = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((product) => product[0])

  return top
}

function getTopWasted(products) {
  const productNames = [...new Set(products.map((product) => product.name))]

  const wastage = productNames.map((productName) => {
    const total = products.filter((product) => product.name === productName)
    const discarded = total.filter((product) => product.status === 'discarded')

    const wasted = discarded.length / total.length

    return { name: productName, wasted }
  })

  console.log('wastage', wastage)

  // Sort products by percentage wasted and take the top 3
  const top = wastage.sort((a, b) => b.wasted - a.wasted).slice(0, 3)

  return top
}

module.exports = { getTopPurchased, getTopWasted }
