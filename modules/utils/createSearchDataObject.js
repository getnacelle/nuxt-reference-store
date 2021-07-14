export default ({ searchDataTypes = [], limit = 1000, items }) => {
  const searchDataObject = {}
  const types = [...new Set(searchDataTypes.concat('product'))]

  const searchData = types.map((type) => {
    const data = items
      .filter((item) => item.type === type)
      .slice(0, limit)
      .map((item) => item.payload)

    return { data, type }
  })

  searchData.forEach((dataGroup) => {
    searchDataObject[dataGroup.type] = dataGroup.data
  })

  return searchDataObject
}
