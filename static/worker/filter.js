onmessage = function (e) {
  const inputData = e.data.inputData
  const activeFilters = e.data.activeFilters

  if (inputData && activeFilters) {
    const output = inputData.filter((item) => {
      const filterChecks = activeFilters.map((filter) => {
        if (
          filter.values.some((filterCheck) => {
            const value = item.facets.find((facet) => {
              return facet.value === filterCheck
            })
            if (value) {
              return true
            }
            return false
          })
        ) {
          return true
        }
        return false
      })

      const itemShouldPass = filterChecks.every((filterCheck) => {
        return filterCheck === true
      })
      return itemShouldPass
    })
    postMessage(output)
  } else {
    postMessage(inputData)
  }
}
