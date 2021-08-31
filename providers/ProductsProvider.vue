<template>
  <div><slot /></div>
</template>
<script>
import { readonly, ref, provide } from '@nuxtjs/composition-api'

export default {
  setup() {
    const products = ref(['product1', 'product2', 'product3'])
    provide('products', readonly(products))
  }
}
</script>
