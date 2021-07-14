<template>
  <div class="product-description nacelle" v-html="description"></div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: '<p>This is the description</p>'
    }
  }
}
</script>

<style lang="scss" scoped>
.product-description {
  margin-bottom: 1rem;
}
</style>
