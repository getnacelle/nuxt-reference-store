export default {
  install(Vue) {
    Vue.prototype.$nacelleHelpers = {
      transformProduct(product) {
        return product
      }
    }
  }
}
