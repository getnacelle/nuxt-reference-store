<template>
  <div v-if="product">
    {{ product }}
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useNacelleProducts from '~/composables/useNacelleProducts'

export default defineComponent({
  props: {
    handle: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const { nacelleProductsByHandles } = useNacelleProducts()
    const product = nacelleProductsByHandles([props.handle])
    return { product: product[0] }
  }
})
</script>
