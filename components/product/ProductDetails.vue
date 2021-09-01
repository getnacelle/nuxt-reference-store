<template>
  <div v-if="product">
    {{ product }}
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useProducts from '~/composables/useProducts'

export default defineComponent({
  props: {
    handle: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const { getProducts } = useProducts()
    const product = getProducts([props.handle])[0]
    return { product }
  }
})
</script>
