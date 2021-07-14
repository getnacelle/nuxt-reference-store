<template>
  <div class="product-grid columns is-multiline is-paddingless nacelle">
    <template v-for="product in products">
      <div v-if="product" :key="product.handle" :class="columnClasses">
        <product-card
          v-if="!product.isLoading && $store.state[`product/${product.handle}`]"
          :product="product"
          :show-quantity-update="showQuantityUpdate"
          :show-add-to-cart="showAddToCart"
          :image-size="imageSize"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 4
    },
    imageSize: {
      type: Number,
      default: 400
    },
    showQuantityUpdate: {
      type: Boolean,
      default: true
    },
    showAddToCart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    columnClasses() {
      let classes = 'column'

      if (this.columns === 4) {
        classes = `${classes} is-one-quarter-desktop`
      }

      if (this.columns === 3) {
        classes = `${classes} is-one-third-desktop`
      }

      if (this.columns === 2) {
        classes = `${classes} is-half-desktop`
      }

      classes = `${classes} is-half-tablet`

      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
.column {
  padding-bottom: 3rem;
}
</style>
