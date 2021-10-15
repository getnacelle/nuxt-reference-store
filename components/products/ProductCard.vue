<template>
  <div @mouseenter="setHover(true)" @mouseleave="setHover(false)">
    <div
      class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
    >
      <nuxt-link :to="`/products/${product.handle}`" class="group">
        <nuxt-picture
          :src="product.featuredMedia.src"
          :alt="product.featuredMedia.altText"
          sizes="sm:100vw lg:50vw xl:25vw"
          quality="80"
          class="picture"
        />
      </nuxt-link>
    </div>
    <div v-show="hover">
      <div v-if="product.variants.length > 1">
        <select
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mt-3"
          @change="selectVariant($event)"
        >
          <option
            v-for="variant in product.variants"
            :key="variant.id"
            :value="variant.id"
            >{{ variant.title }}</option
          >
        </select>
        <button
          type="button"
          :disabled="!selectedVariant.availableForSale"
          @click="addProduct(product)"
          class="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200 w-full mt-3"
        >
          <div v-if="selectedVariant.availableForSale">Add to Cart</div>
          <div v-else>Out of Stock</div>
        </button>
      </div>
      <div v-else class="flex w-full">
        <button
          type="button"
          :disabled="!selectedVariant.availableForSale"
          @click="addProduct(product)"
          class="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200 w-full mt-5"
        >
          <div v-if="selectedVariant.availableForSale">Add to Cart</div>
          <div v-else>Out of Stock</div>
        </button>
      </div>
    </div>
    <div v-show="!hover">
      <h3 class="mt-4 text-sm text-gray-700">
        {{ product.title }}
      </h3>
      <p class="mt-1 text-lg font-medium text-gray-900">
        <price
          :price="product.priceRange.min"
          :currencyCode="product.priceRange.currencyCode"
          :locale="product.locale"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "@nuxtjs/composition-api";
import { useCartProvider } from "@nacelle/vue";
import Price from "~/components/core/Price.vue";

export default {
  components: {
    Price
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { addItem } = useCartProvider();
    const setCartOpen = inject("setCartOpen");
    const selectedVariant = ref(props.product.variants[0]);
    const selectVariant = event => {
      selectedVariant.value = props.product.variants.find(
        id => id === event.target.value
      );
    };
    const addProduct = product => {
      setCartOpen(true);
      addItem({
        product,
        variant: selectedVariant.value,
        quantity: 1
      });
    };
    const hover = ref(false);
    const setHover = bool => {
      hover.value = bool;
    };
    return {
      hover,
      setHover,
      addProduct,
      selectVariant,
      selectedVariant
    };
  }
};
</script>

<style lang="postcss" scoped>
::v-deep .picture img {
  @apply w-full h-full object-center object-cover group-hover:opacity-75;
}
</style>
