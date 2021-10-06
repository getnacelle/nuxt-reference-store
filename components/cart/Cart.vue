<template>
  <div v-show="showCart" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <cart-overlay />
      <cart-drawer />
    </div>
  </div>
</template>

<script>
import { inject, ref, watch } from "@nuxtjs/composition-api";
import CartOverlay from "./CartOverlay.vue";
import CartDrawer from "./CartDrawer.vue";

export default {
  components: { CartOverlay, CartDrawer },
  setup() {
    const showCart = ref(false);
    const cartOpen = inject("cartOpen");

    watch(cartOpen, value => {
      if (value) showCart.value = value
      else {
        setTimeout(() => {
          showCart.value = value;
        }, 500);
      }
    });

    return { showCart };
  }
}
</script>
