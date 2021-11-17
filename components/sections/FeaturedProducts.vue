<template>
  <section v-if="content" class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-baseline sm:justify-between">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">{{ content.heading }}</h2>
        <nuxt-link v-if="content.link" :to="content.link.url" class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">{{ content.link.text }}<span aria-hidden="true"> &rarr;</span></nuxt-link>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
        <product-card v-for="product in products" :key="product.id" :product="product" />
      </div>

      <div class="mt-6 sm:hidden">
        <nuxt-link v-if="content.link" :to="content.link.url" class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">{{ content.link.text }}<span aria-hidden="true"> &rarr;</span></nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { useSpaceProvider } from "@nacelle/vue";
import { ref, useFetch } from "@nuxtjs/composition-api";
import ProductCard from "~/components/products/ProductCard.vue";

export default {
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
    const { nacelleSdk } = useSpaceProvider();

    useFetch(async () => {
      const fetchedProducts = await nacelleSdk.data.products({
        handles: props.content.products
      });
      products.value = fetchedProducts.map(product => ({
        handle: product.handle,
        title: product.title,
        featuredMedia: product.featuredMedia,
        variants: product.variants.map(variant => ({
          id: variant.id,
          title: variant.title,
          availableForSale: variant.availableForSale,
          selectedOptions: variant.selectedOptions,
          featuredMedia: variant.featuredMedia,
          price: variant.price
        })),
        priceRange: product.priceRange,
        locale: product.locale,
        tags: product.tags,
        productType: product.type
      }));
    });

    return { products };
  }
};
</script>
