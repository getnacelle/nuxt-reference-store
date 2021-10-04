<template>
  <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
    <transition name="slide">
      <div v-show="cartOpen" class="w-screen max-w-md transform transition ease-in-out duration-500">
        <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
          <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">

            <div class="flex items-start justify-between">
              <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                {{ content.heading }}
              </h2>
              <div class="ml-3 h-7 flex items-center">
                <button type="button" @click="setCartOpen(false)" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Close panel</span>
                  <!-- Heroicon name: outline/x -->
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="mt-8">
              <div class="flow-root">
                <div v-if="cart.lineItems.length">
                  <ul role="list" class="-my-6 divide-y divide-gray-200">
                    <cart-item v-for="item in cart.lineItems" :key="item.id" :item="item" />
                  </ul>
                  <cart-upsells />
                </div>
                <p v-else class="text-gray-400 text-center">{{ content.empty }}</p>
              </div>
            </div>
          </div>
          <cart-total v-if="cart.lineItems.length" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { inject } from "@nuxtjs/composition-api";
import { useCartProvider } from "@nacelle/vue";
import CartItem from "./CartItem.vue";
import CartUpsells from "./CartUpsells.vue";
import CartTotal from "./CartTotal.vue";

const content = {
  heading: "Shopping Cart",
  empty: "Cart is empty."
}

export default {
  components: {
    CartItem,
    CartUpsells,
    CartTotal
  },
  setup() {
    const { cart } = useCartProvider();
    const cartOpen = inject("cartOpen");
    const setCartOpen = inject("setCartOpen");
    return { content, cart, cartOpen, setCartOpen };
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transform: translateX(0%);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
