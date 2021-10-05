<template>
  <div v-if="content" class="bg-white">
    <div
      v-show="showNav"
      class="fixed inset-0 flex z-40 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <nav-overlay />
      <nav-drawer :content="content" />
    </div>
  </div>
</template>

<script>
import { ref, inject, watch } from "@nuxtjs/composition-api";
import NavOverlay from "./NavOverlay.vue";

import headerData from "~/data/header";

export default {
  components: { NavOverlay },
  setup() {
    const showNav = ref(false);
    const navOpen = inject("navOpen");

    watch(navOpen, value => {
      if (value) showNav.value = value;
      else {
        setTimeout(() => {
          showNav.value = value;
        }, 300);
      }
    });

    return { content: headerData, showNav };
  }
};
</script>
