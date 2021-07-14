<template>
  <div class="product-video nacelle">
    <video
      ref="product-video"
      :src="source"
      :controls="showControls"
      :loop="loop"
      :muted="muted"
      :autoplay="autoplay"
    />
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: ''
    },
    showControls: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    muted() {
      if (this.autoplay === true) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style></style>
