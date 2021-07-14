const eventProperties = (rootState) => {
  const { user, space, cart } = rootState || {}
  const timestamp = Date.now()
  const spaceID = space ? space.id : null
  const userID = user && user.userID ? user.userID : null
  const anonymousID = user && user.anonymousID ? user.anonymousID : null
  const cartJsonString =
    cart && cart.lineItems ? JSON.stringify(cart.lineItems) : null
  let urlParams = null
  let domain = null
  let url = null
  let pathname = null

  if (process.client) {
    urlParams = window.location.search
    domain = window.location.origin
    url = window.location.href
    pathname = window.location.pathname
  }

  return {
    timestamp,
    spaceID,
    userID,
    anonymousID,
    user,
    cart: cartJsonString,
    urlParams,
    url,
    pathname,
    domain
  }
}
export const state = () => ({
  log: []
})

export const mutations = {
  addEvent(state, event) {
    state.log.push(event)
  }
}

export const actions = {
  pageView({ commit, rootState }, { path }) {
    if (path) {
      commit('addEvent', {
        eventType: 'PAGE_VIEW',
        path,
        ...eventProperties(rootState)
      })
    }
  },

  productView({ commit, rootState }, { product, selectedVariant }) {
    if (product) {
      commit('addEvent', {
        eventType: 'PRODUCT_VIEW',
        product,
        selectedVariant,
        ...eventProperties(rootState)
      })
    }
  },

  collectionView({ commit, rootState }, { collection }) {
    if (collection) {
      commit('addEvent', {
        eventType: 'COLLECTION_VIEW',
        collection,
        ...eventProperties(rootState)
      })
    }
  },

  blogView({ commit, rootState }, { blog }) {
    if (blog) {
      commit('addEvent', {
        eventType: 'BLOG_VIEW',
        blog,
        ...eventProperties(rootState)
      })
    }
  },

  articleView({ commit, rootState }, { article }) {
    if (article) {
      commit('addEvent', {
        eventType: 'ARTICLE_VIEW',
        article,
        ...eventProperties(rootState)
      })
    }
  },

  addToCart({ commit, rootState }, { product }) {
    if (product) {
      commit('addEvent', {
        eventType: 'ADD_TO_CART',
        product,
        ...eventProperties(rootState)
      })
    }
  },

  removeFromCart({ commit, rootState }, { product }) {
    if (product) {
      commit('addEvent', {
        eventType: 'REMOVE_FROM_CART',
        product,
        ...eventProperties(rootState)
      })
    }
  },

  checkoutInit({ commit, rootState }, payload) {
    if (payload) {
      commit('addEvent', {
        eventType: 'CHECKOUT_INIT',
        payload,
        ...eventProperties(rootState)
      })
    }
  },

  searchProducts({ commit, rootState }, payload) {
    if (payload) {
      commit('addEvent', {
        eventType: 'SEARCH_PRODUCTS',
        payload,
        ...eventProperties(rootState)
      })
    }
  },

  productSelect({ commit, rootState }, { product }) {
    if (product) {
      commit('addEvent', {
        eventType: 'PRODUCT_SELECT',
        product,
        ...eventProperties(rootState)
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
