<template>
  <div class="flex">
    <transition name="fade">
      <div
        v-show="filterDrawerOpen"
        @click="toggleFilterDrawer"
        class="absolute inset-0 z-40 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500"
        aria-hidden="true"
      ></div>
    </transition>
    <transition name="slide">
      <div
        v-show="filterDrawerOpen"
        class=" z-40 fixed inset-y-0 right-0 pl-10 w-80 min-w-max flex transform transition ease-in-out duration-500"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto"
        >
          <div class="px-4 flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              class="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
              @click="toggleFilterDrawer"
            >
              <span class="sr-only">Close menu</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form class="mt-4">
            <div
              v-for="(filter, index) in filters"
              :key="filter.property.field"
              class="border-t border-gray-200 pt-4 pb-4"
            >
              <fieldset>
                <legend
                  class="w-full px-2"
                  @click="togglePropertyFilters(index)"
                >
                  <button
                    type="button"
                    class="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500"
                    :aria-controls="`filter-section-${index}-${_uid}`"
                    aria-expanded="false"
                  >
                    <span class="text-sm font-medium text-gray-900">
                      {{ filter.property.label }}
                    </span>
                    <span class="ml-6 h-7 flex items-center">
                      <svg
                        class="rotate-0 h-5 w-5 transform"
                        :class="[
                          openedProperties.includes(index)
                            ? 'rotate-180'
                            : 'rotate-0'
                        ]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </legend>
                <div
                  v-show="openedProperties.includes(index)"
                  class="pt-4 pb-2 px-4 all transition ease-in-out duration-500"
                  :id="`filter-section-${index}-${_uid}`"
                >
                  <div class="space-y-6">
                    <div
                      class="flex items-center"
                      v-for="(value, index) in filter.values"
                      :key="value"
                      @click="
                        toggleActiveFilter({
                          property: filter.property.field,
                          value
                        })
                      "
                    >
                      <input
                        :id="`${filter.property.field}-${index}-mobile-${_uid}`"
                        value="white"
                        type="checkbox"
                        class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                        :checked="
                          activeFilters.some(activeFilter =>
                            activeFilter.values.includes(value)
                          )
                        "
                      />
                      <label
                        :for="`${filter.property.field}-${index}-mobile-${_uid}`"
                        class="ml-3 text-sm text-gray-500"
                      >
                        {{ value }}
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { inject, ref } from "@nuxtjs/composition-api";
import { useRefinementProvider } from "@nacelle/vue";

export default {
  name: "RefinementDrawer",
  setup() {
    const {
      filters,
      activeFilters,
      filteredData,
      clearFilters,
      toggleActiveFilter
    } = useRefinementProvider();
    const filterDrawerOpen = inject("filterDrawerOpen");
    const toggleFilterDrawer = inject("toggleFilterDrawer");
    const openedProperties = ref([]);
    const togglePropertyFilters = index => {
      const i = openedProperties.value.findIndex(i => i === index);
      if (i >= 0) {
        openedProperties.value.splice(i);
      } else {
        openedProperties.value = [...openedProperties.value, index];
      }
    };
    return {
      filters,
      activeFilters,
      filteredData,
      clearFilters,
      toggleActiveFilter,
      filterDrawerOpen,
      toggleFilterDrawer,
      openedProperties,
      togglePropertyFilters
    };
  }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transform: translateX(0%);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
