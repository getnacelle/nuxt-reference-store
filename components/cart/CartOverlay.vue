<template>
  <transition name="fade">
    <div v-show="cartOpen" @click="setCartOpen(false)" class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500" aria-hidden="true"></div>
  </transition>
</template>

<script>
import { inject } from "@nuxtjs/composition-api";

export default {
  name: "CartOverlay",
  setup() {
    const cartOpen = inject("cartOpen");
    const setCartOpen = inject("setCartOpen");
    return { cartOpen, setCartOpen };
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
