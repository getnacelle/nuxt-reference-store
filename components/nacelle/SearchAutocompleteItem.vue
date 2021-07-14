<template>
  <router-link :to="`${pathFragment}${item.handle}`">
    <div
      class="columns is-marginless is-mobile nacelle is-vcentered"
      @click="productSelect({ product: item })"
    >
      <nacelle-image
        v-if="productThumbnail"
        :src="productThumbnail"
        :width="150"
        :height="150"
        class="autocomplete-thumb"
      />
      <h3 class="column is-5">
        {{ item.title }}
      </h3>
      <product-price
        v-if="productPriceProps"
        v-bind="productPriceProps"
        class="column is-3 is-marginless"
      />
    </div>
  </router-link>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    pathFragment() {
      // customize this as needed to route to different `searchDataTypes` listed in nuxt.config.js
      const typePathMap = {
        article: '/blog/',
        blog: '',
        page: '/pages/',
        default: '/products/'
      }

      return typePathMap[this.item.type] || typePathMap.default
    },
    productThumbnail() {
      return this.item?.featuredMedia?.thumbnailSrc
    },
    productPriceProps() {
      const variant = this.item?.variants?.[0]
      if (variant && variant.price && variant.priceCurrency) {
        return {
          price: variant.price,
          currencyCode: variant.priceCurrency
        }
      }
      return null
    }
  },
  methods: {
    ...mapActions('events', ['productSelect'])
  }
}
</script>
<style lang="scss" scoped>
.autocomplete-thumb {
  min-width: 150px;
  min-height: 150px;
}
</style>
