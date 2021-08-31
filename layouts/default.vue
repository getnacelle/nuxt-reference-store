<template>
  <lazy-hydrate when-idle class="app nacelle">
    <div>
      <global-header />
      <products-provider>
        <nuxt keep-alive :keep-alive-props="{ max: 2 }" />
      </products-provider>
      <site-footer />
      <event-dispatcher />
      <error-modal />
      <cart-watch />
    </div>
  </lazy-hydrate>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import queryString from 'query-string'
import LazyHydrate from 'vue-lazy-hydration'
import ProductsProvider from '~/providers/ProductsProvider.vue'

export default {
  components: { LazyHydrate, ProductsProvider },
  head() {
    const properties = {}
    const meta = []
    const title = this.getMetatag('title')
    const description = this.getMetatag('description')
    const image = this.getMetatag('og:image')

    if (title) {
      properties.title = title.value
      meta.push({
        hid: 'og:title',
        property: 'og:title',
        content: title.value
      })
      meta.push({
        hid: 'og:site_name',
        property: 'og:site_name',
        content: title.value
      })
    }

    if (description) {
      meta.push({
        hid: 'description',
        name: 'description',
        content: description.value
      })
      meta.push({
        hid: 'og:description',
        property: 'og:description',
        content: description.value
      })
    }

    if (image) {
      meta.push({
        hid: 'og:image',
        property: 'og:image',
        content: image.value
      })
    }

    meta.push({
      hid: 'og:type',
      property: 'og:type',
      content: 'website'
    })

    return {
      ...properties,
      meta
    }
  },
  computed: {
    ...mapGetters('space', ['getMetatag'])
  },
  created() {
    // Accounts Modifications
    // Get, read, validate, and renew accessToken from cookies.
    if (process.browser || process.client) {
      const accessToken = this.$cookies.get('customerAccessToken')
      this.$store.dispatch('account/readCustomerAccessToken', { accessToken })
    }
  },
  async mounted() {
    await this.initializeCheckout()
    await this.initializeCart()
    await this.clearProductIdb()
    this.getSearchData()
    this.setDiscountCode(queryString.parse(location.search).discount)
    this.readSession()
    this.getWishlists()
  },
  methods: {
    ...mapActions(['clearProductIdb']),
    ...mapActions('cart', ['initializeCart']),
    ...mapActions('checkout', ['initializeCheckout']),
    ...mapActions('user', ['readSession']),
    ...mapActions('search', ['getSearchData']),
    ...mapMutations('checkout', ['setDiscountCode']),
    ...mapActions('wishlist', ['getWishlists'])
  }
}
</script>

<style lang="scss">
.cart {
  z-index: 9999;
  background: white;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.1s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
