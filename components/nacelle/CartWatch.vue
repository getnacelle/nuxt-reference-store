<template>
  <div aria-hidden="true"></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

// CartWatch.vue
//
// Nacelle's Nuxt Starter generates JSON files with your store's data during
// build time. Using this "Static API" increases speed, performance, and
// reliability for your store.
//
// However, depending on when your build times are scheduled, high traffic
// and purchases could clear a variant's inventory before the site is
// rebuilt with the latest data.
//
// This component listens for updates to the cart and checks your Nacelle
// product index to ensure the variant is still available for sale.
//
// Read more about the static files in our docs
// https://docs.getnacelle.com/nuxt/fetching-data.html#data-flow-and-static-files

export default {
  computed: {
    ...mapState('cart', ['lineItems'])
  },
  created() {
    // CartWatch listens for line items added to the Vuex store cart
    this.$store.subscribe((mutation, state) => {
      const { type, payload } = mutation

      if (type === 'cart/addLineItemMutation') {
        this.checkAvailability(payload)
      }
    })
  },
  methods: {
    ...mapMutations('cart', ['removeLineItemMutation', 'setCartError']),

    // This method gets the Nacelle product ID and variant ID from the
    // line item, and uses $nacelle.status.isVariantAvailable to check if a user
    // is allowed to purchase the item.
    async checkAvailability(lineItem) {
      try {
        const { title = '', productId = '', variant = {} } = lineItem
        const variantId = variant.id || ''

        if (productId.length > 0 && variantId.length > 0) {
          const variantAvailable = await this.$nacelle.status.isVariantAvailable(
            {
              productId,
              variantId
            }
          )

          if (!variantAvailable) {
            this.removeLineItemMutation(productId)

            // You can customize this error message for what a user sees if
            // the variant is not available.
            this.setCartError(
              `Sorry that variant for ${title} is no longer available.`
            )
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style></style>
