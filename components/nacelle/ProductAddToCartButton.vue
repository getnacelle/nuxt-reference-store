<template>
  <div>
    <button
      class="button is-primary"
      :disabled="isOutOfStock"
      @click="addToCart"
    >
      <slot>
        <span>{{ buttonText }}</span>
      </slot>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    metafields: {
      type: Array,
      default: () => []
    },
    quantity: {
      type: Number,
      default: 1
    },
    variant: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return { productState: 'initial' }
  },

  computed: {
    ...mapState('cart', ['lineItems']),
    isOutOfStock() {
      return (
        (this.variant && !this.variant.availableForSale) ||
        !this.product.availableForSale
      )
    },
    buttonText() {
      if (this.productState === 'added') {
        return 'Added!'
      }
      if (this.isOutOfStock) {
        return 'Out of Stock'
      }
      return 'Add To Cart'
    }
  },

  watch: {
    confirmedSelection() {
      this.addToCart()
    }
  },

  methods: {
    ...mapActions('cart', [
      'addLineItem',
      'removeLineItem',
      'incrementLineItem',
      'decrementLineItem'
    ]),

    ...mapMutations('cart', ['showCart']),
    updateProductState() {
      this.productState = 'added'
      setTimeout(() => {
        this.productState = 'initial'
      }, 2000)
    },
    addToCart() {
      this.updateProductState()
      if (this.variant.availableForSale) {
        const lineItem = {
          image: this.product.featuredMedia,
          title: this.product.title,
          variant: this.variant,
          quantity: this.quantity || 1,
          productId: this.product.id,
          handle: this.product.handle,
          vendor: this.product.vendor,
          tags: this.product.tags,
          metafields: this.metafields
        }
        this.addLineItem(lineItem)
        this.showCart()
      }
    }
  }
}
</script>
