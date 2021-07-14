import { get, set, del } from 'idb-keyval'
import { v4 as uuid } from 'uuid'

export const state = () => ({
  lineItems: [],
  cartVisible: false,
  freeShippingThreshold: null,
  error: null
})
export const getters = {
  quantityTotal(state) {
    if (state.lineItems.length >= 1) {
      return state.lineItems.reduce((acc, item) => acc + item.quantity, 0)
    }

    return 0
  },

  cartSubtotal(state) {
    if (state.lineItems.length >= 1) {
      return state.lineItems.reduce(
        (acc, item) => acc + item.variant.price * item.quantity,
        0
      )
    }

    return 0
  },

  freeShippingThresholdPassed(state, getters) {
    if (
      getters.cartSubtotal &&
      state.freeShippingThreshold &&
      getters.cartSubtotal > state.freeShippingThreshold
    ) {
      return true
    } else {
      return false
    }
  },

  amountUntilFreeShipping(state, getters) {
    if (getters.cartSubtotal != null && state.freeShippingThreshold) {
      return state.freeShippingThreshold - getters.cartSubtotal
    }
  },

  checkoutLineItems(state) {
    if (state.lineItems.length > 0) {
      return state.lineItems.map((lineItem) => ({
        cartItemId: lineItem.id,
        variantId: lineItem.variant.id,
        quantity: lineItem.quantity,
        metafields: lineItem.metafields
      }))
    } else {
      return []
    }
  }
}

export const mutations = {
  addLineItemMutation(state, payload) {
    const index = state.lineItems.findIndex((lineItem) => {
      if (lineItem.variant.id === payload.variant.id) {
        return (
          JSON.stringify(payload.metafields) ===
          JSON.stringify(lineItem.metafields)
        ) // match only if metafields are the same.
      }

      return false
    })
    if (index === -1) {
      // generate unique id for line
      payload.id = `${payload.variant.id}::${uuid()}`
      state.lineItems.push(payload)
    } else {
      state.lineItems[index].quantity += payload.quantity
    }
  },

  removeLineItemMutation(state, payload) {
    const index = state.lineItems.findIndex(
      (lineItem) => lineItem.variant.id === payload
    )
    state.lineItems.splice(index, 1)
  },

  incrementLineItemMutation(state, payload) {
    const index = state.lineItems.findIndex(
      (lineItem) => lineItem.id === payload
    )
    if (index !== -1) {
      state.lineItems[index].quantity++
    }
  },

  decrementLineItemMutation(state, payload) {
    const index = state.lineItems.findIndex(
      (lineItem) => lineItem.id === payload
    )
    if (index !== -1 && state.lineItems[index].quantity >= 1) {
      state.lineItems[index].quantity--
      if (state.lineItems[index].quantity === 0) {
        state.lineItems.splice(index, 1)
      }
    }
  },

  setLineItems(state, payload) {
    state.lineItems.splice(0)
    state.lineItems = payload
  },

  showCart(state) {
    state.cartVisible = true
  },

  hideCart(state) {
    state.cartVisible = false
  },

  toggleCart(state) {
    state.cartVisible = !state.cartVisible
  },

  setFreeShippingThreshold(state, payload) {
    state.freeShippingThreshold = payload
  },

  setCartError(state, error) {
    state.error = error
  }
}

export const actions = {
  addLineItem({ state, rootState, commit, dispatch }, payload) {
    commit('addLineItemMutation', payload)
    dispatch('saveLineItems', state.lineItems)

    if (rootState.events) {
      dispatch(
        'events/addToCart',
        {
          product: payload,
          cart: state.lineItems
        },
        { root: true }
      )
    }
  },

  removeLineItem({ state, rootState, dispatch, commit }, payload) {
    if (rootState.events) {
      const lineItem = state.lineItems.find(
        (item) => item.variant.id === payload
      )
      dispatch(
        'events/removeFromCart',
        {
          product: lineItem,
          cart: state.lineItems
        },
        { root: true }
      )
    }

    commit('removeLineItemMutation', payload)
    dispatch('saveLineItems', state.lineItems)
  },

  incrementLineItem({ state, commit, dispatch }, payload) {
    commit('incrementLineItemMutation', payload)
    dispatch('saveLineItems', state.lineItems)
  },

  decrementLineItem({ state, commit, dispatch }, payload) {
    commit('decrementLineItemMutation', payload)
    dispatch('saveLineItems', state.lineItems)
  },

  saveLineItems({ state }) {
    set('line-items', state.lineItems)
  },

  async resetLineItems({ commit }) {
    await del('line-items')
    commit('setLineItems', [])
  },

  async initializeCart({ commit }) {
    const lineItems = await get('line-items')
    commit('setLineItems', lineItems || [])
    commit('setFreeShippingThreshold', 100)
    commit('hideCart')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
