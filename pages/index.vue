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
import { useStatic, useRoute } from "@nuxtjs/composition-api";
import { useSpaceProvider } from "@nacelle/vue";
import SiteSection from "~/components/core/Section.vue";

export default {
  components: { SiteSection },
  setup() {
    const { nacelleSdk } = useSpaceProvider();
    const { route } = useRoute();

    const page = useStatic(
      () =>
        nacelleSdk.data.content({
          handle: "page-homepage",
          type: "pageSections"
        }),
      route.value.path,
      route.value.path
    );

    return { page };
  }
};
</script>
