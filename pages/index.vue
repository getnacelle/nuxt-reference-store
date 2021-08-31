<template>
  <div>
    <div>Index Page -> {{ products }}</div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useProductsProvider from '~/composables/useProductsProvider'

export default defineComponent({
  setup() {
    const { products } = useProductsProvider()
    return { products }
  }
})
</script>
