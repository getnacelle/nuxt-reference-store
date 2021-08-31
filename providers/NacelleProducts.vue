<template>
  <div><slot /></div>
</template>
<script>
import { reactive, readonly, provide } from '@nuxtjs/composition-api'

export default {
  props: {
    products: {
      type: Array,
      default: null
    }
  },
  setup(props) {
    const nacelleProducts = reactive({
      list: []
    })

    const nacelleProductsSet = (products) => {
      if (products) nacelleProducts.list = products
    }
    nacelleProductsSet(props.products)

    const nacelleProductsByHandles = (handles) => {
      return nacelleProducts.list.filter((nacelleProduct) =>
        handles?.includes(nacelleProduct.handle)
      )
    }

    provide('nacelleProducts', readonly(nacelleProducts))
    provide('nacelleProductsSet', nacelleProductsSet)
    provide('nacelleProductsByHandles', nacelleProductsByHandles)
  }
}
</script>
