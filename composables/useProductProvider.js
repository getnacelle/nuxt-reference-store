import { inject } from '@nuxtjs/composition-api'

export default () => {
  const products = inject('products')
  const setProducts = inject('setProducts')
  const addProducts = inject('addProducts')
  const fetchProducts = inject('fetchProducts')
  const removeProducts = inject('removeProducts')
  const clearProducts = inject('clearProducts')
  const getProducts = inject('getProducts')
  const setSelectedVariant = inject('setSelectedVariant')
  return {
    products,
    setProducts,
    addProducts,
    fetchProducts,
    removeProducts,
    clearProducts,
    getProducts,
    setSelectedVariant
  }
}
