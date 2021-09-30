<template>
  <transition name="fade">
    <div
      v-show="navOpen"
      class="fixed inset-0 bg-black bg-opacity-25 transition-opacity ease-linear duration-300"
      aria-hidden="true"
      @click="setNavOpen(false)"
    />
  </transition>
</template>

<script>
import { inject } from "@nuxtjs/composition-api";

export default {
  setup() {
    const navOpen = inject("navOpen");
    const setNavOpen = inject("setNavOpen");

    return { navOpen, setNavOpen };
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
