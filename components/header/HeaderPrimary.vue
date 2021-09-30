<template>
  <div class="hidden lg:ml-8 lg:block lg:self-stretch">
    <div class="h-full flex space-x-8">
      <div
        v-for="(navigationItem, index) in navigation"
        :key="index"
        class="flex"
      >
        <div class="relative flex">
          <button
            type="button"
            class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
            aria-expanded="false"
          >
            {{ navigationItem.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerData from "~/data/header";

export default {
  setup() {
    return { navigation: headerData.navigation };
  }
};
</script>
