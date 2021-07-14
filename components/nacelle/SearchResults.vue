<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="internalState === 'loading'" key="loading">
        <slot name="loading" />
      </div>

      <div
        v-if="internalState === 'results'"
        key="results"
        class="search-results"
      >
        <slot name="result" :result="globalResults" />
      </div>

      <div
        v-if="internalState === 'no-results'"
        key="no-results"
        class="no-results"
      >
        <slot name="no-results" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    searchQuery: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      internalState: 'initial'
    }
  },
  computed: {
    ...mapState('search', ['isLoading', 'globalResults'])
  },
  watch: {
    isLoading() {
      this.internalState = 'loading'
    },
    globalResults() {
      if (this.globalResults.length === 0) {
        this.internalState = 'no-results'
      } else {
        this.internalState = 'results'
      }
    },
    searchQuery(newVal) {
      if (newVal && String(newVal) !== '') {
        this.setAutocompleteVisible(true)
        this.searchCatalog({ value: newVal, position: 'global' })
      }
    }
  },
  methods: {
    ...mapActions('search', ['searchCatalog']),
    ...mapMutations('search', ['setAutocompleteVisible'])
  }
}
</script>

<style lang="scss" scoped>
.search-results,
.no-results {
  min-height: 400px;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
