<template>
  <transition name="fade-up">
    <div
      class="absolute md:right-0 md:w-96 z-50 bg-white overflow-hidden shadow rounded-lg"
    >
      <div class="px-4 py-5 sm:p-6">
        <h2
          class="text-center text-2xl font-extrabold tracking-tight text-gray-900"
        >
          Search Results
        </h2>
        <div v-if="query && results.length">
          <div v-for="product in results.slice(0, 3)">
            <search-autocomplete-item :product="product" />
          </div>
          <button
            @click="goToQuery"
            type="button"
            class="w-full text-center inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search All
          </button>
        </div>
        <div v-else class="text-center p-5">
          <p>No results...</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { useRouter } from "@nuxtjs/composition-api";
import SearchAutocompleteItem from "./SearchAutocompleteItem.vue";

export default {
  name: "SearchAutocomplete",
  components: { SearchAutocompleteItem },
  props: {
    query: {
      type: String,
      default: ""
    },
    results: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const router = useRouter();
    const goToQuery = () => {
      router.push({ path: `/search?q=${props.query}` });
    };
    return { goToQuery };
  }
};
</script>

<style lang="scss" scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-up-enter, .fade-up-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}
</style>
