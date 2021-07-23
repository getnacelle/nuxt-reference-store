<template>
  <div class="page page-shop">
    <content-hero-banner title="Wishlist" />
    <section class="section">
      <div class="container">
        <product-grid
          :products="productData"
          :show-add-to-cart="true"
          :show-quantity-update="true"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import productModule from '~/store/product/productModule'
export default {
  data() {
    return {
      productData: null
    }
  },
  computed: {
    ...mapState('wishlist', ['items']),
    products() {
      return this.items.map((item) => item.product)
    }
  },
  watch: {
    async products() {
      await this.fetchProducts()
    }
  },
  async mounted() {
    if (this.products) {
      await this.fetchProducts()
    }
  },
  methods: {
    async fetchProducts() {
      const products = this.products.map((product) => {
        const namespace = `product/${product.handle}`
        if (!this.$store.hasModule(namespace)) {
          this.$store.registerModule(namespace, productModule(), {
            preserveState: false
          })
        }
        return this.$store.dispatch(`${namespace}/fetchProduct`, product.handle)
      })
      this.productData = await Promise.all(products)
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  .title {
    font-weight: bold;
  }
  img {
    width: 250px;
  }
}
</style>
