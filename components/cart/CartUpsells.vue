<template>
  <div class="mt-12">
    <h2 v-if="content.heading" class="text-lg font-medium text-gray-900">
      {{ content.heading }}
    </h2>
    <ul>
      <li v-for="item in upsells" :key="item.id" class="py-6 flex">
        <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
          <nuxt-img :src="item.variants[0].featuredMedia.src" :alt="item.variants[0].featuredMedia.alt" class="w-full h-full object-center object-cover" />
        </div>

        <div class="ml-4 flex-1 flex flex-col">
          <div>
            <div class="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <nuxt-link :to="`/products/${item.handle}`">
                  {{ item.title }}
                </nuxt-link>
              </h3>
              <p class="ml-4">
                {{ formatPrice(item.variants[0].price) }}
              </p>
            </div>
          </div>
          <div class="flex-1 flex items-end text-sm">
            <div class="flex w-full">
              <button type="button" @click="addProduct(item)" class="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200 w-full">{{ content.add }}<span class="sr-only">, {{ item.title }}</span></button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useSpaceProvider, useCartProvider } from "@nacelle/vue";
import { ref, useFetch } from "@nuxtjs/composition-api";

const content = {
  heading: "You May Also Like",
  add: "Add to bag"
}

export default {
  setup() {
    const { nacelleSdk } = useSpaceProvider();
    const { addItem } = useCartProvider();
    const upsells = ref([]);

    const { fetchState } = useFetch(async () => {
      const products = await nacelleSdk.data.allProducts();
      while(upsells.value.length < 3) {
        const index = Math.floor(Math.random() * products.length);
        const product = products[index];
        if (upsells.value.some(upsell => upsell.handle === product.handle)) continue;
        upsells.value.push(product);
      }
    });

    return { content, addItem, upsells, fetchState };
  },
  methods: {
    addProduct(product) {
      this.addItem({ product, variant: product.variants[0], quantity: 1 });
    },
    formatPrice(price) {
      return Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
      }).format(price);
    }
  }
}
</script>
