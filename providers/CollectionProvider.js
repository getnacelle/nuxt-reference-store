import { computed, h, provide, ref, watch } from '@nuxtjs/composition-api'
import useSdk from '~/composables/useSdk'
import ProductProvider from '~/providers/ProductProvider'

export default {
  name: 'CollectionProvider',
  props: {
    config: {
      type: Object,
      default: null
    },
    collections: {
      type: Array,
      default: null
    }
  },
  setup(props, context) {
    const collectionList = ref([])
    const collections = ref(props.collections)
    const productList = computed(
      () =>
        collections?.value?.flatMap((collectionItem) => {
          return collectionItem.products
        }) || []
    )
    const { sdk } = useSdk(props.config)

    /**
     * Fetch the collection provider should track
     * @param {String} handle Collection handle
     * @returns {void}
     */
    const fetchCollection = async ({ handle }) => {
      const data = await Promise.all([
        sdk.data.collection({ handle }),
        sdk.data.collectionPage({
          handle,
          paginate: true,
          itemsPerPage: 12
        })
      ])
      return { ...data[0], products: data[1] }
    }

    /**
     * Add collections provider should track
     * @param {Array} collections List of products
     * @param {Array} handles List of handles
     * @param {String} method Method of storing products - options: append, replace
     * @returns {void}
     */

    const addCollections = async ({ collections, handles, method }) => {
      let newCollections = []
      if (collections) {
        const uniqueCollections = collections.filter((collection) => {
          return !collectionList.value.find((collectionItem) => {
            return collection.handle === collectionItem.handle
          })
        })
        newCollections = [...uniqueCollections]
      }
      if (handles) {
        const uniqueHandles = handles.filter((handle) => {
          return ![...collectionList.value, ...newCollections].find(
            (collectionItem) => {
              return handle === collectionItem.handle
            }
          )
        })
        if (uniqueHandles.length > 0) {
          const fetchedCollections = await Promise.all([
            ...uniqueHandles.forEach((uniqueHandle) => {
              return fetchCollection({ handle: uniqueHandle })
            })
          ])
          if (fetchedCollections) {
            newCollections = [...newCollections, ...fetchedCollections]
          }
        }
      }
      if (method === 'replace') {
        collectionList.value = newCollections
      } else {
        collectionList.value = [...collectionList.value, ...newCollections]
      }
    }

    /**
     * Remove collections provider should track
     * @param {Array} handles List of collection handles
     * @returns {void}
     */
    const removeCollections = ({ handles }) => {
      if (handles) {
        collectionList.value = collectionList.value.filter((collectionItem) => {
          return !handles.includes(collectionItem.handle)
        })
      } else {
        collectionList.value = []
      }
    }

    /**
     * Get collections from provider by handles
     * @param {Array} handles List of collection handles
     * @returns {Array}
     */
    const getCollections = ({ handles }) => {
      if (handles) {
        return collectionList.value.filter((collectionItem) =>
          handles?.includes(collectionItem.handle)
        )
      }
      return collectionList.value
    }
    /**
     * Fetch the collection products provider should track
     * @param {String} handle Collection handle to fetch
     * @param {Number} count Number of products to fetch
     * @param {Number} offset Index of first product to fetch
     * @returns {void}
     */
    const loadCollectionProducts = async ({ handle, count, offset }) => {
      try {
        const collectionIndex = collectionList.value.findIndex(
          (collectionItem) => {
            return handle === collectionItem.handle
          }
        )
        if (collectionIndex >= 0) {
          const collection = collectionList.value[collectionIndex]
          const allHandles = collection.productLists[0]?.handles
          const indexedHandles = collection.products.map(
            (product) => product.handle
          )
          const indexedCount = indexedHandles?.length || 0
          const totalCount = allHandles?.length
          if (totalCount > indexedCount) {
            const startIndex = offset || indexedCount
            const endIndex = count ? startIndex + count : startIndex + 12
            if (totalCount >= endIndex) {
              const handlesToFetch = allHandles
                .slice(startIndex, endIndex)
                .filter((handle) => {
                  return !indexedHandles.find(
                    (indexedHandle) => handle === indexedHandle
                  )
                })
              if (handlesToFetch.length) {
                const products = await sdk.data.products({
                  handles: handlesToFetch
                })
                collectionList.value = collectionList.value.map(
                  (collectionItem, index) => {
                    if (collectionIndex === index) {
                      return {
                        ...collectionItem,
                        products: [...collectionItem.products, ...products]
                      }
                    }
                    return collectionItem
                  }
                )
              }
            }
          }
        }
      } catch (err) {
        return { error: err }
      }
    }

    /**
     Initialize the provider collections from props
     */
    addCollections({ collections: props.collections })
    /**
     Update the provider collections from props
     */
    watch(collections, (value) => {
      addCollections({ collections: value, method: 'replace' })
    })

    /**
     Pass down items to provide
    */
    provide('collections', collectionList)
    provide('addCollections', addCollections)
    provide('removeCollections', removeCollections)
    provide('getCollections', getCollections)
    provide('loadCollectionProducts', loadCollectionProducts)

    /**
     Render component
    */
    return () =>
      h(
        ProductProvider,
        {
          props: {
            config: props.config,
            products: productList.value
          }
        },
        context.slots.default()
      )
  }
}
