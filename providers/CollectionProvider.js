import { h, provide, ref, watch } from '@nuxtjs/composition-api'
import useSdk from '~/composables/useSdk'
import ProductProvider from '~/providers/ProductProvider'

export default {
  name: 'CollectionProvider',
  props: {
    config: {
      type: Object,
      default: null
    },
    collection: {
      type: Object,
      default: null
    },
    collectionHandle: {
      type: String,
      default: null
    },
    products: {
      type: Array,
      default: null
    },
    productHandles: {
      type: Array,
      default: null
    }
  },
  setup(props, context) {
    const collection = ref(props.collection)
    // const products = ref(props.products)
    const collectionHandle = ref(props.collectionHandle)
    // const productHandles = ref(props.productHandles)
    const collectionProvided = ref(null)
    let isFetching = ref(false)

    const config = props.config || null
    const { sdk } = useSdk({ config })

    /**
     * Set collection provider should track
     * @param {Object} config
     * @param {Object} collection Collection object to track
     * @param {String} handle Collection handle to track
     * @returns {void}
     */
    const setCollection = async ({ collection, handle }) => {
      if (!collection && !handle) {
        console.warn(
          "[nacelle] ProductProvider's `setCollection` method requires a `collection` or `handle` parameter."
        )
        return
      }
      let collectionObject = {}
      if (collection) collectionObject = collection
      else if (handle) {
        isFetching = true
        collectionObject = await sdk?.data?.collection({ handle })
        isFetching = false
      }
      if (collectionObject) {
        collectionProvided.value = {
          ...collectionObject
        }
      }
    }

    /**
     * Set products provider should track
     * @param {Object} config
     * @param {Array} products Product objects to track
     * @param {Array} handles Product handles to track
     * @returns {void}
     */

    /**
     Initialize provider with collection or collectionHandle props
     */
    if (props.collection) {
      setCollection({ collection: props.collection })
    } else if (props.collectionHandle) {
      setCollection({ handle: props.collectionHandle })
    }

    /**
     Update provider with collection or collectionHandle props
     */
    watch(collection, (value) => {
      setCollection({ collection: value })
    })
    watch(collectionHandle, (value) => {
      setCollection({ handle: value })
    })

    /**
     Provide values
    */
    provide('collection', collectionProvided)
    provide('isFetching', isFetching)
    provide('setCollection', setCollection)
    /* LoadMore
      // accepts, count
      // accepts productHandles, count
    */

    /**
     Render component
    */
    return () => {
      const { slots } = context
      const topSlot = slots.top ? slots.top() : null
      const productSlot = slots.product ? slots.product() : ''
      const bottomSlot = slots.bottom ? slots.bottom() : null

      return h('div', [
        ...topSlot,
        ...productSlot.map((item, index) => {
          const products = collectionProvided.value?.products || []
          return h(ProductProvider, { product: products[index] }, [item])
        }),
        ...bottomSlot
      ])
    }
  }
}
