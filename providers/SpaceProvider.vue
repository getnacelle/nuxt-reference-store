<template>
  <div><slot /></div>
</template>

<script>
import { ref, provide } from '@nuxtjs/composition-api'

export default {
  props: {
    space: {
      type: Object,
      default: null
    },
    locale: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const id = ref(props.space.id)
    const name = ref(props.space.name)
    const domain = ref(props.space.domain)
    const metafields = ref(props.space.metafields)
    const linklists = ref(props.space.linklists)

    /**
     * Updates id value
     * @param {String} id
     * @returns {void}
     */
    const setId = (payload) => {
      id.value = payload
    }

    /**
     * Updates name value
     * @param {String} name
     * @returns {void}
     */
    const setName = (payload) => {
      name.value = payload
    }

    /**
     * Updates domain value
     * @param {String} domain
     * @returns {void}
     */
    const setDomain = (payload) => {
      domain.value = payload
    }

    /**
     * Updates metafields value
     * @param {Array} metafields
     * @returns {void}
     */
    const setMetafields = (payload) => {
      metafields.value = payload
    }

    /**
     * Add metafield to array
     * @param {Object} metafield
     * @returns {void}
     */
    const addMetafield = (payload) => {
      metafields.value = [...metafields.value, payload]
    }

    /**
     * Updates linklists value
     * @param {Array} linklists
     * @returns {void}
     */
    const setLinklists = (payload) => {
      linklists.value = payload
    }

    /**
     * Add linklist to array
     * @param {Object} linklist
     * @returns {void}
     */
    const addLinklist = (payload) => {
      linklists.value = [...linklists.value, payload]
    }

    /**
     * Finds menu by handle in linklists array
     * @param {String} handle
     * @returns {Object} menu
     */
    const getLinks = (handle) => {
      if (!props.space.linklists) {
        return []
      }
      const linklist = props.space.linklists.find((l) => l.handle === handle)
      return linklist ? linklist.links : []
    }

    /**
     * Finds menu by localized handle in linklists array
     * @param {String} handle
     * @returns {Object} localized menu
     */
    const getLocalizedLinks = (handle) => {
      const locale =
        props.locale && props.locale.locale
          ? props.locale.locale.toLowerCase()
          : ''
      const appendLocale = locale.length && locale !== 'en-US'.toLowerCase()
      const localizedHandle = appendLocale ? `${handle}-${locale}` : handle
      const localizedLinks = getLinks(localizedHandle)
      return localizedLinks.length ? localizedLinks : getLinks(handle)
    }

    /**
     * Get metatags from metafields
     * @param {String} tag
     * @returns {Object}
     */
    const getMetatag = (tag) => {
      if (metafields) {
        return metafields.find(
          (field) => field.namespace === 'metatag' && field.key === tag
        )
      }
      return {}
    }

    /**
     * Get Metafields as Object
     * @returns {Object} localized menu
     */
    const getMetafieldsObj = () => {
      if (metafields) {
        return metafields.reduce((obj, metafield) => {
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
    }

    /**
     * Get meta namespace as Object
     * @param {String} namespace
     * @returns {Object} meta namespace
     */
    const getMetaNamespace = (namespace) => {
      if (metafields) {
        return metafields.reduce((obj, metafield) => {
          if (metafield.namespace === namespace) {
            obj[metafield.key] = metafield.value
          }

          return obj
        }, {})
      }

      return {}
    }

    /**
     * Get metafield values
     * @param {String} namespace
     * @param {String} key
     * @returns {String} meta namespace
     */
    const getMetafield = (namespace, key) => {
      if (metafields) {
        const metafield = metafields.find(
          (field) => field.namespace === namespace && field.key === key
        )

        if (metafield) {
          return metafield.value
        }
      }
      return undefined
    }

    provide('id', id)
    provide('name', name)
    provide('domain', domain)
    provide('metafields', metafields)
    provide('linklists', linklists)
    provide('setId', setId)
    provide('setName', setName)
    provide('setDomain', setDomain)
    provide('setMetafields', setMetafields)
    provide('addMetafield', addMetafield)
    provide('setLinklists', setLinklists)
    provide('addLinklist', addLinklist)
    provide('getLocalizedLinks', getLocalizedLinks)
    provide('getMetatag', getMetatag)
    provide('getMetafieldsObj', getMetafieldsObj)
    provide('getMetaNamespace', getMetaNamespace)
    provide('getMetafield', getMetafield)
  }
}
</script>
