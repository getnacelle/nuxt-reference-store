import { h, ref, provide } from '@nuxtjs/composition-api'
import useSdk from '~/composables/useSdk'

export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    space: {
      type: Object,
      default: () => ({})
    },
    locale: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const id = ref(props.space.id || '')
    const name = ref(props.space.name || '')
    const domain = ref(props.space.domain || '')
    const metafields = ref(props.space.metafields || [])
    const linklists = ref(props.space.linklists || [])

    const config = props.config
    const nacelleSdk = useSdk({ config })

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
      const locale = props.locale ? props.locale.toLowerCase() : ''
      const appendLocale = locale.length && locale !== 'en-US'.toLowerCase()
      const localizedHandle = appendLocale ? `${handle}-${locale}` : handle
      const localizedLinks = getLinks(localizedHandle)
      return localizedLinks.length ? localizedLinks : getLinks(handle)
    }

    /**
     * Get metatags from metafields
     * @param {String} tag
     * @returns {Object|null}
     */
    const getMetatag = (tag) => {
      if (metafields.value) {
        return metafields.value.find(
          (field) => field.namespace === 'metatag' && field.key === tag
        )
      }
      return null
    }

    /**
     * Get Metafields as Object
     * @returns {Object|null} localized menu
     */
    const getMetafieldsObj = () => {
      if (metafields.value) {
        return metafields.value.reduce((obj, metafield) => {
          const { namespace, key, value } = metafield
          if (!obj[namespace]) {
            obj[namespace] = {}
          }
          obj[namespace][key] = value
          return obj
        }, {})
      }
      return null
    }

    /**
     * Get meta namespace as Object
     * @param {String} namespace
     * @returns {Object|null} meta namespace
     */
    const getMetafieldsByNamespace = (namespace) => {
      if (metafields.value) {
        return metafields.value.reduce((obj, metafield) => {
          if (metafield.namespace === namespace) {
            obj[metafield.key] = metafield.value
          }

          return obj
        }, {})
      }
      return null
    }

    /**
     * Get metafield values
     * @param {String} namespace
     * @param {String} key
     * @returns {String|null} meta namespace
     */
    const getMetafield = ({ namespace, key }) => {
      if (metafields.value) {
        const metafield = metafields.value.find(
          (field) => field.namespace === namespace && field.key === key
        )

        if (metafield) {
          return metafield.value
        }
      }
      return null
    }

    provide('id', id)
    provide('name', name)
    provide('domain', domain)
    provide('metafields', metafields)
    provide('linklists', linklists)
    provide('nacelleSdk', nacelleSdk)
    provide('getLocalizedLinks', getLocalizedLinks)
    provide('getMetatag', getMetatag)
    provide('getMetafieldsObj', getMetafieldsObj)
    provide('getMetafieldsByNamespace', getMetafieldsByNamespace)
    provide('getMetafield', getMetafield)

    return () => h('div', context.slots.default())
  }
}
