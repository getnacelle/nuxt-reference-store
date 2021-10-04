<template>
  <footer
    class="bg-white border-t border-gray-200"
    aria-labelledby="footer-heading"
  >
    <h2 class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:py-6 lg:px-8">
      <footer-top />
      <footer-bottom />
    </div>
  </footer>
</template>

<script>
import FooterTop from "./FooterTop.vue";
import FooterBottom from "./FooterBottom.vue";

export default {
  name: "Footer",
  components: { FooterTop, FooterBottom }
};
</script>
