import { get, set } from 'idb-keyval'
const isFunc = (func) => typeof func === 'function'

function handleCheckoutError(err) {
  if (err.message && err.message.startsWith('401')) {
    console.warn(
      'Received a 401 (unauthorized) response when attempting checkout. ' +
        'Please verify your Checkout Settings in the Nacelle Dashboard. ' +
        'Most likely, the token is incorrect, or there is a typo in the endpoint URL.'
    )
  }

  throw new Error(err.message)
}

export const state = () => ({
  id: null,
  url: null,
  discountCode: null
})

export const mutations = {
  setId(state, payload) {
    set('checkout-id', payload)
    state.id = payload
  },

  setUrl(state, payload) {
    set('checkout-url', payload)
    state.url = payload
  },

  setCheckout(state, { id, url }) {
    set('checkout-id', id)
    set('checkout-url', url)
    state.id = id
    state.url = url
  },

  setDiscountCode(state, payload) {
    if (payload && payload.trim()) {
      state.discountCode = payload
    }
  }
}

export const actions = {
  async initializeCheckout({ commit, dispatch }) {
    const id = await get('checkout-id')
    const url = await get('checkout-url')
    if (id && url) {
      const { completed } = await this.$nacelle.checkout.get({ id, url })
      if (completed) {
        await dispatch('resetCheckout')
      } else {
        commit('setCheckout', { id, url })
      }
    }
  },

  async resetCheckout({ commit, dispatch }) {
    commit('setCheckout', { id: null, url: null })
    await dispatch('cart/resetLineItems', null, { root: true })
  },

  async processCheckout({ dispatch }, { beforeCreate, beforeRedirect }) {
    if (isFunc(beforeCreate)) {
      await beforeCreate()
    }
    await dispatch('checkoutCreate')
    await dispatch('addCheckoutParams')
    if (isFunc(beforeRedirect)) {
      await beforeRedirect()
    }
    dispatch('checkoutRedirect')
  },

  async checkoutCreate({ commit, dispatch, state, rootState, rootGetters }) {
    const cartItems = rootGetters['cart/checkoutLineItems']
    const checkoutId = state.id || ''

    if (cartItems.length === 0) {
      throw new Error('Cannot checkout with an empty cart')
    }

    let checkout = await this.$nacelle.checkout
      .process({
        cartItems,
        checkoutId
      })
      .catch((err) => handleCheckoutError(err))
    if (checkout && checkout.completed) {
      checkout = await this.$nacelle.checkout
        .process({
          cartItems,
          checkoutId: ''
        })
        .catch((err) => handleCheckoutError(err))
    }

    if (!checkout || !checkout.id || !checkout.url) {
      const checkoutErrors = JSON.stringify(checkout?.errors, null, 2)
      throw new Error(`Checkout Failure:\n\n${checkoutErrors}`)
    }

    if (rootState.events) {
      dispatch(
        'events/checkoutInit',
        { cart: rootState.cart.lineItems },
        { root: true }
      )
    }

    commit('setCheckout', checkout)
  },

  async addCheckoutParams({ commit, dispatch, state, rootState }) {
    const parsedUrl = new URL(state.url)

    if (rootState.user.userData) {
      parsedUrl.searchParams.set('c', JSON.stringify(rootState.user.userData))
    }

    if (state.discountCode) {
      parsedUrl.searchParams.set('discount', state.discountCode)
    }

    const linkerParam = await dispatch('getLinkerParam')

    if (linkerParam) {
      const [gaParamName, gaParamValue] = linkerParam.split('=')
      parsedUrl.searchParams.set(gaParamName, gaParamValue)
    }

    await commit('setUrl', parsedUrl.toString())
  },

  getLinkerParam() {
    return new Promise((resolve, reject) => {
      const gaClient = process.client ? window.ga : undefined

      if (typeof gaClient !== 'undefined') {
        gaClient((tracker) => resolve(tracker.get('linkerParam')))
      }

      // if no ga resolve with empty string
      resolve('')
    })
  },

  checkoutRedirect({ state }) {
    if (process.client) {
      window.location = state.url
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
