<template>
  <div v-show="showCart" class="fixed inset-0 overflow-hidden z-20" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <cart-overlay />
      <cart-drawer />
    </div>
  </div>
</template>

<script>
import { inject, ref, provide, watch } from "@nuxtjs/composition-api";
import CartOverlay from "./CartOverlay.vue";
import CartDrawer from "./CartDrawer.vue";

export default {
  name: "Cart",
  components: { CartOverlay, CartDrawer },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const showCart = ref(false);
    const cartOpen = inject("cartOpen");

    provide("drawer", props.content?.fields?.drawer)
    provide("item", props.content?.fields?.item)
    provide("total", props.content?.fields?.total)
    provide("crosssells", props.content?.fields?.crosssells)

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
