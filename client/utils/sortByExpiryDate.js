export default function sortByExpiryDate(products) {
  return products.sort((a, b) => a.expiryDate - b.expiryDate)
}
