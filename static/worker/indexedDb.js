/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-console */
self.importScripts('https://unpkg.com/idb-keyval@5.0.2/dist/iife/index-min.js')

onmessage = function receiver(e) {
  const { action, key, value, debug } = e.data
  if (debug) {
    console.time(`idb-worker: ${key}`)
  }

  if (action === 'get') {
    const entryValue = idbKeyval.get(key).then(() => {
      postMessage(entryValue)
    })
  } else if (action === 'set') {
    idbKeyval.set(key, value).then(() => {
      postMessage('success')
    })
  } else {
    console.warn(`Invalid action: ${action}`)
  }

  if (debug) {
    console.timeEnd(`idb-worker: ${key}`)
  }
}
