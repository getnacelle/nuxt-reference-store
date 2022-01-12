<template>
  <div v-if="content" class="bg-white">
    <div
      v-show="showNav"
      class="fixed inset-0 flex z-40 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <nav-overlay />
      <nav-drawer />
    </div>
  </div>
</template>

<script>
import { ref, inject, provide, watch } from "@nuxtjs/composition-api";
import NavOverlay from "./NavOverlay.vue";
import NavDrawer from "./NavDrawer.vue";

export default {
  name: "Nav",
  components: { NavOverlay, NavDrawer },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  setup(props) {
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

    provide("primary", props?.content?.fields?.primary);

    return {
      showNav
    };
  }
};
</script>
