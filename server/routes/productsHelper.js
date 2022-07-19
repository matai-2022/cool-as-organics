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
  let totals = {}

  // Loop through entire products array and count up discarded, used, and open for each product
  for (let i = 0; i < products.length; i++) {
    const product = products[i].name
    const status = products[i].status

    if (product in totals) {
      totals[product][status]++
    } else {
      totals[product] = { name: product, discarded: 0, open: 0, used: 0 }
      totals[product][status]++
    }
  }

  // Calculate percentage wastage for each product
  Object.keys(totals).forEach((product) => {
    const wasted =
      totals[product].discarded === 0 || totals[product].used === 0
        ? 0
        : totals[product].open /
          (totals[product].discarded + totals[product].used)

    totals[product].wasted = wasted
  })

  // Sort products by percentage wasted and take the top 3
  const top = Object.values(totals)
    .map((product) => {
      return { name: product.name, wasted: product.wasted }
    })
    .sort((a, b) => b.wasted - a.wasted)
    .slice(0, 3)

  return top
}

module.exports = { getTopPurchased, getTopWasted }
