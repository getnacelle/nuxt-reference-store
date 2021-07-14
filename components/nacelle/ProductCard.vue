<template>
  <div class="product-card nacelle" :style="minSize">
    <router-link :to="`${pathFragment}${product.handle}`" class="product-image">
      <nacelle-image
        :src="mediaSrc"
        :width="imageSize"
        :height="imageSize"
        @load="imgLoaded = true"
      />
    </router-link>
    <div class="product-card-details">
      <router-link :to="`${pathFragment}${product.handle}`">
        <product-title :title="product.title" />
      </router-link>
      <product-price :price="displayPrice" />
    </div>
    <product-options
      v-if="product.variants.length > 1 && options.length"
      :options="options"
    >
      <template #swatch="{ option }">
        <product-option-swatch
          v-for="{ value } in option.values"
          :key="value"
          v-bind="{
            value,
            optionName: option.name,
            variants: product.variants,
            handle: product.handle,
            selectedVariant
          }"
          swatch-style="tab"
        />
      </template>
    </product-options>
    <div v-if="product && product.id" class="product-card-actions">
      <quantity-selector
        v-if="showQuantityUpdate === true"
        :quantity.sync="quantity"
      />
      <product-add-to-cart-button
        v-if="showAddToCart === true"
        :product="product"
        :variant="selectedVariant"
        :quantity="quantity"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import getPriceForCurrency from '~/utils/getPriceForCurrency'

export default {
  props: {
    pathFragment: {
      type: String,
      default: '/products/'
    },
    product: {
      type: Object,
      default: () => {
        return {
          priceRange: {
            min: '0.0',
            max: '0.00'
          },
          title: null,
          featuredMedia: {
            src: undefined
          },
          id: null,
          handle: '',
          variants: []
        }
      }
    },
    showQuantityUpdate: {
      type: Boolean,
      default: true
    },
    showAddToCart: {
      type: Boolean,
      default: true
    },
    minWidth: {
      type: String,
      default: '175px'
    },
    minHeight: {
      type: String,
      default: '500px'
    },
    imageSize: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      quantity: 1,
      imgLoaded: false
    }
  },
  computed: {
    ...mapState('cart', ['lineItems']),
    ...mapState('user', ['locale']),
    ...mapGetters('cart', ['quantityTotal']),

    minSize() {
      return this.imgLoaded
        ? null
        : `min-width: ${this.minWidth}; min-height: ${this.minHeight};`
    },
    selectedVariant() {
      return this.$store.state[`product/${this.product.handle}`].selectedVariant
    },
    options() {
      return this.$store.state[`product/${this.product.handle}`].options
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
    },
    mediaSrc() {
      return this.product.featuredMedia?.src
    },
    cartProduct() {
      return {
        image: this.product.featuredMedia,
        title: this.product.title,
        productId: this.product.id,
        price: this.currentPrice,
        handle: this.product.handle,
        variant: this.selectedVariant
      }
    },
    productLineItems() {
      return this.lineItems.filter((item) => {
        return item.productId === this.product.id
      })
    }
  },

  methods: {
    ...mapMutations('cart', ['showCart']),
    ...mapActions('events', ['productView'])
  }
}
</script>

<style lang="scss" scoped>
.product-image {
  position: relative;
  width: 100%;
  z-index: 0;
  font-size: 0;
}

.product-card-details,
.product-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
}

.product-card-details ::v-deep a {
  flex-basis: 80%;
}

// .handler {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// }
</style>
