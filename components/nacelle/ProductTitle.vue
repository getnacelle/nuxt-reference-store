<template>
  <component :is="element" class="product-title nacelle">{{ title }}</component>
</template>

<script>
export default {
  props: {
    element: {
      type: String,
      default: 'h3'
    },
    title: {
      type: String,
      default: 'Product Title'
    }
  }
}
</script>

<style lang="scss" scoped>
.product-title {
  font-size: 18pt;
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>
