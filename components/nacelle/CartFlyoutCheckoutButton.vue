<template>
  <div
    class="button is-primary checkout-button nacelle"
    :class="{ 'is-loading': loading }"
    @click="checkout"
  >
    {{ checkoutText }}
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  props: {
    checkoutText: {
      type: String,
      default: 'Checkout'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapMutations('cart', ['setCartError']),
    ...mapActions('checkout', ['processCheckout']),
    async checkout() {
      this.loading = true
      try {
        await this.processCheckout({
          async beforeCreate() {
            // Allows processing of cart before checkout creation.
          },
          async beforeRedirect() {
            // Allows processing after checkout create and before redirecting.
          }
        })
      } catch (err) {
        this.setCartError(err)
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-button {
  border-radius: 0;
  width: 100%;
  padding: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12pt;
  letter-spacing: 1px;
}
</style>
