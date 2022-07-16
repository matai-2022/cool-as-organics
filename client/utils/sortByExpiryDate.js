export default function sortByExpiryDate(products) {
  const productsCopy = JSON.parse(JSON.stringify(products))
  return productsCopy.sort((a, b) => a.expiryDate - b.expiryDate)
}
