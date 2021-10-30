<template>
  <div
    v-if="content"
    class="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between"
  >
    <div class="flex space-x-6 md:order-2">
      <a
        v-for="(account, index) in content.social"
        :key="index"
        :href="account.url"
        class="text-gray-500 hover:text-gray-900"
      >
        <span class="sr-only">{{ account.name }}</span>
        <span
          class="h-6 w-6"
          v-html="require(`~/assets/svgs/${account.name}.svg?raw`)"
        />
      </a>
    </div>
    <p
      v-if="content.copyright"
      class="mt-8 text-base text-gray-500 md:mt-0 md:order-1"
    >
      &copy; {{ year }} {{ content.copyright }}
    </p>
  </div>
</template>

<script>
import { inject } from "@nuxtjs/composition-api";

export default {
  name: "FooterSecondary",
  setup() {
    const year = new Date().getFullYear();
    return {
      content: inject("secondary"),
      year
    };
  }
};
</script>
