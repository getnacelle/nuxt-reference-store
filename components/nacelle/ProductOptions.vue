<template>
  <div class="options nacelle">
    <div v-for="option in options" :key="option.name" class="option">
      <h3 class="option-label">{{ option.name }}</h3>
      <div class="swatches">
        <slot name="swatch" v-bind="{ option }" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.option {
  margin-bottom: 1rem;
}

.swatches {
  display: flex;
}

.reset-options {
  margin-bottom: 2rem;
}

.option-label {
  font-weight: 600;
  text-transform: uppercase;
}

.selected {
  background: red;
}
</style>
