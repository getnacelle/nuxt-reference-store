<template>
  <main>
    <div v-for="(section, index) in page.sections" :key="index">
      <component :is="section.type" :section="section" />
    </div>
  </main>
</template>

<script>
import Hero from "~/components/sections/Hero.vue";
import HomeSideBySide from "~/components/sections/HomeSideBySide.vue";
import Newsletter from "~/components/sections/Newsletter.vue";
import FeaturedProducts from "~/components/sections/FeaturedProducts.vue";
import { ref, useFetch } from "@nuxtjs/composition-api";
// import { useSpaceProvider } from "@nacelle/vue";

import content from "~/data/content.js";

export default {
  components: {
    Hero,
    HomeSideBySide,
    Newsletter,
    FeaturedProducts
  },
  setup() {
    // const { nacelleSdk } = useSpaceProvider();
    const page = ref({});
    const { fetchState } = useFetch(async () => {
      // page.value = await nacelleSdk.data.page({ handle: "homepage" });
      page.value = content["homepage"];
    });
    return { page, fetchState };
  }
}
</script>
