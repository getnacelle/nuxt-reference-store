<template>
  <li class="py-6 flex">
    <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
      <nuxt-img :src="item.variant.featuredMedia.src" :alt="item.variant.featuredMedia.alt" class="w-full h-full object-center object-cover" />
    </div>

    <div class="ml-4 flex-1 flex flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <nuxt-link :to="`/products/${item.product.handle}`">
              {{ item.product.title }}
            </nuxt-link>
          </h3>
          <p class="ml-4">
            {{ formatPrice(item.variant.price) }}
          </p>
        </div>
        <p v-if="item.variant.title && item.variant.title.toLowerCase() !== 'default title'" class="mt-1 text-sm text-gray-500">
          {{ item.variant.title }}
        </p>
      </div>
      <div class="flex-1 flex items-end justify-between text-sm">
        <p class="text-gray-500">
          {{ content.quantity }} {{ item.quantity }}
        </p>

        <div class="flex">
          <button type="button" @click="removeItem(item.id)" class="font-medium text-indigo-600 hover:text-indigo-500">{{ content.remove }}</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { useCartProvider } from "@nacelle/vue";

const content = {
  quantity: "Qty",
  remove: "Remove"
}

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { removeItem } = useCartProvider();
    return { content, removeItem };
  },
  methods: {
    formatPrice(price) {
      return Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
      }).format(price);
    }
  }
}
</script>
