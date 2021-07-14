<template>
  <section>
    <div class="placeholder">
      <div class="text">
        <p>The component</p>
        <h3>{{ typeString }}</h3>
        <p>has not been created or registered yet.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    typeString() {
      return `<${this.type} />`
    }
  }
}
</script>

<style lang="scss" scoped>
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px dashed rgb(207, 207, 207);
  height: 250px;
  margin: 2rem;
}
.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h3 {
  font-size: 20pt;
  margin: 0 1rem;
  font-weight: 700;
}
</style>
