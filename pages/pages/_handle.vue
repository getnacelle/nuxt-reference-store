<template>
  <div v-if="page">
    <site-section
      v-for="(section, index) in page.sections"
      :key="index"
      :content="section"
    />
  </div>
</template>

<script>
import { useContext } from "@nuxtjs/composition-api";
import SiteSection from "~/components/core/Section.vue";
import content from "~/data/content";

export default {
  components: { SiteSection },
  setup() {
    const { params } = useContext();
    const handle = params.value?.handle;

    return { page: content[handle] };
  }
};
</script>
