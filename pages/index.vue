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
import { ref, useContext, useFetch } from "@nuxtjs/composition-api";
import SiteSection from "~/components/core/Section.vue";

export default {
  components: { SiteSection },
  setup() {
    const { $nacelleSdk } = useContext();
    const page = ref(null);

    useFetch(async () => {
      page.value = await $nacelleSdk.data
        .content({
          handle: "page-homepage",
          type: "pageSections"
        })
        .catch(() => {
          console.warn(
            `No page entry with handle 'page-homepage' found. Please create one in your CMS.`
          );
        });
    });
    return { page };
  }
};
</script>
