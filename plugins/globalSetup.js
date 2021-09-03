import {
  onGlobalSetup,
  useContext,
  provide,
  useAsync
} from '@nuxtjs/composition-api'
import useSdk from '~/composables/useSdk'

export default () => {
  onGlobalSetup(() => {
    const { $config } = useContext()
    const { sdk } = useSdk($config)
    const initialSpace = useAsync(() => sdk.data.space())

    /**
     * Get metatags from metafields
     * @param {String} tag
     * @returns {Object}
     */
    const getMetatag = (tag) => {
      if (initialSpace.metafields) {
        return initialSpace.metafields.find(
          (field) => field.namespace === 'metatag' && field.key === tag
        )
      }
      return {}
    }
    provide('initialSpace', initialSpace)
    provide('getMetatag', getMetatag)
  })
}
