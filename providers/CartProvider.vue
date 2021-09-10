<template>
  <div><slot /></div>
</template>

<script>
import { get, set } from 'idb-keyval'
import { ref, provide, readonly, onMounted } from '@nuxtjs/composition-api'
import { v4 as uuid } from 'uuid'

export default {
  props: {
    cacheKey: {
      type: String,
      default: 'cart'
    }
  },
  setup(props) {
    const cart = ref([])

    /**
     * Builds cart from cache, if available.
     * @returns {void}
     */
    const initCart = async () => {
      const cachedCart = await get(props.cacheKey)
      cart.value = cachedCart || []
    }

    /**
     * Writes cart to cache.
     * @returns {void}
     */
    const cacheCart = () => {
      set(props.cacheKey, cart)
    }

    /**
     * Adds item to cart.
     * @param {Object} payload Product data
     * @returns {void}
     */
    const addItem = (payload) => {
      const index = cart.value.findIndex((item) => {
        if (item.variant.id === payload.variant.id) {
          return (
            JSON.stringify(payload.metafields) ===
            JSON.stringify(item.metafields)
          ) // match only if metafields are the same.
        }
        return false
      })

      if (index === -1) {
        payload.id = `${payload.variant.id}::${uuid()}`
        cart.value.push(payload)
      } else {
        cart.value[index].quantity += payload.quantity
      }

      cacheCart()
    }

    /**
     * Removes item from cart.
     * @param {String} payload Unique item ID
     * @returns {void}
     */
    const removeItem = (payload) => {
      const index = cart.value.findIndex((item) => item.id === payload)
      cart.value.splice(index, 1)
      cacheCart()
    }

    /**
     * Updates item in cart.
     * @param {String} payload
     * @returns {void}
     */
    // const updateItem = () => {}

    /**
     * Increases item quantity in cart.
     * @param {String} payload Unique item ID
     * @returns {void}
     */
    const incrementItem = (payload) => {
      const index = cart.value.findIndex((item) => item.id === payload)
      if (index !== -1) {
        cart.value[index].quantity++
      }
      cacheCart()
    }

    /**
     * Decreases item quantity in cart. Removes item from cart if item quantity is 0.
     * @param {String} payload Unique item ID
     * @returns {void}
     */
    const decrementItem = (payload) => {
      const index = cart.value.findIndex((item) => item.id === payload)
      if (index !== -1 && cart.value[index].quantity >= 1) {
        cart.value[index].quantity--
        if (cart.value[index].quantity === 0) {
          cart.value.splice(index, 1)
        }
      }
      cacheCart()
    }

    /**
     * Clears items from cart.
     * @returns {void}
     */
    const clearCart = () => {
      cart.value = []
      cacheCart()
    }

    onMounted(() => {
      initCart()
    })

    provide('cart', readonly(cart))
    provide('addItem', addItem)
    provide('removeItem', removeItem)
    // provide('updateItem', updateItem)
    provide('incrementItem', incrementItem)
    provide('decrementItem', decrementItem)
    provide('clearCart', clearCart)
  }
}
</script>
