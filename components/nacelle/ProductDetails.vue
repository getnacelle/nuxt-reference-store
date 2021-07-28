<template>
  <div class="product columns">
    <div class="column is-6">
      <product-media-select-view
        v-if="product && product.featuredMedia && product.media"
        :featured-media="product.featuredMedia"
        :media="product.media"
      />
    </div>
    <div class="column is-5 is-offset-1">
      <product-title :title="product.title" />
      <product-category
        v-if="product.productType"
        :category="product.productType"
      />
      <p class="price">
        <product-price :price="displayPrice" />
      </p>
      <product-description :description="product.description" />
      <product-variant-select :product="product" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import getPriceForCurrency from '~/utils/getPriceForCurrency'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('user', ['locale']),

    selectedVariant() {
      if (this.$store.state[`product/${this.product.handle}`]) {
        return this.$store.state[`product/${this.product.handle}`]
          .selectedVariant
      }
      return null
    },
    displayPrice() {
      if (this.selectedVariant) {
        return getPriceForCurrency({
          product: this.product,
          fallbackPrice: this.selectedVariant.price,
          locale: this.locale
        })
      }
      return null
    }
  },
  methods: {
    ...mapMutations('cart', ['showCart'])
  }
}
</script>

<style lang="scss" scoped>
.price {
  margin-bottom: 1rem;
}
</style>
