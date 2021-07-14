onmessage = function (e) {
  const { filteredData, activePriceRange, sortBy } = e.data

  const output = filteredData.filter(({ minPrice }) => {
    if (activePriceRange) {
      const [min, max] = activePriceRange.range
      if (min === 0) {
        return minPrice < max
      } else if (max === 0) {
        return minPrice > min
      } else {
        return minPrice > min && parseFloat(minPrice) < max
      }
    } else {
      return true
    }
  })

  switch (sortBy) {
    case 'hi-low':
      postMessage(
        output.sort((a, b) => {
          if (a.priceRange.min < b.priceRange.min) {
            return 1
          }
          if (a.priceRange.min > b.priceRange.min) {
            return -1
          }

          return 0
        })
      )
      break
    case 'low-hi':
      postMessage(
        output.sort((a, b) => {
          if (a.priceRange.min < b.priceRange.min) {
            return -1
          }
          if (a.priceRange.min > b.priceRange.min) {
            return 1
          }

          return 0
        })
      )
      break
    default:
      postMessage(output)
  }
}
