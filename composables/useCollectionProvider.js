import { inject } from '@nuxtjs/composition-api'

export default () => {
  const collections = inject('collections')
  const setCollections = inject('setCollections')
  const addCollections = inject('addCollections')
  const fetchCollections = inject('fetchCollections')
  const removeCollections = inject('removeCollections')
  const clearCollections = inject('clearCollections')
  const getCollections = inject('getCollections')
  const fetchCollectionProducts = inject('fetchCollectionProducts')
  return {
    collections,
    setCollections,
    addCollections,
    fetchCollections,
    removeCollections,
    clearCollections,
    getCollections,
    fetchCollectionProducts
  }
}
