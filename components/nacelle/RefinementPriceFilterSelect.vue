<template>
  <div class="facet-value">
    <div class="checkbox" :class="{ selected: selected }"></div>
    <div class="value">{{ priceRange.label }}</div>
  </div>
</template>

<script>
export default {
  props: {
    priceRange: {
      type: Object,
      default: () => ({})
    },
    activePriceRange: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    selected() {
      const vm = this
      if (
        vm.activePriceRange &&
        vm.priceRange.label === vm.activePriceRange.label
      ) {
        return true
      } else {
        return false
      }
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

.value {
  font-size: 0.9rem;
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
