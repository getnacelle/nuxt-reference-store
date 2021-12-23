<template>
  <section v-if="content" class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-baseline sm:justify-between">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">
          {{ content.heading }}
        </h2>
      </div>

      <div
        class="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8"
      >
        <product-card
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { useSpaceProvider } from "@nacelle/vue";
import { ref, useContext, useFetch } from "@nuxtjs/composition-api";
import ProductCard from "~/components/products/ProductCard.vue";

export default {
  name: "RelatedProducts",
  components: {
    ProductCard
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const products = ref(null);
    const { $nacelleSdk } = useContext();

    useFetch(async () => {
      products.value = await $nacelleSdk.data.products({
        handles: props.content.products
      });
    });

    return { products };
  }
};
</script>
