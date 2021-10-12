<template>
  <div v-if="collection">
    <product-grid :title="collection.title" :products="collection.products" />
    <!-- <div
      class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      <product-provider
        v-for="(product, index) in collection.products"
        :key="index"
        :product="product"
      >
        <product-card :product="product" />
      </product-provider>
    </div> -->
  </div>
</template>

<script>
import { ProductProvider, useCollectionProvider } from "@nacelle/vue";
import ProductCard from "../products/ProductCard.vue";
import ProductGrid from "../products/ProductGrid.vue";

export default {
  components: { ProductProvider, ProductCard, ProductGrid },
  setup() {
    const { collection, isFetching } = useCollectionProvider();
    return {
      collection,
      isFetching
    };
  }
};
</script>
