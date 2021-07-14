<template>
  <input
    :ref="`${position}-search-input`"
    v-model="localQuery"
    :placeholder="placeholderText"
    type="text"
    class="input nacelle"
    @keyup="trackSearchEvent"
    @keydown.enter="submitQuery"
  />
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    placeholderText: {
      type: String,
      default: 'Search products...'
    },
    searchQuery: {
      type: String,
      default: null
    },
    position: {
      type: String,
      default: 'global'
    }
  },
  data() {
    return {
      localQuery: null,
      timeout: {}
    }
  },
  watch: {
    $route() {
      if (this.position === 'global') {
        this.localQuery = null
        this.$refs['global-search-input'].blur()
      }
    },
    localQuery(newVal) {
      const emitUpdated = this.debounce(() => {
        this.$emit('update', newVal)
      }, 250)
      emitUpdated()
    },
    searchQuery(newVal) {
      if (newVal == null) {
        this.localQuery = null
      }
      if (this.position !== 'global' && newVal) {
        this.localQuery = newVal
      }
    }
  },
  mounted() {
    if (this.position !== 'global') {
      this.$refs[`${this.position}-search-input`].focus()
    }
  },
  methods: {
    ...mapActions('events', ['searchProducts']),
    trackSearchEvent(e) {
      const query = this.localQuery
      // Check that the key press is a letter or number and that
      // local query has a value before tracking an event
      if (/^[a-z0-9]$/i.test(e.key) && query) {
        const triggerSearchEvent = this.debounce(
          this.searchProducts,
          500,
          'event'
        )
        triggerSearchEvent({ query })
      }
    },
    debounce(fn, debounceTime, label = 'query') {
      return (...args) => {
        if (this.timeout[label] !== null) {
          clearTimeout(this.timeout[label])
        }

        this.timeout[label] = setTimeout(() => fn(...args), debounceTime)
      }
    },
    submitQuery() {
      this.$emit('submit', this.localQuery)
    }
  }
}
</script>
