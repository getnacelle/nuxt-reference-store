import { inject } from '@nuxtjs/composition-api'

export default () => {
  const collections = inject('collections')
  const addCollections = inject('addCollections')
  const removeCollections = inject('removeCollections')
  const getCollections = inject('getCollections')
  const loadCollectionProducts = inject('loadCollectionProducts')
  return {
    collections,
    addCollections,
    removeCollections,
    getCollections,
    loadCollectionProducts
  }
}
