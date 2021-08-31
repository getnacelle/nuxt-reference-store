<template>
  <nacelle-products>
    <div>product: {{ product }}</div>
  </nacelle-products>
</template>

<script>
import { defineComponent, useContext, useStatic } from '@nuxtjs/composition-api'
import NacelleProducts from '~/providers/NacelleProducts.vue'
import useNacelleSdk from '~/composables/useNacelleSdk'

export default defineComponent({
  components: { NacelleProducts },
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
