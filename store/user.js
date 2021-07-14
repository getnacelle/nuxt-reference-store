import { v4 as uuid } from 'uuid'
import { set, get } from 'idb-keyval'
import * as Cookies from 'es-cookie'

export const state = () => ({
  anonymousID: null,
  userID: null,
  customerEmail: null,
  customerPhone: null,
  sessionID: null,
  locale: {
    country: 'US',
    currency: 'USD',
    displayCountry: 'United States of America',
    displayCountryLocalized: 'United States',
    displayLanguage: 'English',
    language: 'en',
    locale: 'en-US',
    symbol: '$'
  }
})

export const mutations = {
  setUserData(state, payload) {
    const { userID, customerEmail, customerPhone } = payload
    state.userID = userID
    state.customerEmail = customerEmail
    state.customerPhone = customerPhone
  },

  setAnonymousID(state, id) {
    state.anonymousID = id
  },

  setSessionID(state, id) {
    state.sessionID = id
  },

  setLocale(state, locale) {
    state.locale = locale
  }
}

export const actions = {
  async initUserData(context) {
    await context.dispatch('readAnonymousID')
    await context.dispatch('readSession')

    if (process.client) {
      const userData = Cookies.get('user-data')

      if (userData) {
        context.commit('setUserData', JSON.parse(userData))
      }
    }
  },

  // ANONYMOUS ID ACTIONS //
  async createAnonymousID(context) {
    const anonymousID = uuid()
    await set('anonymousID', anonymousID)
    context.commit('setAnonymousID', anonymousID)
  },
  async readAnonymousID(context) {
    const anonymousID = await get('anonymousID')
    if (anonymousID != null) {
      context.commit('setAnonymousID', anonymousID)
    } else {
      context.dispatch('createAnonymousID')
    }
  },

  // SESSION ACTIONS //
  createSession(context) {
    const sessionID = uuid()
    context.commit('setSessionID', sessionID)
    if (process.client) {
      Cookies.set('session-id', sessionID, {
        expires: new Date().setMinutes(30)
      })
    }
  },

  readSession(context) {
    if (process.client) {
      const sessionCookie = Cookies.get('session-id')
      if (sessionCookie === undefined) {
        context.dispatch('createSession')
      } else {
        context.commit('setSessionID', sessionCookie)
        context.dispatch('refreshSession')
      }
    }
  },

  refreshSession(context) {
    if (process.client) {
      Cookies.set('session-id', context.state.sessionID, {
        expires: new Date().setMinutes(30)
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
