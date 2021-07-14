<template>
  <div v-if="cartSubtotal" class="subtotal nacelle">
    <slot :subtotal="cartSubtotal">
      <component :is="titleTag" class="subtotal-title">
        <span>Subtotal:</span>
        <product-price v-bind="productPriceProps" />
      </component>
    </slot>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  props: {
    titleTag: {
      type: String,
      default: 'h4'
    }
  },
  computed: {
    ...mapGetters('cart', ['cartSubtotal']),
    ...mapState('user', ['locale']),

    productPriceProps() {
      return {
        price: this.cartSubtotal,
        currencyCode: this.locale.currency
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.subtotal {
  border-top: 1px solid #dedede;
  padding: 1.5rem 0;
}

.subtotal-title {
  font-size: 14pt;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  color: #616161;

  span:first-child {
    margin-right: 0.5rem;
  }
}
</style>
