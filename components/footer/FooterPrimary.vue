<template>
  <div v-if="content" class="grid grid-cols-2 gap-8 md:grid-cols-4 mb-16">
    <div v-for="(menu, index) in content.navigation" :key="index" class="mt-10">
      <div>
        <h3
          class="text-sm font-semibold text-gray-500 tracking-wider uppercase"
        >
          {{ menu.text }}
        </h3>
        <ul role="list" class="mt-4 space-y-4">
          <li v-for="(link, index1) in menu.links" :key="index1">
            <nuxt-link
              :to="link.url"
              class="text-base text-gray-500 hover:text-gray-900"
            >
              {{ link.text }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "@nuxtjs/composition-api";

export default {
  name: "FooterPrimary",
  setup() {
    return {
      content: inject("primary")
    };
  }
};
</script>
