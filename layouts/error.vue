<template>
  <div>
    <div v-if="error" class="error">
      <h1>{{ error.statusCode }}</h1>
      <p>{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
