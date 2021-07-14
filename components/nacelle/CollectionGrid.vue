<template>
  <div>
    <h3>{{ title }}</h3>
    <product-grid :products="products" />
  </div>
</template>

<script>
import productModule from '~/store/product/productModule'

export default {
  props: {
    collectionHandle: {
      type: String,
      default: ''
    },
    itemsToShow: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      products: null
    }
  },
  async fetch() {
    const collectionData = await this.$nacelle.data.collection({
      handle: this.collectionHandle
    })
    const products = collectionData.productLists[0].handles.map((handle) => {
      const namespace = `product/${handle}`
      if (!this.$store.hasModule(namespace)) {
        this.$store.registerModule(namespace, productModule(), {
          preserveState: false
        })
      }
      return this.$store.dispatch(`${namespace}/fetchProduct`, handle)
    })
    this.products = await Promise.all(products)
  },
  beforeDestroy() {
    this.products.forEach((product) => {
      const namespace = `product/${product.handle}`
      this.$store.commit(`${namespace}/unloadProduct`)
    })
  }
}
</script>

<style></style>
