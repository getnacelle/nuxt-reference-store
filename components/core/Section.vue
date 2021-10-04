<template>
  <component :is="component" :content="content" :section="section" />
</template>

<script>
import { ref } from "@nuxtjs/composition-api";
import { pascalCase } from "pascal-case";

export default {
  name: "Section",
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    let component = ref(null);
    let section = pascalCase(props?.content?.type);
    try {
      component.value = require(`~/components/sections/${section}.vue`).default;
    } catch {
      component.value = require(`~/components/sections/Placeholder.vue`).default;
    }
    return { component, section };
  }
};
</script>
