<template>
  <div
    class="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end"
  >
    <div class="max-w-lg w-full lg:max-w-xs">
      <label for="search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          :id="`search-${_uid}`"
          :name="`search-${_uid}`"
          v-model="query"
          @keyup="globalSearch"
          @keyup.enter="submitSearch"
          @focus="handleFocus(true)"
          @blur="handleFocus(false)"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search"
          type="search"
        />
        <search-autocomplete
          v-if="query && isFocused"
          :results="results"
          :query="query"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useRouter } from "@nuxtjs/composition-api";
import { useSearchProvider } from "@nacelle/vue";
import SearchAutocomplete from "../search/SearchAutocomplete.vue";
export default {
  name: "HeaderSearch",
  components: { SearchAutocomplete },
  setup() {
    const query = ref("");
    const isFocused = ref(false);
    const router = useRouter();
    const { search, results } = useSearchProvider();
    const globalSearch = () => {
      search({ query: query.value });
    };
    const submitSearch = () => {
      router.push({ path: `/search?q=${query.value}` });
      search({ query: query.value });
    };

    const handleFocus = bool => {
      isFocused.value = bool;
    };

    return {
      query,
      results,
      globalSearch,
      submitSearch,
      handleFocus,
      isFocused
    };
  }
};
</script>
