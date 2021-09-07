import { inject } from '@nuxtjs/composition-api'

export default () => {
  const products = inject('products')
  const addProducts = inject('addProducts')
  const removeProducts = inject('removeProducts')
  const getProducts = inject('getProducts')
  const setSelectedVariant = inject('setSelectedVariant')
  return {
    products,
    addProducts,
    removeProducts,
    getProducts,
    setSelectedVariant
  }
}
