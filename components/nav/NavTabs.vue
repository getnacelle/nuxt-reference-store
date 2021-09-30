<template>
  <div>
    <div class="mt-2">
      <div class="border-b border-gray-200">
        <div
          class="-mb-px flex px-4 space-x-8"
          aria-orientation="horizontal"
          role="tablist"
        >
          <button
            v-for="(navigationItem, index) in navigation"
            :key="index"
            class="flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
            :class="
              activeTab === index
                ? 'text-indigo-600 border-indigo-600'
                : 'text-gray-900 border-transparent'
            "
            :aria-controls="`tabs-${index}-panel-${index}`"
            role="tab"
            type="button"
          >
            {{ navigationItem.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";
import headerData from "~/data/header";

export default {
  setup() {
    const activeIndex = ref(0);

    return { navigation: headerData.navigation, activeIndex };
  }
};
</script>
