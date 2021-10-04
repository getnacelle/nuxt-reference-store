<template>
  <header class="relative bg-white">
    <header-promo />
    <nav
      aria-label="Top"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200"
    >
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
import HeaderPromo from "./HeaderPromo.vue";
import HeaderMenu from "./HeaderMenu.vue";
import HeaderPrimary from "./HeaderPrimary.vue";
import HeaderSearch from "./HeaderSearch.vue";
import HeaderCart from "./HeaderCart.vue";

export default {
  name: "Header",
  components: {
    HeaderPromo,
    HeaderMenu,
    HeaderPrimary,
    HeaderSearch,
    HeaderCart
  }
};
</script>
