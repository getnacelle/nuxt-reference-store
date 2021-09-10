import { inject } from '@vue/composition-api'

export default function useCartProvider() {
  const cart = inject('cart')
  const addItem = inject('addItem')
  const removeItem = inject('removeItem')
  const incrementItem = inject('incrementItem')
  const decrementItem = inject('decrementItem')
  const clearCart = inject('clearCart')

  return {
    cart,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart
  }
}
