<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <!-- Image gallery -->
        <div class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
              <button v-for="(image, index) in images"
                :key="image.id"
                :id="`tabs-1-tab-${index}`"
                class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                :aria-controls="`tabs-1-panel-${index}`"
                role="tab"
                type="button"
                @click="activeImageIndex = index"
              >
                <span class="sr-only">
                  {{ image.alt }}
                </span>
                <span class="absolute inset-0 rounded-md overflow-hidden">
                  <nuxt-picture
                    :src="image.src"
                    :alt="image.alt"
                    class="thumbnail"
                  />
                </span>
                <span :class="`${ activeImageIndex === index ? 'ring-indigo-500' : 'ring-transparent' } absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none`" aria-hidden="true"></span>
              </button>
            </div>
          </div>

          <div class="w-full aspect-w-1 aspect-h-1">
            <div v-for="(image, index) in images" :key="image.id" :id="`tabs-1-panel-${index}`" :aria-labelledby="`tabs-1-panel-${index}`" role="tabpanel" tabindex="0" :class="index !== activeImageIndex ? 'hidden' : ''">
              <nuxt-picture
                :src="image.src"
                :alt="image.alt"
                class="picture"
              />
            </div>
          </div>
        </div>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.title }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl text-gray-900">
              <price :price="product.selectedVariant.price"
                :currencyCode="product.priceRange.currencyCode"
                :locale="product.locale"
                :class="product.selectedVariant.price < product.selectedVariant.compareAtPrice ? 'text-red-600' : ''"
              />
              <price v-if="product.selectedVariant.price < product.selectedVariant.compareAtPrice"
                :price="product.selectedVariant.compareAtPrice"
                :currencyCode="product.priceRange.currencyCode"
                :locale="product.locale"
                class="line-through"
              />
            </p>
          </div>

          <div class="mt-6" v-if="product.description">
            <h3 class="sr-only">Description</h3>

            <div class="text-base text-gray-700 space-y-6" v-html="product.description"></div>
          </div>

          <form class="mt-6">
            <div v-for="(option, index) in selectableOptions" :key="index" class="max-w-xs">
              <h3 class="font-medium text-sm text-gray-700">{{ option.name }}</h3>

              <fieldset class="mt-2">
                <legend class="sr-only">
                  Choose a {{ option.name }}
                </legend>
                <select @change="handleSelectOption(option.name, $event)" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option v-for="(value, vIndex) in option.values" :key="vIndex" :value="value" :selected="isOptionSelected(option.name, value)">{{ value }}</option>
                </select>
              </fieldset>
            </div>

            <div class="mt-10 flex">
              <button type="button" @click="handleAddItem" :disabled="!product.selectedVariant.availableForSale" class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                <span v-if="product.selectedVariant.availableForSale">Add to bag</span>
                <span v-else>Out of stock</span>
              </button>

            </div>
          </form>

          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Additional details</h2>

            <div class="border-t divide-y divide-gray-200">
              <product-expandable-section v-if="features" :features="features" />
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductProvider, useCartProvider } from "@nacelle/vue";
import { computed, inject, ref } from "@nuxtjs/composition-api";
import Price from "~/components/core/Price.vue";
import ProductExpandableSection from './ProductExpandableSection.vue';

export default {
  name: "ProductBuyBox",
  components: {
    Price,
    ProductExpandableSection,
  },
  setup() {
    const { product, setSelectedVariant, setSelectedOptions } = useProductProvider();
    const { addItem } = useCartProvider();
    const cartOpen = inject("cartOpen");
    const features = inject("features");
    const activeImageIndex = ref(product.value.media.findIndex(media => media.type === "image"));

    setSelectedVariant(product.value.variants[0]);

    const images = computed(() => {
      return product.value.media.filter(media => media.type === "image");
    });

    const selectableOptions = computed(() => {
      return product.value.options.filter(option => option.values.length > 1);
    });

    const isOptionSelected = (name, value) => {
      return product.value.selectedOptions.some((option) => {
        return option.name === name && option.value === value;
      });
    };

    const handleSelectOption = (name, event) => {
      const newOption = { name, value: event.target.value };
      const options = [...product.value.selectedOptions];
      const index = options.findIndex((option) => {
        return option.name === name;
      });
      if (index !== -1) options[index] = newOption;
      else options.push(newOption);
      setSelectedOptions({ options });
    }

    const handleAddItem = () => {
      if (product.value.selectedVariant) {
        addItem({
          product: product.value,
          variant: product.value.selectedVariant,
          quantity: 1
        });
        cartOpen.value = true;
      }
    };

    return {
      product,
      features,
      images,
      activeImageIndex,
      selectableOptions,
      isOptionSelected,
      handleSelectOption,
      handleAddItem,
    };
  }
}
</script>

<style lang="postcss" scoped>
::v-deep .thumbnail img {
  @apply w-full h-full object-center object-cover;
}

::v-deep .picture img {
  @apply w-full h-full object-center object-cover sm:rounded-lg;
}
</style>
