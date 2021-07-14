/* eslint-disable no-undef */
self.importScripts('https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js')

let workerSearchData

onmessage = function receiver(e) {
  const { searchData, options, value } = e.data

  if (searchData) {
    workerSearchData = searchData
  } else if (workerSearchData) {
    const results = new Fuse(workerSearchData, options)
      .search(String(value))
      .filter((result) => typeof result.item !== 'undefined')
      .map((result) => result.item)

    postMessage(results)
  }
}
