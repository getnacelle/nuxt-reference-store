<template>
  <div>
    <collection-provider
      v-if="collection"
      :config="$config"
      :collections="[collection]"
    >
      <collection-grid :handle="collection.handle" />
    </collection-provider>
  </div>
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
      const data = await Promise.all([
        sdk.data.collection({ handle: params.value.collectionHandle }),
        sdk.data.collectionPage({
          handle: params.value.collectionHandle,
          paginate: true,
          itemsPerPage: 12
        })
      ])
      collection.value = { ...data[0], products: data[1] }
    })
    return { collection }
  }
})
</script>
