<template>
  <div class="quantity-updater no-select nacelle">
    <div class="quantity-value">{{ quantityInCart }}</div>
    <div class="switches">
      <div class="increment switch" @click="increment">
        <span>+</span>
      </div>
      <div class="decrement switch" @click="decrement">
        <span>-</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    variant: {
      type: Object,
      default: () => ({})
    },
    allOptionsSelected: { type: Boolean, default: false }
  },
  computed: {
    ...mapState('cart', ['lineItems']),
    quantityInCart() {
      if (this.variant != null) {
        const item = this.lineItems.find((item) => {
          return item.variant.id === this.variant.id
        })
        if (item) {
          return item.quantity
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    cartProduct() {
      return {
        image: this.product.featuredMedia,
        title: this.product.title,
        variant: this.variant,
        productId: this.product.id,
        handle: this.product.handle
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['showCart']),
    ...mapActions('cart', [
      'addLineItem',
      'removeLineItem',
      'incrementLineItem',
      'decrementLineItem'
    ]),
    increment() {
      if (this.quantityInCart === 0 && this.allOptionsSelected) {
        this.addLineItem({
          ...this.cartProduct,
          quantity: 1
        })
      } else {
        this.incrementLineItem(this.variant.id)
      }
    },
    decrement() {
      this.decrementLineItem(this.variant.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.quantity-updater {
  display: flex;
  line-height: 1;
  width: 5rem;
  height: 2.25rem;
  text-align: center;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  // margin-right: 1rem;
}

.quantity-value {
  width: 3rem;
}

.switches {
  width: 2rem;
  font-size: 14pt;
  border-left: 1px solid #dbdbdb;
}

.switch {
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:first-child {
    border-bottom: 1px solid #dbdbdb;
  }

  &:hover {
    background: #f5f5f5;
  }
}
</style>
