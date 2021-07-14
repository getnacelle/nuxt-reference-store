<template>
  <transition name="fade-up">
    <div
      v-show="autocompleteVisible"
      class="autocomplete"
      @mouseenter="cursorInside = true"
      @mouseleave="mouseLeave"
    >
      <h2>Search Results</h2>
      <search-results :search-query="globalQuery">
        <template #result="{ result }">
          <search-autocomplete-item
            v-for="item in result"
            :key="item.id"
            :item="item"
          />
        </template>
        <template #loading>
          <span>Loading product catalog...</span>
        </template>
        <template #no-results>
          <search-no-results />
        </template>
      </search-results>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      cursorInside: false
    }
  },
  computed: {
    ...mapState('search', ['globalQuery', 'autocompleteVisible'])
  },
  watch: {
    $route() {
      this.cursorInside = false
      this.setAutocompleteVisible(false)
    }
  },

  methods: {
    ...mapMutations('search', ['setAutocompleteVisible']),

    mouseLeave() {
      this.cursorInside = false

      setTimeout(() => {
        if (!this.cursorInside) {
          this.setAutocompleteVisible(false)
        }
      }, 600)
    }
  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  background: white;
  position: absolute;
  z-index: 9999;
  top: 4rem;
  right: 1rem;
  width: 30rem;
  overflow: scroll;
  height: 30rem;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: -1px 4px 7px 0px rgba(0, 0, 0, 0.08);

  @media screen and (max-width: 768px) {
    right: 0;
    left: 0;
    width: 100%;
    top: 40vh;
  }
}

h2 {
  text-align: center;
  font-size: 18pt;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-up-enter, .fade-up-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}
</style>
