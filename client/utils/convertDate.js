import moment from 'moment'

export default function convertDate(product) {
  return {
    ...product,
    openDate: moment(product.openDate),
    expiryDate: moment(product.expiryDate),
  }
}
