const loader = new Worker('/loaderWorker.js')

// wait for the page to completely load before initiating script loader
window.addEventListener('load', () => {
  // send a message to the loader to tell it how long to wait to trigger the return message
  loader.postMessage({ ms: 2000 })
})

loader.onmessage = () => {
  // fire the third party scripts
  loadScripts()

  // clean up the worker after it does its work
  loader.terminate()
}

const loadScripts = () => {
  // include the script code to be injected here
  console.log('scripts loaded!')
}
