<template>
  <img :src="src" class="logo nacelle" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
