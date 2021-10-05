<template>
  <footer
    v-if="content"
    class="bg-white border-t border-gray-200"
    aria-labelledby="footer-heading"
  >
    <h2 class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:py-6 lg:px-8">
      <footer-primary />
      <footer-secondary />
    </div>
  </footer>
</template>

<script>
import { provide } from "@nuxtjs/composition-api";

import FooterPrimary from "./FooterPrimary.vue";
import FooterSecondary from "./FooterSecondary.vue";

import footerData from "~/data/footer";

export default {
  name: "Footer",
  components: { FooterPrimary, FooterSecondary },
  setup() {
    provide("primary", footerData?.primary);
    provide("secondary", footerData?.secondary);

    return { content: footerData };
  }
};
</script>
