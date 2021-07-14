<template>
  <div class="flyout-cart-header ui-border-bottom nacelle">
    <slot name="title" :title="title">
      <component :is="titleTag" class="flyout-cart-hearder-title">
        {{ title }}
      </component>
    </slot>
    <slot name="close-button">
      <interface-close-button class="close" @close="close" />
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Your Cart'
    },
    titleTag: {
      type: String,
      default: 'h3'
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.flyout-cart-header {
  position: relative;
}

.close {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
}

.flyout-cart-hearder-title {
  text-transform: uppercase;
  font-size: 16pt;
  font-weight: 700;
  text-align: center;
  margin: 1.5rem;
}
</style>
