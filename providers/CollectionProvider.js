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
     * Set the collections provider should track
     * @param {Array} collections List of collections
     * @returns {void}
     */
    const setCollections = ({ collections }) => {
      if (collections) {
        collectionList.value = collections.map((collection) => ({
          ...collection
        }))
      }
    }
    /**
     * Add collections provider should track
     * @param {Array} collections List of collections
     * @returns {void}
     */
    const addCollections = ({ collections }) => {
      if (collections) {
        collectionList.value = [
          ...collectionList.value,
          ...collections
            .filter((collection) => {
              return !collectionList.value.find((collectionItem) => {
                return collectionItem.handle === collection.handle
              })
            })
            .map((product) => ({
              ...product
            }))
        ]
      }
    }
    /**
     * Fetch the collection provider should track
     * @param {Array} handle Collection handle
     * @param {String} method Method to provide the collection - options: set/add
     * @returns {void}
     */
    const fetchCollection = async ({ handle, method }) => {
      try {
        const shouldFetch = !collectionList.value.find((collectionItem) => {
          return handle === collectionItem.handle
        })
        if (shouldFetch) {
          const data = await Promise.all([
            sdk.data.collection({ handle }),
            sdk.data.collectionPage({
              handle,
              paginate: true,
              itemsPerPage: 12
            })
          ])
          const collection = { ...data[0], products: data[1] }
          if (method === 'add') addCollections({ collections: [collection] })
          if (method === 'set') setCollections({ collections: [collection] })
          return { collection }
        }
      } catch (err) {
        return { error: err }
      }
    }
    /**
     * Fetch the collections provider should track
     * @param {Array} handles List of collection handles
     * @param {String} provide Provide the collections - options: set/add
     * @returns {void}
     */
    const fetchCollections = async ({ handles, method }) => {
      try {
        if (handles) {
          const handlesToFetch = handles.filter((handle) => {
            return !collectionList.value.find((productItem) => {
              return handle === productItem.handle
            })
          })
          const data = await Promise.all([
            ...handlesToFetch.forEach((handle) => {
              return fetchCollection({ handle, method })
            })
          ])
          return { collections: data }
        }
      } catch (err) {
        return { error: err }
      }
    }
    /**
     * Remove collections provider should track
     * @param {Array} handles List of collection handles
     * @returns {void}
     */
    const removeCollections = ({ handles }) => {
      collectionList.value = collectionList.value.filter((collectionItem) => {
        return !handles.includes(collectionItem.handle)
      })
    }
    /**
     * Clear collections provider should track
     * @returns {void}
     */
    const clearCollections = () => {
      collectionList.value = []
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
    const fetchCollectionProducts = async ({ handle, count, offset }) => {
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
      setCollections({ collections: value })
    })

    /**
     Pass down items to provide
    */
    provide('products', productList)
    provide('collections', collectionList)
    provide('setCollections', setCollections)
    provide('addCollections', addCollections)
    provide('fetchCollection', fetchCollection)
    provide('fetchCollections', fetchCollections)
    provide('removeCollections', removeCollections)
    provide('clearCollections', clearCollections)
    provide('getCollections', getCollections)
    provide('fetchCollectionProducts', fetchCollectionProducts)

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
