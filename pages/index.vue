<template>
  <main v-if="page">
    <site-section
      v-for="section in page.sections"
      :key="section._key"
      :content="section"
    />
  </main>
</template>

<script>
import { useStatic } from "@nuxtjs/composition-api";
import { useSpaceProvider } from "@nacelle/vue";
import SiteSection from "~/components/core/Section.vue";

export default {
  components: { SiteSection },
  setup() {
    const { nacelleSdk } = useSpaceProvider();

    const page = useStatic(
      () =>
        nacelleSdk.data.content({
          handle: "page-homepage",
          type: "pageSections"
        }),
      "/",
      "/"
    );

    return { page };
  }
};
</script>
