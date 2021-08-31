import { inject } from '@nuxtjs/composition-api'

export default () => {
  const nacelleProducts = inject('nacelleProducts')
  const nacelleProductsByHandles = inject('nacelleProductsByHandles')
  return {
    nacelleProducts,
    nacelleProductsByHandles
  }
}
