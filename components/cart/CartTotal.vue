<template>
  <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
    <div class="flex justify-between text-base font-medium text-gray-900">
      <p>{{ content.subtotal }}</p>
      <p>
        <price
          :price="subtotal"
          :currencyCode="currencyCode"
          :locale="locale"
        />
      </p>
    </div>
    <p v-if="content.message" class="mt-0.5 text-sm text-gray-500">
      {{ content.message }}
    </p>
    <div class="mt-6">
      <button
        @click="processCheckout"
        :disabled="isCheckingOut"
        class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out"
        :class="{ 'bg-gray-600': isCheckingOut }"
      >
        {{ checkoutButtonText }}
      </button>
    </div>
    <div
      v-if="content.continue"
      class="mt-6 flex justify-center text-sm text-center text-gray-500"
    >
      <p>
        or
        <button
          type="button"
          @click="setCartOpen(false)"
          class="text-indigo-600 font-medium hover:text-indigo-500"
        >
          {{ content.continue }}<span aria-hidden="true"> &rarr;</span>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { inject, computed } from "@nuxtjs/composition-api";
import { useCartProvider } from "@nacelle/vue";
import Price from "~/components/core/Price.vue";

export default {
  name: "CartTotal",
  components: {
    Price
  },
  setup() {
    const { cart } = useCartProvider();
    const content = inject("total");
    const processCheckout = inject("processCheckout");
    const setCartOpen = inject("setCartOpen");
    const isCheckingOut = inject("isCheckingOut");
    const checkoutButtonText = computed(() =>
      isCheckingOut.value ? "Checking Out..." : content.checkout
    );
    const subtotal = computed(() => {
      return cart.lineItems.reduce((sum, item) => {
        return sum + item.quantity * item.variant.price;
      }, 0);
    });
    const currencyCode = computed(() => {
      return cart.lineItems[0].product.priceRange.currencyCode;
    });
    const locale = computed(() => {
      return cart.lineItems[0].product.locale;
    });

    return {
      cart,
      checkoutButtonText,
      content,
      currencyCode,
      isCheckingOut,
      locale,
      processCheckout,
      setCartOpen,
      subtotal
    };
  }
};
</script>
