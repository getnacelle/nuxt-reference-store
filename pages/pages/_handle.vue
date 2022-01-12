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
import { useContext, useStatic } from "@nuxtjs/composition-api";
import { useSpaceProvider } from "@nacelle/vue";
import SiteSection from "~/components/core/Section.vue";
import { buildRobotsTags, buildMetaTags } from "~/utils";

export default {
  components: { SiteSection },
  head() {
    if (this.page) {
      const title = this.page.fields?.meta?.title
        ? this.page.fields.meta.title
        : this.page.title;
      const description = this.page.fields?.meta?.description;
      const tags = this.page.fields?.meta?.tags;
      const robots = this.page.fields?.meta?.robots;

      return {
        title: title,
        meta: [
          ...buildRobotsTags(robots),
          ...buildMetaTags(title, description, tags)
        ]
      };
    }
  },
  setup() {
    const { nacelleSdk } = useSpaceProvider();
    const { params, route } = useContext();
    const handle = params.value?.handle;

    const page = useStatic(
      () => {
        return nacelleSdk.data.content({
          handle: `page-${handle}`,
          type: "pageSections"
        });
      },
      route.value.path,
      route.value.path
    );

    return { page };
  }
};
</script>
