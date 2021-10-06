<template>
  <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
    <div class="flex justify-between text-base font-medium text-gray-900">
      <p>Subtotal</p>
      <p>{{ subtotal }}</p>
    </div>
    <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
    <div class="mt-6">
      <a href="#" class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Checkout</a>
    </div>
    <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
      <p>
        or <button type="button" class="text-indigo-600 font-medium hover:text-indigo-500">Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
      </p>
    </div>
  </div>
</template>

<script>
import { useCartProvider } from "@nacelle/vue";

export default {
  setup() {
    const { cart } = useCartProvider();
    return { cart };
  },
  computed: {
    subtotal() {
      const value = this.cart.lineItems.reduce((sum, item) => {
        return sum + item.quantity * item.variant.price;
      }, 0);
      return this.formatPrice(value);
    }
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
