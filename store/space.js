export const state = () => ({
  id: '',
  name: '',
  domain: '',
  metafields: [],
  linklists: [],
  facebookCatalogID: ''
})

export const mutations = {
  setId(state, id) {
    state.id = id
  },

  setName(state, name) {
    state.name = name
  },

  setDomain(state, domain) {
    state.domain = domain
  },

  setMetafields(state, metafields) {
    state.metafields = metafields
  },

  addMetafield(state, metafield) {
    state.metafields.push(metafield)
  },

  setLinklists(state, payload) {
    state.linklists = payload
  },

  addLinklist(state, linklist) {
    state.linklists.push(linklist)
  }
}

export const getters = {
  metafieldsObj(state) {
    if (state.metafields) {
      return state.metafields.reduce((obj, metafield) => {
        const { namespace, key, value } = metafield

        if (obj[namespace]) {
          obj[namespace][key] = value
        } else {
          obj[namespace] = {}
          obj[namespace][key] = value
        }

        return obj
      }, {})
    }

    return {}
  },

  getMetatag: (state) => (tag) => {
    if (state.metafields) {
      return state.metafields.find(
        (field) => field.namespace === 'metatag' && field.key === tag
      )
    }

    return {}
  },

  getMetaNamespace: (state) => (namespace) => {
    if (state.metafields) {
      return state.metafields.reduce((obj, metafield) => {
        if (metafield.namespace === namespace) {
          obj[metafield.key] = metafield.value
        }

        return obj
      }, {})
    }

    return {}
  },

  getMetafield: (state) => (namespace, key) => {
    if (state.metafields) {
      const metafield = state.metafields.find(
        (field) => field.namespace === namespace && field.key === key
      )

      if (metafield) {
        return metafield.value
      }
    }

    return undefined
  },

  getLinks: (state) => (handle) => {
    if (!state.linklists) {
      return []
    }

    const linklist = state.linklists.find((l) => l.handle === handle)

    return linklist ? linklist.links : []
  },

  getLocalizedLinks: (state, getters, rootState) => (handle) => {
    const locale =
      rootState.user.locale && rootState.user.locale.locale
        ? rootState.user.locale.locale.toLowerCase()
        : ''
    const appendLocale = locale.length && locale !== 'en-US'.toLowerCase()
    const localizedHandle = appendLocale ? `${handle}-${locale}` : handle
    const localizedLinks = getters.getLinks(localizedHandle)

    return localizedLinks.length ? localizedLinks : getters.getLinks(handle)
  }
}

export const actions = {
  updateSpace({ commit }, space) {
    if (space) {
      const { id, name, domain, metafields, linklists } = space

      if (id) {
        commit('setId', id)
      }

      if (name) {
        commit('setName', name)
      }

      if (domain) {
        commit('setDomain', domain)
      }

      if (metafields) {
        commit('setMetafields', metafields)
      }

      if (linklists) {
        commit('setLinklists', linklists)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
