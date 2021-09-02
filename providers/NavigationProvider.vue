<template>
  <div><slot /></div>
</template>

<script>
import { ref, provide } from '@nuxtjs/composition-api'

export default {
  props: {
    locale: {
      type: Object,
      default: null
    },
    linklists: {
      type: Array,
      default: null
    }
  },
  setup(props) {
    const linklists = ref(props.linklists)
    const menuVisible = ref(false)

    /**
     * Finds menu by handle in linklists array
     * @param {String} handle
     * @returns {Object} menu
     */
    const getLinks = (handle) => {
      if (!props.linklists) {
        return []
      }
      const linklist = props.linklists.find((l) => l.handle === handle)
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

    const openMenu = () => {
      menuVisible.value = true
    }
    const toggleShowMenu = () => {
      menuVisible.value = !menuVisible.value
    }
    const disableMenu = () => {
      menuVisible.value = false
    }
    provide('linklists', linklists)
    provide('getLocalizedLinks', getLocalizedLinks)
    provide('menuVisible', menuVisible)
    provide('openMenu', openMenu)
    provide('toggleShowMenu', toggleShowMenu)
    provide('disableMenu', disableMenu)
  }
}
</script>
