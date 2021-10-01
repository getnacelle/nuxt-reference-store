<template>
  <div
    class="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between"
  >
    <div class="flex space-x-6 md:order-2">
      <a
        v-for="(account, index) in social"
        :key="index"
        :href="account.url"
        class="text-gray-400 hover:text-gray-500"
      >
        <span class="sr-only">{{ account.name }}</span>
        <span v-html="require(`~/assets/svgs/${account.name}.svg?raw`)" />
      </a>
    </div>
    <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
      &copy; {{ year }} {{ copyright }}
    </p>
  </div>
</template>

<script>
import footerData from "~/data/footer";

export default {
  setup() {
    const year = new Date().getFullYear();
    return {
      social: footerData.social,
      copyright: footerData.copyright,
      year
    };
  }
};
</script>
