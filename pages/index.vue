<template>
  <div>
    <page-content class="page" :page="page" />
    <nacelle-page-placeholder
      v-if="this.$fetchState.pending === false && page === null"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: null
    }
  },
  async fetch() {
    this.page = await this.$nacelle.data
      .page({
        handle: 'homepage'
      })
      .catch(() => {
        console.warn(
          `No page entry with handle 'homepage' found. Please create one in your CMS,`
        )
        return null
      })
  }
}
</script>
