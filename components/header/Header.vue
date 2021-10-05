<template>
  <header v-if="content" class="relative bg-white border-b border-gray-200">
    <header-promo />
    <nav aria-label="Top" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-16 flex items-center justify-around">
        <header-menu />
        <header-logo />
        <header-primary />

        <div class="ml-auto flex items-center">
          <header-search />
          <header-cart />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { provide } from "@nuxtjs/composition-api";

import HeaderPromo from "./HeaderPromo.vue";
import HeaderMenu from "./HeaderMenu.vue";
import HeaderPrimary from "./HeaderPrimary.vue";
import HeaderSearch from "./HeaderSearch.vue";
import HeaderCart from "./HeaderCart.vue";

import headerData from "~/data/header";

export default {
  components: {
    HeaderPromo,
    HeaderMenu,
    HeaderPrimary,
    HeaderSearch,
    HeaderCart
  },
  setup() {
    provide("promo", headerData?.promo);
    provide("primary", headerData?.primary);
    return { content: headerData };
  }
};
</script>
