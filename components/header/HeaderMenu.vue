<template>
  <button
    type="button"
    class="bg-white p-2 rounded-md text-gray-400 lg:hidden"
    @click="setNavOpen(!navOpen)"
  >
    <span class="sr-only">Open menu</span>
    <svg
      class="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
</template>

<script>
import { inject } from "@nuxtjs/composition-api";

export default {
  name: "HeaderMenu",
  setup() {
    const navOpen = inject("navOpen");
    const setNavOpen = inject("setNavOpen");

    return { navOpen, setNavOpen };
  }
};
</script>
