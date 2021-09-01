import { inject } from '@vue/composition-api'

export default () => {
  const collections = inject('collections')
  const setCollections = inject('setCollections')
  const addCollections = inject('addCollections')
  const fetchCollections = inject('fetchCollections')
  const removeCollections = inject('removeCollections')
  const clearCollections = inject('clearCollections')
  const getCollections = inject('getCollections')
  return {
    collections,
    setCollections,
    addCollections,
    fetchCollections,
    removeCollections,
    clearCollections,
    getCollections
  }
}
