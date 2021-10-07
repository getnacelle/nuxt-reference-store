<template>
  <nuxt-link :to="`/products/${product.handle}`" class="group">
    <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
      <nuxt-img :src="product.image.src" :alt="product.image.alt" class="w-full h-full object-center object-cover group-hover:opacity-75" />
    </div>
    <h3 class="mt-4 text-sm text-gray-700">
      {{ product.title }}
    </h3>
    <p class="mt-1 text-lg font-medium text-gray-900">
      <price :price="product.price" />
    </p>
  </nuxt-link>
</template>

<script>
import Price from "~/components/core/Price.vue"

export default {
  components: {
    Price
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
