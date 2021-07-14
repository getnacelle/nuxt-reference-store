export default (time) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
