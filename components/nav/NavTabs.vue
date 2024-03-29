<template>
  <div v-if="tabs" class="mt-2">
    <div class="border-b border-gray-200">
      <div
        class="-mb-px flex px-4 space-x-8"
        aria-orientation="horizontal"
        role="tablist"
      >
        <button
          v-for="(tab, index) in tabs"
          :key="`tab-${index}`"
          class="flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
          :class="
            activeIndex === index
              ? 'text-indigo-600 border-indigo-600'
              : 'text-gray-900 border-transparent'
          "
          :aria-controls="`tabs-${index}-panel-${index}`"
          role="tab"
          type="button"
          @click="setActiveIndex(index)"
        >
          {{ tab.text }}
        </button>
      </div>
    </div>
    <div
      v-show="activeIndex === index"
      v-for="(tab, index) in tabs"
      :key="`callout-${index}`"
      class="pt-10 pb-8 px-4 space-y-10"
      :aria-labelledby="`tabs-${index}-tab-${index}`"
      role="tabpanel"
      :tabindex="index"
    >
      <div class="grid grid-cols-2 gap-x-4">
        <nuxt-link
          v-for="(callout, index1) in tab.callouts"
          :key="index1"
          :to="callout.url"
          class="group relative text-sm"
        >
          <div
            class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75"
          >
            <nuxt-img
              :src="callout.image.file.asset.url"
              :alt="callout.image.alt"
              class="object-center object-cover"
            />
          </div>
          <div class="mt-6 block font-medium text-gray-900">
            <span class="absolute z-10 inset-0" aria-hidden="true"></span>
            {{ callout.text }}
          </div>
          <p aria-hidden="true" class="mt-1">Shop now</p>
        </nuxt-link>
      </div>
    </div>
    <div
      v-show="activeIndex === index"
      v-for="(tab, index) in tabs"
      :key="`menu-${index}`"
      class="pt-10 pb-8 px-4 space-y-10"
      :aria-labelledby="`tabs-${index}-tab-${index}`"
      role="tabpanel"
      :tabindex="index"
    >
      <div v-for="(menu, index1) in tab.menus" :key="index1">
        <p class="font-medium text-gray-900">
          {{ menu.text }}
        </p>
        <ul
          role="list"
          :aria-labelledby="`${menu.text}-heading-mobile`"
          class="mt-6 flex flex-col space-y-6"
        >
          <li
            v-for="(link, index2) in menu.links"
            :key="index2"
            class="flow-root"
          >
            <nuxt-link :to="link.url" class="-m-2 p-2 block text-gray-500">
              {{ link.text }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject } from "@nuxtjs/composition-api";

export default {
  name: "NavTabs",
  setup() {
    const activeIndex = ref(0);
    const primary = inject("primary");

    const tabs = computed(() => {
      return primary.navigation.filter(navigationItem => {
        return navigationItem._type === "mega";
      });
    });

    const setActiveIndex = value => (activeIndex.value = value);

    return {
      tabs: tabs.value,
      activeIndex,
      setActiveIndex
    };
  }
};
</script>
