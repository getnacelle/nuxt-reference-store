<template>
  <div class="facet-value">
    <div
      v-if="property !== 'color'"
      class="checkbox"
      :class="{ selected: selected }"
    ></div>
    <refinement-filter-color-swatch
      v-else
      :color="value"
      :selected="selected"
    ></refinement-filter-color-swatch>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    property: {
      type: String,
      default: ''
    },
    activeFilters: {
      type: Array,
      default: () => [String]
    }
  },
  computed: {
    filterActive() {
      const vm = this
      if (vm.activeFilters.length > 0) {
        return vm.activeFilters.some(
          (filter) => filter.property === vm.property
        )
      }
      return null
    },
    selected() {
      const vm = this
      if (vm.filterActive) {
        const thisFilter = vm.activeFilters.find((filter) => {
          return filter.property === vm.property
        })

        if (thisFilter) {
          return thisFilter.values.some((val) => {
            return val === vm.value
          })
        }
      }

      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.product-filters {
  margin-top: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
h3 {
  margin-bottom: 1rem;
}
.checkbox {
  width: 1rem;
  height: 1rem;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 2px;
  margin-right: 0.5rem;
  position: relative;
  background: white;
}
.checkbox::before {
  content: url('/check-solid.svg');
  position: absolute;
  left: 1px;
  top: -2px;
  width: 0.7rem;
  transition: opacity, transform;
  opacity: 0;
}
.checkbox.selected::before {
  animation: pulse 0.2s;
  opacity: 1;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.facet-value {
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
}

.value span {
  font-size: 0.7rem;
  color: gray;
}
.product {
  background: whitesmoke;
  padding: 1rem;
  border: 1px solid gray;
}
.product h4 {
  margin-bottom: 1rem;
}
</style>
