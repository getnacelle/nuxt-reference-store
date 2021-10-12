<template>
  <div class="bg-white">
    <div>
      <!--
      Mobile filter dialog

      Off-canvas menu for mobile, show/hide based on off-canvas menu state.
    -->
      <div
        class="fixed inset-0 flex z-40 lg:hidden"
        role="dialog"
        aria-modal="true"
      >
        <!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
        <div
          class="fixed inset-0 bg-black bg-opacity-25"
          aria-hidden="true"
        ></div>

        <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "translate-x-full"
      -->
        <div
          class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto"
        >
          <div class="px-4 flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              class="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x -->
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

          <!-- Filters -->
          <form class="mt-4">
            <div class="border-t border-gray-200 pt-4 pb-4">
              <fieldset>
                <legend class="w-full px-2">
                  <!-- Expand/collapse section button -->
                  <button
                    type="button"
                    class="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500"
                    aria-controls="filter-section-0"
                    aria-expanded="false"
                  >
                    <span class="text-sm font-medium text-gray-900">
                      Color
                    </span>
                    <span class="ml-6 h-7 flex items-center">
                      <!--
                      Expand/collapse icon, toggle classes based on section open state.

                      Heroicon name: solid/chevron-down

                      Open: "-rotate-180", Closed: "rotate-0"
                    -->
                      <svg
                        class="rotate-0 h-5 w-5 transform"
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
                <div class="pt-4 pb-2 px-4" id="filter-section-0">
                  <div class="space-y-6">
                    <div class="flex items-center">
                      <input
                        id="color-0-mobile"
                        name="color[]"
                        value="white"
                        type="checkbox"
                        class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="color-0-mobile"
                        class="ml-3 text-sm text-gray-500"
                      >
                        White
                      </label>
                    </div>

                    <div class="flex items-center">
                      <input
                        id="color-1-mobile"
                        name="color[]"
                        value="beige"
                        type="checkbox"
                        class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="color-1-mobile"
                        class="ml-3 text-sm text-gray-500"
                      >
                        Beige
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </div>

      <main
        class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div class="border-b border-gray-200 pb-10">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
            {{ title }}
          </h1>
        </div>

        <div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 class="sr-only">Filters</h2>

            <!-- Mobile filter dialog toggle, controls the 'mobileFilterDialogOpen' state. -->
            <button type="button" class="inline-flex items-center lg:hidden">
              <span class="text-sm font-medium text-gray-700">Filters</span>
              <!-- Heroicon name: solid/plus-sm -->
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
                <div>
                  <fieldset>
                    <legend class="block text-sm font-medium text-gray-900">
                      Color
                    </legend>
                    <div class="pt-6 space-y-3">
                      <div class="flex items-center">
                        <input
                          id="color-0"
                          name="color[]"
                          value="white"
                          type="checkbox"
                          class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <label for="color-0" class="ml-3 text-sm text-gray-600">
                          White
                        </label>
                      </div>

                      <div class="flex items-center">
                        <input
                          id="color-1"
                          name="color[]"
                          value="beige"
                          type="checkbox"
                          class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <label for="color-1" class="ml-3 text-sm text-gray-600">
                          Beige
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </form>
            </div>
          </aside>

          <!-- Product grid -->
          <div class="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
            <!-- Replace with your content -->
            <div
              class="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full"
            ></div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ProductProvider } from "@nacelle/vue";
import ProductCard from "../products/ProductCard.vue";

export default {
  components: { ProductProvider, ProductCard },
  props: {
    title: { type: String, default: "" },
    products: { type: Array, required: true }
  }
  // setup(props) {
  //   const products = props?.products;
  //   return {
  //     products
  //   };
  // }
};
</script>
