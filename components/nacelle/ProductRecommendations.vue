<template>
  <div class="container">
    <button class="button nacelle" @click="getRecommendations">
      Update Recommendations
    </button>
    <div v-if="recommendedProducts.length" class="recommendations">
      <h4 class="title is-4">Recommended Products</h4>
      <div class="product-grid columns is-multiline is-paddingless nacelle">
        <div
          v-for="recommendedProduct in recommendedProducts"
          :key="recommendedProduct.id"
        >
          <div
            v-if="recommendedProduct"
            :key="recommendedProduct.handle"
            :class="columnClasses"
          >
            <product-card
              :product="recommendedProduct"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      recommendedProducts: []
    }
  },
  async fetch() {
    this.recommendedProducts = await this.loadRecommendations(
      this.product.handle
    )
  },
  methods: {
    async getRecommendations() {
      this.recommendedProducts = await this.loadRecommendations(
        this.product.handle
      )
    },
    async loadRecommendations(handle, count = 4) {
      if (!handle) {
        return []
      }
      const locale = (this.$nacelle.data.locale || 'en-us').toLowerCase()
      const recommendations = await this.$nacelle.recommendations.getByProductHandle(
        {
          handle,
          locale,
          limit: count
        }
      )

      return await this.$nacelle.data.products({
        handles: recommendations.map((recommendation) => recommendation.handle),
        locale
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommendations {
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
}
</style>
