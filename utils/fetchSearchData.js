const fetchSearchData = async () => {
  let data
  await setTimeout(() => {
    data = 'data'
  }, 1000)
  return { data }
}

export default fetchSearchData
