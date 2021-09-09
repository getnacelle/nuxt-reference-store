import { inject } from '@vue/composition-api'

export default function useProductProvider() {
  const product = inject('product')
  const isFetching = inject('isFetching')
  const setProduct = inject('setProduct')
  const setSelectedVariant = inject('setSelectedVariant')

  return {
    product,
    isFetching,
    setProduct,
    setSelectedVariant
  }
}
