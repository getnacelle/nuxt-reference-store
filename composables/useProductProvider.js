import { inject } from '@nuxtjs/composition-api'

export default () => {
  const products = inject('products')
  const setProducts = inject('setProducts')
  const addProducts = inject('addProducts')
  const removeProducts = inject('removeProducts')
  const clearProducts = inject('clearProducts')
  const getProducts = inject('getProducts')
  const getSelectedVariant = inject('getSelectedVariant')
  return {
    products,
    setProducts,
    addProducts,
    removeProducts,
    clearProducts,
    getProducts,
    getSelectedVariant
  }
}
