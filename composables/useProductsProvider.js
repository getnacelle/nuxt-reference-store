import { inject } from '@nuxtjs/composition-api'

export default () => {
  const products = inject('products')
  return { products }
}
