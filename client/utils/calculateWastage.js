export default function calculateWastage(statuses) {
  const open = statuses.filter((status) => status === 'open').length
  const discarded = statuses.filter((status) => status === 'discarded').length
  const used = statuses.filter((status) => status === 'used').length

  const wastage = discarded / (used + open)
  return wastage
}
