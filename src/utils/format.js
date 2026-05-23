export function formatViews(count) {
  if (count >= 1_000_000_000) {
    return `${(count / 1_000_000_000).toFixed(1).replace('.0', '')} mlrd marta`
  }
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace('.0', '')} mln marta`
  }
  if (count >= 1_000) {
    return `${Math.floor(count / 1_000)} ming marta`
  }
  return `${count} marta`
}

export function timeAgo(dateInput) {
  const date = new Date(dateInput)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  const units = [
    { name: 'yil', secs: 31_536_000 },
    { name: 'oy', secs: 2_592_000 },
    { name: 'hafta', secs: 604_800 },
    { name: 'kun', secs: 86_400 },
    { name: 'soat', secs: 3_600 },
    { name: 'daqiqa', secs: 60 },
  ]

  for (const u of units) {
    const value = Math.floor(seconds / u.secs)
    if (value >= 1) return `${value} ${u.name} oldin`
  }
  return 'hozirgina'
}
