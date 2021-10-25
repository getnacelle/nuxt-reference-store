<template>
  <div>
    <refinement-drawer />
    <main
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <div v-if="title" class="border-b border-gray-200 pb-10 flex">
        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 flex-1">
          {{ title }}
        </h1>
      </div>
      <div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside>
          <h2 class="sr-only">Filters</h2>
          <button
            type="button"
            class="inline-flex items-center lg:hidden"
            @click="toggleFilterDrawer"
          >
            <span class="text-sm font-medium text-gray-700">Filters</span>
            <svg
              class="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div class="hidden lg:block">
            <form class="divide-y divide-gray-200 space-y-10">
              <div
                v-for="(filter, index) in filters"
                :key="filter.property.field"
                :class="[index > 0 && 'pt-10']"
              >
                <fieldset>
                  <legend class="block text-sm font-medium text-gray-900">
                    {{ filter.property.label }}
                  </legend>
                  <div
                    class="pt-6 space-y-3"
                    v-for="value in filter.values"
                    :key="value"
                    @click="
                      toggleActiveFilter({
                        property: filter.property.field,
                        value
                      })
                    "
                  >
                    <div class="flex items-center">
                      <input
                        :id="`${value}-${index}`"
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
                        :for="`${value}-${index}`"
                        class="ml-3 text-sm text-gray-600"
                      >
                        {{ value }}
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </form>
            <button
              @click="clearFilters"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-10"
            >
              Clear All
            </button>
          </div>
        </aside>

        <div class="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
          <product-grid :products="filteredData" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useRefinementProvider } from "@nacelle/vue";
import { provide, ref } from "@nuxtjs/composition-api";
import ProductGrid from "../products/ProductGrid.vue";
import RefinementDrawer from "./RefinementDrawer.vue";

export default {
  name: "Refinement",
  components: { ProductGrid, RefinementDrawer },
  props: {
    title: { type: String, default: "" }
  },
  setup() {
    const {
      filters,
      activeFilters,
      filteredData,
      clearFilters,
      toggleActiveFilter
    } = useRefinementProvider();

    const filterDrawerOpen = ref(false);
    const toggleFilterDrawer = () => {
      filterDrawerOpen.value = !filterDrawerOpen.value;
    };
    provide("filterDrawerOpen", filterDrawerOpen);
    provide("toggleFilterDrawer", toggleFilterDrawer);
    return {
      filters,
      activeFilters,
      filteredData,
      clearFilters,
      toggleActiveFilter,
      filterDrawerOpen,
      toggleFilterDrawer
    };
  }
};
</script>
