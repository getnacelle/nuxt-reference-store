<template>
  <div
    v-if="navigation && links"
    class="border-t border-gray-200 py-6 px-4 space-y-6"
  >
    <div v-for="(link, index) in links" :key="index" class="flow-root">
      <nuxt-link
        :to="link.url"
        class="-m-2 p-2 block font-medium text-gray-900"
      >
        {{ link.text }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { computed } from "@nuxtjs/composition-api";

export default {
  props: {
    navigation: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const links = computed(() => {
      return props.navigation.filter(navigationItem => {
        return navigationItem.url;
      });
    });

    return {
      links: links.value
    };
  }
};
</script>
