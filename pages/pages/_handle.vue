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
  head() {
    if(this.page) {
      const properties = {};
      const meta = [];
      if (this.page.title || this.page.fields?.meta?.title) {
        const title = this.page.fields?.meta?.title
          ? this.page.fields.meta.title
          : this.page.title;
        properties.title = title;
        meta.push({
          hid: "og:title",
          property: "og:title",
          content: title
        });
      }
      if (this.page.fields?.meta?.description) {
        meta.push({
          hid: "description",
          name: "description",
          content: this.page.fields.meta.description
        });
        meta.push({
          hid: "og:description",
          property: "og:description",
          content: this.page.fields.meta.description
        });
      }
      return {
        ...properties,
        meta
      }
    }
  },
  setup() {
    const page = ref(null);
    const nacelleSdk = inject("nacelleSdk");
    const { params } = useContext();
    const handle = params.value?.handle;

    useFetch(async () => {
      page.value = await nacelleSdk.data.content({
        handle: `page-${handle}`,
        type: "pageSections"
      });
    });

    return { page };
  }
};
</script>
