<template>
  <div class="product-recommendations" :class="orientation">
    <div v-for="handle in recommendations" :key="handle">
      <slot :product="getProduct(handle)">
        <product-card :product-handle="handle"></product-card>
      </slot>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    productHandle: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 0
    },
    orientation: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].includes(value)
      }
    }
  },
  computed: {
    ...mapGetters('products', ['getRecommendations', 'getProduct']),
    recommendations() {
      const recommendations = this.getRecommendations(this.productHandle, {
        limit: this.limit
      })
      const handles = recommendations.map((r) => r.handle)
      return handles
    }
  },
  created() {
    this.loadProductRecommendations({ productHandle: this.productHandle })
  },
  methods: {
    ...mapActions('products', ['loadProductRecommendations'])
  }
}
</script>

<style lang="scss" scoped>
.product-recommendations {
  display: grid;
  grid-gap: 1rem;
}
.product-recommendations.horizontal {
  grid-auto-flow: column;
  grid-template-rows: 1fr;
}
.product-recommendations.vertical {
  grid-auto-flow: row;
  grid-template-columns: 1fr;
}
</style>
