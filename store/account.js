import {
  set as setCookie,
  get as getCookie,
  remove as removeCookie
} from 'es-cookie'
import {
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_ACCESS_TOKEN_RENEW,
  CUSTOMER_ACCESS_TOKEN_DELETE,
  CUSTOMER_CREATE,
  CUSTOMER_ACTIVATE,
  CUSTOMER_RECOVER,
  CUSTOMER_RESET,
  GET_CUSTOMER,
  CUSTOMER_UPDATE,
  GET_CUSTOMER_ORDERS,
  GET_CUSTOMER_DEFAULT_ADDRESS,
  CUSTOMER_DEFAULT_ADDRESS_UPDATE,
  GET_CUSTOMER_ADDRESSES,
  CUSTOMER_ADDRESS_CREATE,
  CUSTOMER_ADDRESS_UPDATE,
  CUSTOMER_ADDRESS_DELETE,
  transformEdges,
  transformOrders
} from '../gql'
// console.log('config', this.$config.myshopifyDomain)

// const accountClient = axios.create({
//   baseURL: `https://${process.env.myshopifyDomain}/api/2020-04/graphql`,
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     'X-Shopify-Storefront-Access-Token': process.env.shopifyToken
//   }
// })

// Either true or false, indicating if the cookie transmission requires a secure protocol (https).
const secure = process.env.NODE_ENV !== 'development'
// The strict mode witholds the cookie from any kind of cross-site usage (including inbound links from external sites).
const sameSite = 'strict'

const removeEmpty = (obj) => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([k, v]) => v !== null && v !== '')
      .map(([k, v]) => (typeof v === 'object' ? [k, removeEmpty(v)] : [k, v]))
  )
}

const decodeId = (encodedId) => {
  return atob(encodedId).split('?')[0]
}

export const state = () => ({
  modalView: '',
  modalVisible: false,
  customer: null,
  customerAccessToken: null,
  orders: [],
  defaultAddress: null,
  addresses: [],
  userErrors: []
})

export const mutations = {
  setModalView(state, view) {
    // Assumes view components are prefixed with account ie. AccountLogin => account-login
    state.modalView = `account-${view}`
  },
  setErrors(state, userErrors) {
    state.userErrors = userErrors || []
  },
  setCustomer(state, customer) {
    state.customer = customer
  },
  setCustomerAccessToken(state, customerAccessToken) {
    state.customerAccessToken = customerAccessToken
  },
  setOrders(state, orders) {
    state.orders = orders
  },
  setDefaultAddress(state, defaultAddress) {
    state.defaultAddress = defaultAddress
  },
  setAddresses(state, addresses) {
    state.addresses = addresses
  },
  addAddress(state, address) {
    state.addresses = [address].concat(state.addresses)
  },
  removeAddress(state, addressId) {
    // addressId is already decoded from Shopify response
    const id = addressId.split('?')[0]
    state.addresses = state.addresses.filter((item) => decodeId(item.id) !== id)
  },
  setAddress(state, address) {
    state.addresses.find((item) => {
      return decodeId(item.id) === decodeId(address.id)
    })
  },
  closeModal(state) {
    state.modalVisible = false
  },
  showModal(state) {
    state.modalVisible = true
  },
  toggleAccount(state) {
    state.modalVisible = !state.modalVisible
  }
}

