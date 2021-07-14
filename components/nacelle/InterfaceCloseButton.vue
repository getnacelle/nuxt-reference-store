<template>
  <img :src="source" class="interface-close-button nacelle" @click="close" />
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default:
        'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-close-icon.svg'
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
img {
  width: 1rem;
  cursor: pointer;
}
</style>
