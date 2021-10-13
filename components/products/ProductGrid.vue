<template>
  <div>
    <div
      class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      <product-provider
        v-for="(product, index) in productsPage"
        :key="index"
        :product="product"
      >
        <product-card :product="product" />
      </product-provider>
    </div>
    <button
      v-show="!loaded"
      @click="loadProducts"
      class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-10"
    >
      Load More
    </button>
  </div>
</template>

<script>
import { computed, ref } from "@nuxtjs/composition-api";
import { ProductProvider } from "@nacelle/vue";
import ProductCard from "../products/ProductCard.vue";

export default {
  name: "ProductGrid",
  components: { ProductProvider, ProductCard },
  props: {
    products: { type: Array, required: true }
  },
  setup(props) {
    const productsPerPage = ref(12);
    const loadProducts = () => {
      productsPerPage.value += 12;
    };
    const productsPage = computed(() => {
      return props.products.slice(0, productsPerPage.value);
    });
    const loaded = computed(() => {
      const total = props.products?.length || 0;
      const current = productsPage.value?.length;
      return current >= total;
    });

    return {
      productsPage,
      loadProducts,
      loaded
    };
  }
};
</script>