export const actions = {
  updateCustomerAccessToken({ commit }, customerAccessToken) {
    const { accessToken, expiresAt } = customerAccessToken
    const expires = new Date(expiresAt)
    expires.setHours(expires.getHours())
    setCookie('customerAccessToken', accessToken, { expires, secure, sameSite })
    commit('setCustomerAccessToken', customerAccessToken)
  },

  removeCustomerAccessToken({ commit }) {
    removeCookie('customerAccessToken')
    removeCookie('ncl')
    commit('setCustomerAccessToken', null)
    commit('setCustomer', null)
  },

  readCustomerAccessToken({ dispatch, commit }, { accessToken }) {
    if (accessToken) {
      commit('setCustomerAccessToken', { accessToken, expiresAt: null })
      dispatch('renewCustomerAccessToken', accessToken)
    }
  },

  async renewCustomerAccessToken({ commit, dispatch }, payload) {
    const variables = { customerAccessToken: payload }
    const query = CUSTOMER_ACCESS_TOKEN_RENEW
    const response = await this.$shopify.client.post(null, { query, variables })
    const {
      customerAccessToken,
      userErrors
    } = response.data.data.customerAccessTokenRenew
    if (customerAccessToken && customerAccessToken.accessToken) {
      dispatch('updateCustomerAccessToken', customerAccessToken)
    } else {
      // access token does not exist
      dispatch('removeCustomerAccessToken')
    }
    commit('setErrors', userErrors)
  },

  async fetchCustomer({ state, commit, dispatch }) {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken
    }
    const query = GET_CUSTOMER
    const response = await this.$shopify.client.post(null, { query, variables })
    const { customer, userErrors } = response.data.data
    if (customer) {
      commit('setCustomer', customer)
      dispatch('wishlist/getWishlists', null, { root: true })
    }
    commit('setErrors', userErrors)
  },

  async updateCustomer({ state, dispatch, commit }, payload) {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken,
      customer: removeEmpty(payload.customer)
    }
    const query = CUSTOMER_UPDATE
    const response = await this.$shopify.client.post(null, { query, variables })
    const { data, errors } = response.data
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors))
    }
    const {
      customer,
      customerAccessToken,
      customerUserErrors
    } = data.customerUpdate
    if (customer) {
      commit('setCustomer', customer)
    }
    if (customerAccessToken) {
      dispatch('updateCustomerAccessToken', customerAccessToken)
    }
    commit('setErrors', customerUserErrors)
  },

  async login({ commit, dispatch }, { email, password }) {
    const variables = { input: { email, password } }
    const query = CUSTOMER_ACCESS_TOKEN_CREATE
    const response = await this.$shopify.client.post(null, { query, variables })
    const {
      customerAccessToken,
      userErrors
    } = response.data.data.customerAccessTokenCreate
    if (customerAccessToken) {
      await dispatch('updateCustomerAccessToken', customerAccessToken)
      await dispatch('fetchCustomer')
    }
    commit('setErrors', userErrors)
  },

  async logout({ state, dispatch, commit }) {
    const accessToken =
      (state.customerAccessToken && state.customerAccessToken.accessToken) ||
      getCookie('customerAccessToken')
    const variables = { customerAccessToken: accessToken }
    const query = CUSTOMER_ACCESS_TOKEN_DELETE
    const response = await this.$shopify.client.post(null, { query, variables })
    const {
      deletedAccessToken,
      userErrors
    } = response.data.data.customerAccessTokenDelete
    if (deletedAccessToken) {
      dispatch('removeCustomerAccessToken')
    }
    commit('setErrors', userErrors)
  },

  async fetchOrders({ state, commit }) {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken
    }
    const query = GET_CUSTOMER_ORDERS
    const response = await this.$shopify.client.post(null, { query, variables })
    const { customer, userErrors } = response.data.data
    if (customer) {
      commit('setOrders', transformOrders(customer.orders))
    }
    commit('setErrors', userErrors)
  },

  async fetchDefaultAddress({ state, commit }) {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken
    }
    const query = GET_CUSTOMER_DEFAULT_ADDRESS
    const response = await this.$shopify.client.post(null, { query, variables })
    const { customer, userErrors } = response.data.data
    if (customer) {
      commit('setDefaultAddress', customer.defaultAddress)
    }
    commit('setErrors', userErrors)
  },

  async fetchAddresses({ state, commit }) {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken
    }
    const query = GET_CUSTOMER_ADDRESSES
    const response = await this.$shopify.client.post(null, { query, variables })
    const { customer, userErrors } = response.data.data
    if (customer) {
      commit('setAddresses', transformEdges(customer.addresses))
    }
    commit('setErrors', userErrors)
  },

  async createAddress({ state, commit }, { address }) {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken,
      address
    }
    const query = CUSTOMER_ADDRESS_CREATE
    const response = await this.$shopify.client.post(null, { query, variables })
    const { data, errors } = response.data
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors))
    }
    const { customerAddress, customerUserErrors } = data.customerAddressCreate
    if (customerAddress) {
      commit('addAddress', customerAddress)
      return customerAddress
    }
    commit('setErrors', customerUserErrors)
  },

  async updateAddress({ state, commit }, { address, id }) {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken,
      address,
      id
    }
    const query = CUSTOMER_ADDRESS_UPDATE
    const response = await this.$shopify.client.post(null, { query, variables })
    const { data, errors } = response.data
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors))
    }
    const { customerAddress, customerUserErrors } = data.customerAddressUpdate
    if (customerAddress) {
      commit('setAddress', customerAddress)
      return customerAddress
    }
    commit('setErrors', customerUserErrors)
  },

  async updateDefaultAddress({ state, commit }, { addressId }) {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken,
      addressId
    }
    const query = CUSTOMER_DEFAULT_ADDRESS_UPDATE
    const response = await this.$shopify.client.post(null, { query, variables })
    const { data, errors } = response.data
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors))
    }
    const { customer, customerUserErrors } = data.customerDefaultAddressUpdate
    if (customer) {
      commit('setDefaultAddress', customer.defaultAddress)
    }
    commit('setErrors', customerUserErrors)
  },

  async deleteAddress({ state, commit }, { id }) {
    const variables = {
      customerAccessToken: state.customerAccessToken.accessToken,
      id
    }
    const query = CUSTOMER_ADDRESS_DELETE
    const response = await this.$shopify.client.post(null, { query, variables })
    const { data, errors } = response.data
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors))
    }
    const {
      deletedCustomerAddressId,
      customerUserErrors
    } = data.customerAddressDelete
    if (deletedCustomerAddressId) {
      commit('removeAddress', deletedCustomerAddressId)
    }
    commit('setErrors', customerUserErrors)
  },

  async register({ commit }, { firstName, lastName, email, password }) {
    const variables = { input: { firstName, lastName, email, password } }
    const query = CUSTOMER_CREATE
    const response = await this.$shopify.client.post(null, { query, variables })
    const { data, errors } = response.data
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors))
    }
    const { customerUserErrors } = data.customerCreate
    commit('setErrors', customerUserErrors)
  },

  // will need to adjust notifications:
  // https://community.shopify.com/c/Shopify-APIs-SDKs/Reset-Password-Token-in-Notification-Email/td-p/367455
  async recover({ commit }, { email }) {
    const variables = { email }
    const query = CUSTOMER_RECOVER
    const response = await this.$shopify.client.post(null, { query, variables })
    const { data, errors } = response.data
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors))
    }
    const { customerUserErrors } = data.customerRecover
    commit('setErrors', customerUserErrors)
  },

  async reset({ commit, dispatch }, { password, resetToken, customerId }) {
    const id = Buffer.from(`gid://shopify/Customer/${customerId}`).toString(
      'base64'
    )
    const variables = { id, input: { password, resetToken } }
    const query = CUSTOMER_RESET
    const response = await this.$shopify.client.post(null, { query, variables })
    const { data, errors } = response.data
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors))
    }
    const {
      customer,
      customerAccessToken,
      customerUserErrors
    } = data.customerReset
    commit('setErrors', customerUserErrors)
    if (customer && customerAccessToken) {
      await commit('setCustomer', customer)
      await dispatch('updateCustomerAccessToken', customerAccessToken)
    }
  },

  async activate(
    { commit, dispatch },
    { password, activateToken, customerId }
  ) {
    const id = Buffer.from(`gid://shopify/Customer/${customerId}`).toString(
      'base64'
    )
    const variables = { id, input: { password, activateToken } }
    const query = CUSTOMER_ACTIVATE
    const response = await this.$shopify.client.post(null, { query, variables })
    const { data, errors } = response.data
    if (errors && errors.length) {
      throw new Error(JSON.stringify(errors))
    }
    const {
      customer,
      customerAccessToken,
      customerUserErrors
    } = data.customerActivate
    commit('setErrors', customerUserErrors)
    if (customer && customerAccessToken) {
      await commit('setCustomer', customer)
      await dispatch('updateCustomerAccessToken', customerAccessToken)
    }
  }
}
