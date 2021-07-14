<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Oops...no results!'
    },
    subtitle: {
      type: String,
      default: 'Try adjusting the filters or try another search...'
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 24pt;
  text-align: center;
}
p {
  text-align: center;
}
</style>
