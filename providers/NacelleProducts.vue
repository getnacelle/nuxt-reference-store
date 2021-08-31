<template>
  <div><slot /></div>
</template>
<script>
import { readonly, ref, provide } from '@nuxtjs/composition-api'

export default {
  setup() {
    const products = ref({})
    provide('products', readonly(products))
  }
}
</script>
