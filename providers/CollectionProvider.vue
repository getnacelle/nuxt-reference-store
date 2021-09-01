<template>
  <div><slot /></div>
</template>
<script>
import { ref, provide, watch } from '@vue/composition-api'
import useSdk from '~/composables/useSdk'
export default {
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
  setup(props) {
    const collectionList = ref([])
    const collections = ref(props.collections)
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
      console.log('handles', handles)
      if (handles) {
        console.log(
          'fire me up',
          collectionList.value.filter((collectionItem) =>
            handles?.includes(collectionItem.handle)
          )
        )
        return collectionList.value.filter((collectionItem) =>
          handles?.includes(collectionItem.handle)
        )
      }
      return collectionList.value
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

    provide('collections', collectionList)
    provide('setCollections', setCollections)
    provide('addCollections', addCollections)
    provide('fetchCollection', fetchCollection)
    provide('fetchCollections', fetchCollections)
    provide('removeCollections', removeCollections)
    provide('clearCollections', clearCollections)
    provide('getCollections', getCollections)
  }
}
</script>
