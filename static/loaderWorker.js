self.addEventListener('message', ({ data }) => {
  setTimeout(() => {
    self.postMessage({ message: 'fire' })
  }, data.ms)
})
