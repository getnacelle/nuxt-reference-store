<template>
  <div class="search" :class="`${position}-searchbox`">
    <search-input
      :placeholder-text="placeholderText"
      :position="position"
      :search-query="searchQuery"
      @update="updateQuery"
      @submit="navigateToSearchResults"
    />
    <button
      v-if="position == 'global'"
      class="button"
      @click="navigateToSearchResults(searchQuery)"
    >
      Search
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    position: {
      type: String,
      default: 'global'
    },
    searchQuery: {
      type: String,
      default: null
    },
    placeholderText: {
      type: String,
      default: 'Search...'
    }
  },
  methods: {
    ...mapMutations('menu', ['disableMenu']),
    ...mapMutations('search', ['setQuery']),
    updateQuery(query) {
      this.setQuery({ query, position: this.position })

      if (this.position === 'page') {
        const routeQuery = this.$route.query
        const newRouteQuery = { ...routeQuery, q: query }

        if (JSON.stringify(routeQuery) !== JSON.stringify(newRouteQuery)) {
          this.$router.replace({ query: newRouteQuery })
        }
      }
    },
    navigateToSearchResults(query) {
      const q = query || ''

      if (this.position === 'global') {
        this.disableMenu()
        this.$router.push({ path: '/search', query: { q } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  position: relative;
}
.global-searchbox input,
.global-searchbox button {
  margin-right: 0.5rem;
}
</style>
