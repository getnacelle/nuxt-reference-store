<template>
  <div class="free-shipping-counter nacelle">
    <span v-if="!freeShippingThresholdPassed">
      <slot name="no-free-shipping" :amount="amountUntilFreeShipping">
        Only
        <product-price :price="amountUntilFreeShipping" class="free-shipping" />
        left to get free shipping!
      </slot>
    </span>
    <span v-else>
      <slot name="free-shipping"> You get free shipping! </slot>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', [
      'freeShippingThresholdPassed',
      'amountUntilFreeShipping'
    ])
  }
}
</script>

<style lang="scss" scoped>
.free-shipping {
  font-weight: bold;
}
</style>
