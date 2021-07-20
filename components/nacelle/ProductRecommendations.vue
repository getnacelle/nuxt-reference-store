<template>
  <div>
    <button class="button nacelle" @click="getRecs">
      Update Recommendations
    </button>
    <div v-if="recommendedProducts.length" class="recommendations container">
      <h4 class="title is-4">Recommended Products</h4>
      <div class="columns is-multiline">
        <product-grid
          :products="recommendedProducts"
          :show-add-to-cart="true"
          :show-quantity-update="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
    async getRecs() {
      this.recommendedProducts = await this.loadRecommendations(
        this.product.handle
      )
    },
    async loadRecommendations(handle, count = 4) {
      if (!handle) {
        return []
      }
      const locale = (this.$store.$nacelle.data.locale || 'en-us').toLowerCase()
      const baseRecommendationsEndpoint = `https://recommendations${
        process.env.VERCEL_ENV !== 'production' ? '.dev' : ''
      }.hailfrequency.com/${this.$store.$nacelle.client.id}/v1`
      let generatedRecommendations = []
      try {
        const recommendationsData = await axios.get(
          `${baseRecommendationsEndpoint}/recommendations/products/${handle}--${locale}.json`
        )
        if (recommendationsData) {
          generatedRecommendations = JSON.parse(recommendationsData.data)
        }
      } catch (error) {
        console.log(
          `Unable to load generated product recommendations for ${handle}.`
        )
      }

      let rulesRecommendations = []
      try {
        const merchandisingRulesData = await axios.get(
          `${baseRecommendationsEndpoint}/merchandising-rules.json`
        )
        if (merchandisingRulesData) {
          const merchandisingRules = merchandisingRulesData.data.rules.find(
            (rule) => rule.inputs.includes(handle)
          )
          rulesRecommendations = merchandisingRules
            ? merchandisingRules.outputs
            : []
        }
      } catch (error) {
        console.log(
          `Unable to load product recommendation rules for ${handle}.`
        )
      }

      const recommendations = [
        ...(rulesRecommendations || []).map((handle) => ({
          handle,
          source: 'rule'
        })),
        ...(generatedRecommendations || [])
          .filter((handle) => !rulesRecommendations.includes(handle))
          .map((handle) => ({
            handle,
            source: 'generated'
          }))
      ]

      if (!recommendations || !recommendations.length) {
        return []
      }
      return await Promise.all(
        recommendations.slice(0, count).map((handle) => {
          return this.$fetchProduct(handle.handle)
        })
      )
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
