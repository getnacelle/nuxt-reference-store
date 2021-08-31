<template>
  <nacelle-products v-if="product" :products="[product]">
    <product-details :handle="product.handle" />
  </nacelle-products>
</template>

<script>
import { defineComponent, useContext, useStatic } from '@nuxtjs/composition-api'
import NacelleProducts from '~/providers/NacelleProducts.vue'
import ProductDetails from '~/components/product/ProductDetails.vue'
import useNacelleSdk from '~/composables/useNacelleSdk'

export default defineComponent({
  components: { NacelleProducts, ProductDetails },
  setup() {
    const { nacelleSdk } = useNacelleSdk()
    const { params } = useContext()
    const product = useStatic(() =>
      nacelleSdk.data.product({ handle: params.value.productHandle })
    )
    return { product }
  }
})
</script>
