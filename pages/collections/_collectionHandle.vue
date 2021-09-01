<template>
  <collection-provider
    v-if="collection"
    :config="$config"
    :collection="collection"
  >
    <collection-grid :handle="collection.handle" />
  </collection-provider>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  useFetch
} from '@nuxtjs/composition-api'
import CollectionProvider from '~/providers/CollectionProvider.vue'
import CollectionGrid from '~/components/collection/CollectionGrid.vue'
import useSdk from '~/composables/useSdk'

export default defineComponent({
  components: { CollectionProvider, CollectionGrid },
  setup() {
    const { $config, params } = useContext()
    const { sdk } = useSdk($config)
    const collection = ref(null)
    useFetch(async () => {
      collection.value = await sdk.data.collectionPage({
        handle: params.value.collectionHandle,
        paginate: true,
        itemsPerPage: 12
      })
    })
    return { collection }
  }
})
</script>
