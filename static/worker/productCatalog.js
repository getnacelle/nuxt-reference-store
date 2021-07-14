onmessage = async function () {
  const response = await fetch('/data/search.json')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()

  postMessage(data)
}
