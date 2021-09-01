<template>
  <product-provider v-if="product" :products="[product]">
    <product-details :handle="product.handle" />
  </product-provider>
</template>

<script>
import { defineComponent, useContext, useStatic } from '@nuxtjs/composition-api'
import ProductProvider from '~/providers/ProductProvider.vue'
import ProductDetails from '~/components/product/ProductDetails.vue'
import useSdk from '~/composables/useSdk'

export default defineComponent({
  components: { ProductProvider, ProductDetails },
  setup() {
    const { sdk } = useSdk()
    const { params } = useContext()
    const product = useStatic(() =>
      sdk.data.product({ handle: params.value.productHandle })
    )
    return { product }
  }
})
</script>
