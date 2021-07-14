<template>
  <span class="product-price nacelle">{{ displayPrice }}</span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    price: {
      type: [String, Number],
      default: ''
    },
    currencyCode: {
      type: [String, null],
      default: null
    }
  },
  computed: {
    ...mapState('user', ['locale']),

    displayPrice() {
      const { price, currencyCode, locale } = this

      if (currencyCode === locale.currency) {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode
        }).format(price)
      }
      return price
    }
  }
}
</script>

<style lang="scss" scoped>
.product-price {
  margin-bottom: 1rem;
}
</style>
