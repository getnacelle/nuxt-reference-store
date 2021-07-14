<template>
  <div class="color-swatch" :class="{ selected: selected }">
    <div
      class="color-swatch-inner"
      :style="{ 'background-color': colorCode }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    selected: Boolean
  },
  computed: {
    colorCode() {
      switch (this.color.toLowerCase()) {
        case 'light-gray':
          return '#b4abab'
        case 'light-brown':
          return '#e6dabf'
        case 'brown':
          return '#D2691E'
        case 'blue':
          return '#719ec5'
        case 'blue-gray':
          return '#627579'
        case 'black':
          return '#292929'
        default:
          return this.color.toLowerCase()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.color-swatch {
  align-self: center;
  width: 12px;
  height: 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  margin-right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.color-swatch-inner {
  width: 10px;
  height: 10px;
  border-radius: 16px;
}
.selected {
  border: 1px solid gray;
}
</style>
