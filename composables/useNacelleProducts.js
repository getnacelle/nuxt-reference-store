import { inject } from '@nuxtjs/composition-api'

export default () => {
  const nacelleProducts = inject('nacelleProducts')
  const nacelleProductsSet = inject('nacelleProductsSet')
  const nacelleProductsAdd = inject('nacelleProductsAdd')
  const nacelleProductsRemove = inject('nacelleProductsRemove')
  const nacelleProductsClear = inject('nacelleProductsClear')
  const nacelleProductsByHandles = inject('nacelleProductsByHandles')
  const nacelleProductsSelectedVariant = inject(
    'nacelleProductsSelectedVariant'
  )
  return {
    nacelleProducts,
    nacelleProductsSet,
    nacelleProductsAdd,
    nacelleProductsRemove,
    nacelleProductsClear,
    nacelleProductsByHandles,
    nacelleProductsSelectedVariant
  }
}
