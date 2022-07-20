export default function calculateWastage(statuses) {
  const discarded = statuses.filter((status) => status === 'discarded').length

  const wastage = discarded / statuses.length
  return wastage
}
