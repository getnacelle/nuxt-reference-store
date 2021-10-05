<template>
  <div v-if="page">
    <site-section
      v-for="section in page.sections"
      :key="section._key"
      :content="section"
    />
  </div>
</template>

<script>
import { ref, inject, useContext, useFetch } from "@nuxtjs/composition-api";
import SiteSection from "~/components/core/Section.vue";

export default {
  components: { SiteSection },
  setup() {
    const page = ref(null);
    const sdk = inject("sdk");
    const { params } = useContext();
    const handle = params.value?.handle;

    useFetch(async () => {
      page.value = await sdk.data.content({
        handle: `page-${handle}`,
        type: "pageSections"
      });
    });

    return { page };
  }
};
</script>
