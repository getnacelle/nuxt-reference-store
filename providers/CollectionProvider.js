import { h, provide, ref, watch } from '@nuxtjs/composition-api'
import useSdk from '~/composables/useSdk'

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
    productsPerFetch: {
      type: Number,
      default: 12
    }
  },
  setup(props, context) {
    const collection = ref(props.collection)
    const collectionHandle = ref(props.collectionHandle)
    const collectionProvided = ref(null)
    const productsPerFetch = ref(props.productsPerFetch)
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
          "[nacelle] CollectionProvider's `setCollection` method requires a `collection` or `handle` parameter."
        )
        return
      }
      let collectionObject = {}
      if (collection) collectionObject = collection
      else if (handle) {
        isFetching = true
        // Jest does not wait for this
        const data = await Promise.all([
          sdk.data.collection({ handle }),
          sdk.data.collectionPage({
            handle,
            paginate: true,
            itemsPerPage: productsPerFetch || 12
          })
        ])
        if (data) {
          collectionObject = { ...data[0], products: data[1] }
        }
        isFetching = false
      }
      if (collectionObject) {
        collectionProvided.value = {
          ...collectionObject
        }
      }
    }

    /**
     * Load products provider should track
     * @param {Object} config
     * @param {Number} count Number of collection products to load
     * @param {Number} offset Offset of collection products to load
     * @returns {void}
     */
    const loadProducts = async ({ count, offset }) => {
      if (collectionProvided) {
        const productHandles = collectionProvided.value.productLists[0]?.handles
        const totalProducts = productHandles?.length || 0
        const indexedProducts = collectionProvided.value.products?.length || 0
        if (totalProducts > indexedProducts) {
          const startIndex = offset || indexedProducts
          const endIndex = count ? startIndex + count : startIndex + 12
          if (totalProducts >= startIndex) {
            const handlesToFetch = productHandles.slice(startIndex, endIndex)
            if (handlesToFetch.length) {
              const products = await sdk.data.products({
                handles: handlesToFetch
              })
              collectionProvided.value = {
                ...collectionProvided.value,
                products: [...collectionProvided.value.products, ...products]
              }
            }
          }
        }
      }
    }

    /**
     Initialize provider with collection or collectionHandle props
     */
    if (props.collection) {
      setCollection({ collection: props.collection })
    } else if (props.collectionHandle) {
      setCollection({ handle: props.collectionHandle })
    }

    /**
     Emit collection to parent for v-model use
     */
    watch(
      collectionProvided,
      (value) => {
        context.emit('input', value)
      },
      { immediate: true }
    )

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
    provide('loadProducts', loadProducts)

    /**
     Render component
    */
    return () => h('div', context.slots.default && context.slots.default())
  }
}