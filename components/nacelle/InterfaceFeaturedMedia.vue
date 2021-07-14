<template>
  <div v-if="src" class="featured-media nacelle">
    <figure v-if="type.includes('image')">
      <nacelle-image v-bind="{ src, alt, width }" />
    </figure>
    <video v-if="type.includes('video')">
      <source :src="src" :type="type" />
    </video>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      default: () => {}
    },
    width: {
      type: Number,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  },
  computed: {
    src() {
      return this.media?.src
    },
    type() {
      return this.media?.type || 'image'
    }
  }
}
</script>
