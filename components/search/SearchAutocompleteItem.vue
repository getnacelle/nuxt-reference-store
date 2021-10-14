<template>
  <!-- <pre>{{ JSON.stringify(product.title, null, 2) }}</pre> -->
  <nuxt-link :to="`/products/${product.handle}`" class="py-6 flex">
    <div
      class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
    >
      <nuxt-img
        :src="product.featuredMedia.src"
        :alt="product.featuredMedia.alt"
        class="w-full h-full object-center object-cover"
      />
    </div>

    <div class="ml-4 flex-1 flex flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>
            {{ product.title }}
          </h3>
          <p class="ml-4">
            <price
              :price="product.priceRange.min"
              :currencyCode="product.priceRange.currencyCode"
              :locale="product.locale"
            />
          </p>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Price from "~/components/core/Price.vue";

export default {
  name: "SearchAutocompleteItem",
  components: {
    Price
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>
