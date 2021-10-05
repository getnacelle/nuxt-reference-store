<template>
  <div
    v-if="content"
    class="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8"
  >
    {{ content.text }}
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  name: "HeaderPromo"
=======
import { inject } from "@nuxtjs/composition-api";

export default {
  name: "HeaderPromo",
  setup() {
    return {
      content: inject("promo")
    };
  }
>>>>>>> 271501e68c75ed249fca3f138003b75745c55dcf
};
</script>
