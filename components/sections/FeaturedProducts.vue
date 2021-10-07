<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-baseline sm:justify-between">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">{{ section.heading }}</h2>
        <nuxt-link v-if="section.cta" :to="section.cta.url" class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">{{ section.cta.label }}<span aria-hidden="true"> &rarr;</span></nuxt-link>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
        <product-card v-for="product in section.products" :key="product.id" :product="product" />
      </div>

      <div class="mt-6 sm:hidden">
        <nuxt-link v-if="section.cta" :to="section.cta.url" class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">{{ section.cta.label }}<span aria-hidden="true"> &rarr;</span></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "~/components/products/ProductCard.vue";

export default {
  components: {
    ProductCard
  },
  props: {
    section: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
