<template>
  <product-provider v-if="product" :config="$config" :products="[product]">
    <product-details :handle="product.handle" />
  </product-provider>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  useFetch
} from '@nuxtjs/composition-api'
import ProductProvider from '~/providers/ProductProvider.vue'
import ProductDetails from '~/components/product/ProductDetails.vue'
import useSdk from '~/composables/useSdk'

export default defineComponent({
  components: { ProductProvider, ProductDetails },
  setup() {
    const { $config, params } = useContext()
    const { sdk } = useSdk($config)
    const product = ref(null)
    useFetch(async () => {
      product.value = await sdk.data.product({
        handle: params.value.productHandle
      })
    })
    return { product }
  }
})
</script>
